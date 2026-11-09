package com.orderpanel.api

import com.varabyte.kobweb.api.Api
import com.varabyte.kobweb.api.ApiContext
import com.varabyte.kobweb.api.http.HttpMethod
import com.varabyte.kobweb.api.http.readBodyText

private const val MAX_FIELD_LENGTH = 512

/**
 * POST /api/integrations-save — connect (or reconnect) one integration for the signed-in user.
 *
 * Body, one of:
 *  - `{"integration":"shipentegra","clientId":"…","clientSecret":"…"}` — checked against ShipEntegra's
 *    `/auth/token` first; only a pair ShipEntegra accepts is stored.
 *  - `{"integration":"gmail","user":"…@gmail.com","appPassword":"…"}` — stored as given (used from phase 4).
 *
 * Answers 200 `{"ok":true}`, 400 `invalid_request`, 422 `invalid_credentials`, or 502 `upstream_unavailable`
 * (ShipEntegra unreachable / rate-limited — nothing stored).
 */
@Api
suspend fun integrationsSave(ctx: ApiContext) {
    if (ctx.req.method != HttpMethod.POST) return ctx.respondJson(405, """{"error":"method_not_allowed"}""")
    val user = ctx.requireUser()
    val body = parseJsonObject(ctx.req.readBodyText())
    fun field(name: String) = body[name].jStr()?.trim()?.takeIf { it.isNotEmpty() && it.length <= MAX_FIELD_LENGTH }

    when (body["integration"].jStr()) {
        UserIntegrations.SHIPENTEGRA -> {
            val clientId = field("clientId")
            val clientSecret = field("clientSecret")
            if (clientId == null || clientSecret == null) return ctx.respondJson(400, """{"error":"invalid_request"}""")
            val creds = UserIntegrations.ShipEntegraCredentials(clientId, clientSecret)
            when (val upstream = ShipEntegraAuth.probe(creds)) {
                200 -> {
                    UserIntegrations.saveShipEntegra(user.uid, creds)
                    ShipEntegraAuth.invalidate(user.uid)
                    ctx.respondJson(200, """{"ok":true}""")
                }
                400, 401, 403, 404 -> ctx.respondJson(422, """{"error":"invalid_credentials","upstream":$upstream}""")
                else -> ctx.respondJson(502, """{"error":"upstream_unavailable","upstream":$upstream}""")
            }
        }
        UserIntegrations.GMAIL -> {
            val gmailUser = field("user")
            val appPassword = field("appPassword")?.replace(" ", "")
            if (gmailUser == null || appPassword == null || !gmailUser.contains('@')) {
                return ctx.respondJson(400, """{"error":"invalid_request"}""")
            }
            UserIntegrations.saveGmail(user.uid, UserIntegrations.GmailCredentials(gmailUser, appPassword))
            ctx.respondJson(200, """{"ok":true}""")
        }
        else -> ctx.respondJson(400, """{"error":"invalid_request"}""")
    }
}
