"use strict";
/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
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
exports.Scrappy = void 0;
require("reflect-metadata");
const mysql_ok_packet_1 = require("@zynDb/types/mysql-ok-packet");
const sql_table_data_1 = require("./data-containers/sql-table-data");
const inversify_1 = require("inversify");
const mysql = require("mysql");
const db_logger_1 = require("./db-logger");
const db_result_1 = require("./db-result");
const db_result_parser_1 = require("./db-result-parser");
const util = require('util');
const dbSettings = {
    host: "localhost",
    user: "duffman",
    password: "bjoe7151212",
    database: "appetizer_back",
    connectionLimit: 10
};
let Scrappy = class Scrappy {
    constructor() {
        this.connectionLost = false;
        this.debug = true;
        this.lastError = null;
        this.dbSettings = null;
    }
    configure(settings) {
        this.dbSettings = settings;
    }
    /* / Ping database to check for common exception errors.
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }

      if (connection) connection.release()

      return
    })

     */
    getConnection(settings) {
        db_logger_1.L.log("Creating new connection");
        if (!this.dbSettings) {
            db_logger_1.L.logErrorMessage('DBKernel :: getConnection :: MySQL not initialized - settings missing');
            return;
        }
        if (!this.connection) {
            this.connection = mysql.createConnection(this.dbSettings);
            this.connection.on("error", (err) => {
                if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                    console.log("CONNECTION -- LOST --:::", err);
                    this.connectionLost = true;
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
        return this.connection;
    }
    start() {
        let conn = this.getConnection();
        return util.promisify(conn.beginTransaction).call();
    }
    rollback() {
        let conn = this.getConnection();
        return util.promisify(conn.rollback);
    }
    commit() {
        let conn = this.getConnection();
        return util.promisify(conn.commit);
    }
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
                    return db_result_parser_1.DbResultParser.parseQueryResult(error, result, tableFields)
                        .then((res) => {
                        if (error) {
                            db_logger_1.L.error("parseQueryResult ::", error);
                            resolve(new db_result_1.DbResult(error));
                        }
                        return res;
                    }).then((res) => {
                        conn.end((err) => {
                            console.log('MysqlConn Close Error ::', err);
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
    static parseQueryResult(error, result, tableFields) {
        return new Promise((resolve, reject) => {
            let queryResult = new db_result_1.DbResult();
            if (error) {
                queryResult.success = false;
                queryResult.error = error;
                let customError = error;
                //error code 1292
                if (error.errno === 'ECONNREFUSED') {
                    customError = new Error("ECONNREFUSED");
                }
                if (error.errno == 1062) {
                    customError = new Error("DUP_ENTRY");
                }
                else {
                    db_logger_1.L.logErrorMessage("dbQuery :: Error ::", error.errno);
                }
                reject(customError);
            }
            else {
                // console.log('parseQueryResult :: NO ERROR ::', result);
                if (mysql_ok_packet_1.MySqlOkPacket.validate(result)) {
                    queryResult.affectedRows = result.affectedRows;
                    queryResult.lastInsertId = result.insertId;
                }
                let data = new sql_table_data_1.SQLTableData();
                data.parseResultSet(result, tableFields).then((res) => {
                    queryResult.setResult(res);
                    resolve(queryResult);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }
};
Scrappy = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Scrappy);
exports.Scrappy = Scrappy;
