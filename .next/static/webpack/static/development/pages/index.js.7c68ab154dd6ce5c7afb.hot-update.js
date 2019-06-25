webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/next-routes/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/next-routes/dist/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pathToRegexp = _interopRequireDefault(__webpack_require__(/*! path-to-regexp */ "./node_modules/next-routes/node_modules/path-to-regexp/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var _link = _interopRequireDefault(__webpack_require__(/*! next/link */ "./node_modules/next/link.js"));

var _router = _interopRequireDefault(__webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = function (opts) {
  return new Routes(opts);
};

var Routes =
/*#__PURE__*/
function () {
  function Routes() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$Link = _ref.Link,
        Link = _ref$Link === void 0 ? _link.default : _ref$Link,
        _ref$Router = _ref.Router,
        Router = _ref$Router === void 0 ? _router.default : _ref$Router;

    _classCallCheck(this, Routes);

    this.routes = [];
    this.Link = this.getLink(Link);
    this.Router = this.getRouter(Router);
  }

  _createClass(Routes, [{
    key: "add",
    value: function add(name, pattern, page) {
      var options;

      if (name instanceof Object) {
        options = name;
        name = options.name;
      } else {
        if (name[0] === '/') {
          page = pattern;
          pattern = name;
          name = null;
        }

        options = {
          name: name,
          pattern: pattern,
          page: page
        };
      }

      if (this.findByName(name)) {
        throw new Error("Route \"".concat(name, "\" already exists"));
      }

      this.routes.push(new Route(options));
      return this;
    }
  }, {
    key: "findByName",
    value: function findByName(name) {
      if (name) {
        return this.routes.filter(function (route) {
          return route.name === name;
        })[0];
      }
    }
  }, {
    key: "match",
    value: function match(url) {
      var parsedUrl = (0, _url.parse)(url, true);
      var pathname = parsedUrl.pathname,
          query = parsedUrl.query;
      return this.routes.reduce(function (result, route) {
        if (result.route) return result;
        var params = route.match(pathname);
        if (!params) return result;
        return _objectSpread({}, result, {
          route: route,
          params: params,
          query: _objectSpread({}, query, params)
        });
      }, {
        query: query,
        parsedUrl: parsedUrl
      });
    }
  }, {
    key: "findAndGetUrls",
    value: function findAndGetUrls(nameOrUrl, params) {
      var route = this.findByName(nameOrUrl);

      if (route) {
        return {
          route: route,
          urls: route.getUrls(params),
          byName: true
        };
      } else {
        var _this$match = this.match(nameOrUrl),
            _route = _this$match.route,
            query = _this$match.query;

        var href = _route ? _route.getHref(query) : nameOrUrl;
        var urls = {
          href: href,
          as: nameOrUrl
        };
        return {
          route: _route,
          urls: urls
        };
      }
    }
  }, {
    key: "getRequestHandler",
    value: function getRequestHandler(app, customHandler) {
      var _this = this;

      var nextHandler = app.getRequestHandler();
      return function (req, res) {
        var _this$match2 = _this.match(req.url),
            route = _this$match2.route,
            query = _this$match2.query,
            parsedUrl = _this$match2.parsedUrl;

        if (route) {
          if (customHandler) {
            customHandler({
              req: req,
              res: res,
              route: route,
              query: query
            });
          } else {
            app.render(req, res, route.page, query);
          }
        } else {
          nextHandler(req, res, parsedUrl);
        }
      };
    }
  }, {
    key: "getLink",
    value: function getLink(Link) {
      var _this2 = this;

      var LinkRoutes = function LinkRoutes(props) {
        var route = props.route,
            params = props.params,
            to = props.to,
            newProps = _objectWithoutProperties(props, ["route", "params", "to"]);

        var nameOrUrl = route || to;

        if (nameOrUrl) {
          Object.assign(newProps, _this2.findAndGetUrls(nameOrUrl, params).urls);
        }

        return _react.default.createElement(Link, newProps);
      };

      return LinkRoutes;
    }
  }, {
    key: "getRouter",
    value: function getRouter(Router) {
      var _this3 = this;

      var wrap = function wrap(method) {
        return function (route, params, options) {
          var _this3$findAndGetUrls = _this3.findAndGetUrls(route, params),
              byName = _this3$findAndGetUrls.byName,
              _this3$findAndGetUrls2 = _this3$findAndGetUrls.urls,
              as = _this3$findAndGetUrls2.as,
              href = _this3$findAndGetUrls2.href;

          return Router[method](href, as, byName ? options : params);
        };
      };

      Router.pushRoute = wrap('push');
      Router.replaceRoute = wrap('replace');
      Router.prefetchRoute = wrap('prefetch');
      return Router;
    }
  }]);

  return Routes;
}();

var Route =
/*#__PURE__*/
function () {
  function Route(_ref2) {
    var name = _ref2.name,
        pattern = _ref2.pattern,
        _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? name : _ref2$page;

    _classCallCheck(this, Route);

    if (!name && !page) {
      throw new Error("Missing page to render for route \"".concat(pattern, "\""));
    }

    this.name = name;
    this.pattern = pattern || "/".concat(name);
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/');
    this.regex = (0, _pathToRegexp.default)(this.pattern, this.keys = []);
    this.keyNames = this.keys.map(function (key) {
      return key.name;
    });
    this.toPath = _pathToRegexp.default.compile(this.pattern);
  }

  _createClass(Route, [{
    key: "match",
    value: function match(path) {
      var values = this.regex.exec(path);

      if (values) {
        return this.valuesToParams(values.slice(1));
      }
    }
  }, {
    key: "valuesToParams",
    value: function valuesToParams(values) {
      var _this4 = this;

      return values.reduce(function (params, val, i) {
        if (val === undefined) return params;
        return Object.assign(params, _defineProperty({}, _this4.keys[i].name, decodeURIComponent(val)));
      }, {});
    }
  }, {
    key: "getHref",
    value: function getHref() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return "".concat(this.page, "?").concat(toQuerystring(params));
    }
  }, {
    key: "getAs",
    value: function getAs() {
      var _this5 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var as = this.toPath(params) || '/';
      var keys = Object.keys(params);
      var qsKeys = keys.filter(function (key) {
        return _this5.keyNames.indexOf(key) === -1;
      });
      if (!qsKeys.length) return as;
      var qsParams = qsKeys.reduce(function (qs, key) {
        return Object.assign(qs, _defineProperty({}, key, params[key]));
      }, {});
      return "".concat(as, "?").concat(toQuerystring(qsParams));
    }
  }, {
    key: "getUrls",
    value: function getUrls(params) {
      var as = this.getAs(params);
      var href = this.getHref(params);
      return {
        as: as,
        href: href
      };
    }
  }]);

  return Route;
}();

var toQuerystring = function toQuerystring(obj) {
  return Object.keys(obj).filter(function (key) {
    return obj[key] !== null && obj[key] !== undefined;
  }).map(function (key) {
    var value = obj[key];

    if (Array.isArray(value)) {
      value = value.join('/');
    }

    return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
  }).join('&');
};

/***/ }),

