package com.orderpanel.api

import com.orderpanel.firebase.getFirebaseAuth
import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlin.js.Promise
import kotlin.js.json

/** A server answer: HTTP status plus the raw body (JSON by convention). Status 0 = network failure. */
data class ServerResponse(val status: Int, val body: String) {
    val ok: Boolean get() = status in 200..299

    /** The `error` code of a JSON error body (`{"error":"…"}`), or "" when there is none. */
    val errorCode: String
        get() = runCatching { JSON.parse<dynamic>(body).error as? String }.getOrNull() ?: ""
}

/**
 * Call one of our own `/api/…` endpoints as the signed-in user (ADR-0005): attaches
 * `Authorization: Bearer <Firebase ID token>`, which the server's ApiGuard verifies. The Firebase SDK
 * refreshes the token itself when it is close to expiry.
 *
 * Returns 401 without a request when nobody is signed in, and 0 when the network call itself failed.
 */
suspend fun serverCall(path: String, method: String = "GET", jsonBody: String? = null): ServerResponse {
    val user = getFirebaseAuth()?.currentUser ?: return ServerResponse(401, """{"error":"auth_required"}""")
    return try {
        val token = (user.getIdToken() as Promise<String>).await()
        val headers = json("Authorization" to "Bearer $token")
        if (jsonBody != null) headers["Content-Type"] = "application/json"
        val init = json("method" to method, "headers" to headers)
        if (jsonBody != null) init["body"] = jsonBody
        val res: dynamic = window.asDynamic().fetch("/api/${path.removePrefix("/")}", init).unsafeCast<Promise<dynamic>>().await()
        val text = (res.text() as Promise<String>).await()
        ServerResponse((res.status as Number).toInt(), text)
    } catch (e: Throwable) {
        console.error("serverCall $path failed: ${e.message}")
        ServerResponse(0, "")
    }
}
