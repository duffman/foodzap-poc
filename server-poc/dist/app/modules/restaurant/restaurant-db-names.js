"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-09-05
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnNames = exports.tableNames = void 0;
var tableNames;
(function (tableNames) {
    tableNames["restaurants"] = "restaurants";
    tableNames["restaurantTables"] = "restaurant_tables";
})(tableNames || (tableNames = {}));
exports.tableNames = tableNames;
var columnNames;
(function (columnNames) {
    columnNames["id"] = "id";
    columnNames["restaurantId"] = "restaurant_id";
})(columnNames || (columnNames = {}));
exports.columnNames = columnNames;
