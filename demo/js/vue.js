/*!
 * Vue.js v2.7.16
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  var emptyObject = Object.freeze({});
  var isArray = Array.isArray;
  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef(v) {
      return v === undefined || v === null;
  }
  function isDef(v) {
      return v !== undefined && v !== null;
  }
  function isTrue(v) {
      return v === true;
  }
  function isFalse(v) {
      return v === false;
  }
  /**
   * Check if value is primitive.
   */
  function isPrimitive(value) {
      return (typeof value === 'string' ||
          typeof value === 'number' ||
          // $flow-disable-line
          typeof value === 'symbol' ||
          typeof value === 'boolean');
  }
  function isFunction(value) {
      return typeof value === 'function';
  }
  /**
   * Quick object check - this is primarily used to tell
   * objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject(obj) {
      return obj !== null && typeof obj === 'object';
  }
  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;
  function toRawType(value) {
      return _toString.call(value).slice(8, -1);
  }
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject(obj) {
      return _toString.call(obj) === '[object Object]';
  }
  function isRegExp(v) {
      return _toString.call(v) === '[object RegExp]';
  }
  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex(val) {
      var n = parseFloat(String(val));
      return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  function isPromise(val) {
      return (isDef(val) &&
          typeof val.then === 'function' &&
          typeof val.catch === 'function');
  }
  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString(val) {
      return val == null
          ? ''
          : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
              ? JSON.stringify(val, replacer, 2)
              : String(val);
  }
  function replacer(_key, val) {
      // avoid circular deps from v3
      if (val && val.__v_isRef) {
          return val.value;
      }
      return val;
  }
  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber(val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n;
  }
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
      var map = Object.create(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? function (val) { return map[val.toLowerCase()]; } : function (val) { return map[val]; };
  }
  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);
  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  /**
   * Remove an item from an array.
   */
  function remove$2(arr, item) {
      var len = arr.length;
      if (len) {
          // fast path for the only / last item
          if (item === arr[len - 1]) {
              arr.length = len - 1;
              return;
          }
          var index = arr.indexOf(item);
          if (index > -1) {
              return arr.splice(index, 1);
          }
      }
  }
  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
      var cache = Object.create(null);
      return function cachedFn(str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str));
      };
  }
  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
      return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
  });
  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  });
  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase();
  });
  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */
  /* istanbul ignore next */
  function polyfillBind(fn, ctx) {
      function boundFn(a) {
          var l = arguments.length;
          return l
              ? l > 1
                  ? fn.apply(ctx, arguments)
                  : fn.call(ctx, a)
              : fn.call(ctx);
      }
      boundFn._length = fn.length;
      return boundFn;
  }
  function nativeBind(fn, ctx) {
      return fn.bind(ctx);
  }
  // @ts-expect-error bind cannot be `undefined`
  var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray(list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
          ret[i] = list[i + start];
      }
      return ret;
  }
  /**
   * Mix properties into target object.
   */
  function extend(to, _from) {
      for (var key in _from) {
          to[key] = _from[key];
      }
      return to;
  }
  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject(arr) {
      var res = {};
      for (var i = 0; i < arr.length; i++) {
          if (arr[i]) {
              extend(res, arr[i]);
          }
      }
      return res;
  }
  /* eslint-disable no-unused-vars */
  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop(a, b, c) { }
  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };
  /* eslint-enable no-unused-vars */
  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };
  /**
   * Generate a string containing static keys from compiler modules.
   */
  function genStaticKeys$1(modules) {
      return modules
          .reduce(function (keys, m) { return keys.concat(m.staticKeys || []); }, [])
          .join(',');
  }
  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual(a, b) {
      if (a === b)
          return true;
      var isObjectA = isObject(a);
      var isObjectB = isObject(b);
      if (isObjectA && isObjectB) {
          try {
              var isArrayA = Array.isArray(a);
              var isArrayB = Array.isArray(b);
              if (isArrayA && isArrayB) {
                  return (a.length === b.length &&
                      a.every(function (e, i) {
                          return looseEqual(e, b[i]);
                      }));
              }
              else if (a instanceof Date && b instanceof Date) {
                  return a.getTime() === b.getTime();
              }
              else if (!isArrayA && !isArrayB) {
                  var keysA = Object.keys(a);
                  var keysB = Object.keys(b);
                  return (keysA.length === keysB.length &&
                      keysA.every(function (key) {
                          return looseEqual(a[key], b[key]);
                      }));
              }
              else {
                  /* istanbul ignore next */
                  return false;
              }
          }
          catch (e) {
              /* istanbul ignore next */
              return false;
          }
      }
      else if (!isObjectA && !isObjectB) {
          return String(a) === String(b);
      }
      else {
          return false;
      }
  }
  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf(arr, val) {
      for (var i = 0; i < arr.length; i++) {
          if (looseEqual(arr[i], val))
              return i;
      }
      return -1;
  }
  /**
   * Ensure a function is called only once.
   */
  function once(fn) {
      var called = false;
      return function () {
          if (!called) {
              called = true;
              fn.apply(this, arguments);
          }
      };
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
  function hasChanged(x, y) {
      if (x === y) {
          return x === 0 && 1 / x !== 1 / y;
      }
      else {
          return x === x || y === y;
      }
  }

  var SSR_ATTR = 'data-server-rendered';
  var ASSET_TYPES = ['component', 'directive', 'filter'];
  var LIFECYCLE_HOOKS = [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'activated',
      'deactivated',
      'errorCaptured',
      'serverPrefetch',
      'renderTracked',
      'renderTriggered'
  ];

  var config = {
      /**
       * Option merge strategies (used in core/util/options)
       */
      // $flow-disable-line
      optionMergeStrategies: Object.create(null),
      /**
       * Whether to suppress warnings.
       */
      silent: false,
      /**
       * Show production mode tip message on boot?
       */
      productionTip: true,
      /**
       * Whether to enable devtools
       */
      devtools: true,
      /**
       * Whether to record perf
       */
      performance: false,
      /**
       * Error handler for watcher errors
       */
      errorHandler: null,
      /**
       * Warn handler for watcher warns
       */
      warnHandler: null,
      /**
       * Ignore certain custom elements
       */
      ignoredElements: [],
      /**
       * Custom user key aliases for v-on
       */
      // $flow-disable-line
      keyCodes: Object.create(null),
      /**
       * Check if a tag is reserved so that it cannot be registered as a
       * component. This is platform-dependent and may be overwritten.
       */
      isReservedTag: no,
      /**
       * Check if an attribute is reserved so that it cannot be used as a component
       * prop. This is platform-dependent and may be overwritten.
       */
      isReservedAttr: no,
      /**
       * Check if a tag is an unknown element.
       * Platform-dependent.
       */
      isUnknownElement: no,
      /**
       * Get the namespace of an element
       */
      getTagNamespace: noop,
      /**
       * Parse the real tag name for the specific platform.
       */
      parsePlatformTagName: identity,
      /**
       * Check if an attribute must be bound using property, e.g. value
       * Platform-dependent.
       */
      mustUseProp: no,
      /**
       * Perform updates asynchronously. Intended to be used by Vue Test Utils
       * This will significantly reduce performance if set to false.
       */
      async: true,
      /**
       * Exposed for legacy reasons
       */
      _lifecycleHooks: LIFECYCLE_HOOKS
  };

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  /**
   * Check if a string starts with $ or _
   */
  function isReserved(str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5f;
  }
  /**
   * Define a property.
   */
  function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
          value: val,
          enumerable: !!enumerable,
          writable: true,
          configurable: true
      });
  }
  /**
   * Parse simple path.
   */
  var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
  function parsePath(path) {
      if (bailRE.test(path)) {
          return;
      }
      var segments = path.split('.');
      return function (obj) {
          for (var i = 0; i < segments.length; i++) {
              if (!obj)
                  return;
              obj = obj[segments[i]];
          }
          return obj;
      };
  }

  // can we use __proto__?
  var hasProto = '__proto__' in {};
  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  UA && /chrome\/\d+/.test(UA) && !isEdge;
  UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  // Firefox has a "watch" function on Object.prototype...
  // @ts-expect-error firebox support
  var nativeWatch = {}.watch;
  var supportsPassive = false;
  if (inBrowser) {
      try {
          var opts = {};
          Object.defineProperty(opts, 'passive', {
              get: function () {
                  /* istanbul ignore next */
                  supportsPassive = true;
              }
          }); // https://github.com/facebook/flow/issues/285
          window.addEventListener('test-passive', null, opts);
      }
      catch (e) { }
  }
  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
      if (_isServer === undefined) {
          /* istanbul ignore if */
          if (!inBrowser && typeof global !== 'undefined') {
              // detect presence of vue-server-renderer and avoid
              // Webpack shimming the process
              _isServer =
                  global['process'] && global['process'].env.VUE_ENV === 'server';
          }
          else {
              _isServer = false;
          }
      }
      return _isServer;
  };
  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  /* istanbul ignore next */
  function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== 'undefined' &&
      isNative(Symbol) &&
      typeof Reflect !== 'undefined' &&
      isNative(Reflect.ownKeys);
  var _Set; // $flow-disable-line
  /* istanbul ignore if */ if (typeof Set !== 'undefined' && isNative(Set)) {
      // use native Set when available.
      _Set = Set;
  }
  else {
      // a non-standard Set polyfill that only works with primitive keys.
      _Set = /** @class */ (function () {
          function Set() {
              this.set = Object.create(null);
          }
          Set.prototype.has = function (key) {
              return this.set[key] === true;
          };
          Set.prototype.add = function (key) {
              this.set[key] = true;
          };
          Set.prototype.clear = function () {
              this.set = Object.create(null);
          };
          return Set;
      }());
  }

  var currentInstance = null;
  /**
   * This is exposed for compatibility with v3 (e.g. some functions in VueUse
   * relies on it). Do not use this internally, just use `currentInstance`.
   *
   * @internal this function needs manual type declaration because it relies
   * on previously manually authored types from Vue 2
   */
  function getCurrentInstance() {
      return currentInstance && { proxy: currentInstance };
  }
  /**
   * @internal
   */
  function setCurrentInstance(vm) {
      if (vm === void 0) { vm = null; }
      if (!vm)
          currentInstance && currentInstance._scope.off();
      currentInstance = vm;
      vm && vm._scope.on();
  }

  /**
   * @internal
   */
  var VNode = /** @class */ (function () {
      function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.fnContext = undefined;
          this.fnOptions = undefined;
          this.fnScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
      }
      Object.defineProperty(VNode.prototype, "child", {
          // DEPRECATED: alias for componentInstance for backwards compat.
          /* istanbul ignore next */
          get: function () {
              return this.componentInstance;
          },
          enumerable: false,
          configurable: true
      });
      return VNode;
  }());
  var createEmptyVNode = function (text) {
      if (text === void 0) { text = ''; }
      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node;
  };
  function createTextVNode(val) {
      return new VNode(undefined, undefined, undefined, String(val));
  }
  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode(vnode) {
      var cloned = new VNode(vnode.tag, vnode.data, 
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.fnContext = vnode.fnContext;
      cloned.fnOptions = vnode.fnOptions;
      cloned.fnScopeId = vnode.fnScopeId;
      cloned.asyncMeta = vnode.asyncMeta;
      cloned.isCloned = true;
      return cloned;
  }

  /* not type checking this file because flow doesn't play well with Proxy */
  var initProxy;
  {
      var allowedGlobals_1 = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' +
          'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
          'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,' +
          'require' // for Webpack/Browserify
      );
      var warnNonPresent_1 = function (target, key) {
          warn$2("Property or method \"".concat(key, "\" is not defined on the instance but ") +
              'referenced during render. Make sure that this property is reactive, ' +
              'either in the data option, or for class-based components, by ' +
              'initializing the property. ' +
              'See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
      };
      var warnReservedPrefix_1 = function (target, key) {
          warn$2("Property \"".concat(key, "\" must be accessed with \"$data.").concat(key, "\" because ") +
              'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
              'prevent conflicts with Vue internals. ' +
              'See: https://v2.vuejs.org/v2/api/#data', target);
      };
      var hasProxy_1 = typeof Proxy !== 'undefined' && isNative(Proxy);
      if (hasProxy_1) {
          var isBuiltInModifier_1 = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
          config.keyCodes = new Proxy(config.keyCodes, {
              set: function (target, key, value) {
                  if (isBuiltInModifier_1(key)) {
                      warn$2("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
                      return false;
                  }
                  else {
                      target[key] = value;
                      return true;
                  }
              }
          });
      }
      var hasHandler_1 = {
          has: function (target, key) {
              var has = key in target;
              var isAllowed = allowedGlobals_1(key) ||
                  (typeof key === 'string' &&
                      key.charAt(0) === '_' &&
                      !(key in target.$data));
              if (!has && !isAllowed) {
                  if (key in target.$data)
                      warnReservedPrefix_1(target, key);
                  else
                      warnNonPresent_1(target, key);
              }
              return has || !isAllowed;
          }
      };
      var getHandler_1 = {
          get: function (target, key) {
              if (typeof key === 'string' && !(key in target)) {
                  if (key in target.$data)
                      warnReservedPrefix_1(target, key);
                  else
                      warnNonPresent_1(target, key);
              }
              return target[key];
          }
      };
      initProxy = function initProxy(vm) {
          if (hasProxy_1) {
              // determine which proxy handler to use
              var options = vm.$options;
              var handlers = options.render && options.render._withStripped ? getHandler_1 : hasHandler_1;
              vm._renderProxy = new Proxy(vm, handlers);
          }
          else {
              vm._renderProxy = vm;
          }
      };
  }

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  var uid$2 = 0;
  var pendingCleanupDeps = [];
  var cleanupDeps = function () {
      for (var i = 0; i < pendingCleanupDeps.length; i++) {
          var dep = pendingCleanupDeps[i];
          dep.subs = dep.subs.filter(function (s) { return s; });
          dep._pending = false;
      }
      pendingCleanupDeps.length = 0;
  };
  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   * @internal
   */
  var Dep = /** @class */ (function () {
      function Dep() {
          // pending subs cleanup
          this._pending = false;
          this.id = uid$2++;
          this.subs = [];
      }
      Dep.prototype.addSub = function (sub) {
          this.subs.push(sub);
      };
      Dep.prototype.removeSub = function (sub) {
          // #12696 deps with massive amount of subscribers are extremely slow to
          // clean up in Chromium
          // to workaround this, we unset the sub for now, and clear them on
          // next scheduler flush.
          this.subs[this.subs.indexOf(sub)] = null;
          if (!this._pending) {
              this._pending = true;
              pendingCleanupDeps.push(this);
          }
      };
      Dep.prototype.depend = function (info) {
          if (Dep.target) {
              Dep.target.addDep(this);
              if (info && Dep.target.onTrack) {
                  Dep.target.onTrack(__assign({ effect: Dep.target }, info));
              }
          }
      };
      Dep.prototype.notify = function (info) {
          // stabilize the subscriber list first
          var subs = this.subs.filter(function (s) { return s; });
          if (!config.async) {
              // subs aren't sorted in scheduler if not running async
              // we need to sort them now to make sure they fire in correct
              // order
              subs.sort(function (a, b) { return a.id - b.id; });
          }
          for (var i = 0, l = subs.length; i < l; i++) {
              var sub = subs[i];
              if (info) {
                  sub.onTrigger &&
                      sub.onTrigger(__assign({ effect: subs[i] }, info));
              }
              sub.update();
          }
      };
      return Dep;
  }());
  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target) {
      targetStack.push(target);
      Dep.target = target;
  }
  function popTarget() {
      targetStack.pop();
      Dep.target = targetStack[targetStack.length - 1];
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
  ];
  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
      // cache original method
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var result = original.apply(this, args);
          var ob = this.__ob__;
          var inserted;
          switch (method) {
              case 'push':
              case 'unshift':
                  inserted = args;
                  break;
              case 'splice':
                  inserted = args.slice(2);
                  break;
          }
          if (inserted)
              ob.observeArray(inserted);
          // notify change
          {
              ob.dep.notify({
                  type: "array mutation" /* TriggerOpTypes.ARRAY_MUTATION */,
                  target: this,
                  key: method
              });
          }
          return result;
      });
  });

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var NO_INITIAL_VALUE = {};
  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;
  function toggleObserving(value) {
      shouldObserve = value;
  }
  // ssr mock dep
  var mockDep = {
      notify: noop,
      depend: noop,
      addSub: noop,
      removeSub: noop
  };
  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = /** @class */ (function () {
      function Observer(value, shallow, mock) {
          if (shallow === void 0) { shallow = false; }
          if (mock === void 0) { mock = false; }
          this.value = value;
          this.shallow = shallow;
          this.mock = mock;
          // this.value = value
          this.dep = mock ? mockDep : new Dep();
          this.vmCount = 0;
          def(value, '__ob__', this);
          if (isArray(value)) {
              if (!mock) {
                  if (hasProto) {
                      value.__proto__ = arrayMethods;
                      /* eslint-enable no-proto */
                  }
                  else {
                      for (var i = 0, l = arrayKeys.length; i < l; i++) {
                          var key = arrayKeys[i];
                          def(value, key, arrayMethods[key]);
                      }
                  }
              }
              if (!shallow) {
                  this.observeArray(value);
              }
          }
          else {
              /**
               * Walk through all properties and convert them into
               * getter/setters. This method should only be called when
               * value type is Object.
               */
              var keys = Object.keys(value);
              for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock);
              }
          }
      }
      /**
       * Observe a list of Array items.
       */
      Observer.prototype.observeArray = function (value) {
          for (var i = 0, l = value.length; i < l; i++) {
              observe(value[i], false, this.mock);
          }
      };
      return Observer;
  }());
  // helpers
  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe(value, shallow, ssrMockReactivity) {
      if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
          return value.__ob__;
      }
      if (shouldObserve &&
          (ssrMockReactivity || !isServerRendering()) &&
          (isArray(value) || isPlainObject(value)) &&
          Object.isExtensible(value) &&
          !value.__v_skip /* ReactiveFlags.SKIP */ &&
          !isRef(value) &&
          !(value instanceof VNode)) {
          return new Observer(value, shallow, ssrMockReactivity);
      }
  }
  /**
   * Define a reactive property on an Object.
   */
  function defineReactive(obj, key, val, customSetter, shallow, mock, observeEvenIfShallow) {
      if (observeEvenIfShallow === void 0) { observeEvenIfShallow = false; }
      var dep = new Dep();
      var property = Object.getOwnPropertyDescriptor(obj, key);
      if (property && property.configurable === false) {
          return;
      }
      // cater for pre-defined getter/setters
      var getter = property && property.get;
      var setter = property && property.set;
      if ((!getter || setter) &&
          (val === NO_INITIAL_VALUE || arguments.length === 2)) {
          val = obj[key];
      }
      var childOb = shallow ? val && val.__ob__ : observe(val, false, mock);
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              var value = getter ? getter.call(obj) : val;
              if (Dep.target) {
                  {
                      dep.depend({
                          target: obj,
                          type: "get" /* TrackOpTypes.GET */,
                          key: key
                      });
                  }
                  if (childOb) {
                      childOb.dep.depend();
                      if (isArray(value)) {
                          dependArray(value);
                      }
                  }
              }
              return isRef(value) && !shallow ? value.value : value;
          },
          set: function reactiveSetter(newVal) {
              var value = getter ? getter.call(obj) : val;
              if (!hasChanged(value, newVal)) {
                  return;
              }
              if (customSetter) {
                  customSetter();
              }
              if (setter) {
                  setter.call(obj, newVal);
              }
              else if (getter) {
                  // #7981: for accessor properties without setter
                  return;
              }
              else if (!shallow && isRef(value) && !isRef(newVal)) {
                  value.value = newVal;
                  return;
              }
              else {
                  val = newVal;
              }
              childOb = shallow ? newVal && newVal.__ob__ : observe(newVal, false, mock);
              {
                  dep.notify({
                      type: "set" /* TriggerOpTypes.SET */,
                      target: obj,
                      key: key,
                      newValue: newVal,
                      oldValue: value
                  });
              }
          }
      });
      return dep;
  }
  function set(target, key, val) {
      if ((isUndef(target) || isPrimitive(target))) {
          warn$2("Cannot set reactive property on undefined, null, or primitive value: ".concat(target));
      }
      if (isReadonly(target)) {
          warn$2("Set operation on key \"".concat(key, "\" failed: target is readonly."));
          return;
      }
      var ob = target.__ob__;
      if (isArray(target) && isValidArrayIndex(key)) {
          target.length = Math.max(target.length, key);
          target.splice(key, 1, val);
          // when mocking for SSR, array methods are not hijacked
          if (ob && !ob.shallow && ob.mock) {
              observe(val, false, true);
          }
          return val;
      }
      if (key in target && !(key in Object.prototype)) {
          target[key] = val;
          return val;
      }
      if (target._isVue || (ob && ob.vmCount)) {
          warn$2('Avoid adding reactive properties to a Vue instance or its root $data ' +
                  'at runtime - declare it upfront in the data option.');
          return val;
      }
      if (!ob) {
          target[key] = val;
          return val;
      }
      defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
      {
          ob.dep.notify({
              type: "add" /* TriggerOpTypes.ADD */,
              target: target,
              key: key,
              newValue: val,
              oldValue: undefined
          });
      }
      return val;
  }
  function del(target, key) {
      if ((isUndef(target) || isPrimitive(target))) {
          warn$2("Cannot delete reactive property on undefined, null, or primitive value: ".concat(target));
      }
      if (isArray(target) && isValidArrayIndex(key)) {
          target.splice(key, 1);
          return;
      }
      var ob = target.__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
          warn$2('Avoid deleting properties on a Vue instance or its root $data ' +
                  '- just set it to null.');
          return;
      }
      if (isReadonly(target)) {
          warn$2("Delete operation on key \"".concat(key, "\" failed: target is readonly."));
          return;
      }
      if (!hasOwn(target, key)) {
          return;
      }
      delete target[key];
      if (!ob) {
          return;
      }
      {
          ob.dep.notify({
              type: "delete" /* TriggerOpTypes.DELETE */,
              target: target,
              key: key
          });
      }
  }
  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray(value) {
      for (var e = void 0, i = 0, l = value.length; i < l; i++) {
          e = value[i];
          if (e && e.__ob__) {
              e.__ob__.dep.depend();
          }
          if (isArray(e)) {
              dependArray(e);
          }
      }
  }

  function reactive(target) {
      makeReactive(target, false);
      return target;
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only the root
   * level properties are reactive. It also does not auto-unwrap refs (even at the
   * root level).
   */
  function shallowReactive(target) {
      makeReactive(target, true);
      def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
      return target;
  }
  function makeReactive(target, shallow) {
      // if trying to observe a readonly proxy, return the readonly version.
      if (!isReadonly(target)) {
          {
              if (isArray(target)) {
                  warn$2("Avoid using Array as root value for ".concat(shallow ? "shallowReactive()" : "reactive()", " as it cannot be tracked in watch() or watchEffect(). Use ").concat(shallow ? "shallowRef()" : "ref()", " instead. This is a Vue-2-only limitation."));
              }
              var existingOb = target && target.__ob__;
              if (existingOb && existingOb.shallow !== shallow) {
                  warn$2("Target is already a ".concat(existingOb.shallow ? "" : "non-", "shallow reactive object, and cannot be converted to ").concat(shallow ? "" : "non-", "shallow."));
              }
          }
          var ob = observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
          if (!ob) {
              if (target == null || isPrimitive(target)) {
                  warn$2("value cannot be made reactive: ".concat(String(target)));
              }
              if (isCollectionType(target)) {
                  warn$2("Vue 2 does not support reactive collection types such as Map or Set.");
              }
          }
      }
  }
  function isReactive(value) {
      if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
      }
      return !!(value && value.__ob__);
  }
  function isShallow(value) {
      return !!(value && value.__v_isShallow);
  }
  function isReadonly(value) {
      return !!(value && value.__v_isReadonly);
  }
  function isProxy(value) {
      return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
      var raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
      return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
      // non-extensible objects won't be observed anyway
      if (Object.isExtensible(value)) {
          def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
      }
      return value;
  }
  /**
   * @internal
   */
  function isCollectionType(value) {
      var type = toRawType(value);
      return (type === 'Map' || type === 'WeakMap' || type === 'Set' || type === 'WeakSet');
  }

  /**
   * @internal
   */
  var RefFlag = "__v_isRef";
  function isRef(r) {
      return !!(r && r.__v_isRef === true);
  }
  function ref$1(value) {
      return createRef(value, false);
  }
  function shallowRef(value) {
      return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
          return rawValue;
      }
      var ref = {};
      def(ref, RefFlag, true);
      def(ref, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, shallow);
      def(ref, 'dep', defineReactive(ref, 'value', rawValue, null, shallow, isServerRendering()));
      return ref;
  }
  function triggerRef(ref) {
      if (!ref.dep) {
          warn$2("received object is not a triggerable ref.");
      }
      {
          ref.dep &&
              ref.dep.notify({
                  type: "set" /* TriggerOpTypes.SET */,
                  target: ref,
                  key: 'value'
              });
      }
  }
  function unref(ref) {
      return isRef(ref) ? ref.value : ref;
  }
  function proxyRefs(objectWithRefs) {
      if (isReactive(objectWithRefs)) {
          return objectWithRefs;
      }
      var proxy = {};
      var keys = Object.keys(objectWithRefs);
      for (var i = 0; i < keys.length; i++) {
          proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
      }
      return proxy;
  }
  function proxyWithRefUnwrap(target, source, key) {
      Object.defineProperty(target, key, {
          enumerable: true,
          configurable: true,
          get: function () {
              var val = source[key];
              if (isRef(val)) {
                  return val.value;
              }
              else {
                  var ob = val && val.__ob__;
                  if (ob)
                      ob.dep.depend();
                  return val;
              }
          },
          set: function (value) {
              var oldValue = source[key];
              if (isRef(oldValue) && !isRef(value)) {
                  oldValue.value = value;
              }
              else {
                  source[key] = value;
              }
          }
      });
  }
  function customRef(factory) {
      var dep = new Dep();
      var _a = factory(function () {
          {
              dep.depend({
                  target: ref,
                  type: "get" /* TrackOpTypes.GET */,
                  key: 'value'
              });
          }
      }, function () {
          {
              dep.notify({
                  target: ref,
                  type: "set" /* TriggerOpTypes.SET */,
                  key: 'value'
              });
          }
      }), get = _a.get, set = _a.set;
      var ref = {
          get value() {
              return get();
          },
          set value(newVal) {
              set(newVal);
          }
      };
      def(ref, RefFlag, true);
      return ref;
  }
  function toRefs(object) {
      if (!isReactive(object)) {
          warn$2("toRefs() expects a reactive object but received a plain one.");
      }
      var ret = isArray(object) ? new Array(object.length) : {};
      for (var key in object) {
          ret[key] = toRef(object, key);
      }
      return ret;
  }
  function toRef(object, key, defaultValue) {
      var val = object[key];
      if (isRef(val)) {
          return val;
      }
      var ref = {
          get value() {
              var val = object[key];
              return val === undefined ? defaultValue : val;
          },
          set value(newVal) {
              object[key] = newVal;
          }
      };
      def(ref, RefFlag, true);
      return ref;
  }

  var rawToReadonlyFlag = "__v_rawToReadonly";
  var rawToShallowReadonlyFlag = "__v_rawToShallowReadonly";
  function readonly(target) {
      return createReadonly(target, false);
  }
  function createReadonly(target, shallow) {
      if (!isPlainObject(target)) {
          {
              if (isArray(target)) {
                  warn$2("Vue 2 does not support readonly arrays.");
              }
              else if (isCollectionType(target)) {
                  warn$2("Vue 2 does not support readonly collection types such as Map or Set.");
              }
              else {
                  warn$2("value cannot be made readonly: ".concat(typeof target));
              }
          }
          return target;
      }
      if (!Object.isExtensible(target)) {
          warn$2("Vue 2 does not support creating readonly proxy for non-extensible object.");
      }
      // already a readonly object
      if (isReadonly(target)) {
          return target;
      }
      // already has a readonly proxy
      var existingFlag = shallow ? rawToShallowReadonlyFlag : rawToReadonlyFlag;
      var existingProxy = target[existingFlag];
      if (existingProxy) {
          return existingProxy;
      }
      var proxy = Object.create(Object.getPrototypeOf(target));
      def(target, existingFlag, proxy);
      def(proxy, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, true);
      def(proxy, "__v_raw" /* ReactiveFlags.RAW */, target);
      if (isRef(target)) {
          def(proxy, RefFlag, true);
      }
      if (shallow || isShallow(target)) {
          def(proxy, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
      }
      var keys = Object.keys(target);
      for (var i = 0; i < keys.length; i++) {
          defineReadonlyProperty(proxy, target, keys[i], shallow);
      }
      return proxy;
  }
  function defineReadonlyProperty(proxy, target, key, shallow) {
      Object.defineProperty(proxy, key, {
          enumerable: true,
          configurable: true,
          get: function () {
              var val = target[key];
              return shallow || !isPlainObject(val) ? val : readonly(val);
          },
          set: function () {
              warn$2("Set operation on key \"".concat(key, "\" failed: target is readonly."));
          }
      });
  }
  /**
   * Returns a reactive-copy of the original object, where only the root level
   * properties are readonly, and does NOT unwrap refs nor recursively convert
   * returned properties.
   * This is used for creating the props proxy object for stateful components.
   */
  function shallowReadonly(target) {
      return createReadonly(target, true);
  }

  function computed(getterOrOptions, debugOptions) {
      var getter;
      var setter;
      var onlyGetter = isFunction(getterOrOptions);
      if (onlyGetter) {
          getter = getterOrOptions;
          setter = function () {
                  warn$2('Write operation failed: computed value is readonly');
              }
              ;
      }
      else {
          getter = getterOrOptions.get;
          setter = getterOrOptions.set;
      }
      var watcher = isServerRendering()
          ? null
          : new Watcher(currentInstance, getter, noop, { lazy: true });
      if (watcher && debugOptions) {
          watcher.onTrack = debugOptions.onTrack;
          watcher.onTrigger = debugOptions.onTrigger;
      }
      var ref = {
          // some libs rely on the presence effect for checking computed refs
          // from normal refs, but the implementation doesn't matter
          effect: watcher,
          get value() {
              if (watcher) {
                  if (watcher.dirty) {
                      watcher.evaluate();
                  }
                  if (Dep.target) {
                      if (Dep.target.onTrack) {
                          Dep.target.onTrack({
                              effect: Dep.target,
                              target: ref,
                              type: "get" /* TrackOpTypes.GET */,
                              key: 'value'
                          });
                      }
                      watcher.depend();
                  }
                  return watcher.value;
              }
              else {
                  return getter();
              }
          },
          set value(newVal) {
              setter(newVal);
          }
      };
      def(ref, RefFlag, true);
      def(ref, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, onlyGetter);
      return ref;
  }

  var mark;
  var measure;
  {
      var perf_1 = inBrowser && window.performance;
      /* istanbul ignore if */
      if (perf_1 &&
          // @ts-ignore
          perf_1.mark &&
          // @ts-ignore
          perf_1.measure &&
          // @ts-ignore
          perf_1.clearMarks &&
          // @ts-ignore
          perf_1.clearMeasures) {
          mark = function (tag) { return perf_1.mark(tag); };
          measure = function (name, startTag, endTag) {
              perf_1.measure(name, startTag, endTag);
              perf_1.clearMarks(startTag);
              perf_1.clearMarks(endTag);
              // perf.clearMeasures(name)
          };
      }
  }

  var normalizeEvent = cached(function (name) {
      var passive = name.charAt(0) === '&';
      name = passive ? name.slice(1) : name;
      var once = name.charAt(0) === '~'; // Prefixed last, checked first
      name = once ? name.slice(1) : name;
      var capture = name.charAt(0) === '!';
      name = capture ? name.slice(1) : name;
      return {
          name: name,
          once: once,
          capture: capture,
          passive: passive
      };
  });
  function createFnInvoker(fns, vm) {
      function invoker() {
          var fns = invoker.fns;
          if (isArray(fns)) {
              var cloned = fns.slice();
              for (var i = 0; i < cloned.length; i++) {
                  invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
              }
          }
          else {
              // return handler return value for single handlers
              return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
          }
      }
      invoker.fns = fns;
      return invoker;
  }
  function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
      var name, cur, old, event;
      for (name in on) {
          cur = on[name];
          old = oldOn[name];
          event = normalizeEvent(name);
          if (isUndef(cur)) {
              warn$2("Invalid handler for event \"".concat(event.name, "\": got ") + String(cur), vm);
          }
          else if (isUndef(old)) {
              if (isUndef(cur.fns)) {
                  cur = on[name] = createFnInvoker(cur, vm);
              }
              if (isTrue(event.once)) {
                  cur = on[name] = createOnceHandler(event.name, cur, event.capture);
              }
              add(event.name, cur, event.capture, event.passive, event.params);
          }
          else if (cur !== old) {
              old.fns = cur;
              on[name] = old;
          }
      }
      for (name in oldOn) {
          if (isUndef(on[name])) {
              event = normalizeEvent(name);
              remove(event.name, oldOn[name], event.capture);
          }
      }
  }

  function mergeVNodeHook(def, hookKey, hook) {
      if (def instanceof VNode) {
          def = def.data.hook || (def.data.hook = {});
      }
      var invoker;
      var oldHook = def[hookKey];
      function wrappedHook() {
          hook.apply(this, arguments);
          // important: remove merged hook to ensure it's called only once
          // and prevent memory leak
          remove$2(invoker.fns, wrappedHook);
      }
      if (isUndef(oldHook)) {
          // no existing hook
          invoker = createFnInvoker([wrappedHook]);
      }
      else {
          /* istanbul ignore if */
          if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
              // already a merged invoker
              invoker = oldHook;
              invoker.fns.push(wrappedHook);
          }
          else {
              // existing plain hook
              invoker = createFnInvoker([oldHook, wrappedHook]);
          }
      }
      invoker.merged = true;
      def[hookKey] = invoker;
  }

  function extractPropsFromVNodeData(data, Ctor, tag) {
      // we are only extracting raw values here.
      // validation and default values are handled in the child
      // component itself.
      var propOptions = Ctor.options.props;
      if (isUndef(propOptions)) {
          return;
      }
      var res = {};
      var attrs = data.attrs, props = data.props;
      if (isDef(attrs) || isDef(props)) {
          for (var key in propOptions) {
              var altKey = hyphenate(key);
              {
                  var keyInLowerCase = key.toLowerCase();
                  if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
                      tip("Prop \"".concat(keyInLowerCase, "\" is passed to component ") +
                          "".concat(formatComponentName(
                          // @ts-expect-error tag is string
                          tag || Ctor), ", but the declared prop name is") +
                          " \"".concat(key, "\". ") +
                          "Note that HTML attributes are case-insensitive and camelCased " +
                          "props need to use their kebab-case equivalents when using in-DOM " +
                          "templates. You should probably use \"".concat(altKey, "\" instead of \"").concat(key, "\"."));
                  }
              }
              checkProp(res, props, key, altKey, true) ||
                  checkProp(res, attrs, key, altKey, false);
          }
      }
      return res;
  }
  function checkProp(res, hash, key, altKey, preserve) {
      if (isDef(hash)) {
          if (hasOwn(hash, key)) {
              res[key] = hash[key];
              if (!preserve) {
                  delete hash[key];
              }
              return true;
          }
          else if (hasOwn(hash, altKey)) {
              res[key] = hash[altKey];
              if (!preserve) {
                  delete hash[altKey];
              }
              return true;
          }
      }
      return false;
  }

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:
  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren(children) {
      for (var i = 0; i < children.length; i++) {
          if (isArray(children[i])) {
              return Array.prototype.concat.apply([], children);
          }
      }
      return children;
  }
  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren(children) {
      return isPrimitive(children)
          ? [createTextVNode(children)]
          : isArray(children)
              ? normalizeArrayChildren(children)
              : undefined;
  }
  function isTextNode(node) {
      return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }
  function normalizeArrayChildren(children, nestedIndex) {
      var res = [];
      var i, c, lastIndex, last;
      for (i = 0; i < children.length; i++) {
          c = children[i];
          if (isUndef(c) || typeof c === 'boolean')
              continue;
          lastIndex = res.length - 1;
          last = res[lastIndex];
          //  nested
          if (isArray(c)) {
              if (c.length > 0) {
                  c = normalizeArrayChildren(c, "".concat(nestedIndex || '', "_").concat(i));
                  // merge adjacent text nodes
                  if (isTextNode(c[0]) && isTextNode(last)) {
                      res[lastIndex] = createTextVNode(last.text + c[0].text);
                      c.shift();
                  }
                  res.push.apply(res, c);
              }
          }
          else if (isPrimitive(c)) {
              if (isTextNode(last)) {
                  // merge adjacent text nodes
                  // this is necessary for SSR hydration because text nodes are
                  // essentially merged when rendered to HTML strings
                  res[lastIndex] = createTextVNode(last.text + c);
              }
              else if (c !== '') {
                  // convert primitive to vnode
                  res.push(createTextVNode(c));
              }
          }
          else {
              if (isTextNode(c) && isTextNode(last)) {
                  // merge adjacent text nodes
                  res[lastIndex] = createTextVNode(last.text + c.text);
              }
              else {
                  // default key for nested array children (likely generated by v-for)
                  if (isTrue(children._isVList) &&
                      isDef(c.tag) &&
                      isUndef(c.key) &&
                      isDef(nestedIndex)) {
                      c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
                  }
                  res.push(c);
              }
          }
      }
      return res;
  }

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
      if (isArray(data) || isPrimitive(data)) {
          normalizationType = children;
          children = data;
          data = undefined;
      }
      if (isTrue(alwaysNormalize)) {
          normalizationType = ALWAYS_NORMALIZE;
      }
      return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
      if (isDef(data) && isDef(data.__ob__)) {
          warn$2("Avoid using observed data object as vnode data: ".concat(JSON.stringify(data), "\n") + 'Always create fresh vnode data objects in each render!', context);
          return createEmptyVNode();
      }
      // object syntax in v-bind
      if (isDef(data) && isDef(data.is)) {
          tag = data.is;
      }
      if (!tag) {
          // in case of component :is set to falsy value
          return createEmptyVNode();
      }
      // warn against non-primitive key
      if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
          warn$2('Avoid using non-primitive value as key, ' +
              'use string/number value instead.', context);
      }
      // support single function children as default scoped slot
      if (isArray(children) && isFunction(children[0])) {
          data = data || {};
          data.scopedSlots = { default: children[0] };
          children.length = 0;
      }
      if (normalizationType === ALWAYS_NORMALIZE) {
          children = normalizeChildren(children);
      }
      else if (normalizationType === SIMPLE_NORMALIZE) {
          children = simpleNormalizeChildren(children);
      }
      var vnode, ns;
      if (typeof tag === 'string') {
          var Ctor = void 0;
          ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
          if (config.isReservedTag(tag)) {
              // platform built-in elements
              if (isDef(data) &&
                  isDef(data.nativeOn) &&
                  data.tag !== 'component') {
                  warn$2("The .native modifier for v-on is only valid on components but it was used on <".concat(tag, ">."), context);
              }
              vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
          }
          else if ((!data || !data.pre) &&
              isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
              // component
              vnode = createComponent(Ctor, data, context, children, tag);
          }
          else {
              // unknown or unlisted namespaced elements
              // check at runtime because it may get assigned a namespace when its
              // parent normalizes children
              vnode = new VNode(tag, data, children, undefined, undefined, context);
          }
      }
      else {
          // direct component options / constructor
          vnode = createComponent(tag, data, context, children);
      }
      if (isArray(vnode)) {
          return vnode;
      }
      else if (isDef(vnode)) {
          if (isDef(ns))
              applyNS(vnode, ns);
          if (isDef(data))
              registerDeepBindings(data);
          return vnode;
      }
      else {
          return createEmptyVNode();
      }
  }
  function applyNS(vnode, ns, force) {
      vnode.ns = ns;
      if (vnode.tag === 'foreignObject') {
          // use default namespace inside foreignObject
          ns = undefined;
          force = true;
      }
      if (isDef(vnode.children)) {
          for (var i = 0, l = vnode.children.length; i < l; i++) {
              var child = vnode.children[i];
              if (isDef(child.tag) &&
                  (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                  applyNS(child, ns, force);
              }
          }
      }
  }
  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings(data) {
      if (isObject(data.style)) {
          traverse(data.style);
      }
      if (isObject(data.class)) {
          traverse(data.class);
      }
  }

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList(val, render) {
      var ret = null, i, l, keys, key;
      if (isArray(val) || typeof val === 'string') {
          ret = new Array(val.length);
          for (i = 0, l = val.length; i < l; i++) {
              ret[i] = render(val[i], i);
          }
      }
      else if (typeof val === 'number') {
          ret = new Array(val);
          for (i = 0; i < val; i++) {
              ret[i] = render(i + 1, i);
          }
      }
      else if (isObject(val)) {
          if (hasSymbol && val[Symbol.iterator]) {
              ret = [];
              var iterator = val[Symbol.iterator]();
              var result = iterator.next();
              while (!result.done) {
                  ret.push(render(result.value, ret.length));
                  result = iterator.next();
              }
          }
          else {
              keys = Object.keys(val);
              ret = new Array(keys.length);
              for (i = 0, l = keys.length; i < l; i++) {
                  key = keys[i];
                  ret[i] = render(val[key], key, i);
              }
          }
      }
      if (!isDef(ret)) {
          ret = [];
      }
      ret._isVList = true;
      return ret;
  }

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot(name, fallbackRender, props, bindObject) {
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      if (scopedSlotFn) {
          // scoped slot
          props = props || {};
          if (bindObject) {
              if (!isObject(bindObject)) {
                  warn$2('slot v-bind without argument expects an Object', this);
              }
              props = extend(extend({}, bindObject), props);
          }
          nodes =
              scopedSlotFn(props) ||
                  (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
      }
      else {
          nodes =
              this.$slots[name] ||
                  (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
      }
      var target = props && props.slot;
      if (target) {
          return this.$createElement('template', { slot: target }, nodes);
      }
      else {
          return nodes;
      }
  }

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter(id) {
      return resolveAsset(this.$options, 'filters', id, true) || identity;
  }

  function isKeyNotMatch(expect, actual) {
      if (isArray(expect)) {
          return expect.indexOf(actual) === -1;
      }
      else {
          return expect !== actual;
      }
  }
  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
      var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
      if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
          return isKeyNotMatch(builtInKeyName, eventKeyName);
      }
      else if (mappedKeyCode) {
          return isKeyNotMatch(mappedKeyCode, eventKeyCode);
      }
      else if (eventKeyName) {
          return hyphenate(eventKeyName) !== key;
      }
      return eventKeyCode === undefined;
  }

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps(data, tag, value, asProp, isSync) {
      if (value) {
          if (!isObject(value)) {
              warn$2('v-bind without argument expects an Object or Array value', this);
          }
          else {
              if (isArray(value)) {
                  value = toObject(value);
              }
              var hash = void 0;
              var _loop_1 = function (key) {
                  if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                      hash = data;
                  }
                  else {
                      var type = data.attrs && data.attrs.type;
                      hash =
                          asProp || config.mustUseProp(tag, type, key)
                              ? data.domProps || (data.domProps = {})
                              : data.attrs || (data.attrs = {});
                  }
                  var camelizedKey = camelize(key);
                  var hyphenatedKey = hyphenate(key);
                  if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                      hash[key] = value[key];
                      if (isSync) {
                          var on = data.on || (data.on = {});
                          on["update:".concat(key)] = function ($event) {
                              value[key] = $event;
                          };
                      }
                  }
              };
              for (var key in value) {
                  _loop_1(key);
              }
          }
      }
      return data;
  }

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic(index, isInFor) {
      var cached = this._staticTrees || (this._staticTrees = []);
      var tree = cached[index];
      // if has already-rendered static tree and not inside v-for,
      // we can reuse the same tree.
      if (tree && !isInFor) {
          return tree;
      }
      // otherwise, render a fresh tree.
      tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this // for render fns generated for functional component templates
      );
      markStatic$1(tree, "__static__".concat(index), false);
      return tree;
  }
  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce(tree, index, key) {
      markStatic$1(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
      return tree;
  }
  function markStatic$1(tree, key, isOnce) {
      if (isArray(tree)) {
          for (var i = 0; i < tree.length; i++) {
              if (tree[i] && typeof tree[i] !== 'string') {
                  markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
              }
          }
      }
      else {
          markStaticNode(tree, key, isOnce);
      }
  }
  function markStaticNode(node, key, isOnce) {
      node.isStatic = true;
      node.key = key;
      node.isOnce = isOnce;
  }

  function bindObjectListeners(data, value) {
      if (value) {
          if (!isPlainObject(value)) {
              warn$2('v-on without argument expects an Object value', this);
          }
          else {
              var on = (data.on = data.on ? extend({}, data.on) : {});
              for (var key in value) {
                  var existing = on[key];
                  var ours = value[key];
                  on[key] = existing ? [].concat(existing, ours) : ours;
              }
          }
      }
      return data;
  }

  function resolveScopedSlots(fns, res, 
  // the following are added in 2.6
  hasDynamicKeys, contentHashKey) {
      res = res || { $stable: !hasDynamicKeys };
      for (var i = 0; i < fns.length; i++) {
          var slot = fns[i];
          if (isArray(slot)) {
              resolveScopedSlots(slot, res, hasDynamicKeys);
          }
          else if (slot) {
              // marker for reverse proxying v-slot without scope on this.$slots
              // @ts-expect-error
              if (slot.proxy) {
                  // @ts-expect-error
                  slot.fn.proxy = true;
              }
              res[slot.key] = slot.fn;
          }
      }
      if (contentHashKey) {
          res.$key = contentHashKey;
      }
      return res;
  }

  // helper to process dynamic keys for dynamic arguments in v-bind and v-on.
  function bindDynamicKeys(baseObj, values) {
      for (var i = 0; i < values.length; i += 2) {
          var key = values[i];
          if (typeof key === 'string' && key) {
              baseObj[values[i]] = values[i + 1];
          }
          else if (key !== '' && key !== null) {
              // null is a special value for explicitly removing a binding
              warn$2("Invalid value for dynamic directive argument (expected string or null): ".concat(key), this);
          }
      }
      return baseObj;
  }
  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier(value, symbol) {
      return typeof value === 'string' ? symbol + value : value;
  }

  function installRenderHelpers(target) {
      target._o = markOnce;
      target._n = toNumber;
      target._s = toString;
      target._l = renderList;
      target._t = renderSlot;
      target._q = looseEqual;
      target._i = looseIndexOf;
      target._m = renderStatic;
      target._f = resolveFilter;
      target._k = checkKeyCodes;
      target._b = bindObjectProps;
      target._v = createTextVNode;
      target._e = createEmptyVNode;
      target._u = resolveScopedSlots;
      target._g = bindObjectListeners;
      target._d = bindDynamicKeys;
      target._p = prependModifier;
  }

  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots(children, context) {
      if (!children || !children.length) {
          return {};
      }
      var slots = {};
      for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          var data = child.data;
          // remove slot attribute if the node is resolved as a Vue slot node
          if (data && data.attrs && data.attrs.slot) {
              delete data.attrs.slot;
          }
          // named slots should only be respected if the vnode was rendered in the
          // same context.
          if ((child.context === context || child.fnContext === context) &&
              data &&
              data.slot != null) {
              var name_1 = data.slot;
              var slot = slots[name_1] || (slots[name_1] = []);
              if (child.tag === 'template') {
                  slot.push.apply(slot, child.children || []);
              }
              else {
                  slot.push(child);
              }
          }
          else {
              (slots.default || (slots.default = [])).push(child);
          }
      }
      // ignore slots that contains only whitespace
      for (var name_2 in slots) {
          if (slots[name_2].every(isWhitespace)) {
              delete slots[name_2];
          }
      }
      return slots;
  }
  function isWhitespace(node) {
      return (node.isComment && !node.asyncFactory) || node.text === ' ';
  }

  function isAsyncPlaceholder(node) {
      // @ts-expect-error not really boolean type
      return node.isComment && node.asyncFactory;
  }

  function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
      var res;
      var hasNormalSlots = Object.keys(normalSlots).length > 0;
      var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
      var key = scopedSlots && scopedSlots.$key;
      if (!scopedSlots) {
          res = {};
      }
      else if (scopedSlots._normalized) {
          // fast path 1: child component re-render only, parent did not change
          return scopedSlots._normalized;
      }
      else if (isStable &&
          prevScopedSlots &&
          prevScopedSlots !== emptyObject &&
          key === prevScopedSlots.$key &&
          !hasNormalSlots &&
          !prevScopedSlots.$hasNormal) {
          // fast path 2: stable scoped slots w/ no normal slots to proxy,
          // only need to normalize once
          return prevScopedSlots;
      }
      else {
          res = {};
          for (var key_1 in scopedSlots) {
              if (scopedSlots[key_1] && key_1[0] !== '$') {
                  res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
              }
          }
      }
      // expose normal slots on scopedSlots
      for (var key_2 in normalSlots) {
          if (!(key_2 in res)) {
              res[key_2] = proxyNormalSlot(normalSlots, key_2);
          }
      }
      // avoriaz seems to mock a non-extensible $scopedSlots object
      // and when that is passed down this would cause an error
      if (scopedSlots && Object.isExtensible(scopedSlots)) {
          scopedSlots._normalized = res;
      }
      def(res, '$stable', isStable);
      def(res, '$key', key);
      def(res, '$hasNormal', hasNormalSlots);
      return res;
  }
  function normalizeScopedSlot(vm, normalSlots, key, fn) {
      var normalized = function () {
          var cur = currentInstance;
          setCurrentInstance(vm);
          var res = arguments.length ? fn.apply(null, arguments) : fn({});
          res =
              res && typeof res === 'object' && !isArray(res)
                  ? [res] // single vnode
                  : normalizeChildren(res);
          var vnode = res && res[0];
          setCurrentInstance(cur);
          return res &&
              (!vnode ||
                  (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
              ? undefined
              : res;
      };
      // this is a slot using the new v-slot syntax without scope. although it is
      // compiled as a scoped slot, render fn users would expect it to be present
      // on this.$slots because the usage is semantically a normal slot.
      if (fn.proxy) {
          Object.defineProperty(normalSlots, key, {
              get: normalized,
              enumerable: true,
              configurable: true
          });
      }
      return normalized;
  }
  function proxyNormalSlot(slots, key) {
      return function () { return slots[key]; };
  }

  function initSetup(vm) {
      var options = vm.$options;
      var setup = options.setup;
      if (setup) {
          var ctx = (vm._setupContext = createSetupContext(vm));
          setCurrentInstance(vm);
          pushTarget();
          var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
          popTarget();
          setCurrentInstance();
          if (isFunction(setupResult)) {
              // render function
              // @ts-ignore
              options.render = setupResult;
          }
          else if (isObject(setupResult)) {
              // bindings
              if (setupResult instanceof VNode) {
                  warn$2("setup() should not return VNodes directly - " +
                      "return a render function instead.");
              }
              vm._setupState = setupResult;
              // __sfc indicates compiled bindings from <script setup>
              if (!setupResult.__sfc) {
                  for (var key in setupResult) {
                      if (!isReserved(key)) {
                          proxyWithRefUnwrap(vm, setupResult, key);
                      }
                      else {
                          warn$2("Avoid using variables that start with _ or $ in setup().");
                      }
                  }
              }
              else {
                  // exposed for compiled render fn
                  var proxy = (vm._setupProxy = {});
                  for (var key in setupResult) {
                      if (key !== '__sfc') {
                          proxyWithRefUnwrap(proxy, setupResult, key);
                      }
                  }
              }
          }
          else if (setupResult !== undefined) {
              warn$2("setup() should return an object. Received: ".concat(setupResult === null ? 'null' : typeof setupResult));
          }
      }
  }
  function createSetupContext(vm) {
      var exposeCalled = false;
      return {
          get attrs() {
              if (!vm._attrsProxy) {
                  var proxy = (vm._attrsProxy = {});
                  def(proxy, '_v_attr_proxy', true);
                  syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, '$attrs');
              }
              return vm._attrsProxy;
          },
          get listeners() {
              if (!vm._listenersProxy) {
                  var proxy = (vm._listenersProxy = {});
                  syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, '$listeners');
              }
              return vm._listenersProxy;
          },
          get slots() {
              return initSlotsProxy(vm);
          },
          emit: bind$1(vm.$emit, vm),
          expose: function (exposed) {
              {
                  if (exposeCalled) {
                      warn$2("expose() should be called only once per setup().", vm);
                  }
                  exposeCalled = true;
              }
              if (exposed) {
                  Object.keys(exposed).forEach(function (key) {
                      return proxyWithRefUnwrap(vm, exposed, key);
                  });
              }
          }
      };
  }
  function syncSetupProxy(to, from, prev, instance, type) {
      var changed = false;
      for (var key in from) {
          if (!(key in to)) {
              changed = true;
              defineProxyAttr(to, key, instance, type);
          }
          else if (from[key] !== prev[key]) {
              changed = true;
          }
      }
      for (var key in to) {
          if (!(key in from)) {
              changed = true;
              delete to[key];
          }
      }
      return changed;
  }
  function defineProxyAttr(proxy, key, instance, type) {
      Object.defineProperty(proxy, key, {
          enumerable: true,
          configurable: true,
          get: function () {
              return instance[type][key];
          }
      });
  }
  function initSlotsProxy(vm) {
      if (!vm._slotsProxy) {
          syncSetupSlots((vm._slotsProxy = {}), vm.$scopedSlots);
      }
      return vm._slotsProxy;
  }
  function syncSetupSlots(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      for (var key in to) {
          if (!(key in from)) {
              delete to[key];
          }
      }
  }
  /**
   * @internal use manual type def because public setup context type relies on
   * legacy VNode types
   */
  function useSlots() {
      return getContext().slots;
  }
  /**
   * @internal use manual type def because public setup context type relies on
   * legacy VNode types
   */
  function useAttrs() {
      return getContext().attrs;
  }
  /**
   * Vue 2 only
   * @internal use manual type def because public setup context type relies on
   * legacy VNode types
   */
  function useListeners() {
      return getContext().listeners;
  }
  function getContext() {
      if (!currentInstance) {
          warn$2("useContext() called without active instance.");
      }
      var vm = currentInstance;
      return vm._setupContext || (vm._setupContext = createSetupContext(vm));
  }
  /**
   * Runtime helper for merging default declarations. Imported by compiled code
   * only.
   * @internal
   */
  function mergeDefaults(raw, defaults) {
      var props = isArray(raw)
          ? raw.reduce(function (normalized, p) { return ((normalized[p] = {}), normalized); }, {})
          : raw;
      for (var key in defaults) {
          var opt = props[key];
          if (opt) {
              if (isArray(opt) || isFunction(opt)) {
                  props[key] = { type: opt, default: defaults[key] };
              }
              else {
                  opt.default = defaults[key];
              }
          }
          else if (opt === null) {
              props[key] = { default: defaults[key] };
          }
          else {
              warn$2("props default key \"".concat(key, "\" has no corresponding declaration."));
          }
      }
      return props;
  }

  function initRender(vm) {
      vm._vnode = null; // the root of the child tree
      vm._staticTrees = null; // v-once cached trees
      var options = vm.$options;
      var parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
      var renderContext = parentVnode && parentVnode.context;
      vm.$slots = resolveSlots(options._renderChildren, renderContext);
      vm.$scopedSlots = parentVnode
          ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
          : emptyObject;
      // bind the createElement fn to this instance
      // so that we get proper render context inside it.
      // args order: tag, data, children, normalizationType, alwaysNormalize
      // internal version is used by render functions compiled from templates
      // @ts-expect-error
      vm._c = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, false); };
      // normalization is always applied for the public version, used in
      // user-written render functions.
      // @ts-expect-error
      vm.$createElement = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); };
      // $attrs & $listeners are exposed for easier HOC creation.
      // they need to be reactive so that HOCs using them are always updated
      var parentData = parentVnode && parentVnode.data;
      /* istanbul ignore else */
      {
          defineReactive(vm, '$attrs', (parentData && parentData.attrs) || emptyObject, function () {
              !isUpdatingChildComponent && warn$2("$attrs is readonly.", vm);
          }, true);
          defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
              !isUpdatingChildComponent && warn$2("$listeners is readonly.", vm);
          }, true);
      }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue) {
      // install runtime convenience helpers
      installRenderHelpers(Vue.prototype);
      Vue.prototype.$nextTick = function (fn) {
          return nextTick(fn, this);
      };
      Vue.prototype._render = function () {
          var vm = this;
          var _a = vm.$options, render = _a.render, _parentVnode = _a._parentVnode;
          if (_parentVnode && vm._isMounted) {
              vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
              if (vm._slotsProxy) {
                  syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
              }
          }
          // set parent vnode. this allows render functions to have access
          // to the data on the placeholder node.
          vm.$vnode = _parentVnode;
          // render self
          var prevInst = currentInstance;
          var prevRenderInst = currentRenderingInstance;
          var vnode;
          try {
              setCurrentInstance(vm);
              currentRenderingInstance = vm;
              vnode = render.call(vm._renderProxy, vm.$createElement);
          }
          catch (e) {
              handleError(e, vm, "render");
              // return error render result,
              // or previous vnode to prevent render error causing blank component
              /* istanbul ignore else */
              if (vm.$options.renderError) {
                  try {
                      vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                  }
                  catch (e) {
                      handleError(e, vm, "renderError");
                      vnode = vm._vnode;
                  }
              }
              else {
                  vnode = vm._vnode;
              }
          }
          finally {
              currentRenderingInstance = prevRenderInst;
              setCurrentInstance(prevInst);
          }
          // if the returned array contains only a single node, allow it
          if (isArray(vnode) && vnode.length === 1) {
              vnode = vnode[0];
          }
          // return empty vnode in case the render function errored out
          if (!(vnode instanceof VNode)) {
              if (isArray(vnode)) {
                  warn$2('Multiple root nodes returned from render function. Render function ' +
                      'should return a single root node.', vm);
              }
              vnode = createEmptyVNode();
          }
          // set parent
          vnode.parent = _parentVnode;
          return vnode;
      };
  }

  function ensureCtor(comp, base) {
      if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
          comp = comp.default;
      }
      return isObject(comp) ? base.extend(comp) : comp;
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
      var node = createEmptyVNode();
      node.asyncFactory = factory;
      node.asyncMeta = { data: data, context: context, children: children, tag: tag };
      return node;
  }
  function resolveAsyncComponent(factory, baseCtor) {
      if (isTrue(factory.error) && isDef(factory.errorComp)) {
          return factory.errorComp;
      }
      if (isDef(factory.resolved)) {
          return factory.resolved;
      }
      var owner = currentRenderingInstance;
      if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
          // already pending
          factory.owners.push(owner);
      }
      if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
          return factory.loadingComp;
      }
      if (owner && !isDef(factory.owners)) {
          var owners_1 = (factory.owners = [owner]);
          var sync_1 = true;
          var timerLoading_1 = null;
          var timerTimeout_1 = null;
          owner.$on('hook:destroyed', function () { return remove$2(owners_1, owner); });
          var forceRender_1 = function (renderCompleted) {
              for (var i = 0, l = owners_1.length; i < l; i++) {
                  owners_1[i].$forceUpdate();
              }
              if (renderCompleted) {
                  owners_1.length = 0;
                  if (timerLoading_1 !== null) {
                      clearTimeout(timerLoading_1);
                      timerLoading_1 = null;
                  }
                  if (timerTimeout_1 !== null) {
                      clearTimeout(timerTimeout_1);
                      timerTimeout_1 = null;
                  }
              }
          };
          var resolve = once(function (res) {
              // cache resolved
              factory.resolved = ensureCtor(res, baseCtor);
              // invoke callbacks only if this is not a synchronous resolve
              // (async resolves are shimmed as synchronous during SSR)
              if (!sync_1) {
                  forceRender_1(true);
              }
              else {
                  owners_1.length = 0;
              }
          });
          var reject_1 = once(function (reason) {
              warn$2("Failed to resolve async component: ".concat(String(factory)) +
                      (reason ? "\nReason: ".concat(reason) : ''));
              if (isDef(factory.errorComp)) {
                  factory.error = true;
                  forceRender_1(true);
              }
          });
          var res_1 = factory(resolve, reject_1);
          if (isObject(res_1)) {
              if (isPromise(res_1)) {
                  // () => Promise
                  if (isUndef(factory.resolved)) {
                      res_1.then(resolve, reject_1);
                  }
              }
              else if (isPromise(res_1.component)) {
                  res_1.component.then(resolve, reject_1);
                  if (isDef(res_1.error)) {
                      factory.errorComp = ensureCtor(res_1.error, baseCtor);
                  }
                  if (isDef(res_1.loading)) {
                      factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
                      if (res_1.delay === 0) {
                          factory.loading = true;
                      }
                      else {
                          // @ts-expect-error NodeJS timeout type
                          timerLoading_1 = setTimeout(function () {
                              timerLoading_1 = null;
                              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                  factory.loading = true;
                                  forceRender_1(false);
                              }
                          }, res_1.delay || 200);
                      }
                  }
                  if (isDef(res_1.timeout)) {
                      // @ts-expect-error NodeJS timeout type
                      timerTimeout_1 = setTimeout(function () {
                          timerTimeout_1 = null;
                          if (isUndef(factory.resolved)) {
                              reject_1("timeout (".concat(res_1.timeout, "ms)") );
                          }
                      }, res_1.timeout);
                  }
              }
          }
          sync_1 = false;
          // return in case resolved synchronously
          return factory.loading ? factory.loadingComp : factory.resolved;
      }
  }

  function getFirstComponentChild(children) {
      if (isArray(children)) {
          for (var i = 0; i < children.length; i++) {
              var c = children[i];
              if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                  return c;
              }
          }
      }
  }

  function initEvents(vm) {
      vm._events = Object.create(null);
      vm._hasHookEvent = false;
      // init parent attached events
      var listeners = vm.$options._parentListeners;
      if (listeners) {
          updateComponentListeners(vm, listeners);
      }
  }
  var target$1;
  function add$1(event, fn) {
      target$1.$on(event, fn);
  }
  function remove$1(event, fn) {
      target$1.$off(event, fn);
  }
  function createOnceHandler$1(event, fn) {
      var _target = target$1;
      return function onceHandler() {
          var res = fn.apply(null, arguments);
          if (res !== null) {
              _target.$off(event, onceHandler);
          }
      };
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
      target$1 = vm;
      updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
      target$1 = undefined;
  }
  function eventsMixin(Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function (event, fn) {
          var vm = this;
          if (isArray(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                  vm.$on(event[i], fn);
              }
          }
          else {
              (vm._events[event] || (vm._events[event] = [])).push(fn);
              // optimize hook:event cost by using a boolean flag marked at registration
              // instead of a hash lookup
              if (hookRE.test(event)) {
                  vm._hasHookEvent = true;
              }
          }
          return vm;
      };
      Vue.prototype.$once = function (event, fn) {
          var vm = this;
          function on() {
              vm.$off(event, on);
              fn.apply(vm, arguments);
          }
          on.fn = fn;
          vm.$on(event, on);
          return vm;
      };
      Vue.prototype.$off = function (event, fn) {
          var vm = this;
          // all
          if (!arguments.length) {
              vm._events = Object.create(null);
              return vm;
          }
          // array of events
          if (isArray(event)) {
              for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                  vm.$off(event[i_1], fn);
              }
              return vm;
          }
          // specific event
          var cbs = vm._events[event];
          if (!cbs) {
              return vm;
          }
          if (!fn) {
              vm._events[event] = null;
              return vm;
          }
          // specific handler
          var cb;
          var i = cbs.length;
          while (i--) {
              cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                  cbs.splice(i, 1);
                  break;
              }
          }
          return vm;
      };
      Vue.prototype.$emit = function (event) {
          var vm = this;
          {
              var lowerCaseEvent = event.toLowerCase();
              if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                  tip("Event \"".concat(lowerCaseEvent, "\" is emitted in component ") +
                      "".concat(formatComponentName(vm), " but the handler is registered for \"").concat(event, "\". ") +
                      "Note that HTML attributes are case-insensitive and you cannot use " +
                      "v-on to listen to camelCase events when using in-DOM templates. " +
                      "You should probably use \"".concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
              }
          }
          var cbs = vm._events[event];
          if (cbs) {
              cbs = cbs.length > 1 ? toArray(cbs) : cbs;
              var args = toArray(arguments, 1);
              var info = "event handler for \"".concat(event, "\"");
              for (var i = 0, l = cbs.length; i < l; i++) {
                  invokeWithErrorHandling(cbs[i], vm, args, vm, info);
              }
          }
          return vm;
      };
  }

  var activeEffectScope;
  var EffectScope = /** @class */ (function () {
      function EffectScope(detached) {
          if (detached === void 0) { detached = false; }
          this.detached = detached;
          /**
           * @internal
           */
          this.active = true;
          /**
           * @internal
           */
          this.effects = [];
          /**
           * @internal
           */
          this.cleanups = [];
          this.parent = activeEffectScope;
          if (!detached && activeEffectScope) {
              this.index =
                  (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
          }
      }
      EffectScope.prototype.run = function (fn) {
          if (this.active) {
              var currentEffectScope = activeEffectScope;
              try {
                  activeEffectScope = this;
                  return fn();
              }
              finally {
                  activeEffectScope = currentEffectScope;
              }
          }
          else {
              warn$2("cannot run an inactive effect scope.");
          }
      };
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      EffectScope.prototype.on = function () {
          activeEffectScope = this;
      };
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      EffectScope.prototype.off = function () {
          activeEffectScope = this.parent;
      };
      EffectScope.prototype.stop = function (fromParent) {
          if (this.active) {
              var i = void 0, l = void 0;
              for (i = 0, l = this.effects.length; i < l; i++) {
                  this.effects[i].teardown();
              }
              for (i = 0, l = this.cleanups.length; i < l; i++) {
                  this.cleanups[i]();
              }
              if (this.scopes) {
                  for (i = 0, l = this.scopes.length; i < l; i++) {
                      this.scopes[i].stop(true);
                  }
              }
              // nested scope, dereference from parent to avoid memory leaks
              if (!this.detached && this.parent && !fromParent) {
                  // optimized O(1) removal
                  var last = this.parent.scopes.pop();
                  if (last && last !== this) {
                      this.parent.scopes[this.index] = last;
                      last.index = this.index;
                  }
              }
              this.parent = undefined;
              this.active = false;
          }
      };
      return EffectScope;
  }());
  function effectScope(detached) {
      return new EffectScope(detached);
  }
  /**
   * @internal
   */
  function recordEffectScope(effect, scope) {
      if (scope === void 0) { scope = activeEffectScope; }
      if (scope && scope.active) {
          scope.effects.push(effect);
      }
  }
  function getCurrentScope() {
      return activeEffectScope;
  }
  function onScopeDispose(fn) {
      if (activeEffectScope) {
          activeEffectScope.cleanups.push(fn);
      }
      else {
          warn$2("onScopeDispose() is called when there is no active effect scope" +
              " to be associated with.");
      }
  }

  var activeInstance = null;
  var isUpdatingChildComponent = false;
  function setActiveInstance(vm) {
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      return function () {
          activeInstance = prevActiveInstance;
      };
  }
  function initLifecycle(vm) {
      var options = vm.$options;
      // locate first non-abstract parent
      var parent = options.parent;
      if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent;
          }
          parent.$children.push(vm);
      }
      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;
      vm.$children = [];
      vm.$refs = {};
      vm._provided = parent ? parent._provided : Object.create(null);
      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode, hydrating) {
          var vm = this;
          var prevEl = vm.$el;
          var prevVnode = vm._vnode;
          var restoreActiveInstance = setActiveInstance(vm);
          vm._vnode = vnode;
          // Vue.prototype.__patch__ is injected in entry points
          // based on the rendering backend used.
          if (!prevVnode) {
              // initial render
              vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
          }
          else {
              // updates
              vm.$el = vm.__patch__(prevVnode, vnode);
          }
          restoreActiveInstance();
          // update __vue__ reference
          if (prevEl) {
              prevEl.__vue__ = null;
          }
          if (vm.$el) {
              vm.$el.__vue__ = vm;
          }
          // if parent is an HOC, update its $el as well
          var wrapper = vm;
          while (wrapper &&
              wrapper.$vnode &&
              wrapper.$parent &&
              wrapper.$vnode === wrapper.$parent._vnode) {
              wrapper.$parent.$el = wrapper.$el;
              wrapper = wrapper.$parent;
          }
          // updated hook is called by the scheduler to ensure that children are
          // updated in a parent's updated hook.
      };
      Vue.prototype.$forceUpdate = function () {
          var vm = this;
          if (vm._watcher) {
              vm._watcher.update();
          }
      };
      Vue.prototype.$destroy = function () {
          var vm = this;
          if (vm._isBeingDestroyed) {
              return;
          }
          callHook$1(vm, 'beforeDestroy');
          vm._isBeingDestroyed = true;
          // remove self from parent
          var parent = vm.$parent;
          if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
              remove$2(parent.$children, vm);
          }
          // teardown scope. this includes both the render watcher and other
          // watchers created
          vm._scope.stop();
          // remove reference from data ob
          // frozen object may not have observer.
          if (vm._data.__ob__) {
              vm._data.__ob__.vmCount--;
          }
          // call the last hook...
          vm._isDestroyed = true;
          // invoke destroy hooks on current rendered tree
          vm.__patch__(vm._vnode, null);
          // fire destroyed hook
          callHook$1(vm, 'destroyed');
          // turn off all instance listeners.
          vm.$off();
          // remove __vue__ reference
          if (vm.$el) {
              vm.$el.__vue__ = null;
          }
          // release circular reference (#6759)
          if (vm.$vnode) {
              vm.$vnode.parent = null;
          }
      };
  }
  function mountComponent(vm, el, hydrating) {
      vm.$el = el;
      if (!vm.$options.render) {
          // @ts-expect-error invalid type
          vm.$options.render = createEmptyVNode;
          {
              /* istanbul ignore if */
              if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                  vm.$options.el ||
                  el) {
                  warn$2('You are using the runtime-only build of Vue where the template ' +
                      'compiler is not available. Either pre-compile the templates into ' +
                      'render functions, or use the compiler-included build.', vm);
              }
              else {
                  warn$2('Failed to mount component: template or render function not defined.', vm);
              }
          }
      }
      callHook$1(vm, 'beforeMount');
      var updateComponent;
      /* istanbul ignore if */
      if (config.performance && mark) {
          updateComponent = function () {
              var name = vm._name;
              var id = vm._uid;
              var startTag = "vue-perf-start:".concat(id);
              var endTag = "vue-perf-end:".concat(id);
              mark(startTag);
              var vnode = vm._render();
              mark(endTag);
              measure("vue ".concat(name, " render"), startTag, endTag);
              mark(startTag);
              vm._update(vnode, hydrating);
              mark(endTag);
              measure("vue ".concat(name, " patch"), startTag, endTag);
          };
      }
      else {
          updateComponent = function () {
              vm._update(vm._render(), hydrating);
          };
      }
      var watcherOptions = {
          before: function () {
              if (vm._isMounted && !vm._isDestroyed) {
                  callHook$1(vm, 'beforeUpdate');
              }
          }
      };
      {
          watcherOptions.onTrack = function (e) { return callHook$1(vm, 'renderTracked', [e]); };
          watcherOptions.onTrigger = function (e) { return callHook$1(vm, 'renderTriggered', [e]); };
      }
      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
      hydrating = false;
      // flush buffer for flush: "pre" watchers queued in setup()
      var preWatchers = vm._preWatchers;
      if (preWatchers) {
          for (var i = 0; i < preWatchers.length; i++) {
              preWatchers[i].run();
          }
      }
      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
          vm._isMounted = true;
          callHook$1(vm, 'mounted');
      }
      return vm;
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
      {
          isUpdatingChildComponent = true;
      }
      // determine whether component has slot children
      // we need to do this before overwriting $options._renderChildren.
      // check if there are dynamic scopedSlots (hand-written or compiled but with
      // dynamic slot names). Static scoped slots compiled from template has the
      // "$stable" marker.
      var newScopedSlots = parentVnode.data.scopedSlots;
      var oldScopedSlots = vm.$scopedSlots;
      var hasDynamicScopedSlot = !!((newScopedSlots && !newScopedSlots.$stable) ||
          (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
          (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
          (!newScopedSlots && vm.$scopedSlots.$key));
      // Any static slot children from the parent may have changed during parent's
      // update. Dynamic scoped slots may also have changed. In such cases, a forced
      // update is necessary to ensure correctness.
      var needsForceUpdate = !!(renderChildren || // has new static slots
          vm.$options._renderChildren || // has old static slots
          hasDynamicScopedSlot);
      var prevVNode = vm.$vnode;
      vm.$options._parentVnode = parentVnode;
      vm.$vnode = parentVnode; // update vm's placeholder node without re-render
      if (vm._vnode) {
          // update child tree's parent
          vm._vnode.parent = parentVnode;
      }
      vm.$options._renderChildren = renderChildren;
      // update $attrs and $listeners hash
      // these are also reactive so they may trigger child update if the child
      // used them during render
      var attrs = parentVnode.data.attrs || emptyObject;
      if (vm._attrsProxy) {
          // force update if attrs are accessed and has changed since it may be
          // passed to a child component.
          if (syncSetupProxy(vm._attrsProxy, attrs, (prevVNode.data && prevVNode.data.attrs) || emptyObject, vm, '$attrs')) {
              needsForceUpdate = true;
          }
      }
      vm.$attrs = attrs;
      // update listeners
      listeners = listeners || emptyObject;
      var prevListeners = vm.$options._parentListeners;
      if (vm._listenersProxy) {
          syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, '$listeners');
      }
      vm.$listeners = vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, prevListeners);
      // update props
      if (propsData && vm.$options.props) {
          toggleObserving(false);
          var props = vm._props;
          var propKeys = vm.$options._propKeys || [];
          for (var i = 0; i < propKeys.length; i++) {
              var key = propKeys[i];
              var propOptions = vm.$options.props; // wtf flow?
              props[key] = validateProp(key, propOptions, propsData, vm);
          }
          toggleObserving(true);
          // keep a copy of raw propsData
          vm.$options.propsData = propsData;
      }
      // resolve slots + force update if has children
      if (needsForceUpdate) {
          vm.$slots = resolveSlots(renderChildren, parentVnode.context);
          vm.$forceUpdate();
      }
      {
          isUpdatingChildComponent = false;
      }
  }
  function isInInactiveTree(vm) {
      while (vm && (vm = vm.$parent)) {
          if (vm._inactive)
              return true;
      }
      return false;
  }
  function activateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = false;
          if (isInInactiveTree(vm)) {
              return;
          }
      }
      else if (vm._directInactive) {
          return;
      }
      if (vm._inactive || vm._inactive === null) {
          vm._inactive = false;
          for (var i = 0; i < vm.$children.length; i++) {
              activateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, 'activated');
      }
  }
  function deactivateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = true;
          if (isInInactiveTree(vm)) {
              return;
          }
      }
      if (!vm._inactive) {
          vm._inactive = true;
          for (var i = 0; i < vm.$children.length; i++) {
              deactivateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, 'deactivated');
      }
  }
  function callHook$1(vm, hook, args, setContext) {
      if (setContext === void 0) { setContext = true; }
      // #7573 disable dep collection when invoking lifecycle hooks
      pushTarget();
      var prevInst = currentInstance;
      var prevScope = getCurrentScope();
      setContext && setCurrentInstance(vm);
      var handlers = vm.$options[hook];
      var info = "".concat(hook, " hook");
      if (handlers) {
          for (var i = 0, j = handlers.length; i < j; i++) {
              invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
          }
      }
      if (vm._hasHookEvent) {
          vm.$emit('hook:' + hook);
      }
      if (setContext) {
          setCurrentInstance(prevInst);
          prevScope && prevScope.on();
      }
      popTarget();
  }

  var MAX_UPDATE_COUNT = 100;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index$1 = 0;
  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState() {
      index$1 = queue.length = activatedChildren.length = 0;
      has = {};
      {
          circular = {};
      }
      waiting = flushing = false;
  }
  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;
  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;
  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
      var performance_1 = window.performance;
      if (performance_1 &&
          typeof performance_1.now === 'function' &&
          getNow() > document.createEvent('Event').timeStamp) {
          // if the event timestamp, although evaluated AFTER the Date.now(), is
          // smaller than it, it means the event is using a hi-res timestamp,
          // and we need to use the hi-res version for event listener timestamps as
          // well.
          getNow = function () { return performance_1.now(); };
      }
  }
  var sortCompareFn = function (a, b) {
      if (a.post) {
          if (!b.post)
              return 1;
      }
      else if (b.post) {
          return -1;
      }
      return a.id - b.id;
  };
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
      currentFlushTimestamp = getNow();
      flushing = true;
      var watcher, id;
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child)
      // 2. A component's user watchers are run before its render watcher (because
      //    user watchers are created before the render watcher)
      // 3. If a component is destroyed during a parent component's watcher run,
      //    its watchers can be skipped.
      queue.sort(sortCompareFn);
      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      for (index$1 = 0; index$1 < queue.length; index$1++) {
          watcher = queue[index$1];
          if (watcher.before) {
              watcher.before();
          }
          id = watcher.id;
          has[id] = null;
          watcher.run();
          // in dev build, check and stop circular updates.
          if (has[id] != null) {
              circular[id] = (circular[id] || 0) + 1;
              if (circular[id] > MAX_UPDATE_COUNT) {
                  warn$2('You may have an infinite update loop ' +
                      (watcher.user
                          ? "in watcher with expression \"".concat(watcher.expression, "\"")
                          : "in a component render function."), watcher.vm);
                  break;
              }
          }
      }
      // keep copies of post queues before resetting state
      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();
      resetSchedulerState();
      // call component updated and activated hooks
      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);
      cleanupDeps();
      // devtool hook
      /* istanbul ignore if */
      if (devtools && config.devtools) {
          devtools.emit('flush');
      }
  }
  function callUpdatedHooks(queue) {
      var i = queue.length;
      while (i--) {
          var watcher = queue[i];
          var vm = watcher.vm;
          if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
              callHook$1(vm, 'updated');
          }
      }
  }
  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent(vm) {
      // setting _inactive to false here so that a render function can
      // rely on checking whether it's in an inactive tree (e.g. router-view)
      vm._inactive = false;
      activatedChildren.push(vm);
  }
  function callActivatedHooks(queue) {
      for (var i = 0; i < queue.length; i++) {
          queue[i]._inactive = true;
          activateChildComponent(queue[i], true /* true */);
      }
  }
  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher(watcher) {
      var id = watcher.id;
      if (has[id] != null) {
          return;
      }
      if (watcher === Dep.target && watcher.noRecurse) {
          return;
      }
      has[id] = true;
      if (!flushing) {
          queue.push(watcher);
      }
      else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          var i = queue.length - 1;
          while (i > index$1 && queue[i].id > watcher.id) {
              i--;
          }
          queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
          waiting = true;
          if (!config.async) {
              flushSchedulerQueue();
              return;
          }
          nextTick(flushSchedulerQueue);
      }
  }

  var WATCHER = "watcher";
  var WATCHER_CB = "".concat(WATCHER, " callback");
  var WATCHER_GETTER = "".concat(WATCHER, " getter");
  var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
  // Simple effect.
  function watchEffect(effect, options) {
      return doWatch(effect, null, options);
  }
  function watchPostEffect(effect, options) {
      return doWatch(effect, null, (__assign(__assign({}, options), { flush: 'post' }) ));
  }
  function watchSyncEffect(effect, options) {
      return doWatch(effect, null, (__assign(__assign({}, options), { flush: 'sync' }) ));
  }
  // initial value for watchers to trigger on undefined initial values
  var INITIAL_WATCHER_VALUE = {};
  // implementation
  function watch(source, cb, options) {
      if (typeof cb !== 'function') {
          warn$2("`watch(fn, options?)` signature has been moved to a separate API. " +
              "Use `watchEffect(fn, options?)` instead. `watch` now only " +
              "supports `watch(source, cb, options?) signature.");
      }
      return doWatch(source, cb, options);
  }
  function doWatch(source, cb, _a) {
      var _b = _a === void 0 ? emptyObject : _a, immediate = _b.immediate, deep = _b.deep, _c = _b.flush, flush = _c === void 0 ? 'pre' : _c, onTrack = _b.onTrack, onTrigger = _b.onTrigger;
      if (!cb) {
          if (immediate !== undefined) {
              warn$2("watch() \"immediate\" option is only respected when using the " +
                  "watch(source, callback, options?) signature.");
          }
          if (deep !== undefined) {
              warn$2("watch() \"deep\" option is only respected when using the " +
                  "watch(source, callback, options?) signature.");
          }
      }
      var warnInvalidSource = function (s) {
          warn$2("Invalid watch source: ".concat(s, ". A watch source can only be a getter/effect ") +
              "function, a ref, a reactive object, or an array of these types.");
      };
      var instance = currentInstance;
      var call = function (fn, type, args) {
          if (args === void 0) { args = null; }
          var res = invokeWithErrorHandling(fn, null, args, instance, type);
          if (deep && res && res.__ob__)
              res.__ob__.dep.depend();
          return res;
      };
      var getter;
      var forceTrigger = false;
      var isMultiSource = false;
      if (isRef(source)) {
          getter = function () { return source.value; };
          forceTrigger = isShallow(source);
      }
      else if (isReactive(source)) {
          getter = function () {
              source.__ob__.dep.depend();
              return source;
          };
          deep = true;
      }
      else if (isArray(source)) {
          isMultiSource = true;
          forceTrigger = source.some(function (s) { return isReactive(s) || isShallow(s); });
          getter = function () {
              return source.map(function (s) {
                  if (isRef(s)) {
                      return s.value;
                  }
                  else if (isReactive(s)) {
                      s.__ob__.dep.depend();
                      return traverse(s);
                  }
                  else if (isFunction(s)) {
                      return call(s, WATCHER_GETTER);
                  }
                  else {
                      warnInvalidSource(s);
                  }
              });
          };
      }
      else if (isFunction(source)) {
          if (cb) {
              // getter with cb
              getter = function () { return call(source, WATCHER_GETTER); };
          }
          else {
              // no cb -> simple effect
              getter = function () {
                  if (instance && instance._isDestroyed) {
                      return;
                  }
                  if (cleanup) {
                      cleanup();
                  }
                  return call(source, WATCHER, [onCleanup]);
              };
          }
      }
      else {
          getter = noop;
          warnInvalidSource(source);
      }
      if (cb && deep) {
          var baseGetter_1 = getter;
          getter = function () { return traverse(baseGetter_1()); };
      }
      var cleanup;
      var onCleanup = function (fn) {
          cleanup = watcher.onStop = function () {
              call(fn, WATCHER_CLEANUP);
          };
      };
      // in SSR there is no need to setup an actual effect, and it should be noop
      // unless it's eager
      if (isServerRendering()) {
          // we will also not call the invalidate callback (+ runner is not set up)
          onCleanup = noop;
          if (!cb) {
              getter();
          }
          else if (immediate) {
              call(cb, WATCHER_CB, [
                  getter(),
                  isMultiSource ? [] : undefined,
                  onCleanup
              ]);
          }
          return noop;
      }
      var watcher = new Watcher(currentInstance, getter, noop, {
          lazy: true
      });
      watcher.noRecurse = !cb;
      var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      // overwrite default run
      watcher.run = function () {
          if (!watcher.active) {
              return;
          }
          if (cb) {
              // watch(source, cb)
              var newValue = watcher.get();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some(function (v, i) {
                          return hasChanged(v, oldValue[i]);
                      })
                      : hasChanged(newValue, oldValue))) {
                  // cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  call(cb, WATCHER_CB, [
                      newValue,
                      // pass undefined as the old value when it's changed for the first time
                      oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                      onCleanup
                  ]);
                  oldValue = newValue;
              }
          }
          else {
              // watchEffect
              watcher.get();
          }
      };
      if (flush === 'sync') {
          watcher.update = watcher.run;
      }
      else if (flush === 'post') {
          watcher.post = true;
          watcher.update = function () { return queueWatcher(watcher); };
      }
      else {
          // pre
          watcher.update = function () {
              if (instance && instance === currentInstance && !instance._isMounted) {
                  // pre-watcher triggered before
                  var buffer = instance._preWatchers || (instance._preWatchers = []);
                  if (buffer.indexOf(watcher) < 0)
                      buffer.push(watcher);
              }
              else {
                  queueWatcher(watcher);
              }
          };
      }
      {
          watcher.onTrack = onTrack;
          watcher.onTrigger = onTrigger;
      }
      // initial run
      if (cb) {
          if (immediate) {
              watcher.run();
          }
          else {
              oldValue = watcher.get();
          }
      }
      else if (flush === 'post' && instance) {
          instance.$once('hook:mounted', function () { return watcher.get(); });
      }
      else {
          watcher.get();
      }
      return function () {
          watcher.teardown();
      };
  }

  function provide(key, value) {
      if (!currentInstance) {
          {
              warn$2("provide() can only be used inside setup().");
          }
      }
      else {
          // TS doesn't allow symbol as index type
          resolveProvided(currentInstance)[key] = value;
      }
  }
  function resolveProvided(vm) {
      // by default an instance inherits its parent's provides object
      // but when it needs to provide values of its own, it creates its
      // own provides object using parent provides object as prototype.
      // this way in `inject` we can simply look up injections from direct
      // parent and let the prototype chain do the work.
      var existing = vm._provided;
      var parentProvides = vm.$parent && vm.$parent._provided;
      if (parentProvides === existing) {
          return (vm._provided = Object.create(parentProvides));
      }
      else {
          return existing;
      }
  }
  function inject(key, defaultValue, treatDefaultAsFactory) {
      if (treatDefaultAsFactory === void 0) { treatDefaultAsFactory = false; }
      // fallback to `currentRenderingInstance` so that this can be called in
      // a functional component
      var instance = currentInstance;
      if (instance) {
          // #2400
          // to support `app.use` plugins,
          // fallback to appContext's `provides` if the instance is at root
          var provides = instance.$parent && instance.$parent._provided;
          if (provides && key in provides) {
              // TS doesn't allow symbol as index type
              return provides[key];
          }
          else if (arguments.length > 1) {
              return treatDefaultAsFactory && isFunction(defaultValue)
                  ? defaultValue.call(instance)
                  : defaultValue;
          }
          else {
              warn$2("injection \"".concat(String(key), "\" not found."));
          }
      }
      else {
          warn$2("inject() can only be used inside setup() or functional components.");
      }
  }

  /**
   * @internal this function needs manual public type declaration because it relies
   * on previously manually authored types from Vue 2
   */
  function h(type, props, children) {
      if (!currentInstance) {
          warn$2("globally imported h() can only be invoked when there is an active " +
                  "component instance, e.g. synchronously in a component's render or setup function.");
      }
      return createElement$1(currentInstance, type, props, children, 2, true);
  }

  function handleError(err, vm, info) {
      // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
      // See: https://github.com/vuejs/vuex/issues/1505
      pushTarget();
      try {
          if (vm) {
              var cur = vm;
              while ((cur = cur.$parent)) {
                  var hooks = cur.$options.errorCaptured;
                  if (hooks) {
                      for (var i = 0; i < hooks.length; i++) {
                          try {
                              var capture = hooks[i].call(cur, err, vm, info) === false;
                              if (capture)
                                  return;
                          }
                          catch (e) {
                              globalHandleError(e, cur, 'errorCaptured hook');
                          }
                      }
                  }
              }
          }
          globalHandleError(err, vm, info);
      }
      finally {
          popTarget();
      }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
      var res;
      try {
          res = args ? handler.apply(context, args) : handler.call(context);
          if (res && !res._isVue && isPromise(res) && !res._handled) {
              res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
              res._handled = true;
          }
      }
      catch (e) {
          handleError(e, vm, info);
      }
      return res;
  }
  function globalHandleError(err, vm, info) {
      if (config.errorHandler) {
          try {
              return config.errorHandler.call(null, err, vm, info);
          }
          catch (e) {
              // if the user intentionally throws the original error in the handler,
              // do not log it twice
              if (e !== err) {
                  logError(e, null, 'config.errorHandler');
              }
          }
      }
      logError(err, vm, info);
  }
  function logError(err, vm, info) {
      {
          warn$2("Error in ".concat(info, ": \"").concat(err.toString(), "\""), vm);
      }
      /* istanbul ignore else */
      if (inBrowser && typeof console !== 'undefined') {
          console.error(err);
      }
      else {
          throw err;
      }
  }

  /* globals MutationObserver */
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
          copies[i]();
      }
  }
  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;
  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p_1 = Promise.resolve();
      timerFunc = function () {
          p_1.then(flushCallbacks);
          // In problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (isIOS)
              setTimeout(noop);
      };
      isUsingMicroTask = true;
  }
  else if (!isIE &&
      typeof MutationObserver !== 'undefined' &&
      (isNative(MutationObserver) ||
          // PhantomJS and iOS 7.x
          MutationObserver.toString() === '[object MutationObserverConstructor]')) {
      // Use MutationObserver where native Promise is not available,
      // e.g. PhantomJS, iOS7, Android 4.4
      // (#6466 MutationObserver is unreliable in IE11)
      var counter_1 = 1;
      var observer = new MutationObserver(flushCallbacks);
      var textNode_1 = document.createTextNode(String(counter_1));
      observer.observe(textNode_1, {
          characterData: true
      });
      timerFunc = function () {
          counter_1 = (counter_1 + 1) % 2;
          textNode_1.data = String(counter_1);
      };
      isUsingMicroTask = true;
  }
  else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      // Fallback to setImmediate.
      // Technically it leverages the (macro) task queue,
      // but it is still a better choice than setTimeout.
      timerFunc = function () {
          setImmediate(flushCallbacks);
      };
  }
  else {
      // Fallback to setTimeout.
      timerFunc = function () {
          setTimeout(flushCallbacks, 0);
      };
  }
  /**
   * @internal
   */
  function nextTick(cb, ctx) {
      var _resolve;
      callbacks.push(function () {
          if (cb) {
              try {
                  cb.call(ctx);
              }
              catch (e) {
                  handleError(e, ctx, 'nextTick');
              }
          }
          else if (_resolve) {
              _resolve(ctx);
          }
      });
      if (!pending) {
          pending = true;
          timerFunc();
      }
      // $flow-disable-line
      if (!cb && typeof Promise !== 'undefined') {
          return new Promise(function (resolve) {
              _resolve = resolve;
          });
      }
  }

  function useCssModule(name) {
      /* istanbul ignore else */
      {
          {
              warn$2("useCssModule() is not supported in the global build.");
          }
          return emptyObject;
      }
  }

  /**
   * Runtime helper for SFC's CSS variable injection feature.
   * @private
   */
  function useCssVars(getter) {
      if (!inBrowser && !false)
          return;
      var instance = currentInstance;
      if (!instance) {
          warn$2("useCssVars is called without current active component instance.");
          return;
      }
      watchPostEffect(function () {
          var el = instance.$el;
          var vars = getter(instance, instance._setupProxy);
          if (el && el.nodeType === 1) {
              var style = el.style;
              for (var key in vars) {
                  style.setProperty("--".concat(key), vars[key]);
              }
          }
      });
  }

  /**
   * v3-compatible async component API.
   * @internal the type is manually declared in <root>/types/v3-define-async-component.d.ts
   * because it relies on existing manual types
   */
  function defineAsyncComponent(source) {
      if (isFunction(source)) {
          source = { loader: source };
      }
      var loader = source.loader, loadingComponent = source.loadingComponent, errorComponent = source.errorComponent, _a = source.delay, delay = _a === void 0 ? 200 : _a, timeout = source.timeout, // undefined = never times out
      _b = source.suspensible, // undefined = never times out
      suspensible = _b === void 0 ? false : _b, // in Vue 3 default is true
      userOnError = source.onError;
      if (suspensible) {
          warn$2("The suspensible option for async components is not supported in Vue2. It is ignored.");
      }
      var pendingRequest = null;
      var retries = 0;
      var retry = function () {
          retries++;
          pendingRequest = null;
          return load();
      };
      var load = function () {
          var thisRequest;
          return (pendingRequest ||
              (thisRequest = pendingRequest =
                  loader()
                      .catch(function (err) {
                      err = err instanceof Error ? err : new Error(String(err));
                      if (userOnError) {
                          return new Promise(function (resolve, reject) {
                              var userRetry = function () { return resolve(retry()); };
                              var userFail = function () { return reject(err); };
                              userOnError(err, userRetry, userFail, retries + 1);
                          });
                      }
                      else {
                          throw err;
                      }
                  })
                      .then(function (comp) {
                      if (thisRequest !== pendingRequest && pendingRequest) {
                          return pendingRequest;
                      }
                      if (!comp) {
                          warn$2("Async component loader resolved to undefined. " +
                              "If you are using retry(), make sure to return its return value.");
                      }
                      // interop module default
                      if (comp &&
                          (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
                          comp = comp.default;
                      }
                      if (comp && !isObject(comp) && !isFunction(comp)) {
                          throw new Error("Invalid async component load result: ".concat(comp));
                      }
                      return comp;
                  })));
      };
      return function () {
          var component = load();
          return {
              component: component,
              delay: delay,
              timeout: timeout,
              error: errorComponent,
              loading: loadingComponent
          };
      };
  }

  function createLifeCycle(hookName) {
      return function (fn, target) {
          if (target === void 0) { target = currentInstance; }
          if (!target) {
              warn$2("".concat(formatName(hookName), " is called when there is no active component instance to be ") +
                      "associated with. " +
                      "Lifecycle injection APIs can only be used during execution of setup().");
              return;
          }
          return injectHook(target, hookName, fn);
      };
  }
  function formatName(name) {
      if (name === 'beforeDestroy') {
          name = 'beforeUnmount';
      }
      else if (name === 'destroyed') {
          name = 'unmounted';
      }
      return "on".concat(name[0].toUpperCase() + name.slice(1));
  }
  function injectHook(instance, hookName, fn) {
      var options = instance.$options;
      options[hookName] = mergeLifecycleHook(options[hookName], fn);
  }
  var onBeforeMount = createLifeCycle('beforeMount');
  var onMounted = createLifeCycle('mounted');
  var onBeforeUpdate = createLifeCycle('beforeUpdate');
  var onUpdated = createLifeCycle('updated');
  var onBeforeUnmount = createLifeCycle('beforeDestroy');
  var onUnmounted = createLifeCycle('destroyed');
  var onActivated = createLifeCycle('activated');
  var onDeactivated = createLifeCycle('deactivated');
  var onServerPrefetch = createLifeCycle('serverPrefetch');
  var onRenderTracked = createLifeCycle('renderTracked');
  var onRenderTriggered = createLifeCycle('renderTriggered');
  var injectErrorCapturedHook = createLifeCycle('errorCaptured');
  function onErrorCaptured(hook, target) {
      if (target === void 0) { target = currentInstance; }
      injectErrorCapturedHook(hook, target);
  }

  /**
   * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
   */
  var version = '2.7.16';
  /**
   * @internal type is manually declared in <root>/types/v3-define-component.d.ts
   */
  function defineComponent(options) {
      return options;
  }

  var vca = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    defineComponent: defineComponent,
    ref: ref$1,
    shallowRef: shallowRef,
    isRef: isRef,
    toRef: toRef,
    toRefs: toRefs,
    unref: unref,
    proxyRefs: proxyRefs,
    customRef: customRef,
    triggerRef: triggerRef,
    reactive: reactive,
    isReactive: isReactive,
    isReadonly: isReadonly,
    isShallow: isShallow,
    isProxy: isProxy,
    shallowReactive: shallowReactive,
    markRaw: markRaw,
    toRaw: toRaw,
    readonly: readonly,
    shallowReadonly: shallowReadonly,
    computed: computed,
    watch: watch,
    watchEffect: watchEffect,
    watchPostEffect: watchPostEffect,
    watchSyncEffect: watchSyncEffect,
    EffectScope: EffectScope,
    effectScope: effectScope,
    onScopeDispose: onScopeDispose,
    getCurrentScope: getCurrentScope,
    provide: provide,
    inject: inject,
    h: h,
    getCurrentInstance: getCurrentInstance,
    useSlots: useSlots,
    useAttrs: useAttrs,
    useListeners: useListeners,
    mergeDefaults: mergeDefaults,
    nextTick: nextTick,
    set: set,
    del: del,
    useCssModule: useCssModule,
    useCssVars: useCssVars,
    defineAsyncComponent: defineAsyncComponent,
    onBeforeMount: onBeforeMount,
    onMounted: onMounted,
    onBeforeUpdate: onBeforeUpdate,
    onUpdated: onUpdated,
    onBeforeUnmount: onBeforeUnmount,
    onUnmounted: onUnmounted,
    onActivated: onActivated,
    onDeactivated: onDeactivated,
    onServerPrefetch: onServerPrefetch,
    onRenderTracked: onRenderTracked,
    onRenderTriggered: onRenderTriggered,
    onErrorCaptured: onErrorCaptured
  });

  var seenObjects = new _Set();
  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse(val) {
      _traverse(val, seenObjects);
      seenObjects.clear();
      return val;
  }
  function _traverse(val, seen) {
      var i, keys;
      var isA = isArray(val);
      if ((!isA && !isObject(val)) ||
          val.__v_skip /* ReactiveFlags.SKIP */ ||
          Object.isFrozen(val) ||
          val instanceof VNode) {
          return;
      }
      if (val.__ob__) {
          var depId = val.__ob__.dep.id;
          if (seen.has(depId)) {
              return;
          }
          seen.add(depId);
      }
      if (isA) {
          i = val.length;
          while (i--)
              _traverse(val[i], seen);
      }
      else if (isRef(val)) {
          _traverse(val.value, seen);
      }
      else {
          keys = Object.keys(val);
          i = keys.length;
          while (i--)
              _traverse(val[keys[i]], seen);
      }
  }

  var uid$1 = 0;
  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   * @internal
   */
  var Watcher = /** @class */ (function () {
      function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
          recordEffectScope(this, 
          // if the active effect scope is manually created (not a component scope),
          // prioritize it
          activeEffectScope && !activeEffectScope._vm
              ? activeEffectScope
              : vm
                  ? vm._scope
                  : undefined);
          if ((this.vm = vm) && isRenderWatcher) {
              vm._watcher = this;
          }
          // options
          if (options) {
              this.deep = !!options.deep;
              this.user = !!options.user;
              this.lazy = !!options.lazy;
              this.sync = !!options.sync;
              this.before = options.before;
              {
                  this.onTrack = options.onTrack;
                  this.onTrigger = options.onTrigger;
              }
          }
          else {
              this.deep = this.user = this.lazy = this.sync = false;
          }
          this.cb = cb;
          this.id = ++uid$1; // uid for batching
          this.active = true;
          this.post = false;
          this.dirty = this.lazy; // for lazy watchers
          this.deps = [];
          this.newDeps = [];
          this.depIds = new _Set();
          this.newDepIds = new _Set();
          this.expression = expOrFn.toString() ;
          // parse expression for getter
          if (isFunction(expOrFn)) {
              this.getter = expOrFn;
          }
          else {
              this.getter = parsePath(expOrFn);
              if (!this.getter) {
                  this.getter = noop;
                  warn$2("Failed watching path: \"".concat(expOrFn, "\" ") +
                          'Watcher only accepts simple dot-delimited paths. ' +
                          'For full control, use a function instead.', vm);
              }
          }
          this.value = this.lazy ? undefined : this.get();
      }
      /**
       * Evaluate the getter, and re-collect dependencies.
       */
      Watcher.prototype.get = function () {
          pushTarget(this);
          var value;
          var vm = this.vm;
          try {
              value = this.getter.call(vm, vm);
          }
          catch (e) {
              if (this.user) {
                  handleError(e, vm, "getter for watcher \"".concat(this.expression, "\""));
              }
              else {
                  throw e;
              }
          }
          finally {
              // "touch" every property so they are all tracked as
              // dependencies for deep watching
              if (this.deep) {
                  traverse(value);
              }
              popTarget();
              this.cleanupDeps();
          }
          return value;
      };
      /**
       * Add a dependency to this directive.
       */
      Watcher.prototype.addDep = function (dep) {
          var id = dep.id;
          if (!this.newDepIds.has(id)) {
              this.newDepIds.add(id);
              this.newDeps.push(dep);
              if (!this.depIds.has(id)) {
                  dep.addSub(this);
              }
          }
      };
      /**
       * Clean up for dependency collection.
       */
      Watcher.prototype.cleanupDeps = function () {
          var i = this.deps.length;
          while (i--) {
              var dep = this.deps[i];
              if (!this.newDepIds.has(dep.id)) {
                  dep.removeSub(this);
              }
          }
          var tmp = this.depIds;
          this.depIds = this.newDepIds;
          this.newDepIds = tmp;
          this.newDepIds.clear();
          tmp = this.deps;
          this.deps = this.newDeps;
          this.newDeps = tmp;
          this.newDeps.length = 0;
      };
      /**
       * Subscriber interface.
       * Will be called when a dependency changes.
       */
      Watcher.prototype.update = function () {
          /* istanbul ignore else */
          if (this.lazy) {
              this.dirty = true;
          }
          else if (this.sync) {
              this.run();
          }
          else {
              queueWatcher(this);
          }
      };
      /**
       * Scheduler job interface.
       * Will be called by the scheduler.
       */
      Watcher.prototype.run = function () {
          if (this.active) {
              var value = this.get();
              if (value !== this.value ||
                  // Deep watchers and watchers on Object/Arrays should fire even
                  // when the value is the same, because the value may
                  // have mutated.
                  isObject(value) ||
                  this.deep) {
                  // set new value
                  var oldValue = this.value;
                  this.value = value;
                  if (this.user) {
                      var info = "callback for watcher \"".concat(this.expression, "\"");
                      invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
                  }
                  else {
                      this.cb.call(this.vm, value, oldValue);
                  }
              }
          }
      };
      /**
       * Evaluate the value of the watcher.
       * This only gets called for lazy watchers.
       */
      Watcher.prototype.evaluate = function () {
          this.value = this.get();
          this.dirty = false;
      };
      /**
       * Depend on all deps collected by this watcher.
       */
      Watcher.prototype.depend = function () {
          var i = this.deps.length;
          while (i--) {
              this.deps[i].depend();
          }
      };
      /**
       * Remove self from all dependencies' subscriber list.
       */
      Watcher.prototype.teardown = function () {
          if (this.vm && !this.vm._isBeingDestroyed) {
              remove$2(this.vm._scope.effects, this);
          }
          if (this.active) {
              var i = this.deps.length;
              while (i--) {
                  this.deps[i].removeSub(this);
              }
              this.active = false;
              if (this.onStop) {
                  this.onStop();
              }
          }
      };
      return Watcher;
  }());

  var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop,
      set: noop
  };
  function proxy(target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
          return this[sourceKey][key];
      };
      sharedPropertyDefinition.set = function proxySetter(val) {
          this[sourceKey][key] = val;
      };
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function initState(vm) {
      var opts = vm.$options;
      if (opts.props)
          initProps$1(vm, opts.props);
      // Composition API
      initSetup(vm);
      if (opts.methods)
          initMethods(vm, opts.methods);
      if (opts.data) {
          initData(vm);
      }
      else {
          var ob = observe((vm._data = {}));
          ob && ob.vmCount++;
      }
      if (opts.computed)
          initComputed$1(vm, opts.computed);
      if (opts.watch && opts.watch !== nativeWatch) {
          initWatch(vm, opts.watch);
      }
  }
  function initProps$1(vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = (vm._props = shallowReactive({}));
      // cache prop keys so that future props updates can iterate using Array
      // instead of dynamic object key enumeration.
      var keys = (vm.$options._propKeys = []);
      var isRoot = !vm.$parent;
      // root instance props should be converted
      if (!isRoot) {
          toggleObserving(false);
      }
      var _loop_1 = function (key) {
          keys.push(key);
          var value = validateProp(key, propsOptions, propsData, vm);
          /* istanbul ignore else */
          {
              var hyphenatedKey = hyphenate(key);
              if (isReservedAttribute(hyphenatedKey) ||
                  config.isReservedAttr(hyphenatedKey)) {
                  warn$2("\"".concat(hyphenatedKey, "\" is a reserved attribute and cannot be used as component prop."), vm);
              }
              defineReactive(props, key, value, function () {
                  if (!isRoot && !isUpdatingChildComponent) {
                      warn$2("Avoid mutating a prop directly since the value will be " +
                          "overwritten whenever the parent component re-renders. " +
                          "Instead, use a data or computed property based on the prop's " +
                          "value. Prop being mutated: \"".concat(key, "\""), vm);
                  }
              }, true /* shallow */);
          }
          // static props are already proxied on the component's prototype
          // during Vue.extend(). We only need to proxy props defined at
          // instantiation here.
          if (!(key in vm)) {
              proxy(vm, "_props", key);
          }
      };
      for (var key in propsOptions) {
          _loop_1(key);
      }
      toggleObserving(true);
  }
  function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
      if (!isPlainObject(data)) {
          data = {};
          warn$2('data functions should return an object:\n' +
                  'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
      }
      // proxy data on instance
      var keys = Object.keys(data);
      var props = vm.$options.props;
      var methods = vm.$options.methods;
      var i = keys.length;
      while (i--) {
          var key = keys[i];
          {
              if (methods && hasOwn(methods, key)) {
                  warn$2("Method \"".concat(key, "\" has already been defined as a data property."), vm);
              }
          }
          if (props && hasOwn(props, key)) {
              warn$2("The data property \"".concat(key, "\" is already declared as a prop. ") +
                      "Use prop default value instead.", vm);
          }
          else if (!isReserved(key)) {
              proxy(vm, "_data", key);
          }
      }
      // observe data
      var ob = observe(data);
      ob && ob.vmCount++;
  }
  function getData(data, vm) {
      // #7573 disable dep collection when invoking data getters
      pushTarget();
      try {
          return data.call(vm, vm);
      }
      catch (e) {
          handleError(e, vm, "data()");
          return {};
      }
      finally {
          popTarget();
      }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed$1(vm, computed) {
      // $flow-disable-line
      var watchers = (vm._computedWatchers = Object.create(null));
      // computed properties are just getters during SSR
      var isSSR = isServerRendering();
      for (var key in computed) {
          var userDef = computed[key];
          var getter = isFunction(userDef) ? userDef : userDef.get;
          if (getter == null) {
              warn$2("Getter is missing for computed property \"".concat(key, "\"."), vm);
          }
          if (!isSSR) {
              // create internal watcher for the computed property.
              watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
          }
          // component-defined computed properties are already defined on the
          // component prototype. We only need to define computed properties defined
          // at instantiation here.
          if (!(key in vm)) {
              defineComputed(vm, key, userDef);
          }
          else {
              if (key in vm.$data) {
                  warn$2("The computed property \"".concat(key, "\" is already defined in data."), vm);
              }
              else if (vm.$options.props && key in vm.$options.props) {
                  warn$2("The computed property \"".concat(key, "\" is already defined as a prop."), vm);
              }
              else if (vm.$options.methods && key in vm.$options.methods) {
                  warn$2("The computed property \"".concat(key, "\" is already defined as a method."), vm);
              }
          }
      }
  }
  function defineComputed(target, key, userDef) {
      var shouldCache = !isServerRendering();
      if (isFunction(userDef)) {
          sharedPropertyDefinition.get = shouldCache
              ? createComputedGetter(key)
              : createGetterInvoker(userDef);
          sharedPropertyDefinition.set = noop;
      }
      else {
          sharedPropertyDefinition.get = userDef.get
              ? shouldCache && userDef.cache !== false
                  ? createComputedGetter(key)
                  : createGetterInvoker(userDef.get)
              : noop;
          sharedPropertyDefinition.set = userDef.set || noop;
      }
      if (sharedPropertyDefinition.set === noop) {
          sharedPropertyDefinition.set = function () {
              warn$2("Computed property \"".concat(key, "\" was assigned to but it has no setter."), this);
          };
      }
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
      return function computedGetter() {
          var watcher = this._computedWatchers && this._computedWatchers[key];
          if (watcher) {
              if (watcher.dirty) {
                  watcher.evaluate();
              }
              if (Dep.target) {
                  if (Dep.target.onTrack) {
                      Dep.target.onTrack({
                          effect: Dep.target,
                          target: this,
                          type: "get" /* TrackOpTypes.GET */,
                          key: key
                      });
                  }
                  watcher.depend();
              }
              return watcher.value;
          }
      };
  }
  function createGetterInvoker(fn) {
      return function computedGetter() {
          return fn.call(this, this);
      };
  }
  function initMethods(vm, methods) {
      var props = vm.$options.props;
      for (var key in methods) {
          {
              if (typeof methods[key] !== 'function') {
                  warn$2("Method \"".concat(key, "\" has type \"").concat(typeof methods[key], "\" in the component definition. ") +
                      "Did you reference the function correctly?", vm);
              }
              if (props && hasOwn(props, key)) {
                  warn$2("Method \"".concat(key, "\" has already been defined as a prop."), vm);
              }
              if (key in vm && isReserved(key)) {
                  warn$2("Method \"".concat(key, "\" conflicts with an existing Vue instance method. ") +
                      "Avoid defining component methods that start with _ or $.");
              }
          }
          vm[key] = typeof methods[key] !== 'function' ? noop : bind$1(methods[key], vm);
      }
  }
  function initWatch(vm, watch) {
      for (var key in watch) {
          var handler = watch[key];
          if (isArray(handler)) {
              for (var i = 0; i < handler.length; i++) {
                  createWatcher(vm, key, handler[i]);
              }
          }
          else {
              createWatcher(vm, key, handler);
          }
      }
  }
  function createWatcher(vm, expOrFn, handler, options) {
      if (isPlainObject(handler)) {
          options = handler;
          handler = handler.handler;
      }
      if (typeof handler === 'string') {
          handler = vm[handler];
      }
      return vm.$watch(expOrFn, handler, options);
  }
  function stateMixin(Vue) {
      // flow somehow has problems with directly declared definition object
      // when using Object.defineProperty, so we have to procedurally build up
      // the object here.
      var dataDef = {};
      dataDef.get = function () {
          return this._data;
      };
      var propsDef = {};
      propsDef.get = function () {
          return this._props;
      };
      {
          dataDef.set = function () {
              warn$2('Avoid replacing instance root $data. ' +
                  'Use nested data properties instead.', this);
          };
          propsDef.set = function () {
              warn$2("$props is readonly.", this);
          };
      }
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);
      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;
      Vue.prototype.$watch = function (expOrFn, cb, options) {
          var vm = this;
          if (isPlainObject(cb)) {
              return createWatcher(vm, expOrFn, cb, options);
          }
          options = options || {};
          options.user = true;
          var watcher = new Watcher(vm, expOrFn, cb, options);
          if (options.immediate) {
              var info = "callback for immediate watcher \"".concat(watcher.expression, "\"");
              pushTarget();
              invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
              popTarget();
          }
          return function unwatchFn() {
              watcher.teardown();
          };
      };
  }

  function initProvide(vm) {
      var provideOption = vm.$options.provide;
      if (provideOption) {
          var provided = isFunction(provideOption)
              ? provideOption.call(vm)
              : provideOption;
          if (!isObject(provided)) {
              return;
          }
          var source = resolveProvided(vm);
          // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
          // iterate the keys ourselves.
          var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
          }
      }
  }
  function initInjections(vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
          toggleObserving(false);
          Object.keys(result).forEach(function (key) {
              /* istanbul ignore else */
              {
                  defineReactive(vm, key, result[key], function () {
                      warn$2("Avoid mutating an injected value directly since the changes will be " +
                          "overwritten whenever the provided component re-renders. " +
                          "injection being mutated: \"".concat(key, "\""), vm);
                  });
              }
          });
          toggleObserving(true);
      }
  }
  function resolveInject(inject, vm) {
      if (inject) {
          // inject is :any because flow is not smart enough to figure out cached
          var result = Object.create(null);
          var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              // #6574 in case the inject object is observed...
              if (key === '__ob__')
                  continue;
              var provideKey = inject[key].from;
              if (provideKey in vm._provided) {
                  result[key] = vm._provided[provideKey];
              }
              else if ('default' in inject[key]) {
                  var provideDefault = inject[key].default;
                  result[key] = isFunction(provideDefault)
                      ? provideDefault.call(vm)
                      : provideDefault;
              }
              else {
                  warn$2("Injection \"".concat(key, "\" not found"), vm);
              }
          }
          return result;
      }
  }

  var uid = 0;
  function initMixin$1(Vue) {
      Vue.prototype._init = function (options) {
          var vm = this;
          // a uid
          vm._uid = uid++;
          var startTag, endTag;
          /* istanbul ignore if */
          if (config.performance && mark) {
              startTag = "vue-perf-start:".concat(vm._uid);
              endTag = "vue-perf-end:".concat(vm._uid);
              mark(startTag);
          }
          // a flag to mark this as a Vue instance without having to do instanceof
          // check
          vm._isVue = true;
          // avoid instances from being observed
          vm.__v_skip = true;
          // effect scope
          vm._scope = new EffectScope(true /* detached */);
          // #13134 edge case where a child component is manually created during the
          // render of a parent component
          vm._scope.parent = undefined;
          vm._scope._vm = true;
          // merge options
          if (options && options._isComponent) {
              // optimize internal component instantiation
              // since dynamic options merging is pretty slow, and none of the
              // internal component options needs special treatment.
              initInternalComponent(vm, options);
          }
          else {
              vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
          }
          /* istanbul ignore else */
          {
              initProxy(vm);
          }
          // expose real self
          vm._self = vm;
          initLifecycle(vm);
          initEvents(vm);
          initRender(vm);
          callHook$1(vm, 'beforeCreate', undefined, false /* setContext */);
          initInjections(vm); // resolve injections before data/props
          initState(vm);
          initProvide(vm); // resolve provide after data/props
          callHook$1(vm, 'created');
          /* istanbul ignore if */
          if (config.performance && mark) {
              vm._name = formatComponentName(vm, false);
              mark(endTag);
              measure("vue ".concat(vm._name, " init"), startTag, endTag);
          }
          if (vm.$options.el) {
              vm.$mount(vm.$options.el);
          }
      };
  }
  function initInternalComponent(vm, options) {
      var opts = (vm.$options = Object.create(vm.constructor.options));
      // doing this because it's faster than dynamic enumeration.
      var parentVnode = options._parentVnode;
      opts.parent = options.parent;
      opts._parentVnode = parentVnode;
      var vnodeComponentOptions = parentVnode.componentOptions;
      opts.propsData = vnodeComponentOptions.propsData;
      opts._parentListeners = vnodeComponentOptions.listeners;
      opts._renderChildren = vnodeComponentOptions.children;
      opts._componentTag = vnodeComponentOptions.tag;
      if (options.render) {
          opts.render = options.render;
          opts.staticRenderFns = options.staticRenderFns;
      }
  }
  function resolveConstructorOptions(Ctor) {
      var options = Ctor.options;
      if (Ctor.super) {
          var superOptions = resolveConstructorOptions(Ctor.super);
          var cachedSuperOptions = Ctor.superOptions;
          if (superOptions !== cachedSuperOptions) {
              // super option changed,
              // need to resolve new options.
              Ctor.superOptions = superOptions;
              // check if there are any late-modified/attached options (#4976)
              var modifiedOptions = resolveModifiedOptions(Ctor);
              // update base extend options
              if (modifiedOptions) {
                  extend(Ctor.extendOptions, modifiedOptions);
              }
              options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
              if (options.name) {
                  options.components[options.name] = Ctor;
              }
          }
      }
      return options;
  }
  function resolveModifiedOptions(Ctor) {
      var modified;
      var latest = Ctor.options;
      var sealed = Ctor.sealedOptions;
      for (var key in latest) {
          if (latest[key] !== sealed[key]) {
              if (!modified)
                  modified = {};
              modified[key] = latest[key];
          }
      }
      return modified;
  }

  function FunctionalRenderContext(data, props, children, parent, Ctor) {
      var _this = this;
      var options = Ctor.options;
      // ensure the createElement function in functional components
      // gets a unique context - this is necessary for correct named slot check
      var contextVm;
      if (hasOwn(parent, '_uid')) {
          contextVm = Object.create(parent);
          contextVm._original = parent;
      }
      else {
          // the context vm passed in is a functional context as well.
          // in this case we want to make sure we are able to get a hold to the
          // real context instance.
          contextVm = parent;
          // @ts-ignore
          parent = parent._original;
      }
      var isCompiled = isTrue(options._compiled);
      var needNormalization = !isCompiled;
      this.data = data;
      this.props = props;
      this.children = children;
      this.parent = parent;
      this.listeners = data.on || emptyObject;
      this.injections = resolveInject(options.inject, parent);
      this.slots = function () {
          if (!_this.$slots) {
              normalizeScopedSlots(parent, data.scopedSlots, (_this.$slots = resolveSlots(children, parent)));
          }
          return _this.$slots;
      };
      Object.defineProperty(this, 'scopedSlots', {
          enumerable: true,
          get: function () {
              return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
          }
      });
      // support for compiled functional template
      if (isCompiled) {
          // exposing $options for renderStatic()
          this.$options = options;
          // pre-resolve slots for renderSlot()
          this.$slots = this.slots();
          this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
      }
      if (options._scopeId) {
          this._c = function (a, b, c, d) {
              var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
              if (vnode && !isArray(vnode)) {
                  vnode.fnScopeId = options._scopeId;
                  vnode.fnContext = parent;
              }
              return vnode;
          };
      }
      else {
          this._c = function (a, b, c, d) {
              return createElement$1(contextVm, a, b, c, d, needNormalization);
          };
      }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
      var options = Ctor.options;
      var props = {};
      var propOptions = options.props;
      if (isDef(propOptions)) {
          for (var key in propOptions) {
              props[key] = validateProp(key, propOptions, propsData || emptyObject);
          }
      }
      else {
          if (isDef(data.attrs))
              mergeProps(props, data.attrs);
          if (isDef(data.props))
              mergeProps(props, data.props);
      }
      var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
      var vnode = options.render.call(null, renderContext._c, renderContext);
      if (vnode instanceof VNode) {
          return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
      }
      else if (isArray(vnode)) {
          var vnodes = normalizeChildren(vnode) || [];
          var res = new Array(vnodes.length);
          for (var i = 0; i < vnodes.length; i++) {
              res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
          }
          return res;
      }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
      // #7817 clone node before setting fnContext, otherwise if the node is reused
      // (e.g. it was from a cached normal slot) the fnContext causes named slots
      // that should not be matched to match.
      var clone = cloneVNode(vnode);
      clone.fnContext = contextVm;
      clone.fnOptions = options;
      {
          (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext =
              renderContext;
      }
      if (data.slot) {
          (clone.data || (clone.data = {})).slot = data.slot;
      }
      return clone;
  }
  function mergeProps(to, from) {
      for (var key in from) {
          to[camelize(key)] = from[key];
      }
  }

  function getComponentName(options) {
      return options.name || options.__name || options._componentTag;
  }
  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
      init: function (vnode, hydrating) {
          if (vnode.componentInstance &&
              !vnode.componentInstance._isDestroyed &&
              vnode.data.keepAlive) {
              // kept-alive components, treat as a patch
              var mountedNode = vnode; // work around flow
              componentVNodeHooks.prepatch(mountedNode, mountedNode);
          }
          else {
              var child = (vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance));
              child.$mount(hydrating ? vnode.elm : undefined, hydrating);
          }
      },
      prepatch: function (oldVnode, vnode) {
          var options = vnode.componentOptions;
          var child = (vnode.componentInstance = oldVnode.componentInstance);
          updateChildComponent(child, options.propsData, // updated props
          options.listeners, // updated listeners
          vnode, // new parent vnode
          options.children // new children
          );
      },
      insert: function (vnode) {
          var context = vnode.context, componentInstance = vnode.componentInstance;
          if (!componentInstance._isMounted) {
              componentInstance._isMounted = true;
              callHook$1(componentInstance, 'mounted');
          }
          if (vnode.data.keepAlive) {
              if (context._isMounted) {
                  // vue-router#1212
                  // During updates, a kept-alive component's child components may
                  // change, so directly walking the tree here may call activated hooks
                  // on incorrect children. Instead we push them into a queue which will
                  // be processed after the whole patch process ended.
                  queueActivatedComponent(componentInstance);
              }
              else {
                  activateChildComponent(componentInstance, true /* direct */);
              }
          }
      },
      destroy: function (vnode) {
          var componentInstance = vnode.componentInstance;
          if (!componentInstance._isDestroyed) {
              if (!vnode.data.keepAlive) {
                  componentInstance.$destroy();
              }
              else {
                  deactivateChildComponent(componentInstance, true /* direct */);
              }
          }
      }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
      if (isUndef(Ctor)) {
          return;
      }
      var baseCtor = context.$options._base;
      // plain options object: turn it into a constructor
      if (isObject(Ctor)) {
          Ctor = baseCtor.extend(Ctor);
      }
      // if at this stage it's not a constructor or an async component factory,
      // reject.
      if (typeof Ctor !== 'function') {
          {
              warn$2("Invalid Component definition: ".concat(String(Ctor)), context);
          }
          return;
      }
      // async component
      var asyncFactory;
      // @ts-expect-error
      if (isUndef(Ctor.cid)) {
          asyncFactory = Ctor;
          Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
          if (Ctor === undefined) {
              // return a placeholder node for async component, which is rendered
              // as a comment node but preserves all the raw information for the node.
              // the information will be used for async server-rendering and hydration.
              return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
          }
      }
      data = data || {};
      // resolve constructor options in case global mixins are applied after
      // component constructor creation
      resolveConstructorOptions(Ctor);
      // transform component v-model data into props & events
      if (isDef(data.model)) {
          // @ts-expect-error
          transformModel(Ctor.options, data);
      }
      // extract props
      // @ts-expect-error
      var propsData = extractPropsFromVNodeData(data, Ctor, tag);
      // functional component
      // @ts-expect-error
      if (isTrue(Ctor.options.functional)) {
          return createFunctionalComponent(Ctor, propsData, data, context, children);
      }
      // extract listeners, since these needs to be treated as
      // child component listeners instead of DOM listeners
      var listeners = data.on;
      // replace with listeners with .native modifier
      // so it gets processed during parent component patch.
      data.on = data.nativeOn;
      // @ts-expect-error
      if (isTrue(Ctor.options.abstract)) {
          // abstract components do not keep anything
          // other than props & listeners & slot
          // work around flow
          var slot = data.slot;
          data = {};
          if (slot) {
              data.slot = slot;
          }
      }
      // install component management hooks onto the placeholder node
      installComponentHooks(data);
      // return a placeholder vnode
      // @ts-expect-error
      var name = getComponentName(Ctor.options) || tag;
      var vnode = new VNode(
      // @ts-expect-error
      "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ''), data, undefined, undefined, undefined, context, 
      // @ts-expect-error
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
      return vnode;
  }
  function createComponentInstanceForVnode(
  // we know it's MountedComponentVNode but flow doesn't
  vnode, 
  // activeInstance in lifecycle state
  parent) {
      var options = {
          _isComponent: true,
          _parentVnode: vnode,
          parent: parent
      };
      // check inline-template render functions
      var inlineTemplate = vnode.data.inlineTemplate;
      if (isDef(inlineTemplate)) {
          options.render = inlineTemplate.render;
          options.staticRenderFns = inlineTemplate.staticRenderFns;
      }
      return new vnode.componentOptions.Ctor(options);
  }
  function installComponentHooks(data) {
      var hooks = data.hook || (data.hook = {});
      for (var i = 0; i < hooksToMerge.length; i++) {
          var key = hooksToMerge[i];
          var existing = hooks[key];
          var toMerge = componentVNodeHooks[key];
          // @ts-expect-error
          if (existing !== toMerge && !(existing && existing._merged)) {
              hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
          }
      }
  }
  function mergeHook(f1, f2) {
      var merged = function (a, b) {
          // flow complains about extra args which is why we use any
          f1(a, b);
          f2(a, b);
      };
      merged._merged = true;
      return merged;
  }
  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel(options, data) {
      var prop = (options.model && options.model.prop) || 'value';
      var event = (options.model && options.model.event) || 'input';
      (data.attrs || (data.attrs = {}))[prop] = data.model.value;
      var on = data.on || (data.on = {});
      var existing = on[event];
      var callback = data.model.callback;
      if (isDef(existing)) {
          if (isArray(existing)
              ? existing.indexOf(callback) === -1
              : existing !== callback) {
              on[event] = [callback].concat(existing);
          }
      }
      else {
          on[event] = callback;
      }
  }

  var warn$2 = noop;
  var tip = noop;
  var generateComponentTrace; // work around flow check
  var formatComponentName;
  {
      var hasConsole_1 = typeof console !== 'undefined';
      var classifyRE_1 = /(?:^|[-_])(\w)/g;
      var classify_1 = function (str) {
          return str.replace(classifyRE_1, function (c) { return c.toUpperCase(); }).replace(/[-_]/g, '');
      };
      warn$2 = function (msg, vm) {
          if (vm === void 0) { vm = currentInstance; }
          var trace = vm ? generateComponentTrace(vm) : '';
          if (config.warnHandler) {
              config.warnHandler.call(null, msg, vm, trace);
          }
          else if (hasConsole_1 && !config.silent) {
              console.error("[Vue warn]: ".concat(msg).concat(trace));
          }
      };
      tip = function (msg, vm) {
          if (hasConsole_1 && !config.silent) {
              console.warn("[Vue tip]: ".concat(msg) + (vm ? generateComponentTrace(vm) : ''));
          }
      };
      formatComponentName = function (vm, includeFile) {
          if (vm.$root === vm) {
              return '<Root>';
          }
          var options = isFunction(vm) && vm.cid != null
              ? vm.options
              : vm._isVue
                  ? vm.$options || vm.constructor.options
                  : vm;
          var name = getComponentName(options);
          var file = options.__file;
          if (!name && file) {
              var match = file.match(/([^/\\]+)\.vue$/);
              name = match && match[1];
          }
          return ((name ? "<".concat(classify_1(name), ">") : "<Anonymous>") +
              (file && includeFile !== false ? " at ".concat(file) : ''));
      };
      var repeat_1 = function (str, n) {
          var res = '';
          while (n) {
              if (n % 2 === 1)
                  res += str;
              if (n > 1)
                  str += str;
              n >>= 1;
          }
          return res;
      };
      generateComponentTrace = function (vm) {
          if (vm._isVue && vm.$parent) {
              var tree = [];
              var currentRecursiveSequence = 0;
              while (vm) {
                  if (tree.length > 0) {
                      var last = tree[tree.length - 1];
                      if (last.constructor === vm.constructor) {
                          currentRecursiveSequence++;
                          vm = vm.$parent;
                          continue;
                      }
                      else if (currentRecursiveSequence > 0) {
                          tree[tree.length - 1] = [last, currentRecursiveSequence];
                          currentRecursiveSequence = 0;
                      }
                  }
                  tree.push(vm);
                  vm = vm.$parent;
              }
              return ('\n\nfound in\n\n' +
                  tree
                      .map(function (vm, i) {
                      return "".concat(i === 0 ? '---> ' : repeat_1(' ', 5 + i * 2)).concat(isArray(vm)
                          ? "".concat(formatComponentName(vm[0]), "... (").concat(vm[1], " recursive calls)")
                          : formatComponentName(vm));
                  })
                      .join('\n'));
          }
          else {
              return "\n\n(found in ".concat(formatComponentName(vm), ")");
          }
      };
  }

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;
  /**
   * Options with restrictions
   */
  {
      strats.el = strats.propsData = function (parent, child, vm, key) {
          if (!vm) {
              warn$2("option \"".concat(key, "\" can only be used during instance ") +
                  'creation with the `new` keyword.');
          }
          return defaultStrat(parent, child);
      };
  }
  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData(to, from, recursive) {
      if (recursive === void 0) { recursive = true; }
      if (!from)
          return to;
      var key, toVal, fromVal;
      var keys = hasSymbol
          ? Reflect.ownKeys(from)
          : Object.keys(from);
      for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          // in case the object is already observed...
          if (key === '__ob__')
              continue;
          toVal = to[key];
          fromVal = from[key];
          if (!recursive || !hasOwn(to, key)) {
              set(to, key, fromVal);
          }
          else if (toVal !== fromVal &&
              isPlainObject(toVal) &&
              isPlainObject(fromVal)) {
              mergeData(toVal, fromVal);
          }
      }
      return to;
  }
  /**
   * Data
   */
  function mergeDataOrFn(parentVal, childVal, vm) {
      if (!vm) {
          // in a Vue.extend merge, both should be functions
          if (!childVal) {
              return parentVal;
          }
          if (!parentVal) {
              return childVal;
          }
          // when parentVal & childVal are both present,
          // we need to return a function that returns the
          // merged result of both functions... no need to
          // check if parentVal is a function here because
          // it has to be a function to pass previous merges.
          return function mergedDataFn() {
              return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
          };
      }
      else {
          return function mergedInstanceDataFn() {
              // instance merge
              var instanceData = isFunction(childVal)
                  ? childVal.call(vm, vm)
                  : childVal;
              var defaultData = isFunction(parentVal)
                  ? parentVal.call(vm, vm)
                  : parentVal;
              if (instanceData) {
                  return mergeData(instanceData, defaultData);
              }
              else {
                  return defaultData;
              }
          };
      }
  }
  strats.data = function (parentVal, childVal, vm) {
      if (!vm) {
          if (childVal && typeof childVal !== 'function') {
              warn$2('The "data" option should be a function ' +
                      'that returns a per-instance value in component ' +
                      'definitions.', vm);
              return parentVal;
          }
          return mergeDataOrFn(parentVal, childVal);
      }
      return mergeDataOrFn(parentVal, childVal, vm);
  };
  /**
   * Hooks and props are merged as arrays.
   */
  function mergeLifecycleHook(parentVal, childVal) {
      var res = childVal
          ? parentVal
              ? parentVal.concat(childVal)
              : isArray(childVal)
                  ? childVal
                  : [childVal]
          : parentVal;
      return res ? dedupeHooks(res) : res;
  }
  function dedupeHooks(hooks) {
      var res = [];
      for (var i = 0; i < hooks.length; i++) {
          if (res.indexOf(hooks[i]) === -1) {
              res.push(hooks[i]);
          }
      }
      return res;
  }
  LIFECYCLE_HOOKS.forEach(function (hook) {
      strats[hook] = mergeLifecycleHook;
  });
  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets(parentVal, childVal, vm, key) {
      var res = Object.create(parentVal || null);
      if (childVal) {
          assertObjectType(key, childVal, vm);
          return extend(res, childVal);
      }
      else {
          return res;
      }
  }
  ASSET_TYPES.forEach(function (type) {
      strats[type + 's'] = mergeAssets;
  });
  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (parentVal, childVal, vm, key) {
      // work around Firefox's Object.prototype.watch...
      //@ts-expect-error work around
      if (parentVal === nativeWatch)
          parentVal = undefined;
      //@ts-expect-error work around
      if (childVal === nativeWatch)
          childVal = undefined;
      /* istanbul ignore if */
      if (!childVal)
          return Object.create(parentVal || null);
      {
          assertObjectType(key, childVal, vm);
      }
      if (!parentVal)
          return childVal;
      var ret = {};
      extend(ret, parentVal);
      for (var key_1 in childVal) {
          var parent_1 = ret[key_1];
          var child = childVal[key_1];
          if (parent_1 && !isArray(parent_1)) {
              parent_1 = [parent_1];
          }
          ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
      }
      return ret;
  };
  /**
   * Other object hashes.
   */
  strats.props =
      strats.methods =
          strats.inject =
              strats.computed =
                  function (parentVal, childVal, vm, key) {
                      if (childVal && true) {
                          assertObjectType(key, childVal, vm);
                      }
                      if (!parentVal)
                          return childVal;
                      var ret = Object.create(null);
                      extend(ret, parentVal);
                      if (childVal)
                          extend(ret, childVal);
                      return ret;
                  };
  strats.provide = function (parentVal, childVal) {
      if (!parentVal)
          return childVal;
      return function () {
          var ret = Object.create(null);
          mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
          if (childVal) {
              mergeData(ret, isFunction(childVal) ? childVal.call(this) : childVal, false // non-recursive
              );
          }
          return ret;
      };
  };
  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
      return childVal === undefined ? parentVal : childVal;
  };
  /**
   * Validate component names
   */
  function checkComponents(options) {
      for (var key in options.components) {
          validateComponentName(key);
      }
  }
  function validateComponentName(name) {
      if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
          warn$2('Invalid component name: "' +
              name +
              '". Component names ' +
              'should conform to valid custom element name in html5 specification.');
      }
      if (isBuiltInTag(name) || config.isReservedTag(name)) {
          warn$2('Do not use built-in or reserved HTML elements as component ' +
              'id: ' +
              name);
      }
  }
  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps(options, vm) {
      var props = options.props;
      if (!props)
          return;
      var res = {};
      var i, val, name;
      if (isArray(props)) {
          i = props.length;
          while (i--) {
              val = props[i];
              if (typeof val === 'string') {
                  name = camelize(val);
                  res[name] = { type: null };
              }
              else {
                  warn$2('props must be strings when using array syntax.');
              }
          }
      }
      else if (isPlainObject(props)) {
          for (var key in props) {
              val = props[key];
              name = camelize(key);
              res[name] = isPlainObject(val) ? val : { type: val };
          }
      }
      else {
          warn$2("Invalid value for option \"props\": expected an Array or an Object, " +
              "but got ".concat(toRawType(props), "."), vm);
      }
      options.props = res;
  }
  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject(options, vm) {
      var inject = options.inject;
      if (!inject)
          return;
      var normalized = (options.inject = {});
      if (isArray(inject)) {
          for (var i = 0; i < inject.length; i++) {
              normalized[inject[i]] = { from: inject[i] };
          }
      }
      else if (isPlainObject(inject)) {
          for (var key in inject) {
              var val = inject[key];
              normalized[key] = isPlainObject(val)
                  ? extend({ from: key }, val)
                  : { from: val };
          }
      }
      else {
          warn$2("Invalid value for option \"inject\": expected an Array or an Object, " +
              "but got ".concat(toRawType(inject), "."), vm);
      }
  }
  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives$1(options) {
      var dirs = options.directives;
      if (dirs) {
          for (var key in dirs) {
              var def = dirs[key];
              if (isFunction(def)) {
                  dirs[key] = { bind: def, update: def };
              }
          }
      }
  }
  function assertObjectType(name, value, vm) {
      if (!isPlainObject(value)) {
          warn$2("Invalid value for option \"".concat(name, "\": expected an Object, ") +
              "but got ".concat(toRawType(value), "."), vm);
      }
  }
  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions(parent, child, vm) {
      {
          checkComponents(child);
      }
      if (isFunction(child)) {
          // @ts-expect-error
          child = child.options;
      }
      normalizeProps(child, vm);
      normalizeInject(child, vm);
      normalizeDirectives$1(child);
      // Apply extends and mixins on the child options,
      // but only if it is a raw options object that isn't
      // the result of another mergeOptions call.
      // Only merged options has the _base property.
      if (!child._base) {
          if (child.extends) {
              parent = mergeOptions(parent, child.extends, vm);
          }
          if (child.mixins) {
              for (var i = 0, l = child.mixins.length; i < l; i++) {
                  parent = mergeOptions(parent, child.mixins[i], vm);
              }
          }
      }
      var options = {};
      var key;
      for (key in parent) {
          mergeField(key);
      }
      for (key in child) {
          if (!hasOwn(parent, key)) {
              mergeField(key);
          }
      }
      function mergeField(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
      }
      return options;
  }
  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset(options, type, id, warnMissing) {
      /* istanbul ignore if */
      if (typeof id !== 'string') {
          return;
      }
      var assets = options[type];
      // check local registration variations first
      if (hasOwn(assets, id))
          return assets[id];
      var camelizedId = camelize(id);
      if (hasOwn(assets, camelizedId))
          return assets[camelizedId];
      var PascalCaseId = capitalize(camelizedId);
      if (hasOwn(assets, PascalCaseId))
          return assets[PascalCaseId];
      // fallback to prototype chain
      var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
      if (warnMissing && !res) {
          warn$2('Failed to resolve ' + type.slice(0, -1) + ': ' + id);
      }
      return res;
  }

  function validateProp(key, propOptions, propsData, vm) {
      var prop = propOptions[key];
      var absent = !hasOwn(propsData, key);
      var value = propsData[key];
      // boolean casting
      var booleanIndex = getTypeIndex(Boolean, prop.type);
      if (booleanIndex > -1) {
          if (absent && !hasOwn(prop, 'default')) {
              value = false;
          }
          else if (value === '' || value === hyphenate(key)) {
              // only cast empty string / same name to boolean if
              // boolean has higher priority
              var stringIndex = getTypeIndex(String, prop.type);
              if (stringIndex < 0 || booleanIndex < stringIndex) {
                  value = true;
              }
          }
      }
      // check default value
      if (value === undefined) {
          value = getPropDefaultValue(vm, prop, key);
          // since the default value is a fresh copy,
          // make sure to observe it.
          var prevShouldObserve = shouldObserve;
          toggleObserving(true);
          observe(value);
          toggleObserving(prevShouldObserve);
      }
      {
          assertProp(prop, key, value, vm, absent);
      }
      return value;
  }
  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue(vm, prop, key) {
      // no default, return undefined
      if (!hasOwn(prop, 'default')) {
          return undefined;
      }
      var def = prop.default;
      // warn against non-factory defaults for Object & Array
      if (isObject(def)) {
          warn$2('Invalid default value for prop "' +
              key +
              '": ' +
              'Props with type Object/Array must use a factory function ' +
              'to return the default value.', vm);
      }
      // the raw prop value was also undefined from previous render,
      // return previous default value to avoid unnecessary watcher trigger
      if (vm &&
          vm.$options.propsData &&
          vm.$options.propsData[key] === undefined &&
          vm._props[key] !== undefined) {
          return vm._props[key];
      }
      // call factory function for non-Function types
      // a value is Function if its prototype is function even across different execution context
      return isFunction(def) && getType(prop.type) !== 'Function'
          ? def.call(vm)
          : def;
  }
  /**
   * Assert whether a prop is valid.
   */
  function assertProp(prop, name, value, vm, absent) {
      if (prop.required && absent) {
          warn$2('Missing required prop: "' + name + '"', vm);
          return;
      }
      if (value == null && !prop.required) {
          return;
      }
      var type = prop.type;
      var valid = !type || type === true;
      var expectedTypes = [];
      if (type) {
          if (!isArray(type)) {
              type = [type];
          }
          for (var i = 0; i < type.length && !valid; i++) {
              var assertedType = assertType(value, type[i], vm);
              expectedTypes.push(assertedType.expectedType || '');
              valid = assertedType.valid;
          }
      }
      var haveExpectedTypes = expectedTypes.some(function (t) { return t; });
      if (!valid && haveExpectedTypes) {
          warn$2(getInvalidTypeMessage(name, value, expectedTypes), vm);
          return;
      }
      var validator = prop.validator;
      if (validator) {
          if (!validator(value)) {
              warn$2('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
          }
      }
  }
  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
  function assertType(value, type, vm) {
      var valid;
      var expectedType = getType(type);
      if (simpleCheckRE.test(expectedType)) {
          var t = typeof value;
          valid = t === expectedType.toLowerCase();
          // for primitive wrapper objects
          if (!valid && t === 'object') {
              valid = value instanceof type;
          }
      }
      else if (expectedType === 'Object') {
          valid = isPlainObject(value);
      }
      else if (expectedType === 'Array') {
          valid = isArray(value);
      }
      else {
          try {
              valid = value instanceof type;
          }
          catch (e) {
              warn$2('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
              valid = false;
          }
      }
      return {
          valid: valid,
          expectedType: expectedType
      };
  }
  var functionTypeCheckRE = /^\s*function (\w+)/;
  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType(fn) {
      var match = fn && fn.toString().match(functionTypeCheckRE);
      return match ? match[1] : '';
  }
  function isSameType(a, b) {
      return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
      if (!isArray(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1;
      }
      for (var i = 0, len = expectedTypes.length; i < len; i++) {
          if (isSameType(expectedTypes[i], type)) {
              return i;
          }
      }
      return -1;
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
      var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") +
          " Expected ".concat(expectedTypes.map(capitalize).join(', '));
      var expectedType = expectedTypes[0];
      var receivedType = toRawType(value);
      // check if we need to specify expected value
      if (expectedTypes.length === 1 &&
          isExplicable(expectedType) &&
          isExplicable(typeof value) &&
          !isBoolean(expectedType, receivedType)) {
          message += " with value ".concat(styleValue(value, expectedType));
      }
      message += ", got ".concat(receivedType, " ");
      // check if we need to specify received value
      if (isExplicable(receivedType)) {
          message += "with value ".concat(styleValue(value, receivedType), ".");
      }
      return message;
  }
  function styleValue(value, type) {
      if (type === 'String') {
          return "\"".concat(value, "\"");
      }
      else if (type === 'Number') {
          return "".concat(Number(value));
      }
      else {
          return "".concat(value);
      }
  }
  var EXPLICABLE_TYPES = ['string', 'number', 'boolean'];
  function isExplicable(value) {
      return EXPLICABLE_TYPES.some(function (elem) { return value.toLowerCase() === elem; });
  }
  function isBoolean() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; });
  }

  function Vue(options) {
      if (!(this instanceof Vue)) {
          warn$2('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
  }
  //@ts-expect-error Vue has function type
  initMixin$1(Vue);
  //@ts-expect-error Vue has function type
  stateMixin(Vue);
  //@ts-expect-error Vue has function type
  eventsMixin(Vue);
  //@ts-expect-error Vue has function type
  lifecycleMixin(Vue);
  //@ts-expect-error Vue has function type
  renderMixin(Vue);

  function initUse(Vue) {
      Vue.use = function (plugin) {
          var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
          if (installedPlugins.indexOf(plugin) > -1) {
              return this;
          }
          // additional parameters
          var args = toArray(arguments, 1);
          args.unshift(this);
          if (isFunction(plugin.install)) {
              plugin.install.apply(plugin, args);
          }
          else if (isFunction(plugin)) {
              plugin.apply(null, args);
          }
          installedPlugins.push(plugin);
          return this;
      };
  }

  function initMixin(Vue) {
      Vue.mixin = function (mixin) {
          this.options = mergeOptions(this.options, mixin);
          return this;
      };
  }

  function initExtend(Vue) {
      /**
       * Each instance constructor, including Vue, has a unique
       * cid. This enables us to create wrapped "child
       * constructors" for prototypal inheritance and cache them.
       */
      Vue.cid = 0;
      var cid = 1;
      /**
       * Class inheritance
       */
      Vue.extend = function (extendOptions) {
          extendOptions = extendOptions || {};
          var Super = this;
          var SuperId = Super.cid;
          var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
          if (cachedCtors[SuperId]) {
              return cachedCtors[SuperId];
          }
          var name = getComponentName(extendOptions) || getComponentName(Super.options);
          if (name) {
              validateComponentName(name);
          }
          var Sub = function VueComponent(options) {
              this._init(options);
          };
          Sub.prototype = Object.create(Super.prototype);
          Sub.prototype.constructor = Sub;
          Sub.cid = cid++;
          Sub.options = mergeOptions(Super.options, extendOptions);
          Sub['super'] = Super;
          // For props and computed properties, we define the proxy getters on
          // the Vue instances at extension time, on the extended prototype. This
          // avoids Object.defineProperty calls for each instance created.
          if (Sub.options.props) {
              initProps(Sub);
          }
          if (Sub.options.computed) {
              initComputed(Sub);
          }
          // allow further extension/mixin/plugin usage
          Sub.extend = Super.extend;
          Sub.mixin = Super.mixin;
          Sub.use = Super.use;
          // create asset registers, so extended classes
          // can have their private assets too.
          ASSET_TYPES.forEach(function (type) {
              Sub[type] = Super[type];
          });
          // enable recursive self-lookup
          if (name) {
              Sub.options.components[name] = Sub;
          }
          // keep a reference to the super options at extension time.
          // later at instantiation we can check if Super's options have
          // been updated.
          Sub.superOptions = Super.options;
          Sub.extendOptions = extendOptions;
          Sub.sealedOptions = extend({}, Sub.options);
          // cache constructor
          cachedCtors[SuperId] = Sub;
          return Sub;
      };
  }
  function initProps(Comp) {
      var props = Comp.options.props;
      for (var key in props) {
          proxy(Comp.prototype, "_props", key);
      }
  }
  function initComputed(Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
          defineComputed(Comp.prototype, key, computed[key]);
      }
  }

  function initAssetRegisters(Vue) {
      /**
       * Create asset registration methods.
       */
      ASSET_TYPES.forEach(function (type) {
          // @ts-expect-error function is not exact same type
          Vue[type] = function (id, definition) {
              if (!definition) {
                  return this.options[type + 's'][id];
              }
              else {
                  /* istanbul ignore if */
                  if (type === 'component') {
                      validateComponentName(id);
                  }
                  if (type === 'component' && isPlainObject(definition)) {
                      // @ts-expect-error
                      definition.name = definition.name || id;
                      definition = this.options._base.extend(definition);
                  }
                  if (type === 'directive' && isFunction(definition)) {
                      definition = { bind: definition, update: definition };
                  }
                  this.options[type + 's'][id] = definition;
                  return definition;
              }
          };
      });
  }

  function _getComponentName(opts) {
      return opts && (getComponentName(opts.Ctor.options) || opts.tag);
  }
  function matches(pattern, name) {
      if (isArray(pattern)) {
          return pattern.indexOf(name) > -1;
      }
      else if (typeof pattern === 'string') {
          return pattern.split(',').indexOf(name) > -1;
      }
      else if (isRegExp(pattern)) {
          return pattern.test(name);
      }
      /* istanbul ignore next */
      return false;
  }
  function pruneCache(keepAliveInstance, filter) {
      var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode, $vnode = keepAliveInstance.$vnode;
      for (var key in cache) {
          var entry = cache[key];
          if (entry) {
              var name_1 = entry.name;
              if (name_1 && !filter(name_1)) {
                  pruneCacheEntry(cache, key, keys, _vnode);
              }
          }
      }
      $vnode.componentOptions.children = undefined;
  }
  function pruneCacheEntry(cache, key, keys, current) {
      var entry = cache[key];
      if (entry && (!current || entry.tag !== current.tag)) {
          // @ts-expect-error can be undefined
          entry.componentInstance.$destroy();
      }
      cache[key] = null;
      remove$2(keys, key);
  }
  var patternTypes = [String, RegExp, Array];
  // TODO defineComponent
  var KeepAlive = {
      name: 'keep-alive',
      abstract: true,
      props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number]
      },
      methods: {
          cacheVNode: function () {
              var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
              if (vnodeToCache) {
                  var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
                  cache[keyToCache] = {
                      name: _getComponentName(componentOptions),
                      tag: tag,
                      componentInstance: componentInstance
                  };
                  keys.push(keyToCache);
                  // prune oldest entry
                  if (this.max && keys.length > parseInt(this.max)) {
                      pruneCacheEntry(cache, keys[0], keys, this._vnode);
                  }
                  this.vnodeToCache = null;
              }
          }
      },
      created: function () {
          this.cache = Object.create(null);
          this.keys = [];
      },
      destroyed: function () {
          for (var key in this.cache) {
              pruneCacheEntry(this.cache, key, this.keys);
          }
      },
      mounted: function () {
          var _this = this;
          this.cacheVNode();
          this.$watch('include', function (val) {
              pruneCache(_this, function (name) { return matches(val, name); });
          });
          this.$watch('exclude', function (val) {
              pruneCache(_this, function (name) { return !matches(val, name); });
          });
      },
      updated: function () {
          this.cacheVNode();
      },
      render: function () {
          var slot = this.$slots.default;
          var vnode = getFirstComponentChild(slot);
          var componentOptions = vnode && vnode.componentOptions;
          if (componentOptions) {
              // check pattern
              var name_2 = _getComponentName(componentOptions);
              var _a = this, include = _a.include, exclude = _a.exclude;
              if (
              // not included
              (include && (!name_2 || !matches(include, name_2))) ||
                  // excluded
                  (exclude && name_2 && matches(exclude, name_2))) {
                  return vnode;
              }
              var _b = this, cache = _b.cache, keys = _b.keys;
              var key = vnode.key == null
                  ? // same constructor may get registered as different local components
                      // so cid alone is not enough (#3269)
                      componentOptions.Ctor.cid +
                          (componentOptions.tag ? "::".concat(componentOptions.tag) : '')
                  : vnode.key;
              if (cache[key]) {
                  vnode.componentInstance = cache[key].componentInstance;
                  // make current key freshest
                  remove$2(keys, key);
                  keys.push(key);
              }
              else {
                  // delay setting the cache until update
                  this.vnodeToCache = vnode;
                  this.keyToCache = key;
              }
              // @ts-expect-error can vnode.data can be undefined
              vnode.data.keepAlive = true;
          }
          return vnode || (slot && slot[0]);
      }
  };

  var builtInComponents = {
      KeepAlive: KeepAlive
  };

  function initGlobalAPI(Vue) {
      // config
      var configDef = {};
      configDef.get = function () { return config; };
      {
          configDef.set = function () {
              warn$2('Do not replace the Vue.config object, set individual fields instead.');
          };
      }
      Object.defineProperty(Vue, 'config', configDef);
      // exposed util methods.
      // NOTE: these are not considered part of the public API - avoid relying on
      // them unless you are aware of the risk.
      Vue.util = {
          warn: warn$2,
          extend: extend,
          mergeOptions: mergeOptions,
          defineReactive: defineReactive
      };
      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;
      // 2.6 explicit observable API
      Vue.observable = function (obj) {
          observe(obj);
          return obj;
      };
      Vue.options = Object.create(null);
      ASSET_TYPES.forEach(function (type) {
          Vue.options[type + 's'] = Object.create(null);
      });
      // this is used to identify the "base" constructor to extend all plain-object
      // components with in Weex's multi-instance scenarios.
      Vue.options._base = Vue;
      extend(Vue.options.components, builtInComponents);
      initUse(Vue);
      initMixin(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, '$isServer', {
      get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, '$ssrContext', {
      get: function () {
          /* istanbul ignore next */
          return this.$vnode && this.$vnode.ssrContext;
      }
  });
  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
  });
  Vue.version = version;

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');
  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
      return ((attr === 'value' && acceptValue(tag) && type !== 'button') ||
          (attr === 'selected' && tag === 'option') ||
          (attr === 'checked' && tag === 'input') ||
          (attr === 'muted' && tag === 'video'));
  };
  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
  var convertEnumeratedValue = function (key, value) {
      return isFalsyAttrValue(value) || value === 'false'
          ? 'false'
          : // allow arbitrary string value for contenteditable
              key === 'contenteditable' && isValidContentEditableValue(value)
                  ? value
                  : 'true';
  };
  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
      'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
      'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
      'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
      'required,reversed,scoped,seamless,selected,sortable,' +
      'truespeed,typemustmatch,visible');
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var isXlink = function (name) {
      return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
  };
  var getXlinkProp = function (name) {
      return isXlink(name) ? name.slice(6, name.length) : '';
  };
  var isFalsyAttrValue = function (val) {
      return val == null || val === false;
  };

  function genClassForVnode(vnode) {
      var data = vnode.data;
      var parentNode = vnode;
      var childNode = vnode;
      while (isDef(childNode.componentInstance)) {
          childNode = childNode.componentInstance._vnode;
          if (childNode && childNode.data) {
              data = mergeClassData(childNode.data, data);
          }
      }
      // @ts-expect-error parentNode.parent not VNodeWithData
      while (isDef((parentNode = parentNode.parent))) {
          if (parentNode && parentNode.data) {
              data = mergeClassData(data, parentNode.data);
          }
      }
      return renderClass(data.staticClass, data.class);
  }
  function mergeClassData(child, parent) {
      return {
          staticClass: concat(child.staticClass, parent.staticClass),
          class: isDef(child.class) ? [child.class, parent.class] : parent.class
      };
  }
  function renderClass(staticClass, dynamicClass) {
      if (isDef(staticClass) || isDef(dynamicClass)) {
          return concat(staticClass, stringifyClass(dynamicClass));
      }
      /* istanbul ignore next */
      return '';
  }
  function concat(a, b) {
      return a ? (b ? a + ' ' + b : a) : b || '';
  }
  function stringifyClass(value) {
      if (Array.isArray(value)) {
          return stringifyArray(value);
      }
      if (isObject(value)) {
          return stringifyObject(value);
      }
      if (typeof value === 'string') {
          return value;
      }
      /* istanbul ignore next */
      return '';
  }
  function stringifyArray(value) {
      var res = '';
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
          if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
              if (res)
                  res += ' ';
              res += stringified;
          }
      }
      return res;
  }
  function stringifyObject(value) {
      var res = '';
      for (var key in value) {
          if (value[key]) {
              if (res)
                  res += ' ';
              res += key;
          }
      }
      return res;
  }

  var namespaceMap = {
      svg: 'http://www.w3.org/2000/svg',
      math: 'http://www.w3.org/1998/Math/MathML'
  };
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
      'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
      'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
      'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
      's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
      'embed,object,param,source,canvas,script,noscript,del,ins,' +
      'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
      'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
      'output,progress,select,textarea,' +
      'details,dialog,menu,menuitem,summary,' +
      'content,element,shadow,template,blockquote,iframe,tfoot');
  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
      'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
      'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  var isPreTag = function (tag) { return tag === 'pre'; };
  var isReservedTag = function (tag) {
      return isHTMLTag(tag) || isSVG(tag);
  };
  function getTagNamespace(tag) {
      if (isSVG(tag)) {
          return 'svg';
      }
      // basic support for MathML
      // note it doesn't support other MathML elements being component roots
      if (tag === 'math') {
          return 'math';
      }
  }
  var unknownElementCache = Object.create(null);
  function isUnknownElement(tag) {
      /* istanbul ignore if */
      if (!inBrowser) {
          return true;
      }
      if (isReservedTag(tag)) {
          return false;
      }
      tag = tag.toLowerCase();
      /* istanbul ignore if */
      if (unknownElementCache[tag] != null) {
          return unknownElementCache[tag];
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
          // https://stackoverflow.com/a/28210364/1070244
          return (unknownElementCache[tag] =
              el.constructor === window.HTMLUnknownElement ||
                  el.constructor === window.HTMLElement);
      }
      else {
          return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
      }
  }
  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /**
   * Query an element selector if it's not an element already.
   */
  function query(el) {
      if (typeof el === 'string') {
          var selected = document.querySelector(el);
          if (!selected) {
              warn$2('Cannot find element: ' + el);
              return document.createElement('div');
          }
          return selected;
      }
      else {
          return el;
      }
  }

  function createElement(tagName, vnode) {
      var elm = document.createElement(tagName);
      if (tagName !== 'select') {
          return elm;
      }
      // false or null will remove the attribute but undefined will not
      if (vnode.data &&
          vnode.data.attrs &&
          vnode.data.attrs.multiple !== undefined) {
          elm.setAttribute('multiple', 'multiple');
      }
      return elm;
  }
  function createElementNS(namespace, tagName) {
      return document.createElementNS(namespaceMap[namespace], tagName);
  }
  function createTextNode(text) {
      return document.createTextNode(text);
  }
  function createComment(text) {
      return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode;
  }
  function nextSibling(node) {
      return node.nextSibling;
  }
  function tagName(node) {
      return node.tagName;
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
      node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  var ref = {
      create: function (_, vnode) {
          registerRef(vnode);
      },
      update: function (oldVnode, vnode) {
          if (oldVnode.data.ref !== vnode.data.ref) {
              registerRef(oldVnode, true);
              registerRef(vnode);
          }
      },
      destroy: function (vnode) {
          registerRef(vnode, true);
      }
  };
  function registerRef(vnode, isRemoval) {
      var ref = vnode.data.ref;
      if (!isDef(ref))
          return;
      var vm = vnode.context;
      var refValue = vnode.componentInstance || vnode.elm;
      var value = isRemoval ? null : refValue;
      var $refsValue = isRemoval ? undefined : refValue;
      if (isFunction(ref)) {
          invokeWithErrorHandling(ref, vm, [value], vm, "template ref function");
          return;
      }
      var isFor = vnode.data.refInFor;
      var _isString = typeof ref === 'string' || typeof ref === 'number';
      var _isRef = isRef(ref);
      var refs = vm.$refs;
      if (_isString || _isRef) {
          if (isFor) {
              var existing = _isString ? refs[ref] : ref.value;
              if (isRemoval) {
                  isArray(existing) && remove$2(existing, refValue);
              }
              else {
                  if (!isArray(existing)) {
                      if (_isString) {
                          refs[ref] = [refValue];
                          setSetupRef(vm, ref, refs[ref]);
                      }
                      else {
                          ref.value = [refValue];
                      }
                  }
                  else if (!existing.includes(refValue)) {
                      existing.push(refValue);
                  }
              }
          }
          else if (_isString) {
              if (isRemoval && refs[ref] !== refValue) {
                  return;
              }
              refs[ref] = $refsValue;
              setSetupRef(vm, ref, value);
          }
          else if (_isRef) {
              if (isRemoval && ref.value !== refValue) {
                  return;
              }
              ref.value = value;
          }
          else {
              warn$2("Invalid template ref type: ".concat(typeof ref));
          }
      }
  }
  function setSetupRef(_a, key, val) {
      var _setupState = _a._setupState;
      if (_setupState && hasOwn(_setupState, key)) {
          if (isRef(_setupState[key])) {
              _setupState[key].value = val;
          }
          else {
              _setupState[key] = val;
          }
      }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */
  var emptyNode = new VNode('', {}, []);
  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
  function sameVnode(a, b) {
      return (a.key === b.key &&
          a.asyncFactory === b.asyncFactory &&
          ((a.tag === b.tag &&
              a.isComment === b.isComment &&
              isDef(a.data) === isDef(b.data) &&
              sameInputType(a, b)) ||
              (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error))));
  }
  function sameInputType(a, b) {
      if (a.tag !== 'input')
          return true;
      var i;
      var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
      var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
      return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i, key;
      var map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
          key = children[i].key;
          if (isDef(key))
              map[key] = i;
      }
      return map;
  }
  function createPatchFunction(backend) {
      var i, j;
      var cbs = {};
      var modules = backend.modules, nodeOps = backend.nodeOps;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              if (isDef(modules[j][hooks[i]])) {
                  cbs[hooks[i]].push(modules[j][hooks[i]]);
              }
          }
      }
      function emptyNodeAt(elm) {
          return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
      }
      function createRmCb(childElm, listeners) {
          function remove() {
              if (--remove.listeners === 0) {
                  removeNode(childElm);
              }
          }
          remove.listeners = listeners;
          return remove;
      }
      function removeNode(el) {
          var parent = nodeOps.parentNode(el);
          // element may have already been removed due to v-html / v-text
          if (isDef(parent)) {
              nodeOps.removeChild(parent, el);
          }
      }
      function isUnknownElement(vnode, inVPre) {
          return (!inVPre &&
              !vnode.ns &&
              !(config.ignoredElements.length &&
                  config.ignoredElements.some(function (ignore) {
                      return isRegExp(ignore)
                          ? ignore.test(vnode.tag)
                          : ignore === vnode.tag;
                  })) &&
              config.isUnknownElement(vnode.tag));
      }
      var creatingElmInVPre = 0;
      function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              // This vnode was used in a previous render!
              // now it's used as a new node, overwriting its elm would cause
              // potential patch errors down the road when it's used as an insertion
              // reference node. Instead, we clone the node on-demand before creating
              // associated DOM element for it.
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          vnode.isRootInsert = !nested; // for transition enter check
          if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
              return;
          }
          var data = vnode.data;
          var children = vnode.children;
          var tag = vnode.tag;
          if (isDef(tag)) {
              {
                  if (data && data.pre) {
                      creatingElmInVPre++;
                  }
                  if (isUnknownElement(vnode, creatingElmInVPre)) {
                      warn$2('Unknown custom element: <' +
                          tag +
                          '> - did you ' +
                          'register the component correctly? For recursive components, ' +
                          'make sure to provide the "name" option.', vnode.context);
                  }
              }
              vnode.elm = vnode.ns
                  ? nodeOps.createElementNS(vnode.ns, tag)
                  : nodeOps.createElement(tag, vnode);
              setScope(vnode);
              createChildren(vnode, children, insertedVnodeQueue);
              if (isDef(data)) {
                  invokeCreateHooks(vnode, insertedVnodeQueue);
              }
              insert(parentElm, vnode.elm, refElm);
              if (data && data.pre) {
                  creatingElmInVPre--;
              }
          }
          else if (isTrue(vnode.isComment)) {
              vnode.elm = nodeOps.createComment(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          }
          else {
              vnode.elm = nodeOps.createTextNode(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          }
      }
      function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i = vnode.data;
          if (isDef(i)) {
              var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
              if (isDef((i = i.hook)) && isDef((i = i.init))) {
                  i(vnode, false /* hydrating */);
              }
              // after calling the init hook, if the vnode is a child component
              // it should've created a child instance and mounted it. the child
              // component also has set the placeholder vnode's elm.
              // in that case we can just return the element and be done.
              if (isDef(vnode.componentInstance)) {
                  initComponent(vnode, insertedVnodeQueue);
                  insert(parentElm, vnode.elm, refElm);
                  if (isTrue(isReactivated)) {
                      reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                  }
                  return true;
              }
          }
      }
      function initComponent(vnode, insertedVnodeQueue) {
          if (isDef(vnode.data.pendingInsert)) {
              insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
              vnode.data.pendingInsert = null;
          }
          vnode.elm = vnode.componentInstance.$el;
          if (isPatchable(vnode)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              setScope(vnode);
          }
          else {
              // empty component root.
              // skip all element-related modules except for ref (#3455)
              registerRef(vnode);
              // make sure to invoke the insert hook
              insertedVnodeQueue.push(vnode);
          }
      }
      function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i;
          // hack for #4339: a reactivated component with inner transition
          // does not trigger because the inner node's created hooks are not called
          // again. It's not ideal to involve module-specific logic in here but
          // there doesn't seem to be a better way to do it.
          var innerNode = vnode;
          while (innerNode.componentInstance) {
              innerNode = innerNode.componentInstance._vnode;
              if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                  for (i = 0; i < cbs.activate.length; ++i) {
                      cbs.activate[i](emptyNode, innerNode);
                  }
                  insertedVnodeQueue.push(innerNode);
                  break;
              }
          }
          // unlike a newly created component,
          // a reactivated keep-alive component doesn't insert itself
          insert(parentElm, vnode.elm, refElm);
      }
      function insert(parent, elm, ref) {
          if (isDef(parent)) {
              if (isDef(ref)) {
                  if (nodeOps.parentNode(ref) === parent) {
                      nodeOps.insertBefore(parent, elm, ref);
                  }
              }
              else {
                  nodeOps.appendChild(parent, elm);
              }
          }
      }
      function createChildren(vnode, children, insertedVnodeQueue) {
          if (isArray(children)) {
              {
                  checkDuplicateKeys(children);
              }
              for (var i_1 = 0; i_1 < children.length; ++i_1) {
                  createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
              }
          }
          else if (isPrimitive(vnode.text)) {
              nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
          }
      }
      function isPatchable(vnode) {
          while (vnode.componentInstance) {
              vnode = vnode.componentInstance._vnode;
          }
          return isDef(vnode.tag);
      }
      function invokeCreateHooks(vnode, insertedVnodeQueue) {
          for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
              cbs.create[i_2](emptyNode, vnode);
          }
          i = vnode.data.hook; // Reuse variable
          if (isDef(i)) {
              if (isDef(i.create))
                  i.create(emptyNode, vnode);
              if (isDef(i.insert))
                  insertedVnodeQueue.push(vnode);
          }
      }
      // set scope id attribute for scoped CSS.
      // this is implemented as a special case to avoid the overhead
      // of going through the normal attribute patching process.
      function setScope(vnode) {
          var i;
          if (isDef((i = vnode.fnScopeId))) {
              nodeOps.setStyleScope(vnode.elm, i);
          }
          else {
              var ancestor = vnode;
              while (ancestor) {
                  if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                      nodeOps.setStyleScope(vnode.elm, i);
                  }
                  ancestor = ancestor.parent;
              }
          }
          // for slot content they should also get the scopeId from the host instance.
          if (isDef((i = activeInstance)) &&
              i !== vnode.context &&
              i !== vnode.fnContext &&
              isDef((i = i.$options._scopeId))) {
              nodeOps.setStyleScope(vnode.elm, i);
          }
      }
      function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
          }
      }
      function invokeDestroyHook(vnode) {
          var i, j;
          var data = vnode.data;
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.destroy)))
                  i(vnode);
              for (i = 0; i < cbs.destroy.length; ++i)
                  cbs.destroy[i](vnode);
          }
          if (isDef((i = vnode.children))) {
              for (j = 0; j < vnode.children.length; ++j) {
                  invokeDestroyHook(vnode.children[j]);
              }
          }
      }
      function removeVnodes(vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
              var ch = vnodes[startIdx];
              if (isDef(ch)) {
                  if (isDef(ch.tag)) {
                      removeAndInvokeRemoveHook(ch);
                      invokeDestroyHook(ch);
                  }
                  else {
                      // Text node
                      removeNode(ch.elm);
                  }
              }
          }
      }
      function removeAndInvokeRemoveHook(vnode, rm) {
          if (isDef(rm) || isDef(vnode.data)) {
              var i_3;
              var listeners = cbs.remove.length + 1;
              if (isDef(rm)) {
                  // we have a recursively passed down rm callback
                  // increase the listeners count
                  rm.listeners += listeners;
              }
              else {
                  // directly removing
                  rm = createRmCb(vnode.elm, listeners);
              }
              // recursively invoke hooks on child component root node
              if (isDef((i_3 = vnode.componentInstance)) &&
                  isDef((i_3 = i_3._vnode)) &&
                  isDef(i_3.data)) {
                  removeAndInvokeRemoveHook(i_3, rm);
              }
              for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
                  cbs.remove[i_3](vnode, rm);
              }
              if (isDef((i_3 = vnode.data.hook)) && isDef((i_3 = i_3.remove))) {
                  i_3(vnode, rm);
              }
              else {
                  rm();
              }
          }
          else {
              removeNode(vnode.elm);
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
          // removeOnly is a special flag used only by <transition-group>
          // to ensure removed elements stay in correct relative positions
          // during leaving transitions
          var canMove = !removeOnly;
          {
              checkDuplicateKeys(newCh);
          }
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (isUndef(oldStartVnode)) {
                  oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
              }
              else if (isUndef(oldEndVnode)) {
                  oldEndVnode = oldCh[--oldEndIdx];
              }
              else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newEndVnode)) {
                  // Vnode moved right
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  canMove &&
                      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) {
                  // Vnode moved left
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  canMove &&
                      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else {
                  if (isUndef(oldKeyToIdx))
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  idxInOld = isDef(newStartVnode.key)
                      ? oldKeyToIdx[newStartVnode.key]
                      : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                  if (isUndef(idxInOld)) {
                      // New element
                      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                  }
                  else {
                      vnodeToMove = oldCh[idxInOld];
                      if (sameVnode(vnodeToMove, newStartVnode)) {
                          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                          oldCh[idxInOld] = undefined;
                          canMove &&
                              nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                      }
                      else {
                          // same key but different element. treat as new element
                          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                      }
                  }
                  newStartVnode = newCh[++newStartIdx];
              }
          }
          if (oldStartIdx > oldEndIdx) {
              refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
              addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          }
          else if (newStartIdx > newEndIdx) {
              removeVnodes(oldCh, oldStartIdx, oldEndIdx);
          }
      }
      function checkDuplicateKeys(children) {
          var seenKeys = {};
          for (var i_4 = 0; i_4 < children.length; i_4++) {
              var vnode = children[i_4];
              var key = vnode.key;
              if (isDef(key)) {
                  if (seenKeys[key]) {
                      warn$2("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
                  }
                  else {
                      seenKeys[key] = true;
                  }
              }
          }
      }
      function findIdxInOld(node, oldCh, start, end) {
          for (var i_5 = start; i_5 < end; i_5++) {
              var c = oldCh[i_5];
              if (isDef(c) && sameVnode(node, c))
                  return i_5;
          }
      }
      function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
          if (oldVnode === vnode) {
              return;
          }
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              // clone reused vnode
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          var elm = (vnode.elm = oldVnode.elm);
          if (isTrue(oldVnode.isAsyncPlaceholder)) {
              if (isDef(vnode.asyncFactory.resolved)) {
                  hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
              }
              else {
                  vnode.isAsyncPlaceholder = true;
              }
              return;
          }
          // reuse element for static trees.
          // note we only do this if the vnode is cloned -
          // if the new node is not cloned it means the render functions have been
          // reset by the hot-reload-api and we need to do a proper re-render.
          if (isTrue(vnode.isStatic) &&
              isTrue(oldVnode.isStatic) &&
              vnode.key === oldVnode.key &&
              (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
              vnode.componentInstance = oldVnode.componentInstance;
              return;
          }
          var i;
          var data = vnode.data;
          if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
              i(oldVnode, vnode);
          }
          var oldCh = oldVnode.children;
          var ch = vnode.children;
          if (isDef(data) && isPatchable(vnode)) {
              for (i = 0; i < cbs.update.length; ++i)
                  cbs.update[i](oldVnode, vnode);
              if (isDef((i = data.hook)) && isDef((i = i.update)))
                  i(oldVnode, vnode);
          }
          if (isUndef(vnode.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch)
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
              }
              else if (isDef(ch)) {
                  {
                      checkDuplicateKeys(ch);
                  }
                  if (isDef(oldVnode.text))
                      nodeOps.setTextContent(elm, '');
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  nodeOps.setTextContent(elm, '');
              }
          }
          else if (oldVnode.text !== vnode.text) {
              nodeOps.setTextContent(elm, vnode.text);
          }
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.postpatch)))
                  i(oldVnode, vnode);
          }
      }
      function invokeInsertHook(vnode, queue, initial) {
          // delay insert hooks for component root nodes, invoke them after the
          // element is really inserted
          if (isTrue(initial) && isDef(vnode.parent)) {
              vnode.parent.data.pendingInsert = queue;
          }
          else {
              for (var i_6 = 0; i_6 < queue.length; ++i_6) {
                  queue[i_6].data.hook.insert(queue[i_6]);
              }
          }
      }
      var hydrationBailed = false;
      // list of modules that can skip create hook during hydration because they
      // are already rendered on the client or has no need for initialization
      // Note: style is excluded because it relies on initial clone for future
      // deep updates (#7063).
      var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
      // Note: this is a browser-only function so we can assume elms are DOM nodes.
      function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
          var i;
          var tag = vnode.tag, data = vnode.data, children = vnode.children;
          inVPre = inVPre || (data && data.pre);
          vnode.elm = elm;
          if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
              vnode.isAsyncPlaceholder = true;
              return true;
          }
          // assert node match
          {
              if (!assertNodeMatch(elm, vnode, inVPre)) {
                  return false;
              }
          }
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.init)))
                  i(vnode, true /* hydrating */);
              if (isDef((i = vnode.componentInstance))) {
                  // child component. it should have hydrated its own tree.
                  initComponent(vnode, insertedVnodeQueue);
                  return true;
              }
          }
          if (isDef(tag)) {
              if (isDef(children)) {
                  // empty element, allow client to pick up and populate children
                  if (!elm.hasChildNodes()) {
                      createChildren(vnode, children, insertedVnodeQueue);
                  }
                  else {
                      // v-html and domProps: innerHTML
                      if (isDef((i = data)) &&
                          isDef((i = i.domProps)) &&
                          isDef((i = i.innerHTML))) {
                          if (i !== elm.innerHTML) {
                              /* istanbul ignore if */
                              if (typeof console !== 'undefined' &&
                                  !hydrationBailed) {
                                  hydrationBailed = true;
                                  console.warn('Parent: ', elm);
                                  console.warn('server innerHTML: ', i);
                                  console.warn('client innerHTML: ', elm.innerHTML);
                              }
                              return false;
                          }
                      }
                      else {
                          // iterate and compare children lists
                          var childrenMatch = true;
                          var childNode = elm.firstChild;
                          for (var i_7 = 0; i_7 < children.length; i_7++) {
                              if (!childNode ||
                                  !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                                  childrenMatch = false;
                                  break;
                              }
                              childNode = childNode.nextSibling;
                          }
                          // if childNode is not null, it means the actual childNodes list is
                          // longer than the virtual children list.
                          if (!childrenMatch || childNode) {
                              /* istanbul ignore if */
                              if (typeof console !== 'undefined' &&
                                  !hydrationBailed) {
                                  hydrationBailed = true;
                                  console.warn('Parent: ', elm);
                                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                              }
                              return false;
                          }
                      }
                  }
              }
              if (isDef(data)) {
                  var fullInvoke = false;
                  for (var key in data) {
                      if (!isRenderedModule(key)) {
                          fullInvoke = true;
                          invokeCreateHooks(vnode, insertedVnodeQueue);
                          break;
                      }
                  }
                  if (!fullInvoke && data['class']) {
                      // ensure collecting deps for deep class bindings for future updates
                      traverse(data['class']);
                  }
              }
          }
          else if (elm.data !== vnode.text) {
              elm.data = vnode.text;
          }
          return true;
      }
      function assertNodeMatch(node, vnode, inVPre) {
          if (isDef(vnode.tag)) {
              return (vnode.tag.indexOf('vue-component') === 0 ||
                  (!isUnknownElement(vnode, inVPre) &&
                      vnode.tag.toLowerCase() ===
                          (node.tagName && node.tagName.toLowerCase())));
          }
          else {
              return node.nodeType === (vnode.isComment ? 8 : 3);
          }
      }
      return function patch(oldVnode, vnode, hydrating, removeOnly) {
          if (isUndef(vnode)) {
              if (isDef(oldVnode))
                  invokeDestroyHook(oldVnode);
              return;
          }
          var isInitialPatch = false;
          var insertedVnodeQueue = [];
          if (isUndef(oldVnode)) {
              // empty mount (likely as component), create new root element
              isInitialPatch = true;
              createElm(vnode, insertedVnodeQueue);
          }
          else {
              var isRealElement = isDef(oldVnode.nodeType);
              if (!isRealElement && sameVnode(oldVnode, vnode)) {
                  // patch existing root node
                  patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
              }
              else {
                  if (isRealElement) {
                      // mounting to a real element
                      // check if this is server-rendered content and if we can perform
                      // a successful hydration.
                      if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                          oldVnode.removeAttribute(SSR_ATTR);
                          hydrating = true;
                      }
                      if (isTrue(hydrating)) {
                          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                              invokeInsertHook(vnode, insertedVnodeQueue, true);
                              return oldVnode;
                          }
                          else {
                              warn$2('The client-side rendered virtual DOM tree is not matching ' +
                                  'server-rendered content. This is likely caused by incorrect ' +
                                  'HTML markup, for example nesting block-level elements inside ' +
                                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
                                  'full client-side render.');
                          }
                      }
                      // either not server-rendered, or hydration failed.
                      // create an empty node and replace it
                      oldVnode = emptyNodeAt(oldVnode);
                  }
                  // replacing existing element
                  var oldElm = oldVnode.elm;
                  var parentElm = nodeOps.parentNode(oldElm);
                  // create new node
                  createElm(vnode, insertedVnodeQueue, 
                  // extremely rare edge case: do not insert if old element is in a
                  // leaving transition. Only happens when combining transition +
                  // keep-alive + HOCs. (#4590)
                  oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                  // update parent placeholder node element, recursively
                  if (isDef(vnode.parent)) {
                      var ancestor = vnode.parent;
                      var patchable = isPatchable(vnode);
                      while (ancestor) {
                          for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                              cbs.destroy[i_8](ancestor);
                          }
                          ancestor.elm = vnode.elm;
                          if (patchable) {
                              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                                  cbs.create[i_9](emptyNode, ancestor);
                              }
                              // #6513
                              // invoke insert hooks that may have been merged by create hooks.
                              // e.g. for directives that uses the "inserted" hook.
                              var insert_1 = ancestor.data.hook.insert;
                              if (insert_1.merged) {
                                  // start at index 1 to avoid re-invoking component mounted hook
                                  // clone insert hooks to avoid being mutated during iteration.
                                  // e.g. for customed directives under transition group.
                                  var cloned = insert_1.fns.slice(1);
                                  for (var i_10 = 0; i_10 < cloned.length; i_10++) {
                                      cloned[i_10]();
                                  }
                              }
                          }
                          else {
                              registerRef(ancestor);
                          }
                          ancestor = ancestor.parent;
                      }
                  }
                  // destroy old node
                  if (isDef(parentElm)) {
                      removeVnodes([oldVnode], 0, 0);
                  }
                  else if (isDef(oldVnode.tag)) {
                      invokeDestroyHook(oldVnode);
                  }
              }
          }
          invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
          return vnode.elm;
      };
  }

  var directives$1 = {
      create: updateDirectives,
      update: updateDirectives,
      destroy: function unbindDirectives(vnode) {
          // @ts-expect-error emptyNode is not VNodeWithData
          updateDirectives(vnode, emptyNode);
      }
  };
  function updateDirectives(oldVnode, vnode) {
      if (oldVnode.data.directives || vnode.data.directives) {
          _update(oldVnode, vnode);
      }
  }
  function _update(oldVnode, vnode) {
      var isCreate = oldVnode === emptyNode;
      var isDestroy = vnode === emptyNode;
      var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
      var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
      var dirsWithInsert = [];
      var dirsWithPostpatch = [];
      var key, oldDir, dir;
      for (key in newDirs) {
          oldDir = oldDirs[key];
          dir = newDirs[key];
          if (!oldDir) {
              // new directive, bind
              callHook(dir, 'bind', vnode, oldVnode);
              if (dir.def && dir.def.inserted) {
                  dirsWithInsert.push(dir);
              }
          }
          else {
              // existing directive, update
              dir.oldValue = oldDir.value;
              dir.oldArg = oldDir.arg;
              callHook(dir, 'update', vnode, oldVnode);
              if (dir.def && dir.def.componentUpdated) {
                  dirsWithPostpatch.push(dir);
              }
          }
      }
      if (dirsWithInsert.length) {
          var callInsert = function () {
              for (var i = 0; i < dirsWithInsert.length; i++) {
                  callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode);
              }
          };
          if (isCreate) {
              mergeVNodeHook(vnode, 'insert', callInsert);
          }
          else {
              callInsert();
          }
      }
      if (dirsWithPostpatch.length) {
          mergeVNodeHook(vnode, 'postpatch', function () {
              for (var i = 0; i < dirsWithPostpatch.length; i++) {
                  callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
              }
          });
      }
      if (!isCreate) {
          for (key in oldDirs) {
              if (!newDirs[key]) {
                  // no longer present, unbind
                  callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
              }
          }
      }
  }
  var emptyModifiers = Object.create(null);
  function normalizeDirectives(dirs, vm) {
      var res = Object.create(null);
      if (!dirs) {
          // $flow-disable-line
          return res;
      }
      var i, dir;
      for (i = 0; i < dirs.length; i++) {
          dir = dirs[i];
          if (!dir.modifiers) {
              // $flow-disable-line
              dir.modifiers = emptyModifiers;
          }
          res[getRawDirName(dir)] = dir;
          if (vm._setupState && vm._setupState.__sfc) {
              var setupDef = dir.def || resolveAsset(vm, '_setupState', 'v-' + dir.name);
              if (typeof setupDef === 'function') {
                  dir.def = {
                      bind: setupDef,
                      update: setupDef,
                  };
              }
              else {
                  dir.def = setupDef;
              }
          }
          dir.def = dir.def || resolveAsset(vm.$options, 'directives', dir.name, true);
      }
      // $flow-disable-line
      return res;
  }
  function getRawDirName(dir) {
      return (dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join('.')));
  }
  function callHook(dir, hook, vnode, oldVnode, isDestroy) {
      var fn = dir.def && dir.def[hook];
      if (fn) {
          try {
              fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
          }
          catch (e) {
              handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
          }
      }
  }

  var baseModules = [ref, directives$1];

  function updateAttrs(oldVnode, vnode) {
      var opts = vnode.componentOptions;
      if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
          return;
      }
      if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
          return;
      }
      var key, cur, old;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs || {};
      var attrs = vnode.data.attrs || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
          attrs = vnode.data.attrs = extend({}, attrs);
      }
      for (key in attrs) {
          cur = attrs[key];
          old = oldAttrs[key];
          if (old !== cur) {
              setAttr(elm, key, cur, vnode.data.pre);
          }
      }
      // #4391: in IE9, setting type can reset value for input[type=radio]
      // #6666: IE/Edge forces progress value down to 1 before setting a max
      /* istanbul ignore if */
      if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
          setAttr(elm, 'value', attrs.value);
      }
      for (key in oldAttrs) {
          if (isUndef(attrs[key])) {
              if (isXlink(key)) {
                  elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
              }
              else if (!isEnumeratedAttr(key)) {
                  elm.removeAttribute(key);
              }
          }
      }
  }
  function setAttr(el, key, value, isInPre) {
      if (isInPre || el.tagName.indexOf('-') > -1) {
          baseSetAttr(el, key, value);
      }
      else if (isBooleanAttr(key)) {
          // set attribute for blank value
          // e.g. <option disabled>Select one</option>
          if (isFalsyAttrValue(value)) {
              el.removeAttribute(key);
          }
          else {
              // technically allowfullscreen is a boolean attribute for <iframe>,
              // but Flash expects a value of "true" when used on <embed> tag
              value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
              el.setAttribute(key, value);
          }
      }
      else if (isEnumeratedAttr(key)) {
          el.setAttribute(key, convertEnumeratedValue(key, value));
      }
      else if (isXlink(key)) {
          if (isFalsyAttrValue(value)) {
              el.removeAttributeNS(xlinkNS, getXlinkProp(key));
          }
          else {
              el.setAttributeNS(xlinkNS, key, value);
          }
      }
      else {
          baseSetAttr(el, key, value);
      }
  }
  function baseSetAttr(el, key, value) {
      if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
      }
      else {
          // #7138: IE10 & 11 fires input event when setting placeholder on
          // <textarea>... block the first input event and remove the blocker
          // immediately.
          /* istanbul ignore if */
          if (isIE &&
              !isIE9 &&
              el.tagName === 'TEXTAREA' &&
              key === 'placeholder' &&
              value !== '' &&
              !el.__ieph) {
              var blocker_1 = function (e) {
                  e.stopImmediatePropagation();
                  el.removeEventListener('input', blocker_1);
              };
              el.addEventListener('input', blocker_1);
              // $flow-disable-line
              el.__ieph = true; /* IE placeholder patched */
          }
          el.setAttribute(key, value);
      }
  }
  var attrs = {
      create: updateAttrs,
      update: updateAttrs
  };

  function updateClass(oldVnode, vnode) {
      var el = vnode.elm;
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticClass) &&
          isUndef(data.class) &&
          (isUndef(oldData) ||
              (isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
          return;
      }
      var cls = genClassForVnode(vnode);
      // handle transition classes
      var transitionClass = el._transitionClasses;
      if (isDef(transitionClass)) {
          cls = concat(cls, stringifyClass(transitionClass));
      }
      // set the class
      if (cls !== el._prevClass) {
          el.setAttribute('class', cls);
          el._prevClass = cls;
      }
  }
  var klass$1 = {
      create: updateClass,
      update: updateClass
  };

  var validDivisionCharRE = /[\w).+\-_$\]]/;
  function parseFilters(exp) {
      var inSingle = false;
      var inDouble = false;
      var inTemplateString = false;
      var inRegex = false;
      var curly = 0;
      var square = 0;
      var paren = 0;
      var lastFilterIndex = 0;
      var c, prev, i, expression, filters;
      for (i = 0; i < exp.length; i++) {
          prev = c;
          c = exp.charCodeAt(i);
          if (inSingle) {
              if (c === 0x27 && prev !== 0x5c)
                  inSingle = false;
          }
          else if (inDouble) {
              if (c === 0x22 && prev !== 0x5c)
                  inDouble = false;
          }
          else if (inTemplateString) {
              if (c === 0x60 && prev !== 0x5c)
                  inTemplateString = false;
          }
          else if (inRegex) {
              if (c === 0x2f && prev !== 0x5c)
                  inRegex = false;
          }
          else if (c === 0x7c && // pipe
              exp.charCodeAt(i + 1) !== 0x7c &&
              exp.charCodeAt(i - 1) !== 0x7c &&
              !curly &&
              !square &&
              !paren) {
              if (expression === undefined) {
                  // first filter, end of expression
                  lastFilterIndex = i + 1;
                  expression = exp.slice(0, i).trim();
              }
              else {
                  pushFilter();
              }
          }
          else {
              switch (c) {
                  case 0x22:
                      inDouble = true;
                      break; // "
                  case 0x27:
                      inSingle = true;
                      break; // '
                  case 0x60:
                      inTemplateString = true;
                      break; // `
                  case 0x28:
                      paren++;
                      break; // (
                  case 0x29:
                      paren--;
                      break; // )
                  case 0x5b:
                      square++;
                      break; // [
                  case 0x5d:
                      square--;
                      break; // ]
                  case 0x7b:
                      curly++;
                      break; // {
                  case 0x7d:
                      curly--;
                      break; // }
              }
              if (c === 0x2f) {
                  // /
                  var j = i - 1;
                  var p 
                  // find first non-whitespace prev char
                  = void 0;
                  // find first non-whitespace prev char
                  for (; j >= 0; j--) {
                      p = exp.charAt(j);
                      if (p !== ' ')
                          break;
                  }
                  if (!p || !validDivisionCharRE.test(p)) {
                      inRegex = true;
                  }
              }
          }
      }
      if (expression === undefined) {
          expression = exp.slice(0, i).trim();
      }
      else if (lastFilterIndex !== 0) {
          pushFilter();
      }
      function pushFilter() {
          (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
          lastFilterIndex = i + 1;
      }
      if (filters) {
          for (i = 0; i < filters.length; i++) {
              expression = wrapFilter(expression, filters[i]);
          }
      }
      return expression;
  }
  function wrapFilter(exp, filter) {
      var i = filter.indexOf('(');
      if (i < 0) {
          // _f: resolveFilter
          return "_f(\"".concat(filter, "\")(").concat(exp, ")");
      }
      else {
          var name_1 = filter.slice(0, i);
          var args = filter.slice(i + 1);
          return "_f(\"".concat(name_1, "\")(").concat(exp).concat(args !== ')' ? ',' + args : args);
      }
  }

  /* eslint-disable no-unused-vars */
  function baseWarn(msg, range) {
      console.error("[Vue compiler]: ".concat(msg));
  }
  /* eslint-enable no-unused-vars */
  function pluckModuleFunction(modules, key) {
      return modules ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; }) : [];
  }
  function addProp(el, name, value, range, dynamic) {
      (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
      el.plain = false;
  }
  function addAttr(el, name, value, range, dynamic) {
      var attrs = dynamic
          ? el.dynamicAttrs || (el.dynamicAttrs = [])
          : el.attrs || (el.attrs = []);
      attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
      el.plain = false;
  }
  // add a raw attr (use this in preTransforms)
  function addRawAttr(el, name, value, range) {
      el.attrsMap[name] = value;
      el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
  }
  function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
      (el.directives || (el.directives = [])).push(rangeSetItem({
          name: name,
          rawName: rawName,
          value: value,
          arg: arg,
          isDynamicArg: isDynamicArg,
          modifiers: modifiers
      }, range));
      el.plain = false;
  }
  function prependModifierMarker(symbol, name, dynamic) {
      return dynamic ? "_p(".concat(name, ",\"").concat(symbol, "\")") : symbol + name; // mark the event as captured
  }
  function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
      modifiers = modifiers || emptyObject;
      // warn prevent and passive modifier
      /* istanbul ignore if */
      if (warn && modifiers.prevent && modifiers.passive) {
          warn("passive and prevent can't be used together. " +
              "Passive handler can't prevent default event.", range);
      }
      // normalize click.right and click.middle since they don't actually fire
      // this is technically browser-specific, but at least for now browsers are
      // the only target envs that have right/middle clicks.
      if (modifiers.right) {
          if (dynamic) {
              name = "(".concat(name, ")==='click'?'contextmenu':(").concat(name, ")");
          }
          else if (name === 'click') {
              name = 'contextmenu';
              delete modifiers.right;
          }
      }
      else if (modifiers.middle) {
          if (dynamic) {
              name = "(".concat(name, ")==='click'?'mouseup':(").concat(name, ")");
          }
          else if (name === 'click') {
              name = 'mouseup';
          }
      }
      // check capture modifier
      if (modifiers.capture) {
          delete modifiers.capture;
          name = prependModifierMarker('!', name, dynamic);
      }
      if (modifiers.once) {
          delete modifiers.once;
          name = prependModifierMarker('~', name, dynamic);
      }
      /* istanbul ignore if */
      if (modifiers.passive) {
          delete modifiers.passive;
          name = prependModifierMarker('&', name, dynamic);
      }
      var events;
      if (modifiers.native) {
          delete modifiers.native;
          events = el.nativeEvents || (el.nativeEvents = {});
      }
      else {
          events = el.events || (el.events = {});
      }
      var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
      if (modifiers !== emptyObject) {
          newHandler.modifiers = modifiers;
      }
      var handlers = events[name];
      /* istanbul ignore if */
      if (Array.isArray(handlers)) {
          important ? handlers.unshift(newHandler) : handlers.push(newHandler);
      }
      else if (handlers) {
          events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
      }
      else {
          events[name] = newHandler;
      }
      el.plain = false;
  }
  function getRawBindingAttr(el, name) {
      return (el.rawAttrsMap[':' + name] ||
          el.rawAttrsMap['v-bind:' + name] ||
          el.rawAttrsMap[name]);
  }
  function getBindingAttr(el, name, getStatic) {
      var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
      if (dynamicValue != null) {
          return parseFilters(dynamicValue);
      }
      else if (getStatic !== false) {
          var staticValue = getAndRemoveAttr(el, name);
          if (staticValue != null) {
              return JSON.stringify(staticValue);
          }
      }
  }
  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.
  function getAndRemoveAttr(el, name, removeFromMap) {
      var val;
      if ((val = el.attrsMap[name]) != null) {
          var list = el.attrsList;
          for (var i = 0, l = list.length; i < l; i++) {
              if (list[i].name === name) {
                  list.splice(i, 1);
                  break;
              }
          }
      }
      if (removeFromMap) {
          delete el.attrsMap[name];
      }
      return val;
  }
  function getAndRemoveAttrByRegex(el, name) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
          var attr = list[i];
          if (name.test(attr.name)) {
              list.splice(i, 1);
              return attr;
          }
      }
  }
  function rangeSetItem(item, range) {
      if (range) {
          if (range.start != null) {
              item.start = range.start;
          }
          if (range.end != null) {
              item.end = range.end;
          }
      }
      return item;
  }

  /**
   * Cross-platform code generation for component v-model
   */
  function genComponentModel(el, value, modifiers) {
      var _a = modifiers || {}, number = _a.number, trim = _a.trim;
      var baseValueExpression = '$$v';
      var valueExpression = baseValueExpression;
      if (trim) {
          valueExpression =
              "(typeof ".concat(baseValueExpression, " === 'string'") +
                  "? ".concat(baseValueExpression, ".trim()") +
                  ": ".concat(baseValueExpression, ")");
      }
      if (number) {
          valueExpression = "_n(".concat(valueExpression, ")");
      }
      var assignment = genAssignmentCode(value, valueExpression);
      el.model = {
          value: "(".concat(value, ")"),
          expression: JSON.stringify(value),
          callback: "function (".concat(baseValueExpression, ") {").concat(assignment, "}")
      };
  }
  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  function genAssignmentCode(value, assignment) {
      var res = parseModel(value);
      if (res.key === null) {
          return "".concat(value, "=").concat(assignment);
      }
      else {
          return "$set(".concat(res.exp, ", ").concat(res.key, ", ").concat(assignment, ")");
      }
  }
  /**
   * Parse a v-model expression into a base path and a final key segment.
   * Handles both dot-path and possible square brackets.
   *
   * Possible cases:
   *
   * - test
   * - test[key]
   * - test[test1[key]]
   * - test["a"][key]
   * - xxx.test[a[a].test1[key]]
   * - test.xxx.a["asa"][test1[key]]
   *
   */
  var len, str, chr, index, expressionPos, expressionEndPos;
  function parseModel(val) {
      // Fix https://github.com/vuejs/vue/pull/7730
      // allow v-model="obj.val " (trailing whitespace)
      val = val.trim();
      len = val.length;
      if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
          index = val.lastIndexOf('.');
          if (index > -1) {
              return {
                  exp: val.slice(0, index),
                  key: '"' + val.slice(index + 1) + '"'
              };
          }
          else {
              return {
                  exp: val,
                  key: null
              };
          }
      }
      str = val;
      index = expressionPos = expressionEndPos = 0;
      while (!eof()) {
          chr = next();
          /* istanbul ignore if */
          if (isStringStart(chr)) {
              parseString(chr);
          }
          else if (chr === 0x5b) {
              parseBracket(chr);
          }
      }
      return {
          exp: val.slice(0, expressionPos),
          key: val.slice(expressionPos + 1, expressionEndPos)
      };
  }
  function next() {
      return str.charCodeAt(++index);
  }
  function eof() {
      return index >= len;
  }
  function isStringStart(chr) {
      return chr === 0x22 || chr === 0x27;
  }
  function parseBracket(chr) {
      var inBracket = 1;
      expressionPos = index;
      while (!eof()) {
          chr = next();
          if (isStringStart(chr)) {
              parseString(chr);
              continue;
          }
          if (chr === 0x5b)
              inBracket++;
          if (chr === 0x5d)
              inBracket--;
          if (inBracket === 0) {
              expressionEndPos = index;
              break;
          }
      }
  }
  function parseString(chr) {
      var stringQuote = chr;
      while (!eof()) {
          chr = next();
          if (chr === stringQuote) {
              break;
          }
      }
  }

  var warn$1;
  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';
  function model$1(el, dir, _warn) {
      warn$1 = _warn;
      var value = dir.value;
      var modifiers = dir.modifiers;
      var tag = el.tag;
      var type = el.attrsMap.type;
      {
          // inputs with type="file" are read only and setting the input's
          // value will throw an error.
          if (tag === 'input' && type === 'file') {
              warn$1("<".concat(el.tag, " v-model=\"").concat(value, "\" type=\"file\">:\n") +
                  "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap['v-model']);
          }
      }
      if (el.component) {
          genComponentModel(el, value, modifiers);
          // component v-model doesn't need extra runtime
          return false;
      }
      else if (tag === 'select') {
          genSelect(el, value, modifiers);
      }
      else if (tag === 'input' && type === 'checkbox') {
          genCheckboxModel(el, value, modifiers);
      }
      else if (tag === 'input' && type === 'radio') {
          genRadioModel(el, value, modifiers);
      }
      else if (tag === 'input' || tag === 'textarea') {
          genDefaultModel(el, value, modifiers);
      }
      else if (!config.isReservedTag(tag)) {
          genComponentModel(el, value, modifiers);
          // component v-model doesn't need extra runtime
          return false;
      }
      else {
          warn$1("<".concat(el.tag, " v-model=\"").concat(value, "\">: ") +
              "v-model is not supported on this element type. " +
              "If you are working with contenteditable, it's recommended to " +
              'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
      }
      // ensure runtime directive metadata
      return true;
  }
  function genCheckboxModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
      var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
      addProp(el, 'checked', "Array.isArray(".concat(value, ")") +
          "?_i(".concat(value, ",").concat(valueBinding, ")>-1") +
          (trueValueBinding === 'true'
              ? ":(".concat(value, ")")
              : ":_q(".concat(value, ",").concat(trueValueBinding, ")")));
      addHandler(el, 'change', "var $$a=".concat(value, ",") +
          '$$el=$event.target,' +
          "$$c=$$el.checked?(".concat(trueValueBinding, "):(").concat(falseValueBinding, ");") +
          'if(Array.isArray($$a)){' +
          "var $$v=".concat(number ? '_n(' + valueBinding + ')' : valueBinding, ",") +
          '$$i=_i($$a,$$v);' +
          "if($$el.checked){$$i<0&&(".concat(genAssignmentCode(value, '$$a.concat([$$v])'), ")}") +
          "else{$$i>-1&&(".concat(genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))'), ")}") +
          "}else{".concat(genAssignmentCode(value, '$$c'), "}"), null, true);
  }
  function genRadioModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      valueBinding = number ? "_n(".concat(valueBinding, ")") : valueBinding;
      addProp(el, 'checked', "_q(".concat(value, ",").concat(valueBinding, ")"));
      addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
  }
  function genSelect(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var selectedVal = "Array.prototype.filter" +
          ".call($event.target.options,function(o){return o.selected})" +
          ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
          "return ".concat(number ? '_n(val)' : 'val', "})");
      var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
      var code = "var $$selectedVal = ".concat(selectedVal, ";");
      code = "".concat(code, " ").concat(genAssignmentCode(value, assignment));
      addHandler(el, 'change', code, null, true);
  }
  function genDefaultModel(el, value, modifiers) {
      var type = el.attrsMap.type;
      // warn if v-bind:value conflicts with v-model
      // except for inputs with v-bind:type
      {
          var value_1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
          var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
          if (value_1 && !typeBinding) {
              var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
              warn$1("".concat(binding, "=\"").concat(value_1, "\" conflicts with v-model on the same element ") +
                  'because the latter already expands to a value binding internally', el.rawAttrsMap[binding]);
          }
      }
      var _a = modifiers || {}, lazy = _a.lazy, number = _a.number, trim = _a.trim;
      var needCompositionGuard = !lazy && type !== 'range';
      var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';
      var valueExpression = '$event.target.value';
      if (trim) {
          valueExpression = "$event.target.value.trim()";
      }
      if (number) {
          valueExpression = "_n(".concat(valueExpression, ")");
      }
      var code = genAssignmentCode(value, valueExpression);
      if (needCompositionGuard) {
          code = "if($event.target.composing)return;".concat(code);
      }
      addProp(el, 'value', "(".concat(value, ")"));
      addHandler(el, event, code, null, true);
      if (trim || number) {
          addHandler(el, 'blur', '$forceUpdate()');
      }
  }

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents(on) {
      /* istanbul ignore if */
      if (isDef(on[RANGE_TOKEN])) {
          // IE input[type=range] only supports `change` event
          var event_1 = isIE ? 'change' : 'input';
          on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
          delete on[RANGE_TOKEN];
      }
      // This was originally intended to fix #4521 but no longer necessary
      // after 2.5. Keeping it for backwards compat with generated code from < 2.4
      /* istanbul ignore if */
      if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
          on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
          delete on[CHECKBOX_RADIO_TOKEN];
      }
  }
  var target;
  function createOnceHandler(event, handler, capture) {
      var _target = target; // save current target element in closure
      return function onceHandler() {
          var res = handler.apply(null, arguments);
          if (res !== null) {
              remove(event, onceHandler, capture, _target);
          }
      };
  }
  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add(name, handler, capture, passive) {
      // async edge case #6566: inner click event triggers patch, event handler
      // attached to outer element during patch, and triggered again. This
      // happens because browsers fire microtask ticks between event propagation.
      // the solution is simple: we save the timestamp when a handler is attached,
      // and the handler would only fire if the event passed to it was fired
      // AFTER it was attached.
      if (useMicrotaskFix) {
          var attachedTimestamp_1 = currentFlushTimestamp;
          var original_1 = handler;
          //@ts-expect-error
          handler = original_1._wrapper = function (e) {
              if (
              // no bubbling, should always fire.
              // this is just a safety net in case event.timeStamp is unreliable in
              // certain weird environments...
              e.target === e.currentTarget ||
                  // event is fired after handler attachment
                  e.timeStamp >= attachedTimestamp_1 ||
                  // bail for environments that have buggy event.timeStamp implementations
                  // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
                  // #9681 QtWebEngine event.timeStamp is negative value
                  e.timeStamp <= 0 ||
                  // #9448 bail if event is fired in another document in a multi-page
                  // electron/nw.js app, since event.timeStamp will be using a different
                  // starting reference
                  e.target.ownerDocument !== document) {
                  return original_1.apply(this, arguments);
              }
          };
      }
      target.addEventListener(name, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
  }
  function remove(name, handler, capture, _target) {
      (_target || target).removeEventListener(name, 
      //@ts-expect-error
      handler._wrapper || handler, capture);
  }
  function updateDOMListeners(oldVnode, vnode) {
      if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
          return;
      }
      var on = vnode.data.on || {};
      var oldOn = oldVnode.data.on || {};
      // vnode is empty when removing all listeners,
      // and use old vnode dom element
      target = vnode.elm || oldVnode.elm;
      normalizeEvents(on);
      updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
      target = undefined;
  }
  var events = {
      create: updateDOMListeners,
      update: updateDOMListeners,
      // @ts-expect-error emptyNode has actually data
      destroy: function (vnode) { return updateDOMListeners(vnode, emptyNode); }
  };

  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
      if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
          return;
      }
      var key, cur;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
          props = vnode.data.domProps = extend({}, props);
      }
      for (key in oldProps) {
          if (!(key in props)) {
              elm[key] = '';
          }
      }
      for (key in props) {
          cur = props[key];
          // ignore children if the node has textContent or innerHTML,
          // as these will throw away existing DOM nodes and cause removal errors
          // on subsequent patches (#3360)
          if (key === 'textContent' || key === 'innerHTML') {
              if (vnode.children)
                  vnode.children.length = 0;
              if (cur === oldProps[key])
                  continue;
              // #6601 work around Chrome version <= 55 bug where single textNode
              // replaced by innerHTML/textContent retains its parentNode property
              if (elm.childNodes.length === 1) {
                  elm.removeChild(elm.childNodes[0]);
              }
          }
          if (key === 'value' && elm.tagName !== 'PROGRESS') {
              // store value as _value as well since
              // non-string values will be stringified
              elm._value = cur;
              // avoid resetting cursor position when value is the same
              var strCur = isUndef(cur) ? '' : String(cur);
              if (shouldUpdateValue(elm, strCur)) {
                  elm.value = strCur;
              }
          }
          else if (key === 'innerHTML' &&
              isSVG(elm.tagName) &&
              isUndef(elm.innerHTML)) {
              // IE doesn't support innerHTML for SVG elements
              svgContainer = svgContainer || document.createElement('div');
              svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
              var svg = svgContainer.firstChild;
              while (elm.firstChild) {
                  elm.removeChild(elm.firstChild);
              }
              while (svg.firstChild) {
                  elm.appendChild(svg.firstChild);
              }
          }
          else if (
          // skip the update if old and new VDOM state is the same.
          // `value` is handled separately because the DOM value may be temporarily
          // out of sync with VDOM state due to focus, composition and modifiers.
          // This  #4521 by skipping the unnecessary `checked` update.
          cur !== oldProps[key]) {
              // some property updates can throw
              // e.g. `value` on <progress> w/ non-finite value
              try {
                  elm[key] = cur;
              }
              catch (e) { }
          }
      }
  }
  function shouldUpdateValue(elm, checkVal) {
      return (
      //@ts-expect-error
      !elm.composing &&
          (elm.tagName === 'OPTION' ||
              isNotInFocusAndDirty(elm, checkVal) ||
              isDirtyWithModifiers(elm, checkVal)));
  }
  function isNotInFocusAndDirty(elm, checkVal) {
      // return true when textbox (.number and .trim) loses focus and its value is
      // not equal to the updated value
      var notInFocus = true;
      // #6157
      // work around IE bug when accessing document.activeElement in an iframe
      try {
          notInFocus = document.activeElement !== elm;
      }
      catch (e) { }
      return notInFocus && elm.value !== checkVal;
  }
  function isDirtyWithModifiers(elm, newVal) {
      var value = elm.value;
      var modifiers = elm._vModifiers; // injected by v-model runtime
      if (isDef(modifiers)) {
          if (modifiers.number) {
              return toNumber(value) !== toNumber(newVal);
          }
          if (modifiers.trim) {
              return value.trim() !== newVal.trim();
          }
      }
      return value !== newVal;
  }
  var domProps = {
      create: updateDOMProps,
      update: updateDOMProps
  };

  var parseStyleText = cached(function (cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function (item) {
          if (item) {
              var tmp = item.split(propertyDelimiter);
              tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return res;
  });
  // merge static and dynamic style data on the same vnode
  function normalizeStyleData(data) {
      var style = normalizeStyleBinding(data.style);
      // static style is pre-processed into an object during compilation
      // and is always a fresh object, so it's safe to merge into it
      return data.staticStyle ? extend(data.staticStyle, style) : style;
  }
  // normalize possible array / string values into Object
  function normalizeStyleBinding(bindingStyle) {
      if (Array.isArray(bindingStyle)) {
          return toObject(bindingStyle);
      }
      if (typeof bindingStyle === 'string') {
          return parseStyleText(bindingStyle);
      }
      return bindingStyle;
  }
  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle(vnode, checkChild) {
      var res = {};
      var styleData;
      if (checkChild) {
          var childNode = vnode;
          while (childNode.componentInstance) {
              childNode = childNode.componentInstance._vnode;
              if (childNode &&
                  childNode.data &&
                  (styleData = normalizeStyleData(childNode.data))) {
                  extend(res, styleData);
              }
          }
      }
      if ((styleData = normalizeStyleData(vnode.data))) {
          extend(res, styleData);
      }
      var parentNode = vnode;
      // @ts-expect-error parentNode.parent not VNodeWithData
      while ((parentNode = parentNode.parent)) {
          if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
              extend(res, styleData);
          }
      }
      return res;
  }

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
      /* istanbul ignore if */
      if (cssVarRE.test(name)) {
          el.style.setProperty(name, val);
      }
      else if (importantRE.test(val)) {
          el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
      }
      else {
          var normalizedName = normalize(name);
          if (Array.isArray(val)) {
              // Support values array created by autoprefixer, e.g.
              // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
              // Set them one by one, and the browser will only set those it can recognize
              for (var i = 0, len = val.length; i < len; i++) {
                  el.style[normalizedName] = val[i];
              }
          }
          else {
              el.style[normalizedName] = val;
          }
      }
  };
  var vendorNames = ['Webkit', 'Moz', 'ms'];
  var emptyStyle;
  var normalize = cached(function (prop) {
      emptyStyle = emptyStyle || document.createElement('div').style;
      prop = camelize(prop);
      if (prop !== 'filter' && prop in emptyStyle) {
          return prop;
      }
      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = 0; i < vendorNames.length; i++) {
          var name_1 = vendorNames[i] + capName;
          if (name_1 in emptyStyle) {
              return name_1;
          }
      }
  });
  function updateStyle(oldVnode, vnode) {
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticStyle) &&
          isUndef(data.style) &&
          isUndef(oldData.staticStyle) &&
          isUndef(oldData.style)) {
          return;
      }
      var cur, name;
      var el = vnode.elm;
      var oldStaticStyle = oldData.staticStyle;
      var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
      // if static style exists, stylebinding already merged into it when doing normalizeStyleData
      var oldStyle = oldStaticStyle || oldStyleBinding;
      var style = normalizeStyleBinding(vnode.data.style) || {};
      // store normalized style under a different key for next diff
      // make sure to clone it if it's reactive, since the user likely wants
      // to mutate it.
      vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
      var newStyle = getStyle(vnode, true);
      for (name in oldStyle) {
          if (isUndef(newStyle[name])) {
              setProp(el, name, '');
          }
      }
      for (name in newStyle) {
          cur = newStyle[name];
          // ie9 setting to null has no effect, must use empty string
          setProp(el, name, cur == null ? '' : cur);
      }
  }
  var style$1 = {
      create: updateStyle,
      update: updateStyle
  };

  var whitespaceRE$1 = /\s+/;
  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass(el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
          return;
      }
      /* istanbul ignore else */
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE$1).forEach(function (c) { return el.classList.add(c); });
          }
          else {
              el.classList.add(cls);
          }
      }
      else {
          var cur = " ".concat(el.getAttribute('class') || '', " ");
          if (cur.indexOf(' ' + cls + ' ') < 0) {
              el.setAttribute('class', (cur + cls).trim());
          }
      }
  }
  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass(el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
          return;
      }
      /* istanbul ignore else */
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE$1).forEach(function (c) { return el.classList.remove(c); });
          }
          else {
              el.classList.remove(cls);
          }
          if (!el.classList.length) {
              el.removeAttribute('class');
          }
      }
      else {
          var cur = " ".concat(el.getAttribute('class') || '', " ");
          var tar = ' ' + cls + ' ';
          while (cur.indexOf(tar) >= 0) {
              cur = cur.replace(tar, ' ');
          }
          cur = cur.trim();
          if (cur) {
              el.setAttribute('class', cur);
          }
          else {
              el.removeAttribute('class');
          }
      }
  }

  function resolveTransition(def) {
      if (!def) {
          return;
      }
      /* istanbul ignore else */
      if (typeof def === 'object') {
          var res = {};
          if (def.css !== false) {
              extend(res, autoCssTransition(def.name || 'v'));
          }
          extend(res, def);
          return res;
      }
      else if (typeof def === 'string') {
          return autoCssTransition(def);
      }
  }
  var autoCssTransition = cached(function (name) {
      return {
          enterClass: "".concat(name, "-enter"),
          enterToClass: "".concat(name, "-enter-to"),
          enterActiveClass: "".concat(name, "-enter-active"),
          leaveClass: "".concat(name, "-leave"),
          leaveToClass: "".concat(name, "-leave-to"),
          leaveActiveClass: "".concat(name, "-leave-active")
      };
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';
  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
      /* istanbul ignore if */
      if (window.ontransitionend === undefined &&
          window.onwebkittransitionend !== undefined) {
          transitionProp = 'WebkitTransition';
          transitionEndEvent = 'webkitTransitionEnd';
      }
      if (window.onanimationend === undefined &&
          window.onwebkitanimationend !== undefined) {
          animationProp = 'WebkitAnimation';
          animationEndEvent = 'webkitAnimationEnd';
      }
  }
  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
      ? window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : setTimeout
      : /* istanbul ignore next */ function (/* istanbul ignore next */ fn) { return fn(); };
  function nextFrame(fn) {
      raf(function () {
          // @ts-expect-error
          raf(fn);
      });
  }
  function addTransitionClass(el, cls) {
      var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
      if (transitionClasses.indexOf(cls) < 0) {
          transitionClasses.push(cls);
          addClass(el, cls);
      }
  }
  function removeTransitionClass(el, cls) {
      if (el._transitionClasses) {
          remove$2(el._transitionClasses, cls);
      }
      removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
      var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
      if (!type)
          return cb();
      var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function () {
          el.removeEventListener(event, onEnd);
          cb();
      };
      var onEnd = function (e) {
          if (e.target === el) {
              if (++ended >= propCount) {
                  end();
              }
          }
      };
      setTimeout(function () {
          if (ended < propCount) {
              end();
          }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
      var styles = window.getComputedStyle(el);
      // JSDOM may return undefined for transition properties
      var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
      var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
      var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
      var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
      var animationTimeout = getTimeout(animationDelays, animationDurations);
      var type;
      var timeout = 0;
      var propCount = 0;
      /* istanbul ignore if */
      if (expectedType === TRANSITION) {
          if (transitionTimeout > 0) {
              type = TRANSITION;
              timeout = transitionTimeout;
              propCount = transitionDurations.length;
          }
      }
      else if (expectedType === ANIMATION) {
          if (animationTimeout > 0) {
              type = ANIMATION;
              timeout = animationTimeout;
              propCount = animationDurations.length;
          }
      }
      else {
          timeout = Math.max(transitionTimeout, animationTimeout);
          type =
              timeout > 0
                  ? transitionTimeout > animationTimeout
                      ? TRANSITION
                      : ANIMATION
                  : null;
          propCount = type
              ? type === TRANSITION
                  ? transitionDurations.length
                  : animationDurations.length
              : 0;
      }
      var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
      return {
          type: type,
          timeout: timeout,
          propCount: propCount,
          hasTransform: hasTransform
      };
  }
  function getTimeout(delays, durations) {
      /* istanbul ignore next */
      while (delays.length < durations.length) {
          delays = delays.concat(delays);
      }
      return Math.max.apply(null, durations.map(function (d, i) {
          return toMs(d) + toMs(delays[i]);
      }));
  }
  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs(s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000;
  }

  function enter(vnode, toggleDisplay) {
      var el = vnode.elm;
      // call leave callback now
      if (isDef(el._leaveCb)) {
          el._leaveCb.cancelled = true;
          el._leaveCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
          return;
      }
      /* istanbul ignore if */
      if (isDef(el._enterCb) || el.nodeType !== 1) {
          return;
      }
      var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
      // activeInstance will always be the <transition> component managing this
      // transition. One edge case to check is when the <transition> is placed
      // as the root node of a child component. In that case we need to check
      // <transition>'s parent for appear check.
      var context = activeInstance;
      var transitionNode = activeInstance.$vnode;
      while (transitionNode && transitionNode.parent) {
          context = transitionNode.context;
          transitionNode = transitionNode.parent;
      }
      var isAppear = !context._isMounted || !vnode.isRootInsert;
      if (isAppear && !appear && appear !== '') {
          return;
      }
      var startClass = isAppear && appearClass ? appearClass : enterClass;
      var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
      var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
      var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
      var enterHook = isAppear ? (isFunction(appear) ? appear : enter) : enter;
      var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
      var enterCancelledHook = isAppear
          ? appearCancelled || enterCancelled
          : enterCancelled;
      var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
      if (explicitEnterDuration != null) {
          checkDuration(explicitEnterDuration, 'enter', vnode);
      }
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(enterHook);
      var cb = (el._enterCb = once(function () {
          if (expectsCSS) {
              removeTransitionClass(el, toClass);
              removeTransitionClass(el, activeClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, startClass);
              }
              enterCancelledHook && enterCancelledHook(el);
          }
          else {
              afterEnterHook && afterEnterHook(el);
          }
          el._enterCb = null;
      }));
      if (!vnode.data.show) {
          // remove pending leave element on enter by injecting an insert hook
          mergeVNodeHook(vnode, 'insert', function () {
              var parent = el.parentNode;
              var pendingNode = parent && parent._pending && parent._pending[vnode.key];
              if (pendingNode &&
                  pendingNode.tag === vnode.tag &&
                  pendingNode.elm._leaveCb) {
                  pendingNode.elm._leaveCb();
              }
              enterHook && enterHook(el, cb);
          });
      }
      // start enter transition
      beforeEnterHook && beforeEnterHook(el);
      if (expectsCSS) {
          addTransitionClass(el, startClass);
          addTransitionClass(el, activeClass);
          nextFrame(function () {
              removeTransitionClass(el, startClass);
              // @ts-expect-error
              if (!cb.cancelled) {
                  addTransitionClass(el, toClass);
                  if (!userWantsControl) {
                      if (isValidDuration(explicitEnterDuration)) {
                          setTimeout(cb, explicitEnterDuration);
                      }
                      else {
                          whenTransitionEnds(el, type, cb);
                      }
                  }
              }
          });
      }
      if (vnode.data.show) {
          toggleDisplay && toggleDisplay();
          enterHook && enterHook(el, cb);
      }
      if (!expectsCSS && !userWantsControl) {
          cb();
      }
  }
  function leave(vnode, rm) {
      var el = vnode.elm;
      // call enter callback now
      if (isDef(el._enterCb)) {
          el._enterCb.cancelled = true;
          el._enterCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data) || el.nodeType !== 1) {
          return rm();
      }
      /* istanbul ignore if */
      if (isDef(el._leaveCb)) {
          return;
      }
      var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(leave);
      var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
      if (isDef(explicitLeaveDuration)) {
          checkDuration(explicitLeaveDuration, 'leave', vnode);
      }
      var cb = (el._leaveCb = once(function () {
          if (el.parentNode && el.parentNode._pending) {
              el.parentNode._pending[vnode.key] = null;
          }
          if (expectsCSS) {
              removeTransitionClass(el, leaveToClass);
              removeTransitionClass(el, leaveActiveClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, leaveClass);
              }
              leaveCancelled && leaveCancelled(el);
          }
          else {
              rm();
              afterLeave && afterLeave(el);
          }
          el._leaveCb = null;
      }));
      if (delayLeave) {
          delayLeave(performLeave);
      }
      else {
          performLeave();
      }
      function performLeave() {
          // the delayed leave may have already been cancelled
          // @ts-expect-error
          if (cb.cancelled) {
              return;
          }
          // record leaving element
          if (!vnode.data.show && el.parentNode) {
              (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] =
                  vnode;
          }
          beforeLeave && beforeLeave(el);
          if (expectsCSS) {
              addTransitionClass(el, leaveClass);
              addTransitionClass(el, leaveActiveClass);
              nextFrame(function () {
                  removeTransitionClass(el, leaveClass);
                  // @ts-expect-error
                  if (!cb.cancelled) {
                      addTransitionClass(el, leaveToClass);
                      if (!userWantsControl) {
                          if (isValidDuration(explicitLeaveDuration)) {
                              setTimeout(cb, explicitLeaveDuration);
                          }
                          else {
                              whenTransitionEnds(el, type, cb);
                          }
                      }
                  }
              });
          }
          leave && leave(el, cb);
          if (!expectsCSS && !userWantsControl) {
              cb();
          }
      }
  }
  // only used in dev mode
  function checkDuration(val, name, vnode) {
      if (typeof val !== 'number') {
          warn$2("<transition> explicit ".concat(name, " duration is not a valid number - ") +
              "got ".concat(JSON.stringify(val), "."), vnode.context);
      }
      else if (isNaN(val)) {
          warn$2("<transition> explicit ".concat(name, " duration is NaN - ") +
              'the duration expression might be incorrect.', vnode.context);
      }
  }
  function isValidDuration(val) {
      return typeof val === 'number' && !isNaN(val);
  }
  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength(fn) {
      if (isUndef(fn)) {
          return false;
      }
      // @ts-expect-error
      var invokerFns = fn.fns;
      if (isDef(invokerFns)) {
          // invoker
          return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
      }
      else {
          // @ts-expect-error
          return (fn._length || fn.length) > 1;
      }
  }
  function _enter(_, vnode) {
      if (vnode.data.show !== true) {
          enter(vnode);
      }
  }
  var transition = inBrowser
      ? {
          create: _enter,
          activate: _enter,
          remove: function (vnode, rm) {
              /* istanbul ignore else */
              if (vnode.data.show !== true) {
                  // @ts-expect-error
                  leave(vnode, rm);
              }
              else {
                  rm();
              }
          }
      }
      : {};

  var platformModules = [attrs, klass$1, events, domProps, style$1, transition];

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules$1 = platformModules.concat(baseModules);
  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules$1 });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */
  /* istanbul ignore if */
  if (isIE9) {
      // http://www.matts411.com/post/internet-explorer-9-oninput/
      document.addEventListener('selectionchange', function () {
          var el = document.activeElement;
          // @ts-expect-error
          if (el && el.vmodel) {
              trigger(el, 'input');
          }
      });
  }
  var directive = {
      inserted: function (el, binding, vnode, oldVnode) {
          if (vnode.tag === 'select') {
              // #6903
              if (oldVnode.elm && !oldVnode.elm._vOptions) {
                  mergeVNodeHook(vnode, 'postpatch', function () {
                      directive.componentUpdated(el, binding, vnode);
                  });
              }
              else {
                  setSelected(el, binding, vnode.context);
              }
              el._vOptions = [].map.call(el.options, getValue);
          }
          else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
              el._vModifiers = binding.modifiers;
              if (!binding.modifiers.lazy) {
                  el.addEventListener('compositionstart', onCompositionStart);
                  el.addEventListener('compositionend', onCompositionEnd);
                  // Safari < 10.2 & UIWebView doesn't fire compositionend when
                  // switching focus before confirming composition choice
                  // this also fixes the issue where some browsers e.g. iOS Chrome
                  // fires "change" instead of "input" on autocomplete.
                  el.addEventListener('change', onCompositionEnd);
                  /* istanbul ignore if */
                  if (isIE9) {
                      el.vmodel = true;
                  }
              }
          }
      },
      componentUpdated: function (el, binding, vnode) {
          if (vnode.tag === 'select') {
              setSelected(el, binding, vnode.context);
              // in case the options rendered by v-for have changed,
              // it's possible that the value is out-of-sync with the rendered options.
              // detect such cases and filter out values that no longer has a matching
              // option in the DOM.
              var prevOptions_1 = el._vOptions;
              var curOptions_1 = (el._vOptions = [].map.call(el.options, getValue));
              if (curOptions_1.some(function (o, i) { return !looseEqual(o, prevOptions_1[i]); })) {
                  // trigger change event if
                  // no matching option found for at least one value
                  var needReset = el.multiple
                      ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions_1); })
                      : binding.value !== binding.oldValue &&
                          hasNoMatchingOption(binding.value, curOptions_1);
                  if (needReset) {
                      trigger(el, 'change');
                  }
              }
          }
      }
  };
  function setSelected(el, binding, vm) {
      actuallySetSelected(el, binding, vm);
      /* istanbul ignore if */
      if (isIE || isEdge) {
          setTimeout(function () {
              actuallySetSelected(el, binding, vm);
          }, 0);
      }
  }
  function actuallySetSelected(el, binding, vm) {
      var value = binding.value;
      var isMultiple = el.multiple;
      if (isMultiple && !Array.isArray(value)) {
          warn$2("<select multiple v-model=\"".concat(binding.expression, "\"> ") +
                  "expects an Array value for its binding, but got ".concat(Object.prototype.toString
                      .call(value)
                      .slice(8, -1)), vm);
          return;
      }
      var selected, option;
      for (var i = 0, l = el.options.length; i < l; i++) {
          option = el.options[i];
          if (isMultiple) {
              selected = looseIndexOf(value, getValue(option)) > -1;
              if (option.selected !== selected) {
                  option.selected = selected;
              }
          }
          else {
              if (looseEqual(getValue(option), value)) {
                  if (el.selectedIndex !== i) {
                      el.selectedIndex = i;
                  }
                  return;
              }
          }
      }
      if (!isMultiple) {
          el.selectedIndex = -1;
      }
  }
  function hasNoMatchingOption(value, options) {
      return options.every(function (o) { return !looseEqual(o, value); });
  }
  function getValue(option) {
      return '_value' in option ? option._value : option.value;
  }
  function onCompositionStart(e) {
      e.target.composing = true;
  }
  function onCompositionEnd(e) {
      // prevent triggering an input event for no reason
      if (!e.target.composing)
          return;
      e.target.composing = false;
      trigger(e.target, 'input');
  }
  function trigger(el, type) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, true, true);
      el.dispatchEvent(e);
  }

  // recursively search for possible transition defined inside the component root
  function locateNode(vnode) {
      // @ts-expect-error
      return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
          ? locateNode(vnode.componentInstance._vnode)
          : vnode;
  }
  var show = {
      bind: function (el, _a, vnode) {
          var value = _a.value;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          var originalDisplay = (el.__vOriginalDisplay =
              el.style.display === 'none' ? '' : el.style.display);
          if (value && transition) {
              vnode.data.show = true;
              enter(vnode, function () {
                  el.style.display = originalDisplay;
              });
          }
          else {
              el.style.display = value ? originalDisplay : 'none';
          }
      },
      update: function (el, _a, vnode) {
          var value = _a.value, oldValue = _a.oldValue;
          /* istanbul ignore if */
          if (!value === !oldValue)
              return;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          if (transition) {
              vnode.data.show = true;
              if (value) {
                  enter(vnode, function () {
                      el.style.display = el.__vOriginalDisplay;
                  });
              }
              else {
                  leave(vnode, function () {
                      el.style.display = 'none';
                  });
              }
          }
          else {
              el.style.display = value ? el.__vOriginalDisplay : 'none';
          }
      },
      unbind: function (el, binding, vnode, oldVnode, isDestroy) {
          if (!isDestroy) {
              el.style.display = el.__vOriginalDisplay;
          }
      }
  };

  var platformDirectives = {
      model: directive,
      show: show
  };

  // Provides transition support for a single element/component.
  var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
  };
  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild(vnode) {
      var compOptions = vnode && vnode.componentOptions;
      if (compOptions && compOptions.Ctor.options.abstract) {
          return getRealChild(getFirstComponentChild(compOptions.children));
      }
      else {
          return vnode;
      }
  }
  function extractTransitionData(comp) {
      var data = {};
      var options = comp.$options;
      // props
      for (var key in options.propsData) {
          data[key] = comp[key];
      }
      // events.
      // extract listeners and pass them directly to the transition methods
      var listeners = options._parentListeners;
      for (var key in listeners) {
          data[camelize(key)] = listeners[key];
      }
      return data;
  }
  function placeholder(h, rawChild) {
      // @ts-expect-error
      if (/\d-keep-alive$/.test(rawChild.tag)) {
          return h('keep-alive', {
              props: rawChild.componentOptions.propsData
          });
      }
  }
  function hasParentTransition(vnode) {
      while ((vnode = vnode.parent)) {
          if (vnode.data.transition) {
              return true;
          }
      }
  }
  function isSameChild(child, oldChild) {
      return oldChild.key === child.key && oldChild.tag === child.tag;
  }
  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };
  var isVShowDirective = function (d) { return d.name === 'show'; };
  var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,
      render: function (h) {
          var _this = this;
          var children = this.$slots.default;
          if (!children) {
              return;
          }
          // filter out text nodes (possible whitespaces)
          children = children.filter(isNotTextNode);
          /* istanbul ignore if */
          if (!children.length) {
              return;
          }
          // warn multiple elements
          if (children.length > 1) {
              warn$2('<transition> can only be used on a single element. Use ' +
                  '<transition-group> for lists.', this.$parent);
          }
          var mode = this.mode;
          // warn invalid mode
          if (mode && mode !== 'in-out' && mode !== 'out-in') {
              warn$2('invalid <transition> mode: ' + mode, this.$parent);
          }
          var rawChild = children[0];
          // if this is a component root node and the component's
          // parent container node also has transition, skip.
          if (hasParentTransition(this.$vnode)) {
              return rawChild;
          }
          // apply transition data to child
          // use getRealChild() to ignore abstract components e.g. keep-alive
          var child = getRealChild(rawChild);
          /* istanbul ignore if */
          if (!child) {
              return rawChild;
          }
          if (this._leaving) {
              return placeholder(h, rawChild);
          }
          // ensure a key that is unique to the vnode type and to this transition
          // component instance. This key will be used to remove pending leaving nodes
          // during entering.
          var id = "__transition-".concat(this._uid, "-");
          child.key =
              child.key == null
                  ? child.isComment
                      ? id + 'comment'
                      : id + child.tag
                  : isPrimitive(child.key)
                      ? String(child.key).indexOf(id) === 0
                          ? child.key
                          : id + child.key
                      : child.key;
          var data = ((child.data || (child.data = {})).transition =
              extractTransitionData(this));
          var oldRawChild = this._vnode;
          var oldChild = getRealChild(oldRawChild);
          // mark v-show
          // so that the transition module can hand over the control to the directive
          if (child.data.directives && child.data.directives.some(isVShowDirective)) {
              child.data.show = true;
          }
          if (oldChild &&
              oldChild.data &&
              !isSameChild(child, oldChild) &&
              !isAsyncPlaceholder(oldChild) &&
              // #6687 component root is a comment node
              !(oldChild.componentInstance &&
                  oldChild.componentInstance._vnode.isComment)) {
              // replace old child transition data with fresh one
              // important for dynamic transitions!
              var oldData = (oldChild.data.transition = extend({}, data));
              // handle transition mode
              if (mode === 'out-in') {
                  // return placeholder node and queue update when leave finishes
                  this._leaving = true;
                  mergeVNodeHook(oldData, 'afterLeave', function () {
                      _this._leaving = false;
                      _this.$forceUpdate();
                  });
                  return placeholder(h, rawChild);
              }
              else if (mode === 'in-out') {
                  if (isAsyncPlaceholder(child)) {
                      return oldRawChild;
                  }
                  var delayedLeave_1;
                  var performLeave = function () {
                      delayedLeave_1();
                  };
                  mergeVNodeHook(data, 'afterEnter', performLeave);
                  mergeVNodeHook(data, 'enterCancelled', performLeave);
                  mergeVNodeHook(oldData, 'delayLeave', function (leave) {
                      delayedLeave_1 = leave;
                  });
              }
          }
          return rawChild;
      }
  };

  // Provides transition support for list items.
  var props = extend({
      tag: String,
      moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
      props: props,
      beforeMount: function () {
          var _this = this;
          var update = this._update;
          this._update = function (vnode, hydrating) {
              var restoreActiveInstance = setActiveInstance(_this);
              // force removing pass
              _this.__patch__(_this._vnode, _this.kept, false, // hydrating
              true // removeOnly (!important, avoids unnecessary moves)
              );
              _this._vnode = _this.kept;
              restoreActiveInstance();
              update.call(_this, vnode, hydrating);
          };
      },
      render: function (h) {
          var tag = this.tag || this.$vnode.data.tag || 'span';
          var map = Object.create(null);
          var prevChildren = (this.prevChildren = this.children);
          var rawChildren = this.$slots.default || [];
          var children = (this.children = []);
          var transitionData = extractTransitionData(this);
          for (var i = 0; i < rawChildren.length; i++) {
              var c = rawChildren[i];
              if (c.tag) {
                  if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                      children.push(c);
                      map[c.key] = c;
                      (c.data || (c.data = {})).transition = transitionData;
                  }
                  else {
                      var opts = c.componentOptions;
                      var name_1 = opts
                          ? getComponentName(opts.Ctor.options) || opts.tag || ''
                          : c.tag;
                      warn$2("<transition-group> children must be keyed: <".concat(name_1, ">"));
                  }
              }
          }
          if (prevChildren) {
              var kept = [];
              var removed = [];
              for (var i = 0; i < prevChildren.length; i++) {
                  var c = prevChildren[i];
                  c.data.transition = transitionData;
                  // @ts-expect-error .getBoundingClientRect is not typed in Node
                  c.data.pos = c.elm.getBoundingClientRect();
                  if (map[c.key]) {
                      kept.push(c);
                  }
                  else {
                      removed.push(c);
                  }
              }
              this.kept = h(tag, null, kept);
              this.removed = removed;
          }
          return h(tag, null, children);
      },
      updated: function () {
          var children = this.prevChildren;
          var moveClass = this.moveClass || (this.name || 'v') + '-move';
          if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
              return;
          }
          // we divide the work into three loops to avoid mixing DOM reads and writes
          // in each iteration - which helps prevent layout thrashing.
          children.forEach(callPendingCbs);
          children.forEach(recordPosition);
          children.forEach(applyTranslation);
          // force reflow to put everything in position
          // assign to this to avoid being removed in tree-shaking
          // $flow-disable-line
          this._reflow = document.body.offsetHeight;
          children.forEach(function (c) {
              if (c.data.moved) {
                  var el_1 = c.elm;
                  var s = el_1.style;
                  addTransitionClass(el_1, moveClass);
                  s.transform = s.WebkitTransform = s.transitionDuration = '';
                  el_1.addEventListener(transitionEndEvent, (el_1._moveCb = function cb(e) {
                      if (e && e.target !== el_1) {
                          return;
                      }
                      if (!e || /transform$/.test(e.propertyName)) {
                          el_1.removeEventListener(transitionEndEvent, cb);
                          el_1._moveCb = null;
                          removeTransitionClass(el_1, moveClass);
                      }
                  }));
              }
          });
      },
      methods: {
          hasMove: function (el, moveClass) {
              /* istanbul ignore if */
              if (!hasTransition) {
                  return false;
              }
              /* istanbul ignore if */
              if (this._hasMove) {
                  return this._hasMove;
              }
              // Detect whether an element with the move class applied has
              // CSS transitions. Since the element may be inside an entering
              // transition at this very moment, we make a clone of it and remove
              // all other transition classes applied to ensure only the move class
              // is applied.
              var clone = el.cloneNode();
              if (el._transitionClasses) {
                  el._transitionClasses.forEach(function (cls) {
                      removeClass(clone, cls);
                  });
              }
              addClass(clone, moveClass);
              clone.style.display = 'none';
              this.$el.appendChild(clone);
              var info = getTransitionInfo(clone);
              this.$el.removeChild(clone);
              return (this._hasMove = info.hasTransform);
          }
      }
  };
  function callPendingCbs(c) {
      /* istanbul ignore if */
      if (c.elm._moveCb) {
          c.elm._moveCb();
      }
      /* istanbul ignore if */
      if (c.elm._enterCb) {
          c.elm._enterCb();
      }
  }
  function recordPosition(c) {
      c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
      var oldPos = c.data.pos;
      var newPos = c.data.newPos;
      var dx = oldPos.left - newPos.left;
      var dy = oldPos.top - newPos.top;
      if (dx || dy) {
          c.data.moved = true;
          var s = c.elm.style;
          s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
          s.transitionDuration = '0s';
      }
  }

  var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
  };

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  // public mount method
  Vue.prototype.$mount = function (el, hydrating) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating);
  };
  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
      setTimeout(function () {
          if (config.devtools) {
              if (devtools) {
                  devtools.emit('init', Vue);
              }
              else {
                  // @ts-expect-error
                  console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' +
                      'https://github.com/vuejs/vue-devtools');
              }
          }
          if (config.productionTip !== false &&
              typeof console !== 'undefined') {
              // @ts-expect-error
              console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" +
                  "Make sure to turn on production mode when deploying for production.\n" +
                  "See more tips at https://vuejs.org/guide/deployment.html");
          }
      }, 0);
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var buildRegex = cached(function (delimiters) {
      var open = delimiters[0].replace(regexEscapeRE, '\\$&');
      var close = delimiters[1].replace(regexEscapeRE, '\\$&');
      return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
  });
  function parseText(text, delimiters) {
      //@ts-expect-error
      var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
      if (!tagRE.test(text)) {
          return;
      }
      var tokens = [];
      var rawTokens = [];
      var lastIndex = (tagRE.lastIndex = 0);
      var match, index, tokenValue;
      while ((match = tagRE.exec(text))) {
          index = match.index;
          // push text token
          if (index > lastIndex) {
              rawTokens.push((tokenValue = text.slice(lastIndex, index)));
              tokens.push(JSON.stringify(tokenValue));
          }
          // tag token
          var exp = parseFilters(match[1].trim());
          tokens.push("_s(".concat(exp, ")"));
          rawTokens.push({ '@binding': exp });
          lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
          rawTokens.push((tokenValue = text.slice(lastIndex)));
          tokens.push(JSON.stringify(tokenValue));
      }
      return {
          expression: tokens.join('+'),
          tokens: rawTokens
      };
  }

  function transformNode$1(el, options) {
      var warn = options.warn || baseWarn;
      var staticClass = getAndRemoveAttr(el, 'class');
      if (staticClass) {
          var res = parseText(staticClass, options.delimiters);
          if (res) {
              warn("class=\"".concat(staticClass, "\": ") +
                  'Interpolation inside attributes has been removed. ' +
                  'Use v-bind or the colon shorthand instead. For example, ' +
                  'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
          }
      }
      if (staticClass) {
          el.staticClass = JSON.stringify(staticClass.replace(/\s+/g, ' ').trim());
      }
      var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
      if (classBinding) {
          el.classBinding = classBinding;
      }
  }
  function genData$2(el) {
      var data = '';
      if (el.staticClass) {
          data += "staticClass:".concat(el.staticClass, ",");
      }
      if (el.classBinding) {
          data += "class:".concat(el.classBinding, ",");
      }
      return data;
  }
  var klass = {
      staticKeys: ['staticClass'],
      transformNode: transformNode$1,
      genData: genData$2
  };

  function transformNode(el, options) {
      var warn = options.warn || baseWarn;
      var staticStyle = getAndRemoveAttr(el, 'style');
      if (staticStyle) {
          /* istanbul ignore if */
          {
              var res = parseText(staticStyle, options.delimiters);
              if (res) {
                  warn("style=\"".concat(staticStyle, "\": ") +
                      'Interpolation inside attributes has been removed. ' +
                      'Use v-bind or the colon shorthand instead. For example, ' +
                      'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
              }
          }
          el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
      }
      var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
      if (styleBinding) {
          el.styleBinding = styleBinding;
      }
  }
  function genData$1(el) {
      var data = '';
      if (el.staticStyle) {
          data += "staticStyle:".concat(el.staticStyle, ",");
      }
      if (el.styleBinding) {
          data += "style:(".concat(el.styleBinding, "),");
      }
      return data;
  }
  var style = {
      staticKeys: ['staticStyle'],
      transformNode: transformNode,
      genData: genData$1
  };

  var decoder;
  var he = {
      decode: function (html) {
          decoder = decoder || document.createElement('div');
          decoder.innerHTML = html;
          return decoder.textContent;
      }
  };

  var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
      'link,meta,param,source,track,wbr');
  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
  var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
      'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
      'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
      'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
      'title,tr,track');

  /**
   * Not type-checking this file because it's mostly vendor code.
   */
  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  var doctype = /^<!DOCTYPE [^>]+>/i;
  // #7298: escape - to avoid being passed as HTML comment when inlined in page
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;
  // Special Elements (can contain anything)
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};
  var decodingMap = {
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&amp;': '&',
      '&#10;': '\n',
      '&#9;': '\t',
      '&#39;': "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
  // #5992
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function (tag, html) {
      return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
  };
  function decodeAttr(value, shouldDecodeNewlines) {
      var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
      return value.replace(re, function (match) { return decodingMap[match]; });
  }
  function parseHTML(html, options) {
      var stack = [];
      var expectHTML = options.expectHTML;
      var isUnaryTag = options.isUnaryTag || no;
      var canBeLeftOpenTag = options.canBeLeftOpenTag || no;
      var index = 0;
      var last, lastTag;
      var _loop_1 = function () {
          last = html;
          // Make sure we're not in a plaintext content element like script/style
          if (!lastTag || !isPlainTextElement(lastTag)) {
              var textEnd = html.indexOf('<');
              if (textEnd === 0) {
                  // Comment:
                  if (comment.test(html)) {
                      var commentEnd = html.indexOf('-->');
                      if (commentEnd >= 0) {
                          if (options.shouldKeepComment && options.comment) {
                              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
                          }
                          advance(commentEnd + 3);
                          return "continue";
                      }
                  }
                  // https://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                  if (conditionalComment.test(html)) {
                      var conditionalEnd = html.indexOf(']>');
                      if (conditionalEnd >= 0) {
                          advance(conditionalEnd + 2);
                          return "continue";
                      }
                  }
                  // Doctype:
                  var doctypeMatch = html.match(doctype);
                  if (doctypeMatch) {
                      advance(doctypeMatch[0].length);
                      return "continue";
                  }
                  // End tag:
                  var endTagMatch = html.match(endTag);
                  if (endTagMatch) {
                      var curIndex = index;
                      advance(endTagMatch[0].length);
                      parseEndTag(endTagMatch[1], curIndex, index);
                      return "continue";
                  }
                  // Start tag:
                  var startTagMatch = parseStartTag();
                  if (startTagMatch) {
                      handleStartTag(startTagMatch);
                      if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                          advance(1);
                      }
                      return "continue";
                  }
              }
              var text = void 0, rest = void 0, next = void 0;
              if (textEnd >= 0) {
                  rest = html.slice(textEnd);
                  while (!endTag.test(rest) &&
                      !startTagOpen.test(rest) &&
                      !comment.test(rest) &&
                      !conditionalComment.test(rest)) {
                      // < in plain text, be forgiving and treat it as text
                      next = rest.indexOf('<', 1);
                      if (next < 0)
                          break;
                      textEnd += next;
                      rest = html.slice(textEnd);
                  }
                  text = html.substring(0, textEnd);
              }
              if (textEnd < 0) {
                  text = html;
              }
              if (text) {
                  advance(text.length);
              }
              if (options.chars && text) {
                  options.chars(text, index - text.length, index);
              }
          }
          else {
              var endTagLength_1 = 0;
              var stackedTag_1 = lastTag.toLowerCase();
              var reStackedTag = reCache[stackedTag_1] ||
                  (reCache[stackedTag_1] = new RegExp('([\\s\\S]*?)(</' + stackedTag_1 + '[^>]*>)', 'i'));
              var rest = html.replace(reStackedTag, function (all, text, endTag) {
                  endTagLength_1 = endTag.length;
                  if (!isPlainTextElement(stackedTag_1) && stackedTag_1 !== 'noscript') {
                      text = text
                          .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
                          .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
                  }
                  if (shouldIgnoreFirstNewline(stackedTag_1, text)) {
                      text = text.slice(1);
                  }
                  if (options.chars) {
                      options.chars(text);
                  }
                  return '';
              });
              index += html.length - rest.length;
              html = rest;
              parseEndTag(stackedTag_1, index - endTagLength_1, index);
          }
          if (html === last) {
              options.chars && options.chars(html);
              if (!stack.length && options.warn) {
                  options.warn("Mal-formatted tag at end of template: \"".concat(html, "\""), {
                      start: index + html.length
                  });
              }
              return "break";
          }
      };
      while (html) {
          var state_1 = _loop_1();
          if (state_1 === "break")
              break;
      }
      // Clean up any remaining tags
      parseEndTag();
      function advance(n) {
          index += n;
          html = html.substring(n);
      }
      function parseStartTag() {
          var start = html.match(startTagOpen);
          if (start) {
              var match = {
                  tagName: start[1],
                  attrs: [],
                  start: index
              };
              advance(start[0].length);
              var end = void 0, attr = void 0;
              while (!(end = html.match(startTagClose)) &&
                  (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                  attr.start = index;
                  advance(attr[0].length);
                  attr.end = index;
                  match.attrs.push(attr);
              }
              if (end) {
                  match.unarySlash = end[1];
                  advance(end[0].length);
                  match.end = index;
                  return match;
              }
          }
      }
      function handleStartTag(match) {
          var tagName = match.tagName;
          var unarySlash = match.unarySlash;
          if (expectHTML) {
              if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                  parseEndTag(lastTag);
              }
              if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                  parseEndTag(tagName);
              }
          }
          var unary = isUnaryTag(tagName) || !!unarySlash;
          var l = match.attrs.length;
          var attrs = new Array(l);
          for (var i = 0; i < l; i++) {
              var args = match.attrs[i];
              var value = args[3] || args[4] || args[5] || '';
              var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
                  ? options.shouldDecodeNewlinesForHref
                  : options.shouldDecodeNewlines;
              attrs[i] = {
                  name: args[1],
                  value: decodeAttr(value, shouldDecodeNewlines)
              };
              if (options.outputSourceRange) {
                  attrs[i].start = args.start + args[0].match(/^\s*/).length;
                  attrs[i].end = args.end;
              }
          }
          if (!unary) {
              stack.push({
                  tag: tagName,
                  lowerCasedTag: tagName.toLowerCase(),
                  attrs: attrs,
                  start: match.start,
                  end: match.end
              });
              lastTag = tagName;
          }
          if (options.start) {
              options.start(tagName, attrs, unary, match.start, match.end);
          }
      }
      function parseEndTag(tagName, start, end) {
          var pos, lowerCasedTagName;
          if (start == null)
              start = index;
          if (end == null)
              end = index;
          // Find the closest opened tag of the same type
          if (tagName) {
              lowerCasedTagName = tagName.toLowerCase();
              for (pos = stack.length - 1; pos >= 0; pos--) {
                  if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                      break;
                  }
              }
          }
          else {
              // If no tag name is provided, clean shop
              pos = 0;
          }
          if (pos >= 0) {
              // Close all the open elements, up the stack
              for (var i = stack.length - 1; i >= pos; i--) {
                  if ((i > pos || !tagName) && options.warn) {
                      options.warn("tag <".concat(stack[i].tag, "> has no matching end tag."), {
                          start: stack[i].start,
                          end: stack[i].end
                      });
                  }
                  if (options.end) {
                      options.end(stack[i].tag, start, end);
                  }
              }
              // Remove the open elements from the stack
              stack.length = pos;
              lastTag = pos && stack[pos - 1].tag;
          }
          else if (lowerCasedTagName === 'br') {
              if (options.start) {
                  options.start(tagName, [], true, start, end);
              }
          }
          else if (lowerCasedTagName === 'p') {
              if (options.start) {
                  options.start(tagName, [], false, start, end);
              }
              if (options.end) {
                  options.end(tagName, start, end);
              }
          }
      }
  }

  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:|^#/;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var dynamicArgRE = /^\[.*\]$/;
  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
  var slotRE = /^v-slot(:|$)|^#/;
  var lineBreakRE = /[\r\n]/;
  var whitespaceRE = /[ \f\t\r\n]+/g;
  var invalidAttributeRE = /[\s"'<>\/=]/;
  var decodeHTMLCached = cached(he.decode);
  var emptySlotScopeToken = "_empty_";
  // configurable state
  var warn;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;
  function createASTElement(tag, attrs, parent) {
      return {
          type: 1,
          tag: tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          rawAttrsMap: {},
          parent: parent,
          children: []
      };
  }
  /**
   * Convert HTML string to AST.
   */
  function parse(template, options) {
      warn = options.warn || baseWarn;
      platformIsPreTag = options.isPreTag || no;
      platformMustUseProp = options.mustUseProp || no;
      platformGetTagNamespace = options.getTagNamespace || no;
      var isReservedTag = options.isReservedTag || no;
      maybeComponent = function (el) {
          return !!(el.component ||
              el.attrsMap[':is'] ||
              el.attrsMap['v-bind:is'] ||
              !(el.attrsMap.is ? isReservedTag(el.attrsMap.is) : isReservedTag(el.tag)));
      };
      transforms = pluckModuleFunction(options.modules, 'transformNode');
      preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
      postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
      delimiters = options.delimiters;
      var stack = [];
      var preserveWhitespace = options.preserveWhitespace !== false;
      var whitespaceOption = options.whitespace;
      var root;
      var currentParent;
      var inVPre = false;
      var inPre = false;
      var warned = false;
      function warnOnce(msg, range) {
          if (!warned) {
              warned = true;
              warn(msg, range);
          }
      }
      function closeElement(element) {
          trimEndingWhitespace(element);
          if (!inVPre && !element.processed) {
              element = processElement(element, options);
          }
          // tree management
          if (!stack.length && element !== root) {
              // allow root elements with v-if, v-else-if and v-else
              if (root.if && (element.elseif || element.else)) {
                  {
                      checkRootConstraints(element);
                  }
                  addIfCondition(root, {
                      exp: element.elseif,
                      block: element
                  });
              }
              else {
                  warnOnce("Component template should contain exactly one root element. " +
                      "If you are using v-if on multiple elements, " +
                      "use v-else-if to chain them instead.", { start: element.start });
              }
          }
          if (currentParent && !element.forbidden) {
              if (element.elseif || element.else) {
                  processIfConditions(element, currentParent);
              }
              else {
                  if (element.slotScope) {
                      // scoped slot
                      // keep it in the children list so that v-else(-if) conditions can
                      // find it as the prev node.
                      var name_1 = element.slotTarget || '"default"';
                      (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name_1] = element;
                  }
                  currentParent.children.push(element);
                  element.parent = currentParent;
              }
          }
          // final children cleanup
          // filter out scoped slots
          element.children = element.children.filter(function (c) { return !c.slotScope; });
          // remove trailing whitespace node again
          trimEndingWhitespace(element);
          // check pre state
          if (element.pre) {
              inVPre = false;
          }
          if (platformIsPreTag(element.tag)) {
              inPre = false;
          }
          // apply post-transforms
          for (var i = 0; i < postTransforms.length; i++) {
              postTransforms[i](element, options);
          }
      }
      function trimEndingWhitespace(el) {
          // remove trailing whitespace node
          if (!inPre) {
              var lastNode = void 0;
              while ((lastNode = el.children[el.children.length - 1]) &&
                  lastNode.type === 3 &&
                  lastNode.text === ' ') {
                  el.children.pop();
              }
          }
      }
      function checkRootConstraints(el) {
          if (el.tag === 'slot' || el.tag === 'template') {
              warnOnce("Cannot use <".concat(el.tag, "> as component root element because it may ") +
                  'contain multiple nodes.', { start: el.start });
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
              warnOnce('Cannot use v-for on stateful component root element because ' +
                  'it renders multiple elements.', el.rawAttrsMap['v-for']);
          }
      }
      parseHTML(template, {
          warn: warn,
          expectHTML: options.expectHTML,
          isUnaryTag: options.isUnaryTag,
          canBeLeftOpenTag: options.canBeLeftOpenTag,
          shouldDecodeNewlines: options.shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
          shouldKeepComment: options.comments,
          outputSourceRange: options.outputSourceRange,
          start: function (tag, attrs, unary, start, end) {
              // check namespace.
              // inherit parent ns if there is one
              var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
              // handle IE svg bug
              /* istanbul ignore if */
              if (isIE && ns === 'svg') {
                  attrs = guardIESVGBug(attrs);
              }
              var element = createASTElement(tag, attrs, currentParent);
              if (ns) {
                  element.ns = ns;
              }
              {
                  if (options.outputSourceRange) {
                      element.start = start;
                      element.end = end;
                      element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
                          cumulated[attr.name] = attr;
                          return cumulated;
                      }, {});
                  }
                  attrs.forEach(function (attr) {
                      if (invalidAttributeRE.test(attr.name)) {
                          warn("Invalid dynamic argument expression: attribute names cannot contain " +
                              "spaces, quotes, <, >, / or =.", options.outputSourceRange
                              ? {
                                  start: attr.start + attr.name.indexOf("["),
                                  end: attr.start + attr.name.length
                              }
                              : undefined);
                      }
                  });
              }
              if (isForbiddenTag(element) && !isServerRendering()) {
                  element.forbidden = true;
                  warn('Templates should only be responsible for mapping the state to the ' +
                          'UI. Avoid placing tags with side-effects in your templates, such as ' +
                          "<".concat(tag, ">") +
                          ', as they will not be parsed.', { start: element.start });
              }
              // apply pre-transforms
              for (var i = 0; i < preTransforms.length; i++) {
                  element = preTransforms[i](element, options) || element;
              }
              if (!inVPre) {
                  processPre(element);
                  if (element.pre) {
                      inVPre = true;
                  }
              }
              if (platformIsPreTag(element.tag)) {
                  inPre = true;
              }
              if (inVPre) {
                  processRawAttrs(element);
              }
              else if (!element.processed) {
                  // structural directives
                  processFor(element);
                  processIf(element);
                  processOnce(element);
              }
              if (!root) {
                  root = element;
                  {
                      checkRootConstraints(root);
                  }
              }
              if (!unary) {
                  currentParent = element;
                  stack.push(element);
              }
              else {
                  closeElement(element);
              }
          },
          end: function (tag, start, end) {
              var element = stack[stack.length - 1];
              // pop stack
              stack.length -= 1;
              currentParent = stack[stack.length - 1];
              if (options.outputSourceRange) {
                  element.end = end;
              }
              closeElement(element);
          },
          chars: function (text, start, end) {
              if (!currentParent) {
                  {
                      if (text === template) {
                          warnOnce('Component template requires a root element, rather than just text.', { start: start });
                      }
                      else if ((text = text.trim())) {
                          warnOnce("text \"".concat(text, "\" outside root element will be ignored."), {
                              start: start
                          });
                      }
                  }
                  return;
              }
              // IE textarea placeholder bug
              /* istanbul ignore if */
              if (isIE &&
                  currentParent.tag === 'textarea' &&
                  currentParent.attrsMap.placeholder === text) {
                  return;
              }
              var children = currentParent.children;
              if (inPre || text.trim()) {
                  text = isTextTag(currentParent)
                      ? text
                      : decodeHTMLCached(text);
              }
              else if (!children.length) {
                  // remove the whitespace-only node right after an opening tag
                  text = '';
              }
              else if (whitespaceOption) {
                  if (whitespaceOption === 'condense') {
                      // in condense mode, remove the whitespace node if it contains
                      // line break, otherwise condense to a single space
                      text = lineBreakRE.test(text) ? '' : ' ';
                  }
                  else {
                      text = ' ';
                  }
              }
              else {
                  text = preserveWhitespace ? ' ' : '';
              }
              if (text) {
                  if (!inPre && whitespaceOption === 'condense') {
                      // condense consecutive whitespaces into single space
                      text = text.replace(whitespaceRE, ' ');
                  }
                  var res = void 0;
                  var child = void 0;
                  if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
                      child = {
                          type: 2,
                          expression: res.expression,
                          tokens: res.tokens,
                          text: text
                      };
                  }
                  else if (text !== ' ' ||
                      !children.length ||
                      children[children.length - 1].text !== ' ') {
                      child = {
                          type: 3,
                          text: text
                      };
                  }
                  if (child) {
                      if (options.outputSourceRange) {
                          child.start = start;
                          child.end = end;
                      }
                      children.push(child);
                  }
              }
          },
          comment: function (text, start, end) {
              // adding anything as a sibling to the root node is forbidden
              // comments should still be allowed, but ignored
              if (currentParent) {
                  var child = {
                      type: 3,
                      text: text,
                      isComment: true
                  };
                  if (options.outputSourceRange) {
                      child.start = start;
                      child.end = end;
                  }
                  currentParent.children.push(child);
              }
          }
      });
      return root;
  }
  function processPre(el) {
      if (getAndRemoveAttr(el, 'v-pre') != null) {
          el.pre = true;
      }
  }
  function processRawAttrs(el) {
      var list = el.attrsList;
      var len = list.length;
      if (len) {
          var attrs = (el.attrs = new Array(len));
          for (var i = 0; i < len; i++) {
              attrs[i] = {
                  name: list[i].name,
                  value: JSON.stringify(list[i].value)
              };
              if (list[i].start != null) {
                  attrs[i].start = list[i].start;
                  attrs[i].end = list[i].end;
              }
          }
      }
      else if (!el.pre) {
          // non root node in pre blocks with no attributes
          el.plain = true;
      }
  }
  function processElement(element, options) {
      processKey(element);
      // determine whether this is a plain element after
      // removing structural attributes
      element.plain =
          !element.key && !element.scopedSlots && !element.attrsList.length;
      processRef(element);
      processSlotContent(element);
      processSlotOutlet(element);
      processComponent(element);
      for (var i = 0; i < transforms.length; i++) {
          element = transforms[i](element, options) || element;
      }
      processAttrs(element);
      return element;
  }
  function processKey(el) {
      var exp = getBindingAttr(el, 'key');
      if (exp) {
          {
              if (el.tag === 'template') {
                  warn("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, 'key'));
              }
              if (el.for) {
                  var iterator = el.iterator2 || el.iterator1;
                  var parent_1 = el.parent;
                  if (iterator &&
                      iterator === exp &&
                      parent_1 &&
                      parent_1.tag === 'transition-group') {
                      warn("Do not use v-for index as key on <transition-group> children, " +
                          "this is the same as not using keys.", getRawBindingAttr(el, 'key'), true /* tip */);
                  }
              }
          }
          el.key = exp;
      }
  }
  function processRef(el) {
      var ref = getBindingAttr(el, 'ref');
      if (ref) {
          el.ref = ref;
          el.refInFor = checkInFor(el);
      }
  }
  function processFor(el) {
      var exp;
      if ((exp = getAndRemoveAttr(el, 'v-for'))) {
          var res = parseFor(exp);
          if (res) {
              extend(el, res);
          }
          else {
              warn("Invalid v-for expression: ".concat(exp), el.rawAttrsMap['v-for']);
          }
      }
  }
  function parseFor(exp) {
      var inMatch = exp.match(forAliasRE);
      if (!inMatch)
          return;
      var res = {};
      res.for = inMatch[2].trim();
      var alias = inMatch[1].trim().replace(stripParensRE, '');
      var iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
          res.alias = alias.replace(forIteratorRE, '').trim();
          res.iterator1 = iteratorMatch[1].trim();
          if (iteratorMatch[2]) {
              res.iterator2 = iteratorMatch[2].trim();
          }
      }
      else {
          res.alias = alias;
      }
      return res;
  }
  function processIf(el) {
      var exp = getAndRemoveAttr(el, 'v-if');
      if (exp) {
          el.if = exp;
          addIfCondition(el, {
              exp: exp,
              block: el
          });
      }
      else {
          if (getAndRemoveAttr(el, 'v-else') != null) {
              el.else = true;
          }
          var elseif = getAndRemoveAttr(el, 'v-else-if');
          if (elseif) {
              el.elseif = elseif;
          }
      }
  }
  function processIfConditions(el, parent) {
      var prev = findPrevElement(parent.children);
      if (prev && prev.if) {
          addIfCondition(prev, {
              exp: el.elseif,
              block: el
          });
      }
      else {
          warn("v-".concat(el.elseif ? 'else-if="' + el.elseif + '"' : 'else', " ") +
              "used on element <".concat(el.tag, "> without corresponding v-if."), el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
      }
  }
  function findPrevElement(children) {
      var i = children.length;
      while (i--) {
          if (children[i].type === 1) {
              return children[i];
          }
          else {
              if (children[i].text !== ' ') {
                  warn("text \"".concat(children[i].text.trim(), "\" between v-if and v-else(-if) ") +
                      "will be ignored.", children[i]);
              }
              children.pop();
          }
      }
  }
  function addIfCondition(el, condition) {
      if (!el.ifConditions) {
          el.ifConditions = [];
      }
      el.ifConditions.push(condition);
  }
  function processOnce(el) {
      var once = getAndRemoveAttr(el, 'v-once');
      if (once != null) {
          el.once = true;
      }
  }
  // handle content being passed to a component as slot,
  // e.g. <template slot="xxx">, <div slot-scope="xxx">
  function processSlotContent(el) {
      var slotScope;
      if (el.tag === 'template') {
          slotScope = getAndRemoveAttr(el, 'scope');
          /* istanbul ignore if */
          if (slotScope) {
              warn("the \"scope\" attribute for scoped slots have been deprecated and " +
                  "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
                  "can also be used on plain elements in addition to <template> to " +
                  "denote scoped slots.", el.rawAttrsMap['scope'], true);
          }
          el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
      }
      else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
          /* istanbul ignore if */
          if (el.attrsMap['v-for']) {
              warn("Ambiguous combined usage of slot-scope and v-for on <".concat(el.tag, "> ") +
                  "(v-for takes higher priority). Use a wrapper <template> for the " +
                  "scoped slot to make it clearer.", el.rawAttrsMap['slot-scope'], true);
          }
          el.slotScope = slotScope;
      }
      // slot="xxx"
      var slotTarget = getBindingAttr(el, 'slot');
      if (slotTarget) {
          el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
          el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
          // preserve slot as an attribute for native shadow DOM compat
          // only for non-scoped slots.
          if (el.tag !== 'template' && !el.slotScope) {
              addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
          }
      }
      // 2.6 v-slot syntax
      {
          if (el.tag === 'template') {
              // v-slot on <template>
              var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
              if (slotBinding) {
                  {
                      if (el.slotTarget || el.slotScope) {
                          warn("Unexpected mixed usage of different slot syntaxes.", el);
                      }
                      if (el.parent && !maybeComponent(el.parent)) {
                          warn("<template v-slot> can only appear at the root level inside " +
                              "the receiving component", el);
                      }
                  }
                  var _a = getSlotName(slotBinding), name_2 = _a.name, dynamic = _a.dynamic;
                  el.slotTarget = name_2;
                  el.slotTargetDynamic = dynamic;
                  el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
              }
          }
          else {
              // v-slot on component, denotes default slot
              var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
              if (slotBinding) {
                  {
                      if (!maybeComponent(el)) {
                          warn("v-slot can only be used on components or <template>.", slotBinding);
                      }
                      if (el.slotScope || el.slotTarget) {
                          warn("Unexpected mixed usage of different slot syntaxes.", el);
                      }
                      if (el.scopedSlots) {
                          warn("To avoid scope ambiguity, the default slot should also use " +
                              "<template> syntax when there are other named slots.", slotBinding);
                      }
                  }
                  // add the component's children to its default slot
                  var slots = el.scopedSlots || (el.scopedSlots = {});
                  var _b = getSlotName(slotBinding), name_3 = _b.name, dynamic = _b.dynamic;
                  var slotContainer_1 = (slots[name_3] = createASTElement('template', [], el));
                  slotContainer_1.slotTarget = name_3;
                  slotContainer_1.slotTargetDynamic = dynamic;
                  slotContainer_1.children = el.children.filter(function (c) {
                      if (!c.slotScope) {
                          c.parent = slotContainer_1;
                          return true;
                      }
                  });
                  slotContainer_1.slotScope = slotBinding.value || emptySlotScopeToken;
                  // remove children as they are returned from scopedSlots now
                  el.children = [];
                  // mark el non-plain so data gets generated
                  el.plain = false;
              }
          }
      }
  }
  function getSlotName(binding) {
      var name = binding.name.replace(slotRE, '');
      if (!name) {
          if (binding.name[0] !== '#') {
              name = 'default';
          }
          else {
              warn("v-slot shorthand syntax requires a slot name.", binding);
          }
      }
      return dynamicArgRE.test(name)
          ? // dynamic [name]
              { name: name.slice(1, -1), dynamic: true }
          : // static name
              { name: "\"".concat(name, "\""), dynamic: false };
  }
  // handle <slot/> outlets
  function processSlotOutlet(el) {
      if (el.tag === 'slot') {
          el.slotName = getBindingAttr(el, 'name');
          if (el.key) {
              warn("`key` does not work on <slot> because slots are abstract outlets " +
                  "and can possibly expand into multiple elements. " +
                  "Use the key on a wrapping element instead.", getRawBindingAttr(el, 'key'));
          }
      }
  }
  function processComponent(el) {
      var binding;
      if ((binding = getBindingAttr(el, 'is'))) {
          el.component = binding;
      }
      if (getAndRemoveAttr(el, 'inline-template') != null) {
          el.inlineTemplate = true;
      }
  }
  function processAttrs(el) {
      var list = el.attrsList;
      var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
      for (i = 0, l = list.length; i < l; i++) {
          name = rawName = list[i].name;
          value = list[i].value;
          if (dirRE.test(name)) {
              // mark element as dynamic
              el.hasBindings = true;
              // modifiers
              modifiers = parseModifiers(name.replace(dirRE, ''));
              // support .foo shorthand syntax for the .prop modifier
              if (modifiers) {
                  name = name.replace(modifierRE, '');
              }
              if (bindRE.test(name)) {
                  // v-bind
                  name = name.replace(bindRE, '');
                  value = parseFilters(value);
                  isDynamic = dynamicArgRE.test(name);
                  if (isDynamic) {
                      name = name.slice(1, -1);
                  }
                  if (value.trim().length === 0) {
                      warn("The value for a v-bind expression cannot be empty. Found in \"v-bind:".concat(name, "\""));
                  }
                  if (modifiers) {
                      if (modifiers.prop && !isDynamic) {
                          name = camelize(name);
                          if (name === 'innerHtml')
                              name = 'innerHTML';
                      }
                      if (modifiers.camel && !isDynamic) {
                          name = camelize(name);
                      }
                      if (modifiers.sync) {
                          syncGen = genAssignmentCode(value, "$event");
                          if (!isDynamic) {
                              addHandler(el, "update:".concat(camelize(name)), syncGen, null, false, warn, list[i]);
                              if (hyphenate(name) !== camelize(name)) {
                                  addHandler(el, "update:".concat(hyphenate(name)), syncGen, null, false, warn, list[i]);
                              }
                          }
                          else {
                              // handler w/ dynamic event name
                              addHandler(el, "\"update:\"+(".concat(name, ")"), syncGen, null, false, warn, list[i], true // dynamic
                              );
                          }
                      }
                  }
                  if ((modifiers && modifiers.prop) ||
                      (!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name))) {
                      addProp(el, name, value, list[i], isDynamic);
                  }
                  else {
                      addAttr(el, name, value, list[i], isDynamic);
                  }
              }
              else if (onRE.test(name)) {
                  // v-on
                  name = name.replace(onRE, '');
                  isDynamic = dynamicArgRE.test(name);
                  if (isDynamic) {
                      name = name.slice(1, -1);
                  }
                  addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic);
              }
              else {
                  // normal directives
                  name = name.replace(dirRE, '');
                  // parse arg
                  var argMatch = name.match(argRE);
                  var arg = argMatch && argMatch[1];
                  isDynamic = false;
                  if (arg) {
                      name = name.slice(0, -(arg.length + 1));
                      if (dynamicArgRE.test(arg)) {
                          arg = arg.slice(1, -1);
                          isDynamic = true;
                      }
                  }
                  addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
                  if (name === 'model') {
                      checkForAliasModel(el, value);
                  }
              }
          }
          else {
              // literal attribute
              {
                  var res = parseText(value, delimiters);
                  if (res) {
                      warn("".concat(name, "=\"").concat(value, "\": ") +
                          'Interpolation inside attributes has been removed. ' +
                          'Use v-bind or the colon shorthand instead. For example, ' +
                          'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
                  }
              }
              addAttr(el, name, JSON.stringify(value), list[i]);
              // #6887 firefox doesn't update muted state if set via attribute
              // even immediately after element creation
              if (!el.component &&
                  name === 'muted' &&
                  platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                  addProp(el, name, 'true', list[i]);
              }
          }
      }
  }
  function checkInFor(el) {
      var parent = el;
      while (parent) {
          if (parent.for !== undefined) {
              return true;
          }
          parent = parent.parent;
      }
      return false;
  }
  function parseModifiers(name) {
      var match = name.match(modifierRE);
      if (match) {
          var ret_1 = {};
          match.forEach(function (m) {
              ret_1[m.slice(1)] = true;
          });
          return ret_1;
      }
  }
  function makeAttrsMap(attrs) {
      var map = {};
      for (var i = 0, l = attrs.length; i < l; i++) {
          if (map[attrs[i].name] && !isIE && !isEdge) {
              warn('duplicate attribute: ' + attrs[i].name, attrs[i]);
          }
          map[attrs[i].name] = attrs[i].value;
      }
      return map;
  }
  // for script (e.g. type="x/template") or style, do not decode content
  function isTextTag(el) {
      return el.tag === 'script' || el.tag === 'style';
  }
  function isForbiddenTag(el) {
      return (el.tag === 'style' ||
          (el.tag === 'script' &&
              (!el.attrsMap.type || el.attrsMap.type === 'text/javascript')));
  }
  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;
  /* istanbul ignore next */
  function guardIESVGBug(attrs) {
      var res = [];
      for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          if (!ieNSBug.test(attr.name)) {
              attr.name = attr.name.replace(ieNSPrefix, '');
              res.push(attr);
          }
      }
      return res;
  }
  function checkForAliasModel(el, value) {
      var _el = el;
      while (_el) {
          if (_el.for && _el.alias === value) {
              warn("<".concat(el.tag, " v-model=\"").concat(value, "\">: ") +
                  "You are binding v-model directly to a v-for iteration alias. " +
                  "This will not be able to modify the v-for source array because " +
                  "writing to the alias is like modifying a function local variable. " +
                  "Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap['v-model']);
          }
          _el = _el.parent;
      }
  }

  /**
   * Expand input[v-model] with dynamic type bindings into v-if-else chains
   * Turn this:
   *   <input v-model="data[type]" :type="type">
   * into this:
   *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
   *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
   *   <input v-else :type="type" v-model="data[type]">
   */
  function preTransformNode(el, options) {
      if (el.tag === 'input') {
          var map = el.attrsMap;
          if (!map['v-model']) {
              return;
          }
          var typeBinding = void 0;
          if (map[':type'] || map['v-bind:type']) {
              typeBinding = getBindingAttr(el, 'type');
          }
          if (!map.type && !typeBinding && map['v-bind']) {
              typeBinding = "(".concat(map['v-bind'], ").type");
          }
          if (typeBinding) {
              var ifCondition = getAndRemoveAttr(el, 'v-if', true);
              var ifConditionExtra = ifCondition ? "&&(".concat(ifCondition, ")") : "";
              var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
              var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
              // 1. checkbox
              var branch0 = cloneASTElement(el);
              // process for on the main node
              processFor(branch0);
              addRawAttr(branch0, 'type', 'checkbox');
              processElement(branch0, options);
              branch0.processed = true; // prevent it from double-processed
              branch0.if = "(".concat(typeBinding, ")==='checkbox'") + ifConditionExtra;
              addIfCondition(branch0, {
                  exp: branch0.if,
                  block: branch0
              });
              // 2. add radio else-if condition
              var branch1 = cloneASTElement(el);
              getAndRemoveAttr(branch1, 'v-for', true);
              addRawAttr(branch1, 'type', 'radio');
              processElement(branch1, options);
              addIfCondition(branch0, {
                  exp: "(".concat(typeBinding, ")==='radio'") + ifConditionExtra,
                  block: branch1
              });
              // 3. other
              var branch2 = cloneASTElement(el);
              getAndRemoveAttr(branch2, 'v-for', true);
              addRawAttr(branch2, ':type', typeBinding);
              processElement(branch2, options);
              addIfCondition(branch0, {
                  exp: ifCondition,
                  block: branch2
              });
              if (hasElse) {
                  branch0.else = true;
              }
              else if (elseIfCondition) {
                  branch0.elseif = elseIfCondition;
              }
              return branch0;
          }
      }
  }
  function cloneASTElement(el) {
      return createASTElement(el.tag, el.attrsList.slice(), el.parent);
  }
  var model = {
      preTransformNode: preTransformNode
  };

  var modules = [klass, style, model];

  function text(el, dir) {
      if (dir.value) {
          addProp(el, 'textContent', "_s(".concat(dir.value, ")"), dir);
      }
  }

  function html(el, dir) {
      if (dir.value) {
          addProp(el, 'innerHTML', "_s(".concat(dir.value, ")"), dir);
      }
  }

  var directives = {
      model: model$1,
      text: text,
      html: html
  };

  var baseOptions = {
      expectHTML: true,
      modules: modules,
      directives: directives,
      isPreTag: isPreTag,
      isUnaryTag: isUnaryTag,
      mustUseProp: mustUseProp,
      canBeLeftOpenTag: canBeLeftOpenTag,
      isReservedTag: isReservedTag,
      getTagNamespace: getTagNamespace,
      staticKeys: genStaticKeys$1(modules)
  };

  var isStaticKey;
  var isPlatformReservedTag;
  var genStaticKeysCached = cached(genStaticKeys);
  /**
   * Goal of the optimizer: walk the generated template AST tree
   * and detect sub-trees that are purely static, i.e. parts of
   * the DOM that never needs to change.
   *
   * Once we detect these sub-trees, we can:
   *
   * 1. Hoist them into constants, so that we no longer need to
   *    create fresh nodes for them on each re-render;
   * 2. Completely skip them in the patching process.
   */
  function optimize(root, options) {
      if (!root)
          return;
      isStaticKey = genStaticKeysCached(options.staticKeys || '');
      isPlatformReservedTag = options.isReservedTag || no;
      // first pass: mark all non-static nodes.
      markStatic(root);
      // second pass: mark static roots.
      markStaticRoots(root, false);
  }
  function genStaticKeys(keys) {
      return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
          (keys ? ',' + keys : ''));
  }
  function markStatic(node) {
      node.static = isStatic(node);
      if (node.type === 1) {
          // do not make component slot content static. this avoids
          // 1. components not able to mutate slot nodes
          // 2. static slot content fails for hot-reloading
          if (!isPlatformReservedTag(node.tag) &&
              node.tag !== 'slot' &&
              node.attrsMap['inline-template'] == null) {
              return;
          }
          for (var i = 0, l = node.children.length; i < l; i++) {
              var child = node.children[i];
              markStatic(child);
              if (!child.static) {
                  node.static = false;
              }
          }
          if (node.ifConditions) {
              for (var i = 1, l = node.ifConditions.length; i < l; i++) {
                  var block = node.ifConditions[i].block;
                  markStatic(block);
                  if (!block.static) {
                      node.static = false;
                  }
              }
          }
      }
  }
  function markStaticRoots(node, isInFor) {
      if (node.type === 1) {
          if (node.static || node.once) {
              node.staticInFor = isInFor;
          }
          // For a node to qualify as a static root, it should have children that
          // are not just static text. Otherwise the cost of hoisting out will
          // outweigh the benefits and it's better off to just always render it fresh.
          if (node.static &&
              node.children.length &&
              !(node.children.length === 1 && node.children[0].type === 3)) {
              node.staticRoot = true;
              return;
          }
          else {
              node.staticRoot = false;
          }
          if (node.children) {
              for (var i = 0, l = node.children.length; i < l; i++) {
                  markStaticRoots(node.children[i], isInFor || !!node.for);
              }
          }
          if (node.ifConditions) {
              for (var i = 1, l = node.ifConditions.length; i < l; i++) {
                  markStaticRoots(node.ifConditions[i].block, isInFor);
              }
          }
      }
  }
  function isStatic(node) {
      if (node.type === 2) {
          // expression
          return false;
      }
      if (node.type === 3) {
          // text
          return true;
      }
      return !!(node.pre ||
          (!node.hasBindings && // no dynamic bindings
              !node.if &&
              !node.for && // not v-if or v-for or v-else
              !isBuiltInTag(node.tag) && // not a built-in
              isPlatformReservedTag(node.tag) && // not a component
              !isDirectChildOfTemplateFor(node) &&
              Object.keys(node).every(isStaticKey)));
  }
  function isDirectChildOfTemplateFor(node) {
      while (node.parent) {
          node = node.parent;
          if (node.tag !== 'template') {
              return false;
          }
          if (node.for) {
              return true;
          }
      }
      return false;
  }

  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  // KeyboardEvent.keyCode aliases
  var keyCodes = {
      esc: 27,
      tab: 9,
      enter: 13,
      space: 32,
      up: 38,
      left: 37,
      right: 39,
      down: 40,
      delete: [8, 46]
  };
  // KeyboardEvent.key aliases
  var keyNames = {
      // #7880: IE11 and Edge use `Esc` for Escape key name.
      esc: ['Esc', 'Escape'],
      tab: 'Tab',
      enter: 'Enter',
      // #9112: IE11 uses `Spacebar` for Space key name.
      space: [' ', 'Spacebar'],
      // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
      up: ['Up', 'ArrowUp'],
      left: ['Left', 'ArrowLeft'],
      right: ['Right', 'ArrowRight'],
      down: ['Down', 'ArrowDown'],
      // #9112: IE11 uses `Del` for Delete key name.
      delete: ['Backspace', 'Delete', 'Del']
  };
  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  var genGuard = function (condition) { return "if(".concat(condition, ")return null;"); };
  var modifierCode = {
      stop: '$event.stopPropagation();',
      prevent: '$event.preventDefault();',
      self: genGuard("$event.target !== $event.currentTarget"),
      ctrl: genGuard("!$event.ctrlKey"),
      shift: genGuard("!$event.shiftKey"),
      alt: genGuard("!$event.altKey"),
      meta: genGuard("!$event.metaKey"),
      left: genGuard("'button' in $event && $event.button !== 0"),
      middle: genGuard("'button' in $event && $event.button !== 1"),
      right: genGuard("'button' in $event && $event.button !== 2")
  };
  function genHandlers(events, isNative) {
      var prefix = isNative ? 'nativeOn:' : 'on:';
      var staticHandlers = "";
      var dynamicHandlers = "";
      for (var name_1 in events) {
          var handlerCode = genHandler(events[name_1]);
          //@ts-expect-error
          if (events[name_1] && events[name_1].dynamic) {
              dynamicHandlers += "".concat(name_1, ",").concat(handlerCode, ",");
          }
          else {
              staticHandlers += "\"".concat(name_1, "\":").concat(handlerCode, ",");
          }
      }
      staticHandlers = "{".concat(staticHandlers.slice(0, -1), "}");
      if (dynamicHandlers) {
          return prefix + "_d(".concat(staticHandlers, ",[").concat(dynamicHandlers.slice(0, -1), "])");
      }
      else {
          return prefix + staticHandlers;
      }
  }
  function genHandler(handler) {
      if (!handler) {
          return 'function(){}';
      }
      if (Array.isArray(handler)) {
          return "[".concat(handler.map(function (handler) { return genHandler(handler); }).join(','), "]");
      }
      var isMethodPath = simplePathRE.test(handler.value);
      var isFunctionExpression = fnExpRE.test(handler.value);
      var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));
      if (!handler.modifiers) {
          if (isMethodPath || isFunctionExpression) {
              return handler.value;
          }
          return "function($event){".concat(isFunctionInvocation ? "return ".concat(handler.value) : handler.value, "}"); // inline statement
      }
      else {
          var code = '';
          var genModifierCode = '';
          var keys = [];
          var _loop_1 = function (key) {
              if (modifierCode[key]) {
                  genModifierCode += modifierCode[key];
                  // left/right
                  if (keyCodes[key]) {
                      keys.push(key);
                  }
              }
              else if (key === 'exact') {
                  var modifiers_1 = handler.modifiers;
                  genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta']
                      .filter(function (keyModifier) { return !modifiers_1[keyModifier]; })
                      .map(function (keyModifier) { return "$event.".concat(keyModifier, "Key"); })
                      .join('||'));
              }
              else {
                  keys.push(key);
              }
          };
          for (var key in handler.modifiers) {
              _loop_1(key);
          }
          if (keys.length) {
              code += genKeyFilter(keys);
          }
          // Make sure modifiers like prevent and stop get executed after key filtering
          if (genModifierCode) {
              code += genModifierCode;
          }
          var handlerCode = isMethodPath
              ? "return ".concat(handler.value, ".apply(null, arguments)")
              : isFunctionExpression
                  ? "return (".concat(handler.value, ").apply(null, arguments)")
                  : isFunctionInvocation
                      ? "return ".concat(handler.value)
                      : handler.value;
          return "function($event){".concat(code).concat(handlerCode, "}");
      }
  }
  function genKeyFilter(keys) {
      return (
      // make sure the key filters only apply to KeyboardEvents
      // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
      // key events that do not have keyCode property...
      "if(!$event.type.indexOf('key')&&" +
          "".concat(keys.map(genFilterCode).join('&&'), ")return null;"));
  }
  function genFilterCode(key) {
      var keyVal = parseInt(key, 10);
      if (keyVal) {
          return "$event.keyCode!==".concat(keyVal);
      }
      var keyCode = keyCodes[key];
      var keyName = keyNames[key];
      return ("_k($event.keyCode," +
          "".concat(JSON.stringify(key), ",") +
          "".concat(JSON.stringify(keyCode), ",") +
          "$event.key," +
          "".concat(JSON.stringify(keyName)) +
          ")");
  }

  function on(el, dir) {
      if (dir.modifiers) {
          warn$2("v-on without argument does not support modifiers.");
      }
      el.wrapListeners = function (code) { return "_g(".concat(code, ",").concat(dir.value, ")"); };
  }

  function bind(el, dir) {
      el.wrapData = function (code) {
          return "_b(".concat(code, ",'").concat(el.tag, "',").concat(dir.value, ",").concat(dir.modifiers && dir.modifiers.prop ? 'true' : 'false').concat(dir.modifiers && dir.modifiers.sync ? ',true' : '', ")");
      };
  }

  var baseDirectives = {
      on: on,
      bind: bind,
      cloak: noop
  };

  var CodegenState = /** @class */ (function () {
      function CodegenState(options) {
          this.options = options;
          this.warn = options.warn || baseWarn;
          this.transforms = pluckModuleFunction(options.modules, 'transformCode');
          this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
          this.directives = extend(extend({}, baseDirectives), options.directives);
          var isReservedTag = options.isReservedTag || no;
          this.maybeComponent = function (el) {
              return !!el.component || !isReservedTag(el.tag);
          };
          this.onceId = 0;
          this.staticRenderFns = [];
          this.pre = false;
      }
      return CodegenState;
  }());
  function generate(ast, options) {
      var state = new CodegenState(options);
      // fix #11483, Root level <script> tags should not be rendered.
      var code = ast
          ? ast.tag === 'script'
              ? 'null'
              : genElement(ast, state)
          : '_c("div")';
      return {
          render: "with(this){return ".concat(code, "}"),
          staticRenderFns: state.staticRenderFns
      };
  }
  function genElement(el, state) {
      if (el.parent) {
          el.pre = el.pre || el.parent.pre;
      }
      if (el.staticRoot && !el.staticProcessed) {
          return genStatic(el, state);
      }
      else if (el.once && !el.onceProcessed) {
          return genOnce(el, state);
      }
      else if (el.for && !el.forProcessed) {
          return genFor(el, state);
      }
      else if (el.if && !el.ifProcessed) {
          return genIf(el, state);
      }
      else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
          return genChildren(el, state) || 'void 0';
      }
      else if (el.tag === 'slot') {
          return genSlot(el, state);
      }
      else {
          // component or element
          var code = void 0;
          if (el.component) {
              code = genComponent(el.component, el, state);
          }
          else {
              var data = void 0;
              var maybeComponent = state.maybeComponent(el);
              if (!el.plain || (el.pre && maybeComponent)) {
                  data = genData(el, state);
              }
              var tag 
              // check if this is a component in <script setup>
              = void 0;
              // check if this is a component in <script setup>
              var bindings = state.options.bindings;
              if (maybeComponent && bindings && bindings.__isScriptSetup !== false) {
                  tag = checkBindingType(bindings, el.tag);
              }
              if (!tag)
                  tag = "'".concat(el.tag, "'");
              var children = el.inlineTemplate ? null : genChildren(el, state, true);
              code = "_c(".concat(tag).concat(data ? ",".concat(data) : '' // data
              ).concat(children ? ",".concat(children) : '' // children
              , ")");
          }
          // module transforms
          for (var i = 0; i < state.transforms.length; i++) {
              code = state.transforms[i](el, code);
          }
          return code;
      }
  }
  function checkBindingType(bindings, key) {
      var camelName = camelize(key);
      var PascalName = capitalize(camelName);
      var checkType = function (type) {
          if (bindings[key] === type) {
              return key;
          }
          if (bindings[camelName] === type) {
              return camelName;
          }
          if (bindings[PascalName] === type) {
              return PascalName;
          }
      };
      var fromConst = checkType("setup-const" /* BindingTypes.SETUP_CONST */) ||
          checkType("setup-reactive-const" /* BindingTypes.SETUP_REACTIVE_CONST */);
      if (fromConst) {
          return fromConst;
      }
      var fromMaybeRef = checkType("setup-let" /* BindingTypes.SETUP_LET */) ||
          checkType("setup-ref" /* BindingTypes.SETUP_REF */) ||
          checkType("setup-maybe-ref" /* BindingTypes.SETUP_MAYBE_REF */);
      if (fromMaybeRef) {
          return fromMaybeRef;
      }
  }
  // hoist static sub-trees out
  function genStatic(el, state) {
      el.staticProcessed = true;
      // Some elements (templates) need to behave differently inside of a v-pre
      // node.  All pre nodes are static roots, so we can use this as a location to
      // wrap a state change and reset it upon exiting the pre node.
      var originalPreState = state.pre;
      if (el.pre) {
          state.pre = el.pre;
      }
      state.staticRenderFns.push("with(this){return ".concat(genElement(el, state), "}"));
      state.pre = originalPreState;
      return "_m(".concat(state.staticRenderFns.length - 1).concat(el.staticInFor ? ',true' : '', ")");
  }
  // v-once
  function genOnce(el, state) {
      el.onceProcessed = true;
      if (el.if && !el.ifProcessed) {
          return genIf(el, state);
      }
      else if (el.staticInFor) {
          var key = '';
          var parent_1 = el.parent;
          while (parent_1) {
              if (parent_1.for) {
                  key = parent_1.key;
                  break;
              }
              parent_1 = parent_1.parent;
          }
          if (!key) {
              state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap['v-once']);
              return genElement(el, state);
          }
          return "_o(".concat(genElement(el, state), ",").concat(state.onceId++, ",").concat(key, ")");
      }
      else {
          return genStatic(el, state);
      }
  }
  function genIf(el, state, altGen, altEmpty) {
      el.ifProcessed = true; // avoid recursion
      return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
  }
  function genIfConditions(conditions, state, altGen, altEmpty) {
      if (!conditions.length) {
          return altEmpty || '_e()';
      }
      var condition = conditions.shift();
      if (condition.exp) {
          return "(".concat(condition.exp, ")?").concat(genTernaryExp(condition.block), ":").concat(genIfConditions(conditions, state, altGen, altEmpty));
      }
      else {
          return "".concat(genTernaryExp(condition.block));
      }
      // v-if with v-once should generate code like (a)?_m(0):_m(1)
      function genTernaryExp(el) {
          return altGen
              ? altGen(el, state)
              : el.once
                  ? genOnce(el, state)
                  : genElement(el, state);
      }
  }
  function genFor(el, state, altGen, altHelper) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? ",".concat(el.iterator1) : '';
      var iterator2 = el.iterator2 ? ",".concat(el.iterator2) : '';
      if (state.maybeComponent(el) &&
          el.tag !== 'slot' &&
          el.tag !== 'template' &&
          !el.key) {
          state.warn("<".concat(el.tag, " v-for=\"").concat(alias, " in ").concat(exp, "\">: component lists rendered with ") +
              "v-for should have explicit keys. " +
              "See https://v2.vuejs.org/v2/guide/list.html#key for more info.", el.rawAttrsMap['v-for'], true /* tip */);
      }
      el.forProcessed = true; // avoid recursion
      return ("".concat(altHelper || '_l', "((").concat(exp, "),") +
          "function(".concat(alias).concat(iterator1).concat(iterator2, "){") +
          "return ".concat((altGen || genElement)(el, state)) +
          '})');
  }
  function genData(el, state) {
      var data = '{';
      // directives first.
      // directives may mutate the el's other properties before they are generated.
      var dirs = genDirectives(el, state);
      if (dirs)
          data += dirs + ',';
      // key
      if (el.key) {
          data += "key:".concat(el.key, ",");
      }
      // ref
      if (el.ref) {
          data += "ref:".concat(el.ref, ",");
      }
      if (el.refInFor) {
          data += "refInFor:true,";
      }
      // pre
      if (el.pre) {
          data += "pre:true,";
      }
      // record original tag name for components using "is" attribute
      if (el.component) {
          data += "tag:\"".concat(el.tag, "\",");
      }
      // module data generation functions
      for (var i = 0; i < state.dataGenFns.length; i++) {
          data += state.dataGenFns[i](el);
      }
      // attributes
      if (el.attrs) {
          data += "attrs:".concat(genProps(el.attrs), ",");
      }
      // DOM props
      if (el.props) {
          data += "domProps:".concat(genProps(el.props), ",");
      }
      // event handlers
      if (el.events) {
          data += "".concat(genHandlers(el.events, false), ",");
      }
      if (el.nativeEvents) {
          data += "".concat(genHandlers(el.nativeEvents, true), ",");
      }
      // slot target
      // only for non-scoped slots
      if (el.slotTarget && !el.slotScope) {
          data += "slot:".concat(el.slotTarget, ",");
      }
      // scoped slots
      if (el.scopedSlots) {
          data += "".concat(genScopedSlots(el, el.scopedSlots, state), ",");
      }
      // component v-model
      if (el.model) {
          data += "model:{value:".concat(el.model.value, ",callback:").concat(el.model.callback, ",expression:").concat(el.model.expression, "},");
      }
      // inline-template
      if (el.inlineTemplate) {
          var inlineTemplate = genInlineTemplate(el, state);
          if (inlineTemplate) {
              data += "".concat(inlineTemplate, ",");
          }
      }
      data = data.replace(/,$/, '') + '}';
      // v-bind dynamic argument wrap
      // v-bind with dynamic arguments must be applied using the same v-bind object
      // merge helper so that class/style/mustUseProp attrs are handled correctly.
      if (el.dynamicAttrs) {
          data = "_b(".concat(data, ",\"").concat(el.tag, "\",").concat(genProps(el.dynamicAttrs), ")");
      }
      // v-bind data wrap
      if (el.wrapData) {
          data = el.wrapData(data);
      }
      // v-on data wrap
      if (el.wrapListeners) {
          data = el.wrapListeners(data);
      }
      return data;
  }
  function genDirectives(el, state) {
      var dirs = el.directives;
      if (!dirs)
          return;
      var res = 'directives:[';
      var hasRuntime = false;
      var i, l, dir, needRuntime;
      for (i = 0, l = dirs.length; i < l; i++) {
          dir = dirs[i];
          needRuntime = true;
          var gen = state.directives[dir.name];
          if (gen) {
              // compile-time directive that manipulates AST.
              // returns true if it also needs a runtime counterpart.
              needRuntime = !!gen(el, dir, state.warn);
          }
          if (needRuntime) {
              hasRuntime = true;
              res += "{name:\"".concat(dir.name, "\",rawName:\"").concat(dir.rawName, "\"").concat(dir.value
                  ? ",value:(".concat(dir.value, "),expression:").concat(JSON.stringify(dir.value))
                  : '').concat(dir.arg ? ",arg:".concat(dir.isDynamicArg ? dir.arg : "\"".concat(dir.arg, "\"")) : '').concat(dir.modifiers ? ",modifiers:".concat(JSON.stringify(dir.modifiers)) : '', "},");
          }
      }
      if (hasRuntime) {
          return res.slice(0, -1) + ']';
      }
  }
  function genInlineTemplate(el, state) {
      var ast = el.children[0];
      if ((el.children.length !== 1 || ast.type !== 1)) {
          state.warn('Inline-template components must have exactly one child element.', { start: el.start });
      }
      if (ast && ast.type === 1) {
          var inlineRenderFns = generate(ast, state.options);
          return "inlineTemplate:{render:function(){".concat(inlineRenderFns.render, "},staticRenderFns:[").concat(inlineRenderFns.staticRenderFns
              .map(function (code) { return "function(){".concat(code, "}"); })
              .join(','), "]}");
      }
  }
  function genScopedSlots(el, slots, state) {
      // by default scoped slots are considered "stable", this allows child
      // components with only scoped slots to skip forced updates from parent.
      // but in some cases we have to bail-out of this optimization
      // for example if the slot contains dynamic names, has v-if or v-for on them...
      var needsForceUpdate = el.for ||
          Object.keys(slots).some(function (key) {
              var slot = slots[key];
              return (slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot) // is passing down slot from parent which may be dynamic
              );
          });
      // #9534: if a component with scoped slots is inside a conditional branch,
      // it's possible for the same component to be reused but with different
      // compiled slot content. To avoid that, we generate a unique key based on
      // the generated code of all the slot contents.
      var needsKey = !!el.if;
      // OR when it is inside another scoped slot or v-for (the reactivity may be
      // disconnected due to the intermediate scope variable)
      // #9438, #9506
      // TODO: this can be further optimized by properly analyzing in-scope bindings
      // and skip force updating ones that do not actually use scope variables.
      if (!needsForceUpdate) {
          var parent_2 = el.parent;
          while (parent_2) {
              if ((parent_2.slotScope && parent_2.slotScope !== emptySlotScopeToken) ||
                  parent_2.for) {
                  needsForceUpdate = true;
                  break;
              }
              if (parent_2.if) {
                  needsKey = true;
              }
              parent_2 = parent_2.parent;
          }
      }
      var generatedSlots = Object.keys(slots)
          .map(function (key) { return genScopedSlot(slots[key], state); })
          .join(',');
      return "scopedSlots:_u([".concat(generatedSlots, "]").concat(needsForceUpdate ? ",null,true" : "").concat(!needsForceUpdate && needsKey ? ",null,false,".concat(hash(generatedSlots)) : "", ")");
  }
  function hash(str) {
      var hash = 5381;
      var i = str.length;
      while (i) {
          hash = (hash * 33) ^ str.charCodeAt(--i);
      }
      return hash >>> 0;
  }
  function containsSlotChild(el) {
      if (el.type === 1) {
          if (el.tag === 'slot') {
              return true;
          }
          return el.children.some(containsSlotChild);
      }
      return false;
  }
  function genScopedSlot(el, state) {
      var isLegacySyntax = el.attrsMap['slot-scope'];
      if (el.if && !el.ifProcessed && !isLegacySyntax) {
          return genIf(el, state, genScopedSlot, "null");
      }
      if (el.for && !el.forProcessed) {
          return genFor(el, state, genScopedSlot);
      }
      var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
      var fn = "function(".concat(slotScope, "){") +
          "return ".concat(el.tag === 'template'
              ? el.if && isLegacySyntax
                  ? "(".concat(el.if, ")?").concat(genChildren(el, state) || 'undefined', ":undefined")
                  : genChildren(el, state) || 'undefined'
              : genElement(el, state), "}");
      // reverse proxy v-slot without scope on this.$slots
      var reverseProxy = slotScope ? "" : ",proxy:true";
      return "{key:".concat(el.slotTarget || "\"default\"", ",fn:").concat(fn).concat(reverseProxy, "}");
  }
  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
      var children = el.children;
      if (children.length) {
          var el_1 = children[0];
          // optimize single v-for
          if (children.length === 1 &&
              el_1.for &&
              el_1.tag !== 'template' &&
              el_1.tag !== 'slot') {
              var normalizationType_1 = checkSkip
                  ? state.maybeComponent(el_1)
                      ? ",1"
                      : ",0"
                  : "";
              return "".concat((altGenElement || genElement)(el_1, state)).concat(normalizationType_1);
          }
          var normalizationType = checkSkip
              ? getNormalizationType(children, state.maybeComponent)
              : 0;
          var gen_1 = altGenNode || genNode;
          return "[".concat(children.map(function (c) { return gen_1(c, state); }).join(','), "]").concat(normalizationType ? ",".concat(normalizationType) : '');
      }
  }
  // determine the normalization needed for the children array.
  // 0: no normalization needed
  // 1: simple normalization needed (possible 1-level deep nested array)
  // 2: full normalization needed
  function getNormalizationType(children, maybeComponent) {
      var res = 0;
      for (var i = 0; i < children.length; i++) {
          var el = children[i];
          if (el.type !== 1) {
              continue;
          }
          if (needsNormalization(el) ||
              (el.ifConditions &&
                  el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
              res = 2;
              break;
          }
          if (maybeComponent(el) ||
              (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
              res = 1;
          }
      }
      return res;
  }
  function needsNormalization(el) {
      return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
  }
  function genNode(node, state) {
      if (node.type === 1) {
          return genElement(node, state);
      }
      else if (node.type === 3 && node.isComment) {
          return genComment(node);
      }
      else {
          return genText(node);
      }
  }
  function genText(text) {
      return "_v(".concat(text.type === 2
          ? text.expression // no need for () because already wrapped in _s()
          : transformSpecialNewlines(JSON.stringify(text.text)), ")");
  }
  function genComment(comment) {
      return "_e(".concat(JSON.stringify(comment.text), ")");
  }
  function genSlot(el, state) {
      var slotName = el.slotName || '"default"';
      var children = genChildren(el, state);
      var res = "_t(".concat(slotName).concat(children ? ",function(){return ".concat(children, "}") : '');
      var attrs = el.attrs || el.dynamicAttrs
          ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
              // slot props are camelized
              name: camelize(attr.name),
              value: attr.value,
              dynamic: attr.dynamic
          }); }))
          : null;
      var bind = el.attrsMap['v-bind'];
      if ((attrs || bind) && !children) {
          res += ",null";
      }
      if (attrs) {
          res += ",".concat(attrs);
      }
      if (bind) {
          res += "".concat(attrs ? '' : ',null', ",").concat(bind);
      }
      return res + ')';
  }
  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
  function genComponent(componentName, el, state) {
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      return "_c(".concat(componentName, ",").concat(genData(el, state)).concat(children ? ",".concat(children) : '', ")");
  }
  function genProps(props) {
      var staticProps = "";
      var dynamicProps = "";
      for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          var value = transformSpecialNewlines(prop.value);
          if (prop.dynamic) {
              dynamicProps += "".concat(prop.name, ",").concat(value, ",");
          }
          else {
              staticProps += "\"".concat(prop.name, "\":").concat(value, ",");
          }
      }
      staticProps = "{".concat(staticProps.slice(0, -1), "}");
      if (dynamicProps) {
          return "_d(".concat(staticProps, ",[").concat(dynamicProps.slice(0, -1), "])");
      }
      else {
          return staticProps;
      }
  }
  // #3895, #4268
  function transformSpecialNewlines(text) {
      return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  }

  // these keywords should not appear inside expressions, but operators like
  // typeof, instanceof and in are allowed
  var prohibitedKeywordRE = new RegExp('\\b' +
      ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
          'super,throw,while,yield,delete,export,import,return,switch,default,' +
          'extends,finally,continue,debugger,function,arguments')
          .split(',')
          .join('\\b|\\b') +
      '\\b');
  // these unary operators should not be used as property/method names
  var unaryOperatorsRE = new RegExp('\\b' +
      'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') +
      '\\s*\\([^\\)]*\\)');
  // strip strings in expressions
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
  // detect problematic expressions in a template
  function detectErrors(ast, warn) {
      if (ast) {
          checkNode(ast, warn);
      }
  }
  function checkNode(node, warn) {
      if (node.type === 1) {
          for (var name_1 in node.attrsMap) {
              if (dirRE.test(name_1)) {
                  var value = node.attrsMap[name_1];
                  if (value) {
                      var range = node.rawAttrsMap[name_1];
                      if (name_1 === 'v-for') {
                          checkFor(node, "v-for=\"".concat(value, "\""), warn, range);
                      }
                      else if (name_1 === 'v-slot' || name_1[0] === '#') {
                          checkFunctionParameterExpression(value, "".concat(name_1, "=\"").concat(value, "\""), warn, range);
                      }
                      else if (onRE.test(name_1)) {
                          checkEvent(value, "".concat(name_1, "=\"").concat(value, "\""), warn, range);
                      }
                      else {
                          checkExpression(value, "".concat(name_1, "=\"").concat(value, "\""), warn, range);
                      }
                  }
              }
          }
          if (node.children) {
              for (var i = 0; i < node.children.length; i++) {
                  checkNode(node.children[i], warn);
              }
          }
      }
      else if (node.type === 2) {
          checkExpression(node.expression, node.text, warn, node);
      }
  }
  function checkEvent(exp, text, warn, range) {
      var stripped = exp.replace(stripStringRE, '');
      var keywordMatch = stripped.match(unaryOperatorsRE);
      if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
          warn("avoid using JavaScript unary operator as property name: " +
              "\"".concat(keywordMatch[0], "\" in expression ").concat(text.trim()), range);
      }
      checkExpression(exp, text, warn, range);
  }
  function checkFor(node, text, warn, range) {
      checkExpression(node.for || '', text, warn, range);
      checkIdentifier(node.alias, 'v-for alias', text, warn, range);
      checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
      checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
  }
  function checkIdentifier(ident, type, text, warn, range) {
      if (typeof ident === 'string') {
          try {
              new Function("var ".concat(ident, "=_"));
          }
          catch (e) {
              warn("invalid ".concat(type, " \"").concat(ident, "\" in expression: ").concat(text.trim()), range);
          }
      }
  }
  function checkExpression(exp, text, warn, range) {
      try {
          new Function("return ".concat(exp));
      }
      catch (e) {
          var keywordMatch = exp
              .replace(stripStringRE, '')
              .match(prohibitedKeywordRE);
          if (keywordMatch) {
              warn("avoid using JavaScript keyword as property name: " +
                  "\"".concat(keywordMatch[0], "\"\n  Raw expression: ").concat(text.trim()), range);
          }
          else {
              warn("invalid expression: ".concat(e.message, " in\n\n") +
                  "    ".concat(exp, "\n\n") +
                  "  Raw expression: ".concat(text.trim(), "\n"), range);
          }
      }
  }
  function checkFunctionParameterExpression(exp, text, warn, range) {
      try {
          new Function(exp, '');
      }
      catch (e) {
          warn("invalid function parameter expression: ".concat(e.message, " in\n\n") +
              "    ".concat(exp, "\n\n") +
              "  Raw expression: ".concat(text.trim(), "\n"), range);
      }
  }

  var range = 2;
  function generateCodeFrame(source, start, end) {
      if (start === void 0) { start = 0; }
      if (end === void 0) { end = source.length; }
      var lines = source.split(/\r?\n/);
      var count = 0;
      var res = [];
      for (var i = 0; i < lines.length; i++) {
          count += lines[i].length + 1;
          if (count >= start) {
              for (var j = i - range; j <= i + range || end > count; j++) {
                  if (j < 0 || j >= lines.length)
                      continue;
                  res.push("".concat(j + 1).concat(repeat(" ", 3 - String(j + 1).length), "|  ").concat(lines[j]));
                  var lineLength = lines[j].length;
                  if (j === i) {
                      // push underline
                      var pad = start - (count - lineLength) + 1;
                      var length_1 = end > count ? lineLength - pad : end - start;
                      res.push("   |  " + repeat(" ", pad) + repeat("^", length_1));
                  }
                  else if (j > i) {
                      if (end > count) {
                          var length_2 = Math.min(end - count, lineLength);
                          res.push("   |  " + repeat("^", length_2));
                      }
                      count += lineLength + 1;
                  }
              }
              break;
          }
      }
      return res.join('\n');
  }
  function repeat(str, n) {
      var result = '';
      if (n > 0) {
          // eslint-disable-next-line no-constant-condition
          while (true) {
              // eslint-disable-line
              if (n & 1)
                  result += str;
              n >>>= 1;
              if (n <= 0)
                  break;
              str += str;
          }
      }
      return result;
  }

  function createFunction(code, errors) {
      try {
          return new Function(code);
      }
      catch (err) {
          errors.push({ err: err, code: code });
          return noop;
      }
  }
  function createCompileToFunctionFn(compile) {
      var cache = Object.create(null);
      return function compileToFunctions(template, options, vm) {
          options = extend({}, options);
          var warn = options.warn || warn$2;
          delete options.warn;
          /* istanbul ignore if */
          {
              // detect possible CSP restriction
              try {
                  new Function('return 1');
              }
              catch (e) {
                  if (e.toString().match(/unsafe-eval|CSP/)) {
                      warn('It seems you are using the standalone build of Vue.js in an ' +
                          'environment with Content Security Policy that prohibits unsafe-eval. ' +
                          'The template compiler cannot work in this environment. Consider ' +
                          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                          'templates into render functions.');
                  }
              }
          }
          // check cache
          var key = options.delimiters
              ? String(options.delimiters) + template
              : template;
          if (cache[key]) {
              return cache[key];
          }
          // compile
          var compiled = compile(template, options);
          // check compilation errors/tips
          {
              if (compiled.errors && compiled.errors.length) {
                  if (options.outputSourceRange) {
                      compiled.errors.forEach(function (e) {
                          warn("Error compiling template:\n\n".concat(e.msg, "\n\n") +
                              generateCodeFrame(template, e.start, e.end), vm);
                      });
                  }
                  else {
                      warn("Error compiling template:\n\n".concat(template, "\n\n") +
                          compiled.errors.map(function (e) { return "- ".concat(e); }).join('\n') +
                          '\n', vm);
                  }
              }
              if (compiled.tips && compiled.tips.length) {
                  if (options.outputSourceRange) {
                      compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
                  }
                  else {
                      compiled.tips.forEach(function (msg) { return tip(msg, vm); });
                  }
              }
          }
          // turn code into functions
          var res = {};
          var fnGenErrors = [];
          res.render = createFunction(compiled.render, fnGenErrors);
          res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
              return createFunction(code, fnGenErrors);
          });
          // check function generation errors.
          // this should only happen if there is a bug in the compiler itself.
          // mostly for codegen development use
          /* istanbul ignore if */
          {
              if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
                  warn("Failed to generate render function:\n\n" +
                      fnGenErrors
                          .map(function (_a) {
                          var err = _a.err, code = _a.code;
                          return "".concat(err.toString(), " in\n\n").concat(code, "\n");
                      })
                          .join('\n'), vm);
              }
          }
          return (cache[key] = res);
      };
  }

  function createCompilerCreator(baseCompile) {
      return function createCompiler(baseOptions) {
          function compile(template, options) {
              var finalOptions = Object.create(baseOptions);
              var errors = [];
              var tips = [];
              var warn = function (msg, range, tip) {
                  (tip ? tips : errors).push(msg);
              };
              if (options) {
                  if (options.outputSourceRange) {
                      // $flow-disable-line
                      var leadingSpaceLength_1 = template.match(/^\s*/)[0].length;
                      warn = function (msg, range, tip) {
                          var data = typeof msg === 'string' ? { msg: msg } : msg;
                          if (range) {
                              if (range.start != null) {
                                  data.start = range.start + leadingSpaceLength_1;
                              }
                              if (range.end != null) {
                                  data.end = range.end + leadingSpaceLength_1;
                              }
                          }
                          (tip ? tips : errors).push(data);
                      };
                  }
                  // merge custom modules
                  if (options.modules) {
                      finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
                  }
                  // merge custom directives
                  if (options.directives) {
                      finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
                  }
                  // copy other options
                  for (var key in options) {
                      if (key !== 'modules' && key !== 'directives') {
                          finalOptions[key] = options[key];
                      }
                  }
              }
              finalOptions.warn = warn;
              var compiled = baseCompile(template.trim(), finalOptions);
              {
                  detectErrors(compiled.ast, warn);
              }
              compiled.errors = errors;
              compiled.tips = tips;
              return compiled;
          }
          return {
              compile: compile,
              compileToFunctions: createCompileToFunctionFn(compile)
          };
      };
  }

  // `createCompilerCreator` allows creating compilers that use alternative
  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
  // Here we just export a default compiler using the default parts.
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
      var ast = parse(template.trim(), options);
      if (options.optimize !== false) {
          optimize(ast, options);
      }
      var code = generate(ast, options);
      return {
          ast: ast,
          render: code.render,
          staticRenderFns: code.staticRenderFns
      };
  });

  var _a = createCompiler(baseOptions), compileToFunctions = _a.compileToFunctions;

  // check whether current browser encodes a char inside attribute values
  var div;
  function getShouldDecode(href) {
      div = div || document.createElement('div');
      div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
      return div.innerHTML.indexOf('&#10;') > 0;
  }
  // #3663: IE encodes newlines inside attribute values while other browsers don't
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  // #6828: chrome encodes content in a[href]
  var shouldDecodeNewlinesForHref = inBrowser
      ? getShouldDecode(true)
      : false;

  var idToTemplate = cached(function (id) {
      var el = query(id);
      return el && el.innerHTML;
  });
  var mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function (el, hydrating) {
      el = el && query(el);
      /* istanbul ignore if */
      if (el === document.body || el === document.documentElement) {
          warn$2("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
          return this;
      }
      var options = this.$options;
      // resolve template/el and convert to render function
      if (!options.render) {
          var template = options.template;
          if (template) {
              if (typeof template === 'string') {
                  if (template.charAt(0) === '#') {
                      template = idToTemplate(template);
                      /* istanbul ignore if */
                      if (!template) {
                          warn$2("Template element not found or is empty: ".concat(options.template), this);
                      }
                  }
              }
              else if (template.nodeType) {
                  template = template.innerHTML;
              }
              else {
                  {
                      warn$2('invalid template option:' + template, this);
                  }
                  return this;
              }
          }
          else if (el) {
              // @ts-expect-error
              template = getOuterHTML(el);
          }
          if (template) {
              /* istanbul ignore if */
              if (config.performance && mark) {
                  mark('compile');
              }
              var _a = compileToFunctions(template, {
                  outputSourceRange: true,
                  shouldDecodeNewlines: shouldDecodeNewlines,
                  shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                  delimiters: options.delimiters,
                  comments: options.comments
              }, this), render = _a.render, staticRenderFns = _a.staticRenderFns;
              options.render = render;
              options.staticRenderFns = staticRenderFns;
              /* istanbul ignore if */
              if (config.performance && mark) {
                  mark('compile end');
                  measure("vue ".concat(this._name, " compile"), 'compile', 'compile end');
              }
          }
      }
      return mount.call(this, el, hydrating);
  };
  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   */
  function getOuterHTML(el) {
      if (el.outerHTML) {
          return el.outerHTML;
      }
      else {
          var container = document.createElement('div');
          container.appendChild(el.cloneNode(true));
          return container.innerHTML;
      }
  }
  Vue.compile = compileToFunctions;

  // export type EffectScheduler = (...args: any[]) => any
  /**
   * @internal since we are not exposing this in Vue 2, it's used only for
   * internal testing.
   */
  function effect(fn, scheduler) {
      var watcher = new Watcher(currentInstance, fn, noop, {
          sync: true
      });
      if (scheduler) {
          watcher.update = function () {
              scheduler(function () { return watcher.run(); });
          };
      }
  }

  extend(Vue, vca);
  Vue.effect = effect;

  return Vue;

}));
