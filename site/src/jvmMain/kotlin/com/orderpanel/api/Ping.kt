package com.orderpanel.api

import com.varabyte.kobweb.api.Api
import com.varabyte.kobweb.api.ApiContext
import com.varabyte.kobweb.api.http.setBodyText

/** GET /api/ping — confirms the API jar is loaded and routes are registered. Public. */
@Api
suspend fun ping(ctx: ApiContext) {
    ctx.res.status = 200
    ctx.res.setBodyText("""{"ok":true}""")
}
