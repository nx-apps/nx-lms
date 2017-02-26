/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = commonAction;
/* harmony export (immutable) */ __webpack_exports__["a"] = dispatchActionBehavior;
function commonAction(){
    return {
        listeners:{
            'method':'handleCall'
        },
        handleCall:function(e){
            var detail = e.detail;
            var args = detail.args;
            var callback = detail.callback;

            var methodName = args[0];
            var args = Array.prototype.slice.call(args);
            if(args.length>1)
            args = args.slice(1,args.length);

            var argsText = "";
            var params = [];
            args.map((row,i)=>{
                params.push(row);
                if(i!=0) argsText+=',';
                argsText += `params[${i}]`
            });
        
            callback(eval(`
                if(this.${methodName})
                this.${methodName}(${argsText})
            `));

        }
    }
}

function dispatchActionBehavior(){
    return {
        dispatchAction:function(){
            return new Promise((reslove,reject)=>{
                this.fire('method',{
                    args:arguments,
                    callback:(promise)=>{
                        if(typeof promise == "undefined"){
                            reslove('Action no promise.');
                        }else{
                            promise.then((res)=>{
                                reslove(promise);
                            }).catch((err)=>{
                                reject(err);
                            })
                        }
                    }
                });
            })
            
        }
    }
}

const baseURL = `https://${window.location.hostname}:${location.port}`;
/* harmony export (immutable) */ __webpack_exports__["c"] = baseURL;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_axios__["create"])({
    baseURL:__WEBPACK_IMPORTED_MODULE_1__config__["c" /* baseURL */]+'/api',
    headers: {'token': localStorage.getItem('token')}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(9);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(32);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(5);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var settle = __webpack_require__(24);
var buildURL = __webpack_require__(27);
var parseHeaders = __webpack_require__(33);
var isURLSameOrigin = __webpack_require__(31);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(26);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(29);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(23);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(44);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = Symbol;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(45);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = isPlainObject;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_polymer_redux__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_polymer_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_polymer_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reduxStore_auth_store_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reduxStore_classRoom_store_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reduxStore_commonSystem_store_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reduxStore_difficulty_store_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reduxStore_exam_store_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reduxStore_examHistory_store_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reduxStore_examResult_store_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__reduxStore_examRoom_store_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__reduxStore_examination_store_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__reduxStore_examinationRoom_store_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__reduxStore_module_store_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__reduxStore_question_store_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__reduxStore_userManage_store_js__ = __webpack_require__(68);




















const rootReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* combineReducers */])({
	auth:__WEBPACK_IMPORTED_MODULE_4__reduxStore_auth_store_js__["a" /* authReducer */],
	classRoom:__WEBPACK_IMPORTED_MODULE_5__reduxStore_classRoom_store_js__["a" /* classRoomReducer */],
	commonSystem:__WEBPACK_IMPORTED_MODULE_6__reduxStore_commonSystem_store_js__["a" /* commonSystemReducer */],
	difficulty:__WEBPACK_IMPORTED_MODULE_7__reduxStore_difficulty_store_js__["a" /* difficultyReducer */],
	exam:__WEBPACK_IMPORTED_MODULE_8__reduxStore_exam_store_js__["a" /* examReducer */],
	examHistory:__WEBPACK_IMPORTED_MODULE_9__reduxStore_examHistory_store_js__["a" /* examHistoryReducer */],
	examResult:__WEBPACK_IMPORTED_MODULE_10__reduxStore_examResult_store_js__["a" /* examResultReducer */],
	examRoom:__WEBPACK_IMPORTED_MODULE_11__reduxStore_examRoom_store_js__["a" /* examRoomReducer */],
	examination:__WEBPACK_IMPORTED_MODULE_12__reduxStore_examination_store_js__["a" /* examinationReducer */],
	examinationRoom:__WEBPACK_IMPORTED_MODULE_13__reduxStore_examinationRoom_store_js__["a" /* examinationRoomReducer */],
	module:__WEBPACK_IMPORTED_MODULE_14__reduxStore_module_store_js__["a" /* moduleReducer */],
	question:__WEBPACK_IMPORTED_MODULE_15__reduxStore_question_store_js__["a" /* questionReducer */],
	userManage:__WEBPACK_IMPORTED_MODULE_16__reduxStore_userManage_store_js__["a" /* userManageReducer */],

});

const storeApp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["b" /* createStore */])(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = [__WEBPACK_IMPORTED_MODULE_1_polymer_redux___default()(storeApp),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* dispatchActionBehavior */])()];
window.dispatchActionBehavior = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* dispatchActionBehavior */])();

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth__["a" /* handleAuth */])(storeApp);

window.authAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__reduxStore_auth_store_js__["b" /* authAction */])(storeApp);
window.classRoomAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__reduxStore_classRoom_store_js__["b" /* classRoomAction */])(storeApp);
window.commonSystemAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__reduxStore_commonSystem_store_js__["b" /* commonSystemAction */])(storeApp);
window.difficultyAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__reduxStore_difficulty_store_js__["b" /* difficultyAction */])(storeApp);
window.examAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__reduxStore_exam_store_js__["b" /* examAction */])(storeApp);
window.examHistoryAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__reduxStore_examHistory_store_js__["b" /* examHistoryAction */])(storeApp);
window.examResultAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__reduxStore_examResult_store_js__["b" /* examResultAction */])(storeApp);
window.examRoomAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__reduxStore_examRoom_store_js__["b" /* examRoomAction */])(storeApp);
window.examinationAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__reduxStore_examination_store_js__["b" /* examinationAction */])(storeApp);
window.examinationRoomAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__reduxStore_examinationRoom_store_js__["b" /* examinationRoomAction */])(storeApp);
window.moduleAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__reduxStore_module_store_js__["b" /* moduleAction */])(storeApp);
window.questionAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__reduxStore_question_store_js__["b" /* questionAction */])(storeApp);
window.userManageAction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__reduxStore_userManage_store_js__["b" /* userManageAction */])(storeApp);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(9);
var Axios = __webpack_require__(20);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(6);
axios.CancelToken = __webpack_require__(19);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(34);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(6);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(21);
var dispatchRequest = __webpack_require__(22);
var isAbsoluteURL = __webpack_require__(30);
var combineURLs = __webpack_require__(28);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(25);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(4);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(35);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(36);

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new Error('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  return JSON.parse(base64_url_decode(token.split('.')[pos]));
};


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(42);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = baseGetTag;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(15)))

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(43);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = getPrototype;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(10);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = getRawTag;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = objectToString;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = overArg;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(39);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = root;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = isObjectLike;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

(function(root, factory) {
    /* istanbul ignore next */
    if (true) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root['PolymerRedux'] = factory();
    }
})(this, function() {
    var warning = 'Polymer Redux: <%s>.%s has "notify" enabled, two-way bindings goes against Redux\'s paradigm';

    /**
     * Returns property bindings found on a given Element/Behavior.
     *
     * @private
     * @param {HTMLElement|Object} obj Element or Behavior.
     * @param {HTMLElement} element Polymer element.
     * @param {Object} store Redux store.
     * @return {Array}
     */
    function getStatePathProperties(obj, element, store) {
        var props = [];

        if (obj.properties != null) {
            Object.keys(obj.properties).forEach(function(name) {
                var prop = obj.properties[name];
                if (prop.hasOwnProperty('statePath')) {
                    // notify flag, warn against two-way bindings
                    if (prop.notify && !prop.readOnly) {
                        console.warn(warning, element.is, name);
                    }
                    props.push({
                        name: name,
                        // Empty statePath return state
                        path: prop.statePath || store.getState,
                        readOnly: prop.readOnly,
                        type: prop.type
                    });
                }
            });
        }

        return props;
    }

    /**
     * Factory function for creating a listener for a give Polymer element. The
     * returning listener should be passed to `store.subscribe`.
     *
     * @private
     * @param {HTMLElement} element Polymer element.
     * @return {Function} Redux subcribe listener.
     */
    function createListener(element, store) {
        var props = getStatePathProperties(element, element, store);

        // behavior property bindings
        if (Array.isArray(element.behaviors)) {
            element.behaviors.forEach(function(behavior) {
                var extras = getStatePathProperties(behavior, element, store);
                if (extras.length) {
                    Array.prototype.push.apply(props, extras);
                }
            });

            // de-dupe behavior props
            var names = props.map(function(prop) {
                return prop.name; // grab the prop names
            });
            props = props.filter(function(prop, i) {
                return names.indexOf(prop.name) === i; // indices must match
            });
        }

        // redux listener
        return function() {
            var state = store.getState();
            props.forEach(function(property) {
                var propName = property.name;
                var splices = [];
                var value, previous;

                // statePath, a path or function.
                var path = property.path;
                if (typeof path == 'function') {
                    value = path.call(element, state);
                } else {
                    value = Polymer.Base.get(path, state);
                }

                // prevent unnecesary polymer notifications
                previous = element.get(property.name);
                if (value === previous) {
                    return;
                }

                // type of array, work out splices before setting the value
                if (property.type === Array) {
                    value = value || /* istanbul ignore next */ [];
                    previous = previous || /* istanbul ignore next */ [];

                    // check the value type
                    if (!Array.isArray(value)) {
                        throw new TypeError(
                            '<'+ element.is +'>.'+ propName +' type is Array but given: ' + (typeof value)
                        );
                    }

                    splices = Polymer.ArraySplice.calculateSplices(value, previous);
                }

                // set
                if (property.readOnly) {
                    element.notifyPath(propName, value);
                } else {
                    element.set(propName, value);
                }

                // notify element of splices
                if (splices.length) {
                    element.notifySplices(propName, splices);
                }
            });
            element.fire('state-changed', state);
        }
    }

    /**
     * Binds an given Polymer element to a Redux store.
     *
     * @private
     * @param {HTMLElement} element Polymer element.
     * @param {Object} store Redux store.
     */
    function bindReduxListener(element, store) {
        var listener;

        if (element._reduxUnsubscribe) return;

        listener = createListener(element, store);
        listener(); // start bindings

        element._reduxUnsubscribe = store.subscribe(listener);
    }

    /**
     * Unbinds a Polymer element from a Redux store.
     *
     * @private
     * @param {HTMLElement} element
     */
    function unbindReduxListener(element) {
        if (typeof element._reduxUnsubscribe === 'function') {
            element._reduxUnsubscribe();
            delete element._reduxUnsubscribe;
        }
    }

    /**
     * Builds list of action creators from a given element and it's inherited
     * behaviors setting the list onto the element.
     *
     * @private
     * @param {HTMLElement} element Polymer element instance.
     */
    function compileActionCreators(element) {
        var actions = {};
        var behaviors = element.behaviors;

        if (element._reduxActions) return;

        // add behavior actions first, in reverse order so we keep priority
        if (Array.isArray(behaviors)) {
            for (var i = behaviors.length - 1; i >= 0; i--) {
                Object.assign(actions, behaviors[i].actions);
            }
        }

        // element actions have priority
        element._reduxActions = Object.assign(actions, element.actions);
    }

    /**
     * Dispatches a Redux action via a Polymer element. This gives the element
     * a polymorphic dispatch function. See the readme for the various ways to
     * dispatch.
     *
     * @private
     * @param {HTMLElement} element Polymer element.
     * @param {Object} store Redux store.
     * @param {Arguments} args The arguments passed to `element.dispatch`.
     * @return {Object} The computed Redux action.
     */
    function dispatchReduxAction(element, store, args) {
        var action = args[0];
        var actions = element._reduxActions;

        args = castArgumentsToArray(args);

        // action name
        if (actions && typeof action === 'string') {
            if (typeof actions[action] !== 'function') {
                throw new TypeError('Polymer Redux: <' + element.is + '> has no action "' + action + '"');
            }
            action = actions[action].apply(element, args.slice(1));
        }

        // !!! DEPRECIATED !!!
        // This will be removed as of 1.0.

        // action creator
        if (typeof action === 'function' && action.length === 0) {
            return store.dispatch(action());
        }

        // ---

        // middleware, make sure we pass the polymer-redux dispatch
        // so we have access to the elements action creators
        if (typeof action === 'function') {
            return store.dispatch(function() {
                var argv = castArgumentsToArray(arguments);
                // replace redux dispatch
                argv.splice(0, 1, function() {
                    return dispatchReduxAction(element, store, arguments);
                });
                return action.apply(element, argv);
            });
        }

        // action
        return store.dispatch(action);
    }

    /**
     * Turns arguments into an Array.
     *
     * @param {Arguments} args
     * @return {Array}
     */
    function castArgumentsToArray(args) {
        return Array.prototype.slice.call(args, 0);
    }

    /**
     * Creates PolymerRedux behaviors from a given Redux store.
     *
     * @param {Object} store Redux store.
     * @return {PolymerRedux}
     */
    return function(store) {
        var PolymerRedux;

        // check for store
        if (!store) {
            throw new TypeError('missing redux store');
        }

        /**
         * `PolymerRedux` binds a given Redux store's state to implementing Elements.
         *
         * Full documentation available, https://github.com/tur-nr/polymer-redux.
         *
         * @polymerBehavior PolymerRedux
         * @demo demo/index.html
         */
        return PolymerRedux = {
            /**
             * Fired when the Redux store state changes.
             * @event state-changed
             * @param {*} state
             */

            ready: function() {
                bindReduxListener(this, store);
                compileActionCreators(this);
            },

            attached: function() {
                bindReduxListener(this, store);
                compileActionCreators(this);
            },

            detached: function() {
                unbindReduxListener(this);
            },

            /**
             * Dispatches an action to the Redux store.
             *
             * @param {String|Object|Function} action
             * @return {Object} The action that was dispatched.
             */
            dispatch: function(action /*, [...args] */) {
                return dispatchReduxAction(this, store, arguments);
            },

            /**
             * Gets the current state in the Redux store.
             * @return {*}
             */
            getState: function() {
                return store.getState();
            },
        };
    };
});


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(12);
/* unused harmony export default */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(14);
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(52);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(53);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(54)(module)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = handleAuth;



