package com.orderpanel.pages.admin

import androidx.compose.runtime.*
import com.orderpanel.api.ServerResponse
import com.orderpanel.api.serverCall
import com.orderpanel.strings.tr
import kotlinx.browser.window
import kotlinx.coroutines.launch
import org.jetbrains.compose.web.attributes.InputType
import org.jetbrains.compose.web.attributes.disabled
import org.jetbrains.compose.web.dom.*

private data class ShipEntegraStatus(val connected: Boolean, val clientIdHint: String, val updatedAt: String)

private fun parseShipEntegraStatus(res: ServerResponse): ShipEntegraStatus? = runCatching {
    val se = JSON.parse<dynamic>(res.body).shipEntegra
    ShipEntegraStatus(
        connected = se.connected as Boolean,
        clientIdHint = (se.clientIdHint as? String) ?: "",
        updatedAt = (se.updatedAt as? String) ?: "",
    )
}.getOrNull()

/** User-facing message for a failed integrations call. */
private fun integrationError(res: ServerResponse): String = when {
    res.status == 0 || res.status == 404 -> tr("admin_integrations_err_network")
    res.errorCode == "invalid_credentials" -> tr("admin_integrations_err_invalid")
    res.errorCode == "upstream_unavailable" -> tr("admin_integrations_err_upstream")
    res.errorCode == "server_not_configured" -> tr("admin_integrations_err_server")
    res.status == 401 -> tr("admin_integrations_err_auth")
    else -> "${tr("admin_integrations_err_server")} (HTTP ${res.status})"
}

/**
 * Settings card: connect the seller's own ShipEntegra account (ADR-0005). The client secret goes to
 * `/api/integrations-save`, which checks it against ShipEntegra and stores it encrypted server-side; it is
 * never read back into the browser — the card only shows a masked client id.
 */
