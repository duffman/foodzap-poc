"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbTransaction = void 0;
const mysql = require("mysql");
const db_logger_1 = require("./db-logger");
const db_result_parser_1 = require("./db-result-parser");
class DbTransaction {
    constructor() {
        this.scope = this;
        console.log("DbTransaction :: >> CONSTRUCTOR");
        /*this.getConnection().then(connection => {
            this.connection = connection;
            L.logMessage("Connection created");
        }).catch(err => {
            L.logErrorMessage("DbTransaction :: getConnection :: err ::", err);
        });*/
    }
    /**
     * Start new transaction
     */
    beginTransaction() {
        return new Promise((resolve, reject) => {
            this.connection.query("START TRANSACTION", (error, result) => {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    /**
     * Execute SQL Query
     * @param sql
     */
    executeQuery(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, result, tableFields) => {
                db_result_parser_1.DbResultParser.parseQueryResult(error, result, tableFields).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Commit transaction
     */
    commit() {
        return new Promise((resolve, reject) => {
            this.connection.query("COMMIT", (error, result) => {
                console.log("error ::", error);
                console.log("result ::", result);
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    /**
     * Rollback transaction
     */
    rollback() {
        return new Promise((resolve, reject) => {
            this.connection.query("ROLLBACK", (error, result) => {
                console.log("error ::", error);
                console.log("result ::", result);
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    /**
     * Create MySQL Connection
     * @param settings
     */
    createConnection(settings) {
        let conn;
        return new Promise((resolve, reject) => {
            try {
                conn = mysql.createConnection({
                    host: settings.dbHost,
                    user: settings.dbUser,
                    password: settings.dbPass,
                    database: settings.dbName
                });
                conn.on("error", (err) => {
                    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
                        let error = new Error('PROTOCOL_CONNECTION_LOST');
                        reject(error);
                    }
                });
                conn.connect((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(conn);
                });
            }
            catch (err) {
                db_logger_1.L.logErrorMessage("DbTransaction :: getConnection :: err ::", err);
                reject(err);
            }
        });
    }
}
exports.DbTransaction = DbTransaction;
