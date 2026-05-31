package com.orderpanel.firebase

import dev.gitlive.firebase.Firebase
import dev.gitlive.firebase.FirebaseOptions
import dev.gitlive.firebase.initialize

private var firebaseAuth: dynamic = null

fun initFirebase() {
    Firebase.initialize(
        options = FirebaseOptions(
            applicationId      = FirebaseConfig.APP_ID,
            apiKey             = FirebaseConfig.API_KEY,
            storageBucket      = FirebaseConfig.STORAGE_BUCKET,
            projectId          = FirebaseConfig.PROJECT_ID,
            gcmSenderId        = FirebaseConfig.MESSAGING_SENDER_ID,
            authDomain         = FirebaseConfig.AUTH_DOMAIN
        )
    )
    firebaseAuth = getAuth()
}

fun getFirebaseAuth(): dynamic = firebaseAuth

fun firebaseAuthError(code: String?): String = when (code) {
    "auth/invalid-email"        -> "Invalid email address"
    "auth/invalid-credential"   -> "Incorrect email or password"
    "auth/user-not-found"       -> "No account found with this email"
    "auth/wrong-password"       -> "Incorrect password"
    "auth/email-already-in-use" -> "An account with this email already exists"
    "auth/weak-password"        -> "Password must be at least 6 characters"
    "auth/too-many-requests"    -> "Too many attempts. Please try again later"
    "auth/user-disabled"        -> "This account has been disabled"
    "auth/popup-closed-by-user" -> ""
    else                        -> "Authentication failed. Please try again"
}
