@file:JsModule("firebase/storage")
@file:JsNonModule
package com.orderpanel.firebase

external fun getStorage(app: dynamic = definedExternally): dynamic

@JsName("ref")
external fun storageRef(storage: dynamic, path: String): dynamic

external fun uploadBytes(storageRef: dynamic, data: dynamic): dynamic
external fun getDownloadURL(storageRef: dynamic): dynamic
