package com.orderpanel.firebase

/**
 * Firebase web-app config for the `sellerscopeai` project.
 *
 * These values are public by design — they ship inside every exported JS bundle and only identify
 * the project; access is enforced by Firebase Auth + `firestore.rules`. Committed (instead of
 * git-ignored) so the frontend export is reproducible on any machine.
 */
object FirebaseConfig {
    const val API_KEY             = "AIzaSyBhkfWWxLQas_ae6-A6CYoInsOyGfhyJoE"
    const val AUTH_DOMAIN         = "sellerscopeai.firebaseapp.com"
    const val PROJECT_ID          = "sellerscopeai"
    const val STORAGE_BUCKET      = "sellerscopeai.appspot.com"
    const val MESSAGING_SENDER_ID = "193204810254"
    const val APP_ID              = "1:193204810254:web:c251e744047d1258fb825f"
}
