"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-05
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
exports.AuthBaseController = void 0;
const app_settings_1 = require("@app/app.settings");
const interfaces_1 = require("@core/interfaces");
const user_db_1 = require("@modules/user/user-db");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
let AuthBaseController = class AuthBaseController {
    constructor(appSettings, userDb, debugMode = false) {
        this.appSettings = appSettings;
        this.userDb = userDb;
        this.debugMode = debugMode;
        this.debugMode = true;
    }
};
AuthBaseController = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IAppSettings)),
    __param(1, inversify_1.inject(interfaces_1.Inf.IUserDb)),
    __metadata("design:paramtypes", [app_settings_1.AppSettings,
        user_db_1.UserDb, Boolean])
], AuthBaseController);
exports.AuthBaseController = AuthBaseController;
