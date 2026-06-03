package com.orderpanel.pages

import androidx.compose.runtime.*
import com.orderpanel.firebase.getDownloadURL
import com.orderpanel.firebase.getFirebaseAuth
import com.orderpanel.firebase.getStorage
import com.orderpanel.firebase.onAuthStateChanged
import com.orderpanel.firebase.signOut
import com.orderpanel.firebase.storageRef
import com.orderpanel.firebase.uploadBytes
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.core.rememberPageContext
import dev.gitlive.firebase.Firebase
import dev.gitlive.firebase.firestore.firestore
import kotlin.js.Date
import kotlin.js.Promise
import kotlin.math.roundToLong
import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.await
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json as KJson
import com.orderpanel.crypto.encrypt
import com.orderpanel.crypto.decrypt
import org.jetbrains.compose.web.attributes.InputType
import org.jetbrains.compose.web.attributes.value
import org.jetbrains.compose.web.dom.*
import com.orderpanel.strings.AboutStrings
import com.orderpanel.strings.getStrings
import com.varabyte.kobweb.compose.style.KobwebComposeStyleSheet.attr


private const val FS_COLLECTION    = "admin_orders"
private const val FS_CONFIG_COL    = "app_config"
private const val FS_SKUS_DOC      = "skus"
private const val FS_SNAPSHOTS_COL = "monthly_snapshots"
private const val FS_LOSSES_COL    = "losses"
private const val DAILY_AD_BUDGET  = 19.5

// ── Model ─────────────────────────────────────────────────────────────────────

@Serializable
data class AdminOrder(
    val id: String             = "",
    val orderDate: String      = "",
    val orderQuantity: Int     = 1,
    val receiverName: String   = "",
    val trackingNumber: String = "",
    val shippingDate: String   = "",
    val country: String        = "Other",
    val customValue: Double    = 0.0,
    val profit: Double         = 0.0,
    val shippingCost: Double   = 0.0,
    val tariffCost: Double     = 0.0,
    val productCost: Double    = 0.0,
    val netProfit: Double      = 0.0,
    val status: String         = "Processing",
    val sku: String            = "",
    val cargoCompany: String   = ""
)

@Serializable
data class SkuConfig(
    val skus: Map<String, Double> = emptyMap(),
    val shopName: String    = "",
    val shopLogoUrl: String = "",
    val skuDeliveryDays: Map<String, Int> = emptyMap(),
    val monthlyAdSpend: Map<String, Double> = emptyMap()
)

@Serializable
data class MonthlySnapshot(
    val month: String = "",
    val orderCount: Int = 0,
    val totalShippingCost: Double = 0.0,
    val totalTariffCost: Double = 0.0,
    val totalAdExpense: Double = 0.0,
    val totalNetIncome: Double = 0.0,
    val crossFit: Double = 0.0,
    val totalProductCost: Double = 0.0,
    val countryBreakdown: Map<String, Int> = emptyMap(),
    val skuBreakdown: Map<String, Int> = emptyMap()
)

@Serializable
data class LossEntry(
    val id: String     = "",
    val date: String   = "",
    val reason: String = "",
    val name: String   = "",
    val sku: String    = "",
    val cost: Double   = 0.0
)

@Serializable
data class EncryptedPayload(val enc: String = "")

private val coder = KJson { ignoreUnknownKeys = true }

// ── Firestore helpers ─────────────────────────────────────────────────────────

private val db get() = Firebase.firestore

private fun currentUid(): String {
    val auth = getFirebaseAuth()
    val uid  = auth?.currentUser?.uid
    return uid?.toString() ?: error("No authenticated user")
}

private fun userOrders() =
    db.collection("users").document(currentUid()).collection(FS_COLLECTION)

private fun userConfig() =
    db.collection("users").document(currentUid()).collection(FS_CONFIG_COL).document(FS_SKUS_DOC)

private fun userSnapshots() =
    db.collection("users").document(currentUid()).collection(FS_SNAPSHOTS_COL)

private fun userLosses() =
    db.collection("users").document(currentUid()).collection(FS_LOSSES_COL)

private suspend fun fsLoadLosses(): List<LossEntry> = try {
    val snap = userLosses().get()
    val uid  = currentUid()
    snap.documents.mapNotNull { doc ->
        try {
            val payload = doc.data(EncryptedPayload.serializer())
            if (payload.enc.isNotEmpty()) {
                coder.decodeFromString<LossEntry>(decrypt(payload.enc, uid))
            } else {
                val entry = doc.data(LossEntry.serializer())
                MainScope().launch { try { fsSaveLoss(entry) } catch (_: Throwable) {} }
                entry
            }
        } catch (_: Throwable) {
            try { doc.data(LossEntry.serializer()) } catch (_: Throwable) { null }
        }
    }.sortedByDescending { it.date }
} catch (e: Throwable) { emptyList() }

private suspend fun fsSaveLoss(entry: LossEntry) {
    val enc = encrypt(coder.encodeToString(entry), currentUid())
    userLosses().document(entry.id).set(EncryptedPayload.serializer(), EncryptedPayload(enc))
}

private suspend fun fsDeleteLoss(id: String) {
    userLosses().document(id).delete()
}

private suspend fun fsLoadConfig(): SkuConfig = try {
    val doc = userConfig().get()
    if (!doc.exists)  SkuConfig()
    val uid = currentUid()
    try {
        val payload = doc.data(EncryptedPayload.serializer())
        if (payload.enc.isNotEmpty()) {
            coder.decodeFromString<SkuConfig>(decrypt(payload.enc, uid))
        } else {
            val config = doc.data(SkuConfig.serializer())
            MainScope().launch { try { fsSaveConfig(config) } catch (_: Throwable) {} }
            config
        }
    } catch (_: Throwable) {
        try { doc.data(SkuConfig.serializer()) } catch (_: Throwable) { SkuConfig() }
    }
} catch (e: Throwable) { SkuConfig() }

private suspend fun fsSaveConfig(config: SkuConfig) {
    val enc = encrypt(coder.encodeToString(config), currentUid())
    userConfig().set(EncryptedPayload.serializer(), EncryptedPayload(enc))
}

private fun adminOrderFromDynamic(data: dynamic, docId: String): AdminOrder? = try {
    AdminOrder(
        id             = data.id?.toString()?.takeIf { it.isNotEmpty() } ?: docId,
        orderDate      = normalizeCsvDate(data.orderDate?.toString() ?: ""),
        orderQuantity  = data.orderQuantity?.toString()?.toIntOrNull() ?: 1,
        receiverName   = data.receiverName?.toString() ?: "",
        trackingNumber = data.trackingNumber?.toString() ?: "",
        shippingDate   = normalizeCsvDate(data.shippingDate?.toString() ?: ""),
        country        = data.country?.toString() ?: "Other",
        customValue    = data.customValue?.toString()?.toDoubleOrNull() ?: 0.0,
        profit         = data.profit?.toString()?.toDoubleOrNull() ?: 0.0,
        shippingCost   = data.shippingCost?.toString()?.toDoubleOrNull() ?: 0.0,
        tariffCost     = data.tariffCost?.toString()?.toDoubleOrNull() ?: 0.0,
        productCost    = data.productCost?.toString()?.toDoubleOrNull() ?: 0.0,
        netProfit      = data.netProfit?.toString()?.toDoubleOrNull() ?: 0.0,
        status         = data.status?.toString() ?: "Processing",
        sku            = data.sku?.toString() ?: "",
        cargoCompany   = data.cargoCompany?.toString() ?: ""
    )
} catch (e: Throwable) {
    console.error("adminOrderFromDynamic failed for $docId: ${e.message}")
    null
}

// Returns Pair(orders, totalDocsFetched) so the caller can show a diagnostic
private suspend fun fsLoadOrders(): Pair<List<AdminOrder>, Int> {
    val snap  = userOrders().get()
    val total = snap.documents.size
    console.log("fsLoadOrders: fetched $total documents")
    val uid = currentUid()
    val orders = snap.documents.mapNotNull { doc ->
        try {
            val payload = doc.data(EncryptedPayload.serializer())
            if (payload.enc.isNotEmpty()) {
                val order = coder.decodeFromString<AdminOrder>(decrypt(payload.enc, uid))
                order.copy(orderDate = normalizeCsvDate(order.orderDate))
            } else {
                // Old unencrypted document — load then migrate to encrypted format
                val order = try {
                    val o = doc.data(AdminOrder.serializer())
                    o.copy(orderDate = normalizeCsvDate(o.orderDate))
                } catch (e: Throwable) {
                    console.warn("Legacy decode failed for ${doc.id}: ${e.message}")
                    val raw: dynamic = doc.asDynamic().js?.data()
                    if (raw != null) adminOrderFromDynamic(raw, doc.id) else null
                }
                if (order != null) MainScope().launch { try { fsSaveOrder(order) } catch (_: Throwable) {} }
                order
            }
        } catch (e: Throwable) {
            console.warn("Encrypted decode failed for ${doc.id}: ${e.message}; trying legacy")
            try {
                val o = doc.data(AdminOrder.serializer())
                o.copy(orderDate = normalizeCsvDate(o.orderDate))
            } catch (e2: Throwable) {
                val raw: dynamic = doc.asDynamic().js?.data()
                if (raw != null) adminOrderFromDynamic(raw, doc.id)
                else { console.error("No data for ${doc.id}"); null }
            }
        }
    }.sortedByDescending { orderDateSortKey(it.orderDate) }
    console.log("fsLoadOrders: decoded ${orders.size} / $total orders")
    return orders to total
}

private suspend fun fsSaveOrder(order: AdminOrder) {
    val enc = encrypt(coder.encodeToString(order), currentUid())
    userOrders().document(order.id).set(EncryptedPayload.serializer(), EncryptedPayload(enc))
}

private suspend fun fsDeleteOrder(id: String) {
    userOrders().document(id).delete()
}

private suspend fun fsUpdateOrder(order: AdminOrder) = fsSaveOrder(order)

private suspend fun fsLoadSnapshots(): List<MonthlySnapshot> = try {
    val snap = userSnapshots().get()
    val uid  = currentUid()
    snap.documents.mapNotNull { doc ->
        try {
            val payload = doc.data(EncryptedPayload.serializer())
            if (payload.enc.isNotEmpty()) {
                coder.decodeFromString<MonthlySnapshot>(decrypt(payload.enc, uid))
            } else {
                val snapshot = doc.data(MonthlySnapshot.serializer())
                MainScope().launch { try { fsSaveSnapshot(snapshot) } catch (_: Throwable) {} }
                snapshot
            }
        } catch (_: Throwable) {
            try { doc.data(MonthlySnapshot.serializer()) } catch (_: Throwable) { null }
        }
    }
} catch (e: Throwable) { emptyList() }

private suspend fun fsSaveSnapshot(snapshot: MonthlySnapshot) {
    val enc = encrypt(coder.encodeToString(snapshot), currentUid())
    userSnapshots().document(snapshot.month).set(EncryptedPayload.serializer(), EncryptedPayload(enc))
}

