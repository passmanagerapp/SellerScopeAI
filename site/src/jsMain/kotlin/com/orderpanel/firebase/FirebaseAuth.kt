@file:JsModule("firebase/auth")
@file:JsNonModule

package com.orderpanel.firebase

external fun getAuth(app: dynamic = definedExternally): dynamic
external fun signInWithEmailAndPassword(auth: dynamic, email: String, password: String): dynamic
external fun createUserWithEmailAndPassword(auth: dynamic, email: String, password: String): dynamic
external fun signInWithPopup(auth: dynamic, provider: dynamic): dynamic
external fun signOut(auth: dynamic): dynamic
external fun onAuthStateChanged(auth: dynamic, callback: (dynamic) -> Unit): dynamic

external class GoogleAuthProvider
