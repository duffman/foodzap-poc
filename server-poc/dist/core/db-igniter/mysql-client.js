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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlClient = void 0;
const inversify_1 = require("inversify");
const mysql = require("mysql");
const db_logger_1 = require("./db-logger");
const db_result_1 = require("./db-result");
const db_result_parser_1 = require("./db-result-parser");
const util = require('util');
let MySqlClient = class MySqlClient {
    constructor() {
        this.connLost = false;
        this.debug = true;
    }
    configure(settings) {
        this.dbSettings = settings;
    }
    /**
     * Create MySQL Connection
     * @param {IDbSettings} settings
     * @returns {Connection}
     */
    getConnection(settings) {
        db_logger_1.L.log("Creating new connection");
        try {
            if (!this.dbSettings) {
                db_logger_1.L.logErrorMessage('DBKernel :: getConnection :: MySQL not initialized - settings missing');
                return;
            }
            if (!this.connection || true) {
                this.connection = mysql.createConnection({
                    host: this.dbSettings.dbHost,
                    user: this.dbSettings.dbUser,
                    password: this.dbSettings.dbPass,
                    database: this.dbSettings.dbName
                });
                this.connection.on("error", (err) => {
                    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                        console.log("CONNECTION -- LOST --:::", err);
                        this.connLost = true;
                    }
                });
            }
            if (this.connection.state === 'disconnected') {
                this.connection.connect((err, connection) => {
                    if (err) {
                        db_logger_1.L.logErrorMessage("Open MySQL Connection failed");
                        throw err;
                    }
                    else {
                        this.connection = connection;
                    }
                });
            }
        }
        catch (e) {
            console.log('Fläskballe ::', e);
        }
        return this.connection;
    }
    /**
     * Initialize transaction
     * @returns {Promise<MysqlError>}
     */
    startTransaction() {
        let conn = this.getConnection();
        return util.promisify(conn.beginTransaction);
    }
    /**
     * Undo transaction
     * @returns {Promise<MysqlError>}
     */
    rollbackTransaction() {
        let conn = this.getConnection();
        return util.promisify(conn.rollback);
    }
    /**
     * Save transaction changes to database
     * @returns {Promise<MysqlError>}
     */
    commitTransaction() {
        let conn = this.getConnection();
        return util.promisify(conn.commit);
    }
    /**
     * Execute SQL query
     * @param {string} sql
     * @returns {Promise<IDbResult>}
     */
    query(sql) {
        if (this.debug) {
            db_logger_1.L.log("Executing Query ::", sql);
            console.profile("Profiling start");
        }
        return new Promise((resolve, reject) => {
            let scope = this;
            let conn = this.getConnection();
            return conn.query(sql, (error, result, tableFields) => {
                if (error) {
                    db_logger_1.L.log("dbQuery ERROR ::", error);
                    if (error.fatal) {
                        console.trace('Fatal error: ' + error.message);
                    }
                    conn.end();
                    resolve(new db_result_1.DbResult(error));
                }
                else {
                    return db_result_parser_1.DbResultParser.parseQueryResult(error, result, tableFields).then((res) => {
                        if (error) {
                            // L.error("parseQueryResult ::", error);
                            resolve(new db_result_1.DbResult(error));
                        }
                        return res;
                    }).then((res) => {
                        conn.end((err) => {
                            db_logger_1.L.log('MysqlConn Close Error ::', err);
                            if (err) {
                                reject(err);
                            }
                        });
                        resolve(res);
                    }).catch((err) => {
                        conn.end((err) => {
                            db_logger_1.L.error('In Catch: End mysqlConnection :: err ::', err);
                        });
                        resolve(new db_result_1.DbResult(err));
                    });
                }
            });
        });
    }
    describeTable(tableName) {
        return Promise.resolve(undefined);
    }
    /**
     * Get the primary key from given table
     * @param {string} tableName
     * @returns {Promise<ISQLTableField>}
     */
    getPrimaryKeyField(tableName) {
        return null;
    }
};
MySqlClient = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MySqlClient);
exports.MySqlClient = MySqlClient;