private suspend fun fsDeleteSnapshot(month: String) {
    userSnapshots().document(month).delete()
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Extract YYYY-MM key from a MM/DD/YY date (used by the month selector)
private fun orderMonthKey(date: String): String? {
    val p = date.split("/")
    if (p.size != 3) return null
    val mm = p[0].padStart(2, '0')
    val yy = p[2].trim()
    return if (mm.length == 2 && yy.length == 2) "20$yy-$mm" else null
}

// MM/DD/YY → YYYYMMDD string for chronological sorting
private fun orderDateSortKey(date: String): String {
    val p = date.split("/")
    if (p.size != 3) return date
    return "20${p[2].trim()}${p[0].padStart(2, '0')}${p[1].padStart(2, '0')}"
}

private fun parseDateMs(mmddyy: String): Double? {
    val p = mmddyy.split("/")
    if (p.size != 3) return null
    val mm = p[0].toIntOrNull() ?: return null
    val dd = p[1].toIntOrNull() ?: return null
    val yy = p[2].trim().toIntOrNull() ?: return null
    return Date(2000 + yy, mm - 1, dd).getTime()
}

// Parses YYYY-MM-DD (from HTML date input) to epoch ms
private fun parseIsoDateMs(iso: String): Double? {
    val p = iso.split("-")
    if (p.size != 3) return null
    val yyyy = p[0].toIntOrNull() ?: return null
    val mm   = p[1].toIntOrNull() ?: return null
    val dd   = p[2].toIntOrNull() ?: return null
    return Date(yyyy, mm - 1, dd).getTime()
}

private fun addDaysMs(ms: Double, days: Int): Double = ms + days.toDouble() * 86_400_000.0

private fun todayMs(): Double {
    val d = Date()
    return Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

private fun msToMmDdYy(ms: Double): String {
    val d = Date(ms)
    val mm = (d.getMonth() + 1).toString().padStart(2, '0')
    val dd = d.getDate().toString().padStart(2, '0')
    val yy = (d.getFullYear() % 100).toString().padStart(2, '0')
    return "$mm/$dd/$yy"
}

private fun Double.fmt2(): String {
    val rounded = (this * 100).roundToLong()
    val whole   = rounded / 100
    val frac    = kotlin.math.abs(rounded % 100).toString().padStart(2, '0')
    return "$whole.$frac"
}

private fun currentMonthKey(): String {
    val now = Date()
    val m = now.getMonth() + 1
    return "${now.getFullYear()}-${m.toString().padStart(2, '0')}"
}

private fun todayIso(): String {
    val now = Date()
    val m  = (now.getMonth() + 1).toString().padStart(2, '0')
    val d  = now.getDate().toString().padStart(2, '0')
    return "${now.getFullYear()}-$m-$d"
}

private fun firstOfMonthIso(): String = "${currentMonthKey()}-01"

private fun monthLabel(key: String, s: AboutStrings = getStrings()): String {
    val names = listOf(s.monthJanuary, s.monthFebruary, s.monthMarch, s.monthApril,
        s.monthMay, s.monthJune, s.monthJuly, s.monthAugust, s.monthSeptember,
        s.monthOctober, s.monthNovember, s.monthDecember)
    return try {
        val p = key.split("-")
        "${names[(p[1].toInt() - 1).coerceIn(0, 11)]} ${p[0]}"
    } catch (e: Exception) { key }
}

// ── CSV import ────────────────────────────────────────────────────────────────

private fun parseCsvRow(line: String): List<String> {
    val result  = mutableListOf<String>()
    val current = StringBuilder()
    var inQuotes = false
    var i = 0
    while (i < line.length) {
        val c = line[i]
        when {
            c == '"' && !inQuotes -> inQuotes = true
            c == '"' && inQuotes  -> {
                if (i + 1 < line.length && line[i + 1] == '"') { current.append('"'); i++ }
                else inQuotes = false
            }
            c == ',' && !inQuotes -> { result.add(current.toString().trim()); current.clear() }
            else -> current.append(c)
        }
        i++
    }
    result.add(current.toString().trim())
    return result
}

private val EU_COUNTRY_NAMES = setOf(
    "germany", "france", "italy", "spain", "netherlands", "belgium", "sweden", "poland",
    "austria", "switzerland", "denmark", "finland", "norway", "portugal", "greece",
    "czech republic", "hungary", "romania", "slovakia", "slovenia", "croatia", "bulgaria",
    "estonia", "latvia", "lithuania", "luxembourg", "malta", "cyprus", "ireland"
)

private fun normalizeCountry(raw: String): String {
    val s = raw.trim().lowercase()
    return when {
        s.contains("united states") || s == "us" || s == "usa" || s.contains("america") -> "US"
        s.contains("united kingdom") || s == "uk" || s == "gb" || s.contains("great britain") -> "UK"
        s.contains("canada") -> "Canada"
        s in EU_COUNTRY_NAMES -> "EU"
        else -> "Other"
    }
}

private val MONTH_NAMES = mapOf(
    "jan" to "01", "feb" to "02", "mar" to "03", "apr" to "04",
    "may" to "05", "jun" to "06", "jul" to "07", "aug" to "08",
    "sep" to "09", "oct" to "10", "nov" to "11", "dec" to "12"
)

// Normalizes any date format to MM/DD/YY for storage and display
private fun normalizeCsvDate(raw: String): String {
    val s = raw.trim()
    // Already MM/DD/YY — pass through (normalize padding)
    val shortSlash = Regex("^(\\d{1,2})/(\\d{1,2})/(\\d{2})$").find(s)
    if (shortSlash != null) {
        val (mm, dd, yy) = shortSlash.destructured
        return "${mm.padStart(2,'0')}/${dd.padStart(2,'0')}/$yy"
    }
    // YYYY-MM-DD (legacy ISO stored by older versions)
    if (s.length >= 10 && s.substring(0, 10).matches(Regex("\\d{4}-\\d{2}-\\d{2}"))) {
        val yy = s.substring(2, 4)
        val mm = s.substring(5, 7)
        val dd = s.substring(8, 10)
        return "$mm/$dd/$yy"
    }
    // MM/DD/YYYY or M/D/YYYY
    val longSlash = Regex("^(\\d{1,2})/(\\d{1,2})/(\\d{4})").find(s)
    if (longSlash != null) {
        val (mm, dd, yyyy) = longSlash.destructured
        return "${mm.padStart(2,'0')}/${dd.padStart(2,'0')}/${yyyy.substring(2)}"
    }
    // "Apr 15, 2025" or "April 15, 2025"
    val wordMatch = Regex("^([A-Za-z]+)\\s+(\\d{1,2}),?\\s+(\\d{4})").find(s)
    if (wordMatch != null) {
        val (mon, dd, yyyy) = wordMatch.destructured
        val mm = MONTH_NAMES[mon.lowercase().take(3)] ?: return s
        return "$mm/${dd.padStart(2,'0')}/${yyyy.substring(2)}"
    }
    return s
}

private fun csvRowToOrder(
    row: List<String>, idx: Map<String, Int>, skuCosts: Map<String, Double>
): AdminOrder? {
    fun col(key: String) = idx[key]?.takeIf { it >= 0 }?.let { if (it < row.size) row[it] else "" } ?: ""
    fun colDouble(key: String) = col(key).replace(",", ".").toDoubleOrNull() ?: 0.0
    val dateRaw     = normalizeCsvDate(col("saleDate"))
    val name        = col("fullName").ifBlank { return null }
    val qty         = col("qty").toIntOrNull()?.coerceAtLeast(1) ?: 1
    val country     = normalizeCountry(col("country"))
    val sku         = col("sku")
    val prodCost    = skuCosts[sku.uppercase()] ?: skuCosts[sku] ?: 0.0
    val customValue = (colDouble("orderValue") - colDouble("discount")).coerceAtLeast(0.0)
    val tariffCost  = if (country == "US") customValue * 0.10 else 0.0
    val id = Date().getTime().toLong().toString()
    return AdminOrder(
        id = id, orderDate = dateRaw, orderQuantity = qty,
        receiverName = name, trackingNumber = "", shippingDate = "",
        country = country, customValue = customValue, profit = 0.0,
        shippingCost = 0.0, tariffCost = tariffCost,
        productCost = prodCost, netProfit = -(tariffCost + prodCost),
        status = "Processing", sku = sku
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────

@Page
@Composable
fun AdminPage() {
    document.title = getStrings().admPageTitle

    LaunchedEffect(Unit) {
        val style = document.createElement("style")
        style.textContent = """
            @keyframes adminSpin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
            @keyframes adminCardIn {
                from { opacity: 0; transform: translateY(14px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0)    scale(1);    }
            }
            @keyframes adminFormSlide {
                from { opacity: 0; transform: translateY(-10px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes adminBarGrow {
                from { transform: scaleX(0); }
                to   { transform: scaleX(1); }
            }
            @keyframes adminBarGrowV {
                from { transform: scaleY(0); }
                to   { transform: scaleY(1); }
            }
            @keyframes adminDonutIn {
                from { opacity: 0; transform: scale(0.78) rotate(-15deg); }
                to   { opacity: 1; transform: scale(1)    rotate(0deg);   }
            }
            @keyframes adminRowIn {
                from { opacity: 0; transform: translateX(-6px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes adminSavedFlash {
                0%   { background: rgba(255,255,255,0.14); }
                100% { background: transparent; }
            }
            @keyframes adminRowOut {
                from { opacity: 1; transform: translateX(0);    }
                to   { opacity: 0; transform: translateX(20px); }
            }
        """.trimIndent()
        document.head?.appendChild(style)
    }

    val ctx = rememberPageContext()

    fun handleLogout() {
        signOut(getFirebaseAuth())
            .then { _: dynamic -> ctx.router.navigateTo("/login"); null }
            .catch { _: dynamic -> null }
    }

    AdminDashboard(onLogout = { handleLogout() })
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

private const val BG      = "#0d0d0d"
private const val SURFACE = "#1a1a1a"
private const val TEXT    = "#f0f0f0"
private const val SUB     = "#9ca3af"
private const val BORDER  = "rgba(255,255,255,0.12)"
private const val INPUT_BG = "#0d0d0d"

@Composable
private fun AdminDashboard(onLogout: () -> Unit) {
    val s = remember { getStrings() }
    val orders      = remember { mutableStateOf<List<AdminOrder>>(emptyList()) }
    val fsDocCount  = remember { mutableStateOf(0) }   // raw Firestore document count
    val snapshots   = remember { mutableStateOf<List<MonthlySnapshot>>(emptyList()) }
    val losses      = remember { mutableStateOf<List<LossEntry>>(emptyList()) }
    val skuCosts        = remember { mutableStateOf<Map<String, Double>>(emptyMap()) }
    val skuDeliveryDays = remember { mutableStateOf<Map<String, Int>>(emptyMap()) }
    val monthlyAdSpend  = remember { mutableStateOf<Map<String, Double>>(emptyMap()) }
    val shopName      = remember { mutableStateOf("") }
    val shopLogoUrl   = remember { mutableStateOf("") }
    val isLoading   = remember { mutableStateOf(true) }
    val filterMonth = remember { mutableStateOf(currentMonthKey()) }
    var currentTab  by remember { mutableStateOf("orders") }
    val showForm    = remember { mutableStateOf(false) }
    val saveError   = remember { mutableStateOf("") }

    // Form fields
    var fDate      by remember { mutableStateOf("") }
    var fQty       by remember { mutableStateOf("1") }
    var fName      by remember { mutableStateOf("") }
    var fTracking  by remember { mutableStateOf("") }
    var fShipDate  by remember { mutableStateOf("") }
    var fCountry   by remember { mutableStateOf("US") }
    var fCustomVal by remember { mutableStateOf("") }
    var fProfit    by remember { mutableStateOf("") }
    var fShipCost  by remember { mutableStateOf("") }
    var fProdCost  by remember { mutableStateOf("") }
    var fSku          by remember { mutableStateOf("") }
    var fStatus       by remember { mutableStateOf("Processing") }
    var fCargoCompany by remember { mutableStateOf("") }
    var formError     by remember { mutableStateOf("") }
    var isSaving   by remember { mutableStateOf(false) }

    // Inline edit state
    val editingId         = remember { mutableStateOf<String?>(null) }
    var editTracking      by remember { mutableStateOf("") }
    var editShipDate      by remember { mutableStateOf("") }
    var editStatus        by remember { mutableStateOf("Processing") }
    var editShipCost      by remember { mutableStateOf("") }
    var editCargoCompany  by remember { mutableStateOf("") }
    var isSavingEdit      by remember { mutableStateOf(false) }
    val recentlySavedId  = remember { mutableStateOf<String?>(null) }
    val pendingDeleteId    = remember { mutableStateOf<String?>(null) }
    val deletingId         = remember { mutableStateOf<String?>(null) }
    var showClearAllDialog by remember { mutableStateOf(false) }
    var isClearingAll      by remember { mutableStateOf(false) }

    val fTariff    = if (fCountry == "US") (fCustomVal.toDoubleOrNull() ?: 0.0) * 0.10 else 0.0
    val fNetProfit = (fProfit.toDoubleOrNull() ?: 0.0) - (fShipCost.toDoubleOrNull() ?: 0.0) - fTariff - (fProdCost.toDoubleOrNull() ?: 0.0)

    // CSV import
    var csvImporting by remember { mutableStateOf(false) }
    var csvMsg       by remember { mutableStateOf("") }
    var csvIsError   by remember { mutableStateOf(false) }

    // Ad spend edit state
    var editingAd by remember { mutableStateOf(false) }
    var adInput   by remember { mutableStateOf("") }
    var adSaving  by remember { mutableStateOf(false) }

    var arrowTooltipId by remember { mutableStateOf<String?>(null) }

    // Filter / sort / search
    var statusFilter by remember { mutableStateOf("All") }
    var sortOrder    by remember { mutableStateOf("date_desc") }
    var searchQuery  by remember { mutableStateOf("") }
    var dateFrom     by remember { mutableStateOf(firstOfMonthIso()) }
    var dateTo       by remember { mutableStateOf(todayIso()) }

    DisposableEffect(Unit) {
        val unsub = onAuthStateChanged(getFirebaseAuth()) { user ->
            if (user != null) {
                isLoading.value = true
                MainScope().launch {
                    try {
                        val (loaded, docTotal) = fsLoadOrders()
                        orders.value    = loaded
                        fsDocCount.value = docTotal
                        val cfg           = fsLoadConfig()
                        skuCosts.value        = cfg.skus
                        skuDeliveryDays.value = cfg.skuDeliveryDays
                        monthlyAdSpend.value  = cfg.monthlyAdSpend
                        shopName.value    = cfg.shopName
                        shopLogoUrl.value = cfg.shopLogoUrl
                        snapshots.value   = fsLoadSnapshots()
                        losses.value      = fsLoadLosses()
                        // If orders span multiple months switch to "all" so nothing is hidden
                        val months = loaded.mapNotNull { orderMonthKey(it.orderDate) }.distinct()
                        when {
                            months.size > 1  -> filterMonth.value = "all"
                            months.size == 1 -> filterMonth.value = months.first()
                        }
                    } catch (e: Throwable) {
                        console.error("Firestore load error: ${e.message}")
                    } finally {
                        isLoading.value = false
                    }
                }
            } else {
                isLoading.value = false
            }
        }
        onDispose { unsub() }
    }

    // Stats
    val monthOrders  = if (filterMonth.value == "all") orders.value
                      else orders.value.filter { orderMonthKey(it.orderDate) == filterMonth.value }
    val availMonths  = orders.value.mapNotNull { orderMonthKey(it.orderDate) }.distinct().sortedDescending()
    val totOrders    = monthOrders.size
    val totQty       = monthOrders.sumOf { it.orderQuantity }
    val totDelivered = monthOrders.count { it.status == "Delivered" }
    val totShipped   = monthOrders.count { it.status == "Shipped" }
    val totProcess   = monthOrders.count { it.status == "Processing" }
    val totProfit    = monthOrders.sumOf { it.profit }
    val totNet       = monthOrders.sumOf { it.netProfit }
    val totShipCost  = monthOrders.sumOf { it.shippingCost }
    val totTariff    = monthOrders.sumOf { it.tariffCost }
    val totProdCost  = monthOrders.sumOf { it.productCost }
    val countryOrder = listOf("US", "UK", "EU", "Canada", "Other")
    val totByCountry = countryOrder.associateWith { c ->
        monthOrders.count { o -> if (c == "Other") o.country !in listOf("US","UK","EU","Canada","USA") else o.country == c || (c == "US" && o.country == "USA") }
    }
    val totBySku = monthOrders
        .filter { it.sku.isNotBlank() }
        .groupBy { it.sku }
        .mapValues { (_, v) -> v.size }
    val totAds = monthlyAdSpend.value[filterMonth.value] ?: 0.0

    val dateFromMs = parseIsoDateMs(dateFrom)
    val dateToMs   = parseIsoDateMs(dateTo)?.let { it + 86_400_000.0 } // include the "to" day fully

    val displayOrders = monthOrders
        .filter { o ->
            (statusFilter == "All" || o.status == statusFilter) &&
            (searchQuery.isEmpty() || o.receiverName.contains(searchQuery, ignoreCase = true)) &&
            (dateFromMs == null || (parseDateMs(o.orderDate) ?: 0.0) >= dateFromMs) &&
            (dateToMs   == null || (parseDateMs(o.orderDate) ?: Double.MAX_VALUE) <= dateToMs)
        }
        .let { list ->
            when (sortOrder) {
                "date_asc" -> list.sortedBy { orderDateSortKey(it.orderDate) }
                "revenue"  -> list.sortedByDescending { it.netProfit }
                else       -> list
            }
        }

    Div({
        style {
            property("position", "fixed"); property("inset", "0"); property("z-index", "9999")
            property("overflow-y", "auto"); property("background", BG)
            property("font-family", "'Gelasio', Georgia, serif")
            property("color", TEXT)
        }
    }) {

        // ── Delete confirmation dialog ─────────────────────────────────────
        pendingDeleteId.value?.let { deleteId ->
            Div({
                style {
                    property("position", "fixed"); property("inset", "0"); property("z-index", "99999")
                    property("background", "rgba(0,0,0,0.6)")
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
                    property("backdrop-filter", "blur(3px)")
                }
                onClick { pendingDeleteId.value = null }
            }) {
                Div({
                    style {
                        property("background", SURFACE)
                        property("border", "1px solid rgba(239,68,68,0.35)")
                        property("border-radius", "14px")
                        property("padding", "32px 36px")
                        property("display", "flex"); property("flex-direction", "column"); property("gap", "20px")
                        property("min-width", "320px"); property("max-width", "400px")
                        property("box-shadow", "0 20px 60px rgba(0,0,0,0.4)")
                    }
                    onClick { it.stopPropagation() }
                }) {
                    Div({ style { property("font-size", "17px"); property("font-weight", "600"); property("color", TEXT) } }) {
                        Text(s.admDeleteTitle)
                    }
                    Div({ style { property("font-size", "14px"); property("color", SUB); property("line-height", "1.5") } }) {
                        Text(s.admDeleteBody)
                    }
                    Div({ style { property("display", "flex"); property("gap", "10px"); property("justify-content", "flex-end") } }) {
                        Button({
                            style {
                                property("padding", "8px 18px"); property("border-radius", "8px"); property("border", "1px solid $BORDER")
                                property("background", "transparent"); property("color", TEXT); property("font-size", "14px")
                                property("cursor", "pointer"); property("font-family", "inherit")
                            }
                            onClick { pendingDeleteId.value = null }
                        }) { Text(s.admDeleteCancel) }
                        Button({
                            style {
                                property("padding", "8px 18px"); property("border-radius", "8px"); property("border", "none")
                                property("background", "#ef4444"); property("color", "white"); property("font-size", "14px")
                                property("font-weight", "600"); property("cursor", "pointer"); property("font-family", "inherit")
                            }
                            onClick {
                                val id = deleteId
                                pendingDeleteId.value = null
                                deletingId.value = id
                                MainScope().launch {
                                    try {
                                        fsDeleteOrder(id)
                                        window.setTimeout({
                                            orders.value = orders.value.filter { it.id != id }
                                            deletingId.value = null
                                        }, 350)
                                    } catch (e: Throwable) {
                                        deletingId.value = null
                                        saveError.value = "${s.admErrDeleteOrder}${e.message}"
                                    }
                                }
                            }
                        }) { Text(s.admDeleteConfirm) }
                    }
                }
            }
        }

        // ── Clear All confirmation dialog ──────────────────────────────────
        if (showClearAllDialog) {
            Div({
                style {
                    property("position", "fixed"); property("inset", "0"); property("z-index", "99999")
                    property("background", "rgba(0,0,0,0.6)")
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
                    property("backdrop-filter", "blur(3px)")
                }
                onClick { if (!isClearingAll) showClearAllDialog = false }
            }) {
                Div({
                    style {
                        property("background", SURFACE)
                        property("border", "1px solid rgba(239,68,68,0.35)")
                        property("border-radius", "14px")
                        property("padding", "32px 36px")
                        property("display", "flex"); property("flex-direction", "column"); property("gap", "20px")
                        property("min-width", "340px"); property("max-width", "420px")
                        property("box-shadow", "0 20px 60px rgba(0,0,0,0.4)")
                    }
                    onClick { it.stopPropagation() }
                }) {
                    Div({ style { property("font-size", "17px"); property("font-weight", "600"); property("color", TEXT) } }) {
                        Text(s.admClearAllTitle)
                    }
                    Div({ style { property("font-size", "14px"); property("color", SUB); property("line-height", "1.5") } }) {
                        Text(s.admClearAllBodyPre + orders.value.size + s.admClearAllBodyPost)
                    }
                    Div({ style { property("display", "flex"); property("gap", "10px"); property("justify-content", "flex-end") } }) {
                        Button({
                            style {
                                property("padding", "8px 18px"); property("border-radius", "8px"); property("border", "1px solid $BORDER")
                                property("background", "transparent"); property("color", TEXT); property("font-size", "14px")
                                property("cursor", if (isClearingAll) "not-allowed" else "pointer"); property("font-family", "inherit")
                            }
                            onClick { if (!isClearingAll) showClearAllDialog = false }
                        }) { Text(s.admClearAllCancel) }
                        Button({
                            style {
                                property("padding", "8px 18px"); property("border-radius", "8px"); property("border", "none")
                                property("background", if (isClearingAll) "rgba(239,68,68,0.5)" else "#ef4444")
                                property("color", "white"); property("font-size", "14px")
                                property("font-weight", "600")
                                property("cursor", if (isClearingAll) "not-allowed" else "pointer")
                                property("font-family", "inherit")
                            }
                            onClick {
                                if (!isClearingAll) {
                                    isClearingAll = true
                                    val toDelete = orders.value.toList()
                                    MainScope().launch {
                                        try {
                                            toDelete.forEach { o -> fsDeleteOrder(o.id) }
                                            orders.value = emptyList()
                                        } catch (e: Throwable) {
                                            saveError.value = "${s.admErrClearOrders}${e.message}"
                                        } finally {
                                            isClearingAll = false
                                            showClearAllDialog = false
                                        }
                                    }
                                }
                            }
                        }) { Text(if (isClearingAll) s.admClearAllDeleting else s.admClearAllConfirm) }
                    }
                }
            }
        }

        // ── CSV import overlay ─────────────────────────────────────────────
        if (csvImporting) {
            Div({
                style {
                    property("position", "fixed"); property("inset", "0"); property("z-index", "99999")
                    property("background", "rgba(0,0,0,0.72)")
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
                    property("backdrop-filter", "blur(4px)")
                    property("pointer-events", "all")
                }
            }) {
                Div({
                    style {
                        property("background", SURFACE)
                        property("border", "1px solid rgba(255,255,255,0.20)")
                        property("border-radius", "16px")
                        property("padding", "40px 48px")
                        property("display", "flex"); property("flex-direction", "column")
                        property("align-items", "center"); property("gap", "20px")
                        property("box-shadow", "0 24px 64px rgba(0,0,0,0.6)")
                        property("min-width", "280px")
                    }
                }) {
                    Div({
                        style {
                            property("width", "44px"); property("height", "44px")
                            property("border", "3px solid rgba(255,255,255,0.15)")
                            property("border-top-color", "#d1d5db")
                            property("border-radius", "50%")
                            property("animation", "adminSpin 0.75s linear infinite")
                        }
                    }) {}
                    Div({
                        style {
                            property("font-size", "15px"); property("font-weight", "700")
                            property("color", TEXT); property("letter-spacing", "-0.01em")
                        }
                    }) { Text(s.admCsvOverlayTitle) }
                    Div({
                        style {
                            property("font-size", "13px"); property("color", SUB); property("text-align", "center")
                        }
                    }) { Text(s.admCsvOverlayBody) }
                }
            }
        }

        // ── Topbar ────────────────────────────────────────────────────────
        Div({
            style {
                property("background", "#141414")
                property("border-bottom", "1px solid rgba(255,255,255,0.18)")
                property("padding", "0 32px"); property("height", "58px")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("position", "sticky"); property("top", "0"); property("z-index", "100")
            }
        }) {
            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "12px") } }) {
                if (shopLogoUrl.value.isNotEmpty()) {
                    Img(src = shopLogoUrl.value) {
                        style {
                            property("width", "32px"); property("height", "32px")
                            property("border-radius", "8px"); property("object-fit", "cover")
                            property("border", "1px solid rgba(255,255,255,0.22)")
                        }
                        attr("alt", "shop logo")
                    }
                } else {
                    Div({
                        style {
                            property("background", "rgba(255,255,255,0.18)"); property("border-radius", "8px")
                            property("width", "32px"); property("height", "32px"); property("display", "flex")
                            property("align-items", "center"); property("justify-content", "center"); property("font-size", "18px")
                        }
                    }) { Text("📊") }
                }
                Div({ style { property("font-size", "15px"); property("font-weight", "700"); property("color", "white"); property("letter-spacing", "-0.01em") } }) {
                    Text(shopName.value.ifEmpty { "SellerScope" })
                }
                Div({ style { property("color", "rgba(255,255,255,0.3)"); property("font-size", "14px") } }) { Text("/") }
                Div({ style { property("font-size", "14px"); property("color", "rgba(255,255,255,0.7)") } }) { Text(s.admTopbarOrders) }
            }
            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "12px") } }) {
                Select({
                    onInput { e -> filterMonth.value = e.target.asDynamic().value as String; editingAd = false }
                    style {
                        property("padding", "6px 10px"); property("background", "rgba(255,255,255,0.12)")
                        property("color", "white"); property("border", "1px solid rgba(255,255,255,0.22)")
                        property("border-radius", "7px"); property("font-size", "13px"); property("cursor", "pointer")
                        property("outline", "none"); property("font-family", "inherit")
                    }
                }) {
                    Option("all", { value("all"); if (filterMonth.value == "all") attr("selected", "selected") }) { Text(s.admTopbarAllMonths) }
                    val now = Date()
                    val curYear = now.getFullYear(); val curMonth = now.getMonth() + 1
                    val recentMonths = (0..11).map { offset ->
                        val total = curYear * 12 + curMonth - 1 - offset
                        "${total / 12}-${((total % 12) + 1).toString().padStart(2, '0')}"
                    }
                    val months = (recentMonths + availMonths).distinct().sortedDescending()
                    months.forEach { m ->
                        Option(m, { value(m); if (m == filterMonth.value) attr("selected", "selected") }) { Text(monthLabel(m)) }
                    }
                }
                Button({
                    style {
                        property("background", "rgba(255,255,255,0.12)"); property("color", "white")
                        property("border", "1px solid rgba(255,255,255,0.22)"); property("border-radius", "7px")
                        property("padding", "6px 14px"); property("font-size", "13px"); property("font-weight", "500")
                        property("cursor", "pointer"); property("font-family", "inherit")
                    }
                    onClick { onLogout() }
                }) { Text(s.admTopbarSignOut) }
            }
        }

        // ── Sidebar + content ─────────────────────────────────────────────
        Div({ style { property("display", "flex"); property("height", "calc(100vh - 58px)"); property("overflow", "hidden") } }) {

            // Sidebar
            Div({
                style {
                    property("width", "210px"); property("flex-shrink", "0")
                    property("background", SURFACE); property("border-right", "1px solid $BORDER")
                    property("padding", "20px 12px"); property("overflow-y", "auto")
                    property("display", "flex"); property("flex-direction", "column"); property("gap", "2px")
                }
            }) {
                Div({ style { property("padding", "4px 14px 16px"); property("font-size", "11px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.08em"); property("color", SUB) } }) {
                    Text(s.admNavLabel)
                }
                val todayNow = todayMs()
                val overdueCount = orders.value.count { o ->
                    val days = skuDeliveryDays.value[o.sku.trim()] ?: return@count false
                    val orderMs = parseDateMs(normalizeCsvDate(o.orderDate)) ?: return@count false
                    val estMs = addDaysMs(orderMs, days)
                    if (o.shippingDate.isNotEmpty()) {
                        val shipMs = parseDateMs(normalizeCsvDate(o.shippingDate)) ?: return@count false
                        shipMs > estMs
                    } else {
                        todayNow > estMs
                    }
                }

                listOf(
                    "orders"   to ("📦" to s.admNavOrders),
                    "shipment" to ("🚚" to s.admNavShipment),
                    "history"  to ("📊" to s.admNavHistory),
                    "loss"     to ("📉" to s.admNavLoss),
                    "app_info" to ("⚙️" to s.admNavAppInfo)
                ).forEach { (tab, pair) ->
                    val isActive = currentTab == tab
                    Div({
                        style {
                            property("display", "flex"); property("align-items", "center"); property("gap", "9px")
                            property("padding", "9px 14px"); property("border-radius", "8px")
                            property("cursor", "pointer"); property("font-size", "13px")
                            property("font-weight", if (isActive) "700" else "500")
                            property("color", if (isActive) TEXT else SUB)
                            property("background", if (isActive) "rgba(255,255,255,0.12)" else "transparent")
                            property("user-select", "none"); property("transition", "all 0.15s")
                        }
                        onClick { currentTab = tab }
                    }) {
                        Span({ style { property("font-size", "15px") } }) { Text(pair.first) }
                        Text(pair.second)
                        if (tab == "shipment" && overdueCount > 0) {
                            Div({
                                style {
                                    property("margin-left", "auto")
                                    property("background", "#ef4444"); property("color", "white")
                                    property("font-size", "11px"); property("font-weight", "700")
                                    property("min-width", "18px"); property("height", "18px")
                                    property("border-radius", "999px"); property("display", "flex")
                                    property("align-items", "center"); property("justify-content", "center")
                                    property("padding", "0 5px"); property("line-height", "1")
                                }
                            }) { Text(overdueCount.toString()) }
                        }
                    }
                }
            }

            // Main content
            Div({ style { property("flex", "1"); property("overflow-y", "auto") } }) {
                if (currentTab == "app_info") {
                    AppInfoTab(skuCosts, skuDeliveryDays, shopName, shopLogoUrl, monthlyAdSpend)
                } else if (currentTab == "shipment") {
                    ShipmentTab(orders.value, skuDeliveryDays.value)
                } else if (currentTab == "history") {
                    HistoricalDataTab(snapshots, skuCosts)
                } else if (currentTab == "loss") {
                    LossTab(losses, skuCosts.value)
                } else {
                    Div({
                        style {
                            property("padding", "28px 32px")
                            property("display", "flex"); property("flex-direction", "column"); property("gap", "24px")
                            property("width", "100%"); property("box-sizing", "border-box")
                        }
                    }) {

                        // Page header
                        Div({
                            style {
                                property("display", "flex"); property("align-items", "center")
                                property("justify-content", "space-between"); property("flex-wrap", "wrap"); property("gap", "12px")
                            }
                        }) {
                            Div {
                                Div({ style { property("font-size", "22px"); property("font-weight", "800"); property("letter-spacing", "-0.02em"); property("margin-bottom", "2px") } }) {
                                    Text(if (filterMonth.value == "all") s.admAllOrders else monthLabel(filterMonth.value, s))
                                }
                                Div({ style { property("font-size", "13px"); property("color", SUB) } }) {
                                    when {
                                        isLoading.value -> Text(s.admLoadingOrders)
                                        fsDocCount.value > orders.value.size ->
                                            Text("$totOrders ${s.admOrdersUnit}  ·  $totQty ${s.admItemsUnit}  ·  ⚠ ${fsDocCount.value} ${s.admFsInFirestore} (${fsDocCount.value - orders.value.size} ${s.admFsFailedDecode})")
                                        else -> Text("$totOrders ${s.admOrdersUnit}  ·  $totQty ${s.admItemsUnit}")
                                    }
                                }
                            }
                            // Hidden CSV file input
                            Input(InputType.File) {
                                id("csv-import-input")
                                attr("accept", ".csv,text/csv")
                                style { property("display", "none") }
                                onChange { ev ->
                                    val fileBlob = ev.target.asDynamic().files?.item(0)
                                        ?.unsafeCast<org.w3c.files.Blob>() ?: return@onChange
                                    csvImporting = true; csvMsg = ""
                                    val reader = org.w3c.files.FileReader()
                                    reader.onload = { _ ->
                                        val text = reader.result?.toString() ?: ""
                                        val lines = text.replace("\r\n", "\n").replace("\r", "\n")
                                            .split("\n").map { it.trim() }.filter { it.isNotEmpty() }
                                        if (lines.size < 2) {
                                            csvMsg = s.admCsvErrEmpty; csvIsError = true
                                            csvImporting = false
                                        } else {
                                            val headers = parseCsvRow(lines[0]).map { it.trim('"').trim() }
                                            val saleIdx     = headers.indexOfFirst { it.equals("Sale Date",        ignoreCase = true) }
                                            val nameIdx     = headers.indexOfFirst { it.equals("Full Name",        ignoreCase = true) }
                                            val qtyIdx      = headers.indexOfFirst { it.equals("Number of Items",  ignoreCase = true) }
                                            val countryIdx  = headers.indexOfFirst { it.equals("Ship Country",     ignoreCase = true) }
                                            val skuIdx      = headers.indexOfFirst { it.equals("SKU",              ignoreCase = true) }
                                            val orderValIdx = headers.indexOfFirst { it.equals("Order Value",      ignoreCase = true) }
                                            val discountIdx = headers.indexOfFirst { it.equals("Discount Amount",  ignoreCase = true) }
                                            val missing = buildList {
                                                if (saleIdx    < 0) add("Sale Date")
                                                if (nameIdx    < 0) add("Full Name")
                                                if (qtyIdx     < 0) add("Number of Items")
                                                if (countryIdx < 0) add("Ship Country")
                                                if (skuIdx     < 0) add("SKU")
                                            }
                                            if (missing.isNotEmpty()) {
                                                csvMsg = "${s.admCsvErrMissingCols}${missing.joinToString(", ")}"; csvIsError = true
                                                csvImporting = false
                                            } else {
                                                val idxMap = mapOf(
                                                    "saleDate"   to saleIdx,    "fullName" to nameIdx,
                                                    "qty"        to qtyIdx,     "country"  to countryIdx,
                                                    "sku"        to skuIdx,
                                                    "orderValue" to orderValIdx, "discount" to discountIdx
                                                )
                                                val newOrders = mutableListOf<AdminOrder>()
                                                var skipped = 0
                                                lines.drop(1).forEachIndexed { i, line ->
                                                    val row = parseCsvRow(line)
                                                    val order = csvRowToOrder(row, idxMap, skuCosts.value)
                                                    if (order != null) newOrders.add(order.copy(
                                                        id = (Date().getTime().toLong() + i).toString()
                                                    ))
                                                    else skipped++
                                                }
                                                if (newOrders.isEmpty()) {
                                                    csvMsg = "${s.admCsvErrNoValid} ($skipped ${s.admCsvSkipped})"; csvIsError = true
                                                    csvImporting = false
                                                } else {
                                                    MainScope().launch {
                                                        try {
                                                            newOrders.forEach { fsSaveOrder(it) }
                                                            val merged = (orders.value + newOrders)
                                                                .sortedByDescending { orderDateSortKey(it.orderDate) }
                                                            orders.value = merged
                                                            val dominantMonth = newOrders
                                                                .mapNotNull { o -> orderMonthKey(o.orderDate) }
                                                                .groupingBy { it }.eachCount()
                                                                .maxByOrNull { it.value }?.key
                                                            if (dominantMonth != null) filterMonth.value = dominantMonth
                                                            csvMsg = "${s.admCsvImported} ${newOrders.size} ${s.admOrdersUnit}${if (skipped > 0) " ($skipped ${s.admCsvSkipped})" else ""}"; csvIsError = false
                                                        } catch (e: Throwable) {
                                                            csvMsg = "${s.admErrSaveFailed}${e.message}"; csvIsError = true
                                                        } finally {
                                                            csvImporting = false
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        ev.target.asDynamic().value = ""
                                    }
                                    reader.readAsText(fileBlob)
                                }
                            }
                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "10px") } }) {
                                // Import CSV button
                                Button({
                                    style {
                                        property("background", "rgba(255,255,255,0.07)"); property("color", TEXT)
                                        property("border", "1px solid $BORDER"); property("border-radius", "9px"); property("padding", "9px 16px")
                                        property("font-size", "14px"); property("font-weight", "600")
                                        property("cursor", if (csvImporting) "not-allowed" else "pointer")
                                        property("font-family", "inherit"); property("opacity", if (csvImporting) "0.6" else "1")
                                    }
                                    onClick {
                                        if (!csvImporting) {
                                            document.getElementById("csv-import-input")?.asDynamic()?.click()
                                        }
                                    }
                                }) { Text(if (csvImporting) s.admImportingBtn else s.admImportBtn) }
                                Button({
                                    style {
                                        property("background", "linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%)")
                                        property("color", "white"); property("border", "none")
                                        property("border-radius", "9px"); property("padding", "9px 20px")
                                        property("font-size", "14px"); property("font-weight", "600"); property("cursor", "pointer")
                                        property("font-family", "inherit")
                                        property("box-shadow", "0 2px 8px rgba(0,0,0,0.2)")
                                    }
                                    onClick { showForm.value = true }
                                }) { Text(s.admNewOrderBtn) }
                            }
                        }
                        // CSV result message
                        if (csvMsg.isNotEmpty()) {
                            Div({
                                style {
                                    val isErr = csvIsError
                                    property("background", if (isErr) "rgba(239,68,68,0.08)" else "rgba(16,185,129,0.08)")
                                    property("border", "1px solid " + if (isErr) "rgba(239,68,68,0.25)" else "rgba(16,185,129,0.25)")
                                    property("border-radius", "8px"); property("padding", "10px 16px")
                                    property("color", if (isErr) "#ef4444" else "#10b981")
                                    property("font-size", "13px"); property("font-weight", "600")
                                    property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                                }
                            }) {
                                Text(csvMsg)
                                Span({
                                    style { property("cursor", "pointer"); property("opacity", "0.6"); property("font-size", "16px"); property("margin-left", "12px") }
                                    onClick { csvMsg = "" }
                                }) { Text("×") }
                            }
                        }

                        // Save error banner
                        if (saveError.value.isNotEmpty()) {
                            Div({
                                style {
                                    property("background", "rgba(239,68,68,0.08)"); property("border", "1px solid rgba(239,68,68,0.25)")
                                    property("border-radius", "8px"); property("padding", "12px 16px")
                                    property("color", "#ef4444"); property("font-size", "13px")
                                }
                            }) { Text(saveError.value) }
                        }

                        // ── Stat cards ────────────────────────────────────────
                        Div({ style { property("display", "grid"); property("grid-template-columns", "repeat(4, 1fr)"); property("gap", "14px") } }) {
                            DashCard(s.admStatTotalOrders,  totOrders.toString(),   "📦", "#d1d5db", animDelay = "0s")
                            DashCard(s.admStatDelivered,     totDelivered.toString(), "✅", "#10b981", animDelay = "0.07s")
                            DashCard(s.admStatInTransit,    totShipped.toString(),   "🚚", "#3b82f6", animDelay = "0.14s")
                            DashCard(s.admStatProcessing,    totProcess.toString(),   "⏳", "#f59e0b", animDelay = "0.21s")
                        }
                        Div({ style { property("display", "grid"); property("grid-template-columns", "repeat(4, 1fr)"); property("gap", "14px") } }) {
                            DashCard(s.admStatGrossProfit,      "\$${totProfit.fmt2()}",                              "💰", "#10b981", animDelay = "0.28s")
                            DashCard(s.admStatNetProfit,        "\$${totNet.fmt2()}",                                 "📈", "#059669", animDelay = "0.35s")
                            // Shipping / Ads card with editable ad value
                            Div({
                                    style {
                                        property("background", SURFACE); property("border-radius", "12px")
                                        property("border", "1px solid $BORDER"); property("padding", "20px 20px 18px")
                                        property("display", "flex"); property("flex-direction", "column"); property("gap", "10px")
                                        property("box-shadow", "0 1px 4px rgba(0,0,0,0.05)")
                                        property("position", "relative"); property("overflow", "hidden")
                                        property("animation", "adminCardIn 0.45s ease 0.42s both")
                                    }
                                }) {
                                    Div({ style { property("display", "flex"); property("align-items", "flex-start"); property("justify-content", "space-between") } }) {
                                        Div({ style { property("font-size", "12px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em") } }) {
                                            Text(s.admStatShippingAds)
                                        }
                                        Div({
                                            style {
                                                property("background", "#ef444418"); property("border-radius", "8px")
                                                property("width", "34px"); property("height", "34px"); property("display", "flex")
                                                property("align-items", "center"); property("justify-content", "center"); property("font-size", "17px")
                                            }
                                        }) { Text("✈️") }
                                    }
                                    if (editingAd) {
                                        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "6px") } }) {
                                            Span({ style { property("font-size", "14px"); property("font-weight", "700"); property("color", TEXT) } }) { Text("\$${totShipCost.fmt2()} /") }
                                            Input(InputType.Text) {
                                                value(adInput)
                                                onInput { adInput = it.value }
                                                attr("placeholder", "0.00")
                                                style {
                                                    property("width", "80px"); property("font-size", "14px"); property("font-weight", "700")
                                                    property("border", "1px solid #d1d5db"); property("border-radius", "6px")
                                                    property("background", "rgba(255,255,255,0.07)"); property("color", TEXT)
                                                    property("padding", "3px 7px"); property("outline", "none"); property("font-family", "inherit")
                                                }
                                            }
                                            Span({
                                                style {
                                                    property("cursor", "pointer"); property("font-size", "12px"); property("font-weight", "700")
                                                    property("color", "white"); property("background", "#d1d5db")
                                                    property("padding", "3px 10px"); property("border-radius", "6px")
                                                    property("opacity", if (adSaving) "0.6" else "1")
                                                }
                                                onClick {
                                                    if (!adSaving) {
                                                        val v = adInput.toDoubleOrNull() ?: 0.0
                                                        val updated = monthlyAdSpend.value + (filterMonth.value to v)
                                                        monthlyAdSpend.value = updated
                                                        adSaving = true
                                                        MainScope().launch {
                                                            try { fsSaveConfig(SkuConfig(skuCosts.value, shopName.value, shopLogoUrl.value, skuDeliveryDays.value, updated)) }
                                                            finally { adSaving = false; editingAd = false }
                                                        }
                                                    }
                                                }
                                            }) { Text(if (adSaving) "…" else "✓") }
                                            Span({
                                                style {
                                                    property("cursor", "pointer"); property("font-size", "12px"); property("color", SUB)
                                                    property("padding", "3px 7px"); property("border-radius", "6px"); property("border", "1px solid $BORDER")
                                                }
                                                onClick { editingAd = false }
                                            }) { Text("✕") }
                                        }
                                    } else {
                                        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px"); property("line-height", "1.2") } }) {
                                            Div({ style { property("font-size", "18px"); property("font-weight", "800"); property("letter-spacing", "-0.03em"); property("color", TEXT) } }) {
                                                Text("\$${totShipCost.fmt2()} / \$${totAds.fmt2()}")
                                            }
                                            // Pencil icon SVG next to ads value
                                            Span({
                                                style {
                                                    property("cursor", "pointer"); property("display", "flex"); property("align-items", "center")
                                                    property("color", SUB); property("opacity", "0.7"); property("flex-shrink", "0")
                                                }
                                                onClick {
                                                    adInput = totAds.fmt2()
                                                    editingAd = true
                                                }
                                            }) {
                                                DomSideEffect {
                                                    it.innerHTML = """<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>"""
                                                }
                                            }
                                        }
                                    }
                                    Div({
                                        style {
                                            property("position", "absolute"); property("bottom", "0"); property("left", "0"); property("right", "0")
                                            property("height", "3px"); property("background", "#ef4444"); property("opacity", "0.6")
                                        }
                                    }) {}
                            }
                            DashCard(s.admStatTariffProdCost,"\$${totTariff.fmt2()} / \$${totProdCost.fmt2()}",   "🏛️", "#dc2626", valueSize = "18px", animDelay = "0.49s")
                        }

                        // ── New Order Dialog ──────────────────────────────────
                        if (showForm.value) {
                            Div({
                                style {
                                    property("position", "fixed"); property("inset", "0"); property("z-index", "9000")
                                    property("background", "rgba(0,0,0,0.65)")
                                    property("display", "flex"); property("align-items", "center"); property("justify-content", "center")
                                    property("backdrop-filter", "blur(4px)")
                                    property("padding", "24px"); property("overflow-y", "auto")
                                }
                                onClick {
                                    fDate = ""; fQty = "1"; fName = ""; fTracking = ""; fShipDate = ""
                                    fCountry = "US"; fCustomVal = ""; fProfit = ""; fShipCost = ""; fProdCost = ""
                                    fSku = ""; fStatus = "Processing"; formError = ""
                                    showForm.value = false
                                }
                            }) {
                            Div({
                                style {
                                    property("background", SURFACE); property("border-radius", "16px")
                                    property("border", "1px solid $BORDER"); property("overflow", "hidden")
                                    property("box-shadow", "0 24px 80px rgba(0,0,0,0.5)")
                                    property("width", "100%"); property("max-width", "680px")
                                    property("animation", "adminFormSlide 0.25s ease both")
                                }
                                onClick { it.stopPropagation() }
                            }) {
                                Div({
                                    style {
                                        property("background", "rgba(255,255,255,0.05)")
                                        property("border-bottom", "1px solid $BORDER"); property("padding", "16px 24px")
                                        property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                                    }
                                }) {
                                    Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "10px") } }) {
                                        Div({ style { property("width", "8px"); property("height", "8px"); property("border-radius", "50%"); property("background", "#10b981") } }) {}
                                        Div({ style { property("font-size", "14px"); property("font-weight", "600"); property("letter-spacing", "-0.01em") } }) {
                                            Text(s.admFormHeader)
                                        }
                                    }
                                    Div({
                                        style {
                                            property("cursor", "pointer"); property("color", SUB)
                                            property("font-size", "22px"); property("line-height", "1")
                                            property("padding", "2px 7px"); property("border-radius", "6px")
                                        }
                                        onClick {
                                            fDate = ""; fQty = "1"; fName = ""; fTracking = ""; fShipDate = ""
                                            fCountry = "US"; fCustomVal = ""; fProfit = ""; fShipCost = ""; fProdCost = ""
                                            fSku = ""; fStatus = "Processing"; formError = ""
                                            showForm.value = false
                                        }
                                    }) { Text("×") }
                                }

                                Div({ style { property("padding", "24px") } }) {
                                    FormSectionLabel(s.admFormSectionOrder)
                                    Div({
                                        style {
                                            property("display", "grid"); property("grid-template-columns", "repeat(3, 1fr)")
                                            property("gap", "16px"); property("margin-bottom", "24px")
                                        }
                                    }) {
                                        FGroup(s.admFormFieldOrderDate) {
                                            Input(InputType.Date) {
                                                value(fDate); onInput { fDate = it.value }
                                                fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldQty) {
                                            Input(InputType.Text) {
                                                value(fQty)
                                                onInput {
                                                    fQty = it.value
                                                    val qty = it.value.toIntOrNull() ?: 1
                                                    skuCosts.value[fSku]?.let { cost ->
                                                        val total = cost * qty
                                                        val cents = (total * 100).roundToLong()
                                                        fProdCost = "${cents / 100}.${(cents % 100).toString().padStart(2, '0')}"
                                                    }
                                                }
                                                attr("type", "number"); attr("min", "1"); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldStatus) {
                                            Select({
                                                onInput { e -> fStatus = e.target.asDynamic().value as String }
                                                selectStyle()
                                            }) {
                                                listOf(
                                                    "Processing" to s.admStatusProcessing,
                                                    "Shipped"    to s.admStatusShipped,
                                                    "Delivered"  to s.admStatusDelivered
                                                ).forEach { (v, label) ->
                                                    Option(v, { value(v); if (v == fStatus) attr("selected", "selected") }) { Text(label) }
                                                }
                                            }
                                        }
                                        FGroup(s.admFormFieldReceiverName) {
                                            Input(InputType.Text) {
                                                value(fName); onInput { fName = it.value }
                                                attr("placeholder", s.admFormPlaceholderFullName); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldTrackingNumber) {
                                            Input(InputType.Text) {
                                                value(fTracking); onInput { fTracking = it.value }
                                                attr("placeholder", s.admFormPlaceholderTracking); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldCargoCompany) {
                                            Select({
                                                onInput { e -> fCargoCompany = e.target.asDynamic().value as String }
                                                selectStyle()
                                            }) {
                                                Option("", { value(""); if (fCargoCompany.isEmpty()) attr("selected", "selected") }) { Text("—") }
                                                listOf("UPS", "FedEx").forEach { c ->
                                                    Option(c, { value(c); if (c == fCargoCompany) attr("selected", "selected") }) { Text(c) }
                                                }
                                            }
                                        }
                                        FGroup(s.admFormFieldShippingDate) {
                                            Input(InputType.Date) { value(fShipDate); onInput { fShipDate = it.value }; fldStyle() }
                                        }
                                    }

                                    FormSectionLabel(s.admFormSectionFinancials)
                                    Div({
                                        style {
                                            property("display", "grid"); property("grid-template-columns", "repeat(3, 1fr)")
                                            property("gap", "16px"); property("margin-bottom", "24px")
                                        }
                                    }) {
                                        FGroup(s.admFormFieldSku) {
                                            Select({
                                                onInput { e ->
                                                    val selected = e.target.asDynamic().value as String
                                                    fSku = selected
                                                    skuCosts.value[selected]?.let { cost ->
                                                        val qty = fQty.toIntOrNull() ?: 1
                                                        val total = cost * qty
                                                        val cents = (total * 100).roundToLong()
                                                        fProdCost = "${cents / 100}.${(cents % 100).toString().padStart(2, '0')}"
                                                    }
                                                }
                                                selectStyle()
                                            }) {
                                                Option("", { value(""); if (fSku.isEmpty()) attr("selected", "selected") }) { Text(s.admFormSelectSkuPlaceholder) }
                                                skuCosts.value.entries.sortedBy { it.key }.forEach { (sku, cost) ->
                                                    val cents = (cost * 100).roundToLong()
                                                    val costStr = "${cents / 100}.${(cents % 100).toString().padStart(2, '0')}"
                                                    Option(sku, { value(sku); if (sku == fSku) attr("selected", "selected") }) {
                                                        Text("$sku  (\$$costStr)")
                                                    }
                                                }
                                            }
                                        }
                                        FGroup(s.admFormFieldCountry) {
                                            Select({
                                                onInput { e -> fCountry = e.target.asDynamic().value as String }
                                                selectStyle()
                                            }) {
                                                listOf("US", "UK", "EU", "Canada", "Other").forEach { c ->
                                                    Option(c, { value(c); if (c == fCountry) attr("selected", "selected") }) { Text(c) }
                                                }
                                            }
                                        }
                                        FGroup(s.admFormFieldCustomValue) {
                                            Input(InputType.Text) {
                                                value(fCustomVal); onInput { fCustomVal = it.value }
                                                attr("placeholder", s.admFormPlaceholderCustomValue); attr("inputmode", "decimal"); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldProfit) {
                                            Input(InputType.Text) {
                                                value(fProfit); onInput { fProfit = it.value }
                                                attr("placeholder", "0.00"); attr("inputmode", "decimal"); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldShipCost) {
                                            Input(InputType.Text) {
                                                value(fShipCost); onInput { fShipCost = it.value }
                                                attr("placeholder", "0.00"); attr("inputmode", "decimal"); fldStyle()
                                            }
                                        }
                                        FGroup(s.admFormFieldProdCost) {
                                            Input(InputType.Text) {
                                                value(fProdCost); onInput { fProdCost = it.value }
                                                attr("placeholder", "0.00"); attr("inputmode", "decimal"); fldStyle()
                                            }
                                        }
                                        FGroup(if (fCountry == "US") s.admFormFieldTariffUS else s.admFormFieldTariffNonUS) {
                                            Div({
                                                style {
                                                    property("padding", "10px 12px"); property("border-radius", "7px")
                                                    property("border", "1px solid $BORDER"); property("font-size", "14px")
                                                    property("font-weight", "600")
                                                    property("background", "rgba(255,255,255,0.06)")
                                                    property("color", SUB)
                                                }
                                            }) { Text("\$${fTariff.fmt2()}") }
                                        }
                                    }

                                    // Net profit preview
                                    Div({
                                        style {
                                            property("border-radius", "10px"); property("padding", "16px 20px")
                                            property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                                            property("background", if (fNetProfit >= 0) "rgba(16,185,129,0.08)" else "rgba(239,68,68,0.08)")
                                            property("border", "1px solid ${if (fNetProfit >= 0) "rgba(16,185,129,0.25)" else "rgba(239,68,68,0.25)"}")
                                            property("margin-bottom", "20px")
                                        }
                                    }) {
                                        Div({ style { property("font-size", "13px"); property("font-weight", "600"); property("color", SUB) } }) {
                                            Text(s.admFormNetProfitLabel)
                                        }
                                        Div({
                                            style {
                                                property("font-size", "22px"); property("font-weight", "800"); property("letter-spacing", "-0.02em")
                                                property("color", if (fNetProfit >= 0) "#10b981" else "#ef4444")
                                            }
                                        }) { Text("\$${fNetProfit.fmt2()}") }
                                    }

                                    if (formError.isNotEmpty()) {
                                        Div({
                                            style {
                                                property("background", "rgba(239,68,68,0.08)"); property("border", "1px solid rgba(239,68,68,0.25)")
                                                property("border-radius", "8px"); property("padding", "10px 14px")
                                                property("color", "#ef4444"); property("font-size", "13px"); property("margin-bottom", "16px")
                                            }
                                        }) { Text(formError) }
                                    }

                                    Div({ style { property("display", "flex"); property("justify-content", "flex-end") } }) {
                                        Button({
                                            style {
                                                property("padding", "10px 32px"); property("border-radius", "8px")
                                                property("background", if (isSaving) "#6b7280" else "#10b981")
                                                property("color", "white"); property("border", "none")
                                                property("font-size", "14px"); property("font-weight", "700")
                                                property("cursor", if (isSaving) "not-allowed" else "pointer")
                                                property("font-family", "inherit"); property("letter-spacing", "0.01em")
                                                property("box-shadow", "0 2px 8px rgba(16,185,129,0.3)")
                                            }
                                            onClick {
                                                if (isSaving) return@onClick
                                                if (fDate.isBlank() || fName.isBlank()) {
                                                    formError = s.admFormErrorRequired
                                                    return@onClick
                                                }
                                                if (!Regex("^\\d{4}-\\d{2}-\\d{2}$").matches(fDate.trim())) {
                                                    formError = s.admFormErrorDate
                                                    return@onClick
                                                }
                                                val tariff    = if (fCountry == "US") (fCustomVal.toDoubleOrNull() ?: 0.0) * 0.10 else 0.0
                                                val netProfit = (fProfit.toDoubleOrNull() ?: 0.0) - (fShipCost.toDoubleOrNull() ?: 0.0) - tariff - (fProdCost.toDoubleOrNull() ?: 0.0)
                                                val order = AdminOrder(
                                                    id             = Date().getTime().toString(),
                                                    orderDate      = normalizeCsvDate(fDate.trim()),
                                                    orderQuantity  = fQty.toIntOrNull() ?: 1,
                                                    receiverName   = fName,
                                                    trackingNumber = fTracking,
                                                    shippingDate   = normalizeCsvDate(fShipDate.trim()),
                                                    country        = fCountry,
                                                    customValue    = fCustomVal.toDoubleOrNull() ?: 0.0,
                                                    profit         = fProfit.toDoubleOrNull() ?: 0.0,
                                                    shippingCost   = fShipCost.toDoubleOrNull() ?: 0.0,
                                                    tariffCost     = tariff,
                                                    productCost    = fProdCost.toDoubleOrNull() ?: 0.0,
                                                    netProfit      = netProfit,
                                                    status         = fStatus,
                                                    sku            = fSku,
                                                    cargoCompany   = fCargoCompany
                                                )
                                                isSaving = true; saveError.value = ""
                                                MainScope().launch {
                                                    try {
                                                        fsSaveOrder(order)
                                                        orders.value = listOf(order) + orders.value
                                                        fDate = ""; fQty = "1"; fName = ""; fTracking = ""; fShipDate = ""
                                                        fCountry = "US"; fCustomVal = ""; fProfit = ""; fShipCost = ""; fProdCost = ""
                                                        fSku = ""; fStatus = "Processing"; fCargoCompany = ""; formError = ""
                                                        showForm.value = false
                                                    } catch (e: Throwable) {
                                                        saveError.value = "${s.admErrSaveFailed}${e.message}"
                                                    } finally {
                                                        isSaving = false
                                                    }
                                                }
                                            }
                                        }) { Text(if (isSaving) s.admFormSavingBtn else s.admFormSaveBtn) }
                                    }
                                }
                            }
                        }
                        }

                        // Loading state
                        if (isLoading.value) {
                            Div({
                                style {
                                    property("background", SURFACE); property("border-radius", "12px")
                                    property("border", "1px solid $BORDER"); property("padding", "72px 24px")
                                    property("text-align", "center")
                                }
                            }) {
                                Div({
                                    style {
                                        property("width", "40px"); property("height", "40px")
                                        property("border", "3px solid rgba(255,255,255,0.12)")
                                        property("border-top-color", "#d1d5db")
                                        property("border-radius", "50%")
                                        property("animation", "adminSpin 0.75s linear infinite")
                                        property("margin", "0 auto 16px")
                                    }
                                }) {}
                                Div({ style { property("font-size", "14px"); property("color", SUB) } }) { Text(s.admLoadingOrders) }
                            }
                        } else if (monthOrders.isEmpty()) {
                            Div({
                                style {
                                    property("background", SURFACE); property("border-radius", "12px")
                                    property("border", "1px solid $BORDER"); property("padding", "72px 24px")
                                    property("text-align", "center")
                                }
                            }) {
                                Div({ style { property("font-size", "36px"); property("margin-bottom", "12px") } }) { Text("📭") }
                                Div({ style { property("font-size", "15px"); property("font-weight", "600"); property("margin-bottom", "4px") } }) { Text(s.admNoOrdersTitle) }
                                Div({ style { property("font-size", "13px"); property("color", SUB) } }) {
                                    Text("${s.admNoOrdersBodyPrefix} ${if (filterMonth.value == "all") s.admAllOrders else monthLabel(filterMonth.value, s)}.")
                                }
                            }
                        } else {
                            // Filter / Sort / Search bar
                            Div({
                                style {
                                    property("background", SURFACE); property("border-radius", "12px")
                                    property("border", "1px solid $BORDER"); property("padding", "12px 16px")
                                    property("display", "flex"); property("align-items", "center")
                                    property("gap", "12px"); property("flex-wrap", "wrap")
                                    property("box-shadow", "0 2px 8px rgba(0,0,0,0.25)")
                                }
                            }) {
                                // Search
                                Div({
                                    style {
                                        property("display", "flex"); property("align-items", "center"); property("gap", "8px")
                                        property("flex", "1"); property("min-width", "180px")
                                        property("background", "rgba(255,255,255,0.07)")
                                        property("border", "1px solid $BORDER"); property("border-radius", "8px")
                                        property("padding", "6px 12px")
                                    }
                                }) {
                                    Span({ style { property("font-size", "13px"); property("color", SUB) } }) { Text("🔍") }
                                    Input(InputType.Text) {
                                        value(searchQuery); onInput { searchQuery = it.value }
                                        attr("placeholder", s.admSearchPlaceholder)
                                        style {
                                            property("border", "none"); property("outline", "none"); property("background", "transparent")
                                            property("font-size", "13px"); property("color", TEXT); property("width", "100%")
                                            property("font-family", "inherit")
                                        }
                                    }
                                    if (searchQuery.isNotEmpty()) {
                                        Span({
                                            style { property("cursor", "pointer"); property("color", SUB); property("font-size", "14px"); property("line-height", "1") }
                                            onClick { searchQuery = "" }
                                        }) { Text("×") }
                                    }
                                }

                                // Status filter pills
                                fun statusLabel(status: String): String = when(status) {
                                    "All" -> s.admStatusAll
                                    "Processing" -> s.admStatusProcessing
                                    "Shipped" -> s.admStatusShipped
                                    "Delivered" -> s.admStatusDelivered
                                    else -> status
                                }
                                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "6px"); property("flex-wrap", "wrap") } }) {
                                    listOf("All", "Processing", "Shipped", "Delivered").forEach { tab ->
                                        val active = statusFilter == tab
                                        val accent = when (tab) {
                                            "Delivered"  -> "#10b981"
                                            "Shipped"    -> "#3b82f6"
                                            "Processing" -> "#f59e0b"
                                            else         -> "#d1d5db"
                                        }
                                        Span({
                                            style {
                                                property("padding", "4px 13px"); property("border-radius", "999px")
                                                property("font-size", "12px"); property("font-weight", if (active) "700" else "500")
                                                property("cursor", "pointer"); property("user-select", "none")
                                                property("background", if (active) "${accent}22" else "rgba(255,255,255,0.06)")
                                                property("color", if (active) accent else SUB)
                                                property("border", "1px solid ${if (active) accent else BORDER}")
                                                property("transition", "all 0.15s")
                                            }
                                            onClick { statusFilter = tab }
                                        }) { Text(statusLabel(tab)) }
                                    }
                                }

                                // Sort selector
                                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "7px") } }) {
                                    Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.05em"); property("white-space", "nowrap") } }) {
                                        Text(s.admSortBy)
                                    }
                                    Select({
                                        onInput { e -> sortOrder = e.target.asDynamic().value as String }
                                        style {
                                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                                            property("background", "rgba(255,255,255,0.07)")
                                            property("color", TEXT); property("font-size", "12px"); property("font-weight", "600")
                                            property("padding", "5px 10px"); property("cursor", "pointer"); property("font-family", "inherit")
                                            property("outline", "none")
                                        }
                                    }) {
                                        listOf(
                                            "date_desc" to s.admSortDateDesc,
                                            "date_asc"  to s.admSortDateAsc,
                                            "revenue"   to s.admSortRevenue
                                        ).forEach { (v, label) ->
                                            Option(label, { value(v); if (v == sortOrder) attr("selected", "selected") }) { Text(label) }
                                        }
                                    }
                                }

                                // Date range filter
                                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "6px"); property("flex-wrap", "wrap") } }) {
                                    Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.05em"); property("white-space", "nowrap") } }) {
                                        Text(s.admDateFrom)
                                    }
                                    Input(InputType.Date) {
                                        value(dateFrom)
                                        onInput { dateFrom = it.value }
                                        style {
                                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                                            property("background", "rgba(255,255,255,0.07)")
                                            property("color", TEXT); property("font-size", "12px"); property("font-weight", "600")
                                            property("padding", "5px 8px"); property("cursor", "pointer"); property("font-family", "inherit")
                                            property("outline", "none")
                                        }
                                    }
                                    Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.05em"); property("white-space", "nowrap") } }) {
                                        Text(s.admDateTo)
                                    }
                                    Input(InputType.Date) {
                                        value(dateTo)
                                        onInput { dateTo = it.value }
                                        style {
                                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                                            property("background", "rgba(255,255,255,0.07)")
                                            property("color", TEXT); property("font-size", "12px"); property("font-weight", "600")
                                            property("padding", "5px 8px"); property("cursor", "pointer"); property("font-family", "inherit")
                                            property("outline", "none")
                                        }
                                    }
                                    if (dateFrom.isNotEmpty() || dateTo.isNotEmpty()) {
                                        Span({
                                            style {
                                                property("cursor", "pointer"); property("color", SUB); property("font-size", "14px")
                                                property("line-height", "1"); property("padding", "2px 6px")
                                                property("border-radius", "999px"); property("border", "1px solid $BORDER")
                                            }
                                            onClick { dateFrom = ""; dateTo = "" }
                                        }) { Text("×") }
                                    }
                                }
                            }

                            // Orders table
                            var tableOpen by remember { mutableStateOf(true) }
                            Div({
                                style {
                                    property("background", SURFACE); property("border-radius", "12px")
                                    property("border", "1px solid $BORDER"); property("overflow", "hidden")
                                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                                }
                            }) {
                                Div({
                                    style {
                                        property("padding", "14px 20px")
                                        if (tableOpen) property("border-bottom", "1px solid $BORDER")
                                        property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                                        property("background", "rgba(255,255,255,0.05)")
                                        property("cursor", "pointer"); property("user-select", "none")
                                    }
                                    onClick { tableOpen = !tableOpen }
                                }) {
                                    Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                                        Text("${s.admAllOrders} — ${if (filterMonth.value == "all") s.admAllOrders else monthLabel(filterMonth.value, s)}")
                                    }
                                    Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                                        if (orders.value.isNotEmpty()) {
                                            Span({
                                                style {
                                                    property("font-size", "12px"); property("color", "#ef4444")
                                                    property("cursor", "pointer"); property("padding", "3px 10px")
                                                    property("border-radius", "999px"); property("border", "1px solid rgba(239,68,68,0.35)")
                                                    property("user-select", "none"); property("transition", "background 0.15s")
                                                }
                                                onClick { it.stopPropagation(); showClearAllDialog = true }
                                            }) { Text(s.admClearAll) }
                                        }
                                        Div({
                                            style {
                                                property("font-size", "12px"); property("color", SUB)
                                                property("background", "rgba(255,255,255,0.09)")
                                                property("padding", "3px 10px"); property("border-radius", "999px")
                                            }
                                        }) { Text("${displayOrders.size} ${s.admRecordsOf} ${monthOrders.size} ${s.admRecords}") }
                                        Span({
                                            style {
                                                property("font-size", "11px"); property("color", SUB)
                                                property("transition", "transform 0.2s"); property("display", "inline-block")
                                                property("transform", if (tableOpen) "rotate(0deg)" else "rotate(-90deg)")
                                            }
                                        }) { Text("▼") }
                                    }
                                }
                                if (tableOpen) Div({ style { property("overflow-x", "auto") } }) {
                                    Table({
                                        style {
                                            property("width", "100%"); property("border-collapse", "collapse")
                                            property("font-size", "13px"); property("min-width", "1100px")
                                        }
                                    }) {
                                        Thead {
                                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                                listOf(s.admTableDate, s.admTableQty, s.admTableReceiver, s.admTableSku, s.admTableTracking, s.admTableCargo, s.admTableShipDate, s.admTableCountry, s.admTableStatus,
                                                    s.admTableProfit, s.admTableShipCost, s.admTableTariff, s.admTableProdCost, s.admTableNetProfit, "").forEach { h ->
                                                    Th({
                                                        style {
                                                            property("padding", "11px 16px"); property("text-align", "left")
                                                            property("font-size", "11px"); property("font-weight", "700")
                                                            property("text-transform", "uppercase"); property("letter-spacing", "0.06em")
                                                            property("color", SUB); property("white-space", "nowrap")
                                                        }
                                                    }) { Text(h) }
                                                }
                                            }
                                        }
                                        Tbody {
                                            if (displayOrders.isEmpty()) {
                                                Tr {
                                                    Td({
                                                        attr("colspan", "14")
                                                        style {
                                                            property("padding", "48px 24px"); property("text-align", "center")
                                                            property("color", SUB); property("font-size", "13px")
                                                        }
                                                    }) { Text(s.admNoMatchFilters) }
                                                }
                                            }
                                            displayOrders.forEachIndexed { idx, o ->
                                                val isEditing = o.id == editingId.value
                                                val isRecentlySaved = o.id == recentlySavedId.value
                                                val isDeleting = o.id == deletingId.value
                                                val rowDelay = "${(idx * 0.04).coerceAtMost(0.4)}s"
                                                Tr({
                                                    style {
                                                        property("border-bottom", "1px solid $BORDER")
                                                        if (isEditing)
                                                            property("background", "rgba(255,255,255,0.06)")
                                                        if (isDeleting)
                                                            property("animation", "adminRowOut 0.35s ease forwards")
                                                        else if (isRecentlySaved)
                                                            property("animation", "adminSavedFlash 1.5s ease forwards")
                                                        else
                                                            property("animation", "adminRowIn 0.3s ease $rowDelay both")
                                                    }
                                                }) {
                                                    TCell(o.orderDate, muted = true)
                                                    TCell(o.orderQuantity.toString())
                                                    TCell(o.receiverName, bold = true)
                                                    TCell(o.sku.ifEmpty { "—" }, mono = true)

                                                    // Tracking
                                                    if (isEditing) {
                                                        Td({ style { property("padding", "8px 12px"); property("white-space", "nowrap") } }) {
                                                            Input(InputType.Text) {
                                                                value(editTracking); onInput { editTracking = it.value }
                                                                attr("placeholder", s.admEditPlaceholderTracking)
                                                                inlineEditStyle()
                                                            }
                                                        }
                                                    } else if (o.trackingNumber.isEmpty()) {
                                                        TCell("—", muted = true)
                                                    } else {
                                                        Td({ style { property("padding", "11px 16px"); property("white-space", "nowrap") } }) {
                                                            val trackUrl = when (o.cargoCompany) {
                                                                "FedEx" -> "https://www.fedex.com/fedextrack/?trknbr=${o.trackingNumber}"
                                                                else    -> "https://www.ups.com/track?loc=tr_TR&tracknum=${o.trackingNumber}"
                                                            }
                                                            A(
                                                                href = trackUrl,
                                                                attrs = {
                                                                    attr("target", "_blank")
                                                                    attr("rel", "noopener noreferrer")
                                                                    style {
                                                                        property("color", "#d1d5db"); property("font-family", "ui-monospace, monospace")
                                                                        property("font-size", "13px"); property("text-decoration", "none")
                                                                        property("font-weight", "500"); property("cursor", "pointer")
                                                                    }
                                                                }
                                                            ) { Text(o.trackingNumber) }
                                                        }
                                                    }

                                                    // Cargo Company
                                                    if (isEditing) {
                                                        Td({ style { property("padding", "8px 12px"); property("white-space", "nowrap") } }) {
                                                            Select({
                                                                onInput { e -> editCargoCompany = e.target.asDynamic().value as String }
                                                            }) {
                                                                Option("", { value(""); if (editCargoCompany.isEmpty()) attr("selected", "selected") }) { Text("—") }
                                                                listOf("UPS", "FedEx").forEach { c ->
                                                                    Option(c, { value(c); if (c == editCargoCompany) attr("selected", "selected") }) { Text(c) }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        Td({ style { property("padding", "8px 16px"); property("white-space", "nowrap") } }) {
                                                            when (o.cargoCompany) {
                                                                "UPS"   -> Img(src = "/public/ups.png") {
                                                                    attr("alt", "UPS")
                                                                    style { property("height", "20px"); property("width", "auto"); property("object-fit", "contain"); property("vertical-align", "middle") }
                                                                }
                                                                "FedEx" -> Img(src = "/public/fedex.png") {
                                                                    attr("alt", "FedEx")
                                                                    style { property("height", "18px"); property("width", "auto"); property("object-fit", "contain"); property("vertical-align", "middle") }
                                                                }
                                                                else    -> Span({ style { property("color", "#6b7280"); property("font-size", "13px") } }) { Text("—") }
                                                            }
                                                        }
                                                    }

                                                    // Ship Date
                                                    if (isEditing) {
                                                        Td({ style { property("padding", "8px 12px"); property("white-space", "nowrap") } }) {
                                                            Input(InputType.Date) {
                                                                value(editShipDate); onInput { editShipDate = it.value }
                                                                inlineEditStyle()
                                                            }
                                                        }
                                                    } else {
                                                        TCell(if (o.shippingDate.isEmpty()) "—" else normalizeCsvDate(o.shippingDate), muted = true)
                                                    }

                                                    // Country flag
                                                    Td({ style { property("padding", "8px 16px"); property("white-space", "nowrap") } }) {
                                                        val flag = when (o.country) {
                                                            "US", "USA" -> "🇺🇸"
                                                            "UK"        -> "🇬🇧"
                                                            "EU"        -> "🇪🇺"
                                                            "Canada"    -> "🇨🇦"
                                                            else        -> "🌍"
                                                        }
                                                        var flagHovered by remember { mutableStateOf(false) }
                                                        Div({ style { property("position", "relative"); property("display", "inline-flex") } }) {
                                                            Span({
                                                                style {
                                                                    property("font-size", "18px"); property("cursor", "default")
                                                                    property("line-height", "1"); property("user-select", "none")
                                                                }
                                                                onMouseEnter { flagHovered = true }
                                                                onMouseLeave { flagHovered = false }
                                                            }) { Text(flag) }
                                                            if (flagHovered) {
                                                                Span({
                                                                    style {
                                                                        property("position", "absolute"); property("bottom", "calc(100% + 5px)"); property("left", "50%")
                                                                        property("transform", "translateX(-50%)"); property("background", "rgba(0,0,0,0.78)")
                                                                        property("color", "white"); property("border-radius", "5px"); property("padding", "3px 8px")
                                                                        property("font-size", "11px"); property("font-weight", "600"); property("white-space", "nowrap")
                                                                        property("pointer-events", "none"); property("z-index", "20")
                                                                    }
                                                                }) { Text(o.country.ifEmpty { "Other" }) }
                                                            }
                                                        }
                                                    }

                                                    // Status
                                                    if (isEditing) {
                                                        Td({ style { property("padding", "8px 12px"); property("white-space", "nowrap") } }) {
                                                            Select({
                                                                onInput { e -> editStatus = e.target.asDynamic().value as String }
                                                            }) {
                                                                listOf("Processing", "Shipped", "Delivered").forEach { s ->
                                                                    Option(s, { value(s); if (s == editStatus) attr("selected", "selected") }) { Text(s) }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        Td({ style { property("padding", "11px 16px"); property("white-space", "nowrap") } }) {
                                                            val (sbg, sfg) = when (o.status) {
                                                                "Delivered" -> "rgba(16,185,129,0.12)" to "#059669"
                                                                "Shipped"   -> "rgba(59,130,246,0.12)"  to "#2563eb"
                                                                else        -> "rgba(245,158,11,0.12)"  to "#d97706"
                                                            }
                                                            Span({
                                                                style {
                                                                    property("padding", "3px 10px"); property("border-radius", "999px")
                                                                    property("font-size", "11px"); property("font-weight", "700")
                                                                    property("background", sbg); property("color", sfg)
                                                                    property("letter-spacing", "0.02em")
                                                                }
                                                            }) { Text(o.status) }
                                                        }
                                                    }

                                                    TCell("\$${o.profit.fmt2()}", green = true)

                                                    // Ship Cost (editable)
                                                    if (isEditing) {
                                                        Td({ style { property("padding", "8px 12px"); property("white-space", "nowrap") } }) {
                                                            Input(InputType.Text) {
                                                                value(editShipCost); onInput { editShipCost = it.value }
                                                                attr("placeholder", "0.00"); attr("inputmode", "decimal")
                                                                inlineEditStyle()
                                                            }
                                                        }
                                                    } else {
                                                        TCell("\$${o.shippingCost.fmt2()}")
                                                    }

                                                    TCell("\$${o.tariffCost.fmt2()}")
                                                    TCell("\$${o.productCost.fmt2()}")
                                                    Td({ style { property("padding", "11px 16px"); property("white-space", "nowrap") } }) {
                                                        val netColor = if (o.netProfit >= 0) "#10b981" else "#ef4444"
                                                        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "5px") } }) {
                                                            Span({ style { property("color", netColor) } }) { Text("\$${o.netProfit.fmt2()}") }
                                                            if (o.status == "Shipped" || o.status == "Delivered") {
                                                                val warn = o.shippingCost > o.netProfit
                                                                val tooltipText = if (warn) "Shipping > Net Profit" else "Net Profit > Shipping"
                                                                Span({
                                                                    style {
                                                                        property("position", "relative")
                                                                        property("font-size", "12px"); property("line-height", "1")
                                                                        property("color", if (warn) "#ef4444" else "#f59e0b")
                                                                        property("cursor", "default"); property("display", "inline-flex")
                                                                        property("align-items", "center")
                                                                    }
                                                                    onMouseEnter { arrowTooltipId = o.id }
                                                                    onMouseLeave { arrowTooltipId = null }
                                                                }) {
                                                                    Text(if (warn) "▼" else "▲")
                                                                    if (arrowTooltipId == o.id) {
                                                                        Span({
                                                                            style {
                                                                                property("position", "absolute")
                                                                                property("bottom", "calc(100% + 6px)")
                                                                                property("left", "50%")
                                                                                property("transform", "translateX(-50%)")
                                                                                property("background", "#1a1a2e")
                                                                                property("color", TEXT)
                                                                                property("font-size", "11px"); property("font-weight", "600")
                                                                                property("white-space", "nowrap")
                                                                                property("padding", "4px 9px"); property("border-radius", "6px")
                                                                                property("border", "1px solid $BORDER")
                                                                                property("pointer-events", "none")
                                                                                property("z-index", "9999")
                                                                            }
                                                                        }) { Text(tooltipText) }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // Action cell
                                                    Td({ style { property("padding", "8px 16px"); property("white-space", "nowrap") } }) {
                                                        if (isEditing) {
                                                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "6px") } }) {
                                                                Button({
                                                                    style {
                                                                        property("background", if (isSavingEdit) "#6b7280" else "#10b981")
                                                                        property("color", "white"); property("border", "none"); property("border-radius", "6px")
                                                                        property("padding", "5px 12px"); property("font-size", "12px"); property("font-weight", "600")
                                                                        property("cursor", if (isSavingEdit) "not-allowed" else "pointer")
                                                                        property("font-family", "inherit")
                                                                    }
                                                                    onClick {
                                                                        if (isSavingEdit) return@onClick
                                                                        val newShipCost  = editShipCost.toDoubleOrNull() ?: o.shippingCost
                                                                        val newNetProfit = o.profit - newShipCost - o.tariffCost - o.productCost
                                                                        val updated = o.copy(
                                                                            trackingNumber = editTracking,
                                                                            shippingDate   = normalizeCsvDate(editShipDate.trim()),
                                                                            status         = editStatus,
                                                                            shippingCost   = newShipCost,
                                                                            netProfit      = newNetProfit,
                                                                            cargoCompany   = editCargoCompany
                                                                        )
                                                                        isSavingEdit = true; saveError.value = ""
                                                                        MainScope().launch {
                                                                            try {
                                                                                fsUpdateOrder(updated)
                                                                                orders.value = orders.value.map { if (it.id == updated.id) updated else it }
                                                                                editingId.value = null
                                                                                recentlySavedId.value = updated.id
                                                                                window.setTimeout({ recentlySavedId.value = null }, 1500)
                                                                            } catch (e: Throwable) {
                                                                                saveError.value = "${s.admErrUpdateOrder}${e.message}"
                                                                            } finally {
                                                                                isSavingEdit = false
                                                                            }
                                                                        }
                                                                    }
                                                                }) { Text(if (isSavingEdit) "…" else s.admSaveEdit) }
                                                                Button({
                                                                    style {
                                                                        property("background", "transparent"); property("color", SUB)
                                                                        property("border", "1px solid $BORDER"); property("border-radius", "6px")
                                                                        property("padding", "5px 10px"); property("font-size", "12px"); property("font-weight", "500")
                                                                        property("cursor", "pointer"); property("font-family", "inherit")
                                                                    }
                                                                    onClick { editingId.value = null }
                                                                }) { Text(s.admCancelEdit) }
                                                            }
                                                        } else {
                                                            var editHovered   by remember { mutableStateOf(false) }
                                                            var cloneHovered  by remember { mutableStateOf(false) }
                                                            var deleteHovered by remember { mutableStateOf(false) }
                                                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                                                                // Edit
                                                                Div({ style { property("position", "relative"); property("display", "inline-flex") } }) {
                                                                    Span({
                                                                        style {
                                                                            property("cursor", "pointer"); property("font-size", "15px")
                                                                            property("opacity", if (editHovered) "1" else "0.5")
                                                                            property("user-select", "none"); property("transition", "opacity 0.15s")
                                                                        }
                                                                        onMouseEnter { editHovered = true }
                                                                        onMouseLeave { editHovered = false }
                                                                        onClick {
                                                                            editingId.value  = o.id
                                                                            editTracking     = o.trackingNumber
                                                                            editShipDate     = o.shippingDate
                                                                            editStatus       = o.status
                                                                            editShipCost     = o.shippingCost.fmt2()
                                                                            editCargoCompany = o.cargoCompany
                                                                        }
                                                                    }) { Text("✏️") }
                                                                    if (editHovered) {
                                                                        Span({ style {
                                                                            property("position", "absolute"); property("bottom", "calc(100% + 4px)"); property("left", "50%")
                                                                            property("transform", "translateX(-50%)"); property("background", "rgba(0,0,0,0.75)")
                                                                            property("color", "white"); property("border-radius", "4px"); property("padding", "2px 7px")
                                                                            property("font-size", "11px"); property("white-space", "nowrap"); property("pointer-events", "none")
                                                                            property("z-index", "10"); property("font-weight", "500")
                                                                        } }) { Text(s.admEditTooltip) }
                                                                    }
                                                                }
                                                                // Clone
                                                                Div({ style { property("position", "relative"); property("display", "inline-flex") } }) {
                                                                    Span({
                                                                        style {
                                                                            property("cursor", "pointer"); property("font-size", "15px")
                                                                            property("opacity", if (cloneHovered) "1" else "0.5")
                                                                            property("user-select", "none"); property("transition", "opacity 0.15s")
                                                                        }
                                                                        onMouseEnter { cloneHovered = true }
                                                                        onMouseLeave { cloneHovered = false }
                                                                        onClick {
                                                                            fDate      = o.orderDate.split("/").let { p -> if (p.size == 3) "20${p[2]}-${p[0]}-${p[1]}" else "" }
                                                                            fQty       = o.orderQuantity.toString()
                                                                            fName      = o.receiverName
                                                                            fTracking  = o.trackingNumber
                                                                            fShipDate  = o.shippingDate
                                                                            fCountry   = o.country
                                                                            fCustomVal = o.customValue.fmt2()
                                                                            fProfit    = o.profit.fmt2()
                                                                            fShipCost  = o.shippingCost.fmt2()
                                                                            fProdCost  = o.productCost.fmt2()
                                                                            fSku          = o.sku
                                                                            fStatus       = o.status
                                                                            fCargoCompany = o.cargoCompany
                                                                            formError     = ""
                                                                            showForm.value = true
                                                                            window.scrollTo(0.0, 0.0)
                                                                        }
                                                                    }) { Text("📋") }
                                                                    if (cloneHovered) {
                                                                        Span({ style {
                                                                            property("position", "absolute"); property("bottom", "calc(100% + 4px)"); property("left", "50%")
                                                                            property("transform", "translateX(-50%)"); property("background", "rgba(0,0,0,0.75)")
                                                                            property("color", "white"); property("border-radius", "4px"); property("padding", "2px 7px")
                                                                            property("font-size", "11px"); property("white-space", "nowrap"); property("pointer-events", "none")
                                                                            property("z-index", "10"); property("font-weight", "500")
                                                                        } }) { Text(s.admCloneTooltip) }
                                                                    }
                                                                }
                                                                // Delete
                                                                Div({ style { property("position", "relative"); property("display", "inline-flex") } }) {
                                                                    Span({
                                                                        style {
                                                                            property("color", "#ef4444"); property("cursor", "pointer")
                                                                            property("font-size", "20px"); property("user-select", "none")
                                                                            property("opacity", if (deleteHovered) "1" else "0.5")
                                                                            property("font-weight", "300"); property("transition", "opacity 0.15s")
                                                                        }
                                                                        onMouseEnter { deleteHovered = true }
                                                                        onMouseLeave { deleteHovered = false }
                                                                        onClick {
                                                                            pendingDeleteId.value = o.id
                                                                        }
                                                                    }) { Text("×") }
                                                                    if (deleteHovered) {
                                                                        Span({ style {
                                                                            property("position", "absolute"); property("bottom", "calc(100% + 4px)"); property("left", "50%")
                                                                            property("transform", "translateX(-50%)"); property("background", "rgba(0,0,0,0.75)")
                                                                            property("color", "white"); property("border-radius", "4px"); property("padding", "2px 7px")
                                                                            property("font-size", "11px"); property("white-space", "nowrap"); property("pointer-events", "none")
                                                                            property("z-index", "10"); property("font-weight", "500")
                                                                        } }) { Text(s.admDeleteTooltip) }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            DistributionChart(monthOrders, orders.value, monthlyAdSpend.value, snapshots.value)
                            AnalyticsView(monthOrders)
                            YearlyRevenueBreakdown(orders.value, monthlyAdSpend.value, snapshots.value)
                            MonthlyBarChart(orders.value)
                        }

                        Div({ style { property("height", "24px") } }) {}
                    }
                }
            }
        }
    }
}

// ── App Info Tab ──────────────────────────────────────────────────────────────

@Composable
private fun AppInfoTab(
    skuCosts: MutableState<Map<String, Double>>,
    skuDeliveryDays: MutableState<Map<String, Int>>,
    shopName: MutableState<String>,
    shopLogoUrl: MutableState<String>,
    monthlyAdSpend: MutableState<Map<String, Double>>
) {
    val s = getStrings()
    val scope          = rememberCoroutineScope()
    var newSku         by remember { mutableStateOf("") }
    var newCost        by remember { mutableStateOf("") }
    var newDelivDays   by remember { mutableStateOf("3") }
    var skuError       by remember { mutableStateOf("") }
    var isSaving       by remember { mutableStateOf(false) }
    var saveMsg        by remember { mutableStateOf("") }
    var skuSaveIsError by remember { mutableStateOf(false) }
    var deletingKey    by remember { mutableStateOf<String?>(null) }
    var skuSectionOpen by remember { mutableStateOf(true) }

    var editShopName  by remember { mutableStateOf(shopName.value) }
    var isSavingShop  by remember { mutableStateOf(false) }
    var shopSaveMsg      by remember { mutableStateOf("") }
    var shopSaveIsError  by remember { mutableStateOf(false) }

    // Logo upload state
    var isUploading  by remember { mutableStateOf(false) }
    var uploadMsg    by remember { mutableStateOf("") }
    var uploadIsError by remember { mutableStateOf(false) }

    LaunchedEffect(shopName.value) { editShopName = shopName.value }

    fun uploadLogo(file: dynamic) {
        uploadMsg = ""
        scope.launch {
            isUploading = true
            try {
                val uid  = currentUid()
                val sRef = storageRef(getStorage(), "users/$uid/shop/logo")
                @Suppress("UNCHECKED_CAST")
                val snap = (uploadBytes(sRef, file) as Promise<dynamic>).await()
                @Suppress("UNCHECKED_CAST")
                val url  = (getDownloadURL(snap.ref) as Promise<dynamic>).await()
                val logoUrl = url.toString()
                // Update UI immediately — Firestore save runs in background
                shopLogoUrl.value = logoUrl
                isUploading = false
                uploadMsg = s.admLogoSavedMsg; uploadIsError = false
                try {
                    fsSaveConfig(SkuConfig(skuCosts.value, shopName.value, logoUrl, skuDeliveryDays.value, monthlyAdSpend.value))
                } catch (e: Throwable) {
                    console.error("Logo config save failed: ${e.message}")
                }
            } catch (e: Throwable) {
                uploadMsg = "${s.admErrLogoUpload}${e.message ?: ""}"; uploadIsError = true
                isUploading = false
            }
        }
    }

    suspend fun persistSkus(updatedCosts: Map<String, Double>, updatedDays: Map<String, Int>) {
        isSaving = true; saveMsg = ""
        try {
            fsSaveConfig(SkuConfig(updatedCosts, shopName.value, shopLogoUrl.value, updatedDays, monthlyAdSpend.value))
            skuCosts.value = updatedCosts; skuDeliveryDays.value = updatedDays; saveMsg = s.admSavedMsg; skuSaveIsError = false
        }
        catch (e: Throwable) { saveMsg = "${s.admErrGeneric}${e.message}"; skuSaveIsError = true }
        finally { isSaving = false }
    }

    suspend fun persistShopName(name: String) {
        isSavingShop = true; shopSaveMsg = ""
        try { fsSaveConfig(SkuConfig(skuCosts.value, name, shopLogoUrl.value, skuDeliveryDays.value, monthlyAdSpend.value)); shopName.value = name; shopSaveMsg = s.admSavedMsg; shopSaveIsError = false }
        catch (e: Throwable) { shopSaveMsg = "${s.admErrGeneric}${e.message}"; shopSaveIsError = true }
        finally { isSavingShop = false }
    }



    Div({
        style {
            property("padding", "28px 32px")
            property("display", "flex"); property("flex-direction", "column"); property("gap", "24px")
            property("max-width", "700px")
        }
    }) {
        Div({ style { property("font-size", "20px"); property("font-weight", "800"); property("letter-spacing", "-0.02em") } }) {
            Text(s.admAppInfoTitle)
        }

        // ── Shop Profile card ─────────────────────────────────────────────
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
                property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            }
        }) {
            // Header
            Div({
                style {
                    property("padding", "14px 20px"); property("border-bottom", "1px solid $BORDER")
                    property("background", "rgba(255,255,255,0.05)")
                }
            }) {
                Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                    Text(s.admShopProfileSection)
                }
            }

            // Preview row
            Div({
                style {
                    property("padding", "20px 20px"); property("border-bottom", "1px solid $BORDER")
                    property("display", "flex"); property("align-items", "center"); property("gap", "16px")
                    property("background", "rgba(99,102,241,0.03)"); property("flex-wrap", "wrap")
                }
            }) {
                // Hidden file input
                Input(InputType.File) {
                    id("shop-logo-file-input")
                    attr("accept", "image/png, image/jpeg, image/webp, image/gif")
                    style { property("display", "none") }
                    onChange { event ->
                        val file = event.target.asDynamic().files?.item(0)
                        if (file != null) uploadLogo(file)
                    }
                }

                // Logo or placeholder — clicking it opens the file picker
                Div({
                    style {
                        property("width", "64px"); property("height", "64px"); property("border-radius", "12px")
                        property("overflow", "hidden"); property("flex-shrink", "0"); property("cursor", "pointer")
                        property("border", "2px dashed ${if (shopLogoUrl.value.isEmpty()) "rgba(255,255,255,0.22)" else BORDER}")
                        property("position", "relative")
                    }
                    onClick { document.getElementById("shop-logo-file-input")?.asDynamic()?.click() }
                }) {
                    if (shopLogoUrl.value.isNotEmpty()) {
                        Img(src = shopLogoUrl.value) {
                            style { property("width", "100%"); property("height", "100%"); property("object-fit", "cover") }
                            attr("alt", "shop logo")
                        }
                    } else {
                        Div({
                            style {
                                property("width", "100%"); property("height", "100%")
                                property("display", "flex"); property("flex-direction", "column")
                                property("align-items", "center"); property("justify-content", "center")
                                property("background", "rgba(255,255,255,0.07)"); property("gap", "2px")
                            }
                        }) {
                            Span({ style { property("font-size", "22px") } }) { Text("🏪") }
                            Span({ style { property("font-size", "9px"); property("color", SUB); property("font-weight", "600"); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) {
                                Text(if (isUploading) "…" else s.admLogoUploadBtn)
                            }
                        }
                    }
                }

                // Name + logo controls
                Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "8px"); property("flex", "1") } }) {
                    Div({ style { property("font-size", "16px"); property("font-weight", "700"); property("color", TEXT) } }) {
                        Text(shopName.value.ifEmpty { s.admShopNameNotSet })
                    }
                    Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px"); property("flex-wrap", "wrap") } }) {
                        if (shopLogoUrl.value.isNotEmpty()) {
                            Span({ style { property("font-size", "12px"); property("color", "#10b981"); property("font-weight", "600") } }) {
                                Text(s.admLogoSaved)
                            }
                            Button({
                                style {
                                    property("background", "transparent"); property("color", SUB)
                                    property("border", "1px solid $BORDER"); property("border-radius", "6px")
                                    property("padding", "3px 10px"); property("font-size", "12px"); property("font-weight", "500")
                                    property("cursor", "pointer"); property("font-family", "inherit")
                                }
                                onClick { document.getElementById("shop-logo-file-input")?.asDynamic()?.click() }
                            }) { Text(s.admChangeLogo) }
                        } else {
                            if (isUploading) {
                                Span({ style { property("font-size", "12px"); property("color", SUB) } }) { Text(s.admUploading) }
                            } else {
                                Span({ style { property("font-size", "12px"); property("color", SUB) } }) { Text(s.admNoLogo) }
                            }
                        }
                        if (uploadMsg.isNotEmpty()) {
                            Span({
                                style {
                                    property("font-size", "12px"); property("font-weight", "600")
                                    property("color", if (uploadIsError) "#ef4444" else "#10b981")
                                }
                            }) { Text(uploadMsg) }
                        }
                    }
                }
            }

            // Shop name input row
            Div({
                style {
                    property("padding", "16px 20px")
                    property("display", "flex"); property("align-items", "center"); property("gap", "10px"); property("flex-wrap", "wrap")
                }
            }) {
                Input(InputType.Text) {
                    value(editShopName); onInput { editShopName = it.value }
                    attr("placeholder", s.admShopNamePlaceholder)
                    onKeyUp { if (it.key == "Enter" && !isSavingShop) scope.launch { persistShopName(editShopName.trim()) } }
                    style {
                        property("flex", "1"); property("min-width", "160px")
                        property("border", "1px solid $BORDER"); property("border-radius", "7px")
                        property("padding", "8px 12px"); property("font-size", "14px")
                        property("background", INPUT_BG); property("color", TEXT); property("outline", "none")
                        property("font-family", "inherit")
                    }
                }
                Button({
                    style {
                        property("background", if (isSavingShop) "#6b7280" else "#d1d5db"); property("color", "white")
                        property("border", "none"); property("border-radius", "7px"); property("padding", "8px 18px")
                        property("font-size", "13px"); property("font-weight", "600")
                        property("cursor", if (isSavingShop) "not-allowed" else "pointer")
                        property("font-family", "inherit"); property("white-space", "nowrap")
                    }
                    onClick {
                        if (isSavingShop) return@onClick
                        scope.launch { persistShopName(editShopName.trim()) }
                    }
                }) { Text(if (isSavingShop) s.admSavingNameBtn else s.admSaveNameBtn) }
                if (shopSaveMsg.isNotEmpty()) {
                    Span({ style { property("font-size", "12px"); property("color", if (shopSaveIsError) "#ef4444" else "#10b981"); property("font-weight", "600") } }) {
                        Text(shopSaveMsg)
                    }
                }
            }
        }

        // SKU card
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
                property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            }
        }) {
            Div({
                style {
                    property("padding", "14px 20px")
                    if (skuSectionOpen) property("border-bottom", "1px solid $BORDER")
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                    property("background", "rgba(255,255,255,0.05)")
                    property("cursor", "pointer"); property("user-select", "none")
                }
                onClick { skuSectionOpen = !skuSectionOpen }
            }) {
                Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                    Text(s.admSkuSection)
                }
                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                    Div({ style { property("font-size", "12px"); property("color", SUB); property("background", "rgba(255,255,255,0.09)"); property("padding", "3px 10px"); property("border-radius", "999px") } }) {
                        Text("${skuCosts.value.size} ${s.admSkusCountLabel}")
                    }
                    Span({
                        style {
                            property("font-size", "11px"); property("color", SUB)
                            property("transition", "transform 0.2s"); property("display", "inline-block")
                            property("transform", if (skuSectionOpen) "rotate(0deg)" else "rotate(-90deg)")
                        }
                    }) { Text("▼") }
                }
            }

            if (skuSectionOpen) {
                Div({
                    style {
                        property("padding", "16px 20px"); property("border-bottom", "1px solid $BORDER")
                        property("display", "flex"); property("align-items", "center"); property("gap", "10px"); property("flex-wrap", "wrap")
                    }
                }) {
                    Input(InputType.Text) {
                        value(newSku); onInput { newSku = it.value.uppercase() }
                        attr("placeholder", s.admSkuPlaceholder)
                        style {
                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                            property("padding", "7px 12px"); property("font-size", "13px"); property("font-weight", "600")
                            property("background", INPUT_BG); property("color", TEXT); property("outline", "none")
                            property("font-family", "inherit"); property("width", "130px")
                        }
                    }
                    Input(InputType.Text) {
                        value(newCost); onInput { newCost = it.value }
                        attr("placeholder", s.admSkuCostPlaceholder); attr("inputmode", "decimal")
                        style {
                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                            property("padding", "7px 12px"); property("font-size", "13px")
                            property("background", INPUT_BG); property("color", TEXT); property("outline", "none")
                            property("font-family", "inherit"); property("width", "100px")
                        }
                    }
                    Span({ style { property("font-size", "12px"); property("color", TEXT); property("opacity", "0.6") } }) {
                        Text(s.admEstDelivery)
                    }
                    Select({
                        onInput { e -> newDelivDays = e.target.asDynamic().value as String }
                        style {
                            property("border", "1px solid $BORDER"); property("border-radius", "7px")
                            property("padding", "7px 12px"); property("font-size", "13px")
                            property("background", INPUT_BG); property("color", TEXT); property("outline", "none")
                            property("font-family", "inherit"); property("cursor", "pointer")
                        }
                    }) {
                        (1..10).forEach { d ->
                            Option("$d", { value("$d"); if ("$d" == newDelivDays) attr("selected", "selected") }) {
                                Text("$d ${if (d > 1) s.admDaysUnit else s.admDayUnit}")
                            }
                        }
                    }
                    Button({
                        style {
                            property("background", if (isSaving) "#6b7280" else "#d1d5db"); property("color", "white")
                            property("border", "none"); property("border-radius", "7px"); property("padding", "7px 16px")
                            property("font-size", "13px"); property("font-weight", "600"); property("cursor", if (isSaving) "not-allowed" else "pointer")
                            property("font-family", "inherit")
                        }
                        onClick {
                            if (isSaving) return@onClick
                            val sku  = newSku.trim()
                            val cost = newCost.trim().replace(',', '.').toDoubleOrNull()
                            when {
                                sku.isEmpty() -> { skuError = s.admSkuErrorEmpty; return@onClick }
                                cost == null  -> { skuError = s.admSkuErrorInvalidCost; return@onClick }
                                cost < 0      -> { skuError = s.admSkuErrorNegative; return@onClick }
                            }
                            skuError = ""
                            val updatedCosts = skuCosts.value.toMutableMap().also { it[sku] = cost!! }
                            val updatedDays  = skuDeliveryDays.value.toMutableMap().also { it[sku] = newDelivDays.toIntOrNull() ?: 3 }
                            newSku = ""; newCost = ""; newDelivDays = "3"
                            scope.launch { persistSkus(updatedCosts, updatedDays) }
                        }
                    }) { Text(if (isSaving) s.admAddSkuSavingBtn else s.admAddSkuBtn) }
                    if (skuError.isNotEmpty()) {
                        Span({ style { property("font-size", "12px"); property("color", "#ef4444"); property("font-weight", "600") } }) {
                            Text(skuError)
                        }
                    }
                    if (saveMsg.isNotEmpty()) {
                        Span({ style { property("font-size", "12px"); property("color", if (skuSaveIsError) "#ef4444" else "#10b981"); property("font-weight", "600") } }) {
                            Text(saveMsg)
                        }
                    }
                }

                if (skuCosts.value.isEmpty()) {
                    Div({ style { property("padding", "40px 20px"); property("text-align", "center"); property("color", SUB); property("font-size", "13px") } }) {
                        Text(s.admNoSkus)
                    }
                } else {
                    skuCosts.value.entries.sortedBy { it.key }.forEachIndexed { idx, (sku, cost) ->
                        val days = skuDeliveryDays.value[sku]
                        Div({
                            style {
                                property("display", "flex"); property("align-items", "center")
                                property("padding", "11px 20px"); property("justify-content", "space-between")
                                if (idx < skuCosts.value.size - 1) property("border-bottom", "1px solid $BORDER")
                            }
                        }) {
                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "16px") } }) {
                                Span({ style { property("font-family", "ui-monospace,monospace"); property("font-size", "13px"); property("font-weight", "700"); property("color", TEXT); property("min-width", "60px") } }) {
                                    Text(sku)
                                }
                                Span({ style { property("font-size", "13px"); property("color", "#10b981"); property("font-weight", "600") } }) {
                                    Text("\$${cost.fmt2()}")
                                }
                                if (days != null) {
                                    Span({ style { property("font-size", "12px"); property("color", "#d1d5db"); property("font-weight", "600"); property("background", "rgba(255,255,255,0.08)"); property("padding", "2px 8px"); property("border-radius", "999px") } }) {
                                        Text("$days ${if (days > 1) s.admDaysUnit else s.admDayUnit} ${s.admDeliveryLabel}")
                                    }
                                }
                            }
                            val isDeleting = deletingKey == sku
                            Span({
                                style {
                                    property("color", "#ef4444"); property("cursor", if (isDeleting) "not-allowed" else "pointer")
                                    property("font-size", "18px"); property("font-weight", "300")
                                    property("opacity", if (isDeleting) "0.4" else "0.6"); property("user-select", "none")
                                    property("transition", "opacity 0.15s"); property("padding", "0 4px")
                                }
                                onClick {
                                    if (isDeleting) return@onClick
                                    deletingKey = sku
                                    val updatedCosts = skuCosts.value.toMutableMap().also { it.remove(sku) }
                                    val updatedDays  = skuDeliveryDays.value.toMutableMap().also { it.remove(sku) }
                                    scope.launch { persistSkus(updatedCosts, updatedDays); deletingKey = null }
                                }
                            }) { Text("×") }
                        }
                    }
                }
            }
        }

    }
}

