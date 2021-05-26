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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlBuilderl = exports.UrlProtocol = void 0;
var UrlProtocol;
(function (UrlProtocol) {
    UrlProtocol["Unknown"] = "";
    UrlProtocol["Http"] = "http://";
    UrlProtocol["Https"] = "https://";
})(UrlProtocol = exports.UrlProtocol || (exports.UrlProtocol = {}));
const URL_SLASH = '/';
const Q_SEP = '?';
const Q_AND = '&';
class UrlBuilderl {
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
        this.port = -1;
        this.urlParts = new Array();
        this.urlParams = new Map();
    }
    /**
     * Make sure that the given string ends with a slash
     * @param dataStr
     */
    ensureTrailingSlash(dataStr) {
        if (dataStr && (dataStr.endsWith(URL_SLASH)) === false) {
            dataStr += URL_SLASH;
        }
        return dataStr;
    }
    prepValuePart(value) {
        let valuePart = this.prepValue(value);
        function trimLeaadingSlashes(value) {
            let result = "";
            let skipAhead = true;
            for (let i = 0; i < value.length; i++) {
                let currChar = value[i];
                if (currChar === URL_SLASH && skipAhead) {
                }
                else {
                    skipAhead = false;
                    result += currChar;
                }
            }
            return result.trim();
        }
        valuePart = trimLeaadingSlashes(valuePart);
        return valuePart;
    }
    prepValue(data) {
        let result = "";
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
    }
    setPort(port) {
        this.port = port;
        return this;
    }
    /**
     * Utility method for joining parts of existing URLs
     * @param url
     * @param part
     * @param trailingSlash
     */
    join(url, part, trailingSlash = false) {
        let valuePart = this.prepValuePart(part);
        //let result = this.ensureTrailingSlash(url);
        let result = url.replace('/', '');
        result += valuePart;
        if (trailingSlash) {
            result = this.ensureTrailingSlash(result);
        }
        return result;
    }
    append(...values) {
        for (const value of values) {
            let valuePart = this.prepValuePart(value);
            this.urlParts.push(valuePart);
        }
        return this;
    }
    addParam(name, value = undefined) {
        this.urlParams.set(name, value);
        return this;
    }
    getParamStr(includeQuerySep = true) {
        let result = new Array();
        this.urlParams.forEach((value, name) => {
            result.push(name + '=' + this.prepValue(value));
        });
        return result.join(Q_AND);
    }
    getPath() {
        return this.urlParts.join(URL_SLASH);
    }
    toString(protocol) {
        let result = this.baseUrl;
        if (this.port > -1) {
            result = result.replace('/', '');
            result = result + ':' + String(this.port).toString();
        }
        result = this.ensureTrailingSlash(result);
        result += this.urlParts.join(URL_SLASH);
        if (this.urlParams.size > 0 && result.endsWith(Q_SEP) === false) {
            result += Q_SEP;
        }
        result += this.getParamStr();
        if (protocol) {
            result = protocol + result;
        }
        return result;
    }
}
exports.UrlBuilderl = UrlBuilderl;
