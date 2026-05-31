package com.orderpanel.crypto

import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlin.js.Promise

// ── Browser globals ───────────────────────────────────────────────────────────
private external fun btoa(s: String): String
private external fun atob(s: String): String

// ── JS helpers (module-level — safe: no outer variable references inside js()) ─
//   Calling these via Kotlin dynamic invocation passes values correctly at runtime.
private val _uint8OfSize: dynamic = js("function(n){return new Uint8Array(n);}")
private val _bufToStr: dynamic    = js("function(b){return String.fromCharCode.apply(null,new Uint8Array(b));}")
private val _strToUint8: dynamic   = js("function(s){var a=new Uint8Array(s.length);for(var i=0;i<s.length;i++)a[i]=s.charCodeAt(i);return a;}")

private val DERIVE_USAGES: dynamic = js("['deriveKey']")
private val ENC_DEC_USAGES: dynamic = js("['encrypt','decrypt']")

// ── Low-level helpers ─────────────────────────────────────────────────────────
private val subtle get() = window.asDynamic().crypto.subtle

private fun encode(s: String): dynamic {
    val enc: dynamic = js("new TextEncoder()")
    return enc.encode(s)
}

private fun decode(buf: dynamic): String {
    val dec: dynamic = js("new TextDecoder()")
    return dec.decode(buf).unsafeCast<String>()
}

private fun bufToBase64(buf: dynamic): String = btoa(_bufToStr(buf).unsafeCast<String>())
private fun base64ToUint8(b64: String): dynamic = _strToUint8(atob(b64))

// ── Key cache (one derived key per user per session) ─────────────────────────
private val keyCache = mutableMapOf<String, dynamic>()

/**
 * Derives an AES-GCM-256 key from the user's UID via PBKDF2.
 * The key is cached for the session so derivation only runs once per user.
 *
 * Security note: this protects data at rest in Firestore from casual access
 * (e.g. Firebase console). The key is deterministic from the UID, which is
 * a non-secret identifier, so it does not prevent access by someone who
 * already has valid Firebase credentials for that account.
 */
suspend fun getOrDeriveKey(uid: String): dynamic {
    val cached = keyCache[uid]
    if (cached != null) return cached

    val pwdBuf  = encode(uid)
    val saltBuf = encode("ss_enc_v1_$uid")

    val importAlg: dynamic = js("({})")
    importAlg["name"] = "PBKDF2"

    val baseKey = (subtle.importKey(
        "raw", pwdBuf, importAlg, false, DERIVE_USAGES
    ) as Promise<dynamic>).await()

    val deriveAlg: dynamic = js("({})")
    deriveAlg["name"]       = "PBKDF2"
    deriveAlg["salt"]       = saltBuf
    deriveAlg["iterations"] = 100000
    deriveAlg["hash"]       = "SHA-256"

    val aesAlg: dynamic = js("({})")
    aesAlg["name"]   = "AES-GCM"
    aesAlg["length"] = 256

    val key = (subtle.deriveKey(
        deriveAlg, baseKey, aesAlg, false, ENC_DEC_USAGES
    ) as Promise<dynamic>).await()

    keyCache[uid] = key
    return key
}

/** Encrypts [plaintext] with a per-user AES-GCM key and returns a base64 string
 *  in the format "ivBase64.ciphertextBase64". */
suspend fun encrypt(plaintext: String, uid: String): String {
    val key = getOrDeriveKey(uid)
    val iv  = _uint8OfSize(12)
    window.asDynamic().crypto.getRandomValues(iv)

    val alg: dynamic = js("({})")
    alg["name"] = "AES-GCM"
    alg["iv"]   = iv

    val cipher = (subtle.encrypt(alg, key, encode(plaintext)) as Promise<dynamic>).await()
    return "${bufToBase64(iv)}.${bufToBase64(cipher)}"
}

/** Decrypts a value produced by [encrypt]. Returns the original plaintext. */
suspend fun decrypt(ciphertext: String, uid: String): String {
    val key = getOrDeriveKey(uid)
    val dot  = ciphertext.indexOf('.')
    require(dot > 0) { "Invalid encrypted payload" }

    val iv   = base64ToUint8(ciphertext.substring(0, dot))
    val data = base64ToUint8(ciphertext.substring(dot + 1))

    val alg: dynamic = js("({})")
    alg["name"] = "AES-GCM"
    alg["iv"]   = iv

    val plain = (subtle.decrypt(alg, key, data) as Promise<dynamic>).await()
    return decode(plain)
}
