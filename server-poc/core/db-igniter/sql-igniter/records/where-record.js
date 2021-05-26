"use strict";
/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var types_1 = require("../types");
var DWhere = /** @class */ (function () {
    function DWhere(data, value2, whereType) {
        if (value2 === void 0) { value2 = null; }
        if (whereType === void 0) { whereType = types_1.CompareType.Equal; }
        this.data = data;
        this.value2 = value2;
        this.whereType = whereType;
    }
    return DWhere;
}());
exports.DWhere = DWhere;
var DOrWhere = /** @class */ (function (_super) {
    __extends(DOrWhere, _super);
    function DOrWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DOrWhere;
}(DWhere));
exports.DOrWhere = DOrWhere;
var DAndWhere = /** @class */ (function (_super) {
    __extends(DAndWhere, _super);
    function DAndWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DAndWhere;
}(DWhere));
exports.DAndWhere = DAndWhere;
var DAndOrWhere = /** @class */ (function (_super) {
    __extends(DAndOrWhere, _super);
    function DAndOrWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DAndOrWhere;
}(DWhere));
exports.DAndOrWhere = DAndOrWhere;
var DOrAndWhere = /** @class */ (function (_super) {
    __extends(DOrAndWhere, _super);
    function DOrAndWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DOrAndWhere;
}(DWhere));
exports.DOrAndWhere = DOrAndWhere;
var DWhereSimple = /** @class */ (function () {
    function DWhereSimple(value1, value2, whereType, escape) {
        if (value2 === void 0) { value2 = null; }
        if (whereType === void 0) { whereType = types_1.CompareType.Equal; }
        if (escape === void 0) { escape = true; }
        this.value1 = value1;
        this.value2 = value2;
        this.whereType = whereType;
        this.escape = escape;
    }
    return DWhereSimple;
}());
exports.DWhereSimple = DWhereSimple;
var DWhereBetween = /** @class */ (function () {
    function DWhereBetween(type, that, value1, value2) {
        this.type = type;
        this.that = that;
        this.value1 = value1;
        this.value2 = value2;
    }
    return DWhereBetween;
}());
exports.DWhereBetween = DWhereBetween;
var DWhereMulti = /** @class */ (function () {
    function DWhereMulti(data, tableName) {
        this.data = data;
        this.tableName = tableName;
    }
    return DWhereMulti;
}());
exports.DWhereMulti = DWhereMulti;