// ── Shipment Tab ──────────────────────────────────────────────────────────────

@Composable
private fun ShipmentTab(
    orders: List<AdminOrder>,
    skuDeliveryDays: Map<String, Int>
) {
    val s = getStrings()
    data class ShipRow(
        val order: AdminOrder,
        val estimatedDate: String,
        val diffDays: Int   // positive = overdue days, negative = days early
    )

    val today = todayMs()

    val overdueRows    = mutableListOf<ShipRow>()
    val earlyRows      = mutableListOf<ShipRow>()
    val onTimeRows     = mutableListOf<ShipRow>()
    val pendingRows    = mutableListOf<ShipRow>()
    val noConfigOrders = mutableListOf<AdminOrder>()   // no delivery days configured for SKU

    for (o in orders) {
        val days = skuDeliveryDays[o.sku.trim()]
        if (days == null) {
            noConfigOrders.add(o)
            continue
        }
        val orderMs = parseDateMs(normalizeCsvDate(o.orderDate))
        if (orderMs == null) {
            noConfigOrders.add(o)
            continue
        }
        val estMs   = addDaysMs(orderMs, days)
        val estDate = msToMmDdYy(estMs)
        if (o.shippingDate.isNotEmpty()) {
            val shipMs = parseDateMs(normalizeCsvDate(o.shippingDate))
            if (shipMs == null) {
                onTimeRows.add(ShipRow(o, estDate, 0))
            } else {
                val daysFromDeadline = ((shipMs - estMs) / 86_400_000.0).toInt()
                when {
                    daysFromDeadline < 0  -> earlyRows.add(ShipRow(o, estDate, -daysFromDeadline)) // diffDays = days early (positive)
                    daysFromDeadline == 0 -> onTimeRows.add(ShipRow(o, estDate, 0))
                    else                  -> overdueRows.add(ShipRow(o, estDate, daysFromDeadline)) // shipped late
                }
            }
        } else {
            val daysOverdue = ((today - estMs) / 86_400_000.0).toInt()
            if (daysOverdue > 0) overdueRows.add(ShipRow(o, estDate, daysOverdue))   // not shipped, past deadline
            else                 pendingRows.add(ShipRow(o, estDate, -daysOverdue))  // diffDays = days remaining (positive)
        }
    }



    @Composable
    fun statBadge(label: String, count: Int, color: String) {
        Div({
            style {
                property("display", "flex"); property("flex-direction", "column"); property("align-items", "center")
                property("padding", "14px 24px"); property("border-radius", "10px")
                property("background", SURFACE); property("border", "1px solid $BORDER")
                property("min-width", "110px")
            }
        }) {
            Div({ style { property("font-size", "26px"); property("font-weight", "800"); property("color", color) } }) { Text(count.toString()) }
            Div({ style { property("font-size", "11px"); property("color", SUB); property("margin-top", "2px"); property("text-align", "center") } }) { Text(label) }
        }
    }

    @Composable
    fun sectionHeader(icon: String, label: String, count: Int, color: String) {
        Div({
            style {
                property("display", "flex"); property("align-items", "center"); property("gap", "10px")
                property("padding", "10px 16px"); property("border-radius", "8px 8px 0 0")
                property("background", "rgba(255,255,255,0.05)"); property("border-bottom", "1px solid $BORDER")
            }
        }) {
            Span({ style { property("font-size", "16px") } }) { Text(icon) }
            Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", color) } }) {
                Text("$label ($count)")
            }
        }
    }

    @Composable
    fun tableHeader(vararg cols: String) {
        Tr {
            cols.forEach { col ->
                Th({
                    style {
                        property("padding", "10px 14px"); property("text-align", "left")
                        property("font-size", "11px"); property("font-weight", "700")
                        property("text-transform", "uppercase"); property("letter-spacing", "0.06em")
                        property("color", SUB); property("border-bottom", "1px solid $BORDER")
                        property("white-space", "nowrap")
                    }
                }) { Text(col) }
            }
        }
    }

    @Composable
    fun tableCell(value: String, color: String = TEXT, mono: Boolean = false) {
        Td({
            style {
                property("padding", "10px 14px"); property("font-size", "13px")
                property("color", color); property("white-space", "nowrap")
                if (mono) { property("font-family", "ui-monospace, monospace"); property("font-size", "12px") }
            }
        }) { Text(value) }
    }

    Div({
        style {
            property("padding", "28px 32px"); property("display", "flex")
            property("flex-direction", "column"); property("gap", "24px")
            property("width", "100%"); property("box-sizing", "border-box")
        }
    }) {

        // Header row
        Div({ style { property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between"); property("flex-wrap", "wrap"); property("gap", "12px") } }) {
            Div {
                Div({ style { property("font-size", "20px"); property("font-weight", "800"); property("letter-spacing", "-0.02em") } }) { Text(s.admShipmentsTitle) }
                Div({ style { property("font-size", "13px"); property("color", SUB); property("margin-top", "3px") } }) {
                    Text(s.admShipmentsSubtext)
                }
            }
        }

        // Summary badges
        Div({ style { property("display", "flex"); property("gap", "12px"); property("flex-wrap", "wrap") } }) {
            statBadge(s.admShipOverdue, overdueRows.size, "#ef4444")
            statBadge(s.admShipEarly, earlyRows.size, "#10b981")
            statBadge(s.admShipOnTime, onTimeRows.size, "#d1d5db")
            statBadge(s.admShipPending, pendingRows.size, SUB)
            if (noConfigOrders.isNotEmpty()) statBadge(s.admShipNoConfig, noConfigOrders.size, "#f59e0b")
        }

        if (skuDeliveryDays.isEmpty()) {
            Div({
                style {
                    property("padding", "32px"); property("text-align", "center"); property("color", SUB)
                    property("font-size", "14px"); property("background", SURFACE)
                    property("border", "1px solid $BORDER"); property("border-radius", "12px")
                }
            }) { Text(s.admShipNoDeliveryConfig) }
            return@Div
        }

        // ── Overdue section ──────────────────────────────────────────────────
        if (overdueRows.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border", "1px solid rgba(239,68,68,0.4)")
                    property("border-radius", "12px"); property("overflow", "hidden")
                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                }
            }) {
                sectionHeader("⚠️", s.admShipSectionOverdue, overdueRows.size, "#ef4444")
                Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                    Thead { tableHeader(s.admShipTableName, s.admShipTableSku, s.admShipTableOrderDate, s.admShipTableShipped, s.admShipTableEstDeadline, s.admShipTableStatus) }
                    Tbody {
                        overdueRows.sortedByDescending { it.diffDays }.forEach { r ->
                            val shippedLate = r.order.shippingDate.isNotEmpty()
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                tableCell(r.order.receiverName)
                                tableCell(r.order.sku.ifEmpty { "—" }, mono = true)
                                tableCell(r.order.orderDate, color = SUB)
                                tableCell(if (shippedLate) r.order.shippingDate else "—", color = if (shippedLate) "#f59e0b" else SUB)
                                tableCell(r.estimatedDate, color = "#ef4444")
                                tableCell(
                                    if (shippedLate) "${r.diffDays} ${if (r.diffDays != 1) s.admDaysUnit else s.admDayUnit} ${s.admShipLate}"
                                    else             "${r.diffDays} ${if (r.diffDays != 1) s.admDaysUnit else s.admDayUnit} ${s.admShipNotShipped}",
                                    color = "#ef4444"
                                )
                            }
                        }
                    }
                }
            }
        }

        // ── Shipped Early section ────────────────────────────────────────────
        if (earlyRows.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border", "1px solid $BORDER")
                    property("border-radius", "12px"); property("overflow", "hidden")
                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                }
            }) {
                sectionHeader("✅", s.admShipSectionEarly, earlyRows.size, "#10b981")
                Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                    Thead { tableHeader(s.admShipTableName, s.admShipTableSku, s.admShipTableOrderDate, s.admShipTableShipped, s.admShipTableEstDeadline, s.admShipTableDaysEarly) }
                    Tbody {
                        earlyRows.sortedByDescending { it.diffDays }.forEach { r ->
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                tableCell(r.order.receiverName)
                                tableCell(r.order.sku.ifEmpty { "—" }, mono = true)
                                tableCell(r.order.orderDate, color = SUB)
                                tableCell(r.order.shippingDate, color = "#10b981")
                                tableCell(r.estimatedDate, color = SUB)
                                tableCell("${r.diffDays} ${if (r.diffDays != 1) s.admDaysUnit else s.admDayUnit} ${s.admShipEarlyAdj}", color = "#10b981")
                            }
                        }
                    }
                }
            }
        }

        // ── Shipped On Time section ──────────────────────────────────────────
        if (onTimeRows.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border", "1px solid $BORDER")
                    property("border-radius", "12px"); property("overflow", "hidden")
                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                }
            }) {
                sectionHeader("✓", s.admShipSectionOnTime, onTimeRows.size, "#d1d5db")
                Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                    Thead { tableHeader(s.admShipTableName, s.admShipTableSku, s.admShipTableOrderDate, s.admShipTableShipped, s.admShipTableEstDeadline) }
                    Tbody {
                        onTimeRows.sortedByDescending { it.order.orderDate }.forEach { r ->
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                tableCell(r.order.receiverName)
                                tableCell(r.order.sku.ifEmpty { "—" }, mono = true)
                                tableCell(r.order.orderDate, color = SUB)
                                tableCell(r.order.shippingDate, color = "#d1d5db")
                                tableCell(r.estimatedDate, color = SUB)
                            }
                        }
                    }
                }
            }
        }

        // ── Pending section ──────────────────────────────────────────────────
        if (pendingRows.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border", "1px solid $BORDER")
                    property("border-radius", "12px"); property("overflow", "hidden")
                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                }
            }) {
                sectionHeader("⏳", s.admShipSectionPending, pendingRows.size, SUB)
                Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                    Thead { tableHeader(s.admShipTableName, s.admShipTableSku, s.admShipTableOrderDate, s.admShipTableEstDeadline, s.admShipTableDaysLeft) }
                    Tbody {
                        pendingRows.sortedBy { it.diffDays }.forEach { r ->
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                tableCell(r.order.receiverName)
                                tableCell(r.order.sku.ifEmpty { "—" }, mono = true)
                                tableCell(r.order.orderDate, color = SUB)
                                tableCell(r.estimatedDate)
                                tableCell("${r.diffDays} ${if (r.diffDays != 1) s.admDaysUnit else s.admDayUnit} ${s.admShipLeftAdj}", color = SUB)
                            }
                        }
                    }
                }
            }
        }

        // ── Needs Setup section ──────────────────────────────────────────────
        if (noConfigOrders.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border", "1px solid $BORDER")
                    property("border-radius", "12px"); property("overflow", "hidden")
                    property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
                }
            }) {
                sectionHeader("⚙️", s.admShipSectionNoConfig, noConfigOrders.size, SUB)
                Div({ style { property("padding", "10px 16px"); property("font-size", "12px"); property("color", SUB); property("border-bottom", "1px solid $BORDER") } }) {
                    Text(s.admShipNoConfigNote)
                }
                Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                    Thead { tableHeader(s.admShipTableName, s.admShipTableSku, s.admShipTableOrderDate, s.admShipTableShipped, s.admShipTableStatus) }
                    Tbody {
                        noConfigOrders.sortedByDescending { orderDateSortKey(it.orderDate) }.forEach { o ->
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                tableCell(o.receiverName)
                                tableCell(o.sku.ifEmpty { "—" }, mono = true)
                                tableCell(o.orderDate, color = SUB)
                                tableCell(o.shippingDate.ifEmpty { "—" }, color = SUB)
                                tableCell(o.status, color = SUB)
                            }
                        }
                    }
                }
            }
        }

        if (overdueRows.isEmpty() && earlyRows.isEmpty() && onTimeRows.isEmpty() && pendingRows.isEmpty() && noConfigOrders.isEmpty()) {
            Div({
                style {
                    property("padding", "32px"); property("text-align", "center"); property("color", SUB)
                    property("font-size", "14px"); property("background", SURFACE)
                    property("border", "1px solid $BORDER"); property("border-radius", "12px")
                }
            }) { Text(s.admShipNoOrders) }
        }
    }
}


