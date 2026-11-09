package com.orderpanel.api

import kotlinx.coroutines.delay
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import java.util.concurrent.ConcurrentHashMap

/**
 * ShipEntegra access tokens, cached per user (multi-tenant port of AhrarWood's `SeToken`).
 *
 * ShipEntegra rate-limits `/auth/token` (HTTP 429) and one panel click (the label dialog's per-carrier price
 * compare, the analytics panels) fires several proxied calls at once, so each user's token is reused for
 * [TOKEN_TTL_MS]; `/auth/token` returns an empty `accessTokenValidity`, so the real lifetime is unknown.
 * Callers that get a 401 upstream call [invalidate] and retry once. A cache entry is tied to the client id
 * it was minted with, so reconnecting with other credentials never reuses the old token.
 */
internal object ShipEntegraAuth {
    const val API_BASE = "https://publicapi.shipentegra.com/v1"
    private const val TOKEN_URL = "$API_BASE/auth/token"
    private const val TOKEN_TTL_MS = 20L * 60L * 1000L

    class AuthException(val upstreamStatus: Int, message: String) : RuntimeException(message)

    private class Entry(val clientId: String, val token: String, val fetchedAt: Long)

    private val tokens = ConcurrentHashMap<String, Entry>()
    private val locks = ConcurrentHashMap<String, Mutex>()

    /** A token for [uid]'s ShipEntegra account. Throws [IntegrationMissingException] when not connected. */
    suspend fun token(uid: String): String {
        val creds = UserIntegrations.requireShipEntegra(uid)
        fresh(uid, creds.clientId)?.let { return it }
        return locks.getOrPut(uid) { Mutex() }.withLock {
            fresh(uid, creds.clientId)?.let { return@withLock it }
            val token = fetch(creds.authBody)
            tokens[uid] = Entry(creds.clientId, token, System.currentTimeMillis())
            token
        }
    }

    /** Forget [uid]'s cached token (after an upstream 401, or on disconnect). */
    fun invalidate(uid: String) { tokens.remove(uid) }

    /**
     * Check a client id / secret pair before saving it: the upstream status of one `/auth/token` call
     * (200 = valid). 0 means ShipEntegra could not be reached.
     */
    suspend fun probe(creds: UserIntegrations.ShipEntegraCredentials): Int = try {
        fetch(creds.authBody); 200
    } catch (e: AuthException) {
        e.upstreamStatus
    }

    private fun fresh(uid: String, clientId: String): String? =
        tokens[uid]?.takeIf { it.clientId == clientId && System.currentTimeMillis() - it.fetchedAt < TOKEN_TTL_MS }?.token

    private suspend fun fetch(authBody: String): String {
        var last = 0
        repeat(3) { attempt ->
            val res = try {
                httpSend("POST", TOKEN_URL, authBody, mapOf("Content-Type" to "application/json"))
            } catch (e: Exception) {
                if (attempt == 2) throw AuthException(0, "ShipEntegra auth: ${e.message}")
                delay(400L); return@repeat
            }
            last = res.first
            if (res.first == 200) {
                return Regex(""""accessToken"\s*:\s*"([^"]+)"""").find(res.second)?.groupValues?.get(1)
                    ?: throw AuthException(200, "ShipEntegra auth: no token in response")
            }
            // 429 = the rate limit this cache exists for; a short back-off usually clears it.
            if (res.first == 429 && attempt < 2) { delay(1500L * (attempt + 1)); return@repeat }
            throw AuthException(res.first, "ShipEntegra auth failed: HTTP ${res.first}")
        }
        throw AuthException(last, "ShipEntegra auth failed: HTTP $last")
    }
}
