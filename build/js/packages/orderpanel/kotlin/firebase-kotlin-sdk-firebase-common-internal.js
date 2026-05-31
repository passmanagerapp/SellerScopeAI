(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js', './firebase-kotlin-sdk-firebase-common.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'), require('./firebase-kotlin-sdk-firebase-common.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-common-internal'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'firebase-kotlin-sdk-firebase-common-internal'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-common-internal'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'firebase-kotlin-sdk-firebase-common-internal'.");
    }
    if (typeof globalThis['firebase-kotlin-sdk-firebase-common'] === 'undefined') {
      throw new Error("Error loading module 'firebase-kotlin-sdk-firebase-common-internal'. Its dependency 'firebase-kotlin-sdk-firebase-common' was not found. Please, check whether 'firebase-kotlin-sdk-firebase-common' is loaded prior to 'firebase-kotlin-sdk-firebase-common-internal'.");
    }
    globalThis['firebase-kotlin-sdk-firebase-common-internal'] = factory(typeof globalThis['firebase-kotlin-sdk-firebase-common-internal'] === 'undefined' ? {} : globalThis['firebase-kotlin-sdk-firebase-common-internal'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib'], globalThis['firebase-kotlin-sdk-firebase-common']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin, kotlin_dev_gitlive_firebase_common) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var protoOf = kotlin_kotlin.$_$.ob;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var toString = kotlin_kotlin.$_$.sb;
  var getBooleanHashCode = kotlin_kotlin.$_$.ca;
  var hashCode = kotlin_kotlin.$_$.ha;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var equals = kotlin_kotlin.$_$.aa;
  var VOID = kotlin_kotlin.$_$.g;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.l;
  var toString_0 = kotlin_kotlin.$_$.qg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.o1;
  var to = kotlin_kotlin.$_$.rg;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var toMap = kotlin_kotlin.$_$.n8;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var isInterface = kotlin_kotlin.$_$.xa;
  var FirebaseClassDiscriminator = kotlin_dev_gitlive_firebase_common.$_$.a;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var toDouble = kotlin_kotlin.$_$.fe;
  var numberToDouble = kotlin_kotlin.$_$.jb;
  var isNumber = kotlin_kotlin.$_$.za;
  var toLong = kotlin_kotlin.$_$.je;
  var numberToLong = kotlin_kotlin.$_$.lb;
  var toByte = kotlin_kotlin.$_$.de;
  var numberToByte = kotlin_kotlin.$_$.hb;
  var toInt = kotlin_kotlin.$_$.he;
  var numberToInt = kotlin_kotlin.$_$.kb;
  var toShort = kotlin_kotlin.$_$.ke;
  var numberToShort = kotlin_kotlin.$_$.mb;
  var toBoolean = kotlin_kotlin.$_$.ce;
  var charSequenceGet = kotlin_kotlin.$_$.v9;
  var numberToChar = kotlin_kotlin.$_$.ib;
  var SerializationException_init_$Create$_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var Exception = kotlin_kotlin.$_$.ef;
  var Char = kotlin_kotlin.$_$.ye;
  var NotImplementedError = kotlin_kotlin.$_$.if;
  var decodeSerializableElement$default = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var until = kotlin_kotlin.$_$.fc;
  var ensureNotNull = kotlin_kotlin.$_$.eg;
  var beginCollection = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var buildClassSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.t5;
  var copyToArray = kotlin_kotlin.$_$.h6;
  var json = kotlin_kotlin.$_$.db;
  var isArray = kotlin_kotlin.$_$.pa;
  var Collection = kotlin_kotlin.$_$.x4;
  var mapCapacity = kotlin_kotlin.$_$.j7;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.u;
  var toList = kotlin_kotlin.$_$.j8;
  var KtMap = kotlin_kotlin.$_$.f5;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.v;
  var iterator = kotlin_kotlin.$_$.bb;
  var toMap_0 = kotlin_kotlin.$_$.m8;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var fillArrayVal = kotlin_kotlin.$_$.ba;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Builder, 'Builder', Builder);
  initMetadataForClass(EncodeSettingsImpl, 'EncodeSettingsImpl');
  initMetadataForClass(Builder_0, 'Builder', Builder_0);
  initMetadataForClass(DecodeSettingsImpl, 'DecodeSettingsImpl');
  initMetadataForClass(EncodedObjectImpl, 'EncodedObjectImpl');
  initMetadataForClass(FirebaseDecoder, 'FirebaseDecoder', VOID, VOID, [Decoder]);
  initMetadataForClass(FirebaseCompositeDecoder, 'FirebaseCompositeDecoder', VOID, VOID, [CompositeDecoder]);
  initMetadataForClass(FirebaseClassDecoder, 'FirebaseClassDecoder', VOID, FirebaseCompositeDecoder);
  initMetadataForClass(FirebaseEncoder, 'FirebaseEncoder', VOID, VOID, [Encoder]);
  initMetadataForClass(FirebaseCompositeEncoder, 'FirebaseCompositeEncoder', VOID, VOID, [CompositeEncoder]);
  initMetadataForClass(SpecialValueSerializer, 'SpecialValueSerializer', VOID, VOID, [KSerializer]);
  //endregion
  function buildEncodeSettings(_this__u8e3s4) {
    return new EncodeSettingsImpl(_this__u8e3s4.d4l(), _this__u8e3s4.j33());
  }
  function Builder() {
    this.e4l_1 = true;
    this.f4l_1 = EmptySerializersModule();
  }
  protoOf(Builder).d4l = function () {
    return this.e4l_1;
  };
  protoOf(Builder).j33 = function () {
    return this.f4l_1;
  };
  function EncodeSettingsImpl(encodeDefaults, serializersModule) {
    this.g4l_1 = encodeDefaults;
    this.h4l_1 = serializersModule;
  }
  protoOf(EncodeSettingsImpl).d4l = function () {
    return this.g4l_1;
  };
  protoOf(EncodeSettingsImpl).j33 = function () {
    return this.h4l_1;
  };
  protoOf(EncodeSettingsImpl).toString = function () {
    return 'EncodeSettingsImpl(encodeDefaults=' + this.g4l_1 + ', serializersModule=' + toString(this.h4l_1) + ')';
  };
  protoOf(EncodeSettingsImpl).hashCode = function () {
    var result = getBooleanHashCode(this.g4l_1);
    result = imul(result, 31) + hashCode(this.h4l_1) | 0;
    return result;
  };
  protoOf(EncodeSettingsImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EncodeSettingsImpl))
      return false;
    var tmp0_other_with_cast = other instanceof EncodeSettingsImpl ? other : THROW_CCE();
    if (!(this.g4l_1 === tmp0_other_with_cast.g4l_1))
      return false;
    if (!equals(this.h4l_1, tmp0_other_with_cast.h4l_1))
      return false;
    return true;
  };
  function buildDecodeSettings(_this__u8e3s4) {
    return new DecodeSettingsImpl(_this__u8e3s4.j33());
  }
  function Builder_0() {
    this.i4l_1 = EmptySerializersModule();
  }
  protoOf(Builder_0).j33 = function () {
    return this.i4l_1;
  };
  function DecodeSettingsImpl(serializersModule) {
    serializersModule = serializersModule === VOID ? EmptySerializersModule() : serializersModule;
    this.j4l_1 = serializersModule;
  }
  protoOf(DecodeSettingsImpl).j33 = function () {
    return this.j4l_1;
  };
  function asEncodedObject(_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(_this__u8e3s4.j());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = _this__u8e3s4.u().g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'dev.gitlive.firebase.internal.asEncodedObject.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = item.v();
      // Inline function 'kotlin.collections.component2' call
      var value = item.w();
      var tmp;
      if (!(key == null) ? typeof key === 'string' : false) {
        tmp = to(key, value);
      } else {
        throw IllegalArgumentException_init_$Create$('Expected a String key but received ' + toString_0(key));
      }
      var tmp$ret$3 = tmp;
      destination.e(tmp$ret$3);
    }
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.internal.asEncodedObject.stub_for_inlining' call
    var p0 = toMap(destination);
    var tmp$ret$7 = _EncodedObjectImpl___init__impl__fkicy4(p0);
    return new EncodedObjectImpl(tmp$ret$7);
  }
  function getRaw(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof EncodedObjectImpl) {
      tmp = _EncodedObjectImpl___get_raw__impl__4l7ay1(_this__u8e3s4.k4l_1);
    } else {
      noWhenBranchMatchedException();
    }
    return tmp;
  }
  function _EncodedObjectImpl___init__impl__fkicy4(raw) {
    return raw;
  }
  function _EncodedObjectImpl___get_raw__impl__4l7ay1($this) {
    return $this;
  }
  function EncodedObjectImpl__toString_impl_vr6wbw($this) {
    return 'EncodedObjectImpl(raw=' + toString($this) + ')';
  }
  function EncodedObjectImpl__hashCode_impl_hir8ud($this) {
    return hashCode($this);
  }
  function EncodedObjectImpl__equals_impl_qcpm8v($this, other) {
    if (!(other instanceof EncodedObjectImpl))
      return false;
    var tmp0_other_with_cast = other instanceof EncodedObjectImpl ? other.k4l_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function EncodedObjectImpl(raw) {
    this.k4l_1 = raw;
  }
  protoOf(EncodedObjectImpl).toString = function () {
    return EncodedObjectImpl__toString_impl_vr6wbw(this.k4l_1);
  };
  protoOf(EncodedObjectImpl).hashCode = function () {
    return EncodedObjectImpl__hashCode_impl_hir8ud(this.k4l_1);
  };
  protoOf(EncodedObjectImpl).equals = function (other) {
    return EncodedObjectImpl__equals_impl_qcpm8v(this.k4l_1, other);
  };
  function encodePolymorphically(_this__u8e3s4, serializer, value, ifPolymorphic) {
    if (!(serializer instanceof AbstractPolymorphicSerializer)) {
      serializer.z2z(_this__u8e3s4, value);
      return Unit_instance;
    }
    var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
    var baseClassDiscriminator = classDiscriminator(serializer.y2z());
    var actualSerializer = findPolymorphicSerializer(casted, _this__u8e3s4, !(value == null) ? value : THROW_CCE());
    ifPolymorphic(baseClassDiscriminator);
    actualSerializer.z2z(_this__u8e3s4, value);
  }
  function decodeSerializableValuePolymorphic(_this__u8e3s4, value, deserializer) {
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      return deserializer.a30(_this__u8e3s4);
    }
    var casted = deserializer instanceof AbstractPolymorphicSerializer ? deserializer : THROW_CCE();
    var discriminator = classDiscriminator(deserializer.y2z());
    var type = getPolymorphicType(value, discriminator);
    var tmp = casted.p30(structureDecoder(_this__u8e3s4, deserializer.y2z(), false), type);
    var actualDeserializer = (!(tmp == null) ? isInterface(tmp, DeserializationStrategy) : false) ? tmp : THROW_CCE();
    return actualDeserializer.a30(_this__u8e3s4);
  }
  function classDiscriminator(_this__u8e3s4) {
    var _iterator__ex2g4s = _this__u8e3s4.l31().g();
    while (_iterator__ex2g4s.h()) {
      var annotation = _iterator__ex2g4s.i();
      if (annotation instanceof FirebaseClassDiscriminator)
        return annotation.l4l_1;
    }
    return 'type';
  }
  function decode(strategy, value, decodeSettings) {
    // Inline function 'kotlin.require' call
    if (!(!(value == null) || strategy.y2z().y30())) {
      // Inline function 'dev.gitlive.firebase.internal.decode.<anonymous>' call
      var message = 'Value was null for non-nullable type ' + strategy.y2z().c31();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return (new FirebaseDecoder(value, decodeSettings)).u32(strategy);
  }
  function FirebaseDecoder(value, settings) {
    this.m4l_1 = value;
    this.n4l_1 = settings;
    this.o4l_1 = this.n4l_1.j33();
  }
  protoOf(FirebaseDecoder).v32 = function (descriptor) {
    return structureDecoder(this, descriptor, true);
  };
  protoOf(FirebaseDecoder).r32 = function () {
    return decodeString(this.m4l_1);
  };
  protoOf(FirebaseDecoder).p32 = function () {
    return decodeDouble(this.m4l_1);
  };
  protoOf(FirebaseDecoder).n32 = function () {
    return decodeLong(this.m4l_1);
  };
  protoOf(FirebaseDecoder).k32 = function () {
    return decodeByte(this.m4l_1);
  };
  protoOf(FirebaseDecoder).o32 = function () {
    return decodeFloat(this.m4l_1);
  };
  protoOf(FirebaseDecoder).m32 = function () {
    return decodeInt(this.m4l_1);
  };
  protoOf(FirebaseDecoder).l32 = function () {
    return decodeShort(this.m4l_1);
  };
  protoOf(FirebaseDecoder).j32 = function () {
    return decodeBoolean(this.m4l_1);
  };
  protoOf(FirebaseDecoder).q32 = function () {
    return decodeChar(this.m4l_1);
  };
  protoOf(FirebaseDecoder).h32 = function () {
    return decodeNotNullMark(this.m4l_1);
  };
  protoOf(FirebaseDecoder).i32 = function () {
    return decodeNull(this.m4l_1);
  };
  protoOf(FirebaseDecoder).s32 = function (descriptor) {
    return new FirebaseDecoder(this.m4l_1, this.n4l_1);
  };
  protoOf(FirebaseDecoder).u32 = function (deserializer) {
    return decodeSerializableValuePolymorphic(this, this.m4l_1, deserializer);
  };
  function decodeString(value) {
    return toString_0(value);
  }
  function decodeDouble(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToDouble(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = toDouble(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be double');
      }
    }
    return tmp;
  }
  function decodeLong(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToLong(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = toLong(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be long');
      }
    }
    return tmp;
  }
  function decodeByte(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToByte(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = toByte(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be byte');
      }
    }
    return tmp;
  }
  function decodeFloat(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToDouble(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp = toDouble(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be float');
      }
    }
    return tmp;
  }
  function decodeInt(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToInt(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = toInt(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be int');
      }
    }
    return tmp;
  }
  function decodeShort(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToShort(value);
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = toShort(value);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be short');
      }
    }
    return tmp;
  }
  function decodeBoolean(value) {
    var tmp;
    if (!(value == null) ? typeof value === 'boolean' : false) {
      tmp = value;
    } else {
      if (isNumber(value)) {
        tmp = !(numberToInt(value) === 0);
      } else {
        if (!(value == null) ? typeof value === 'string' : false) {
          tmp = toBoolean(value);
        } else {
          throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be boolean');
        }
      }
    }
    return tmp;
  }
  function decodeChar(value) {
    var tmp;
    if (isNumber(value)) {
      tmp = numberToChar(numberToInt(value));
    } else {
      if (!(value == null) ? typeof value === 'string' : false) {
        tmp = charSequenceGet(value, 0);
      } else {
        throw SerializationException_init_$Create$('Expected ' + toString_0(value) + ' to be char');
      }
    }
    return tmp;
  }
  function decodeNotNullMark(value) {
    return !(value == null);
  }
  function decodeNull(value) {
    var tmp;
    var tmp_0;
    if (value == null) {
      tmp_0 = true;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return tmp;
  }
  function decodeElement($this, descriptor, index, decoder) {
    var tmp;
    try {
      tmp = decoder($this.r4l_1(descriptor, index));
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        throw SerializationException_init_$Create$_0('Exception during decoding ' + descriptor.c31() + ' ' + descriptor.d31(index), e);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function FirebaseCompositeDecoder$decodeSerializableElement$lambda($deserializer, this$0) {
    return function (it) {
      return $deserializer.a30(new FirebaseDecoder(it, this$0.q4l_1));
    };
  }
  function decodeBoolean$ref() {
    var l = function (p0) {
      return decodeBoolean(p0);
    };
    l.callableName = 'decodeBoolean';
    return l;
  }
  function decodeByte$ref() {
    var l = function (p0) {
      return decodeByte(p0);
    };
    l.callableName = 'decodeByte';
    return l;
  }
  function decodeChar$ref() {
    var l = function (p0) {
      return new Char(decodeChar(p0));
    };
    l.callableName = 'decodeChar';
    return l;
  }
  function decodeDouble$ref() {
    var l = function (p0) {
      return decodeDouble(p0);
    };
    l.callableName = 'decodeDouble';
    return l;
  }
  function decodeFloat$ref() {
    var l = function (p0) {
      return decodeFloat(p0);
    };
    l.callableName = 'decodeFloat';
    return l;
  }
  function decodeInt$ref() {
    var l = function (p0) {
      return decodeInt(p0);
    };
    l.callableName = 'decodeInt';
    return l;
  }
  function decodeLong$ref() {
    var l = function (p0) {
      return decodeLong(p0);
    };
    l.callableName = 'decodeLong';
    return l;
  }
  function decodeShort$ref() {
    var l = function (p0) {
      return decodeShort(p0);
    };
    l.callableName = 'decodeShort';
    return l;
  }
  function decodeString$ref() {
    var l = function (p0) {
      return decodeString(p0);
    };
    l.callableName = 'decodeString';
    return l;
  }
  function FirebaseCompositeDecoder$decodeInlineElement$lambda(this$0) {
    return function (it) {
      return new FirebaseDecoder(it, this$0.q4l_1);
    };
  }
  function FirebaseCompositeDecoder(size, settings, get) {
    this.p4l_1 = size;
    this.q4l_1 = settings;
    this.r4l_1 = get;
    this.s4l_1 = this.q4l_1.j33();
  }
  protoOf(FirebaseCompositeDecoder).j33 = function () {
    return this.s4l_1;
  };
  protoOf(FirebaseCompositeDecoder).k33 = function () {
    return true;
  };
  protoOf(FirebaseCompositeDecoder).l33 = function (descriptor) {
    throw new NotImplementedError();
  };
  protoOf(FirebaseCompositeDecoder).m33 = function (descriptor) {
    return this.p4l_1;
  };
  protoOf(FirebaseCompositeDecoder).h33 = function (descriptor, index, deserializer, previousValue) {
    return decodeElement(this, descriptor, index, FirebaseCompositeDecoder$decodeSerializableElement$lambda(deserializer, this));
  };
  protoOf(FirebaseCompositeDecoder).x32 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeBoolean$ref());
  };
  protoOf(FirebaseCompositeDecoder).y32 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeByte$ref());
  };
  protoOf(FirebaseCompositeDecoder).e33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeChar$ref()).k1_1;
  };
  protoOf(FirebaseCompositeDecoder).d33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeDouble$ref());
  };
  protoOf(FirebaseCompositeDecoder).c33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeFloat$ref());
  };
  protoOf(FirebaseCompositeDecoder).a33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeInt$ref());
  };
  protoOf(FirebaseCompositeDecoder).b33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeLong$ref());
  };
  protoOf(FirebaseCompositeDecoder).z32 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeShort$ref());
  };
  protoOf(FirebaseCompositeDecoder).f33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, decodeString$ref());
  };
  protoOf(FirebaseCompositeDecoder).w32 = function (descriptor) {
  };
  protoOf(FirebaseCompositeDecoder).g33 = function (descriptor, index) {
    return decodeElement(this, descriptor, index, FirebaseCompositeDecoder$decodeInlineElement$lambda(this));
  };
  function FirebaseClassDecoder(size, settings, containsKey, get) {
    FirebaseCompositeDecoder.call(this, size, settings, get);
    this.x4l_1 = containsKey;
    this.y4l_1 = 0;
  }
  protoOf(FirebaseClassDecoder).k33 = function () {
    return false;
  };
  protoOf(FirebaseClassDecoder).l33 = function (descriptor) {
    var tmp0 = until(this.y4l_1, descriptor.k31());
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var inductionVariable = tmp0.c1_1;
      var last = tmp0.d1_1;
      if (inductionVariable <= last)
        do {
          var element = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'dev.gitlive.firebase.internal.FirebaseClassDecoder.decodeElementIndex.<anonymous>' call
          var it = element;
          if (!descriptor.h31(it) || this.x4l_1(descriptor.d31(it))) {
            tmp$ret$1 = element;
            break $l$block;
          }
        }
         while (!(element === last));
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.also' call
      // Inline function 'dev.gitlive.firebase.internal.FirebaseClassDecoder.decodeElementIndex.<anonymous>' call
      this.y4l_1 = tmp0_safe_receiver + 1 | 0;
      tmp = tmp0_safe_receiver;
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? -1 : tmp1_elvis_lhs;
  };
  function encode(strategy, value, encodeSettings) {
    // Inline function 'kotlin.apply' call
    var this_0 = new FirebaseEncoder(encodeSettings);
    // Inline function 'dev.gitlive.firebase.internal.encode.<anonymous>' call
    this_0.l34(strategy, value);
    return this_0.a4m_1;
  }
  function FirebaseEncoder$encodeSerializableValue$lambda(this$0) {
    return function (it) {
      this$0.c4m_1 = it;
      return Unit_instance;
    };
  }
  function FirebaseEncoder(settings) {
    this.z4l_1 = settings;
    this.a4m_1 = null;
    this.b4m_1 = this.z4l_1.j33();
    this.c4m_1 = null;
  }
  protoOf(FirebaseEncoder).j33 = function () {
    return this.b4m_1;
  };
  protoOf(FirebaseEncoder).v32 = function (descriptor) {
    var encoder = structureEncoder(this, descriptor);
    if (!(this.c4m_1 == null)) {
      encoder.i4m(ensureNotNull(this.c4m_1), descriptor.c31());
      this.c4m_1 = null;
    }
    return encoder;
  };
  protoOf(FirebaseEncoder).q33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).r33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).x33 = function (value) {
    this.a4m_1 = new Char(value);
  };
  protoOf(FirebaseEncoder).w33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).v33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).t33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).u33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).m34 = function () {
  };
  protoOf(FirebaseEncoder).p33 = function () {
    this.a4m_1 = null;
  };
  protoOf(FirebaseEncoder).s33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).y33 = function (value) {
    this.a4m_1 = value;
  };
  protoOf(FirebaseEncoder).z33 = function (descriptor) {
    return this;
  };
  protoOf(FirebaseEncoder).l34 = function (serializer, value) {
    encodePolymorphically(this, serializer, value, FirebaseEncoder$encodeSerializableValue$lambda(this));
  };
  function FirebaseCompositeEncoder$_init_$lambda_dbtx81() {
    return Unit_instance;
  }
  function FirebaseCompositeEncoder$_init_$lambda_dbtx81_0(_unused_var__etf5q3, _unused_var__etf5q3_0) {
    return Unit_instance;
  }
  function FirebaseCompositeEncoder(settings, end, setPolymorphicType, set) {
    var tmp;
    if (end === VOID) {
      tmp = FirebaseCompositeEncoder$_init_$lambda_dbtx81;
    } else {
      tmp = end;
    }
    end = tmp;
    var tmp_0;
    if (setPolymorphicType === VOID) {
      tmp_0 = FirebaseCompositeEncoder$_init_$lambda_dbtx81_0;
    } else {
      tmp_0 = setPolymorphicType;
    }
    setPolymorphicType = tmp_0;
    this.d4m_1 = settings;
    this.e4m_1 = end;
    this.f4m_1 = setPolymorphicType;
    this.g4m_1 = set;
    this.h4m_1 = this.d4m_1.j33();
  }
  protoOf(FirebaseCompositeEncoder).w32 = function (descriptor) {
    return this.e4m_1();
  };
  protoOf(FirebaseCompositeEncoder).o34 = function (descriptor, index) {
    return this.d4m_1.d4l();
  };
  protoOf(FirebaseCompositeEncoder).k34 = function (descriptor, index, serializer, value) {
    // Inline function 'kotlin.apply' call
    var this_0 = new FirebaseEncoder(this.d4m_1);
    // Inline function 'dev.gitlive.firebase.internal.FirebaseCompositeEncoder.encodeSerializableElement.<anonymous>' call
    this_0.l34(serializer, value);
    return this.g4m_1(descriptor, index, this_0.a4m_1);
  };
  protoOf(FirebaseCompositeEncoder).a34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).b34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).h34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, new Char(value));
  };
  protoOf(FirebaseCompositeEncoder).g34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).f34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).d34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).e34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).c34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).i34 = function (descriptor, index, value) {
    return this.g4m_1(descriptor, index, value);
  };
  protoOf(FirebaseCompositeEncoder).j34 = function (descriptor, index) {
    return new FirebaseEncoder(this.d4m_1);
  };
  protoOf(FirebaseCompositeEncoder).i4m = function (discriminator, type) {
    this.f4m_1(discriminator, type);
  };
  function SpecialValueSerializer$descriptor$lambda($this$buildClassSerialDescriptor) {
    return Unit_instance;
  }
  function SpecialValueSerializer(serialName, toNativeValue, fromNativeValue) {
    this.j4m_1 = toNativeValue;
    this.k4m_1 = fromNativeValue;
    var tmp = this;
    tmp.l4m_1 = buildClassSerialDescriptor(serialName, [], SpecialValueSerializer$descriptor$lambda);
  }
  protoOf(SpecialValueSerializer).y2z = function () {
    return this.l4m_1;
  };
  protoOf(SpecialValueSerializer).z2z = function (encoder, value) {
    if (encoder instanceof FirebaseEncoder) {
      encoder.a4m_1 = this.j4m_1(value);
    } else {
      throw SerializationException_init_$Create$('This serializer must be used with FirebaseEncoder');
    }
  };
  protoOf(SpecialValueSerializer).a30 = function (decoder) {
    var tmp;
    if (decoder instanceof FirebaseDecoder) {
      tmp = this.k4m_1(decoder.m4l_1);
    } else {
      throw SerializationException_init_$Create$('This serializer must be used with FirebaseDecoder');
    }
    return tmp;
  };
  function get_js(_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = getRaw(_this__u8e3s4).u();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'dev.gitlive.firebase.internal.<get-js>.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = item.v();
      // Inline function 'kotlin.collections.component2' call
      var value = item.w();
      var tmp$ret$2 = to(key, value);
      destination.e(tmp$ret$2);
    }
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$5 = copyToArray(destination);
    return json(tmp$ret$5.slice());
  }
  function asNativeMap(_this__u8e3s4) {
    var tmp;
    if (isNumber(_this__u8e3s4)) {
      tmp = null;
    } else {
      if (typeof _this__u8e3s4 === 'boolean') {
        tmp = null;
      } else {
        if (typeof _this__u8e3s4 === 'string') {
          tmp = null;
        } else {
          if (isInterface(_this__u8e3s4, KtMap)) {
            var tmp_0;
            var tmp0 = _this__u8e3s4.j2();
            var tmp$ret$0;
            $l$block_0: {
              // Inline function 'kotlin.collections.all' call
              var tmp_1;
              if (isInterface(tmp0, Collection)) {
                tmp_1 = tmp0.q();
              } else {
                tmp_1 = false;
              }
              if (tmp_1) {
                tmp$ret$0 = true;
                break $l$block_0;
              }
              var _iterator__ex2g4s = tmp0.g();
              while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                // Inline function 'dev.gitlive.firebase.internal.asNativeMap.<anonymous>' call
                if (!(!(element == null) ? typeof element === 'string' : false)) {
                  tmp$ret$0 = false;
                  break $l$block_0;
                }
              }
              tmp$ret$0 = true;
            }
            if (tmp$ret$0) {
              // Inline function 'kotlin.collections.mapKeys' call
              // Inline function 'kotlin.collections.mapKeysTo' call
              var destination = LinkedHashMap_init_$Create$(mapCapacity(_this__u8e3s4.j()));
              // Inline function 'kotlin.collections.associateByTo' call
              var _iterator__ex2g4s_0 = _this__u8e3s4.u().g();
              while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                // Inline function 'dev.gitlive.firebase.internal.asNativeMap.<anonymous>' call
                // Inline function 'kotlin.collections.component1' call
                var key = element_0.v();
                var tmp_2 = (!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE();
                // Inline function 'kotlin.collections.mapKeysTo.<anonymous>' call
                var tmp$ret$4 = element_0.w();
                destination.l2(tmp_2, tmp$ret$4);
              }
              // Inline function 'kotlin.collections.toTypedArray' call
              var this_0 = toList(destination);
              var tmp$ret$8 = copyToArray(this_0);
              tmp_0 = json(tmp$ret$8.slice());
            } else {
              tmp_0 = null;
            }
            tmp = tmp_0;
          } else {
            if (isInterface(_this__u8e3s4, Collection)) {
              tmp = null;
            } else {
              if (isArray(_this__u8e3s4)) {
                tmp = null;
              } else {
                tmp = !(_this__u8e3s4 == null) ? _this__u8e3s4 : THROW_CCE();
              }
            }
          }
        }
      }
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_3;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp_3 = tmp1_elvis_lhs;
    }
    var json_0 = tmp_3;
    // Inline function 'kotlin.collections.mutableMapOf' call
    var mutableMap = LinkedHashMap_init_$Create$_0();
    var _iterator__ex2g4s_1 = iterator(Object.keys(json_0));
    while (_iterator__ex2g4s_1.h()) {
      var key_0 = _iterator__ex2g4s_1.i();
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.collections.set' call
      var value = json_0[key_0];
      mutableMap.l2(key_0, value);
    }
    return toMap_0(mutableMap);
  }
  function structureDecoder(_this__u8e3s4, descriptor, polymorphicIsNested) {
    var tmp0_subject = descriptor.i31();
    var tmp;
    if (equals(tmp0_subject, CLASS_getInstance()) || equals(tmp0_subject, OBJECT_getInstance())) {
      tmp = decodeAsMap(_this__u8e3s4, false);
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = decodeAsList(_this__u8e3s4);
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          var tmp_0 = Object.entries(_this__u8e3s4.m4l_1);
          // Inline function 'kotlin.let' call
          // Inline function 'dev.gitlive.firebase.internal.structureDecoder.<anonymous>' call
          var it = (!(tmp_0 == null) ? isArray(tmp_0) : false) ? tmp_0 : THROW_CCE();
          var tmp_1 = it.length;
          tmp = new FirebaseCompositeDecoder(tmp_1, _this__u8e3s4.n4l_1, structureDecoder$lambda(it));
        } else {
          if (tmp0_subject instanceof PolymorphicKind) {
            tmp = decodeAsMap(_this__u8e3s4, polymorphicIsNested);
          } else {
            var reason = 'The firebase-kotlin-sdk does not support ' + toString(descriptor) + ' for serialization yet';
            throw new NotImplementedError('An operation is not implemented: ' + reason);
          }
        }
      }
    }
    return tmp;
  }
  function getPolymorphicType(value, discriminator) {
    var tmp = ((!(value == null) ? !(value == null) : false) ? value : THROW_CCE())[discriminator];
    return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
  }
  function decodeAsMap(_this__u8e3s4, isNestedPolymorphic) {
    var tmp = _this__u8e3s4.m4l_1;
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.internal.decodeAsMap.<anonymous>' call
    var json = (!(tmp == null) ? !(tmp == null) : false) ? tmp : THROW_CCE();
    var tmp_0 = Object.keys(_this__u8e3s4.m4l_1).length;
    var tmp_1 = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
    var tmp_2 = decodeAsMap$lambda(json);
    return new FirebaseClassDecoder(tmp_1, _this__u8e3s4.n4l_1, tmp_2, decodeAsMap$lambda_0(isNestedPolymorphic, json));
  }
  function decodeAsList(_this__u8e3s4) {
    var tmp = _this__u8e3s4.m4l_1;
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.internal.decodeAsList.<anonymous>' call
    var it = (!(tmp == null) ? isArray(tmp) : false) ? tmp : THROW_CCE();
    var tmp_0 = it.length;
    return new FirebaseCompositeDecoder(tmp_0, _this__u8e3s4.n4l_1, decodeAsList$lambda(it));
  }
  function structureDecoder$lambda($it) {
    return function (desc, index) {
      // Inline function 'kotlin.run' call
      // Inline function 'dev.gitlive.firebase.internal.structureDecoder.<anonymous>.<anonymous>.<anonymous>' call
      var $this$run = $it[index / 2 | 0];
      var tmp;
      if ((index % 2 | 0) === 0) {
        var tmp_0 = $this$run[0];
        var key = typeof tmp_0 === 'string' ? tmp_0 : THROW_CCE();
        var tmp_1;
        if (equals(desc.g31(index).i31(), STRING_getInstance())) {
          tmp_1 = key;
        } else {
          tmp_1 = JSON.parse(key);
        }
        tmp = tmp_1;
      } else {
        tmp = $this$run[1];
      }
      return tmp;
    };
  }
  function decodeAsMap$lambda($json) {
    return function (it) {
      return !equals($json[it], undefined);
    };
  }
  function decodeAsMap$lambda_0($isNestedPolymorphic, $json) {
    return function (desc, index) {
      var tmp;
      if ($isNestedPolymorphic) {
        var tmp_0;
        if (desc.d31(index) === 'value') {
          tmp_0 = $json;
        } else {
          tmp_0 = $json[desc.d31(index)];
        }
        tmp = tmp_0;
      } else {
        tmp = $json[desc.d31(index)];
      }
      return tmp;
    };
  }
  function decodeAsList$lambda($it) {
    return function (_unused_var__etf5q3, index) {
      return $it[index];
    };
  }
  function structureEncoder(_this__u8e3s4, descriptor) {
    var tmp0_subject = descriptor.i31();
    var tmp;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = encodeAsList(_this__u8e3s4, descriptor);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        var map = json([]);
        var lastKey = {_v: ''};
        _this__u8e3s4.a4m_1 = map;
        tmp = new FirebaseCompositeEncoder(_this__u8e3s4.z4l_1, VOID, VOID, structureEncoder$lambda(lastKey, map));
      } else {
        if (equals(tmp0_subject, CLASS_getInstance()) || equals(tmp0_subject, OBJECT_getInstance())) {
          tmp = encodeAsMap(_this__u8e3s4, descriptor);
        } else {
          if (tmp0_subject instanceof PolymorphicKind) {
            tmp = encodeAsMap(_this__u8e3s4, descriptor);
          } else {
            var reason = 'The firebase-kotlin-sdk does not support ' + toString(descriptor) + ' for serialization yet';
            throw new NotImplementedError('An operation is not implemented: ' + reason);
          }
        }
      }
    }
    return tmp;
  }
  function encodeAsList(_this__u8e3s4, descriptor) {
    var tmp = 0;
    var tmp_0 = descriptor.k31();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = fillArrayVal(Array(tmp_0), null);
    while (tmp < tmp_0) {
      tmp_1[tmp] = null;
      tmp = tmp + 1 | 0;
    }
    // Inline function 'kotlin.also' call
    // Inline function 'dev.gitlive.firebase.internal.encodeAsList.<anonymous>' call
    _this__u8e3s4.a4m_1 = tmp_1;
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.internal.encodeAsList.<anonymous>' call
    return new FirebaseCompositeEncoder(_this__u8e3s4.z4l_1, VOID, VOID, encodeAsList$lambda(tmp_1));
  }
  function encodeAsMap(_this__u8e3s4, descriptor) {
    // Inline function 'kotlin.also' call
    var this_0 = json([]);
    // Inline function 'dev.gitlive.firebase.internal.encodeAsMap.<anonymous>' call
    _this__u8e3s4.a4m_1 = this_0;
    // Inline function 'kotlin.let' call
    // Inline function 'dev.gitlive.firebase.internal.encodeAsMap.<anonymous>' call
    var tmp = encodeAsMap$lambda(this_0);
    return new FirebaseCompositeEncoder(_this__u8e3s4.z4l_1, VOID, tmp, encodeAsMap$lambda_0(this_0, descriptor));
  }
  function structureEncoder$lambda($lastKey, $map) {
    return function (_unused_var__etf5q3, index, value) {
      var tmp;
      if ((index % 2 | 0) === 0) {
        var tmp0_elvis_lhs = (!(value == null) ? typeof value === 'string' : false) ? value : null;
        $lastKey._v = tmp0_elvis_lhs == null ? JSON.stringify(value) : tmp0_elvis_lhs;
        tmp = Unit_instance;
      } else {
        $map[$lastKey._v] = value;
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function encodeAsList$lambda($it) {
    return function (_unused_var__etf5q3, index, value) {
      $it[index] = value;
      return Unit_instance;
    };
  }
  function encodeAsMap$lambda($it) {
    return function (discriminator, type) {
      $it[discriminator] = type;
      return Unit_instance;
    };
  }
  function encodeAsMap$lambda_0($it, $descriptor) {
    return function (_unused_var__etf5q3, index, value) {
      $it[$descriptor.d31(index)] = value;
      return Unit_instance;
    };
  }
  //region block: post-declaration
  protoOf(FirebaseCompositeDecoder).i33 = decodeSerializableElement$default;
  protoOf(FirebaseEncoder).n34 = beginCollection;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Builder_0;
  _.$_$.b = Builder;
  _.$_$.c = SpecialValueSerializer;
  _.$_$.d = asEncodedObject;
  _.$_$.e = asNativeMap;
  _.$_$.f = buildDecodeSettings;
  _.$_$.g = buildEncodeSettings;
  _.$_$.h = decode;
  _.$_$.i = encode;
  _.$_$.j = get_js;
  //endregion
  return _;
}));

//# sourceMappingURL=firebase-kotlin-sdk-firebase-common-internal.js.map
