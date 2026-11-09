package com.orderpanel.api

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import java.security.MessageDigest
import java.security.PublicKey
import java.security.Signature
import java.security.cert.CertificateFactory
import java.util.Base64
import java.util.concurrent.ConcurrentHashMap

/** A signed-in SellerScope user, as proven by a Firebase ID token. */
internal data class FirebaseUser(val uid: String, val email: String)

/**
 * Verifies Firebase Auth ID tokens locally, as the Firebase Admin SDKs do
 * (https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library):
 *
 *  - header: `alg` = RS256, `kid` = one of Google's current securetoken signing keys
 *  - payload: `aud` = project id, `iss` = https://securetoken.google.com/<project id>, `exp` in the future,
 *    `iat` / `auth_time` not in the future, `sub` (= uid) non-empty and at most 128 chars
 *  - signature: SHA256withRSA against that key's X.509 certificate
 *
 * Google's public keys are fetched once and cached for the response's `max-age`. Verified tokens are cached
 * (by SHA-256 of the token) until they expire, so the guard and the handler can both call [verify] for the
 * cost of one check.
 */
internal object FirebaseIdToken {
    private const val CERTS_URL =
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
    private const val ISSUER = "https://securetoken.google.com/$FB_PROJECT_ID"
    private const val CLOCK_SKEW_S = 300L
    private const val MAX_CACHED_TOKENS = 5_000

    private class Verified(val user: FirebaseUser, val expMs: Long)

    private val verified = ConcurrentHashMap<String, Verified>()
    private val certMutex = Mutex()
    @Volatile private var certs: Map<String, PublicKey> = emptyMap()
    @Volatile private var certsUntilMs: Long = 0L

    /** The user the token proves, or null when it is missing, malformed, expired or not ours. */
    suspend fun verify(token: String?): FirebaseUser? {
        if (token.isNullOrBlank() || token.length > 4096) return null
        val cacheKey = sha256(token)
        val now = System.currentTimeMillis()
        verified[cacheKey]?.let { if (it.expMs > now) return it.user else verified.remove(cacheKey) }

        val parts = token.split('.')
        if (parts.size != 3) return null
        val urlDecoder = Base64.getUrlDecoder()
        val header = runCatching { MiniJson.parse(String(urlDecoder.decode(parts[0]), Charsets.UTF_8)).jObj() }.getOrNull() ?: return null
        val payload = runCatching { MiniJson.parse(String(urlDecoder.decode(parts[1]), Charsets.UTF_8)).jObj() }.getOrNull() ?: return null
        val signature = runCatching { urlDecoder.decode(parts[2]) }.getOrNull() ?: return null

        if (header["alg"].jStr() != "RS256") return null
        val kid = header["kid"].jStr() ?: return null

        val nowS = now / 1000
        val exp = payload["exp"].jLong() ?: return null
        val iat = payload["iat"].jLong() ?: return null
        val authTime = payload["auth_time"].jLong() ?: return null
        val sub = payload["sub"].jStr() ?: return null
        if (payload["aud"].jStr() != FB_PROJECT_ID) return null
        if (payload["iss"].jStr() != ISSUER) return null
        if (exp <= nowS) return null
        if (iat > nowS + CLOCK_SKEW_S || authTime > nowS + CLOCK_SKEW_S) return null
        if (sub.isEmpty() || sub.length > 128) return null

        val key = publicKey(kid) ?: return null
        val ok = runCatching {
            Signature.getInstance("SHA256withRSA").run {
                initVerify(key)
                update("${parts[0]}.${parts[1]}".toByteArray(Charsets.US_ASCII))
                verify(signature)
            }
        }.getOrDefault(false)
        if (!ok) return null

        val user = FirebaseUser(uid = sub, email = payload["email"].jStr() ?: "")
        if (verified.size > MAX_CACHED_TOKENS) verified.clear()
        verified[cacheKey] = Verified(user, exp * 1000)
        return user
    }

    private suspend fun publicKey(kid: String): PublicKey? {
        val now = System.currentTimeMillis()
        if (now < certsUntilMs) certs[kid]?.let { return it }
        return certMutex.withLock {
            // Refresh when stale, or when the kid is unknown (Google rotated keys) — at most once a minute.
            if (now >= certsUntilMs || (certs[kid] == null && now - lastFetchMs > 60_000L)) refreshCerts()
            certs[kid]
        }
    }

    @Volatile private var lastFetchMs: Long = 0L

    private suspend fun refreshCerts() {
        lastFetchMs = System.currentTimeMillis()
        try {
            val (status, body) = httpSend("GET", CERTS_URL, null, timeoutSeconds = 15)
            if (status != 200) error("HTTP $status")
            val factory = CertificateFactory.getInstance("X.509")
            certs = MiniJson.parse(body).jObj().mapNotNull { (kid, pem) ->
                val text = pem.jStr() ?: return@mapNotNull null
                runCatching { kid to factory.generateCertificate(text.byteInputStream()).publicKey }.getOrNull()
            }.toMap()
            // The response's Cache-Control max-age isn't visible through httpSend; Google rotates daily and
            // keeps old keys valid for days, so an hour is safely inside that window.
            certsUntilMs = System.currentTimeMillis() + 60L * 60L * 1000L
        } catch (e: Exception) {
            System.err.println("[FirebaseIdToken] could not fetch Google signing keys: ${e.message}")
        }
    }

    private fun sha256(s: String): String =
        Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-256").digest(s.toByteArray(Charsets.UTF_8)))
}
