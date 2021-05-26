"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-17
 */
exports.__esModule = true;
var util = require('util');
var msql = require('mysql');
var dbConfig = {
    connectionLimit: 10,
    dbName: "appetizer_back",
    dbHost: "localhost",
    dbUser: "duffman",
    dbPass: "bjoe7151212"
};
function makeDb(config) {
    if (!config) {
        config = dbConfig;
    }
    var connection = msql.createConnection(config);
    return {
        query: function (sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close: function () {
            return util.promisify(connection.end).call(connection);
        },
        beginTransaction: function () {
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit: function () {
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback: function () {
            return util.promisify(connection.rollback)
                .call(connection);
        }
    };
}
exports.makeDb = makeDb;
