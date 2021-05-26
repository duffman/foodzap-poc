"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
let chalk = require("chalk");
const log = console.log;
class dc {
    static l(message, data = null) {
        L.log(message, data);
    }
    static g(logMessage, logData = null) {
        if (logData) {
            log(chalk.greenBright(logMessage), chalk.greenBright(logData));
        }
        else {
            log(chalk.greenBright(logMessage));
        }
    }
    static r(logMessage, logData = null) {
        log(chalk.redBright(logMessage + '::'), chalk.redBright(logData));
    }
    static y(logMessage, logData = "") {
        log(chalk.yellow(logMessage), logData);
    }
    static c(logMessage, logData = "") {
        log(chalk.cyan(logMessage), logData);
    }
}
exports.dc = dc;
class L {
    static log(message, data = null) {
        L.logMessage(message, data);
    }
    static logDbResult(res, message, logRows) {
        const resMessage = `Success: ${res.success}, Affected Rows: ${res.affectedRows}, Result Row Count: ${res.rowCount}`;
        if (message) {
            L.logMessage(message, resMessage);
        }
        else {
            L.logMessage(resMessage);
        }
        if (logRows) {
            for (let row of res.result.dataRows) {
                L.log('row ::', row);
            }
        }
    }
    static logMessage(message, data = null) {
        if (!data) {
            log(message);
        }
        else {
            log(message, data);
        }
    }
    static logErrorMessage(errorMessage, error) {
        if (error) {
            log('ERROR :: ' + errorMessage, errorMessage);
        }
        else {
            log(errorMessage, errorMessage);
        }
    }
    static error(errorMessage, error = null) {
        L.logErrorMessage(errorMessage, error);
    }
}
exports.L = L;
