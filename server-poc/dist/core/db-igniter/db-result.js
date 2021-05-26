"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * September 2018
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbResult = void 0;
const sql_table_data_1 = require("./data-containers/sql-table-data");
const sql_table_data_row_1 = require("./data-containers/sql-table-data-row");
const db_result_json_1 = require("./db-result-json");
class DbResult {
    constructor(error = null) {
        this.error = error;
        this.success = true;
        this.lastInsertId = 0;
        this.affectedRows = 0;
        this.resultSet = [];
        this.rowCount = 0;
        this.result = null;
    }
    setResult(result) {
        if (result) {
            this.result = result;
        }
        if (result && result.dataRows) {
            this.resultSet = result.dataRows;
            this.jsonResult = new db_result_json_1.DbResultJson(result.dataRows);
            this.rowCount = this.resultSet.length;
        }
    }
    any() {
        return this.result.rowCount() > 0;
    }
    /**
     * Always return a SQLTableDataRow
     * If a SQLTableData result is present containing
     * one or more rows, the first row will be returned
     * otherwize a new SQLTableDataRow will be created.
     */
    safeGetFirstRow() {
        let tableDataRow;
        let isObj = this.result != null;
        let isTableData = this.result instanceof sql_table_data_1.SQLTableData;
        if (isObj && isTableData && this.result.dataRows.length > 0) {
            tableDataRow = this.result.getFirstRow();
        }
        else {
            tableDataRow = new sql_table_data_row_1.SQLTableDataRow();
            tableDataRow.isEmpty = true;
        }
        return tableDataRow;
    }
    setError(err) {
        if (err !== null) {
            this.error = err;
            this.success = false;
        }
    }
}
exports.DbResult = DbResult;
