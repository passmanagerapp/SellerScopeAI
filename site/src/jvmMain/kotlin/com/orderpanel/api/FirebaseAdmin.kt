package com.orderpanel.api

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import java.security.KeyFactory
import java.security.PrivateKey
import java.security.Signature
import java.security.spec.PKCS8EncodedKeySpec
import java.util.Base64

/**
 * The server's own Firebase identity, from the service-account key in `FIREBASE_SERVICE_ACCOUNT` (the JSON
 * downloaded from Firebase console → Project settings → Service accounts, raw or base64-encoded).
 *
 * [firestoreAccessToken] is the OAuth token [httpSend] attaches to every Firestore REST call. Service-account
 * requests bypass `firestore.rules`, which is what lets the server read a user's tree and the
 * `users/{uid}/private` documents the browser can never reach.
 *
 * The JWT is built by hand (no JSON/Firebase library on the JVM side). Nothing here may log key material.
 * Ported from AhrarWood's FirebaseAdmin.kt (minus its admin custom token, which SellerScope doesn't need).
 */
internal object FirebaseAdmin {
    private const val TOKEN_URL = "https://oauth2.googleapis.com/token"
    private const val FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore"
    private const val TOKEN_TTL_SECONDS = 3600L
    private const val REFRESH_MARGIN_MS = 5L * 60L * 1000L
    private const val FAILURE_BACKOFF_MS = 60L * 1000L

    private class Account(val email: String, val key: PrivateKey)

    private val account: Account? by lazy { loadAccount() }

    private val mutex = Mutex()
    @Volatile private var cachedToken: String? = null
    @Volatile private var cachedUntilMs: Long = 0L
    @Volatile private var retryAfterMs: Long = 0L

    val isConfigured: Boolean get() = account != null

    private fun loadAccount(): Account? {
        val raw = ServerEnv.value(ServerEnv.FIREBASE_SERVICE_ACCOUNT) ?: run {
            System.err.println("[FirebaseAdmin] FIREBASE_SERVICE_ACCOUNT not set: Firestore calls are anonymous and will be refused")
            return null
        }
        return try {
            val json = if (raw.startsWith("{")) raw else String(Base64.getDecoder().decode(raw), Charsets.UTF_8)
            val parsed = MiniJson.parse(json).jObj()
            val email = parsed["client_email"].jStr()?.takeIf { it.isNotBlank() } ?: error("no client_email")
            val pem = parsed["private_key"].jStr()?.takeIf { it.isNotBlank() } ?: error("no private_key")
            val der = Base64.getMimeDecoder().decode(pem.replace(Regex("-----[A-Z ]+-----"), ""))
            Account(email, KeyFactory.getInstance("RSA").generatePrivate(PKCS8EncodedKeySpec(der)))
        } catch (e: Exception) {
            // Only the exception type: a parser's message could quote part of the key.
            System.err.println("[FirebaseAdmin] FIREBASE_SERVICE_ACCOUNT is unusable: ${e.javaClass.simpleName}")
            null
        }
    }

    /** An OAuth token for Firestore, or null when there is no usable account or Google refused it. */
    suspend fun firestoreAccessToken(): String? {
        val acc = account ?: return null
        fresh()?.let { return it }
        return mutex.withLock {
            fresh()?.let { return@withLock it }
            if (System.currentTimeMillis() < retryAfterMs) return@withLock null
            try {
                val now = System.currentTimeMillis() / 1000
                val assertion = signJwt(
                    acc,
                    """{"iss":${jsonStr(acc.email)},"scope":"$FIRESTORE_SCOPE",""" +
                        """"aud":"$TOKEN_URL","iat":$now,"exp":${now + TOKEN_TTL_SECONDS}}""",
                )
                val form = "grant_type=${enc("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${enc(assertion)}"
                val (status, body) = httpSend("POST", TOKEN_URL, form, mapOf("Content-Type" to "application/x-www-form-urlencoded"))
                val token = Regex(""""access_token"\s*:\s*"([^"]+)"""").find(body)?.groupValues?.get(1)
                if (status != 200 || token == null) error("token endpoint answered HTTP $status")
                cachedToken = token
                cachedUntilMs = System.currentTimeMillis() + TOKEN_TTL_SECONDS * 1000 - REFRESH_MARGIN_MS
                token
            } catch (e: Exception) {
                System.err.println("[FirebaseAdmin] could not get a Firestore token: ${e.message}")
                retryAfterMs = System.currentTimeMillis() + FAILURE_BACKOFF_MS
                null
            }
        }
    }

    private fun fresh(): String? = cachedToken?.takeIf { System.currentTimeMillis() < cachedUntilMs }

    private fun signJwt(acc: Account, claimsJson: String): String {
        val encoder = Base64.getUrlEncoder().withoutPadding()
        val encode = { s: String -> encoder.encodeToString(s.toByteArray(Charsets.UTF_8)) }
        val signingInput = encode("""{"alg":"RS256","typ":"JWT"}""") + "." + encode(claimsJson)
        val signature = Signature.getInstance("SHA256withRSA").run {
            initSign(acc.key)
            update(signingInput.toByteArray(Charsets.US_ASCII))
            sign()
        }
        return signingInput + "." + encoder.encodeToString(signature)
    }
}