function handleAuth(store){
    var path = window.location.pathname.split("/");
 
        if(localStorage.getItem("token")){
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('/auth/checkToken',{token:localStorage.getItem("token")})
            .then(res=>{
                store.dispatch({type:'AUTH_SET_USER',payload:res.data})
            })
            .catch(err=>{
                localStorage.removeItem("token");
            })
        }

}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jwt_decode__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jwt_decode__);
/* harmony export (immutable) */ __webpack_exports__["a"] = authReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = authAction;




const initialState = {
    user:{role:'none'}
}

function authReducer(state = initialState,action){

    switch (action.type) {
        case 'AUTH_SET_USER':
            var userInfo;
            if(action.payload.token){
                userInfo = __WEBPACK_IMPORTED_MODULE_2_jwt_decode___default()(action.payload.token)
            }else{
                userInfo = action.payload;
            }
            return Object.assign({},state,{user:userInfo});
        case 'AUTH_CLEAR_USER':
            return Object.assign({},state,{user:{role:'none'}})
        default:
            return state
    }

}

function authAction(store){

    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            AUTH_LOGIN:function(formLogin){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./auth/login',{username:formLogin.user,password:formLogin.pass})
                .then((response)=>{

                   
                    localStorage.setItem("token",response.data.token);
                    store.dispatch({type:'AUTH_SET_USER',payload:response.data})

                    let userInfo;
                    if(response.data.token){
                        userInfo = __WEBPACK_IMPORTED_MODULE_2_jwt_decode___default()(response.data.token)
                    }else{
                        userInfo = response.data;
                    }
                    if(userInfo.status == true){
                        if(userInfo.role=="teacher"){
                            //this.fire('nylon-change-page',{path:'/examRoom'})
                            window.location = "/examRoom";
                        }else{
                            // this.fire('nylon-change-page',{path:'/examHistory'})
                          
                            // this.selected = '1';
                            window.location = "/examHistory";
                        }
                    }
                    else{
                        this.toPagePassword();
                    }
                })
                .catch((error)=>{
                    //console.log('error');
                    console.log({error});
                    alert('error')
                });
            },
            AUTH_CLEAR_USER:function(){
                store.dispatch({type:'AUTH_CLEAR_USER'});
            },
            AUTH_SET_PASSWORD:function(data){
                // alert('AUTH_SET_PASSWORD')
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./user/user',data)
                .then((response)=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                      callback:()=>{
                          
                      }
                     });
                    this.AUTH_CLEAR_USER();
                    this.fire('page-login')
                    //  this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                console.log('error');
                console.log(error);
                });
        }
    }
    ]

}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = classRoomReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = classRoomAction;



const initialState = {
    dataList:[]
}

function classRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'CLASSROOM_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

function classRoomAction(store){

    
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            
            TEST_A:function(a){
                this.aaa = '1';
                return new Promise((resolve,reject)=>{
                    return resolve('ddddd');
                })
            },

            CLASSROOM_GET_LIST:function(){
                // axios.get('./student/student')
                // .then((response)=>{
                //     console.log(response.data);
                //     store.dispatch({type:'CLASSROOM_GET_LIST',payload:response.data});
                // })
                // .catch((error)=>{
                //     console.log(error);
                // })
            }

        }
    ]


}


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = commonSystemReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = commonSystemAction;



const initialState = {
    module:[],
    subModule:[],
    difficultyIndex:[
        {
            id:1,
            label:'ง่าย'
        },
        {
            id:2,
            label:'ปานกลาง'
        },
        {
            id:3,
            label:'ยาก'
        }
    ] 
}

function commonSystemReducer(state = initialState,action){
    switch (action.type) {
        case 'COMMON_MODULE':
            return Object.assign({},state,{module:action.payload});
        case 'COMMON_SUB_MODULE':
            return Object.assign({},state,{subModule:action.payload});
        default:
            return state;
    }
}

