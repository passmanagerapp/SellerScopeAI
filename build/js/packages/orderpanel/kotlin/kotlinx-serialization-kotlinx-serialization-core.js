(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-core'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.ob;
  var initMetadataForInterface = kotlin_kotlin.$_$.la;
  var VOID = kotlin_kotlin.$_$.g;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.g4;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var emptyList = kotlin_kotlin.$_$.l6;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.i;
  var lazy = kotlin_kotlin.$_$.ig;
  var toString = kotlin_kotlin.$_$.sb;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var KProperty1 = kotlin_kotlin.$_$.kc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.fa;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.m1;
  var objectCreate = kotlin_kotlin.$_$.nb;
  var captureStack = kotlin_kotlin.$_$.s9;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.n1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.p1;
  var IllegalArgumentException = kotlin_kotlin.$_$.ff;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.t5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.l;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var KClass = kotlin_kotlin.$_$.gc;
  var isInterface = kotlin_kotlin.$_$.xa;
  var Triple = kotlin_kotlin.$_$.of;
  var getKClass = kotlin_kotlin.$_$.e;
  var Pair = kotlin_kotlin.$_$.jf;
  var Entry = kotlin_kotlin.$_$.e5;
  var KtMap = kotlin_kotlin.$_$.f5;
  var KtMutableMap = kotlin_kotlin.$_$.i5;
  var LinkedHashMap = kotlin_kotlin.$_$.b5;
  var HashMap = kotlin_kotlin.$_$.y4;
  var KtSet = kotlin_kotlin.$_$.l5;
  var KtMutableSet = kotlin_kotlin.$_$.j5;
  var LinkedHashSet = kotlin_kotlin.$_$.c5;
  var HashSet = kotlin_kotlin.$_$.z4;
  var Collection = kotlin_kotlin.$_$.x4;
  var KtList = kotlin_kotlin.$_$.d5;
  var KtMutableList = kotlin_kotlin.$_$.h5;
  var ArrayList = kotlin_kotlin.$_$.w4;
  var copyToArray = kotlin_kotlin.$_$.h6;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.n2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.m2;
  var Result = kotlin_kotlin.$_$.kf;
  var ensureNotNull = kotlin_kotlin.$_$.eg;
  var equals = kotlin_kotlin.$_$.aa;
  var getStringHashCode = kotlin_kotlin.$_$.ga;
  var Iterable = kotlin_kotlin.$_$.a5;
  var isBlank = kotlin_kotlin.$_$.ed;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.o1;
  var toList = kotlin_kotlin.$_$.l8;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.m;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.s;
  var toHashSet = kotlin_kotlin.$_$.h8;
  var toBooleanArray = kotlin_kotlin.$_$.g8;
  var withIndex = kotlin_kotlin.$_$.s8;
  var to = kotlin_kotlin.$_$.rg;
  var toMap = kotlin_kotlin.$_$.n8;
  var lazy_0 = kotlin_kotlin.$_$.jg;
  var contentEquals = kotlin_kotlin.$_$.v5;
  var until = kotlin_kotlin.$_$.fc;
  var joinToString = kotlin_kotlin.$_$.z6;
  var initMetadataForObject = kotlin_kotlin.$_$.na;
  var Long = kotlin_kotlin.$_$.hf;
  var Char = kotlin_kotlin.$_$.ye;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.f2;
  var Duration = kotlin_kotlin.$_$.ve;
  var Companion_getInstance = kotlin_kotlin.$_$.i4;
  var toIntOrNull = kotlin_kotlin.$_$.ge;
  var hashCode = kotlin_kotlin.$_$.ha;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.s1;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.n;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.t;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.x;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.y;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.p;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.v;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.w;
  var isArray = kotlin_kotlin.$_$.pa;
  var arrayIterator = kotlin_kotlin.$_$.q9;
  var asList = kotlin_kotlin.$_$.p5;
  var step = kotlin_kotlin.$_$.ec;
  var getValue = kotlin_kotlin.$_$.v6;
  var longArray = kotlin_kotlin.$_$.fb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ja;
  var get_lastIndex = kotlin_kotlin.$_$.c7;
  var countTrailingZeroBits = kotlin_kotlin.$_$.cg;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.r;
  var toString_0 = kotlin_kotlin.$_$.qg;
  var KTypeParameter = kotlin_kotlin.$_$.lc;
  var contentHashCode = kotlin_kotlin.$_$.w5;
  var fillArrayVal = kotlin_kotlin.$_$.ba;
  var booleanArray = kotlin_kotlin.$_$.r9;
  var emptyMap = kotlin_kotlin.$_$.m6;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.j4;
  var isCharArray = kotlin_kotlin.$_$.sa;
  var charArray = kotlin_kotlin.$_$.u9;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var isDoubleArray = kotlin_kotlin.$_$.ua;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var isFloatArray = kotlin_kotlin.$_$.va;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.k4;
  var isLongArray = kotlin_kotlin.$_$.ya;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.o4;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.n3;
  var ULongArray = kotlin_kotlin.$_$.tf;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.j3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.g3;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.l3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.h3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.e4;
  var isIntArray = kotlin_kotlin.$_$.wa;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.n4;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.e3;
  var UIntArray = kotlin_kotlin.$_$.rf;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.a3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.x2;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.c3;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.y2;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.f4;
  var isShortArray = kotlin_kotlin.$_$.ab;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.p4;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.w3;
  var UShortArray = kotlin_kotlin.$_$.vf;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.s3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.p3;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.u3;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.q3;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.b4;
  var isByteArray = kotlin_kotlin.$_$.ra;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.m4;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.v2;
  var UByteArray = kotlin_kotlin.$_$.pf;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.s2;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.o2;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.t2;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.p2;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.a4;
  var isBooleanArray = kotlin_kotlin.$_$.qa;
  var coerceAtLeast = kotlin_kotlin.$_$.xb;
  var copyOf = kotlin_kotlin.$_$.b6;
  var copyOf_0 = kotlin_kotlin.$_$.d6;
  var copyOf_1 = kotlin_kotlin.$_$.e6;
  var copyOf_2 = kotlin_kotlin.$_$.z5;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.o3;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.k3;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.m3;
  var copyOf_3 = kotlin_kotlin.$_$.g6;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.f3;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.b3;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.d3;
  var copyOf_4 = kotlin_kotlin.$_$.y5;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.x3;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.t3;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.v3;
  var copyOf_5 = kotlin_kotlin.$_$.c6;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.w2;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.r2;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.u2;
  var copyOf_6 = kotlin_kotlin.$_$.a6;
  var Unit = kotlin_kotlin.$_$.xf;
  var trimIndent = kotlin_kotlin.$_$.re;
  var equals_0 = kotlin_kotlin.$_$.ad;
  var charSequenceLength = kotlin_kotlin.$_$.w9;
  var charSequenceGet = kotlin_kotlin.$_$.v9;
  var toString_1 = kotlin_kotlin.$_$.j2;
  var titlecase = kotlin_kotlin.$_$.ae;
  var isLowerCase = kotlin_kotlin.$_$.fd;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.h4;
  var ULong = kotlin_kotlin.$_$.uf;
  var UInt = kotlin_kotlin.$_$.sf;
  var UShort = kotlin_kotlin.$_$.wf;
  var UByte = kotlin_kotlin.$_$.qf;
  var mapOf = kotlin_kotlin.$_$.l7;
  var lastOrNull = kotlin_kotlin.$_$.e7;
  var get_lastIndex_0 = kotlin_kotlin.$_$.d7;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var get_js = kotlin_kotlin.$_$.cb;
  var findAssociatedObject = kotlin_kotlin.$_$.c;
  var get_indices = kotlin_kotlin.$_$.y6;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var get_indices_0 = kotlin_kotlin.$_$.x6;
  var Companion_instance = kotlin_kotlin.$_$.l4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.k2;
  var createFailure = kotlin_kotlin.$_$.dg;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(SerializationStrategy, 'SerializationStrategy');
  initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
  initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [SerializationStrategy, DeserializationStrategy]);
  initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PolymorphicSerializer, 'PolymorphicSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SealedClassSerializer, 'SealedClassSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SerializationException, 'SerializationException', SerializationException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(UnknownFieldException, 'UnknownFieldException', VOID, SerializationException);
  initMetadataForClass(MissingFieldException, 'MissingFieldException', VOID, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  initMetadataForInterface(SerialDescriptor, 'SerialDescriptor');
  initMetadataForClass(ContextDescriptor, 'ContextDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(elementDescriptors$1);
  initMetadataForClass(elementDescriptors$$inlined$Iterable$1, VOID, VOID, VOID, [Iterable]);
  initMetadataForClass(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder');
  initMetadataForInterface(CachedNames, 'CachedNames');
  initMetadataForClass(SerialDescriptorImpl, 'SerialDescriptorImpl', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(SerialKind, 'SerialKind');
  initMetadataForObject(ENUM, 'ENUM', VOID, SerialKind);
  initMetadataForObject(CONTEXTUAL, 'CONTEXTUAL', VOID, SerialKind);
  initMetadataForClass(PolymorphicKind, 'PolymorphicKind', VOID, SerialKind);
  initMetadataForObject(SEALED, 'SEALED', VOID, PolymorphicKind);
  initMetadataForObject(OPEN, 'OPEN', VOID, PolymorphicKind);
  initMetadataForClass(PrimitiveKind, 'PrimitiveKind', VOID, SerialKind);
  initMetadataForObject(BOOLEAN, 'BOOLEAN', VOID, PrimitiveKind);
  initMetadataForObject(BYTE, 'BYTE', VOID, PrimitiveKind);
  initMetadataForObject(CHAR, 'CHAR', VOID, PrimitiveKind);
  initMetadataForObject(SHORT, 'SHORT', VOID, PrimitiveKind);
  initMetadataForObject(INT, 'INT', VOID, PrimitiveKind);
  initMetadataForObject(LONG, 'LONG', VOID, PrimitiveKind);
  initMetadataForObject(FLOAT, 'FLOAT', VOID, PrimitiveKind);
  initMetadataForObject(DOUBLE, 'DOUBLE', VOID, PrimitiveKind);
  initMetadataForObject(STRING, 'STRING', VOID, PrimitiveKind);
  initMetadataForClass(StructureKind, 'StructureKind', VOID, SerialKind);
  initMetadataForObject(CLASS, 'CLASS', VOID, StructureKind);
  initMetadataForObject(LIST, 'LIST', VOID, StructureKind);
  initMetadataForObject(MAP, 'MAP', VOID, StructureKind);
  initMetadataForObject(OBJECT, 'OBJECT', VOID, StructureKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.a30(this);
  }
  initMetadataForInterface(Decoder, 'Decoder');
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.h33(descriptor, index, deserializer, previousValue) : $super.h33.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.v32(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.z2z(this, value);
  }
  initMetadataForInterface(Encoder, 'Encoder');
  function shouldEncodeElementDefault(descriptor, index) {
    return true;
  }
  initMetadataForInterface(CompositeEncoder, 'CompositeEncoder');
  initMetadataForClass(AbstractEncoder, 'AbstractEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForObject(NothingSerializer_0, 'NothingSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DurationSerializer, 'DurationSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(ListLikeDescriptor, 'ListLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(ArrayListClassDesc, 'ArrayListClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(HashSetClassDesc, 'HashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(MapLikeDescriptor, 'MapLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(HashMapClassDesc, 'HashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(ArrayClassDesc, 'ArrayClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', VOID, ListLikeDescriptor);
  initMetadataForClass(AbstractCollectionSerializer, 'AbstractCollectionSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(CollectionLikeSerializer, 'CollectionLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(CollectionSerializer, 'CollectionSerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(ArrayListSerializer, 'ArrayListSerializer', VOID, CollectionSerializer);
  initMetadataForClass(HashSetSerializer, 'HashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(LinkedHashSetSerializer, 'LinkedHashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(MapLikeSerializer, 'MapLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(HashMapSerializer, 'HashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(LinkedHashMapSerializer, 'LinkedHashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(ReferenceArraySerializer, 'ReferenceArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArraySerializer, 'PrimitiveArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder');
  initMetadataForCompanion(Companion);
  initMetadataForClass(ElementMarker, 'ElementMarker');
  initMetadataForClass(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(InlineClassDescriptor, 'InlineClassDescriptor', VOID, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  initMetadataForInterface(GeneratedSerializer, 'GeneratedSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(InlinePrimitiveDescriptor$1, VOID, VOID, VOID, [GeneratedSerializer]);
  initMetadataForObject(NoOpEncoder, 'NoOpEncoder', VOID, AbstractEncoder);
  initMetadataForObject(NothingSerialDescriptor, 'NothingSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(NullableSerializer, 'NullableSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerialDescriptorForNullable, 'SerialDescriptorForNullable', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(ObjectSerializer, 'ObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForInterface(SerializerFactory, 'SerializerFactory');
  initMetadataForObject(CharArraySerializer_0, 'CharArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(DoubleArraySerializer_0, 'DoubleArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(FloatArraySerializer_0, 'FloatArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(LongArraySerializer_0, 'LongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ULongArraySerializer_0, 'ULongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(IntArraySerializer_0, 'IntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UIntArraySerializer_0, 'UIntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ShortArraySerializer_0, 'ShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UShortArraySerializer_0, 'UShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ByteArraySerializer_0, 'ByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UByteArraySerializer_0, 'UByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(BooleanArraySerializer_0, 'BooleanArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForClass(CharArrayBuilder, 'CharArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(DoubleArrayBuilder, 'DoubleArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(FloatArrayBuilder, 'FloatArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(LongArrayBuilder, 'LongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ULongArrayBuilder, 'ULongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(IntArrayBuilder, 'IntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UIntArrayBuilder, 'UIntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ShortArrayBuilder, 'ShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UShortArrayBuilder, 'UShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ByteArrayBuilder, 'ByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UByteArrayBuilder, 'UByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(BooleanArrayBuilder, 'BooleanArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForObject(StringSerializer, 'StringSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(CharSerializer, 'CharSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DoubleSerializer, 'DoubleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(FloatSerializer, 'FloatSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LongSerializer, 'LongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(IntSerializer, 'IntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ShortSerializer, 'ShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ByteSerializer, 'ByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(BooleanSerializer, 'BooleanSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UnitSerializer, 'UnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(TaggedDecoder, 'TaggedDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForClass(NamedValueDecoder, 'NamedValueDecoder', VOID, TaggedDecoder);
  initMetadataForClass(MapEntry, 'MapEntry', VOID, VOID, [Entry]);
  initMetadataForClass(KeyValueSerializer, 'KeyValueSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(MapEntrySerializer_0, 'MapEntrySerializer', VOID, KeyValueSerializer);
  initMetadataForClass(PairSerializer_0, 'PairSerializer', VOID, KeyValueSerializer);
  initMetadataForClass(TripleSerializer_0, 'TripleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ULongSerializer, 'ULongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UIntSerializer, 'UIntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UShortSerializer, 'UShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UByteSerializer, 'UByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerializersModule, 'SerializersModule');
  initMetadataForClass(SerialModuleImpl, 'SerialModuleImpl', VOID, SerializersModule);
  initMetadataForClass(ContextualProvider, 'ContextualProvider');
  initMetadataForClass(Argless, 'Argless', VOID, ContextualProvider);
  initMetadataForClass(WithTypeArguments, 'WithTypeArguments', VOID, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.m3i(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  initMetadataForInterface(SerializersModuleCollector, 'SerializersModuleCollector');
  initMetadataForClass(SerializableWith, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
  initMetadataForClass(createCache$1);
  initMetadataForClass(createParametrizedCache$1);
  //endregion
  function KSerializer() {
  }
  function SerializationStrategy() {
  }
  function DeserializationStrategy() {
  }
  function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.j30('type', serializer_0(StringCompanionObject_instance).y2z());
      $this$buildSerialDescriptor.j30('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.k30_1.fb() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.d30_1 = this$0.l30_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.k30_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.k30_1 = baseClass;
    this.l30_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.m30_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).n30 = function () {
    return this.k30_1;
  };
  protoOf(PolymorphicSerializer).y2z = function () {
    var tmp0 = this.m30_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.k30_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.q30(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.n30());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.p30(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.n30());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.y2z();
    }, null);
  }
  function SealedClassSerializer() {
  }
  protoOf(SealedClassSerializer).y2z = function () {
    var tmp0 = this.r30_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.y2z();
    }, null);
  }
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_1(message, cause) {
    var tmp = SerializationException_init_$Init$_1(message, cause, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_1);
    return tmp;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function UnknownFieldException_init_$Init$(index, $this) {
    UnknownFieldException.call($this, 'An unknown field for index ' + index);
    return $this;
  }
  function UnknownFieldException_init_$Create$(index) {
    var tmp = UnknownFieldException_init_$Init$(index, objectCreate(protoOf(UnknownFieldException)));
    captureStack(tmp, UnknownFieldException_init_$Create$);
    return tmp;
  }
  function UnknownFieldException(message) {
    SerializationException_init_$Init$_0(message, this);
    captureStack(this, UnknownFieldException);
  }
  function MissingFieldException_init_$Init$(missingFields, serialName, $this) {
    MissingFieldException.call($this, missingFields, missingFields.j() === 1 ? "Field '" + missingFields.p(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + toString(missingFields) + " are required for type with serial name '" + serialName + "', but they were missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$(missingFields, serialName) {
    var tmp = MissingFieldException_init_$Init$(missingFields, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$);
    return tmp;
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.s30_1 = missingFields;
  }
  function serializerOrNull(_this__u8e3s4) {
    var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
    var tmp;
    if (failOnMissingTypeArgSerializer) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s = typeArguments.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.e(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s_0 = typeArguments.g();
      while (_iterator__ex2g4s_0.h()) {
        var item_0 = _iterator__ex2g4s_0.i();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var tmp$ret$3 = tmp_0;
        destination_0.e(tmp$ret$3);
      }
      tmp = destination_0;
    }
    var serializers = tmp;
    return serializers;
  }
  function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
    return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
  }
  function serializer(_this__u8e3s4, type) {
    var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      platformSpecificSerializerNotRegistered(kclass(type));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerOrNull_0(_this__u8e3s4, type) {
    return serializerByKTypeImpl(_this__u8e3s4, type, false);
  }
  function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp;
    if (_this__u8e3s4.equals(getKClass(Collection)) || _this__u8e3s4.equals(getKClass(KtList)) || (_this__u8e3s4.equals(getKClass(KtMutableList)) || _this__u8e3s4.equals(getKClass(ArrayList)))) {
      tmp = new ArrayListSerializer(serializers.p(0));
    } else if (_this__u8e3s4.equals(getKClass(HashSet))) {
      tmp = new HashSetSerializer(serializers.p(0));
    } else if (_this__u8e3s4.equals(getKClass(KtSet)) || (_this__u8e3s4.equals(getKClass(KtMutableSet)) || _this__u8e3s4.equals(getKClass(LinkedHashSet)))) {
      tmp = new LinkedHashSetSerializer(serializers.p(0));
    } else if (_this__u8e3s4.equals(getKClass(HashMap))) {
      tmp = new HashMapSerializer(serializers.p(0), serializers.p(1));
    } else if (_this__u8e3s4.equals(getKClass(KtMap)) || (_this__u8e3s4.equals(getKClass(KtMutableMap)) || _this__u8e3s4.equals(getKClass(LinkedHashMap)))) {
      tmp = new LinkedHashMapSerializer(serializers.p(0), serializers.p(1));
    } else if (_this__u8e3s4.equals(getKClass(Entry))) {
      tmp = MapEntrySerializer(serializers.p(0), serializers.p(1));
    } else if (_this__u8e3s4.equals(getKClass(Pair))) {
      tmp = PairSerializer(serializers.p(0), serializers.p(1));
    } else if (_this__u8e3s4.equals(getKClass(Triple))) {
      tmp = TripleSerializer(serializers.p(0), serializers.p(1), serializers.p(2));
    } else {
      var tmp_0;
      if (isReferenceArray(_this__u8e3s4)) {
        var tmp_1 = elementClassifierIfArray();
        tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface(tmp_1, KClass) : false) ? tmp_1 : THROW_CCE(), serializers.p(0));
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(serializers);
    return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
  }
  function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
    var rootClass = kclass(type);
    var isNullable = type.tb();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.sb();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.serialization.serializerByKTypeImpl.stub_for_inlining' call
      var tmp$ret$0 = typeOrThrow(item);
      destination.e(tmp$ret$0);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.q()) {
      var tmp_0;
      if (isInterface_0(rootClass) && !(_this__u8e3s4.u30(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.t30()) {
        tmp_1 = null;
      } else {
        // Inline function 'kotlin.Result.getOrNull' call
        var this_1 = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
        var tmp_2;
        if (_Result___get_isFailure__impl__jpiriv(this_1)) {
          tmp_2 = null;
        } else {
          var tmp_3 = _Result___get_value__impl__bjfvqg(this_1);
          tmp_2 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        }
        tmp_1 = tmp_2;
      }
      tmp = tmp_1;
    }
    var cachedSerializer = tmp;
    if (!(cachedSerializer == null))
      return cachedSerializer;
    var tmp_4;
    if (typeArguments.q()) {
      var tmp0_elvis_lhs = serializerOrNull(rootClass);
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.u30(rootClass) : tmp0_elvis_lhs;
      var tmp_5;
      if (tmp1_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_5 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_5 = tmp1_elvis_lhs;
      }
      tmp_4 = tmp_5;
    } else {
      var tmp2_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
      var tmp_6;
      if (tmp2_elvis_lhs == null) {
        return null;
      } else {
        tmp_6 = tmp2_elvis_lhs;
      }
      var serializers = tmp_6;
      var tmp3_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.v30(rootClass, serializers) : tmp3_elvis_lhs;
      var tmp_7;
      if (tmp4_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_7 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_7 = tmp4_elvis_lhs;
      }
      tmp_4 = tmp_7;
    }
    var contextualSerializer = tmp_4;
    var tmp_8;
    if (contextualSerializer == null) {
      tmp_8 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_8 = isInterface(contextualSerializer, KSerializer) ? contextualSerializer : THROW_CCE();
    }
    var tmp4_safe_receiver = tmp_8;
    return tmp4_safe_receiver == null ? null : nullable(tmp4_safe_receiver, isNullable);
  }
  function nullable(_this__u8e3s4, shouldBeNullable) {
    if (shouldBeNullable)
      return get_nullable(_this__u8e3s4);
    return isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
  }
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.p(0).rb();
    };
  }
  function get_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE;
  }
  var SERIALIZERS_CACHE;
  function get_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE_NULLABLE;
  }
  var SERIALIZERS_CACHE_NULLABLE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  function findCachedSerializer(clazz, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp12_safe_receiver = get_SERIALIZERS_CACHE().w30(clazz);
      var tmp_0;
      if (tmp12_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp12_safe_receiver, KSerializer) ? tmp12_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().w30(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().x30(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().x30(clazz, types);
    }
    return tmp;
  }
  function SERIALIZERS_CACHE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tmp8_safe_receiver = tmp;
    var tmp9_safe_receiver = tmp8_safe_receiver == null ? null : get_nullable(tmp8_safe_receiver);
    var tmp_0;
    if (tmp9_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_0 = isInterface(tmp9_safe_receiver, KSerializer) ? tmp9_safe_receiver : THROW_CCE();
    }
    return tmp_0;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
    return function () {
      return $types.p(0).rb();
    };
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    var tmp10_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
    var tmp11_safe_receiver = tmp10_safe_receiver == null ? null : get_nullable(tmp10_safe_receiver);
    var tmp;
    if (tmp11_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp11_safe_receiver, KSerializer) ? tmp11_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
    return function () {
      return $types.p(0).rb();
    };
  }
  var properties_initialized_SerializersCache_kt_q8kf25;
  function _init_properties_SerializersCache_kt__hgwi2p() {
    if (!properties_initialized_SerializersCache_kt_q8kf25) {
      properties_initialized_SerializersCache_kt_q8kf25 = true;
      SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
      SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
    }
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.y2z().y30()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_0(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_1(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function MapEntrySerializer(keySerializer, valueSerializer) {
    return new MapEntrySerializer_0(keySerializer, valueSerializer);
  }
  function PairSerializer(keySerializer, valueSerializer) {
    return new PairSerializer_0(keySerializer, valueSerializer);
  }
  function TripleSerializer(aSerializer, bSerializer, cSerializer) {
    return new TripleSerializer_0(aSerializer, bSerializer, cSerializer);
  }
  function ArraySerializer(kClass, elementSerializer) {
    return new ReferenceArraySerializer(kClass, elementSerializer);
  }
  function MapSerializer(keySerializer, valueSerializer) {
    return new LinkedHashMapSerializer(keySerializer, valueSerializer);
  }
  function ListSerializer(elementSerializer) {
    return new ArrayListSerializer(elementSerializer);
  }
  function withContext(_this__u8e3s4, context) {
    return new ContextDescriptor(_this__u8e3s4, context);
  }
  function ContextDescriptor(original, kClass) {
    this.z30_1 = original;
    this.a31_1 = kClass;
    this.b31_1 = this.z30_1.c31() + '<' + this.a31_1.fb() + '>';
  }
  protoOf(ContextDescriptor).d31 = function (index) {
    return this.z30_1.d31(index);
  };
  protoOf(ContextDescriptor).e31 = function (name) {
    return this.z30_1.e31(name);
  };
  protoOf(ContextDescriptor).f31 = function (index) {
    return this.z30_1.f31(index);
  };
  protoOf(ContextDescriptor).g31 = function (index) {
    return this.z30_1.g31(index);
  };
  protoOf(ContextDescriptor).h31 = function (index) {
    return this.z30_1.h31(index);
  };
  protoOf(ContextDescriptor).i31 = function () {
    return this.z30_1.i31();
  };
  protoOf(ContextDescriptor).y30 = function () {
    return this.z30_1.y30();
  };
  protoOf(ContextDescriptor).j31 = function () {
    return this.z30_1.j31();
  };
  protoOf(ContextDescriptor).k31 = function () {
    return this.z30_1.k31();
  };
  protoOf(ContextDescriptor).l31 = function () {
    return this.z30_1.l31();
  };
  protoOf(ContextDescriptor).c31 = function () {
    return this.b31_1;
  };
  protoOf(ContextDescriptor).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof ContextDescriptor ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var another = tmp;
    return equals(this.z30_1, another.z30_1) && another.a31_1.equals(this.a31_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.a31_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.b31_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.a31_1) + ', original: ' + toString(this.z30_1) + ')';
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp14_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp14_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlinx.serialization.descriptors.getContextualDescriptor.<anonymous>' call
      var tmp15_safe_receiver = _this__u8e3s4.u30(tmp14_safe_receiver);
      tmp = tmp15_safe_receiver == null ? null : tmp15_safe_receiver.y2z();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.a31_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.m31_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementDescriptors$$inlined$Iterable$1(_this__u8e3s4);
  }
  function elementDescriptors$1($this_elementDescriptors) {
    this.q31_1 = $this_elementDescriptors;
    this.p31_1 = $this_elementDescriptors.k31();
  }
  protoOf(elementDescriptors$1).h = function () {
    return this.p31_1 > 0;
  };
  protoOf(elementDescriptors$1).i = function () {
    var tmp = this.q31_1.k31();
    var _unary__edvuaz = this.p31_1;
    this.p31_1 = _unary__edvuaz - 1 | 0;
    return this.q31_1.g31(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.r31_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).g = function () {
    // Inline function 'kotlinx.serialization.descriptors.<get-elementDescriptors>.<anonymous>' call
    return new elementDescriptors$1(this.r31_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!!equals(kind, CLASS_getInstance())) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.e30_1.j(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.b30_1 = serialName;
    this.c30_1 = false;
    this.d30_1 = emptyList();
    this.e30_1 = ArrayList_init_$Create$_0();
    this.f30_1 = HashSet_init_$Create$();
    this.g30_1 = ArrayList_init_$Create$_0();
    this.h30_1 = ArrayList_init_$Create$_0();
    this.i30_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).s31 = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.f30_1.e(elementName)) {
      // Inline function 'kotlinx.serialization.descriptors.ClassSerialDescriptorBuilder.element.<anonymous>' call
      var message = "Element with name '" + elementName + "' is already registered in " + this.b30_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.e30_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.g30_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.h30_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.i30_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).j30 = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.s31(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.s31.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.e32_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory();
    return tmp0.w();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.d32_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.d31(it) + ': ' + this$0.g31(it).c31();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.t31_1 = serialName;
    this.u31_1 = kind;
    this.v31_1 = elementsCount;
    this.w31_1 = builder.d30_1;
    this.x31_1 = toHashSet(builder.e30_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.e30_1;
    tmp.y31_1 = copyToArray(this_0);
    this.z31_1 = compactArray(builder.g30_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.h30_1;
    tmp_0.a32_1 = copyToArray(this_1);
    this.b32_1 = toBooleanArray(builder.i30_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.y31_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.name2Index.<anonymous>' call
      var tmp$ret$2 = to(item.tf_1, item.sf_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.c32_1 = toMap(destination);
    this.d32_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.e32_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).c31 = function () {
    return this.t31_1;
  };
  protoOf(SerialDescriptorImpl).i31 = function () {
    return this.u31_1;
  };
  protoOf(SerialDescriptorImpl).k31 = function () {
    return this.v31_1;
  };
  protoOf(SerialDescriptorImpl).l31 = function () {
    return this.w31_1;
  };
  protoOf(SerialDescriptorImpl).f32 = function () {
    return this.x31_1;
  };
  protoOf(SerialDescriptorImpl).d31 = function (index) {
    return getChecked(this.y31_1, index);
  };
  protoOf(SerialDescriptorImpl).e31 = function (name) {
    var tmp0_elvis_lhs = this.c32_1.i2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).f31 = function (index) {
    return getChecked(this.a32_1, index);
  };
  protoOf(SerialDescriptorImpl).g31 = function (index) {
    return getChecked(this.z31_1, index);
  };
  protoOf(SerialDescriptorImpl).h31 = function (index) {
    return getChecked_0(this.b32_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.c31() === other.c31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.equals.<anonymous>' call
      if (!contentEquals(this.d32_1, other.d32_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.k31() === other.k31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.k31();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.g31(index).c31() === other.g31(index).c31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.g31(index).i31(), other.g31(index).i31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    var tmp = until(0, this.v31_1);
    var tmp_0 = this.t31_1 + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, SerialDescriptorImpl$toString$lambda(this));
  };
  function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
    var tmp;
    if (builderAction === VOID) {
      tmp = buildClassSerialDescriptor$lambda;
    } else {
      tmp = builderAction;
    }
    builderAction = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildClassSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builderAction(sdBuilder);
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.e30_1.j(), toList(typeParameters), sdBuilder);
  }
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.PrimitiveSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function buildClassSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function _hashCode$factory() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef(receiver);
    }, null);
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).fb());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function OPEN() {
    OPEN_instance = this;
    PolymorphicKind.call(this);
  }
  var OPEN_instance;
  function OPEN_getInstance() {
    if (OPEN_instance == null)
      new OPEN();
    return OPEN_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).g32 = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).h32 = function () {
    return true;
  };
  protoOf(AbstractDecoder).i32 = function () {
    return null;
  };
  protoOf(AbstractDecoder).j32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).k32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).l32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).m32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).n32 = function () {
    var tmp = this.g32();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).o32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).p32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).q32 = function () {
    var tmp = this.g32();
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).r32 = function () {
    var tmp = this.g32();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).s32 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).t32 = function (deserializer, previousValue) {
    return this.u32(deserializer);
  };
  protoOf(AbstractDecoder).v32 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).w32 = function (descriptor) {
  };
  protoOf(AbstractDecoder).x32 = function (descriptor, index) {
    return this.j32();
  };
  protoOf(AbstractDecoder).y32 = function (descriptor, index) {
    return this.k32();
  };
  protoOf(AbstractDecoder).z32 = function (descriptor, index) {
    return this.l32();
  };
  protoOf(AbstractDecoder).a33 = function (descriptor, index) {
    return this.m32();
  };
  protoOf(AbstractDecoder).b33 = function (descriptor, index) {
    return this.n32();
  };
  protoOf(AbstractDecoder).c33 = function (descriptor, index) {
    return this.o32();
  };
  protoOf(AbstractDecoder).d33 = function (descriptor, index) {
    return this.p32();
  };
  protoOf(AbstractDecoder).e33 = function (descriptor, index) {
    return this.q32();
  };
  protoOf(AbstractDecoder).f33 = function (descriptor, index) {
    return this.r32();
  };
  protoOf(AbstractDecoder).g33 = function (descriptor, index) {
    return this.s32(descriptor.g31(index));
  };
  protoOf(AbstractDecoder).h33 = function (descriptor, index, deserializer, previousValue) {
    return this.t32(deserializer, previousValue);
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).v32 = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).w32 = function (descriptor) {
  };
  protoOf(AbstractEncoder).n33 = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).o33 = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).p33 = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).q33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).r33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).s33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).t33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).u33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).v33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).w33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).x33 = function (value) {
    return this.o33(new Char(value));
  };
  protoOf(AbstractEncoder).y33 = function (value) {
    return this.o33(value);
  };
  protoOf(AbstractEncoder).z33 = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).a34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.q33(value);
    }
  };
  protoOf(AbstractEncoder).b34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.r33(value);
    }
  };
  protoOf(AbstractEncoder).c34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.s33(value);
    }
  };
  protoOf(AbstractEncoder).d34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.t33(value);
    }
  };
  protoOf(AbstractEncoder).e34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.u33(value);
    }
  };
  protoOf(AbstractEncoder).f34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.v33(value);
    }
  };
  protoOf(AbstractEncoder).g34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.w33(value);
    }
  };
  protoOf(AbstractEncoder).h34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.x33(value);
    }
  };
  protoOf(AbstractEncoder).i34 = function (descriptor, index, value) {
    if (this.n33(descriptor, index)) {
      this.y33(value);
    }
  };
  protoOf(AbstractEncoder).j34 = function (descriptor, index) {
    return this.n33(descriptor, index) ? this.z33(descriptor.g31(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).k34 = function (descriptor, index, serializer, value) {
    if (this.n33(descriptor, index)) {
      this.l34(serializer, value);
    }
  };
  function Decoder() {
  }
  function CompositeDecoder() {
  }
  function Encoder() {
  }
  function CompositeEncoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.f33($this.y2z(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.i33($this.y2z(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).o30 = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.y2z();
    var composite = encoder.v32(descriptor);
    // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.serialize.<anonymous>' call
    composite.i34(this.y2z(), 0, actualSerializer.y2z().c31());
    var tmp = this.y2z();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.k34(tmp, 1, tmp$ret$0, value);
    composite.w32(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).z2z = function (encoder, value) {
    return this.o30(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).a30 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.y2z();
    var composite = decoder.v32(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>' call
      var klassName = null;
      var value = null;
      if (composite.k33()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.l33(this.y2z());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.f33(this.y2z(), index);
            break;
          case 1:
            var tmp0 = klassName;
            var tmp$ret$2;
            $l$block_0: {
              // Inline function 'kotlin.requireNotNull' call
              if (tmp0 == null) {
                // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
                var message = 'Cannot read polymorphic value before its type token';
                throw IllegalArgumentException_init_$Create$(toString(message));
              } else {
                tmp$ret$2 = tmp0;
                break $l$block_0;
              }
            }

            klassName = tmp$ret$2;
            var serializer = findPolymorphicSerializer_0(this, composite, klassName);
            value = composite.i33(this.y2z(), index, serializer);
            break;
          default:
            var tmp0_elvis_lhs = klassName;
            throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
        }
      }
      var tmp1 = value;
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        if (tmp1 == null) {
          // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = tmp1;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$0;
    composite.w32(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).p30 = function (decoder, klassName) {
    return decoder.j33().p34(this.n30(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).q30 = function (encoder, value) {
    return encoder.j33().q34(this.n30(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.fb();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.fb() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.fb() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.r34_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).y2z = function () {
    return this.r34_1;
  };
  protoOf(NothingSerializer_0).s34 = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).z2z = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.s34(encoder, tmp);
  };
  protoOf(NothingSerializer_0).a30 = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.t34_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).y2z = function () {
    return this.t34_1;
  };
  protoOf(DurationSerializer).u34 = function (encoder, value) {
    encoder.y33(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).z2z = function (encoder, value) {
    return this.u34(encoder, value instanceof Duration ? value.dj_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).v34 = function (decoder) {
    return Companion_getInstance().cj(decoder.r32());
  };
  protoOf(DurationSerializer).a30 = function (decoder) {
    return new Duration(this.v34(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).c31 = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).c31 = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).c31 = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function HashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.HashMap', keyDesc, valueDesc);
  }
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ArrayClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayClassDesc).c31 = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.y34_1 = elementDescriptor;
    this.z34_1 = 1;
  }
  protoOf(ListLikeDescriptor).i31 = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).k31 = function () {
    return this.z34_1;
  };
  protoOf(ListLikeDescriptor).d31 = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).e31 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).h31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).f31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).g31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.y34_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.y34_1, other.y34_1) && this.c31() === other.c31())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.y34_1), 31) + getStringHashCode(this.c31()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.c31() + '(' + toString(this.y34_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.e35_1 = serialName;
    this.f35_1 = keyDescriptor;
    this.g35_1 = valueDescriptor;
    this.h35_1 = 2;
  }
  protoOf(MapLikeDescriptor).c31 = function () {
    return this.e35_1;
  };
  protoOf(MapLikeDescriptor).i31 = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).k31 = function () {
    return this.h35_1;
  };
  protoOf(MapLikeDescriptor).d31 = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).e31 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).h31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).f31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).g31 = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.c31() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.f35_1;
        break;
      case 1:
        tmp = this.g35_1;
        break;
      default:
        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.c31() === other.c31()))
      return false;
    if (!equals(this.f35_1, other.f35_1))
      return false;
    if (!equals(this.g35_1, other.g35_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.c31());
    result = imul(31, result) + hashCode(this.f35_1) | 0;
    result = imul(31, result) + hashCode(this.g35_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.c31() + '(' + toString(this.f35_1) + ', ' + toString(this.g35_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.m35_1 = primitive.c31() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).c31 = function () {
    return this.m35_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.o35_1 = new ArrayListClassDesc(element.y2z());
  }
  protoOf(ArrayListSerializer).y2z = function () {
    return this.o35_1;
  };
  protoOf(ArrayListSerializer).k25 = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).p35 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ArrayListSerializer).q35 = function (_this__u8e3s4) {
    return this.p35(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).r35 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).s35 = function (_this__u8e3s4) {
    return this.r35(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).t35 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).u35 = function (_this__u8e3s4) {
    return this.t35((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).v35 = function (_this__u8e3s4, size) {
    return _this__u8e3s4.t5(size);
  };
  protoOf(ArrayListSerializer).w35 = function (_this__u8e3s4, size) {
    return this.v35(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).x35 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.d2(index, element);
  };
  protoOf(ArrayListSerializer).y35 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.x35(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.j36_1 = new HashSetClassDesc(eSerializer.y2z());
  }
  protoOf(HashSetSerializer).y2z = function () {
    return this.j36_1;
  };
  protoOf(HashSetSerializer).k25 = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).k36 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashSetSerializer).q35 = function (_this__u8e3s4) {
    return this.k36(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).l36 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).s35 = function (_this__u8e3s4) {
    return this.l36(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).m36 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).u35 = function (_this__u8e3s4) {
    return this.m36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).n36 = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).w35 = function (_this__u8e3s4, size) {
    return this.n36(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).o36 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).y35 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.o36(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.q36_1 = new LinkedHashSetClassDesc(eSerializer.y2z());
  }
  protoOf(LinkedHashSetSerializer).y2z = function () {
    return this.q36_1;
  };
  protoOf(LinkedHashSetSerializer).k25 = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).r36 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashSetSerializer).q35 = function (_this__u8e3s4) {
    return this.r36(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).s36 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).s35 = function (_this__u8e3s4) {
    return this.s36(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).m36 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).u35 = function (_this__u8e3s4) {
    return this.m36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).t36 = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).w35 = function (_this__u8e3s4, size) {
    return this.t36(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).u36 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).y35 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.u36(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.x36_1 = new HashMapClassDesc(kSerializer.y2z(), vSerializer.y2z());
  }
  protoOf(HashMapSerializer).y2z = function () {
    return this.x36_1;
  };
  protoOf(HashMapSerializer).y36 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashMapSerializer).z36 = function (_this__u8e3s4) {
    return this.y36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).a37 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(HashMapSerializer).b37 = function (_this__u8e3s4) {
    return this.a37((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).k25 = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).c37 = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(HashMapSerializer).q35 = function (_this__u8e3s4) {
    return this.c37(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).d37 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).s35 = function (_this__u8e3s4) {
    return this.d37(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).e37 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).u35 = function (_this__u8e3s4) {
    return this.e37((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).f37 = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).w35 = function (_this__u8e3s4, size) {
    return this.f37(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.m37_1 = new LinkedHashMapClassDesc(kSerializer.y2z(), vSerializer.y2z());
  }
  protoOf(LinkedHashMapSerializer).y2z = function () {
    return this.m37_1;
  };
  protoOf(LinkedHashMapSerializer).y36 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashMapSerializer).z36 = function (_this__u8e3s4) {
    return this.y36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).a37 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(LinkedHashMapSerializer).b37 = function (_this__u8e3s4) {
    return this.a37((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).k25 = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).n37 = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(LinkedHashMapSerializer).q35 = function (_this__u8e3s4) {
    return this.n37(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).o37 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).s35 = function (_this__u8e3s4) {
    return this.o37(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).e37 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).u35 = function (_this__u8e3s4) {
    return this.e37((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).p37 = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).w35 = function (_this__u8e3s4, size) {
    return this.p37(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.r37_1 = kClass;
    this.s37_1 = new ArrayClassDesc(eSerializer.y2z());
  }
  protoOf(ReferenceArraySerializer).y2z = function () {
    return this.s37_1;
  };
  protoOf(ReferenceArraySerializer).t37 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).z36 = function (_this__u8e3s4) {
    return this.t37((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).u37 = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).b37 = function (_this__u8e3s4) {
    return this.u37((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).k25 = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).v37 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ReferenceArraySerializer).q35 = function (_this__u8e3s4) {
    return this.v37(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).w37 = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.r37_1);
  };
  protoOf(ReferenceArraySerializer).s35 = function (_this__u8e3s4) {
    return this.w37(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).x37 = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).u35 = function (_this__u8e3s4) {
    return this.x37((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).y37 = function (_this__u8e3s4, size) {
    return _this__u8e3s4.t5(size);
  };
  protoOf(ReferenceArraySerializer).w35 = function (_this__u8e3s4, size) {
    return this.y37(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).z37 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.d2(index, element);
  };
  protoOf(ReferenceArraySerializer).y35 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.z37(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).a36 = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).z36 = function (_this__u8e3s4) {
    return this.a36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).b36 = function (_this__u8e3s4) {
    return _this__u8e3s4.g();
  };
  protoOf(CollectionSerializer).b37 = function (_this__u8e3s4) {
    return this.b36((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.g37_1 = keySerializer;
    this.h37_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).i37 = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    var step_0 = progression.e1_1;
    if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.j37(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).e36 = function (decoder, builder, startIndex, size) {
    return this.i37(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).j37 = function (decoder, index, builder, checkIndex) {
    var key = decoder.i33(this.y2z(), index, this.g37_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.l33(this.y2z());
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>' call
      // Inline function 'kotlin.require' call
      if (!(this_0 === (index + 1 | 0))) {
        // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>.<anonymous>' call
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.g2(key)) {
      var tmp_2 = this.h37_1.y2z().i31();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.h33(this.y2z(), vIndex, this.h37_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.i33(this.y2z(), vIndex, this.h37_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.l2(key, value);
  };
  protoOf(MapLikeSerializer).f36 = function (decoder, index, builder, checkIndex) {
    return this.j37(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).d36 = function (encoder, value) {
    var size = this.z36(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.y2z();
    var composite = encoder.n34(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.serialize.<anonymous>' call
    var iterator = this.b37(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = iterator;
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.serialize.<anonymous>.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var k = element.v();
      // Inline function 'kotlin.collections.component2' call
      var v = element.w();
      var tmp = this.y2z();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.k34(tmp, _unary__edvuaz, this.g37_1, k);
      var tmp_0 = this.y2z();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.k34(tmp_0, _unary__edvuaz_0, this.h37_1, v);
    }
    composite.w32(descriptor);
  };
  protoOf(MapLikeSerializer).z2z = function (encoder, value) {
    return this.d36(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.c36_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).d36 = function (encoder, value) {
    var size = this.z36(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.y2z();
    var composite = encoder.n34(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.CollectionLikeSerializer.serialize.<anonymous>' call
    var iterator = this.b37(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.k34(this.y2z(), index, this.c36_1, iterator.i());
      }
       while (inductionVariable < size);
    composite.w32(descriptor);
  };
  protoOf(CollectionLikeSerializer).z2z = function (encoder, value) {
    return this.d36(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).e36 = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.CollectionLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.f36(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).f36 = function (decoder, index, builder, checkIndex) {
    this.y35(builder, index, decoder.i33(this.y2z(), index, this.c36_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.m33($this.y2z());
    $this.w35(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).h36 = function (decoder, previous) {
    var tmp0_elvis_lhs = previous == null ? null : this.u35(previous);
    var builder = tmp0_elvis_lhs == null ? this.k25() : tmp0_elvis_lhs;
    var startIndex = this.q35(builder);
    var compositeDecoder = decoder.v32(this.y2z());
    if (compositeDecoder.k33()) {
      this.e36(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.l33(this.y2z());
        if (index === -1)
          break $l$loop;
        this.g36(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.w32(this.y2z());
    return this.s35(builder);
  };
  protoOf(AbstractCollectionSerializer).a30 = function (decoder) {
    return this.h36(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).g36 = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.f36(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.f36.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.b38_1 = new PrimitiveArrayDescriptor(primitiveSerializer.y2z());
  }
  protoOf(PrimitiveArraySerializer).y2z = function () {
    return this.b38_1;
  };
  protoOf(PrimitiveArraySerializer).c38 = function (_this__u8e3s4) {
    return _this__u8e3s4.d38();
  };
  protoOf(PrimitiveArraySerializer).q35 = function (_this__u8e3s4) {
    return this.c38(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).e38 = function (_this__u8e3s4) {
    return _this__u8e3s4.f38();
  };
  protoOf(PrimitiveArraySerializer).s35 = function (_this__u8e3s4) {
    return this.e38(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).g38 = function (_this__u8e3s4, size) {
    return _this__u8e3s4.h38(size);
  };
  protoOf(PrimitiveArraySerializer).w35 = function (_this__u8e3s4, size) {
    return this.g38(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).i38 = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).b37 = function (_this__u8e3s4) {
    return this.i38((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).j38 = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).y35 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.j38(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).k25 = function () {
    return this.u35(this.k38());
  };
  protoOf(PrimitiveArraySerializer).n38 = function (encoder, value) {
    var size = this.z36(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.b38_1;
    var composite = encoder.n34(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.PrimitiveArraySerializer.serialize.<anonymous>' call
    this.m38(composite, value, size);
    composite.w32(descriptor);
  };
  protoOf(PrimitiveArraySerializer).z2z = function (encoder, value) {
    return this.n38(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).d36 = function (encoder, value) {
    return this.n38(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).a30 = function (decoder) {
    return this.h36(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).o38 = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.d38() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.h38(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.h38.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.p38_1 = longArray(0);
  }
  var Companion_instance_0;
  function Companion_getInstance_6() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    var elementsInLastSlot = elementsCount & 63;
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).d3(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.t38_1[slot] = $this.t38_1[slot].h3((new Long(1, 0)).d3(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.t38_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.t38_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.c3());
          slotMarks = slotMarks.h3((new Long(1, 0)).d3(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.r38_1($this.q38_1, index)) {
            $this.t38_1[slot] = slotMarks;
            return index;
          }
        }
        $this.t38_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_6();
    this.q38_1 = descriptor;
    this.r38_1 = readIfAbsent;
    var elementsCount = this.q38_1.k31();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).d3(elementsCount);
      }
      tmp.s38_1 = tmp_0;
      this.t38_1 = Companion_getInstance_6().p38_1;
    } else {
      this.s38_1 = new Long(0, 0);
      this.t38_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).u38 = function (index) {
    if (index < 64) {
      this.s38_1 = this.s38_1.h3((new Long(1, 0)).d3(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).v38 = function () {
    var elementsCount = this.q38_1.k31();
    while (!this.s38_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.s38_1.c3());
      this.s38_1 = this.s38_1.h3((new Long(1, 0)).d3(index));
      if (this.r38_1(this.q38_1, index)) {
        return index;
      }
    }
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.i39_1 = true;
  }
  protoOf(InlineClassDescriptor).j31 = function () {
    return this.i39_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.c31() === other.c31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.InlineClassDescriptor.equals.<anonymous>' call
      if (!(other.i39_1 && contentEquals(this.v39(), other.v39()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.k31() === other.k31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.k31();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.g31(index).c31() === other.g31(index).c31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.g31(index).i31(), other.g31(index).i31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.x39_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).y39 = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.x39_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).y2z = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).z2z = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).a30 = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function NoOpEncoder() {
    NoOpEncoder_instance = this;
    AbstractEncoder.call(this);
    this.a3a_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).j33 = function () {
    return this.a3a_1;
  };
  protoOf(NoOpEncoder).o33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).p33 = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).q33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).r33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).s33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).t33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).u33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).v33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).w33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).x33 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).y33 = function (value) {
    return Unit_instance;
  };
  var NoOpEncoder_instance;
  function NoOpEncoder_getInstance() {
    if (NoOpEncoder_instance == null)
      new NoOpEncoder();
    return NoOpEncoder_instance;
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.b3a_1 = OBJECT_getInstance();
    this.c3a_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).i31 = function () {
    return this.b3a_1;
  };
  protoOf(NothingSerialDescriptor).c31 = function () {
    return this.c3a_1;
  };
  protoOf(NothingSerialDescriptor).k31 = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).d31 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).e31 = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).h31 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).g31 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).f31 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.c3a_1) + imul(31, this.b3a_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.d3a_1 = serializer;
    this.e3a_1 = new SerialDescriptorForNullable(this.d3a_1.y2z());
  }
  protoOf(NullableSerializer).y2z = function () {
    return this.e3a_1;
  };
  protoOf(NullableSerializer).f3a = function (encoder, value) {
    if (!(value == null)) {
      encoder.m34();
      encoder.l34(this.d3a_1, value);
    } else {
      encoder.p33();
    }
  };
  protoOf(NullableSerializer).z2z = function (encoder, value) {
    return this.f3a(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).a30 = function (decoder) {
    return decoder.h32() ? decoder.u32(this.d3a_1) : decoder.i32();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.d3a_1, other.d3a_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.d3a_1);
  };
  function SerialDescriptorForNullable(original) {
    this.m31_1 = original;
    this.n31_1 = this.m31_1.c31() + '?';
    this.o31_1 = cachedSerialNames(this.m31_1);
  }
  protoOf(SerialDescriptorForNullable).d31 = function (index) {
    return this.m31_1.d31(index);
  };
  protoOf(SerialDescriptorForNullable).e31 = function (name) {
    return this.m31_1.e31(name);
  };
  protoOf(SerialDescriptorForNullable).f31 = function (index) {
    return this.m31_1.f31(index);
  };
  protoOf(SerialDescriptorForNullable).g31 = function (index) {
    return this.m31_1.g31(index);
  };
  protoOf(SerialDescriptorForNullable).h31 = function (index) {
    return this.m31_1.h31(index);
  };
  protoOf(SerialDescriptorForNullable).i31 = function () {
    return this.m31_1.i31();
  };
  protoOf(SerialDescriptorForNullable).j31 = function () {
    return this.m31_1.j31();
  };
  protoOf(SerialDescriptorForNullable).k31 = function () {
    return this.m31_1.k31();
  };
  protoOf(SerialDescriptorForNullable).l31 = function () {
    return this.m31_1.l31();
  };
  protoOf(SerialDescriptorForNullable).c31 = function () {
    return this.n31_1;
  };
  protoOf(SerialDescriptorForNullable).f32 = function () {
    return this.o31_1;
  };
  protoOf(SerialDescriptorForNullable).y30 = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.m31_1, other.m31_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.m31_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.m31_1), 31);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.d30_1 = this$0.h3a_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.g3a_1 = objectInstance;
    this.h3a_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.i3a_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).y2z = function () {
    var tmp0 = this.i3a_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(ObjectSerializer).o30 = function (encoder, value) {
    encoder.v32(this.y2z()).w32(this.y2z());
  };
  protoOf(ObjectSerializer).z2z = function (encoder, value) {
    return this.o30(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).a30 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.y2z();
    var composite = decoder.v32(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.serialization.internal.ObjectSerializer.deserialize.<anonymous>' call
      if (composite.k33()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.l33(this.y2z());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.w32(descriptor);
    return this.g3a_1;
  };
  function descriptor$factory_1() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.y2z();
    }, null);
  }
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.f32();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.k31());
    var inductionVariable = 0;
    var last = _this__u8e3s4.k31();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.d31(i);
        result.e(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.rb();
    var tmp;
    if (!(t == null) ? isInterface(t, KClass) : false) {
      tmp = t;
    } else {
      if (!(t == null) ? isInterface(t, KTypeParameter) : false) {
        throw IllegalArgumentException_init_$Create$('Captured type parameter ' + toString(t) + ' from generic non-reified function. ' + ('Such functionality cannot be supported because ' + toString(t) + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + toString(t) + '.'));
      } else {
        throw IllegalArgumentException_init_$Create$('Only KClass supported as classifier, got ' + toString_0(t));
      }
    }
    var tmp_0 = tmp;
    return isInterface(tmp_0, KClass) ? tmp_0 : THROW_CCE();
  }
  function typeOrThrow(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0 = _this__u8e3s4.k3a_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        // Inline function 'kotlinx.serialization.internal.typeOrThrow.<anonymous>' call
        var message = 'Star projections in type arguments are not allowed, but had ' + toString_0(_this__u8e3s4.k3a_1);
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    return tmp$ret$1;
  }
  function notRegisteredMessage(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0_elvis_lhs = _this__u8e3s4.fb();
    return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    var tmp;
    // Inline function 'kotlinx.serialization.internal.compactArray.<anonymous>' call
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    if (!(_this__u8e3s4 == null || _this__u8e3s4.q())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp24_safe_receiver = tmp;
    var tmp_0;
    if (tmp24_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp24_safe_receiver);
    }
    var tmp0_elvis_lhs = tmp_0;
    return tmp0_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp0_elvis_lhs;
  }
  function notRegisteredMessage_0(className) {
    _init_properties_Platform_common_kt__3qzecs();
    return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function throwMissingFieldException(seen, goldenMask, descriptor) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var missingFields = ArrayList_init_$Create$_0();
    var missingFieldsBits = goldenMask & ~seen;
    var inductionVariable = 0;
    if (inductionVariable < 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!((missingFieldsBits & 1) === 0)) {
          // Inline function 'kotlin.collections.plusAssign' call
          var element = descriptor.d31(i);
          missingFields.e(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.c31());
  }
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.c31());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = elementDescriptors.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver = element.c31();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var _iterator__ex2g4s_0 = elementDescriptors.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver_0 = element_0.i31();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.s39_1;
    // Inline function 'kotlin.getValue' call
    childSerializers$factory();
    return tmp0.w();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.u39_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory_0();
    return tmp0.w();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.n39_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.n39_1[i];
        indices.l2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp25_safe_receiver = this$0.k39_1;
      var tmp0_elvis_lhs = tmp25_safe_receiver == null ? null : tmp25_safe_receiver.y39();
      return tmp0_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp0_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp26_safe_receiver = this$0.k39_1;
      var tmp27_safe_receiver = tmp26_safe_receiver == null ? null : tmp26_safe_receiver.z39();
      var tmp;
      if (tmp27_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(tmp27_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp27_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp27_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.typeParameterDescriptors$delegate.<anonymous>.<anonymous>' call
          var tmp$ret$0 = item.y2z();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.v39());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.d31(i) + ': ' + this$0.g31(i).c31();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.j39_1 = serialName;
    this.k39_1 = generatedSerializer;
    this.l39_1 = elementsCount;
    this.m39_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.l39_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = fillArrayVal(Array(tmp_1), null);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.n39_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.l39_1;
    tmp_3.o39_1 = fillArrayVal(Array(size), null);
    this.p39_1 = null;
    this.q39_1 = booleanArray(this.l39_1);
    this.r39_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.s39_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.t39_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.u39_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).c31 = function () {
    return this.j39_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).k31 = function () {
    return this.l39_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).i31 = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).l31 = function () {
    var tmp0_elvis_lhs = this.p39_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).f32 = function () {
    return this.r39_1.j2();
  };
  protoOf(PluginGeneratedSerialDescriptor).v39 = function () {
    var tmp0 = this.t39_1;
    // Inline function 'kotlin.getValue' call
    typeParameterDescriptors$factory();
    return tmp0.w();
  };
  protoOf(PluginGeneratedSerialDescriptor).w39 = function (name, isOptional) {
    this.m39_1 = this.m39_1 + 1 | 0;
    this.n39_1[this.m39_1] = name;
    this.q39_1[this.m39_1] = isOptional;
    this.o39_1[this.m39_1] = null;
    if (this.m39_1 === (this.l39_1 - 1 | 0)) {
      this.r39_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).g31 = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).y2z();
  };
  protoOf(PluginGeneratedSerialDescriptor).h31 = function (index) {
    return getChecked_0(this.q39_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).f31 = function (index) {
    var tmp0_elvis_lhs = getChecked(this.o39_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).d31 = function (index) {
    return getChecked(this.n39_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).e31 = function (name) {
    var tmp0_elvis_lhs = this.r39_1.i2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.c31() === other.c31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.equals.<anonymous>' call
      if (!contentEquals(this.v39(), other.v39())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.k31() === other.k31())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.k31();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.g31(index).c31() === other.g31(index).c31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.g31(index).i31(), other.g31(index).i31())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    var tmp = until(0, this.l39_1);
    var tmp_0 = this.c31() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.v39();
    }, null);
  }
  function _hashCode$factory_0() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef_0(receiver);
    }, null);
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function SerializerFactory() {
  }
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_0()));
  }
  protoOf(CharArraySerializer_0).o3a = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.o3a((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).p3a = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.p3a((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).k38 = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).q3a = function (decoder, index, builder, checkIndex) {
    builder.t3a(decoder.e33(this.b38_1, index));
  };
  protoOf(CharArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.q3a(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.q3a(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).u3a = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.h34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).m38 = function (encoder, content, size) {
    return this.u3a(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).x3a = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.x3a((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).y3a = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.y3a((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).k38 = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).z3a = function (decoder, index, builder, checkIndex) {
    builder.c3b(decoder.d33(this.b38_1, index));
  };
  protoOf(DoubleArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.z3a(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.z3a(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).d3b = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.g34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).m38 = function (encoder, content, size) {
    return this.d3b(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).g3b = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.g3b((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).h3b = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.h3b((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).k38 = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).i3b = function (decoder, index, builder, checkIndex) {
    builder.l3b(decoder.c33(this.b38_1, index));
  };
  protoOf(FloatArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.i3b(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.i3b(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).m3b = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.f34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).m38 = function (encoder, content, size) {
    return this.m3b(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(Companion_getInstance_1()));
  }
  protoOf(LongArraySerializer_0).p3b = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.p3b((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).q3b = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.q3b((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).k38 = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).r3b = function (decoder, index, builder, checkIndex) {
    builder.u3b(decoder.b33(this.b38_1, index));
  };
  protoOf(LongArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.r3b(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.r3b(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).v3b = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.e34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).m38 = function (encoder, content, size) {
    return this.v3b(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_2()));
  }
  protoOf(ULongArraySerializer_0).y3b = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.y3b(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.al_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).z3b = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.z3b(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.al_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).a3c = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).k38 = function () {
    return new ULongArray(this.a3c());
  };
  protoOf(ULongArraySerializer_0).b3c = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.g33(this.b38_1, index).n32();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.e3c(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.b3c(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.b3c(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).f3c = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.j34(this.b38_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.u33(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).m38 = function (encoder, content, size) {
    return this.f3c(encoder, content instanceof ULongArray ? content.al_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).i3c = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.i3c((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).j3c = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.j3c((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).k38 = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).k3c = function (decoder, index, builder, checkIndex) {
    builder.n3c(decoder.a33(this.b38_1, index));
  };
  protoOf(IntArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.k3c(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.k3c(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).o3c = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.d34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).m38 = function (encoder, content, size) {
    return this.o3c(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(Companion_getInstance_3()));
  }
  protoOf(UIntArraySerializer_0).r3c = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.r3c(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.pk_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).s3c = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.s3c(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.pk_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).t3c = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).k38 = function () {
    return new UIntArray(this.t3c());
  };
  protoOf(UIntArraySerializer_0).u3c = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.g33(this.b38_1, index).m32();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.x3c(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.u3c(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.u3c(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).y3c = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.j34(this.b38_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.t33(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).m38 = function (encoder, content, size) {
    return this.y3c(encoder, content instanceof UIntArray ? content.pk_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).b3d = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.b3d((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).c3d = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.c3d((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).k38 = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).d3d = function (decoder, index, builder, checkIndex) {
    builder.g3d(decoder.z32(this.b38_1, index));
  };
  protoOf(ShortArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.d3d(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.d3d(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).h3d = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.c34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).m38 = function (encoder, content, size) {
    return this.h3d(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(Companion_getInstance_4()));
  }
  protoOf(UShortArraySerializer_0).k3d = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.k3d(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.ll_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).l3d = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.l3d(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.ll_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).m3d = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).k38 = function () {
    return new UShortArray(this.m3d());
  };
  protoOf(UShortArraySerializer_0).n3d = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.g33(this.b38_1, index).l32();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.q3d(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.n3d(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.n3d(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).r3d = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.j34(this.b38_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.s33(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).m38 = function (encoder, content, size) {
    return this.r3d(encoder, content instanceof UShortArray ? content.ll_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).u3d = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.u3d((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).v3d = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.v3d((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).k38 = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).w3d = function (decoder, index, builder, checkIndex) {
    builder.z3d(decoder.y32(this.b38_1, index));
  };
  protoOf(ByteArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.w3d(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.w3d(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).a3e = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.b34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).m38 = function (encoder, content, size) {
    return this.a3e(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(Companion_getInstance_5()));
  }
  protoOf(UByteArraySerializer_0).d3e = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.d3e(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.ek_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).e3e = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.e3e(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.ek_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).f3e = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).k38 = function () {
    return new UByteArray(this.f3e());
  };
  protoOf(UByteArraySerializer_0).g3e = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.g33(this.b38_1, index).k32();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.j3e(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.g3e(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.g3e(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).k3e = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.j34(this.b38_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.r33(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).m38 = function (encoder, content, size) {
    return this.k3e(encoder, content instanceof UByteArray ? content.ek_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).n3e = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).z36 = function (_this__u8e3s4) {
    return this.n3e((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).o3e = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).u35 = function (_this__u8e3s4) {
    return this.o3e((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).k38 = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).p3e = function (decoder, index, builder, checkIndex) {
    builder.s3e(decoder.x32(this.b38_1, index));
  };
  protoOf(BooleanArraySerializer_0).f36 = function (decoder, index, builder, checkIndex) {
    return this.p3e(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).l38 = function (decoder, index, builder, checkIndex) {
    return this.p3e(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).t3e = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.a34(this.b38_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).m38 = function (encoder, content, size) {
    return this.t3e(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.r3a_1 = bufferWithData;
    this.s3a_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(CharArrayBuilder).d38 = function () {
    return this.s3a_1;
  };
  protoOf(CharArrayBuilder).h38 = function (requiredCapacity) {
    if (this.r3a_1.length < requiredCapacity)
      this.r3a_1 = copyOf(this.r3a_1, coerceAtLeast(requiredCapacity, imul(this.r3a_1.length, 2)));
  };
  protoOf(CharArrayBuilder).t3a = function (c) {
    this.o38();
    var tmp = this.r3a_1;
    var _unary__edvuaz = this.s3a_1;
    this.s3a_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).f38 = function () {
    return copyOf(this.r3a_1, this.s3a_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.a3b_1 = bufferWithData;
    this.b3b_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(DoubleArrayBuilder).d38 = function () {
    return this.b3b_1;
  };
  protoOf(DoubleArrayBuilder).h38 = function (requiredCapacity) {
    if (this.a3b_1.length < requiredCapacity)
      this.a3b_1 = copyOf_0(this.a3b_1, coerceAtLeast(requiredCapacity, imul(this.a3b_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).c3b = function (c) {
    this.o38();
    var tmp = this.a3b_1;
    var _unary__edvuaz = this.b3b_1;
    this.b3b_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).f38 = function () {
    return copyOf_0(this.a3b_1, this.b3b_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.j3b_1 = bufferWithData;
    this.k3b_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(FloatArrayBuilder).d38 = function () {
    return this.k3b_1;
  };
  protoOf(FloatArrayBuilder).h38 = function (requiredCapacity) {
    if (this.j3b_1.length < requiredCapacity)
      this.j3b_1 = copyOf_1(this.j3b_1, coerceAtLeast(requiredCapacity, imul(this.j3b_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).l3b = function (c) {
    this.o38();
    var tmp = this.j3b_1;
    var _unary__edvuaz = this.k3b_1;
    this.k3b_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).f38 = function () {
    return copyOf_1(this.j3b_1, this.k3b_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.s3b_1 = bufferWithData;
    this.t3b_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(LongArrayBuilder).d38 = function () {
    return this.t3b_1;
  };
  protoOf(LongArrayBuilder).h38 = function (requiredCapacity) {
    if (this.s3b_1.length < requiredCapacity)
      this.s3b_1 = copyOf_2(this.s3b_1, coerceAtLeast(requiredCapacity, imul(this.s3b_1.length, 2)));
  };
  protoOf(LongArrayBuilder).u3b = function (c) {
    this.o38();
    var tmp = this.s3b_1;
    var _unary__edvuaz = this.t3b_1;
    this.t3b_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).f38 = function () {
    return copyOf_2(this.s3b_1, this.t3b_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.c3c_1 = bufferWithData;
    this.d3c_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.h38(10);
  }
  protoOf(ULongArrayBuilder).d38 = function () {
    return this.d3c_1;
  };
  protoOf(ULongArrayBuilder).h38 = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.c3c_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.c3c_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.c3c_1), 2));
      tmp.c3c_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).e3c = function (c) {
    this.o38();
    var tmp = this.c3c_1;
    var _unary__edvuaz = this.d3c_1;
    this.d3c_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).u3e = function () {
    var tmp0 = this.c3c_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.d3c_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).f38 = function () {
    return new ULongArray(this.u3e());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.l3c_1 = bufferWithData;
    this.m3c_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(IntArrayBuilder).d38 = function () {
    return this.m3c_1;
  };
  protoOf(IntArrayBuilder).h38 = function (requiredCapacity) {
    if (this.l3c_1.length < requiredCapacity)
      this.l3c_1 = copyOf_3(this.l3c_1, coerceAtLeast(requiredCapacity, imul(this.l3c_1.length, 2)));
  };
  protoOf(IntArrayBuilder).n3c = function (c) {
    this.o38();
    var tmp = this.l3c_1;
    var _unary__edvuaz = this.m3c_1;
    this.m3c_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).f38 = function () {
    return copyOf_3(this.l3c_1, this.m3c_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.v3c_1 = bufferWithData;
    this.w3c_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.h38(10);
  }
  protoOf(UIntArrayBuilder).d38 = function () {
    return this.w3c_1;
  };
  protoOf(UIntArrayBuilder).h38 = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.v3c_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.v3c_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.v3c_1), 2));
      tmp.v3c_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).x3c = function (c) {
    this.o38();
    var tmp = this.v3c_1;
    var _unary__edvuaz = this.w3c_1;
    this.w3c_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).v3e = function () {
    var tmp0 = this.v3c_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.w3c_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).f38 = function () {
    return new UIntArray(this.v3e());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.e3d_1 = bufferWithData;
    this.f3d_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(ShortArrayBuilder).d38 = function () {
    return this.f3d_1;
  };
  protoOf(ShortArrayBuilder).h38 = function (requiredCapacity) {
    if (this.e3d_1.length < requiredCapacity)
      this.e3d_1 = copyOf_4(this.e3d_1, coerceAtLeast(requiredCapacity, imul(this.e3d_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).g3d = function (c) {
    this.o38();
    var tmp = this.e3d_1;
    var _unary__edvuaz = this.f3d_1;
    this.f3d_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).f38 = function () {
    return copyOf_4(this.e3d_1, this.f3d_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.o3d_1 = bufferWithData;
    this.p3d_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.h38(10);
  }
  protoOf(UShortArrayBuilder).d38 = function () {
    return this.p3d_1;
  };
  protoOf(UShortArrayBuilder).h38 = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.o3d_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.o3d_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.o3d_1), 2));
      tmp.o3d_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).q3d = function (c) {
    this.o38();
    var tmp = this.o3d_1;
    var _unary__edvuaz = this.p3d_1;
    this.p3d_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).w3e = function () {
    var tmp0 = this.o3d_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.p3d_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).f38 = function () {
    return new UShortArray(this.w3e());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.x3d_1 = bufferWithData;
    this.y3d_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(ByteArrayBuilder).d38 = function () {
    return this.y3d_1;
  };
  protoOf(ByteArrayBuilder).h38 = function (requiredCapacity) {
    if (this.x3d_1.length < requiredCapacity)
      this.x3d_1 = copyOf_5(this.x3d_1, coerceAtLeast(requiredCapacity, imul(this.x3d_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).z3d = function (c) {
    this.o38();
    var tmp = this.x3d_1;
    var _unary__edvuaz = this.y3d_1;
    this.y3d_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).f38 = function () {
    return copyOf_5(this.x3d_1, this.y3d_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.h3e_1 = bufferWithData;
    this.i3e_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.h38(10);
  }
  protoOf(UByteArrayBuilder).d38 = function () {
    return this.i3e_1;
  };
  protoOf(UByteArrayBuilder).h38 = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.h3e_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.h3e_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.h3e_1), 2));
      tmp.h3e_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).j3e = function (c) {
    this.o38();
    var tmp = this.h3e_1;
    var _unary__edvuaz = this.i3e_1;
    this.i3e_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).x3e = function () {
    var tmp0 = this.h3e_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.i3e_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).f38 = function () {
    return new UByteArray(this.x3e());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.q3e_1 = bufferWithData;
    this.r3e_1 = bufferWithData.length;
    this.h38(10);
  }
  protoOf(BooleanArrayBuilder).d38 = function () {
    return this.r3e_1;
  };
  protoOf(BooleanArrayBuilder).h38 = function (requiredCapacity) {
    if (this.q3e_1.length < requiredCapacity)
      this.q3e_1 = copyOf_6(this.q3e_1, coerceAtLeast(requiredCapacity, imul(this.q3e_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).s3e = function (c) {
    this.o38();
    var tmp = this.q3e_1;
    var _unary__edvuaz = this.r3e_1;
    this.r3e_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).f38 = function () {
    return copyOf_6(this.q3e_1, this.r3e_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().i2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.y3e_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).y2z = function () {
    return this.y3e_1;
  };
  protoOf(StringSerializer).z3e = function (encoder, value) {
    return encoder.y33(value);
  };
  protoOf(StringSerializer).z2z = function (encoder, value) {
    return this.z3e(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).a30 = function (decoder) {
    return decoder.r32();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.a3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).y2z = function () {
    return this.a3f_1;
  };
  protoOf(CharSerializer).b3f = function (encoder, value) {
    return encoder.x33(value);
  };
  protoOf(CharSerializer).z2z = function (encoder, value) {
    return this.b3f(encoder, value instanceof Char ? value.k1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).c3f = function (decoder) {
    return decoder.q32();
  };
  protoOf(CharSerializer).a30 = function (decoder) {
    return new Char(this.c3f(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.d3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).y2z = function () {
    return this.d3f_1;
  };
  protoOf(DoubleSerializer).e3f = function (encoder, value) {
    return encoder.w33(value);
  };
  protoOf(DoubleSerializer).z2z = function (encoder, value) {
    return this.e3f(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).a30 = function (decoder) {
    return decoder.p32();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.f3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).y2z = function () {
    return this.f3f_1;
  };
  protoOf(FloatSerializer).g3f = function (encoder, value) {
    return encoder.v33(value);
  };
  protoOf(FloatSerializer).z2z = function (encoder, value) {
    return this.g3f(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).a30 = function (decoder) {
    return decoder.o32();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.h3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).y2z = function () {
    return this.h3f_1;
  };
  protoOf(LongSerializer).i3f = function (encoder, value) {
    return encoder.u33(value);
  };
  protoOf(LongSerializer).z2z = function (encoder, value) {
    return this.i3f(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).a30 = function (decoder) {
    return decoder.n32();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.j3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).y2z = function () {
    return this.j3f_1;
  };
  protoOf(IntSerializer).k3f = function (encoder, value) {
    return encoder.t33(value);
  };
  protoOf(IntSerializer).z2z = function (encoder, value) {
    return this.k3f(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).a30 = function (decoder) {
    return decoder.m32();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.l3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).y2z = function () {
    return this.l3f_1;
  };
  protoOf(ShortSerializer).m3f = function (encoder, value) {
    return encoder.s33(value);
  };
  protoOf(ShortSerializer).z2z = function (encoder, value) {
    return this.m3f(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).a30 = function (decoder) {
    return decoder.l32();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.n3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).y2z = function () {
    return this.n3f_1;
  };
  protoOf(ByteSerializer).o3f = function (encoder, value) {
    return encoder.r33(value);
  };
  protoOf(ByteSerializer).z2z = function (encoder, value) {
    return this.o3f(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).a30 = function (decoder) {
    return decoder.k32();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.p3f_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).y2z = function () {
    return this.p3f_1;
  };
  protoOf(BooleanSerializer).q3f = function (encoder, value) {
    return encoder.q33(value);
  };
  protoOf(BooleanSerializer).z2z = function (encoder, value) {
    return this.q3f(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).a30 = function (decoder) {
    return decoder.j32();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.r3f_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).s3f = function (encoder, value) {
    this.r3f_1.o30(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).z2z = function (encoder, value) {
    return this.s3f(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).t3f = function (decoder) {
    this.r3f_1.a30(decoder);
  };
  protoOf(UnitSerializer).a30 = function (decoder) {
    this.t3f(decoder);
    return Unit_instance;
  };
  protoOf(UnitSerializer).y2z = function () {
    return this.r3f_1.y2z();
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.u3f_1 = serialName;
    this.v3f_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).c31 = function () {
    return this.u3f_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).i31 = function () {
    return this.v3f_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).k31 = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).d31 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).e31 = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).h31 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).g31 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).f31 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.u3f_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.u3f_1 === other.u3f_1 && equals(this.v3f_1, other.v3f_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.u3f_1) + imul(31, this.v3f_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var keys = get_BUILTIN_SERIALIZERS().j2();
    var _iterator__ex2g4s = keys.g();
    while (_iterator__ex2g4s.h()) {
      var primitive = _iterator__ex2g4s.i();
      var simpleName = capitalize(ensureNotNull(primitive.fb()));
      var qualifiedName = 'kotlin.' + simpleName;
      if (equals_0(serialName, qualifiedName, true) || equals_0(serialName, simpleName, true)) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exist ' + capitalize(simpleName) + 'Serializer.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  function capitalize(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    // Inline function 'kotlin.text.replaceFirstChar' call
    var tmp;
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(_this__u8e3s4) > 0) {
      // Inline function 'kotlinx.serialization.internal.capitalize.<anonymous>' call
      var it = charSequenceGet(_this__u8e3s4, 0);
      var tmp$ret$1 = isLowerCase(it) ? titlecase(it) : toString_1(it);
      var tmp_0 = toString(tmp$ret$1);
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = tmp_0 + _this__u8e3s4.substring(1);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = mapOf([to(PrimitiveClasses_getInstance().ec(), serializer_0(StringCompanionObject_instance)), to(getKClass(Char), serializer_1(Companion_getInstance_0())), to(PrimitiveClasses_getInstance().hc(), CharArraySerializer()), to(PrimitiveClasses_getInstance().cc(), serializer_2(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().nc(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().bc(), serializer_3(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().mc(), FloatArraySerializer()), to(getKClass(Long), serializer_4(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().lc(), LongArraySerializer()), to(getKClass(ULong), serializer_5(Companion_getInstance_2())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().ac(), serializer_6(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().kc(), IntArraySerializer()), to(getKClass(UInt), serializer_7(Companion_getInstance_3())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().zb(), serializer_8(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().jc(), ShortArraySerializer()), to(getKClass(UShort), serializer_9(Companion_getInstance_4())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().yb(), serializer_10(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().ic(), ByteArraySerializer()), to(getKClass(UByte), serializer_11(Companion_getInstance_5())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().xb(), serializer_12(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().gc(), BooleanArraySerializer()), to(getKClass(Unit), serializer_13(Unit_instance)), to(PrimitiveClasses_getInstance().wb(), NothingSerializer()), to(getKClass(Duration), serializer_14(Companion_getInstance()))]);
    }
  }
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).y3f = function (_this__u8e3s4, index) {
    return this.a3g(this.z3f(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).a3g = function (nestedName) {
    var tmp0_elvis_lhs = this.d3g();
    return this.e3g(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).z3f = function (descriptor, index) {
    return descriptor.d31(index);
  };
  protoOf(NamedValueDecoder).e3g = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).f3g = function () {
    return this.b3g_1.q() ? '$' : joinToString(this.b3g_1, '.', '$.');
  };
  function tagBlock($this, tag, block) {
    $this.s3g(tag);
    var r = block();
    if (!$this.c3g_1) {
      $this.t3g();
    }
    $this.c3g_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.t32($deserializer, $previousValue);
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.b3g_1 = ArrayList_init_$Create$_0();
    this.c3g_1 = false;
  }
  protoOf(TaggedDecoder).j33 = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).g3g = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).h3g = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).i3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).j3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).k3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).l3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).m3g = function (tag) {
    var tmp = this.g3g(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).n3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).o3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).p3g = function (tag) {
    var tmp = this.g3g(tag);
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).q3g = function (tag) {
    var tmp = this.g3g(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).r3g = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlinx.serialization.internal.TaggedDecoder.decodeTaggedInline.<anonymous>' call
    this.s3g(tag);
    return this;
  };
  protoOf(TaggedDecoder).t32 = function (deserializer, previousValue) {
    return this.u32(deserializer);
  };
  protoOf(TaggedDecoder).s32 = function (descriptor) {
    return this.r3g(this.t3g(), descriptor);
  };
  protoOf(TaggedDecoder).h32 = function () {
    var tmp0_elvis_lhs = this.d3g();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.h3g(currentTag);
  };
  protoOf(TaggedDecoder).i32 = function () {
    return null;
  };
  protoOf(TaggedDecoder).j32 = function () {
    return this.i3g(this.t3g());
  };
  protoOf(TaggedDecoder).k32 = function () {
    return this.j3g(this.t3g());
  };
  protoOf(TaggedDecoder).l32 = function () {
    return this.k3g(this.t3g());
  };
  protoOf(TaggedDecoder).m32 = function () {
    return this.l3g(this.t3g());
  };
  protoOf(TaggedDecoder).n32 = function () {
    return this.m3g(this.t3g());
  };
  protoOf(TaggedDecoder).o32 = function () {
    return this.n3g(this.t3g());
  };
  protoOf(TaggedDecoder).p32 = function () {
    return this.o3g(this.t3g());
  };
  protoOf(TaggedDecoder).q32 = function () {
    return this.p3g(this.t3g());
  };
  protoOf(TaggedDecoder).r32 = function () {
    return this.q3g(this.t3g());
  };
  protoOf(TaggedDecoder).v32 = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).w32 = function (descriptor) {
  };
  protoOf(TaggedDecoder).x32 = function (descriptor, index) {
    return this.i3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).y32 = function (descriptor, index) {
    return this.j3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).z32 = function (descriptor, index) {
    return this.k3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).a33 = function (descriptor, index) {
    return this.l3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).b33 = function (descriptor, index) {
    return this.m3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).c33 = function (descriptor, index) {
    return this.n3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).d33 = function (descriptor, index) {
    return this.o3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).e33 = function (descriptor, index) {
    return this.p3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).f33 = function (descriptor, index) {
    return this.q3g(this.y3f(descriptor, index));
  };
  protoOf(TaggedDecoder).g33 = function (descriptor, index) {
    return this.r3g(this.y3f(descriptor, index), descriptor.g31(index));
  };
  protoOf(TaggedDecoder).h33 = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.y3f(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).d3g = function () {
    return lastOrNull(this.b3g_1);
  };
  protoOf(TaggedDecoder).s3g = function (name) {
    this.b3g_1.e(name);
  };
  protoOf(TaggedDecoder).t3g = function () {
    var r = this.b3g_1.e2(get_lastIndex_0(this.b3g_1));
    this.c3g_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.u3g_1 = key;
    this.v3g_1 = value;
  }
  protoOf(MapEntry).v = function () {
    return this.u3g_1;
  };
  protoOf(MapEntry).w = function () {
    return this.v3g_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.u3g_1) + ', value=' + toString_0(this.v3g_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.u3g_1 == null ? 0 : hashCode(this.u3g_1);
    result = imul(result, 31) + (this.v3g_1 == null ? 0 : hashCode(this.v3g_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.u3g_1, tmp0_other_with_cast.u3g_1))
      return false;
    if (!equals(this.v3g_1, tmp0_other_with_cast.v3g_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.j30('key', $keySerializer.y2z());
      $this$buildSerialDescriptor.j30('value', $valueSerializer.y2z());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.y3g_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).y2z = function () {
    return this.y3g_1;
  };
  protoOf(MapEntrySerializer_0).z3g = function (_this__u8e3s4) {
    return _this__u8e3s4.v();
  };
  protoOf(MapEntrySerializer_0).a3h = function (_this__u8e3s4) {
    return this.z3g((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).b3h = function (_this__u8e3s4) {
    return _this__u8e3s4.w();
  };
  protoOf(MapEntrySerializer_0).c3h = function (_this__u8e3s4) {
    return this.b3h((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).d3h = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.j30('first', $keySerializer.y2z());
      $this$buildClassSerialDescriptor.j30('second', $valueSerializer.y2z());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.j3h_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).y2z = function () {
    return this.j3h_1;
  };
  protoOf(PairSerializer_0).k3h = function (_this__u8e3s4) {
    return _this__u8e3s4.za_1;
  };
  protoOf(PairSerializer_0).a3h = function (_this__u8e3s4) {
    return this.k3h(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).l3h = function (_this__u8e3s4) {
    return _this__u8e3s4.ab_1;
  };
  protoOf(PairSerializer_0).c3h = function (_this__u8e3s4) {
    return this.l3h(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).d3h = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.i33($this.p3h_1, 0, $this.m3h_1);
    var b = composite.i33($this.p3h_1, 1, $this.n3h_1);
    var c = composite.i33($this.p3h_1, 2, $this.o3h_1);
    composite.w32($this.p3h_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.l33($this.p3h_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.i33($this.p3h_1, 0, $this.m3h_1);
          break;
        case 1:
          b = composite.i33($this.p3h_1, 1, $this.n3h_1);
          break;
        case 2:
          c = composite.i33($this.p3h_1, 2, $this.o3h_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.w32($this.p3h_1);
    if (a === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'first' is missing");
    if (b === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'second' is missing");
    if (c === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'third' is missing");
    var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
    var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
    return new Triple(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
  }
  function TripleSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.j30('first', this$0.m3h_1.y2z());
      $this$buildClassSerialDescriptor.j30('second', this$0.n3h_1.y2z());
      $this$buildClassSerialDescriptor.j30('third', this$0.o3h_1.y2z());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.m3h_1 = aSerializer;
    this.n3h_1 = bSerializer;
    this.o3h_1 = cSerializer;
    var tmp = this;
    tmp.p3h_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).y2z = function () {
    return this.p3h_1;
  };
  protoOf(TripleSerializer_0).q3h = function (encoder, value) {
    var structuredEncoder = encoder.v32(this.p3h_1);
    structuredEncoder.k34(this.p3h_1, 0, this.m3h_1, value.rj_1);
    structuredEncoder.k34(this.p3h_1, 1, this.n3h_1, value.sj_1);
    structuredEncoder.k34(this.p3h_1, 2, this.o3h_1, value.tj_1);
    structuredEncoder.w32(this.p3h_1);
  };
  protoOf(TripleSerializer_0).z2z = function (encoder, value) {
    return this.q3h(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).a30 = function (decoder) {
    var composite = decoder.v32(this.p3h_1);
    if (composite.k33()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.e3h_1 = keySerializer;
    this.f3h_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).g3h = function (encoder, value) {
    var structuredEncoder = encoder.v32(this.y2z());
    structuredEncoder.k34(this.y2z(), 0, this.e3h_1, this.a3h(value));
    structuredEncoder.k34(this.y2z(), 1, this.f3h_1, this.c3h(value));
    structuredEncoder.w32(this.y2z());
  };
  protoOf(KeyValueSerializer).z2z = function (encoder, value) {
    return this.g3h(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).a30 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.y2z();
    var composite = decoder.v32(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.KeyValueSerializer.deserialize.<anonymous>' call
      if (composite.k33()) {
        var key = composite.i33(this.y2z(), 0, this.e3h_1);
        var value = composite.i33(this.y2z(), 1, this.f3h_1);
        tmp$ret$0 = this.d3h(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.l33(this.y2z());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.i33(this.y2z(), 0, this.e3h_1);
            break;
          case 1:
            value_0 = composite.i33(this.y2z(), 1, this.f3h_1);
            break;
          default:
            throw SerializationException_init_$Create$_0('Invalid index: ' + idx);
        }
      }
      if (key_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'key' is missing");
      if (value_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'value' is missing");
      var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
      tmp$ret$0 = this.d3h(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.w32(descriptor);
    return result;
  };
  var properties_initialized_Tuples_kt_3vs7ar;
  function _init_properties_Tuples_kt__dz0qyd() {
    if (!properties_initialized_Tuples_kt_3vs7ar) {
      properties_initialized_Tuples_kt_3vs7ar = true;
      NULL = new Object();
    }
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.r3h_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_4(Companion_getInstance_1()));
  }
  protoOf(ULongSerializer).y2z = function () {
    return this.r3h_1;
  };
  protoOf(ULongSerializer).s3h = function (encoder, value) {
    var tmp = encoder.z33(this.r3h_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.u33(tmp$ret$0);
  };
  protoOf(ULongSerializer).z2z = function (encoder, value) {
    return this.s3h(encoder, value instanceof ULong ? value.vk_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).t3h = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.s32(this.r3h_1).n32();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).a30 = function (decoder) {
    return new ULong(this.t3h(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.u3h_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_6(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).y2z = function () {
    return this.u3h_1;
  };
  protoOf(UIntSerializer).v3h = function (encoder, value) {
    var tmp = encoder.z33(this.u3h_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.t33(tmp$ret$0);
  };
  protoOf(UIntSerializer).z2z = function (encoder, value) {
    return this.v3h(encoder, value instanceof UInt ? value.kk_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).w3h = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.s32(this.u3h_1).m32();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).a30 = function (decoder) {
    return new UInt(this.w3h(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.x3h_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_8(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).y2z = function () {
    return this.x3h_1;
  };
  protoOf(UShortSerializer).y3h = function (encoder, value) {
    var tmp = encoder.z33(this.x3h_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.s33(tmp$ret$0);
  };
  protoOf(UShortSerializer).z2z = function (encoder, value) {
    return this.y3h(encoder, value instanceof UShort ? value.gl_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).z3h = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.s32(this.x3h_1).l32();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).a30 = function (decoder) {
    return new UShort(this.z3h(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.a3i_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_10(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).y2z = function () {
    return this.a3i_1;
  };
  protoOf(UByteSerializer).b3i = function (encoder, value) {
    var tmp = encoder.z33(this.a3i_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.r33(tmp$ret$0);
  };
  protoOf(UByteSerializer).z2z = function (encoder, value) {
    return this.b3i(encoder, value instanceof UByte ? value.zj_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).c3i = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.s32(this.a3i_1).k32();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).a30 = function (decoder) {
    return new UByte(this.c3i(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).u30 = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.v30(kClass, typeArgumentsSerializers) : $super.v30.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.e3i_1 = class2ContextualFactory;
    this.f3i_1 = polyBase2Serializers;
    this.g3i_1 = polyBase2DefaultSerializerProvider;
    this.h3i_1 = polyBase2NamedSerializers;
    this.i3i_1 = polyBase2DefaultDeserializerProvider;
    this.j3i_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).t30 = function () {
    return this.j3i_1;
  };
  protoOf(SerialModuleImpl).q34 = function (baseClass, value) {
    if (!baseClass.gb(value))
      return null;
    var tmp28_safe_receiver = this.f3i_1.i2(baseClass);
    var tmp = tmp28_safe_receiver == null ? null : tmp28_safe_receiver.i2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.g3i_1.i2(baseClass);
    var tmp29_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp29_safe_receiver == null ? null : tmp29_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).p34 = function (baseClass, serializedClassName) {
    var tmp30_safe_receiver = this.h3i_1.i2(baseClass);
    var tmp;
    if (tmp30_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp30_safe_receiver, KtMap) ? tmp30_safe_receiver : THROW_CCE()).i2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.i3i_1.i2(baseClass);
    var tmp31_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp31_safe_receiver == null ? null : tmp31_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).v30 = function (kClass, typeArgumentsSerializers) {
    var tmp32_safe_receiver = this.e3i_1.i2(kClass);
    var tmp = tmp32_safe_receiver == null ? null : tmp32_safe_receiver.k3i(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).d3i = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.e3i_1.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.v();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.w();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.n3i_1;
        collector.o3i(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.m3i(kclass, serial.l3i_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.f3i_1.u().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.v();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.w();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_1 = classMap.u().g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.v();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.w();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$9 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.p3i(tmp_1, tmp_2, tmp$ret$9);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.g3i_1.u().g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.v();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.w();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.q3i(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.i3i_1.u().g();
    while (_iterator__ex2g4s_3.h()) {
      var element_3 = _iterator__ex2g4s_3.i();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.v();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.w();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.r3i(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith(serializer) {
    this.s3i_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.s3i_1.equals(tmp0_other_with_cast.s3i_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.s3i_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.s3i_1) + ')';
  };
  function createCache(factory) {
    return new createCache$1(factory);
  }
  function createParametrizedCache(factory) {
    return new createParametrizedCache$1(factory);
  }
  function isInterface_0(_this__u8e3s4) {
    return get_isInterface(_this__u8e3s4);
  }
  function get_isInterface(_this__u8e3s4) {
    if (_this__u8e3s4 === PrimitiveClasses_getInstance().wb())
      return false;
    // Inline function 'kotlin.js.asDynamic' call
    var tmp1_safe_receiver = get_js(_this__u8e3s4).$metadata$;
    return (tmp1_safe_receiver == null ? null : tmp1_safe_receiver.kind) == 'interface';
  }
  function compiledSerializerImpl(_this__u8e3s4) {
    var tmp0_elvis_lhs = constructSerializerForGivenTypeArgs(_this__u8e3s4, []);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp_0;
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().wb()) {
        tmp_0 = NothingSerializer_getInstance();
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp0_safe_receiver = get_js(_this__u8e3s4).Companion;
        tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.serializer();
      }
      var tmp_1 = tmp_0;
      tmp = (!(tmp_1 == null) ? isInterface(tmp_1, KSerializer) : false) ? tmp_1 : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function platformSpecificSerializerNotRegistered(_this__u8e3s4) {
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4) + 'To get enum serializer on Kotlin/JS, it should be annotated with @Serializable annotation.');
  }
  function isReferenceArray(rootClass) {
    return rootClass.equals(PrimitiveClasses_getInstance().dc());
  }
  function constructSerializerForGivenTypeArgs(_this__u8e3s4, args) {
    var tmp;
    try {
      // Inline function 'kotlin.reflect.findAssociatedObject' call
      var assocObject = findAssociatedObject(_this__u8e3s4, getKClass(SerializableWith));
      var tmp_0;
      if (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) {
        tmp_0 = isInterface(assocObject, KSerializer) ? assocObject : THROW_CCE();
      } else {
        if (!(assocObject == null) ? isInterface(assocObject, SerializerFactory) : false) {
          var tmp_1 = assocObject.l3a(args.slice());
          tmp_0 = isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
        } else {
          tmp_0 = null;
        }
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_2;
      var e = $p;
      tmp_2 = null;
      tmp = tmp_2;
    }
    return tmp;
  }
  function toNativeArrayImpl(_this__u8e3s4, eClass) {
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(_this__u8e3s4);
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function createCache$1($factory) {
    this.t3i_1 = $factory;
  }
  protoOf(createCache$1).w30 = function (key) {
    return this.t3i_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.u3i_1 = $factory;
  }
  protoOf(createParametrizedCache$1).x30 = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.internal.<no name provided>.get.<anonymous>' call
      // Inline function 'kotlin.Companion.success' call
      var value = this.u3i_1(key, types);
      tmp = _Result___init__impl__xyqfz8(value);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).y30 = get_isNullable;
  protoOf(SerialDescriptorImpl).j31 = get_isInline;
  protoOf(AbstractDecoder).i33 = decodeSerializableElement$default;
  protoOf(AbstractDecoder).u32 = decodeSerializableValue;
  protoOf(AbstractDecoder).k33 = decodeSequentially;
  protoOf(AbstractDecoder).m33 = decodeCollectionSize;
  protoOf(AbstractEncoder).m34 = encodeNotNullMark;
  protoOf(AbstractEncoder).n34 = beginCollection;
  protoOf(AbstractEncoder).l34 = encodeSerializableValue;
  protoOf(AbstractEncoder).o34 = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).y30 = get_isNullable;
  protoOf(ListLikeDescriptor).j31 = get_isInline;
  protoOf(ListLikeDescriptor).l31 = get_annotations;
  protoOf(MapLikeDescriptor).y30 = get_isNullable;
  protoOf(MapLikeDescriptor).j31 = get_isInline;
  protoOf(MapLikeDescriptor).l31 = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).y30 = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).j31 = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).z39 = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).y30 = get_isNullable;
  protoOf(NothingSerialDescriptor).j31 = get_isInline;
  protoOf(NothingSerialDescriptor).l31 = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).y30 = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).j31 = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).l31 = get_annotations;
  protoOf(TaggedDecoder).i33 = decodeSerializableElement$default;
  protoOf(TaggedDecoder).u32 = decodeSerializableValue;
  protoOf(TaggedDecoder).k33 = decodeSequentially;
  protoOf(TaggedDecoder).m33 = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = decodeSerializableElement$default;
  _.$_$.b = SerializationException_init_$Init$_0;
  _.$_$.c = SerializationException_init_$Create$_0;
  _.$_$.d = SerializationException_init_$Create$_1;
  _.$_$.e = UnknownFieldException_init_$Create$;
  _.$_$.f = SEALED_getInstance;
  _.$_$.g = STRING_getInstance;
  _.$_$.h = CONTEXTUAL_getInstance;
  _.$_$.i = ENUM_getInstance;
  _.$_$.j = CLASS_getInstance;
  _.$_$.k = LIST_getInstance;
  _.$_$.l = MAP_getInstance;
  _.$_$.m = OBJECT_getInstance;
  _.$_$.n = DoubleSerializer_getInstance;
  _.$_$.o = IntSerializer_getInstance;
  _.$_$.p = StringSerializer_getInstance;
  _.$_$.q = ListSerializer;
  _.$_$.r = MapSerializer;
  _.$_$.s = serializer_0;
  _.$_$.t = serializer_9;
  _.$_$.u = serializer_7;
  _.$_$.v = serializer_11;
  _.$_$.w = serializer_5;
  _.$_$.x = PolymorphicKind;
  _.$_$.y = PrimitiveKind;
  _.$_$.z = PrimitiveSerialDescriptor;
  _.$_$.a1 = get_annotations;
  _.$_$.b1 = get_isInline;
  _.$_$.c1 = get_isNullable;
  _.$_$.d1 = SerialDescriptor;
  _.$_$.e1 = ENUM;
  _.$_$.f1 = buildClassSerialDescriptor;
  _.$_$.g1 = buildSerialDescriptor;
  _.$_$.h1 = getContextualDescriptor;
  _.$_$.i1 = AbstractDecoder;
  _.$_$.j1 = AbstractEncoder;
  _.$_$.k1 = CompositeDecoder;
  _.$_$.l1 = CompositeEncoder;
  _.$_$.m1 = Decoder;
  _.$_$.n1 = beginCollection;
  _.$_$.o1 = Encoder;
  _.$_$.p1 = AbstractPolymorphicSerializer;
  _.$_$.q1 = ElementMarker;
  _.$_$.r1 = typeParametersSerializers;
  _.$_$.s1 = GeneratedSerializer;
  _.$_$.t1 = InlinePrimitiveDescriptor;
  _.$_$.u1 = LinkedHashMapSerializer;
  _.$_$.v1 = NamedValueDecoder;
  _.$_$.w1 = PluginGeneratedSerialDescriptor;
  _.$_$.x1 = SerializerFactory;
  _.$_$.y1 = jsonCachedSerialNames;
  _.$_$.z1 = throwMissingFieldException;
  _.$_$.a2 = EmptySerializersModule_0;
  _.$_$.b2 = contextual;
  _.$_$.c2 = SerializersModuleCollector;
  _.$_$.d2 = DeserializationStrategy;
  _.$_$.e2 = KSerializer;
  _.$_$.f2 = MissingFieldException;
  _.$_$.g2 = SealedClassSerializer;
  _.$_$.h2 = SerializationException;
  _.$_$.i2 = SerializationStrategy;
  _.$_$.j2 = findPolymorphicSerializer_0;
  _.$_$.k2 = findPolymorphicSerializer;
  _.$_$.l2 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