/***/ "./node_modules/next-routes/node_modules/path-to-regexp/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/next-routes/node_modules/path-to-regexp/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var start = options.start !== false
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = start ? '^' : ''
  var isEndDelimited = tokens.length === 0

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?'
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?'
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dyn; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_mylayout_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/mylayout.js */ "./components/mylayout.js");
/* harmony import */ var _components_banner_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/banner.js */ "./components/banner.js");
/* harmony import */ var _components_image_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/image.js */ "./components/image.js");
/* harmony import */ var _components_simpletext_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/simpletext.js */ "./components/simpletext.js");
/* harmony import */ var _components_richtextfield_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/richtextfield.js */ "./components/richtextfield.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _components_twocolumn_layout_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/twocolumn/layout.js */ "./components/twocolumn/layout.js");










var _jsxFileName = "/Users/bas/Documents/Workspace/TWE_POC/nextjs/pages/index.js";











var Dyn =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(Dyn, _React$Component);

  function Dyn() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Dyn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Dyn)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "mapTypeToComponent", function (typeName, componentProps, image, siteLanguage, componentList) {
      componentProps.siteLanguage = siteLanguage;

      switch (typeName) {
        case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/image.json':
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_image_js__WEBPACK_IMPORTED_MODULE_13__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, componentProps, {
            image: image,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            },
            __self: this
          }));

        case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/banner.json':
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_banner_js__WEBPACK_IMPORTED_MODULE_12__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, componentProps, {
            image: image,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            },
            __self: this
          }));

        case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/simpletextblock.json':
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_simpletext_js__WEBPACK_IMPORTED_MODULE_14__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, componentProps, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          }));

        case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/richtextfield.json':
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_richtextfield_js__WEBPACK_IMPORTED_MODULE_15__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, componentProps, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          }));

        case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/twocolumncontainer.json':
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_twocolumn_layout_js__WEBPACK_IMPORTED_MODULE_19__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, componentProps, {
            componentList: componentList,
            siteLanguage: siteLanguage,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 87
            },
            __self: this
          }));
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "getComponentProps", function (componentId, componentList) {
      return componentList.find(function (item) {
        return item['@id'] === componentId;
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Dyn, [{
    key: "getGuidFromId",
    value: function getGuidFromId(componentId) {
      if (componentId.length >= 0) {
        var parts = componentId.split('/');

        if (parts.length >= 0) {
          return parts[parts.length - 1];
        }
      }

      return '';
    }
  }, {
    key: "getMenu",
    value: function getMenu(menuComponentList, siteName) {
      var _this2 = this;

      var url = this.props.url;

      if (menuComponentList[0].slugs != null) {
        return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10___default.a.Fragment, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 131
          },
          __self: this
        }, menuComponentList[0].slugs.map(function (item, index) {
          var componentProps = _this2.getComponentProps(item['@id'], menuComponentList);

          var pageId = _this2.getGuidFromId(componentProps.page['@id']);

          var navUrl = "/index?site=".concat(siteName, "&id=").concat(pageId);
          var customRoute = navUrl;
          return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_17___default.a, {
            prefetch: true,
            href: customRoute,
            as: componentProps.slug,
            key: "key-".concat(index),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("a", {
            className: "c-nav__item ".concat(url.asPath === customRoute ? 'active' : ''),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 141
            },
            __self: this
          }, componentProps.navLabel != null ? componentProps.navLabel.values[0].value : ''));
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          data = _this$props.data,
          dataMenu = _this$props.dataMenu,
          siteLanguage = _this$props.siteLanguage,
          siteName = _this$props.siteName;
      var componentList = data['@graph'];
      var menuComponentList = dataMenu['@graph'];
      var imageList = componentList.filter(function (item) {
        return item.mediaType === 'image';
      });
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_18___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, "Treasure Wine Estates - ", siteName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        integrity: "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",
        crossOrigin: "anonymous",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("link", {
        rel: "stylesheet",
        href: "../static/styles/".concat(siteName, "/styles.css"),
        crossOrigin: "anonymous",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "c-site-wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("nav", {
        className: "nav",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "c-nav",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, this.getMenu(menuComponentList, siteName))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_mylayout_js__WEBPACK_IMPORTED_MODULE_11__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }, componentList[0] && componentList[0].slotContent ? componentList[0].slotContent.map(function (item, index) {
        var image = null;

        var componentProps = _this3.getComponentProps(item['@id'], componentList);

        if (componentProps.background || componentProps.image) {
          image = imageList.find(function (imageItem) {
            return componentProps.background && imageItem['@id'] === componentProps.background['@id'] || componentProps.image && imageItem['@id'] === componentProps.image['@id'];
          });
        }

        return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          key: "key-".concat(index),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 178
          },
          __self: this
        }, _this3.mapTypeToComponent(item['@type'], componentProps, image, siteLanguage, componentList));
      }) : null)));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var _this4 = this;

        var pathname, query, req, page, siteLanguage, urlId, siteName, routes, siteId, treeRootUrl, slugId, dataMenu, pageId, url, res, data;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pathname = _ref.pathname, query = _ref.query, req = _ref.req;
                // Set the site language with a default of English
                page = '';
                siteLanguage = query.lang != null ? query.lang : 'en-AU';
                urlId = query.id != null ? query.id : '';
                siteName = query.site != null ? query.site : '';
                routes = __webpack_require__(/*! next-routes */ "./node_modules/next-routes/dist/index.js");
                console.log(query);
                console.log('entry');
                if (query.page != '/') page = '/' + query.page;
                if (page == '/undefined') page = '/'; // Get Site Id / Name

                siteId = '';
                _context.t0 = siteName;
                _context.next = _context.t0 === 'ativo' ? 14 : 17;
                break;

              case 14:
                siteName = 'ativo';
                siteId = '99757712-7a28-4ce5-94f3-82c2f936cbc6';
                return _context.abrupt("break", 20);

              case 17:
                siteName = 'squealingpig';
                siteId = 'e904f0cd-7f15-4773-807a-f35f322b18e8';
                return _context.abrupt("break", 20);

              case 20:
                // Url for Root of CMS Tree, returning all nodes
                treeRootUrl = "https://c1.adis.ws/cms/content/query?query=%7b%22sys.iri%22:%22http://content.cms.amplience.net/".concat(siteId, "%22%7d&scope=tree&store=twe&fullBodyObject=true"); // Get route from Data

                slugId = '';
                dataMenu = '';
                _context.next = 25;
                return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_16___default()(treeRootUrl).then(function (response) {
                  return response.json();
                }).then(function (json) {
                  slugId = _this4.getCustomRoute(json, page);
                  dataMenu = json;
                });

              case 25:
                pageId = '';
                if (urlId != '') pageId = urlId;else if (slugId != '') pageId = slugId;else pageId = siteId;
                url = "https://c1.adis.ws/cms/content/query?query=%7b%22sys.iri%22:%22http://content.cms.amplience.net/".concat(pageId, "%22%7d&scope=tree&store=twe&fullBodyObject=true");
                _context.next = 30;
                return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_16___default()(url);

              case 30:
                res = _context.sent;
                _context.next = 33;
                return res.json();

              case 33:
                data = _context.sent;
                return _context.abrupt("return", {
                  data: data,
                  dataMenu: dataMenu,
                  siteName: siteName,
                  siteLanguage: siteLanguage,
                  page: page
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Dyn;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Dyn, "getCustomRoute", function (data, path) {
  if (path == null || path == '') path = '/';
  var componentList = data['@graph'];
  var componentProps = componentList.find(function (item) {
    return item['slug'] === path;
  });

  if (componentProps != null) {
    var componentId = componentProps.page['@id'];

    if (componentId.length >= 0) {
      var parts = componentId.split('/');

      if (parts.length >= 0) {
        return parts[parts.length - 1];
      }
    }
  }

  return '';
});



/***/ })

})
//# sourceMappingURL=index.js.7c68ab154dd6ce5c7afb.hot-update.js.map