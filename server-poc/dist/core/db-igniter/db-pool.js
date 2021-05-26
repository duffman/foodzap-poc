"use strict";
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
exports.DBPool = void 0;
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
const db_logger_1 = require("@zynDb/db-logger");
const inversify_1 = require("inversify");
const mysql = require("mysql");
let DBPool = class DBPool {
    constructor() {
        this.pool = new Map();
        //let conn = await this.getPoolConnection();
    }
    getPoolConnection(threadId, settings) {
        const scope = this;
        return new Promise((resolve, reject) => {
            if (!settings) {
                settings = {
                    dbHost: 'localhost',
                    dbType: 'mysql',
                    dbPass: 'bjoe7151212',
                    dbUser: 'duffman',
                    dbName: 'appetizer_back',
                };
            }
            let connection = mysql.createConnection({
                host: settings.dbHost,
                user: settings.dbUser,
                password: settings.dbPass,
                database: settings.dbName
            });
            connection.on("error", (err) => {
                if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                    console.log("CONNECTION -- LOST --:::", err);
                }
            });
            if (connection.state === 'disconnected') {
                connection.connect((err, connection) => {
                    if (err) {
                        db_logger_1.L.logErrorMessage("Open MySQL Connection failed");
                        throw err;
                    }
                    else {
                        resolve(connection);
                    }
                });
            }
        });
    }
};
DBPool = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DBPool);
exports.DBPool = DBPool;
