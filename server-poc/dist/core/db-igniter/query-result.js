"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResult = void 0;
class QueryResult {
    constructor(tableData = null, error = null) {
        this.tableData = tableData;
        this.error = error;
    }
}
exports.QueryResult = QueryResult;
