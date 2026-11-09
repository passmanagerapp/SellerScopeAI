package com.orderpanel.api

/**
 * Each user's third-party credentials (ADR-0005). Stored in `users/{uid}/private/integrations`, which
 * `firestore.rules` closes to every client — only the server (service account) reads or writes it. The
 * secrets themselves are additionally encrypted with [CredentialCipher] (server key + uid as AAD).
 *
 * Document fields:
 *  - `shipEntegra`           — CredentialCipher({"clientId","clientSecret"})
 *  - `shipEntegraHint`       — masked client id for the settings UI (e.g. "ab12…9f")
 *  - `shipEntegraUpdatedAt`  — TR stamp
 *  - `gmail`                 — CredentialCipher({"user","appPassword"}) (customs-reply follow-up, phase 4)
 *  - `gmailUser`, `gmailUpdatedAt`
 *
 * The user's root doc `users/{uid}` carries plain `hasShipEntegra` / `hasGmail` flags so the crons can find
 * connected users with one query (a flag set by hand without credentials just makes a cron skip the user).
 */
internal object UserIntegrations {
    const val SHIPENTEGRA = "shipentegra"
    const val GMAIL = "gmail"

    private const val DOC = "private/integrations"

    data class ShipEntegraCredentials(val clientId: String, val clientSecret: String) {
        /** The JSON body for ShipEntegra `POST /auth/token`. */
        val authBody: String get() = """{"clientId":${jsonStr(clientId)},"clientSecret":${jsonStr(clientSecret)}}"""
    }

    data class GmailCredentials(val user: String, val appPassword: String)

    data class Status(
        val shipEntegra: Boolean,
        val shipEntegraHint: String,
        val shipEntegraUpdatedAt: String,
        val gmail: Boolean,
        val gmailUser: String,
        val gmailUpdatedAt: String,
    )

    private suspend fun readDoc(uid: String): String? {
        val (status, body) = fsGet(userPath(uid, DOC))
        if (status == 404) return null
        if (status !in 200..299) throw IllegalStateException("integrations read: HTTP $status")
        return body
    }

    suspend fun status(uid: String): Status {
        val doc = readDoc(uid) ?: ""
        return Status(
            shipEntegra = !fsStr(doc, "shipEntegra").isNullOrEmpty(),
            shipEntegraHint = fsStr(doc, "shipEntegraHint") ?: "",
            shipEntegraUpdatedAt = fsStr(doc, "shipEntegraUpdatedAt") ?: "",
            gmail = !fsStr(doc, "gmail").isNullOrEmpty(),
            gmailUser = fsStr(doc, "gmailUser") ?: "",
            gmailUpdatedAt = fsStr(doc, "gmailUpdatedAt") ?: "",
        )
    }

    /** The user's ShipEntegra credentials, or null when not connected. */
    suspend fun shipEntegra(uid: String): ShipEntegraCredentials? {
        val cipher = readDoc(uid)?.let { fsStr(it, "shipEntegra") }?.takeIf { it.isNotEmpty() } ?: return null
        val obj = MiniJson.parse(CredentialCipher.decrypt(cipher, uid)).jObj()
        val id = obj["clientId"].jStr() ?: return null
        val secret = obj["clientSecret"].jStr() ?: return null
        return ShipEntegraCredentials(id, secret)
    }

    /** Like [shipEntegra] but throws [IntegrationMissingException] (→ 409) when not connected. */
    suspend fun requireShipEntegra(uid: String): ShipEntegraCredentials =
        shipEntegra(uid) ?: throw IntegrationMissingException(SHIPENTEGRA)

    suspend fun gmail(uid: String): GmailCredentials? {
        val cipher = readDoc(uid)?.let { fsStr(it, "gmail") }?.takeIf { it.isNotEmpty() } ?: return null
        val obj = MiniJson.parse(CredentialCipher.decrypt(cipher, uid)).jObj()
        val user = obj["user"].jStr() ?: return null
        val pass = obj["appPassword"].jStr() ?: return null
        return GmailCredentials(user, pass)
    }

    suspend fun saveShipEntegra(uid: String, creds: ShipEntegraCredentials) {
        val cipher = CredentialCipher.encrypt(creds.authBody, uid)
        patchDoc(
            uid,
            mapOf(
                "shipEntegra" to fvStr(cipher),
                "shipEntegraHint" to fvStr(hint(creds.clientId)),
                "shipEntegraUpdatedAt" to fvStr(turkeyStamp()),
            ),
        )
        setRootFlag(uid, "hasShipEntegra", true)
    }

    suspend fun saveGmail(uid: String, creds: GmailCredentials) {
        val json = """{"user":${jsonStr(creds.user)},"appPassword":${jsonStr(creds.appPassword)}}"""
        patchDoc(
            uid,
            mapOf(
                "gmail" to fvStr(CredentialCipher.encrypt(json, uid)),
                "gmailUser" to fvStr(creds.user),
                "gmailUpdatedAt" to fvStr(turkeyStamp()),
            ),
        )
        setRootFlag(uid, "hasGmail", true)
    }

    /** Disconnect one integration: blank its fields and clear the root flag. */
    suspend fun delete(uid: String, integration: String) {
        when (integration) {
            SHIPENTEGRA -> {
                patchDoc(uid, mapOf("shipEntegra" to fvStr(""), "shipEntegraHint" to fvStr(""), "shipEntegraUpdatedAt" to fvStr("")))
                setRootFlag(uid, "hasShipEntegra", false)
                ShipEntegraAuth.invalidate(uid)
            }
            GMAIL -> {
                patchDoc(uid, mapOf("gmail" to fvStr(""), "gmailUser" to fvStr(""), "gmailUpdatedAt" to fvStr("")))
                setRootFlag(uid, "hasGmail", false)
            }
            else -> throw IllegalArgumentException("unknown integration")
        }
    }

    /** Uids of users whose root doc says ShipEntegra is connected — the crons' work list. */
    suspend fun usersWithShipEntegra(): List<String> =
        fsQueryEq("", "users", "hasShipEntegra", fvBool(true)).mapNotNull(::fsUserIdOf).distinct()

    private suspend fun patchDoc(uid: String, fields: Map<String, String>) {
        val body = fields.entries.joinToString(",", prefix = """{"fields":{""", postfix = "}}") { (k, v) -> "\"$k\":$v" }
        val (status, resp) = fsPatch(userPath(uid, DOC), body, fields.keys.toList())
        if (status !in 200..299) throw IllegalStateException("integrations write: HTTP $status ${resp.take(200)}")
    }

    private suspend fun setRootFlag(uid: String, field: String, value: Boolean) {
        val (status, resp) = fsPatch(userPath(uid), """{"fields":{"$field":${fvBool(value)}}}""", listOf(field))
        if (status !in 200..299) throw IllegalStateException("user flag write: HTTP $status ${resp.take(200)}")
    }

    private fun hint(clientId: String): String = when {
        clientId.length <= 6 -> "•".repeat(clientId.length)
        else -> clientId.take(4) + "…" + clientId.takeLast(2)
    }
}
