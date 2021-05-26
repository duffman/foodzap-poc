"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResult = void 0;
class ActionResult {
    constructor(success = false, errorMessage = "", error = undefined) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.error = error;
    }
    fail(error = undefined) {
        this.setSuccess(false);
        if (error) {
            this.setError(error);
        }
    }
    setSuccess(value = true) {
        this.success = value;
    }
    setError(error, message) {
        if (error) {
            this.success = false;
            this.error = error;
            this.errorMessage = message;
        }
    }
}
exports.ActionResult = ActionResult;
