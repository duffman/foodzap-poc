"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-28
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const inversify_1 = require("inversify");
const action_result_1 = require("@models/action-result");
let LogService = class LogService {
    constructor(
    //		@inject(Inf.IDbClient) private dbClient: DbClient
    ) {
        this.tableName = "log";
    }
    clear() {
        return new Promise((resolve, reject) => {
            resolve(new action_result_1.ActionResult());
        });
    }
};
LogService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], LogService);
exports.LogService = LogService;
