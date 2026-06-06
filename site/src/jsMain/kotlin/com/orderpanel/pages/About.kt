package com.orderpanel.pages

import androidx.compose.runtime.*
import com.orderpanel.strings.getStrings
import com.varabyte.kobweb.compose.css.color
import com.varabyte.kobweb.core.Page
import kotlinx.browser.document
import org.jetbrains.compose.web.css.*
import org.jetbrains.compose.web.dom.*

private const val ABG       = "#0d0d0d"
private const val ASURFACE  = "#1a1a1a"
private const val ASURFACE2 = "#262626"
private const val ABORDER   = "rgba(255,255,255,0.14)"
private const val ATEXT     = "#f0f0f0"
private const val ASUB      = "#9ca3af"
private const val AACCENT   = "#d1d5db"
private const val AACCENT2  = "#6b7280"
private const val AGRAD     = "linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%)"
private const val AGREEN    = "#10b981"
private const val AAMBER    = "#f59e0b"

@Page
@Composable
fun AboutPage() {
    val s = remember { getStrings() }

    LaunchedEffect(Unit) {
        val style = document.createElement("style")
        style.textContent = """
            @keyframes aboutFadeUp {
                from { opacity: 0; transform: translateY(24px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes aboutBlobDrift {
                0%, 100% { transform: translate(0, 0) scale(1); }
                40%       { transform: translate(30px, -20px) scale(1.05); }
                80%       { transform: translate(-15px, 12px) scale(0.97); }
            }
            @keyframes valueCardIn {
                from { opacity: 0; transform: translateY(20px) scale(0.96); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .about-nav-link {
                color: #9ca3af;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                padding: 6px 14px;
                border-radius: 8px;
                transition: color 0.2s, background 0.2s;
            }
            .about-nav-link:hover { color: #f0f0f0; background: rgba(255,255,255,0.07); }
            .about-cta-btn {
                padding: 10px 22px;
                background: linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%);
                border: none;
                border-radius: 10px;
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                transition: opacity 0.2s, transform 0.15s;
                display: inline-block;
            }
            .about-cta-btn:hover { opacity: 0.87; transform: translateY(-1px); }
            .value-card {
                background: #1a1a1a;
                border: 1.5px solid rgba(255,255,255,0.14);
                border-radius: 16px;
                padding: 28px 24px;
                transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
            }
            .value-card:hover {
                border-color: rgba(255,255,255,0.28);
                box-shadow: 0 8px 32px rgba(255,255,255,0.09);
                transform: translateY(-4px);
            }
            .team-card {
                background: #262626;
                border: 1.5px solid rgba(255,255,255,0.12);
                border-radius: 16px;
                padding: 28px 24px;
                text-align: center;
                transition: border-color 0.25s, transform 0.25s;
            }
            .team-card:hover {
                border-color: rgba(255,255,255,0.22);
                transform: translateY(-4px);
            }
            .stat-pill {
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 12px;
                padding: 20px 28px;
                text-align: center;
            }
        """.trimIndent()
        document.head?.appendChild(style)
    }

    Div({
        style {
            minHeight(100.vh)
            background(ABG)
            color(ATEXT)
            property("font-family", "'Gelasio', Georgia, serif")
        }
    }) {
        // Navbar
        Div({
            style {
                position(Position.Sticky)
                property("top", "0")
                property("z-index", "100")
                property("backdrop-filter", "blur(16px)")
                background("rgba(0,0,0,0.85)")
                property("border-bottom", "1px solid $ABORDER")
            }
        }) {
            Div({
                style {
                    property("max-width", "1100px")
                    property("margin", "0 auto")
                    property("padding", "0 24px")
                    display(DisplayStyle.Flex)
                    alignItems(AlignItems.Center)
                    justifyContent(JustifyContent.SpaceBetween)
                    property("height", "64px")
                }
            }) {
                // Brand
                A(href = "/") {
                    Div({
                        style {
                            display(DisplayStyle.Flex)
                            alignItems(AlignItems.Center)
                            property("gap", "8px")
                            property("text-decoration", "none")
                        }
                    }) {
                        Img(src = "/app.png") {
                            style {
                                property("width", "30px")
                                property("height", "30px")
                                property("border-radius", "8px")
                                property("object-fit", "cover")
                            }
                            attr("alt", "SellerScope")
                        }
                        Span({
                            style {
                                property("font-size", "17px")
                                property("font-weight", "700")
                                color(ATEXT)
                            }
                        }) { Text(s.brand) }
                    }
                }
                // Nav links
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        alignItems(AlignItems.Center)
                        property("gap", "4px")
                    }
                }) {
                    A(href = "/", attrs = { classes("about-nav-link") }) { Text(s.navHome) }
                    A(href = "/about", attrs = { classes("about-nav-link") }) {
                        Span({ style { color(AACCENT) } }) { Text(s.navAboutUs) }
                    }
                    A(href = "/login", attrs = { classes("about-nav-link") }) { Text(s.navLogin) }
                    A(href = "/signup", attrs = { classes("about-cta-btn"); style { marginLeft(8.px) } }) { Text(s.navGetStarted) }
                }
            }
        }

        // Hero
        Div({
            style {
                position(Position.Relative)
                overflow("hidden")
                property("padding", "96px 24px 80px")
                property("text-align", "center")
            }
        }) {
            // Background blobs
            Div({
                style {
                    position(Position.Absolute)
                    property("top", "-100px")
                    property("left", "50%")
                    property("transform", "translateX(-50%)")
                    property("width", "600px")
                    property("height", "400px")
                    property("border-radius", "50%")
                    background("radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)")
                    property("animation", "aboutBlobDrift 12s ease-in-out infinite")
                    property("pointer-events", "none")
                }
            }) {}

            Div({
                style {
                    property("max-width", "720px")
                    property("margin", "0 auto")
                    position(Position.Relative)
                    property("z-index", "1")
                    property("animation", "aboutFadeUp 0.55s ease both")
                }
            }) {
                // Label
                Div({
                    style {
                        display(DisplayStyle.LegacyInlineFlex)
                        alignItems(AlignItems.Center)
                        property("gap", "6px")
                        background("rgba(255,255,255,0.07)")
                        property("border", "1px solid rgba(255,255,255,0.18)")
                        property("border-radius", "20px")
                        property("padding", "5px 14px")
                        property("font-size", "12px")
                        property("font-weight", "600")
                        color(AACCENT)
                        property("letter-spacing", "0.08em")
                        property("text-transform", "uppercase")
                        property("margin-bottom", "24px")
                    }
                }) { Text(s.heroLabel) }

                H1({
                    style {
                        property("font-size", "clamp(2rem, 5vw, 3.4rem)")
                        property("font-weight", "800")
                        property("line-height", "1.15")
                        property("margin-bottom", "20px")
                        color(ATEXT)
                    }
                }) {
                    Text(s.heroHeadlinePre)
                    Span({
                        style {
                            property("background", AGRAD)
                            property("-webkit-background-clip", "text")
                            property("-webkit-text-fill-color", "transparent")
                            property("background-clip", "text")
                        }
                    }) { Text(s.heroHeadlineHighlight) }
                }

                P({
                    style {
                        property("font-size", "18px")
                        color(ASUB)
                        property("line-height", "1.7")
                        property("max-width", "580px")
                        property("margin", "0 auto")
                    }
                }) {
                    Text(s.heroBody)
                }
            }
        }

        // Stats strip
        Div({
            style {
                property("max-width", "1100px")
                property("margin", "0 auto 80px")
                property("padding", "0 24px")
                display(DisplayStyle.Grid)
                property("grid-template-columns", "repeat(auto-fit, minmax(180px, 1fr))")
                property("gap", "16px")
                property("animation", "aboutFadeUp 0.55s ease 0.15s both")
            }
        }) {
            data class Stat(val value: String, val label: String, val color: String)
            val stats = listOf(
                Stat(s.stat1Value, s.stat1Label, AACCENT),
                Stat(s.stat2Value, s.stat2Label, AACCENT2),
                Stat(s.stat3Value, s.stat3Label, AGREEN),
                Stat(s.stat4Value, s.stat4Label, AAMBER),
            )
            stats.forEach { stat ->
                Div({ classes("stat-pill") }) {
                    Div({
                        style {
                            property("font-size", "28px")
                            property("font-weight", "800")
                            color(stat.color)
                            property("margin-bottom", "4px")
                        }
                    }) { Text(stat.value) }
                    Div({ style { color(ASUB); property("font-size", "13px") } }) { Text(stat.label) }
                }
            }
        }

        // Mission
        Div({
            style {
                property("max-width", "1100px")
                property("margin", "0 auto 80px")
                property("padding", "0 24px")
                display(DisplayStyle.Grid)
                property("grid-template-columns", "1fr 1fr")
                property("gap", "48px")
                alignItems(AlignItems.Center)
                property("animation", "aboutFadeUp 0.55s ease 0.2s both")
            }
        }) {
            Div {
                Div({
                    style {
                        property("font-size", "11px")
                        property("font-weight", "700")
                        property("letter-spacing", "0.12em")
                        property("text-transform", "uppercase")
                        color(AACCENT)
                        property("margin-bottom", "12px")
                    }
                }) { Text(s.missionLabel) }
                H2({
                    style {
                        property("font-size", "clamp(1.5rem, 3vw, 2.2rem)")
                        property("font-weight", "800")
                        property("line-height", "1.25")
                        color(ATEXT)
                        property("margin-bottom", "16px")
                    }
                }) { Text(s.missionTitle) }
                P({
                    style {
                        color(ASUB)
                        property("line-height", "1.75")
                        property("font-size", "15px")
                        property("margin-bottom", "16px")
                    }
                }) {
                    Text(s.missionBody1Pre)
                    Span({
                        style {
                            property("background", AGRAD)
                            property("-webkit-background-clip", "text")
                            property("-webkit-text-fill-color", "transparent")
                            property("background-clip", "text")
                            property("font-weight", "700")
                        }
                    }) { Text(s.missionBody1Highlight) }
                    Text(s.missionBody1Post)
                }
                P({
                    style {
                        color(ASUB)
                        property("line-height", "1.75")
                        property("font-size", "15px")
                    }
                }) {
                    Text(s.missionBody2)
                }
            }
            // Visual card
            Div({
                style {
                    background(ASURFACE)
                    property("border", "1.5px solid $ABORDER")
                    property("border-radius", "20px")
                    property("padding", "32px 28px")
                    property("box-shadow", "0 16px 48px rgba(0,0,0,0.35)")
                }
            }) {
                listOf(
                    Triple(AGREEN, "✓", s.feature1),
                    Triple(AACCENT, "✓", s.feature2),
                    Triple(AACCENT2, "✓", s.feature3),
                    Triple(AAMBER, "✓", s.feature4),
                    Triple(AGREEN, "✓", s.feature5),
                ).forEachIndexed { i, (color, icon, text) ->
                    Div({
                        style {
                            display(DisplayStyle.Flex)
                            alignItems(AlignItems.Center)
                            property("gap", "12px")
                            if (i < 4) property("margin-bottom", "16px")
                        }
                    }) {
                        Div({
                            style {
                                property("width", "28px")
                                property("height", "28px")
                                property("border-radius", "8px")
                                background("rgba(255,255,255,0.08)")
                                property("border", "1px solid rgba(255,255,255,0.15)")
                                display(DisplayStyle.Flex)
                                alignItems(AlignItems.Center)
                                justifyContent(JustifyContent.Center)
                                property("font-size", "13px")
                                property("font-weight", "700")
                                color(color)
                                property("flex-shrink", "0")
                            }
                        }) { Text(icon) }
                        Span({ style { color(ATEXT); property("font-size", "14px") } }) { Text(text) }
                    }
                }
            }
        }

        // Values section
        Div({
            style {
                property("max-width", "1100px")
                property("margin", "0 auto 80px")
                property("padding", "0 24px")
                property("animation", "aboutFadeUp 0.55s ease 0.25s both")
            }
        }) {
            Div({ style { property("text-align", "center"); property("margin-bottom", "48px") } }) {
                Div({
                    style {
                        property("font-size", "11px")
                        property("font-weight", "700")
                        property("letter-spacing", "0.12em")
                        property("text-transform", "uppercase")
                        color(AACCENT)
                        property("margin-bottom", "12px")
                    }
                }) { Text(s.valuesLabel) }
                H2({
                    style {
                        property("font-size", "clamp(1.4rem, 3vw, 2rem)")
                        property("font-weight", "800")
                        color(ATEXT)
                    }
                }) { Text(s.valuesTitle) }
            }

            data class Value(val icon: String, val title: String, val desc: String, val delay: String)
            val values = listOf(
                Value("🎯", s.value1Title, s.value1Desc, "0s"),
                Value("⚡", s.value2Title, s.value2Desc, "0.07s"),
                Value("🔒", s.value3Title, s.value3Desc, "0.14s"),
                Value("🌍", s.value4Title, s.value4Desc, "0.21s"),
                Value("🚀", s.value5Title, s.value5Desc, "0.28s"),
                Value("💬", s.value6Title, s.value6Desc, "0.35s"),
            )

            Div({
                style {
                    display(DisplayStyle.Grid)
                    property("grid-template-columns", "repeat(auto-fill, minmax(300px, 1fr))")
                    property("gap", "20px")
                }
            }) {
                values.forEach { v ->
                    Div({
                        classes("value-card")
                        style { property("animation", "valueCardIn 0.4s ease ${v.delay} both") }
                    }) {
                        Div({
                            style {
                                property("font-size", "28px")
                                property("margin-bottom", "12px")
                            }
                        }) { Text(v.icon) }
                        Div({
                            style {
                                property("font-size", "16px")
                                property("font-weight", "700")
                                color(ATEXT)
                                property("margin-bottom", "8px")
                            }
                        }) { Text(v.title) }
                        Div({ style { color(ASUB); property("font-size", "14px"); property("line-height", "1.65") } }) {
                            Text(v.desc)
                        }
                    }
                }
            }
        }

        // CTA banner
        Div({
            style {
                property("max-width", "1100px")
                property("margin", "0 auto 80px")
                property("padding", "0 24px")
                property("animation", "aboutFadeUp 0.55s ease 0.35s both")
            }
        }) {
            Div({
                style {
                    background(AGRAD)
                    property("border-radius", "20px")
                    property("padding", "56px 40px")
                    property("text-align", "center")
                }
            }) {
                H2({
                    style {
                        property("font-size", "clamp(1.4rem, 3vw, 2rem)")
                        property("font-weight", "800")
                        color("#fff")
                        property("margin-bottom", "12px")
                    }
                }) { Text(s.ctaTitle) }
                P({
                    style {
                        color("rgba(255,255,255,0.8)")
                        property("font-size", "15px")
                        property("margin-bottom", "28px")
                    }
                }) { Text(s.ctaBody) }
                A(href = "/signup") {
                    Div({
                        style {
                            display(DisplayStyle.InlineBlock)
                            property("padding", "13px 32px")
                            background("#fff")
                            property("border-radius", "12px")
                            property("font-size", "15px")
                            property("font-weight", "700")
                            color(AACCENT)
                            property("cursor", "pointer")
                            property("transition", "opacity 0.2s, transform 0.15s")
                        }
                    }) { Text(s.ctaButton) }
                }
            }
        }

        // Footer
        Div({
            style {
                property("border-top", "1px solid $ABORDER")
                property("padding", "32px 24px")
                property("text-align", "center")
                color(ASUB)
                property("font-size", "13px")
            }
        }) {
            Text(s.footerCopyright)
            A(href = "/", attrs = {
                style {
                    color(ASUB)
                    property("text-decoration", "none")
                }
            }) { Text(s.footerHome) }
            Text(" · ")
            A(href = "/login", attrs = {
                style {
                    color(ASUB)
                    property("text-decoration", "none")
                }
            }) { Text(s.footerLogin) }
            Text(" · ")
            A(href = "/signup", attrs = {
                style {
                    color(ASUB)
                    property("text-decoration", "none")
                }
            }) { Text(s.footerSignup) }
        }
    }
}
