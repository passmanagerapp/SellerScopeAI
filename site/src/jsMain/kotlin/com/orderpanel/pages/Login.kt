package com.orderpanel.pages

import androidx.compose.runtime.*
import com.orderpanel.firebase.GoogleAuthProvider
import com.orderpanel.firebase.firebaseAuthError
import com.orderpanel.firebase.getFirebaseAuth
import com.orderpanel.firebase.signInWithEmailAndPassword
import com.orderpanel.firebase.signInWithPopup
import com.orderpanel.strings.getStrings
import com.varabyte.kobweb.compose.css.color
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.core.rememberPageContext
import kotlinx.browser.document
import org.jetbrains.compose.web.attributes.InputType
import org.jetbrains.compose.web.attributes.placeholder
import org.jetbrains.compose.web.css.*
import org.jetbrains.compose.web.dom.*

private const val BG         = "#0d0d0d"
private const val SURFACE    = "#1a1a1a"
private const val BORDER     = "rgba(255,255,255,0.14)"
private const val BORDER_MID = "rgba(255,255,255,0.22)"
private const val TEXT       = "#f0f0f0"
private const val SUB        = "#9ca3af"
private const val ACCENT     = "#d1d5db"
private const val GRAD       = "linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%)"

@Page
@Composable
fun LoginPage() {
    LaunchedEffect(Unit) {
        val style = document.createElement("style")
        style.textContent = """
            @keyframes loginCardIn {
                from { opacity: 0; transform: translateY(28px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes blobFloat {
                0%, 100% { transform: translate(0, 0) scale(1); }
                33%       { transform: translate(20px, -15px) scale(1.04); }
                66%       { transform: translate(-10px, 10px) scale(0.97); }
            }
            .login-input {
                width: 100%;
                background: rgba(255,255,255,0.05);
                border: 1.5px solid rgba(255,255,255,0.14);
                border-radius: 10px;
                padding: 12px 16px;
                color: #f0f0f0;
                font-size: 15px;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
                box-sizing: border-box;
            }
            .login-input::placeholder { color: #9ca3af; }
            .login-input:focus {
                border-color: #d1d5db;
                box-shadow: 0 0 0 3px rgba(255,255,255,0.12);
            }
            .login-btn {
                width: 100%;
                padding: 13px;
                background: linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%);
                border: none;
                border-radius: 10px;
                color: #fff;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s, transform 0.15s;
            }
            .login-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
            .login-btn:active:not(:disabled) { transform: translateY(0); }
            .login-btn:disabled { opacity: 0.55; cursor: not-allowed; }
            .login-google-btn {
                width: 100%;
                padding: 12px;
                background: rgba(255,255,255,0.06);
                border: 1.5px solid rgba(255,255,255,0.14);
                border-radius: 10px;
                color: #f0f0f0;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .login-google-btn:hover:not(:disabled) {
                background: rgba(255,255,255,0.10);
                border-color: rgba(255,255,255,0.22);
            }
            .login-google-btn:disabled { opacity: 0.55; cursor: not-allowed; }
            .login-link {
                color: #d1d5db;
                cursor: pointer;
                text-decoration: none;
            }
            .login-link:hover { text-decoration: underline; }
            .forgot-link {
                color: #9ca3af;
                font-size: 13px;
                cursor: pointer;
                text-decoration: none;
            }
            .forgot-link:hover { color: #d1d5db; }
        """.trimIndent()
        document.head?.appendChild(style)
    }

    val s = remember { getStrings() }
    var email       by remember { mutableStateOf("") }
    var password    by remember { mutableStateOf("") }
    var isLoading   by remember { mutableStateOf(false) }
    var errorMsg    by remember { mutableStateOf("") }

    val ctx = rememberPageContext()

    fun handleEmailSignIn() {
        if (email.isBlank() || password.isBlank()) {
            errorMsg = s.logValidationEmailPassword
            return
        }
        isLoading = true
        errorMsg = ""
        signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .then { _: dynamic ->
                ctx.router.navigateTo("/admin")
                null
            }
            .catch { err: dynamic ->
                errorMsg = firebaseAuthError(err.code?.toString())
                isLoading = false
                null
            }
    }

    fun handleGoogleSignIn() {
        isLoading = true
        errorMsg = ""
        val provider: dynamic = GoogleAuthProvider()
        signInWithPopup(getFirebaseAuth(), provider)
            .then { _: dynamic ->
                ctx.router.navigateTo("/admin")
                null
            }
            .catch { err: dynamic ->
                val msg = firebaseAuthError(err.code?.toString())
                if (msg.isNotEmpty()) errorMsg = msg
                isLoading = false
                null
            }
    }

    Div({
        style {
            minHeight(100.vh)
            background(BG)
            display(DisplayStyle.Flex)
            alignItems(AlignItems.Center)
            justifyContent(JustifyContent.Center)
            position(Position.Relative)
            overflow("hidden")
            property("padding", "24px 16px")
        }
    }) {
        // Glow blobs
        Div({
            style {
                position(Position.Absolute)
                property("top", "-120px"); property("left", "-80px")
                property("width", "480px"); property("height", "480px")
                property("border-radius", "50%")
                background("radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)")
                property("animation", "blobFloat 9s ease-in-out infinite")
                property("pointer-events", "none")
            }
        }) {}
        Div({
            style {
                position(Position.Absolute)
                property("bottom", "-100px"); property("right", "-60px")
                property("width", "380px"); property("height", "380px")
                property("border-radius", "50%")
                background("radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)")
                property("animation", "blobFloat 12s ease-in-out infinite reverse")
                property("pointer-events", "none")
            }
        }) {}

        // Card
        Div({
            style {
                width(440.px); property("max-width", "100%")
                background(SURFACE)
                property("border", "1.5px solid $BORDER")
                property("border-radius", "20px"); property("padding", "40px 36px")
                property("box-shadow", "0 24px 64px rgba(0,0,0,0.45)")
                property("animation", "loginCardIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both")
                position(Position.Relative); property("z-index", "1")
            }
        }) {
            // Logo
            Div({
                style {
                    display(DisplayStyle.Flex); alignItems(AlignItems.Center)
                    property("gap", "10px"); property("margin-bottom", "32px")
                }
            }) {
                Img(src = "/app.png") {
                    style {
                        property("width", "36px"); property("height", "36px")
                        property("border-radius", "10px")
                        property("object-fit", "cover")
                    }
                    attr("alt", "SellerScope")
                }
                Span({ style { property("font-size", "20px"); property("font-weight", "700"); color(TEXT) } }) {
                    Text("SellerScope")
                }
            }

            // Heading
            H2({ style { color(TEXT); property("font-size", "24px"); property("font-weight", "700"); property("margin-bottom", "6px") } }) {
                Text(s.logHeading)
            }
            P({ style { color(SUB); property("font-size", "14px"); property("margin-bottom", "28px") } }) {
                Text(s.logSubtext)
            }

            // Google button
            Button({
                classes("login-google-btn")
                if (isLoading) attr("disabled", "")
                onClick { handleGoogleSignIn() }
            }) {
                Span { Text("G") }
                Text(s.logGoogleBtn)
            }

            // Divider
            Div({
                style {
                    display(DisplayStyle.Flex); alignItems(AlignItems.Center)
                    property("gap", "12px"); property("margin", "20px 0")
                }
            }) {
                Div({ style { flex(1); height(1.px); background(BORDER) } }) {}
                Span({ style { color(SUB); property("font-size", "12px"); property("white-space", "nowrap") } }) {
                    Text(s.logDivider)
                }
                Div({ style { flex(1); height(1.px); background(BORDER) } }) {}
            }

            // Email
            Div({ style { property("margin-bottom", "16px") } }) {
                Label(forId = "login-email") {
                    Span({ style { display(DisplayStyle.Block); color(SUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.logEmailLabel)
                    }
                }
                Input(type = InputType.Email) {
                    id("login-email"); classes("login-input")
                    placeholder(s.logEmailPlaceholder)
                    value(email); onInput { email = it.value }
                    onKeyUp { if (it.key == "Enter") handleEmailSignIn() }
                }
            }

            // Password
            Div({ style { property("margin-bottom", "8px") } }) {
                Label(forId = "login-password") {
                    Span({ style { display(DisplayStyle.Block); color(SUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.logPasswordLabel)
                    }
                }
                Input(type = InputType.Password) {
                    id("login-password"); classes("login-input")
                    placeholder(s.logPasswordPlaceholder)
                    value(password); onInput { password = it.value }
                    onKeyUp { if (it.key == "Enter") handleEmailSignIn() }
                }
            }

            // Forgot password
            Div({
                style {
                    display(DisplayStyle.Flex); justifyContent(JustifyContent.FlexEnd)
                    property("margin-bottom", "24px")
                }
            }) {
                A(href = "#") { Span({ classes("forgot-link") }) { Text(s.logForgot) } }
            }

            // Error message
            if (errorMsg.isNotEmpty()) {
                Div({
                    style {
                        property("color", "#ef4444")
                        property("font-size", "13px")
                        property("text-align", "center")
                        property("margin-bottom", "14px")
                        property("padding", "10px 14px")
                        property("background", "rgba(239,68,68,0.08)")
                        property("border", "1px solid rgba(239,68,68,0.25)")
                        property("border-radius", "8px")
                    }
                }) { Text(errorMsg) }
            }

            // Sign in button
            Button({
                classes("login-btn")
                if (isLoading) attr("disabled", "")
                onClick { handleEmailSignIn() }
            }) { Text(if (isLoading) s.logSubmitLoading else s.logSubmit) }

            // Sign up link
            Div({
                style {
                    display(DisplayStyle.Flex); justifyContent(JustifyContent.Center)
                    property("gap", "6px"); property("margin-top", "24px"); property("font-size", "14px")
                }
            }) {
                Span({ style { color(SUB) } }) { Text(s.logNoAccount) }
                A(href = "/signup") { Span({ classes("login-link") }) { Text(s.logSignupLink) } }
            }
        }
    }
}
