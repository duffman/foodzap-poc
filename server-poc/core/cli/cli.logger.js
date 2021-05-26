"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
exports.__esModule = true;
var chalk = require("chalk");
var log = console.log;
var cli_global_1 = require("./cli.global");
var GLogDebugLevel;
(function (GLogDebugLevel) {
    GLogDebugLevel[GLogDebugLevel["Normal"] = 0] = "Normal";
    GLogDebugLevel[GLogDebugLevel["Intense"] = 1] = "Intense";
})(GLogDebugLevel = exports.GLogDebugLevel || (exports.GLogDebugLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.spit = function () {
        console.log(" ");
    };
    Logger.log = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        if (logData != null) {
            log(chalk.green(logMessage), logData);
        }
        else {
            log(chalk.yellow(logMessage));
        }
    };
    Logger.logSign = function (message) {
        log('=======================================================');
        log(message);
        log('=======================================================');
    };
    Logger.makeLine = function (count, char) {
        if (char === void 0) { char = "-"; }
        var line = "";
        for (var i = 0; i < count; i++) {
            line += char;
        }
        return line;
    };
    Logger.logObject = function (obj, title) {
        if (title === void 0) { title = null; }
        if (title != null) {
            Logger.logYellow("-- Obj: " + title);
            Logger.logYellow(Logger.makeLine(title.length + 10));
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                Logger.logYellow(key, obj[key]);
            }
        }
    };
    /**
     * Standard Debug Log
     *
     * @param caller - object, used to getAs class name
     * @param logMessage - The message to print
     * @param logData - Optional configureWebServer such as configureWebServer structures
     */
    Logger.logDebugCaller = function (caller, logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.cyan("#DEBUG :: " + caller.constructor.name + " :: " + logMessage), logData);
        }
    };
    Logger.logDebug = function (logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.cyan("#DEBUG :: " + logMessage), logData);
        }
    };
    Logger.explicitError = function (scope, currFunc, err) {
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.red("#ERROR :: " + scope.constructor.name + " :: " + currFunc), err);
        }
    };
    Logger.logDebugErr = function (logMessage, data) {
        if (data === void 0) { data = null; }
        if (!cli_global_1.CliGlobal.DebugMode)
            return;
        data = data !== null ? JSON.stringify(data) : null;
        if (data === null) {
            log(chalk.red("#ERR :: " + logMessage));
        }
        else {
            log(chalk.red("#ERR :: " + logMessage + " :: " + data));
        }
    };
    Logger.logStd = function (caller, logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.cyan("#DEBUG :: " + logMessage), logData);
        }
    };
    Logger.logAppError = function (caller, logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.red("#ERROR :: " + caller.constructor.name + " :: " + logMessage), logData);
        }
    };
    Logger.logCoreInfo = function (caller, logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        if (cli_global_1.CliGlobal.DebugMode) {
            log(chalk.cyan("#DEBUG :: " + caller.constructor.name + " :: " + logMessage), logData);
        }
    };
    Logger.logSuccessMessage = function (message, success) {
        if (success) {
            log(chalk.bold.black.bgGreen("# SUCCESS ") + chalk.black.bgGreen(message));
        }
        else {
            log(chalk.bold.white.bgRed("# FAILED ") + chalk.white.bgBlack(message));
        }
    };
    Logger.logExtDebug = function (level, logMessage) {
        log(chalk.green(logMessage));
    };
    Logger.logWarning = function (warningMessage, logData) {
        if (logData === void 0) { logData = null; }
        logData = logData == null ? "" : logData;
        log(this.warning(warningMessage), logData);
    };
    Logger.scream = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        logData = logData == null ? "" : logData;
        log(chalk.black.underline.bgYellow(logMessage), logData);
    };
    Logger.logFatalErrorMess = function (errorMessage, logData) {
        if (logData === void 0) { logData = ""; }
        var data = logData != null ? " ::: " + JSON.stringify(logData) : "";
        log(chalk.white.underline.bgRed(errorMessage + logData));
    };
    Logger.logFatalError = function (errorMessage, error) {
        if (error === void 0) { error = null; }
        if (error == null) {
            log(chalk.white.underline.bgRed(errorMessage));
        }
        else {
            log(chalk.white.underline.bgRed(errorMessage), error);
        }
    };
    Logger.logErrorMessage = function (errorMessage, error) {
        if (error === void 0) { error = null; }
        if (error == null)
            log(this.error(errorMessage));
        else
            log(this.error(errorMessage), error);
    };
    Logger.logErrorWithStrongWord = function (begin, strongWord, end) {
        log(chalk.bold.red(begin) + " " + chalk.bold.white.bgRed(strongWord) + " " + chalk.bold.red(begin));
    };
    Logger.logOut = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        logData = logData == null ? "" : logData;
        log(this.error(logMessage), logData);
    };
    Logger.logError = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        logData = logData == null ? "" : logData;
        log(this.error(logMessage), logData);
    };
    /**
     *
     * @param {string} logMessage
     * @param logData
     */
    Logger.globalDebug = function (success, logData) {
        if (logData === void 0) { logData = null; }
        var logMessages = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            logMessages[_i - 2] = arguments[_i];
        }
        if (!cli_global_1.CliGlobal.Debug)
            return;
        var message = logMessages.join(":::");
        if (success) {
            Logger.logGreen(message, logData);
        }
        else {
            Logger.logRed(message, logData);
        }
    };
    /*****************
     */
    Logger.prepStr = function (logMessage, logData) {
        //console.log("prepStr", "'" + log + "'");
        if (logData === void 0) { logData = null; }
        logData = logData == null ? "" : JSON.stringify(logData);
        return logMessage + " #> " + logData;
    };
    /***********/
    Logger.logGreenPrefix = function (prefix, logMessage, logData) {
        if (logData === void 0) { logData = null; }
        var logStr = Logger.prepStr(logMessage, logData);
        log(chalk.bold.black.bgGreen("#" + prefix + ":") + chalk.greenBright(logStr));
    };
    Logger.logRedPrefix = function (prefix, logMessage, logData) {
        if (logData === void 0) { logData = null; }
        var logStr = Logger.prepStr(logMessage, logData);
        log(chalk.bold.white.bgRed("#" + prefix + ":") + chalk.redBright(logStr));
    };
    /***********/
    Logger.logGreen = function (logMessage, logData) {
        //let logStr = Logger.prepStr(log, logData);
        //log(chalk.greenBright(logStr));
        if (logData === void 0) { logData = null; }
        if (logData) {
            log(chalk.greenBright(logMessage), chalk.greenBright(logData));
        }
        else {
            log(chalk.greenBright(logMessage));
        }
    };
    Logger.logRed = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        log(chalk.redBright(logMessage + '::'), chalk.redBright(logData));
    };
    Logger.logYellow = function (logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        log(chalk.yellow(logMessage), logData);
    };
    Logger.logCyan = function (logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        log(chalk.cyan(logMessage), logData);
    };
    Logger.logMega = function (logMessage) {
        var logData = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            logData[_i - 1] = arguments[_i];
        }
        var dataArray = [];
        for (var data in logData) {
            dataArray.push(JSON.stringify(data));
        }
        var dataStr = dataArray.join('\n');
        log(chalk.cyan(logMessage), dataStr);
    };
    Logger.logBlue = function (logMessage, logData) {
        if (logData === void 0) { logData = ""; }
        log(chalk.blue(logMessage), logData);
    };
    Logger.logPurple = function (logMessage, logData) {
        if (logData === void 0) { logData = null; }
        if (logData == null)
            log(chalk.magenta(logMessage));
        else
            log(chalk.magenta(logMessage), logData);
    };
    Logger.logImportant = function (prefix, logMessage) {
        log(chalk.bold.white.bgBlue("#" + prefix + ":") + chalk.white.bgMagenta(logMessage));
    };
    Logger.logChainStep = function (logMessage, step) {
        if (step === void 0) { step = -1; }
        if (step === -1) {
            log(chalk.white.bgMagenta(logMessage));
            return;
        }
        if (step == 1)
            console.log("");
        log(chalk.bold.white.bgBlue("#" + step + ":") + chalk.white.bgMagenta(logMessage));
    };
    Logger.logMessageHandler = function (signature, data) {
        log("Message Handler for " + chalk.green(signature) + " : " + chalk.yellow(data));
    };
    Logger.dbError = function (error) {
        log(this.error(error));
    };
    Logger.error = chalk.bold.red;
    Logger.warning = chalk.bold.yellow;
    return Logger;
}());
exports.Logger = Logger;
