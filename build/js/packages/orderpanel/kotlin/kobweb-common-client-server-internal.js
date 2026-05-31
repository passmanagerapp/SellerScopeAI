(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kobweb-common-client-server-internal'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kobweb-common-client-server-internal'.");
    }
    globalThis['kobweb-common-client-server-internal'] = factory(typeof globalThis['kobweb-common-client-server-internal'] === 'undefined' ? {} : globalThis['kobweb-common-client-server-internal'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Enum = kotlin_kotlin.$_$.cf;
  var protoOf = kotlin_kotlin.$_$.ob;
  var initMetadataForClass = kotlin_kotlin.$_$.ia;
  var VOID = kotlin_kotlin.$_$.g;
  var listOf = kotlin_kotlin.$_$.h7;
  var removeSurrounding = kotlin_kotlin.$_$.nd;
  var removePrefix = kotlin_kotlin.$_$.ld;
  var removeSuffix = kotlin_kotlin.$_$.md;
  var endsWith = kotlin_kotlin.$_$.zc;
  var startsWith = kotlin_kotlin.$_$.ud;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ja;
  var getStringHashCode = kotlin_kotlin.$_$.ga;
  var THROW_CCE = kotlin_kotlin.$_$.mf;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var toString = kotlin_kotlin.$_$.sb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.s1;
  var first = kotlin_kotlin.$_$.s6;
  var drop = kotlin_kotlin.$_$.j6;
  var to = kotlin_kotlin.$_$.rg;
  var joinToString = kotlin_kotlin.$_$.z6;
  var emptyList = kotlin_kotlin.$_$.l6;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kg;
  var plus = kotlin_kotlin.$_$.t7;
  var charSequenceLength = kotlin_kotlin.$_$.w9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.g2;
  var charArrayOf = kotlin_kotlin.$_$.t9;
  var split = kotlin_kotlin.$_$.sd;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.o1;
  var startsWith_0 = kotlin_kotlin.$_$.vd;
  var toMutableList = kotlin_kotlin.$_$.o8;
  var removeFirst = kotlin_kotlin.$_$.w7;
  var endsWith_0 = kotlin_kotlin.$_$.yc;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(AcceptResult, 'AcceptResult', VOID, Enum);
  initMetadataForCompanion(Companion);
  initMetadataForClass(Info, 'Info');
  initMetadataForClass(Match, 'Match', VOID, Enum);
  initMetadataForClass(Node, 'Node');
  initMetadataForClass(RootNode, 'RootNode', RootNode, Node);
  initMetadataForClass(ChildNode, 'ChildNode', VOID, Node);
  initMetadataForClass(StaticNode, 'StaticNode', VOID, ChildNode);
  initMetadataForClass(DynamicNode, 'DynamicNode', VOID, ChildNode);
  initMetadataForClass(ResolvedEntry, 'ResolvedEntry');
  initMetadataForClass(RouteTree, 'RouteTree', RouteTree);
  //endregion
  var AcceptResult_NONE_instance;
  var AcceptResult_SINGLE_instance;
  var AcceptResult_ALL_instance;
  var AcceptResult_entriesInitialized;
  function AcceptResult_initEntries() {
    if (AcceptResult_entriesInitialized)
      return Unit_instance;
    AcceptResult_entriesInitialized = true;
    AcceptResult_NONE_instance = new AcceptResult('NONE', 0);
    AcceptResult_SINGLE_instance = new AcceptResult('SINGLE', 1);
    AcceptResult_ALL_instance = new AcceptResult('ALL', 2);
  }
  function AcceptResult(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function resolve$createResolvedEntry(this$0, consumedPart) {
    return listOf(new ResolvedEntry(this$0, consumedPart));
  }
  function AcceptResult_NONE_getInstance() {
    AcceptResult_initEntries();
    return AcceptResult_NONE_instance;
  }
  function AcceptResult_SINGLE_getInstance() {
    AcceptResult_initEntries();
    return AcceptResult_SINGLE_instance;
  }
  function AcceptResult_ALL_getInstance() {
    AcceptResult_initEntries();
    return AcceptResult_ALL_instance;
  }
  function Companion() {
  }
  protoOf(Companion).v3i = function (routeSegment) {
    if (!isDynamicSegment(routeSegment))
      return null;
    var name = routeSegment;
    name = removeSurrounding(name, '{', '}');
    var tmp;
    if (startsWith(name, '...')) {
      name = removePrefix(name, '...');
      var tmp_0;
      if (endsWith(name, '?')) {
        name = removeSuffix(name, '?');
        tmp_0 = Match_REST_OPTIONAL_getInstance();
      } else {
        tmp_0 = Match_REST_getInstance();
      }
      tmp = tmp_0;
    } else {
      tmp = Match_SINGLE_getInstance();
    }
    var match = tmp;
    return new Info(name, match);
  };
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  var Match_SINGLE_instance;
  var Match_REST_instance;
  var Match_REST_OPTIONAL_instance;
  var Match_entriesInitialized;
  function Match_initEntries() {
    if (Match_entriesInitialized)
      return Unit_instance;
    Match_entriesInitialized = true;
    Match_SINGLE_instance = new Match('SINGLE', 0);
    Match_REST_instance = new Match('REST', 1);
    Match_REST_OPTIONAL_instance = new Match('REST_OPTIONAL', 2);
  }
  function Info(name, match) {
    this.w3i_1 = name;
    this.x3i_1 = match;
  }
  protoOf(Info).toString = function () {
    return 'Info(name=' + this.w3i_1 + ', match=' + this.x3i_1.toString() + ')';
  };
  protoOf(Info).hashCode = function () {
    var result = getStringHashCode(this.w3i_1);
    result = imul(result, 31) + this.x3i_1.hashCode() | 0;
    return result;
  };
  protoOf(Info).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Info))
      return false;
    var tmp0_other_with_cast = other instanceof Info ? other : THROW_CCE();
    if (!(this.w3i_1 === tmp0_other_with_cast.w3i_1))
      return false;
    if (!this.x3i_1.equals(tmp0_other_with_cast.x3i_1))
      return false;
    return true;
  };
  function Match(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Match_SINGLE_getInstance() {
    Match_initEntries();
    return Match_SINGLE_instance;
  }
  function Match_REST_getInstance() {
    Match_initEntries();
    return Match_REST_instance;
  }
  function Match_REST_OPTIONAL_getInstance() {
    Match_initEntries();
    return Match_REST_OPTIONAL_instance;
  }
  function Node(parent, sourceRouteSegment) {
    parent = parent === VOID ? null : parent;
    this.y3i_1 = parent;
    this.z3i_1 = sourceRouteSegment;
    this.a3j_1 = null;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.b3j_1 = ArrayList_init_$Create$();
    this.c3j_1 = null;
    this.d3j_1 = this.z3i_1;
    this.e3j_1 = false;
  }
  protoOf(Node).f3j = function () {
    return this.a3j_1;
  };
  protoOf(Node).hu = function () {
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$();
    // Inline function 'com.varabyte.kobweb.navigation.Node.<get-children>.<anonymous>' call
    this_0.n(this.b3j_1);
    var tmp0_safe_receiver = this.c3j_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.navigation.Node.<get-children>.<anonymous>.<anonymous>' call
      this_0.e(tmp0_safe_receiver);
    }
    return this_0.s5();
  };
  protoOf(Node).z20 = function () {
    return this.d3j_1;
  };
  protoOf(Node).g3j = function () {
    return this.e3j_1;
  };
  protoOf(Node).j3j = function (routeSegment) {
    var tmp0 = this.hu();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.navigation.Node.findChild.<anonymous>' call
        if (element.i3j(routeSegment)) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    return tmp$ret$1;
  };
  protoOf(Node).k3j = function (routeSegment) {
    // Inline function 'kotlin.check' call
    if (!(this.j3j(routeSegment) == null)) {
      // Inline function 'com.varabyte.kobweb.navigation.Node.createChild.<anonymous>' call
      var message = 'Node.createChild called unexpectedly. Please report this issue.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.check' call
    if (!!this.g3j()) {
      var message_0 = 'User attempted to register an invalid route. "' + this.z3i_1 + '" must be the last segment of the route, but it was followed by "' + routeSegment + '".';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    var tmp;
    if (isDynamicSegment(routeSegment)) {
      // Inline function 'kotlin.also' call
      var this_0 = new DynamicNode(this, routeSegment);
      // Inline function 'com.varabyte.kobweb.navigation.Node.createChild.<anonymous>' call
      this.c3j_1 = this_0;
      tmp = this_0;
    } else {
      // Inline function 'kotlin.also' call
      var this_1 = new StaticNode(this, routeSegment);
      // Inline function 'com.varabyte.kobweb.navigation.Node.createChild.<anonymous>' call
      this.b3j_1.e(this_1);
      tmp = this_1;
    }
    return tmp;
  };
  protoOf(Node).l3j = function (routeSegments) {
    var consumeResult = this.h3j(routeSegments);
    var tmp;
    switch (consumeResult.p2_1) {
      case 0:
        return null;
      case 1:
        tmp = to(first(routeSegments), drop(routeSegments, 1));
        break;
      case 2:
        tmp = to(joinToString(routeSegments, '/'), emptyList());
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    var _destruct__k2r9zo = tmp;
    var consumedPart = _destruct__k2r9zo.bb();
    var remainingSegments = _destruct__k2r9zo.cb();
    if (remainingSegments.q() && this.f3j() == null)
      return null;
    if (remainingSegments.q())
      return resolve$createResolvedEntry(this, consumedPart);
    var tmp0 = this.hu();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstNotNullOfOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        // Inline function 'com.varabyte.kobweb.navigation.Node.resolve.<anonymous>' call
        var result = element.l3j(remainingSegments);
        if (!(result == null)) {
          tmp$ret$1 = result;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp1_safe_receiver = tmp$ret$1;
    var tmp_0;
    if (tmp1_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'com.varabyte.kobweb.navigation.Node.resolve.<anonymous>' call
      tmp_0 = plus(resolve$createResolvedEntry(this, consumedPart), tmp1_safe_receiver);
    }
    return tmp_0;
  };
  function RootNode() {
    Node.call(this, null, '');
  }
  protoOf(RootNode).i3j = function (routeSegment) {
    // Inline function 'kotlin.text.isEmpty' call
    return charSequenceLength(routeSegment) === 0;
  };
  protoOf(RootNode).h3j = function (routeSegments) {
    // Inline function 'kotlin.check' call
    if (!(first(routeSegments) === '')) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    return AcceptResult_SINGLE_getInstance();
  };
  function ChildNode(parent, sourceRouteSegment) {
    Node.call(this, parent, sourceRouteSegment);
  }
  function StaticNode(parent, sourceRouteSegment) {
    ChildNode.call(this, parent, sourceRouteSegment);
  }
  protoOf(StaticNode).i3j = function (routeSegment) {
    return routeSegment === this.z3i_1;
  };
  protoOf(StaticNode).h3j = function (routeSegments) {
    if (this.i3j(first(routeSegments)))
      return AcceptResult_SINGLE_getInstance();
    return AcceptResult_NONE_getInstance();
  };
  function DynamicNode(parent, sourceRouteSegment) {
    ChildNode.call(this, parent, sourceRouteSegment);
    var tmp = this;
    var tmp0_elvis_lhs = Companion_instance.v3i(sourceRouteSegment);
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var message = 'Expected a dynamic route segment here, but got "' + sourceRouteSegment + '"';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    tmp.h3k_1 = tmp_0;
    this.i3k_1 = this.h3k_1.w3i_1;
    this.j3k_1 = !this.h3k_1.x3i_1.equals(Match_SINGLE_getInstance());
  }
  protoOf(DynamicNode).z20 = function () {
    return this.i3k_1;
  };
  protoOf(DynamicNode).g3j = function () {
    return this.j3k_1;
  };
  protoOf(DynamicNode).i3j = function (routeSegment) {
    var tmp0_safe_receiver = Companion_instance.v3i(routeSegment);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      if (!this.h3k_1.equals(tmp0_safe_receiver)) {
        // Inline function 'kotlin.error' call
        var message = 'User is attempting to register a dynamic route that conflicts with another dynamic route already set up. "' + routeSegment + '" is being registered but "' + this.z3i_1 + '" already exists.';
        throw IllegalStateException_init_$Create$(toString(message));
      }
      return true;
    }
    return false;
  };
  protoOf(DynamicNode).h3j = function (routeSegments) {
    var tmp;
    switch (this.h3k_1.x3i_1.p2_1) {
      case 0:
        tmp = AcceptResult_SINGLE_getInstance();
        break;
      case 1:
        tmp = !(first(routeSegments) === '') ? AcceptResult_ALL_getInstance() : AcceptResult_NONE_getInstance();
        break;
      case 2:
        tmp = AcceptResult_ALL_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  function ResolvedEntry(node, capturedRouteSegment) {
    this.k3k_1 = node;
    this.l3k_1 = capturedRouteSegment;
  }
  function resolveWithoutRedirects($this, route) {
    return $this.m3k_1.l3j(split(route, charArrayOf([_Char___init__impl__6a9atx(47)])));
  }
  function resolveAllowingRedirects($this, route) {
    // Inline function 'kotlin.collections.fold' call
    var accumulator = route;
    var _iterator__ex2g4s = $this.n3k_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'com.varabyte.kobweb.navigation.RouteTree.resolveAllowingRedirects.<anonymous>' call
      var route_0 = accumulator;
      var tmp0_elvis_lhs = element.q3k(route_0);
      accumulator = tmp0_elvis_lhs == null ? route_0 : tmp0_elvis_lhs;
    }
    var redirectedRoute = accumulator;
    return resolveWithoutRedirects($this, redirectedRoute);
  }
  function checkRoute($this, route) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.require' call
    if (!!$this.m3k_1.hu().q()) {
      // Inline function 'com.varabyte.kobweb.navigation.RouteTree.checkRoute.<anonymous>' call
      var message = "No routes were ever registered. This is unexpected and probably means no `@Page` was defined (or pages were defined in the wrong place where Kobweb couldn't discover them).";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!startsWith_0(route, _Char___init__impl__6a9atx(47))) {
      // Inline function 'com.varabyte.kobweb.navigation.RouteTree.checkRoute.<anonymous>' call
      var message_0 = 'When checking a route, it must begin with a slash. Got: "' + route + '"';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var tmp0_elvis_lhs = resolveAllowingRedirects($this, route);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var resolvedNodes = tmp;
    return toRouteString(resolvedNodes);
  }
  function RouteTree() {
    this.m3k_1 = new RootNode();
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.n3k_1 = ArrayList_init_$Create$();
  }
  protoOf(RouteTree).r3k = function (route, allowRedirects) {
    return allowRedirects ? resolveAllowingRedirects(this, route) : resolveWithoutRedirects(this, route);
  };
  protoOf(RouteTree).s3k = function (route) {
    return !(checkRoute(this, route) == null);
  };
  protoOf(RouteTree).t3k = function (route, data) {
    var routeSegments = toMutableList(split(route, charArrayOf([_Char___init__impl__6a9atx(47)])));
    var currNode = this.m3k_1;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.m3k_1.i3j(removeFirst(routeSegments))) {
      // Inline function 'kotlin.require.<anonymous>' call
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    $l$loop: while (true) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!!routeSegments.q()) {
        break $l$loop;
      }
      var nextRouteSegment = removeFirst(routeSegments);
      var tmp0_elvis_lhs = currNode.j3j(nextRouteSegment);
      currNode = tmp0_elvis_lhs == null ? currNode.k3j(nextRouteSegment) : tmp0_elvis_lhs;
    }
    if (!(currNode.f3j() == null))
      return false;
    currNode.a3j_1 = data;
    return true;
  };
  function toRouteString(_this__u8e3s4) {
    return joinToString(_this__u8e3s4, '/', VOID, VOID, VOID, VOID, toRouteString$lambda);
  }
  function isDynamicSegment(_this__u8e3s4) {
    return startsWith_0(_this__u8e3s4, _Char___init__impl__6a9atx(123)) && endsWith_0(_this__u8e3s4, _Char___init__impl__6a9atx(125));
  }
  function toRouteString$lambda(it) {
    return it.l3k_1;
  }
  //region block: init
  Companion_instance = new Companion();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = DynamicNode;
  _.$_$.b = RouteTree;
  _.$_$.c = toRouteString;
  //endregion
  return _;
}));

//# sourceMappingURL=kobweb-common-client-server-internal.js.map