// ── Distribution Chart ────────────────────────────────────────────────────────

@Composable
private fun DistributionChart(
    monthOrders: List<AdminOrder>,
    allOrders: List<AdminOrder>,
    monthlyAdSpend: Map<String, Double>,
    snapshots: List<MonthlySnapshot>
) {
    val s = getStrings()
    data class Slice(val label: String, val value: Double, val color: String)

    var period by remember { mutableStateOf("monthly") }

    val currentYear = Date().getFullYear()
    val yearOrders  = allOrders.filter { o ->
        val key = orderMonthKey(o.orderDate) ?: return@filter false
        key.startsWith("$currentYear-")
    }

    val activeOrders = if (period == "yearly") yearOrders else monthOrders

    val shipCost  = activeOrders.sumOf { it.shippingCost }
    val tariff    = activeOrders.sumOf { it.tariffCost }
    val prodCost  = activeOrders.sumOf { it.productCost }
    val netProfit = activeOrders.sumOf { it.netProfit }
    val snapshotAdByMonth = snapshots.associate { it.month to it.totalAdExpense }
    val adBudget  = if (period == "yearly") {
        (1..12).sumOf { m ->
            val key = "$currentYear-${m.toString().padStart(2, '0')}"
            monthlyAdSpend[key] ?: snapshotAdByMonth[key] ?: 0.0
        }
    } else {
        val key = "${Date().getFullYear()}-${(Date().getMonth() + 1).toString().padStart(2, '0')}"
        monthlyAdSpend[key] ?: snapshotAdByMonth[key] ?: 0.0
    }

    val countryColors = mapOf("US" to "#d1d5db", "UK" to "#3b82f6", "EU" to "#10b981", "Canada" to "#ef4444", "Other" to "#94a3b8")
    val countryFlags  = mapOf("US" to "🇺🇸", "UK" to "🇬🇧", "EU" to "🇪🇺", "Canada" to "🇨🇦", "Other" to "🌍")
    val countryCounts = listOf("US", "UK", "EU", "Canada", "Other").associateWith { c ->
        activeOrders.count { o -> if (c == "Other") o.country !in listOf("US","UK","EU","Canada","USA") else o.country == c || (c == "US" && o.country == "USA") }
    }
    val skuCounts = activeOrders.filter { it.sku.isNotBlank() }.groupBy { it.sku }.mapValues { (_, v) -> v.size }

    val costSlices = listOf(
        Slice("Shipping Cost", shipCost,  "#3b82f6"),
        Slice("Tariff",        tariff,    "#f59e0b"),
        Slice("Product Cost",  prodCost,  "#8b5cf6"),
        Slice("Net Profit",    netProfit, if (netProfit >= 0) "#10b981" else "#ef4444"),
        Slice("Ads",           adBudget,  "#f97316")
    ).sortedByDescending { kotlin.math.abs(it.value) }
    val costTotal = costSlices.sumOf { kotlin.math.abs(it.value) }

    val allCountrySlices = listOf("US", "UK", "EU", "Canada", "Other")
        .map { c -> Slice(c, (countryCounts[c] ?: 0).toDouble(), countryColors[c] ?: "#94a3b8") }
        .filter { it.value > 0 }
        .sortedByDescending { it.value }
    val countrySlices = allCountrySlices
    val countryTotal  = allCountrySlices.sumOf { it.value }

    val skuPalette = listOf("#d1d5db","#3b82f6","#10b981","#f59e0b","#8b5cf6","#94a3b8")
    val skuSorted  = skuCounts.entries.sortedByDescending { it.value }
    val skuTop4    = skuSorted.take(4).mapIndexed { i, (sku, count) -> Slice(sku, count.toDouble(), skuPalette[i]) }
    val skuOther   = skuSorted.drop(4).sumOf { it.value }
    val allSkuSlices = (if (skuOther > 0) skuTop4 + Slice("Other", skuOther.toDouble(), "#94a3b8") else skuTop4)
        .sortedByDescending { it.value }
    val skuTotal = allSkuSlices.sumOf { it.value }

    if (costTotal == 0.0 && countryTotal == 0.0) return

    fun buildGradient(slices: List<Slice>, total: Double): String {
        if (total == 0.0) return "#e5e7eb"
        var cum = 0.0
        return buildString {
            append("conic-gradient(")
            slices.forEachIndexed { i, s ->
                val pct = kotlin.math.abs(s.value) / total * 100.0
                if (i > 0) append(", ")
                val start = (cum * 10).toLong().toDouble() / 10
                val end   = ((cum + pct) * 10).toLong().toDouble() / 10
                append("${s.color} ${start}% ${end}%")
                cum += pct
            }
            append(")")
        }
    }

    fun buildBounds(slices: List<Slice>, total: Double): List<Pair<Double, Double>> {
        if (total == 0.0) return emptyList()
        var c = 0.0
        return slices.map { s ->
            val deg = kotlin.math.abs(s.value) / total * 360.0
            val start = c; c += deg; start to c
        }
    }

    val costGradient    = buildGradient(costSlices, costTotal)
    val costBounds      = buildBounds(costSlices, costTotal)
    val countryGradient = buildGradient(countrySlices, countryTotal)
    val countryBounds   = buildBounds(countrySlices, countryTotal)
    val skuGradient     = buildGradient(allSkuSlices, skuTotal)
    val skuBounds       = buildBounds(allSkuSlices, skuTotal)

    var hoveredCostIdx    by remember { mutableStateOf<Int?>(null) }
    var hoveredCountryIdx by remember { mutableStateOf<Int?>(null) }
    var hoveredSkuIdx     by remember { mutableStateOf<Int?>(null) }


    fun fmtDollar(v: Double): String {
        val r = (kotlin.math.abs(v) * 100).toLong()
        return "${if (v < 0) "-" else ""}${r / 100}.${(r % 100).toString().padStart(2, '0')}"
    }

    Div({
        style {
            property("background", SURFACE); property("border-radius", "12px")
            property("border", "1px solid $BORDER")
            property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            property("overflow", "hidden")
        }
    }) {
        Div({
            style {
                property("padding", "14px 20px"); property("border-bottom", "1px solid $BORDER")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("background", "rgba(255,255,255,0.05)")
            }
        }) {
            Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                Text(s.admDistributionTitle)
            }
            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                Div({ style { property("font-size", "12px"); property("color", SUB); property("background", "rgba(255,255,255,0.09)"); property("padding", "3px 10px"); property("border-radius", "999px") } }) {
                    Text(s.admDistributionPct)
                }
                Select({
                    onInput { e -> period = e.target.asDynamic().value as String }
                    style {
                        property("border", "1px solid $BORDER"); property("border-radius", "7px")
                        property("background", "rgba(255,255,255,0.07)")
                        property("color", TEXT); property("font-size", "12px"); property("font-weight", "600")
                        property("padding", "4px 8px"); property("cursor", "pointer"); property("font-family", "inherit")
                        property("outline", "none")
                    }
                }) {
                    listOf("monthly" to s.admDistMonthly, "yearly" to s.admDistYearly).forEach { (v, label) ->
                        Option(label, { value(v); if (v == period) attr("selected", "selected") }) { Text(label) }
                    }
                }
            }
        }

        Div({ style { property("display", "grid"); property("grid-template-columns", "repeat(2, 1fr)") } }) {

            // Top-left: cost breakdown
            Div({
                style {
                    property("padding", "22px 28px")
                    property("border-right", "1px solid $BORDER")
                    property("border-bottom", "1px solid $BORDER")
                }
            }) {
                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", SUB); property("margin-bottom", "18px") } }) {
                    Text(s.admDistCostBreakdown)
                }
                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "24px"); property("flex-wrap", "wrap") } }) {
                    Div({
                        style {
                            property("position", "relative"); property("width", "150px"); property("height", "150px")
                            property("flex-shrink", "0"); property("cursor", "crosshair")
                            property("animation", "adminDonutIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both")
                        }
                        onMouseMove { e ->
                            val dx = e.offsetX - 75.0; val dy = e.offsetY - 75.0
                            val dist = kotlin.math.sqrt(dx * dx + dy * dy)
                            if (dist in (75.0 * 0.29)..(75.0)) {
                                var angle = kotlin.math.atan2(dy, dx) * 180.0 / kotlin.math.PI + 90.0
                                if (angle < 0) angle += 360.0
                                hoveredCostIdx = costBounds.indexOfFirst { (s, e2) -> angle >= s && angle < e2 }.takeIf { it >= 0 }
                            } else hoveredCostIdx = null
                        }
                        onMouseLeave { hoveredCostIdx = null }
                    }) {
                        Div({ style { property("width", "100%"); property("height", "100%"); property("border-radius", "50%"); property("background", costGradient) } }) {}
                        Div({
                            style {
                                property("position", "absolute"); property("top", "50%"); property("left", "50%")
                                property("transform", "translate(-50%,-50%)"); property("width", "58%"); property("height", "58%")
                                property("border-radius", "50%"); property("background", SURFACE)
                                property("display", "flex"); property("flex-direction", "column")
                                property("align-items", "center"); property("justify-content", "center")
                                property("text-align", "center"); property("pointer-events", "none")
                            }
                        }) {
                            if (hoveredCostIdx != null) {
                                val cs = costSlices[hoveredCostIdx!!]
                                val pct = kotlin.math.abs(cs.value) / costTotal * 100.0
                                Div({ style { property("font-size", "9px"); property("font-weight", "700"); property("color", cs.color); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(cs.label) }
                                Div({ style { property("font-size", "13px"); property("font-weight", "800"); property("color", TEXT); property("line-height", "1.2") } }) { Text("\$${fmtDollar(cs.value)}") }
                                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", cs.color) } }) { Text("${(pct * 10).toLong().toDouble() / 10}%") }
                            } else {
                                Div({ style { property("font-size", "9px"); property("font-weight", "600"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(s.admDistTotal) }
                                Div({ style { property("font-size", "12px"); property("font-weight", "800"); property("color", TEXT) } }) { Text("\$${fmtDollar(costTotal)}") }
                            }
                        }
                    }
                    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "10px"); property("flex", "1"); property("min-width", "140px") } }) {
                        costSlices.forEach { s ->
                            val pct = kotlin.math.abs(s.value) / costTotal * 100.0
                            val pctStr = "${(pct * 10).toLong().toDouble() / 10}%"
                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                                Div({ style { property("width", "10px"); property("height", "10px"); property("border-radius", "2px"); property("background", s.color); property("flex-shrink", "0") } }) {}
                                Div({ style { property("flex", "1") } }) {
                                    Div({ style { property("display", "flex"); property("justify-content", "space-between"); property("align-items", "center"); property("margin-bottom", "3px") } }) {
                                        Span({ style { property("font-size", "12px"); property("font-weight", "600"); property("color", TEXT) } }) { Text(s.label) }
                                        Div({ style { property("display", "flex"); property("gap", "6px"); property("align-items", "center") } }) {
                                            Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", s.color) } }) { Text(pctStr) }
                                            Span({ style { property("font-size", "11px"); property("color", SUB) } }) { Text("\$${fmtDollar(s.value)}") }
                                        }
                                    }
                                    Div({ style { property("height", "4px"); property("border-radius", "999px"); property("background", "rgba(255,255,255,0.08)"); property("overflow", "hidden") } }) {
                                        Div({ style { property("height", "100%"); property("border-radius", "999px"); property("background", s.color); property("width", pctStr); property("transform-origin", "left center"); property("animation", "adminBarGrow 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s both") } }) {}
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Top-right: country breakdown
            Div({
                style {
                    property("padding", "22px 28px")
                    property("border-bottom", "1px solid $BORDER")
                }
            }) {
                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", SUB); property("margin-bottom", "18px") } }) {
                    Text(s.admDistCountry)
                }
                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "24px"); property("flex-wrap", "wrap") } }) {
                    Div({
                        style {
                            property("position", "relative"); property("width", "150px"); property("height", "150px")
                            property("flex-shrink", "0"); property("cursor", "crosshair")
                            property("animation", "adminDonutIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both")
                        }
                        onMouseMove { e ->
                            val dx = e.offsetX - 75.0; val dy = e.offsetY - 75.0
                            val dist = kotlin.math.sqrt(dx * dx + dy * dy)
                            if (dist in (75.0 * 0.29)..(75.0)) {
                                var angle = kotlin.math.atan2(dy, dx) * 180.0 / kotlin.math.PI + 90.0
                                if (angle < 0) angle += 360.0
                                hoveredCountryIdx = countryBounds.indexOfFirst { (s, e2) -> angle >= s && angle < e2 }.takeIf { it >= 0 }
                            } else hoveredCountryIdx = null
                        }
                        onMouseLeave { hoveredCountryIdx = null }
                    }) {
                        Div({ style { property("width", "100%"); property("height", "100%"); property("border-radius", "50%"); property("background", countryGradient) } }) {}
                        Div({
                            style {
                                property("position", "absolute"); property("top", "50%"); property("left", "50%")
                                property("transform", "translate(-50%,-50%)"); property("width", "58%"); property("height", "58%")
                                property("border-radius", "50%"); property("background", SURFACE)
                                property("display", "flex"); property("flex-direction", "column")
                                property("align-items", "center"); property("justify-content", "center")
                                property("text-align", "center"); property("pointer-events", "none")
                            }
                        }) {
                            if (hoveredCountryIdx != null) {
                                val cs = countrySlices[hoveredCountryIdx!!]
                                val pct = cs.value / countryTotal * 100.0
                                Div({ style { property("font-size", "16px"); property("line-height", "1") } }) { Text(countryFlags[cs.label] ?: "🌍") }
                                Div({ style { property("font-size", "9px"); property("font-weight", "700"); property("color", cs.color); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(cs.label) }
                                Div({ style { property("font-size", "13px"); property("font-weight", "800"); property("color", TEXT); property("line-height", "1.2") } }) { Text("${cs.value.toInt()} ${s.admOrdersUnit}") }
                                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", cs.color) } }) { Text("${(pct * 10).toLong().toDouble() / 10}%") }
                            } else {
                                Div({ style { property("font-size", "9px"); property("font-weight", "600"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(s.admDistTotal) }
                                Div({ style { property("font-size", "12px"); property("font-weight", "800"); property("color", TEXT) } }) { Text("${countryTotal.toInt()} ${s.admOrdersUnit}") }
                            }
                        }
                    }
                    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "10px"); property("flex", "1"); property("min-width", "140px") } }) {
                        allCountrySlices.forEach { sl ->
                            val pct = if (countryTotal > 0) sl.value / countryTotal * 100.0 else 0.0
                            val pctStr = "${(pct * 10).toLong().toDouble() / 10}%"
                            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                                Div({ style { property("width", "10px"); property("height", "10px"); property("border-radius", "2px"); property("background", sl.color); property("flex-shrink", "0") } }) {}
                                Div({ style { property("flex", "1") } }) {
                                    Div({ style { property("display", "flex"); property("justify-content", "space-between"); property("align-items", "center"); property("margin-bottom", "3px") } }) {
                                        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "5px") } }) {
                                            Span({ style { property("font-size", "14px"); property("line-height", "1") } }) { Text(countryFlags[sl.label] ?: "🌍") }
                                            Span({ style { property("font-size", "12px"); property("font-weight", "600"); property("color", TEXT) } }) { Text(sl.label) }
                                        }
                                        Div({ style { property("display", "flex"); property("gap", "6px"); property("align-items", "center") } }) {
                                            Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", sl.color) } }) { Text(pctStr) }
                                            Span({ style { property("font-size", "11px"); property("color", SUB) } }) { Text("${sl.value.toInt()} ${s.admOrdersUnit}") }
                                        }
                                    }
                                    Div({ style { property("height", "4px"); property("border-radius", "999px"); property("background", "rgba(255,255,255,0.08)"); property("overflow", "hidden") } }) {
                                        Div({ style { property("height", "100%"); property("border-radius", "999px"); property("background", sl.color); property("width", pctStr); property("transform-origin", "left center"); property("animation", "adminBarGrow 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s both") } }) {}
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Bottom-left: SKU distribution
            Div({
                style {
                    property("padding", "22px 28px")
                    property("border-right", "1px solid $BORDER")
                }
            }) {
                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", SUB); property("margin-bottom", "18px") } }) {
                    Text(s.admDistSku)
                }
                if (skuTotal == 0.0) {
                    Div({ style { property("font-size", "12px"); property("color", SUB); property("opacity", "0.6") } }) { Text(s.admDistNoSkuData) }
                } else {
                    Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "24px"); property("flex-wrap", "wrap") } }) {
                        Div({
                            style {
                                property("position", "relative"); property("width", "150px"); property("height", "150px")
                                property("flex-shrink", "0"); property("cursor", "crosshair")
                                property("animation", "adminDonutIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both")
                            }
                            onMouseMove { e ->
                                val dx = e.offsetX - 75.0; val dy = e.offsetY - 75.0
                                val dist = kotlin.math.sqrt(dx * dx + dy * dy)
                                if (dist in (75.0 * 0.29)..(75.0)) {
                                    var angle = kotlin.math.atan2(dy, dx) * 180.0 / kotlin.math.PI + 90.0
                                    if (angle < 0) angle += 360.0
                                    hoveredSkuIdx = skuBounds.indexOfFirst { (s, e2) -> angle >= s && angle < e2 }.takeIf { it >= 0 }
                                } else hoveredSkuIdx = null
                            }
                            onMouseLeave { hoveredSkuIdx = null }
                        }) {
                            Div({ style { property("width", "100%"); property("height", "100%"); property("border-radius", "50%"); property("background", skuGradient) } }) {}
                            Div({
                                style {
                                    property("position", "absolute"); property("top", "50%"); property("left", "50%")
                                    property("transform", "translate(-50%,-50%)"); property("width", "58%"); property("height", "58%")
                                    property("border-radius", "50%"); property("background", SURFACE)
                                    property("display", "flex"); property("flex-direction", "column")
                                    property("align-items", "center"); property("justify-content", "center")
                                    property("text-align", "center"); property("pointer-events", "none")
                                }
                            }) {
                                if (hoveredSkuIdx != null) {
                                    val sl = allSkuSlices[hoveredSkuIdx!!]
                                    val pct = sl.value / skuTotal * 100.0
                                    Div({ style { property("font-size", "9px"); property("font-weight", "700"); property("color", sl.color); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(sl.label) }
                                    Div({ style { property("font-size", "13px"); property("font-weight", "800"); property("color", TEXT); property("line-height", "1.2") } }) { Text("${sl.value.toInt()} ${s.admOrdersUnit}") }
                                    Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", sl.color) } }) { Text("${(pct * 10).toLong().toDouble() / 10}%") }
                                } else {
                                    Div({ style { property("font-size", "9px"); property("font-weight", "600"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.04em") } }) { Text(s.admDistTotal) }
                                    Div({ style { property("font-size", "12px"); property("font-weight", "800"); property("color", TEXT) } }) { Text("${skuTotal.toInt()} ${s.admOrdersUnit}") }
                                }
                            }
                        }
                        Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "10px"); property("flex", "1"); property("min-width", "140px") } }) {
                            allSkuSlices.forEach { sl ->
                                val pct = if (skuTotal > 0) sl.value / skuTotal * 100.0 else 0.0
                                val pctStr = "${(pct * 10).toLong().toDouble() / 10}%"
                                Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "8px") } }) {
                                    Div({ style { property("width", "10px"); property("height", "10px"); property("border-radius", "2px"); property("background", sl.color); property("flex-shrink", "0") } }) {}
                                    Div({ style { property("flex", "1") } }) {
                                        Div({ style { property("display", "flex"); property("justify-content", "space-between"); property("align-items", "center"); property("margin-bottom", "3px") } }) {
                                            Span({ style { property("font-size", "12px"); property("font-weight", "600"); property("color", TEXT) } }) { Text(sl.label) }
                                            Div({ style { property("display", "flex"); property("gap", "6px"); property("align-items", "center") } }) {
                                                Span({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", sl.color) } }) { Text(pctStr) }
                                                Span({ style { property("font-size", "11px"); property("color", SUB) } }) { Text("${sl.value.toInt()} ${s.admOrdersUnit}") }
                                            }
                                        }
                                        Div({ style { property("height", "4px"); property("border-radius", "999px"); property("background", "rgba(255,255,255,0.08)"); property("overflow", "hidden") } }) {
                                            Div({ style { property("height", "100%"); property("border-radius", "999px"); property("background", sl.color); property("width", pctStr); property("transform-origin", "left center"); property("animation", "adminBarGrow 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s both") } }) {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

// ── Analytics View ────────────────────────────────────────────────────────────

@Composable
private fun AnalyticCard(
    title: String, main: String, sub1: String, sub2: String,
    icon: String, accent: String, borderRight: Boolean, borderBottom: Boolean
) {
    Div({
        style {
            property("padding", "20px 24px")
            property("display", "flex"); property("flex-direction", "column"); property("gap", "6px")
            if (borderRight)  property("border-right",  "1px solid $BORDER")
            if (borderBottom) property("border-bottom", "1px solid $BORDER")
        }
    }) {
        Div({ style { property("display", "flex"); property("align-items", "flex-start"); property("justify-content", "space-between") } }) {
            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("color", SUB) } }) { Text(title) }
            Div({ style { property("background", "${accent}1a"); property("border-radius", "8px"); property("width", "32px"); property("height", "32px"); property("display", "flex"); property("align-items", "center"); property("justify-content", "center"); property("font-size", "16px") } }) { Text(icon) }
        }
        Div({ style { property("font-size", "20px"); property("font-weight", "800"); property("color", TEXT); property("letter-spacing", "-0.02em"); property("line-height", "1.2") } }) { Text(main) }
        Div({ style { property("font-size", "12px"); property("font-weight", "600"); property("color", accent) } }) { Text(sub1) }
        Div({ style { property("font-size", "11px"); property("color", SUB); property("opacity", "0.75") } }) { Text(sub2) }
    }
}

@Composable
private fun AnalyticsView(orders: List<AdminOrder>) {
    if (orders.isEmpty()) return
    val s = getStrings()

    data class SkuStat(val sku: String, val count: Int, val gross: Double, val net: Double, val ship: Double)

    fun fmtM(v: Double): String {
        val neg = v < 0; val r = (kotlin.math.abs(v) * 100).toLong()
        return "${if (neg) "-$" else "$"}${r / 100}.${(r % 100).toString().padStart(2, '0')}"
    }
    fun fmtPct(n: Double, d: Double) = if (d == 0.0) "0%" else "${((n / d * 1000).toLong().toDouble() / 10)}%"

    val skuStats = orders.filter { it.sku.isNotBlank() }.groupBy { it.sku }
        .map { (s, l) -> SkuStat(s, l.size, l.sumOf { it.profit }, l.sumOf { it.netProfit }, l.sumOf { it.shippingCost }) }
        .sortedByDescending { it.net }

    val countryFlags = mapOf("US" to "🇺🇸", "UK" to "🇬🇧", "EU" to "🇪🇺", "Canada" to "🇨🇦", "Other" to "🌍")
    fun normalizeC(c: String) = if (c == "USA") "US" else if (c !in listOf("US","UK","EU","Canada")) "Other" else c
    val bestCountry = orders.groupBy { normalizeC(it.country) }
        .mapValues { (_, l) -> l.sumOf { it.netProfit } }
        .entries.maxByOrNull { it.value }

    val topRevSku  = skuStats.maxByOrNull { it.gross }
    val topOrdSku  = skuStats.maxByOrNull { it.count }
    val avgNet     = orders.sumOf { it.netProfit } / orders.size
    val delivCount = orders.count { it.status == "Delivered" }
    val delivRate  = delivCount * 100.0 / orders.size



    Div({
        style {
            property("background", SURFACE); property("border-radius", "12px")
            property("border", "1px solid $BORDER"); property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            property("overflow", "hidden")
        }
    }) {
        // Header
        Div({
            style {
                property("padding", "14px 20px"); property("border-bottom", "1px solid $BORDER")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("background", "rgba(245,158,11,0.07)")
            }
        }) {
            Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) { Text(s.admAnalyticsTitle) }
            Div({ style { property("font-size", "12px"); property("color", SUB); property("background", "rgba(245,158,11,0.14)"); property("padding", "3px 10px"); property("border-radius", "999px") } }) { Text(s.admAnalyticsInsights) }
        }

        // 3×2 highlight cards
        Div({ style { property("display", "grid"); property("grid-template-columns", "repeat(3, 1fr)") } }) {
            AnalyticCard(
                s.admAnalyticsTopRevSku, topRevSku?.sku ?: "—", fmtM(topRevSku?.gross ?: 0.0),
                "${topRevSku?.count ?: 0} ${s.admAnalyticsOrders} · ${s.admAnalyticsHighestGross}",
                "📈", "#f59e0b", borderRight = true, borderBottom = true
            )
            AnalyticCard(
                s.admAnalyticsBestNetSku, skuStats.firstOrNull()?.sku ?: "—", fmtM(skuStats.firstOrNull()?.net ?: 0.0),
                "${skuStats.firstOrNull()?.count ?: 0} ${s.admAnalyticsOrders} · ${s.admAnalyticsAfterAllCosts}",
                "💰", "#10b981", borderRight = true, borderBottom = true
            )
            AnalyticCard(
                s.admAnalyticsMostOrdered, topOrdSku?.sku ?: "—", "${topOrdSku?.count ?: 0} ${s.admAnalyticsOrders}",
                fmtPct(topOrdSku?.count?.toDouble() ?: 0.0, orders.size.toDouble()) + " ${s.admAnalyticsOfMonthVol}",
                "📦", "#8b5cf6", borderRight = false, borderBottom = true
            )
            AnalyticCard(
                s.admAnalyticsBestCountry, "${countryFlags[bestCountry?.key] ?: "🌍"} ${bestCountry?.key ?: "—"}",
                fmtM(bestCountry?.value ?: 0.0),
                s.admAnalyticsNetProfitMonth,
                "🌍", "#d1d5db", borderRight = true, borderBottom = false
            )
            AnalyticCard(
                s.admAnalyticsAvgNet, fmtM(avgNet),
                "${orders.size} ${s.admAnalyticsOrdersThisMonth}",
                s.admAnalyticsAvgNetDesc,
                "⚖️", "#f97316", borderRight = true, borderBottom = false
            )
            AnalyticCard(
                s.admAnalyticsDelivRate, "${(delivRate * 10).toLong().toDouble() / 10}%",
                "$delivCount of ${orders.size} delivered",
                s.admAnalyticsFulfillRate,
                "✅", "#06b6d4", borderRight = false, borderBottom = false
            )
        }

    }
}

// ── Yearly Revenue Breakdown ──────────────────────────────────────────────────

@Composable
private fun YearlyRevenueBreakdown(
    allOrders: List<AdminOrder>,
    monthlyAdSpend: Map<String, Double>,
    snapshots: List<MonthlySnapshot>
) {
    if (allOrders.isEmpty()) return
    val s = getStrings()

    val currentYear = Date().getFullYear()
    val yearOrders  = allOrders.filter { o ->
        val key = orderMonthKey(o.orderDate) ?: return@filter false
        key.startsWith("$currentYear-")
    }
    if (yearOrders.isEmpty()) return

    val revenue  = yearOrders.sumOf { it.profit }
    if (revenue <= 0.0) return

    val net    = yearOrders.sumOf { it.netProfit }
    val ship   = yearOrders.sumOf { it.shippingCost }
    val prod   = yearOrders.sumOf { it.productCost }
    val tariff = yearOrders.sumOf { it.tariffCost }
    val snapshotAdByMonth = snapshots.associate { it.month to it.totalAdExpense }
    val ads = (1..12).sumOf { m ->
        val key = "$currentYear-${m.toString().padStart(2, '0')}"
        monthlyAdSpend[key] ?: snapshotAdByMonth[key] ?: 0.0
    }

    data class RowWithIcon(val label: String, val icon: String, val value: Double, val color: String)

    val rows = listOf(
        RowWithIcon(s.admYearlyNetProfit, "💰", net,    "#10b981"),
        RowWithIcon(s.admYearlyShipping,  "🚚", ship,   "#f97316"),
        RowWithIcon(s.admYearlyAds,       "📢", ads,    "#8b5cf6"),
        RowWithIcon(s.admYearlyProdCost,  "📦", prod,   "#3b82f6"),
        RowWithIcon(s.admYearlyTariff,    "🏛️", tariff, "#ef4444"),
    )

    val total = rows.sumOf { kotlin.math.abs(it.value) }
    fun pct(v: Double) = if (total == 0.0) 0.0 else (kotlin.math.abs(v) / total * 100.0)
    fun fmtPct(v: Double): String {
        val p = pct(v); val r = (p * 10).toLong()
        return "${r / 10}.${r % 10}%"
    }
    fun fmtDollar(v: Double): String {
        val neg = v < 0; val r = (kotlin.math.abs(v) * 100).toLong()
        return "${if (neg) "-$" else "$"}${r / 100}.${(r % 100).toString().padStart(2, '0')}"
    }

    Div({
        style {
            property("background", SURFACE); property("border-radius", "12px")
            property("border", "1px solid $BORDER")
            property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            property("overflow", "hidden")
        }
    }) {
        // Header
        Div({
            style {
                property("padding", "14px 20px"); property("border-bottom", "1px solid $BORDER")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("background", "rgba(255,255,255,0.05)")
            }
        }) {
            Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                Text(s.admYearlyBreakdownTitle)
            }
            Div({ style { property("font-size", "12px"); property("color", SUB); property("background", "rgba(255,255,255,0.09)"); property("padding", "3px 10px"); property("border-radius", "999px") } }) {
                Text("$currentYear · ${s.admYearlyBreakdownSub}")
            }
        }

        // Rows
        Div({ style { property("padding", "8px 0") } }) {
            rows.forEach { row ->
                val barWidth = "${pct(row.value).coerceAtLeast(0.0)}%"
                Div({ style { property("padding", "12px 24px 14px") } }) {
                    // Label line: icon + name on left, amount + % on right
                    Div({ style { property("display", "flex"); property("align-items", "center"); property("margin-bottom", "8px") } }) {
                        Span({ style { property("font-size", "16px"); property("margin-right", "10px"); property("line-height", "1") } }) { Text(row.icon) }
                        Span({ style { property("font-size", "14px"); property("font-weight", "700"); property("color", TEXT); property("flex", "1") } }) { Text(row.label) }
                        Span({ style { property("font-size", "14px"); property("color", SUB); property("margin-right", "16px"); property("font-variant-numeric", "tabular-nums") } }) { Text(fmtDollar(row.value)) }
                        Span({ style { property("font-size", "16px"); property("font-weight", "800"); property("color", row.color); property("min-width", "58px"); property("text-align", "right"); property("font-variant-numeric", "tabular-nums") } }) { Text(fmtPct(row.value)) }
                    }
                    // Full-width progress bar
                    Div({ style { property("width", "100%"); property("height", "6px"); property("border-radius", "999px"); property("background", "rgba(255,255,255,0.06)"); property("overflow", "hidden") } }) {
                        Div({ style { property("height", "100%"); property("border-radius", "999px"); property("background", row.color); property("width", barWidth); property("transition", "width 0.7s cubic-bezier(0.4,0,0.2,1)") } }) {}
                    }
                }
            }
        }
    }
}

// ── Loss Tab ──────────────────────────────────────────────────────────────────

@Composable
private fun LossTab(
    losses: MutableState<List<LossEntry>>,
    skuCosts: Map<String, Double>
) {
    val s     = getStrings()
    val scope = rememberCoroutineScope()

    var formOpen    by remember { mutableStateOf(true) }
    var tableOpen   by remember { mutableStateOf(true) }
    var lReason     by remember { mutableStateOf("Refund") }
    var lName       by remember { mutableStateOf("") }
    var lSku        by remember { mutableStateOf("") }
    var lCost       by remember { mutableStateOf("") }
    var lDate       by remember { mutableStateOf(todayIso()) }
    var isSaving    by remember { mutableStateOf(false) }
    var deletingId  by remember { mutableStateOf<String?>(null) }

    val reasons = listOf(
        s.admLossReasonRefund, s.admLossReasonReplacement,
        s.admLossReasonDamage, s.admLossReasonOther
    )

    fun fmtDollar(v: Double): String {
        val r = (v * 100).toLong()
        return "$${r / 100}.${(r % 100).toString().padStart(2, '0')}"
    }

    Div({
        style {
            property("padding", "28px 32px"); property("display", "flex")
            property("flex-direction", "column"); property("gap", "20px")
            property("width", "100%"); property("box-sizing", "border-box")
            property("max-width", "900px")
        }
    }) {
        // Title
        Div({}) {
            Div({ style { property("font-size", "22px"); property("font-weight", "800"); property("color", TEXT); property("margin-bottom", "4px") } }) {
                Text(s.admLossTitle)
            }
            Div({ style { property("font-size", "13px"); property("color", SUB) } }) {
                Text(s.admLossSubtitle)
            }
        }

        // ── Add Loss Entry card ───────────────────────────────────────────────
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
            }
        }) {
            // Header
            Div({
                style {
                    property("padding", "12px 20px"); property("display", "flex")
                    property("align-items", "center"); property("justify-content", "space-between")
                    property("cursor", "pointer"); property("user-select", "none")
                    property("background", "rgba(239,68,68,0.08)")
                    if (formOpen) property("border-bottom", "1px solid $BORDER")
                }
                onClick { formOpen = !formOpen }
            }) {
                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("letter-spacing", "0.08em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                    Text(s.admLossAddSection)
                }
                Span({ style { property("color", SUB); property("font-size", "14px") } }) {
                    Text(if (formOpen) "▲" else "▼")
                }
            }

            if (formOpen) {
                Div({ style { property("padding", "20px") } }) {
                    // Row 1: Reason | Customer Name | SKU
                    Div({ style { property("display", "grid"); property("grid-template-columns", "1fr 1fr 1fr"); property("gap", "14px"); property("margin-bottom", "14px") } }) {
                        Div({}) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "6px") } }) { Text(s.admLossReason) }
                            Select({
                                onInput { e -> lReason = e.target.asDynamic().value as String }
                                style {
                                    property("width", "100%"); property("padding", "8px 12px"); property("border-radius", "8px")
                                    property("border", "1px solid $BORDER"); property("background", "rgba(255,255,255,0.05)")
                                    property("color", TEXT); property("font-size", "13px"); property("font-family", "inherit")
                                    property("outline", "none"); property("cursor", "pointer"); property("box-sizing", "border-box")
                                }
                            }) {
                                reasons.forEach { r ->
                                    Option(r, { value(r); if (r == lReason) attr("selected", "selected") }) { Text(r) }
                                }
                            }
                        }
                        Div({}) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "6px") } }) { Text(s.admLossCustomerName) }
                            Input(InputType.Text) {
                                value(lName); onInput { lName = it.value }
                                attr("placeholder", s.admFormPlaceholderFullName)
                                style {
                                    property("width", "100%"); property("padding", "8px 12px"); property("border-radius", "8px")
                                    property("border", "1px solid $BORDER"); property("background", "rgba(255,255,255,0.05)")
                                    property("color", TEXT); property("font-size", "13px"); property("font-family", "inherit")
                                    property("outline", "none"); property("box-sizing", "border-box")
                                }
                            }
                        }
                        Div({}) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "6px") } }) { Text(s.admLossSku) }
                            Input(InputType.Text) {
                                value(lSku); onInput { lSku = it.value }
                                attr("placeholder", "e.g. SKU-001")
                                style {
                                    property("width", "100%"); property("padding", "8px 12px"); property("border-radius", "8px")
                                    property("border", "1px solid $BORDER"); property("background", "rgba(255,255,255,0.05)")
                                    property("color", TEXT); property("font-size", "13px"); property("font-family", "inherit")
                                    property("outline", "none"); property("box-sizing", "border-box")
                                }
                            }
                        }
                    }
                    // Row 2: Cost | Date
                    Div({ style { property("display", "grid"); property("grid-template-columns", "1fr 1fr"); property("gap", "14px"); property("margin-bottom", "20px") } }) {
                        Div({}) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "6px") } }) { Text(s.admLossCost) }
                            Div({ style { property("display", "flex"); property("align-items", "center"); property("border", "1px solid $BORDER"); property("border-radius", "8px"); property("overflow", "hidden"); property("background", "rgba(255,255,255,0.05)") } }) {
                                Span({ style { property("padding", "8px 10px"); property("color", SUB); property("font-size", "13px"); property("border-right", "1px solid $BORDER") } }) { Text("$") }
                                Input(InputType.Text) {
                                    value(lCost); onInput { lCost = it.value }
                                    attr("placeholder", "0.00")
                                    style {
                                        property("flex", "1"); property("padding", "8px 12px"); property("border", "none")
                                        property("background", "transparent"); property("color", TEXT)
                                        property("font-size", "13px"); property("font-family", "inherit"); property("outline", "none")
                                    }
                                }
                            }
                        }
                        Div({}) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("margin-bottom", "6px") } }) { Text(s.admLossDate) }
                            Input(InputType.Date) {
                                value(lDate); onInput { lDate = it.value }
                                style {
                                    property("width", "100%"); property("padding", "8px 12px"); property("border-radius", "8px")
                                    property("border", "1px solid $BORDER"); property("background", "rgba(255,255,255,0.05)")
                                    property("color", TEXT); property("font-size", "13px"); property("font-family", "inherit")
                                    property("outline", "none"); property("box-sizing", "border-box"); property("cursor", "pointer")
                                }
                            }
                        }
                    }
                    // Record button
                    Div({
                        style {
                            property("display", "inline-flex"); property("align-items", "center"); property("gap", "8px")
                            property("background", if (isSaving) "#b91c1c" else "#ef4444")
                            property("color", "white"); property("font-size", "13px"); property("font-weight", "700")
                            property("padding", "9px 22px"); property("border-radius", "8px")
                            property("cursor", if (isSaving) "default" else "pointer")
                            property("user-select", "none"); property("transition", "background 0.15s")
                        }
                        onClick {
                            if (!isSaving) {
                                val cost = lCost.toDoubleOrNull() ?: 0.0
                                val entry = LossEntry(
                                    id     = Date().getTime().toLong().toString(),
                                    date   = lDate,
                                    reason = lReason,
                                    name   = lName.trim(),
                                    sku    = lSku.trim(),
                                    cost   = cost
                                )
                                isSaving = true
                                scope.launch {
                                    try {
                                        fsSaveLoss(entry)
                                        losses.value = (losses.value + entry).sortedByDescending { it.date }
                                        lName = ""; lSku = ""; lCost = ""; lDate = todayIso(); lReason = reasons.first()
                                    } finally { isSaving = false }
                                }
                            }
                        }
                    }) {
                        Text(if (isSaving) s.admLossRecording else s.admLossRecordBtn)
                    }
                }
            }
        }

        // ── Recorded Losses table ─────────────────────────────────────────────
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
            }
        }) {
            Div({
                style {
                    property("padding", "12px 20px"); property("display", "flex")
                    property("align-items", "center"); property("justify-content", "space-between")
                    property("cursor", "pointer"); property("user-select", "none")
                    property("background", "rgba(239,68,68,0.08)")
                    if (tableOpen) property("border-bottom", "1px solid $BORDER")
                }
                onClick { tableOpen = !tableOpen }
            }) {
                Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("letter-spacing", "0.08em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                    Text("${s.admLossTableSection} (${losses.value.size})")
                }
                Span({ style { property("color", SUB); property("font-size", "14px") } }) {
                    Text(if (tableOpen) "▲" else "▼")
                }
            }

            if (tableOpen) {
                if (losses.value.isEmpty()) {
                    Div({ style { property("padding", "24px 20px"); property("text-align", "center"); property("color", SUB); property("font-size", "13px") } }) {
                        Text(s.admLossEmpty)
                    }
                } else {
                    Table({ style { property("width", "100%"); property("border-collapse", "collapse") } }) {
                        Thead {
                            Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                listOf(s.admLossColDate, s.admLossColReason, s.admLossColName, s.admLossColSku, s.admLossColCost, "").forEach { h ->
                                    Th({ style { property("padding", "10px 16px"); property("text-align", "left"); property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em") } }) {
                                        Text(h)
                                    }
                                }
                            }
                        }
                        Tbody {
                            losses.value.forEach { entry ->
                                Tr({ style { property("border-bottom", "1px solid $BORDER") } }) {
                                    Td({ style { property("padding", "11px 16px"); property("font-size", "13px"); property("color", SUB) } }) { Text(entry.date) }
                                    Td({ style { property("padding", "11px 16px"); property("font-size", "13px"); property("color", TEXT) } }) { Text(entry.reason) }
                                    Td({ style { property("padding", "11px 16px"); property("font-size", "13px"); property("color", TEXT) } }) { Text(entry.name.ifEmpty { "—" }) }
                                    Td({ style { property("padding", "11px 16px"); property("font-size", "13px"); property("font-family", "ui-monospace, monospace"); property("color", SUB) } }) { Text(entry.sku.ifEmpty { "—" }) }
                                    Td({ style { property("padding", "11px 16px"); property("font-size", "13px"); property("font-weight", "700"); property("color", "#10b981") } }) { Text(fmtDollar(entry.cost)) }
                                    Td({ style { property("padding", "8px 16px") } }) {
                                        val isDeleting = deletingId == entry.id
                                        Span({
                                            style {
                                                property("display", "inline-block"); property("padding", "4px 14px"); property("border-radius", "6px")
                                                property("font-size", "12px"); property("font-weight", "700"); property("cursor", if (isDeleting) "default" else "pointer")
                                                property("background", "rgba(239,68,68,0.15)"); property("color", "#ef4444")
                                                property("border", "1px solid rgba(239,68,68,0.3)"); property("user-select", "none")
                                                property("opacity", if (isDeleting) "0.5" else "1")
                                            }
                                            onClick {
                                                if (!isDeleting) {
                                                    deletingId = entry.id
                                                    scope.launch {
                                                        try {
                                                            fsDeleteLoss(entry.id)
                                                            losses.value = losses.value.filter { it.id != entry.id }
                                                        } finally { deletingId = null }
                                                    }
                                                }
                                            }
                                        }) { Text(if (isDeleting) "…" else s.admLossDeleteBtn) }
                                    }
                                }
                            }
                        }
                        Tfoot {
                            Tr({ style { property("border-top", "2px solid $BORDER") } }) {
                                Td({ style { property("padding", "12px 16px"); property("font-size", "12px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em"); property("colspan", "4") } }) {
                                    attr("colspan", "4")
                                    Text(s.admLossTotal)
                                }
                                Td({ style { property("padding", "12px 16px"); property("font-size", "15px"); property("font-weight", "800"); property("color", "#ef4444") } }) {
                                    val total = losses.value.sumOf { it.cost }
                                    Text(fmtDollar(total))
                                }
                                Td({})
                            }
                        }
                    }
                }
            }
        }
    }
}

