"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMessage = void 0;
class ActionMessage {
    constructor(success = true, errorMessage = "") {
        this.success = success;
        this.errorMessage = errorMessage;
    }
}
exports.ActionMessage = ActionMessage;
