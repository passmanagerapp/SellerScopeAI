package com.orderpanel.pages

import androidx.compose.runtime.*
import com.orderpanel.strings.AboutStrings
import com.orderpanel.strings.getStrings
import com.varabyte.kobweb.core.Page
import kotlinx.browser.document
import kotlinx.browser.window
import org.jetbrains.compose.web.dom.*

// ── Brand colours (mirrors Admin page palette) ────────────────────────────────
private const val BG         = "#0a0916"
private const val SURFACE    = "#14132b"
private const val SURFACE2   = "#1a1930"
private const val BORDER     = "rgba(99,102,241,0.22)"
private const val BORDER_MID = "rgba(99,102,241,0.4)"
private const val TEXT       = "#e8e5ff"
private const val SUB        = "#8b84c4"
private const val ACCENT     = "#6366f1"
private const val ACCENT2    = "#7c3aed"
private const val GRAD       = "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
private const val GREEN      = "#10b981"
private const val AMBER      = "#f59e0b"

// ── Page ──────────────────────────────────────────────────────────────────────
@Page
@Composable
fun HomePage() {
    val s = remember { getStrings() }
    document.title = s.idxPageTitle

    Div({
        style {
            property("background", BG)
            property("color", TEXT)
            property("min-height", "100vh")
            property("font-family", "'Inter', system-ui, -apple-system, sans-serif")
            property("overflow-x", "hidden")
        }
    }) {
        SiteNavbar(s)
        HeroSection(s)
        SocialProofBar(s)
        FeaturesSection(s)
        PricingSection(s)
        FaqSection(s)
        CtaBanner(s)
        SiteFooter(s)
    }
}

// ── Navbar ────────────────────────────────────────────────────────────────────
@Composable
private fun SiteNavbar(s: AboutStrings) {
    var menuOpen by remember { mutableStateOf(false) }
    var scrolled by remember { mutableStateOf(false) }

    DisposableEffect(Unit) {
        val handler: (dynamic) -> Unit = {
            scrolled = window.scrollY > 20
        }
        window.addEventListener("scroll", handler)
        onDispose { window.removeEventListener("scroll", handler) }
    }

    Div({
        style {
            property("position", "fixed"); property("top", "0"); property("left", "0"); property("right", "0")
            property("z-index", "1000")
            property("height", "64px")
            property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
            property("padding", "0 40px")
            property("transition", "all 0.3s ease")
            if (scrolled) {
                property("background", "rgba(10,9,22,0.92)")
                property("backdrop-filter", "blur(12px)")
                property("border-bottom", "1px solid $BORDER")
                property("box-shadow", "0 4px 24px rgba(0,0,0,0.4)")
            } else {
                property("background", "transparent")
            }
        }
    }) {
        // Logo
        A(href = "/") {
            Div({
                style {
                    property("display", "flex"); property("align-items", "center"); property("gap", "10px")
                    property("cursor", "pointer")
                }
            }) {
                Img(src = "/app.png") {
                    style {
                        property("width", "36px"); property("height", "36px"); property("border-radius", "10px")
                        property("object-fit", "cover")
                        property("box-shadow", "0 4px 12px rgba(99,102,241,0.4)")
                    }
                    attr("alt", "SellerScope")
                }
                Span({
                    style {
                        property("font-size", "18px"); property("font-weight", "800")
                        property("letter-spacing", "-0.02em"); property("color", TEXT)
                    }
                }) { Text(s.brand) }
            }
        }

        // Desktop nav links
        Div({
            style {
                property("display", "flex"); property("align-items", "center"); property("gap", "8px")
            }
        }) {
            NavLink(s.idxNavFeatures, "#features")
            NavLink(s.idxNavPricing, "#pricing")
            NavLink(s.idxNavFaq, "#faq")
            NavLink(s.navAboutUs, "/about")
            NavDivider()
            NavOutlineBtn(s.navLogin, "/login")
            NavPrimaryBtn("${s.navGetStarted} →", "/signup")
        }
    }
}

@Composable
private fun NavLink(label: String, href: String) {
    var hovered by remember { mutableStateOf(false) }
    A(href = href) {
        Span({
            style {
                property("padding", "8px 14px"); property("font-size", "14px"); property("font-weight", "500")
                property("color", if (hovered) TEXT else SUB)
                property("cursor", "pointer"); property("border-radius", "8px")
                property("transition", "all 0.2s")
                property("background", if (hovered) "rgba(99,102,241,0.1)" else "transparent")
            }
            onMouseEnter { hovered = true }
            onMouseLeave { hovered = false }
        }) { Text(label) }
    }
}