// ── Monthly Bar Chart ─────────────────────────────────────────────────────────

@Composable
private fun MonthlyBarChart(allOrders: List<AdminOrder>) {
    if (allOrders.isEmpty()) return
    val s = getStrings()

    val shortMonths = listOf(s.monthShortJan, s.monthShortFeb, s.monthShortMar, s.monthShortApr, s.monthShortMay, s.monthShortJun, s.monthShortJul, s.monthShortAug, s.monthShortSep, s.monthShortOct, s.monthShortNov, s.monthShortDec)
    val now = Date()
    val currentMk = "${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}"

    // Build last 12 months oldest → newest
    val last12 = (11 downTo 0).map { i ->
        val d = Date(now.getFullYear(), now.getMonth() - i, 1)
        val mk = "${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}"
        Triple(mk, shortMonths[d.getMonth()], allOrders.count { orderMonthKey(it.orderDate) == mk })
    }

    val maxCount   = last12.maxOf { it.third }.takeIf { it > 0 } ?: 1
    val totalCount = last12.sumOf { it.third }
    val barMaxPx   = 80

    var hoveredIdx by remember { mutableStateOf<Int?>(null) }

    Div({
        style {
            property("background", SURFACE); property("border-radius", "12px")
            property("border", "1px solid $BORDER"); property("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
            property("overflow", "hidden")
        }
    }) {
        // Header
        Div({
            style {
                property("padding", "14px 20px"); property("border-bottom", "1px solid $BORDER")
                property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                property("background", "rgba(255,255,255,0.05)")
            }
        }) {
            Div({ style { property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.04em"); property("text-transform", "uppercase"); property("color", SUB) } }) {
                Text(s.admMonthlyTitle)
            }
            Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "10px") } }) {
                if (hoveredIdx != null) {
                    val (_, lbl, cnt) = last12[hoveredIdx!!]
                    val pct = if (totalCount > 0) cnt * 100.0 / totalCount else 0.0
                    Div({ style { property("font-size", "12px"); property("color", TEXT); property("font-weight", "600") } }) {
                        Text("$lbl — $cnt ${s.admOrdersUnit} (${(pct * 10).toLong().toDouble() / 10}%)")
                    }
                }
                Div({ style { property("font-size", "12px"); property("color", SUB); property("background", "rgba(255,255,255,0.09)"); property("padding", "3px 10px"); property("border-radius", "999px") } }) {
                    Text(s.admMonthlyLast12)
                }
            }
        }

        // Bars
        Div({ style { property("padding", "20px 24px 16px") } }) {
            Div({
                style {
                    property("display", "flex"); property("align-items", "flex-end")
                    property("gap", "6px"); property("height", "${barMaxPx + 36}px")
                }
            }) {
                last12.forEachIndexed { i, (mk, lbl, cnt) ->
                    val isCurrent = mk == currentMk
                    val isHovered = hoveredIdx == i
                    val barH = if (cnt > 0) (cnt.toDouble() / maxCount * barMaxPx).toInt().coerceAtLeast(4) else 2
                    val barColor = when {
                        isCurrent -> "#d1d5db"
                        isHovered -> "rgba(99,102,241,0.6)"
                        else      -> "rgba(99,102,241,0.28)"
                    }

                    Div({
                        style {
                            property("flex", "1"); property("display", "flex"); property("flex-direction", "column")
                            property("align-items", "center"); property("gap", "4px"); property("cursor", "default")
                        }
                        onMouseEnter { hoveredIdx = i }
                        onMouseLeave { hoveredIdx = null }
                    }) {
                        // Count label
                        Div({
                            style {
                                property("font-size", "10px"); property("font-weight", "700")
                                property("color", if (isCurrent || isHovered) TEXT else SUB)
                                property("opacity", if (cnt == 0) "0.3" else "1")
                                property("min-height", "14px"); property("line-height", "14px")
                            }
                        }) { if (cnt > 0) Text("$cnt") }

                        // Bar
                        Div({
                            style {
                                property("width", "100%"); property("border-radius", "3px 3px 0 0")
                                property("height", "${barH}px")
                                property("background", barColor)
                                property("transition", "background 0.15s")
                                property("transform-origin", "bottom center")
                                property("animation", "adminBarGrowV 0.45s cubic-bezier(0.4,0,0.2,1) ${i * 35}ms both")
                            }
                        }) {}

                        // Month label
                        Div({
                            style {
                                property("font-size", "10px"); property("text-align", "center")
                                property("color", if (isCurrent) TEXT else SUB)
                                property("font-weight", if (isCurrent) "700" else "400")
                            }
                        }) { Text(lbl) }
                    }
                }
            }
        }
    }
}

