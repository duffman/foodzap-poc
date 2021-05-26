"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-21
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarUtils = void 0;
class VarUtils {
    static isNullOrUndefined(variable) {
        return !variable || false || false;
    }
    static parseInt(value) {
        try {
            return Number.parseInt(value, 2);
        }
        catch (ex) {
            return null;
        }
    }
}
exports.VarUtils = VarUtils;
