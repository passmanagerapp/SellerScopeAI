package com.orderpanel.api

import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

/*
 * Firestore REST helpers for the server. Every request goes through [httpSend], which adds the service
 * account's token (FirebaseAdmin) — those requests bypass `firestore.rules`.
 *
 * Tenancy: every per-user path is built with [userPath], never by hand, so no handler can touch another
 * user's tree by accident. Sensitive user data (orders, settings, …) is stored as EncryptedPayload blobs
 * (field `enc`, see ServerCrypto.kt / jsMain Crypto.kt); read and write those with [fsReadBlob] /
 * [fsWriteBlob]. Server-owned status docs (sync cursor, automation stamps) are plain fields.
 */

// ── Firebase project (mirrors jsMain FirebaseConfig — public values) ─────────
internal const val FB_PROJECT_ID = "sellerscopeai"
internal const val FB_API_KEY = "AIzaSyBhkfWWxLQas_ae6-A6CYoInsOyGfhyJoE"
internal const val FS_BASE =
    "https://firestore.googleapis.com/v1/projects/$FB_PROJECT_ID/databases/(default)/documents"

/** Turkey is UTC+3 year-round (no DST since 2016). */
internal val TURKEY_OFFSET: ZoneOffset = ZoneOffset.ofHours(3)
private val TR_STAMP: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")

/** Now in Turkey time as "yyyy-MM-dd HH:mm". */
internal fun turkeyStamp(): String = OffsetDateTime.now(TURKEY_OFFSET).format(TR_STAMP)

private val UID_PATTERN = Regex("^[A-Za-z0-9_-]{1,128}$")

/** `users/{uid}/{relative}` — the only way handlers build per-user Firestore paths. */
internal fun userPath(uid: String, relative: String = ""): String {
    require(UID_PATTERN.matches(uid)) { "invalid uid" }
    return if (relative.isEmpty()) "users/$uid" else "users/$uid/${relative.trimStart('/')}"
}

// ShipEntegra's `creationDate` ("yyyy-MM-dd HH:mm:ss", no zone) runs 3 hours ahead of the real event
// time. Apply this where creationDate is first read from ShipEntegra JSON — see ADR-0003. Twin of the
// jsMain copy in the admin panel.
private val SE_CREATION_DATE_FORMAT: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")

internal fun correctSeCreationDate(raw: String): String = try {
    java.time.LocalDateTime.parse(raw.trim(), SE_CREATION_DATE_FORMAT).minusHours(3).format(SE_CREATION_DATE_FORMAT)
} catch (e: Exception) {
    raw
}

// ── Documents ────────────────────────────────────────────────────────────────

/** GET a document by relative path, e.g. `users/{uid}/app_config/skus`. 404 when missing. */
internal suspend fun fsGet(path: String): Pair<Int, String> =
    httpSend("GET", "$FS_BASE/$path?key=$FB_API_KEY", null)

/**
 * PATCH a document. [fieldsJson] is the full `{"fields":{...}}` body. With no [masks] the whole document
 * is replaced (created if missing); otherwise only the masked paths are written.
 */
internal suspend fun fsPatch(path: String, fieldsJson: String, masks: List<String> = emptyList()): Pair<Int, String> {
    val maskQuery = masks.joinToString("") { "&updateMask.fieldPaths=${enc(it)}" }
    return httpSend(
        "PATCH", "$FS_BASE/$path?key=$FB_API_KEY$maskQuery", fieldsJson,
        mapOf("Content-Type" to "application/json"),
    )
}

internal suspend fun fsDelete(path: String): Pair<Int, String> =
    httpSend("DELETE", "$FS_BASE/$path?key=$FB_API_KEY", null)

