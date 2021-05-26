"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonHelper = void 0;
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
const cli_logger_1 = require("@cli/cli.logger");
const string_utils_1 = require("@core/utils/str/string-utils");
class JsonHelper {
    static echoJson(data, message) {
        let jsonData = JSON.stringify(data, null, 4);
        if (message) {
            cli_logger_1.Logger.log(message, jsonData);
        }
        else {
            cli_logger_1.Logger.log(jsonData);
        }
    }
    static jsonMessage(message, data) {
        let jsonStr;
        if (string_utils_1.StrUtils.isStr(data) === false) {
            jsonStr = JSON.stringify(data);
        }
        cli_logger_1.Logger.log(message, jsonStr);
    }
}
exports.JsonHelper = JsonHelper;
