package com.orderpanel.api

import com.varabyte.kobweb.api.init.InitApi
import com.varabyte.kobweb.api.init.InitApiContext

/**
 * Server configuration from the environment (Railway variables). This file is the only place env vars
 * are named. A missing variable is never replaced by a default: it is logged at startup and the route that
 * needs it answers 503 naming it (see ApiGuard.kt).
 *
 *  - FIREBASE_SERVICE_ACCOUNT — service-account JSON (raw or base64) for Firestore REST (FirebaseAdmin.kt).
 *  - CREDENTIALS_KEY          — server key for users' third-party secrets (ServerCrypto.kt). Never rotate it
 *                               without re-encrypting `users/{uid}/private/integrations`.
 *  - CRON_SECRET              — `?key=` for the cron endpoints (phase 2).
 */
internal class ServerNotConfiguredException(val variable: String) : IllegalStateException("$variable env var is not set")

internal object ServerEnv {
    const val FIREBASE_SERVICE_ACCOUNT = "FIREBASE_SERVICE_ACCOUNT"
    const val CREDENTIALS_KEY = "CREDENTIALS_KEY"
    const val CRON_SECRET = "CRON_SECRET"

    private val REQUIRED = listOf(FIREBASE_SERVICE_ACCOUNT, CREDENTIALS_KEY)

    fun value(name: String): String? = System.getenv(name)?.trim()?.takeIf { it.isNotEmpty() }

    fun require(name: String): String = value(name) ?: throw ServerNotConfiguredException(name)

    fun missingRequired(): List<String> = REQUIRED.filter { value(it) == null }
}

@InitApi
fun logMissingServerEnv(ctx: InitApiContext) {
    val missing = ServerEnv.missingRequired()
    if (missing.isEmpty()) return
    System.err.println(
        "[ServerEnv] MISSING env vars: ${missing.joinToString()} (env=${ctx.env}). Routes that need them " +
            "answer 503 until they are set."
    )
}
