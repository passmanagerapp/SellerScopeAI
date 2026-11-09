package com.orderpanel.pages.admin

import kotlinx.serialization.Serializable

/*
 * Data stored under users/{uid}/… — each document is an EncryptedPayload whose plaintext is one of these
 * classes as JSON (crypto/Crypto.kt; the server's twin is jvmMain ServerCrypto.kt).
 *
 * Compatibility rules (old blobs must keep opening, and the server writes the same JSON by hand):
 *  - every field has a default, new fields are only ever appended;
 *  - decode with `ignoreUnknownKeys = true`;
 *  - never rename a field — the server cron (phase 2) writes these names verbatim.
 * Firestore/JS has no Long: numeric ids (ShipEntegra item ids) are Double.
 */

@Serializable
data class AdminOrder(
    val id: String             = "",
    val orderDate: String      = "",
    val orderQuantity: Int     = 1,
    val receiverName: String   = "",
    val trackingNumber: String = "",
    val shippingDate: String   = "",
    val country: String        = "Other",
    val customValue: Double    = 0.0,  // customs declaration value — never revenue
    val profit: Double         = 0.0,  // marketplace earnings (formula estimate from ShipEntegra totalPrice/tax)
    val shippingCost: Double   = 0.0,
    val tariffCost: Double     = 0.0,
    val productCost: Double    = 0.0,
    val netProfit: Double      = 0.0,
    val status: String         = "Processing", // Processing → Shipped → Delivered (never moves backwards)
    val sku: String            = "",
    val cargoCompany: String   = "",
    // ── Ported from AhrarWood (ShipEntegra sync; Etsy-only fields deliberately left out) ──
    val deliveryDate: String   = "",   // YYYY-MM-DD, stamped when status first becomes Delivered; blank for EPP
    val countryCode: String    = "",   // ISO 3166-1 alpha-2 from ShipEntegra (blank for CSV / manual orders)
    val isOffsideAd: Boolean   = false, // order came through the marketplace's off-site ads (thinner margin is expected)
    val isRefunded: Boolean    = false,
    val isEpp: Boolean         = false, // marketplace purchase protection paid the customer; forces status = Delivered
    val source: String         = "",   // "api" = ShipEntegra sync, "" / "manual" / "csv" = entered by the seller
    val seOrderId: String      = "",   // ShipEntegra order id — fallback tracking number
    val purchaseOption: String = "",   // ShipEntegra item "Purchase Options" selection (e.g. "Large 1") — drives kg/desi
    val items: List<AdminOrderItem> = emptyList(), // ShipEntegra line items, reused when creating a label
    val marketplaceOrderId: String = "", // ShipEntegra item.marketplaceOrderId (e.g. the Etsy receipt id) — display only
    val labelCarrier: String   = "",   // ShipEntegra special service the label was created with; blank = no label yet
    val shipToPhone: String    = "",
    val shipToEmail: String    = "",
    val kgDesi: Double         = 0.0,  // billed kg/desi from ShipEntegra priceInfo; 0 = not priced yet
)

@Serializable
data class AdminOrderItem(
    val itemId: Double = 0.0,        // ShipEntegra item id (Long isn't safe through Firestore/JS)
    val declaredPrice: Double = 0.0,
    val declaredQuantity: Int = 1,
    val sku: String = "",
    val options: List<AdminOrderItemOption> = emptyList(),
    val imageUrl: String = "",
)

@Serializable
data class AdminOrderItemOption(
    val name: String = "",
    val value: String = "",
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
