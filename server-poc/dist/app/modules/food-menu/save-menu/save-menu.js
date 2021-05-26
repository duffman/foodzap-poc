"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMenuSave = void 0;
// Converts JSON strings to/from your types
class JsonMenuSave {
    static toIMenuSave(json) {
        return JSON.parse(json);
    }
    static iMenuSaveToJson(value) {
        return JSON.stringify(value);
    }
}
exports.JsonMenuSave = JsonMenuSave;