function commonSystemAction(store){
    return [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),{
            COMMON_MODULE:function(data){
                // var user = store.getState().auth.user;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('/common/module/')
                .then(res=>{
                    store.dispatch({type:'COMMON_MODULE',payload:res.data})
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            COMMON_SUB_MODULE:function(module){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./question/sub_module?module='+module)
                .then((response)=>{
                     
                     var tag = response.data;
                     tag = tag.map((item)=>{
                         return {id:item}
                     });
                     response.data = tag;
                    //  console.log('sub',response.data);
                     store.dispatch({type:'COMMON_SUB_MODULE',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
        }
    ]
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = difficultyReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = difficultyAction;



const initialState = {
    dataList:[]
}

function difficultyReducer(state = initialState,action){

    switch (action.type) {
        case 'DIFFICULTY_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'DIFFICULTY_CLEAR_LIST':
            return Object.assign({},state,{dataList:[]});
        default:
            return state
    }

}

function difficultyAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            DIFFICULTY_GET_LIST:function(module){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./question/report_question?module='+module)
                .then((response)=>{
                    // console.log(JSON.stringify(response.data));
                    this.fire('toast',{status:'success',
                      callback:()=>{
                            store.dispatch({type:'DIFFICULTY_GET_LIST',payload:response.data});
                      }
                     });
                    // console.log('success!!');
                   
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            DIFFICULTY_CLEAR_LIST:function(){
                store.dispatch({type:'DIFFICULTY_CLEAR_LIST'});
            }
        }
    ]
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examAction;



const initialState = {
   examResult:{}
}

function examReducer(state = initialState,action){
    switch ('EXAM_GET_DATA_LIST') {
        case 'EXAM_GET_DATA_LIST':
            return Object.assign({},state,{examResult:action.payload});
        default:
            break;
    }
}

function examAction(store){
    return [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),{
            EXAM_INSERT_DATA:function(data){
                console.log(JSON.stringify(data));
                data.user_id = store.getState().auth.user.id;
              
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./send_answer/send_answer',data)
                .then((response)=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                        callback:()=>{
                            // this.stat = false;
                            // console.log(response.data);
                        }
                     });
                    
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
        }
    ]
}

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examHistoryReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examHistoryAction;



const initialState = {
    examList:[],
    examListComplete:[],
    examSelect:{}
}

function examHistoryReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAM_HISTORY_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAM_HISTORY_EXAM_LIST_SELECT':
            return Object.assign({},state,{examSelect:action.payload});
        case 'EXAM_HISTORY_EXAM_LIST_COMPLETE':
            return Object.assign({},state,{examListComplete:action.payload});
      
        default:
            return state
    }

}

function examHistoryAction(store){

    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            EXAM_HISTORY_EXAM_LIST:function(){
                var id = store.getState().auth.user.id;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examHistory/examList?user_id='+id)
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_SELECT:function(id){
                console.log(id);
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examHistory/test_exam?id='+id)
                .then((response)=>{
                    // console.log(JSON.stringify(response.data));
                    // console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST_SELECT',payload:response.data})
                    this.nylonVisible(true);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAM_HISTORY_EXAM_LIST_COMPLETE:function(){
                var id = store.getState().auth.user.id;
                // console.log('1234');
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examHistory/historyList?user_id='+id)
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAM_HISTORY_EXAM_LIST_COMPLETE',payload:response.data})
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }   
        }
    ]

}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examResultReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examResultAction;



const initialState = {
    result:{}
}

function examResultReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAM_RESULT_GET_RESULT':
            return Object.assign({},state,{result:action.payload});
        default:
            return state
    }
}

function examResultAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            EXAM_RESULT_GET_RESULT:function(exam_room_id,user_id=store.getState().auth.user.id){
                // alert('1234');
                // console.log('user_id',user_id);
                // console.log('exam_room_id',exam_room_id);
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./send_answer/show_answer',{
                    params:{exam_room_id,user_id}
                })
                .then((response)=>{
                    console.log('success!!');
                    console.log(JSON.stringify(response.data));
                    store.dispatch({type:'EXAM_RESULT_GET_RESULT',payload:response.data})
                    this.nylonVisible(true);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]
}

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examRoomReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examRoomAction;



const initialState = {
    examList:[],
    examination_list:[],
    studentList:[],
    studentListCompleteExam:[],
    examRoomList:[],
    selectexamRoom:{}
}

function examRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMROOM_GET_EXAM_LIST':
            return Object.assign({},state,{examList:action.payload});
        case 'EXAMROOM_GET_EXIAMINATION_LIST':
            return Object.assign({},state,{examination_list:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST':
            return Object.assign({},state,{studentList:action.payload});
        case 'EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM':
            return Object.assign({},state,{studentListCompleteExam:action.payload});
        case 'EXAMROOM_GET_EXAMROOM':
            return Object.assign({},state,{examRoomList:action.payload});
        case 'EXAMROOM_SELECT_DATA':
            return Object.assign({},state,{selectexamRoom:action.payload});
        case 'EXAMROOM_CLEAR_DATA':
            return Object.assign({},state,{selectexamRoom:{}});
        case 'EXAMROOM_CLEAR_STUDENT_LIST':
            return Object.assign({},state,{studentList:[]});
        case 'EXAMROOM_CLEAR_LIST':
            return Object.assign({},state,{examList:[]});
        default:
            return state
    }

}

function examRoomAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            EXAMROOM_GET_EXAM_LIST:function(tags){
                this.tags2 = tags;
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examRoom/examRoom?module='+tags)
                .then((response)=>{
                    console.log('*',response.data);
                    this.fire('toast',{status:'success',
                      callback:()=>{
                          this.fire('close');
                      }
                     });
                    store.dispatch({type:'EXAMROOM_GET_EXAM_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_EXIAMINATION_LIST:function(module){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('/examRoom/examRoom_module?module='+module)
                .then((response)=>{
                    console.log('success!!',response.data);
                   store.dispatch({type:'EXAMROOM_GET_EXIAMINATION_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_LIST:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_LIST'});
            },
            EXAMROOM_GET_STUDENT_LIST:function(tag){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examRoom/userModuleList?module='+tag)
                .then((response)=>{
                    // console.log(response.data)
                    store.dispatch({type:'EXAMROOM_GET_STUDENT_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_STUDENT_LIST:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_STUDENT_LIST'});
            },
            EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM:function(id){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examRoom/student?id='+id)
                .then((response)=>{
                    // console.log(response.data);
                    store.dispatch({type:'EXAMROOM_GET_STUDENT_LIST_COMPLETE_EXAM',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_GET_EXAMROOM:function(){
                var user_id = store.getState().auth.user.id;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examRoom/examRoomList?user_id='+user_id)
                .then((response)=>{
                    store.dispatch({type:'EXAMROOM_GET_EXAMROOM',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_SELECT_DATA:function(id){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examRoom/examRoom_only?id='+id)
                .then((response)=>{
                    this.fire('toast',{status:'success',
                      callback:()=>{
                        this.fire('open');
                        store.dispatch({type:'EXAMROOM_SELECT_DATA',payload:response.data});
                      }
                     });
                    // console.log('success!!');
                    // console.log(response.data);
                  
                     
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_INSERT_DATA:function(data){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_UPDATE_DATA:function(data){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./examRoom/examRoom',data)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                console.log('error');
                console.log({error});
                });
            },
            EXAMROOM_DELETE_DATA:function(id){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('./examRoom/examRoom?id='+id)
                .then((response)=>{
                    this.EXAMROOM_GET_EXAM_LIST(this.tags2);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMROOM_CLEAR_DATA:function(){
                store.dispatch({type:'EXAMROOM_CLEAR_DATA'});
            }
        }
    ]
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examinationReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examinationAction;



const initialState = {
    dataList:[],
    listTag:[],
    dataTest:[],
    dataSelect:[],
    examinationRandomList:[]
}

function examinationReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'EXAMINATION_GET_TAG_LIST':
            return Object.assign({},state,{listTag:action.payload});
        case 'EXAMINATION_GET_DATA_TEST':
            return Object.assign({},state,{dataTest:action.payload});
        case 'EXAMINATION_GET_DATA_SELECT' : 
            return Object.assign({},state,{dataSelect:action.payload});
        case 'EXAMINATION_CLEAR_DATA_SELECT' : 
            return Object.assign({},state,{dataSelect:{}});
        case 'EXAMINATION_RANDOM':
            return Object.assign({},state,{examinationRandomList:action.payload});
        case 'EXAMINATION_CLEAR_RANDOM':
            return Object.assign({},state,{examinationRandomList:[]});
        case 'EXAMINATION_CLEAR_LIST':
            return Object.assign({},state,{dataList:[]});
        default:
            return state
    }

}

function examinationAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),{
        EXAMINATION_GET_DATA_TEST:function(id){
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./test_exam/test_exam?id='+id)
            .then((response)=>{
                console.log('success!!');
                console.log(response.data)
                store.dispatch({type:'EXAMINATION_GET_DATA_TEST',payload:response.data})
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        },
        EXAMINATION_GET_DATA_SELECT:function(id){
            this.fire('toast',{status:'load'});
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examination/examination_only?id='+id)
            .then((response)=>{
                response.data.objective.map((item)=>{
                    item.sub_module = item.sub_module.map((item2)=>{
                        return {id:item2}
                    })
                    return item
                })
                this.fire('toast',{status:'success',
                  callback:()=>{
                        this.fire('select-data');
                       store.dispatch({type:'EXAMINATION_GET_DATA_SELECT',payload:response.data})
                  }
                 });
                // console.log(response.data);
               
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        },
        EXAMINATION_CLEAR_DATA_SELECT:function(){
             store.dispatch({type:'EXAMINATION_CLEAR_DATA_SELECT'})
        },
        // EXAMINATION_GET_TAG_LIST:function(){
        //     axios.get('./examination/examination_tagall')
        //     .then((response)=>{
        //         console.log('success!!');
        //         store.dispatch({type:'EXAMINATION_GET_TAG_LIST',payload:response.data})
        //         console.log(response.data);
        //     })
        //     .catch((error)=>{
        //         console.log('error');
        //         console.log(error);
        //     });
        // },
        EXAMINATION_GET_LIST:function(tags){
            this.tags = tags;
            this.fire('toast',{status:'load'});
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./examination/examination?module='+tags)
            .then((response)=>{
                console.log(response.data);
                store.dispatch({type:'EXAMINATION_GET_LIST',payload:response.data});
                this.fire('toast',{status:'success',
                    callback:()=>{
                        this.fire('close');
                    }
                });
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        EXAMINATION_CLEAR_LIST:function(){
             store.dispatch({type:'EXAMINATION_CLEAR_LIST'});
        },
        EXAMINATION_CLEAR_RANDOM:function(){
             store.dispatch({type:'EXAMINATION_CLEAR_RANDOM'});
        },
        EXAMINATION_RANDOM:function(data){
            // console.log(JSON.stringify(data));
            // console.log(data);
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./examination/examination_random',data)
            .then((response)=>{
               
                store.dispatch({type:'EXAMINATION_RANDOM',payload:response.data});
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
            // return axios.post('./examination/examination_random',data)
        },
        EXAMINATION_INSERT:function(data){
            data.user_id = store.getState().auth.user.id;
            // console.log(data);
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./examination/examination',data)
            .then((response)=>{
                // console.log('success!!');
                this.EXAMINATION_GET_LIST(this.tags);
                // console.log(response.data);
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
            
        },
        EXAMINATION_UPDATE:function(data){
            data.user_id = store.getState().auth.user.id;
            console.log(data);
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./examination/examination',data)
            .then((response)=>{
               this.EXAMINATION_GET_LIST(this.tags);
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        },
        EXAMINATION_DELETE:function(id){
            __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('./examination/examination?id='+id)
            .then((response)=>{
                this.EXAMINATION_GET_LIST(this.tags);
                // this.fire('delete-data');
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        }
        
    }]
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = examinationRoomReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = examinationRoomAction;



const initialState = {
    dataList:[],
    dataSelect:{}
}

function examinationRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_ROOM_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'EXAMINATION_ROOM_SELECT':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'EXAMINATION_ROOM_CLEAR_DATA_SELECT':
            return Object.assign({},state,{dataSelect:{}});
        default:
            return state
    }

}

function examinationRoomAction(store){

    
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            EXAMINATION_ROOM_SELECT:function(dataSelect){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./student/student')
                .then((response)=>{
                    console.log('success!!');
                    store.dispatch({type:'EXAMINATION_ROOM_SELECT',payload:dataSelect});
                    // console.log(response.data);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMINATION_ROOM_CLEAR_DATA_SELECT:function(){
                store.dispatch({type:'EXAMINATION_ROOM_CLEAR_DATA_SELECT'});
            },
            EXAMINATION_ROOM_GET_LIST:function(){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./student/student')
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAMINATION_ROOM_GET_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log(error);
                })
            },
            EXAMINATION_ROOM_INSERT:function(data){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./student/student',data)
                .then((response)=>{
                    console.log('success!!');
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                      callback:()=>{
                            this.EXAMINATION_ROOM_GET_LIST();
                      }
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error.message);
                    this.fire('toast',{status:'connectError',text:error.msg,
                    callback:function(){
                    }})
                });
            },
            EXAMINATION_ROOM_UPDATE:function(data){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./student/student',data)
                .then((response)=>{
                    console.log('success!!');
                    this.fire('toast',{status:'success',text:'แก้ไขสำเร็จ',
                     callback:()=>{
                          this.EXAMINATION_ROOM_GET_LIST();
                     }
                    });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                    this.fire('toast',{status:'connectError',text:error.msg,
                    callback:function(){
                    }})
                });
            },
            EXAMINATION_ROOM_DELETE:function(id){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('./student/student?id='+id)
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                    this.fire('toast',{status:'success',text:'ลบข้อมูลสำเร็จ',
                    callback:()=>{
                          this.EXAMINATION_ROOM_GET_LIST();
                     }
                    });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]

}

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = moduleReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = moduleAction;



const initialState = {
    dataList:[]
}

function moduleReducer(state = initialState,action){

    switch (action.type) {
        case 'MODULE_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

function moduleAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            MODULE_LIST:function(){
                console.log('ddd');
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('/tag/tag').then(res=>{
                    store.dispatch({type:"MODULE_LIST",payload:res.data})
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_INSERT:function(data){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('/tag/tag',data).then(res=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                      callback:()=>{
                            this.MODULE_LIST();
                      }
                     });
                   
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_UPDATE:function(data){
                delete data.edit;
                // console.log(data);
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('/tag/tag',data).then(res=>{
                    // console.log(res.data);
                    this.MODULE_LIST();
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_DELETE:function(id){
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('/tag/tag',{params:{id}}).then(res=>{
                    this.fire('toast',{status:'success',text:'ลบข้อมูลสำเร็จ',
                      callback:()=>{
                          this.MODULE_LIST();
                      }
                     });
                }).catch(err=>{
                    cosole.log(err);
                })
            }
        }
    ]
}


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = questionReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = questionAction;



const initialState = {
    dataList:[],
    dataSelect:{},
    subModuleList:[]
}

function questionReducer(state = initialState,action){

    switch (action.type) {
        case 'QUESTION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'QUESTION_SELECT':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'QUESTION_CLEAR_SELECT':
            return Object.assign({},state,{dataSelect:{choice:[]}});
        case 'QUESTION_CLEAR_LIST':
            return Object.assign({},state,{dataList:[]});
        default:
            return state
    }

}

function questionAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            QUESTION_GET_LIST:function(module){ 
                this.newTag = module;
                this.fire('toast',{status:'load'});
                var user_id = store.getState().auth.user.id;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./question/question',{params:{user_id,module}})
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'QUESTION_GET_LIST',payload:response.data});
                    this.fire('toast',{status:'success',text:'โหลดข้อมูลสำเร็จ',
                      callback:()=>{
                          this.fire('close');
                      }
                     });
                })
                .catch((error)=>{
                    console.log(error);
                });
            },
            QUESTION_INSERT:function(data){
                data.user_id = store.getState().auth.user.id;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./question/question',data)
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                    this.QUESTION_GET_LIST(this.newTag)
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
                
            },
            QUESTION_UPDATE:function(data){
                data.user_id = store.getState().auth.user.id;
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./question/question',data)
                .then((response)=>{
                    this.QUESTION_GET_LIST(this.newTag)
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
                // return new Promise((resolve,reject)=>{
                //     axios.put('./question/question',data)
                //     .then((response)=>{
                //         this.QUESTION_GET_LIST(this.moduleSelect);
                //         resolve(response);
                //     })
                //     .catch((error)=>{
                //         reject(error);
                //     });

                // })
                
            },
            QUESTION_DELETE:function(questionId){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('./question/question?id='+questionId)
                .then((response)=>{
                    this.QUESTION_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
                
            },
            QUESTION_SELECT:function(questionId){
                this.titleRight = 'แก้ไขคำถาม';
                this.status = 'update';
                
                this.fire('toast',{status:'load'});
                this.QUESTION_CLEAR_SELECT();
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./question/question_only?id='+questionId)
                .then((response)=>{
                    this.fire('toast',{status:'success',
                      callback:()=>{
                            store.dispatch({type:'QUESTION_SELECT',payload:response.data});
                            this.$$('panel-right').open();
                      }
                     });
                  
                    
                })
                .catch((error)=>{
                    console.log(error)
                });
            },
            QUESTION_CLEAR_SELECT:function(){
                store.dispatch({type:'QUESTION_CLEAR_SELECT'});
            },
            QUESTION_CLEAR_LIST:function(){
                 store.dispatch({type:'QUESTION_CLEAR_LIST'});
            },
            QUESTION_IMAGE:function(files){
                var data = new FormData();
                data.append('file',files[0]);
                return __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./image/image', data);
            },
            QUESTION_UPLOAD:function(files){
                var data = new FormData();
                data.append('file',files[0]);
                data.append('user_id',store.getState().auth.user.id);
                return __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./question/upload', data);
            }
        }
    ]
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = userManageReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = userManageAction;



const initialState = {
    dataList:[],
    dataSelect:{
        key_tags:[],
        end_tags:[]
    }
}

function userManageReducer(state = initialState,action){
    switch (action.type) {
        case 'USER_MANAGE_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'USER_MANAGE_CLEAR_GET_LIST':
            return Object.assign({},state,{dataList:[]});
        case 'USER_MANAGE_CLEAR_LIST':
            return Object.assign({},state,{dataSelect:{admin:false,key_tags:[],end_tags:[]}});
        case 'USER_MANAGE_SELECT_LIST':
            return Object.assign({},state,{dataSelect:action.payload});
        default:
            return state;
    }
}

function userManageAction(store){
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* commonAction */])(),
        {
            USER_MANAGE_GET_LIST:function(tag){
                this.newTag = tag;
                this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./user/user?tags='+tag)
                .then((response)=>{
                    console.log(response.data);
                    this.fire('toast',{status:'success',
                      callback:()=>{
                          this.fire('close');
                      }
                     });
                    store.dispatch({type:'USER_MANAGE_GET_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_CLEAR_GET_LIST:function(){
               store.dispatch({type:'USER_MANAGE_CLEAR_GET_LIST'}); 
            },
            USER_MANAGE_SELECT_LIST:function(id){
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].get('./user/select_user?id='+id)
                .then((response)=>{
                    this.USER_MANAGE_CLEAR_LIST();
                    console.log(response.data);
                    response.data.end_tags = response.data.end_tags.map((item)=>{
                        return {id:item}
                    })
                     response.data.key_tags = response.data.key_tags.map((item)=>{
                        return {id:item}
                    })
                    store.dispatch({type:'USER_MANAGE_SELECT_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_INSERT:function(data){
                // this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].post('./user/user',data)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                    //       console.log(response.data);
                         
                    //   }
                    //  });
                      this.USER_MANAGE_GET_LIST(this.newTag);
                    
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_UPDATE:function(data){
                // this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].put('./user/user',data)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                           
                    //   }
                    //  });
                     this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                console.log('error');
                console.log(error);
                });
            },
            USER_MANAGE_DELETE:function(id){
                // this.fire('toast',{status:'load'});
                __WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */].delete('./user/user?id='+id)
                .then((response)=>{
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                         
                    //   }
                    //  });
                      this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            USER_MANAGE_CLEAR_LIST:function(){
                 store.dispatch({type:'USER_MANAGE_CLEAR_LIST',payload:{}});
            }        
        }
    ]
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjNmODkzOGRhNDFmYTRhNjIyMTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2VzL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9lcy9jcmVhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL34vYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL34vand0LWRlY29kZS9saWIvYXRvYi5qcyIsIndlYnBhY2s6Ly8vLi9+L2p3dC1kZWNvZGUvbGliL2Jhc2U2NF91cmxfZGVjb2RlLmpzIiwid2VicGFjazovLy8uL34vand0LWRlY29kZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wb2x5bWVyLXJlZHV4L3BvbHltZXItcmVkdXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9lcy9hcHBseU1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3N5bWJvbC1vYnNlcnZhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vc3ltYm9sLW9ic2VydmFibGUvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4U3RvcmUvYXV0aC5zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXhTdG9yZS9jbGFzc1Jvb20uc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4U3RvcmUvY29tbW9uU3lzdGVtLnN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eFN0b3JlL2RpZmZpY3VsdHkuc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4U3RvcmUvZXhhbS5zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXhTdG9yZS9leGFtSGlzdG9yeS5zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXhTdG9yZS9leGFtUmVzdWx0LnN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eFN0b3JlL2V4YW1Sb29tLnN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eFN0b3JlL2V4YW1pbmF0aW9uLnN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eFN0b3JlL2V4YW1pbmF0aW9uUm9vbS5zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXhTdG9yZS9tb2R1bGUuc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4U3RvcmUvcXVlc3Rpb24uc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4U3RvcmUvdXNlck1hbmFnZS5zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEVB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QixTQUFTLEdBQUcsU0FBUztBQUM1QywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMVNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7OytDQ25MdEM7O0FBRUE7QUFDQTs7QUFFQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7K0NDNUZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7OztBQ2hMQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FB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aUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRSxhO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiLi9wdWJsaWMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYzZjg5MzhkYTQxZmE0YTYyMjE1IiwiZXhwb3J0IGZ1bmN0aW9uIGNvbW1vbkFjdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGxpc3RlbmVyczp7XG4gICAgICAgICAgICAnbWV0aG9kJzonaGFuZGxlQ2FsbCdcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlQ2FsbDpmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBkZXRhaWwgPSBlLmRldGFpbDtcbiAgICAgICAgICAgIHZhciBhcmdzID0gZGV0YWlsLmFyZ3M7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBkZXRhaWwuY2FsbGJhY2s7XG5cbiAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gYXJnc1swXTtcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgICAgICAgICBpZihhcmdzLmxlbmd0aD4xKVxuICAgICAgICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSxhcmdzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIHZhciBhcmdzVGV4dCA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICAgICAgICBhcmdzLm1hcCgocm93LGkpPT57XG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2gocm93KTtcbiAgICAgICAgICAgICAgICBpZihpIT0wKSBhcmdzVGV4dCs9JywnO1xuICAgICAgICAgICAgICAgIGFyZ3NUZXh0ICs9IGBwYXJhbXNbJHtpfV1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBjYWxsYmFjayhldmFsKGBcbiAgICAgICAgICAgICAgICBpZih0aGlzLiR7bWV0aG9kTmFtZX0pXG4gICAgICAgICAgICAgICAgdGhpcy4ke21ldGhvZE5hbWV9KCR7YXJnc1RleHR9KVxuICAgICAgICAgICAgYCkpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEFjdGlvbkJlaGF2aW9yKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlzcGF0Y2hBY3Rpb246ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzbG92ZSxyZWplY3QpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdtZXRob2QnLHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczphcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOihwcm9taXNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHByb21pc2UgPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzbG92ZSgnQWN0aW9uIG5vIHByb21pc2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzbG92ZShwcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBiYXNlVVJMID0gYGh0dHBzOi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWV9OiR7bG9jYXRpb24ucG9ydH1gO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NyZWF0ZX0gZnJvbSAnYXhpb3MnXG5pbXBvcnQge2Jhc2VVUkx9IGZyb20gJy4vY29uZmlnJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGUoe1xuICAgIGJhc2VVUkw6YmFzZVVSTCsnL2FwaScsXG4gICAgaGVhZGVyczogeyd0b2tlbic6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgLT4gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiAhaXNBcnJheShvYmopKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgUFJPVEVDVElPTl9QUkVGSVggPSAvXlxcKVxcXVxcfScsP1xcbi87XG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoUFJPVEVDVElPTl9QUkVGSVgsICcnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1laHRvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnKSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnKSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiBAIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgdmFyIGxhc3QgPSBmdW5jc1tmdW5jcy5sZW5ndGggLSAxXTtcbiAgdmFyIHJlc3QgPSBmdW5jcy5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlc3QucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNvbXBvc2VkLCBmKSB7XG4gICAgICByZXR1cm4gZihjb21wb3NlZCk7XG4gICAgfSwgbGFzdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWR1eC9lcy9jb21wb3NlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gKlxuICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICpcbiAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuaGFuY2VyIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gKlxuICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbJCRvYnNlcnZhYmxlXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWR1eC9lcy9jcmVhdGVTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NyZWF0ZVN0b3JlLGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQgUG9seW1lclJlZHV4IGZyb20gJ3BvbHltZXItcmVkdXgnXG5pbXBvcnQge2Rpc3BhdGNoQWN0aW9uQmVoYXZpb3J9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHtoYW5kbGVBdXRofSBmcm9tICcuL2F1dGgnXG5cbmltcG9ydCB7YXV0aFJlZHVjZXIsYXV0aEFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL2F1dGguc3RvcmUuanMnXG5pbXBvcnQge2NsYXNzUm9vbVJlZHVjZXIsY2xhc3NSb29tQWN0aW9ufSBmcm9tICcuL3JlZHV4U3RvcmUvY2xhc3NSb29tLnN0b3JlLmpzJ1xuaW1wb3J0IHtjb21tb25TeXN0ZW1SZWR1Y2VyLGNvbW1vblN5c3RlbUFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL2NvbW1vblN5c3RlbS5zdG9yZS5qcydcbmltcG9ydCB7ZGlmZmljdWx0eVJlZHVjZXIsZGlmZmljdWx0eUFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL2RpZmZpY3VsdHkuc3RvcmUuanMnXG5pbXBvcnQge2V4YW1SZWR1Y2VyLGV4YW1BY3Rpb259IGZyb20gJy4vcmVkdXhTdG9yZS9leGFtLnN0b3JlLmpzJ1xuaW1wb3J0IHtleGFtSGlzdG9yeVJlZHVjZXIsZXhhbUhpc3RvcnlBY3Rpb259IGZyb20gJy4vcmVkdXhTdG9yZS9leGFtSGlzdG9yeS5zdG9yZS5qcydcbmltcG9ydCB7ZXhhbVJlc3VsdFJlZHVjZXIsZXhhbVJlc3VsdEFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL2V4YW1SZXN1bHQuc3RvcmUuanMnXG5pbXBvcnQge2V4YW1Sb29tUmVkdWNlcixleGFtUm9vbUFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL2V4YW1Sb29tLnN0b3JlLmpzJ1xuaW1wb3J0IHtleGFtaW5hdGlvblJlZHVjZXIsZXhhbWluYXRpb25BY3Rpb259IGZyb20gJy4vcmVkdXhTdG9yZS9leGFtaW5hdGlvbi5zdG9yZS5qcydcbmltcG9ydCB7ZXhhbWluYXRpb25Sb29tUmVkdWNlcixleGFtaW5hdGlvblJvb21BY3Rpb259IGZyb20gJy4vcmVkdXhTdG9yZS9leGFtaW5hdGlvblJvb20uc3RvcmUuanMnXG5pbXBvcnQge21vZHVsZVJlZHVjZXIsbW9kdWxlQWN0aW9ufSBmcm9tICcuL3JlZHV4U3RvcmUvbW9kdWxlLnN0b3JlLmpzJ1xuaW1wb3J0IHtxdWVzdGlvblJlZHVjZXIscXVlc3Rpb25BY3Rpb259IGZyb20gJy4vcmVkdXhTdG9yZS9xdWVzdGlvbi5zdG9yZS5qcydcbmltcG9ydCB7dXNlck1hbmFnZVJlZHVjZXIsdXNlck1hbmFnZUFjdGlvbn0gZnJvbSAnLi9yZWR1eFN0b3JlL3VzZXJNYW5hZ2Uuc3RvcmUuanMnXG5cblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuXHRhdXRoOmF1dGhSZWR1Y2VyLFxuXHRjbGFzc1Jvb206Y2xhc3NSb29tUmVkdWNlcixcblx0Y29tbW9uU3lzdGVtOmNvbW1vblN5c3RlbVJlZHVjZXIsXG5cdGRpZmZpY3VsdHk6ZGlmZmljdWx0eVJlZHVjZXIsXG5cdGV4YW06ZXhhbVJlZHVjZXIsXG5cdGV4YW1IaXN0b3J5OmV4YW1IaXN0b3J5UmVkdWNlcixcblx0ZXhhbVJlc3VsdDpleGFtUmVzdWx0UmVkdWNlcixcblx0ZXhhbVJvb206ZXhhbVJvb21SZWR1Y2VyLFxuXHRleGFtaW5hdGlvbjpleGFtaW5hdGlvblJlZHVjZXIsXG5cdGV4YW1pbmF0aW9uUm9vbTpleGFtaW5hdGlvblJvb21SZWR1Y2VyLFxuXHRtb2R1bGU6bW9kdWxlUmVkdWNlcixcblx0cXVlc3Rpb246cXVlc3Rpb25SZWR1Y2VyLFxuXHR1c2VyTWFuYWdlOnVzZXJNYW5hZ2VSZWR1Y2VyLFxuXG59KTtcblxuY29uc3Qgc3RvcmVBcHAgPSBjcmVhdGVTdG9yZShcbiAgICByb290UmVkdWNlcixcbiAgICB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyAmJiB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXygpXG4pO1xuXG53aW5kb3cuUmVkdXhCZWhhdmlvciA9IFtQb2x5bWVyUmVkdXgoc3RvcmVBcHApLGRpc3BhdGNoQWN0aW9uQmVoYXZpb3IoKV07XG53aW5kb3cuZGlzcGF0Y2hBY3Rpb25CZWhhdmlvciA9IGRpc3BhdGNoQWN0aW9uQmVoYXZpb3IoKTtcblxuaGFuZGxlQXV0aChzdG9yZUFwcCk7XG5cbndpbmRvdy5hdXRoQWN0aW9uID0gYXV0aEFjdGlvbihzdG9yZUFwcCk7XG53aW5kb3cuY2xhc3NSb29tQWN0aW9uID0gY2xhc3NSb29tQWN0aW9uKHN0b3JlQXBwKTtcbndpbmRvdy5jb21tb25TeXN0ZW1BY3Rpb24gPSBjb21tb25TeXN0ZW1BY3Rpb24oc3RvcmVBcHApO1xud2luZG93LmRpZmZpY3VsdHlBY3Rpb24gPSBkaWZmaWN1bHR5QWN0aW9uKHN0b3JlQXBwKTtcbndpbmRvdy5leGFtQWN0aW9uID0gZXhhbUFjdGlvbihzdG9yZUFwcCk7XG53aW5kb3cuZXhhbUhpc3RvcnlBY3Rpb24gPSBleGFtSGlzdG9yeUFjdGlvbihzdG9yZUFwcCk7XG53aW5kb3cuZXhhbVJlc3VsdEFjdGlvbiA9IGV4YW1SZXN1bHRBY3Rpb24oc3RvcmVBcHApO1xud2luZG93LmV4YW1Sb29tQWN0aW9uID0gZXhhbVJvb21BY3Rpb24oc3RvcmVBcHApO1xud2luZG93LmV4YW1pbmF0aW9uQWN0aW9uID0gZXhhbWluYXRpb25BY3Rpb24oc3RvcmVBcHApO1xud2luZG93LmV4YW1pbmF0aW9uUm9vbUFjdGlvbiA9IGV4YW1pbmF0aW9uUm9vbUFjdGlvbihzdG9yZUFwcCk7XG53aW5kb3cubW9kdWxlQWN0aW9uID0gbW9kdWxlQWN0aW9uKHN0b3JlQXBwKTtcbndpbmRvdy5xdWVzdGlvbkFjdGlvbiA9IHF1ZXN0aW9uQWN0aW9uKHN0b3JlQXBwKTtcbndpbmRvdy51c2VyTWFuYWdlQWN0aW9uID0gdXNlck1hbmFnZUFjdGlvbihzdG9yZUFwcCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB0aGlzLmRlZmF1bHRzLCB7IG1ldGhvZDogJ2dldCcgfSwgY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiBAIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUaGUgY29kZSB3YXMgZXh0cmFjdGVkIGZyb206XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcbiAqL1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5JbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5JbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gcG9seWZpbGwgKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpLnJlcGxhY2UoLz0rJC8sICcnKTtcbiAgaWYgKHN0ci5sZW5ndGggJSA0ID09IDEpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKFwiJ2F0b2InIGZhaWxlZDogVGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC5cIik7XG4gIH1cbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlcnNcbiAgICB2YXIgYmMgPSAwLCBicywgYnVmZmVyLCBpZHggPSAwLCBvdXRwdXQgPSAnJztcbiAgICAvLyBnZXQgbmV4dCBjaGFyYWN0ZXJcbiAgICBidWZmZXIgPSBzdHIuY2hhckF0KGlkeCsrKTtcbiAgICAvLyBjaGFyYWN0ZXIgZm91bmQgaW4gdGFibGU/IGluaXRpYWxpemUgYml0IHN0b3JhZ2UgYW5kIGFkZCBpdHMgYXNjaWkgdmFsdWU7XG4gICAgfmJ1ZmZlciAmJiAoYnMgPSBiYyAlIDQgPyBicyAqIDY0ICsgYnVmZmVyIDogYnVmZmVyLFxuICAgICAgLy8gYW5kIGlmIG5vdCBmaXJzdCBvZiBlYWNoIDQgY2hhcmFjdGVycyxcbiAgICAgIC8vIGNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBvbmUgYXNjaWkgY2hhcmFjdGVyXG4gICAgICBiYysrICUgNCkgPyBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgyNTUgJiBicyA+PiAoLTIgKiBiYyAmIDYpKSA6IDBcbiAgKSB7XG4gICAgLy8gdHJ5IHRvIGZpbmQgY2hhcmFjdGVyIGluIHRhYmxlICgwLTYzLCBub3QgZm91bmQgPT4gLTEpXG4gICAgYnVmZmVyID0gY2hhcnMuaW5kZXhPZihidWZmZXIpO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYXRvYiAmJiB3aW5kb3cuYXRvYi5iaW5kKHdpbmRvdykgfHwgcG9seWZpbGw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vand0LWRlY29kZS9saWIvYXRvYi5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGF0b2IgPSByZXF1aXJlKCcuL2F0b2InKTtcblxuZnVuY3Rpb24gYjY0RGVjb2RlVW5pY29kZShzdHIpIHtcbiAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHN0cikucmVwbGFjZSgvKC4pL2csIGZ1bmN0aW9uIChtLCBwKSB7XG4gICAgdmFyIGNvZGUgPSBwLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKGNvZGUubGVuZ3RoIDwgMikge1xuICAgICAgY29kZSA9ICcwJyArIGNvZGU7XG4gICAgfVxuICAgIHJldHVybiAnJScgKyBjb2RlO1xuICB9KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCBcIitcIikucmVwbGFjZSgvXy9nLCBcIi9cIik7XG4gIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBvdXRwdXQgKz0gXCI9PVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgb3V0cHV0ICs9IFwiPVwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IFwiSWxsZWdhbCBiYXNlNjR1cmwgc3RyaW5nIVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIHJldHVybiBiNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBhdG9iKG91dHB1dCk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vand0LWRlY29kZS9saWIvYmFzZTY0X3VybF9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJhc2U2NF91cmxfZGVjb2RlID0gcmVxdWlyZSgnLi9iYXNlNjRfdXJsX2RlY29kZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0b2tlbixvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgdG9rZW4gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRva2VuIHNwZWNpZmllZCcpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwb3MgPSBvcHRpb25zLmhlYWRlciA9PT0gdHJ1ZSA/IDAgOiAxO1xuICByZXR1cm4gSlNPTi5wYXJzZShiYXNlNjRfdXJsX2RlY29kZSh0b2tlbi5zcGxpdCgnLicpW3Bvc10pKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vand0LWRlY29kZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbG9kYXNoLWVzL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2xvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZmFjdG9yeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFsnUG9seW1lclJlZHV4J10gPSBmYWN0b3J5KCk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdhcm5pbmcgPSAnUG9seW1lciBSZWR1eDogPCVzPi4lcyBoYXMgXCJub3RpZnlcIiBlbmFibGVkLCB0d28td2F5IGJpbmRpbmdzIGdvZXMgYWdhaW5zdCBSZWR1eFxcJ3MgcGFyYWRpZ20nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBiaW5kaW5ncyBmb3VuZCBvbiBhIGdpdmVuIEVsZW1lbnQvQmVoYXZpb3IuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8T2JqZWN0fSBvYmogRWxlbWVudCBvciBCZWhhdmlvci5cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFBvbHltZXIgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3RvcmUgUmVkdXggc3RvcmUuXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U3RhdGVQYXRoUHJvcGVydGllcyhvYmosIGVsZW1lbnQsIHN0b3JlKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IFtdO1xuXG4gICAgICAgIGlmIChvYmoucHJvcGVydGllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvYmoucHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBvYmoucHJvcGVydGllc1tuYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocHJvcC5oYXNPd25Qcm9wZXJ0eSgnc3RhdGVQYXRoJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IGZsYWcsIHdhcm4gYWdhaW5zdCB0d28td2F5IGJpbmRpbmdzXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wLm5vdGlmeSAmJiAhcHJvcC5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcsIGVsZW1lbnQuaXMsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtcHR5IHN0YXRlUGF0aCByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHByb3Auc3RhdGVQYXRoIHx8IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHByb3AucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwcm9wLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBsaXN0ZW5lciBmb3IgYSBnaXZlIFBvbHltZXIgZWxlbWVudC4gVGhlXG4gICAgICogcmV0dXJuaW5nIGxpc3RlbmVyIHNob3VsZCBiZSBwYXNzZWQgdG8gYHN0b3JlLnN1YnNjcmliZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgUG9seW1lciBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBSZWR1eCBzdWJjcmliZSBsaXN0ZW5lci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVMaXN0ZW5lcihlbGVtZW50LCBzdG9yZSkge1xuICAgICAgICB2YXIgcHJvcHMgPSBnZXRTdGF0ZVBhdGhQcm9wZXJ0aWVzKGVsZW1lbnQsIGVsZW1lbnQsIHN0b3JlKTtcblxuICAgICAgICAvLyBiZWhhdmlvciBwcm9wZXJ0eSBiaW5kaW5nc1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50LmJlaGF2aW9ycykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYmVoYXZpb3JzLmZvckVhY2goZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmFzID0gZ2V0U3RhdGVQYXRoUHJvcGVydGllcyhiZWhhdmlvciwgZWxlbWVudCwgc3RvcmUpO1xuICAgICAgICAgICAgICAgIGlmIChleHRyYXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHByb3BzLCBleHRyYXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkZS1kdXBlIGJlaGF2aW9yIHByb3BzXG4gICAgICAgICAgICB2YXIgbmFtZXMgPSBwcm9wcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wLm5hbWU7IC8vIGdyYWIgdGhlIHByb3AgbmFtZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5maWx0ZXIoZnVuY3Rpb24ocHJvcCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lcy5pbmRleE9mKHByb3AubmFtZSkgPT09IGk7IC8vIGluZGljZXMgbXVzdCBtYXRjaFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWR1eCBsaXN0ZW5lclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5Lm5hbWU7XG4gICAgICAgICAgICAgICAgdmFyIHNwbGljZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUsIHByZXZpb3VzO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RhdGVQYXRoLCBhIHBhdGggb3IgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBwcm9wZXJ0eS5wYXRoO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGF0aC5jYWxsKGVsZW1lbnQsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFBvbHltZXIuQmFzZS5nZXQocGF0aCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgdW5uZWNlc2FyeSBwb2x5bWVyIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGVsZW1lbnQuZ2V0KHByb3BlcnR5Lm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gcHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgYXJyYXksIHdvcmsgb3V0IHNwbGljZXMgYmVmb3JlIHNldHRpbmcgdGhlIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5LnR5cGUgPT09IEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gW107XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gcHJldmlvdXMgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gW107XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIHZhbHVlIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPCcrIGVsZW1lbnQuaXMgKyc+LicrIHByb3BOYW1lICsnIHR5cGUgaXMgQXJyYXkgYnV0IGdpdmVuOiAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzcGxpY2VzID0gUG9seW1lci5BcnJheVNwbGljZS5jYWxjdWxhdGVTcGxpY2VzKHZhbHVlLCBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc2V0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5LnJlYWRPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubm90aWZ5UGF0aChwcm9wTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbm90aWZ5IGVsZW1lbnQgb2Ygc3BsaWNlc1xuICAgICAgICAgICAgICAgIGlmIChzcGxpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vdGlmeVNwbGljZXMocHJvcE5hbWUsIHNwbGljZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC5maXJlKCdzdGF0ZS1jaGFuZ2VkJywgc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYW4gZ2l2ZW4gUG9seW1lciBlbGVtZW50IHRvIGEgUmVkdXggc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgUG9seW1lciBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdG9yZSBSZWR1eCBzdG9yZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiaW5kUmVkdXhMaXN0ZW5lcihlbGVtZW50LCBzdG9yZSkge1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuX3JlZHV4VW5zdWJzY3JpYmUpIHJldHVybjtcblxuICAgICAgICBsaXN0ZW5lciA9IGNyZWF0ZUxpc3RlbmVyKGVsZW1lbnQsIHN0b3JlKTtcbiAgICAgICAgbGlzdGVuZXIoKTsgLy8gc3RhcnQgYmluZGluZ3NcblxuICAgICAgICBlbGVtZW50Ll9yZWR1eFVuc3Vic2NyaWJlID0gc3RvcmUuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGEgUG9seW1lciBlbGVtZW50IGZyb20gYSBSZWR1eCBzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVuYmluZFJlZHV4TGlzdGVuZXIoZWxlbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuX3JlZHV4VW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuX3JlZHV4VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50Ll9yZWR1eFVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIGxpc3Qgb2YgYWN0aW9uIGNyZWF0b3JzIGZyb20gYSBnaXZlbiBlbGVtZW50IGFuZCBpdCdzIGluaGVyaXRlZFxuICAgICAqIGJlaGF2aW9ycyBzZXR0aW5nIHRoZSBsaXN0IG9udG8gdGhlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgUG9seW1lciBlbGVtZW50IGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXBpbGVBY3Rpb25DcmVhdG9ycyhlbGVtZW50KSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0ge307XG4gICAgICAgIHZhciBiZWhhdmlvcnMgPSBlbGVtZW50LmJlaGF2aW9ycztcblxuICAgICAgICBpZiAoZWxlbWVudC5fcmVkdXhBY3Rpb25zKSByZXR1cm47XG5cbiAgICAgICAgLy8gYWRkIGJlaGF2aW9yIGFjdGlvbnMgZmlyc3QsIGluIHJldmVyc2Ugb3JkZXIgc28gd2Uga2VlcCBwcmlvcml0eVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShiZWhhdmlvcnMpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gYmVoYXZpb3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihhY3Rpb25zLCBiZWhhdmlvcnNbaV0uYWN0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbGVtZW50IGFjdGlvbnMgaGF2ZSBwcmlvcml0eVxuICAgICAgICBlbGVtZW50Ll9yZWR1eEFjdGlvbnMgPSBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGVsZW1lbnQuYWN0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2hlcyBhIFJlZHV4IGFjdGlvbiB2aWEgYSBQb2x5bWVyIGVsZW1lbnQuIFRoaXMgZ2l2ZXMgdGhlIGVsZW1lbnRcbiAgICAgKiBhIHBvbHltb3JwaGljIGRpc3BhdGNoIGZ1bmN0aW9uLiBTZWUgdGhlIHJlYWRtZSBmb3IgdGhlIHZhcmlvdXMgd2F5cyB0b1xuICAgICAqIGRpc3BhdGNoLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFBvbHltZXIgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3RvcmUgUmVkdXggc3RvcmUuXG4gICAgICogQHBhcmFtIHtBcmd1bWVudHN9IGFyZ3MgVGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYGVsZW1lbnQuZGlzcGF0Y2hgLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNvbXB1dGVkIFJlZHV4IGFjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkaXNwYXRjaFJlZHV4QWN0aW9uKGVsZW1lbnQsIHN0b3JlLCBhcmdzKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBhcmdzWzBdO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IGVsZW1lbnQuX3JlZHV4QWN0aW9ucztcblxuICAgICAgICBhcmdzID0gY2FzdEFyZ3VtZW50c1RvQXJyYXkoYXJncyk7XG5cbiAgICAgICAgLy8gYWN0aW9uIG5hbWVcbiAgICAgICAgaWYgKGFjdGlvbnMgJiYgdHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uc1thY3Rpb25dICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seW1lciBSZWR1eDogPCcgKyBlbGVtZW50LmlzICsgJz4gaGFzIG5vIGFjdGlvbiBcIicgKyBhY3Rpb24gKyAnXCInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbnNbYWN0aW9uXS5hcHBseShlbGVtZW50LCBhcmdzLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICEhISBERVBSRUNJQVRFRCAhISFcbiAgICAgICAgLy8gVGhpcyB3aWxsIGJlIHJlbW92ZWQgYXMgb2YgMS4wLlxuXG4gICAgICAgIC8vIGFjdGlvbiBjcmVhdG9yXG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nICYmIGFjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaChhY3Rpb24oKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS1cblxuICAgICAgICAvLyBtaWRkbGV3YXJlLCBtYWtlIHN1cmUgd2UgcGFzcyB0aGUgcG9seW1lci1yZWR1eCBkaXNwYXRjaFxuICAgICAgICAvLyBzbyB3ZSBoYXZlIGFjY2VzcyB0byB0aGUgZWxlbWVudHMgYWN0aW9uIGNyZWF0b3JzXG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3YgPSBjYXN0QXJndW1lbnRzVG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgcmVkdXggZGlzcGF0Y2hcbiAgICAgICAgICAgICAgICBhcmd2LnNwbGljZSgwLCAxLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoUmVkdXhBY3Rpb24oZWxlbWVudCwgc3RvcmUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5hcHBseShlbGVtZW50LCBhcmd2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aW9uXG4gICAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFyZ3VtZW50cyBpbnRvIGFuIEFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcmd1bWVudHN9IGFyZ3NcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjYXN0QXJndW1lbnRzVG9BcnJheShhcmdzKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIFBvbHltZXJSZWR1eCBiZWhhdmlvcnMgZnJvbSBhIGdpdmVuIFJlZHV4IHN0b3JlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0b3JlIFJlZHV4IHN0b3JlLlxuICAgICAqIEByZXR1cm4ge1BvbHltZXJSZWR1eH1cbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24oc3RvcmUpIHtcbiAgICAgICAgdmFyIFBvbHltZXJSZWR1eDtcblxuICAgICAgICAvLyBjaGVjayBmb3Igc3RvcmVcbiAgICAgICAgaWYgKCFzdG9yZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWlzc2luZyByZWR1eCBzdG9yZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGBQb2x5bWVyUmVkdXhgIGJpbmRzIGEgZ2l2ZW4gUmVkdXggc3RvcmUncyBzdGF0ZSB0byBpbXBsZW1lbnRpbmcgRWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bGwgZG9jdW1lbnRhdGlvbiBhdmFpbGFibGUsIGh0dHBzOi8vZ2l0aHViLmNvbS90dXItbnIvcG9seW1lci1yZWR1eC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBvbHltZXJCZWhhdmlvciBQb2x5bWVyUmVkdXhcbiAgICAgICAgICogQGRlbW8gZGVtby9pbmRleC5odG1sXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gUG9seW1lclJlZHV4ID0ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGaXJlZCB3aGVuIHRoZSBSZWR1eCBzdG9yZSBzdGF0ZSBjaGFuZ2VzLlxuICAgICAgICAgICAgICogQGV2ZW50IHN0YXRlLWNoYW5nZWRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmluZFJlZHV4TGlzdGVuZXIodGhpcywgc3RvcmUpO1xuICAgICAgICAgICAgICAgIGNvbXBpbGVBY3Rpb25DcmVhdG9ycyh0aGlzKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGF0dGFjaGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBiaW5kUmVkdXhMaXN0ZW5lcih0aGlzLCBzdG9yZSk7XG4gICAgICAgICAgICAgICAgY29tcGlsZUFjdGlvbkNyZWF0b3JzKHRoaXMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGV0YWNoZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHVuYmluZFJlZHV4TGlzdGVuZXIodGhpcyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIHRoZSBSZWR1eCBzdG9yZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgYWN0aW9uIHRoYXQgd2FzIGRpc3BhdGNoZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbihhY3Rpb24gLyosIFsuLi5hcmdzXSAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaFJlZHV4QWN0aW9uKHRoaXMsIHN0b3JlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHN0YXRlIGluIHRoZSBSZWR1eCBzdG9yZS5cbiAgICAgICAgICAgICAqIEByZXR1cm4geyp9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3BvbHltZXItcmVkdXgvcG9seW1lci1yZWR1eC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG4gICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBjb21wb3NlLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWR1eC9lcy9hcHBseU1pZGRsZXdhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEFjdGlvblR5cGVzIH0gZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm5pbmcoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2FuaXR5RXJyb3I7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNhbml0eShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNhbml0eUVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNhbml0eUVycm9yKSB7XG4gICAgICB0aHJvdyBzYW5pdHlFcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgIHdhcm5pbmcod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGZpbmFsUmVkdWNlcktleXNbaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNba2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVba2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVba2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVkdXgvZXMvY29tYmluZVJlZHVjZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgY29tYmluZVJlZHVjZXJzIGZyb20gJy4vY29tYmluZVJlZHVjZXJzJztcbmltcG9ydCBiaW5kQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IGFwcGx5TWlkZGxld2FyZSBmcm9tICcuL2FwcGx5TWlkZGxld2FyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGJpbmRBY3Rpb25DcmVhdG9ycywgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlZHV4L2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wb255ZmlsbCA9IHJlcXVpcmUoJy4vcG9ueWZpbGwnKTtcblxudmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIHJvb3Q7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3ltYm9sLW9ic2VydmFibGUvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5mdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChfU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4vYXhpb3MnXG5pbXBvcnQge2Jhc2VVUkx9IGZyb20gJy4vY29uZmlnJ1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQXV0aChzdG9yZSl7XG4gICAgdmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpO1xuIFxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpKXtcbiAgICAgICAgICAgIGF4aW9zLnBvc3QoJy9hdXRoL2NoZWNrVG9rZW4nLHt0b2tlbjpsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpfSlcbiAgICAgICAgICAgIC50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidBVVRIX1NFVF9VU0VSJyxwYXlsb2FkOnJlcy5kYXRhfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2F1dGguanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBheGlvcyBmcm9tICcuLi9heGlvcydcbmltcG9ydCB7Y29tbW9uQWN0aW9ufSBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgand0RGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICB1c2VyOntyb2xlOidub25lJ31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLGFjdGlvbil7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ0FVVEhfU0VUX1VTRVInOlxuICAgICAgICAgICAgdmFyIHVzZXJJbmZvO1xuICAgICAgICAgICAgaWYoYWN0aW9uLnBheWxvYWQudG9rZW4pe1xuICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gand0RGVjb2RlKGFjdGlvbi5wYXlsb2FkLnRva2VuKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdXNlckluZm8gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt1c2VyOnVzZXJJbmZvfSk7XG4gICAgICAgIGNhc2UgJ0FVVEhfQ0xFQVJfVVNFUic6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dXNlcjp7cm9sZTonbm9uZSd9fSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aEFjdGlvbihzdG9yZSl7XG5cbiAgICByZXR1cm4gW2NvbW1vbkFjdGlvbigpLFxuICAgICAgICB7XG4gICAgICAgICAgICBBVVRIX0xPR0lOOmZ1bmN0aW9uKGZvcm1Mb2dpbil7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCgnLi9hdXRoL2xvZ2luJyx7dXNlcm5hbWU6Zm9ybUxvZ2luLnVzZXIscGFzc3dvcmQ6Zm9ybUxvZ2luLnBhc3N9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIscmVzcG9uc2UuZGF0YS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidBVVRIX1NFVF9VU0VSJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySW5mbztcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS50b2tlbil7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IGp3dERlY29kZShyZXNwb25zZS5kYXRhLnRva2VuKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZih1c2VySW5mby5zdGF0dXMgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2VySW5mby5yb2xlPT1cInRlYWNoZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmZpcmUoJ255bG9uLWNoYW5nZS1wYWdlJyx7cGF0aDonL2V4YW1Sb29tJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIvZXhhbVJvb21cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlyZSgnbnlsb24tY2hhbmdlLXBhZ2UnLHtwYXRoOicvZXhhbUhpc3RvcnknfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZCA9ICcxJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBcIi9leGFtSGlzdG9yeVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvUGFnZVBhc3N3b3JkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHtlcnJvcn0pO1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnZXJyb3InKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEFVVEhfQ0xFQVJfVVNFUjpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidBVVRIX0NMRUFSX1VTRVInfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQVVUSF9TRVRfUEFTU1dPUkQ6ZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoJ0FVVEhfU0VUX1BBU1NXT1JEJylcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidsb2FkJ30pO1xuICAgICAgICAgICAgICAgIGF4aW9zLnB1dCgnLi91c2VyL3VzZXInLGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidzdWNjZXNzJyx0ZXh0OifguJrguLHguJnguJfguLbguIHguKrguLPguYDguKPguYfguIgnLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkFVVEhfQ0xFQVJfVVNFUigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3BhZ2UtbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAvLyAgdGhpcy5VU0VSX01BTkFHRV9HRVRfTElTVCh0aGlzLm5ld1RhZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBdXG5cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZWR1eFN0b3JlL2F1dGguc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBheGlvcyBmcm9tICcuLi9heGlvcydcbmltcG9ydCB7Y29tbW9uQWN0aW9ufSBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBkYXRhTGlzdDpbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NSb29tUmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSxhY3Rpb24pe1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdDTEFTU1JPT01fR0VUX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFMaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzUm9vbUFjdGlvbihzdG9yZSl7XG5cbiAgICBcbiAgICByZXR1cm4gW2NvbW1vbkFjdGlvbigpLFxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRFU1RfQTpmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFhYSA9ICcxJztcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgnZGRkZGQnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgQ0xBU1NST09NX0dFVF9MSVNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gYXhpb3MuZ2V0KCcuL3N0dWRlbnQvc3R1ZGVudCcpXG4gICAgICAgICAgICAgICAgLy8gLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0NMQVNTUk9PTV9HRVRfTElTVCcscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAvLyAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgXVxuXG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZHV4U3RvcmUvY2xhc3NSb29tLnN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi4vYXhpb3MnXG5pbXBvcnQge2NvbW1vbkFjdGlvbn0gZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgbW9kdWxlOltdLFxuICAgIHN1Yk1vZHVsZTpbXSxcbiAgICBkaWZmaWN1bHR5SW5kZXg6W1xuICAgICAgICB7XG4gICAgICAgICAgICBpZDoxLFxuICAgICAgICAgICAgbGFiZWw6J+C4h+C5iOC4suC4oidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6MixcbiAgICAgICAgICAgIGxhYmVsOifguJvguLLguJnguIHguKXguLLguIcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOjMsXG4gICAgICAgICAgICBsYWJlbDon4Lii4Liy4LiBJ1xuICAgICAgICB9XG4gICAgXSBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vblN5c3RlbVJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsYWN0aW9uKXtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ0NPTU1PTl9NT0RVTEUnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse21vZHVsZTphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdDT01NT05fU1VCX01PRFVMRSc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c3ViTW9kdWxlOmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uU3lzdGVtQWN0aW9uKHN0b3JlKXtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb21tb25BY3Rpb24oKSx7XG4gICAgICAgICAgICBDT01NT05fTU9EVUxFOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIC8vIHZhciB1c2VyID0gc3RvcmUuZ2V0U3RhdGUoKS5hdXRoLnVzZXI7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KCcvY29tbW9uL21vZHVsZS8nKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonQ09NTU9OX01PRFVMRScscGF5bG9hZDpyZXMuZGF0YX0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBDT01NT05fU1VCX01PRFVMRTpmdW5jdGlvbihtb2R1bGUpe1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9xdWVzdGlvbi9zdWJfbW9kdWxlP21vZHVsZT0nK21vZHVsZSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgdGFnID0gdGFnLm1hcCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2lkOml0ZW19XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB0YWc7XG4gICAgICAgICAgICAgICAgICAgIC8vICBjb25zb2xlLmxvZygnc3ViJyxyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidDT01NT05fU1VCX01PRFVMRScscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZWR1eFN0b3JlL2NvbW1vblN5c3RlbS5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGRhdGFMaXN0OltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmaWN1bHR5UmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSxhY3Rpb24pe1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdESUZGSUNVTFRZX0dFVF9MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhTGlzdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdESUZGSUNVTFRZX0NMRUFSX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFMaXN0OltdfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZpY3VsdHlBY3Rpb24oc3RvcmUpe1xuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIERJRkZJQ1VMVFlfR0VUX0xJU1Q6ZnVuY3Rpb24obW9kdWxlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidsb2FkJ30pO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9xdWVzdGlvbi9yZXBvcnRfcXVlc3Rpb24/bW9kdWxlPScrbW9kdWxlKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidESUZGSUNVTFRZX0dFVF9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBESUZGSUNVTFRZX0NMRUFSX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRElGRklDVUxUWV9DTEVBUl9MSVNUJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZHV4U3RvcmUvZGlmZmljdWx0eS5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgZXhhbVJlc3VsdDp7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbVJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsYWN0aW9uKXtcbiAgICBzd2l0Y2ggKCdFWEFNX0dFVF9EQVRBX0xJU1QnKSB7XG4gICAgICAgIGNhc2UgJ0VYQU1fR0VUX0RBVEFfTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZXhhbVJlc3VsdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbUFjdGlvbihzdG9yZSl7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29tbW9uQWN0aW9uKCkse1xuICAgICAgICAgICAgRVhBTV9JTlNFUlRfREFUQTpmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgZGF0YS51c2VyX2lkID0gc3RvcmUuZ2V0U3RhdGUoKS5hdXRoLnVzZXIuaWQ7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCgnLi9zZW5kX2Fuc3dlci9zZW5kX2Fuc3dlcicsZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLHRleHQ6J+C4muC4seC4meC4l+C4tuC4geC4quC4s+C5gOC4o+C5h+C4iCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RhdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcmVkdXhTdG9yZS9leGFtLnN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi4vYXhpb3MnXG5pbXBvcnQge2NvbW1vbkFjdGlvbn0gZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgZXhhbUxpc3Q6W10sXG4gICAgZXhhbUxpc3RDb21wbGV0ZTpbXSxcbiAgICBleGFtU2VsZWN0Ont9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGFtSGlzdG9yeVJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsYWN0aW9uKXtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnRVhBTV9ISVNUT1JZX0VYQU1fTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZXhhbUxpc3Q6YWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSAnRVhBTV9ISVNUT1JZX0VYQU1fTElTVF9TRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2V4YW1TZWxlY3Q6YWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSAnRVhBTV9ISVNUT1JZX0VYQU1fTElTVF9DT01QTEVURSc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZXhhbUxpc3RDb21wbGV0ZTphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YW1IaXN0b3J5QWN0aW9uKHN0b3JlKXtcblxuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIEVYQU1fSElTVE9SWV9FWEFNX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBzdG9yZS5nZXRTdGF0ZSgpLmF1dGgudXNlci5pZDtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy4vZXhhbUhpc3RvcnkvZXhhbUxpc3Q/dXNlcl9pZD0nK2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNX0hJU1RPUllfRVhBTV9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNX0hJU1RPUllfRVhBTV9MSVNUX1NFTEVDVDpmdW5jdGlvbihpZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWQpO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9leGFtSGlzdG9yeS90ZXN0X2V4YW0/aWQ9JytpZClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNX0hJU1RPUllfRVhBTV9MSVNUX1NFTEVDVCcscGF5bG9hZDpyZXNwb25zZS5kYXRhfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ueWxvblZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1fSElTVE9SWV9FWEFNX0xJU1RfQ09NUExFVEU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBzdG9yZS5nZXRTdGF0ZSgpLmF1dGgudXNlci5pZDtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnMTIzNCcpO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9leGFtSGlzdG9yeS9oaXN0b3J5TGlzdD91c2VyX2lkPScraWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1fSElTVE9SWV9FWEFNX0xJU1RfQ09NUExFVEUnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgXVxuXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcmVkdXhTdG9yZS9leGFtSGlzdG9yeS5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIHJlc3VsdDp7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbVJlc3VsdFJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsYWN0aW9uKXtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnRVhBTV9SRVNVTFRfR0VUX1JFU1VMVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7cmVzdWx0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGFtUmVzdWx0QWN0aW9uKHN0b3JlKXtcbiAgICByZXR1cm4gW2NvbW1vbkFjdGlvbigpLFxuICAgICAgICB7XG4gICAgICAgICAgICBFWEFNX1JFU1VMVF9HRVRfUkVTVUxUOmZ1bmN0aW9uKGV4YW1fcm9vbV9pZCx1c2VyX2lkPXN0b3JlLmdldFN0YXRlKCkuYXV0aC51c2VyLmlkKXtcbiAgICAgICAgICAgICAgICAvLyBhbGVydCgnMTIzNCcpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyX2lkJyx1c2VyX2lkKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZXhhbV9yb29tX2lkJyxleGFtX3Jvb21faWQpO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9zZW5kX2Fuc3dlci9zaG93X2Fuc3dlcicse1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6e2V4YW1fcm9vbV9pZCx1c2VyX2lkfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1fUkVTVUxUX0dFVF9SRVNVTFQnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnlsb25WaXNpYmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZWR1eFN0b3JlL2V4YW1SZXN1bHQuc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBheGlvcyBmcm9tICcuLi9heGlvcydcbmltcG9ydCB7Y29tbW9uQWN0aW9ufSBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBleGFtTGlzdDpbXSxcbiAgICBleGFtaW5hdGlvbl9saXN0OltdLFxuICAgIHN0dWRlbnRMaXN0OltdLFxuICAgIHN0dWRlbnRMaXN0Q29tcGxldGVFeGFtOltdLFxuICAgIGV4YW1Sb29tTGlzdDpbXSxcbiAgICBzZWxlY3RleGFtUm9vbTp7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbVJvb21SZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLGFjdGlvbil7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ0VYQU1ST09NX0dFVF9FWEFNX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2V4YW1MaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1ST09NX0dFVF9FWElBTUlOQVRJT05fTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZXhhbWluYXRpb25fbGlzdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdFWEFNUk9PTV9HRVRfU1RVREVOVF9MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzdHVkZW50TGlzdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdFWEFNUk9PTV9HRVRfU1RVREVOVF9MSVNUX0NPTVBMRVRFX0VYQU0nOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3N0dWRlbnRMaXN0Q29tcGxldGVFeGFtOmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1ST09NX0dFVF9FWEFNUk9PTSc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZXhhbVJvb21MaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1ST09NX1NFTEVDVF9EQVRBJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RleGFtUm9vbTphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdFWEFNUk9PTV9DTEVBUl9EQVRBJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RleGFtUm9vbTp7fX0pO1xuICAgICAgICBjYXNlICdFWEFNUk9PTV9DTEVBUl9TVFVERU5UX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3N0dWRlbnRMaXN0OltdfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1ST09NX0NMRUFSX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2V4YW1MaXN0OltdfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YW1Sb29tQWN0aW9uKHN0b3JlKXtcbiAgICByZXR1cm4gW2NvbW1vbkFjdGlvbigpLFxuICAgICAgICB7XG4gICAgICAgICAgICBFWEFNUk9PTV9HRVRfRVhBTV9MSVNUOmZ1bmN0aW9uKHRhZ3Mpe1xuICAgICAgICAgICAgICAgIHRoaXMudGFnczIgPSB0YWdzO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KCcuL2V4YW1Sb29tL2V4YW1Sb29tP21vZHVsZT0nK3RhZ3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKicscmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnY2xvc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX0dFVF9FWEFNX0xJU1QnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNUk9PTV9HRVRfRVhJQU1JTkFUSU9OX0xJU1Q6ZnVuY3Rpb24obW9kdWxlKXtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy9leGFtUm9vbS9leGFtUm9vbV9tb2R1bGU/bW9kdWxlPScrbW9kdWxlKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScscmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX0dFVF9FWElBTUlOQVRJT05fTElTVCcscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1ST09NX0NMRUFSX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRVhBTVJPT01fQ0xFQVJfTElTVCd9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNUk9PTV9HRVRfU1RVREVOVF9MSVNUOmZ1bmN0aW9uKHRhZyl7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KCcuL2V4YW1Sb29tL3VzZXJNb2R1bGVMaXN0P21vZHVsZT0nK3RhZylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNUk9PTV9HRVRfU1RVREVOVF9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRVhBTVJPT01fQ0xFQVJfU1RVREVOVF9MSVNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX0NMRUFSX1NUVURFTlRfTElTVCd9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNUk9PTV9HRVRfU1RVREVOVF9MSVNUX0NPTVBMRVRFX0VYQU06ZnVuY3Rpb24oaWQpe1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9leGFtUm9vbS9zdHVkZW50P2lkPScraWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX0dFVF9TVFVERU5UX0xJU1RfQ09NUExFVEVfRVhBTScscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1ST09NX0dFVF9FWEFNUk9PTTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB1c2VyX2lkID0gc3RvcmUuZ2V0U3RhdGUoKS5hdXRoLnVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KCcuL2V4YW1Sb29tL2V4YW1Sb29tTGlzdD91c2VyX2lkPScrdXNlcl9pZClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNUk9PTV9HRVRfRVhBTVJPT00nLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNUk9PTV9TRUxFQ1RfREFUQTpmdW5jdGlvbihpZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonbG9hZCd9KTtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy4vZXhhbVJvb20vZXhhbVJvb21fb25seT9pZD0nK2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX1NFTEVDVF9EQVRBJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1ST09NX0lOU0VSVF9EQVRBOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QoJy4vZXhhbVJvb20vZXhhbVJvb20nLGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkVYQU1ST09NX0dFVF9FWEFNX0xJU1QodGhpcy50YWdzMik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1ST09NX1VQREFURV9EQVRBOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIGF4aW9zLnB1dCgnLi9leGFtUm9vbS9leGFtUm9vbScsZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRVhBTVJPT01fR0VUX0VYQU1fTElTVCh0aGlzLnRhZ3MyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coe2Vycm9yfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRVhBTVJPT01fREVMRVRFX0RBVEE6ZnVuY3Rpb24oaWQpe1xuICAgICAgICAgICAgICAgIGF4aW9zLmRlbGV0ZSgnLi9leGFtUm9vbS9leGFtUm9vbT9pZD0nK2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FWEFNUk9PTV9HRVRfRVhBTV9MSVNUKHRoaXMudGFnczIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNUk9PTV9DTEVBUl9EQVRBOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1ST09NX0NMRUFSX0RBVEEnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcmVkdXhTdG9yZS9leGFtUm9vbS5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGRhdGFMaXN0OltdLFxuICAgIGxpc3RUYWc6W10sXG4gICAgZGF0YVRlc3Q6W10sXG4gICAgZGF0YVNlbGVjdDpbXSxcbiAgICBleGFtaW5hdGlvblJhbmRvbUxpc3Q6W11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YW1pbmF0aW9uUmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSxhY3Rpb24pe1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdFWEFNSU5BVElPTl9HRVRfTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZGF0YUxpc3Q6YWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSAnRVhBTUlOQVRJT05fR0VUX1RBR19MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtsaXN0VGFnOmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX0dFVF9EQVRBX1RFU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFUZXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX0dFVF9EQVRBX1NFTEVDVCcgOiBcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhU2VsZWN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX0NMRUFSX0RBVEFfU0VMRUNUJyA6IFxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFTZWxlY3Q6e319KTtcbiAgICAgICAgY2FzZSAnRVhBTUlOQVRJT05fUkFORE9NJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtleGFtaW5hdGlvblJhbmRvbUxpc3Q6YWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSAnRVhBTUlOQVRJT05fQ0xFQVJfUkFORE9NJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtleGFtaW5hdGlvblJhbmRvbUxpc3Q6W119KTtcbiAgICAgICAgY2FzZSAnRVhBTUlOQVRJT05fQ0xFQVJfTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZGF0YUxpc3Q6W119KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbWluYXRpb25BY3Rpb24oc3RvcmUpe1xuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCkse1xuICAgICAgICBFWEFNSU5BVElPTl9HRVRfREFUQV9URVNUOmZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgIGF4aW9zLmdldCgnLi90ZXN0X2V4YW0vdGVzdF9leGFtP2lkPScraWQpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1JTkFUSU9OX0dFVF9EQVRBX1RFU1QnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgRVhBTUlOQVRJT05fR0VUX0RBVEFfU0VMRUNUOmZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICBheGlvcy5nZXQoJy4vZXhhbWluYXRpb24vZXhhbWluYXRpb25fb25seT9pZD0nK2lkKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEub2JqZWN0aXZlLm1hcCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdWJfbW9kdWxlID0gaXRlbS5zdWJfbW9kdWxlLm1hcCgoaXRlbTIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2lkOml0ZW0yfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdzZWxlY3QtZGF0YScpO1xuICAgICAgICAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRVhBTUlOQVRJT05fR0VUX0RBVEFfU0VMRUNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEVYQU1JTkFUSU9OX0NMRUFSX0RBVEFfU0VMRUNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1JTkFUSU9OX0NMRUFSX0RBVEFfU0VMRUNUJ30pXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEVYQU1JTkFUSU9OX0dFVF9UQUdfTElTVDpmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgYXhpb3MuZ2V0KCcuL2V4YW1pbmF0aW9uL2V4YW1pbmF0aW9uX3RhZ2FsbCcpXG4gICAgICAgIC8vICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAvLyAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNSU5BVElPTl9HRVRfVEFHX0xJU1QnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSxcbiAgICAgICAgRVhBTUlOQVRJT05fR0VUX0xJU1Q6ZnVuY3Rpb24odGFncyl7XG4gICAgICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonbG9hZCd9KTtcbiAgICAgICAgICAgIGF4aW9zLmdldCgnLi9leGFtaW5hdGlvbi9leGFtaW5hdGlvbj9tb2R1bGU9Jyt0YWdzKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNSU5BVElPTl9HRVRfTElTVCcscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIEVYQU1JTkFUSU9OX0NMRUFSX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRVhBTUlOQVRJT05fQ0xFQVJfTElTVCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgRVhBTUlOQVRJT05fQ0xFQVJfUkFORE9NOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J0VYQU1JTkFUSU9OX0NMRUFSX1JBTkRPTSd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgRVhBTUlOQVRJT05fUkFORE9NOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBheGlvcy5wb3N0KCcuL2V4YW1pbmF0aW9uL2V4YW1pbmF0aW9uX3JhbmRvbScsZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNSU5BVElPTl9SQU5ET00nLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyByZXR1cm4gYXhpb3MucG9zdCgnLi9leGFtaW5hdGlvbi9leGFtaW5hdGlvbl9yYW5kb20nLGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIEVYQU1JTkFUSU9OX0lOU0VSVDpmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGRhdGEudXNlcl9pZCA9IHN0b3JlLmdldFN0YXRlKCkuYXV0aC51c2VyLmlkO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBheGlvcy5wb3N0KCcuL2V4YW1pbmF0aW9uL2V4YW1pbmF0aW9uJyxkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzISEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVYQU1JTkFUSU9OX0dFVF9MSVNUKHRoaXMudGFncyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBFWEFNSU5BVElPTl9VUERBVEU6ZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBkYXRhLnVzZXJfaWQgPSBzdG9yZS5nZXRTdGF0ZSgpLmF1dGgudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYXhpb3MucHV0KCcuL2V4YW1pbmF0aW9uL2V4YW1pbmF0aW9uJyxkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgdGhpcy5FWEFNSU5BVElPTl9HRVRfTElTVCh0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEVYQU1JTkFUSU9OX0RFTEVURTpmdW5jdGlvbihpZCl7XG4gICAgICAgICAgICBheGlvcy5kZWxldGUoJy4vZXhhbWluYXRpb24vZXhhbWluYXRpb24/aWQ9JytpZClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLkVYQU1JTkFUSU9OX0dFVF9MSVNUKHRoaXMudGFncyk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maXJlKCdkZWxldGUtZGF0YScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfV1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZHV4U3RvcmUvZXhhbWluYXRpb24uc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBheGlvcyBmcm9tICcuLi9heGlvcydcbmltcG9ydCB7Y29tbW9uQWN0aW9ufSBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBkYXRhTGlzdDpbXSxcbiAgICBkYXRhU2VsZWN0Ont9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGFtaW5hdGlvblJvb21SZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLGFjdGlvbil7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX1JPT01fR0VUX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFMaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX1JPT01fU0VMRUNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhU2VsZWN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ0VYQU1JTkFUSU9OX1JPT01fQ0xFQVJfREFUQV9TRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFTZWxlY3Q6e319KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhhbWluYXRpb25Sb29tQWN0aW9uKHN0b3JlKXtcblxuICAgIFxuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIEVYQU1JTkFUSU9OX1JPT01fU0VMRUNUOmZ1bmN0aW9uKGRhdGFTZWxlY3Qpe1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi9zdHVkZW50L3N0dWRlbnQnKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRVhBTUlOQVRJT05fUk9PTV9TRUxFQ1QnLHBheWxvYWQ6ZGF0YVNlbGVjdH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRVhBTUlOQVRJT05fUk9PTV9DTEVBUl9EQVRBX1NFTEVDVDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidFWEFNSU5BVElPTl9ST09NX0NMRUFSX0RBVEFfU0VMRUNUJ30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1JTkFUSU9OX1JPT01fR0VUX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy4vc3R1ZGVudC9zdHVkZW50JylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTonRVhBTUlOQVRJT05fUk9PTV9HRVRfTElTVCcscGF5bG9hZDpyZXNwb25zZS5kYXRhfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFWEFNSU5BVElPTl9ST09NX0lOU0VSVDpmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidsb2FkJ30pO1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QoJy4vc3R1ZGVudC9zdHVkZW50JyxkYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhIScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidzdWNjZXNzJyx0ZXh0OifguJrguLHguJnguJfguLbguIHguKrguLPguYDguKPguYfguIgnLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FWEFNSU5BVElPTl9ST09NX0dFVF9MSVNUKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2Nvbm5lY3RFcnJvcicsdGV4dDplcnJvci5tc2csXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1JTkFUSU9OX1JPT01fVVBEQVRFOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucHV0KCcuL3N0dWRlbnQvc3R1ZGVudCcsZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzISEnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsdGV4dDon4LmB4LiB4LmJ4LmE4LiC4Liq4Liz4LmA4Lij4LmH4LiIJyxcbiAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRVhBTUlOQVRJT05fUk9PTV9HRVRfTElTVCgpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2Nvbm5lY3RFcnJvcicsdGV4dDplcnJvci5tc2csXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVYQU1JTkFUSU9OX1JPT01fREVMRVRFOmZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidsb2FkJ30pO1xuICAgICAgICAgICAgICAgIGF4aW9zLmRlbGV0ZSgnLi9zdHVkZW50L3N0dWRlbnQ/aWQ9JytpZClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzISEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLHRleHQ6J+C4peC4muC4guC5ieC4reC4oeC4ueC4peC4quC4s+C5gOC4o+C5h+C4iCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRVhBTUlOQVRJT05fUk9PTV9HRVRfTElTVCgpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdXG5cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZWR1eFN0b3JlL2V4YW1pbmF0aW9uUm9vbS5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGRhdGFMaXN0OltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLGFjdGlvbil7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ01PRFVMRV9MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhTGlzdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVBY3Rpb24oc3RvcmUpe1xuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIE1PRFVMRV9MSVNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RkZCcpO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnL3RhZy90YWcnKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTpcIk1PRFVMRV9MSVNUXCIscGF5bG9hZDpyZXMuZGF0YX0pXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIE1PRFVMRV9JTlNFUlQ6ZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonbG9hZCd9KTtcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KCcvdGFnL3RhZycsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsdGV4dDon4Lia4Lix4LiZ4LiX4Li24LiB4Liq4Liz4LmA4Lij4LmH4LiIJyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTU9EVUxFX0xJU1QoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAgICAgY29zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTU9EVUxFX1VQREFURTpmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS5lZGl0O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGF4aW9zLnB1dCgnL3RhZy90YWcnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NT0RVTEVfTElTVCgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICBjb3NvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBNT0RVTEVfREVMRVRFOmZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidsb2FkJ30pO1xuICAgICAgICAgICAgICAgIGF4aW9zLmRlbGV0ZSgnL3RhZy90YWcnLHtwYXJhbXM6e2lkfX0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLHRleHQ6J+C4peC4muC4guC5ieC4reC4oeC4ueC4peC4quC4s+C5gOC4o+C5h+C4iCcsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NT0RVTEVfTElTVCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICBjb3NvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlZHV4U3RvcmUvbW9kdWxlLnN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi4vYXhpb3MnXG5pbXBvcnQge2NvbW1vbkFjdGlvbn0gZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgZGF0YUxpc3Q6W10sXG4gICAgZGF0YVNlbGVjdDp7fSxcbiAgICBzdWJNb2R1bGVMaXN0OltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVzdGlvblJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsYWN0aW9uKXtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnUVVFU1RJT05fR0VUX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFMaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ1FVRVNUSU9OX1NFTEVDVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZGF0YVNlbGVjdDphY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlICdRVUVTVElPTl9DTEVBUl9TRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFTZWxlY3Q6e2Nob2ljZTpbXX19KTtcbiAgICAgICAgY2FzZSAnUVVFU1RJT05fQ0xFQVJfTElTVCc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7ZGF0YUxpc3Q6W119KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlc3Rpb25BY3Rpb24oc3RvcmUpe1xuICAgIHJldHVybiBbY29tbW9uQWN0aW9uKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIFFVRVNUSU9OX0dFVF9MSVNUOmZ1bmN0aW9uKG1vZHVsZSl7IFxuICAgICAgICAgICAgICAgIHRoaXMubmV3VGFnID0gbW9kdWxlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJfaWQgPSBzdG9yZS5nZXRTdGF0ZSgpLmF1dGgudXNlci5pZDtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy4vcXVlc3Rpb24vcXVlc3Rpb24nLHtwYXJhbXM6e3VzZXJfaWQsbW9kdWxlfX0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J1FVRVNUSU9OX0dFVF9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsdGV4dDon4LmC4Lir4Lil4LiU4LiC4LmJ4Lit4Lih4Li54Lil4Liq4Liz4LmA4Lij4LmH4LiIJyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2Nsb3NlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUVVFU1RJT05fSU5TRVJUOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIGRhdGEudXNlcl9pZCA9IHN0b3JlLmdldFN0YXRlKCkuYXV0aC51c2VyLmlkO1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QoJy4vcXVlc3Rpb24vcXVlc3Rpb24nLGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlFVRVNUSU9OX0dFVF9MSVNUKHRoaXMubmV3VGFnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBRVUVTVElPTl9VUERBVEU6ZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgZGF0YS51c2VyX2lkID0gc3RvcmUuZ2V0U3RhdGUoKS5hdXRoLnVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgYXhpb3MucHV0KCcuL3F1ZXN0aW9uL3F1ZXN0aW9uJyxkYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5RVUVTVElPTl9HRVRfTElTVCh0aGlzLm5ld1RhZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICAvLyAgICAgYXhpb3MucHV0KCcuL3F1ZXN0aW9uL3F1ZXN0aW9uJyxkYXRhKVxuICAgICAgICAgICAgICAgIC8vICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLlFVRVNUSU9OX0dFVF9MSVNUKHRoaXMubW9kdWxlU2VsZWN0KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgICAgIC8vICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFFVRVNUSU9OX0RFTEVURTpmdW5jdGlvbihxdWVzdGlvbklkKXtcbiAgICAgICAgICAgICAgICBheGlvcy5kZWxldGUoJy4vcXVlc3Rpb24vcXVlc3Rpb24/aWQ9JytxdWVzdGlvbklkKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5RVUVTVElPTl9HRVRfTElTVCh0aGlzLm5ld1RhZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFFVRVNUSU9OX1NFTEVDVDpmdW5jdGlvbihxdWVzdGlvbklkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlUmlnaHQgPSAn4LmB4LiB4LmJ4LmE4LiC4LiE4Liz4LiW4Liy4LihJztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICd1cGRhdGUnO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5RVUVTVElPTl9DTEVBUl9TRUxFQ1QoKTtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoJy4vcXVlc3Rpb24vcXVlc3Rpb25fb25seT9pZD0nK3F1ZXN0aW9uSWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidRVUVTVElPTl9TRUxFQ1QnLHBheWxvYWQ6cmVzcG9uc2UuZGF0YX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJCQoJ3BhbmVsLXJpZ2h0Jykub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUVVFU1RJT05fQ0xFQVJfU0VMRUNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J1FVRVNUSU9OX0NMRUFSX1NFTEVDVCd9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBRVUVTVElPTl9DTEVBUl9MSVNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidRVUVTVElPTl9DTEVBUl9MSVNUJ30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFFVRVNUSU9OX0lNQUdFOmZ1bmN0aW9uKGZpbGVzKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJyxmaWxlc1swXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy4vaW1hZ2UvaW1hZ2UnLCBkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBRVUVTVElPTl9VUExPQUQ6ZnVuY3Rpb24oZmlsZXMpe1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLGZpbGVzWzBdKTtcbiAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZCgndXNlcl9pZCcsc3RvcmUuZ2V0U3RhdGUoKS5hdXRoLnVzZXIuaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcuL3F1ZXN0aW9uL3VwbG9hZCcsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcmVkdXhTdG9yZS9xdWVzdGlvbi5zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2F4aW9zJ1xuaW1wb3J0IHtjb21tb25BY3Rpb259IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGRhdGFMaXN0OltdLFxuICAgIGRhdGFTZWxlY3Q6e1xuICAgICAgICBrZXlfdGFnczpbXSxcbiAgICAgICAgZW5kX3RhZ3M6W11cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyTWFuYWdlUmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSxhY3Rpb24pe1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnVVNFUl9NQU5BR0VfR0VUX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFMaXN0OmFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgJ1VTRVJfTUFOQUdFX0NMRUFSX0dFVF9MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhTGlzdDpbXX0pO1xuICAgICAgICBjYXNlICdVU0VSX01BTkFHRV9DTEVBUl9MSVNUJzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtkYXRhU2VsZWN0OnthZG1pbjpmYWxzZSxrZXlfdGFnczpbXSxlbmRfdGFnczpbXX19KTtcbiAgICAgICAgY2FzZSAnVVNFUl9NQU5BR0VfU0VMRUNUX0xJU1QnOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2RhdGFTZWxlY3Q6YWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyTWFuYWdlQWN0aW9uKHN0b3JlKXtcbiAgICByZXR1cm4gW2NvbW1vbkFjdGlvbigpLFxuICAgICAgICB7XG4gICAgICAgICAgICBVU0VSX01BTkFHRV9HRVRfTElTVDpmdW5jdGlvbih0YWcpe1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGFnID0gdGFnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KCcuL3VzZXIvdXNlcj90YWdzPScrdGFnKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnY2xvc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J1VTRVJfTUFOQUdFX0dFVF9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVVNFUl9NQU5BR0VfQ0xFQVJfR0VUX0xJU1Q6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidVU0VSX01BTkFHRV9DTEVBUl9HRVRfTElTVCd9KTsgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVVNFUl9NQU5BR0VfU0VMRUNUX0xJU1Q6ZnVuY3Rpb24oaWQpe1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCgnLi91c2VyL3NlbGVjdF91c2VyP2lkPScraWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlVTRVJfTUFOQUdFX0NMRUFSX0xJU1QoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZW5kX3RhZ3MgPSByZXNwb25zZS5kYXRhLmVuZF90YWdzLm1hcCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7aWQ6aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEua2V5X3RhZ3MgPSByZXNwb25zZS5kYXRhLmtleV90YWdzLm1hcCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7aWQ6aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6J1VTRVJfTUFOQUdFX1NFTEVDVF9MSVNUJyxwYXlsb2FkOnJlc3BvbnNlLmRhdGF9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVVNFUl9NQU5BR0VfSU5TRVJUOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCgnLi91c2VyL3VzZXInLGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmZpcmUoJ3RvYXN0Jyx7c3RhdHVzOidzdWNjZXNzJyx0ZXh0OifguJrguLHguJnguJfguLbguIHguKrguLPguYDguKPguYfguIgnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgIGNhbGxiYWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVVNFUl9NQU5BR0VfR0VUX0xJU1QodGhpcy5uZXdUYWcpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVVNFUl9NQU5BR0VfVVBEQVRFOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucHV0KCcuL3VzZXIvdXNlcicsZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J3N1Y2Nlc3MnLHRleHQ6J+C4muC4seC4meC4l+C4tuC4geC4quC4s+C5gOC4o+C5h+C4iCcsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgY2FsbGJhY2s6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gIH0pO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5VU0VSX01BTkFHRV9HRVRfTElTVCh0aGlzLm5ld1RhZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBVU0VSX01BTkFHRV9ERUxFVEU6ZnVuY3Rpb24oaWQpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlyZSgndG9hc3QnLHtzdGF0dXM6J2xvYWQnfSk7XG4gICAgICAgICAgICAgICAgYXhpb3MuZGVsZXRlKCcuL3VzZXIvdXNlcj9pZD0nK2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5maXJlKCd0b2FzdCcse3N0YXR1czonc3VjY2VzcycsdGV4dDon4Lia4Lix4LiZ4LiX4Li24LiB4Liq4Liz4LmA4Lij4LmH4LiIJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjYWxsYmFjazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVVNFUl9NQU5BR0VfR0VUX0xJU1QodGhpcy5uZXdUYWcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBVU0VSX01BTkFHRV9DTEVBUl9MSVNUOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOidVU0VSX01BTkFHRV9DTEVBUl9MSVNUJyxwYXlsb2FkOnt9fSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZWR1eFN0b3JlL3VzZXJNYW5hZ2Uuc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=