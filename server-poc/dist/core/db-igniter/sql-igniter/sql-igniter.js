"use strict";
/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlIgniter = void 0;
const records_1 = require("./records/records");
const records_2 = require("./records/records");
const records_3 = require("./records/records");
const where_record_1 = require("./records/where-record");
const types_1 = require("./types");
const var_utils_1 = require("./var.utils");
const query_utils_1 = require("./query-utils");
const l = console.log;
const e = console.error;
class SqlIgniter {
    constructor() {
        this.typeIdent = 'SqlIgniter';
        this.currRec = undefined;
        this.prevRec = undefined;
        this.records = new Array();
    }
    clear() {
        this.records.length = 0;
    }
    debugShowAll() {
        for (let item of this.records) {
            l('item ::', item);
        }
    }
    escpaeVal(value) {
        let result = value;
        if (!value) {
            result = 'null';
        }
        else if (typeof value === "string") {
            result = query_utils_1.QueryUtils.escape(value);
        }
        else if (typeof value === "object") {
            result = query_utils_1.QueryUtils.escape(value);
        }
        else {
            result = value;
        }
        return result;
    }
    isSelectRec(arec) {
        return (arec instanceof records_2.DSelect || arec instanceof records_2.DSelectAll);
    }
    toSql() {
        let sql = "";
        for (let i = 0; i < this.records.length; i++) {
            this.prevRec = this.currRec;
            this.currRec = this.records[i];
            if (this.currRec instanceof records_1.DCount) {
                sql += this.parseCount();
            }
            if (this.currRec instanceof records_2.DInsert) {
                sql += this.parseInsert();
            }
            if (this.currRec instanceof records_2.DSelect) {
                sql += this.parseSelect();
            }
            if (this.currRec instanceof records_2.DSelectAll) {
                if (this.prevRec !== undefined) {
                    throw new Error(`${records_2.DSelectAll} instruction is not allowed after ${typeof this.prevRec}`);
                }
                sql += this.parseSelectAll();
            }
            if (this.currRec instanceof records_2.DFrom) {
                sql += this.parseFrom();
            }
            if (this.currRec instanceof records_2.DSet) {
                sql += this.parseSet();
            }
            if (this.currRec instanceof records_3.DSetMulti) {
                sql += this.parseSetMulti();
            }
            if (this.currRec instanceof records_2.DLeftJoin) {
                sql += this.parseLeftJoin();
            }
            if (var_utils_1.VarUtils.isWhereRec(this.currRec)) {
                sql += this.parseWhere();
            }
            if (this.currRec instanceof records_2.DAnd) {
                sql += this.parseAnd();
            }
            if (this.currRec instanceof records_2.DOrderBy) {
                sql += this.parseOrderBy();
            }
            if (this.currRec instanceof records_2.DLimit) {
                sql += this.parseLimit();
            }
        }
        return sql;
    }
    /**
     * Returns the previous record from a given
     * record in the record array
     * @param {IDRecord} record
     * @returns {IDRecord}
     */
    getPreviousRecord(record) {
        let result;
        let index = this.records.indexOf(record);
        if (index > -1 && index - 1 > 0) {
            result = this.records[index];
        }
        return result;
    }
    selectAll(...elements) {
        // Be nice, if no parameter is passed add an asterisk
        if (!elements) {
            elements.push("*");
        }
        for (let item in elements) {
            let name = elements[item];
            this.records.push(new records_2.DSelectAll(name));
        }
        return this;
    }
    count(tableName, alias, column = "*") {
        this.records.push(new records_1.DCount(tableName, column, alias));
        return this;
    }
    get(table) {
        this.records.push(new records_2.DSelect('*'));
        let rec = new records_2.DFrom(table);
        this.records.push(rec);
        return this;
    }
    select(...param) {
        for (let item in param) {
            let name = param[item];
            this.records.push(new records_2.DSelect(name));
        }
        return this;
    }
    update(table) {
        this.records.push(new records_2.DUpdate(table));
        return this;
    }
    delete(table) {
        this.records.push(new records_2.DDelete(table));
        return this;
    }
    insert(data, tableName, mySQLReplace) {
        this.clear(); //TODO: Split into multiple queries instead of clearing-
        this.records.push(new records_2.DInsert(data, tableName, mySQLReplace));
        return this;
    }
    replace(data, tableName) {
        this.clear(); //TODO: Split into multiple queries instead of clearing-
        return this.insert(data, tableName, true);
    }
    with(...data) {
        this.records.push(new records_2.DWith(data));
        return this;
    }
    into(tableName) {
        this.records.push(new records_2.DInto(tableName));
        return this;
    }
    set(column, value) {
        this.records.push(new records_2.DSet(column, value));
        return this;
    }
    setMulti(data, tableName) {
        this.records.push(new records_3.DSetMulti(data, tableName));
        return this;
    }
    join(columns) {
        this.records.push(new records_2.DJoin(columns));
        return this;
    }
    inQuery(dynSql) {
        this.records.push(new records_2.DInQuery(dynSql));
        return this;
    }
    joinTable(tableName, on, value, escapeVal = true) {
        this.records.push(new records_2.DLeftJoin(tableName, on, value, escapeVal));
        return this;
    }
    selectAs(fromTable, alias = null) {
        this.records.push(new records_2.DSelect(fromTable, alias));
        return this;
    }
    from(tableName, alias = null) {
        let rec = new records_2.DFrom(tableName, alias);
        this.records.push(rec);
        return this;
    }
    whereIs(whereParamsObj, value2, whereType = types_1.CompareType.Equal) {
        this.records.push(new where_record_1.DWhere(whereParamsObj, value2, whereType));
        return this;
    }
    where(value1, value2 = null, whereType = types_1.CompareType.Equal, escapeValue = true) {
        let rec = new where_record_1.DWhereSimple(value1, value2, whereType, escapeValue);
        this.records.push(rec);
        return this;
    }
    orWhere(value1, value2 = null, compareType) {
        let rec = new where_record_1.DOrWhere(value1, value2, compareType);
        this.records.push(rec);
        return this;
    }
    andWhere(value1, value2 = null, compareType) {
        let rec = new where_record_1.DAndWhere(value1, value2, compareType);
        this.records.push(rec);
        return this;
    }
    andOrWhere(value1, value2 = null, compareType) {
        let rec = new where_record_1.DAndOrWhere(value1, value2, compareType);
        this.records.push(rec);
        return this;
    }
    orAndWhere(value1, value2 = null, compareType) {
        let rec = new where_record_1.DOrAndWhere(value1, value2, compareType);
        this.records.push(rec);
        return this;
    }
    whereBetween(value, rangeStart, rangeEnd) {
        query_utils_1.QueryUtils.escape(value);
        let rec = new where_record_1.DWhereBetween(types_1.CompareType.Between, value, rangeStart, rangeEnd);
        this.records.push(rec);
        return this;
    }
    orderBy(column, orderType = types_1.OrderType.None) {
        let rec = new records_2.DOrderBy(column, orderType);
        this.records.push(rec);
        return this;
    }
    orderByRand() {
        let rec = new records_2.DOrderBy("RAND()");
        this.records.push(rec);
        return this;
    }
    and(col, value = null, compType = types_1.CompareType.Equal, escapeVal = true) {
        let rec = new records_2.DAnd(col, value, compType, escapeVal);
        this.records.push(rec);
        return this;
    }
    limitBy(fromValue, toValue = null) {
        let rec = new records_2.DLimit(fromValue, toValue);
        this.records.push(rec);
        return this;
    }
    ///////////////////////////////////////////
    //
    //     HELPERS
    //
    ///////////////////////////////////////////
    findRecord(recType) {
        let result = this.findRecords(recType);
        if (result.length > 0) {
            return result[0];
        }
        else {
            return null;
        }
    }
    findRecords(recType, firstHit = false) {
        let result = [];
        for (let i = 0; i < this.records.length; i++) {
            let record = this.records[i];
            if (typeof record === recType) {
                result.push(record);
                if (firstHit) {
                    break;
                }
            }
        }
        return result;
    }
    pluck(o, propertyNames) {
        return propertyNames.map(n => o[n]);
    }
    parseCount() {
        let result = ``;
        if (this.currRec instanceof records_1.DCount) {
            const rec = this.currRec;
            result += `SELECT COUNT(${rec.column})`;
            if (rec.alias) {
                result += ` AS ${rec.alias}`;
            }
            if (rec.tableName) {
                result += ` FROM ${rec.tableName}`;
            }
        }
        return result;
    }
    parseJoin() {
        let localCounter = 0;
        for (let i = 0; i < this.records.length; i++) {
            let record = this.records[i];
            if (record instanceof records_2.DJoin) {
                const dRec = record;
            }
        }
        return "";
    }
    ////////////////////////////////////////
    //
    //     INSERT
    //
    ////////////////////////////////////////
    parseInsert() {
        let record = this.records[0];
        if (!(record instanceof records_2.DInsert)) {
            return "";
        }
        let result = "";
        const dRec = record;
        let insertType = dRec.mySQLReplace ? types_1.SQLCommands.DbMySqlReplace : types_1.SQLCommands.DbInsert;
        let colNames = new Array();
        let colValues = new Array();
        let obj = dRec.data;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                colNames.push(key);
                colValues.push(obj[key]);
            }
        }
        for (let i = 0; i < colValues.length; i++) {
            let value = colValues[i];
            value = this.escpaeVal(value);
            colValues[i] = value;
        }
        result = `${insertType} INTO ${dRec.tableName} (${colNames.join(",")}) VALUES (${colValues.join(",")})`;
        return result;
    }
    ////////////////////////////////////////
    //
    //     SELECT
    //
    ///////////////////////////////////////
    parseSelect() {
        let result = ``;
        if (this.currRec instanceof records_2.DSelect) {
            const rec = this.currRec;
            if (this.isSelectRec(this.prevRec)) {
                result += ",";
            }
            else {
                result += "SELECT";
            }
            result += ` ${rec.column}`;
        }
        return result;
    }
    parseSelectAll() {
        let result = ``;
        if (this.currRec instanceof records_2.DSelectAll) {
            const rec = this.currRec;
            result += `SELECT * FROM ${rec.tableName}`;
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //     UPDATE
    //
    ///////////////////////////////////////
    parseUpdate() {
        let result = ``;
        if (this.currRec instanceof records_2.DUpdate) {
            const rec = this.currRec;
            result = `UPDATE ${query_utils_1.QueryUtils.escape(rec.table)}`;
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //     DELETE
    //
    ///////////////////////////////////////
    parseDelete() {
        let result = ``;
        if (this.currRec instanceof records_2.DDelete) {
            result = `DELETE FROM ${query_utils_1.QueryUtils.escape(this.currRec.tableName)}`;
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //     DROP
    //
    ///////////////////////////////////////
    parseDrop() {
        let result = "";
        if (this.currRec instanceof records_2.DDrop) {
            const rec = this.currRec;
            result = `DROP ${query_utils_1.QueryUtils.escape(rec.tableName)}`;
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //     FROM
    //
    ///////////////////////////////////////
    parseFrom() {
        let result = "";
        if (this.currRec instanceof records_2.DFrom) {
            const rec = this.currRec;
            if (this.prevRec instanceof records_2.DFrom) {
                result += ",";
            }
            else {
                result += " " + types_1.SQLCommands.DbFrom;
            }
            result += " " + rec.table;
            if (rec.alias != null) {
                result += " AS " + rec.alias;
            }
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //     SET
    //
    ///////////////////////////////////////
    parseSet() {
        let result = "";
        if (this.currRec instanceof records_2.DSet) {
            const rec = this.currRec;
            if (this.prevRec instanceof records_2.DSet) {
                result += " SET";
            }
            else {
                result += " ,";
            }
            let val = rec.escape ? query_utils_1.QueryUtils.escape(rec.value) : rec.value;
            result += " " + rec.column + "='" + val + "'";
        }
        return result;
    } // parseSet
    parseSetMulti() {
        let record = this.records[0];
        let result = "";
        if (!(record instanceof records_3.DSetMulti)) {
            return result;
        }
        const dRec = record;
        let setValues = new Array();
        let obj = dRec.data;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                setValues.push(`${key}=${this.escpaeVal(obj[key])}`);
            }
        }
        if (record.tableName && this.prevRec !== records_2.DUpdate) {
            result = `${types_1.SQLCommands.DbUpdate} ${dRec.tableName} `;
        }
        result += `${types_1.SQLCommands.DbSet} ${setValues.join(",")}`;
        return result;
    }
    ////////////////////////////////////////
    //
    //     LEFT JOIN
    //
    ////////////////////////////////////////
    parseLeftJoin() {
        let result = "";
        if (this.currRec instanceof records_2.DLeftJoin) {
            const rec = this.currRec;
            result += " LEFT JOIN "
                + rec.table + " ON "
                + rec.on;
            if (rec.value) {
                rec.value = rec.escapeVal ? query_utils_1.QueryUtils.escape(rec.value) : rec.value;
                result += " = " + rec.value;
            }
        }
        return result;
    } // parseLeftJoin
    ////////////////////////////////////////
    //
    //     WHERE
    //
    ////////////////////////////////////////
    parseWhere() {
        let result = ``;
        if (var_utils_1.VarUtils.isWhereRec(this.prevRec)) {
            result += " AND ";
        }
        else {
            result += " WHERE ";
        }
        if (this.currRec instanceof where_record_1.DWhereSimple) {
            result += query_utils_1.QueryUtils.parseCompareType(this.currRec.value1, this.currRec.value2, this.currRec.whereType);
        }
        if (this.currRec instanceof where_record_1.DWhere) {
            const rec = this.currRec;
            if (typeof rec.data === "string") {
                result += rec.data;
            }
            else {
                let colNames = new Array();
                let colValues = new Array();
                let obj = rec.data;
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        colNames.push(key);
                        colValues.push(obj[key]);
                    }
                }
                let colData = Array();
                for (let i = 0; i < colValues.length; i++) {
                    colData.push(`${colNames[i]}=${query_utils_1.QueryUtils.escape(colValues[i])}`);
                }
                result += colData.join(" AND ");
            }
        }
        return result;
    } // parseWhere
    ////////////////////////////////////////
    //
    //      And
    //
    ////////////////////////////////////////
    parseAnd() {
        let result = "";
        if (this.currRec instanceof records_2.DAnd) {
            let rec = this.currRec;
            result += " AND ";
            if (rec.value !== undefined) {
                // Special case for null value
                if (rec.value === null) {
                    switch (rec.compare) {
                        case types_1.CompareType.Equal:
                            result += " IS NULL";
                            break;
                        case types_1.CompareType.NotEqual:
                            result += " NOT NULL";
                            break;
                    }
                }
                else {
                    result += query_utils_1.QueryUtils.parseCompareType(rec.column, rec.value, rec.compare);
                }
            }
        }
        return result;
    }
    ////////////////////////////////////////
    //
    //  Order
    //
    ///////////////////////////////////////
    parseOrderBy() {
        let result = "";
        if (this.currRec instanceof records_2.DOrderBy) {
            let rec = this.currRec;
            if (this.prevRec instanceof records_2.DOrderBy) {
                result += ", ";
            }
            else {
                result += " ORDER BY ";
            }
            result += rec.fieldName;
            if (rec.orderType !== types_1.OrderType.None) {
                switch (rec.orderType) {
                    case types_1.OrderType.Asc:
                        result += " ASC";
                        break;
                    case types_1.OrderType.Desc:
                        result += " DESC";
                        break;
                }
            }
        }
        return result;
    } // end parseOrderBy
    ////////////////////////////////////////
    //
    //  Limit
    //
    ///////////////////////////////////////
    parseLimit() {
        let result = "";
        if (this.currRec instanceof records_2.DLimit) {
            const rec = this.currRec;
            result += " LIMIT " + rec.fromValue;
            if (rec.toValue != null) {
                result += ", " + rec.toValue;
            }
        }
        return result;
    } // end parseLimit
}
exports.SqlIgniter = SqlIgniter;
