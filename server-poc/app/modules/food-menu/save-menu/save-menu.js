"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
// Converts JSON strings to/from your types
var JsonMenuSave = /** @class */ (function () {
    function JsonMenuSave() {
    }
    JsonMenuSave.toIMenuSave = function (json) {
        return JSON.parse(json);
    };
    JsonMenuSave.iMenuSaveToJson = function (value) {
        return JSON.stringify(value);
    };
    return JsonMenuSave;
}());
exports.JsonMenuSave = JsonMenuSave;
