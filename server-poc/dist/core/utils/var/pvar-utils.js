"use strict";
/*=--------------------------------------------------------------=

 PutteTSNode - Yet Another Typescript Utilities Collection

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman
 Date   : 2018-11-01

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =----------------------------------------------------------------= */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PVarUtils = void 0;
const cli_commander_1 = require("@cli/cli.commander");
const pvar_types_1 = require("@core/utils/var/pvar-types");
const pvar_types_2 = require("@core/utils/var/pvar-types");
const UNDEF = undefined || null;
class PVarUtils {
    static isNothing(value) {
        return value ? true : false;
    }
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    static isNumber(value) {
        return typeof value === "number";
    }
    static isValidNumber(value) {
        let result = false;
        if (value !== null) {
            let strVal = value.toString();
            let numVal = parseFloat(strVal);
            result = PVarUtils.isNumber(numVal);
        }
        return result;
    }
    static isBoolFalse(value) {
        return value ? true : false;
    }
    static checkTypeOf(value) {
        let result = pvar_types_2.PVarType.Unknown;
        let instName = typeof value;
        switch (instName) {
            case pvar_types_1.PValueTypeNames.String:
                result = pvar_types_2.PVarType.String;
                break;
            case pvar_types_1.PValueTypeNames.Number:
                result = pvar_types_2.PVarType.Number;
                break;
            case pvar_types_1.PValueTypeNames.Bool:
                result = pvar_types_2.PVarType.Bool;
                break;
            case pvar_types_1.PValueTypeNames.Object:
                result = pvar_types_2.PVarType.Object;
                break;
            default:
                result = pvar_types_2.PVarType.Unknown;
                break;
        }
        return result;
    }
    static getRefType(value) {
        let result = PVarUtils.checkTypeOf(value);
        if (result === pvar_types_2.PVarType.Object) {
            if (value == null) {
                result = pvar_types_2.PVarType.Null;
            }
            if (value == UNDEF) {
                result = pvar_types_2.PVarType.Null;
            }
            if (value instanceof Array) {
                result = pvar_types_2.PVarType.Array;
            }
            if (value instanceof String) {
                result = pvar_types_2.PVarType.String;
            }
            if (value instanceof Number) {
                result = pvar_types_2.PVarType.Number;
            }
            if (value instanceof Boolean) {
                result = pvar_types_2.PVarType.Bool;
            }
        }
        return result;
    }
    /**
     * Convenience that checks both Val and Ref types
     * @param value
     * @returns {PVarType}
     */
    static getVarType(value) {
        let result = PVarUtils.checkTypeOf(value);
        // In case this was a value fieldType, check the instance fieldType
        if (result == pvar_types_2.PVarType.Object) {
            result = PVarUtils.getRefType(value);
        }
        //console.log("\n\n### getVarType :: ", PVarTypeToStr(result) + "\n\n");
        return result;
    }
    static noValue(input) {
        return false;
    }
}
exports.PVarUtils = PVarUtils;
if (cli_commander_1.CliCommander.haveArgs()) {
    console.log("OUTSIDE CODE EXECUTING");
    console.log("Test1 ::", PVarUtils.isNumber("123"));
    console.log("Test2 ::", PVarUtils.isNumber(null));
    console.log("Test3 ::", PVarUtils.isNumber(123.34));
    console.log("Test4 ::", PVarUtils.isNumber(1));
}
