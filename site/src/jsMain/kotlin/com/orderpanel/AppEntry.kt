package com.orderpanel

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import com.varabyte.kobweb.core.App
import com.varabyte.kobweb.silk.SilkApp
import com.varabyte.kobweb.silk.components.layout.Surface
import com.varabyte.kobweb.silk.style.common.SmoothColorStyle
import com.varabyte.kobweb.silk.style.toModifier
import kotlinx.browser.document
import org.jetbrains.compose.web.css.vh
import com.varabyte.kobweb.compose.ui.modifiers.fillMaxWidth
import com.varabyte.kobweb.compose.ui.modifiers.minHeight
import com.varabyte.kobweb.compose.ui.styleModifier
import com.orderpanel.firebase.initFirebase

@App
@Composable
fun AppEntry(content: @Composable () -> Unit) {
    remember { initFirebase() }

    LaunchedEffect(Unit) {
        // Load Gelasio from Google Fonts
        val preconnect1 = document.createElement("link")
        preconnect1.asDynamic().rel  = "preconnect"
        preconnect1.asDynamic().href = "https://fonts.googleapis.com"
        document.head?.appendChild(preconnect1)

        val preconnect2 = document.createElement("link")
        preconnect2.asDynamic().rel          = "preconnect"
        preconnect2.asDynamic().href         = "https://fonts.gstatic.com"
        preconnect2.asDynamic().crossOrigin  = ""
        document.head?.appendChild(preconnect2)

        val fontLink = document.createElement("link")
        fontLink.asDynamic().rel  = "stylesheet"
        fontLink.asDynamic().href = "https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        document.head?.appendChild(fontLink)

        // Global CSS: smooth scroll + Gelasio font
        val style = document.createElement("style")
        style.textContent = """
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; }
            body { font-family: 'Gelasio', Georgia, serif; }
            a { text-decoration: none; color: inherit; }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(24px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInLeft {
                from { opacity: 0; transform: translateX(-20px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0.6; }
            }
            @keyframes gradientShift {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50%       { transform: translateY(-8px); }
            }
        """.trimIndent()
        document.head?.appendChild(style)
    }

    SilkApp {
        Surface(SmoothColorStyle.toModifier().minHeight(100.vh).fillMaxWidth()
            .styleModifier { property("justify-items", "stretch") }) {
            content()
        }
    }
}