// ── Composable helpers ────────────────────────────────────────────────────────

@Composable
private fun DashCard(
    title: String, value: String, icon: String, accent: String,
    valueSize: String = "28px", animDelay: String = "0s"
) {
    Div({
        style {
            property("background", SURFACE); property("border-radius", "12px")
            property("border", "1px solid $BORDER"); property("padding", "20px 20px 18px")
            property("display", "flex"); property("flex-direction", "column"); property("gap", "10px")
            property("box-shadow", "0 1px 4px rgba(0,0,0,0.05)")
            property("position", "relative"); property("overflow", "hidden")
            property("animation", "adminCardIn 0.45s ease $animDelay both")
        }
    }) {
        Div({ style { property("display", "flex"); property("align-items", "flex-start"); property("justify-content", "space-between") } }) {
            Div({ style { property("font-size", "12px"); property("font-weight", "700"); property("color", SUB); property("text-transform", "uppercase"); property("letter-spacing", "0.06em") } }) {
                Text(title)
            }
            Div({
                style {
                    property("background", "${accent}18"); property("border-radius", "8px")
                    property("width", "34px"); property("height", "34px"); property("display", "flex")
                    property("align-items", "center"); property("justify-content", "center"); property("font-size", "17px")
                }
            }) { Text(icon) }
        }
        Div({ style { property("font-size", valueSize); property("font-weight", "800"); property("letter-spacing", "-0.03em"); property("line-height", "1.2"); property("color", TEXT) } }) {
            Text(value)
        }
        Div({
            style {
                property("position", "absolute"); property("bottom", "0"); property("left", "0"); property("right", "0")
                property("height", "3px"); property("background", accent); property("opacity", "0.6")
            }
        }) {}
    }
}

