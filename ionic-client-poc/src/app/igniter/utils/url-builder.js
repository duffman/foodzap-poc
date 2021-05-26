"use strict";
/*  Copyright (C) 2016 Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */
exports.__esModule = true;
var UrlProtocol;
(function (UrlProtocol) {
    UrlProtocol["Unknown"] = "";
    UrlProtocol["Http"] = "http://";
    UrlProtocol["Https"] = "https://";
    UrlProtocol["Ws"] = "ws://";
    UrlProtocol["Wss"] = "wss://";
})(UrlProtocol = exports.UrlProtocol || (exports.UrlProtocol = {}));
var URL_SLASH = '/';
var Q_SEP = '?';
var Q_AND = '&';
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(baseUrl, protocol) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.baseUrl = baseUrl;
        this.port = -1;
        this.https = false;
        this.protocol = UrlProtocol.Http;
        this.urlParts = new Array();
        this.urlParams = new Map();
        if (protocol) {
            this.protocol = protocol;
        }
    }
    /**
     * Utility method for joining parts of existing URLs
     * @param urlParts
     */
    UrlBuilder.prototype.join = function () {
        var urlParts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            urlParts[_i] = arguments[_i];
        }
        for (var _a = 0, urlParts_1 = urlParts; _a < urlParts_1.length; _a++) {
            var urlPart = urlParts_1[_a];
            if (urlPart) {
                this.urlParts.push(urlPart);
            }
        }
        for (var _b = 0, urlParts_2 = urlParts; _b < urlParts_2.length; _b++) {
            var urlPart = urlParts_2[_b];
            if (urlPart) {
                urlPart = UrlBuilder.trimSlashes(urlPart);
                this.append(urlPart);
            }
        }
        return this;
    };
    UrlBuilder.joinPath = function (url, part, trailingSlash) {
        if (trailingSlash === void 0) { trailingSlash = false; }
        var value = UrlBuilder.ensureTrailingSlash(url);
        value += UrlBuilder.valueToStr(part);
        if (trailingSlash) {
            value = this.ensureTrailingSlash(value);
        }
        return value;
    };
    UrlBuilder.ensureTrailingSlash = function (dataStr) {
        if (dataStr && (dataStr.endsWith(URL_SLASH)) === false) {
            dataStr += URL_SLASH;
        }
        return dataStr;
    };
    UrlBuilder.prepValuePart = function (value) {
        var valuePart = UrlBuilder.valueToStr(value);
        valuePart = UrlBuilder.trimSlashes(valuePart);
        return valuePart;
    };
    UrlBuilder.valueToStr = function (data) {
        var result = "";
        if (typeof data === "string") {
            result = data;
        }
        if (typeof data === "number") {
            result = data.toString();
        }
        if (typeof data === "boolean") {
            result = data ? "true" : "false";
        }
        if (data === null) {
            result = "null";
        }
        return result;
    };
    UrlBuilder.prototype.useHttps = function (value) {
        if (value === void 0) { value = true; }
        this.https = value;
    };
    UrlBuilder.startsWith = function (value1, value2) {
        var part = value1.substr(0, value2.length);
        return part === value2;
    };
    UrlBuilder.trimLeadingSlash = function (value) {
        if (UrlBuilder.startsWith('/', value)) {
            value = value.substr(1, value.length);
        }
        return value;
    };
    UrlBuilder.trimTrailingSlash = function (value) {
        if (value.substr(value.length - 1, 1) === '/') {
            value = value.substr(1, value.length - 1);
        }
        return value;
    };
    UrlBuilder.trimSlashes = function (value) {
        value = UrlBuilder.trimLeadingSlash(value);
        value = UrlBuilder.trimTrailingSlash(value);
        return value;
    };
    UrlBuilder.prototype.setPort = function (port) {
        this.port = port;
        return this;
    };
    UrlBuilder.prototype.append = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var value = values_1[_a];
            var valuePart = UrlBuilder.prepValuePart(value);
            this.urlParts.push(valuePart);
        }
        return this;
    };
    UrlBuilder.prototype.addParam = function (name, value) {
        if (value === void 0) { value = undefined; }
        this.urlParams.set(name, value);
        return this;
    };
    UrlBuilder.prototype.getParamStr = function (includeQuerySep) {
        if (includeQuerySep === void 0) { includeQuerySep = true; }
        var result = new Array();
        this.urlParams.forEach(function (value, name) {
            result.push(name + '=' + UrlBuilder.valueToStr(value));
        });
        return result.join(Q_AND);
    };
    UrlBuilder.prototype.getPath = function () {
        return this.urlParts.join(URL_SLASH);
    };
    UrlBuilder.prototype.toString = function (trailingSlash) {
        if (trailingSlash === void 0) { trailingSlash = false; }
        var result = this.baseUrl;
        if (this.port > -1) {
            result = result.replace('/', '');
            result = result + ':' + String(this.port).toString();
        }
        result = UrlBuilder.ensureTrailingSlash(result);
        result += this.urlParts.join(URL_SLASH);
        if (trailingSlash && this.urlParams.size === 0) {
            result = UrlBuilder.ensureTrailingSlash(result);
        }
        if (this.urlParams.size > 0 && result.endsWith(Q_SEP) === false) {
            result += Q_SEP;
        }
        result += this.getParamStr();
        if (this.protocol) {
            if (result.indexOf('://') === -1) {
                result = this.protocol + result;
            }
        }
        return result;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
var api_routes_1 = require("../../sdk/api/api-routes");
var sdk_settings_1 = require("../../sdk/sdk-settings");
var builder;
var url;
builder = new UrlBuilder(sdk_settings_1.AppSettings.API_URL)
    .append(api_routes_1.ApiRoutes.Restaurant.Path);
url = builder.toString(true);
console.log('URL ::', url);
console.log('\n--------------------------\n');
builder = new UrlBuilder('192.168.1.109')
    .setPort(8080)
    .append(api_routes_1.ApiRoutes.Restaurant.Path);
url = builder.toString(true);
url = UrlBuilder.joinPath(url, 'knyffffe');
console.log('A - URL ::', url);
console.log('\n--------------------------\n');
