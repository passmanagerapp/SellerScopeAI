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
        // Global CSS: smooth scroll + Inter font
        val style = document.createElement("style")
        style.textContent = """
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; }
            body { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
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
