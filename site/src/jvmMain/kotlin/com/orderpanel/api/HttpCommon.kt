package com.orderpanel.api

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.URI
import java.net.URLEncoder
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.time.Duration

/*
 * Shared server plumbing: one HTTP client, a hand-rolled JSON reader/writer.
 *
 * Only the JDK is used. The Kobweb server jar ships a ProGuard-stripped kotlinx-serialization-json that
 * is missing public API, and `kobweb-api` is compileOnly with no transitive deps — so no JSON library and
 * no Firebase SDK on the JVM side (same rule as AhrarWood).
 */

// HTTP/1.1 + explicit connect and request timeouts: HTTP/2 multiplexes onto one pooled socket so a single
// stale connection stalls everything, and ShipEntegra's edge silently drops keep-alive connections.
internal val serverHttp: HttpClient = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_1_1)
    .connectTimeout(Duration.ofSeconds(10))
    .build()

/**
 * One HTTP call, returning status + body. Requests to Firestore ([FS_BASE]) get the service account's
 * bearer token here, centrally, so no caller can forget it.
 */
internal suspend fun httpSend(
    method: String,
    url: String,
    body: String?,
    headers: Map<String, String> = emptyMap(),
    timeoutSeconds: Long = 30,
): Pair<Int, String> {
    val b = HttpRequest.newBuilder().uri(URI.create(url))
        .timeout(Duration.ofSeconds(timeoutSeconds))
        .header("Accept", "application/json")
    headers.forEach { (k, v) -> b.header(k, v) }
    if (url.startsWith(FS_BASE)) FirebaseAdmin.firestoreAccessToken()?.let { b.header("Authorization", "Bearer $it") }
    when (method) {
        "GET" -> b.GET()
        "POST" -> b.POST(HttpRequest.BodyPublishers.ofString(body ?: ""))
        "DELETE" -> b.DELETE()
        else -> b.method(method, HttpRequest.BodyPublishers.ofString(body ?: ""))
    }
    val res = withContext(Dispatchers.IO) { serverHttp.send(b.build(), HttpResponse.BodyHandlers.ofString()) }
    return res.statusCode() to res.body()
}

internal fun enc(s: String): String = URLEncoder.encode(s, Charsets.UTF_8)

// ── JSON string helpers ──────────────────────────────────────────────────────

internal fun jsonStr(s: String): String = buildString {
    append('"')
    for (c in s) when (c) {
        '"' -> append("\\\"")
        '\\' -> append("\\\\")
        '\n' -> append("\\n")
        '\r' -> append("\\r")
        '\t' -> append("\\t")
        else -> if (c < ' ') append("\\u%04x".format(c.code)) else append(c)
    }
    append('"')
}

internal fun jsonUnescape(s: String): String = s
    .replace("\\\"", "\"").replace("\\\\", "\\")
    .replace("\\n", "\n").replace("\\r", "\r").replace("\\t", "\t").replace("\\/", "/")

/** Split the objects inside a `"<key>": [ ... ]` array, brace- and string-aware. */
internal fun splitTopLevelObjects(json: String, key: String): List<String> {
    val anchor = json.indexOf("\"$key\"")
    if (anchor < 0) return emptyList()
    val arrStart = json.indexOf('[', anchor)
    if (arrStart < 0) return emptyList()
    val objs = mutableListOf<String>()
    var depth = 0
    var inStr = false
    var esc = false
    var objStart = -1
    var i = arrStart + 1
    while (i < json.length) {
        val c = json[i]
        when {
            esc -> esc = false
            c == '\\' && inStr -> esc = true
            c == '"' -> inStr = !inStr
            inStr -> {}
            c == '{' -> { if (depth == 0) objStart = i; depth++ }
            c == '}' -> {
                depth--
                if (depth == 0 && objStart >= 0) { objs += json.substring(objStart, i + 1); objStart = -1 }
            }
            c == ']' && depth == 0 -> return objs
        }
        i++
    }
    return objs
}

// ── Minimal JSON reader / writer ─────────────────────────────────────────────
// Produces / consumes Map<String, Any?> / List<Any?> / String / Double / Boolean / null.

internal object MiniJson {
    fun parse(text: String): Any? = P(text).value()

    /** Serialise a parsed tree (or any Map/List/String/Number/Boolean/null) back to JSON. */
    fun write(v: Any?): String = buildString { writeTo(this, v) }

