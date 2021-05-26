"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-20
 */
exports.__esModule = true;
var mysqlConfig = {
    host: "localhost",
    user: "duffman",
    password: "bjoe7151212",
    database: "appetizer_back",
    connectionLimit: 10
};
var mysql = require("mysql");
var util = require('util');
function makeDb(debug, config) {
    if (debug === void 0) { debug = false; }
    if (!config) {
        config = mysqlConfig;
    }
    var connection = mysql.createConnection(config);
    return {
        query: function (sql, args) {
            if (debug)
                console.log('makeDb :: query ::', sql);
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close: function () {
            if (debug)
                console.log('makeDb :: close');
            return util.promisify(connection.end)
                .call(connection);
        },
        begin: function () {
            if (debug)
                console.log('makeDb :: begin');
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit: function () {
            if (debug)
                console.log('makeDb :: commit');
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback: function () {
            if (debug)
                console.log('makeDb :: rollback');
            return util.promisify(connection.rollback)
                .call(connection);
        },
        getConn: function () {
            return connection;
        }
    };
}
exports.makeDb = makeDb;
