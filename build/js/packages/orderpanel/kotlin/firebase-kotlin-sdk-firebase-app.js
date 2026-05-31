(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'firebase/app', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('firebase/app'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['firebase/app'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-app'. Its dependency 'firebase/app' was not found. Please, check whether 'firebase/app' is loaded prior to 'firebase-kotlin-sdk-firebase-app'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-app'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'firebase-kotlin-sdk-firebase-app'.");
    }
    globalThis['firebase-kotlin-sdk-firebase-app'] = factory(typeof globalThis['firebase-kotlin-sdk-firebase-app'] === 'undefined' ? {} : globalThis['firebase-kotlin-sdk-firebase-app'], globalThis['firebase/app'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, $module$firebase_app_vzvknn, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var initializeApp = $module$firebase_app_vzvknn.initializeApp;
  var VOID = kotlin_kotlin.$_$.g;
  var protoOf = kotlin_kotlin.$_$.ob;
  var getStringHashCode = kotlin_kotlin.$_$.ga;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var initMetadataForObject = kotlin_kotlin.$_$.na;
  var to = kotlin_kotlin.$_$.rg;
  var json = kotlin_kotlin.$_$.db;
  var Exception = kotlin_kotlin.$_$.ef;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.l1;
  var captureStack = kotlin_kotlin.$_$.s9;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(FirebaseOptions, 'FirebaseOptions');
  initMetadataForObject(Firebase, 'Firebase');
  initMetadataForClass(FirebaseApp, 'FirebaseApp', VOID, VOID, VOID, [0]);
  initMetadataForClass(FirebaseException, 'FirebaseException', VOID, Exception);
  //endregion
  function FirebaseOptions(applicationId, apiKey, databaseUrl, gaTrackingId, storageBucket, projectId, gcmSenderId, authDomain) {
    databaseUrl = databaseUrl === VOID ? null : databaseUrl;
    gaTrackingId = gaTrackingId === VOID ? null : gaTrackingId;
    storageBucket = storageBucket === VOID ? null : storageBucket;
    projectId = projectId === VOID ? null : projectId;
    gcmSenderId = gcmSenderId === VOID ? null : gcmSenderId;
    authDomain = authDomain === VOID ? null : authDomain;
    this.u4k_1 = applicationId;
    this.v4k_1 = apiKey;
    this.w4k_1 = databaseUrl;
    this.x4k_1 = gaTrackingId;
    this.y4k_1 = storageBucket;
    this.z4k_1 = projectId;
    this.a4l_1 = gcmSenderId;
    this.b4l_1 = authDomain;
  }
  protoOf(FirebaseOptions).toString = function () {
    return 'FirebaseOptions(applicationId=' + this.u4k_1 + ', apiKey=' + this.v4k_1 + ', databaseUrl=' + this.w4k_1 + ', gaTrackingId=' + this.x4k_1 + ', storageBucket=' + this.y4k_1 + ', projectId=' + this.z4k_1 + ', gcmSenderId=' + this.a4l_1 + ', authDomain=' + this.b4l_1 + ')';
  };
  protoOf(FirebaseOptions).hashCode = function () {
    var result = getStringHashCode(this.u4k_1);
    result = imul(result, 31) + getStringHashCode(this.v4k_1) | 0;
    result = imul(result, 31) + (this.w4k_1 == null ? 0 : getStringHashCode(this.w4k_1)) | 0;
    result = imul(result, 31) + (this.x4k_1 == null ? 0 : getStringHashCode(this.x4k_1)) | 0;
    result = imul(result, 31) + (this.y4k_1 == null ? 0 : getStringHashCode(this.y4k_1)) | 0;
    result = imul(result, 31) + (this.z4k_1 == null ? 0 : getStringHashCode(this.z4k_1)) | 0;
    result = imul(result, 31) + (this.a4l_1 == null ? 0 : getStringHashCode(this.a4l_1)) | 0;
    result = imul(result, 31) + (this.b4l_1 == null ? 0 : getStringHashCode(this.b4l_1)) | 0;
    return result;
  };
  protoOf(FirebaseOptions).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FirebaseOptions))
      return false;
    var tmp0_other_with_cast = other instanceof FirebaseOptions ? other : THROW_CCE();
    if (!(this.u4k_1 === tmp0_other_with_cast.u4k_1))
      return false;
    if (!(this.v4k_1 === tmp0_other_with_cast.v4k_1))
      return false;
    if (!(this.w4k_1 == tmp0_other_with_cast.w4k_1))
      return false;
    if (!(this.x4k_1 == tmp0_other_with_cast.x4k_1))
      return false;
    if (!(this.y4k_1 == tmp0_other_with_cast.y4k_1))
      return false;
    if (!(this.z4k_1 == tmp0_other_with_cast.z4k_1))
      return false;
    if (!(this.a4l_1 == tmp0_other_with_cast.a4l_1))
      return false;
    if (!(this.b4l_1 == tmp0_other_with_cast.b4l_1))
      return false;
    return true;
  };
  function Firebase() {
  }
  var Firebase_instance;
  function Firebase_getInstance() {
    return Firebase_instance;
  }
  function FirebaseApp(js) {
    this.c4l_1 = js;
  }
  function initialize(_this__u8e3s4, context, options) {
    context = context === VOID ? null : context;
    return new FirebaseApp(initializeApp(toJson(options)));
  }
  function toJson(_this__u8e3s4) {
    var tmp = to('apiKey', _this__u8e3s4.v4k_1);
    var tmp_0 = to('appId', _this__u8e3s4.u4k_1);
    var tmp0_elvis_lhs = _this__u8e3s4.w4k_1;
    var tmp_1 = to('databaseURL', tmp0_elvis_lhs == null ? undefined : tmp0_elvis_lhs);
    var tmp1_elvis_lhs = _this__u8e3s4.y4k_1;
    var tmp_2 = to('storageBucket', tmp1_elvis_lhs == null ? undefined : tmp1_elvis_lhs);
    var tmp2_elvis_lhs = _this__u8e3s4.z4k_1;
    var tmp_3 = to('projectId', tmp2_elvis_lhs == null ? undefined : tmp2_elvis_lhs);
    var tmp3_elvis_lhs = _this__u8e3s4.x4k_1;
    var tmp_4 = to('gaTrackingId', tmp3_elvis_lhs == null ? undefined : tmp3_elvis_lhs);
    var tmp4_elvis_lhs = _this__u8e3s4.a4l_1;
    var tmp_5 = to('messagingSenderId', tmp4_elvis_lhs == null ? undefined : tmp4_elvis_lhs);
    var tmp5_elvis_lhs = _this__u8e3s4.b4l_1;
    return json([tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, to('authDomain', tmp5_elvis_lhs == null ? undefined : tmp5_elvis_lhs)]);
  }
  function FirebaseException(code, cause) {
    Exception_init_$Init$('' + code + ': ' + cause.message, cause, this);
    captureStack(this, FirebaseException);
  }
  //region block: init
  Firebase_instance = new Firebase();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = FirebaseException;
  _.$_$.b = FirebaseOptions;
  _.$_$.c = initialize;
  _.$_$.d = Firebase_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=firebase-kotlin-sdk-firebase-app.js.map
