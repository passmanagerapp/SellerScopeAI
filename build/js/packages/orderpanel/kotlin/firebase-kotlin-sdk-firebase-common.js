(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-common'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'firebase-kotlin-sdk-firebase-common'.");
    }
    globalThis['firebase-kotlin-sdk-firebase-common'] = factory(typeof globalThis['firebase-kotlin-sdk-firebase-common'] === 'undefined' ? {} : globalThis['firebase-kotlin-sdk-firebase-common'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(FirebaseClassDiscriminator, 'FirebaseClassDiscriminator');
  //endregion
  function FirebaseClassDiscriminator() {
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = FirebaseClassDiscriminator;
  //endregion
  return _;
}));

//# sourceMappingURL=firebase-kotlin-sdk-firebase-common.js.map
