"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHelper = void 0;
const cli_logger_1 = require("@cli/cli.logger");
class ControllerHelper {
    static logAttach(controller) {
        cli_logger_1.Logger.logPurple("Attaching Controller ::", controller.constructor.name);
    }
    static errorResponse(mess, err) {
    }
}
exports.ControllerHelper = ControllerHelper;
