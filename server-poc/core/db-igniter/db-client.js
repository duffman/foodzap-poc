"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created: 2017-05-14
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
const inversify_1 = require("inversify");
const db_logger_1 = require("./db-logger");
const var_utils_1 = require("./utils/var-utils");
const mysql_client_1 = require("./mysql-client");
let DbClient = class DbClient {
    constructor() {
        this.client = new mysql_client_1.MySqlClient();
    }
    configure(settings) {
        this.settings = settings;
        this.client.configure(settings);
    }
    getConnection(settings) {
        return this.client.getConnection();
    }
    startTransaction() {
        return this.client.startTransaction();
    }
    rollbackTransaction() {
        return this.client.rollbackTransaction();
    }
    commitTransaction() {
        return this.client.commitTransaction();
    }
    /**
     * Executes a SQL query against the Database Server if an object instance
     * is passed, an attempt to call a toString() method will be make which
     * makes it possible to pass an instance of ZynQuery for exampe is possible.
     *
     * @param query
     * @returns {Promise<IDbResult>}
     */
    query(query) {
        let sql = undefined;
        if (var_utils_1.DbVarUtils.isString(query)) {
            sql = query;
        }
        else if (typeof query === 'object' && query.toSql === "function") {
            sql = query.toSql();
        }
        if (sql) {
            return this.client.query(sql);
        }
        else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid SQL"));
            });
        }
    }
    /**
     * Extracts table META-data
     * @param {string} tableName
     * @returns {Promise<IDbResult>}
     */
    describeTable(tableName) {
        return new Promise((resolve, reject) => {
            const sql = `DESC ${tableName}`;
            db_logger_1.L.log('setRecord :: haveRow ::', sql);
            this.client.query(sql).then((res) => {
                resolve(res);
            }).catch(err => {
                db_logger_1.L.error("describeTable :: haveRow ::", err);
                reject(err);
            });
        });
    }
};
DbClient = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DbClient);
exports.DbClient = DbClient;
