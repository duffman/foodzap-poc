"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_ok_packet_1 = require("./types/mysql-ok-packet");
const sql_table_data_1 = require("./data-containers/sql-table-data");
const db_logger_1 = require("./db-logger");
const db_result_1 = require("./db-result");
class DbResultParser {
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
                // L.log('parseQueryResult :: NO ERROR ::', result);
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
}
exports.DbResultParser = DbResultParser;
