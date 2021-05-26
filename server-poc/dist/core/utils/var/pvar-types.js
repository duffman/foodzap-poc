"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PValueTypeNames = exports.PVarTypeToStr = exports.PVarType = void 0;
var PVarType;
(function (PVarType) {
    PVarType[PVarType["Unknown"] = 0] = "Unknown";
    PVarType[PVarType["Null"] = 1] = "Null";
    PVarType[PVarType["Undefined"] = 2] = "Undefined";
    PVarType[PVarType["String"] = 3] = "String";
    PVarType[PVarType["Bool"] = 4] = "Bool";
    PVarType[PVarType["Number"] = 5] = "Number";
    PVarType[PVarType["Array"] = 6] = "Array";
    PVarType[PVarType["Object"] = 7] = "Object";
})(PVarType = exports.PVarType || (exports.PVarType = {}));
function PVarTypeToStr(pType) {
    let result = "Unset";
    switch (pType) {
        case PVarType.Unknown:
            result = "[Unknown]";
            break;
        case PVarType.Undefined:
            result = "[Undefined]";
            break;
        case PVarType.Null:
            result = "[Null]";
            break;
        case PVarType.String:
            result = "[String]";
            break;
        case PVarType.Bool:
            result = "[Bool]";
            break;
        case PVarType.Number:
            result = "[Number]";
            break;
        case PVarType.Array:
            result = "[Array]";
            break;
        case PVarType.Object:
            result = "[Object]";
            break;
    }
    return result;
}
exports.PVarTypeToStr = PVarTypeToStr;
var PValueTypeNames;
(function (PValueTypeNames) {
    PValueTypeNames.String = "string";
    PValueTypeNames.Number = "number";
    PValueTypeNames.Bool = "boolean";
    PValueTypeNames.Object = "object";
})(PValueTypeNames = exports.PValueTypeNames || (exports.PValueTypeNames = {}));
