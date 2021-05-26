"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrUtils = void 0;
class StrUtils {
    static isStr(value) {
        return typeof value === 'string';
    }
    /**
     * Check wheter a string is assigned and has a length
     * @param str
     * @returns {boolean}
     */
    static isEmpty(str) {
        return (str === undefined) || (!str || 0 === str.length);
    }
    static replaceStr(source, find, replaceWith) {
        return source.replace(find, String(replaceWith));
    }
    static isNumeric(val) {
        return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
    }
    static isUndefined(value) {
        return value === undefined || value === null;
    }
}
exports.StrUtils = StrUtils;
