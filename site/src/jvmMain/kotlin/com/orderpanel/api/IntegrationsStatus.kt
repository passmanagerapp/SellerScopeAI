package com.orderpanel.api

import com.varabyte.kobweb.api.Api
import com.varabyte.kobweb.api.ApiContext

/**
 * GET /api/integrations-status — which integrations the signed-in user has connected. Never returns a
 * secret: only a masked ShipEntegra client id and the Gmail address.
 */
@Api
suspend fun integrationsStatus(ctx: ApiContext) {
    val user = ctx.requireUser()
    val st = UserIntegrations.status(user.uid)
    ctx.respondJson(
        200,
        """{"shipEntegra":{"connected":${st.shipEntegra},"clientIdHint":${jsonStr(st.shipEntegraHint)},""" +
            """"updatedAt":${jsonStr(st.shipEntegraUpdatedAt)}},""" +
            """"gmail":{"connected":${st.gmail},"user":${jsonStr(st.gmailUser)},"updatedAt":${jsonStr(st.gmailUpdatedAt)}}}""",
    )
}
