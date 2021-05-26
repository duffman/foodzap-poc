"use strict";
/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */
exports.__esModule = true;
var types_1 = require("../types");
var DJoin = /** @class */ (function () {
    function DJoin(columns) {
        this.columns = columns;
    }
    return DJoin;
}());
exports.DJoin = DJoin;
var DInQuery = /** @class */ (function () {
    function DInQuery(query) {
        this.query = query;
    }
    return DInQuery;
}());
exports.DInQuery = DInQuery;
var DUpdate = /** @class */ (function () {
    function DUpdate(table) {
        this.table = table;
    }
    return DUpdate;
}());
exports.DUpdate = DUpdate;
var DInsert = /** @class */ (function () {
    function DInsert(data, tableName, mySQLReplace) {
        this.data = data;
        this.tableName = tableName;
        this.mySQLReplace = mySQLReplace;
    }
    return DInsert;
}());
exports.DInsert = DInsert;
var DDelete = /** @class */ (function () {
    function DDelete(tableName) {
        this.tableName = tableName;
    }
    return DDelete;
}());
exports.DDelete = DDelete;
var DDrop = /** @class */ (function () {
    function DDrop(tableName) {
        this.tableName = tableName;
    }
    return DDrop;
}());
exports.DDrop = DDrop;
var DWith = /** @class */ (function () {
    function DWith() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.data = data;
    }
    return DWith;
}());
exports.DWith = DWith;
var DInto = /** @class */ (function () {
    function DInto(tableName) {
        this.tableName = tableName;
    }
    return DInto;
}());
exports.DInto = DInto;
var DSelect = /** @class */ (function () {
    function DSelect(column, alias) {
        this.column = column;
        this.alias = alias;
    }
    return DSelect;
}());
exports.DSelect = DSelect;
var DCount = /** @class */ (function () {
    function DCount(column, alias) {
        if (column === void 0) { column = '*'; }
        this.column = column;
        this.alias = alias;
    }
    return DCount;
}());
exports.DCount = DCount;
var DSelectAll = /** @class */ (function () {
    function DSelectAll(tableName) {
        this.tableName = tableName;
    }
    return DSelectAll;
}());
exports.DSelectAll = DSelectAll;
var DSet = /** @class */ (function () {
    function DSet(column, value, escape) {
        if (escape === void 0) { escape = true; }
        this.column = column;
        this.value = value;
        this.escape = escape;
    }
    return DSet;
}());
exports.DSet = DSet;
var DSetMulti = /** @class */ (function () {
    function DSetMulti(data, tableName) {
        this.data = data;
        this.tableName = tableName;
    }
    return DSetMulti;
}());
exports.DSetMulti = DSetMulti;
var DLeftJoin = /** @class */ (function () {
    function DLeftJoin(table, on, value, escapeVal) {
        if (value === void 0) { value = null; }
        if (escapeVal === void 0) { escapeVal = true; }
        this.table = table;
        this.on = on;
        this.value = value;
        this.escapeVal = escapeVal;
    }
    return DLeftJoin;
}());
exports.DLeftJoin = DLeftJoin;
var DFrom = /** @class */ (function () {
    function DFrom(table, alias) {
        this.table = table;
        this.alias = alias;
    }
    return DFrom;
}());
exports.DFrom = DFrom;
var DAnd = /** @class */ (function () {
    function DAnd(column, value, compare, escapeVal) {
        if (value === void 0) { value = undefined; }
        if (compare === void 0) { compare = types_1.CompareType.Equal; }
        if (escapeVal === void 0) { escapeVal = true; }
        this.column = column;
        this.value = value;
        this.compare = compare;
        this.escapeVal = escapeVal;
    }
    return DAnd;
}());
exports.DAnd = DAnd;
var DOrderBy = /** @class */ (function () {
    function DOrderBy(fieldName, orderType, escapeVal) {
        if (orderType === void 0) { orderType = types_1.OrderType.None; }
        this.fieldName = fieldName;
        this.orderType = orderType;
        this.escapeVal = escapeVal;
    }
    return DOrderBy;
}());
exports.DOrderBy = DOrderBy;
var DLimit = /** @class */ (function () {
    function DLimit(fromValue, toValue) {
        this.fromValue = fromValue;
        this.toValue = toValue;
    }
    return DLimit;
}());
exports.DLimit = DLimit;
