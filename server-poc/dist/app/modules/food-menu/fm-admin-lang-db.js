"use strict";
/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
exports.MenuLangDb = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const log_service_1 = require("@app/services/log.service");
const interfaces_1 = require("@core/interfaces");
const action_result_1 = require("@models/action-result");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
let MenuLangDb = class MenuLangDb {
    constructor(dbClient, logger) {
        this.dbClient = dbClient;
        this.logger = logger;
        this.debugLevel = 1;
    }
    /**
     * Add new Language
     * @param langData - object representing a language db row
     */
    addNewLanguage(langData) {
        const scope = this;
        return new Promise((resolve, reject) => {
            let actionResult = new action_result_1.ActionResult();
            let query = new sql_igniter_1.SqlIgniter().insert({
                code: langData.code,
                name: langData.name
            }, 'language');
            this.dbClient.query(query).then(res => {
                if (res.success) {
                    langData.id = res.lastInsertId;
                    actionResult.data = langData;
                    resolve(actionResult);
                }
                else {
                    throw new Error("addNewLanguage Failed");
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
};
MenuLangDb = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IDbClient)),
    __param(1, inversify_1.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [Object, log_service_1.LogService])
], MenuLangDb);
exports.MenuLangDb = MenuLangDb;
