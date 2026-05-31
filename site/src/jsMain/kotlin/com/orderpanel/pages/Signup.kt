package com.orderpanel.pages

import androidx.compose.runtime.*
import com.orderpanel.firebase.GoogleAuthProvider
import com.orderpanel.firebase.createUserWithEmailAndPassword
import com.orderpanel.firebase.firebaseAuthError
import com.orderpanel.firebase.getFirebaseAuth
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

private const val SBG    = "#0a0916"
private const val SS     = "#14132b"
private const val SB     = "rgba(99,102,241,0.22)"
private const val ST     = "#e8e5ff"
private const val SSUB   = "#8b84c4"
private const val SGRAD  = "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
private const val SGREEN = "#10b981"

@Page
@Composable
fun SignupPage() {
    LaunchedEffect(Unit) {
        val style = document.createElement("style")
        style.textContent = """
            @keyframes signupCardIn {
                from { opacity: 0; transform: translateY(28px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes signupBlobFloat {
                0%, 100% { transform: translate(0, 0) scale(1); }
                33%       { transform: translate(-20px, 15px) scale(1.04); }
                66%       { transform: translate(10px, -10px) scale(0.97); }
            }
            .signup-input {
                width: 100%;
                background: rgba(99,102,241,0.06);
                border: 1.5px solid rgba(99,102,241,0.22);
                border-radius: 10px;
                padding: 12px 16px;
                color: #e8e5ff;
                font-size: 15px;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
                box-sizing: border-box;
            }
            .signup-input::placeholder { color: #8b84c4; }
            .signup-input:focus {
                border-color: #6366f1;
                box-shadow: 0 0 0 3px rgba(99,102,241,0.18);
            }
            .signup-btn {
                width: 100%;
                padding: 13px;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                border: none;
                border-radius: 10px;
                color: #fff;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s, transform 0.15s;
            }
            .signup-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
            .signup-btn:active:not(:disabled) { transform: translateY(0); }
            .signup-btn:disabled { opacity: 0.55; cursor: not-allowed; }
            .signup-google-btn {
                width: 100%;
                padding: 12px;
                background: rgba(99,102,241,0.08);
                border: 1.5px solid rgba(99,102,241,0.22);
                border-radius: 10px;
                color: #e8e5ff;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .signup-google-btn:hover:not(:disabled) {
                background: rgba(99,102,241,0.16);
                border-color: rgba(99,102,241,0.4);
            }
            .signup-google-btn:disabled { opacity: 0.55; cursor: not-allowed; }
            .signup-link {
                color: #6366f1;
                cursor: pointer;
                text-decoration: none;
            }
            .signup-link:hover { text-decoration: underline; }
            .plan-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: rgba(16,185,129,0.12);
                border: 1px solid rgba(16,185,129,0.3);
                border-radius: 20px;
                padding: 4px 12px;
                font-size: 12px;
                font-weight: 600;
                color: #10b981;
                margin-bottom: 20px;
            }
            .terms-text {
                font-size: 12px;
                color: #8b84c4;
                text-align: center;
                line-height: 1.6;
                margin-top: 16px;
            }
            .terms-text a { color: #6366f1; text-decoration: none; }
            .terms-text a:hover { text-decoration: underline; }
        """.trimIndent()
        document.head?.appendChild(style)
    }

    val s = remember { getStrings() }
    var name      by remember { mutableStateOf("") }
    var email     by remember { mutableStateOf("") }
    var password  by remember { mutableStateOf("") }
    var confirm   by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var errorMsg  by remember { mutableStateOf("") }

    val ctx = rememberPageContext()

    fun handleEmailSignUp() {
        errorMsg = ""
        if (name.isBlank() || email.isBlank() || password.isBlank()) {
            errorMsg = s.sigValidationFillAll
            return
        }
        if (password != confirm) {
            errorMsg = s.sigValidationPasswordMatch
            return
        }
        if (password.length < 6) {
            errorMsg = s.sigValidationPasswordLength
            return
        }
        isLoading = true
        createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
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

    fun handleGoogleSignUp() {
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
            background(SBG)
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
                property("top", "-80px"); property("right", "-100px")
                property("width", "500px"); property("height", "500px")
                property("border-radius", "50%")
                background("radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%)")
                property("animation", "signupBlobFloat 10s ease-in-out infinite")
                property("pointer-events", "none")
            }
        }) {}
        Div({
            style {
                position(Position.Absolute)
                property("bottom", "-60px"); property("left", "-80px")
                property("width", "420px"); property("height", "420px")
                property("border-radius", "50%")
                background("radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)")
                property("animation", "signupBlobFloat 14s ease-in-out infinite reverse")
                property("pointer-events", "none")
            }
        }) {}

        // Card
        Div({
            style {
                width(460.px); property("max-width", "100%")
                background(SS)
                property("border", "1.5px solid $SB")
                property("border-radius", "20px"); property("padding", "40px 36px")
                property("box-shadow", "0 24px 64px rgba(0,0,0,0.45)")
                property("animation", "signupCardIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both")
                position(Position.Relative); property("z-index", "1")
            }
        }) {
            // Logo
            Div({
                style {
                    display(DisplayStyle.Flex); alignItems(AlignItems.Center)
                    property("gap", "10px"); property("margin-bottom", "24px")
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
                Span({ style { property("font-size", "20px"); property("font-weight", "700"); color(ST) } }) {
                    Text("SellerScope")
                }
            }

            // Free plan badge
            Div({ classes("plan-badge") }) { Text(s.sigFreePlanBadge) }

            H2({ style { color(ST); property("font-size", "22px"); property("font-weight", "700"); property("margin-bottom", "6px") } }) {
                Text(s.sigHeading)
            }
            P({ style { color(SSUB); property("font-size", "14px"); property("margin-bottom", "24px") } }) {
                Text(s.sigSubtext)
            }

            // Google button
            Button({
                classes("signup-google-btn")
                if (isLoading) attr("disabled", "")
                onClick { handleGoogleSignUp() }
            }) {
                Span { Text("G") }
                Text(s.sigGoogleBtn)
            }

            // Divider
            Div({
                style {
                    display(DisplayStyle.Flex); alignItems(AlignItems.Center)
                    property("gap", "12px"); property("margin", "18px 0")
                }
            }) {
                Div({ style { flex(1); height(1.px); background(SB) } }) {}
                Span({ style { color(SSUB); property("font-size", "12px"); property("white-space", "nowrap") } }) {
                    Text(s.sigDivider)
                }
                Div({ style { flex(1); height(1.px); background(SB) } }) {}
            }

            // Name
            Div({ style { property("margin-bottom", "14px") } }) {
                Label(forId = "signup-name") {
                    Span({ style { display(DisplayStyle.Block); color(SSUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.sigNameLabel)
                    }
                }
                Input(type = InputType.Text) {
                    id("signup-name"); classes("signup-input")
                    placeholder(s.sigNamePlaceholder)
                    value(name); onInput { name = it.value }
                }
            }

            // Email
            Div({ style { property("margin-bottom", "14px") } }) {
                Label(forId = "signup-email") {
                    Span({ style { display(DisplayStyle.Block); color(SSUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.sigEmailLabel)
                    }
                }
                Input(type = InputType.Email) {
                    id("signup-email"); classes("signup-input")
                    placeholder(s.sigEmailPlaceholder)
                    value(email); onInput { email = it.value }
                }
            }

            // Password
            Div({ style { property("margin-bottom", "14px") } }) {
                Label(forId = "signup-password") {
                    Span({ style { display(DisplayStyle.Block); color(SSUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.sigPasswordLabel)
                    }
                }
                Input(type = InputType.Password) {
                    id("signup-password"); classes("signup-input")
                    placeholder(s.sigPasswordPlaceholder)
                    value(password); onInput { password = it.value }
                }
            }

            // Confirm password
            Div({ style { property("margin-bottom", "24px") } }) {
                Label(forId = "signup-confirm") {
                    Span({ style { display(DisplayStyle.Block); color(SSUB); property("font-size", "13px"); property("font-weight", "500"); property("margin-bottom", "6px") } }) {
                        Text(s.sigConfirmLabel)
                    }
                }
                Input(type = InputType.Password) {
                    id("signup-confirm"); classes("signup-input")
                    placeholder(s.sigConfirmPlaceholder)
                    value(confirm); onInput { confirm = it.value }
                    onKeyUp { if (it.key == "Enter") handleEmailSignUp() }
                }
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

            // Create account button
            Button({
                classes("signup-btn")
                if (isLoading) attr("disabled", "")
                onClick { handleEmailSignUp() }
            }) { Text(if (isLoading) s.sigSubmitLoading else s.sigSubmit) }

            // Terms
            Div({ classes("terms-text") }) {
                Text(s.sigTermsPre)
                A(href = "#") { Text(s.sigTermsLink) }
                Text(s.sigTermsAnd)
                A(href = "#") { Text(s.sigPrivacyLink) }
                Text(s.sigTermsPost)
            }

            // Login link
            Div({
                style {
                    display(DisplayStyle.Flex); justifyContent(JustifyContent.Center)
                    property("gap", "6px"); property("margin-top", "20px"); property("font-size", "14px")
                }
            }) {
                Span({ style { color(SSUB) } }) { Text(s.sigHasAccount) }
                A(href = "/login") { Span({ classes("signup-link") }) { Text(s.sigLoginLink) } }
            }
        }
    }
}
