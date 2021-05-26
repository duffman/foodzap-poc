"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
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
exports.DbEngine = void 0;
const inversify_1 = require("inversify");
const mysql = require("mysql");
const db_logger_1 = require("./db-logger");
const db_result_1 = require("./db-result");
const db_result_parser_1 = require("./db-result-parser");
const util = require("util");
let DbEngine = class DbEngine {
    constructor() {
        this.connLost = false;
        this.debug = true;
        this.connection = null;
    }
    /**
     * Assign server connection settings
     * @param {IDbSettings} settings
     */
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
                db_logger_1.L.logErrorMessage("DbEngine :: getConnection :: MySQL not initialized - Settings missing!");
                return null;
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
        catch (ex) {
            console.log("DbEngine :: getConnection ::", ex);
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
    startTransaction2() {
        return new Promise((resolve, reject) => {
            let conn = this.getConnection();
            let trans = conn.beginTransaction;
            resolve(conn);
        });
    }
    /**
     * Undo transaction
     * @returns {Promise<MysqlError>}
     */
    rollbackTransaction(conn) {
        conn = !conn ? this.getConnection() : conn;
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
     * @param transConn
     * @returns {Promise<IDbResult>}
     */
    runQuery(sql, transConn) {
        let scope = this;
        if (this.debug) {
            db_logger_1.L.log("Executing Query ::", sql);
            console.profile("Profiling start");
        }
        return new Promise((resolve, reject) => {
            let qConn = !transConn ? this.getConnection() : transConn;
            return qConn.query(sql, (error, result, tableFields) => {
                try {
                    if (error) {
                        db_logger_1.L.log("dbQuery ERROR ::", error);
                        if (error.fatal) {
                            console.trace('Fatal error: ' + error.message);
                        }
                        //conn.end();
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
                            scope.connection.end((err) => {
                                db_logger_1.L.log('MysqlConn Close Error ::', err);
                                if (err) {
                                    reject(err);
                                }
                            });
                            resolve(res);
                        }).catch((err) => {
                            scope.connection.end((err) => {
                                db_logger_1.L.error('In Catch: End mysqlConnection :: err ::', err);
                            });
                            resolve(new db_result_1.DbResult(err));
                        });
                    }
                }
                catch (err) {
                    console.log("FET FIA ::", err);
                }
            });
        });
    }
};
DbEngine = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DbEngine);
exports.DbEngine = DbEngine;
