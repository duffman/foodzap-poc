"use strict";
/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLimit = exports.DOrderBy = exports.DAnd = exports.DFrom = exports.DLeftJoin = exports.DSetMulti = exports.DSet = exports.DSelectAll = exports.DCount = exports.DSelect = exports.DInto = exports.DWith = exports.DDrop = exports.DDelete = exports.DInsert = exports.DUpdate = exports.DInQuery = exports.DJoin = void 0;
const types_1 = require("../types");
class DJoin {
    constructor(columns) {
        this.columns = columns;
    }
}
exports.DJoin = DJoin;
class DInQuery {
    constructor(query) {
        this.query = query;
    }
}
exports.DInQuery = DInQuery;
class DUpdate {
    constructor(table) {
        this.table = table;
    }
}
exports.DUpdate = DUpdate;
class DInsert {
    constructor(data, tableName, mySQLReplace) {
        this.data = data;
        this.tableName = tableName;
        this.mySQLReplace = mySQLReplace;
    }
}
exports.DInsert = DInsert;
class DDelete {
    constructor(tableName) {
        this.tableName = tableName;
    }
}
exports.DDelete = DDelete;
class DDrop {
    constructor(tableName) {
        this.tableName = tableName;
    }
}
exports.DDrop = DDrop;
class DWith {
    constructor(...data) {
        this.data = data;
    }
}
exports.DWith = DWith;
class DInto {
    constructor(tableName) {
        this.tableName = tableName;
    }
}
exports.DInto = DInto;
class DSelect {
    constructor(column, alias) {
        this.column = column;
        this.alias = alias;
    }
}
exports.DSelect = DSelect;
class DCount {
    constructor(tableName, column = '*', alias) {
        this.tableName = tableName;
        this.column = column;
        this.alias = alias;
    }
}
exports.DCount = DCount;
class DSelectAll {
    constructor(tableName) {
        this.tableName = tableName;
    }
}
exports.DSelectAll = DSelectAll;
class DSet {
    constructor(column, value, escape = true) {
        this.column = column;
        this.value = value;
        this.escape = escape;
    }
}
exports.DSet = DSet;
class DSetMulti {
    constructor(data, tableName) {
        this.data = data;
        this.tableName = tableName;
    }
}
exports.DSetMulti = DSetMulti;
class DLeftJoin {
    constructor(table, on, value = null, escapeVal = true) {
        this.table = table;
        this.on = on;
        this.value = value;
        this.escapeVal = escapeVal;
    }
}
exports.DLeftJoin = DLeftJoin;
class DFrom {
    constructor(table, alias) {
        this.table = table;
        this.alias = alias;
    }
}
exports.DFrom = DFrom;
class DAnd {
    constructor(column, value = undefined, compare = types_1.CompareType.Equal, escapeVal = true) {
        this.column = column;
        this.value = value;
        this.compare = compare;
        this.escapeVal = escapeVal;
    }
}
exports.DAnd = DAnd;
class DOrderBy {
    constructor(fieldName, orderType = types_1.OrderType.None, escapeVal) {
        this.fieldName = fieldName;
        this.orderType = orderType;
        this.escapeVal = escapeVal;
    }
}
exports.DOrderBy = DOrderBy;
class DLimit {
    constructor(fromValue, toValue) {
        this.fromValue = fromValue;
        this.toValue = toValue;
    }
}
exports.DLimit = DLimit;
