package com.orderpanel.api

import com.varabyte.kobweb.api.Api
import com.varabyte.kobweb.api.ApiContext
import com.varabyte.kobweb.api.http.HttpMethod
import com.varabyte.kobweb.api.http.readBodyText

/**
 * POST /api/integrations-delete — disconnect one integration for the signed-in user.
 * Body: `{"integration":"shipentegra"}` or `{"integration":"gmail"}`. The stored secret is blanked.
 */
@Api
suspend fun integrationsDelete(ctx: ApiContext) {
    if (ctx.req.method != HttpMethod.POST) return ctx.respondJson(405, """{"error":"method_not_allowed"}""")
    val user = ctx.requireUser()
    val integration = parseJsonObject(ctx.req.readBodyText())["integration"].jStr()
    if (integration != UserIntegrations.SHIPENTEGRA && integration != UserIntegrations.GMAIL) {
        return ctx.respondJson(400, """{"error":"invalid_request"}""")
    }
    UserIntegrations.delete(user.uid, integration)
    ctx.respondJson(200, """{"ok":true}""")
}
