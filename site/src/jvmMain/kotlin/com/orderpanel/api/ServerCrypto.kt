package com.orderpanel.api

import java.security.MessageDigest
import java.security.SecureRandom
import java.util.Base64
import java.util.concurrent.ConcurrentHashMap
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.PBEKeySpec
import javax.crypto.spec.SecretKeySpec

private val random = SecureRandom()
private const val GCM_TAG_BITS = 128
private const val IV_BYTES = 12

private fun gcm(mode: Int, key: SecretKey, iv: ByteArray, aad: ByteArray? = null): Cipher =
    Cipher.getInstance("AES/GCM/NoPadding").apply {
        init(mode, key, GCMParameterSpec(GCM_TAG_BITS, iv))
        if (aad != null) updateAAD(aad)
    }

/**
 * JVM twin of jsMain `crypto/Crypto.kt` — the format every user document is stored in
 * (`EncryptedPayload.enc`). Must stay byte-compatible with the browser:
 *
 *  - key: PBKDF2-HMAC-SHA256(password = uid, salt = "ss_enc_v1_" + uid, 100 000 iterations) → AES-256
 *  - AES-GCM, 12-byte random IV, 128-bit tag appended to the ciphertext (WebCrypto's default)
 *  - output: base64(iv) + "." + base64(ciphertext+tag), standard base64 with padding (browser `btoa`)
 *
 * The key is derivable from the uid alone, so this is obfuscation at rest, not secrecy (ADR-0005). Real
 * secrets use [CredentialCipher].
 */
internal object UserBlobCrypto {
    private const val ITERATIONS = 100_000
    private const val MAX_CACHED_KEYS = 5_000
    private val keys = ConcurrentHashMap<String, SecretKey>()

    private fun key(uid: String): SecretKey = keys[uid] ?: run {
        if (keys.size > MAX_CACHED_KEYS) keys.clear()
        val spec = PBEKeySpec(uid.toCharArray(), "ss_enc_v1_$uid".toByteArray(Charsets.UTF_8), ITERATIONS, 256)
        val raw = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).encoded
        SecretKeySpec(raw, "AES").also { keys[uid] = it }
    }

    fun encrypt(plaintext: String, uid: String): String {
        val iv = ByteArray(IV_BYTES).also(random::nextBytes)
        val ct = gcm(Cipher.ENCRYPT_MODE, key(uid), iv).doFinal(plaintext.toByteArray(Charsets.UTF_8))
        val b64 = Base64.getEncoder()
        return "${b64.encodeToString(iv)}.${b64.encodeToString(ct)}"
    }

    fun decrypt(payload: String, uid: String): String {
        val dot = payload.indexOf('.')
        require(dot > 0) { "invalid encrypted payload" }
        val b64 = Base64.getDecoder()
        val iv = b64.decode(payload.substring(0, dot))
        val ct = b64.decode(payload.substring(dot + 1))
        return String(gcm(Cipher.DECRYPT_MODE, key(uid), iv).doFinal(ct), Charsets.UTF_8)
    }
}

/**
 * Encryption for users' third-party secrets (ShipEntegra client secret, Gmail app password), with the
 * server-only key in `CREDENTIALS_KEY` — a base64 string of 32 random bytes
 * (`openssl rand -base64 32`); any other non-empty value is hashed with SHA-256 into a key.
 *
 * Format: `v1.` + base64(iv) + `.` + base64(ciphertext+tag). The uid is bound in as GCM associated data,
 * so a blob copied onto another user's document fails to decrypt.
 */
internal object CredentialCipher {
    private const val PREFIX = "v1."

    private val key: SecretKey by lazy {
        val raw = ServerEnv.require(ServerEnv.CREDENTIALS_KEY)
        val bytes = runCatching { Base64.getDecoder().decode(raw) }.getOrNull()?.takeIf { it.size == 32 }
            ?: MessageDigest.getInstance("SHA-256").digest(raw.toByteArray(Charsets.UTF_8))
        SecretKeySpec(bytes, "AES")
    }

    fun encrypt(plaintext: String, uid: String): String {
        val iv = ByteArray(IV_BYTES).also(random::nextBytes)
        val ct = gcm(Cipher.ENCRYPT_MODE, key, iv, uid.toByteArray(Charsets.UTF_8)).doFinal(plaintext.toByteArray(Charsets.UTF_8))
        val b64 = Base64.getEncoder()
        return PREFIX + b64.encodeToString(iv) + "." + b64.encodeToString(ct)
    }

    fun decrypt(payload: String, uid: String): String {
        require(payload.startsWith(PREFIX)) { "unknown credential format" }
        val rest = payload.removePrefix(PREFIX)
        val dot = rest.indexOf('.')
        require(dot > 0) { "invalid credential payload" }
        val b64 = Base64.getDecoder()
        val iv = b64.decode(rest.substring(0, dot))
        val ct = b64.decode(rest.substring(dot + 1))
        return String(gcm(Cipher.DECRYPT_MODE, key, iv, uid.toByteArray(Charsets.UTF_8)).doFinal(ct), Charsets.UTF_8)
    }
}
