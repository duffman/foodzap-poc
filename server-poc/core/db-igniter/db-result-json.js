"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const casing_type_1 = require("./utils/casing-type");
class DbResultJson {
    constructor(dataRows) {
        this.dataRows = dataRows;
        this.result = {};
        this.result = {};
        this.transformToObj();
    }
    /**
     * Create JSON object with "_" underscored field names
     * renamed to lowerPascalCasing
     */
    transformToObj() {
        if (!this.dataRows || this.dataRows.length === 0) {
            return;
        }
        let result = new Array();
        for (let row of this.dataRows) {
            let obj = {};
            for (let col of row.columns) {
                let camelKey = casing_type_1.StringCasing.snakeToPascalCase(col.field, true);
                obj[camelKey] = col.value;
            }
            result.push(obj);
        }
        if (result.length === 1) {
            this.result = result[0];
        }
    }
    getJsonStr() {
        return JSON.stringify(this.result);
    }
}
exports.DbResultJson = DbResultJson;
