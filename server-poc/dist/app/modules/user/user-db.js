"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
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
exports.UserDb = void 0;
const sql_igniter_1 = require("@zynDb/sql-igniter");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const db_client_1 = require("@zynDb/db-client");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
let UserDb = class UserDb {
    constructor(dbClient) {
        this.dbClient = dbClient;
    }
    /**
     * Get user by provided email
     * @param email
     */
    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            let query = new sql_igniter_1.SqlIgniter()
                .get('users')
                .where('email', email);
            //.whereIs('email', email);
            const sql = query.toSql();
            console.log("getUserByEmail :: sql ::", sql);
            return this.dbClient.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getCategories() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Creates a new user in the database
     * @param userData
     */
    createUser(userData) {
        cli_logger_1.Logger.logGreen("UserDb :: createUser :: userData ::", userData);
        return new Promise((resolve, reject) => {
            let query = new sql_igniter_1.SqlIgniter()
                .insert({
                id: userData.id,
                customer_id: userData.customerId,
                email: userData.email,
                name: userData.name,
                password: userData.password
            }, 'users');
            const sql = query.toSql();
            cli_logger_1.Logger.logGreen("createUser :: sql ::", sql);
            this.dbClient.query(sql).then(res => {
                resolve(res);
            }).catch(err => {
                cli_logger_1.Logger.logError("createUser", err);
                reject(err);
            });
        });
    }
};
UserDb = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IDbClient)),
    __metadata("design:paramtypes", [db_client_1.DbClient])
], UserDb);
exports.UserDb = UserDb;