@Composable
private fun NavDivider() {
    Div({
        style {
            property("width", "1px"); property("height", "20px")
            property("background", BORDER); property("margin", "0 6px")
        }
    }) {}
}

@Composable
private fun NavOutlineBtn(label: String, href: String) {
    var hovered by remember { mutableStateOf(false) }
    A(href = href) {
        Span({
            style {
                property("padding", "8px 18px"); property("font-size", "14px"); property("font-weight", "600")
                property("border", "1px solid $BORDER_MID"); property("border-radius", "8px")
                property("color", TEXT); property("cursor", "pointer")
                property("transition", "all 0.2s")
                property("background", if (hovered) "rgba(99,102,241,0.12)" else "transparent")
            }
            onMouseEnter { hovered = true }
            onMouseLeave { hovered = false }
        }) { Text(label) }
    }
}

@Composable
private fun NavPrimaryBtn(label: String, href: String) {
    var hovered by remember { mutableStateOf(false) }
    A(href = href) {
        Span({
            style {
                property("padding", "8px 20px"); property("font-size", "14px"); property("font-weight", "700")
                property("background", if (hovered) "linear-gradient(135deg, #5b52ff 0%, #8b5cf6 100%)" else GRAD)
                property("border-radius", "8px"); property("color", "white"); property("cursor", "pointer")
                property("transition", "all 0.2s")
                property("box-shadow", if (hovered) "0 6px 20px rgba(99,102,241,0.5)" else "0 2px 8px rgba(99,102,241,0.3)")
                property("transform", if (hovered) "translateY(-1px)" else "translateY(0)")
                property("display", "inline-block")
            }
            onMouseEnter { hovered = true }
            onMouseLeave { hovered = false }
        }) { Text(label) }
    }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
@Composable
private fun HeroSection(s: AboutStrings) {
    Div({
        id("hero")
        style {
            property("position", "relative")
            property("padding", "160px 40px 100px")
            property("text-align", "center")
            property("overflow", "hidden")
        }
    }) {
        // Background glow blobs
        Div({
            style {
                property("position", "absolute"); property("top", "-100px"); property("left", "50%")
                property("transform", "translateX(-50%)")
                property("width", "800px"); property("height", "600px"); property("border-radius", "50%")
                property("background", "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)")
                property("pointer-events", "none")
            }
        }) {}
        Div({
            style {
                property("position", "absolute"); property("top", "200px"); property("left", "-100px")
                property("width", "400px"); property("height", "400px"); property("border-radius", "50%")
                property("background", "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)")
                property("pointer-events", "none")
            }
        }) {}
        Div({
            style {
                property("position", "absolute"); property("top", "150px"); property("right", "-80px")
                property("width", "350px"); property("height", "350px"); property("border-radius", "50%")
                property("background", "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)")
                property("pointer-events", "none")
            }
        }) {}

        // Badge
        Div({
            style {
                property("display", "inline-flex"); property("align-items", "center"); property("gap", "8px")
                property("background", "rgba(99,102,241,0.12)"); property("border", "1px solid $BORDER_MID")
                property("border-radius", "999px"); property("padding", "6px 16px 6px 8px")
                property("margin-bottom", "28px"); property("font-size", "13px"); property("font-weight", "600")
                property("animation", "fadeInUp 0.5s ease both")
            }
        }) {
            Span({
                style {
                    property("background", GRAD); property("border-radius", "999px")
                    property("padding", "2px 10px"); property("font-size", "11px"); property("color", "white")
                    property("font-weight", "700")
                }
            }) { Text(s.idxHeroBadgeNew) }
            Span({ style { property("color", SUB) } }) { Text(s.idxHeroBadgeText) }
        }

        // Headline
        H1({
            style {
                property("font-size", "clamp(36px, 6vw, 68px)"); property("font-weight", "900")
                property("letter-spacing", "-0.04em"); property("line-height", "1.08")
                property("max-width", "820px"); property("margin", "0 auto 24px")
                property("color", TEXT)
                property("animation", "fadeInUp 0.55s ease 0.1s both")
            }
        }) {
            Text(s.idxHeroHeadline1)
            Br {}
            Span({
                style {
                    property("background", GRAD)
                    property("background-clip", "text"); property("-webkit-background-clip", "text")
                    property("color", "transparent"); property("-webkit-text-fill-color", "transparent")
                }
            }) { Text(s.idxHeroHeadline2) }
        }

        // Subheadline
        P({
            style {
                property("font-size", "clamp(16px, 2.2vw, 20px)"); property("color", SUB)
                property("max-width", "560px"); property("margin", "0 auto 40px"); property("line-height", "1.65")
                property("animation", "fadeInUp 0.55s ease 0.2s both")
            }
        }) {
            Text(s.idxHeroSubtext)
        }

        // CTA buttons
        Div({
            style {
                property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
                property("gap", "14px"); property("flex-wrap", "wrap")
                property("animation", "fadeInUp 0.55s ease 0.3s both")
            }
        }) {
            HeroPrimaryBtn(s.idxHeroPrimaryBtn, "/signup")
            HeroSecondaryBtn(s.idxHeroSecondaryBtn, "/demo")
        }

        // Trust line
        P({
            style {
                property("margin-top", "20px"); property("font-size", "13px"); property("color", SUB)
                property("animation", "fadeInUp 0.55s ease 0.4s both")
            }
        }) {
            Text(s.idxHeroTrustLine)
        }

        // Dashboard preview card
        Div({
            style {
                property("margin-top", "72px"); property("max-width", "960px"); property("margin-left", "auto"); property("margin-right", "auto")
                property("border-radius", "16px"); property("border", "1px solid $BORDER")
                property("overflow", "hidden"); property("box-shadow", "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.2)")
                property("animation", "fadeInUp 0.7s ease 0.5s both")
                property("background", SURFACE)
            }
        }) {
            DashboardMockup()
        }
    }
}

@Composable
private fun HeroPrimaryBtn(label: String, href: String) {
    var hovered by remember { mutableStateOf(false) }
    A(href = href) {
        Span({
            style {
                property("display", "inline-block")
                property("padding", "14px 32px"); property("font-size", "16px"); property("font-weight", "700")
                property("background", if (hovered) "linear-gradient(135deg, #5b52ff 0%, #8b5cf6 100%)" else GRAD)
                property("border-radius", "10px"); property("color", "white")
                property("box-shadow", if (hovered) "0 8px 32px rgba(99,102,241,0.55)" else "0 4px 16px rgba(99,102,241,0.35)")
                property("transform", if (hovered) "translateY(-2px)" else "translateY(0)")
                property("transition", "all 0.2s ease"); property("cursor", "pointer")
            }
            onMouseEnter { hovered = true }
            onMouseLeave { hovered = false }
        }) { Text(label) }
    }
}

@Composable
private fun HeroSecondaryBtn(label: String, href: String) {
    var hovered by remember { mutableStateOf(false) }
    A(href = href) {
        Span({
            style {
                property("display", "inline-block")
                property("padding", "14px 32px"); property("font-size", "16px"); property("font-weight", "600")
                property("background", if (hovered) "rgba(99,102,241,0.1)" else "rgba(99,102,241,0.06)")
                property("border", "1px solid $BORDER_MID"); property("border-radius", "10px"); property("color", TEXT)
                property("transition", "all 0.2s ease"); property("cursor", "pointer")
            }
            onMouseEnter { hovered = true }
            onMouseLeave { hovered = false }
        }) { Text(label) }
    }
}

// ── Dashboard mockup preview ──────────────────────────────────────────────────
@Composable
private fun DashboardMockup() {
    // Topbar
    Div({
        style {
            property("background", "#100f28"); property("padding", "10px 20px")
            property("display", "flex"); property("align-items", "center"); property("gap", "12px")
            property("border-bottom", "1px solid $BORDER")
        }
    }) {
        listOf("#ef4444", "#f59e0b", "#10b981").forEach { color ->
            Div({ style { property("width", "10px"); property("height", "10px"); property("border-radius", "50%"); property("background", color) } }) {}
        }
        Div({
            style {
                property("flex", "1"); property("height", "24px"); property("background", "rgba(99,102,241,0.08)")
                property("border-radius", "6px"); property("margin", "0 12px")
            }
        }) {}
        Div({ style { property("font-size", "11px"); property("color", SUB) } }) { Text("SellerScope Dashboard") }
    }

    // Content area
    Div({ style { property("display", "flex"); property("height", "320px") } }) {
        // Sidebar strip
        Div({
            style {
                property("width", "48px"); property("background", SURFACE); property("border-right", "1px solid $BORDER")
                property("display", "flex"); property("flex-direction", "column"); property("align-items", "center")
                property("padding", "16px 0"); property("gap", "18px")
            }
        }) {
            listOf("📦", "📊", "⚙️", "🔍").forEach { icon ->
                Div({ style { property("font-size", "16px"); property("opacity", "0.6") } }) { Text(icon) }
            }
        }
        // Main
        Div({ style { property("flex", "1"); property("padding", "16px"); property("overflow", "hidden") } }) {
            // Stat cards row
            Div({ style { property("display", "grid"); property("grid-template-columns", "repeat(4, 1fr)"); property("gap", "10px"); property("margin-bottom", "12px") } }) {
                listOf(
                    Triple("📦", "Orders", "127"),
                    Triple("✅", "Delivered", "98"),
                    Triple("💰", "Gross", "\$4,820"),
                    Triple("📈", "Net", "\$2,340")
                ).forEach { (icon, label, value) ->
                    Div({
                        style {
                            property("background", SURFACE2); property("border-radius", "8px")
                            property("border", "1px solid $BORDER"); property("padding", "10px 12px")
                        }
                    }) {
                        Div({ style { property("font-size", "10px"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "4px") } }) { Text(label) }
                        Div({ style { property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between") } }) {
                            Span({ style { property("font-size", "16px"); property("font-weight", "800"); property("color", TEXT) } }) { Text(value) }
                            Span({ style { property("font-size", "14px") } }) { Text(icon) }
                        }
                    }
                }
            }
            // Table preview
            Div({
                style {
                    property("background", SURFACE2); property("border-radius", "8px")
                    property("border", "1px solid $BORDER"); property("overflow", "hidden")
                }
            }) {
                Div({ style { property("padding", "8px 12px"); property("border-bottom", "1px solid $BORDER"); property("background", "rgba(99,102,241,0.06)"); property("font-size", "10px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", SUB) } }) {
                    Text("Recent Orders")
                }
                listOf(
                    listOf("2025-05-12", "John Smith", "🇺🇸", "Shipped", "\$89.00"),
                    listOf("2025-05-11", "Marie Dupont", "🇪🇺", "Delivered", "\$134.00"),
                    listOf("2025-05-10", "Yuki Tanaka", "🇬🇧", "Processing", "\$67.50"),
                ).forEach { row ->
                    Div({
                        style {
                            property("display", "grid"); property("grid-template-columns", "100px 1fr 32px 90px 80px")
                            property("align-items", "center"); property("padding", "8px 12px")
                            property("border-bottom", "1px solid $BORDER"); property("font-size", "11px")
                        }
                    }) {
                        Span({ style { property("color", SUB) } }) { Text(row[0]) }
                        Span({ style { property("font-weight", "600") } }) { Text(row[1]) }
                        Span() { Text(row[2]) }
                        Span({
                            style {
                                val (sbg, sfg) = when (row[3]) {
                                    "Delivered"  -> "rgba(16,185,129,0.15)" to GREEN
                                    "Shipped"    -> "rgba(59,130,246,0.15)" to "#3b82f6"
                                    else         -> "rgba(245,158,11,0.15)" to AMBER
                                }
                                property("background", sbg); property("color", sfg)
                                property("padding", "2px 8px"); property("border-radius", "999px")
                                property("font-size", "10px"); property("font-weight", "700")
                            }
                        }) { Text(row[3]) }
                        Span({ style { property("color", GREEN); property("font-weight", "600") } }) { Text(row[4]) }
                    }
                }
            }
        }
    }
}

// ── Social proof bar ──────────────────────────────────────────────────────────
@Composable
private fun SocialProofBar(s: AboutStrings) {
    Div({
        style {
            property("border-top", "1px solid $BORDER"); property("border-bottom", "1px solid $BORDER")
            property("background", SURFACE); property("padding", "20px 40px")
            property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
            property("gap", "48px"); property("flex-wrap", "wrap")
        }
    }) {
        listOf(
            s.idxSocialProof1 to "📦",
            s.idxSocialProof2 to "📊",
            s.idxSocialProof3 to "⭐",
            s.idxSocialProof4 to "🟢"
        ).forEach { (label, icon) ->
            Div({
                style {
                    property("display", "flex"); property("align-items", "center"); property("gap", "8px")
                    property("font-size", "14px"); property("font-weight", "600"); property("color", SUB)
                }
            }) {
                Span({ style { property("font-size", "16px") } }) { Text(icon) }
                Text(label)
            }
        }
    }
}

// ── Features ──────────────────────────────────────────────────────────────────
@Composable
private fun FeaturesSection(s: AboutStrings) {
    val features = listOf(
        Triple("📦", s.idxFeat1Title, s.idxFeat1Desc),
        Triple("📊", s.idxFeat2Title, s.idxFeat2Desc),
        Triple("🚚", s.idxFeat3Title, s.idxFeat3Desc),
        Triple("💰", s.idxFeat4Title, s.idxFeat4Desc),
        Triple("🔍", s.idxFeat5Title, s.idxFeat5Desc),
        Triple("⚙️", s.idxFeat6Title, s.idxFeat6Desc)
    )

    Div({
        id("features")
        style {
            property("padding", "100px 40px")
            property("max-width", "1140px"); property("margin", "0 auto")
        }
    }) {
        SectionLabel(s.idxFeaturesLabel)
        SectionTitle(s.idxFeaturesTitle)
        SectionSubtitle(s.idxFeaturesSubtitle)

        Div({
            style {
                property("display", "grid")
                property("grid-template-columns", "repeat(auto-fit, minmax(300px, 1fr))")
                property("gap", "20px"); property("margin-top", "56px")
            }
        }) {
            features.forEachIndexed { i, (icon, title, desc) ->
                FeatureCard(icon, title, desc, delay = "${i * 0.07}s")
            }
        }
    }
}

@Composable
private fun FeatureCard(icon: String, title: String, desc: String, delay: String) {
    var hovered by remember { mutableStateOf(false) }
    Div({
        style {
            property("background", if (hovered) SURFACE2 else SURFACE)
            property("border", "1px solid ${if (hovered) BORDER_MID else BORDER}")
            property("border-radius", "16px"); property("padding", "28px 24px")
            property("transition", "all 0.25s ease")
            property("transform", if (hovered) "translateY(-4px)" else "translateY(0)")
            property("box-shadow", if (hovered) "0 16px 48px rgba(0,0,0,0.35)" else "0 2px 8px rgba(0,0,0,0.2)")
            property("animation", "fadeInUp 0.5s ease $delay both")
        }
        onMouseEnter { hovered = true }
        onMouseLeave { hovered = false }
    }) {
        Div({
            style {
                property("width", "48px"); property("height", "48px"); property("border-radius", "12px")
                property("background", "rgba(99,102,241,0.15)"); property("display", "flex")
                property("align-items", "center"); property("justify-content", "center")
                property("font-size", "22px"); property("margin-bottom", "18px")
                property("border", "1px solid rgba(99,102,241,0.25)")
            }
        }) { Text(icon) }
        Div({
            style {
                property("font-size", "17px"); property("font-weight", "700")
                property("color", TEXT); property("margin-bottom", "10px"); property("letter-spacing", "-0.01em")
            }
        }) { Text(title) }
        Div({ style { property("font-size", "14px"); property("color", SUB); property("line-height", "1.65") } }) {
            Text(desc)
        }
    }
}

// ── Pricing ───────────────────────────────────────────────────────────────────
private data class Plan(
    val name: String,
    val price: String,
    val period: String,
    val description: String,
    val features: List<String>,
    val cta: String,
    val highlighted: Boolean = false,
    val badge: String? = null
)

@Composable
private fun PricingSection(s: AboutStrings) {
    val plans = listOf(
        Plan(
            name = s.idxPlan1Name,
            price = s.idxPlan1Price,
            period = s.idxPlan1Period,
            description = s.idxPlan1Desc,
            features = listOf(s.idxPlan1Feat1, s.idxPlan1Feat2, s.idxPlan1Feat3, s.idxPlan1Feat4, s.idxPlan1Feat5),
            cta = s.idxPlan1Cta
        ),
        Plan(
            name = s.idxPlan2Name,
            price = s.idxPlan2Price,
            period = s.idxPlan2Period,
            description = s.idxPlan2Desc,
            features = listOf(s.idxPlan2Feat1, s.idxPlan2Feat2, s.idxPlan2Feat3, s.idxPlan2Feat4, s.idxPlan2Feat5, s.idxPlan2Feat6, s.idxPlan2Feat7, s.idxPlan2Feat8),
            cta = s.idxPlan2Cta,
            highlighted = true,
            badge = s.idxPlan2Badge
        ),
        Plan(
            name = s.idxPlan3Name,
            price = s.idxPlan3Price,
            period = s.idxPlan3Period,
            description = s.idxPlan3Desc,
            features = listOf(s.idxPlan3Feat1, s.idxPlan3Feat2, s.idxPlan3Feat3, s.idxPlan3Feat4, s.idxPlan3Feat5, s.idxPlan3Feat6, s.idxPlan3Feat7),
            cta = s.idxPlan3Cta
        )
    )

    Div({
        id("pricing")
        style {
            property("padding", "100px 40px")
            property("background", "rgba(10,9,22,0.8)")
            property("border-top", "1px solid $BORDER"); property("border-bottom", "1px solid $BORDER")
        }
    }) {
        Div({ style { property("max-width", "1140px"); property("margin", "0 auto") } }) {
            SectionLabel(s.idxPricingLabel)
            SectionTitle(s.idxPricingTitle)
            SectionSubtitle(s.idxPricingSubtitle)

            Div({
                style {
                    property("display", "grid")
                    property("grid-template-columns", "repeat(auto-fit, minmax(280px, 1fr))")
                    property("gap", "20px"); property("margin-top", "56px")
                    property("align-items", "start")
                }
            }) {
                plans.forEachIndexed { i, plan ->
                    PriceCard(plan, delay = "${i * 0.1}s")
                }
            }

            // Annual note
            P({
                style {
                    property("text-align", "center"); property("margin-top", "32px")
                    property("font-size", "14px"); property("color", SUB)
                }
            }) {
                Text(s.idxPricingAnnualNote)
                A(href = "/contact") {
                    Span({ style { property("color", ACCENT); property("font-weight", "600") } }) { Text(s.idxPricingAnnualLink) }
                }
            }
        }
    }
}

@Composable
private fun PriceCard(plan: Plan, delay: String) {
    var hovered by remember { mutableStateOf(false) }
    val isHighlighted = plan.highlighted

    Div({
        style {
            property("background", if (isHighlighted) "linear-gradient(160deg, rgba(99,102,241,0.18) 0%, rgba(124,58,237,0.12) 100%)" else SURFACE)
            property("border", "1px solid ${if (isHighlighted) ACCENT else BORDER}")
            property("border-radius", "20px"); property("padding", "32px 28px")
            property("position", "relative"); property("overflow", "hidden")
            property("transition", "all 0.25s ease")
            property("transform", if (hovered) "translateY(-4px)" else "translateY(0)")
            property("box-shadow", when {
                isHighlighted -> "0 0 0 1px rgba(99,102,241,0.3), 0 20px 60px rgba(99,102,241,0.2)"
                hovered       -> "0 16px 48px rgba(0,0,0,0.35)"
                else          -> "0 2px 8px rgba(0,0,0,0.2)"
            })
            property("animation", "fadeInUp 0.5s ease $delay both")
        }
        onMouseEnter { hovered = true }
        onMouseLeave { hovered = false }
    }) {
        // Badge
        if (plan.badge != null) {
            Div({
                style {
                    property("position", "absolute"); property("top", "20px"); property("right", "20px")
                    property("background", GRAD); property("color", "white")
                    property("font-size", "11px"); property("font-weight", "700"); property("letter-spacing", "0.04em")
                    property("padding", "4px 12px"); property("border-radius", "999px")
                }
            }) { Text(plan.badge) }
        }

        // Plan name
        Div({
            style {
                property("font-size", "14px"); property("font-weight", "700"); property("letter-spacing", "0.06em")
                property("text-transform", "uppercase"); property("color", if (isHighlighted) ACCENT else SUB)
                property("margin-bottom", "12px")
            }
        }) { Text(plan.name) }

        // Price
        Div({
            style {
                property("display", "flex"); property("align-items", "flex-end"); property("gap", "4px")
                property("margin-bottom", "8px")
            }
        }) {
            Span({
                style {
                    property("font-size", "48px"); property("font-weight", "900"); property("letter-spacing", "-0.04em")
                    property("color", TEXT); property("line-height", "1")
                }
            }) { Text(plan.price) }
            Span({ style { property("font-size", "14px"); property("color", SUB); property("padding-bottom", "8px") } }) {
                Text(plan.period)
            }
        }

        // Description
        P({ style { property("font-size", "14px"); property("color", SUB); property("line-height", "1.55"); property("margin-bottom", "24px") } }) {
            Text(plan.description)
        }

        // Divider
        Div({ style { property("border-top", "1px solid $BORDER"); property("margin-bottom", "24px") } }) {}

        // Feature list
        Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "12px"); property("margin-bottom", "32px") } }) {
            plan.features.forEach { feature ->
                Div({ style { property("display", "flex"); property("align-items", "flex-start"); property("gap", "10px") } }) {
                    Span({ style { property("color", GREEN); property("font-size", "14px"); property("margin-top", "1px"); property("flex-shrink", "0") } }) { Text("✓") }
                    Span({ style { property("font-size", "14px"); property("color", TEXT); property("line-height", "1.45") } }) { Text(feature) }
                }
            }
        }

        // CTA button
        var btnHovered by remember { mutableStateOf(false) }
        A(href = if (plan.highlighted) "/signup" else if (plan.name == "Team" || plan.name == "Takım") "/contact" else "/signup") {
            Div({
                style {
                    property("width", "100%"); property("padding", "13px")
                    property("text-align", "center"); property("font-size", "15px"); property("font-weight", "700")
                    property("border-radius", "10px"); property("cursor", "pointer")
                    property("transition", "all 0.2s ease")
                    if (isHighlighted) {
                        property("background", if (btnHovered) "linear-gradient(135deg, #5b52ff 0%, #8b5cf6 100%)" else GRAD)
                        property("color", "white")
                        property("box-shadow", if (btnHovered) "0 8px 24px rgba(99,102,241,0.5)" else "0 4px 12px rgba(99,102,241,0.3)")
                    } else {
                        property("background", if (btnHovered) "rgba(99,102,241,0.15)" else "rgba(99,102,241,0.08)")
                        property("color", TEXT)
                        property("border", "1px solid $BORDER_MID")
                    }
                    property("transform", if (btnHovered) "translateY(-1px)" else "translateY(0)")
                }
                onMouseEnter { btnHovered = true }
                onMouseLeave { btnHovered = false }
            }) { Text(plan.cta) }
        }
    }
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
@Composable
private fun FaqSection(s: AboutStrings) {
    val faqs = listOf(
        s.idxFaq1Q to s.idxFaq1A,
        s.idxFaq2Q to s.idxFaq2A,
        s.idxFaq3Q to s.idxFaq3A,
        s.idxFaq4Q to s.idxFaq4A,
        s.idxFaq5Q to s.idxFaq5A,
        s.idxFaq6Q to s.idxFaq6A,
    )

    Div({
        id("faq")
        style {
            property("padding", "100px 40px")
            property("max-width", "860px"); property("margin", "0 auto")
        }
    }) {
        SectionLabel(s.idxFaqLabel)
        SectionTitle(s.idxFaqTitle)
        SectionSubtitle(s.idxFaqSubtitle)

        Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "12px"); property("margin-top", "56px") } }) {
            faqs.forEach { (q, a) ->
                FaqItem(q, a)
            }
        }
    }
}

