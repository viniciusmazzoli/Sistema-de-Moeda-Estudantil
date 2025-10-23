"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/alunos/route";
exports.ids = ["app/api/alunos/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Falunos%2Froute&page=%2Fapi%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Falunos%2Froute&page=%2Fapi%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_GABRIEL_Sistema_de_Moeda_Estudantil_moeda_estudantil_app_api_alunos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/alunos/route.ts */ \"(rsc)/./app/api/alunos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/alunos/route\",\n        pathname: \"/api/alunos\",\n        filename: \"route\",\n        bundlePath: \"app/api/alunos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\GABRIEL\\\\Sistema-de-Moeda-Estudantil\\\\moeda-estudantil\\\\app\\\\api\\\\alunos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_GABRIEL_Sistema_de_Moeda_Estudantil_moeda_estudantil_app_api_alunos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/alunos/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhbHVub3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFsdW5vcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFsdW5vcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHQUJSSUVMJTVDU2lzdGVtYS1kZS1Nb2VkYS1Fc3R1ZGFudGlsJTVDbW9lZGEtZXN0dWRhbnRpbCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDR0FCUklFTCU1Q1Npc3RlbWEtZGUtTW9lZGEtRXN0dWRhbnRpbCU1Q21vZWRhLWVzdHVkYW50aWwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzZDO0FBQzFIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9lZGEtZXN0dWRhbnRpbC8/MGRmMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxHQUJSSUVMXFxcXFNpc3RlbWEtZGUtTW9lZGEtRXN0dWRhbnRpbFxcXFxtb2VkYS1lc3R1ZGFudGlsXFxcXGFwcFxcXFxhcGlcXFxcYWx1bm9zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbHVub3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hbHVub3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FsdW5vcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdBQlJJRUxcXFxcU2lzdGVtYS1kZS1Nb2VkYS1Fc3R1ZGFudGlsXFxcXG1vZWRhLWVzdHVkYW50aWxcXFxcYXBwXFxcXGFwaVxcXFxhbHVub3NcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FsdW5vcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Falunos%2Froute&page=%2Fapi%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/_auth.ts":
/*!**************************!*\
  !*** ./app/api/_auth.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireRole: () => (/* binding */ requireRole)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nasync function requireRole(roles) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n    if (!session) return {\n        ok: false,\n        status: 401,\n        message: \"N\\xe3o autenticado\"\n    };\n    const role = session.role;\n    if (!role || !roles.includes(role)) return {\n        ok: false,\n        status: 403,\n        message: \"Sem permiss\\xe3o\"\n    };\n    return {\n        ok: true,\n        role,\n        session\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL19hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDNkM7QUFDSjtBQUNsQyxlQUFlRSxZQUFZQyxLQUFlO0lBQy9DLE1BQU1DLFVBQVUsTUFBTUosMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFDbEQsSUFBSSxDQUFDRyxTQUFTLE9BQU87UUFBRUMsSUFBSTtRQUFPQyxRQUFRO1FBQWNDLFNBQVM7SUFBa0I7SUFDbkYsTUFBTUMsT0FBTyxRQUFpQkEsSUFBSTtJQUNsQyxJQUFJLENBQUNBLFFBQVEsQ0FBQ0wsTUFBTU0sUUFBUSxDQUFDRCxPQUFPLE9BQU87UUFBRUgsSUFBSTtRQUFPQyxRQUFRO1FBQWNDLFNBQVM7SUFBZ0I7SUFDdkcsT0FBTztRQUFFRixJQUFJO1FBQU1HO1FBQU1KO0lBQVE7QUFDbkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2VkYS1lc3R1ZGFudGlsLy4vYXBwL2FwaS9fYXV0aC50cz83OGZkIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlUm9sZShyb2xlczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICBpZiAoIXNlc3Npb24pIHJldHVybiB7IG9rOiBmYWxzZSwgc3RhdHVzOiA0MDEgYXMgY29uc3QsIG1lc3NhZ2U6IFwiTsOjbyBhdXRlbnRpY2Fkb1wiIH07XG4gIGNvbnN0IHJvbGUgPSAoc2Vzc2lvbiBhcyBhbnkpLnJvbGUgYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAoIXJvbGUgfHwgIXJvbGVzLmluY2x1ZGVzKHJvbGUpKSByZXR1cm4geyBvazogZmFsc2UsIHN0YXR1czogNDAzIGFzIGNvbnN0LCBtZXNzYWdlOiBcIlNlbSBwZXJtaXNzw6NvXCIgfTtcbiAgcmV0dXJuIHsgb2s6IHRydWUsIHJvbGUsIHNlc3Npb24gfTtcbn1cbiJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJyZXF1aXJlUm9sZSIsInJvbGVzIiwic2Vzc2lvbiIsIm9rIiwic3RhdHVzIiwibWVzc2FnZSIsInJvbGUiLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/_auth.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/alunos/route.ts":
/*!*********************************!*\
  !*** ./app/api/alunos/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _app_api_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/validators */ \"(rsc)/./app/api/validators.ts\");\n/* harmony import */ var _app_api_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/api/_auth */ \"(rsc)/./app/api/_auth.ts\");\nconst runtime = \"nodejs\";\n\n\n\n\nasync function GET() {\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.aluno.findMany({\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    }));\n}\nasync function POST(req) {\n    const auth = await (0,_app_api_auth__WEBPACK_IMPORTED_MODULE_3__.requireRole)([\n        \"ADMIN\"\n    ]);\n    if (!auth.ok) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: auth.message\n    }, {\n        status: auth.status\n    });\n    const parsed = _app_api_validators__WEBPACK_IMPORTED_MODULE_2__.alunoSchema.safeParse(await req.json());\n    if (!parsed.success) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: parsed.error.flatten()\n    }, {\n        status: 400\n    });\n    const created = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.aluno.create({\n        data: parsed.data\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(created, {\n        status: 201\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FsdW5vcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ08sTUFBTUEsVUFBVSxTQUFTO0FBQ1c7QUFDTDtBQUNhO0FBQ0w7QUFDdkMsZUFBZUs7SUFBTyxPQUFPSixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDLE1BQU1KLCtDQUFNQSxDQUFDSyxLQUFLLENBQUNDLFFBQVEsQ0FBQztRQUFFQyxTQUFRO1lBQUNDLFdBQVU7UUFBTTtJQUFFO0FBQUs7QUFDN0csZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxNQUFNQyxPQUFPLE1BQU1ULDBEQUFXQSxDQUFDO1FBQUM7S0FBUTtJQUFHLElBQUksQ0FBQ1MsS0FBS0MsRUFBRSxFQUFFLE9BQU9iLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7UUFBQ1MsT0FBTUYsS0FBS0csT0FBTztJQUFBLEdBQUU7UUFBQ0MsUUFBT0osS0FBS0ksTUFBTTtJQUFBO0lBQzFILE1BQU1DLFNBQVNmLDREQUFXQSxDQUFDZ0IsU0FBUyxDQUFDLE1BQU1QLElBQUlOLElBQUk7SUFDbkQsSUFBRyxDQUFDWSxPQUFPRSxPQUFPLEVBQUUsT0FBT25CLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7UUFBQ1MsT0FBTUcsT0FBT0gsS0FBSyxDQUFDTSxPQUFPO0lBQUUsR0FBRTtRQUFDSixRQUFPO0lBQUc7SUFDdkYsTUFBTUssVUFBVSxNQUFNcEIsK0NBQU1BLENBQUNLLEtBQUssQ0FBQ2dCLE1BQU0sQ0FBQztRQUFFQyxNQUFNTixPQUFPTSxJQUFJO0lBQUM7SUFBSSxPQUFPdkIscURBQVlBLENBQUNLLElBQUksQ0FBQ2dCLFNBQVE7UUFBQ0wsUUFBTztJQUFHO0FBQ2hIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9lZGEtZXN0dWRhbnRpbC8uL2FwcC9hcGkvYWx1bm9zL3JvdXRlLnRzPzRiYzgiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY29uc3QgcnVudGltZSA9ICdub2RlanMnO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBhbHVub1NjaGVtYSB9IGZyb20gXCJAL2FwcC9hcGkvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVJvbGUgfSBmcm9tIFwiQC9hcHAvYXBpL19hdXRoXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCl7IHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhd2FpdCBwcmlzbWEuYWx1bm8uZmluZE1hbnkoeyBvcmRlckJ5OntjcmVhdGVkQXQ6J2Rlc2MnfSB9KSk7IH1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCl7XG4gIGNvbnN0IGF1dGggPSBhd2FpdCByZXF1aXJlUm9sZShbJ0FETUlOJ10pOyBpZiAoIWF1dGgub2spIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7ZXJyb3I6YXV0aC5tZXNzYWdlfSx7c3RhdHVzOmF1dGguc3RhdHVzfSk7XG4gIGNvbnN0IHBhcnNlZCA9IGFsdW5vU2NoZW1hLnNhZmVQYXJzZShhd2FpdCByZXEuanNvbigpKTtcbiAgaWYoIXBhcnNlZC5zdWNjZXNzKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe2Vycm9yOnBhcnNlZC5lcnJvci5mbGF0dGVuKCl9LHtzdGF0dXM6NDAwfSk7XG4gIGNvbnN0IGNyZWF0ZWQgPSBhd2FpdCBwcmlzbWEuYWx1bm8uY3JlYXRlKHsgZGF0YTogcGFyc2VkLmRhdGEgfSk7IHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjcmVhdGVkLHtzdGF0dXM6MjAxfSk7XG59XG4iXSwibmFtZXMiOlsicnVudGltZSIsIk5leHRSZXNwb25zZSIsInByaXNtYSIsImFsdW5vU2NoZW1hIiwicmVxdWlyZVJvbGUiLCJHRVQiLCJqc29uIiwiYWx1bm8iLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJQT1NUIiwicmVxIiwiYXV0aCIsIm9rIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIiwicGFyc2VkIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImZsYXR0ZW4iLCJjcmVhdGVkIiwiY3JlYXRlIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/alunos/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/validators.ts":
/*!*******************************!*\
  !*** ./app/api/validators.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   alunoSchema: () => (/* binding */ alunoSchema),\n/* harmony export */   empresaSchema: () => (/* binding */ empresaSchema),\n/* harmony export */   grantSchema: () => (/* binding */ grantSchema),\n/* harmony export */   redeemSchema: () => (/* binding */ redeemSchema),\n/* harmony export */   vantagemSchema: () => (/* binding */ vantagemSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\nconst alunoSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    nome: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2),\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),\n    cpf: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(11),\n    rg: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(5),\n    endereco: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(3),\n    curso: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2),\n    instituicaoId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional().nullable()\n});\nconst empresaSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    nome: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2),\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(),\n    cnpj: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(14),\n    endereco: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(3)\n});\nconst vantagemSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    titulo: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2),\n    descricao: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(5),\n    custoEmMoedas: zod__WEBPACK_IMPORTED_MODULE_0__.number().int().min(1),\n    fotoUrl: zod__WEBPACK_IMPORTED_MODULE_0__.string().url().optional().nullable(),\n    empresaParceiraId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid()\n});\nconst grantSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    professorId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),\n    alunoId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),\n    amount: zod__WEBPACK_IMPORTED_MODULE_0__.number().int().positive(),\n    message: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(3)\n});\nconst redeemSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    alunoId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),\n    vantagemId: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZhbGlkYXRvcnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ3dCO0FBQ2pCLE1BQU1DLGNBQWNELHVDQUFRLENBQUM7SUFBRUcsTUFBTUgsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQUlDLE9BQU9OLHVDQUFRLEdBQUdNLEtBQUs7SUFBSUMsS0FBS1AsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQUtHLElBQUlSLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztJQUFJSSxVQUFVVCx1Q0FBUSxHQUFHSyxHQUFHLENBQUM7SUFBSUssT0FBT1YsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQUlNLGVBQWVYLHVDQUFRLEdBQUdZLElBQUksR0FBR0MsUUFBUSxHQUFHQyxRQUFRO0FBQUcsR0FBRztBQUNwUCxNQUFNQyxnQkFBZ0JmLHVDQUFRLENBQUM7SUFBRUcsTUFBTUgsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQUlDLE9BQU9OLHVDQUFRLEdBQUdNLEtBQUs7SUFBSVUsTUFBTWhCLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztJQUFLSSxVQUFVVCx1Q0FBUSxHQUFHSyxHQUFHLENBQUM7QUFBRyxHQUFHO0FBQzlJLE1BQU1ZLGlCQUFpQmpCLHVDQUFRLENBQUM7SUFBRWtCLFFBQVFsQix1Q0FBUSxHQUFHSyxHQUFHLENBQUM7SUFBSWMsV0FBV25CLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztJQUFJZSxlQUFlcEIsdUNBQVEsR0FBR3NCLEdBQUcsR0FBR2pCLEdBQUcsQ0FBQztJQUFJa0IsU0FBU3ZCLHVDQUFRLEdBQUd3QixHQUFHLEdBQUdYLFFBQVEsR0FBR0MsUUFBUTtJQUFJVyxtQkFBbUJ6Qix1Q0FBUSxHQUFHWSxJQUFJO0FBQUcsR0FBRztBQUM1TixNQUFNYyxjQUFjMUIsdUNBQVEsQ0FBQztJQUFFMkIsYUFBYTNCLHVDQUFRLEdBQUdZLElBQUk7SUFBSWdCLFNBQVM1Qix1Q0FBUSxHQUFHWSxJQUFJO0lBQUlpQixRQUFRN0IsdUNBQVEsR0FBR3NCLEdBQUcsR0FBR1EsUUFBUTtJQUFJQyxTQUFTL0IsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0FBQUcsR0FBRztBQUM5SixNQUFNMkIsZUFBZWhDLHVDQUFRLENBQUM7SUFBRTRCLFNBQVM1Qix1Q0FBUSxHQUFHWSxJQUFJO0lBQUlxQixZQUFZakMsdUNBQVEsR0FBR1ksSUFBSTtBQUFHLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2VkYS1lc3R1ZGFudGlsLy4vYXBwL2FwaS92YWxpZGF0b3JzLnRzP2FjNzYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuZXhwb3J0IGNvbnN0IGFsdW5vU2NoZW1hID0gei5vYmplY3QoeyBub21lOiB6LnN0cmluZygpLm1pbigyKSwgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoKSwgY3BmOiB6LnN0cmluZygpLm1pbigxMSksIHJnOiB6LnN0cmluZygpLm1pbig1KSwgZW5kZXJlY286IHouc3RyaW5nKCkubWluKDMpLCBjdXJzbzogei5zdHJpbmcoKS5taW4oMiksIGluc3RpdHVpY2FvSWQ6IHouc3RyaW5nKCkudXVpZCgpLm9wdGlvbmFsKCkubnVsbGFibGUoKSB9KTtcbmV4cG9ydCBjb25zdCBlbXByZXNhU2NoZW1hID0gei5vYmplY3QoeyBub21lOiB6LnN0cmluZygpLm1pbigyKSwgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoKSwgY25wajogei5zdHJpbmcoKS5taW4oMTQpLCBlbmRlcmVjbzogei5zdHJpbmcoKS5taW4oMykgfSk7XG5leHBvcnQgY29uc3QgdmFudGFnZW1TY2hlbWEgPSB6Lm9iamVjdCh7IHRpdHVsbzogei5zdHJpbmcoKS5taW4oMiksIGRlc2NyaWNhbzogei5zdHJpbmcoKS5taW4oNSksIGN1c3RvRW1Nb2VkYXM6IHoubnVtYmVyKCkuaW50KCkubWluKDEpLCBmb3RvVXJsOiB6LnN0cmluZygpLnVybCgpLm9wdGlvbmFsKCkubnVsbGFibGUoKSwgZW1wcmVzYVBhcmNlaXJhSWQ6IHouc3RyaW5nKCkudXVpZCgpIH0pO1xuZXhwb3J0IGNvbnN0IGdyYW50U2NoZW1hID0gei5vYmplY3QoeyBwcm9mZXNzb3JJZDogei5zdHJpbmcoKS51dWlkKCksIGFsdW5vSWQ6IHouc3RyaW5nKCkudXVpZCgpLCBhbW91bnQ6IHoubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSwgbWVzc2FnZTogei5zdHJpbmcoKS5taW4oMykgfSk7XG5leHBvcnQgY29uc3QgcmVkZWVtU2NoZW1hID0gei5vYmplY3QoeyBhbHVub0lkOiB6LnN0cmluZygpLnV1aWQoKSwgdmFudGFnZW1JZDogei5zdHJpbmcoKS51dWlkKCkgfSk7XG4iXSwibmFtZXMiOlsieiIsImFsdW5vU2NoZW1hIiwib2JqZWN0Iiwibm9tZSIsInN0cmluZyIsIm1pbiIsImVtYWlsIiwiY3BmIiwicmciLCJlbmRlcmVjbyIsImN1cnNvIiwiaW5zdGl0dWljYW9JZCIsInV1aWQiLCJvcHRpb25hbCIsIm51bGxhYmxlIiwiZW1wcmVzYVNjaGVtYSIsImNucGoiLCJ2YW50YWdlbVNjaGVtYSIsInRpdHVsbyIsImRlc2NyaWNhbyIsImN1c3RvRW1Nb2VkYXMiLCJudW1iZXIiLCJpbnQiLCJmb3RvVXJsIiwidXJsIiwiZW1wcmVzYVBhcmNlaXJhSWQiLCJncmFudFNjaGVtYSIsInByb2Zlc3NvcklkIiwiYWx1bm9JZCIsImFtb3VudCIsInBvc2l0aXZlIiwibWVzc2FnZSIsInJlZGVlbVNjaGVtYSIsInZhbnRhZ2VtSWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/validators.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!ok) return null;\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) token.role = user.role;\n            return token;\n        },\n        async session ({ session, token }) {\n            session.role = token.role;\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUUwRDtBQUNwQjtBQUNSO0FBRXZCLE1BQU1HLGNBQStCO0lBQzFDQyxTQUFTO1FBQUVDLFVBQVU7SUFBTTtJQUMzQkMsV0FBVztRQUNUTiwyRUFBV0EsQ0FBQztZQUNWTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQUVDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQUdDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVNDLE1BQU07Z0JBQVc7WUFBRTtZQUN4RyxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVSxPQUFPO2dCQUMxRCxNQUFNRSxPQUFPLE1BQU1iLCtDQUFNQSxDQUFDYSxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFBRUMsT0FBTzt3QkFBRVAsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFBRTtnQkFDaEYsSUFBSSxDQUFDSyxNQUFNLE9BQU87Z0JBQ2xCLE1BQU1HLEtBQUssTUFBTWYsdURBQWMsQ0FBQ00sWUFBWUksUUFBUSxFQUFFRSxLQUFLRixRQUFRO2dCQUNuRSxJQUFJLENBQUNLLElBQUksT0FBTztnQkFDaEIsT0FBTztvQkFBRUUsSUFBSUwsS0FBS0ssRUFBRTtvQkFBRVosTUFBTU8sS0FBS1AsSUFBSTtvQkFBRUUsT0FBT0ssS0FBS0wsS0FBSztvQkFBRVcsTUFBTU4sS0FBS00sSUFBSTtnQkFBQztZQUM1RTtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFVCxJQUFJLEVBQUU7WUFBSSxJQUFJQSxNQUFNUyxNQUFNSCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtZQUFFLE9BQU9HO1FBQU87UUFDdEYsTUFBTW5CLFNBQVEsRUFBRUEsT0FBTyxFQUFFbUIsS0FBSyxFQUFFO1lBQUtuQixRQUFnQmdCLElBQUksR0FBR0csTUFBTUgsSUFBSTtZQUFFLE9BQU9oQjtRQUFTO0lBQzFGO0lBQ0FvQixPQUFPO1FBQUVDLFFBQVE7SUFBUztBQUM1QixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9lZGEtZXN0dWRhbnRpbC8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgdHlwZSB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBDcmVkZW50aWFscyBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHMoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHsgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlNlbmhhXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9IH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0gfSk7XG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICBpZiAoIW9rKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHsgaWQ6IHVzZXIuaWQsIG5hbWU6IHVzZXIubmFtZSwgZW1haWw6IHVzZXIuZW1haWwsIHJvbGU6IHVzZXIucm9sZSB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkgeyBpZiAodXNlcikgdG9rZW4ucm9sZSA9ICh1c2VyIGFzIGFueSkucm9sZTsgcmV0dXJuIHRva2VuOyB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7IChzZXNzaW9uIGFzIGFueSkucm9sZSA9IHRva2VuLnJvbGU7IHJldHVybiBzZXNzaW9uOyB9LFxuICB9LFxuICBwYWdlczogeyBzaWduSW46IFwiL2xvZ2luXCIgfSxcbn07XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHMiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwib2siLCJjb21wYXJlIiwiaWQiLCJyb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst g = global;\nconst prisma = g.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"warn\",\n        \"error\"\n    ]\n});\nif (true) g.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUM5QyxNQUFNQyxJQUFJQztBQUFzQixNQUFNQyxTQUF1QkYsRUFBRUUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxDQUFDO0lBQUVJLEtBQUs7UUFBQztRQUFPO0tBQVE7QUFBQyxHQUFHO0FBQUMsSUFBSUMsSUFBeUIsRUFBY0osRUFBRUUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZWRhLWVzdHVkYW50aWwvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuY29uc3QgZyA9IGdsb2JhbCBhcyBhbnk7IGV4cG9ydCBjb25zdCBwcmlzbWE6IFByaXNtYUNsaWVudCA9IGcucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoeyBsb2c6IFsnd2FybicsJ2Vycm9yJ10gfSk7IGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnLnByaXNtYSA9IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnIiwiZ2xvYmFsIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Falunos%2Froute&page=%2Fapi%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGABRIEL%5CSistema-de-Moeda-Estudantil%5Cmoeda-estudantil&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();