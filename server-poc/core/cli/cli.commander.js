"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
exports.__esModule = true;
var args = process.argv.slice(2);
var CliCommander = /** @class */ (function () {
    function CliCommander() {
    }
    CliCommander.haveArgs = function () {
        return args.length > 0;
    };
    CliCommander.compareParam = function (param1, param2, ignoreCase) {
        if (ignoreCase === void 0) { ignoreCase = true; }
        param1 = param1 === undefined ? "" : param1;
        param2 = param2 === undefined ? "" : param2;
        if (ignoreCase) {
            param1 = param1.toLowerCase();
            param2 = param2.toLowerCase();
        }
        return (param1.localeCompare(param2) === 0);
    };
    CliCommander.getParamAt = function (index) {
        if (index > -1 && index <= args.length) {
            return args[index];
        }
        else {
            return "";
        }
    };
    CliCommander.getFirst = function () {
        return CliCommander.getParamAt(0);
    };
    CliCommander.getParamByName = function (name) {
        function splitArg(arg) {
            var result = arg.split('=');
        }
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (arg.indexOf('=') > 0) {
                var argPair = arg.split('=');
                var paramName = argPair[0];
                var paramVal = argPair[1];
                if (paramName === name) {
                    return paramVal;
                }
            }
        }
        return undefined;
    };
    CliCommander.getSecond = function () {
        return CliCommander.getParamAt(1);
    };
    CliCommander.first = function (paramName, ignoreCase) {
        if (ignoreCase === void 0) { ignoreCase = true; }
        var firstParam = CliCommander.getParamAt(0);
        return CliCommander.compareParam(CliCommander.getFirst(), paramName, ignoreCase);
    };
    CliCommander.second = function (paramName, ignoreCase) {
        if (ignoreCase === void 0) { ignoreCase = true; }
        var firstParam = CliCommander.getParamAt(1);
        return CliCommander.compareParam(CliCommander.getFirst(), paramName, ignoreCase);
    };
    CliCommander.debug = function () {
        return CliCommander.getFirst() === "debug";
    };
    CliCommander.prototype.parseCliArgs = function (args) {
    };
    return CliCommander;
}());
exports.CliCommander = CliCommander;
