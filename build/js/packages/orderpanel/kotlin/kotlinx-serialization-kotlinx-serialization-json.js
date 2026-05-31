(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var protoOf = kotlin_kotlin.$_$.ob;
  var initMetadataForObject = kotlin_kotlin.$_$.na;
  var VOID = kotlin_kotlin.$_$.g;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var toString = kotlin_kotlin.$_$.sb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.o1;
  var charSequenceLength = kotlin_kotlin.$_$.w9;
  var charSequenceGet = kotlin_kotlin.$_$.v9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.g2;
  var equals = kotlin_kotlin.$_$.aa;
  var toString_0 = kotlin_kotlin.$_$.qg;
  var Enum = kotlin_kotlin.$_$.cf;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var initMetadataForInterface = kotlin_kotlin.$_$.la;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ja;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.g1;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var hashCode = kotlin_kotlin.$_$.ha;
  var joinToString = kotlin_kotlin.$_$.z6;
  var KtMap = kotlin_kotlin.$_$.f5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.i;
  var lazy = kotlin_kotlin.$_$.ig;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var getBooleanHashCode = kotlin_kotlin.$_$.ca;
  var getStringHashCode = kotlin_kotlin.$_$.ga;
  var KtList = kotlin_kotlin.$_$.d5;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.x1;
  var numberRangeToNumber = kotlin_kotlin.$_$.gb;
  var ClosedRange = kotlin_kotlin.$_$.vb;
  var isInterface = kotlin_kotlin.$_$.xa;
  var contains = kotlin_kotlin.$_$.cc;
  var toDouble = kotlin_kotlin.$_$.fe;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.g4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var toLongOrNull = kotlin_kotlin.$_$.ie;
  var toULongOrNull = kotlin_kotlin.$_$.oe;
  var ULong = kotlin_kotlin.$_$.uf;
  var Companion_getInstance = kotlin_kotlin.$_$.o4;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.h3;
  var toDoubleOrNull = kotlin_kotlin.$_$.ee;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.be;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.s1;
  var lazy_0 = kotlin_kotlin.$_$.jg;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var KProperty1 = kotlin_kotlin.$_$.kc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.fa;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var toLong = kotlin_kotlin.$_$.qb;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.x2;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.z2;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.g3;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.i3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.o2;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.q2;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.p3;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.r3;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var captureStack = kotlin_kotlin.$_$.s9;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var charSequenceSubSequence = kotlin_kotlin.$_$.x9;
  var coerceAtLeast = kotlin_kotlin.$_$.xb;
  var coerceAtMost = kotlin_kotlin.$_$.zb;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.v;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var singleOrNull = kotlin_kotlin.$_$.z7;
  var emptyMap = kotlin_kotlin.$_$.m6;
  var getValue = kotlin_kotlin.$_$.v6;
  var fillArrayVal = kotlin_kotlin.$_$.ba;
  var copyOf = kotlin_kotlin.$_$.f6;
  var copyOf_0 = kotlin_kotlin.$_$.g6;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.af;
  var invoke = kotlin_kotlin.$_$.fg;
  var CoroutineImpl = kotlin_kotlin.$_$.k9;
  var DeepRecursiveScope = kotlin_kotlin.$_$.bf;
  var Unit = kotlin_kotlin.$_$.xf;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.v8;
  var initMetadataForLambda = kotlin_kotlin.$_$.ma;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.ka;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g2;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c2;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var getKClass = kotlin_kotlin.$_$.e;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var ensureNotNull = kotlin_kotlin.$_$.eg;
  var substringBefore = kotlin_kotlin.$_$.yd;
  var removeSuffix = kotlin_kotlin.$_$.md;
  var substringAfter = kotlin_kotlin.$_$.xd;
  var contains_0 = kotlin_kotlin.$_$.uc;
  var plus = kotlin_kotlin.$_$.lg;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var IllegalArgumentException = kotlin_kotlin.$_$.ff;
  var isFinite = kotlin_kotlin.$_$.hg;
  var isFinite_0 = kotlin_kotlin.$_$.gg;
  var toUInt = kotlin_kotlin.$_$.ne;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.y2;
  var toULong = kotlin_kotlin.$_$.pe;
  var toUByte = kotlin_kotlin.$_$.me;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.p2;
  var toUShort = kotlin_kotlin.$_$.qe;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.q3;
  var objectCreate = kotlin_kotlin.$_$.nb;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var toString_1 = kotlin_kotlin.$_$.j2;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.n4;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.m4;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.p4;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var setOf = kotlin_kotlin.$_$.y7;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.i2;
  var numberToChar = kotlin_kotlin.$_$.ib;
  var equals_0 = kotlin_kotlin.$_$.ad;
  var toByte = kotlin_kotlin.$_$.pb;
  var startsWith = kotlin_kotlin.$_$.ud;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var toShort = kotlin_kotlin.$_$.rb;
  var single = kotlin_kotlin.$_$.rd;
  var Char = kotlin_kotlin.$_$.ye;
  var emptySet = kotlin_kotlin.$_$.n6;
  var plus_0 = kotlin_kotlin.$_$.r7;
  var toInt = kotlin_kotlin.$_$.he;
  var toList = kotlin_kotlin.$_$.k8;
  var enumEntries = kotlin_kotlin.$_$.m9;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var last = kotlin_kotlin.$_$.f7;
  var removeLast = kotlin_kotlin.$_$.x7;
  var lastIndexOf = kotlin_kotlin.$_$.jd;
  var Long = kotlin_kotlin.$_$.hf;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.h2;
  var numberToLong = kotlin_kotlin.$_$.lb;
  var charArray = kotlin_kotlin.$_$.u9;
  var indexOf = kotlin_kotlin.$_$.cd;
  var indexOf_0 = kotlin_kotlin.$_$.dd;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.f1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.o;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Json, 'Json');
  initMetadataForObject(Default, 'Default', VOID, Json);
  initMetadataForClass(JsonBuilder, 'JsonBuilder');
  initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
  initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
  initMetadataForClass(JsonNames, 'JsonNames');
  initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
  initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
  initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [JsonElement, KtMap], VOID, VOID, {0: JsonObjectSerializer_getInstance});
  initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
  initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNull_getInstance});
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [JsonElement, KtList], VOID, VOID, {0: JsonArraySerializer_getInstance});
  initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(defer$1, VOID, VOID, VOID, [SerialDescriptor]);
  initMetadataForInterface(JsonEncoder, 'JsonEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForClass(Composer, 'Composer');
  initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
  initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
  initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
  initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
  initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
  initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
  initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
  initMetadataForObject(Tombstone, 'Tombstone');
  initMetadataForClass(JsonPath, 'JsonPath', JsonPath);
  initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
  initMetadataForCoroutine($readObjectCOROUTINE$0, CoroutineImpl);
  initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [0]);
  initMetadataForClass(PolymorphismValidator, 'PolymorphismValidator', VOID, VOID, [SerializersModuleCollector]);
  initMetadataForClass(Key, 'Key', Key);
  initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
  initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
  initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
  initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
  initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [JsonEncoder, AbstractEncoder]);
  initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
  initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
  initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
  initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
  initMetadataForObject(CharMappings, 'CharMappings');
  initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
  initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
  initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.u3k_1 = configuration;
    this.v3k_1 = serializersModule;
    this.w3k_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).j33 = function () {
    return this.v3k_1;
  };
  protoOf(Json).x3k = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.j1l();
    }
  };
  protoOf(Json).y3k = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.y2z(), null);
    var result = input.u32(deserializer);
    lexer.m3l();
    return result;
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.f3m();
    return new JsonImpl(conf, builder.e3m_1);
  }
  function JsonBuilder(json) {
    this.n3l_1 = json.u3k_1.g3m_1;
    this.o3l_1 = json.u3k_1.l3m_1;
    this.p3l_1 = json.u3k_1.h3m_1;
    this.q3l_1 = json.u3k_1.i3m_1;
    this.r3l_1 = json.u3k_1.k3m_1;
    this.s3l_1 = json.u3k_1.m3m_1;
    this.t3l_1 = json.u3k_1.n3m_1;
    this.u3l_1 = json.u3k_1.p3m_1;
    this.v3l_1 = json.u3k_1.w3m_1;
    this.w3l_1 = json.u3k_1.r3m_1;
    this.x3l_1 = json.u3k_1.s3m_1;
    this.y3l_1 = json.u3k_1.t3m_1;
    this.z3l_1 = json.u3k_1.u3m_1;
    this.a3m_1 = json.u3k_1.v3m_1;
    this.b3m_1 = json.u3k_1.q3m_1;
    this.c3m_1 = json.u3k_1.j3m_1;
    this.d3m_1 = json.u3k_1.o3m_1;
    this.e3m_1 = json.j33();
  }
  protoOf(JsonBuilder).f3m = function () {
    if (this.d3m_1) {
      // Inline function 'kotlin.require' call
      if (!(this.u3l_1 === 'type')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.v3l_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.r3l_1) {
      // Inline function 'kotlin.require' call
      if (!(this.s3l_1 === '    ')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.s3l_1 === '    ')) {
      var tmp3 = this.s3l_1;
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(tmp3)) {
          var element = charSequenceGet(tmp3, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
          if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$4 = false;
            break $l$block;
          }
        }
        tmp$ret$4 = true;
      }
      var allWhitespaces = tmp$ret$4;
      // Inline function 'kotlin.require' call
      if (!allWhitespaces) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.s3l_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.n3l_1, this.p3l_1, this.q3l_1, this.c3m_1, this.r3l_1, this.o3l_1, this.s3l_1, this.t3l_1, this.d3m_1, this.u3l_1, this.b3m_1, this.w3l_1, this.x3l_1, this.y3l_1, this.z3l_1, this.a3m_1, this.v3l_1);
  };
  function validateConfiguration($this) {
    if (equals($this.j33(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.u3k_1.o3m_1, $this.u3k_1.p3m_1);
    $this.j33().d3i(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    allowComments = allowComments === VOID ? false : allowComments;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    this.g3m_1 = encodeDefaults;
    this.h3m_1 = ignoreUnknownKeys;
    this.i3m_1 = isLenient;
    this.j3m_1 = allowStructuredMapKeys;
    this.k3m_1 = prettyPrint;
    this.l3m_1 = explicitNulls;
    this.m3m_1 = prettyPrintIndent;
    this.n3m_1 = coerceInputValues;
    this.o3m_1 = useArrayPolymorphism;
    this.p3m_1 = classDiscriminator;
    this.q3m_1 = allowSpecialFloatingPointValues;
    this.r3m_1 = useAlternativeNames;
    this.s3m_1 = namingStrategy;
    this.t3m_1 = decodeEnumsCaseInsensitive;
    this.u3m_1 = allowTrailingComma;
    this.v3m_1 = allowComments;
    this.w3m_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.g3m_1 + ', ignoreUnknownKeys=' + this.h3m_1 + ', isLenient=' + this.i3m_1 + ', ' + ('allowStructuredMapKeys=' + this.j3m_1 + ', prettyPrint=' + this.k3m_1 + ', explicitNulls=' + this.l3m_1 + ', ') + ("prettyPrintIndent='" + this.m3m_1 + "', coerceInputValues=" + this.n3m_1 + ', useArrayPolymorphism=' + this.o3m_1 + ', ') + ("classDiscriminator='" + this.p3m_1 + "', allowSpecialFloatingPointValues=" + this.q3m_1 + ', ') + ('useAlternativeNames=' + this.r3m_1 + ', namingStrategy=' + toString_0(this.s3m_1) + ', decodeEnumsCaseInsensitive=' + this.t3m_1 + ', ') + ('allowTrailingComma=' + this.u3m_1 + ', allowComments=' + this.v3m_1 + ', classDiscriminatorMode=' + this.w3m_1.toString() + ')');
  };
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  var ClassDiscriminatorMode_entriesInitialized;
  function ClassDiscriminatorMode_initEntries() {
    if (ClassDiscriminatorMode_entriesInitialized)
      return Unit_instance;
    ClassDiscriminatorMode_entriesInitialized = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_NONE_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_NONE_instance;
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function JsonDecoder() {
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance_3() {
    return Companion_instance;
  }
  function JsonElement() {
  }
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonObject$toString$lambda(_destruct__k2r9zo) {
    // Inline function 'kotlin.collections.component1' call
    var k = _destruct__k2r9zo.v();
    // Inline function 'kotlin.collections.component2' call
    var v = _destruct__k2r9zo.w();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlinx.serialization.json.JsonObject.toString.<anonymous>.<anonymous>' call
    printQuoted(this_0, k);
    this_0.q8(_Char___init__impl__6a9atx(58));
    this_0.o8(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.z3m_1 = content;
  }
  protoOf(JsonObject).a3n = function (key) {
    return this.z3m_1.g2(key);
  };
  protoOf(JsonObject).g2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.a3n((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).b3n = function (key) {
    return this.z3m_1.i2(key);
  };
  protoOf(JsonObject).i2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.b3n((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).q = function () {
    return this.z3m_1.q();
  };
  protoOf(JsonObject).u = function () {
    return this.z3m_1.u();
  };
  protoOf(JsonObject).j2 = function () {
    return this.z3m_1.j2();
  };
  protoOf(JsonObject).j = function () {
    return this.z3m_1.j();
  };
  protoOf(JsonObject).k2 = function () {
    return this.z3m_1.k2();
  };
  protoOf(JsonObject).equals = function (other) {
    return equals(this.z3m_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.z3m_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.z3m_1.u();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  function _get_$cachedSerializer__te6jhj($this) {
    return $this.d3n_1.w();
  }
  function JsonNull$_anonymous__enib48() {
    return JsonNullSerializer_getInstance();
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.c3n_1 = 'null';
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.d3n_1 = lazy(tmp_0, JsonNull$_anonymous__enib48);
  }
  protoOf(JsonNull).e3n = function () {
    return this.c3n_1;
  };
  protoOf(JsonNull).f3n = function () {
    return _get_$cachedSerializer__te6jhj(this);
  };
  protoOf(JsonNull).l3a = function (typeParamsSerializers) {
    return this.f3n();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function Companion_1() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.e3n();
  };
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.g3n_1 = isString;
    this.h3n_1 = coerceToInlineType;
    this.i3n_1 = toString(body);
    if (!(this.h3n_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.h3n_1.j31()) {
        // Inline function 'kotlin.require.<anonymous>' call
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).e3n = function () {
    return this.i3n_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.g3n_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      // Inline function 'kotlinx.serialization.json.JsonLiteral.toString.<anonymous>' call
      printQuoted(this_0, this.i3n_1);
      tmp = this_0.toString();
    } else {
      tmp = this.i3n_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.g3n_1 === other.g3n_1))
      return false;
    if (!(this.i3n_1 === other.i3n_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.g3n_1);
    result = imul(31, result) + getStringHashCode(this.i3n_1) | 0;
    return result;
  };
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.j3n_1 = content;
  }
  protoOf(JsonArray).k3n = function (element) {
    return this.j3n_1.o(element);
  };
  protoOf(JsonArray).o = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.k3n(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).p = function (index) {
    return this.j3n_1.p(index);
  };
  protoOf(JsonArray).l3n = function (element) {
    return this.j3n_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.l3n(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).q = function () {
    return this.j3n_1.q();
  };
  protoOf(JsonArray).g = function () {
    return this.j3n_1.g();
  };
  protoOf(JsonArray).r = function (index) {
    return this.j3n_1.r(index);
  };
  protoOf(JsonArray).j = function () {
    return this.j3n_1.j();
  };
  protoOf(JsonArray).equals = function (other) {
    return equals(this.j3n_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.j3n_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.j3n_1, ',', '[', ']');
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.e3n());
  }
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.json.<get-int>.<anonymous>' call
      tmp = (new StringJsonLexer(_this__u8e3s4.e3n())).m3n();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    var result = tmp;
    // Inline function 'kotlin.ranges.contains' call
    var this_0 = numberRangeToNumber(-2147483648, 2147483647);
    if (!contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result))
      throw NumberFormatException_init_$Create$(_this__u8e3s4.e3n() + ' is not an Int');
    return result.g1();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.json.<get-long>.<anonymous>' call
      tmp = (new StringJsonLexer(_this__u8e3s4.e3n())).m3n();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.e3n();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.e3n());
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.e3n();
    }
    return tmp;
  }
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.j30('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.j30('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.j30('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.j30('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.j30('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().n3n_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().o3n_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().p3n_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().q3n_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().r3n_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.s3n_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).y2z = function () {
    return this.s3n_1;
  };
  protoOf(JsonElementSerializer).t3n = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.l34(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.l34(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.l34(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).z2z = function (encoder, value) {
    return this.t3n(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).a30 = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.y3m();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.u3n_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).y2z();
    this.v3n_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).d31 = function (index) {
    return this.u3n_1.d31(index);
  };
  protoOf(JsonObjectDescriptor).e31 = function (name) {
    return this.u3n_1.e31(name);
  };
  protoOf(JsonObjectDescriptor).f31 = function (index) {
    return this.u3n_1.f31(index);
  };
  protoOf(JsonObjectDescriptor).g31 = function (index) {
    return this.u3n_1.g31(index);
  };
  protoOf(JsonObjectDescriptor).h31 = function (index) {
    return this.u3n_1.h31(index);
  };
  protoOf(JsonObjectDescriptor).i31 = function () {
    return this.u3n_1.i31();
  };
  protoOf(JsonObjectDescriptor).y30 = function () {
    return this.u3n_1.y30();
  };
  protoOf(JsonObjectDescriptor).j31 = function () {
    return this.u3n_1.j31();
  };
  protoOf(JsonObjectDescriptor).k31 = function () {
    return this.u3n_1.k31();
  };
  protoOf(JsonObjectDescriptor).l31 = function () {
    return this.u3n_1.l31();
  };
  protoOf(JsonObjectDescriptor).c31 = function () {
    return this.v3n_1;
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.q3n_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).y2z = function () {
    return this.q3n_1;
  };
  protoOf(JsonObjectSerializer).w3n = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).z2z(encoder, value);
  };
  protoOf(JsonObjectSerializer).z2z = function (encoder, value) {
    return this.w3n(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).a30 = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).a30(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.x3n_1 = ListSerializer(JsonElementSerializer_getInstance()).y2z();
    this.y3n_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).d31 = function (index) {
    return this.x3n_1.d31(index);
  };
  protoOf(JsonArrayDescriptor).e31 = function (name) {
    return this.x3n_1.e31(name);
  };
  protoOf(JsonArrayDescriptor).f31 = function (index) {
    return this.x3n_1.f31(index);
  };
  protoOf(JsonArrayDescriptor).g31 = function (index) {
    return this.x3n_1.g31(index);
  };
  protoOf(JsonArrayDescriptor).h31 = function (index) {
    return this.x3n_1.h31(index);
  };
  protoOf(JsonArrayDescriptor).i31 = function () {
    return this.x3n_1.i31();
  };
  protoOf(JsonArrayDescriptor).y30 = function () {
    return this.x3n_1.y30();
  };
  protoOf(JsonArrayDescriptor).j31 = function () {
    return this.x3n_1.j31();
  };
  protoOf(JsonArrayDescriptor).k31 = function () {
    return this.x3n_1.k31();
  };
  protoOf(JsonArrayDescriptor).l31 = function () {
    return this.x3n_1.l31();
  };
  protoOf(JsonArrayDescriptor).c31 = function () {
    return this.y3n_1;
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.r3n_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).y2z = function () {
    return this.r3n_1;
  };
  protoOf(JsonArraySerializer).z3n = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).z2z(encoder, value);
  };
  protoOf(JsonArraySerializer).z2z = function (encoder, value) {
    return this.z3n(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).a30 = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).a30(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.n3n_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).y2z = function () {
    return this.n3n_1;
  };
  protoOf(JsonPrimitiveSerializer).a3o = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.l34(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.l34(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).z2z = function (encoder, value) {
    return this.a3o(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).a30 = function (decoder) {
    var result = asJsonDecoder(decoder).y3m();
    if (!(result instanceof JsonPrimitive))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.o3n_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).y2z = function () {
    return this.o3n_1;
  };
  protoOf(JsonNullSerializer).b3o = function (encoder, value) {
    verify(encoder);
    encoder.p33();
  };
  protoOf(JsonNullSerializer).z2z = function (encoder, value) {
    return this.b3o(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).a30 = function (decoder) {
    verify_0(decoder);
    if (decoder.h32()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.i32();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.p3n_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).y2z = function () {
    return this.p3n_1;
  };
  protoOf(JsonLiteralSerializer).c3o = function (encoder, value) {
    verify(encoder);
    if (value.g3n_1) {
      return encoder.y33(value.i3n_1);
    }
    if (!(value.h3n_1 == null)) {
      return encoder.z33(value.h3n_1).y33(value.i3n_1);
    }
    var tmp2_safe_receiver = toLongOrNull(value.i3n_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.u33(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toULongOrNull(value.i3n_1);
    var tmp = tmp3_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp3_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).vk_1;
      var tmp_1 = encoder.z33(serializer_0(Companion_getInstance()).y2z());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.u33(tmp$ret$1);
      return Unit_instance;
    }
    var tmp4_safe_receiver = toDoubleOrNull(value.i3n_1);
    if (tmp4_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.w33(tmp4_safe_receiver);
    }
    var tmp5_safe_receiver = toBooleanStrictOrNull(value.i3n_1);
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.q33(tmp5_safe_receiver);
    }
    encoder.y33(value.i3n_1);
  };
  protoOf(JsonLiteralSerializer).z2z = function (encoder, value) {
    return this.c3o(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).a30 = function (decoder) {
    var result = asJsonDecoder(decoder).y3m();
    if (!(result instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function verify(encoder) {
    asJsonEncoder(encoder);
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function verify_0(decoder) {
    asJsonDecoder(decoder);
  }
  function asJsonEncoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function _get_original__l7ku1m($this) {
    var tmp0 = $this.d3o_1;
    // Inline function 'kotlin.getValue' call
    original$factory();
    return tmp0.w();
  }
  function defer$1($deferred) {
    this.d3o_1 = lazy_0($deferred);
  }
  protoOf(defer$1).c31 = function () {
    return _get_original__l7ku1m(this).c31();
  };
  protoOf(defer$1).i31 = function () {
    return _get_original__l7ku1m(this).i31();
  };
  protoOf(defer$1).k31 = function () {
    return _get_original__l7ku1m(this).k31();
  };
  protoOf(defer$1).d31 = function (index) {
    return _get_original__l7ku1m(this).d31(index);
  };
  protoOf(defer$1).e31 = function (name) {
    return _get_original__l7ku1m(this).e31(name);
  };
  protoOf(defer$1).f31 = function (index) {
    return _get_original__l7ku1m(this).f31(index);
  };
  protoOf(defer$1).g31 = function (index) {
    return _get_original__l7ku1m(this).g31(index);
  };
  protoOf(defer$1).h31 = function (index) {
    return _get_original__l7ku1m(this).h31(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.e3o_1 = writer;
    this.f3o_1 = true;
  }
  protoOf(Composer).g3o = function () {
    this.f3o_1 = true;
  };
  protoOf(Composer).h3o = function () {
    return Unit_instance;
  };
  protoOf(Composer).i3o = function () {
    this.f3o_1 = false;
  };
  protoOf(Composer).j3o = function () {
    this.f3o_1 = false;
  };
  protoOf(Composer).k3o = function () {
    return Unit_instance;
  };
  protoOf(Composer).l3o = function (v) {
    return this.e3o_1.m3o(v);
  };
  protoOf(Composer).n3o = function (v) {
    return this.e3o_1.o3o(v);
  };
  protoOf(Composer).p3o = function (v) {
    return this.e3o_1.o3o(v.toString());
  };
  protoOf(Composer).q3o = function (v) {
    return this.e3o_1.o3o(v.toString());
  };
  protoOf(Composer).r3o = function (v) {
    return this.e3o_1.s3o(toLong(v));
  };
  protoOf(Composer).t3o = function (v) {
    return this.e3o_1.s3o(toLong(v));
  };
  protoOf(Composer).u3o = function (v) {
    return this.e3o_1.s3o(toLong(v));
  };
  protoOf(Composer).v3o = function (v) {
    return this.e3o_1.s3o(v);
  };
  protoOf(Composer).w3o = function (v) {
    return this.e3o_1.o3o(v.toString());
  };
  protoOf(Composer).x3o = function (value) {
    return this.e3o_1.y3o(value);
  };
  function Composer_0(sb, json) {
    return json.u3k_1.k3m_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.b3p_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).u3o = function (v) {
    if (this.b3p_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.x3o(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.n3o(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).v3o = function (v) {
    if (this.b3p_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.x3o(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.n3o(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).r3o = function (v) {
    if (this.b3p_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.x3o(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.n3o(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).t3o = function (v) {
    if (this.b3p_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.x3o(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.n3o(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.e3p_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).x3o = function (value) {
    if (this.e3p_1) {
      protoOf(Composer).x3o.call(this, value);
    } else {
      protoOf(Composer).n3o.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.h3p_1 = json;
    this.i3p_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).g3o = function () {
    this.f3o_1 = true;
    this.i3p_1 = this.i3p_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).h3o = function () {
    this.i3p_1 = this.i3p_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).i3o = function () {
    this.f3o_1 = false;
    this.n3o('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.i3p_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.serialization.json.internal.ComposerWithPrettyPrint.nextItem.<anonymous>' call
        this.n3o(this.h3p_1.u3k_1.m3m_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).j3o = function () {
    if (this.f3o_1)
      this.f3o_1 = false;
    else {
      this.i3o();
    }
  };
  protoOf(ComposerWithPrettyPrint).k3o = function () {
    this.l3o(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.k3p_1 = (!descriptor.h31(index) && descriptor.g31(index).y30());
    return $this.k3p_1;
  }
  function JsonElementMarker$readIfAbsent$ref($boundThis) {
    var l = function (p0, p1) {
      return readIfAbsent($boundThis, p0, p1);
    };
    l.callableName = 'readIfAbsent';
    return l;
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.j3p_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.k3p_1 = false;
  }
  protoOf(JsonElementMarker).l3p = function (index) {
    this.j3p_1.u38(index);
  };
  protoOf(JsonElementMarker).m3p = function () {
    return this.j3p_1.v38();
  };
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.n3p('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.i3l_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.o3p('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.c31() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.i31().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
  }
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function UnknownKeyException(key, input) {
    return JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "'.\n" + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.\n" + ('Current input: ' + toString(minify(input))));
  }
  function InvalidFloatingPointEncoded(value, output) {
    return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    var tmp4 = coerceAtLeast(start_0, 0);
    // Inline function 'kotlin.text.substring' call
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp4, endIndex_0)) + suffix;
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$1 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.e31(name);
    if (!(index === -3))
      return index;
    if (!json.u3k_1.r3m_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.d31(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.i31(), CLASS_getInstance()) ? json.u3k_1.s3m_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.q3p(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.u3k_1.t3m_1 && equals(descriptor.i31(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).i2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.q3p(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.k31();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.f31(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          if (element instanceof JsonNames) {
            destination.e(element);
          }
        }
        var tmp9_safe_receiver = singleOrNull(destination);
        var tmp10_safe_receiver = tmp9_safe_receiver == null ? null : tmp9_safe_receiver.r3p_1;
        if (tmp10_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp10_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp10_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.d31(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.s3p(_this__u8e3s4, i, _this__u8e3s4.d31(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.q()) {
      // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.i31(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).g2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.d31(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.d31(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.l2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.k31();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = fillArrayVal(Array(tmp_0), null);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.d31(tmp_2);
        tmp_1[tmp_2] = $strategy.s3p($this_serializationNamesIndices, tmp_2, baseName);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.v3p_1, 2);
    $this.t3p_1 = copyOf($this.t3p_1, newSize);
    $this.u3p_1 = copyOf_0($this.u3p_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.t3p_1 = fillArrayVal(Array(8), null);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.u3p_1 = tmp_2;
    this.v3p_1 = -1;
  }
  protoOf(JsonPath).w3p = function (sd) {
    this.v3p_1 = this.v3p_1 + 1 | 0;
    var depth = this.v3p_1;
    if (depth === this.t3p_1.length) {
      resize(this);
    }
    this.t3p_1[depth] = sd;
  };
  protoOf(JsonPath).x3p = function (index) {
    this.u3p_1[this.v3p_1] = index;
  };
  protoOf(JsonPath).y3p = function (key) {
    var tmp;
    if (!(this.u3p_1[this.v3p_1] === -2)) {
      this.v3p_1 = this.v3p_1 + 1 | 0;
      tmp = this.v3p_1 === this.t3p_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.t3p_1[this.v3p_1] = key;
    this.u3p_1[this.v3p_1] = -2;
  };
  protoOf(JsonPath).z3p = function () {
    if (this.u3p_1[this.v3p_1] === -2) {
      this.t3p_1[this.v3p_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).a3q = function () {
    var depth = this.v3p_1;
    if (this.u3p_1[depth] === -2) {
      this.u3p_1[depth] = -1;
      this.v3p_1 = this.v3p_1 - 1 | 0;
    }
    if (!(this.v3p_1 === -1)) {
      this.v3p_1 = this.v3p_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).b3q = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>' call
    this_0.p8('$');
    // Inline function 'kotlin.repeat' call
    var times = this.v3p_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>.<anonymous>' call
        var element = this.t3p_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.i31(), LIST_getInstance())) {
            if (!(this.u3p_1[index] === -1)) {
              this_0.p8('[');
              this_0.qc(this.u3p_1[index]);
              this_0.p8(']');
            }
          } else {
            var idx = this.u3p_1[index];
            if (idx >= 0) {
              this_0.p8('.');
              this_0.p8(element.d31(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.p8('[');
            this_0.p8("'");
            this_0.o8(element);
            this_0.p8("'");
            this_0.p8(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.b3q();
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().j();
    var tmp$ret$0 = fillArrayVal(Array(size), null);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.l34(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.l3q_1.p3q(6);
    if ($this.l3q_1.q3q() === 4) {
      $this.l3q_1.o3p('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.l3q_1.r3q()) {
      var key = $this.m3q_1 ? $this.l3q_1.t3q() : $this.l3q_1.s3q();
      $this.l3q_1.p3q(5);
      // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObject.<anonymous>' call
      var element = $this.u3q();
      // Inline function 'kotlin.collections.set' call
      result.l2(key, element);
      lastToken = $this.l3q_1.v3q();
      var tmp13_subject = lastToken;
      if (tmp13_subject !== 4)
        if (tmp13_subject === 7)
          break $l$loop;
        else {
          $this.l3q_1.o3p('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.l3q_1.p3q(7);
    } else if (lastToken === 4) {
      if (!$this.n3q_1) {
        invalidTrailingComma($this.l3q_1);
      }
      $this.l3q_1.p3q(7);
    }
    return new JsonObject(result);
  }
  function readObject_0(_this__u8e3s4, $this, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  }
  function readArray($this) {
    var lastToken = $this.l3q_1.v3q();
    if ($this.l3q_1.q3q() === 4) {
      $this.l3q_1.o3p('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.l3q_1.r3q()) {
      var element = $this.u3q();
      result.e(element);
      lastToken = $this.l3q_1.v3q();
      if (!(lastToken === 4)) {
        var tmp0 = $this.l3q_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.i3l_1;
        if (!condition) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readArray.<anonymous>' call
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.o3p(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.l3q_1.p3q(9);
    } else if (lastToken === 4) {
      if (!$this.n3q_1) {
        invalidTrailingComma($this.l3q_1, 'array');
      }
      $this.l3q_1.p3q(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.m3q_1 || !isString) {
      tmp = $this.l3q_1.t3q();
    } else {
      tmp = $this.l3q_1.s3q();
    }
    var string = tmp;
    if (!isString && string === 'null')
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.t3r_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).y3r = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.z3r($this$DeepRecursiveFunction, it, $completion);
    tmp.k9_1 = Unit_instance;
    tmp.l9_1 = null;
    return tmp.q9();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).fa = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.y3r(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 3;
            this.w3r_1 = this.t3r_1.l3q_1.q3q();
            if (this.w3r_1 === 1) {
              this.x3r_1 = readValue(this.t3r_1, true);
              this.i9_1 = 2;
              continue $sm;
            } else {
              if (this.w3r_1 === 0) {
                this.x3r_1 = readValue(this.t3r_1, false);
                this.i9_1 = 2;
                continue $sm;
              } else {
                if (this.w3r_1 === 6) {
                  this.i9_1 = 1;
                  suspendResult = readObject_0(this.u3r_1, this.t3r_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.w3r_1 === 8) {
                    this.x3r_1 = readArray(this.t3r_1);
                    this.i9_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.t3r_1.l3q_1.o3p("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.x3r_1 = suspendResult;
            this.i9_1 = 2;
            continue $sm;
          case 2:
            return this.x3r_1;
          case 3:
            throw this.l9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.j9_1 === 3) {
          throw e;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).z3r = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.t3r_1, completion);
    i.u3r_1 = $this$DeepRecursiveFunction;
    i.v3r_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.y3r($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e3r_1 = _this__u8e3s4;
    this.f3r_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).q9 = function () {
    var suspendResult = this.k9_1;
    $sm: do
      try {
        var tmp = this.i9_1;
        switch (tmp) {
          case 0:
            this.j9_1 = 5;
            var tmp_0 = this;
            tmp_0.g3r_1 = this.e3r_1;
            this.h3r_1 = this.g3r_1;
            this.i3r_1 = this.h3r_1.l3q_1.p3q(6);
            if (this.h3r_1.l3q_1.q3q() === 4) {
              this.h3r_1.l3q_1.o3p('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.j3r_1 = LinkedHashMap_init_$Create$();
            this.i9_1 = 1;
            continue $sm;
          case 1:
            if (!this.h3r_1.l3q_1.r3q()) {
              this.i9_1 = 4;
              continue $sm;
            }

            this.k3r_1 = this.h3r_1.m3q_1 ? this.h3r_1.l3q_1.t3q() : this.h3r_1.l3q_1.s3q();
            this.h3r_1.l3q_1.p3q(5);
            this.i9_1 = 2;
            suspendResult = this.f3r_1.fj(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.j3r_1;
            var key = this.k3r_1;
            tmp0.l2(key, element);
            this.i3r_1 = this.h3r_1.l3q_1.v3q();
            var tmp13_subject = this.i3r_1;
            if (tmp13_subject === 4) {
              this.i9_1 = 3;
              continue $sm;
            } else {
              if (tmp13_subject === 7) {
                this.i9_1 = 4;
                continue $sm;
              } else {
                this.h3r_1.l3q_1.o3p('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.i9_1 = 1;
            continue $sm;
          case 4:
            if (this.i3r_1 === 6) {
              this.h3r_1.l3q_1.p3q(7);
            } else if (this.i3r_1 === 4) {
              if (!this.h3r_1.n3q_1) {
                invalidTrailingComma(this.h3r_1.l3q_1);
              }
              this.h3r_1.l3q_1.p3q(7);
            }

            return new JsonObject(this.j3r_1);
          case 5:
            throw this.l9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.j9_1 === 5) {
          throw e;
        } else {
          this.i9_1 = this.j9_1;
          this.l9_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.l3q_1 = lexer;
    this.m3q_1 = configuration.i3m_1;
    this.n3q_1 = configuration.u3m_1;
    this.o3q_1 = 0;
  }
  protoOf(JsonTreeReader).u3q = function () {
    var token = this.l3q_1.q3q();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.o3q_1 = this.o3q_1 + 1 | 0;
      if (this.o3q_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.o3q_1 = this.o3q_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.l3q_1.o3p('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.l31().g();
    while (_iterator__ex2g4s.h()) {
      var annotation = _iterator__ex2g4s.i();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.a3s_1;
    }
    return json.u3k_1.p3m_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.y2z()).o(classDiscriminator)) {
      var baseName = serializer.y2z().c31();
      var actualName = actualSerializer.y2z().c31();
      // Inline function 'kotlin.error' call
      var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation or fall back to array polymorphism';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function checkKind(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
    return validateIfSealed(serializer, actualSerializer, classDiscriminator);
  }
  function checkKind_0($this, descriptor, actualClass) {
    var kind = descriptor.i31();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.fb() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.b3s_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.fb() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.k31();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.d31(i);
        if (name === $this.c3s_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.b3s_1 = useArrayPolymorphism;
    this.c3s_1 = discriminator;
  }
  protoOf(PolymorphismValidator).m3i = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).p3i = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.y2z();
    checkKind_0(this, descriptor, actualClass);
    if (!this.b3s_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).q3i = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).r3i = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.p3p_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).d3s = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.p3p_1;
    var value_0 = this_0.i2(descriptor);
    var tmp;
    if (value_0 == null) {
      // Inline function 'kotlinx.serialization.json.internal.DescriptorSchemaCache.set.<anonymous>' call
      var answer = createMapForCache(2);
      this_0.l2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp2 = tmp;
    var tmp3 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp2.l2(tmp3, value_1);
  };
  protoOf(DescriptorSchemaCache).q3p = function (descriptor, key, defaultValue) {
    var tmp18_safe_receiver = this.e3s(descriptor, key);
    if (tmp18_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp18_safe_receiver;
    }
    var value = defaultValue();
    this.d3s(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).e3s = function (descriptor, key) {
    var tmp19_safe_receiver = this.p3p_1.i2(descriptor);
    var tmp;
    if (tmp19_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp19_safe_receiver.i2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.f3s_1 = discriminatorToSkip;
  }
  function trySkip(_this__u8e3s4, $this, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.f3s_1 === unknownKey) {
      _this__u8e3s4.f3s_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.l33(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.c3l_1.q3q() === 4) {
      $this.c3l_1.o3p('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.e3l_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.e3l_1 === -1)) {
        hasComma = $this.c3l_1.h3s();
      }
    } else {
      $this.c3l_1.g3s(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.c3l_1.r3q()) {
      if (decodingKey) {
        if ($this.e3l_1 === -1) {
          var tmp0 = $this.c3l_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.i3l_1;
          if (!condition) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.o3p(tmp$ret$0, position);
          }
        } else {
          var tmp3 = $this.c3l_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp3.i3l_1;
          if (!condition_0) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$1 = 'Expected comma after the key-value pair';
            tmp3.o3p(tmp$ret$1, position_0);
          }
        }
      }
      $this.e3l_1 = $this.e3l_1 + 1 | 0;
      tmp = $this.e3l_1;
    } else {
      if (hasComma && !$this.a3l_1.u3k_1.u3m_1) {
        invalidTrailingComma($this.c3l_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.a3l_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.h31(index);
      var elementDescriptor = descriptor.g31(index);
      var tmp;
      if (isOptional && !elementDescriptor.y30()) {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        tmp = $this.c3l_1.i3s(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.i31(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.y30()) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          tmp_0 = $this.c3l_1.i3s(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        var tmp0_elvis_lhs = $this.c3l_1.j3s($this.g3l_1.i3m_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.u3k_1.l3m_1 && elementDescriptor.y30();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          $this.c3l_1.s3q();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.c3l_1.h3s();
    while ($this.c3l_1.r3q()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.c3l_1.g3s(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.a3l_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.g3l_1.n3m_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.c3l_1.h3s();
          tmp_0 = false;
        } else {
          var tmp23_safe_receiver = $this.h3l_1;
          if (tmp23_safe_receiver == null)
            null;
          else {
            tmp23_safe_receiver.l3p(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, key);
      }
    }
    if (hasComma && !$this.a3l_1.u3k_1.u3m_1) {
      invalidTrailingComma($this.c3l_1);
    }
    var tmp24_safe_receiver = $this.h3l_1;
    var tmp0_elvis_lhs = tmp24_safe_receiver == null ? null : tmp24_safe_receiver.m3p();
    return tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
  }
  function handleUnknown($this, key) {
    if ($this.g3l_1.h3m_1 || trySkip($this.f3l_1, $this, key)) {
      $this.c3l_1.l3s($this.g3l_1.i3m_1);
    } else {
      $this.c3l_1.k3s(key);
    }
    return $this.c3l_1.h3s();
  }
  function decodeListIndex($this) {
    var hasComma = $this.c3l_1.h3s();
    var tmp;
    if ($this.c3l_1.r3q()) {
      if (!($this.e3l_1 === -1) && !hasComma) {
        $this.c3l_1.o3p('Expected end of the array or comma');
      }
      $this.e3l_1 = $this.e3l_1 + 1 | 0;
      tmp = $this.e3l_1;
    } else {
      if (hasComma && !$this.a3l_1.u3k_1.u3m_1) {
        invalidTrailingComma($this.c3l_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.g3l_1.i3m_1) {
      tmp = $this.c3l_1.n3s();
    } else {
      tmp = $this.c3l_1.m3s();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.a3l_1 = json;
    this.b3l_1 = mode;
    this.c3l_1 = lexer;
    this.d3l_1 = this.a3l_1.j33();
    this.e3l_1 = -1;
    this.f3l_1 = discriminatorHolder;
    this.g3l_1 = this.a3l_1.u3k_1;
    this.h3l_1 = this.g3l_1.l3m_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).x3m = function () {
    return this.a3l_1;
  };
  protoOf(StreamingJsonDecoder).j33 = function () {
    return this.d3l_1;
  };
  protoOf(StreamingJsonDecoder).y3m = function () {
    return (new JsonTreeReader(this.a3l_1.u3k_1, this.c3l_1)).u3q();
  };
  protoOf(StreamingJsonDecoder).u32 = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.a3l_1.u3k_1.o3m_1;
      }
      if (tmp) {
        return deserializer.a30(this);
      }
      var discriminator = classDiscriminator(deserializer.y2z(), this.a3l_1);
      var tmp0_elvis_lhs = this.c3l_1.o3s(discriminator, this.g3l_1.i3m_1);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var tmp1 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp_1;
          if (!(tmp1 instanceof AbstractPolymorphicSerializer)) {
            tmp_1 = true;
          } else {
            tmp_1 = this.x3m().u3k_1.o3m_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp1.a30(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp1.y2z(), this.x3m());
          var tmp0 = this.y3m();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp1.y2z().c31();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).fb();
            var tmp_3 = getKClassFromExpression(tmp0).fb();
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeSerializableValue.<anonymous>' call
            var tmp$ret$1 = this.c3l_1.j3l_1.b3q();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp16_safe_receiver = jsonTree.b3n(discriminator_0);
          var tmp17_safe_receiver = tmp16_safe_receiver == null ? null : get_jsonPrimitive(tmp16_safe_receiver);
          var type = tmp17_safe_receiver == null ? null : get_contentOrNull(tmp17_safe_receiver);
          var tmp_4;
          try {
            tmp_4 = findPolymorphicSerializer(tmp1, this, type);
          } catch ($p) {
            var tmp_5;
            if ($p instanceof SerializationException) {
              var it = $p;
              throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
            } else {
              throw $p;
            }
          }
          var tmp_6 = tmp_4;
          var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.x3m(), discriminator_0, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type_0 = tmp_0;
      var tmp_7;
      try {
        tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
      } catch ($p) {
        var tmp_8;
        if ($p instanceof SerializationException) {
          var it_0 = $p;
          var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
          this.c3l_1.o3p(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.f3l_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.a30(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.s30_1, plus(e.message, ' at path: ') + this.c3l_1.j3l_1.b3q(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).v32 = function (descriptor) {
    var newMode = switchMode(this.a3l_1, descriptor);
    this.c3l_1.j3l_1.w3p(descriptor);
    this.c3l_1.g3s(newMode.r3s_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.p2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.a3l_1, newMode, this.c3l_1, descriptor, this.f3l_1);
        break;
      default:
        var tmp_0;
        if (this.b3l_1.equals(newMode) && this.a3l_1.u3k_1.l3m_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.a3l_1, newMode, this.c3l_1, descriptor, this.f3l_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).w32 = function (descriptor) {
    if (this.a3l_1.u3k_1.h3m_1 && descriptor.k31() === 0) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.c3l_1.h3s() && !this.a3l_1.u3k_1.u3m_1) {
      invalidTrailingComma(this.c3l_1, '');
    }
    this.c3l_1.g3s(this.b3l_1.s3s_1);
    this.c3l_1.j3l_1.a3q();
  };
  protoOf(StreamingJsonDecoder).h32 = function () {
    var tmp;
    var tmp21_safe_receiver = this.h3l_1;
    var tmp0_elvis_lhs = tmp21_safe_receiver == null ? null : tmp21_safe_receiver.k3p_1;
    if (!(tmp0_elvis_lhs == null ? false : tmp0_elvis_lhs)) {
      tmp = !this.c3l_1.t3s();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).i32 = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).h33 = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.b3l_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.c3l_1.j3l_1.z3p();
    }
    var value = protoOf(AbstractDecoder).h33.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.c3l_1.j3l_1.y3p(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).l33 = function (descriptor) {
    var index;
    switch (this.b3l_1.p2_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.b3l_1.equals(WriteMode_MAP_getInstance())) {
      this.c3l_1.j3l_1.x3p(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).j32 = function () {
    return this.c3l_1.u3s();
  };
  protoOf(StreamingJsonDecoder).k32 = function () {
    var value = this.c3l_1.m3n();
    if (!value.equals(toLong(value.j3()))) {
      this.c3l_1.o3p("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.j3();
  };
  protoOf(StreamingJsonDecoder).l32 = function () {
    var value = this.c3l_1.m3n();
    if (!value.equals(toLong(value.k3()))) {
      this.c3l_1.o3p("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.k3();
  };
  protoOf(StreamingJsonDecoder).m32 = function () {
    var value = this.c3l_1.m3n();
    if (!value.equals(toLong(value.g1()))) {
      this.c3l_1.o3p("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.g1();
  };
  protoOf(StreamingJsonDecoder).n32 = function () {
    return this.c3l_1.m3n();
  };
  protoOf(StreamingJsonDecoder).o32 = function () {
    var tmp0 = this.c3l_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeFloat.<anonymous>' call
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.a3l_1.u3k_1.q3m_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.c3l_1, result);
  };
  protoOf(StreamingJsonDecoder).p32 = function () {
    var tmp0 = this.c3l_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeDouble.<anonymous>' call
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.a3l_1.u3k_1.q3m_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.c3l_1, result);
  };
  protoOf(StreamingJsonDecoder).q32 = function () {
    var string = this.c3l_1.t3q();
    if (!(string.length === 1)) {
      this.c3l_1.o3p("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).r32 = function () {
    var tmp;
    if (this.g3l_1.i3m_1) {
      tmp = this.c3l_1.n3s();
    } else {
      tmp = this.c3l_1.s3q();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).s32 = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.c3l_1, this.a3l_1) : protoOf(AbstractDecoder).s32.call(this, descriptor);
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.v3s_1 = lexer;
    this.w3s_1 = json.j33();
  }
  protoOf(JsonDecoderForUnsignedTypes).j33 = function () {
    return this.w3s_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).l33 = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).m32 = function () {
    var tmp0 = this.v3s_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeInt.<anonymous>' call
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).n32 = function () {
    var tmp0 = this.v3s_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeLong.<anonymous>' call
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).k32 = function () {
    var tmp0 = this.v3s_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeByte.<anonymous>' call
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).l32 = function () {
    var tmp0 = this.v3s_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.t3q();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeShort.<anonymous>' call
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.o3p("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function encodeTypeInfo($this, discriminator, serialName) {
    $this.c3q_1.i3o();
    $this.y33(discriminator);
    $this.c3q_1.l3o(_Char___init__impl__6a9atx(58));
    $this.c3q_1.k3o();
    $this.y33(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.c3q_1 = composer;
    this.d3q_1 = json;
    this.e3q_1 = mode;
    this.f3q_1 = modeReuseCache;
    this.g3q_1 = this.d3q_1.j33();
    this.h3q_1 = this.d3q_1.u3k_1;
    this.i3q_1 = false;
    this.j3q_1 = null;
    this.k3q_1 = null;
    var i = this.e3q_1.p2_1;
    if (!(this.f3q_1 == null)) {
      if (!(this.f3q_1[i] === null) || !(this.f3q_1[i] === this)) {
        this.f3q_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).x3m = function () {
    return this.d3q_1;
  };
  protoOf(StreamingJsonEncoder).j33 = function () {
    return this.g3q_1;
  };
  protoOf(StreamingJsonEncoder).o34 = function (descriptor, index) {
    return this.h3q_1.g3m_1;
  };
  protoOf(StreamingJsonEncoder).l34 = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.x3m().u3k_1.o3m_1) {
        serializer.z2z(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.x3m().u3k_1.w3m_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.x3m().u3k_1.w3m_1.p2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically.<anonymous>' call

            var it = serializer.y2z().i31();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.y2z(), this.x3m()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically.<anonymous>' call
            var message = 'Value for serializer ' + toString(serializer.y2z()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        }
        checkKind(actual.y2z().i31());
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.encodeSerializableValue.<anonymous>' call
        var serialName = actualSerializer.y2z().c31();
        this.j3q_1 = baseClassDiscriminator;
        this.k3q_1 = serialName;
      }
      actualSerializer.z2z(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).v32 = function (descriptor) {
    var newMode = switchMode(this.d3q_1, descriptor);
    if (!(newMode.r3s_1 === _Char___init__impl__6a9atx(0))) {
      this.c3q_1.l3o(newMode.r3s_1);
      this.c3q_1.g3o();
    }
    var discriminator = this.j3q_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.k3q_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.c31() : tmp0_elvis_lhs);
      this.j3q_1 = null;
      this.k3q_1 = null;
    }
    if (this.e3q_1.equals(newMode)) {
      return this;
    }
    var tmp25_safe_receiver = this.f3q_1;
    var tmp1_elvis_lhs = tmp25_safe_receiver == null ? null : tmp25_safe_receiver[newMode.p2_1];
    return tmp1_elvis_lhs == null ? new StreamingJsonEncoder(this.c3q_1, this.d3q_1, newMode, this.f3q_1) : tmp1_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).w32 = function (descriptor) {
    if (!(this.e3q_1.s3s_1 === _Char___init__impl__6a9atx(0))) {
      this.c3q_1.h3o();
      this.c3q_1.j3o();
      this.c3q_1.l3o(this.e3q_1.s3s_1);
    }
  };
  protoOf(StreamingJsonEncoder).n33 = function (descriptor, index) {
    switch (this.e3q_1.p2_1) {
      case 1:
        if (!this.c3q_1.f3o_1) {
          this.c3q_1.l3o(_Char___init__impl__6a9atx(44));
        }

        this.c3q_1.i3o();
        break;
      case 2:
        if (!this.c3q_1.f3o_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.c3q_1.l3o(_Char___init__impl__6a9atx(44));
            this.c3q_1.i3o();
            tmp_0 = true;
          } else {
            this.c3q_1.l3o(_Char___init__impl__6a9atx(58));
            this.c3q_1.k3o();
            tmp_0 = false;
          }
          tmp.i3q_1 = tmp_0;
        } else {
          this.i3q_1 = true;
          this.c3q_1.i3o();
        }

        break;
      case 3:
        if (index === 0)
          this.i3q_1 = true;
        if (index === 1) {
          this.c3q_1.l3o(_Char___init__impl__6a9atx(44));
          this.c3q_1.k3o();
          this.i3q_1 = false;
        }

        break;
      default:
        if (!this.c3q_1.f3o_1) {
          this.c3q_1.l3o(_Char___init__impl__6a9atx(44));
        }

        this.c3q_1.i3o();
        this.y33(getJsonElementName(descriptor, this.d3q_1, index));
        this.c3q_1.l3o(_Char___init__impl__6a9atx(58));
        this.c3q_1.k3o();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).z33 = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.c3q_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.c3q_1;
      } else {
        var tmp1 = this.c3q_1.e3o_1;
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.encodeInline.stub_for_inlining' call
        var p1 = this.i3q_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp1, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.d3q_1, this.e3q_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.c3q_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.c3q_1;
      } else {
        var tmp4 = this.c3q_1.e3o_1;
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.encodeInline.stub_for_inlining' call
        var p1_0 = this.i3q_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp4, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.d3q_1, this.e3q_1, null);
    } else if (!(this.j3q_1 == null)) {
      // Inline function 'kotlin.apply' call
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.encodeInline.<anonymous>' call
      this.k3q_1 = descriptor.c31();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).z33.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).p33 = function () {
    this.c3q_1.n3o('null');
  };
  protoOf(StreamingJsonEncoder).q33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.w3o(value);
    }
  };
  protoOf(StreamingJsonEncoder).r33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.r3o(value);
    }
  };
  protoOf(StreamingJsonEncoder).s33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.t3o(value);
    }
  };
  protoOf(StreamingJsonEncoder).t33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.u3o(value);
    }
  };
  protoOf(StreamingJsonEncoder).u33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.v3o(value);
    }
  };
  protoOf(StreamingJsonEncoder).v33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.p3o(value);
    }
    if (!this.h3q_1.q3m_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.c3q_1.e3o_1));
    }
  };
  protoOf(StreamingJsonEncoder).w33 = function (value) {
    if (this.i3q_1) {
      this.y33(value.toString());
    } else {
      this.c3q_1.q3o(value);
    }
    if (!this.h3q_1.q3m_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.c3q_1.e3o_1));
    }
  };
  protoOf(StreamingJsonEncoder).x33 = function (value) {
    this.y33(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).y33 = function (value) {
    return this.c3q_1.x3o(value);
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.j31() && get_unsignedNumberDescriptors().o(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.j31() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).y2z(), serializer_0(Companion_getInstance()).y2z(), serializer_2(Companion_getInstance_1()).y2z(), serializer_3(Companion_getInstance_2()).y2z()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.q8(_Char___init__impl__6a9atx(34));
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          _this__u8e3s4.oc(value, lastPos, i);
          _this__u8e3s4.p8(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.oc(value, lastPos, value.length);
    else
      _this__u8e3s4.p8(value);
    _this__u8e3s4.q8(_Char___init__impl__6a9atx(34));
  }
  function toBooleanStrictOrNull_0(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.arrayOfNulls' call
      // Inline function 'kotlin.apply' call
      var this_0 = fillArrayVal(Array(93), null);
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_STRINGS.<anonymous>' call
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_MARKERS.<anonymous>' call
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      var tmp = Char__toInt_impl_vasixd(this_8);
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(34);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_9);
      this_7[tmp] = toByte(tmp$ret$1);
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(92);
      var tmp_0 = Char__toInt_impl_vasixd(this_10);
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(92);
      var tmp$ret$3 = Char__toInt_impl_vasixd(this_11);
      this_7[tmp_0] = toByte(tmp$ret$3);
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(9);
      var tmp_1 = Char__toInt_impl_vasixd(this_12);
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(116);
      var tmp$ret$5 = Char__toInt_impl_vasixd(this_13);
      this_7[tmp_1] = toByte(tmp$ret$5);
      // Inline function 'kotlin.code' call
      var this_14 = _Char___init__impl__6a9atx(8);
      var tmp_2 = Char__toInt_impl_vasixd(this_14);
      // Inline function 'kotlin.code' call
      var this_15 = _Char___init__impl__6a9atx(98);
      var tmp$ret$7 = Char__toInt_impl_vasixd(this_15);
      this_7[tmp_2] = toByte(tmp$ret$7);
      // Inline function 'kotlin.code' call
      var this_16 = _Char___init__impl__6a9atx(10);
      var tmp_3 = Char__toInt_impl_vasixd(this_16);
      // Inline function 'kotlin.code' call
      var this_17 = _Char___init__impl__6a9atx(110);
      var tmp$ret$9 = Char__toInt_impl_vasixd(this_17);
      this_7[tmp_3] = toByte(tmp$ret$9);
      // Inline function 'kotlin.code' call
      var this_18 = _Char___init__impl__6a9atx(13);
      var tmp_4 = Char__toInt_impl_vasixd(this_18);
      // Inline function 'kotlin.code' call
      var this_19 = _Char___init__impl__6a9atx(114);
      var tmp$ret$11 = Char__toInt_impl_vasixd(this_19);
      this_7[tmp_4] = toByte(tmp$ret$11);
      // Inline function 'kotlin.code' call
      var this_20 = _Char___init__impl__6a9atx(102);
      var tmp$ret$12 = Char__toInt_impl_vasixd(this_20);
      this_7[12] = toByte(tmp$ret$12);
      ESCAPE_MARKERS = this_7;
    }
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.d3t(tag), toString($this.e3t()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.z3s_1 = json;
    this.a3t_1 = value;
    this.b3t_1 = polymorphicDiscriminator;
    this.c3t_1 = this.x3m().u3k_1;
  }
  protoOf(AbstractJsonTreeDecoder).x3m = function () {
    return this.z3s_1;
  };
  protoOf(AbstractJsonTreeDecoder).w = function () {
    return this.a3t_1;
  };
  protoOf(AbstractJsonTreeDecoder).j33 = function () {
    return this.x3m().j33();
  };
  protoOf(AbstractJsonTreeDecoder).e3t = function () {
    var tmp28_safe_receiver = this.d3g();
    var tmp;
    if (tmp28_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.currentObject.<anonymous>' call
      tmp = this.f3t(tmp28_safe_receiver);
    }
    var tmp0_elvis_lhs = tmp;
    return tmp0_elvis_lhs == null ? this.w() : tmp0_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).d3t = function (currentTag) {
    return this.f3g() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).y3m = function () {
    return this.e3t();
  };
  protoOf(AbstractJsonTreeDecoder).u32 = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.x3m().u3k_1.o3m_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.a30(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.y2z(), this.x3m());
      var tmp0 = this.y3m();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.y2z().c31();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).fb();
        var tmp_1 = getKClassFromExpression(tmp0).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeSerializableValue.stub_for_inlining' call
        var tmp$ret$1 = this.f3g();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp16_safe_receiver = jsonTree.b3n(discriminator);
      var tmp17_safe_receiver = tmp16_safe_receiver == null ? null : get_jsonPrimitive(tmp16_safe_receiver);
      var type = tmp17_safe_receiver == null ? null : get_contentOrNull(tmp17_safe_receiver);
      var tmp_2;
      try {
        tmp_2 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof SerializationException) {
          var it = $p;
          throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
        } else {
          throw $p;
        }
      }
      var tmp_4 = tmp_2;
      var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
      tmp$ret$0 = readPolymorphicJson(this.x3m(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).e3g = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).v32 = function (descriptor) {
    var currentObject = this.e3t();
    var tmp29_subject = descriptor.i31();
    var tmp;
    var tmp_0;
    if (equals(tmp29_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp29_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.x3m();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.c31();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).fb();
        var tmp_3 = getKClassFromExpression(currentObject).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.f3g();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp29_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.x3m();
        var keyDescriptor = carrierDescriptor(descriptor.g31(0), this_0.j33());
        var keyKind = keyDescriptor.i31();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
          var tmp_6 = this.x3m();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.c31();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).fb();
            var tmp_8 = getKClassFromExpression(currentObject).fb();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
            var tmp$ret$3 = this.f3g();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.u3k_1.j3m_1) {
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
            var tmp_9 = this.x3m();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.c31();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).fb();
              var tmp_11 = getKClassFromExpression(currentObject).fb();
              // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
              var tmp$ret$7 = this.f3g();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.x3m();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.c31();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).fb();
          var tmp_14 = getKClassFromExpression(currentObject).fb();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
          var tmp$ret$12 = this.f3g();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.b3t_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).w32 = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).h32 = function () {
    var tmp = this.e3t();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).g3t = function (tag) {
    return !(this.f3t(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).h3g = function (tag) {
    return this.g3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).h3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedBoolean.stub_for_inlining' call
        var tmp0_elvis_lhs = get_booleanOrNull(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).i3g = function (tag) {
    return this.h3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).i3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedByte.<anonymous>' call
        var result = get_int(literal);
        var tmp0_elvis_lhs = (-128 <= result ? result <= 127 : false) ? toByte(result) : null;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).j3g = function (tag) {
    return this.i3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).j3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedShort.<anonymous>' call
        var result = get_int(literal);
        var tmp0_elvis_lhs = (-32768 <= result ? result <= 32767 : false) ? toShort(result) : null;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).k3g = function (tag) {
    return this.j3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).k3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedInt.<anonymous>' call
        var tmp0_elvis_lhs = get_int(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).l3g = function (tag) {
    return this.k3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).l3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedLong.<anonymous>' call
        var tmp0_elvis_lhs = get_long(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).m3g = function (tag) {
    return this.l3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).m3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedFloat.<anonymous>' call
        var tmp0_elvis_lhs = get_float(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.x3m().u3k_1.q3m_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.e3t()));
  };
  protoOf(AbstractJsonTreeDecoder).n3g = function (tag) {
    return this.m3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).n3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedDouble.<anonymous>' call
        var tmp0_elvis_lhs = get_double(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.x3m().u3k_1.q3m_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.e3t()));
  };
  protoOf(AbstractJsonTreeDecoder).o3g = function (tag) {
    return this.n3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).o3t = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.f3t(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).fb();
        var tmp_0 = getKClassFromExpression(value).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedChar.<anonymous>' call
        var tmp0_elvis_lhs = new Char(single(literal.e3n()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1.k1_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).p3g = function (tag) {
    return this.o3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).p3t = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f3t(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).fb();
      var tmp_0 = getKClassFromExpression(value).fb();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
      var tmp$ret$0 = this.d3t(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.d3t(tag), toString(this.e3t()));
    if (!value_0.g3n_1 && !this.x3m().u3k_1.i3m_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.d3t(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.e3t()));
    }
    return value_0.i3n_1;
  };
  protoOf(AbstractJsonTreeDecoder).q3g = function (tag) {
    return this.p3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).q3t = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.x3m();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp1 = this.f3t(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.c31();
      if (!(tmp1 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).fb();
        var tmp_2 = getKClassFromExpression(tmp1).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.d3t(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp1.e3n());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.x3m());
    } else {
      tmp = protoOf(NamedValueDecoder).r3g.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).r3g = function (tag, inlineDescriptor) {
    return this.q3t((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).s32 = function (descriptor) {
    return !(this.d3g() == null) ? protoOf(NamedValueDecoder).s32.call(this, descriptor) : (new JsonPrimitiveDecoder(this.x3m(), this.w(), this.b3t_1)).s32(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.x3m();
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.h31(index);
      var elementDescriptor = descriptor.g31(index);
      var tmp;
      if (isOptional && !elementDescriptor.y30()) {
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_0 = $this.f3t(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.i31(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.y30()) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
          var tmp_2 = $this.f3t(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_3 = $this.f3t(tag);
        var tmp30_safe_receiver = tmp_3 instanceof JsonPrimitive ? tmp_3 : null;
        var tmp0_elvis_lhs = tmp30_safe_receiver == null ? null : get_contentOrNull(tmp30_safe_receiver);
        var tmp_4;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_4 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_4;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.u3k_1.l3m_1 && elementDescriptor.y30();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue.<anonymous>' call
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function absenceIsNull($this, descriptor, index) {
    $this.a3u_1 = (!$this.x3m().u3k_1.l3m_1 && !descriptor.h31(index) && descriptor.g31(index).y30());
    return $this.a3u_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.x3t_1 = value;
    this.y3t_1 = polyDescriptor;
    this.z3t_1 = 0;
    this.a3u_1 = false;
  }
  protoOf(JsonTreeDecoder).w = function () {
    return this.x3t_1;
  };
  protoOf(JsonTreeDecoder).l33 = function (descriptor) {
    while (this.z3t_1 < descriptor.k31()) {
      var _unary__edvuaz = this.z3t_1;
      this.z3t_1 = _unary__edvuaz + 1 | 0;
      var name = this.y3f(descriptor, _unary__edvuaz);
      var index = this.z3t_1 - 1 | 0;
      this.a3u_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.w();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).g2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.c3t_1.n3m_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).h32 = function () {
    return !this.a3u_1 && protoOf(AbstractJsonTreeDecoder).h32.call(this);
  };
  protoOf(JsonTreeDecoder).z3f = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.x3m());
    var baseName = descriptor.d31(index);
    if (strategy == null) {
      if (!this.c3t_1.r3m_1)
        return baseName;
      if (this.w().j2().o(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.x3m(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.w().j2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.elementName.<anonymous>' call
        if (deserializationNamesMap_0.i2(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp31_safe_receiver = tmp$ret$1;
    if (tmp31_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp31_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.s3p(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).f3t = function (tag) {
    return getValue(this.w(), tag);
  };
  protoOf(JsonTreeDecoder).v32 = function (descriptor) {
    if (descriptor === this.y3t_1) {
      var tmp = this.x3m();
      var tmp1 = this.e3t();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.y3t_1.c31();
      if (!(tmp1 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).fb();
        var tmp_1 = getKClassFromExpression(tmp1).fb();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast.<anonymous>' call
        var tmp$ret$0 = this.f3g();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      return new JsonTreeDecoder(tmp, tmp1, this.b3t_1, this.y3t_1);
    }
    return protoOf(AbstractJsonTreeDecoder).v32.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).w32 = function (descriptor) {
    var tmp;
    if (this.c3t_1.h3m_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.i31();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.x3m());
    var tmp_1;
    if (strategy == null && !this.c3t_1.r3m_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.x3m(), descriptor).j2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp33_safe_receiver = get_schemaCache(this.x3m()).e3s(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp33_safe_receiver == null ? null : tmp33_safe_receiver.j2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.w().j2().g();
    while (_iterator__ex2g4s.h()) {
      var key = _iterator__ex2g4s.i();
      if (!names.o(key) && !(key === this.b3t_1)) {
        throw UnknownKeyException(key, this.w().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.h3u_1 = value;
    this.i3u_1 = this.h3u_1.j();
    this.j3u_1 = -1;
  }
  protoOf(JsonTreeListDecoder).w = function () {
    return this.h3u_1;
  };
  protoOf(JsonTreeListDecoder).z3f = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).f3t = function (tag) {
    return this.h3u_1.p(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).l33 = function (descriptor) {
    while (this.j3u_1 < (this.i3u_1 - 1 | 0)) {
      this.j3u_1 = this.j3u_1 + 1 | 0;
      return this.j3u_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.q3u_1 = value;
    this.s3g('primitive');
  }
  protoOf(JsonPrimitiveDecoder).w = function () {
    return this.q3u_1;
  };
  protoOf(JsonPrimitiveDecoder).l33 = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).f3t = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      // Inline function 'kotlinx.serialization.json.internal.JsonPrimitiveDecoder.currentElement.<anonymous>' call
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.q3u_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.b3v_1 = value;
    this.c3v_1 = toList(this.b3v_1.j2());
    this.d3v_1 = imul(this.c3v_1.j(), 2);
    this.e3v_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).w = function () {
    return this.b3v_1;
  };
  protoOf(JsonTreeMapDecoder).z3f = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.c3v_1.p(i);
  };
  protoOf(JsonTreeMapDecoder).l33 = function (descriptor) {
    while (this.e3v_1 < (this.d3v_1 - 1 | 0)) {
      this.e3v_1 = this.e3v_1 + 1 | 0;
      return this.e3v_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).f3t = function (tag) {
    return (this.e3v_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.b3v_1, tag);
  };
  protoOf(JsonTreeMapDecoder).w32 = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.y2z())).u32(deserializer);
  }
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values() {
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_instance;
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  }
  var $ENTRIES;
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.r3s_1 = begin;
    this.s3s_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp36_subject = desc.i31();
    var tmp;
    if (tmp36_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp36_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp36_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.g31(0), _this__u8e3s4.j33());
          var keyKind = keyDescriptor.i31();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.u3k_1.j3m_1) {
              // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.i31(), CONTEXTUAL_getInstance())) {
      var tmp37_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp0_elvis_lhs = tmp37_safe_receiver == null ? null : carrierDescriptor(tmp37_safe_receiver, module_0);
      tmp = tmp0_elvis_lhs == null ? _this__u8e3s4 : tmp0_elvis_lhs;
    } else if (_this__u8e3s4.j31()) {
      tmp = carrierDescriptor(_this__u8e3s4.g31(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.f3v(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.f3v(lastPosition, currentPosition);
    var result = $this.l3l_1.toString();
    $this.l3l_1.tc(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.k3l_1);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.takePeeked.<anonymous>' call
    $this.k3l_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.g3v(), $this.i3l_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.h3v(currentPosition);
    if (currentPosition === -1) {
      $this.o3p('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.g3v();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.g3v(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.o3p("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.l3l_1.q8(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.i3l_1 = startPos;
      $this.i3v();
      if (($this.i3l_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.o3p('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.i3l_1);
    }
    $this.l3l_1.q8(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.o3p("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.h3v(start);
    if (current >= charSequenceLength($this.g3v()) || current === -1) {
      $this.o3p('EOF');
    }
    var tmp = $this.g3v();
    var _unary__edvuaz = current;
    current = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(tmp, _unary__edvuaz);
    var tmp42_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp42_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp42_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.o3p("Expected valid boolean literal prefix, but had '" + $this.t3q() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.g3v()) - current | 0) < literalSuffix.length) {
      $this.o3p('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.g3v(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.o3p("Expected valid boolean literal prefix, but had '" + $this.t3q() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.i3l_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.l3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.l3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.i3l_1 = 0;
    this.j3l_1 = new JsonPath();
    this.k3l_1 = null;
    this.l3l_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).i3v = function () {
  };
  protoOf(AbstractJsonLexer).h3s = function () {
    var current = this.j3v();
    var source = this.g3v();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.i3l_1 = this.i3l_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).k3v = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).m3l = function () {
    var nextToken = this.v3q();
    if (!(nextToken === 10)) {
      this.o3p('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.g3v(), this.i3l_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).p3q = function (expected) {
    var token = this.v3q();
    if (!(token === expected)) {
      this.l3v(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).m3v = function (expected) {
    if (this.i3l_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.i3l_1;
        try {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.unexpectedToken.<anonymous>' call
          this.i3l_1 = this.i3l_1 - 1 | 0;
          tmp$ret$1 = this.t3q();
          break $l$block;
        }finally {
          this.i3l_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.n3p("Expected string literal but 'null' literal was found", this.i3l_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.l3v(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).n3v = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.i3l_1 - 1 | 0 : this.i3l_1;
    var s = this.i3l_1 === charSequenceLength(this.g3v()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.g3v(), position));
    this.o3p('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).l3v = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.n3v(expectedToken, wasConsumed) : $super.n3v.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).q3q = function () {
    var source = this.g3v();
    var cpos = this.i3l_1;
    $l$loop_0: while (true) {
      cpos = this.h3v(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.i3l_1 = cpos;
      return charToTokenClass(ch);
    }
    this.i3l_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).i3s = function (doConsume) {
    var current = this.j3v();
    current = this.h3v(current);
    var len = charSequenceLength(this.g3v()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.g3v(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.g3v(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.i3l_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).t3s = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.i3s(doConsume) : $super.i3s.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).j3s = function (isLenient) {
    var token = this.q3q();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.t3q();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.s3q();
    }
    var string = tmp;
    this.k3l_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).o3v = function () {
    this.k3l_1 = null;
  };
  protoOf(AbstractJsonLexer).p3v = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.g3v();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).s3q = function () {
    if (!(this.k3l_1 == null)) {
      return takePeeked(this);
    }
    return this.m3s();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.h3v(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.o3p('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.f3v(lastPosition, currentPosition);
          currentPosition = this.h3v(currentPosition);
          if (currentPosition === -1) {
            this.o3p('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.p3v(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.i3l_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).n3s = function () {
    var result = this.t3q();
    if (result === 'null' && wasUnquotedString(this)) {
      this.o3p("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).t3q = function () {
    if (!(this.k3l_1 == null)) {
      return takePeeked(this);
    }
    var current = this.j3v();
    if (current >= charSequenceLength(this.g3v()) || current === -1) {
      this.o3p('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.g3v(), current));
    if (token === 1) {
      return this.s3q();
    }
    if (!(token === 0)) {
      this.o3p('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.g3v(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.g3v(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.g3v())) {
        usedAppend = true;
        this.f3v(this.i3l_1, current);
        var eof = this.h3v(current);
        if (eof === -1) {
          this.i3l_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.p3v(this.i3l_1, current);
    } else {
      tmp = decodedString(this, this.i3l_1, current);
    }
    var result = tmp;
    this.i3l_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).f3v = function (fromIndex, toIndex) {
    this.l3l_1.oc(this.g3v(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).l3s = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.q3q();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.t3q();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.q3q();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.t3q();
        else
          this.m3s();
        continue $l$loop;
      }
      var tmp40_subject = lastToken;
      if (tmp40_subject === 8 || tmp40_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp40_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.i3l_1, 'found ] instead of } at path: ' + this.j3l_1.toString(), this.g3v());
        removeLast(tokenStack);
      } else if (tmp40_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.i3l_1, 'found } instead of ] at path: ' + this.j3l_1.toString(), this.g3v());
        removeLast(tokenStack);
      } else if (tmp40_subject === 10) {
        this.o3p('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.v3q();
      if (tokenStack.j() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.g3v()) + "', currentPosition=" + this.i3l_1 + ')';
  };
  protoOf(AbstractJsonLexer).k3s = function (key) {
    var processed = this.p3v(0, this.i3l_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.n3p("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).n3p = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.j3l_1.b3q() + hintMessage, this.g3v());
  };
  protoOf(AbstractJsonLexer).o3p = function (message, position, hint, $super) {
    position = position === VOID ? this.i3l_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.n3p(message, position, hint) : $super.n3p.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).m3n = function () {
    var current = this.j3v();
    current = this.h3v(current);
    if (current >= charSequenceLength(this.g3v()) || current === -1) {
      this.o3p('EOF');
    }
    var tmp;
    if (charSequenceGet(this.g3v(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.g3v())) {
        this.o3p('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.g3v()))) {
      var ch = charSequenceGet(this.g3v(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.o3p('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.o3p("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.o3p("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.o3p("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.o3p("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.x2(toLong(10)).v2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.x2(toLong(10)).w2(toLong(digit));
      if (accumulator.b1(new Long(0, 0)) > 0) {
        this.o3p('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.o3p('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.o3p('EOF');
      }
      if (!(charSequenceGet(this.g3v(), current) === _Char___init__impl__6a9atx(34))) {
        this.o3p('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.i3l_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.l3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).l3() || doubleAccumulator < (new Long(0, -2147483648)).l3()) {
        this.o3p('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.o3p("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.b3();
    } else {
      this.o3p('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).u3s = function () {
    var current = this.j3v();
    if (current === charSequenceLength(this.g3v())) {
      this.o3p('EOF');
    }
    var tmp;
    if (charSequenceGet(this.g3v(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.i3l_1 === charSequenceLength(this.g3v())) {
        this.o3p('EOF');
      }
      if (!(charSequenceGet(this.g3v(), this.i3l_1) === _Char___init__impl__6a9atx(34))) {
        this.o3p('Expected closing quotation mark');
      }
      this.i3l_1 = this.i3l_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().r3v_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().q3v_1[c] : _Char___init__impl__6a9atx(0);
  }
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.q3v_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.r3v_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.q3v_1 = charArray(117);
    this.r3v_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function StringJsonLexerWithComments(source) {
    StringJsonLexer.call(this, source);
  }
  protoOf(StringJsonLexerWithComments).v3q = function () {
    var source = this.g3v();
    var cpos = this.j3v();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.i3l_1 = cpos + 1 | 0;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).r3q = function () {
    var current = this.j3v();
    if (current >= this.g3v().length || current === -1)
      return false;
    return this.k3v(charSequenceGet(this.g3v(), current));
  };
  protoOf(StringJsonLexerWithComments).g3s = function (expected) {
    var source = this.g3v();
    var current = this.j3v();
    if (current >= source.length || current === -1) {
      this.i3l_1 = -1;
      this.m3v(expected);
    }
    var c = charSequenceGet(source, current);
    this.i3l_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.m3v(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).q3q = function () {
    var source = this.g3v();
    var cpos = this.j3v();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.i3l_1 = cpos;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).j3v = function () {
    var current = this.i3l_1;
    if (current === -1)
      return current;
    var source = this.g3v();
    $l$loop_1: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop_1;
      }
      if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
        var tmp43_subject = charSequenceGet(source, current + 1 | 0);
        if (tmp43_subject === _Char___init__impl__6a9atx(47)) {
          current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
          if (current === -1) {
            current = source.length;
          } else {
            current = current + 1 | 0;
          }
          continue $l$loop_1;
        } else if (tmp43_subject === _Char___init__impl__6a9atx(42)) {
          current = indexOf(source, '*/', current + 2 | 0);
          if (current === -1) {
            this.i3l_1 = source.length;
            this.o3p('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.i3l_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.b3w_1 = source;
  }
  protoOf(StringJsonLexer).g3v = function () {
    return this.b3w_1;
  };
  protoOf(StringJsonLexer).h3v = function (position) {
    return position < this.g3v().length ? position : -1;
  };
  protoOf(StringJsonLexer).v3q = function () {
    var source = this.g3v();
    var cpos = this.i3l_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.i3l_1 = cpos;
      return charToTokenClass(c);
    }
    this.i3l_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).r3q = function () {
    var current = this.i3l_1;
    if (current === -1)
      return false;
    var source = this.g3v();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.i3l_1 = current;
      return this.k3v(c);
    }
    this.i3l_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).j3v = function () {
    var current = this.i3l_1;
    if (current === -1)
      return current;
    var source = this.g3v();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.i3l_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).g3s = function (expected) {
    if (this.i3l_1 === -1) {
      this.m3v(expected);
    }
    var source = this.g3v();
    var cpos = this.i3l_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.i3l_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.m3v(expected);
    }
    this.i3l_1 = -1;
    this.m3v(expected);
  };
  protoOf(StringJsonLexer).m3s = function () {
    this.g3s(_Char___init__impl__6a9atx(34));
    var current = this.i3l_1;
    var closingQuote = indexOf_0(this.g3v(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.t3q();
      this.n3v(1, false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.g3v(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.g3v(), this.i3l_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.i3l_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.g3v().substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).o3s = function (keyToMatch, isLenient) {
    var positionSnapshot = this.i3l_1;
    try {
      if (!(this.v3q() === 6))
        return null;
      var firstKey = this.j3s(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.o3v();
      if (!(this.v3q() === 5))
        return null;
      return this.j3s(isLenient);
    }finally {
      this.i3l_1 = positionSnapshot;
      this.o3v();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.u3k_1.v3m_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.w3k_1;
  }
  function JsonToStringWriter() {
    this.z3k_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).s3o = function (value) {
    this.z3k_1.rc(value);
  };
  protoOf(JsonToStringWriter).m3o = function (char) {
    this.z3k_1.q8(char);
  };
  protoOf(JsonToStringWriter).o3o = function (text) {
    this.z3k_1.p8(text);
  };
  protoOf(JsonToStringWriter).y3o = function (text) {
    printQuoted(this.z3k_1, text);
  };
  protoOf(JsonToStringWriter).j1l = function () {
    this.z3k_1.uc();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.z3k_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).y30 = get_isNullable;
  protoOf(defer$1).j31 = get_isInline;
  protoOf(defer$1).l31 = get_annotations;
  protoOf(PolymorphismValidator).o3i = contextual;
  //endregion
  //region block: init
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Tombstone_instance = new Tombstone();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Json_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