@Composable
private fun FaqItem(question: String, answer: String) {
    var open by remember { mutableStateOf(false) }
    var hovered by remember { mutableStateOf(false) }

    Div({
        style {
            property("background", if (hovered || open) SURFACE2 else SURFACE)
            property("border", "1px solid ${if (open) BORDER_MID else BORDER}")
            property("border-radius", "12px"); property("overflow", "hidden")
            property("transition", "all 0.2s ease")
        }
        onMouseEnter { hovered = true }
        onMouseLeave { hovered = false }
    }) {
        Div({
            style {
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("padding", "18px 22px"); property("cursor", "pointer"); property("user-select", "none")
            }
            onClick { open = !open }
        }) {
            Span({ style { property("font-size", "15px"); property("font-weight", "600"); property("color", TEXT) } }) {
                Text(question)
            }
            Span({
                style {
                    property("font-size", "18px"); property("color", ACCENT); property("transition", "transform 0.25s ease")
                    property("transform", if (open) "rotate(45deg)" else "rotate(0deg)")
                    property("display", "inline-block"); property("line-height", "1"); property("flex-shrink", "0")
                }
            }) { Text("+") }
        }
        if (open) {
            Div({
                style {
                    property("padding", "0 22px 20px"); property("font-size", "14px"); property("color", SUB)
                    property("line-height", "1.7"); property("border-top", "1px solid $BORDER")
                    property("padding-top", "16px")
                    property("animation", "fadeInUp 0.2s ease both")
                }
            }) { Text(answer) }
        }
    }
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
@Composable
private fun CtaBanner(s: AboutStrings) {
    Div({
        style {
            property("margin", "0 40px 80px"); property("border-radius", "24px")
            property("background", "linear-gradient(135deg, rgba(79,70,229,0.3) 0%, rgba(124,58,237,0.2) 100%)")
            property("border", "1px solid $BORDER_MID")
            property("padding", "72px 40px"); property("text-align", "center")
            property("position", "relative"); property("overflow", "hidden")
        }
    }) {
        // Glow
        Div({
            style {
                property("position", "absolute"); property("top", "50%"); property("left", "50%")
                property("transform", "translate(-50%,-50%)")
                property("width", "600px"); property("height", "300px"); property("border-radius", "50%")
                property("background", "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)")
                property("pointer-events", "none")
            }
        }) {}

        H2({
            style {
                property("font-size", "clamp(28px, 4vw, 44px)"); property("font-weight", "900")
                property("letter-spacing", "-0.03em"); property("color", TEXT); property("margin-bottom", "16px")
            }
        }) { Text(s.idxCtaTitle) }

        P({ style { property("font-size", "18px"); property("color", SUB); property("margin-bottom", "36px") } }) {
            Text(s.idxCtaBody)
        }

        HeroPrimaryBtn(s.idxCtaBtn, "/signup")
    }
}

// ── Footer ────────────────────────────────────────────────────────────────────
@Composable
private fun SiteFooter(s: AboutStrings) {
    Div({
        id("about")
        style {
            property("background", SURFACE); property("border-top", "1px solid $BORDER")
            property("padding", "48px 40px 32px")
        }
    }) {
        Div({
            style {
                property("max-width", "1140px"); property("margin", "0 auto")
                property("display", "flex"); property("justify-content", "space-between")
                property("flex-wrap", "wrap"); property("gap", "40px"); property("margin-bottom", "40px")
            }
        }) {
            // Brand column
            Div({ style { property("max-width", "260px") } }) {
                Div({
                    style {
                        property("display", "flex"); property("align-items", "center"); property("gap", "10px")
                        property("margin-bottom", "14px")
                    }
                }) {
                    Div({
                        style {
                            property("width", "32px"); property("height", "32px"); property("border-radius", "8px")
                            property("background", GRAD); property("display", "flex")
                            property("align-items", "center"); property("justify-content", "center"); property("font-size", "16px")
                        }
                    }) { Text("📊") }
                    Span({ style { property("font-size", "16px"); property("font-weight", "800"); property("color", TEXT) } }) { Text(s.brand) }
                }
                P({ style { property("font-size", "13px"); property("color", SUB); property("line-height", "1.65") } }) {
                    Text(s.idxFooterTagline)
                }
            }

            // Link groups
            FooterLinkGroup(s.idxFooterGroupProduct, listOf(s.idxFooterProd1 to "#features", s.idxFooterProd2 to "#pricing", s.idxFooterProd3 to "#faq", s.idxFooterProd4 to "#"))
            FooterLinkGroup(s.idxFooterGroupCompany, listOf(s.idxFooterComp1 to "/about", s.idxFooterComp2 to "#", s.idxFooterComp3 to "#", s.idxFooterComp4 to "/contact"))
            FooterLinkGroup(s.idxFooterGroupLegal, listOf(s.idxFooterLegal1 to "/privacy", s.idxFooterLegal2 to "/terms", s.idxFooterLegal3 to "#"))
        }

        // Bottom bar
        Div({
            style {
                property("border-top", "1px solid $BORDER"); property("padding-top", "24px")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("flex-wrap", "wrap"); property("gap", "12px")
            }
        }) {
            Span({ style { property("font-size", "13px"); property("color", SUB) } }) {
                Text(s.idxFooterCopyright)
            }
            Div({ style { property("display", "flex"); property("gap", "20px") } }) {
                listOf(s.idxFooterTwitter to "#", s.idxFooterGithub to "#", s.idxFooterLinkedin to "#").forEach { (name, href) ->
                    A(href = href) {
                        Span({
                            style { property("font-size", "13px"); property("color", SUB) }
                        }) { Text(name) }
                    }
                }
            }
        }
    }
}

@Composable
private fun FooterLinkGroup(title: String, links: List<Pair<String, String>>) {
    Div {
        Div({ style { property("font-size", "12px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.08em"); property("color", SUB); property("margin-bottom", "16px") } }) {
            Text(title)
        }
        Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "10px") } }) {
            links.forEach { (label, href) ->
                A(href = href) {
                    Span({ style { property("font-size", "14px"); property("color", SUB) } }) { Text(label) }
                }
            }
        }
    }
}

// ── Shared section helpers ────────────────────────────────────────────────────
@Composable
private fun SectionLabel(text: String) {
    Div({ style { property("text-align", "center"); property("margin-bottom", "14px") } }) {
        Span({
            style {
                property("display", "inline-block")
                property("background", "rgba(99,102,241,0.12)"); property("border", "1px solid $BORDER_MID")
                property("border-radius", "999px"); property("padding", "5px 16px")
                property("font-size", "12px"); property("font-weight", "700"); property("letter-spacing", "0.08em")
                property("text-transform", "uppercase"); property("color", ACCENT)
            }
        }) { Text(text) }
    }
}

@Composable
private fun SectionTitle(text: String) {
    H2({
        style {
            property("text-align", "center"); property("font-size", "clamp(28px, 4vw, 42px)")
            property("font-weight", "900"); property("letter-spacing", "-0.03em"); property("color", TEXT)
            property("margin-bottom", "14px")
        }
    }) { Text(text) }
}

@Composable
private fun SectionSubtitle(text: String) {
    P({
        style {
            property("text-align", "center"); property("font-size", "17px"); property("color", SUB)
            property("max-width", "520px"); property("margin", "0 auto"); property("line-height", "1.65")
        }
    }) { Text(text) }
}
