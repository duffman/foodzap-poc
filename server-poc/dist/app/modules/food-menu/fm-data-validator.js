"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FmDataValidator = void 0;
class FmDataValidator {
    static foodMenusPostData(obj) {
        let result = false;
        if (typeof obj === 'object' && obj.postIdent === 'fm-pd') {
            result = true;
        }
        return result;
    }
}
exports.FmDataValidator = FmDataValidator;
