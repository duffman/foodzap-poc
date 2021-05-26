"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-20
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbCore = void 0;
const mysqlConfig = {
    host: "localhost",
    user: "duffman",
    password: "bjoe7151212",
    database: "appetizer_back",
    connectionLimit: 10
};
const db_logger_1 = require("@zynDb/db-logger");
const mysql = require("mysql");
const util = require('util');
function createDbCore(debug = false, config) {
    if (!config) {
        config = mysqlConfig;
    }
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
            if (debug) {
                console.log('createDbCore :: query ::', sql);
            }
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            if (debug) {
                console.log('createDbCore :: close');
            }
            return util.promisify(connection.end)
                .call(connection);
        },
        begin() {
            if (debug) {
                console.log('createDbCore :: begin');
            }
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit() {
            if (debug) {
                console.log('createDbCore :: commit');
            }
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback() {
            if (debug) {
                db_logger_1.L.log('createDbCore :: rollback');
            }
            return util.promisify(connection.rollback)
                .call(connection);
        },
        getConn() {
            return connection;
        }
    };
}
exports.createDbCore = createDbCore;
