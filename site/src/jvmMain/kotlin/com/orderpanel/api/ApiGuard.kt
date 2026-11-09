package com.orderpanel.api

import com.varabyte.kobweb.api.ApiContext
import com.varabyte.kobweb.api.http.HttpMethod
import com.varabyte.kobweb.api.http.Request
import com.varabyte.kobweb.api.http.Response
import com.varabyte.kobweb.api.http.setBodyText
import com.varabyte.kobweb.api.intercept.ApiInterceptor
import com.varabyte.kobweb.api.intercept.ApiInterceptorContext

// Reachable without signing in. Everything else, including any endpoint added later, needs a valid
// Firebase ID token.
private val OPEN_ROUTES = setOf(
    "ping",
)

// Headless jobs: these check `?key=<CRON_SECRET>` themselves (phase 2 adds them).
private val CRON_KEY_ROUTES = emptySet<String>()

/** Thrown by a handler when the signed-in user hasn't connected an integration it needs. */
internal class IntegrationMissingException(val integration: String) : IllegalStateException("$integration is not connected")

/**
 * Default-deny for `/api/` (ADR-0005). A route is either listed above or requires
 * `Authorization: Bearer <Firebase ID token>`; the token proves which user is calling, and every handler
 * then works only inside that user's `users/{uid}` tree ([requireUser]). CORS is not a security boundary
 * (a script can just omit the Origin header), so this check is.
 */
@ApiInterceptor
suspend fun apiGuard(ctx: ApiInterceptorContext): Response {
    val route = ctx.path.removePrefix("/")
    if (ctx.req.method == HttpMethod.OPTIONS) return Response().apply { status = 204 }
    if (route in OPEN_ROUTES || route in CRON_KEY_ROUTES) return dispatchMappingErrors(ctx)
    if (FirebaseIdToken.verify(bearerToken(ctx.req)) != null) return dispatchMappingErrors(ctx)
    return jsonResponse(401, """{"error":"auth_required"}""")
}

/** The verified caller. Behind [apiGuard] this always succeeds on a non-open route. */
internal suspend fun ApiContext.requireUser(): FirebaseUser =
    FirebaseIdToken.verify(bearerToken(req)) ?: throw IllegalStateException("unauthenticated request reached a guarded route")

private fun bearerToken(req: Request): String? {
    val header = req.headers.entries.firstOrNull { it.key.equals("Authorization", ignoreCase = true) }
        ?.value?.firstOrNull() ?: return null
    return header.takeIf { it.startsWith("Bearer ", ignoreCase = true) }?.substring(7)?.trim()
}

/** Turn the two "can't serve this" exceptions into readable JSON instead of Kobweb's bare 500. */
private suspend fun dispatchMappingErrors(ctx: ApiInterceptorContext): Response = try {
    ctx.dispatcher.dispatch()
} catch (e: ServerNotConfiguredException) {
    System.err.println("[ServerEnv] ${ctx.path}: ${e.message}")
    jsonResponse(503, """{"error":"server_not_configured","missing":${jsonStr(e.variable)}}""")
} catch (e: IntegrationMissingException) {
    jsonResponse(409, """{"error":"integration_missing","integration":${jsonStr(e.integration)}}""")
}

internal fun jsonResponse(code: Int, body: String): Response = Response().apply {
    status = code
    contentType = "application/json; charset=utf-8"
    setBodyText(body)
}

/** Write a JSON body onto the handler's response. */
internal fun ApiContext.respondJson(code: Int, body: String) {
    res.status = code
    res.contentType = "application/json; charset=utf-8"
    res.setBodyText(body)
}