/** Every document of a collection (relative path), following pagination. Raw per-doc JSON. */
internal suspend fun fsListAll(collection: String, pageSize: Int = 300): List<String> {
    val out = mutableListOf<String>()
    var pageToken: String? = null
    var guard = 0
    do {
        val url = buildString {
            append("$FS_BASE/$collection?key=$FB_API_KEY&pageSize=$pageSize")
            pageToken?.let { append("&pageToken=").append(enc(it)) }
        }
        val (status, body) = httpSend("GET", url, null)
        if (status !in 200..299) throw IllegalStateException("Firestore list $collection: HTTP $status ${body.take(200)}")
        out += splitTopLevelObjects(body, "documents")
        pageToken = Regex(""""nextPageToken"\s*:\s*"([^"]+)"""").find(body)?.groupValues?.get(1)
    } while (pageToken != null && ++guard < 50)
    return out
}

/**
 * Documents of the collection [collectionId] under [parent] (`""` for the root, or e.g. `users/{uid}`)
 * whose [field] equals [valueJson] (a Firestore value, e.g. [fvStr] / [fvBool]). Billed only for matches.
 */
internal suspend fun fsQueryEq(parent: String, collectionId: String, field: String, valueJson: String): List<String> {
    val query = """{"structuredQuery":{"from":[{"collectionId":${jsonStr(collectionId)}}],""" +
        """"where":{"fieldFilter":{"field":{"fieldPath":${jsonStr(field)}},"op":"EQUAL","value":$valueJson}}}}"""
    val base = if (parent.isEmpty()) FS_BASE else "$FS_BASE/$parent"
    val (status, body) = httpSend("POST", "$base:runQuery?key=$FB_API_KEY", query, mapOf("Content-Type" to "application/json"))
    if (status !in 200..299) throw IllegalStateException("Firestore query $collectionId: HTTP $status ${body.take(200)}")
    // runQuery answers with a bare array of {"document":{...},"readTime":...}; no match is [{"readTime":...}].
    return splitTopLevelObjects("{\"r\":$body}", "r").filter { it.contains("\"document\"") }
}

// ── Encrypted user blobs (EncryptedPayload, field `enc`) ─────────────────────

/**
 * The decrypted JSON of an EncryptedPayload document under [uid], or null when it is missing. A legacy
 * plaintext document (written before the browser encrypted everything) is returned as null too — the
 * browser migrates those on its next read.
 */
internal suspend fun fsReadBlob(uid: String, relative: String): String? {
    val (status, body) = fsGet(userPath(uid, relative))
    if (status == 404) return null
    if (status !in 200..299) throw IllegalStateException("Firestore get $relative: HTTP $status ${body.take(200)}")
    return blobFromDoc(uid, body)
}

/** Decrypt the `enc` field of one raw document JSON (as returned by [fsGet] / [fsListAll]). */
internal fun blobFromDoc(uid: String, docJson: String): String? {
    val cipher = fsStr(docJson, "enc")?.takeIf { it.isNotEmpty() } ?: return null
    return UserBlobCrypto.decrypt(cipher, uid)
}

/** Replace the document with an EncryptedPayload holding [json], exactly as the browser writes it. */
internal suspend fun fsWriteBlob(uid: String, relative: String, json: String) {
    val payload = """{"fields":{"enc":${fvStr(UserBlobCrypto.encrypt(json, uid))}}}"""
    val (status, body) = fsPatch(userPath(uid, relative), payload)
    if (status !in 200..299) throw IllegalStateException("Firestore write $relative: HTTP $status ${body.take(200)}")
}

// ── Value builders ───────────────────────────────────────────────────────────

internal fun fvStr(v: String): String = """{"stringValue":${jsonStr(v)}}"""
internal fun fvBool(v: Boolean): String = """{"booleanValue":$v}"""
internal fun fvInt(v: Long): String = """{"integerValue":"$v"}"""
internal fun fvDouble(v: Double): String {
    if (v.isNaN() || v.isInfinite()) return """{"doubleValue":0}"""
    // Match the Firestore JS SDK: whole numbers are stored as integers.
    return if (v == Math.floor(v) && Math.abs(v) < 9.0e15) """{"integerValue":"${v.toLong()}"}"""
    else """{"doubleValue":$v}"""
}

// ── Value readers (regex over one document's JSON) ───────────────────────────

internal fun fsStr(json: String, field: String): String? =
    Regex(""""${Regex.escape(field)}"\s*:\s*\{\s*"stringValue"\s*:\s*"((?:[^"\\]|\\.)*)"""")
        .find(json)?.groupValues?.get(1)?.let(::jsonUnescape)

internal fun fsBool(json: String, field: String): Boolean =
    Regex(""""${Regex.escape(field)}"\s*:\s*\{\s*"booleanValue"\s*:\s*(true|false)""")
        .find(json)?.groupValues?.get(1) == "true"

internal fun fsInt(json: String, field: String): Long? =
    Regex(""""${Regex.escape(field)}"\s*:\s*\{\s*"integerValue"\s*:\s*"?(-?\d+)"?""")
        .find(json)?.groupValues?.get(1)?.toLongOrNull()

internal fun fsDouble(json: String, field: String): Double? {
    val m = Regex(""""${Regex.escape(field)}"\s*:\s*\{\s*"(?:doubleValue|integerValue)"\s*:\s*"?(-?[0-9.eE+]+)"?""")
        .find(json) ?: return null
    return m.groupValues[1].toDoubleOrNull()
}

/** The document id (last path segment of the Firestore `name`). */
internal fun fsDocId(json: String): String? =
    Regex(""""name"\s*:\s*"[^"]*/([^"/]+)"""").find(json)?.groupValues?.get(1)

/**
 * The uid of a raw document JSON under `users/{uid}/...` (or of the `users/{uid}` doc itself), taken
 * from its Firestore `name`.
 */
internal fun fsUserIdOf(json: String): String? =
    Regex(""""name"\s*:\s*"[^"]*/documents/users/([^"/]+)""").find(json)?.groupValues?.get(1)

// ── Automation status (plain fields, read by the panel's automation board) ───

internal const val AUTOMATION_DOC = "app_config/automation_status"

/** Best-effort "last run" stamp for one user's job ([field] e.g. `lastSyncAt`). Never throws. */
internal suspend fun fsRecordAutomationRun(uid: String, field: String, summary: String) {
    try {
        val payload = """{"fields":{"$field":${fvStr(turkeyStamp())},"${field}Summary":${fvStr(summary)}}}"""
        fsPatch(userPath(uid, AUTOMATION_DOC), payload, listOf(field, "${field}Summary"))
    } catch (e: Throwable) {
        System.err.println("[Automation] failed to record $field for a user: ${e.message}")
    }
}
