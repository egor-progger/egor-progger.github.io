/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* eslint-env browser */\n\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\n\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === 'undefined';\nvar forEach = Array.prototype.forEach;\n\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    var self = this; // eslint-disable-next-line prefer-rest-params\n\n    var args = arguments;\n\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n\n    clearTimeout(timeout);\n    timeout = setTimeout(functionCall, time);\n  };\n}\n\nfunction noop() {}\n\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src = document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName('script');\n      var lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n\n    srcByModuleId[moduleId] = src;\n  }\n\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n\n    if (!filename) {\n      return [src.replace('.js', '.css')];\n    }\n\n    if (!fileMap) {\n      return [src.replace('.js', '.css')];\n    }\n\n    return fileMap.split(',').map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), 'g');\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    } // eslint-disable-next-line\n\n\n    url = el.href.split('?')[0];\n  }\n\n  if (!isUrlRequest(url)) {\n    return;\n  }\n\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n\n  if (!url || !(url.indexOf('.css') > -1)) {\n    return;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener('load', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener('error', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\nfunction getReloadUrl(href, src) {\n  var ret; // eslint-disable-next-line no-param-reassign\n\n  href = normalizeUrl(href, {\n    stripWWW: false\n  }); // eslint-disable-next-line array-callback-return\n\n  src.some(function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n\n  var elements = document.querySelectorAll('link');\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n\n    var url = getReloadUrl(el.href, src);\n\n    if (!isUrlRequest(url)) {\n      return;\n    }\n\n    if (el.visited === true) {\n      return;\n    }\n\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\n\nfunction reloadAll() {\n  var elements = document.querySelectorAll('link');\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n\n    updateCss(el);\n  });\n}\n\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n  // It is not http or https\n  if (!/^https?:/i.test(url)) {\n    return false;\n  }\n\n  return true;\n}\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log('no window.document found, will not HMR CSS');\n    return noop;\n  }\n\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n\n    if (options.locals) {\n      console.log('[HMR] Detected local css modules. Reload all css');\n      reloadAll();\n      return;\n    }\n\n    if (reloaded) {\n      console.log('[HMR] css reload %s', src.join(' '));\n    } else {\n      console.log('[HMR] Reload all css');\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://pointlinejs/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* eslint-disable */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case '..':\n        accumulator.pop();\n        break;\n\n      case '.':\n        break;\n\n      default:\n        accumulator.push(item);\n    }\n\n    return accumulator;\n  }, []).join('/');\n}\n\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n\n  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';\n  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');\n  var host = components[0].toLowerCase().replace(/\\.$/, '');\n  components[0] = '';\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://pointlinejs/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/documentation/styles/styles.scss":
/*!**********************************************!*\
  !*** ./src/documentation/styles/styles.scss ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1712088918443\n      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.id, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack://pointlinejs/./src/documentation/styles/styles.scss?");

/***/ }),

/***/ "./src/documentation/documentation.ts":
/*!********************************************!*\
  !*** ./src/documentation/documentation.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./styles/styles.scss */ \"./src/documentation/styles/styles.scss\");\nconst core_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/core */ \"./node_modules/highlight.js/lib/core.js\"));\nconst vbscript_html_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/languages/vbscript-html */ \"./node_modules/highlight.js/lib/languages/vbscript-html.js\"));\nconst javascript_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/languages/javascript */ \"./node_modules/highlight.js/lib/languages/javascript.js\"));\nconst typescript_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/languages/typescript */ \"./node_modules/highlight.js/lib/languages/typescript.js\"));\nconst css_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/languages/css */ \"./node_modules/highlight.js/lib/languages/css.js\"));\nconst scss_1 = __importDefault(__webpack_require__(/*! highlight.js/lib/languages/scss */ \"./node_modules/highlight.js/lib/languages/scss.js\"));\ncore_1.default.registerLanguage('javascript', javascript_1.default);\ncore_1.default.registerLanguage('typescript', typescript_1.default);\ncore_1.default.registerLanguage('css', css_1.default);\ncore_1.default.registerLanguage('scss', scss_1.default);\ncore_1.default.registerLanguage('html', vbscript_html_1.default);\nconst navItems = Array.from(document.getElementsByClassName('nav-item-link'));\nfunction setActiveNavItem() {\n    const hashTag = document.location.hash;\n    if (hashTag) {\n        const newActiveMenuItem = navItems.find((item) => item.href.indexOf(hashTag) > -1);\n        const currentActiveMenuItem = navItems.find((item) => item.parentElement.classList.contains('active'));\n        if (newActiveMenuItem) {\n            if (currentActiveMenuItem && currentActiveMenuItem.href !== newActiveMenuItem.href) {\n                currentActiveMenuItem.parentElement.classList.remove('active');\n            }\n            newActiveMenuItem.parentElement.classList.add('active');\n        }\n    }\n}\nsetActiveNavItem();\nfor (const navItem of navItems) {\n    navItem.parentElement.addEventListener('click', () => {\n        document.location.href = navItem.href;\n        setActiveNavItem();\n    });\n}\ndocument.querySelectorAll('code').forEach((el) => {\n    core_1.default.highlightElement(el);\n});\n\n\n//# sourceURL=webpack://pointlinejs/./src/documentation/documentation.ts?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/core.js":
/*!***********************************************!*\
  !*** ./node_modules/highlight.js/lib/core.js ***!
  \***********************************************/