@Composable
fun ShipEntegraConnectionCard() {
    val scope = rememberCoroutineScope()
    var status by remember { mutableStateOf<ShipEntegraStatus?>(null) }
    var loadFailed by remember { mutableStateOf("") }
    var clientId by remember { mutableStateOf("") }
    var clientSecret by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf("") }
    var messageIsError by remember { mutableStateOf(false) }

    suspend fun reload() {
        val res = serverCall("integrations-status")
        if (res.ok) { status = parseShipEntegraStatus(res); loadFailed = "" }
        else loadFailed = integrationError(res)
    }

    LaunchedEffect(Unit) { reload() }

    fun connect() {
        if (busy) return
        if (clientId.isBlank() || clientSecret.isBlank()) {
            message = tr("admin_integrations_err_required"); messageIsError = true; return
        }
        busy = true; message = ""
        scope.launch {
            val body = """{"integration":"shipentegra","clientId":${JSON.stringify(clientId.trim())},""" +
                """"clientSecret":${JSON.stringify(clientSecret.trim())}}"""
            val res = serverCall("integrations-save", "POST", body)
            if (res.ok) {
                clientSecret = ""; clientId = ""
                message = tr("admin_integrations_saved"); messageIsError = false
                reload()
            } else {
                message = integrationError(res); messageIsError = true
            }
            busy = false
        }
    }

    fun disconnect() {
        if (busy || !window.confirm(tr("admin_integrations_disconnect_confirm"))) return
        busy = true; message = ""
        scope.launch {
            val res = serverCall("integrations-delete", "POST", """{"integration":"shipentegra"}""")
            if (res.ok) { message = tr("admin_integrations_disconnected_msg"); messageIsError = false; reload() }
            else { message = integrationError(res); messageIsError = true }
            busy = false
        }
    }

    Div({
        style {
            property("background", ADM_SURFACE); property("border-radius", "12px")
            property("border", "1px solid $ADM_BORDER"); property("overflow", "hidden")
            property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
        }
    }) {
        Div({
            style {
                property("padding", "14px 20px"); property("border-bottom", "1px solid $ADM_BORDER")
                property("background", "rgba(255,255,255,0.05)")
            }
        }) {
            Div({
                style {
                    property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em")
                    property("text-transform", "uppercase"); property("color", ADM_SUB)
                }
            }) { Text(tr("admin_integrations_shipentegra_title")) }
        }

        Div({
            style {
                property("padding", "18px 20px"); property("display", "flex")
                property("flex-direction", "column"); property("gap", "14px")
            }
        }) {
            // Status line
            val st = status
            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px"); property("font-size", "14px") } }) {
                val color = when {
                    loadFailed.isNotEmpty() -> ADM_RED
                    st == null -> ADM_SUB
                    st.connected -> ADM_GREEN
                    else -> ADM_AMBER
                }
                Span({
                    style {
                        property("width", "8px"); property("height", "8px"); property("border-radius", "50%")
                        property("background", color); property("flex-shrink", "0")
                    }
                })
                Span({ style { property("color", ADM_TEXT) } }) {
                    Text(
                        when {
                            loadFailed.isNotEmpty() -> loadFailed
                            st == null -> tr("admin_integrations_status_loading")
                            st.connected -> "${tr("admin_integrations_status_connected")} · ${st.clientIdHint}"
                            else -> tr("admin_integrations_status_disconnected")
                        }
                    )
                }
            }
            if (st?.connected == true && st.updatedAt.isNotEmpty()) {
                Div({ style { property("font-size", "12px"); property("color", ADM_SUB) } }) {
                    Text("${tr("admin_integrations_updated_at")}: ${st.updatedAt}")
                }
            }

            Div({ style { property("font-size", "13px"); property("color", ADM_SUB); property("line-height", "1.5") } }) {
                Text(tr("admin_integrations_shipentegra_desc"))
            }

            Div({
                style {
                    property("display", "grid"); property("grid-template-columns", "repeat(auto-fit, minmax(200px, 1fr))")
                    property("gap", "10px")
                }
            }) {
                CredentialInput(tr("admin_integrations_client_id"), clientId, InputType.Text) { clientId = it }
                CredentialInput(
                    tr("admin_integrations_client_secret"), clientSecret, InputType.Password,
                    placeholder = if (st?.connected == true) tr("admin_integrations_client_secret_keep") else "",
                ) { clientSecret = it }
            }

            Div({ style { property("display", "flex"); property("gap", "10px"); property("flex-wrap", "wrap"); property("align-items", "center") } }) {
                Button({
                    if (busy) disabled()
                    style {
                        property("background", if (busy) "#6b7280" else ADM_GREEN); property("color", "white")
                        property("border", "none"); property("border-radius", "8px"); property("padding", "8px 16px")
                        property("font-size", "13px"); property("font-weight", "600"); property("font-family", "inherit")
                        property("cursor", if (busy) "not-allowed" else "pointer")
                    }
                    onClick { connect() }
                }) {
                    Text(
                        when {
                            busy -> tr("admin_integrations_saving")
                            st?.connected == true -> tr("admin_integrations_update")
                            else -> tr("admin_integrations_connect")
                        }
                    )
                }
                if (st?.connected == true) {
                    Button({
                        if (busy) disabled()
                        style {
                            property("background", "transparent"); property("color", ADM_RED)
                            property("border", "1px solid rgba(239,68,68,0.4)"); property("border-radius", "8px")
                            property("padding", "8px 16px"); property("font-size", "13px"); property("font-weight", "600")
                            property("font-family", "inherit"); property("cursor", if (busy) "not-allowed" else "pointer")
                        }
                        onClick { disconnect() }
                    }) { Text(tr("admin_integrations_disconnect")) }
                }
                if (message.isNotEmpty()) {
                    Span({ style { property("font-size", "13px"); property("color", if (messageIsError) ADM_RED else ADM_GREEN) } }) {
                        Text(message)
                    }
                }
            }
        }
    }
}

@Composable
private fun CredentialInput(
    label: String,
    value: String,
    type: InputType<String>,
    placeholder: String = "",
    onChange: (String) -> Unit,
) {
    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
        Label(attrs = { style { property("font-size", "12px"); property("color", ADM_SUB); property("font-weight", "600") } }) {
            Text(label)
        }
        Input(type) {
            value(value)
            if (placeholder.isNotEmpty()) attr("placeholder", placeholder)
            attr("autocomplete", "off")
            attr("spellcheck", "false")
            onInput { onChange(it.value) }
            style {
                property("background", ADM_INPUT_BG); property("color", ADM_TEXT)
                property("border", "1px solid $ADM_BORDER"); property("border-radius", "8px")
                property("padding", "9px 12px"); property("font-size", "13px"); property("font-family", "inherit")
                property("outline", "none")
            }
        }
    }
}
