"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLTableDataRow = void 0;
const db_logger_1 = require("../db-logger");
const point_1 = require("../models/point");
const var_utils_1 = require("../utils/var-utils");
const sql_table_field_1 = require("./sql-table-field");
class SQLTableDataRow {
    constructor(obj) {
        this.isEmpty = false;
        this.fields = new Array();
        if (!var_utils_1.DbVarUtils.isDefined(obj)) {
            this.parseData(obj);
        }
    }
    /**
     * Parse table field data
     * @param obj
     */
    parseData(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.addField(key, obj[key]);
            }
        }
    }
    /**
     * Create new field
     * @param key
     * @param value
     */
    addField(key, value) {
        this.fields.push(new sql_table_field_1.SQLTableField(key, value));
    }
    /**
     * Return Column by field
     * @param {string} key
     * @returns {ISQLTableField}
     */
    getField(key) {
        let result = null;
        for (let field of this.fields) {
            if (field.name === key) {
                result = field;
                break;
            }
        }
        return result;
    }
    /**
     * Return the number of columns
     * @returns {number}
     */
    count() {
        return this.fields.length;
    }
    /**
     * Set Value to Null
     * @param {string} key
     */
    nullValue(key) {
        let column = this.getField(key);
        if (column != null) {
            column.value = null;
        }
    }
    /**
     * Return column value as String
     * @param {string} key
     * @returns {string}
     */
    asStr(key) {
        let column = this.getField(key);
        return column != null ? column.value : null;
    }
    /**
     * Return column value as Point
     * @param {string} key
     * @returns {Point}
     */
    asPoint(key) {
        let column = this.getField(key);
        let res = column != null ? column.value : null;
        return new point_1.Point(0, 0);
    }
    /**
     * Return column value as Number
     * @param {string} key
     * @returns {number}
     */
    asNum(key) {
        let value = this.asStr(key);
        if (value != null) {
            return parseInt(value);
        }
        return -1;
    }
    /**
     * Makes an optimistic attempt to parse a JS date from given string
     * @param {string} key
     * @returns {Date}
     */
    asDate(key) {
        return new Date(key);
    }
    /**
     * Return the column value as Number
     * @param {string} key
     * @returns {number}
     */
    asInt(key) {
        return this.asNum(key);
    }
    /**
     * Return the column value as Boolean
     * @param {string} key
     * @returns {number}
     */
    asBool(key) {
        let result = false;
        try {
            let val = this.getField(key);
            result = (Number.parseInt(val.value) === 1);
        }
        catch (err) {
            db_logger_1.L.logErrorMessage('getValAsBool ::', err);
            result = false;
        }
        return result;
    }
    /**
     * Return a JSON representation of the table data
     * @returns {string}
     */
    asJson() {
        let data = this.fields != null ? this.fields : "NULL";
        return JSON.stringify(data);
    }
}
exports.SQLTableDataRow = SQLTableDataRow;
