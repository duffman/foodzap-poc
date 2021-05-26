"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppSettings_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettings = exports.ServerMode = exports.Networking = void 0;
const cli_commander_1 = require("@cli/cli.commander");
const cli_config_file_1 = require("@cli/cli.config-file");
const cli_logger_1 = require("@cli/cli.logger");
const server_mode_typing_1 = require("@core/settings/server-mode.typing");
const io_utils_1 = require("@core/utils/io-utils");
const inversify_1 = require("inversify");
var Networking;
(function (Networking) {
    //export const webServerPort             = 80;
    //export const socketIOPort              = process.env.PORT || 5000;
    Networking.socketIOPort = 9090;
    Networking.webSocketPort = 6060;
    Networking.tcpPort = 1681;
    Networking.adminPort = 3000;
})(Networking = exports.Networking || (exports.Networking = {}));
var ServerMode;
(function (ServerMode) {
    ServerMode["Unset"] = "unset";
    ServerMode["Test"] = "test";
    ServerMode["Local"] = "local";
    ServerMode["Live"] = "live";
})(ServerMode = exports.ServerMode || (exports.ServerMode = {}));
var DebugMode;
(function (DebugMode) {
    DebugMode[DebugMode["None"] = 0] = "None";
    DebugMode[DebugMode["All"] = 1] = "All";
    DebugMode[DebugMode["Error"] = 2] = "Error";
    DebugMode[DebugMode["Warning"] = 3] = "Warning";
    DebugMode[DebugMode["Notice"] = 4] = "Notice";
})(DebugMode || (DebugMode = {}));
let AppSettings = AppSettings_1 = class AppSettings {
    constructor() {
        let cliConfig = new cli_config_file_1.CliConfigFile();
        let jsonStr = cliConfig.getConfig(true);
        this.appConfig = this.jsonToAppConfig(jsonStr);
        this.checkSettings();
    }
    /**
     * Sets the Server Mode, the config is populated when the mode is set
     * @param mode
     */
    setServerMode(mode) {
        if (mode === ServerMode.Unset) {
            mode = ServerMode.Local;
        }
        this.applyAppModeSettings(mode);
        // Set DebugMode
        this.debugMode = DebugMode.All;
        switch (this.modeSettings.debugMode) {
            case "none":
                this.debugMode = DebugMode.None;
                break;
            case "all":
                this.debugMode = DebugMode.All;
                break;
            case "error":
                this.debugMode = DebugMode.Error;
                break;
            case "warning":
                this.debugMode = DebugMode.Warning;
                break;
            case "notice":
                this.debugMode = DebugMode.Notice;
                break;
        }
        // Set the static DbSettings
        AppSettings_1.dbSettings = this.modeSettings.database;
        if (AppSettings_1.verboseDebug) {
            cli_logger_1.Logger.logCyan('Mode Settings ::', this.modeSettings);
        }
    }
    applyAppModeSettings(mode) {
        let scope = this;
        function applySettings(settings) {
            // Make sure that the wwwRoot ends with a platform specific slash
            settings.wwwRoot = io_utils_1.IoUtils.ensureTrailingPathDelimiter(settings.wwwRoot);
            scope.modeSettings = new server_mode_typing_1.ServerModeSettings(settings.cors, settings.database, settings.debugMode, settings.domain, settings.listenHost, settings.listenPort, settings.wwwRoot);
        }
        function applyLocalSettings() {
            applySettings(scope.appConfig.serverMode.local);
        }
        function applyLiveSettings() {
            applySettings(scope.appConfig.serverMode.live);
        }
        switch (mode) {
            case ServerMode.Local:
                cli_logger_1.Logger.logGreen("Using Local Settings");
                applyLocalSettings();
                break;
            case ServerMode.Live:
                cli_logger_1.Logger.logGreen("Using Live Settings");
                applyLiveSettings();
                break;
        }
    }
    checkSettings() {
        let mode = cli_commander_1.CliCommander.getParamByName("mode");
        let result = ServerMode.Live;
        switch (mode) {
            case ServerMode.Local:
                result = ServerMode.Local;
                break;
            case ServerMode.Live:
                result = ServerMode.Live;
                break;
        }
        this.setServerMode(result);
    }
    jsonToAppConfig(json) {
        return JSON.parse(json);
    }
};
AppSettings.debug = true;
AppSettings.verboseDebug = true;
AppSettings = AppSettings_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AppSettings);
exports.AppSettings = AppSettings;
