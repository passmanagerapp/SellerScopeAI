(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-runtime-runtime.js', './html-html-core.js', './kobweb-frontend-browser-ext.js', './kobweb-frontend-kobweb-compose.js', './kobweb-frontend-compose-html-ext.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./html-html-core.js'), require('./kobweb-frontend-browser-ext.js'), require('./kobweb-frontend-kobweb-compose.js'), require('./kobweb-frontend-compose-html-ext.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    if (typeof globalThis['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    if (typeof globalThis['html-html-core'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'html-html-core' was not found. Please, check whether 'html-html-core' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    if (typeof globalThis['kobweb-frontend-browser-ext'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'kobweb-frontend-browser-ext' was not found. Please, check whether 'kobweb-frontend-browser-ext' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    if (typeof globalThis['kobweb-frontend-kobweb-compose'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'kobweb-frontend-kobweb-compose' was not found. Please, check whether 'kobweb-frontend-kobweb-compose' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    if (typeof globalThis['kobweb-frontend-compose-html-ext'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-frontend-silk-foundation'. Its dependency 'kobweb-frontend-compose-html-ext' was not found. Please, check whether 'kobweb-frontend-compose-html-ext' is loaded prior to 'kobweb-frontend-silk-foundation'.");
    }
    globalThis['kobweb-frontend-silk-foundation'] = factory(typeof globalThis['kobweb-frontend-silk-foundation'] === 'undefined' ? {} : globalThis['kobweb-frontend-silk-foundation'], globalThis['kotlin-kotlin-stdlib'], globalThis['compose-multiplatform-core-compose-runtime-runtime'], globalThis['html-html-core'], globalThis['kobweb-frontend-browser-ext'], globalThis['kobweb-frontend-kobweb-compose'], globalThis['kobweb-frontend-compose-html-ext']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_html_html_core, kotlin_com_varabyte_kobweb_browser_ext, kotlin_com_varabyte_kobweb_kobweb_compose, kotlin_com_varabyte_kobweb_compose_html_ext) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h1;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var Style = kotlin_org_jetbrains_compose_html_html_core.$_$.b4;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b1;
  var StyleSheet = kotlin_org_jetbrains_compose_html_html_core.$_$.o1;
  var VOID = kotlin_kotlin.$_$.g;
  var StyleSheet_init_$Init$ = kotlin_org_jetbrains_compose_html_html_core.$_$.a;
  var protoOf = kotlin_kotlin.$_$.ob;
  var initMetadataForObject = kotlin_kotlin.$_$.na;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var mutableStateListOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var rememberComposableLambda = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w;
  var CompositionLocalProvider = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e;
  var composableLambdaInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a;
  var toString = kotlin_kotlin.$_$.sb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.s1;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.y;
  var invokeLater = kotlin_com_varabyte_kobweb_browser_ext.$_$.a;
  var asList = kotlin_kotlin.$_$.tg;
  var toSet = kotlin_kotlin.$_$.q8;
  var asSequence = kotlin_kotlin.$_$.q5;
  var flatMap = kotlin_kotlin.$_$.pc;
  var filter = kotlin_kotlin.$_$.oc;
  var Sequence = kotlin_kotlin.$_$.nc;
  var isInterface = kotlin_kotlin.$_$.xa;
  var map = kotlin_kotlin.$_$.rc;
  var toSet_0 = kotlin_kotlin.$_$.tc;
  var subtract = kotlin_kotlin.$_$.e8;
  var sorted = kotlin_kotlin.$_$.d8;
  var joinToString = kotlin_kotlin.$_$.z6;
  var trimIndent = kotlin_kotlin.$_$.re;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ja;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.v;
  var KtMap = kotlin_kotlin.$_$.f5;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.o1;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.l;
  var listOf = kotlin_kotlin.$_$.h7;
  var emptyList = kotlin_kotlin.$_$.l6;
  var listOf_0 = kotlin_kotlin.$_$.i7;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.g1;
  var charSequenceLength = kotlin_kotlin.$_$.w9;
  var Companion_instance = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.v2;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var mapCapacity = kotlin_kotlin.$_$.j7;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.u;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.c2;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.g2;
  var trimMargin = kotlin_kotlin.$_$.se;
  var media = kotlin_org_jetbrains_compose_html_html_core.$_$.v2;
  var layer = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.d1;
  var isNotEmpty = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.a1;
  var mutableListOf = kotlin_kotlin.$_$.n7;
  var plus = kotlin_kotlin.$_$.r7;
  var initMetadataForInterface = kotlin_kotlin.$_$.la;
  var ComparableStyleScope = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.b;
  var toStyles = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.o2;
  var equals = kotlin_kotlin.$_$.aa;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.t5;
  var substringAfterLast = kotlin_kotlin.$_$.wd;
  var endsWith = kotlin_kotlin.$_$.zc;
  var copyToArray = kotlin_kotlin.$_$.h6;
  var classNames = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.s;
  var getValue = kotlin_kotlin.$_$.v6;
  var toList = kotlin_kotlin.$_$.l8;
  var com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.v;
  var objectCreate = kotlin_kotlin.$_$.nb;
  var getStringHashCode = kotlin_kotlin.$_$.ga;
  var isBlank = kotlin_kotlin.$_$.ed;
  var first = kotlin_kotlin.$_$.bd;
  var Char = kotlin_kotlin.$_$.ye;
  var ComparableAttrsScope_init_$Create$ = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.h2;
  var toAttrs = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.n2;
  var setOf = kotlin_kotlin.$_$.y7;
  var From_getInstance = kotlin_org_jetbrains_compose_html_html_core.$_$.k;
  var to = kotlin_kotlin.$_$.rg;
  var To_getInstance = kotlin_org_jetbrains_compose_html_html_core.$_$.l;
  var hashCode = kotlin_kotlin.$_$.ha;
  var StyleScopeBuilder = kotlin_org_jetbrains_compose_html_html_core.$_$.m1;
  var CSSKeyframeRuleDeclaration = kotlin_org_jetbrains_compose_html_html_core.$_$.e1;
  var CSSKeyframesRuleDeclaration = kotlin_org_jetbrains_compose_html_html_core.$_$.f1;
  var distinct = kotlin_kotlin.$_$.i6;
  var lazy = kotlin_kotlin.$_$.jg;
  var enumEntries = kotlin_kotlin.$_$.m9;
  var Enum = kotlin_kotlin.$_$.cf;
  var MediaFeature = kotlin_org_jetbrains_compose_html_html_core.$_$.g1;
  var GenericTag = kotlin_com_varabyte_kobweb_compose_html_ext.$_$.y1;
  var DisposableEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.k;
  var CSSMediaRuleDeclaration = kotlin_org_jetbrains_compose_html_html_core.$_$.i1;
  var Raw = kotlin_org_jetbrains_compose_html_html_core.$_$.h1;
  var plus_0 = kotlin_kotlin.$_$.t7;
  var toMutableList = kotlin_kotlin.$_$.o8;
  var joinToString_0 = kotlin_kotlin.$_$.a7;
  var getKClass = kotlin_kotlin.$_$.e;
  var get_cssRem = kotlin_org_jetbrains_compose_html_html_core.$_$.a2;
  var startsWith = kotlin_kotlin.$_$.vd;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.x;
  var get_px = kotlin_org_jetbrains_compose_html_html_core.$_$.e3;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v;
  var KProperty0 = kotlin_kotlin.$_$.jc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.fa;
  var compositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var Companion_instance_0 = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.r2;
  var ensureNotNull = kotlin_kotlin.$_$.eg;
  var styleModifier = kotlin_com_varabyte_kobweb_kobweb_compose.$_$.m2;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(SilkStyleSheet, 'SilkStyleSheet', VOID, StyleSheet);
  initMetadataForClass(DeferredComposablesState, 'DeferredComposablesState', DeferredComposablesState);
  initMetadataForObject(ComposableSingletons$DeferredKt, 'ComposableSingletons$DeferredKt');
  initMetadataForClass(InitSilkContext, 'InitSilkContext');
  initMetadataForClass(MutableSilkConfig, 'MutableSilkConfig', MutableSilkConfig);
  initMetadataForCompanion(Companion);
  initMetadataForClass(StyleScope, 'StyleScope');
  initMetadataForClass(SilkStylesheetInstance$assertNoAttributeModifiers$simpleStyleScope$1, VOID, VOID, StyleScope);
  initMetadataForObject(SilkStylesheetInstance, 'SilkStylesheetInstance');
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(CssRule, 'CssRule');
  initMetadataForClass(NonMediaCssRule, 'NonMediaCssRule', VOID, CssRule);
  initMetadataForClass(OfAttributeSelector, 'OfAttributeSelector', VOID, NonMediaCssRule);
  initMetadataForClass(OfPseudoClass, 'OfPseudoClass', VOID, NonMediaCssRule);
  initMetadataForClass(OfPseudoElement, 'OfPseudoElement', VOID, NonMediaCssRule);
  initMetadataForClass(CompositeOpen, 'CompositeOpen', VOID, NonMediaCssRule);
  initMetadataForClass(CssStyle, 'CssStyle');
  initMetadataForClass(Restricted, 'Restricted', VOID, CssStyle);
  initMetadataForClass(Base, 'Base', VOID, Restricted);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(CssStyleScope, 'CssStyleScope', VOID, StyleScope);
  initMetadataForInterface(ComponentKind, 'ComponentKind');
  initMetadataForInterface(RestrictedKind, 'RestrictedKind');
  initMetadataForClass(CssStyleBaseScope, 'CssStyleBaseScope');
  initMetadataForClass(Light, 'Light');
  initMetadataForClass(Dark, 'Dark');
  initMetadataForClass(ColorAgnostic, 'ColorAgnostic');
  initMetadataForClass(ColorAware, 'ColorAware');
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(ImmutableCssStyle, 'ImmutableCssStyle');
  initMetadataForInterface(GeneralKind, 'GeneralKind');
  initMetadataForClass(ExtendingCssStyle, 'ExtendingCssStyle', VOID, CssStyle);
  initMetadataForClass(CssStyle$2, VOID, VOID, CssStyle);
  initMetadataForClass(CssStyle$4, VOID, VOID, CssStyle);
  initMetadataForClass(base$3, VOID, VOID, CssStyle);
  initMetadataForClass(CssStyleVariant, 'CssStyleVariant');
  initMetadataForClass(SimpleCssStyleVariant$1, VOID, VOID, CssStyle);
  initMetadataForClass(SimpleCssStyleVariant, 'SimpleCssStyleVariant', VOID, CssStyleVariant);
  initMetadataForClass(ExtendingCssStyleVariant, 'ExtendingCssStyleVariant', VOID, SimpleCssStyleVariant);
  initMetadataForClass(CompositeCssStyleVariant, 'CompositeCssStyleVariant', VOID, CssStyleVariant);
  initMetadataForClass(addVariant$1, VOID, VOID, CssStyle);
  initMetadataForCompanion(Companion_3);
  initMetadataForClass(Key, 'Key');
  initMetadataForClass(CssModifier, 'CssModifier');
  initMetadataForClass(KeyframesBuilder, 'KeyframesBuilder');
  initMetadataForCompanion(Companion_4);
  initMetadataForClass(Keyframes, 'Keyframes');
  initMetadataForClass(Breakpoint, 'Breakpoint', VOID, Enum);
  initMetadataForClass(ComposableSingletons$BreakpointConditionsKt$lambda_1$2$$inlined$cache$1$1);
  initMetadataForObject(ComposableSingletons$BreakpointConditionsKt, 'ComposableSingletons$BreakpointConditionsKt');
  initMetadataForClass(BreakpointValues, 'BreakpointValues');
  initMetadataForClass(BreakpointUnitValue, 'BreakpointUnitValue');
  initMetadataForClass(Rem, 'Rem', VOID, BreakpointUnitValue);
  initMetadataForClass(LayerListBuilder, 'LayerListBuilder', LayerListBuilder);
  initMetadataForClass(SilkLayer, 'SilkLayer', VOID, Enum);
  initMetadataForClass(MutableSilkTheme$replaceStyle$newStyle$1, VOID, VOID, CssStyle);
  initMetadataForClass(MutableSilkTheme, 'MutableSilkTheme', MutableSilkTheme);
  initMetadataForClass(ImmutableSilkTheme, 'ImmutableSilkTheme');
  initMetadataForCompanion(Companion_5);
  initMetadataForClass(ColorMode, 'ColorMode', VOID, Enum);
  initMetadataForObject(Red, 'Red');
  initMetadataForObject(Blue, 'Blue');
  initMetadataForObject(Gray, 'Gray');
  function get(colorMode) {
    var tmp;
    switch (colorMode.p2_1) {
      case 0:
        tmp = this.j48();
        break;
      case 1:
        tmp = this.k48();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  initMetadataForInterface(Palettes, 'Palettes');
  initMetadataForClass(MutablePalettes, 'MutablePalettes', MutablePalettes, VOID, [Palettes]);
  function getValue_0(key) {
    return ensureNotNull(this.b3n(key));
  }
  initMetadataForInterface(Palette, 'Palette');
  initMetadataForClass(EntryDelegate, 'EntryDelegate');
  initMetadataForClass(ColorGroup, 'ColorGroup');
  initMetadataForClass(MutablePalette, 'MutablePalette', MutablePalette, VOID, [Palette]);
  initMetadataForClass(RectF, 'RectF', RectF_init_$Create$);
  initMetadataForClass(Path, 'Path');
  initMetadataForClass(InsetPath, 'InsetPath', VOID, Path);
  //endregion
  function SilkFoundationStyles(initSilk_0, $composer, $changed, $default) {
    var initSilk_1 = {_v: initSilk_0};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.k1k(67758577);
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 6) === 0)
      $dirty = $dirty | ($composer_0.d1j(initSilk_1._v) ? 4 : 2);
    if (!(($dirty & 3) === 2) || !$composer_0.z1h()) {
      if (!(($default & 1) === 0)) {
        $composer_0.g1i(1839367468);
        // Inline function 'androidx.compose.runtime.cache' call
        var this_0 = $composer_0;
        // Inline function 'kotlin.let' call
        // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
        var it = this_0.s1j();
        var tmp;
        if (false || it === Companion_getInstance().y1c_1) {
          // Inline function 'com.varabyte.kobweb.silk.SilkFoundationStyles.<anonymous>' call
          var value = SilkFoundationStyles$lambda;
          this_0.d1k(value);
          tmp = value;
        } else {
          tmp = it;
        }
        var tmp_0 = tmp;
        var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        $composer_0.i1i();
        initSilk_1._v = tmp0_group;
      }
      $composer_0.l1f(1839367920, Unit_instance);
      $composer_0.g1i(1839371138);
      var tmp2 = $composer_0;
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = ($dirty & 14) === 4;
      // Inline function 'kotlin.let' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = tmp2.s1j();
      var tmp_1;
      if (invalid || it_0 === Companion_getInstance().y1c_1) {
        // Inline function 'com.varabyte.kobweb.silk.SilkFoundationStyles.<anonymous>' call
        var value_0 = SilkFoundationStyles$lambda_0(initSilk_1);
        tmp2.d1k(value_0);
        tmp_1 = value_0;
      } else {
        tmp_1 = it_0;
      }
      var tmp_2 = tmp_1;
      var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
      $composer_0.i1i();
      initSilk(tmp1_group);
      $composer_0.o1f();
      var tmp4 = SilkStyleSheet_getInstance();
      // Inline function 'org.jetbrains.compose.web.css.Style' call
      var $composer_1 = $composer_0;
      $composer_1.e1i(-1196466140);
      Style(null, tmp4.q2o(), $composer_1, 0, 1);
      $composer_1.f1i();
      SilkBreakpointDisplayStyles($composer_0, 0);
    } else {
      $composer_0.p1c();
    }
    var tmp2_safe_receiver = $composer_0.l1k();
    if (tmp2_safe_receiver == null)
      null;
    else {
      tmp2_safe_receiver.y1p(SilkFoundationStyles$lambda_1(initSilk_1, $changed, $default));
    }
  }
  function SilkFoundationStyles$lambda(it) {
    return Unit_instance;
  }
  function SilkFoundationStyles$lambda_0($initSilk) {
    return function (ctx) {
      $initSilk._v(ctx);
      return Unit_instance;
    };
  }
  function SilkFoundationStyles$lambda_1($initSilk, $$changed, $$default) {
    return function ($composer, $force) {
      SilkFoundationStyles($initSilk._v, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  var com_varabyte_kobweb_silk_SilkStyleSheet$stable;
  function SilkStyleSheet() {
    SilkStyleSheet_instance = this;
    StyleSheet_init_$Init$(VOID, VOID, this);
  }
  protoOf(SilkStyleSheet).u2o = function (selector, cssRule) {
    return this.t2o(selector, cssRule);
  };
  var SilkStyleSheet_instance;
  function SilkStyleSheet_getInstance() {
    if (SilkStyleSheet_instance == null)
      new SilkStyleSheet();
    return SilkStyleSheet_instance;
  }
  function get_SpanTextStyle() {
    _init_properties_SpanText_kt__upt1hl();
    return SpanTextStyle;
  }
  var SpanTextStyle;
  function SpanTextStyle$lambda($this$CssStyle) {
    _init_properties_SpanText_kt__upt1hl();
    return Unit_instance;
  }
  var properties_initialized_SpanText_kt_kccny1;
  function _init_properties_SpanText_kt__upt1hl() {
    if (!properties_initialized_SpanText_kt_kccny1) {
      properties_initialized_SpanText_kt_kccny1 = true;
      SpanTextStyle = CssStyle_0(VOID, SpanTextStyle$lambda);
    }
  }
  function get_LocalDeferred() {
    _init_properties_Deferred_kt__im2yn();
    return LocalDeferred;
  }
  var LocalDeferred;
  function DeferredComposablesState$forEach$lambda($tmp0_rcvr, $render, $$changed) {
    return function ($composer, $force) {
      $tmp0_rcvr.m41($render, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function DeferredComposablesState() {
    this.j41_1 = -1;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.k41_1 = ArrayList_init_$Create$();
    this.l41_1 = mutableStateListOf();
  }
  protoOf(DeferredComposablesState).m41 = function (render, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.k1k(2018041013);
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ($composer_0.d1j(render) ? 4 : 2);
    if (($changed & 48) === 0)
      $dirty = $dirty | ($composer_0.d1j(this) ? 32 : 16);
    if (!(($dirty & 19) === 18) || !$composer_0.z1h()) {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = this.l41_1.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.silk.defer.DeferredComposablesState.forEach.<anonymous>' call
        render(element, $composer_0, 112 & $dirty << 3);
      }
    } else {
      $composer_0.p1c();
    }
    var tmp1_safe_receiver = $composer_0.l1k();
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.y1p(DeferredComposablesState$forEach$lambda(this, render, $changed));
    }
  };
  function DeferringHost(content, $composer, $changed) {
    _init_properties_Deferred_kt__im2yn();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.k1k(1578083138);
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ($composer_0.d1j(content) ? 4 : 2);
    if (!(($dirty & 3) === 2) || !$composer_0.z1h()) {
      var state = new DeferredComposablesState();
      var tmp = get_LocalDeferred().t1p(state);
      // Inline function 'kotlin.run' call
      // Inline function 'com.varabyte.kobweb.silk.defer.DeferringHost.<anonymous>' call
      var dispatchReceiver = rememberComposableLambda(-2083084670, true, DeferringHost$lambda(content, state), $composer_0, 54);
      // Inline function 'androidx.compose.runtime.remember' call
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 1157296644, 'CC(remember)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_1.q19(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.s1j();
      var tmp_0;
      if (invalid || it === Companion_getInstance().y1c_1) {
        // Inline function 'com.varabyte.kobweb.silk.defer.DeferringHost.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref_0(dispatchReceiver);
        $composer_1.d1k(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      sourceInformationMarkerEnd($composer_1);
      CompositionLocalProvider(tmp, tmp0, $composer_0, 56);
    } else {
      $composer_0.p1c();
    }
    var tmp0_safe_receiver = $composer_0.l1k();
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.y1p(DeferringHost$lambda_0(content, $changed));
    }
  }
  function ComposableLambda$invoke$ref($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.o2e(p0, p1, p2);
    };
  }
  function ComposableSingletons$DeferredKt$lambda_1$lambda_ynev9p(entry, $composer, $changed) {
    var $composer_0 = $composer;
    var tmp0_safe_receiver = entry.n41_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.defer.ComposableSingletons$DeferredKt.lambda-1.<anonymous>.<anonymous>' call
      DeferringHost(tmp0_safe_receiver, $composer_0, 0);
      tmp = Unit_instance;
    }
    return Unit_instance;
  }
  function ComposableSingletons$DeferredKt() {
    ComposableSingletons$DeferredKt_instance = this;
    var tmp = this;
    tmp.p41_1 = ComposableLambda$invoke$ref(composableLambdaInstance(431504263, false, ComposableSingletons$DeferredKt$lambda_1$lambda_ynev9p));
  }
  var ComposableSingletons$DeferredKt_instance;
  function ComposableSingletons$DeferredKt_getInstance() {
    if (ComposableSingletons$DeferredKt_instance == null)
      new ComposableSingletons$DeferredKt();
    return ComposableSingletons$DeferredKt_instance;
  }
  function LocalDeferred$lambda() {
    _init_properties_Deferred_kt__im2yn();
    // Inline function 'kotlin.error' call
    var message = 'Attempting to defer rendering without calling `DeferringHost`, a required pre-requisite.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function DeferringHost$lambda($content, $state) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      var tmp;
      if (!(($changed & 3) === 2) || !$composer_0.z1h()) {
        $content($composer_0, 0);
        $state.m41(ComposableSingletons$DeferredKt_getInstance().p41_1, $composer_0, 6);
        tmp = Unit_instance;
      } else {
        $composer_0.p1c();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref_0($boundThis) {
    return function (p0, p1) {
      return $boundThis.x1h(p0, p1);
    };
  }
  function DeferringHost$lambda_0($content, $$changed) {
    return function ($composer, $force) {
      DeferringHost($content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  var properties_initialized_Deferred_kt_1ab2bj;
  function _init_properties_Deferred_kt__im2yn() {
    if (!properties_initialized_Deferred_kt_1ab2bj) {
      properties_initialized_Deferred_kt_1ab2bj = true;
      LocalDeferred = staticCompositionLocalOf(LocalDeferred$lambda);
    }
  }
  function set_additionalSilkInitialization(_set____db54di) {
    _init_properties_InitSilk_kt__vukue3();
    additionalSilkInitialization = _set____db54di;
  }
  function get_additionalSilkInitialization() {
    _init_properties_InitSilk_kt__vukue3();
    return additionalSilkInitialization;
  }
  var additionalSilkInitialization;
  var com_varabyte_kobweb_silk_init_InitSilkContext$stable;
  function InitSilkContext(config, stylesheet, theme) {
    this.q41_1 = config;
    this.r41_1 = stylesheet;
    this.s41_1 = theme;
  }
  function initSilk(additionalInit) {
    var tmp;
    if (additionalInit === VOID) {
      tmp = initSilk$lambda;
    } else {
      tmp = additionalInit;
    }
    additionalInit = tmp;
    _init_properties_InitSilk_kt__vukue3();
    var mutableTheme = new MutableSilkTheme();
    var config = new MutableSilkConfig();
    mutableTheme.l42('silk-span-text', get_SpanTextStyle());
    var ctx = new InitSilkContext(config, SilkStylesheetInstance_getInstance(), mutableTheme);
    additionalInit(ctx);
    get_additionalSilkInitialization()(ctx);
    set_MutableSilkConfigInstance(config);
    set__SilkTheme(new ImmutableSilkTheme(mutableTheme));
    get_SilkTheme().r42(SilkStylesheetInstance_getInstance());
    SilkStylesheetInstance_getInstance().v42(SilkStyleSheet_getInstance());
    get_SilkTheme().w42(SilkStyleSheet_getInstance());
    var tmp_0 = window;
    invokeLater(tmp_0, initSilk$lambda_0);
  }
  function get_localStyleSheets(_this__u8e3s4) {
    _init_properties_InitSilk_kt__vukue3();
    // Inline function 'kotlin.collections.filterIsInstance' call
    var tmp0 = asList(document.styleSheets);
    // Inline function 'kotlin.collections.filterIsInstanceTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element instanceof CSSStyleSheet) {
        destination.e(element);
      }
    }
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_0 = destination.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'com.varabyte.kobweb.silk.init.<get-localStyleSheets>.<anonymous>' call
      if (element_0.href == null) {
        destination_0.e(element_0);
      }
    }
    return destination_0;
  }
  function additionalSilkInitialization$lambda(it) {
    _init_properties_InitSilk_kt__vukue3();
    return Unit_instance;
  }
  function initSilk$lambda(it) {
    _init_properties_InitSilk_kt__vukue3();
    return Unit_instance;
  }
  function initSilk$lambda_0() {
    _init_properties_InitSilk_kt__vukue3();
    // Inline function 'kotlin.run' call
    // Inline function 'com.varabyte.kobweb.silk.init.initSilk.<anonymous>.<anonymous>' call
    var registeredCssLayers = toSet(SilkStylesheetInstance_getInstance().u42_1.z42());
    var tmp = asSequence(get_localStyleSheets(document));
    // Inline function 'kotlin.sequences.filterIsInstance' call
    var this_0 = flatMap(tmp, initSilk$lambda$lambda);
    var tmp_0 = filter(this_0, initSilk$lambda$lambda_0);
    var tmp_1 = isInterface(tmp_0, Sequence) ? tmp_0 : THROW_CCE();
    var referencedCssLayers = toSet_0(map(tmp_1, initSilk$lambda$lambda_1));
    var unregisteredLayers = subtract(referencedCssLayers, registeredCssLayers);
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!unregisteredLayers.q()) {
      var tmp_2 = console;
      var tmp_3 = sorted(unregisteredLayers);
      tmp_2.warn(trimIndent('\n                        One or more CSS layer(s) were referenced in code but not registered.\n                        \n                        Please add initialization to your project like:\n                        ```\n                        @InitSilk\n                        fun initSilk(ctx: InitSilkContext) {\n                           ctx.stylesheet.cssLayers.add(' + joinToString(tmp_3, VOID, VOID, VOID, VOID, VOID, initSilk$lambda$lambda_2) + ')\n                        }\n                        ```\n                        (but change the order of the layers to match your desired priority).\n                        \n                        If you are not the developer of this website, consider reporting this message to them.\n                    '));
    }
    // Inline function 'kotlin.collections.filterIsInstance' call
    var tmp0 = asList(document.styleSheets);
    // Inline function 'kotlin.collections.filterIsInstanceTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element instanceof CSSStyleSheet) {
        destination.e(element);
      }
    }
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_0 = destination.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'com.varabyte.kobweb.silk.init.initSilk.<anonymous>.<anonymous>' call
      if (element_0.href == null) {
        destination_0.e(element_0);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_1 = destination_0.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      // Inline function 'com.varabyte.kobweb.silk.init.initSilk.<anonymous>.<anonymous>' call
      var cssLayers = SilkStylesheetInstance_getInstance().u42_1.z42();
      element_1.insertRule('@layer ' + joinToString(cssLayers) + ';', 0);
    }
    return Unit_instance;
  }
  function initSilk$lambda$lambda(it) {
    _init_properties_InitSilk_kt__vukue3();
    return asSequence(asList(it.cssRules));
  }
  function initSilk$lambda$lambda_0(it) {
    _init_properties_InitSilk_kt__vukue3();
    return it instanceof CSSLayerBlockRule;
  }
  function initSilk$lambda$lambda_1(it) {
    _init_properties_InitSilk_kt__vukue3();
    return it.name;
  }
  function initSilk$lambda$lambda_2(it) {
    _init_properties_InitSilk_kt__vukue3();
    return '"' + it + '"';
  }
  var properties_initialized_InitSilk_kt_8x89gn;
  function _init_properties_InitSilk_kt__vukue3() {
    if (!properties_initialized_InitSilk_kt_8x89gn) {
      properties_initialized_InitSilk_kt_8x89gn = true;
      additionalSilkInitialization = additionalSilkInitialization$lambda;
      com_varabyte_kobweb_silk_init_InitSilkContext$stable = 8;
    }
  }
  function set_MutableSilkConfigInstance(_set____db54di) {
    _init_properties_SilkConfig_kt__z9kok7();
    MutableSilkConfigInstance = _set____db54di;
  }
  function get_MutableSilkConfigInstance() {
    _init_properties_SilkConfig_kt__z9kok7();
    return MutableSilkConfigInstance;
  }
  var MutableSilkConfigInstance;
  var com_varabyte_kobweb_silk_init_MutableSilkConfig$stable;
  function MutableSilkConfig() {
    this.a43_1 = ColorMode_LIGHT_getInstance();
  }
  protoOf(MutableSilkConfig).b43 = function () {
    return this.a43_1;
  };
  function Companion() {
  }
  protoOf(Companion).c43 = function () {
    return get_MutableSilkConfigInstance();
  };
  var Companion_instance_1;
  function Companion_getInstance_0() {
    return Companion_instance_1;
  }
  var properties_initialized_SilkConfig_kt_bfwaef;
  function _init_properties_SilkConfig_kt__z9kok7() {
    if (!properties_initialized_SilkConfig_kt_bfwaef) {
      properties_initialized_SilkConfig_kt_bfwaef = true;
      MutableSilkConfigInstance = new MutableSilkConfig();
      com_varabyte_kobweb_silk_init_MutableSilkConfig$stable = 8;
    }
  }
  var com_varabyte_kobweb_silk_init_CssStyleRegistrarImpl_Entry$stable;
  var com_varabyte_kobweb_silk_init_SilkStylesheetInstance$stable;
  function assertNoAttributeModifiers(_this__u8e3s4, $this, selectorName) {
    var simpleStyleScope = new SilkStylesheetInstance$assertNoAttributeModifiers$simpleStyleScope$1();
    _this__u8e3s4(simpleStyleScope);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = simpleStyleScope.e43_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.init.SilkStylesheetInstance.assertNoAttributeModifiers.<anonymous>' call
      assertNoAttributes(element, selectorName, 'Please search your `@InitSilk` code for a line like `ctx.stylesheet.registerStyle("' + selectorName + '")` and remove the offending attribute(s).');
    }
  }
  function SilkStylesheetInstance$assertNoAttributeModifiers$simpleStyleScope$1() {
    StyleScope.call(this);
  }
  function SilkStylesheetInstance() {
    SilkStylesheetInstance_instance = this;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.s42_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.t42_1 = LinkedHashMap_init_$Create$();
    this.u42_1 = new LayerListBuilder();
  }
  protoOf(SilkStylesheetInstance).i43 = function (name, build) {
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.t42_1;
    // Inline function 'kotlin.require' call
    if (!!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).g2(name)) {
      // Inline function 'com.varabyte.kobweb.silk.init.SilkStylesheetInstance.registerKeyframes.<anonymous>' call
      var message = 'User is registering duplicate keyframe name: ' + name;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.set' call
    this.t42_1.l2(name, build);
  };
  protoOf(SilkStylesheetInstance).v42 = function (siteStyleSheet) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = this.s42_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.init.SilkStylesheetInstance.registerStylesAndKeyframesInto.<anonymous>' call
      var tmp = element.j43_1;
      assertNoAttributeModifiers(typeof tmp === 'function' ? tmp : THROW_CCE(), SilkStylesheetInstance_getInstance(), element.n43_1);
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = this.s42_1.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'com.varabyte.kobweb.silk.init.SilkStylesheetInstance.registerStylesAndKeyframesInto.<anonymous>' call
      element_0.p43(siteStyleSheet);
    }
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.t42_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(this_0.j());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_1 = this_0.u().g();
    while (_iterator__ex2g4s_1.h()) {
      var item = _iterator__ex2g4s_1.i();
      // Inline function 'kotlin.collections.component1' call
      var name = item.v();
      // Inline function 'kotlin.collections.component2' call
      var build = item.w();
      // Inline function 'kotlin.apply' call
      var this_1 = new KeyframesBuilder(ColorMode_LIGHT_getInstance());
      build(this_1);
      var lightBuilder = this_1;
      // Inline function 'kotlin.apply' call
      var this_2 = new KeyframesBuilder(ColorMode_DARK_getInstance());
      build(this_2);
      var darkBuilder = this_2;
      if (lightBuilder.equals(darkBuilder)) {
        lightBuilder.s43(siteStyleSheet, name);
      } else {
        lightBuilder.s43(siteStyleSheet, suffixedWith(name, ColorMode_LIGHT_getInstance()));
        darkBuilder.s43(siteStyleSheet, suffixedWith(name, ColorMode_DARK_getInstance()));
      }
      destination.e(Unit_instance);
    }
  };
  var SilkStylesheetInstance_instance;
  function SilkStylesheetInstance_getInstance() {
    if (SilkStylesheetInstance_instance == null)
      new SilkStylesheetInstance();
    return SilkStylesheetInstance_instance;
  }
  var com_varabyte_kobweb_silk_style_CssRule_OfMedia$stable;
  var com_varabyte_kobweb_silk_style_CssRule_NonMediaCssRule$stable;
  var com_varabyte_kobweb_silk_style_CssRule_OfAttributeSelector$stable;
  var com_varabyte_kobweb_silk_style_CssRule_OfPseudoClass$stable;
  var com_varabyte_kobweb_silk_style_CssRule_OfPseudoElement$stable;
  var com_varabyte_kobweb_silk_style_CssRule_CompositeOpen$stable;
  var com_varabyte_kobweb_silk_style_CssRule_CompositeClosed$stable;
  var com_varabyte_kobweb_silk_style_CssRule$stable;
  function Companion_0() {
  }
  protoOf(Companion_0).t43 = function (pseudoClass, params) {
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var inductionVariable = 0;
    var last = params.length;
    while (inductionVariable < last) {
      var element = params[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.mapNotNullTo.<anonymous>' call
      // Inline function 'com.varabyte.kobweb.silk.style.Companion.OfFunctionalPseudoClass.<anonymous>' call
      var tmp0_safe_receiver = element.v43();
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.collections.mapNotNullTo.<anonymous>.<anonymous>' call
        destination.e(tmp0_safe_receiver);
      }
    }
    return new OfPseudoClass(pseudoClass + '(' + joinToString(destination) + ')');
  };
  var Companion_instance_2;
  function Companion_getInstance_1() {
    return Companion_instance_2;
  }
  function NonMediaCssRule() {
    CssRule.call(this);
  }
  function OfAttributeSelector(attributeSelector) {
    NonMediaCssRule.call(this);
    this.a44_1 = attributeSelector;
  }
  protoOf(OfAttributeSelector).v43 = function () {
    return this.y43(listOf(this), emptyList(), null);
  };
  function OfPseudoClass(pseudoClass) {
    NonMediaCssRule.call(this);
    this.c44_1 = pseudoClass;
  }
  protoOf(OfPseudoClass).v43 = function () {
    return this.y43(emptyList(), listOf(this), null);
  };
  protoOf(OfPseudoClass).d44 = function (other) {
    return new CompositeOpen(null, emptyList(), listOf_0([this, other]));
  };
  function OfPseudoElement(pseudoElement) {
    NonMediaCssRule.call(this);
    this.f44_1 = pseudoElement;
  }
  protoOf(OfPseudoElement).v43 = function () {
    return this.y43(emptyList(), emptyList(), this);
  };
  function CompositeOpen(mediaQuery, attributeSelectors, pseudoClasses) {
    NonMediaCssRule.call(this);
    this.h44_1 = mediaQuery;
    this.i44_1 = attributeSelectors;
    this.j44_1 = pseudoClasses;
  }
  protoOf(CompositeOpen).x43 = function () {
    return this.h44_1;
  };
  protoOf(CompositeOpen).v43 = function () {
    return this.y43(this.i44_1, this.j44_1, null);
  };
  function CssRule() {
    this.u43_1 = null;
  }
  protoOf(CssRule).w43 = function (target, createModifier) {
    target.f43(this.x43(), this.v43(), createModifier);
  };
  protoOf(CssRule).x43 = function () {
    return this.u43_1;
  };
  protoOf(CssRule).v43 = function () {
    return null;
  };
  protoOf(CssRule).y43 = function (attributeSelectors, pseudoClasses, pseudoElement) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'com.varabyte.kobweb.silk.style.CssRule.buildSelectorText.<anonymous>' call
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = attributeSelectors.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.CssRule.buildSelectorText.<anonymous>.<anonymous>' call
      this_0.p8('[' + element.a44_1 + ']');
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = pseudoClasses.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'com.varabyte.kobweb.silk.style.CssRule.buildSelectorText.<anonymous>.<anonymous>' call
      this_0.p8(':' + element_0.c44_1);
    }
    if (!(pseudoElement == null)) {
      this_0.p8('::' + pseudoElement.f44_1);
    }
    // Inline function 'kotlin.takeIf' call
    var this_1 = this_0.toString();
    var tmp;
    // Inline function 'com.varabyte.kobweb.silk.style.CssRule.buildSelectorText.<anonymous>' call
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_1) > 0) {
      tmp = this_1;
    } else {
      tmp = null;
    }
    return tmp;
  };
  var com_varabyte_kobweb_silk_style_CssStyle_Restricted_Base$stable;
  var com_varabyte_kobweb_silk_style_CssStyle_Restricted$stable;
  var com_varabyte_kobweb_silk_style_CssStyle$stable;
  var com_varabyte_kobweb_silk_style_SimpleCssStyle$stable;
  var com_varabyte_kobweb_silk_style_ExtendingCssStyle$stable;
  var com_varabyte_kobweb_silk_style_ImmutableCssStyle$stable;
  var com_varabyte_kobweb_silk_style_CssStyleScope$stable;
  var com_varabyte_kobweb_silk_style_CssStyleBaseScope$stable;
  var com_varabyte_kobweb_silk_style_StyleGroup_Light$stable;
  var com_varabyte_kobweb_silk_style_StyleGroup_Dark$stable;
  var com_varabyte_kobweb_silk_style_StyleGroup_ColorAgnostic$stable;
  var com_varabyte_kobweb_silk_style_StyleGroup_ColorAware$stable;
  function Base_init_$Init$(init, extraModifier, $this) {
    var tmp;
    if (extraModifier === VOID) {
      tmp = CssStyle$Restricted$Base$_init_$lambda_wfn4zd_1;
    } else {
      tmp = extraModifier;
    }
    extraModifier = tmp;
    Base.call($this, CssStyle$Restricted$Base$_init_$lambda_wfn4zd_2(init), extraModifier);
    return $this;
  }
  function CssStyle$Restricted$Base$_init_$lambda_wfn4zd($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(-589847720);
    $composer_0.i1i();
    return Companion_instance;
  }
  function CssStyle$Restricted$Base$_init_$lambda$lambda_7ly36($init, $this) {
    return function () {
      return $init(new CssStyleBaseScope($this.m44_1));
    };
  }
  function CssStyle$Restricted$Base$_init_$lambda_wfn4zd_0($init) {
    return function (_this__u8e3s4) {
      _this__u8e3s4.n44(CssStyle$Restricted$Base$_init_$lambda$lambda_7ly36($init, _this__u8e3s4));
      return Unit_instance;
    };
  }
  function CssStyle$Restricted$Base$_init_$lambda_wfn4zd_1($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(1583284929);
    $composer_0.i1i();
    return Companion_instance;
  }
  function CssStyle$Restricted$Base$_init_$lambda_wfn4zd_2($init) {
    return function (_this__u8e3s4) {
      return $init;
    };
  }
  function Base(init, extraModifier) {
    var tmp;
    if (extraModifier === VOID) {
      tmp = CssStyle$Restricted$Base$_init_$lambda_wfn4zd;
    } else {
      tmp = extraModifier;
    }
    extraModifier = tmp;
    Restricted.call(this, CssStyle$Restricted$Base$_init_$lambda_wfn4zd_0(init), extraModifier);
  }
  function CssStyle$Restricted$_init_$lambda_tv1gbe($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(-941642769);
    $composer_0.i1i();
    return Companion_instance;
  }
  function Restricted(init, extraModifier) {
    var tmp;
    if (extraModifier === VOID) {
      tmp = CssStyle$Restricted$_init_$lambda_tv1gbe;
    } else {
      tmp = extraModifier;
    }
    extraModifier = tmp;
    CssStyle.call(this, init, extraModifier);
  }
  function addStyles(_this__u8e3s4, $this, cssRule, styles) {
    _this__u8e3s4.v2o(cssRule, CssStyle$addStyles$lambda(styles));
  }
  function withFinalSelectorName($this, selectorBaseName, group, handler) {
    if (group instanceof Light)
      handler(suffixedWith(selectorBaseName, ColorMode_LIGHT_getInstance()), group.u44_1);
    else {
      if (group instanceof Dark)
        handler(suffixedWith(selectorBaseName, ColorMode_DARK_getInstance()), group.t44_1);
      else {
        if (group instanceof ColorAgnostic)
          handler(selectorBaseName, group.s44_1);
        else {
          if (group instanceof ColorAware) {
            handler(suffixedWith(selectorBaseName, ColorMode_LIGHT_getInstance()), group.q44_1);
            handler(suffixedWith(selectorBaseName, ColorMode_DARK_getInstance()), group.r44_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
  }
  function mergeCssModifiers(_this__u8e3s4, $this, init) {
    // Inline function 'kotlin.apply' call
    init(_this__u8e3s4);
    // Inline function 'kotlin.collections.groupBy' call
    var tmp0 = _this__u8e3s4.e43_1;
    // Inline function 'kotlin.collections.groupByTo' call
    var destination = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.mergeCssModifiers.<anonymous>' call
      var key = element.v();
      // Inline function 'kotlin.collections.getOrPut' call
      var value = destination.i2(key);
      var tmp;
      if (value == null) {
        // Inline function 'kotlin.collections.groupByTo.<anonymous>' call
        var answer = ArrayList_init_$Create$();
        destination.l2(key, answer);
        tmp = answer;
      } else {
        tmp = value;
      }
      var list = tmp;
      list.e(element);
    }
    // Inline function 'kotlin.collections.mapValues' call
    // Inline function 'kotlin.collections.mapValuesTo' call
    var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(destination.j()));
    // Inline function 'kotlin.collections.associateByTo' call
    var _iterator__ex2g4s_0 = destination.u().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'kotlin.collections.mapValuesTo.<anonymous>' call
      var tmp_0 = element_0.v();
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.mergeCssModifiers.<anonymous>' call
      // Inline function 'kotlin.collections.component2' call
      var group = element_0.w();
      // Inline function 'kotlin.collections.reduce' call
      var iterator = group.g();
      if (!iterator.h())
        throw UnsupportedOperationException_init_$Create$("Empty collection can't be reduced.");
      var accumulator = iterator.i();
      while (iterator.h()) {
        var tmp2 = accumulator;
        // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.mergeCssModifiers.<anonymous>.<anonymous>' call
        var curr = iterator.i();
        accumulator = tmp2.y44(curr);
      }
      var tmp$ret$10 = accumulator;
      destination_0.l2(tmp_0, tmp$ret$10);
    }
    return destination_0;
  }
  function assertNoAttributeModifiers_0(_this__u8e3s4, $this, selectorName, layer) {
    // Inline function 'kotlin.collections.onEach' call
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.onEach.<anonymous>' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = _this__u8e3s4.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.assertNoAttributeModifiers.<anonymous>' call
      // Inline function 'kotlin.collections.component2' call
      var cssModifier = element.w();
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.assertNoAttributeModifiers.<anonymous>.<anonymous>' call
      var styleDeclaration = layer === SilkLayer_COMPONENT_VARIANTS_getInstance().b45_1 ? 'val SomeExampleVariant = ExampleStyle.addVariant' : layer === SilkLayer_COMPONENT_STYLES_getInstance().b45_1 ? 'val ExampleStyle = CssStyle<ExampleKind>' : 'val ExampleStyle = CssStyle';
      // Inline function 'kotlin.text.appendLine' call
      var value = 'Please move Modifiers associated with attributes to the `extraModifier` parameter.';
      // Inline function 'kotlin.text.appendLine' call
      this_0.p8(value).q8(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      this_0.q8(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      var value_0 = 'An example of how to fix this (e.g. if the offending attribute was `tab-index`):';
      // Inline function 'kotlin.text.appendLine' call
      this_0.p8(value_0).q8(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      var value_1 = trimMargin('\n                        |   // Before\n                        |   ' + styleDeclaration + ' {\n                        |       base {\n                        |          Modifier\n                        |              .backgroundColor(Colors.Magenta))\n                        |              .tabIndex(0) // <-- The offending attribute modifier\n                        |       }\n                        |   }\n                        |\n                        |   // After\n                        |   ' + styleDeclaration + '(extraModifier = Modifier.tabIndex(0)) {\n                        |       base {\n                        |           Modifier.backgroundColor(Colors.Magenta)\n                        |       }\n                        |   }\n                        ');
      // Inline function 'kotlin.text.appendLine' call
      this_0.p8(value_1).q8(_Char___init__impl__6a9atx(10));
      var tmp$ret$10 = this_0.toString();
      assertNoAttributes(cssModifier, selectorName, tmp$ret$10);
    }
    return _this__u8e3s4;
  }
  function Companion_1() {
  }
  var Companion_instance_3;
  function Companion_getInstance_2() {
    return Companion_instance_3;
  }
  function addStylesInto$mediaOrInPlace(_this__u8e3s4, query, rulesBuild) {
    if (query == null) {
      // Inline function 'kotlin.apply' call
      rulesBuild(_this__u8e3s4);
    } else {
      media(_this__u8e3s4, query, rulesBuild);
    }
  }
  function addStylesInto$layerOrInPlace(_this__u8e3s4, name, rulesBuild) {
    if (name == null) {
      // Inline function 'kotlin.apply' call
      rulesBuild(_this__u8e3s4);
    } else {
      layer(_this__u8e3s4, name, rulesBuild);
    }
  }
  function CssStyle$_init_$lambda_598xul($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(2126113218);
    $composer_0.i1i();
    return Companion_instance;
  }
  function CssStyle$addStyles$lambda($styles) {
    return function ($this$style) {
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = $styles.j2v_1.u().g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.addStyles.<anonymous>.<anonymous>' call
        $this$style.t2n(element.v(), element.w());
      }
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_0 = $styles.k2v_1.u().g();
      while (_iterator__ex2g4s_0.h()) {
        var element_0 = _iterator__ex2g4s_0.i();
        // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.addStyles.<anonymous>.<anonymous>' call
        $this$style.z2n(element_0.v(), element_0.w());
      }
      return Unit_instance;
    };
  }
  function CssStyle$addStylesInto$lambda$lambda(this$0, $name, $styles) {
    return function ($this$layerOrInPlace) {
      addStyles($this$layerOrInPlace, this$0, $name, $styles);
      return Unit_instance;
    };
  }
  function CssStyle$addStylesInto$lambda($classNames, $styleSheet, $layer, this$0) {
    return function (name, styles) {
      var tmp;
      if (isNotEmpty(styles)) {
        $classNames.e(name);
        addStylesInto$layerOrInPlace($styleSheet, $layer, CssStyle$addStylesInto$lambda$lambda(this$0, name, styles));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function CssStyle$addStylesInto$lambda$lambda$lambda(this$0, $cssRule, $styles) {
    return function ($this$layerOrInPlace) {
      addStyles($this$layerOrInPlace, this$0, $cssRule, $styles);
      return Unit_instance;
    };
  }
  function CssStyle$addStylesInto$lambda$lambda_0($layer, this$0, $cssRule, $styles) {
    return function ($this$mediaOrInPlace) {
      addStylesInto$layerOrInPlace($this$mediaOrInPlace, $layer, CssStyle$addStylesInto$lambda$lambda$lambda(this$0, $cssRule, $styles));
      return Unit_instance;
    };
  }
  function CssStyle$addStylesInto$lambda_0($classNames, $cssRuleKey, $styleSheet, $layer, this$0) {
    return function (name, styles) {
      var tmp;
      if (isNotEmpty(styles)) {
        $classNames.e(name);
        // Inline function 'kotlin.text.orEmpty' call
        var tmp0_elvis_lhs = $cssRuleKey.d45_1;
        var cssRule = name + (tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs);
        addStylesInto$mediaOrInPlace($styleSheet, $cssRuleKey.c45_1, CssStyle$addStylesInto$lambda$lambda_0($layer, this$0, cssRule, styles));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function CssStyle(init, extraModifier) {
    var tmp;
    if (extraModifier === VOID) {
      tmp = CssStyle$_init_$lambda_598xul;
    } else {
      tmp = extraModifier;
    }
    extraModifier = tmp;
    this.j43_1 = init;
    this.k43_1 = extraModifier;
  }
  protoOf(CssStyle).o44 = function (selector, styleSheet, layer) {
    var classNames = mutableListOf([selector]);
    var lightModifiers = assertNoAttributeModifiers_0(mergeCssModifiers(new CssStyleScope(ColorMode_LIGHT_getInstance()), this, this.j43_1), this, selector, layer);
    var darkModifiers = assertNoAttributeModifiers_0(mergeCssModifiers(new CssStyleScope(ColorMode_DARK_getInstance()), this, this.j43_1), this, selector, layer);
    var tmp = Companion_instance_4;
    var tmp0_safe_receiver = lightModifiers.i2(Companion_getInstance_4().e45_1);
    var tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v44_1;
    var tmp1_safe_receiver = darkModifiers.i2(Companion_getInstance_4().e45_1);
    var tmp2_safe_receiver = tmp.f45(tmp_0, tmp1_safe_receiver == null ? null : tmp1_safe_receiver.v44_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.addStylesInto.<anonymous>' call
      withFinalSelectorName(this, selector, tmp2_safe_receiver, CssStyle$addStylesInto$lambda(classNames, styleSheet, layer, this));
    }
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = plus(lightModifiers.j2(), darkModifiers.j2());
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.CssStyle.addStylesInto.<anonymous>' call
      if (!element.equals(Companion_getInstance_4().e45_1)) {
        destination.e(element);
      }
    }
    var allCssRuleKeys = destination;
    var _iterator__ex2g4s_0 = allCssRuleKeys.g();
    $l$loop: while (_iterator__ex2g4s_0.h()) {
      var cssRuleKey = _iterator__ex2g4s_0.i();
      var tmp_1 = Companion_instance_4;
      var tmp3_safe_receiver = lightModifiers.i2(cssRuleKey);
      var tmp_2 = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.v44_1;
      var tmp4_safe_receiver = darkModifiers.i2(cssRuleKey);
      var tmp5_elvis_lhs = tmp_1.f45(tmp_2, tmp4_safe_receiver == null ? null : tmp4_safe_receiver.v44_1);
      var tmp_3;
      if (tmp5_elvis_lhs == null) {
        continue $l$loop;
      } else {
        tmp_3 = tmp5_elvis_lhs;
      }
      var group = tmp_3;
      withFinalSelectorName(this, selector, group, CssStyle$addStylesInto$lambda_0(classNames, cssRuleKey, styleSheet, layer, this));
    }
    return _ClassSelectors___init__impl__tbnzdx(classNames);
  };
  protoOf(CssStyle).p44 = function (classSelectors) {
    return new ImmutableCssStyle(classSelectors, this.k43_1);
  };
  function CssStyle_0(extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    _init_properties_CssStyle_kt__srbhji();
    return new CssStyle$2(init, extraModifier);
  }
  function CssStyleScope(colorMode) {
    StyleScope.call(this);
    this.m44_1 = colorMode;
  }
  function ComponentKind() {
  }
  function RestrictedKind() {
  }
  function CssStyleBaseScope(colorMode) {
    this.i45_1 = colorMode;
  }
  function Light(styles) {
    this.u44_1 = styles;
  }
  function Dark(styles) {
    this.t44_1 = styles;
  }
  function ColorAgnostic(styles) {
    this.s44_1 = styles;
  }
  function ColorAware(lightStyles, darkStyles) {
    this.q44_1 = lightStyles;
    this.r44_1 = darkStyles;
  }
  function Companion_2() {
  }
  protoOf(Companion_2).f45 = function (lightModifiers, darkModifiers) {
    var tmp;
    if (lightModifiers == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.style.Companion.from.<anonymous>' call
      // Inline function 'kotlin.apply' call
      var this_0 = new ComparableStyleScope();
      // Inline function 'com.varabyte.kobweb.silk.style.Companion.from.<anonymous>.<anonymous>' call
      toStyles(lightModifiers)(this_0);
      tmp = this_0;
    }
    var lightStyles = tmp;
    var tmp_0;
    if (darkModifiers == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.style.Companion.from.<anonymous>' call
      // Inline function 'kotlin.apply' call
      var this_1 = new ComparableStyleScope();
      // Inline function 'com.varabyte.kobweb.silk.style.Companion.from.<anonymous>.<anonymous>' call
      toStyles(darkModifiers)(this_1);
      tmp_0 = this_1;
    }
    var darkStyles = tmp_0;
    if (lightStyles == null && darkStyles == null)
      return null;
    if (!(lightStyles == null) && darkStyles == null)
      return new Light(lightStyles);
    if (lightStyles == null && !(darkStyles == null))
      return new Dark(darkStyles);
    // Inline function 'kotlin.check' call
    if (!(!(lightStyles == null) && !(darkStyles == null))) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    var tmp_1;
    if (equals(lightStyles, darkStyles)) {
      tmp_1 = new ColorAgnostic(lightStyles);
    } else {
      tmp_1 = new ColorAware(lightStyles, darkStyles);
    }
    return tmp_1;
  };
  var Companion_instance_4;
  function Companion_getInstance_3() {
    return Companion_instance_4;
  }
  function _ClassSelectors___init__impl__tbnzdx(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function _ClassSelectors___get_classNames__impl__eyto04($this) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = _get_value__a43j40($this);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.ClassSelectors.<get-classNames>.<anonymous>' call
      var tmp$ret$0 = substringAfterLast(item, _Char___init__impl__6a9atx(46));
      destination.e(tmp$ret$0);
    }
    return destination;
  }
  function ImmutableCssStyle(classSelectors, extraModifier) {
    this.j45_1 = extraModifier;
    this.k45_1 = toSet(_ClassSelectors___get_classNames__impl__eyto04(classSelectors));
  }
  protoOf(ImmutableCssStyle).l45 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(114788234);
    $composer_0.g1i(-1790367629);
    // Inline function 'kotlin.collections.filterNot' call
    var tmp0 = this.k45_1;
    // Inline function 'kotlin.collections.filterNotTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.ImmutableCssStyle.toModifier.<anonymous>' call
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$1 = Companion_instance_7.m45($composer_0, 6).p45().o2_1.toLowerCase();
      if (!endsWith(element, tmp$ret$1)) {
        destination.e(element);
      }
    }
    $composer_0.i1i();
    var currentClassNames = destination;
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!currentClassNames.q()) {
      var tmp_0 = Companion_instance;
      // Inline function 'kotlin.collections.toTypedArray' call
      var tmp$ret$6 = copyToArray(currentClassNames);
      tmp = classNames(tmp_0, tmp$ret$6.slice());
    } else {
      tmp = Companion_instance;
    }
    var tmp0_0 = tmp.z3y(this.j45_1($composer_0, 0));
    $composer_0.i1i();
    return tmp0_0;
  };
  function GeneralKind() {
  }
  function ExtendingCssStyle() {
  }
  function toModifier(_this__u8e3s4, $composer, $changed) {
    _init_properties_CssStyle_kt__srbhji();
    var $composer_0 = $composer;
    $composer_0.g1i(748086722);
    var tmp0 = _toModifier(_this__u8e3s4, $composer_0, 14 & $changed);
    $composer_0.i1i();
    return tmp0;
  }
  function _toModifier(_this__u8e3s4, $composer, $changed) {
    _init_properties_CssStyle_kt__srbhji();
    var $composer_0 = $composer;
    $composer_0.g1i(1265379901);
    var tmp0 = getValue(get_SilkTheme().q42_1, _this__u8e3s4).l45($composer_0, 0);
    $composer_0.i1i();
    return tmp0;
  }
  function toModifier_0(_this__u8e3s4, variants, $composer, $changed) {
    _init_properties_CssStyle_kt__srbhji();
    var $composer_0 = $composer;
    $composer_0.g1i(-431222543);
    var tmp = _toModifier(_this__u8e3s4, $composer_0, 14 & $changed);
    var tmp0_safe_receiver = combine(toList(variants), $composer_0, 0);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q45($composer_0, 0);
    var tmp0 = tmp.z3y(tmp1_elvis_lhs == null ? Companion_instance : tmp1_elvis_lhs);
    $composer_0.i1i();
    return tmp0;
  }
  function base(_this__u8e3s4, extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    _init_properties_CssStyle_kt__srbhji();
    return base_2(_this__u8e3s4, base$lambda(extraModifier), init);
  }
  function CssStyle_1(extraModifier, init) {
    _init_properties_CssStyle_kt__srbhji();
    return new CssStyle$4(init, extraModifier);
  }
  function base_0(_this__u8e3s4, extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    _init_properties_CssStyle_kt__srbhji();
    return base_1(_this__u8e3s4, base$lambda_0(extraModifier), init);
  }
  function base_1(_this__u8e3s4, extraModifier, init) {
    _init_properties_CssStyle_kt__srbhji();
    return new base$3(extraModifier, init);
  }
  function com_varabyte_kobweb_silk_style_CssStyle$stableprop_getter() {
    return com_varabyte_kobweb_silk_style_CssStyle$stable;
  }
  function base_2(_this__u8e3s4, extraModifier, init) {
    _init_properties_CssStyle_kt__srbhji();
    return CssStyle_1(extraModifier, base$lambda_1(init));
  }
  function CssStyle$o$_init_$lambda_60e9n6($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(-256215983);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function CssStyle$2($init, $extraModifier) {
    CssStyle.call(this, $init, CssStyle$o$_init_$lambda_60e9n6($extraModifier));
  }
  function base$lambda($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(-2139862911);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function CssStyle$4($init, $extraModifier) {
    CssStyle.call(this, $init, $extraModifier);
  }
  function base$lambda_0($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(-2139862911);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function base$o$_init_$lambda$lambda_d0jdie($this, $init) {
    return function () {
      // Inline function 'kotlin.let' call
      var this_0 = new CssStyleBaseScope($this.m44_1);
      return $init(this_0);
    };
  }
  function base$o$_init_$lambda_5dljwv($init) {
    return function (_this__u8e3s4) {
      _this__u8e3s4.n44(base$o$_init_$lambda$lambda_d0jdie(_this__u8e3s4, $init));
      return Unit_instance;
    };
  }
  function base$3($extraModifier, $init) {
    CssStyle.call(this, base$o$_init_$lambda_5dljwv($init), $extraModifier);
  }
  function base$lambda$lambda($this_CssStyle, $init) {
    return function () {
      // Inline function 'kotlin.let' call
      var this_0 = new CssStyleBaseScope($this_CssStyle.m44_1);
      return $init(this_0);
    };
  }
  function base$lambda_1($init) {
    return function ($this$CssStyle) {
      $this$CssStyle.n44(base$lambda$lambda($this$CssStyle, $init));
      return Unit_instance;
    };
  }
  var properties_initialized_CssStyle_kt_y9xggg;
  function _init_properties_CssStyle_kt__srbhji() {
    if (!properties_initialized_CssStyle_kt_y9xggg) {
      properties_initialized_CssStyle_kt_y9xggg = true;
      com_varabyte_kobweb_silk_style_CssStyle_Restricted_Base$stable = 0;
      com_varabyte_kobweb_silk_style_CssStyle_Restricted$stable = 0;
      com_varabyte_kobweb_silk_style_CssStyle$stable = 0;
      com_varabyte_kobweb_silk_style_SimpleCssStyle$stable = 0;
      com_varabyte_kobweb_silk_style_ExtendingCssStyle$stable = 0;
      com_varabyte_kobweb_silk_style_ImmutableCssStyle$stable = 8;
      com_varabyte_kobweb_silk_style_CssStyleScope$stable = 0;
      com_varabyte_kobweb_silk_style_CssStyleBaseScope$stable = 0;
      com_varabyte_kobweb_silk_style_StyleGroup_Light$stable = com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter();
      com_varabyte_kobweb_silk_style_StyleGroup_Dark$stable = com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter();
      com_varabyte_kobweb_silk_style_StyleGroup_ColorAgnostic$stable = com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter();
      com_varabyte_kobweb_silk_style_StyleGroup_ColorAware$stable = com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter() | com_varabyte_kobweb_compose_css_ComparableStyleScope$stableprop_getter();
    }
  }
  var com_varabyte_kobweb_silk_style_CssStyleVariant$stable;
  var com_varabyte_kobweb_silk_style_SimpleCssStyleVariant$stable;
  var com_varabyte_kobweb_silk_style_ExtendingCssStyleVariant$stable;
  function CssStyleVariant() {
  }
  protoOf(CssStyleVariant).r45 = function (next) {
    return new CompositeCssStyleVariant(this, next);
  };
  function SimpleCssStyleVariant_init_$Init$(init, extraModifier, baseStyle, $this) {
    SimpleCssStyleVariant.call($this, new SimpleCssStyleVariant$1(init, extraModifier), baseStyle);
    return $this;
  }
  function SimpleCssStyleVariant_init_$Create$(init, extraModifier, baseStyle) {
    return SimpleCssStyleVariant_init_$Init$(init, extraModifier, baseStyle, objectCreate(protoOf(SimpleCssStyleVariant)));
  }
  function SimpleCssStyleVariant$1($init, $extraModifier) {
    CssStyle.call(this, $init, $extraModifier);
  }
  function SimpleCssStyleVariant(cssStyle, baseStyle) {
    CssStyleVariant.call(this);
    this.s45_1 = cssStyle;
    this.t45_1 = baseStyle;
  }
  protoOf(SimpleCssStyleVariant).q45 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(-1935545974);
    var tmp0 = toModifier_0(this.s45_1, [], $composer_0, 0);
    $composer_0.i1i();
    return tmp0;
  };
  function ExtendingCssStyleVariant() {
  }
  function addVariant(_this__u8e3s4, extraModifier, init) {
    return new SimpleCssStyleVariant(new addVariant$1(init, extraModifier), _this__u8e3s4);
  }
  function CompositeCssStyleVariant(head, tail) {
    CssStyleVariant.call(this);
    this.u45_1 = head;
    this.v45_1 = tail;
  }
  protoOf(CompositeCssStyleVariant).q45 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(1761922567);
    var tmp0 = this.u45_1.q45($composer_0, 0).z3y(this.v45_1.q45($composer_0, 0));
    $composer_0.i1i();
    return tmp0;
  };
  function combine(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(867312062);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.reduceOrNull' call
      var iterator = _this__u8e3s4.g();
      if (!iterator.h()) {
        tmp$ret$0 = null;
        break $l$block;
      }
      var accumulator = iterator.i();
      while (iterator.h()) {
        var tmp1 = accumulator;
        // Inline function 'com.varabyte.kobweb.silk.style.combine.<anonymous>' call
        var variant = iterator.i();
        var tmp;
        if (!(tmp1 == null) && !(variant == null)) {
          tmp = tmp1.r45(variant);
        } else {
          tmp = tmp1 == null ? variant : tmp1;
        }
        accumulator = tmp;
      }
      tmp$ret$0 = accumulator;
    }
    var tmp0 = tmp$ret$0;
    $composer_0.i1i();
    return tmp0;
  }
  function addVariant_0(_this__u8e3s4, extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    return addVariant(_this__u8e3s4, addVariant$lambda(extraModifier), init);
  }
  function com_varabyte_kobweb_silk_style_CssStyleVariant$stableprop_getter() {
    return com_varabyte_kobweb_silk_style_CssStyleVariant$stable;
  }
  function addVariantBase(_this__u8e3s4, extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    return addVariantBase_0(_this__u8e3s4, addVariantBase$lambda(extraModifier), init);
  }
  function addVariantBase_0(_this__u8e3s4, extraModifier, init) {
    return SimpleCssStyleVariant_init_$Create$(addVariantBase$lambda_0(init), extraModifier, _this__u8e3s4);
  }
  function addVariant$1($init, $extraModifier) {
    CssStyle.call(this, $init, $extraModifier);
  }
  function addVariant$lambda($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(1967918819);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function addVariantBase$lambda($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(754846533);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function addVariantBase$lambda$lambda($this_SimpleCssStyleVariant, $init) {
    return function () {
      // Inline function 'kotlin.let' call
      var this_0 = new CssStyleBaseScope($this_SimpleCssStyleVariant.m44_1);
      return $init(this_0);
    };
  }
  function addVariantBase$lambda_0($init) {
    return function ($this$SimpleCssStyleVariant) {
      $this$SimpleCssStyleVariant.n44(addVariantBase$lambda$lambda($this$SimpleCssStyleVariant, $init));
      return Unit_instance;
    };
  }
  function get_selectorSeparators() {
    _init_properties_StyleScope_kt__rik58j();
    return selectorSeparators;
  }
  var selectorSeparators;
  var com_varabyte_kobweb_silk_style_StyleScope$stable;
  var com_varabyte_kobweb_silk_style_CssModifier_Key$stable;
  var com_varabyte_kobweb_silk_style_CssModifier$stable;
  function StyleScope() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.d43_1 = ArrayList_init_$Create$();
    this.e43_1 = this.d43_1;
  }
  protoOf(StyleScope).n44 = function (createModifier) {
    this.d43_1.e(new CssModifier(createModifier()));
  };
  protoOf(StyleScope).f43 = function (mediaQuery, suffix, createModifier) {
    this.d43_1.e(new CssModifier(createModifier(), mediaQuery, suffix));
  };
  protoOf(StyleScope).g43 = function (suffix, createModifier) {
    this.d43_1.e(new CssModifier(createModifier(), null, suffix));
  };
  protoOf(StyleScope).h43 = function (mediaQuery, createModifier) {
    this.d43_1.e(new CssModifier(createModifier(), mediaQuery));
  };
  protoOf(StyleScope).g45 = function (_this__u8e3s4, createModifier) {
    this.h43(_this__u8e3s4.w45(), createModifier);
  };
  protoOf(StyleScope).h45 = function (_this__u8e3s4, createModifier) {
    _this__u8e3s4.w43(this, createModifier);
  };
  function Companion_3() {
    Companion_instance_5 = this;
    this.e45_1 = new Key(null, null);
  }
  var Companion_instance_5;
  function Companion_getInstance_4() {
    if (Companion_instance_5 == null)
      new Companion_3();
    return Companion_instance_5;
  }
  function Key(mediaQuery, suffix) {
    this.c45_1 = mediaQuery;
    this.d45_1 = suffix;
  }
  protoOf(Key).toString = function () {
    return 'Key(mediaQuery=' + this.c45_1 + ', suffix=' + this.d45_1 + ')';
  };
  protoOf(Key).hashCode = function () {
    var result = this.c45_1 == null ? 0 : getStringHashCode(this.c45_1);
    result = imul(result, 31) + (this.d45_1 == null ? 0 : getStringHashCode(this.d45_1)) | 0;
    return result;
  };
  protoOf(Key).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Key))
      return false;
    var tmp0_other_with_cast = other instanceof Key ? other : THROW_CCE();
    if (!(this.c45_1 == tmp0_other_with_cast.c45_1))
      return false;
    if (!(this.d45_1 == tmp0_other_with_cast.d45_1))
      return false;
    return true;
  };
  function CssModifier(modifier, mediaQuery, suffix) {
    Companion_getInstance_4();
    mediaQuery = mediaQuery === VOID ? null : mediaQuery;
    suffix = suffix === VOID ? null : suffix;
    this.v44_1 = modifier;
    this.w44_1 = mediaQuery;
    var tmp = this;
    var tmp_0;
    if (suffix == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      var tmp_1;
      // Inline function 'com.varabyte.kobweb.silk.style.CssModifier.suffix.<anonymous>' call
      // Inline function 'kotlin.text.isNotBlank' call
      if (!isBlank(suffix)) {
        tmp_1 = suffix;
      } else {
        tmp_1 = null;
      }
      tmp_0 = tmp_1;
    }
    var tmp1_safe_receiver = tmp_0;
    var tmp_2;
    if (tmp1_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.style.CssModifier.suffix.<anonymous>' call
      tmp_2 = !get_selectorSeparators().o(new Char(first(tmp1_safe_receiver))) ? ' ' + tmp1_safe_receiver : tmp1_safe_receiver;
    }
    tmp.x44_1 = tmp_2;
  }
  protoOf(CssModifier).y44 = function (other) {
    // Inline function 'kotlin.check' call
    if (!(!(this === other) && equals(this.w44_1, other.w44_1) && this.x44_1 == other.x44_1)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    return new CssModifier(this.v44_1.z3y(other.v44_1), this.w44_1, this.x44_1);
  };
  protoOf(CssModifier).v = function () {
    var tmp0_safe_receiver = this.w44_1;
    return new Key(tmp0_safe_receiver == null ? null : toString(tmp0_safe_receiver), this.x44_1);
  };
  function assertNoAttributes(_this__u8e3s4, selectorName, extraContext) {
    _init_properties_StyleScope_kt__rik58j();
    var attrsScope = ComparableAttrsScope_init_$Create$();
    toAttrs(_this__u8e3s4.v44_1)(attrsScope);
    if (attrsScope.r2u_1.q())
      return Unit_instance;
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'com.varabyte.kobweb.silk.style.assertNoAttributes.<anonymous>' call
    // Inline function 'kotlin.text.appendLine' call
    var value = 'Style block declarations cannot contain Modifiers that specify attributes. Only style modifiers are allowed here.';
    // Inline function 'kotlin.text.appendLine' call
    this_0.p8(value).q8(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    this_0.q8(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = 'Details:';
    // Inline function 'kotlin.text.appendLine' call
    this_0.p8(value_0).q8(_Char___init__impl__6a9atx(10));
    this_0.p8('\tCSS rule: ');
    this_0.p8('"' + selectorName);
    if (!(_this__u8e3s4.w44_1 == null)) {
      this_0.o8(_this__u8e3s4.w44_1);
    }
    if (!(_this__u8e3s4.x44_1 == null)) {
      this_0.p8(_this__u8e3s4.x44_1);
    }
    // Inline function 'kotlin.text.appendLine' call
    // Inline function 'kotlin.text.appendLine' call
    this_0.p8('"').q8(_Char___init__impl__6a9atx(10));
    var tmp = attrsScope.r2u_1.j2();
    // Inline function 'kotlin.text.appendLine' call
    var value_1 = '\tAttribute(s): ' + joinToString(tmp, ', ', VOID, VOID, VOID, VOID, assertNoAttributes$lambda);
    // Inline function 'kotlin.text.appendLine' call
    this_0.p8(value_1).q8(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    this_0.q8(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    // Inline function 'kotlin.text.appendLine' call
    this_0.p8(extraContext).q8(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.error' call
    var message = this_0.toString();
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function assertNoAttributes$lambda(it) {
    _init_properties_StyleScope_kt__rik58j();
    return '"' + it + '"';
  }
  var properties_initialized_StyleScope_kt_8wepyz;
  function _init_properties_StyleScope_kt__rik58j() {
    if (!properties_initialized_StyleScope_kt_8wepyz) {
      properties_initialized_StyleScope_kt_8wepyz = true;
      selectorSeparators = setOf([new Char(_Char___init__impl__6a9atx(32)), new Char(_Char___init__impl__6a9atx(62)), new Char(_Char___init__impl__6a9atx(43)), new Char(_Char___init__impl__6a9atx(126)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(91))]);
      com_varabyte_kobweb_silk_style_StyleScope$stable = 8;
      com_varabyte_kobweb_silk_style_CssModifier_Key$stable = 0;
      com_varabyte_kobweb_silk_style_CssModifier$stable = 8;
    }
  }
  var com_varabyte_kobweb_silk_style_animation_KeyframesBuilder$stable;
  var com_varabyte_kobweb_silk_style_animation_Keyframes$stable;
  function _get_comparableKeyframeStyles__erog4h($this) {
    // Inline function 'kotlin.collections.mapValues' call
    var this_0 = $this.r43_1;
    // Inline function 'kotlin.collections.mapValuesTo' call
    var destination = LinkedHashMap_init_$Create$_0(mapCapacity(this_0.j()));
    // Inline function 'kotlin.collections.associateByTo' call
    var _iterator__ex2g4s = this_0.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.mapValuesTo.<anonymous>' call
      var tmp = element.v();
      // Inline function 'com.varabyte.kobweb.silk.style.animation.KeyframesBuilder.<get-comparableKeyframeStyles>.<anonymous>' call
      // Inline function 'kotlin.collections.component2' call
      var modifier = element.w();
      // Inline function 'kotlin.apply' call
      var this_1 = new ComparableStyleScope();
      // Inline function 'com.varabyte.kobweb.silk.style.animation.KeyframesBuilder.<get-comparableKeyframeStyles>.<anonymous>.<anonymous>' call
      toStyles(modifier)(this_1);
      destination.l2(tmp, this_1);
    }
    return destination;
  }
  function KeyframesBuilder(colorMode) {
    this.q43_1 = colorMode;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.r43_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(KeyframesBuilder).x45 = function (createStyle) {
    var tmp0 = this.r43_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var pair = to(From_getInstance(), createStyle());
    tmp0.l2(pair.za_1, pair.ab_1);
  };
  protoOf(KeyframesBuilder).y45 = function (createStyle) {
    var tmp0 = this.r43_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var pair = to(To_getInstance(), createStyle());
    tmp0.l2(pair.za_1, pair.ab_1);
  };
  protoOf(KeyframesBuilder).equals = function (other) {
    if (!(other instanceof KeyframesBuilder))
      return false;
    return this === other || equals(_get_comparableKeyframeStyles__erog4h(this), _get_comparableKeyframeStyles__erog4h(other));
  };
  protoOf(KeyframesBuilder).hashCode = function () {
    return hashCode(_get_comparableKeyframeStyles__erog4h(this));
  };
  protoOf(KeyframesBuilder).s43 = function (stylesheet, keyframesName) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.r43_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(this_0.j());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this_0.u().g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.animation.KeyframesBuilder.addKeyframesIntoStylesheet.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var keyframe = item.v();
      // Inline function 'kotlin.collections.component2' call
      var modifier = item.w();
      var styles = toStyles(modifier);
      var cssRuleBuilder = new StyleScopeBuilder();
      styles(cssRuleBuilder);
      var tmp$ret$3 = new CSSKeyframeRuleDeclaration(keyframe, cssRuleBuilder);
      destination.e(tmp$ret$3);
    }
    var keyframeRules = destination;
    stylesheet.f2n(new CSSKeyframesRuleDeclaration(keyframesName, keyframeRules));
  };
  function Companion_4() {
  }
  protoOf(Companion_4).z45 = function (build) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = listOf_0([ColorMode_LIGHT_getInstance(), ColorMode_DARK_getInstance()]);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.animation.Companion.isColorModeAgnostic.<anonymous>' call
      // Inline function 'kotlin.apply' call
      var this_1 = new KeyframesBuilder(item);
      build(this_1);
      destination.e(this_1);
    }
    // Inline function 'kotlin.collections.count' call
    return distinct(destination).j() === 1;
  };
  var Companion_instance_6;
  function Companion_getInstance_5() {
    return Companion_instance_6;
  }
  function Keyframes$usesColorMode$delegate$lambda(this$0) {
    return function () {
      return !Companion_instance_6.z45(this$0.a46_1);
    };
  }
  function Keyframes(init) {
    this.a46_1 = init;
    var tmp = this;
    tmp.b46_1 = lazy(Keyframes$usesColorMode$delegate$lambda(this));
  }
  var com_varabyte_kobweb_silk_style_breakpoint_Breakpoint_Range$stable;
  var Breakpoint_ZERO_instance;
  var Breakpoint_SM_instance;
  var Breakpoint_MD_instance;
  var Breakpoint_LG_instance;
  var Breakpoint_XL_instance;
  function values() {
    return [Breakpoint_ZERO_getInstance(), Breakpoint_SM_getInstance(), Breakpoint_MD_getInstance(), Breakpoint_LG_getInstance(), Breakpoint_XL_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var Breakpoint_entriesInitialized;
  function Breakpoint_initEntries() {
    if (Breakpoint_entriesInitialized)
      return Unit_instance;
    Breakpoint_entriesInitialized = true;
    Breakpoint_ZERO_instance = new Breakpoint('ZERO', 0);
    Breakpoint_SM_instance = new Breakpoint('SM', 1);
    Breakpoint_MD_instance = new Breakpoint('MD', 2);
    Breakpoint_LG_instance = new Breakpoint('LG', 3);
    Breakpoint_XL_instance = new Breakpoint('XL', 4);
  }
  var $ENTRIES;
  function Breakpoint(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  protoOf(Breakpoint).w45 = function () {
    return new MediaFeature('min-width', toWidth(this));
  };
  function Breakpoint_ZERO_getInstance() {
    Breakpoint_initEntries();
    return Breakpoint_ZERO_instance;
  }
  function Breakpoint_SM_getInstance() {
    Breakpoint_initEntries();
    return Breakpoint_SM_instance;
  }
  function Breakpoint_MD_getInstance() {
    Breakpoint_initEntries();
    return Breakpoint_MD_instance;
  }
  function Breakpoint_LG_getInstance() {
    Breakpoint_initEntries();
    return Breakpoint_LG_instance;
  }
  function Breakpoint_XL_getInstance() {
    Breakpoint_initEntries();
    return Breakpoint_XL_instance;
  }
  function SilkBreakpointDisplayStyles($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.k1k(1560920665);
    if (!($changed === 0) || !$composer_0.z1h()) {
      GenericTag('style', null, ComposableSingletons$BreakpointConditionsKt_getInstance().e46_1, $composer_0, 390, 2);
    } else {
      $composer_0.p1c();
    }
    var tmp0_safe_receiver = $composer_0.l1k();
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.y1p(SilkBreakpointDisplayStyles$lambda($changed));
    }
  }
  function ComposableLambda$invoke$ref_1($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.o2e(p0, p1, p2);
    };
  }
  function ComposableSingletons$BreakpointConditionsKt$lambda_1$lambda_jljler($this$GenericTag, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.g1i(560331389);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_0.d1j($this$GenericTag);
    // Inline function 'kotlin.let' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.s1j();
    var tmp;
    if (invalid || it === Companion_getInstance().y1c_1) {
      // Inline function 'com.varabyte.kobweb.silk.style.breakpoint.ComposableSingletons$BreakpointConditionsKt.lambda-1.<anonymous>.<anonymous>' call
      var value = ComposableSingletons$BreakpointConditionsKt$lambda_1$lambda$lambda_jtcz2q($this$GenericTag);
      $composer_0.d1k(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.i1i();
    DisposableEffect(Unit_instance, tmp0_group, $composer_0, 6);
    return Unit_instance;
  }
  function ComposableSingletons$BreakpointConditionsKt$lambda_1$2$$inlined$cache$1$1($cssStylesheet) {
    this.f46_1 = $cssStylesheet;
  }
  protoOf(ComposableSingletons$BreakpointConditionsKt$lambda_1$2$$inlined$cache$1$1).np = function () {
    // Inline function 'com.varabyte.kobweb.silk.style.breakpoint.ComposableSingletons$BreakpointConditionsKt.lambda-1.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
    var tmp0_safe_receiver = this.f46_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      clearCSSRules(tmp0_safe_receiver);
    }
  };
  function ComposableSingletons$BreakpointConditionsKt$lambda_1$lambda$lambda_jtcz2q($this_GenericTag) {
    return function ($this$DisposableEffect) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = $this_GenericTag.e2m($this$DisposableEffect).sheet;
      var cssStylesheet = tmp instanceof CSSStyleSheet ? tmp : null;
      var _iterator__ex2g4s = get_entries().g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.silk.style.breakpoint.ComposableSingletons$BreakpointConditionsKt.lambda-1.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        var breakpointQuery = (new CSSMediaRuleDeclaration(element.w45(), emptyList())).v2m();
        var invertBreakpointQuery = (new CSSMediaRuleDeclaration(invert(element.w45()), emptyList())).v2m();
        if (cssStylesheet == null)
          null;
        else {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp$ret$3 = element.o2_1.toLowerCase();
          addRule(cssStylesheet, invertBreakpointQuery + ' { .silk-display-if-at-least-' + tmp$ret$3 + ' { display: none !important; } }');
        }
        if (cssStylesheet == null)
          null;
        else {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp$ret$5 = element.o2_1.toLowerCase();
          addRule(cssStylesheet, breakpointQuery + ' { .silk-display-until-' + tmp$ret$5 + ' { display: none !important; } }');
        }
      }
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new ComposableSingletons$BreakpointConditionsKt$lambda_1$2$$inlined$cache$1$1(cssStylesheet);
    };
  }
  function ComposableSingletons$BreakpointConditionsKt() {
    ComposableSingletons$BreakpointConditionsKt_instance = this;
    var tmp = this;
    tmp.e46_1 = ComposableLambda$invoke$ref_1(composableLambdaInstance(321895361, false, ComposableSingletons$BreakpointConditionsKt$lambda_1$lambda_jljler));
  }
  var ComposableSingletons$BreakpointConditionsKt_instance;
  function ComposableSingletons$BreakpointConditionsKt_getInstance() {
    if (ComposableSingletons$BreakpointConditionsKt_instance == null)
      new ComposableSingletons$BreakpointConditionsKt();
    return ComposableSingletons$BreakpointConditionsKt_instance;
  }
  function invert(_this__u8e3s4) {
    return new Raw('not all and ' + toString(_this__u8e3s4));
  }
  function addRule(_this__u8e3s4, cssRule) {
    var cssRuleIndex = _this__u8e3s4.insertRule(cssRule, _this__u8e3s4.cssRules.length);
    return _this__u8e3s4.cssRules.item(cssRuleIndex);
  }
  function clearCSSRules(_this__u8e3s4) {
    // Inline function 'kotlin.repeat' call
    var times = _this__u8e3s4.cssRules.length;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'com.varabyte.kobweb.silk.style.breakpoint.clearCSSRules.<anonymous>' call
        _this__u8e3s4.deleteRule(0);
      }
       while (inductionVariable < times);
  }
  function SilkBreakpointDisplayStyles$lambda($$changed) {
    return function ($composer, $force) {
      SilkBreakpointDisplayStyles($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  var com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Px$stable;
  var com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Em$stable;
  var com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Rem$stable;
  var com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue$stable;
  var com_varabyte_kobweb_silk_style_breakpoint_BreakpointValues$stable;
  function BreakpointValues(sm, md, lg, xl) {
    this.g46_1 = sm;
    this.h46_1 = md;
    this.i46_1 = lg;
    this.j46_1 = xl;
  }
  protoOf(BreakpointValues).toString = function () {
    return 'BreakpointValues(sm=' + toString(this.g46_1) + ', md=' + toString(this.h46_1) + ', lg=' + toString(this.i46_1) + ', xl=' + toString(this.j46_1) + ')';
  };
  protoOf(BreakpointValues).hashCode = function () {
    var result = hashCode(this.g46_1);
    result = imul(result, 31) + hashCode(this.h46_1) | 0;
    result = imul(result, 31) + hashCode(this.i46_1) | 0;
    result = imul(result, 31) + hashCode(this.j46_1) | 0;
    return result;
  };
  protoOf(BreakpointValues).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BreakpointValues))
      return false;
    var tmp0_other_with_cast = other instanceof BreakpointValues ? other : THROW_CCE();
    if (!equals(this.g46_1, tmp0_other_with_cast.g46_1))
      return false;
    if (!equals(this.h46_1, tmp0_other_with_cast.h46_1))
      return false;
    if (!equals(this.i46_1, tmp0_other_with_cast.i46_1))
      return false;
    if (!equals(this.j46_1, tmp0_other_with_cast.j46_1))
      return false;
    return true;
  };
  function BreakpointSizes(sm, md, lg, xl) {
    return new BreakpointValues(new Rem(sm), new Rem(md), new Rem(lg), new Rem(xl));
  }
  function Rem(value) {
    BreakpointUnitValue.call(this, value);
  }
  function BreakpointUnitValue(width) {
    this.k46_1 = width;
  }
  var com_varabyte_kobweb_silk_style_breakpoint_ResponsiveValues$stable;
  var com_varabyte_kobweb_silk_style_layer_LayerListBuilder$stable;
  function LayerListBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.x42_1 = LinkedHashMap_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.map' call
    var this_0 = get_entries_0();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.style.layer.LayerListBuilder.silkLayers.<anonymous>' call
      var tmp$ret$1 = item.b45_1;
      destination.e(tmp$ret$1);
    }
    tmp_0.y42_1 = destination;
  }
  protoOf(LayerListBuilder).z42 = function () {
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = this.x42_1.i2(null);
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    var layersToProcess = toMutableList(plus_0(this.y42_1, tmp$ret$0));
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$();
    // Inline function 'com.varabyte.kobweb.silk.style.layer.LayerListBuilder.build.<anonymous>' call
    $l$loop: while (true) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!!layersToProcess.q()) {
        break $l$loop;
      }
      var currLayer = layersToProcess.e2(0);
      this_0.e(currLayer);
      var tmp0_safe_receiver = this.x42_1.i2(currLayer);
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'com.varabyte.kobweb.silk.style.layer.LayerListBuilder.build.<anonymous>.<anonymous>' call
        layersToProcess.b2(0, tmp0_safe_receiver);
      }
    }
    return this_0.s5();
  };
  var SilkLayer_RESET_instance;
  var SilkLayer_KOBWEB_COMPOSE_instance;
  var SilkLayer_BASE_instance;
  var SilkLayer_COMPONENT_STYLES_instance;
  var SilkLayer_COMPONENT_VARIANTS_instance;
  var SilkLayer_RESTRICTED_STYLES_instance;
  var SilkLayer_GENERAL_STYLES_instance;
  function values_0() {
    return [SilkLayer_RESET_getInstance(), SilkLayer_KOBWEB_COMPOSE_getInstance(), SilkLayer_BASE_getInstance(), SilkLayer_COMPONENT_STYLES_getInstance(), SilkLayer_COMPONENT_VARIANTS_getInstance(), SilkLayer_RESTRICTED_STYLES_getInstance(), SilkLayer_GENERAL_STYLES_getInstance()];
  }
  function get_entries_0() {
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  var SilkLayer_entriesInitialized;
  function SilkLayer_initEntries() {
    if (SilkLayer_entriesInitialized)
      return Unit_instance;
    SilkLayer_entriesInitialized = true;
    SilkLayer_RESET_instance = new SilkLayer('RESET', 0, 'reset');
    SilkLayer_KOBWEB_COMPOSE_instance = new SilkLayer('KOBWEB_COMPOSE', 1, 'kobweb-compose');
    SilkLayer_BASE_instance = new SilkLayer('BASE', 2, 'base');
    SilkLayer_COMPONENT_STYLES_instance = new SilkLayer('COMPONENT_STYLES', 3, 'component-styles');
    SilkLayer_COMPONENT_VARIANTS_instance = new SilkLayer('COMPONENT_VARIANTS', 4, 'component-variants');
    SilkLayer_RESTRICTED_STYLES_instance = new SilkLayer('RESTRICTED_STYLES', 5, 'restricted-styles');
    SilkLayer_GENERAL_STYLES_instance = new SilkLayer('GENERAL_STYLES', 6, 'general-styles');
  }
  var $ENTRIES_0;
  function SilkLayer(name, ordinal, layerName) {
    Enum.call(this, name, ordinal);
    this.b45_1 = layerName;
  }
  function SilkLayer_RESET_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_RESET_instance;
  }
  function SilkLayer_KOBWEB_COMPOSE_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_KOBWEB_COMPOSE_instance;
  }
  function SilkLayer_BASE_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_BASE_instance;
  }
  function SilkLayer_COMPONENT_STYLES_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_COMPONENT_STYLES_instance;
  }
  function SilkLayer_COMPONENT_VARIANTS_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_COMPONENT_VARIANTS_instance;
  }
  function SilkLayer_RESTRICTED_STYLES_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_RESTRICTED_STYLES_instance;
  }
  function SilkLayer_GENERAL_STYLES_getInstance() {
    SilkLayer_initEntries();
    return SilkLayer_GENERAL_STYLES_instance;
  }
  function descendants(_this__u8e3s4, elements, createModifier) {
    return _this__u8e3s4.g43(' :is(' + joinToString_0(elements) + ')', createModifier);
  }
  function get_ariaDisabled(_this__u8e3s4) {
    return new OfAttributeSelector('aria-disabled="true"');
  }
  function not(_this__u8e3s4, params) {
    return Companion_instance_2.t43('not', params.slice());
  }
  function get_hover(_this__u8e3s4) {
    return new OfPseudoClass('hover');
  }
  function get_active(_this__u8e3s4) {
    return new OfPseudoClass('active');
  }
  function get_focusVisible(_this__u8e3s4) {
    return new OfPseudoClass('focus-visible');
  }
  function get_placeholder(_this__u8e3s4) {
    return new OfPseudoElement('placeholder');
  }
  function get_ariaInvalid(_this__u8e3s4) {
    return new OfAttributeSelector('aria-invalid="true"');
  }
  function get_disabled(_this__u8e3s4) {
    return new OfPseudoClass('disabled');
  }
  function get_link(_this__u8e3s4) {
    return new OfPseudoClass('link');
  }
  function get_visited(_this__u8e3s4) {
    return new OfPseudoClass('visited');
  }
  function set__SilkTheme(_set____db54di) {
    _SilkTheme = _set____db54di;
  }
  var _SilkTheme;
  var com_varabyte_kobweb_silk_theme_MutableSilkTheme$stable;
  var com_varabyte_kobweb_silk_theme_ImmutableSilkTheme$stable;
  function _registerStyle($this, name, style, kind, layer) {
    // Inline function 'kotlin.let' call
    // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme._registerStyle.<anonymous>' call
    var it = $this.u41_1.i2(name);
    // Inline function 'kotlin.check' call
    if (!(it == null || it === style)) {
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme._registerStyle.<anonymous>' call
      var message = trimIndent('\n                Attempting to register a second CssStyle with a name that\'s already used: "' + name + '"\n\n                If this was an intentional override, you should use `replaceStyle` instead.\n            ');
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.set' call
    $this.t41_1.l2(name, style);
    // Inline function 'kotlin.collections.set' call
    $this.x41_1.l2(style, name);
    var tmp;
    if (layer == null) {
      var tmp_0;
      if (kind.equals(getKClass(ComponentKind))) {
        tmp_0 = SilkLayer_COMPONENT_STYLES_getInstance();
      } else if (kind.equals(getKClass(RestrictedKind))) {
        tmp_0 = SilkLayer_RESTRICTED_STYLES_getInstance();
      } else if (kind.equals(getKClass(GeneralKind))) {
        tmp_0 = SilkLayer_GENERAL_STYLES_getInstance();
      } else {
        var message_0 = 'Unknown kind: ' + toString(kind);
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
      tmp = tmp_0.b45_1;
    } else {
      tmp = layer;
    }
    var finalLayer = tmp;
    // Inline function 'kotlin.takeIf' call
    var tmp_1;
    // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme._registerStyle.<anonymous>' call
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(finalLayer) > 0) {
      tmp_1 = finalLayer;
    } else {
      tmp_1 = null;
    }
    var tmp2_safe_receiver = tmp_1;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme._registerStyle.<anonymous>' call
      // Inline function 'kotlin.collections.set' call
      $this.z41_1.l2(name, tmp2_safe_receiver);
    }
    if (style instanceof ExtendingCssStyle) {
      // Inline function 'kotlin.collections.getOrPut' call
      var this_0 = $this.d42_1;
      var value = this_0.i2(style);
      var tmp_2;
      if (value == null) {
        // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme._registerStyle.<anonymous>' call
        // Inline function 'kotlin.collections.mutableListOf' call
        var answer = ArrayList_init_$Create$();
        this_0.l2(style, answer);
        tmp_2 = answer;
      } else {
        tmp_2 = value;
      }
      tmp_2.e(style.n46_1);
    }
  }
  function updateReplaced($this, originalStyle, newStyle) {
    // Inline function 'kotlin.collections.set' call
    $this.b42_1.l2(originalStyle, newStyle);
    var tmp0_safe_receiver = $this.d42_1.m2(originalStyle);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.updateReplaced.<anonymous>' call
      // Inline function 'kotlin.collections.set' call
      $this.d42_1.l2(newStyle, tmp0_safe_receiver);
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = $this.d42_1.k2().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.updateReplaced.<anonymous>' call
      if (element.y1(originalStyle)) {
        element.e(newStyle);
      }
    }
  }
  function MutableSilkTheme$replaceStyle$newStyle$1($init, $extraModifier) {
    CssStyle.call(this, $init, $extraModifier);
  }
  function MutableSilkTheme() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.t41_1 = LinkedHashMap_init_$Create$();
    this.u41_1 = this.t41_1;
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.v41_1 = LinkedHashMap_init_$Create$();
    this.w41_1 = this.v41_1;
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_1.x41_1 = LinkedHashMap_init_$Create$();
    this.y41_1 = this.x41_1;
    var tmp_2 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_2.z41_1 = LinkedHashMap_init_$Create$();
    this.a42_1 = this.z41_1;
    var tmp_3 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_3.b42_1 = LinkedHashMap_init_$Create$();
    this.c42_1 = this.b42_1;
    var tmp_4 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_4.d42_1 = LinkedHashMap_init_$Create$();
    this.e42_1 = this.d42_1;
    var tmp_5 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_5.f42_1 = LinkedHashMap_init_$Create$();
    this.g42_1 = this.f42_1;
    var tmp_6 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_6.h42_1 = LinkedHashMap_init_$Create$();
    this.i42_1 = this.h42_1;
    this.j42_1 = new MutablePalettes();
    this.k42_1 = BreakpointSizes(get_cssRem(30), get_cssRem(48), get_cssRem(62), get_cssRem(80));
  }
  protoOf(MutableSilkTheme).o46 = function (name, style, layer) {
    return _registerStyle(this, name, style, getKClass(ComponentKind), layer);
  };
  protoOf(MutableSilkTheme).l42 = function (name, style, layer, $super) {
    layer = layer === VOID ? null : layer;
    var tmp;
    if ($super === VOID) {
      this.o46(name, style, layer);
      tmp = Unit_instance;
    } else {
      tmp = $super.o46.call(this, name, style, layer);
    }
    return tmp;
  };
  protoOf(MutableSilkTheme).p46 = function (name, style, layer) {
    return _registerStyle(this, name, style, getKClass(RestrictedKind), layer);
  };
  protoOf(MutableSilkTheme).q46 = function (name, style, layer, $super) {
    layer = layer === VOID ? null : layer;
    var tmp;
    if ($super === VOID) {
      this.p46(name, style, layer);
      tmp = Unit_instance;
    } else {
      tmp = $super.p46.call(this, name, style, layer);
    }
    return tmp;
  };
  protoOf(MutableSilkTheme).r46 = function (name, style, layer) {
    return _registerStyle(this, name, style, getKClass(GeneralKind), layer);
  };
  protoOf(MutableSilkTheme).s46 = function (name, style, layer, $super) {
    layer = layer === VOID ? null : layer;
    var tmp;
    if ($super === VOID) {
      this.r46(name, style, layer);
      tmp = Unit_instance;
    } else {
      tmp = $super.r46.call(this, name, style, layer);
    }
    return tmp;
  };
  protoOf(MutableSilkTheme).t46 = function (style, extraModifier, init) {
    var tmp0_elvis_lhs = this.y41_1.i2(style);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Attempting to replace a CSS style that was never registered.';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var name = tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.c42_1;
    // Inline function 'kotlin.check' call
    if (!!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).g2(style)) {
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.replaceStyle.<anonymous>' call
      var message_0 = 'Attempting to override style "' + name + '" twice';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    var newStyle = new MutableSilkTheme$replaceStyle$newStyle$1(init, extraModifier);
    // Inline function 'kotlin.collections.set' call
    this.t41_1.l2(name, newStyle);
    // Inline function 'kotlin.collections.set' call
    this.x41_1.l2(newStyle, name);
    updateReplaced(this, style, newStyle);
  };
  protoOf(MutableSilkTheme).u46 = function (name, variant, layer) {
    var tmp0_elvis_lhs = variant instanceof SimpleCssStyleVariant ? variant : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'You can only register variants created by `addVariant` or `addVariantBase`.';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var simpleVariant = tmp;
    var tmp_0;
    if (startsWith(name, _Char___init__impl__6a9atx(45))) {
      var tmp1_elvis_lhs = this.y41_1.i2(simpleVariant.t45_1);
      var tmp_1;
      if (tmp1_elvis_lhs == null) {
        var message_0 = 'When registering variant "' + name + '", somehow its base style was not registered correctly. This is not expected, so please report the issue.';
        throw IllegalStateException_init_$Create$(toString(message_0));
      } else {
        tmp_1 = tmp1_elvis_lhs;
      }
      var baseStyleName = tmp_1;
      tmp_0 = baseStyleName + name;
    } else {
      tmp_0 = name;
    }
    var name_0 = tmp_0;
    // Inline function 'kotlin.let' call
    // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerVariant.<anonymous>' call
    var it = this.w41_1.i2(name_0);
    // Inline function 'kotlin.check' call
    if (!(it == null || it === variant)) {
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerVariant.<anonymous>' call
      var message_1 = trimIndent('\n            Attempting to register a second variant with a name that\'s already used: "' + name_0 + "\"\n\n            This isn't allowed. Please choose a different name. If there's a usecase for this I'm unaware of,\n            consider filing an issue at https://github.com/varabyte/kobweb/issues\n        ");
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
    // Inline function 'kotlin.collections.set' call
    this.v41_1.l2(name_0, variant);
    var tmp8 = this.x41_1;
    // Inline function 'kotlin.collections.set' call
    var key = variant.s45_1;
    tmp8.l2(key, name_0);
    // Inline function 'kotlin.takeIf' call
    var this_0 = layer == null ? SilkLayer_COMPONENT_VARIANTS_getInstance().b45_1 : layer;
    var tmp_2;
    // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerVariant.<anonymous>' call
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_0) > 0) {
      tmp_2 = this_0;
    } else {
      tmp_2 = null;
    }
    var finalLayer = tmp_2;
    if (finalLayer == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerVariant.<anonymous>' call
      // Inline function 'kotlin.collections.set' call
      this.z41_1.l2(name_0, finalLayer);
    }
    if (variant instanceof ExtendingCssStyleVariant) {
      var tmp15 = this.d42_1;
      // Inline function 'kotlin.collections.getOrPut' call
      var key_0 = variant.s45_1;
      var value = tmp15.i2(key_0);
      var tmp_3;
      if (value == null) {
        // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerVariant.<anonymous>' call
        // Inline function 'kotlin.collections.mutableListOf' call
        var answer = ArrayList_init_$Create$();
        tmp15.l2(key_0, answer);
        tmp_3 = answer;
      } else {
        tmp_3 = value;
      }
      tmp_3.e(variant.x46_1.s45_1);
    }
  };
  protoOf(MutableSilkTheme).y46 = function (name, variant, layer, $super) {
    layer = layer === VOID ? null : layer;
    var tmp;
    if ($super === VOID) {
      this.u46(name, variant, layer);
      tmp = Unit_instance;
    } else {
      tmp = $super.u46.call(this, name, variant, layer);
    }
    return tmp;
  };
  protoOf(MutableSilkTheme).z46 = function (name, keyframes) {
    // Inline function 'kotlin.let' call
    // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerKeyframes.<anonymous>' call
    var it = this.f42_1.i2(name);
    // Inline function 'kotlin.check' call
    if (!(it == null || it === keyframes)) {
      // Inline function 'com.varabyte.kobweb.silk.theme.MutableSilkTheme.registerKeyframes.<anonymous>' call
      var message = trimIndent('\n                Attempting to register a second keyframes with a name that\'s already used: "' + name + '"\n            ');
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.set' call
    this.f42_1.l2(name, keyframes);
    // Inline function 'kotlin.collections.set' call
    this.h42_1.l2(keyframes, name);
  };
  function registerStylesInto$orderStyles$visit(visited, $dependencies, orderedStyles, style) {
    if (visited.o(style))
      return Unit_instance;
    visited.e(style);
    var tmp0_safe_receiver = $dependencies.i2(style);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = tmp0_safe_receiver.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerStylesInto.orderStyles.visit.<anonymous>' call
        registerStylesInto$orderStyles$visit(visited, $dependencies, orderedStyles, element);
      }
    }
    orderedStyles.e(style);
  }
  function registerStylesInto$orderStyles(styles, dependencies) {
    if (dependencies.q())
      return styles;
    // Inline function 'kotlin.collections.mutableListOf' call
    var orderedStyles = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.mutableSetOf' call
    var visited = LinkedHashSet_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = styles.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerStylesInto.orderStyles.<anonymous>' call
      registerStylesInto$orderStyles$visit(visited, dependencies, orderedStyles, element);
    }
    return orderedStyles;
  }
  function ImmutableSilkTheme(mutableSilkTheme) {
    this.m42_1 = mutableSilkTheme;
    var tmp = this;
    var tmp_0 = this.m42_1.j42_1;
    tmp.n42_1 = isInterface(tmp_0, Palettes) ? tmp_0 : THROW_CCE();
    this.o42_1 = this.m42_1.k42_1;
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_1.p42_1 = LinkedHashMap_init_$Create$();
    this.q42_1 = this.p42_1;
  }
  protoOf(ImmutableSilkTheme).a47 = function (style) {
    return this.m42_1.y41_1.i2(style);
  };
  protoOf(ImmutableSilkTheme).r42 = function (silkStyleSheet) {
    // Inline function 'kotlin.check' call
    if (!!(_SilkTheme == null)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.m42_1.g42_1.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerKeyframesInto.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var name = element.v();
      // Inline function 'kotlin.collections.component2' call
      var keyframes = element.w();
      silkStyleSheet.i43(name, keyframes.a46_1);
    }
  };
  protoOf(ImmutableSilkTheme).w42 = function (stylesheet) {
    // Inline function 'kotlin.check' call
    if (!!(_SilkTheme == null)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    var tmp = this.m42_1.u41_1.k2();
    // Inline function 'kotlin.collections.filterIsInstance' call
    var tmp0 = this.m42_1.w41_1.k2();
    // Inline function 'kotlin.collections.filterIsInstanceTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element instanceof SimpleCssStyleVariant) {
        destination.e(element);
      }
    }
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
    var _iterator__ex2g4s_0 = destination.g();
    while (_iterator__ex2g4s_0.h()) {
      var item = _iterator__ex2g4s_0.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerStylesInto.<anonymous>' call
      var tmp$ret$2 = item.s45_1;
      destination_0.e(tmp$ret$2);
    }
    var allCssStyles = plus_0(tmp, destination_0);
    var allCssStylesSorted = registerStylesInto$orderStyles(allCssStyles, this.m42_1.e42_1);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_1 = allCssStylesSorted.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_0 = _iterator__ex2g4s_1.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerStylesInto.<anonymous>' call
      var className = this.a47(element_0);
      // Inline function 'kotlin.collections.get' call
      var this_0 = this.m42_1.a42_1;
      var layer = (isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i2(className);
      var classSelectors = element_0.o44('.' + className, stylesheet, layer);
      var tmp2 = this.p42_1;
      // Inline function 'kotlin.collections.set' call
      var value = element_0.p44(classSelectors);
      tmp2.l2(element_0, value);
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.m42_1.c42_1.u().g();
    while (_iterator__ex2g4s_2.h()) {
      var element_1 = _iterator__ex2g4s_2.i();
      // Inline function 'com.varabyte.kobweb.silk.theme.ImmutableSilkTheme.registerStylesInto.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var originalStyle = element_1.v();
      // Inline function 'kotlin.collections.component2' call
      var overrideStyle = element_1.w();
      var tmp2_0 = this.p42_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = getValue(this.p42_1, overrideStyle);
      tmp2_0.l2(originalStyle, value_0);
    }
  };
  function get_SilkTheme() {
    var tmp0_elvis_lhs = _SilkTheme;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = "You can't access SilkTheme before first calling `prepareSilkFoundation` (or `SilkApp`, which calls it)";
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_name(_this__u8e3s4) {
    var tmp0_elvis_lhs = get_SilkTheme().a47(_this__u8e3s4);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Name requested for invalid CssStyle. This should only be called on top-level public styles or styles that got manually registered';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function modifyStyleBase(_this__u8e3s4, style, extraModifier, init) {
    extraModifier = extraModifier === VOID ? Companion_instance : extraModifier;
    modifyStyleBase_0(_this__u8e3s4, style, modifyStyleBase$lambda(extraModifier), init);
  }
  function modifyStyleBase_0(_this__u8e3s4, style, extraModifier, init) {
    modifyStyle(_this__u8e3s4, style, extraModifier, modifyStyleBase$lambda_0(init));
  }
  function modifyStyle(_this__u8e3s4, style, extraModifier, init) {
    var tmp0_elvis_lhs = _this__u8e3s4.y41_1.i2(style);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Attempting to modify a style that was never registered.';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var styleName = tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = _this__u8e3s4.u41_1;
    // Inline function 'kotlin.check' call
    if (!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).g2(styleName)) {
      // Inline function 'com.varabyte.kobweb.silk.theme.modifyStyle.<anonymous>' call
      var message_0 = 'Attempting to modify a style that was never registered: "' + styleName + '"';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    var existingExtraModifier = style.k43_1;
    var existingInit = style.j43_1;
    var tmp_0 = modifyStyle$lambda(existingExtraModifier, extraModifier);
    _this__u8e3s4.t46(style, tmp_0, modifyStyle$lambda_0(existingInit, init));
  }
  function modifyStyleBase$lambda($extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(-308722568);
      var tmp0 = $extraModifier;
      $composer_0.i1i();
      return tmp0;
    };
  }
  function modifyStyleBase$lambda$lambda($this_modifyStyle, $init) {
    return function () {
      // Inline function 'kotlin.let' call
      var this_0 = new CssStyleBaseScope($this_modifyStyle.m44_1);
      return $init(this_0);
    };
  }
  function modifyStyleBase$lambda_0($init) {
    return function ($this$modifyStyle) {
      $this$modifyStyle.n44(modifyStyleBase$lambda$lambda($this$modifyStyle, $init));
      return Unit_instance;
    };
  }
  function modifyStyle$lambda($existingExtraModifier, $extraModifier) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.g1i(114003212);
      var tmp0 = $existingExtraModifier($composer_0, 0).z3y($extraModifier($composer_0, 0));
      $composer_0.i1i();
      return tmp0;
    };
  }
  function modifyStyle$lambda_0($existingInit, $init) {
    return function ($this$replaceStyle) {
      $existingInit($this$replaceStyle);
      $init($this$replaceStyle);
      return Unit_instance;
    };
  }
  function toWidth(_this__u8e3s4) {
    var tmp0_safe_receiver = toValue(_this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k46_1;
    return tmp1_elvis_lhs == null ? get_px(0) : tmp1_elvis_lhs;
  }
  function toValue(_this__u8e3s4) {
    var tmp;
    switch (_this__u8e3s4.p2_1) {
      case 0:
        tmp = null;
        break;
      case 1:
        tmp = get_SilkTheme().o42_1.g46_1;
        break;
      case 2:
        tmp = get_SilkTheme().o42_1.h46_1;
        break;
      case 3:
        tmp = get_SilkTheme().o42_1.i46_1;
        break;
      case 4:
        tmp = get_SilkTheme().o42_1.j46_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function get_rootColorModeState() {
    _init_properties_ColorMode_kt__lz79sc();
    var tmp0 = rootColorModeState$delegate;
    // Inline function 'kotlin.getValue' call
    rootColorModeState$factory();
    return tmp0.w();
  }
  var rootColorModeState$delegate;
  function get_LocalColorMode() {
    _init_properties_ColorMode_kt__lz79sc();
    return LocalColorMode;
  }
  var LocalColorMode;
  var ColorMode_LIGHT_instance;
  var ColorMode_DARK_instance;
  function Companion_5() {
  }
  protoOf(Companion_5).m45 = function ($composer, $changed) {
    var $composer_0 = $composer;
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalColorMode();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.g1k(this_0);
    sourceInformationMarkerEnd($composer_1);
    return tmp0.w();
  };
  var Companion_instance_7;
  function Companion_getInstance_6() {
    return Companion_instance_7;
  }
  var ColorMode_entriesInitialized;
  function ColorMode_initEntries() {
    if (ColorMode_entriesInitialized)
      return Unit_instance;
    ColorMode_entriesInitialized = true;
    ColorMode_LIGHT_instance = new ColorMode('LIGHT', 0);
    ColorMode_DARK_instance = new ColorMode('DARK', 1);
  }
  function ColorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  protoOf(ColorMode).b47 = function () {
    return this.equals(ColorMode_LIGHT_getInstance());
  };
  protoOf(ColorMode).p45 = function () {
    var tmp;
    switch (this.p2_1) {
      case 0:
        tmp = ColorMode_DARK_getInstance();
        break;
      case 1:
        tmp = ColorMode_LIGHT_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(ColorMode).c47 = function () {
    return get_LocalColorMode().t1p(mutableStateOf(this));
  };
  function suffixedWith(_this__u8e3s4, colorMode) {
    _init_properties_ColorMode_kt__lz79sc();
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4 + '_' + colorMode.o2_1.toLowerCase();
  }
  function rootColorModeState$delegate$lambda() {
    _init_properties_ColorMode_kt__lz79sc();
    return mutableStateOf(Companion_instance_1.c43().b43());
  }
  function LocalColorMode$lambda() {
    _init_properties_ColorMode_kt__lz79sc();
    return get_rootColorModeState();
  }
  function ColorMode_LIGHT_getInstance() {
    ColorMode_initEntries();
    return ColorMode_LIGHT_instance;
  }
  function ColorMode_DARK_getInstance() {
    ColorMode_initEntries();
    return ColorMode_DARK_instance;
  }
  function rootColorModeState$factory() {
    return getPropertyCallableRef('rootColorModeState', 0, KProperty0, function () {
      return get_rootColorModeState();
    }, null);
  }
  var properties_initialized_ColorMode_kt_kbhp7u;
  function _init_properties_ColorMode_kt__lz79sc() {
    if (!properties_initialized_ColorMode_kt_kbhp7u) {
      properties_initialized_ColorMode_kt_kbhp7u = true;
      rootColorModeState$delegate = lazy(rootColorModeState$delegate$lambda);
      LocalColorMode = compositionLocalOf(VOID, LocalColorMode$lambda);
    }
  }
  function Red() {
    Red_instance = this;
    this.d47_1 = Companion_instance_0.v3z(16772078);
    this.e47_1 = Companion_instance_0.v3z(16764370);
    this.f47_1 = Companion_instance_0.v3z(15702682);
    this.g47_1 = Companion_instance_0.v3z(15037299);
    this.h47_1 = Companion_instance_0.v3z(15684432);
    this.i47_1 = Companion_instance_0.v3z(16007990);
    this.j47_1 = Companion_instance_0.v3z(15022389);
    this.k47_1 = Companion_instance_0.v3z(13840175);
    this.l47_1 = Companion_instance_0.v3z(12986408);
    this.m47_1 = Companion_instance_0.v3z(12000284);
  }
  var Red_instance;
  function Red_getInstance() {
    if (Red_instance == null)
      new Red();
    return Red_instance;
  }
  function Blue() {
    Blue_instance = this;
    this.n47_1 = Companion_instance_0.v3z(14938877);
    this.o47_1 = Companion_instance_0.v3z(12312315);
    this.p47_1 = Companion_instance_0.v3z(9489145);
    this.q47_1 = Companion_instance_0.v3z(6600182);
    this.r47_1 = Companion_instance_0.v3z(4367861);
    this.s47_1 = Companion_instance_0.v3z(2201331);
    this.t47_1 = Companion_instance_0.v3z(2001125);
    this.u47_1 = Companion_instance_0.v3z(1668818);
    this.v47_1 = Companion_instance_0.v3z(1402304);
    this.w47_1 = Companion_instance_0.v3z(870305);
  }
  var Blue_instance;
  function Blue_getInstance() {
    if (Blue_instance == null)
      new Blue();
    return Blue_instance;
  }
  function Gray() {
    Gray_instance = this;
    this.x47_1 = Companion_instance_0.v3z(16448250);
    this.y47_1 = Companion_instance_0.v3z(16119285);
    this.z47_1 = Companion_instance_0.v3z(15658734);
    this.a48_1 = Companion_instance_0.v3z(14737632);
    this.b48_1 = Companion_instance_0.v3z(12434877);
    this.c48_1 = Companion_instance_0.v3z(10395294);
    this.d48_1 = Companion_instance_0.v3z(7697781);
    this.e48_1 = Companion_instance_0.v3z(6381921);
    this.f48_1 = Companion_instance_0.v3z(4342338);
    this.g48_1 = Companion_instance_0.v3z(2171169);
  }
  var Gray_instance;
  function Gray_getInstance() {
    if (Gray_instance == null)
      new Gray();
    return Gray_instance;
  }
  var com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup_EntryDelegate$stable;
  var com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup$stable;
  var com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette$stable;
  var com_varabyte_kobweb_silk_theme_colors_palette_MutablePalettes$stable;
  function MutablePalettes() {
    this.h48_1 = new MutablePalette();
    this.i48_1 = new MutablePalette();
  }
  protoOf(MutablePalettes).j48 = function () {
    return this.h48_1;
  };
  protoOf(MutablePalettes).k48 = function () {
    return this.i48_1;
  };
  function Palettes() {
  }
  function Palette() {
  }
  function EntryDelegate(palette, prefix) {
    prefix = prefix === VOID ? null : prefix;
    this.n48_1 = palette;
    this.o48_1 = prefix;
  }
  protoOf(EntryDelegate).s2x = function (thisRef, property) {
    // Inline function 'kotlin.text.orEmpty' call
    var tmp0_elvis_lhs = this.o48_1;
    var tmp$ret$0 = tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
    return getValue(this.n48_1.p48_1, tmp$ret$0 + property.callableName);
  };
  protoOf(EntryDelegate).q48 = function (thisRef, property, value) {
    var tmp1 = this.n48_1.p48_1;
    // Inline function 'kotlin.text.orEmpty' call
    var tmp0_elvis_lhs = this.o48_1;
    // Inline function 'kotlin.collections.set' call
    var key = (tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs) + property.callableName;
    tmp1.l2(key, value);
  };
  function ColorGroup(palette, groupName) {
    this.r48_1 = palette;
    this.s48_1 = groupName;
  }
  protoOf(ColorGroup).t48 = function () {
    return new EntryDelegate(this.r48_1, this.s48_1 + '.');
  };
  function MutablePalette() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.p48_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(MutablePalette).b3n = function (key) {
    return this.p48_1.i2(key);
  };
  protoOf(MutablePalette).u48 = function (key, value) {
    // Inline function 'kotlin.collections.set' call
    this.p48_1.l2(key, value);
  };
  function toPalette(_this__u8e3s4) {
    return get_SilkTheme().n42_1.l48(_this__u8e3s4);
  }
  function com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup_EntryDelegate$stableprop_getter() {
    return com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup_EntryDelegate$stable;
  }
  var com_varabyte_kobweb_silk_theme_shapes_Path$stable;
  var com_varabyte_kobweb_silk_theme_shapes_CirclePath$stable;
  var com_varabyte_kobweb_silk_theme_shapes_PolygonPath$stable;
  var com_varabyte_kobweb_silk_theme_shapes_InsetPath$stable;
  var com_varabyte_kobweb_silk_theme_shapes_RectF$stable;
  var com_varabyte_kobweb_silk_theme_shapes_Rect$stable;
  var com_varabyte_kobweb_silk_theme_shapes_CircleF$stable;
  var com_varabyte_kobweb_silk_theme_shapes_Circle$stable;
  var com_varabyte_kobweb_silk_theme_shapes_PolygonF$stable;
  var com_varabyte_kobweb_silk_theme_shapes_Polygon$stable;
  function clip(_this__u8e3s4, shape) {
    var tmp0_safe_receiver = shape.v48();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.theme.shapes.clip.<anonymous>' call
      tmp = styleModifier(_this__u8e3s4, clip$lambda(tmp0_safe_receiver));
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  }
  function RectF_init_$Init$($this) {
    RectF_init_$Init$_0(get_px(0), $this);
    return $this;
  }
  function RectF_init_$Create$() {
    return RectF_init_$Init$(objectCreate(protoOf(RectF)));
  }
  function RectF_init_$Init$_0(cornerRadius, $this) {
    RectF.call($this, to(0.0, 0.0), to(100.0, 100.0), cornerRadius);
    return $this;
  }
  function RectF_init_$Init$_1(side, cornerRadius, $this) {
    cornerRadius = cornerRadius === VOID ? get_px(0) : cornerRadius;
    RectF.call($this, to(side, side), from100(to(side, side)), cornerRadius);
    return $this;
  }
  function RectF_init_$Create$_0(side, cornerRadius) {
    return RectF_init_$Init$_1(side, cornerRadius, objectCreate(protoOf(RectF)));
  }
  function RectF(topLeft, botRight, cornerRadius) {
    cornerRadius = cornerRadius === VOID ? get_px(0) : cornerRadius;
    this.w48_1 = topLeft;
    this.x48_1 = botRight;
    this.y48_1 = cornerRadius;
  }
  protoOf(RectF).v48 = function () {
    var tmp;
    if (!(this.w48_1.za_1 === 0.0) || !(this.w48_1.ab_1 === 0.0) || !(this.x48_1.za_1 === 100.0) || !(this.x48_1.ab_1 === 100.0) || !equals(this.y48_1, get_px(0))) {
      tmp = new InsetPath(this.w48_1, this.x48_1, this.y48_1);
    } else {
      tmp = null;
    }
    return tmp;
  };
  function Path() {
  }
  protoOf(Path).a49 = function (_this__u8e3s4) {
    return toString(_this__u8e3s4) + '%';
  };
  protoOf(Path).b49 = function (_this__u8e3s4) {
    return toString(_this__u8e3s4.za_1) + '% ' + toString(_this__u8e3s4.ab_1) + '%';
  };
  function from100(_this__u8e3s4) {
    return to(100.0 - _this__u8e3s4.za_1, 100.0 - _this__u8e3s4.ab_1);
  }
  function InsetPath(topLeft, botRight, roundness) {
    roundness = roundness === VOID ? get_px(0) : roundness;
    Path.call(this);
    this.c49_1 = topLeft;
    this.d49_1 = roundness;
    this.e49_1 = from100(botRight);
  }
  protoOf(InsetPath).z48 = function () {
    // Inline function 'kotlin.takeIf' call
    var this_0 = this.d49_1;
    var tmp;
    // Inline function 'com.varabyte.kobweb.silk.theme.shapes.InsetPath.toPathStr.<anonymous>' call
    if (!equals(this_0, get_px(0))) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.silk.theme.shapes.InsetPath.toPathStr.<anonymous>' call
      tmp_0 = 'round ' + toString(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    var roundnessPart = tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs;
    var left = this.c49_1.za_1;
    var top = this.c49_1.ab_1;
    var right = this.e49_1.za_1;
    var bottom = this.e49_1.ab_1;
    var insetPart = left === top && right === bottom && left === right ? this.a49(left) : left === right && top === bottom ? this.b49(to(top, left)) : this.a49(top) + ' ' + this.a49(right) + ' ' + this.a49(bottom) + ' ' + this.a49(left);
    return 'inset(' + insetPart + roundnessPart + ')';
  };
  function clip$lambda($path) {
    return function ($this$styleModifier) {
      $this$styleModifier.t2n('clip-path', $path.z48());
      return Unit_instance;
    };
  }
  //region block: post-declaration
  protoOf(MutablePalettes).l48 = get;
  protoOf(MutablePalette).m48 = getValue_0;
  //endregion
  //region block: init
  com_varabyte_kobweb_silk_SilkStyleSheet$stable = 0;
  Companion_instance_1 = new Companion();
  com_varabyte_kobweb_silk_init_CssStyleRegistrarImpl_Entry$stable = 0;
  com_varabyte_kobweb_silk_init_SilkStylesheetInstance$stable = 8;
  com_varabyte_kobweb_silk_style_CssRule_OfMedia$stable = 8;
  com_varabyte_kobweb_silk_style_CssRule_NonMediaCssRule$stable = 0;
  com_varabyte_kobweb_silk_style_CssRule_OfAttributeSelector$stable = 0;
  com_varabyte_kobweb_silk_style_CssRule_OfPseudoClass$stable = 0;
  com_varabyte_kobweb_silk_style_CssRule_OfPseudoElement$stable = 0;
  com_varabyte_kobweb_silk_style_CssRule_CompositeOpen$stable = 8;
  com_varabyte_kobweb_silk_style_CssRule_CompositeClosed$stable = 8;
  com_varabyte_kobweb_silk_style_CssRule$stable = 8;
  Companion_instance_2 = new Companion_0();
  Companion_instance_3 = new Companion_1();
  Companion_instance_4 = new Companion_2();
  com_varabyte_kobweb_silk_style_CssStyleVariant$stable = 0;
  com_varabyte_kobweb_silk_style_SimpleCssStyleVariant$stable = 0;
  com_varabyte_kobweb_silk_style_ExtendingCssStyleVariant$stable = 0;
  com_varabyte_kobweb_silk_style_animation_KeyframesBuilder$stable = 8;
  com_varabyte_kobweb_silk_style_animation_Keyframes$stable = 8;
  Companion_instance_6 = new Companion_4();
  com_varabyte_kobweb_silk_style_breakpoint_Breakpoint_Range$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Px$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Em$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue_Rem$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_BreakpointUnitValue$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_BreakpointValues$stable = 0;
  com_varabyte_kobweb_silk_style_breakpoint_ResponsiveValues$stable = 0;
  com_varabyte_kobweb_silk_style_layer_LayerListBuilder$stable = 8;
  _SilkTheme = null;
  com_varabyte_kobweb_silk_theme_MutableSilkTheme$stable = 8;
  com_varabyte_kobweb_silk_theme_ImmutableSilkTheme$stable = 8;
  Companion_instance_7 = new Companion_5();
  com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup_EntryDelegate$stable = 8;
  com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup$stable = 8;
  com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette$stable = 8;
  com_varabyte_kobweb_silk_theme_colors_palette_MutablePalettes$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_Path$stable = 0;
  com_varabyte_kobweb_silk_theme_shapes_CirclePath$stable = 0;
  com_varabyte_kobweb_silk_theme_shapes_PolygonPath$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_InsetPath$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_RectF$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_Rect$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_CircleF$stable = 0;
  com_varabyte_kobweb_silk_theme_shapes_Circle$stable = 0;
  com_varabyte_kobweb_silk_theme_shapes_PolygonF$stable = 8;
  com_varabyte_kobweb_silk_theme_shapes_Polygon$stable = 8;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = DeferringHost;
  _.$_$.b = set_additionalSilkInitialization;
  _.$_$.c = Keyframes;
  _.$_$.d = get_entries;
  _.$_$.e = get_active;
  _.$_$.f = get_ariaDisabled;
  _.$_$.g = get_ariaInvalid;
  _.$_$.h = descendants;
  _.$_$.i = get_disabled;
  _.$_$.j = get_focusVisible;
  _.$_$.k = get_hover;
  _.$_$.l = get_link;
  _.$_$.m = not;
  _.$_$.n = get_placeholder;
  _.$_$.o = get_visited;
  _.$_$.p = Base;
  _.$_$.q = CssStyle_0;
  _.$_$.r = CssStyle_1;
  _.$_$.s = addVariantBase;
  _.$_$.t = addVariant_0;
  _.$_$.u = base_1;
  _.$_$.v = base_0;
  _.$_$.w = base;
  _.$_$.x = com_varabyte_kobweb_silk_style_CssStyle$stableprop_getter;
  _.$_$.y = com_varabyte_kobweb_silk_style_CssStyleVariant$stableprop_getter;
  _.$_$.z = toModifier_0;
  _.$_$.a1 = toModifier;
  _.$_$.b1 = ColorGroup;
  _.$_$.c1 = MutablePalette;
  _.$_$.d1 = com_varabyte_kobweb_silk_theme_colors_palette_MutablePalette_ColorGroup_EntryDelegate$stableprop_getter;
  _.$_$.e1 = toPalette;
  _.$_$.f1 = suffixedWith;
  _.$_$.g1 = clip;
  _.$_$.h1 = modifyStyleBase;
  _.$_$.i1 = get_name;
  _.$_$.j1 = SilkFoundationStyles;
  _.$_$.k1 = Base_init_$Init$;
  _.$_$.l1 = RectF_init_$Create$_0;
  _.$_$.m1 = Companion_instance_3;
  _.$_$.n1 = Companion_instance_7;
  _.$_$.o1 = Blue_getInstance;
  _.$_$.p1 = Gray_getInstance;
  _.$_$.q1 = Red_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=kobweb-frontend-silk-foundation.js.map