@Composable
private fun FormSectionLabel(label: String) {
    Div({
        style {
            property("font-size", "11px"); property("font-weight", "700")
            property("letter-spacing", "0.08em"); property("text-transform", "uppercase")
            property("color", SUB); property("margin-bottom", "12px")
        }
    }) { Text(label) }
}

@Composable
private fun FGroup(label: String, content: @Composable () -> Unit) {
    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
        Div({ style { property("font-size", "12px"); property("font-weight", "600"); property("color", SUB); property("letter-spacing", "0.02em") } }) {
            Text(label)
        }
        content()
    }
}

@Composable
private fun TCell(
    value: String,
    bold: Boolean = false, muted: Boolean = false, mono: Boolean = false,
    green: Boolean = false, red: Boolean = false
) {
    val color = when {
        green -> "#10b981"
        red   -> "#ef4444"
        muted -> SUB
        else  -> TEXT
    }
    Td({
        style {
            property("padding", "11px 16px"); property("white-space", "nowrap")
            property("color", color)
            if (bold) property("font-weight", "600")
            if (mono) { property("font-family", "ui-monospace, monospace"); property("font-size", "12px") }
        }
    }) { Text(value) }
}

private fun org.jetbrains.compose.web.attributes.AttrsScope<org.w3c.dom.HTMLInputElement>.fldStyle() {
    style {
        property("width", "100%"); property("padding", "10px 12px")
        property("border", "1px solid $BORDER"); property("border-radius", "7px")
        property("font-size", "14px"); property("background", INPUT_BG)
        property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
        property("font-family", "inherit")
    }
}

