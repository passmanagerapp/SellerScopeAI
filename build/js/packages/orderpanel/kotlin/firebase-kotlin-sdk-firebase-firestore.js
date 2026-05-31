(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'firebase/firestore', 'firebase/app', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js', './firebase-kotlin-sdk-firebase-common-internal.js', './firebase-kotlin-sdk-firebase-app.js', './kotlinx-coroutines-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('firebase/firestore'), require('firebase/app'), require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./firebase-kotlin-sdk-firebase-common-internal.js'), require('./firebase-kotlin-sdk-firebase-app.js'), require('./kotlinx-coroutines-core.js'));
  else {
    if (typeof globalThis['firebase/firestore'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'firebase/firestore' was not found. Please, check whether 'firebase/firestore' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['firebase/app'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'firebase/app' was not found. Please, check whether 'firebase/app' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['firebase-kotlin-sdk-firebase-common-internal'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'firebase-kotlin-sdk-firebase-common-internal' was not found. Please, check whether 'firebase-kotlin-sdk-firebase-common-internal' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['firebase-kotlin-sdk-firebase-app'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'firebase-kotlin-sdk-firebase-app' was not found. Please, check whether 'firebase-kotlin-sdk-firebase-app' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-firestore'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'firebase-kotlin-sdk-firebase-firestore'.");
    }
    globalThis['firebase-kotlin-sdk-firebase-firestore'] = factory(typeof globalThis['firebase-kotlin-sdk-firebase-firestore'] === 'undefined' ? {} : globalThis['firebase-kotlin-sdk-firebase-firestore'], globalThis['firebase/firestore'], globalThis['firebase/app'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['firebase-kotlin-sdk-firebase-common-internal'], globalThis['firebase-kotlin-sdk-firebase-app'], globalThis['kotlinx-coroutines-core']);
  }
}(function (_, $module$firebase_firestore_1yi9rr, $module$firebase_app_vzvknn, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_dev_gitlive_firebase_common_internal, kotlin_dev_gitlive_firebase_app, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var DocumentReference = $module$firebase_firestore_1yi9rr.DocumentReference;
  var getApp = $module$firebase_app_vzvknn.getApp;
  var doc = $module$firebase_firestore_1yi9rr.doc;
  var setDoc = $module$firebase_firestore_1yi9rr.setDoc;
  var deleteDoc = $module$firebase_firestore_1yi9rr.deleteDoc;
  var collection = $module$firebase_firestore_1yi9rr.collection;
  var refEqual = $module$firebase_firestore_1yi9rr.refEqual;
  var getDoc = $module$firebase_firestore_1yi9rr.getDoc;
  var getDocFromCache = $module$firebase_firestore_1yi9rr.getDocFromCache;
  var getDocFromServer = $module$firebase_firestore_1yi9rr.getDocFromServer;
  var initializeFirestore = $module$firebase_firestore_1yi9rr.initializeFirestore;
  var connectFirestoreEmulator = $module$firebase_firestore_1yi9rr.connectFirestoreEmulator;
  var getFirestore = $module$firebase_firestore_1yi9rr.getFirestore;
  var collection_0 = $module$firebase_firestore_1yi9rr.collection;
  var onSnapshot = $module$firebase_firestore_1yi9rr.onSnapshot;
  var getDocs = $module$firebase_firestore_1yi9rr.getDocs;
  var getDocsFromCache = $module$firebase_firestore_1yi9rr.getDocsFromCache;
  var getDocsFromServer = $module$firebase_firestore_1yi9rr.getDocsFromServer;
  var toString = kotlin_kotlin.$_$.qg;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var SpecialValueSerializer = kotlin_dev_gitlive_firebase_common_internal.$_$.c;
  var protoOf = kotlin_kotlin.$_$.ob;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var initMetadataForObject = kotlin_kotlin.$_$.na;
  var VOID = kotlin_kotlin.$_$.g;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ja;
  var objectCreate = kotlin_kotlin.$_$.nb;
  var toString_0 = kotlin_kotlin.$_$.sb;
  var hashCode = kotlin_kotlin.$_$.ha;
  var equals = kotlin_kotlin.$_$.aa;
  var CoroutineImpl = kotlin_kotlin.$_$.k9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.v8;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.ka;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Enum = kotlin_kotlin.$_$.cf;
  var Exception = kotlin_kotlin.$_$.ef;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.l;
  var FirebaseException = kotlin_dev_gitlive_firebase_app.$_$.a;
  var captureStack = kotlin_kotlin.$_$.s9;
  var println = kotlin_kotlin.$_$.n9;
  var contains = kotlin_kotlin.$_$.uc;
  var await_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.c;
  var get_js = kotlin_dev_gitlive_firebase_common_internal.$_$.j;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var to = kotlin_kotlin.$_$.rg;
  var json = kotlin_kotlin.$_$.db;
  var lazy = kotlin_kotlin.$_$.jg;
  var KProperty1 = kotlin_kotlin.$_$.kc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.fa;
  var ProducerScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g;
  var isInterface = kotlin_kotlin.$_$.xa;
  var awaitClose = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b;
  var initMetadataForLambda = kotlin_kotlin.$_$.ma;
  var callbackFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i;
  var copyToArray = kotlin_kotlin.$_$.h6;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(DocumentReferenceSerializer, 'DocumentReferenceSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(Persistent, 'Persistent');
  initMetadataForClass(Memory, 'Memory');
  initMetadataForObject(Eager, 'Eager');
  initMetadataForClass(LRUGC, 'LRUGC');
  initMetadataForCompanion(Companion);
  initMetadataForClass(FirebaseFirestore, 'FirebaseFirestore', VOID, VOID, VOID, [0, 1]);
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(Query, 'Query', VOID, VOID, VOID, [1]);
  initMetadataForClass(CollectionReference, 'CollectionReference', VOID, Query, VOID, [3, 1]);
  initMetadataForCompanion(Companion_1);
  initMetadataForCoroutine($getCOROUTINE$2, CoroutineImpl);
  initMetadataForClass(DocumentReference_0, 'DocumentReference', VOID, VOID, VOID, [1, 4, 2, 3, 0], VOID, {0: DocumentReferenceSerializer_getInstance});
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(DocumentSnapshot, 'DocumentSnapshot');
  initMetadataForCompanion(Companion_3);
  initMetadataForClass(Source, 'Source', VOID, Enum);
  initMetadataForClass(ServerTimestampBehavior, 'ServerTimestampBehavior', VOID, Enum);
  initMetadataForClass(SetOptions, 'SetOptions');
  initMetadataForObject(Merge, 'Merge', VOID, SetOptions);
  initMetadataForObject(Overwrite, 'Overwrite', VOID, SetOptions);
  initMetadataForClass(MergeFields, 'MergeFields', VOID, SetOptions);
  initMetadataForClass(MergeFieldPaths, 'MergeFieldPaths', VOID, SetOptions);
  initMetadataForClass(QuerySnapshot, 'QuerySnapshot');
  initMetadataForClass(NativeFirebaseFirestore, 'NativeFirebaseFirestore');
  initMetadataForClass(NativeQuery, 'NativeQuery');
  initMetadataForClass(NativeCollectionReference, 'NativeCollectionReference', VOID, NativeQuery);
  initMetadataForClass(NativeDocumentSnapshot, 'NativeDocumentSnapshot');
  initMetadataForClass(FirebaseFirestoreException, 'FirebaseFirestoreException', VOID, FirebaseException);
  initMetadataForClass(FirestoreExceptionCode, 'FirestoreExceptionCode', VOID, Enum);
  initMetadataForClass(NativeQueryWrapper, 'NativeQueryWrapper', VOID, VOID, VOID, [1]);
  initMetadataForClass(NativeCollectionReferenceWrapper, 'NativeCollectionReferenceWrapper', VOID, NativeQueryWrapper, VOID, [1]);
  initMetadataForCoroutine($getCOROUTINE$11, CoroutineImpl);
  initMetadataForCoroutine($setEncodedCOROUTINE$12, CoroutineImpl);
  initMetadataForCoroutine($deleteCOROUTINE$16, CoroutineImpl);
  initMetadataForClass(NativeDocumentReference, 'NativeDocumentReference', VOID, VOID, VOID, [1, 2, 0]);
  initMetadataForClass(NativeDocumentSnapshotWrapper, 'NativeDocumentSnapshotWrapper');
  initMetadataForClass(NativeFirebaseFirestoreWrapper, 'NativeFirebaseFirestoreWrapper', VOID, VOID, VOID, [1, 0]);
  initMetadataForLambda(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza, CoroutineImpl, VOID, [1]);
  initMetadataForCoroutine($getCOROUTINE$21, CoroutineImpl);
  //endregion
  function DocumentReferenceSerializer$$$delegate_0$lambda(it) {
    return it.o4m_1.m4m_1;
  }
  function DocumentReferenceSerializer$$$delegate_0$lambda_0(value) {
    var tmp;
    if (value instanceof DocumentReference) {
      tmp = new DocumentReference_0(new NativeDocumentReference(value));
    } else {
      throw SerializationException_init_$Create$('Cannot deserialize ' + toString(value));
    }
    return tmp;
  }
  function DocumentReferenceSerializer() {
    DocumentReferenceSerializer_instance = this;
    var tmp = this;
    var tmp_0 = DocumentReferenceSerializer$$$delegate_0$lambda;
    tmp.p4m_1 = new SpecialValueSerializer('DocumentReference', tmp_0, DocumentReferenceSerializer$$$delegate_0$lambda_0);
  }
  protoOf(DocumentReferenceSerializer).y2z = function () {
    return this.p4m_1.l4m_1;
  };
  protoOf(DocumentReferenceSerializer).q4m = function (encoder, value) {
    this.p4m_1.z2z(encoder, value);
  };
  protoOf(DocumentReferenceSerializer).z2z = function (encoder, value) {
    return this.q4m(encoder, value instanceof DocumentReference_0 ? value : THROW_CCE());
  };
  protoOf(DocumentReferenceSerializer).a30 = function (decoder) {
    return this.p4m_1.a30(decoder);
  };
  var DocumentReferenceSerializer_instance;
  function DocumentReferenceSerializer_getInstance() {
    if (DocumentReferenceSerializer_instance == null)
      new DocumentReferenceSerializer();
    return DocumentReferenceSerializer_instance;
  }
  function Persistent() {
  }
  function Memory() {
  }
  function Eager() {
  }
  function LRUGC() {
  }
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  function FirebaseFirestore(wrapper) {
    this.r4m_1 = wrapper;
  }
  protoOf(FirebaseFirestore).s4m = function (collectionPath) {
    return CollectionReference_init_$Create$(this.r4m_1.s4m(collectionPath));
  };
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_0() {
    return Companion_instance_0;
  }
  function CollectionReference_init_$Init$(native, $this) {
    CollectionReference.call($this, new NativeCollectionReferenceWrapper(native));
    return $this;
  }
  function CollectionReference_init_$Create$(native) {
    return CollectionReference_init_$Init$(native, objectCreate(protoOf(CollectionReference)));
  }
  function CollectionReference(nativeWrapper) {
    Query.call(this, nativeWrapper);
    this.b4n_1 = nativeWrapper;
    this.c4n_1 = this.b4n_1.e4n_1;
  }
  protoOf(CollectionReference).g4n = function (documentPath) {
    return new DocumentReference_0(this.b4n_1.g4n(documentPath));
  };
  protoOf(CollectionReference).toString = function () {
    return 'CollectionReference(nativeWrapper=' + toString_0(this.b4n_1) + ')';
  };
  protoOf(CollectionReference).hashCode = function () {
    return hashCode(this.b4n_1);
  };
  protoOf(CollectionReference).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CollectionReference))
      return false;
    var tmp0_other_with_cast = other instanceof CollectionReference ? other : THROW_CCE();
    if (!equals(this.b4n_1, tmp0_other_with_cast.b4n_1))
      return false;
    return true;
  };
  function Companion_1() {
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    return Companion_instance_1;
  }
  function $getCOROUTINE$2(_this__u8e3s4, source, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u4n_1 = _this__u8e3s4;
    this.v4n_1 = source;
  }
  protoOf($getCOROUTINE$2).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 2;
            this.i9_1 = 1;
            suspendResult = this.u4n_1.o4m_1.w4n(this.v4n_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return DocumentSnapshot_init_$Create$(ARGUMENT);
          case 2:
            throw this.l9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.j9_1 === 2) {
          throw e;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e;
        }
      }
     while (true);
  };
  function DocumentReference_0(native) {
    this.o4m_1 = native;
  }
  protoOf(DocumentReference_0).s4m = function (collectionPath) {
    return CollectionReference_init_$Create$(this.o4m_1.s4m(collectionPath));
  };
  protoOf(DocumentReference_0).x4n = function (source, $completion) {
    var tmp = new $getCOROUTINE$2(this, source, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(DocumentReference_0).y4n = function (source, $completion, $super) {
    source = source === VOID ? Source_DEFAULT_getInstance() : source;
    return $super === VOID ? this.x4n(source, $completion) : $super.x4n.call(this, source, $completion);
  };
  protoOf(DocumentReference_0).z4n = function (encodedData, setOptions, $completion) {
    return this.o4m_1.a4o(encodedData, setOptions, $completion);
  };
  protoOf(DocumentReference_0).b4o = function ($completion) {
    return this.o4m_1.b4o($completion);
  };
  protoOf(DocumentReference_0).toString = function () {
    return 'DocumentReference(native=' + this.o4m_1.toString() + ')';
  };
  protoOf(DocumentReference_0).hashCode = function () {
    return this.o4m_1.hashCode();
  };
  protoOf(DocumentReference_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DocumentReference_0))
      return false;
    var tmp0_other_with_cast = other instanceof DocumentReference_0 ? other : THROW_CCE();
    if (!this.o4m_1.equals(tmp0_other_with_cast.o4m_1))
      return false;
    return true;
  };
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    return Companion_instance_2;
  }
  function DocumentSnapshot_init_$Init$(native, $this) {
    DocumentSnapshot.call($this, new NativeDocumentSnapshotWrapper(native));
    return $this;
  }
  function DocumentSnapshot_init_$Create$(native) {
    return DocumentSnapshot_init_$Init$(native, objectCreate(protoOf(DocumentSnapshot)));
  }
  function DocumentSnapshot(nativeWrapper) {
    this.c4o_1 = nativeWrapper;
    this.d4o_1 = this.c4o_1.e4o_1;
  }
  protoOf(DocumentSnapshot).g4o = function () {
    return this.c4o_1.g4o();
  };
  protoOf(DocumentSnapshot).o1g = function () {
    return this.c4o_1.o1g();
  };
  protoOf(DocumentSnapshot).h4o = function (serverTimestampBehavior) {
    return this.c4o_1.i4o(serverTimestampBehavior);
  };
  protoOf(DocumentSnapshot).toString = function () {
    return 'DocumentSnapshot(nativeWrapper=' + toString_0(this.c4o_1) + ')';
  };
  protoOf(DocumentSnapshot).hashCode = function () {
    return hashCode(this.c4o_1);
  };
  protoOf(DocumentSnapshot).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DocumentSnapshot))
      return false;
    var tmp0_other_with_cast = other instanceof DocumentSnapshot ? other : THROW_CCE();
    if (!equals(this.c4o_1, tmp0_other_with_cast.c4o_1))
      return false;
    return true;
  };
  function Companion_3() {
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    return Companion_instance_3;
  }
  function Query(nativeQuery) {
    this.h4n_1 = nativeQuery;
    this.i4n_1 = this.h4n_1.k4o();
    this.j4n_1 = this.h4n_1.l4o();
  }
  protoOf(Query).k4n = function (source, $completion) {
    return this.h4n_1.k4n(source, $completion);
  };
  protoOf(Query).l4n = function (source, $completion, $super) {
    source = source === VOID ? Source_DEFAULT_getInstance() : source;
    return $super === VOID ? this.k4n(source, $completion) : $super.k4n.call(this, source, $completion);
  };
  var Source_CACHE_instance;
  var Source_SERVER_instance;
  var Source_DEFAULT_instance;
  var Source_entriesInitialized;
  function Source_initEntries() {
    if (Source_entriesInitialized)
      return Unit_instance;
    Source_entriesInitialized = true;
    Source_CACHE_instance = new Source('CACHE', 0);
    Source_SERVER_instance = new Source('SERVER', 1);
    Source_DEFAULT_instance = new Source('DEFAULT', 2);
  }
  function Source(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var ServerTimestampBehavior_ESTIMATE_instance;
  var ServerTimestampBehavior_NONE_instance;
  var ServerTimestampBehavior_PREVIOUS_instance;
  var ServerTimestampBehavior_entriesInitialized;
  function ServerTimestampBehavior_initEntries() {
    if (ServerTimestampBehavior_entriesInitialized)
      return Unit_instance;
    ServerTimestampBehavior_entriesInitialized = true;
    ServerTimestampBehavior_ESTIMATE_instance = new ServerTimestampBehavior('ESTIMATE', 0);
    ServerTimestampBehavior_NONE_instance = new ServerTimestampBehavior('NONE', 1);
    ServerTimestampBehavior_PREVIOUS_instance = new ServerTimestampBehavior('PREVIOUS', 2);
  }
  function ServerTimestampBehavior(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Source_DEFAULT_getInstance() {
    Source_initEntries();
    return Source_DEFAULT_instance;
  }
  function ServerTimestampBehavior_NONE_getInstance() {
    ServerTimestampBehavior_initEntries();
    return ServerTimestampBehavior_NONE_instance;
  }
  function Merge() {
    Merge_instance = this;
    SetOptions.call(this);
  }
  protoOf(Merge).toString = function () {
    return 'Merge';
  };
  protoOf(Merge).hashCode = function () {
    return -1405789450;
  };
  protoOf(Merge).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Merge))
      return false;
    other instanceof Merge || THROW_CCE();
    return true;
  };
  var Merge_instance;
  function Merge_getInstance() {
    if (Merge_instance == null)
      new Merge();
    return Merge_instance;
  }
  function Overwrite() {
    Overwrite_instance = this;
    SetOptions.call(this);
  }
  protoOf(Overwrite).toString = function () {
    return 'Overwrite';
  };
  protoOf(Overwrite).hashCode = function () {
    return -28891319;
  };
  protoOf(Overwrite).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Overwrite))
      return false;
    other instanceof Overwrite || THROW_CCE();
    return true;
  };
  var Overwrite_instance;
  function Overwrite_getInstance() {
    if (Overwrite_instance == null)
      new Overwrite();
    return Overwrite_instance;
  }
  function MergeFields() {
  }
  function MergeFieldPaths() {
  }
  function SetOptions() {
  }
  function get_firestore(_this__u8e3s4) {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.<get-firestore>.<anonymous>' call
        tmp$ret$2 = new FirebaseFirestore(NativeFirebaseFirestoreWrapper_init_$Create$(getApp()));
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  }
  function QuerySnapshot(js) {
    this.m4o_1 = js;
  }
  protoOf(QuerySnapshot).n4o = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.m4o_1.docs;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(this_0.length);
    var inductionVariable = 0;
    var last = this_0.length;
    while (inductionVariable < last) {
      var item = this_0[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'dev.gitlive.firebase.firestore.QuerySnapshot.<get-documents>.<anonymous>' call
      var tmp$ret$0 = new DocumentSnapshot(NativeDocumentSnapshotWrapper_init_$Create$(item));
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  function NativeFirebaseFirestore(js) {
    this.o4o_1 = js;
  }
  protoOf(NativeFirebaseFirestore).toString = function () {
    return 'NativeFirebaseFirestore(js=' + toString_0(this.o4o_1) + ')';
  };
  protoOf(NativeFirebaseFirestore).hashCode = function () {
    return hashCode(this.o4o_1);
  };
  protoOf(NativeFirebaseFirestore).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NativeFirebaseFirestore))
      return false;
    var tmp0_other_with_cast = other instanceof NativeFirebaseFirestore ? other : THROW_CCE();
    if (!equals(this.o4o_1, tmp0_other_with_cast.o4o_1))
      return false;
    return true;
  };
  function NativeCollectionReference(js) {
    NativeQuery.call(this, js);
    this.q4o_1 = js;
  }
  protoOf(NativeCollectionReference).r4o = function () {
    return this.q4o_1;
  };
  protoOf(NativeCollectionReference).toString = function () {
    return 'NativeCollectionReference(js=' + toString_0(this.q4o_1) + ')';
  };
  protoOf(NativeCollectionReference).hashCode = function () {
    return hashCode(this.q4o_1);
  };
  protoOf(NativeCollectionReference).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NativeCollectionReference))
      return false;
    var tmp0_other_with_cast = other instanceof NativeCollectionReference ? other : THROW_CCE();
    if (!equals(this.q4o_1, tmp0_other_with_cast.q4o_1))
      return false;
    return true;
  };
  function NativeQuery(js) {
    this.s4o_1 = js;
  }
  protoOf(NativeQuery).r4o = function () {
    return this.s4o_1;
  };
  function NativeDocumentSnapshot(js) {
    this.t4o_1 = js;
  }
  protoOf(NativeDocumentSnapshot).toString = function () {
    return 'NativeDocumentSnapshot(js=' + toString_0(this.t4o_1) + ')';
  };
  protoOf(NativeDocumentSnapshot).hashCode = function () {
    return hashCode(this.t4o_1);
  };
  protoOf(NativeDocumentSnapshot).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NativeDocumentSnapshot))
      return false;
    var tmp0_other_with_cast = other instanceof NativeDocumentSnapshot ? other : THROW_CCE();
    if (!equals(this.t4o_1, tmp0_other_with_cast.t4o_1))
      return false;
    return true;
  };
  function FirebaseFirestoreException(cause, code) {
    FirebaseException.call(this, code.toString(), cause);
    captureStack(this, FirebaseFirestoreException);
    this.u4o_1 = code;
  }
  function errorToException(e) {
    var tmp1_elvis_lhs = e == null ? null : e.code;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      tmp = e == null ? null : e.message;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var tmp3_elvis_lhs = tmp;
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.firestore.errorToException.<anonymous>' call
    var it = toString_0(tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs).toLowerCase();
    var tmp_0;
    if (contains(it, 'cancelled')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_CANCELLED_getInstance());
    } else if (contains(it, 'invalid-argument')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_INVALID_ARGUMENT_getInstance());
    } else if (contains(it, 'deadline-exceeded')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_DEADLINE_EXCEEDED_getInstance());
    } else if (contains(it, 'not-found')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_NOT_FOUND_getInstance());
    } else if (contains(it, 'already-exists')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_ALREADY_EXISTS_getInstance());
    } else if (contains(it, 'permission-denied')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_PERMISSION_DENIED_getInstance());
    } else if (contains(it, 'resource-exhausted')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_RESOURCE_EXHAUSTED_getInstance());
    } else if (contains(it, 'failed-precondition')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_FAILED_PRECONDITION_getInstance());
    } else if (contains(it, 'aborted')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_ABORTED_getInstance());
    } else if (contains(it, 'out-of-range')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_OUT_OF_RANGE_getInstance());
    } else if (contains(it, 'unimplemented')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_UNIMPLEMENTED_getInstance());
    } else if (contains(it, 'internal')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_INTERNAL_getInstance());
    } else if (contains(it, 'unavailable')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_UNAVAILABLE_getInstance());
    } else if (contains(it, 'data-loss')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_DATA_LOSS_getInstance());
    } else if (contains(it, 'unauthenticated')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_UNAUTHENTICATED_getInstance());
    } else if (contains(it, 'unknown')) {
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_UNKNOWN_getInstance());
    } else {
      println('Unknown error code in ' + JSON.stringify(e));
      // Inline function 'kotlin.js.unsafeCast' call
      tmp_0 = new FirebaseFirestoreException(e, FirestoreExceptionCode_UNKNOWN_getInstance());
    }
    return tmp_0;
  }
  var FirestoreExceptionCode_OK_instance;
  var FirestoreExceptionCode_CANCELLED_instance;
  var FirestoreExceptionCode_UNKNOWN_instance;
  var FirestoreExceptionCode_INVALID_ARGUMENT_instance;
  var FirestoreExceptionCode_DEADLINE_EXCEEDED_instance;
  var FirestoreExceptionCode_NOT_FOUND_instance;
  var FirestoreExceptionCode_ALREADY_EXISTS_instance;
  var FirestoreExceptionCode_PERMISSION_DENIED_instance;
  var FirestoreExceptionCode_RESOURCE_EXHAUSTED_instance;
  var FirestoreExceptionCode_FAILED_PRECONDITION_instance;
  var FirestoreExceptionCode_ABORTED_instance;
  var FirestoreExceptionCode_OUT_OF_RANGE_instance;
  var FirestoreExceptionCode_UNIMPLEMENTED_instance;
  var FirestoreExceptionCode_INTERNAL_instance;
  var FirestoreExceptionCode_UNAVAILABLE_instance;
  var FirestoreExceptionCode_DATA_LOSS_instance;
  var FirestoreExceptionCode_UNAUTHENTICATED_instance;
  var FirestoreExceptionCode_entriesInitialized;
  function FirestoreExceptionCode_initEntries() {
    if (FirestoreExceptionCode_entriesInitialized)
      return Unit_instance;
    FirestoreExceptionCode_entriesInitialized = true;
    FirestoreExceptionCode_OK_instance = new FirestoreExceptionCode('OK', 0);
    FirestoreExceptionCode_CANCELLED_instance = new FirestoreExceptionCode('CANCELLED', 1);
    FirestoreExceptionCode_UNKNOWN_instance = new FirestoreExceptionCode('UNKNOWN', 2);
    FirestoreExceptionCode_INVALID_ARGUMENT_instance = new FirestoreExceptionCode('INVALID_ARGUMENT', 3);
    FirestoreExceptionCode_DEADLINE_EXCEEDED_instance = new FirestoreExceptionCode('DEADLINE_EXCEEDED', 4);
    FirestoreExceptionCode_NOT_FOUND_instance = new FirestoreExceptionCode('NOT_FOUND', 5);
    FirestoreExceptionCode_ALREADY_EXISTS_instance = new FirestoreExceptionCode('ALREADY_EXISTS', 6);
    FirestoreExceptionCode_PERMISSION_DENIED_instance = new FirestoreExceptionCode('PERMISSION_DENIED', 7);
    FirestoreExceptionCode_RESOURCE_EXHAUSTED_instance = new FirestoreExceptionCode('RESOURCE_EXHAUSTED', 8);
    FirestoreExceptionCode_FAILED_PRECONDITION_instance = new FirestoreExceptionCode('FAILED_PRECONDITION', 9);
    FirestoreExceptionCode_ABORTED_instance = new FirestoreExceptionCode('ABORTED', 10);
    FirestoreExceptionCode_OUT_OF_RANGE_instance = new FirestoreExceptionCode('OUT_OF_RANGE', 11);
    FirestoreExceptionCode_UNIMPLEMENTED_instance = new FirestoreExceptionCode('UNIMPLEMENTED', 12);
    FirestoreExceptionCode_INTERNAL_instance = new FirestoreExceptionCode('INTERNAL', 13);
    FirestoreExceptionCode_UNAVAILABLE_instance = new FirestoreExceptionCode('UNAVAILABLE', 14);
    FirestoreExceptionCode_DATA_LOSS_instance = new FirestoreExceptionCode('DATA_LOSS', 15);
    FirestoreExceptionCode_UNAUTHENTICATED_instance = new FirestoreExceptionCode('UNAUTHENTICATED', 16);
  }
  function FirestoreExceptionCode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FirestoreExceptionCode_CANCELLED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_CANCELLED_instance;
  }
  function FirestoreExceptionCode_UNKNOWN_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_UNKNOWN_instance;
  }
  function FirestoreExceptionCode_INVALID_ARGUMENT_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_INVALID_ARGUMENT_instance;
  }
  function FirestoreExceptionCode_DEADLINE_EXCEEDED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_DEADLINE_EXCEEDED_instance;
  }
  function FirestoreExceptionCode_NOT_FOUND_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_NOT_FOUND_instance;
  }
  function FirestoreExceptionCode_ALREADY_EXISTS_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_ALREADY_EXISTS_instance;
  }
  function FirestoreExceptionCode_PERMISSION_DENIED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_PERMISSION_DENIED_instance;
  }
  function FirestoreExceptionCode_RESOURCE_EXHAUSTED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_RESOURCE_EXHAUSTED_instance;
  }
  function FirestoreExceptionCode_FAILED_PRECONDITION_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_FAILED_PRECONDITION_instance;
  }
  function FirestoreExceptionCode_ABORTED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_ABORTED_instance;
  }
  function FirestoreExceptionCode_OUT_OF_RANGE_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_OUT_OF_RANGE_instance;
  }
  function FirestoreExceptionCode_UNIMPLEMENTED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_UNIMPLEMENTED_instance;
  }
  function FirestoreExceptionCode_INTERNAL_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_INTERNAL_instance;
  }
  function FirestoreExceptionCode_UNAVAILABLE_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_UNAVAILABLE_instance;
  }
  function FirestoreExceptionCode_DATA_LOSS_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_DATA_LOSS_instance;
  }
  function FirestoreExceptionCode_UNAUTHENTICATED_getInstance() {
    FirestoreExceptionCode_initEntries();
    return FirestoreExceptionCode_UNAUTHENTICATED_instance;
  }
  function NativeCollectionReferenceWrapper(native) {
    NativeQueryWrapper.call(this, native);
    this.e4n_1 = native;
    this.f4n_1 = this.e4n_1.q4o_1;
  }
  protoOf(NativeCollectionReferenceWrapper).k4o = function () {
    return this.e4n_1;
  };
  protoOf(NativeCollectionReferenceWrapper).r4o = function () {
    return this.f4n_1;
  };
  protoOf(NativeCollectionReferenceWrapper).g4n = function (documentPath) {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeCollectionReferenceWrapper.document.<anonymous>' call
        tmp$ret$2 = new NativeDocumentReference(doc(this.f4n_1, documentPath));
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  function $getCOROUTINE$11(_this__u8e3s4, source, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.d4p_1 = _this__u8e3s4;
    this.e4p_1 = source;
  }
  protoOf($getCOROUTINE$11).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 5;
            var tmp_0 = this;
            tmp_0.f4p_1 = this.d4p_1;
            this.g4p_1 = this.f4p_1;
            this.h4p_1 = Unit_instance;
            this.i9_1 = 1;
            continue $sm;
          case 1:
            this.j9_1 = 4;
            var tmp_1 = this;
            tmp_1.i4p_1 = this.g4p_1;
            this.j4p_1 = this.i4p_1;
            this.i9_1 = 2;
            suspendResult = await_0(get(this.j4p_1.n4m_1, this.e4p_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var ARGUMENT = suspendResult;
            this.h4p_1 = new NativeDocumentSnapshot(ARGUMENT);
            this.j9_1 = 5;
            this.i9_1 = 3;
            continue $sm;
          case 3:
            return this.h4p_1;
          case 4:
            this.j9_1 = 5;
            var tmp_2 = this.l9_1;
            if (tmp_2 instanceof Exception) {
              var e = this.l9_1;
              throw e;
            } else {
              var e_0 = this.l9_1;
              throw errorToException(e_0);
            }

          case 5:
            throw this.l9_1;
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.j9_1 === 5) {
          throw e_1;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e_1;
        }
      }
     while (true);
  };
  function $setEncodedCOROUTINE$12(_this__u8e3s4, encodedData, setOptions, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.s4p_1 = _this__u8e3s4;
    this.t4p_1 = encodedData;
    this.u4p_1 = setOptions;
  }
  protoOf($setEncodedCOROUTINE$12).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 5;
            var tmp_0 = this;
            tmp_0.v4p_1 = this.s4p_1;
            this.w4p_1 = this.v4p_1;
            this.x4p_1 = Unit_instance;
            this.i9_1 = 1;
            continue $sm;
          case 1:
            this.j9_1 = 4;
            var tmp_1 = this;
            tmp_1.y4p_1 = this.w4p_1;
            this.z4p_1 = this.y4p_1;
            this.i9_1 = 2;
            suspendResult = await_0(setDoc(this.z4p_1.n4m_1, get_js(this.t4p_1), get_js_0(this.u4p_1)), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var tmp_2 = this;
            tmp_2.x4p_1 = Unit_instance;
            this.j9_1 = 5;
            this.i9_1 = 3;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            this.j9_1 = 5;
            var tmp_3 = this.l9_1;
            if (tmp_3 instanceof Exception) {
              var e = this.l9_1;
              throw e;
            } else {
              var e_0 = this.l9_1;
              throw errorToException(e_0);
            }

          case 5:
            throw this.l9_1;
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.j9_1 === 5) {
          throw e_1;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e_1;
        }
      }
     while (true);
  };
  function $deleteCOROUTINE$16(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.i4q_1 = _this__u8e3s4;
  }
  protoOf($deleteCOROUTINE$16).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 5;
            var tmp_0 = this;
            tmp_0.j4q_1 = this.i4q_1;
            this.k4q_1 = this.j4q_1;
            this.l4q_1 = Unit_instance;
            this.i9_1 = 1;
            continue $sm;
          case 1:
            this.j9_1 = 4;
            var tmp_1 = this;
            tmp_1.m4q_1 = this.k4q_1;
            this.n4q_1 = this.m4q_1;
            this.i9_1 = 2;
            suspendResult = await_0(deleteDoc(this.n4q_1.n4m_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var tmp_2 = this;
            tmp_2.l4q_1 = Unit_instance;
            this.j9_1 = 5;
            this.i9_1 = 3;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            this.j9_1 = 5;
            var tmp_3 = this.l9_1;
            if (tmp_3 instanceof Exception) {
              var e = this.l9_1;
              throw e;
            } else {
              var e_0 = this.l9_1;
              throw errorToException(e_0);
            }

          case 5:
            throw this.l9_1;
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.j9_1 === 5) {
          throw e_1;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e_1;
        }
      }
     while (true);
  };
  function NativeDocumentReference(nativeValue) {
    this.m4m_1 = nativeValue;
    this.n4m_1 = this.m4m_1;
  }
  protoOf(NativeDocumentReference).v48 = function () {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeDocumentReference.<get-path>.<anonymous>' call
        tmp$ret$2 = this.n4m_1.path;
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(NativeDocumentReference).s4m = function (collectionPath) {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeDocumentReference.collection.<anonymous>' call
        tmp$ret$2 = new NativeCollectionReference(collection(this.n4m_1, collectionPath));
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(NativeDocumentReference).w4n = function (source, $completion) {
    var tmp = new $getCOROUTINE$11(this, source, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(NativeDocumentReference).a4o = function (encodedData, setOptions, $completion) {
    var tmp = new $setEncodedCOROUTINE$12(this, encodedData, setOptions, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(NativeDocumentReference).b4o = function ($completion) {
    var tmp = new $deleteCOROUTINE$16(this, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(NativeDocumentReference).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof NativeDocumentReference) {
        tmp_0 = refEqual(this.m4m_1, other.m4m_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(NativeDocumentReference).hashCode = function () {
    return hashCode(this.m4m_1);
  };
  protoOf(NativeDocumentReference).toString = function () {
    return 'DocumentReference(path=' + this.v48() + ')';
  };
  function get(_this__u8e3s4, source) {
    var tmp;
    switch (source.p2_1) {
      case 2:
        tmp = getDoc(_this__u8e3s4);
        break;
      case 0:
        tmp = getDocFromCache(_this__u8e3s4);
        break;
      case 1:
        tmp = getDocFromServer(_this__u8e3s4);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function NativeDocumentSnapshotWrapper_init_$Init$(js, $this) {
    NativeDocumentSnapshotWrapper.call($this, new NativeDocumentSnapshot(js));
    return $this;
  }
  function NativeDocumentSnapshotWrapper_init_$Create$(js) {
    return NativeDocumentSnapshotWrapper_init_$Init$(js, objectCreate(protoOf(NativeDocumentSnapshotWrapper)));
  }
  function NativeDocumentSnapshotWrapper(native) {
    this.e4o_1 = native;
    this.f4o_1 = this.e4o_1.t4o_1;
  }
  protoOf(NativeDocumentSnapshotWrapper).o1g = function () {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeDocumentSnapshotWrapper.<get-id>.<anonymous>' call
        tmp$ret$2 = this.f4o_1.id;
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(NativeDocumentSnapshotWrapper).i4o = function (serverTimestampBehavior) {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeDocumentSnapshotWrapper.encodedData.<anonymous>' call
        tmp$ret$2 = this.f4o_1.data(this.o4q(serverTimestampBehavior));
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(NativeDocumentSnapshotWrapper).g4o = function () {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeDocumentSnapshotWrapper.<get-exists>.<anonymous>' call
        tmp$ret$2 = this.f4o_1.exists();
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(NativeDocumentSnapshotWrapper).o4q = function (serverTimestampBehavior) {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = serverTimestampBehavior.o2_1.toLowerCase();
    return json([to('serverTimestamps', tmp$ret$1)]);
  };
  function NativeFirebaseFirestoreWrapper_init_$Init$(app, $this) {
    NativeFirebaseFirestoreWrapper.call($this, NativeFirebaseFirestoreWrapper$_init_$lambda_x9zkqt(app));
    return $this;
  }
  function NativeFirebaseFirestoreWrapper_init_$Create$(app) {
    return NativeFirebaseFirestoreWrapper_init_$Init$(app, objectCreate(protoOf(NativeFirebaseFirestoreWrapper)));
  }
  function _get_js__ndc482($this) {
    return $this.k4o().o4o_1;
  }
  function NativeFirebaseFirestoreWrapper$_init_$lambda_x9zkqt($app) {
    return function (_this__u8e3s4, settings) {
      var tmp;
      if (settings == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeFirebaseFirestoreWrapper.<init>.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.also' call
        var this_0 = initializeFirestore($app, settings.s4q());
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeFirebaseFirestoreWrapper.<init>.<anonymous>.<anonymous>.<anonymous>' call
        var tmp0_safe_receiver = _this__u8e3s4.v4m_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.run' call
          // Inline function 'dev.gitlive.firebase.firestore.internal.NativeFirebaseFirestoreWrapper.<init>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          connectFirestoreEmulator(this_0, tmp0_safe_receiver.t4q_1, tmp0_safe_receiver.u4q_1);
        }
        tmp = this_0;
      }
      var tmp1_elvis_lhs = tmp;
      return new NativeFirebaseFirestore(tmp1_elvis_lhs == null ? getFirestore($app) : tmp1_elvis_lhs);
    };
  }
  function NativeFirebaseFirestoreWrapper$lazyNative$lambda(this$0) {
    return function () {
      return this$0.t4m_1(this$0, this$0.u4m_1);
    };
  }
  function NativeFirebaseFirestoreWrapper(createNative) {
    this.t4m_1 = createNative;
    this.u4m_1 = null;
    this.v4m_1 = null;
    var tmp = this;
    tmp.w4m_1 = lazy(NativeFirebaseFirestoreWrapper$lazyNative$lambda(this));
    this.x4m_1 = this.w4m_1;
  }
  protoOf(NativeFirebaseFirestoreWrapper).k4o = function () {
    var tmp0 = this.x4m_1;
    // Inline function 'kotlin.getValue' call
    native$factory();
    return tmp0.w();
  };
  protoOf(NativeFirebaseFirestoreWrapper).s4m = function (collectionPath) {
    // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      try {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
        // Inline function 'dev.gitlive.firebase.firestore.internal.NativeFirebaseFirestoreWrapper.collection.<anonymous>' call
        tmp$ret$2 = new NativeCollectionReference(collection_0(_get_js__ndc482(this), collectionPath));
        break $l$block;
      } catch ($p) {
        if ($p instanceof Exception) {
          var e = $p;
          throw e;
        } else {
          var e_0 = $p;
          throw errorToException(e_0);
        }
      }
    }
    return tmp$ret$2;
  };
  function native$factory() {
    return getPropertyCallableRef('native', 1, KProperty1, function (receiver) {
      return receiver.k4o();
    }, null);
  }
  function NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff($$this$rethrow) {
    return function (it) {
      $$this$rethrow.hv(new QuerySnapshot(it));
      return Unit_instance;
    };
  }
  function NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff_0($$this$rethrow) {
    return function (it) {
      $$this$rethrow.iv(errorToException(it));
      return Unit_instance;
    };
  }
  function NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff_1($this_callbackFlow, $unsubscribe) {
    return function () {
      // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
      $l$block: {
        // Inline function 'dev.gitlive.firebase.firestore.rethrow' call
        try {
          // Inline function 'dev.gitlive.firebase.firestore.rethrow.<anonymous>' call
          $unsubscribe();
          break $l$block;
        } catch ($p) {
          if ($p instanceof Exception) {
            var e = $p;
            throw e;
          } else {
            var e_0 = $p;
            throw errorToException(e_0);
          }
        }
      }
      return Unit_instance;
    };
  }
  function NativeQueryWrapper$_get_snapshots_$slambda_bv4kza(this$0, resultContinuation) {
    this.d4r_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza).g4r = function ($this$callbackFlow, $completion) {
    var tmp = this.h4r($this$callbackFlow, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza).ea = function (p1, $completion) {
    return this.g4r((!(p1 == null) ? isInterface(p1, ProducerScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 2;
            var tmp_0 = this;
            var this_0 = this.e4r_1;
            var tmp$ret$0 = Unit_instance;
            l$ret$1: do {
              try {
                var tmp_1 = this.d4r_1.r4o();
                var tmp_2 = NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff(this_0);
                tmp$ret$0 = onSnapshot(tmp_1, tmp_2, NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff_0(this_0));
                break l$ret$1;
              } catch ($p) {
                if ($p instanceof Exception) {
                  var e = $p;
                  throw e;
                } else {
                  var e_0 = $p;
                  throw errorToException(e_0);
                }
              }
            }
             while (false);
            tmp_0.f4r_1 = tmp$ret$0;
            this.i9_1 = 1;
            suspendResult = awaitClose(this.e4r_1, NativeQueryWrapper$_get_snapshots_$slambda$lambda_8nkuff_1(this.e4r_1, this.f4r_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
          case 2:
            throw this.l9_1;
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.j9_1 === 2) {
          throw e_1;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e_1;
        }
      }
     while (true);
  };
  protoOf(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza).h4r = function ($this$callbackFlow, completion) {
    var i = new NativeQueryWrapper$_get_snapshots_$slambda_bv4kza(this.d4r_1, completion);
    i.e4r_1 = $this$callbackFlow;
    return i;
  };
  function NativeQueryWrapper$_get_snapshots_$slambda_bv4kza_0(this$0, resultContinuation) {
    var i = new NativeQueryWrapper$_get_snapshots_$slambda_bv4kza(this$0, resultContinuation);
    var l = function ($this$callbackFlow, $completion) {
      return i.g4r($this$callbackFlow, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $getCOROUTINE$21(_this__u8e3s4, source, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.q4r_1 = _this__u8e3s4;
    this.r4r_1 = source;
  }
  protoOf($getCOROUTINE$21).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 5;
            var tmp_0 = this;
            tmp_0.s4r_1 = this.q4r_1;
            this.t4r_1 = this.s4r_1;
            this.u4r_1 = Unit_instance;
            this.i9_1 = 1;
            continue $sm;
          case 1:
            this.j9_1 = 4;
            var tmp_1 = this;
            tmp_1.v4r_1 = this.t4r_1;
            this.w4r_1 = this.v4r_1;
            this.i9_1 = 2;
            suspendResult = await_0(get_0(this.w4r_1.r4o(), this.r4r_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var ARGUMENT = suspendResult;
            this.u4r_1 = new QuerySnapshot(ARGUMENT);
            this.j9_1 = 5;
            this.i9_1 = 3;
            continue $sm;
          case 3:
            return this.u4r_1;
          case 4:
            this.j9_1 = 5;
            var tmp_2 = this.l9_1;
            if (tmp_2 instanceof Exception) {
              var e = this.l9_1;
              throw e;
            } else {
              var e_0 = this.l9_1;
              throw errorToException(e_0);
            }

          case 5:
            throw this.l9_1;
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.j9_1 === 5) {
          throw e_1;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e_1;
        }
      }
     while (true);
  };
  function NativeQueryWrapper(native) {
    this.j4o_1 = native;
  }
  protoOf(NativeQueryWrapper).k4o = function () {
    return this.j4o_1;
  };
  protoOf(NativeQueryWrapper).r4o = function () {
    return this.k4o().r4o();
  };
  protoOf(NativeQueryWrapper).k4n = function (source, $completion) {
    var tmp = new $getCOROUTINE$21(this, source, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(NativeQueryWrapper).l4o = function () {
    return callbackFlow(NativeQueryWrapper$_get_snapshots_$slambda_bv4kza_0(this, null));
  };
  function get_0(_this__u8e3s4, source) {
    var tmp;
    switch (source.p2_1) {
      case 2:
        tmp = getDocs(_this__u8e3s4);
        break;
      case 0:
        tmp = getDocsFromCache(_this__u8e3s4);
        break;
      case 1:
        tmp = getDocsFromServer(_this__u8e3s4);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function get_js_0(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof Merge) {
      tmp = json([to('merge', true)]);
    } else {
      if (_this__u8e3s4 instanceof Overwrite) {
        tmp = json([to('merge', false)]);
      } else {
        if (_this__u8e3s4 instanceof MergeFields) {
          // Inline function 'kotlin.collections.toTypedArray' call
          var this_0 = _this__u8e3s4.y4r_1;
          var tmp$ret$0 = copyToArray(this_0);
          tmp = json([to('mergeFields', tmp$ret$0)]);
        } else {
          if (_this__u8e3s4 instanceof MergeFieldPaths) {
            // Inline function 'kotlin.collections.toTypedArray' call
            var this_1 = _this__u8e3s4.x4r_1;
            var tmp$ret$1 = copyToArray(this_1);
            tmp = json([to('mergeFields', tmp$ret$1)]);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  //region block: init
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Companion_instance_3 = new Companion_3();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = get_firestore;
  _.$_$.b = ServerTimestampBehavior_NONE_getInstance;
  _.$_$.c = Merge_getInstance;
  _.$_$.d = Overwrite_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=firebase-kotlin-sdk-firebase-firestore.js.map