    private fun writeTo(sb: StringBuilder, v: Any?) {
        when (v) {
            null -> sb.append("null")
            is String -> sb.append(jsonStr(v))
            is Boolean -> sb.append(v)
            is Int, is Long -> sb.append(v)
            is Number -> {
                val d = v.toDouble()
                when {
                    d.isNaN() || d.isInfinite() -> sb.append("0")
                    d == Math.floor(d) && Math.abs(d) < 9.0e15 -> sb.append(d.toLong())
                    else -> sb.append(d)
                }
            }
            is Map<*, *> -> {
                sb.append('{')
                var first = true
                for ((k, value) in v) {
                    if (!first) sb.append(',')
                    first = false
                    sb.append(jsonStr(k.toString())).append(':')
                    writeTo(sb, value)
                }
                sb.append('}')
            }
            is Iterable<*> -> {
                sb.append('[')
                var first = true
                for (value in v) {
                    if (!first) sb.append(',')
                    first = false
                    writeTo(sb, value)
                }
                sb.append(']')
            }
            else -> sb.append(jsonStr(v.toString()))
        }
    }

    private class P(val s: String) {
        var i = 0
        fun value(): Any? {
            ws()
            return when (s[i]) {
                '{' -> obj()
                '[' -> arr()
                '"' -> str()
                't' -> { lit("true"); true }
                'f' -> { lit("false"); false }
                'n' -> { lit("null"); null }
                else -> num()
            }
        }
        fun obj(): Map<String, Any?> {
            val m = LinkedHashMap<String, Any?>()
            i++; ws()
            if (s[i] == '}') { i++; return m }
            while (true) {
                ws(); val k = str(); ws()
                require(s[i] == ':') { "expected ':' at $i" }; i++
                m[k] = value(); ws()
                when (s[i]) {
                    ',' -> { i++; continue }
                    '}' -> { i++; return m }
                    else -> throw IllegalArgumentException("expected ',' or '}' at $i")
                }
            }
        }
        fun arr(): List<Any?> {
            val l = ArrayList<Any?>()
            i++; ws()
            if (s[i] == ']') { i++; return l }
            while (true) {
                l.add(value()); ws()
                when (s[i]) {
                    ',' -> { i++; continue }
                    ']' -> { i++; return l }
                    else -> throw IllegalArgumentException("expected ',' or ']' at $i")
                }
            }
        }
        fun str(): String {
            require(s[i] == '"') { "expected string at $i" }; i++
            val sb = StringBuilder()
            while (true) {
                when (val c = s[i++]) {
                    '"' -> return sb.toString()
                    '\\' -> when (val e = s[i++]) {
                        '"' -> sb.append('"'); '\\' -> sb.append('\\'); '/' -> sb.append('/')
                        'n' -> sb.append('\n'); 't' -> sb.append('\t'); 'r' -> sb.append('\r'); 'b' -> sb.append('\b')
                        'f' -> sb.append('\u000C')
                        'u' -> { sb.append(s.substring(i, i + 4).toInt(16).toChar()); i += 4 }
                        else -> sb.append(e)
                    }
                    else -> sb.append(c)
                }
            }
        }
        fun num(): Double {
            val start = i
            while (i < s.length && (s[i] == '-' || s[i] == '+' || s[i] == '.' || s[i] == 'e' || s[i] == 'E' || s[i] in '0'..'9')) i++
            return s.substring(start, i).toDouble()
        }
        fun lit(l: String) { require(s.startsWith(l, i)) { "expected '$l' at $i" }; i += l.length }
        fun ws() { while (i < s.length && s[i].isWhitespace()) i++ }
    }
}

@Suppress("UNCHECKED_CAST")
internal fun Any?.jObj(): Map<String, Any?> = this as? Map<String, Any?> ?: emptyMap()
@Suppress("UNCHECKED_CAST")
internal fun Any?.jArr(): List<Any?> = this as? List<Any?> ?: emptyList()
internal fun Any?.jStr(): String? = this as? String
internal fun Any?.jBool(): Boolean? = this as? Boolean
internal fun Any?.jLong(): Long? = when (this) {
    is Double -> toLong(); is String -> toDoubleOrNull()?.toLong(); else -> null
}
internal fun Any?.jInt(): Int? = jLong()?.toInt()
internal fun Any?.jDouble(): Double? = when (this) {
    is Double -> this; is String -> toDoubleOrNull(); else -> null
}

/** Parse a request body as a JSON object; empty map when it isn't one. */
internal fun parseJsonObject(text: String?): Map<String, Any?> =
    if (text.isNullOrBlank()) emptyMap() else runCatching { MiniJson.parse(text).jObj() }.getOrDefault(emptyMap())