/***/ ((module) => {

eval("/* eslint-disable no-multi-assign */\n\nfunction deepFreeze(obj) {\n  if (obj instanceof Map) {\n    obj.clear =\n      obj.delete =\n      obj.set =\n        function () {\n          throw new Error('map is read-only');\n        };\n  } else if (obj instanceof Set) {\n    obj.add =\n      obj.clear =\n      obj.delete =\n        function () {\n          throw new Error('set is read-only');\n        };\n  }\n\n  // Freeze self\n  Object.freeze(obj);\n\n  Object.getOwnPropertyNames(obj).forEach((name) => {\n    const prop = obj[name];\n    const type = typeof prop;\n\n    // Freeze prop if it is an object or function and also not already frozen\n    if ((type === 'object' || type === 'function') && !Object.isFrozen(prop)) {\n      deepFreeze(prop);\n    }\n  });\n\n  return obj;\n}\n\n/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */\n/** @typedef {import('highlight.js').CompiledMode} CompiledMode */\n/** @implements CallbackResponse */\n\nclass Response {\n  /**\n   * @param {CompiledMode} mode\n   */\n  constructor(mode) {\n    // eslint-disable-next-line no-undefined\n    if (mode.data === undefined) mode.data = {};\n\n    this.data = mode.data;\n    this.isMatchIgnored = false;\n  }\n\n  ignoreMatch() {\n    this.isMatchIgnored = true;\n  }\n}\n\n/**\n * @param {string} value\n * @returns {string}\n */\nfunction escapeHTML(value) {\n  return value\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#x27;');\n}\n\n/**\n * performs a shallow merge of multiple objects into one\n *\n * @template T\n * @param {T} original\n * @param {Record<string,any>[]} objects\n * @returns {T} a single new object\n */\nfunction inherit$1(original, ...objects) {\n  /** @type Record<string,any> */\n  const result = Object.create(null);\n\n  for (const key in original) {\n    result[key] = original[key];\n  }\n  objects.forEach(function(obj) {\n    for (const key in obj) {\n      result[key] = obj[key];\n    }\n  });\n  return /** @type {T} */ (result);\n}\n\n/**\n * @typedef {object} Renderer\n * @property {(text: string) => void} addText\n * @property {(node: Node) => void} openNode\n * @property {(node: Node) => void} closeNode\n * @property {() => string} value\n */\n\n/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */\n/** @typedef {{walk: (r: Renderer) => void}} Tree */\n/** */\n\nconst SPAN_CLOSE = '</span>';\n\n/**\n * Determines if a node needs to be wrapped in <span>\n *\n * @param {Node} node */\nconst emitsWrappingTags = (node) => {\n  // rarely we can have a sublanguage where language is undefined\n  // TODO: track down why\n  return !!node.scope;\n};\n\n/**\n *\n * @param {string} name\n * @param {{prefix:string}} options\n */\nconst scopeToCSSClass = (name, { prefix }) => {\n  // sub-language\n  if (name.startsWith(\"language:\")) {\n    return name.replace(\"language:\", \"language-\");\n  }\n  // tiered scope: comment.line\n  if (name.includes(\".\")) {\n    const pieces = name.split(\".\");\n    return [\n      `${prefix}${pieces.shift()}`,\n      ...(pieces.map((x, i) => `${x}${\"_\".repeat(i + 1)}`))\n    ].join(\" \");\n  }\n  // simple scope\n  return `${prefix}${name}`;\n};\n\n/** @type {Renderer} */\nclass HTMLRenderer {\n  /**\n   * Creates a new HTMLRenderer\n   *\n   * @param {Tree} parseTree - the parse tree (must support `walk` API)\n   * @param {{classPrefix: string}} options\n   */\n  constructor(parseTree, options) {\n    this.buffer = \"\";\n    this.classPrefix = options.classPrefix;\n    parseTree.walk(this);\n  }\n\n  /**\n   * Adds texts to the output stream\n   *\n   * @param {string} text */\n  addText(text) {\n    this.buffer += escapeHTML(text);\n  }\n\n  /**\n   * Adds a node open to the output stream (if needed)\n   *\n   * @param {Node} node */\n  openNode(node) {\n    if (!emitsWrappingTags(node)) return;\n\n    const className = scopeToCSSClass(node.scope,\n      { prefix: this.classPrefix });\n    this.span(className);\n  }\n\n  /**\n   * Adds a node close to the output stream (if needed)\n   *\n   * @param {Node} node */\n  closeNode(node) {\n    if (!emitsWrappingTags(node)) return;\n\n    this.buffer += SPAN_CLOSE;\n  }\n\n  /**\n   * returns the accumulated buffer\n  */\n  value() {\n    return this.buffer;\n  }\n\n  // helpers\n\n  /**\n   * Builds a span element\n   *\n   * @param {string} className */\n  span(className) {\n    this.buffer += `<span class=\"${className}\">`;\n  }\n}\n\n/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */\n/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */\n/** @typedef {import('highlight.js').Emitter} Emitter */\n/**  */\n\n/** @returns {DataNode} */\nconst newNode = (opts = {}) => {\n  /** @type DataNode */\n  const result = { children: [] };\n  Object.assign(result, opts);\n  return result;\n};\n\nclass TokenTree {\n  constructor() {\n    /** @type DataNode */\n    this.rootNode = newNode();\n    this.stack = [this.rootNode];\n  }\n\n  get top() {\n    return this.stack[this.stack.length - 1];\n  }\n\n  get root() { return this.rootNode; }\n\n  /** @param {Node} node */\n  add(node) {\n    this.top.children.push(node);\n  }\n\n  /** @param {string} scope */\n  openNode(scope) {\n    /** @type Node */\n    const node = newNode({ scope });\n    this.add(node);\n    this.stack.push(node);\n  }\n\n  closeNode() {\n    if (this.stack.length > 1) {\n      return this.stack.pop();\n    }\n    // eslint-disable-next-line no-undefined\n    return undefined;\n  }\n\n  closeAllNodes() {\n    while (this.closeNode());\n  }\n\n  toJSON() {\n    return JSON.stringify(this.rootNode, null, 4);\n  }\n\n  /**\n   * @typedef { import(\"./html_renderer\").Renderer } Renderer\n   * @param {Renderer} builder\n   */\n  walk(builder) {\n    // this does not\n    return this.constructor._walk(builder, this.rootNode);\n    // this works\n    // return TokenTree._walk(builder, this.rootNode);\n  }\n\n  /**\n   * @param {Renderer} builder\n   * @param {Node} node\n   */\n  static _walk(builder, node) {\n    if (typeof node === \"string\") {\n      builder.addText(node);\n    } else if (node.children) {\n      builder.openNode(node);\n      node.children.forEach((child) => this._walk(builder, child));\n      builder.closeNode(node);\n    }\n    return builder;\n  }\n\n  /**\n   * @param {Node} node\n   */\n  static _collapse(node) {\n    if (typeof node === \"string\") return;\n    if (!node.children) return;\n\n    if (node.children.every(el => typeof el === \"string\")) {\n      // node.text = node.children.join(\"\");\n      // delete node.children;\n      node.children = [node.children.join(\"\")];\n    } else {\n      node.children.forEach((child) => {\n        TokenTree._collapse(child);\n      });\n    }\n  }\n}\n\n/**\n  Currently this is all private API, but this is the minimal API necessary\n  that an Emitter must implement to fully support the parser.\n\n  Minimal interface:\n\n  - addText(text)\n  - __addSublanguage(emitter, subLanguageName)\n  - startScope(scope)\n  - endScope()\n  - finalize()\n  - toHTML()\n\n*/\n\n/**\n * @implements {Emitter}\n */\nclass TokenTreeEmitter extends TokenTree {\n  /**\n   * @param {*} options\n   */\n  constructor(options) {\n    super();\n    this.options = options;\n  }\n\n  /**\n   * @param {string} text\n   */\n  addText(text) {\n    if (text === \"\") { return; }\n\n    this.add(text);\n  }\n\n  /** @param {string} scope */\n  startScope(scope) {\n    this.openNode(scope);\n  }\n\n  endScope() {\n    this.closeNode();\n  }\n\n  /**\n   * @param {Emitter & {root: DataNode}} emitter\n   * @param {string} name\n   */\n  __addSublanguage(emitter, name) {\n    /** @type DataNode */\n    const node = emitter.root;\n    if (name) node.scope = `language:${name}`;\n\n    this.add(node);\n  }\n\n  toHTML() {\n    const renderer = new HTMLRenderer(this, this.options);\n    return renderer.value();\n  }\n\n  finalize() {\n    this.closeAllNodes();\n    return true;\n  }\n}\n\n/**\n * @param {string} value\n * @returns {RegExp}\n * */\n\n/**\n * @param {RegExp | string } re\n * @returns {string}\n */\nfunction source(re) {\n  if (!re) return null;\n  if (typeof re === \"string\") return re;\n\n  return re.source;\n}\n\n/**\n * @param {RegExp | string } re\n * @returns {string}\n */\nfunction lookahead(re) {\n  return concat('(?=', re, ')');\n}\n\n/**\n * @param {RegExp | string } re\n * @returns {string}\n */\nfunction anyNumberOfTimes(re) {\n  return concat('(?:', re, ')*');\n}\n\n/**\n * @param {RegExp | string } re\n * @returns {string}\n */\nfunction optional(re) {\n  return concat('(?:', re, ')?');\n}\n\n/**\n * @param {...(RegExp | string) } args\n * @returns {string}\n */\nfunction concat(...args) {\n  const joined = args.map((x) => source(x)).join(\"\");\n  return joined;\n}\n\n/**\n * @param { Array<string | RegExp | Object> } args\n * @returns {object}\n */\nfunction stripOptionsFromArgs(args) {\n  const opts = args[args.length - 1];\n\n  if (typeof opts === 'object' && opts.constructor === Object) {\n    args.splice(args.length - 1, 1);\n    return opts;\n  } else {\n    return {};\n  }\n}\n\n/** @typedef { {capture?: boolean} } RegexEitherOptions */\n\n/**\n * Any of the passed expresssions may match\n *\n * Creates a huge this | this | that | that match\n * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args\n * @returns {string}\n */\nfunction either(...args) {\n  /** @type { object & {capture?: boolean} }  */\n  const opts = stripOptionsFromArgs(args);\n  const joined = '('\n    + (opts.capture ? \"\" : \"?:\")\n    + args.map((x) => source(x)).join(\"|\") + \")\";\n  return joined;\n}\n\n/**\n * @param {RegExp | string} re\n * @returns {number}\n */\nfunction countMatchGroups(re) {\n  return (new RegExp(re.toString() + '|')).exec('').length - 1;\n}\n\n/**\n * Does lexeme start with a regular expression match at the beginning\n * @param {RegExp} re\n * @param {string} lexeme\n */\nfunction startsWith(re, lexeme) {\n  const match = re && re.exec(lexeme);\n  return match && match.index === 0;\n}\n\n// BACKREF_RE matches an open parenthesis or backreference. To avoid\n// an incorrect parse, it additionally matches the following:\n// - [...] elements, where the meaning of parentheses and escapes change\n// - other escape sequences, so we do not misparse escape sequences as\n//   interesting elements\n// - non-matching or lookahead parentheses, which do not capture. These\n//   follow the '(' with a '?'.\nconst BACKREF_RE = /\\[(?:[^\\\\\\]]|\\\\.)*\\]|\\(\\??|\\\\([1-9][0-9]*)|\\\\./;\n\n// **INTERNAL** Not intended for outside usage\n// join logically computes regexps.join(separator), but fixes the\n// backreferences so they continue to match.\n// it also places each individual regular expression into it's own\n// match group, keeping track of the sequencing of those match groups\n// is currently an exercise for the caller. :-)\n/**\n * @param {(string | RegExp)[]} regexps\n * @param {{joinWith: string}} opts\n * @returns {string}\n */\nfunction _rewriteBackreferences(regexps, { joinWith }) {\n  let numCaptures = 0;\n\n  return regexps.map((regex) => {\n    numCaptures += 1;\n    const offset = numCaptures;\n    let re = source(regex);\n    let out = '';\n\n    while (re.length > 0) {\n      const match = BACKREF_RE.exec(re);\n      if (!match) {\n        out += re;\n        break;\n      }\n      out += re.substring(0, match.index);\n      re = re.substring(match.index + match[0].length);\n      if (match[0][0] === '\\\\' && match[1]) {\n        // Adjust the backreference.\n        out += '\\\\' + String(Number(match[1]) + offset);\n      } else {\n        out += match[0];\n        if (match[0] === '(') {\n          numCaptures++;\n        }\n      }\n    }\n    return out;\n  }).map(re => `(${re})`).join(joinWith);\n}\n\n/** @typedef {import('highlight.js').Mode} Mode */\n/** @typedef {import('highlight.js').ModeCallback} ModeCallback */\n\n// Common regexps\nconst MATCH_NOTHING_RE = /\\b\\B/;\nconst IDENT_RE = '[a-zA-Z]\\\\w*';\nconst UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\\\w*';\nconst NUMBER_RE = '\\\\b\\\\d+(\\\\.\\\\d+)?';\nconst C_NUMBER_RE = '(-?)(\\\\b0[xX][a-fA-F0-9]+|(\\\\b\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)([eE][-+]?\\\\d+)?)'; // 0x..., 0..., decimal, float\nconst BINARY_NUMBER_RE = '\\\\b(0b[01]+)'; // 0b...\nconst RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\\\*|\\\\*=|\\\\+|\\\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\\\?|\\\\[|\\\\{|\\\\(|\\\\^|\\\\^=|\\\\||\\\\|=|\\\\|\\\\||~';\n\n/**\n* @param { Partial<Mode> & {binary?: string | RegExp} } opts\n*/\nconst SHEBANG = (opts = {}) => {\n  const beginShebang = /^#![ ]*\\//;\n  if (opts.binary) {\n    opts.begin = concat(\n      beginShebang,\n      /.*\\b/,\n      opts.binary,\n      /\\b.*/);\n  }\n  return inherit$1({\n    scope: 'meta',\n    begin: beginShebang,\n    end: /$/,\n    relevance: 0,\n    /** @type {ModeCallback} */\n    \"on:begin\": (m, resp) => {\n      if (m.index !== 0) resp.ignoreMatch();\n    }\n  }, opts);\n};\n\n// Common modes\nconst BACKSLASH_ESCAPE = {\n  begin: '\\\\\\\\[\\\\s\\\\S]', relevance: 0\n};\nconst APOS_STRING_MODE = {\n  scope: 'string',\n  begin: '\\'',\n  end: '\\'',\n  illegal: '\\\\n',\n  contains: [BACKSLASH_ESCAPE]\n};\nconst QUOTE_STRING_MODE = {\n  scope: 'string',\n  begin: '\"',\n  end: '\"',\n  illegal: '\\\\n',\n  contains: [BACKSLASH_ESCAPE]\n};\nconst PHRASAL_WORDS_MODE = {\n  begin: /\\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\\b/\n};\n/**\n * Creates a comment mode\n *\n * @param {string | RegExp} begin\n * @param {string | RegExp} end\n * @param {Mode | {}} [modeOptions]\n * @returns {Partial<Mode>}\n */\nconst COMMENT = function(begin, end, modeOptions = {}) {\n  const mode = inherit$1(\n    {\n      scope: 'comment',\n      begin,\n      end,\n      contains: []\n    },\n    modeOptions\n  );\n  mode.contains.push({\n    scope: 'doctag',\n    // hack to avoid the space from being included. the space is necessary to\n    // match here to prevent the plain text rule below from gobbling up doctags\n    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',\n    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,\n    excludeBegin: true,\n    relevance: 0\n  });\n  const ENGLISH_WORD = either(\n    // list of common 1 and 2 letter words in English\n    \"I\",\n    \"a\",\n    \"is\",\n    \"so\",\n    \"us\",\n    \"to\",\n    \"at\",\n    \"if\",\n    \"in\",\n    \"it\",\n    \"on\",\n    // note: this is not an exhaustive list of contractions, just popular ones\n    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc\n    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.\n    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences\n  );\n  // looking like plain text, more likely to be a comment\n  mode.contains.push(\n    {\n      // TODO: how to include \", (, ) without breaking grammars that use these for\n      // comment delimiters?\n      // begin: /[ ]+([()\"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()\":]?([.][ ]|[ ]|\\))){3}/\n      // ---\n\n      // this tries to find sequences of 3 english words in a row (without any\n      // \"programming\" type syntax) this gives us a strong signal that we've\n      // TRULY found a comment - vs perhaps scanning with the wrong language.\n      // It's possible to find something that LOOKS like the start of the\n      // comment - but then if there is no readable text - good chance it is a\n      // false match and not a comment.\n      //\n      // for a visual example please see:\n      // https://github.com/highlightjs/highlight.js/issues/2827\n\n      begin: concat(\n        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */\n        '(',\n        ENGLISH_WORD,\n        /[.]?[:]?([.][ ]|[ ])/,\n        '){3}') // look for 3 words in a row\n    }\n  );\n  return mode;\n};\nconst C_LINE_COMMENT_MODE = COMMENT('//', '$');\nconst C_BLOCK_COMMENT_MODE = COMMENT('/\\\\*', '\\\\*/');\nconst HASH_COMMENT_MODE = COMMENT('#', '$');\nconst NUMBER_MODE = {\n  scope: 'number',\n  begin: NUMBER_RE,\n  relevance: 0\n};\nconst C_NUMBER_MODE = {\n  scope: 'number',\n  begin: C_NUMBER_RE,\n  relevance: 0\n};\nconst BINARY_NUMBER_MODE = {\n  scope: 'number',\n  begin: BINARY_NUMBER_RE,\n  relevance: 0\n};\nconst REGEXP_MODE = {\n  scope: \"regexp\",\n  begin: /\\/(?=[^/\\n]*\\/)/,\n  end: /\\/[gimuy]*/,\n  contains: [\n    BACKSLASH_ESCAPE,\n    {\n      begin: /\\[/,\n      end: /\\]/,\n      relevance: 0,\n      contains: [BACKSLASH_ESCAPE]\n    }\n  ]\n};\nconst TITLE_MODE = {\n  scope: 'title',\n  begin: IDENT_RE,\n  relevance: 0\n};\nconst UNDERSCORE_TITLE_MODE = {\n  scope: 'title',\n  begin: UNDERSCORE_IDENT_RE,\n  relevance: 0\n};\nconst METHOD_GUARD = {\n  // excludes method names from keyword processing\n  begin: '\\\\.\\\\s*' + UNDERSCORE_IDENT_RE,\n  relevance: 0\n};\n\n/**\n * Adds end same as begin mechanics to a mode\n *\n * Your mode must include at least a single () match group as that first match\n * group is what is used for comparison\n * @param {Partial<Mode>} mode\n */\nconst END_SAME_AS_BEGIN = function(mode) {\n  return Object.assign(mode,\n    {\n      /** @type {ModeCallback} */\n      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },\n      /** @type {ModeCallback} */\n      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }\n    });\n};\n\nvar MODES = /*#__PURE__*/Object.freeze({\n  __proto__: null,\n  APOS_STRING_MODE: APOS_STRING_MODE,\n  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,\n  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,\n  BINARY_NUMBER_RE: BINARY_NUMBER_RE,\n  COMMENT: COMMENT,\n  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,\n  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,\n  C_NUMBER_MODE: C_NUMBER_MODE,\n  C_NUMBER_RE: C_NUMBER_RE,\n  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN,\n  HASH_COMMENT_MODE: HASH_COMMENT_MODE,\n  IDENT_RE: IDENT_RE,\n  MATCH_NOTHING_RE: MATCH_NOTHING_RE,\n  METHOD_GUARD: METHOD_GUARD,\n  NUMBER_MODE: NUMBER_MODE,\n  NUMBER_RE: NUMBER_RE,\n  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,\n  QUOTE_STRING_MODE: QUOTE_STRING_MODE,\n  REGEXP_MODE: REGEXP_MODE,\n  RE_STARTERS_RE: RE_STARTERS_RE,\n  SHEBANG: SHEBANG,\n  TITLE_MODE: TITLE_MODE,\n  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,\n  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE\n});\n\n/**\n@typedef {import('highlight.js').CallbackResponse} CallbackResponse\n@typedef {import('highlight.js').CompilerExt} CompilerExt\n*/\n\n// Grammar extensions / plugins\n// See: https://github.com/highlightjs/highlight.js/issues/2833\n\n// Grammar extensions allow \"syntactic sugar\" to be added to the grammar modes\n// without requiring any underlying changes to the compiler internals.\n\n// `compileMatch` being the perfect small example of now allowing a grammar\n// author to write `match` when they desire to match a single expression rather\n// than being forced to use `begin`.  The extension then just moves `match` into\n// `begin` when it runs.  Ie, no features have been added, but we've just made\n// the experience of writing (and reading grammars) a little bit nicer.\n\n// ------\n\n// TODO: We need negative look-behind support to do this properly\n/**\n * Skip a match if it has a preceding dot\n *\n * This is used for `beginKeywords` to prevent matching expressions such as\n * `bob.keyword.do()`. The mode compiler automatically wires this up as a\n * special _internal_ 'on:begin' callback for modes with `beginKeywords`\n * @param {RegExpMatchArray} match\n * @param {CallbackResponse} response\n */\nfunction skipIfHasPrecedingDot(match, response) {\n  const before = match.input[match.index - 1];\n  if (before === \".\") {\n    response.ignoreMatch();\n  }\n}\n\n/**\n *\n * @type {CompilerExt}\n */\nfunction scopeClassName(mode, _parent) {\n  // eslint-disable-next-line no-undefined\n  if (mode.className !== undefined) {\n    mode.scope = mode.className;\n    delete mode.className;\n  }\n}\n\n/**\n * `beginKeywords` syntactic sugar\n * @type {CompilerExt}\n */\nfunction beginKeywords(mode, parent) {\n  if (!parent) return;\n  if (!mode.beginKeywords) return;\n\n  // for languages with keywords that include non-word characters checking for\n  // a word boundary is not sufficient, so instead we check for a word boundary\n  // or whitespace - this does no harm in any case since our keyword engine\n  // doesn't allow spaces in keywords anyways and we still check for the boundary\n  // first\n  mode.begin = '\\\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\\\.)(?=\\\\b|\\\\s)';\n  mode.__beforeBegin = skipIfHasPrecedingDot;\n  mode.keywords = mode.keywords || mode.beginKeywords;\n  delete mode.beginKeywords;\n\n  // prevents double relevance, the keywords themselves provide\n  // relevance, the mode doesn't need to double it\n  // eslint-disable-next-line no-undefined\n  if (mode.relevance === undefined) mode.relevance = 0;\n}\n\n/**\n * Allow `illegal` to contain an array of illegal values\n * @type {CompilerExt}\n */\nfunction compileIllegal(mode, _parent) {\n  if (!Array.isArray(mode.illegal)) return;\n\n  mode.illegal = either(...mode.illegal);\n}\n\n/**\n * `match` to match a single expression for readability\n * @type {CompilerExt}\n */\nfunction compileMatch(mode, _parent) {\n  if (!mode.match) return;\n  if (mode.begin || mode.end) throw new Error(\"begin & end are not supported with match\");\n\n  mode.begin = mode.match;\n  delete mode.match;\n}\n\n/**\n * provides the default 1 relevance to all modes\n * @type {CompilerExt}\n */\nfunction compileRelevance(mode, _parent) {\n  // eslint-disable-next-line no-undefined\n  if (mode.relevance === undefined) mode.relevance = 1;\n}\n\n// allow beforeMatch to act as a \"qualifier\" for the match\n// the full match begin must be [beforeMatch][begin]\nconst beforeMatchExt = (mode, parent) => {\n  if (!mode.beforeMatch) return;\n  // starts conflicts with endsParent which we need to make sure the child\n  // rule is not matched multiple times\n  if (mode.starts) throw new Error(\"beforeMatch cannot be used with starts\");\n\n  const originalMode = Object.assign({}, mode);\n  Object.keys(mode).forEach((key) => { delete mode[key]; });\n\n  mode.keywords = originalMode.keywords;\n  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));\n  mode.starts = {\n    relevance: 0,\n    contains: [\n      Object.assign(originalMode, { endsParent: true })\n    ]\n  };\n  mode.relevance = 0;\n\n  delete originalMode.beforeMatch;\n};\n\n// keywords that should have no default relevance value\nconst COMMON_KEYWORDS = [\n  'of',\n  'and',\n  'for',\n  'in',\n  'not',\n  'or',\n  'if',\n  'then',\n  'parent', // common variable name\n  'list', // common variable name\n  'value' // common variable name\n];\n\nconst DEFAULT_KEYWORD_SCOPE = \"keyword\";\n\n/**\n * Given raw keywords from a language definition, compile them.\n *\n * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords\n * @param {boolean} caseInsensitive\n */\nfunction compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {\n  /** @type {import(\"highlight.js/private\").KeywordDict} */\n  const compiledKeywords = Object.create(null);\n\n  // input can be a string of keywords, an array of keywords, or a object with\n  // named keys representing scopeName (which can then point to a string or array)\n  if (typeof rawKeywords === 'string') {\n    compileList(scopeName, rawKeywords.split(\" \"));\n  } else if (Array.isArray(rawKeywords)) {\n    compileList(scopeName, rawKeywords);\n  } else {\n    Object.keys(rawKeywords).forEach(function(scopeName) {\n      // collapse all our objects back into the parent object\n      Object.assign(\n        compiledKeywords,\n        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)\n      );\n    });\n  }\n  return compiledKeywords;\n\n  // ---\n\n  /**\n   * Compiles an individual list of keywords\n   *\n   * Ex: \"for if when while|5\"\n   *\n   * @param {string} scopeName\n   * @param {Array<string>} keywordList\n   */\n  function compileList(scopeName, keywordList) {\n    if (caseInsensitive) {\n      keywordList = keywordList.map(x => x.toLowerCase());\n    }\n    keywordList.forEach(function(keyword) {\n      const pair = keyword.split('|');\n      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];\n    });\n  }\n}\n\n/**\n * Returns the proper score for a given keyword\n *\n * Also takes into account comment keywords, which will be scored 0 UNLESS\n * another score has been manually assigned.\n * @param {string} keyword\n * @param {string} [providedScore]\n */\nfunction scoreForKeyword(keyword, providedScore) {\n  // manual scores always win over common keywords\n  // so you can force a score of 1 if you really insist\n  if (providedScore) {\n    return Number(providedScore);\n  }\n\n  return commonKeyword(keyword) ? 0 : 1;\n}\n\n/**\n * Determines if a given keyword is common or not\n *\n * @param {string} keyword */\nfunction commonKeyword(keyword) {\n  return COMMON_KEYWORDS.includes(keyword.toLowerCase());\n}\n\n/*\n\nFor the reasoning behind this please see:\nhttps://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419\n\n*/\n\n/**\n * @type {Record<string, boolean>}\n */\nconst seenDeprecations = {};\n\n/**\n * @param {string} message\n */\nconst error = (message) => {\n  console.error(message);\n};\n\n/**\n * @param {string} message\n * @param {any} args\n */\nconst warn = (message, ...args) => {\n  console.log(`WARN: ${message}`, ...args);\n};\n\n/**\n * @param {string} version\n * @param {string} message\n */\nconst deprecated = (version, message) => {\n  if (seenDeprecations[`${version}/${message}`]) return;\n\n  console.log(`Deprecated as of ${version}. ${message}`);\n  seenDeprecations[`${version}/${message}`] = true;\n};\n\n/* eslint-disable no-throw-literal */\n\n/**\n@typedef {import('highlight.js').CompiledMode} CompiledMode\n*/\n\nconst MultiClassError = new Error();\n\n/**\n * Renumbers labeled scope names to account for additional inner match\n * groups that otherwise would break everything.\n *\n * Lets say we 3 match scopes:\n *\n *   { 1 => ..., 2 => ..., 3 => ... }\n *\n * So what we need is a clean match like this:\n *\n *   (a)(b)(c) => [ \"a\", \"b\", \"c\" ]\n *\n * But this falls apart with inner match groups:\n *\n * (a)(((b)))(c) => [\"a\", \"b\", \"b\", \"b\", \"c\" ]\n *\n * Our scopes are now \"out of alignment\" and we're repeating `b` 3 times.\n * What needs to happen is the numbers are remapped:\n *\n *   { 1 => ..., 2 => ..., 5 => ... }\n *\n * We also need to know that the ONLY groups that should be output\n * are 1, 2, and 5.  This function handles this behavior.\n *\n * @param {CompiledMode} mode\n * @param {Array<RegExp | string>} regexes\n * @param {{key: \"beginScope\"|\"endScope\"}} opts\n */\nfunction remapScopeNames(mode, regexes, { key }) {\n  let offset = 0;\n  const scopeNames = mode[key];\n  /** @type Record<number,boolean> */\n  const emit = {};\n  /** @type Record<number,string> */\n  const positions = {};\n\n  for (let i = 1; i <= regexes.length; i++) {\n    positions[i + offset] = scopeNames[i];\n    emit[i + offset] = true;\n    offset += countMatchGroups(regexes[i - 1]);\n  }\n  // we use _emit to keep track of which match groups are \"top-level\" to avoid double\n  // output from inside match groups\n  mode[key] = positions;\n  mode[key]._emit = emit;\n  mode[key]._multi = true;\n}\n\n/**\n * @param {CompiledMode} mode\n */\nfunction beginMultiClass(mode) {\n  if (!Array.isArray(mode.begin)) return;\n\n  if (mode.skip || mode.excludeBegin || mode.returnBegin) {\n    error(\"skip, excludeBegin, returnBegin not compatible with beginScope: {}\");\n    throw MultiClassError;\n  }\n\n  if (typeof mode.beginScope !== \"object\" || mode.beginScope === null) {\n    error(\"beginScope must be object\");\n    throw MultiClassError;\n  }\n\n  remapScopeNames(mode, mode.begin, { key: \"beginScope\" });\n  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: \"\" });\n}\n\n/**\n * @param {CompiledMode} mode\n */\nfunction endMultiClass(mode) {\n  if (!Array.isArray(mode.end)) return;\n\n  if (mode.skip || mode.excludeEnd || mode.returnEnd) {\n    error(\"skip, excludeEnd, returnEnd not compatible with endScope: {}\");\n    throw MultiClassError;\n  }\n\n  if (typeof mode.endScope !== \"object\" || mode.endScope === null) {\n    error(\"endScope must be object\");\n    throw MultiClassError;\n  }\n\n  remapScopeNames(mode, mode.end, { key: \"endScope\" });\n  mode.end = _rewriteBackreferences(mode.end, { joinWith: \"\" });\n}\n\n/**\n * this exists only to allow `scope: {}` to be used beside `match:`\n * Otherwise `beginScope` would necessary and that would look weird\n\n  {\n    match: [ /def/, /\\w+/ ]\n    scope: { 1: \"keyword\" , 2: \"title\" }\n  }\n\n * @param {CompiledMode} mode\n */\nfunction scopeSugar(mode) {\n  if (mode.scope && typeof mode.scope === \"object\" && mode.scope !== null) {\n    mode.beginScope = mode.scope;\n    delete mode.scope;\n  }\n}\n\n/**\n * @param {CompiledMode} mode\n */\nfunction MultiClass(mode) {\n  scopeSugar(mode);\n\n  if (typeof mode.beginScope === \"string\") {\n    mode.beginScope = { _wrap: mode.beginScope };\n  }\n  if (typeof mode.endScope === \"string\") {\n    mode.endScope = { _wrap: mode.endScope };\n  }\n\n  beginMultiClass(mode);\n  endMultiClass(mode);\n}\n\n/**\n@typedef {import('highlight.js').Mode} Mode\n@typedef {import('highlight.js').CompiledMode} CompiledMode\n@typedef {import('highlight.js').Language} Language\n@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin\n@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage\n*/\n\n// compilation\n\n/**\n * Compiles a language definition result\n *\n * Given the raw result of a language definition (Language), compiles this so\n * that it is ready for highlighting code.\n * @param {Language} language\n * @returns {CompiledLanguage}\n */\nfunction compileLanguage(language) {\n  /**\n   * Builds a regex with the case sensitivity of the current language\n   *\n   * @param {RegExp | string} value\n   * @param {boolean} [global]\n   */\n  function langRe(value, global) {\n    return new RegExp(\n      source(value),\n      'm'\n      + (language.case_insensitive ? 'i' : '')\n      + (language.unicodeRegex ? 'u' : '')\n      + (global ? 'g' : '')\n    );\n  }\n\n  /**\n    Stores multiple regular expressions and allows you to quickly search for\n    them all in a string simultaneously - returning the first match.  It does\n    this by creating a huge (a|b|c) regex - each individual item wrapped with ()\n    and joined by `|` - using match groups to track position.  When a match is\n    found checking which position in the array has content allows us to figure\n    out which of the original regexes / match groups triggered the match.\n\n    The match object itself (the result of `Regex.exec`) is returned but also\n    enhanced by merging in any meta-data that was registered with the regex.\n    This is how we keep track of which mode matched, and what type of rule\n    (`illegal`, `begin`, end, etc).\n  */\n  class MultiRegex {\n    constructor() {\n      this.matchIndexes = {};\n      // @ts-ignore\n      this.regexes = [];\n      this.matchAt = 1;\n      this.position = 0;\n    }\n\n    // @ts-ignore\n    addRule(re, opts) {\n      opts.position = this.position++;\n      // @ts-ignore\n      this.matchIndexes[this.matchAt] = opts;\n      this.regexes.push([opts, re]);\n      this.matchAt += countMatchGroups(re) + 1;\n    }\n\n    compile() {\n      if (this.regexes.length === 0) {\n        // avoids the need to check length every time exec is called\n        // @ts-ignore\n        this.exec = () => null;\n      }\n      const terminators = this.regexes.map(el => el[1]);\n      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);\n      this.lastIndex = 0;\n    }\n\n    /** @param {string} s */\n    exec(s) {\n      this.matcherRe.lastIndex = this.lastIndex;\n      const match = this.matcherRe.exec(s);\n      if (!match) { return null; }\n\n      // eslint-disable-next-line no-undefined\n      const i = match.findIndex((el, i) => i > 0 && el !== undefined);\n      // @ts-ignore\n      const matchData = this.matchIndexes[i];\n      // trim off any earlier non-relevant match groups (ie, the other regex\n      // match groups that make up the multi-matcher)\n      match.splice(0, i);\n\n      return Object.assign(match, matchData);\n    }\n  }\n\n  /*\n    Created to solve the key deficiently with MultiRegex - there is no way to\n    test for multiple matches at a single location.  Why would we need to do\n    that?  In the future a more dynamic engine will allow certain matches to be\n    ignored.  An example: if we matched say the 3rd regex in a large group but\n    decided to ignore it - we'd need to started testing again at the 4th\n    regex... but MultiRegex itself gives us no real way to do that.\n\n    So what this class creates MultiRegexs on the fly for whatever search\n    position they are needed.\n\n    NOTE: These additional MultiRegex objects are created dynamically.  For most\n    grammars most of the time we will never actually need anything more than the\n    first MultiRegex - so this shouldn't have too much overhead.\n\n    Say this is our search group, and we match regex3, but wish to ignore it.\n\n      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0\n\n    What we need is a new MultiRegex that only includes the remaining\n    possibilities:\n\n      regex4 | regex5                               ' ie, startAt = 3\n\n    This class wraps all that complexity up in a simple API... `startAt` decides\n    where in the array of expressions to start doing the matching. It\n    auto-increments, so if a match is found at position 2, then startAt will be\n    set to 3.  If the end is reached startAt will return to 0.\n\n    MOST of the time the parser will be setting startAt manually to 0.\n  */\n  class ResumableMultiRegex {\n    constructor() {\n      // @ts-ignore\n      this.rules = [];\n      // @ts-ignore\n      this.multiRegexes = [];\n      this.count = 0;\n\n      this.lastIndex = 0;\n      this.regexIndex = 0;\n    }\n\n    // @ts-ignore\n    getMatcher(index) {\n      if (this.multiRegexes[index]) return this.multiRegexes[index];\n\n      const matcher = new MultiRegex();\n      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));\n      matcher.compile();\n      this.multiRegexes[index] = matcher;\n      return matcher;\n    }\n\n    resumingScanAtSamePosition() {\n      return this.regexIndex !== 0;\n    }\n\n    considerAll() {\n      this.regexIndex = 0;\n    }\n\n    // @ts-ignore\n    addRule(re, opts) {\n      this.rules.push([re, opts]);\n      if (opts.type === \"begin\") this.count++;\n    }\n\n    /** @param {string} s */\n    exec(s) {\n      const m = this.getMatcher(this.regexIndex);\n      m.lastIndex = this.lastIndex;\n      let result = m.exec(s);\n\n      // The following is because we have no easy way to say \"resume scanning at the\n      // existing position but also skip the current rule ONLY\". What happens is\n      // all prior rules are also skipped which can result in matching the wrong\n      // thing. Example of matching \"booger\":\n\n      // our matcher is [string, \"booger\", number]\n      //\n      // ....booger....\n\n      // if \"booger\" is ignored then we'd really need a regex to scan from the\n      // SAME position for only: [string, number] but ignoring \"booger\" (if it\n      // was the first match), a simple resume would scan ahead who knows how\n      // far looking only for \"number\", ignoring potential string matches (or\n      // future \"booger\" matches that might be valid.)\n\n      // So what we do: We execute two matchers, one resuming at the same\n      // position, but the second full matcher starting at the position after:\n\n      //     /--- resume first regex match here (for [number])\n      //     |/---- full match here for [string, \"booger\", number]\n      //     vv\n      // ....booger....\n\n      // Which ever results in a match first is then used. So this 3-4 step\n      // process essentially allows us to say \"match at this position, excluding\n      // a prior rule that was ignored\".\n      //\n      // 1. Match \"booger\" first, ignore. Also proves that [string] does non match.\n      // 2. Resume matching for [number]\n      // 3. Match at index + 1 for [string, \"booger\", number]\n      // 4. If #2 and #3 result in matches, which came first?\n      if (this.resumingScanAtSamePosition()) {\n        if (result && result.index === this.lastIndex) ; else { // use the second matcher result\n          const m2 = this.getMatcher(0);\n          m2.lastIndex = this.lastIndex + 1;\n          result = m2.exec(s);\n        }\n      }\n\n      if (result) {\n        this.regexIndex += result.position + 1;\n        if (this.regexIndex === this.count) {\n          // wrap-around to considering all matches again\n          this.considerAll();\n        }\n      }\n\n      return result;\n    }\n  }\n\n  /**\n   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk\n   * the content and find matches.\n   *\n   * @param {CompiledMode} mode\n   * @returns {ResumableMultiRegex}\n   */\n  function buildModeRegex(mode) {\n    const mm = new ResumableMultiRegex();\n\n    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: \"begin\" }));\n\n    if (mode.terminatorEnd) {\n      mm.addRule(mode.terminatorEnd, { type: \"end\" });\n    }\n    if (mode.illegal) {\n      mm.addRule(mode.illegal, { type: \"illegal\" });\n    }\n\n    return mm;\n  }\n\n  /** skip vs abort vs ignore\n   *\n   * @skip   - The mode is still entered and exited normally (and contains rules apply),\n   *           but all content is held and added to the parent buffer rather than being\n   *           output when the mode ends.  Mostly used with `sublanguage` to build up\n   *           a single large buffer than can be parsed by sublanguage.\n   *\n   *             - The mode begin ands ends normally.\n   *             - Content matched is added to the parent mode buffer.\n   *             - The parser cursor is moved forward normally.\n   *\n   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it\n   *           never matched) but DOES NOT continue to match subsequent `contains`\n   *           modes.  Abort is bad/suboptimal because it can result in modes\n   *           farther down not getting applied because an earlier rule eats the\n   *           content but then aborts.\n   *\n   *             - The mode does not begin.\n   *             - Content matched by `begin` is added to the mode buffer.\n   *             - The parser cursor is moved forward accordingly.\n   *\n   * @ignore - Ignores the mode (as if it never matched) and continues to match any\n   *           subsequent `contains` modes.  Ignore isn't technically possible with\n   *           the current parser implementation.\n   *\n   *             - The mode does not begin.\n   *             - Content matched by `begin` is ignored.\n   *             - The parser cursor is not moved forward.\n   */\n\n  /**\n   * Compiles an individual mode\n   *\n   * This can raise an error if the mode contains certain detectable known logic\n   * issues.\n   * @param {Mode} mode\n   * @param {CompiledMode | null} [parent]\n   * @returns {CompiledMode | never}\n   */\n  function compileMode(mode, parent) {\n    const cmode = /** @type CompiledMode */ (mode);\n    if (mode.isCompiled) return cmode;\n\n    [\n      scopeClassName,\n      // do this early so compiler extensions generally don't have to worry about\n      // the distinction between match/begin\n      compileMatch,\n      MultiClass,\n      beforeMatchExt\n    ].forEach(ext => ext(mode, parent));\n\n    language.compilerExtensions.forEach(ext => ext(mode, parent));\n\n    // __beforeBegin is considered private API, internal use only\n    mode.__beforeBegin = null;\n\n    [\n      beginKeywords,\n      // do this later so compiler extensions that come earlier have access to the\n      // raw array if they wanted to perhaps manipulate it, etc.\n      compileIllegal,\n      // default to 1 relevance if not specified\n      compileRelevance\n    ].forEach(ext => ext(mode, parent));\n\n    mode.isCompiled = true;\n\n    let keywordPattern = null;\n    if (typeof mode.keywords === \"object\" && mode.keywords.$pattern) {\n      // we need a copy because keywords might be compiled multiple times\n      // so we can't go deleting $pattern from the original on the first\n      // pass\n      mode.keywords = Object.assign({}, mode.keywords);\n      keywordPattern = mode.keywords.$pattern;\n      delete mode.keywords.$pattern;\n    }\n    keywordPattern = keywordPattern || /\\w+/;\n\n    if (mode.keywords) {\n      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);\n    }\n\n    cmode.keywordPatternRe = langRe(keywordPattern, true);\n\n    if (parent) {\n      if (!mode.begin) mode.begin = /\\B|\\b/;\n      cmode.beginRe = langRe(cmode.begin);\n      if (!mode.end && !mode.endsWithParent) mode.end = /\\B|\\b/;\n      if (mode.end) cmode.endRe = langRe(cmode.end);\n      cmode.terminatorEnd = source(cmode.end) || '';\n      if (mode.endsWithParent && parent.terminatorEnd) {\n        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;\n      }\n    }\n    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));\n    if (!mode.contains) mode.contains = [];\n\n    mode.contains = [].concat(...mode.contains.map(function(c) {\n      return expandOrCloneMode(c === 'self' ? mode : c);\n    }));\n    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });\n\n    if (mode.starts) {\n      compileMode(mode.starts, parent);\n    }\n\n    cmode.matcher = buildModeRegex(cmode);\n    return cmode;\n  }\n\n  if (!language.compilerExtensions) language.compilerExtensions = [];\n\n  // self is not valid at the top-level\n  if (language.contains && language.contains.includes('self')) {\n    throw new Error(\"ERR: contains `self` is not supported at the top-level of a language.  See documentation.\");\n  }\n\n  // we need a null object, which inherit will guarantee\n  language.classNameAliases = inherit$1(language.classNameAliases || {});\n\n  return compileMode(/** @type Mode */ (language));\n}\n\n/**\n * Determines if a mode has a dependency on it's parent or not\n *\n * If a mode does have a parent dependency then often we need to clone it if\n * it's used in multiple places so that each copy points to the correct parent,\n * where-as modes without a parent can often safely be re-used at the bottom of\n * a mode chain.\n *\n * @param {Mode | null} mode\n * @returns {boolean} - is there a dependency on the parent?\n * */\nfunction dependencyOnParent(mode) {\n  if (!mode) return false;\n\n  return mode.endsWithParent || dependencyOnParent(mode.starts);\n}\n\n/**\n * Expands a mode or clones it if necessary\n *\n * This is necessary for modes with parental dependenceis (see notes on\n * `dependencyOnParent`) and for nodes that have `variants` - which must then be\n * exploded into their own individual modes at compile time.\n *\n * @param {Mode} mode\n * @returns {Mode | Mode[]}\n * */\nfunction expandOrCloneMode(mode) {\n  if (mode.variants && !mode.cachedVariants) {\n    mode.cachedVariants = mode.variants.map(function(variant) {\n      return inherit$1(mode, { variants: null }, variant);\n    });\n  }\n\n  // EXPAND\n  // if we have variants then essentially \"replace\" the mode with the variants\n  // this happens in compileMode, where this function is called from\n  if (mode.cachedVariants) {\n    return mode.cachedVariants;\n  }\n\n  // CLONE\n  // if we have dependencies on parents then we need a unique\n  // instance of ourselves, so we can be reused with many\n  // different parents without issue\n  if (dependencyOnParent(mode)) {\n    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });\n  }\n\n  if (Object.isFrozen(mode)) {\n    return inherit$1(mode);\n  }\n\n  // no special dependency issues, just return ourselves\n  return mode;\n}\n\nvar version = \"11.9.0\";\n\nclass HTMLInjectionError extends Error {\n  constructor(reason, html) {\n    super(reason);\n    this.name = \"HTMLInjectionError\";\n    this.html = html;\n  }\n}\n\n/*\nSyntax highlighting with language autodetection.\nhttps://highlightjs.org/\n*/\n\n\n\n/**\n@typedef {import('highlight.js').Mode} Mode\n@typedef {import('highlight.js').CompiledMode} CompiledMode\n@typedef {import('highlight.js').CompiledScope} CompiledScope\n@typedef {import('highlight.js').Language} Language\n@typedef {import('highlight.js').HLJSApi} HLJSApi\n@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin\n@typedef {import('highlight.js').PluginEvent} PluginEvent\n@typedef {import('highlight.js').HLJSOptions} HLJSOptions\n@typedef {import('highlight.js').LanguageFn} LanguageFn\n@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement\n@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext\n@typedef {import('highlight.js/private').MatchType} MatchType\n@typedef {import('highlight.js/private').KeywordData} KeywordData\n@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch\n@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError\n@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult\n@typedef {import('highlight.js').HighlightOptions} HighlightOptions\n@typedef {import('highlight.js').HighlightResult} HighlightResult\n*/\n\n\nconst escape = escapeHTML;\nconst inherit = inherit$1;\nconst NO_MATCH = Symbol(\"nomatch\");\nconst MAX_KEYWORD_HITS = 7;\n\n/**\n * @param {any} hljs - object that is extended (legacy)\n * @returns {HLJSApi}\n */\nconst HLJS = function(hljs) {\n  // Global internal variables used within the highlight.js library.\n  /** @type {Record<string, Language>} */\n  const languages = Object.create(null);\n  /** @type {Record<string, string>} */\n  const aliases = Object.create(null);\n  /** @type {HLJSPlugin[]} */\n  const plugins = [];\n\n  // safe/production mode - swallows more errors, tries to keep running\n  // even if a single syntax or parse hits a fatal error\n  let SAFE_MODE = true;\n  const LANGUAGE_NOT_FOUND = \"Could not find the language '{}', did you forget to load/include a language module?\";\n  /** @type {Language} */\n  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };\n\n  // Global options used when within external APIs. This is modified when\n  // calling the `hljs.configure` function.\n  /** @type HLJSOptions */\n  let options = {\n    ignoreUnescapedHTML: false,\n    throwUnescapedHTML: false,\n    noHighlightRe: /^(no-?highlight)$/i,\n    languageDetectRe: /\\blang(?:uage)?-([\\w-]+)\\b/i,\n    classPrefix: 'hljs-',\n    cssSelector: 'pre code',\n    languages: null,\n    // beta configuration options, subject to change, welcome to discuss\n    // https://github.com/highlightjs/highlight.js/issues/1086\n    __emitter: TokenTreeEmitter\n  };\n\n  /* Utility functions */\n\n  /**\n   * Tests a language name to see if highlighting should be skipped\n   * @param {string} languageName\n   */\n  function shouldNotHighlight(languageName) {\n    return options.noHighlightRe.test(languageName);\n  }\n\n  /**\n   * @param {HighlightedHTMLElement} block - the HTML element to determine language for\n   */\n  function blockLanguage(block) {\n    let classes = block.className + ' ';\n\n    classes += block.parentNode ? block.parentNode.className : '';\n\n    // language-* takes precedence over non-prefixed class names.\n    const match = options.languageDetectRe.exec(classes);\n    if (match) {\n      const language = getLanguage(match[1]);\n      if (!language) {\n        warn(LANGUAGE_NOT_FOUND.replace(\"{}\", match[1]));\n        warn(\"Falling back to no-highlight mode for this block.\", block);\n      }\n      return language ? match[1] : 'no-highlight';\n    }\n\n    return classes\n      .split(/\\s+/)\n      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));\n  }\n\n  /**\n   * Core highlighting function.\n   *\n   * OLD API\n   * highlight(lang, code, ignoreIllegals, continuation)\n   *\n   * NEW API\n   * highlight(code, {lang, ignoreIllegals})\n   *\n   * @param {string} codeOrLanguageName - the language to use for highlighting\n   * @param {string | HighlightOptions} optionsOrCode - the code to highlight\n   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail\n   *\n   * @returns {HighlightResult} Result - an object that represents the result\n   * @property {string} language - the language name\n   * @property {number} relevance - the relevance score\n   * @property {string} value - the highlighted HTML code\n   * @property {string} code - the original raw code\n   * @property {CompiledMode} top - top of the current mode stack\n   * @property {boolean} illegal - indicates whether any illegal matches were found\n  */\n  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {\n    let code = \"\";\n    let languageName = \"\";\n    if (typeof optionsOrCode === \"object\") {\n      code = codeOrLanguageName;\n      ignoreIllegals = optionsOrCode.ignoreIllegals;\n      languageName = optionsOrCode.language;\n    } else {\n      // old API\n      deprecated(\"10.7.0\", \"highlight(lang, code, ...args) has been deprecated.\");\n      deprecated(\"10.7.0\", \"Please use highlight(code, options) instead.\\nhttps://github.com/highlightjs/highlight.js/issues/2277\");\n      languageName = codeOrLanguageName;\n      code = optionsOrCode;\n    }\n\n    // https://github.com/highlightjs/highlight.js/issues/3149\n    // eslint-disable-next-line no-undefined\n    if (ignoreIllegals === undefined) { ignoreIllegals = true; }\n\n    /** @type {BeforeHighlightContext} */\n    const context = {\n      code,\n      language: languageName\n    };\n    // the plugin can change the desired language or the code to be highlighted\n    // just be changing the object it was passed\n    fire(\"before:highlight\", context);\n\n    // a before plugin can usurp the result completely by providing it's own\n    // in which case we don't even need to call highlight\n    const result = context.result\n      ? context.result\n      : _highlight(context.language, context.code, ignoreIllegals);\n\n    result.code = context.code;\n    // the plugin can change anything in result to suite it\n    fire(\"after:highlight\", result);\n\n    return result;\n  }\n\n  /**\n   * private highlight that's used internally and does not fire callbacks\n   *\n   * @param {string} languageName - the language to use for highlighting\n   * @param {string} codeToHighlight - the code to highlight\n   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail\n   * @param {CompiledMode?} [continuation] - current continuation mode, if any\n   * @returns {HighlightResult} - result of the highlight operation\n  */\n  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {\n    const keywordHits = Object.create(null);\n\n    /**\n     * Return keyword data if a match is a keyword\n     * @param {CompiledMode} mode - current mode\n     * @param {string} matchText - the textual match\n     * @returns {KeywordData | false}\n     */\n    function keywordData(mode, matchText) {\n      return mode.keywords[matchText];\n    }\n\n    function processKeywords() {\n      if (!top.keywords) {\n        emitter.addText(modeBuffer);\n        return;\n      }\n\n      let lastIndex = 0;\n      top.keywordPatternRe.lastIndex = 0;\n      let match = top.keywordPatternRe.exec(modeBuffer);\n      let buf = \"\";\n\n      while (match) {\n        buf += modeBuffer.substring(lastIndex, match.index);\n        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];\n        const data = keywordData(top, word);\n        if (data) {\n          const [kind, keywordRelevance] = data;\n          emitter.addText(buf);\n          buf = \"\";\n\n          keywordHits[word] = (keywordHits[word] || 0) + 1;\n          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;\n          if (kind.startsWith(\"_\")) {\n            // _ implied for relevance only, do not highlight\n            // by applying a class name\n            buf += match[0];\n          } else {\n            const cssClass = language.classNameAliases[kind] || kind;\n            emitKeyword(match[0], cssClass);\n          }\n        } else {\n          buf += match[0];\n        }\n        lastIndex = top.keywordPatternRe.lastIndex;\n        match = top.keywordPatternRe.exec(modeBuffer);\n      }\n      buf += modeBuffer.substring(lastIndex);\n      emitter.addText(buf);\n    }\n\n    function processSubLanguage() {\n      if (modeBuffer === \"\") return;\n      /** @type HighlightResult */\n      let result = null;\n\n      if (typeof top.subLanguage === 'string') {\n        if (!languages[top.subLanguage]) {\n          emitter.addText(modeBuffer);\n          return;\n        }\n        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);\n        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);\n      } else {\n        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);\n      }\n\n      // Counting embedded language score towards the host language may be disabled\n      // with zeroing the containing mode relevance. Use case in point is Markdown that\n      // allows XML everywhere and makes every XML snippet to have a much larger Markdown\n      // score.\n      if (top.relevance > 0) {\n        relevance += result.relevance;\n      }\n      emitter.__addSublanguage(result._emitter, result.language);\n    }\n\n    function processBuffer() {\n      if (top.subLanguage != null) {\n        processSubLanguage();\n      } else {\n        processKeywords();\n      }\n      modeBuffer = '';\n    }\n\n    /**\n     * @param {string} text\n     * @param {string} scope\n     */\n    function emitKeyword(keyword, scope) {\n      if (keyword === \"\") return;\n\n      emitter.startScope(scope);\n      emitter.addText(keyword);\n      emitter.endScope();\n    }\n\n    /**\n     * @param {CompiledScope} scope\n     * @param {RegExpMatchArray} match\n     */\n    function emitMultiClass(scope, match) {\n      let i = 1;\n      const max = match.length - 1;\n      while (i <= max) {\n        if (!scope._emit[i]) { i++; continue; }\n        const klass = language.classNameAliases[scope[i]] || scope[i];\n        const text = match[i];\n        if (klass) {\n          emitKeyword(text, klass);\n        } else {\n          modeBuffer = text;\n          processKeywords();\n          modeBuffer = \"\";\n        }\n        i++;\n      }\n    }\n\n    /**\n     * @param {CompiledMode} mode - new mode to start\n     * @param {RegExpMatchArray} match\n     */\n    function startNewMode(mode, match) {\n      if (mode.scope && typeof mode.scope === \"string\") {\n        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);\n      }\n      if (mode.beginScope) {\n        // beginScope just wraps the begin match itself in a scope\n        if (mode.beginScope._wrap) {\n          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);\n          modeBuffer = \"\";\n        } else if (mode.beginScope._multi) {\n          // at this point modeBuffer should just be the match\n          emitMultiClass(mode.beginScope, match);\n          modeBuffer = \"\";\n        }\n      }\n\n      top = Object.create(mode, { parent: { value: top } });\n      return top;\n    }\n\n    /**\n     * @param {CompiledMode } mode - the mode to potentially end\n     * @param {RegExpMatchArray} match - the latest match\n     * @param {string} matchPlusRemainder - match plus remainder of content\n     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode\n     */\n    function endOfMode(mode, match, matchPlusRemainder) {\n      let matched = startsWith(mode.endRe, matchPlusRemainder);\n\n      if (matched) {\n        if (mode[\"on:end\"]) {\n          const resp = new Response(mode);\n          mode[\"on:end\"](match, resp);\n          if (resp.isMatchIgnored) matched = false;\n        }\n\n        if (matched) {\n          while (mode.endsParent && mode.parent) {\n            mode = mode.parent;\n          }\n          return mode;\n        }\n      }\n      // even if on:end fires an `ignore` it's still possible\n      // that we might trigger the end node because of a parent mode\n      if (mode.endsWithParent) {\n        return endOfMode(mode.parent, match, matchPlusRemainder);\n      }\n    }\n\n    /**\n     * Handle matching but then ignoring a sequence of text\n     *\n     * @param {string} lexeme - string containing full match text\n     */\n    function doIgnore(lexeme) {\n      if (top.matcher.regexIndex === 0) {\n        // no more regexes to potentially match here, so we move the cursor forward one\n        // space\n        modeBuffer += lexeme[0];\n        return 1;\n      } else {\n        // no need to move the cursor, we still have additional regexes to try and\n        // match at this very spot\n        resumeScanAtSamePosition = true;\n        return 0;\n      }\n    }\n\n    /**\n     * Handle the start of a new potential mode match\n     *\n     * @param {EnhancedMatch} match - the current match\n     * @returns {number} how far to advance the parse cursor\n     */\n    function doBeginMatch(match) {\n      const lexeme = match[0];\n      const newMode = match.rule;\n\n      const resp = new Response(newMode);\n      // first internal before callbacks, then the public ones\n      const beforeCallbacks = [newMode.__beforeBegin, newMode[\"on:begin\"]];\n      for (const cb of beforeCallbacks) {\n        if (!cb) continue;\n        cb(match, resp);\n        if (resp.isMatchIgnored) return doIgnore(lexeme);\n      }\n\n      if (newMode.skip) {\n        modeBuffer += lexeme;\n      } else {\n        if (newMode.excludeBegin) {\n          modeBuffer += lexeme;\n        }\n        processBuffer();\n        if (!newMode.returnBegin && !newMode.excludeBegin) {\n          modeBuffer = lexeme;\n        }\n      }\n      startNewMode(newMode, match);\n      return newMode.returnBegin ? 0 : lexeme.length;\n    }\n\n    /**\n     * Handle the potential end of mode\n     *\n     * @param {RegExpMatchArray} match - the current match\n     */\n    function doEndMatch(match) {\n      const lexeme = match[0];\n      const matchPlusRemainder = codeToHighlight.substring(match.index);\n\n      const endMode = endOfMode(top, match, matchPlusRemainder);\n      if (!endMode) { return NO_MATCH; }\n\n      const origin = top;\n      if (top.endScope && top.endScope._wrap) {\n        processBuffer();\n        emitKeyword(lexeme, top.endScope._wrap);\n      } else if (top.endScope && top.endScope._multi) {\n        processBuffer();\n        emitMultiClass(top.endScope, match);\n      } else if (origin.skip) {\n        modeBuffer += lexeme;\n      } else {\n        if (!(origin.returnEnd || origin.excludeEnd)) {\n          modeBuffer += lexeme;\n        }\n        processBuffer();\n        if (origin.excludeEnd) {\n          modeBuffer = lexeme;\n        }\n      }\n      do {\n        if (top.scope) {\n          emitter.closeNode();\n        }\n        if (!top.skip && !top.subLanguage) {\n          relevance += top.relevance;\n        }\n        top = top.parent;\n      } while (top !== endMode.parent);\n      if (endMode.starts) {\n        startNewMode(endMode.starts, match);\n      }\n      return origin.returnEnd ? 0 : lexeme.length;\n    }\n\n    function processContinuations() {\n      const list = [];\n      for (let current = top; current !== language; current = current.parent) {\n        if (current.scope) {\n          list.unshift(current.scope);\n        }\n      }\n      list.forEach(item => emitter.openNode(item));\n    }\n\n    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */\n    let lastMatch = {};\n\n    /**\n     *  Process an individual match\n     *\n     * @param {string} textBeforeMatch - text preceding the match (since the last match)\n     * @param {EnhancedMatch} [match] - the match itself\n     */\n    function processLexeme(textBeforeMatch, match) {\n      const lexeme = match && match[0];\n\n      // add non-matched text to the current mode buffer\n      modeBuffer += textBeforeMatch;\n\n      if (lexeme == null) {\n        processBuffer();\n        return 0;\n      }\n\n      // we've found a 0 width match and we're stuck, so we need to advance\n      // this happens when we have badly behaved rules that have optional matchers to the degree that\n      // sometimes they can end up matching nothing at all\n      // Ref: https://github.com/highlightjs/highlight.js/issues/2140\n      if (lastMatch.type === \"begin\" && match.type === \"end\" && lastMatch.index === match.index && lexeme === \"\") {\n        // spit the \"skipped\" character that our regex choked on back into the output sequence\n        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);\n        if (!SAFE_MODE) {\n          /** @type {AnnotatedError} */\n          const err = new Error(`0 width match regex (${languageName})`);\n          err.languageName = languageName;\n          err.badRule = lastMatch.rule;\n          throw err;\n        }\n        return 1;\n      }\n      lastMatch = match;\n\n      if (match.type === \"begin\") {\n        return doBeginMatch(match);\n      } else if (match.type === \"illegal\" && !ignoreIllegals) {\n        // illegal match, we do not continue processing\n        /** @type {AnnotatedError} */\n        const err = new Error('Illegal lexeme \"' + lexeme + '\" for mode \"' + (top.scope || '<unnamed>') + '\"');\n        err.mode = top;\n        throw err;\n      } else if (match.type === \"end\") {\n        const processed = doEndMatch(match);\n        if (processed !== NO_MATCH) {\n          return processed;\n        }\n      }\n\n      // edge case for when illegal matches $ (end of line) which is technically\n      // a 0 width match but not a begin/end match so it's not caught by the\n      // first handler (when ignoreIllegals is true)\n      if (match.type === \"illegal\" && lexeme === \"\") {\n        // advance so we aren't stuck in an infinite loop\n        return 1;\n      }\n\n      // infinite loops are BAD, this is a last ditch catch all. if we have a\n      // decent number of iterations yet our index (cursor position in our\n      // parsing) still 3x behind our index then something is very wrong\n      // so we bail\n      if (iterations > 100000 && iterations > match.index * 3) {\n        const err = new Error('potential infinite loop, way more iterations than matches');\n        throw err;\n      }\n\n      /*\n      Why might be find ourselves here?  An potential end match that was\n      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.\n      (this could be because a callback requests the match be ignored, etc)\n\n      This causes no real harm other than stopping a few times too many.\n      */\n\n      modeBuffer += lexeme;\n      return lexeme.length;\n    }\n\n    const language = getLanguage(languageName);\n    if (!language) {\n      error(LANGUAGE_NOT_FOUND.replace(\"{}\", languageName));\n      throw new Error('Unknown language: \"' + languageName + '\"');\n    }\n\n    const md = compileLanguage(language);\n    let result = '';\n    /** @type {CompiledMode} */\n    let top = continuation || md;\n    /** @type Record<string,CompiledMode> */\n    const continuations = {}; // keep continuations for sub-languages\n    const emitter = new options.__emitter(options);\n    processContinuations();\n    let modeBuffer = '';\n    let relevance = 0;\n    let index = 0;\n    let iterations = 0;\n    let resumeScanAtSamePosition = false;\n\n    try {\n      if (!language.__emitTokens) {\n        top.matcher.considerAll();\n\n        for (;;) {\n          iterations++;\n          if (resumeScanAtSamePosition) {\n            // only regexes not matched previously will now be\n            // considered for a potential match\n            resumeScanAtSamePosition = false;\n          } else {\n            top.matcher.considerAll();\n          }\n          top.matcher.lastIndex = index;\n\n          const match = top.matcher.exec(codeToHighlight);\n          // console.log(\"match\", match[0], match.rule && match.rule.begin)\n\n          if (!match) break;\n\n          const beforeMatch = codeToHighlight.substring(index, match.index);\n          const processedCount = processLexeme(beforeMatch, match);\n          index = match.index + processedCount;\n        }\n        processLexeme(codeToHighlight.substring(index));\n      } else {\n        language.__emitTokens(codeToHighlight, emitter);\n      }\n\n      emitter.finalize();\n      result = emitter.toHTML();\n\n      return {\n        language: languageName,\n        value: result,\n        relevance,\n        illegal: false,\n        _emitter: emitter,\n        _top: top\n      };\n    } catch (err) {\n      if (err.message && err.message.includes('Illegal')) {\n        return {\n          language: languageName,\n          value: escape(codeToHighlight),\n          illegal: true,\n          relevance: 0,\n          _illegalBy: {\n            message: err.message,\n            index,\n            context: codeToHighlight.slice(index - 100, index + 100),\n            mode: err.mode,\n            resultSoFar: result\n          },\n          _emitter: emitter\n        };\n      } else if (SAFE_MODE) {\n        return {\n          language: languageName,\n          value: escape(codeToHighlight),\n          illegal: false,\n          relevance: 0,\n          errorRaised: err,\n          _emitter: emitter,\n          _top: top\n        };\n      } else {\n        throw err;\n      }\n    }\n  }\n\n  /**\n   * returns a valid highlight result, without actually doing any actual work,\n   * auto highlight starts with this and it's possible for small snippets that\n   * auto-detection may not find a better match\n   * @param {string} code\n   * @returns {HighlightResult}\n   */\n  function justTextHighlightResult(code) {\n    const result = {\n      value: escape(code),\n      illegal: false,\n      relevance: 0,\n      _top: PLAINTEXT_LANGUAGE,\n      _emitter: new options.__emitter(options)\n    };\n    result._emitter.addText(code);\n    return result;\n  }\n\n  /**\n  Highlighting with language detection. Accepts a string with the code to\n  highlight. Returns an object with the following properties:\n\n  - language (detected language)\n  - relevance (int)\n  - value (an HTML string with highlighting markup)\n  - secondBest (object with the same structure for second-best heuristically\n    detected language, may be absent)\n\n    @param {string} code\n    @param {Array<string>} [languageSubset]\n    @returns {AutoHighlightResult}\n  */\n  function highlightAuto(code, languageSubset) {\n    languageSubset = languageSubset || options.languages || Object.keys(languages);\n    const plaintext = justTextHighlightResult(code);\n\n    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>\n      _highlight(name, code, false)\n    );\n    results.unshift(plaintext); // plaintext is always an option\n\n    const sorted = results.sort((a, b) => {\n      // sort base on relevance\n      if (a.relevance !== b.relevance) return b.relevance - a.relevance;\n\n      // always award the tie to the base language\n      // ie if C++ and Arduino are tied, it's more likely to be C++\n      if (a.language && b.language) {\n        if (getLanguage(a.language).supersetOf === b.language) {\n          return 1;\n        } else if (getLanguage(b.language).supersetOf === a.language) {\n          return -1;\n        }\n      }\n\n      // otherwise say they are equal, which has the effect of sorting on\n      // relevance while preserving the original ordering - which is how ties\n      // have historically been settled, ie the language that comes first always\n      // wins in the case of a tie\n      return 0;\n    });\n\n    const [best, secondBest] = sorted;\n\n    /** @type {AutoHighlightResult} */\n    const result = best;\n    result.secondBest = secondBest;\n\n    return result;\n  }\n\n  /**\n   * Builds new class name for block given the language name\n   *\n   * @param {HTMLElement} element\n   * @param {string} [currentLang]\n   * @param {string} [resultLang]\n   */\n  function updateClassName(element, currentLang, resultLang) {\n    const language = (currentLang && aliases[currentLang]) || resultLang;\n\n    element.classList.add(\"hljs\");\n    element.classList.add(`language-${language}`);\n  }\n\n  /**\n   * Applies highlighting to a DOM node containing code.\n   *\n   * @param {HighlightedHTMLElement} element - the HTML element to highlight\n  */\n  function highlightElement(element) {\n    /** @type HTMLElement */\n    let node = null;\n    const language = blockLanguage(element);\n\n    if (shouldNotHighlight(language)) return;\n\n    fire(\"before:highlightElement\",\n      { el: element, language });\n\n    if (element.dataset.highlighted) {\n      console.log(\"Element previously highlighted. To highlight again, first unset `dataset.highlighted`.\", element);\n      return;\n    }\n\n    // we should be all text, no child nodes (unescaped HTML) - this is possibly\n    // an HTML injection attack - it's likely too late if this is already in\n    // production (the code has likely already done its damage by the time\n    // we're seeing it)... but we yell loudly about this so that hopefully it's\n    // more likely to be caught in development before making it to production\n    if (element.children.length > 0) {\n      if (!options.ignoreUnescapedHTML) {\n        console.warn(\"One of your code blocks includes unescaped HTML. This is a potentially serious security risk.\");\n        console.warn(\"https://github.com/highlightjs/highlight.js/wiki/security\");\n        console.warn(\"The element with unescaped HTML:\");\n        console.warn(element);\n      }\n      if (options.throwUnescapedHTML) {\n        const err = new HTMLInjectionError(\n          \"One of your code blocks includes unescaped HTML.\",\n          element.innerHTML\n        );\n        throw err;\n      }\n    }\n\n    node = element;\n    const text = node.textContent;\n    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);\n\n    element.innerHTML = result.value;\n    element.dataset.highlighted = \"yes\";\n    updateClassName(element, language, result.language);\n    element.result = {\n      language: result.language,\n      // TODO: remove with version 11.0\n      re: result.relevance,\n      relevance: result.relevance\n    };\n    if (result.secondBest) {\n      element.secondBest = {\n        language: result.secondBest.language,\n        relevance: result.secondBest.relevance\n      };\n    }\n\n    fire(\"after:highlightElement\", { el: element, result, text });\n  }\n\n  /**\n   * Updates highlight.js global options with the passed options\n   *\n   * @param {Partial<HLJSOptions>} userOptions\n   */\n  function configure(userOptions) {\n    options = inherit(options, userOptions);\n  }\n\n  // TODO: remove v12, deprecated\n  const initHighlighting = () => {\n    highlightAll();\n    deprecated(\"10.6.0\", \"initHighlighting() deprecated.  Use highlightAll() now.\");\n  };\n\n  // TODO: remove v12, deprecated\n  function initHighlightingOnLoad() {\n    highlightAll();\n    deprecated(\"10.6.0\", \"initHighlightingOnLoad() deprecated.  Use highlightAll() now.\");\n  }\n\n  let wantsHighlight = false;\n\n  /**\n   * auto-highlights all pre>code elements on the page\n   */\n  function highlightAll() {\n    // if we are called too early in the loading process\n    if (document.readyState === \"loading\") {\n      wantsHighlight = true;\n      return;\n    }\n\n    const blocks = document.querySelectorAll(options.cssSelector);\n    blocks.forEach(highlightElement);\n  }\n\n  function boot() {\n    // if a highlight was requested before DOM was loaded, do now\n    if (wantsHighlight) highlightAll();\n  }\n\n  // make sure we are in the browser environment\n  if (typeof window !== 'undefined' && window.addEventListener) {\n    window.addEventListener('DOMContentLoaded', boot, false);\n  }\n\n  /**\n   * Register a language grammar module\n   *\n   * @param {string} languageName\n   * @param {LanguageFn} languageDefinition\n   */\n  function registerLanguage(languageName, languageDefinition) {\n    let lang = null;\n    try {\n      lang = languageDefinition(hljs);\n    } catch (error$1) {\n      error(\"Language definition for '{}' could not be registered.\".replace(\"{}\", languageName));\n      // hard or soft error\n      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }\n      // languages that have serious errors are replaced with essentially a\n      // \"plaintext\" stand-in so that the code blocks will still get normal\n      // css classes applied to them - and one bad language won't break the\n      // entire highlighter\n      lang = PLAINTEXT_LANGUAGE;\n    }\n    // give it a temporary name if it doesn't have one in the meta-data\n    if (!lang.name) lang.name = languageName;\n    languages[languageName] = lang;\n    lang.rawDefinition = languageDefinition.bind(null, hljs);\n\n    if (lang.aliases) {\n      registerAliases(lang.aliases, { languageName });\n    }\n  }\n\n  /**\n   * Remove a language grammar module\n   *\n   * @param {string} languageName\n   */\n  function unregisterLanguage(languageName) {\n    delete languages[languageName];\n    for (const alias of Object.keys(aliases)) {\n      if (aliases[alias] === languageName) {\n        delete aliases[alias];\n      }\n    }\n  }\n\n  /**\n   * @returns {string[]} List of language internal names\n   */\n  function listLanguages() {\n    return Object.keys(languages);\n  }\n\n  /**\n   * @param {string} name - name of the language to retrieve\n   * @returns {Language | undefined}\n   */\n  function getLanguage(name) {\n    name = (name || '').toLowerCase();\n    return languages[name] || languages[aliases[name]];\n  }\n\n  /**\n   *\n   * @param {string|string[]} aliasList - single alias or list of aliases\n   * @param {{languageName: string}} opts\n   */\n  function registerAliases(aliasList, { languageName }) {\n    if (typeof aliasList === 'string') {\n      aliasList = [aliasList];\n    }\n    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });\n  }\n\n  /**\n   * Determines if a given language has auto-detection enabled\n   * @param {string} name - name of the language\n   */\n  function autoDetection(name) {\n    const lang = getLanguage(name);\n    return lang && !lang.disableAutodetect;\n  }\n\n  /**\n   * Upgrades the old highlightBlock plugins to the new\n   * highlightElement API\n   * @param {HLJSPlugin} plugin\n   */\n  function upgradePluginAPI(plugin) {\n    // TODO: remove with v12\n    if (plugin[\"before:highlightBlock\"] && !plugin[\"before:highlightElement\"]) {\n      plugin[\"before:highlightElement\"] = (data) => {\n        plugin[\"before:highlightBlock\"](\n          Object.assign({ block: data.el }, data)\n        );\n      };\n    }\n    if (plugin[\"after:highlightBlock\"] && !plugin[\"after:highlightElement\"]) {\n      plugin[\"after:highlightElement\"] = (data) => {\n        plugin[\"after:highlightBlock\"](\n          Object.assign({ block: data.el }, data)\n        );\n      };\n    }\n  }\n\n  /**\n   * @param {HLJSPlugin} plugin\n   */\n  function addPlugin(plugin) {\n    upgradePluginAPI(plugin);\n    plugins.push(plugin);\n  }\n\n  /**\n   * @param {HLJSPlugin} plugin\n   */\n  function removePlugin(plugin) {\n    const index = plugins.indexOf(plugin);\n    if (index !== -1) {\n      plugins.splice(index, 1);\n    }\n  }\n\n  /**\n   *\n   * @param {PluginEvent} event\n   * @param {any} args\n   */\n  function fire(event, args) {\n    const cb = event;\n    plugins.forEach(function(plugin) {\n      if (plugin[cb]) {\n        plugin[cb](args);\n      }\n    });\n  }\n\n  /**\n   * DEPRECATED\n   * @param {HighlightedHTMLElement} el\n   */\n  function deprecateHighlightBlock(el) {\n    deprecated(\"10.7.0\", \"highlightBlock will be removed entirely in v12.0\");\n    deprecated(\"10.7.0\", \"Please use highlightElement now.\");\n\n    return highlightElement(el);\n  }\n\n  /* Interface definition */\n  Object.assign(hljs, {\n    highlight,\n    highlightAuto,\n    highlightAll,\n    highlightElement,\n    // TODO: Remove with v12 API\n    highlightBlock: deprecateHighlightBlock,\n    configure,\n    initHighlighting,\n    initHighlightingOnLoad,\n    registerLanguage,\n    unregisterLanguage,\n    listLanguages,\n    getLanguage,\n    registerAliases,\n    autoDetection,\n    inherit,\n    addPlugin,\n    removePlugin\n  });\n\n  hljs.debugMode = function() { SAFE_MODE = false; };\n  hljs.safeMode = function() { SAFE_MODE = true; };\n  hljs.versionString = version;\n\n  hljs.regex = {\n    concat: concat,\n    lookahead: lookahead,\n    either: either,\n    optional: optional,\n    anyNumberOfTimes: anyNumberOfTimes\n  };\n\n  for (const key in MODES) {\n    // @ts-ignore\n    if (typeof MODES[key] === \"object\") {\n      // @ts-ignore\n      deepFreeze(MODES[key]);\n    }\n  }\n\n  // merge all the modes/regexes into our main object\n  Object.assign(hljs, MODES);\n\n  return hljs;\n};\n\n// Other names for the variable may break build script\nconst highlight = HLJS({});\n\n// returns a new instance of the highlighter to be used for extensions\n// check https://github.com/wooorm/lowlight/issues/47\nhighlight.newInstance = () => HLJS({});\n\nmodule.exports = highlight;\nhighlight.HighlightJS = highlight;\nhighlight.default = highlight;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/core.js?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/css.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/css.js ***!
  \********************************************************/
/***/ ((module) => {

eval("const MODES = (hljs) => {\n  return {\n    IMPORTANT: {\n      scope: 'meta',\n      begin: '!important'\n    },\n    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,\n    HEXCOLOR: {\n      scope: 'number',\n      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\\b/\n    },\n    FUNCTION_DISPATCH: {\n      className: \"built_in\",\n      begin: /[\\w-]+(?=\\()/\n    },\n    ATTRIBUTE_SELECTOR_MODE: {\n      scope: 'selector-attr',\n      begin: /\\[/,\n      end: /\\]/,\n      illegal: '$',\n      contains: [\n        hljs.APOS_STRING_MODE,\n        hljs.QUOTE_STRING_MODE\n      ]\n    },\n    CSS_NUMBER_MODE: {\n      scope: 'number',\n      begin: hljs.NUMBER_RE + '(' +\n        '%|em|ex|ch|rem' +\n        '|vw|vh|vmin|vmax' +\n        '|cm|mm|in|pt|pc|px' +\n        '|deg|grad|rad|turn' +\n        '|s|ms' +\n        '|Hz|kHz' +\n        '|dpi|dpcm|dppx' +\n        ')?',\n      relevance: 0\n    },\n    CSS_VARIABLE: {\n      className: \"attr\",\n      begin: /--[A-Za-z_][A-Za-z0-9_-]*/\n    }\n  };\n};\n\nconst TAGS = [\n  'a',\n  'abbr',\n  'address',\n  'article',\n  'aside',\n  'audio',\n  'b',\n  'blockquote',\n  'body',\n  'button',\n  'canvas',\n  'caption',\n  'cite',\n  'code',\n  'dd',\n  'del',\n  'details',\n  'dfn',\n  'div',\n  'dl',\n  'dt',\n  'em',\n  'fieldset',\n  'figcaption',\n  'figure',\n  'footer',\n  'form',\n  'h1',\n  'h2',\n  'h3',\n  'h4',\n  'h5',\n  'h6',\n  'header',\n  'hgroup',\n  'html',\n  'i',\n  'iframe',\n  'img',\n  'input',\n  'ins',\n  'kbd',\n  'label',\n  'legend',\n  'li',\n  'main',\n  'mark',\n  'menu',\n  'nav',\n  'object',\n  'ol',\n  'p',\n  'q',\n  'quote',\n  'samp',\n  'section',\n  'span',\n  'strong',\n  'summary',\n  'sup',\n  'table',\n  'tbody',\n  'td',\n  'textarea',\n  'tfoot',\n  'th',\n  'thead',\n  'time',\n  'tr',\n  'ul',\n  'var',\n  'video'\n];\n\nconst MEDIA_FEATURES = [\n  'any-hover',\n  'any-pointer',\n  'aspect-ratio',\n  'color',\n  'color-gamut',\n  'color-index',\n  'device-aspect-ratio',\n  'device-height',\n  'device-width',\n  'display-mode',\n  'forced-colors',\n  'grid',\n  'height',\n  'hover',\n  'inverted-colors',\n  'monochrome',\n  'orientation',\n  'overflow-block',\n  'overflow-inline',\n  'pointer',\n  'prefers-color-scheme',\n  'prefers-contrast',\n  'prefers-reduced-motion',\n  'prefers-reduced-transparency',\n  'resolution',\n  'scan',\n  'scripting',\n  'update',\n  'width',\n  // TODO: find a better solution?\n  'min-width',\n  'max-width',\n  'min-height',\n  'max-height'\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes\nconst PSEUDO_CLASSES = [\n  'active',\n  'any-link',\n  'blank',\n  'checked',\n  'current',\n  'default',\n  'defined',\n  'dir', // dir()\n  'disabled',\n  'drop',\n  'empty',\n  'enabled',\n  'first',\n  'first-child',\n  'first-of-type',\n  'fullscreen',\n  'future',\n  'focus',\n  'focus-visible',\n  'focus-within',\n  'has', // has()\n  'host', // host or host()\n  'host-context', // host-context()\n  'hover',\n  'indeterminate',\n  'in-range',\n  'invalid',\n  'is', // is()\n  'lang', // lang()\n  'last-child',\n  'last-of-type',\n  'left',\n  'link',\n  'local-link',\n  'not', // not()\n  'nth-child', // nth-child()\n  'nth-col', // nth-col()\n  'nth-last-child', // nth-last-child()\n  'nth-last-col', // nth-last-col()\n  'nth-last-of-type', //nth-last-of-type()\n  'nth-of-type', //nth-of-type()\n  'only-child',\n  'only-of-type',\n  'optional',\n  'out-of-range',\n  'past',\n  'placeholder-shown',\n  'read-only',\n  'read-write',\n  'required',\n  'right',\n  'root',\n  'scope',\n  'target',\n  'target-within',\n  'user-invalid',\n  'valid',\n  'visited',\n  'where' // where()\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements\nconst PSEUDO_ELEMENTS = [\n  'after',\n  'backdrop',\n  'before',\n  'cue',\n  'cue-region',\n  'first-letter',\n  'first-line',\n  'grammar-error',\n  'marker',\n  'part',\n  'placeholder',\n  'selection',\n  'slotted',\n  'spelling-error'\n];\n\nconst ATTRIBUTES = [\n  'align-content',\n  'align-items',\n  'align-self',\n  'all',\n  'animation',\n  'animation-delay',\n  'animation-direction',\n  'animation-duration',\n  'animation-fill-mode',\n  'animation-iteration-count',\n  'animation-name',\n  'animation-play-state',\n  'animation-timing-function',\n  'backface-visibility',\n  'background',\n  'background-attachment',\n  'background-blend-mode',\n  'background-clip',\n  'background-color',\n  'background-image',\n  'background-origin',\n  'background-position',\n  'background-repeat',\n  'background-size',\n  'block-size',\n  'border',\n  'border-block',\n  'border-block-color',\n  'border-block-end',\n  'border-block-end-color',\n  'border-block-end-style',\n  'border-block-end-width',\n  'border-block-start',\n  'border-block-start-color',\n  'border-block-start-style',\n  'border-block-start-width',\n  'border-block-style',\n  'border-block-width',\n  'border-bottom',\n  'border-bottom-color',\n  'border-bottom-left-radius',\n  'border-bottom-right-radius',\n  'border-bottom-style',\n  'border-bottom-width',\n  'border-collapse',\n  'border-color',\n  'border-image',\n  'border-image-outset',\n  'border-image-repeat',\n  'border-image-slice',\n  'border-image-source',\n  'border-image-width',\n  'border-inline',\n  'border-inline-color',\n  'border-inline-end',\n  'border-inline-end-color',\n  'border-inline-end-style',\n  'border-inline-end-width',\n  'border-inline-start',\n  'border-inline-start-color',\n  'border-inline-start-style',\n  'border-inline-start-width',\n  'border-inline-style',\n  'border-inline-width',\n  'border-left',\n  'border-left-color',\n  'border-left-style',\n  'border-left-width',\n  'border-radius',\n  'border-right',\n  'border-right-color',\n  'border-right-style',\n  'border-right-width',\n  'border-spacing',\n  'border-style',\n  'border-top',\n  'border-top-color',\n  'border-top-left-radius',\n  'border-top-right-radius',\n  'border-top-style',\n  'border-top-width',\n  'border-width',\n  'bottom',\n  'box-decoration-break',\n  'box-shadow',\n  'box-sizing',\n  'break-after',\n  'break-before',\n  'break-inside',\n  'caption-side',\n  'caret-color',\n  'clear',\n  'clip',\n  'clip-path',\n  'clip-rule',\n  'color',\n  'column-count',\n  'column-fill',\n  'column-gap',\n  'column-rule',\n  'column-rule-color',\n  'column-rule-style',\n  'column-rule-width',\n  'column-span',\n  'column-width',\n  'columns',\n  'contain',\n  'content',\n  'content-visibility',\n  'counter-increment',\n  'counter-reset',\n  'cue',\n  'cue-after',\n  'cue-before',\n  'cursor',\n  'direction',\n  'display',\n  'empty-cells',\n  'filter',\n  'flex',\n  'flex-basis',\n  'flex-direction',\n  'flex-flow',\n  'flex-grow',\n  'flex-shrink',\n  'flex-wrap',\n  'float',\n  'flow',\n  'font',\n  'font-display',\n  'font-family',\n  'font-feature-settings',\n  'font-kerning',\n  'font-language-override',\n  'font-size',\n  'font-size-adjust',\n  'font-smoothing',\n  'font-stretch',\n  'font-style',\n  'font-synthesis',\n  'font-variant',\n  'font-variant-caps',\n  'font-variant-east-asian',\n  'font-variant-ligatures',\n  'font-variant-numeric',\n  'font-variant-position',\n  'font-variation-settings',\n  'font-weight',\n  'gap',\n  'glyph-orientation-vertical',\n  'grid',\n  'grid-area',\n  'grid-auto-columns',\n  'grid-auto-flow',\n  'grid-auto-rows',\n  'grid-column',\n  'grid-column-end',\n  'grid-column-start',\n  'grid-gap',\n  'grid-row',\n  'grid-row-end',\n  'grid-row-start',\n  'grid-template',\n  'grid-template-areas',\n  'grid-template-columns',\n  'grid-template-rows',\n  'hanging-punctuation',\n  'height',\n  'hyphens',\n  'icon',\n  'image-orientation',\n  'image-rendering',\n  'image-resolution',\n  'ime-mode',\n  'inline-size',\n  'isolation',\n  'justify-content',\n  'left',\n  'letter-spacing',\n  'line-break',\n  'line-height',\n  'list-style',\n  'list-style-image',\n  'list-style-position',\n  'list-style-type',\n  'margin',\n  'margin-block',\n  'margin-block-end',\n  'margin-block-start',\n  'margin-bottom',\n  'margin-inline',\n  'margin-inline-end',\n  'margin-inline-start',\n  'margin-left',\n  'margin-right',\n  'margin-top',\n  'marks',\n  'mask',\n  'mask-border',\n  'mask-border-mode',\n  'mask-border-outset',\n  'mask-border-repeat',\n  'mask-border-slice',\n  'mask-border-source',\n  'mask-border-width',\n  'mask-clip',\n  'mask-composite',\n  'mask-image',\n  'mask-mode',\n  'mask-origin',\n  'mask-position',\n  'mask-repeat',\n  'mask-size',\n  'mask-type',\n  'max-block-size',\n  'max-height',\n  'max-inline-size',\n  'max-width',\n  'min-block-size',\n  'min-height',\n  'min-inline-size',\n  'min-width',\n  'mix-blend-mode',\n  'nav-down',\n  'nav-index',\n  'nav-left',\n  'nav-right',\n  'nav-up',\n  'none',\n  'normal',\n  'object-fit',\n  'object-position',\n  'opacity',\n  'order',\n  'orphans',\n  'outline',\n  'outline-color',\n  'outline-offset',\n  'outline-style',\n  'outline-width',\n  'overflow',\n  'overflow-wrap',\n  'overflow-x',\n  'overflow-y',\n  'padding',\n  'padding-block',\n  'padding-block-end',\n  'padding-block-start',\n  'padding-bottom',\n  'padding-inline',\n  'padding-inline-end',\n  'padding-inline-start',\n  'padding-left',\n  'padding-right',\n  'padding-top',\n  'page-break-after',\n  'page-break-before',\n  'page-break-inside',\n  'pause',\n  'pause-after',\n  'pause-before',\n  'perspective',\n  'perspective-origin',\n  'pointer-events',\n  'position',\n  'quotes',\n  'resize',\n  'rest',\n  'rest-after',\n  'rest-before',\n  'right',\n  'row-gap',\n  'scroll-margin',\n  'scroll-margin-block',\n  'scroll-margin-block-end',\n  'scroll-margin-block-start',\n  'scroll-margin-bottom',\n  'scroll-margin-inline',\n  'scroll-margin-inline-end',\n  'scroll-margin-inline-start',\n  'scroll-margin-left',\n  'scroll-margin-right',\n  'scroll-margin-top',\n  'scroll-padding',\n  'scroll-padding-block',\n  'scroll-padding-block-end',\n  'scroll-padding-block-start',\n  'scroll-padding-bottom',\n  'scroll-padding-inline',\n  'scroll-padding-inline-end',\n  'scroll-padding-inline-start',\n  'scroll-padding-left',\n  'scroll-padding-right',\n  'scroll-padding-top',\n  'scroll-snap-align',\n  'scroll-snap-stop',\n  'scroll-snap-type',\n  'scrollbar-color',\n  'scrollbar-gutter',\n  'scrollbar-width',\n  'shape-image-threshold',\n  'shape-margin',\n  'shape-outside',\n  'speak',\n  'speak-as',\n  'src', // @font-face\n  'tab-size',\n  'table-layout',\n  'text-align',\n  'text-align-all',\n  'text-align-last',\n  'text-combine-upright',\n  'text-decoration',\n  'text-decoration-color',\n  'text-decoration-line',\n  'text-decoration-style',\n  'text-emphasis',\n  'text-emphasis-color',\n  'text-emphasis-position',\n  'text-emphasis-style',\n  'text-indent',\n  'text-justify',\n  'text-orientation',\n  'text-overflow',\n  'text-rendering',\n  'text-shadow',\n  'text-transform',\n  'text-underline-position',\n  'top',\n  'transform',\n  'transform-box',\n  'transform-origin',\n  'transform-style',\n  'transition',\n  'transition-delay',\n  'transition-duration',\n  'transition-property',\n  'transition-timing-function',\n  'unicode-bidi',\n  'vertical-align',\n  'visibility',\n  'voice-balance',\n  'voice-duration',\n  'voice-family',\n  'voice-pitch',\n  'voice-range',\n  'voice-rate',\n  'voice-stress',\n  'voice-volume',\n  'white-space',\n  'widows',\n  'width',\n  'will-change',\n  'word-break',\n  'word-spacing',\n  'word-wrap',\n  'writing-mode',\n  'z-index'\n  // reverse makes sure longer attributes `font-weight` are matched fully\n  // instead of getting false positives on say `font`\n].reverse();\n\n/*\nLanguage: CSS\nCategory: common, css, web\nWebsite: https://developer.mozilla.org/en-US/docs/Web/CSS\n*/\n\n\n/** @type LanguageFn */\nfunction css(hljs) {\n  const regex = hljs.regex;\n  const modes = MODES(hljs);\n  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };\n  const AT_MODIFIERS = \"and or not only\";\n  const AT_PROPERTY_RE = /@-?\\w[\\w]*(-\\w+)*/; // @-webkit-keyframes\n  const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';\n  const STRINGS = [\n    hljs.APOS_STRING_MODE,\n    hljs.QUOTE_STRING_MODE\n  ];\n\n  return {\n    name: 'CSS',\n    case_insensitive: true,\n    illegal: /[=|'\\$]/,\n    keywords: { keyframePosition: \"from to\" },\n    classNameAliases: {\n      // for visual continuity with `tag {}` and because we\n      // don't have a great class for this?\n      keyframePosition: \"selector-tag\" },\n    contains: [\n      modes.BLOCK_COMMENT,\n      VENDOR_PREFIX,\n      // to recognize keyframe 40% etc which are outside the scope of our\n      // attribute value mode\n      modes.CSS_NUMBER_MODE,\n      {\n        className: 'selector-id',\n        begin: /#[A-Za-z0-9_-]+/,\n        relevance: 0\n      },\n      {\n        className: 'selector-class',\n        begin: '\\\\.' + IDENT_RE,\n        relevance: 0\n      },\n      modes.ATTRIBUTE_SELECTOR_MODE,\n      {\n        className: 'selector-pseudo',\n        variants: [\n          { begin: ':(' + PSEUDO_CLASSES.join('|') + ')' },\n          { begin: ':(:)?(' + PSEUDO_ELEMENTS.join('|') + ')' }\n        ]\n      },\n      // we may actually need this (12/2020)\n      // { // pseudo-selector params\n      //   begin: /\\(/,\n      //   end: /\\)/,\n      //   contains: [ hljs.CSS_NUMBER_MODE ]\n      // },\n      modes.CSS_VARIABLE,\n      {\n        className: 'attribute',\n        begin: '\\\\b(' + ATTRIBUTES.join('|') + ')\\\\b'\n      },\n      // attribute values\n      {\n        begin: /:/,\n        end: /[;}{]/,\n        contains: [\n          modes.BLOCK_COMMENT,\n          modes.HEXCOLOR,\n          modes.IMPORTANT,\n          modes.CSS_NUMBER_MODE,\n          ...STRINGS,\n          // needed to highlight these as strings and to avoid issues with\n          // illegal characters that might be inside urls that would tigger the\n          // languages illegal stack\n          {\n            begin: /(url|data-uri)\\(/,\n            end: /\\)/,\n            relevance: 0, // from keywords\n            keywords: { built_in: \"url data-uri\" },\n            contains: [\n              ...STRINGS,\n              {\n                className: \"string\",\n                // any character other than `)` as in `url()` will be the start\n                // of a string, which ends with `)` (from the parent mode)\n                begin: /[^)]/,\n                endsWithParent: true,\n                excludeEnd: true\n              }\n            ]\n          },\n          modes.FUNCTION_DISPATCH\n        ]\n      },\n      {\n        begin: regex.lookahead(/@/),\n        end: '[{;]',\n        relevance: 0,\n        illegal: /:/, // break on Less variables @var: ...\n        contains: [\n          {\n            className: 'keyword',\n            begin: AT_PROPERTY_RE\n          },\n          {\n            begin: /\\s/,\n            endsWithParent: true,\n            excludeEnd: true,\n            relevance: 0,\n            keywords: {\n              $pattern: /[a-z-]+/,\n              keyword: AT_MODIFIERS,\n              attribute: MEDIA_FEATURES.join(\" \")\n            },\n            contains: [\n              {\n                begin: /[a-z-]+(?=:)/,\n                className: \"attribute\"\n              },\n              ...STRINGS,\n              modes.CSS_NUMBER_MODE\n            ]\n          }\n        ]\n      },\n      {\n        className: 'selector-tag',\n        begin: '\\\\b(' + TAGS.join('|') + ')\\\\b'\n      }\n    ]\n  };\n}\n\nmodule.exports = css;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/languages/css.js?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/javascript.js":
/*!***************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/javascript.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';\nconst KEYWORDS = [\n  \"as\", // for exports\n  \"in\",\n  \"of\",\n  \"if\",\n  \"for\",\n  \"while\",\n  \"finally\",\n  \"var\",\n  \"new\",\n  \"function\",\n  \"do\",\n  \"return\",\n  \"void\",\n  \"else\",\n  \"break\",\n  \"catch\",\n  \"instanceof\",\n  \"with\",\n  \"throw\",\n  \"case\",\n  \"default\",\n  \"try\",\n  \"switch\",\n  \"continue\",\n  \"typeof\",\n  \"delete\",\n  \"let\",\n  \"yield\",\n  \"const\",\n  \"class\",\n  // JS handles these with a special rule\n  // \"get\",\n  // \"set\",\n  \"debugger\",\n  \"async\",\n  \"await\",\n  \"static\",\n  \"import\",\n  \"from\",\n  \"export\",\n  \"extends\"\n];\nconst LITERALS = [\n  \"true\",\n  \"false\",\n  \"null\",\n  \"undefined\",\n  \"NaN\",\n  \"Infinity\"\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects\nconst TYPES = [\n  // Fundamental objects\n  \"Object\",\n  \"Function\",\n  \"Boolean\",\n  \"Symbol\",\n  // numbers and dates\n  \"Math\",\n  \"Date\",\n  \"Number\",\n  \"BigInt\",\n  // text\n  \"String\",\n  \"RegExp\",\n  // Indexed collections\n  \"Array\",\n  \"Float32Array\",\n  \"Float64Array\",\n  \"Int8Array\",\n  \"Uint8Array\",\n  \"Uint8ClampedArray\",\n  \"Int16Array\",\n  \"Int32Array\",\n  \"Uint16Array\",\n  \"Uint32Array\",\n  \"BigInt64Array\",\n  \"BigUint64Array\",\n  // Keyed collections\n  \"Set\",\n  \"Map\",\n  \"WeakSet\",\n  \"WeakMap\",\n  // Structured data\n  \"ArrayBuffer\",\n  \"SharedArrayBuffer\",\n  \"Atomics\",\n  \"DataView\",\n  \"JSON\",\n  // Control abstraction objects\n  \"Promise\",\n  \"Generator\",\n  \"GeneratorFunction\",\n  \"AsyncFunction\",\n  // Reflection\n  \"Reflect\",\n  \"Proxy\",\n  // Internationalization\n  \"Intl\",\n  // WebAssembly\n  \"WebAssembly\"\n];\n\nconst ERROR_TYPES = [\n  \"Error\",\n  \"EvalError\",\n  \"InternalError\",\n  \"RangeError\",\n  \"ReferenceError\",\n  \"SyntaxError\",\n  \"TypeError\",\n  \"URIError\"\n];\n\nconst BUILT_IN_GLOBALS = [\n  \"setInterval\",\n  \"setTimeout\",\n  \"clearInterval\",\n  \"clearTimeout\",\n\n  \"require\",\n  \"exports\",\n\n  \"eval\",\n  \"isFinite\",\n  \"isNaN\",\n  \"parseFloat\",\n  \"parseInt\",\n  \"decodeURI\",\n  \"decodeURIComponent\",\n  \"encodeURI\",\n  \"encodeURIComponent\",\n  \"escape\",\n  \"unescape\"\n];\n\nconst BUILT_IN_VARIABLES = [\n  \"arguments\",\n  \"this\",\n  \"super\",\n  \"console\",\n  \"window\",\n  \"document\",\n  \"localStorage\",\n  \"sessionStorage\",\n  \"module\",\n  \"global\" // Node.js\n];\n\nconst BUILT_INS = [].concat(\n  BUILT_IN_GLOBALS,\n  TYPES,\n  ERROR_TYPES\n);\n\n/*\nLanguage: JavaScript\nDescription: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.\nCategory: common, scripting, web\nWebsite: https://developer.mozilla.org/en-US/docs/Web/JavaScript\n*/\n\n\n/** @type LanguageFn */\nfunction javascript(hljs) {\n  const regex = hljs.regex;\n  /**\n   * Takes a string like \"<Booger\" and checks to see\n   * if we can find a matching \"</Booger\" later in the\n   * content.\n   * @param {RegExpMatchArray} match\n   * @param {{after:number}} param1\n   */\n  const hasClosingTag = (match, { after }) => {\n    const tag = \"</\" + match[0].slice(1);\n    const pos = match.input.indexOf(tag, after);\n    return pos !== -1;\n  };\n\n  const IDENT_RE$1 = IDENT_RE;\n  const FRAGMENT = {\n    begin: '<>',\n    end: '</>'\n  };\n  // to avoid some special cases inside isTrulyOpeningTag\n  const XML_SELF_CLOSING = /<[A-Za-z0-9\\\\._:-]+\\s*\\/>/;\n  const XML_TAG = {\n    begin: /<[A-Za-z0-9\\\\._:-]+/,\n    end: /\\/[A-Za-z0-9\\\\._:-]+>|\\/>/,\n    /**\n     * @param {RegExpMatchArray} match\n     * @param {CallbackResponse} response\n     */\n    isTrulyOpeningTag: (match, response) => {\n      const afterMatchIndex = match[0].length + match.index;\n      const nextChar = match.input[afterMatchIndex];\n      if (\n        // HTML should not include another raw `<` inside a tag\n        // nested type?\n        // `<Array<Array<number>>`, etc.\n        nextChar === \"<\" ||\n        // the , gives away that this is not HTML\n        // `<T, A extends keyof T, V>`\n        nextChar === \",\"\n        ) {\n        response.ignoreMatch();\n        return;\n      }\n\n      // `<something>`\n      // Quite possibly a tag, lets look for a matching closing tag...\n      if (nextChar === \">\") {\n        // if we cannot find a matching closing tag, then we\n        // will ignore it\n        if (!hasClosingTag(match, { after: afterMatchIndex })) {\n          response.ignoreMatch();\n        }\n      }\n\n      // `<blah />` (self-closing)\n      // handled by simpleSelfClosing rule\n\n      let m;\n      const afterMatch = match.input.substring(afterMatchIndex);\n\n      // some more template typing stuff\n      //  <T = any>(key?: string) => Modify<\n      if ((m = afterMatch.match(/^\\s*=/))) {\n        response.ignoreMatch();\n        return;\n      }\n\n      // `<From extends string>`\n      // technically this could be HTML, but it smells like a type\n      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276\n      if ((m = afterMatch.match(/^\\s+extends\\s+/))) {\n        if (m.index === 0) {\n          response.ignoreMatch();\n          // eslint-disable-next-line no-useless-return\n          return;\n        }\n      }\n    }\n  };\n  const KEYWORDS$1 = {\n    $pattern: IDENT_RE,\n    keyword: KEYWORDS,\n    literal: LITERALS,\n    built_in: BUILT_INS,\n    \"variable.language\": BUILT_IN_VARIABLES\n  };\n\n  // https://tc39.es/ecma262/#sec-literals-numeric-literals\n  const decimalDigits = '[0-9](_?[0-9])*';\n  const frac = `\\\\.(${decimalDigits})`;\n  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral\n  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals\n  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;\n  const NUMBER = {\n    className: 'number',\n    variants: [\n      // DecimalLiteral\n      { begin: `(\\\\b(${decimalInteger})((${frac})|\\\\.)?|(${frac}))` +\n        `[eE][+-]?(${decimalDigits})\\\\b` },\n      { begin: `\\\\b(${decimalInteger})\\\\b((${frac})\\\\b|\\\\.)?|(${frac})\\\\b` },\n\n      // DecimalBigIntegerLiteral\n      { begin: `\\\\b(0|[1-9](_?[0-9])*)n\\\\b` },\n\n      // NonDecimalIntegerLiteral\n      { begin: \"\\\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\\\b\" },\n      { begin: \"\\\\b0[bB][0-1](_?[0-1])*n?\\\\b\" },\n      { begin: \"\\\\b0[oO][0-7](_?[0-7])*n?\\\\b\" },\n\n      // LegacyOctalIntegerLiteral (does not include underscore separators)\n      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals\n      { begin: \"\\\\b0[0-7]+n?\\\\b\" },\n    ],\n    relevance: 0\n  };\n\n  const SUBST = {\n    className: 'subst',\n    begin: '\\\\$\\\\{',\n    end: '\\\\}',\n    keywords: KEYWORDS$1,\n    contains: [] // defined later\n  };\n  const HTML_TEMPLATE = {\n    begin: 'html`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'xml'\n    }\n  };\n  const CSS_TEMPLATE = {\n    begin: 'css`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'css'\n    }\n  };\n  const GRAPHQL_TEMPLATE = {\n    begin: 'gql`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'graphql'\n    }\n  };\n  const TEMPLATE_STRING = {\n    className: 'string',\n    begin: '`',\n    end: '`',\n    contains: [\n      hljs.BACKSLASH_ESCAPE,\n      SUBST\n    ]\n  };\n  const JSDOC_COMMENT = hljs.COMMENT(\n    /\\/\\*\\*(?!\\/)/,\n    '\\\\*/',\n    {\n      relevance: 0,\n      contains: [\n        {\n          begin: '(?=@[A-Za-z]+)',\n          relevance: 0,\n          contains: [\n            {\n              className: 'doctag',\n              begin: '@[A-Za-z]+'\n            },\n            {\n              className: 'type',\n              begin: '\\\\{',\n              end: '\\\\}',\n              excludeEnd: true,\n              excludeBegin: true,\n              relevance: 0\n            },\n            {\n              className: 'variable',\n              begin: IDENT_RE$1 + '(?=\\\\s*(-)|$)',\n              endsParent: true,\n              relevance: 0\n            },\n            // eat spaces (not newlines) so we can find\n            // types or variables\n            {\n              begin: /(?=[^\\n])\\s/,\n              relevance: 0\n            }\n          ]\n        }\n      ]\n    }\n  );\n  const COMMENT = {\n    className: \"comment\",\n    variants: [\n      JSDOC_COMMENT,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.C_LINE_COMMENT_MODE\n    ]\n  };\n  const SUBST_INTERNALS = [\n    hljs.APOS_STRING_MODE,\n    hljs.QUOTE_STRING_MODE,\n    HTML_TEMPLATE,\n    CSS_TEMPLATE,\n    GRAPHQL_TEMPLATE,\n    TEMPLATE_STRING,\n    // Skip numbers when they are part of a variable name\n    { match: /\\$\\d+/ },\n    NUMBER,\n    // This is intentional:\n    // See https://github.com/highlightjs/highlight.js/issues/3288\n    // hljs.REGEXP_MODE\n  ];\n  SUBST.contains = SUBST_INTERNALS\n    .concat({\n      // we need to pair up {} inside our subst to prevent\n      // it from ending too early by matching another }\n      begin: /\\{/,\n      end: /\\}/,\n      keywords: KEYWORDS$1,\n      contains: [\n        \"self\"\n      ].concat(SUBST_INTERNALS)\n    });\n  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);\n  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([\n    // eat recursive parens in sub expressions\n    {\n      begin: /\\(/,\n      end: /\\)/,\n      keywords: KEYWORDS$1,\n      contains: [\"self\"].concat(SUBST_AND_COMMENTS)\n    }\n  ]);\n  const PARAMS = {\n    className: 'params',\n    begin: /\\(/,\n    end: /\\)/,\n    excludeBegin: true,\n    excludeEnd: true,\n    keywords: KEYWORDS$1,\n    contains: PARAMS_CONTAINS\n  };\n\n  // ES6 classes\n  const CLASS_OR_EXTENDS = {\n    variants: [\n      // class Car extends vehicle\n      {\n        match: [\n          /class/,\n          /\\s+/,\n          IDENT_RE$1,\n          /\\s+/,\n          /extends/,\n          /\\s+/,\n          regex.concat(IDENT_RE$1, \"(\", regex.concat(/\\./, IDENT_RE$1), \")*\")\n        ],\n        scope: {\n          1: \"keyword\",\n          3: \"title.class\",\n          5: \"keyword\",\n          7: \"title.class.inherited\"\n        }\n      },\n      // class Car\n      {\n        match: [\n          /class/,\n          /\\s+/,\n          IDENT_RE$1\n        ],\n        scope: {\n          1: \"keyword\",\n          3: \"title.class\"\n        }\n      },\n\n    ]\n  };\n\n  const CLASS_REFERENCE = {\n    relevance: 0,\n    match:\n    regex.either(\n      // Hard coded exceptions\n      /\\bJSON/,\n      // Float32Array, OutT\n      /\\b[A-Z][a-z]+([A-Z][a-z]*|\\d)*/,\n      // CSSFactory, CSSFactoryT\n      /\\b[A-Z]{2,}([A-Z][a-z]+|\\d)+([A-Z][a-z]*)*/,\n      // FPs, FPsT\n      /\\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\\d)*([A-Z][a-z]*)*/,\n      // P\n      // single letters are not highlighted\n      // BLAH\n      // this will be flagged as a UPPER_CASE_CONSTANT instead\n    ),\n    className: \"title.class\",\n    keywords: {\n      _: [\n        // se we still get relevance credit for JS library classes\n        ...TYPES,\n        ...ERROR_TYPES\n      ]\n    }\n  };\n\n  const USE_STRICT = {\n    label: \"use_strict\",\n    className: 'meta',\n    relevance: 10,\n    begin: /^\\s*['\"]use (strict|asm)['\"]/\n  };\n\n  const FUNCTION_DEFINITION = {\n    variants: [\n      {\n        match: [\n          /function/,\n          /\\s+/,\n          IDENT_RE$1,\n          /(?=\\s*\\()/\n        ]\n      },\n      // anonymous function\n      {\n        match: [\n          /function/,\n          /\\s*(?=\\()/\n        ]\n      }\n    ],\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    label: \"func.def\",\n    contains: [ PARAMS ],\n    illegal: /%/\n  };\n\n  const UPPER_CASE_CONSTANT = {\n    relevance: 0,\n    match: /\\b[A-Z][A-Z_0-9]+\\b/,\n    className: \"variable.constant\"\n  };\n\n  function noneOf(list) {\n    return regex.concat(\"(?!\", list.join(\"|\"), \")\");\n  }\n\n  const FUNCTION_CALL = {\n    match: regex.concat(\n      /\\b/,\n      noneOf([\n        ...BUILT_IN_GLOBALS,\n        \"super\",\n        \"import\"\n      ]),\n      IDENT_RE$1, regex.lookahead(/\\(/)),\n    className: \"title.function\",\n    relevance: 0\n  };\n\n  const PROPERTY_ACCESS = {\n    begin: regex.concat(/\\./, regex.lookahead(\n      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)\n    )),\n    end: IDENT_RE$1,\n    excludeBegin: true,\n    keywords: \"prototype\",\n    className: \"property\",\n    relevance: 0\n  };\n\n  const GETTER_OR_SETTER = {\n    match: [\n      /get|set/,\n      /\\s+/,\n      IDENT_RE$1,\n      /(?=\\()/\n    ],\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    contains: [\n      { // eat to avoid empty params\n        begin: /\\(\\)/\n      },\n      PARAMS\n    ]\n  };\n\n  const FUNC_LEAD_IN_RE = '(\\\\(' +\n    '[^()]*(\\\\(' +\n    '[^()]*(\\\\(' +\n    '[^()]*' +\n    '\\\\)[^()]*)*' +\n    '\\\\)[^()]*)*' +\n    '\\\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\\\s*=>';\n\n  const FUNCTION_VARIABLE = {\n    match: [\n      /const|var|let/, /\\s+/,\n      IDENT_RE$1, /\\s*/,\n      /=\\s*/,\n      /(async\\s*)?/, // async is optional\n      regex.lookahead(FUNC_LEAD_IN_RE)\n    ],\n    keywords: \"async\",\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    contains: [\n      PARAMS\n    ]\n  };\n\n  return {\n    name: 'JavaScript',\n    aliases: ['js', 'jsx', 'mjs', 'cjs'],\n    keywords: KEYWORDS$1,\n    // this will be extended by TypeScript\n    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },\n    illegal: /#(?![$_A-z])/,\n    contains: [\n      hljs.SHEBANG({\n        label: \"shebang\",\n        binary: \"node\",\n        relevance: 5\n      }),\n      USE_STRICT,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      HTML_TEMPLATE,\n      CSS_TEMPLATE,\n      GRAPHQL_TEMPLATE,\n      TEMPLATE_STRING,\n      COMMENT,\n      // Skip numbers when they are part of a variable name\n      { match: /\\$\\d+/ },\n      NUMBER,\n      CLASS_REFERENCE,\n      {\n        className: 'attr',\n        begin: IDENT_RE$1 + regex.lookahead(':'),\n        relevance: 0\n      },\n      FUNCTION_VARIABLE,\n      { // \"value\" container\n        begin: '(' + hljs.RE_STARTERS_RE + '|\\\\b(case|return|throw)\\\\b)\\\\s*',\n        keywords: 'return throw case',\n        relevance: 0,\n        contains: [\n          COMMENT,\n          hljs.REGEXP_MODE,\n          {\n            className: 'function',\n            // we have to count the parens to make sure we actually have the\n            // correct bounding ( ) before the =>.  There could be any number of\n            // sub-expressions inside also surrounded by parens.\n            begin: FUNC_LEAD_IN_RE,\n            returnBegin: true,\n            end: '\\\\s*=>',\n            contains: [\n              {\n                className: 'params',\n                variants: [\n                  {\n                    begin: hljs.UNDERSCORE_IDENT_RE,\n                    relevance: 0\n                  },\n                  {\n                    className: null,\n                    begin: /\\(\\s*\\)/,\n                    skip: true\n                  },\n                  {\n                    begin: /\\(/,\n                    end: /\\)/,\n                    excludeBegin: true,\n                    excludeEnd: true,\n                    keywords: KEYWORDS$1,\n                    contains: PARAMS_CONTAINS\n                  }\n                ]\n              }\n            ]\n          },\n          { // could be a comma delimited list of params to a function call\n            begin: /,/,\n            relevance: 0\n          },\n          {\n            match: /\\s+/,\n            relevance: 0\n          },\n          { // JSX\n            variants: [\n              { begin: FRAGMENT.begin, end: FRAGMENT.end },\n              { match: XML_SELF_CLOSING },\n              {\n                begin: XML_TAG.begin,\n                // we carefully check the opening tag to see if it truly\n                // is a tag and not a false positive\n                'on:begin': XML_TAG.isTrulyOpeningTag,\n                end: XML_TAG.end\n              }\n            ],\n            subLanguage: 'xml',\n            contains: [\n              {\n                begin: XML_TAG.begin,\n                end: XML_TAG.end,\n                skip: true,\n                contains: ['self']\n              }\n            ]\n          }\n        ],\n      },\n      FUNCTION_DEFINITION,\n      {\n        // prevent this from getting swallowed up by function\n        // since they appear \"function like\"\n        beginKeywords: \"while if switch catch for\"\n      },\n      {\n        // we have to count the parens to make sure we actually have the correct\n        // bounding ( ).  There could be any number of sub-expressions inside\n        // also surrounded by parens.\n        begin: '\\\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +\n          '\\\\(' + // first parens\n          '[^()]*(\\\\(' +\n            '[^()]*(\\\\(' +\n              '[^()]*' +\n            '\\\\)[^()]*)*' +\n          '\\\\)[^()]*)*' +\n          '\\\\)\\\\s*\\\\{', // end parens\n        returnBegin:true,\n        label: \"func.def\",\n        contains: [\n          PARAMS,\n          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: \"title.function\" })\n        ]\n      },\n      // catch ... so it won't trigger the property rule below\n      {\n        match: /\\.\\.\\./,\n        relevance: 0\n      },\n      PROPERTY_ACCESS,\n      // hack: prevents detection of keywords in some circumstances\n      // .keyword()\n      // $keyword = x\n      {\n        match: '\\\\$' + IDENT_RE$1,\n        relevance: 0\n      },\n      {\n        match: [ /\\bconstructor(?=\\s*\\()/ ],\n        className: { 1: \"title.function\" },\n        contains: [ PARAMS ]\n      },\n      FUNCTION_CALL,\n      UPPER_CASE_CONSTANT,\n      CLASS_OR_EXTENDS,\n      GETTER_OR_SETTER,\n      {\n        match: /\\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`\n      }\n    ]\n  };\n}\n\nmodule.exports = javascript;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/languages/javascript.js?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/scss.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/scss.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("const MODES = (hljs) => {\n  return {\n    IMPORTANT: {\n      scope: 'meta',\n      begin: '!important'\n    },\n    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,\n    HEXCOLOR: {\n      scope: 'number',\n      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\\b/\n    },\n    FUNCTION_DISPATCH: {\n      className: \"built_in\",\n      begin: /[\\w-]+(?=\\()/\n    },\n    ATTRIBUTE_SELECTOR_MODE: {\n      scope: 'selector-attr',\n      begin: /\\[/,\n      end: /\\]/,\n      illegal: '$',\n      contains: [\n        hljs.APOS_STRING_MODE,\n        hljs.QUOTE_STRING_MODE\n      ]\n    },\n    CSS_NUMBER_MODE: {\n      scope: 'number',\n      begin: hljs.NUMBER_RE + '(' +\n        '%|em|ex|ch|rem' +\n        '|vw|vh|vmin|vmax' +\n        '|cm|mm|in|pt|pc|px' +\n        '|deg|grad|rad|turn' +\n        '|s|ms' +\n        '|Hz|kHz' +\n        '|dpi|dpcm|dppx' +\n        ')?',\n      relevance: 0\n    },\n    CSS_VARIABLE: {\n      className: \"attr\",\n      begin: /--[A-Za-z_][A-Za-z0-9_-]*/\n    }\n  };\n};\n\nconst TAGS = [\n  'a',\n  'abbr',\n  'address',\n  'article',\n  'aside',\n  'audio',\n  'b',\n  'blockquote',\n  'body',\n  'button',\n  'canvas',\n  'caption',\n  'cite',\n  'code',\n  'dd',\n  'del',\n  'details',\n  'dfn',\n  'div',\n  'dl',\n  'dt',\n  'em',\n  'fieldset',\n  'figcaption',\n  'figure',\n  'footer',\n  'form',\n  'h1',\n  'h2',\n  'h3',\n  'h4',\n  'h5',\n  'h6',\n  'header',\n  'hgroup',\n  'html',\n  'i',\n  'iframe',\n  'img',\n  'input',\n  'ins',\n  'kbd',\n  'label',\n  'legend',\n  'li',\n  'main',\n  'mark',\n  'menu',\n  'nav',\n  'object',\n  'ol',\n  'p',\n  'q',\n  'quote',\n  'samp',\n  'section',\n  'span',\n  'strong',\n  'summary',\n  'sup',\n  'table',\n  'tbody',\n  'td',\n  'textarea',\n  'tfoot',\n  'th',\n  'thead',\n  'time',\n  'tr',\n  'ul',\n  'var',\n  'video'\n];\n\nconst MEDIA_FEATURES = [\n  'any-hover',\n  'any-pointer',\n  'aspect-ratio',\n  'color',\n  'color-gamut',\n  'color-index',\n  'device-aspect-ratio',\n  'device-height',\n  'device-width',\n  'display-mode',\n  'forced-colors',\n  'grid',\n  'height',\n  'hover',\n  'inverted-colors',\n  'monochrome',\n  'orientation',\n  'overflow-block',\n  'overflow-inline',\n  'pointer',\n  'prefers-color-scheme',\n  'prefers-contrast',\n  'prefers-reduced-motion',\n  'prefers-reduced-transparency',\n  'resolution',\n  'scan',\n  'scripting',\n  'update',\n  'width',\n  // TODO: find a better solution?\n  'min-width',\n  'max-width',\n  'min-height',\n  'max-height'\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes\nconst PSEUDO_CLASSES = [\n  'active',\n  'any-link',\n  'blank',\n  'checked',\n  'current',\n  'default',\n  'defined',\n  'dir', // dir()\n  'disabled',\n  'drop',\n  'empty',\n  'enabled',\n  'first',\n  'first-child',\n  'first-of-type',\n  'fullscreen',\n  'future',\n  'focus',\n  'focus-visible',\n  'focus-within',\n  'has', // has()\n  'host', // host or host()\n  'host-context', // host-context()\n  'hover',\n  'indeterminate',\n  'in-range',\n  'invalid',\n  'is', // is()\n  'lang', // lang()\n  'last-child',\n  'last-of-type',\n  'left',\n  'link',\n  'local-link',\n  'not', // not()\n  'nth-child', // nth-child()\n  'nth-col', // nth-col()\n  'nth-last-child', // nth-last-child()\n  'nth-last-col', // nth-last-col()\n  'nth-last-of-type', //nth-last-of-type()\n  'nth-of-type', //nth-of-type()\n  'only-child',\n  'only-of-type',\n  'optional',\n  'out-of-range',\n  'past',\n  'placeholder-shown',\n  'read-only',\n  'read-write',\n  'required',\n  'right',\n  'root',\n  'scope',\n  'target',\n  'target-within',\n  'user-invalid',\n  'valid',\n  'visited',\n  'where' // where()\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements\nconst PSEUDO_ELEMENTS = [\n  'after',\n  'backdrop',\n  'before',\n  'cue',\n  'cue-region',\n  'first-letter',\n  'first-line',\n  'grammar-error',\n  'marker',\n  'part',\n  'placeholder',\n  'selection',\n  'slotted',\n  'spelling-error'\n];\n\nconst ATTRIBUTES = [\n  'align-content',\n  'align-items',\n  'align-self',\n  'all',\n  'animation',\n  'animation-delay',\n  'animation-direction',\n  'animation-duration',\n  'animation-fill-mode',\n  'animation-iteration-count',\n  'animation-name',\n  'animation-play-state',\n  'animation-timing-function',\n  'backface-visibility',\n  'background',\n  'background-attachment',\n  'background-blend-mode',\n  'background-clip',\n  'background-color',\n  'background-image',\n  'background-origin',\n  'background-position',\n  'background-repeat',\n  'background-size',\n  'block-size',\n  'border',\n  'border-block',\n  'border-block-color',\n  'border-block-end',\n  'border-block-end-color',\n  'border-block-end-style',\n  'border-block-end-width',\n  'border-block-start',\n  'border-block-start-color',\n  'border-block-start-style',\n  'border-block-start-width',\n  'border-block-style',\n  'border-block-width',\n  'border-bottom',\n  'border-bottom-color',\n  'border-bottom-left-radius',\n  'border-bottom-right-radius',\n  'border-bottom-style',\n  'border-bottom-width',\n  'border-collapse',\n  'border-color',\n  'border-image',\n  'border-image-outset',\n  'border-image-repeat',\n  'border-image-slice',\n  'border-image-source',\n  'border-image-width',\n  'border-inline',\n  'border-inline-color',\n  'border-inline-end',\n  'border-inline-end-color',\n  'border-inline-end-style',\n  'border-inline-end-width',\n  'border-inline-start',\n  'border-inline-start-color',\n  'border-inline-start-style',\n  'border-inline-start-width',\n  'border-inline-style',\n  'border-inline-width',\n  'border-left',\n  'border-left-color',\n  'border-left-style',\n  'border-left-width',\n  'border-radius',\n  'border-right',\n  'border-right-color',\n  'border-right-style',\n  'border-right-width',\n  'border-spacing',\n  'border-style',\n  'border-top',\n  'border-top-color',\n  'border-top-left-radius',\n  'border-top-right-radius',\n  'border-top-style',\n  'border-top-width',\n  'border-width',\n  'bottom',\n  'box-decoration-break',\n  'box-shadow',\n  'box-sizing',\n  'break-after',\n  'break-before',\n  'break-inside',\n  'caption-side',\n  'caret-color',\n  'clear',\n  'clip',\n  'clip-path',\n  'clip-rule',\n  'color',\n  'column-count',\n  'column-fill',\n  'column-gap',\n  'column-rule',\n  'column-rule-color',\n  'column-rule-style',\n  'column-rule-width',\n  'column-span',\n  'column-width',\n  'columns',\n  'contain',\n  'content',\n  'content-visibility',\n  'counter-increment',\n  'counter-reset',\n  'cue',\n  'cue-after',\n  'cue-before',\n  'cursor',\n  'direction',\n  'display',\n  'empty-cells',\n  'filter',\n  'flex',\n  'flex-basis',\n  'flex-direction',\n  'flex-flow',\n  'flex-grow',\n  'flex-shrink',\n  'flex-wrap',\n  'float',\n  'flow',\n  'font',\n  'font-display',\n  'font-family',\n  'font-feature-settings',\n  'font-kerning',\n  'font-language-override',\n  'font-size',\n  'font-size-adjust',\n  'font-smoothing',\n  'font-stretch',\n  'font-style',\n  'font-synthesis',\n  'font-variant',\n  'font-variant-caps',\n  'font-variant-east-asian',\n  'font-variant-ligatures',\n  'font-variant-numeric',\n  'font-variant-position',\n  'font-variation-settings',\n  'font-weight',\n  'gap',\n  'glyph-orientation-vertical',\n  'grid',\n  'grid-area',\n  'grid-auto-columns',\n  'grid-auto-flow',\n  'grid-auto-rows',\n  'grid-column',\n  'grid-column-end',\n  'grid-column-start',\n  'grid-gap',\n  'grid-row',\n  'grid-row-end',\n  'grid-row-start',\n  'grid-template',\n  'grid-template-areas',\n  'grid-template-columns',\n  'grid-template-rows',\n  'hanging-punctuation',\n  'height',\n  'hyphens',\n  'icon',\n  'image-orientation',\n  'image-rendering',\n  'image-resolution',\n  'ime-mode',\n  'inline-size',\n  'isolation',\n  'justify-content',\n  'left',\n  'letter-spacing',\n  'line-break',\n  'line-height',\n  'list-style',\n  'list-style-image',\n  'list-style-position',\n  'list-style-type',\n  'margin',\n  'margin-block',\n  'margin-block-end',\n  'margin-block-start',\n  'margin-bottom',\n  'margin-inline',\n  'margin-inline-end',\n  'margin-inline-start',\n  'margin-left',\n  'margin-right',\n  'margin-top',\n  'marks',\n  'mask',\n  'mask-border',\n  'mask-border-mode',\n  'mask-border-outset',\n  'mask-border-repeat',\n  'mask-border-slice',\n  'mask-border-source',\n  'mask-border-width',\n  'mask-clip',\n  'mask-composite',\n  'mask-image',\n  'mask-mode',\n  'mask-origin',\n  'mask-position',\n  'mask-repeat',\n  'mask-size',\n  'mask-type',\n  'max-block-size',\n  'max-height',\n  'max-inline-size',\n  'max-width',\n  'min-block-size',\n  'min-height',\n  'min-inline-size',\n  'min-width',\n  'mix-blend-mode',\n  'nav-down',\n  'nav-index',\n  'nav-left',\n  'nav-right',\n  'nav-up',\n  'none',\n  'normal',\n  'object-fit',\n  'object-position',\n  'opacity',\n  'order',\n  'orphans',\n  'outline',\n  'outline-color',\n  'outline-offset',\n  'outline-style',\n  'outline-width',\n  'overflow',\n  'overflow-wrap',\n  'overflow-x',\n  'overflow-y',\n  'padding',\n  'padding-block',\n  'padding-block-end',\n  'padding-block-start',\n  'padding-bottom',\n  'padding-inline',\n  'padding-inline-end',\n  'padding-inline-start',\n  'padding-left',\n  'padding-right',\n  'padding-top',\n  'page-break-after',\n  'page-break-before',\n  'page-break-inside',\n  'pause',\n  'pause-after',\n  'pause-before',\n  'perspective',\n  'perspective-origin',\n  'pointer-events',\n  'position',\n  'quotes',\n  'resize',\n  'rest',\n  'rest-after',\n  'rest-before',\n  'right',\n  'row-gap',\n  'scroll-margin',\n  'scroll-margin-block',\n  'scroll-margin-block-end',\n  'scroll-margin-block-start',\n  'scroll-margin-bottom',\n  'scroll-margin-inline',\n  'scroll-margin-inline-end',\n  'scroll-margin-inline-start',\n  'scroll-margin-left',\n  'scroll-margin-right',\n  'scroll-margin-top',\n  'scroll-padding',\n  'scroll-padding-block',\n  'scroll-padding-block-end',\n  'scroll-padding-block-start',\n  'scroll-padding-bottom',\n  'scroll-padding-inline',\n  'scroll-padding-inline-end',\n  'scroll-padding-inline-start',\n  'scroll-padding-left',\n  'scroll-padding-right',\n  'scroll-padding-top',\n  'scroll-snap-align',\n  'scroll-snap-stop',\n  'scroll-snap-type',\n  'scrollbar-color',\n  'scrollbar-gutter',\n  'scrollbar-width',\n  'shape-image-threshold',\n  'shape-margin',\n  'shape-outside',\n  'speak',\n  'speak-as',\n  'src', // @font-face\n  'tab-size',\n  'table-layout',\n  'text-align',\n  'text-align-all',\n  'text-align-last',\n  'text-combine-upright',\n  'text-decoration',\n  'text-decoration-color',\n  'text-decoration-line',\n  'text-decoration-style',\n  'text-emphasis',\n  'text-emphasis-color',\n  'text-emphasis-position',\n  'text-emphasis-style',\n  'text-indent',\n  'text-justify',\n  'text-orientation',\n  'text-overflow',\n  'text-rendering',\n  'text-shadow',\n  'text-transform',\n  'text-underline-position',\n  'top',\n  'transform',\n  'transform-box',\n  'transform-origin',\n  'transform-style',\n  'transition',\n  'transition-delay',\n  'transition-duration',\n  'transition-property',\n  'transition-timing-function',\n  'unicode-bidi',\n  'vertical-align',\n  'visibility',\n  'voice-balance',\n  'voice-duration',\n  'voice-family',\n  'voice-pitch',\n  'voice-range',\n  'voice-rate',\n  'voice-stress',\n  'voice-volume',\n  'white-space',\n  'widows',\n  'width',\n  'will-change',\n  'word-break',\n  'word-spacing',\n  'word-wrap',\n  'writing-mode',\n  'z-index'\n  // reverse makes sure longer attributes `font-weight` are matched fully\n  // instead of getting false positives on say `font`\n].reverse();\n\n/*\nLanguage: SCSS\nDescription: Scss is an extension of the syntax of CSS.\nAuthor: Kurt Emch <kurt@kurtemch.com>\nWebsite: https://sass-lang.com\nCategory: common, css, web\n*/\n\n\n/** @type LanguageFn */\nfunction scss(hljs) {\n  const modes = MODES(hljs);\n  const PSEUDO_ELEMENTS$1 = PSEUDO_ELEMENTS;\n  const PSEUDO_CLASSES$1 = PSEUDO_CLASSES;\n\n  const AT_IDENTIFIER = '@[a-z-]+'; // @font-face\n  const AT_MODIFIERS = \"and or not only\";\n  const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';\n  const VARIABLE = {\n    className: 'variable',\n    begin: '(\\\\$' + IDENT_RE + ')\\\\b',\n    relevance: 0\n  };\n\n  return {\n    name: 'SCSS',\n    case_insensitive: true,\n    illegal: '[=/|\\']',\n    contains: [\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      // to recognize keyframe 40% etc which are outside the scope of our\n      // attribute value mode\n      modes.CSS_NUMBER_MODE,\n      {\n        className: 'selector-id',\n        begin: '#[A-Za-z0-9_-]+',\n        relevance: 0\n      },\n      {\n        className: 'selector-class',\n        begin: '\\\\.[A-Za-z0-9_-]+',\n        relevance: 0\n      },\n      modes.ATTRIBUTE_SELECTOR_MODE,\n      {\n        className: 'selector-tag',\n        begin: '\\\\b(' + TAGS.join('|') + ')\\\\b',\n        // was there, before, but why?\n        relevance: 0\n      },\n      {\n        className: 'selector-pseudo',\n        begin: ':(' + PSEUDO_CLASSES$1.join('|') + ')'\n      },\n      {\n        className: 'selector-pseudo',\n        begin: ':(:)?(' + PSEUDO_ELEMENTS$1.join('|') + ')'\n      },\n      VARIABLE,\n      { // pseudo-selector params\n        begin: /\\(/,\n        end: /\\)/,\n        contains: [ modes.CSS_NUMBER_MODE ]\n      },\n      modes.CSS_VARIABLE,\n      {\n        className: 'attribute',\n        begin: '\\\\b(' + ATTRIBUTES.join('|') + ')\\\\b'\n      },\n      { begin: '\\\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\\\b' },\n      {\n        begin: /:/,\n        end: /[;}{]/,\n        relevance: 0,\n        contains: [\n          modes.BLOCK_COMMENT,\n          VARIABLE,\n          modes.HEXCOLOR,\n          modes.CSS_NUMBER_MODE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.APOS_STRING_MODE,\n          modes.IMPORTANT,\n          modes.FUNCTION_DISPATCH\n        ]\n      },\n      // matching these here allows us to treat them more like regular CSS\n      // rules so everything between the {} gets regular rule highlighting,\n      // which is what we want for page and font-face\n      {\n        begin: '@(page|font-face)',\n        keywords: {\n          $pattern: AT_IDENTIFIER,\n          keyword: '@page @font-face'\n        }\n      },\n      {\n        begin: '@',\n        end: '[{;]',\n        returnBegin: true,\n        keywords: {\n          $pattern: /[a-z-]+/,\n          keyword: AT_MODIFIERS,\n          attribute: MEDIA_FEATURES.join(\" \")\n        },\n        contains: [\n          {\n            begin: AT_IDENTIFIER,\n            className: \"keyword\"\n          },\n          {\n            begin: /[a-z-]+(?=:)/,\n            className: \"attribute\"\n          },\n          VARIABLE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.APOS_STRING_MODE,\n          modes.HEXCOLOR,\n          modes.CSS_NUMBER_MODE\n        ]\n      },\n      modes.FUNCTION_DISPATCH\n    ]\n  };\n}\n\nmodule.exports = scss;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/languages/scss.js?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/typescript.js":
/*!***************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/typescript.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';\nconst KEYWORDS = [\n  \"as\", // for exports\n  \"in\",\n  \"of\",\n  \"if\",\n  \"for\",\n  \"while\",\n  \"finally\",\n  \"var\",\n  \"new\",\n  \"function\",\n  \"do\",\n  \"return\",\n  \"void\",\n  \"else\",\n  \"break\",\n  \"catch\",\n  \"instanceof\",\n  \"with\",\n  \"throw\",\n  \"case\",\n  \"default\",\n  \"try\",\n  \"switch\",\n  \"continue\",\n  \"typeof\",\n  \"delete\",\n  \"let\",\n  \"yield\",\n  \"const\",\n  \"class\",\n  // JS handles these with a special rule\n  // \"get\",\n  // \"set\",\n  \"debugger\",\n  \"async\",\n  \"await\",\n  \"static\",\n  \"import\",\n  \"from\",\n  \"export\",\n  \"extends\"\n];\nconst LITERALS = [\n  \"true\",\n  \"false\",\n  \"null\",\n  \"undefined\",\n  \"NaN\",\n  \"Infinity\"\n];\n\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects\nconst TYPES = [\n  // Fundamental objects\n  \"Object\",\n  \"Function\",\n  \"Boolean\",\n  \"Symbol\",\n  // numbers and dates\n  \"Math\",\n  \"Date\",\n  \"Number\",\n  \"BigInt\",\n  // text\n  \"String\",\n  \"RegExp\",\n  // Indexed collections\n  \"Array\",\n  \"Float32Array\",\n  \"Float64Array\",\n  \"Int8Array\",\n  \"Uint8Array\",\n  \"Uint8ClampedArray\",\n  \"Int16Array\",\n  \"Int32Array\",\n  \"Uint16Array\",\n  \"Uint32Array\",\n  \"BigInt64Array\",\n  \"BigUint64Array\",\n  // Keyed collections\n  \"Set\",\n  \"Map\",\n  \"WeakSet\",\n  \"WeakMap\",\n  // Structured data\n  \"ArrayBuffer\",\n  \"SharedArrayBuffer\",\n  \"Atomics\",\n  \"DataView\",\n  \"JSON\",\n  // Control abstraction objects\n  \"Promise\",\n  \"Generator\",\n  \"GeneratorFunction\",\n  \"AsyncFunction\",\n  // Reflection\n  \"Reflect\",\n  \"Proxy\",\n  // Internationalization\n  \"Intl\",\n  // WebAssembly\n  \"WebAssembly\"\n];\n\nconst ERROR_TYPES = [\n  \"Error\",\n  \"EvalError\",\n  \"InternalError\",\n  \"RangeError\",\n  \"ReferenceError\",\n  \"SyntaxError\",\n  \"TypeError\",\n  \"URIError\"\n];\n\nconst BUILT_IN_GLOBALS = [\n  \"setInterval\",\n  \"setTimeout\",\n  \"clearInterval\",\n  \"clearTimeout\",\n\n  \"require\",\n  \"exports\",\n\n  \"eval\",\n  \"isFinite\",\n  \"isNaN\",\n  \"parseFloat\",\n  \"parseInt\",\n  \"decodeURI\",\n  \"decodeURIComponent\",\n  \"encodeURI\",\n  \"encodeURIComponent\",\n  \"escape\",\n  \"unescape\"\n];\n\nconst BUILT_IN_VARIABLES = [\n  \"arguments\",\n  \"this\",\n  \"super\",\n  \"console\",\n  \"window\",\n  \"document\",\n  \"localStorage\",\n  \"sessionStorage\",\n  \"module\",\n  \"global\" // Node.js\n];\n\nconst BUILT_INS = [].concat(\n  BUILT_IN_GLOBALS,\n  TYPES,\n  ERROR_TYPES\n);\n\n/*\nLanguage: JavaScript\nDescription: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.\nCategory: common, scripting, web\nWebsite: https://developer.mozilla.org/en-US/docs/Web/JavaScript\n*/\n\n\n/** @type LanguageFn */\nfunction javascript(hljs) {\n  const regex = hljs.regex;\n  /**\n   * Takes a string like \"<Booger\" and checks to see\n   * if we can find a matching \"</Booger\" later in the\n   * content.\n   * @param {RegExpMatchArray} match\n   * @param {{after:number}} param1\n   */\n  const hasClosingTag = (match, { after }) => {\n    const tag = \"</\" + match[0].slice(1);\n    const pos = match.input.indexOf(tag, after);\n    return pos !== -1;\n  };\n\n  const IDENT_RE$1 = IDENT_RE;\n  const FRAGMENT = {\n    begin: '<>',\n    end: '</>'\n  };\n  // to avoid some special cases inside isTrulyOpeningTag\n  const XML_SELF_CLOSING = /<[A-Za-z0-9\\\\._:-]+\\s*\\/>/;\n  const XML_TAG = {\n    begin: /<[A-Za-z0-9\\\\._:-]+/,\n    end: /\\/[A-Za-z0-9\\\\._:-]+>|\\/>/,\n    /**\n     * @param {RegExpMatchArray} match\n     * @param {CallbackResponse} response\n     */\n    isTrulyOpeningTag: (match, response) => {\n      const afterMatchIndex = match[0].length + match.index;\n      const nextChar = match.input[afterMatchIndex];\n      if (\n        // HTML should not include another raw `<` inside a tag\n        // nested type?\n        // `<Array<Array<number>>`, etc.\n        nextChar === \"<\" ||\n        // the , gives away that this is not HTML\n        // `<T, A extends keyof T, V>`\n        nextChar === \",\"\n        ) {\n        response.ignoreMatch();\n        return;\n      }\n\n      // `<something>`\n      // Quite possibly a tag, lets look for a matching closing tag...\n      if (nextChar === \">\") {\n        // if we cannot find a matching closing tag, then we\n        // will ignore it\n        if (!hasClosingTag(match, { after: afterMatchIndex })) {\n          response.ignoreMatch();\n        }\n      }\n\n      // `<blah />` (self-closing)\n      // handled by simpleSelfClosing rule\n\n      let m;\n      const afterMatch = match.input.substring(afterMatchIndex);\n\n      // some more template typing stuff\n      //  <T = any>(key?: string) => Modify<\n      if ((m = afterMatch.match(/^\\s*=/))) {\n        response.ignoreMatch();\n        return;\n      }\n\n      // `<From extends string>`\n      // technically this could be HTML, but it smells like a type\n      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276\n      if ((m = afterMatch.match(/^\\s+extends\\s+/))) {\n        if (m.index === 0) {\n          response.ignoreMatch();\n          // eslint-disable-next-line no-useless-return\n          return;\n        }\n      }\n    }\n  };\n  const KEYWORDS$1 = {\n    $pattern: IDENT_RE,\n    keyword: KEYWORDS,\n    literal: LITERALS,\n    built_in: BUILT_INS,\n    \"variable.language\": BUILT_IN_VARIABLES\n  };\n\n  // https://tc39.es/ecma262/#sec-literals-numeric-literals\n  const decimalDigits = '[0-9](_?[0-9])*';\n  const frac = `\\\\.(${decimalDigits})`;\n  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral\n  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals\n  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;\n  const NUMBER = {\n    className: 'number',\n    variants: [\n      // DecimalLiteral\n      { begin: `(\\\\b(${decimalInteger})((${frac})|\\\\.)?|(${frac}))` +\n        `[eE][+-]?(${decimalDigits})\\\\b` },\n      { begin: `\\\\b(${decimalInteger})\\\\b((${frac})\\\\b|\\\\.)?|(${frac})\\\\b` },\n\n      // DecimalBigIntegerLiteral\n      { begin: `\\\\b(0|[1-9](_?[0-9])*)n\\\\b` },\n\n      // NonDecimalIntegerLiteral\n      { begin: \"\\\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\\\b\" },\n      { begin: \"\\\\b0[bB][0-1](_?[0-1])*n?\\\\b\" },\n      { begin: \"\\\\b0[oO][0-7](_?[0-7])*n?\\\\b\" },\n\n      // LegacyOctalIntegerLiteral (does not include underscore separators)\n      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals\n      { begin: \"\\\\b0[0-7]+n?\\\\b\" },\n    ],\n    relevance: 0\n  };\n\n  const SUBST = {\n    className: 'subst',\n    begin: '\\\\$\\\\{',\n    end: '\\\\}',\n    keywords: KEYWORDS$1,\n    contains: [] // defined later\n  };\n  const HTML_TEMPLATE = {\n    begin: 'html`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'xml'\n    }\n  };\n  const CSS_TEMPLATE = {\n    begin: 'css`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'css'\n    }\n  };\n  const GRAPHQL_TEMPLATE = {\n    begin: 'gql`',\n    end: '',\n    starts: {\n      end: '`',\n      returnEnd: false,\n      contains: [\n        hljs.BACKSLASH_ESCAPE,\n        SUBST\n      ],\n      subLanguage: 'graphql'\n    }\n  };\n  const TEMPLATE_STRING = {\n    className: 'string',\n    begin: '`',\n    end: '`',\n    contains: [\n      hljs.BACKSLASH_ESCAPE,\n      SUBST\n    ]\n  };\n  const JSDOC_COMMENT = hljs.COMMENT(\n    /\\/\\*\\*(?!\\/)/,\n    '\\\\*/',\n    {\n      relevance: 0,\n      contains: [\n        {\n          begin: '(?=@[A-Za-z]+)',\n          relevance: 0,\n          contains: [\n            {\n              className: 'doctag',\n              begin: '@[A-Za-z]+'\n            },\n            {\n              className: 'type',\n              begin: '\\\\{',\n              end: '\\\\}',\n              excludeEnd: true,\n              excludeBegin: true,\n              relevance: 0\n            },\n            {\n              className: 'variable',\n              begin: IDENT_RE$1 + '(?=\\\\s*(-)|$)',\n              endsParent: true,\n              relevance: 0\n            },\n            // eat spaces (not newlines) so we can find\n            // types or variables\n            {\n              begin: /(?=[^\\n])\\s/,\n              relevance: 0\n            }\n          ]\n        }\n      ]\n    }\n  );\n  const COMMENT = {\n    className: \"comment\",\n    variants: [\n      JSDOC_COMMENT,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.C_LINE_COMMENT_MODE\n    ]\n  };\n  const SUBST_INTERNALS = [\n    hljs.APOS_STRING_MODE,\n    hljs.QUOTE_STRING_MODE,\n    HTML_TEMPLATE,\n    CSS_TEMPLATE,\n    GRAPHQL_TEMPLATE,\n    TEMPLATE_STRING,\n    // Skip numbers when they are part of a variable name\n    { match: /\\$\\d+/ },\n    NUMBER,\n    // This is intentional:\n    // See https://github.com/highlightjs/highlight.js/issues/3288\n    // hljs.REGEXP_MODE\n  ];\n  SUBST.contains = SUBST_INTERNALS\n    .concat({\n      // we need to pair up {} inside our subst to prevent\n      // it from ending too early by matching another }\n      begin: /\\{/,\n      end: /\\}/,\n      keywords: KEYWORDS$1,\n      contains: [\n        \"self\"\n      ].concat(SUBST_INTERNALS)\n    });\n  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);\n  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([\n    // eat recursive parens in sub expressions\n    {\n      begin: /\\(/,\n      end: /\\)/,\n      keywords: KEYWORDS$1,\n      contains: [\"self\"].concat(SUBST_AND_COMMENTS)\n    }\n  ]);\n  const PARAMS = {\n    className: 'params',\n    begin: /\\(/,\n    end: /\\)/,\n    excludeBegin: true,\n    excludeEnd: true,\n    keywords: KEYWORDS$1,\n    contains: PARAMS_CONTAINS\n  };\n\n  // ES6 classes\n  const CLASS_OR_EXTENDS = {\n    variants: [\n      // class Car extends vehicle\n      {\n        match: [\n          /class/,\n          /\\s+/,\n          IDENT_RE$1,\n          /\\s+/,\n          /extends/,\n          /\\s+/,\n          regex.concat(IDENT_RE$1, \"(\", regex.concat(/\\./, IDENT_RE$1), \")*\")\n        ],\n        scope: {\n          1: \"keyword\",\n          3: \"title.class\",\n          5: \"keyword\",\n          7: \"title.class.inherited\"\n        }\n      },\n      // class Car\n      {\n        match: [\n          /class/,\n          /\\s+/,\n          IDENT_RE$1\n        ],\n        scope: {\n          1: \"keyword\",\n          3: \"title.class\"\n        }\n      },\n\n    ]\n  };\n\n  const CLASS_REFERENCE = {\n    relevance: 0,\n    match:\n    regex.either(\n      // Hard coded exceptions\n      /\\bJSON/,\n      // Float32Array, OutT\n      /\\b[A-Z][a-z]+([A-Z][a-z]*|\\d)*/,\n      // CSSFactory, CSSFactoryT\n      /\\b[A-Z]{2,}([A-Z][a-z]+|\\d)+([A-Z][a-z]*)*/,\n      // FPs, FPsT\n      /\\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\\d)*([A-Z][a-z]*)*/,\n      // P\n      // single letters are not highlighted\n      // BLAH\n      // this will be flagged as a UPPER_CASE_CONSTANT instead\n    ),\n    className: \"title.class\",\n    keywords: {\n      _: [\n        // se we still get relevance credit for JS library classes\n        ...TYPES,\n        ...ERROR_TYPES\n      ]\n    }\n  };\n\n  const USE_STRICT = {\n    label: \"use_strict\",\n    className: 'meta',\n    relevance: 10,\n    begin: /^\\s*['\"]use (strict|asm)['\"]/\n  };\n\n  const FUNCTION_DEFINITION = {\n    variants: [\n      {\n        match: [\n          /function/,\n          /\\s+/,\n          IDENT_RE$1,\n          /(?=\\s*\\()/\n        ]\n      },\n      // anonymous function\n      {\n        match: [\n          /function/,\n          /\\s*(?=\\()/\n        ]\n      }\n    ],\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    label: \"func.def\",\n    contains: [ PARAMS ],\n    illegal: /%/\n  };\n\n  const UPPER_CASE_CONSTANT = {\n    relevance: 0,\n    match: /\\b[A-Z][A-Z_0-9]+\\b/,\n    className: \"variable.constant\"\n  };\n\n  function noneOf(list) {\n    return regex.concat(\"(?!\", list.join(\"|\"), \")\");\n  }\n\n  const FUNCTION_CALL = {\n    match: regex.concat(\n      /\\b/,\n      noneOf([\n        ...BUILT_IN_GLOBALS,\n        \"super\",\n        \"import\"\n      ]),\n      IDENT_RE$1, regex.lookahead(/\\(/)),\n    className: \"title.function\",\n    relevance: 0\n  };\n\n  const PROPERTY_ACCESS = {\n    begin: regex.concat(/\\./, regex.lookahead(\n      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)\n    )),\n    end: IDENT_RE$1,\n    excludeBegin: true,\n    keywords: \"prototype\",\n    className: \"property\",\n    relevance: 0\n  };\n\n  const GETTER_OR_SETTER = {\n    match: [\n      /get|set/,\n      /\\s+/,\n      IDENT_RE$1,\n      /(?=\\()/\n    ],\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    contains: [\n      { // eat to avoid empty params\n        begin: /\\(\\)/\n      },\n      PARAMS\n    ]\n  };\n\n  const FUNC_LEAD_IN_RE = '(\\\\(' +\n    '[^()]*(\\\\(' +\n    '[^()]*(\\\\(' +\n    '[^()]*' +\n    '\\\\)[^()]*)*' +\n    '\\\\)[^()]*)*' +\n    '\\\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\\\s*=>';\n\n  const FUNCTION_VARIABLE = {\n    match: [\n      /const|var|let/, /\\s+/,\n      IDENT_RE$1, /\\s*/,\n      /=\\s*/,\n      /(async\\s*)?/, // async is optional\n      regex.lookahead(FUNC_LEAD_IN_RE)\n    ],\n    keywords: \"async\",\n    className: {\n      1: \"keyword\",\n      3: \"title.function\"\n    },\n    contains: [\n      PARAMS\n    ]\n  };\n\n  return {\n    name: 'JavaScript',\n    aliases: ['js', 'jsx', 'mjs', 'cjs'],\n    keywords: KEYWORDS$1,\n    // this will be extended by TypeScript\n    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },\n    illegal: /#(?![$_A-z])/,\n    contains: [\n      hljs.SHEBANG({\n        label: \"shebang\",\n        binary: \"node\",\n        relevance: 5\n      }),\n      USE_STRICT,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      HTML_TEMPLATE,\n      CSS_TEMPLATE,\n      GRAPHQL_TEMPLATE,\n      TEMPLATE_STRING,\n      COMMENT,\n      // Skip numbers when they are part of a variable name\n      { match: /\\$\\d+/ },\n      NUMBER,\n      CLASS_REFERENCE,\n      {\n        className: 'attr',\n        begin: IDENT_RE$1 + regex.lookahead(':'),\n        relevance: 0\n      },\n      FUNCTION_VARIABLE,\n      { // \"value\" container\n        begin: '(' + hljs.RE_STARTERS_RE + '|\\\\b(case|return|throw)\\\\b)\\\\s*',\n        keywords: 'return throw case',\n        relevance: 0,\n        contains: [\n          COMMENT,\n          hljs.REGEXP_MODE,\n          {\n            className: 'function',\n            // we have to count the parens to make sure we actually have the\n            // correct bounding ( ) before the =>.  There could be any number of\n            // sub-expressions inside also surrounded by parens.\n            begin: FUNC_LEAD_IN_RE,\n            returnBegin: true,\n            end: '\\\\s*=>',\n            contains: [\n              {\n                className: 'params',\n                variants: [\n                  {\n                    begin: hljs.UNDERSCORE_IDENT_RE,\n                    relevance: 0\n                  },\n                  {\n                    className: null,\n                    begin: /\\(\\s*\\)/,\n                    skip: true\n                  },\n                  {\n                    begin: /\\(/,\n                    end: /\\)/,\n                    excludeBegin: true,\n                    excludeEnd: true,\n                    keywords: KEYWORDS$1,\n                    contains: PARAMS_CONTAINS\n                  }\n                ]\n              }\n            ]\n          },\n          { // could be a comma delimited list of params to a function call\n            begin: /,/,\n            relevance: 0\n          },\n          {\n            match: /\\s+/,\n            relevance: 0\n          },\n          { // JSX\n            variants: [\n              { begin: FRAGMENT.begin, end: FRAGMENT.end },\n              { match: XML_SELF_CLOSING },\n              {\n                begin: XML_TAG.begin,\n                // we carefully check the opening tag to see if it truly\n                // is a tag and not a false positive\n                'on:begin': XML_TAG.isTrulyOpeningTag,\n                end: XML_TAG.end\n              }\n            ],\n            subLanguage: 'xml',\n            contains: [\n              {\n                begin: XML_TAG.begin,\n                end: XML_TAG.end,\n                skip: true,\n                contains: ['self']\n              }\n            ]\n          }\n        ],\n      },\n      FUNCTION_DEFINITION,\n      {\n        // prevent this from getting swallowed up by function\n        // since they appear \"function like\"\n        beginKeywords: \"while if switch catch for\"\n      },\n      {\n        // we have to count the parens to make sure we actually have the correct\n        // bounding ( ).  There could be any number of sub-expressions inside\n        // also surrounded by parens.\n        begin: '\\\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +\n          '\\\\(' + // first parens\n          '[^()]*(\\\\(' +\n            '[^()]*(\\\\(' +\n              '[^()]*' +\n            '\\\\)[^()]*)*' +\n          '\\\\)[^()]*)*' +\n          '\\\\)\\\\s*\\\\{', // end parens\n        returnBegin:true,\n        label: \"func.def\",\n        contains: [\n          PARAMS,\n          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: \"title.function\" })\n        ]\n      },\n      // catch ... so it won't trigger the property rule below\n      {\n        match: /\\.\\.\\./,\n        relevance: 0\n      },\n      PROPERTY_ACCESS,\n      // hack: prevents detection of keywords in some circumstances\n      // .keyword()\n      // $keyword = x\n      {\n        match: '\\\\$' + IDENT_RE$1,\n        relevance: 0\n      },\n      {\n        match: [ /\\bconstructor(?=\\s*\\()/ ],\n        className: { 1: \"title.function\" },\n        contains: [ PARAMS ]\n      },\n      FUNCTION_CALL,\n      UPPER_CASE_CONSTANT,\n      CLASS_OR_EXTENDS,\n      GETTER_OR_SETTER,\n      {\n        match: /\\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`\n      }\n    ]\n  };\n}\n\n/*\nLanguage: TypeScript\nAuthor: Panu Horsmalahti <panu.horsmalahti@iki.fi>\nContributors: Ike Ku <dempfi@yahoo.com>\nDescription: TypeScript is a strict superset of JavaScript\nWebsite: https://www.typescriptlang.org\nCategory: common, scripting\n*/\n\n\n/** @type LanguageFn */\nfunction typescript(hljs) {\n  const tsLanguage = javascript(hljs);\n\n  const IDENT_RE$1 = IDENT_RE;\n  const TYPES = [\n    \"any\",\n    \"void\",\n    \"number\",\n    \"boolean\",\n    \"string\",\n    \"object\",\n    \"never\",\n    \"symbol\",\n    \"bigint\",\n    \"unknown\"\n  ];\n  const NAMESPACE = {\n    beginKeywords: 'namespace',\n    end: /\\{/,\n    excludeEnd: true,\n    contains: [ tsLanguage.exports.CLASS_REFERENCE ]\n  };\n  const INTERFACE = {\n    beginKeywords: 'interface',\n    end: /\\{/,\n    excludeEnd: true,\n    keywords: {\n      keyword: 'interface extends',\n      built_in: TYPES\n    },\n    contains: [ tsLanguage.exports.CLASS_REFERENCE ]\n  };\n  const USE_STRICT = {\n    className: 'meta',\n    relevance: 10,\n    begin: /^\\s*['\"]use strict['\"]/\n  };\n  const TS_SPECIFIC_KEYWORDS = [\n    \"type\",\n    \"namespace\",\n    \"interface\",\n    \"public\",\n    \"private\",\n    \"protected\",\n    \"implements\",\n    \"declare\",\n    \"abstract\",\n    \"readonly\",\n    \"enum\",\n    \"override\"\n  ];\n  const KEYWORDS$1 = {\n    $pattern: IDENT_RE,\n    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),\n    literal: LITERALS,\n    built_in: BUILT_INS.concat(TYPES),\n    \"variable.language\": BUILT_IN_VARIABLES\n  };\n  const DECORATOR = {\n    className: 'meta',\n    begin: '@' + IDENT_RE$1,\n  };\n\n  const swapMode = (mode, label, replacement) => {\n    const indx = mode.contains.findIndex(m => m.label === label);\n    if (indx === -1) { throw new Error(\"can not find mode to replace\"); }\n\n    mode.contains.splice(indx, 1, replacement);\n  };\n\n\n  // this should update anywhere keywords is used since\n  // it will be the same actual JS object\n  Object.assign(tsLanguage.keywords, KEYWORDS$1);\n\n  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);\n  tsLanguage.contains = tsLanguage.contains.concat([\n    DECORATOR,\n    NAMESPACE,\n    INTERFACE,\n  ]);\n\n  // TS gets a simpler shebang rule than JS\n  swapMode(tsLanguage, \"shebang\", hljs.SHEBANG());\n  // JS use strict rule purposely excludes `asm` which makes no sense\n  swapMode(tsLanguage, \"use_strict\", USE_STRICT);\n\n  const functionDeclaration = tsLanguage.contains.find(m => m.label === \"func.def\");\n  functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript\n\n  Object.assign(tsLanguage, {\n    name: 'TypeScript',\n    aliases: [\n      'ts',\n      'tsx',\n      'mts',\n      'cts'\n    ]\n  });\n\n  return tsLanguage;\n}\n\nmodule.exports = typescript;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/languages/typescript.js?");

/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/vbscript-html.js":
/*!******************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/vbscript-html.js ***!
  \******************************************************************/
/***/ ((module) => {

eval("/*\nLanguage: VBScript in HTML\nRequires: xml.js, vbscript.js\nAuthor: Ivan Sagalaev <maniac@softwaremaniacs.org>\nDescription: \"Bridge\" language defining fragments of VBScript in HTML within <% .. %>\nWebsite: https://en.wikipedia.org/wiki/VBScript\nCategory: scripting\n*/\n\nfunction vbscriptHtml(hljs) {\n  return {\n    name: 'VBScript in HTML',\n    subLanguage: 'xml',\n    contains: [\n      {\n        begin: '<%',\n        end: '%>',\n        subLanguage: 'vbscript'\n      }\n    ]\n  };\n}\n\nmodule.exports = vbscriptHtml;\n\n\n//# sourceURL=webpack://pointlinejs/./node_modules/highlight.js/lib/languages/vbscript-html.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("documentation_documentation." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d68900728d1a94e58d37")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "pointlinejs:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"documentation/documentation": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatepointlinejs"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/documentation/documentation.ts");
/******/ 	
/******/ })()
;