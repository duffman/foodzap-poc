"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
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
exports.StaticAssetsController = void 0;
const app_settings_1 = require("@app/app.settings");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const inversify_1 = require("inversify");
const path = require("path");
let StaticAssetsController = class StaticAssetsController {
    constructor(appSettings, debugMode = false) {
        this.appSettings = appSettings;
        this.debugMode = debugMode;
    }
    initRoutes(routes) {
        let scope = this;
        routes.all("/", this.getRoot.bind(this));
        routes.all("/img", this.getImg.bind(this));
    }
    getRoot(req, resp) {
        resp.json({ 'ROOT': 666 });
    }
    sendFile(resp, filename, options) {
        let reqFile = (typeof filename === 'string') ? filename : null;
        if (reqFile) {
            resp.sendFile(reqFile, options, (err) => {
                cli_logger_1.Logger.logError("sendFile :: error ::", err);
            });
        }
        else {
            cli_logger_1.Logger.logError("sendFile :: error ::", reqFile);
        }
    }
    getImg(req, resp) {
        console.log('ID:: ', req.query.id);
        console.log('IMAGE:: ', req.query.image);
        let webRoot = this.appSettings.modeSettings.wwwRoot;
        cli_logger_1.Logger.logPurple("StaticAssetsController ::", webRoot);
        let imagePath = path.join(webRoot, 'restaurants/id_' + req.query.id);
        this.sendFile(resp, req.query.image, { root: imagePath });
    }
};
StaticAssetsController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IAppSettings)),
    __metadata("design:paramtypes", [app_settings_1.AppSettings, Boolean])
], StaticAssetsController);
exports.StaticAssetsController = StaticAssetsController;