private fun org.jetbrains.compose.web.attributes.AttrsScope<org.w3c.dom.HTMLInputElement>.inlineEditStyle() {
    style {
        property("width", "100%"); property("min-width", "130px"); property("padding", "6px 10px")
        property("border", "1px solid $BORDER"); property("border-radius", "6px")
        property("font-size", "13px"); property("background", INPUT_BG)
        property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
        property("font-family", "inherit")
    }
}

private fun org.jetbrains.compose.web.attributes.AttrsScope<org.w3c.dom.HTMLSelectElement>.selectStyle() {
    style {
        property("width", "100%"); property("padding", "10px 12px")
        property("border", "1px solid $BORDER"); property("border-radius", "7px")
        property("font-size", "14px"); property("background", INPUT_BG)
        property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
        property("font-family", "inherit")
    }
}

// ── Historical Data Tab ───────────────────────────────────────────────────────

@Composable
private fun HistoricalDataTab(
    snapshots: MutableState<List<MonthlySnapshot>>,
    skuCosts: MutableState<Map<String, Double>>
) {
    val s = getStrings()
    val currentYearMonth = js("new Date().toISOString().slice(0,7)") as String
    val startMonth = "2025-01"
    val allMonths = buildList {
        var y = 2025; var m = 1
        while (true) {
            val key = "$y-${m.toString().padStart(2, '0')}"
            if (key > currentYearMonth) break
            add(key)
            m++; if (m > 12) { m = 1; y++ }
        }
    }
    var selectedMonth by remember { mutableStateOf(currentYearMonth) }

    var fOrderCount  by remember { mutableStateOf("") }
    var fShipCost    by remember { mutableStateOf("") }
    var fTariff      by remember { mutableStateOf("") }
    var fAdExpense   by remember { mutableStateOf("") }
    var fCrossFit    by remember { mutableStateOf("") }
    var fProductCost by remember { mutableStateOf("") }

    val countries     = listOf("US", "UK", "EU", "Canada", "Other")
    val countryValues = remember { mutableStateOf(countries.associateWith { "" }) }
    val skuValues     = remember { mutableStateOf(emptyMap<String, String>()) }

    var isSaving       by remember { mutableStateOf(false) }
    var isDeleting     by remember { mutableStateOf(false) }
    var saveMsg        by remember { mutableStateOf("") }
    var histSaveIsError by remember { mutableStateOf(false) }

    var summaryOpen by remember { mutableStateOf(true) }
    var countryOpen by remember { mutableStateOf(true) }
    var skuOpen     by remember { mutableStateOf(true) }
    var savedOpen   by remember { mutableStateOf(true) }

    fun loadSnapshot(month: String) {
        val snap = snapshots.value.find { it.month == month }
        if (snap != null) {
            fOrderCount  = snap.orderCount.toString()
            fShipCost    = snap.totalShippingCost.fmt2()
            fTariff      = snap.totalTariffCost.fmt2()
            fAdExpense   = snap.totalAdExpense.fmt2()
            fCrossFit    = snap.crossFit.fmt2()
            fProductCost = snap.totalProductCost.fmt2()
            countryValues.value = countries.associateWith { c -> (snap.countryBreakdown[c] ?: 0).let { if (it == 0) "" else it.toString() } }
            skuValues.value     = skuCosts.value.keys.associateWith { s -> (snap.skuBreakdown[s] ?: 0).let { if (it == 0) "" else it.toString() } }
        } else {
            fOrderCount = ""; fShipCost = ""; fTariff = ""; fAdExpense = ""; fCrossFit = ""; fProductCost = ""
            countryValues.value = countries.associateWith { "" }
            skuValues.value     = skuCosts.value.keys.associateWith { "" }
        }
        saveMsg = ""
    }

    LaunchedEffect(selectedMonth, snapshots.value) { loadSnapshot(selectedMonth) }
    LaunchedEffect(skuCosts.value.keys.joinToString()) {
        skuValues.value = skuCosts.value.keys.associateWith { s -> skuValues.value[s] ?: "" }
    }

    val hasSnapshot = snapshots.value.any { it.month == selectedMonth }

    Div({
        style {
            property("padding", "28px 32px")
            property("display", "flex"); property("flex-direction", "column"); property("gap", "24px")
            property("max-width", "860px"); property("box-sizing", "border-box")
        }
    }) {
        // Header
        Div {
            Div({ style { property("font-size", "20px"); property("font-weight", "800"); property("letter-spacing", "-0.02em"); property("margin-bottom", "4px") } }) {
                Text(s.admHistTitle)
            }
            Div({ style { property("font-size", "13px"); property("color", SUB) } }) {
                Text(s.admHistSubtext)
            }
        }

        // Month selector
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("padding", "20px")
                property("display", "flex"); property("align-items", "center"); property("gap", "16px"); property("flex-wrap", "wrap")
            }
        }) {
            Div({ style { property("font-size", "13px"); property("font-weight", "600"); property("color", SUB); property("min-width", "80px") } }) {
                Text(s.admHistSelectMonth)
            }
            Select({
                onInput { e -> selectedMonth = e.target.asDynamic().value as String }
                style {
                    property("padding", "9px 14px"); property("background", INPUT_BG)
                    property("color", TEXT); property("border", "1px solid $BORDER")
                    property("border-radius", "8px"); property("font-size", "14px"); property("cursor", "pointer")
                    property("outline", "none"); property("font-family", "inherit"); property("font-weight", "500")
                }
            }) {
                allMonths.forEach { m ->
                    Option(m, { value(m); if (m == selectedMonth) attr("selected", "selected") }) {
                        Text(monthLabel(m, s))
                    }
                }
            }
            if (hasSnapshot) {
                Div({
                    style {
                        property("padding", "5px 12px"); property("border-radius", "20px")
                        property("background", "rgba(16,185,129,0.12)"); property("color", "#10b981")
                        property("font-size", "12px"); property("font-weight", "600")
                    }
                }) { Text(s.admHistRecordExists) }
            }
        }

        // Main metrics
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
            }
        }) {
            Div({
                style {
                    property("padding", "14px 20px")
                    if (summaryOpen) property("border-bottom", "1px solid $BORDER")
                    property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.05em")
                    property("background", "rgba(255,255,255,0.05)"); property("color", SUB)
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                    property("cursor", "pointer"); property("user-select", "none")
                }
                onClick { summaryOpen = !summaryOpen }
            }) {
                Text(s.admHistMonthlySummary)
                Span({ style { property("font-size", "16px"); property("transition", "transform 0.2s"); property("transform", if (summaryOpen) "rotate(0deg)" else "rotate(-90deg)") } }) { Text("▾") }
            }

            if (summaryOpen) Div({
                style {
                    property("padding", "20px"); property("display", "grid")
                    property("grid-template-columns", "repeat(3, 1fr)"); property("gap", "16px")
                }
            }) {
                val calcNetIncome = (fCrossFit.toDoubleOrNull() ?: 0.0) -
                    (fShipCost.toDoubleOrNull() ?: 0.0) -
                    (fTariff.toDoubleOrNull() ?: 0.0) -
                    (fAdExpense.toDoubleOrNull() ?: 0.0) -
                    (fProductCost.toDoubleOrNull() ?: 0.0)

                data class MetricField(val label: String, val value: String, val setter: (String) -> Unit, val prefix: String = "$", val isCount: Boolean = false)
                listOf(
                    MetricField(s.admHistOrderCount, fOrderCount, { fOrderCount = it }, "", true),
                    MetricField(s.admHistTotalShipCost, fShipCost, { fShipCost = it }),
                    MetricField(s.admHistTotalTariff, fTariff, { fTariff = it }),
                    MetricField(s.admHistTotalAdExpense, fAdExpense, { fAdExpense = it }),
                    MetricField(s.admHistTotalProdCost, fProductCost, { fProductCost = it }),
                    MetricField(s.admHistCrossFit, fCrossFit, { fCrossFit = it })
                ).forEach { field ->
                    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
                        Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("letter-spacing", "0.04em") } }) {
                            Text(field.label.uppercase())
                        }
                        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "6px") } }) {
                            if (field.prefix.isNotEmpty()) {
                                Div({ style { property("font-size", "14px"); property("color", SUB) } }) { Text(field.prefix) }
                            }
                            Input(InputType.Number) {
                                value(field.value)
                                onInput { e -> field.setter(e.target.asDynamic().value as String) }
                                attr("placeholder", if (field.isCount) "0" else "0.00")
                                attr("min", "0")
                                if (!field.isCount) attr("step", "0.01")
                                style {
                                    property("width", "100%"); property("padding", "9px 12px")
                                    property("border", "1px solid $BORDER"); property("border-radius", "8px")
                                    property("font-size", "14px"); property("background", INPUT_BG)
                                    property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
                                    property("font-family", "inherit"); property("font-weight", "500")
                                }
                            }
                        }
                    }
                }

                // Calculated Net Income
                Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
                    Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("letter-spacing", "0.04em") } }) {
                        Text(s.admHistNetIncomeAuto)
                    }
                    Div({
                        style {
                            property("display", "flex"); property("align-items", "center"); property("gap", "6px")
                            property("padding", "9px 12px"); property("border-radius", "8px")
                            property("border", "1px solid $BORDER"); property("background", "rgba(0,0,0,0.2)")
                            property("font-size", "14px"); property("font-weight", "600")
                            property("color", if (calcNetIncome >= 0) "#10b981" else "#ef4444")
                        }
                    }) {
                        Text("$ ${calcNetIncome.asDynamic().toFixed(2)}")
                    }
                }
            }
        }

        // Country breakdown
        Div({
            style {
                property("background", SURFACE); property("border-radius", "12px")
                property("border", "1px solid $BORDER"); property("overflow", "hidden")
            }
        }) {
            Div({
                style {
                    property("padding", "14px 20px")
                    if (countryOpen) property("border-bottom", "1px solid $BORDER")
                    property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.05em")
                    property("background", "rgba(255,255,255,0.05)"); property("color", SUB)
                    property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                    property("cursor", "pointer"); property("user-select", "none")
                }
                onClick { countryOpen = !countryOpen }
            }) {
                Text(s.admHistOrdersByCountry)
                Span({ style { property("font-size", "16px"); property("transition", "transform 0.2s"); property("transform", if (countryOpen) "rotate(0deg)" else "rotate(-90deg)") } }) { Text("▾") }
            }

            if (countryOpen) Div({
                style {
                    property("padding", "20px"); property("display", "grid")
                    property("grid-template-columns", "repeat(5, 1fr)"); property("gap", "12px")
                }
            }) {
                val flags = mapOf("US" to "🇺🇸", "UK" to "🇬🇧", "EU" to "🇪🇺", "Canada" to "🇨🇦", "Other" to "🌍")
                countries.forEach { country ->
                    Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
                        Div({
                            style {
                                property("font-size", "11px"); property("font-weight", "700")
                                property("color", SUB); property("letter-spacing", "0.04em")
                                property("display", "flex"); property("align-items", "center"); property("gap", "4px")
                            }
                        }) {
                            Text("${flags[country] ?: ""} $country".uppercase())
                        }
                        Input(InputType.Number) {
                            value(countryValues.value[country] ?: "")
                            onInput { e ->
                                val v = e.target.asDynamic().value as String
                                countryValues.value = countryValues.value.toMutableMap().apply { put(country, v) }
                            }
                            attr("placeholder", "0")
                            attr("min", "0")
                            style {
                                property("width", "100%"); property("padding", "9px 12px")
                                property("border", "1px solid $BORDER"); property("border-radius", "8px")
                                property("font-size", "14px"); property("background", INPUT_BG)
                                property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
                                property("font-family", "inherit"); property("font-weight", "500")
                            }
                        }
                    }
                }
            }
        }

        // SKU breakdown
        if (skuCosts.value.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border-radius", "12px")
                    property("border", "1px solid $BORDER"); property("overflow", "hidden")
                }
            }) {
                Div({
                    style {
                        property("padding", "14px 20px")
                        if (skuOpen) property("border-bottom", "1px solid $BORDER")
                        property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.05em")
                        property("background", "rgba(255,255,255,0.05)"); property("color", SUB)
                        property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                        property("cursor", "pointer"); property("user-select", "none")
                    }
                    onClick { skuOpen = !skuOpen }
                }) {
                    Text(s.admHistOrdersBySku)
                    Span({ style { property("font-size", "16px"); property("transition", "transform 0.2s"); property("transform", if (skuOpen) "rotate(0deg)" else "rotate(-90deg)") } }) { Text("▾") }
                }

                if (skuOpen) Div({
                    style {
                        property("padding", "20px"); property("display", "grid")
                        property("grid-template-columns", "repeat(auto-fill, minmax(160px, 1fr))"); property("gap", "12px")
                    }
                }) {
                    skuCosts.value.keys.sorted().forEach { sku ->
                        Div({ style { property("display", "flex"); property("flex-direction", "column"); property("gap", "6px") } }) {
                            Div({ style { property("font-size", "11px"); property("font-weight", "700"); property("color", SUB); property("letter-spacing", "0.04em"); property("font-family", "ui-monospace, monospace") } }) {
                                Text(sku.uppercase())
                            }
                            Input(InputType.Number) {
                                value(skuValues.value[sku] ?: "")
                                onInput { e ->
                                    val v = e.target.asDynamic().value as String
                                    skuValues.value = skuValues.value.toMutableMap().apply { put(sku, v) }
                                }
                                attr("placeholder", "0")
                                attr("min", "0")
                                style {
                                    property("width", "100%"); property("padding", "9px 12px")
                                    property("border", "1px solid $BORDER"); property("border-radius", "8px")
                                    property("font-size", "14px"); property("background", INPUT_BG)
                                    property("color", TEXT); property("box-sizing", "border-box"); property("outline", "none")
                                    property("font-family", "inherit"); property("font-weight", "500")
                                }
                            }
                        }
                    }
                }
            }
        }

        // Save / Delete buttons
        Div({ style { property("display", "flex"); property("align-items", "center"); property("gap", "12px"); property("flex-wrap", "wrap") } }) {
            Button({
                style {
                    property("background", if (isSaving) "rgba(255,255,255,0.22)" else "linear-gradient(135deg, #3d3d3d 0%, #1a1a1a 100%)")
                    property("color", "white"); property("border", "none"); property("border-radius", "9px")
                    property("padding", "11px 28px"); property("font-size", "14px"); property("font-weight", "600")
                    property("cursor", if (isSaving) "not-allowed" else "pointer"); property("font-family", "inherit")
                    if (!isSaving) property("box-shadow", "0 2px 8px rgba(79,70,229,0.4)")
                }
                onClick {
                    if (!isSaving) MainScope().launch {
                        isSaving = true; saveMsg = ""
                        try {
                            val snap = MonthlySnapshot(
                                month             = selectedMonth,
                                orderCount        = fOrderCount.toIntOrNull() ?: 0,
                                totalShippingCost = fShipCost.toDoubleOrNull() ?: 0.0,
                                totalTariffCost   = fTariff.toDoubleOrNull() ?: 0.0,
                                totalAdExpense    = fAdExpense.toDoubleOrNull() ?: 0.0,
                                totalNetIncome    = (fCrossFit.toDoubleOrNull() ?: 0.0) - (fShipCost.toDoubleOrNull() ?: 0.0) - (fTariff.toDoubleOrNull() ?: 0.0) - (fAdExpense.toDoubleOrNull() ?: 0.0) - (fProductCost.toDoubleOrNull() ?: 0.0),
                                crossFit          = fCrossFit.toDoubleOrNull() ?: 0.0,
                                totalProductCost  = fProductCost.toDoubleOrNull() ?: 0.0,
                                countryBreakdown  = countries.associateWith { c -> countryValues.value[c]?.toIntOrNull() ?: 0 },
                                skuBreakdown      = skuCosts.value.keys.associateWith { s -> skuValues.value[s]?.toIntOrNull() ?: 0 }
                            )
                            fsSaveSnapshot(snap)
                            snapshots.value = (snapshots.value.filter { it.month != selectedMonth } + snap).sortedBy { it.month }
                            saveMsg = "✓ ${monthLabel(selectedMonth, s)} ${s.admHistSavedSuffix}"; histSaveIsError = false
                        } catch (e: Exception) { saveMsg = "${s.admErrGeneric}${e.message}"; histSaveIsError = true }
                        isSaving = false
                    }
                }
            }) { Text(if (isSaving) s.admHistSaving else if (hasSnapshot) s.admHistUpdate else s.admHistSave) }

            if (hasSnapshot) {
                Button({
                    style {
                        property("background", "transparent"); property("color", "#ef4444")
                        property("border", "1px solid rgba(239,68,68,0.4)"); property("border-radius", "9px")
                        property("padding", "11px 20px"); property("font-size", "14px"); property("font-weight", "600")
                        property("cursor", if (isDeleting) "not-allowed" else "pointer"); property("font-family", "inherit")
                    }
                    onClick {
                        if (!isDeleting && window.confirm(s.admHistDeleteConfirmPre + monthLabel(selectedMonth, s) + s.admHistDeleteConfirmPost)) {
                            MainScope().launch {
                                isDeleting = true; saveMsg = ""
                                try {
                                    fsDeleteSnapshot(selectedMonth)
                                    snapshots.value = snapshots.value.filter { it.month != selectedMonth }
                                    loadSnapshot(selectedMonth)
                                    saveMsg = s.admHistDeleted; histSaveIsError = false
                                } catch (e: Exception) { saveMsg = "${s.admErrGeneric}${e.message}"; histSaveIsError = true }
                                isDeleting = false
                            }
                        }
                    }
                }) { Text(if (isDeleting) s.admHistDeleting else s.admHistDelete) }
            }

            if (saveMsg.isNotEmpty()) {
                Div({
                    style {
                        property("font-size", "13px"); property("font-weight", "600")
                        property("color", if (histSaveIsError) "#ef4444" else "#10b981")
                    }
                }) { Text(saveMsg) }
            }
        }

        // Saved snapshots table
        if (snapshots.value.isNotEmpty()) {
            Div({
                style {
                    property("background", SURFACE); property("border-radius", "12px")
                    property("border", "1px solid $BORDER"); property("overflow", "hidden")
                }
            }) {
                Div({
                    style {
                        property("padding", "14px 20px")
                        if (savedOpen) property("border-bottom", "1px solid $BORDER")
                        property("font-size", "13px"); property("font-weight", "700"); property("letter-spacing", "0.05em")
                        property("background", "rgba(255,255,255,0.05)"); property("color", SUB)
                        property("display", "flex"); property("align-items", "center"); property("justify-content", "space-between")
                        property("cursor", "pointer"); property("user-select", "none")
                    }
                    onClick { savedOpen = !savedOpen }
                }) {
                    Text("${s.admHistSavedMonths} (${snapshots.value.size})")
                    Span({ style { property("font-size", "16px"); property("transition", "transform 0.2s"); property("transform", if (savedOpen) "rotate(0deg)" else "rotate(-90deg)") } }) { Text("▾") }
                }

                if (savedOpen) Div({ style { property("overflow-x", "auto") } }) {
                    Table({
                        style {
                            property("width", "100%"); property("border-collapse", "collapse")
                            property("font-size", "13px")
                        }
                    }) {
                        Thead {
                            Tr({
                                style {
                                    property("background", "rgba(99,102,241,0.05)")
                                    property("border-bottom", "1px solid $BORDER")
                                }
                            }) {
                                listOf(s.admHistTableMonth, s.admHistTableOrders, s.admHistTableShipping, s.admHistTableTariff, s.admHistTableAds, s.admHistTableNetIncome, s.admHistTableProdCost, s.admHistTableCrossFit).forEach { h ->
                                    Th({
                                        style {
                                            property("padding", "10px 16px"); property("text-align", "left")
                                            property("font-size", "11px"); property("font-weight", "700")
                                            property("letter-spacing", "0.05em"); property("color", SUB)
                                            property("white-space", "nowrap")
                                        }
                                    }) { Text(h.uppercase()) }
                                }
                            }
                        }
                        Tbody {
                            snapshots.value.sortedBy { it.month }.forEach { snap ->
                                val isSelected = snap.month == selectedMonth
                                Tr({
                                    style {
                                        property("border-bottom", "1px solid $BORDER")
                                        property("cursor", "pointer")
                                        if (isSelected) property("background", "rgba(255,255,255,0.08)")
                                    }
                                    onClick { selectedMonth = snap.month }
                                }) {
                                    Td({ style { property("padding", "11px 16px"); property("font-weight", "600") } }) {
                                        Text(monthLabel(snap.month, s))
                                    }
                                    Td({ style { property("padding", "11px 16px"); property("text-align", "center") } }) { Text(snap.orderCount.toString()) }
                                    Td({ style { property("padding", "11px 16px") } }) { Text(snap.totalShippingCost.fmt2()) }
                                    Td({ style { property("padding", "11px 16px") } }) { Text(snap.totalTariffCost.fmt2()) }
                                    Td({ style { property("padding", "11px 16px") } }) { Text(snap.totalAdExpense.fmt2()) }
                                    Td({ style { property("padding", "11px 16px"); property("color", if (snap.totalNetIncome >= 0) "#10b981" else "#ef4444"); property("font-weight", "600") } }) {
                                        Text(snap.totalNetIncome.fmt2())
                                    }
                                    Td({ style { property("padding", "11px 16px") } }) { Text(snap.totalProductCost.fmt2()) }
                                    Td({ style { property("padding", "11px 16px") } }) { Text(snap.crossFit.fmt2()) }
                                }
                            }
                        }
                    }
                }
            }
        }

        Div({ style { property("height", "24px") } }) {}
    }
}
