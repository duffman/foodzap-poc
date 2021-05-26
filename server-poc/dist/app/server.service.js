"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const app_settings_1 = require("@app/app.settings");
const app_settings_2 = require("@app/app.settings");
const log_service_1 = require("@app/services/log.service");
const webapp_1 = require("@app/webapp");
const cli_commander_1 = require("@cli/cli.commander");
const cli_logger_1 = require("@cli/cli.logger");
const db_client_1 = require("@zynDb/db-client");
let ServerService = class ServerService {
    constructor(appSettings, protocolManager, connectionHub, messageHub, dbClient, webApp, loggingService) {
        this.appSettings = appSettings;
        this.protocolManager = protocolManager;
        this.connectionHub = connectionHub;
        this.messageHub = messageHub;
        this.dbClient = dbClient;
        this.webApp = webApp;
        this.loggingService = loggingService;
        console.log(`This process is pid :: ${process.pid}`);
        let serverMode = this.getCliServerMode();
        appSettings.setServerMode(serverMode);
        let modeSettings = appSettings.modeSettings;
        if (!modeSettings) {
            cli_logger_1.Logger.logFatalError("Invalid Server Mode Settings :: exiting");
            process.exit(99);
        }
        loggingService.clear();
        // Configure DB Client
        dbClient.configure(modeSettings.database);
        // Init Web App
        webApp.initApp(modeSettings);
    }
    /**
     * Read Server Mode param
     */
    getCliServerMode() {
        let mode = cli_commander_1.CliCommander.getParamByName("serverMode");
        let appMode = app_settings_2.ServerMode.Unset;
        if (mode !== undefined) {
            switch (mode) {
                case "test":
                    appMode = app_settings_2.ServerMode.Test;
                    break;
                case "live":
                    appMode = app_settings_2.ServerMode.Live;
                    break;
                case "local":
                    appMode = app_settings_2.ServerMode.Local;
                    break;
            }
        }
        return appMode;
    }
    initPubsubService() {
        cli_logger_1.Logger.logPurple("****** initPubsubService *******");
    }
};
ServerService = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject("IAppSettings")),
    __param(1, inversify_1.inject("INetworkHub")),
    __param(2, inversify_1.inject("IConnectionHub")),
    __param(3, inversify_1.inject("IMessageHub")),
    __param(4, inversify_1.inject("IDbClient")),
    __param(5, inversify_1.inject("IWebApp")),
    __param(6, inversify_1.inject("ILogService")),
    __metadata("design:paramtypes", [app_settings_1.AppSettings, Object, Object, Object, db_client_1.DbClient,
        webapp_1.WebApp,
        log_service_1.LogService])
], ServerService);
exports.ServerService = ServerService;
