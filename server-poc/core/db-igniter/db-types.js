"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var FieldDataTypeDef;
(function (FieldDataTypeDef) {
    FieldDataTypeDef.BIGINT = 8;
    FieldDataTypeDef.TINYINT = 1;
    FieldDataTypeDef.SMALLINT = 2;
    FieldDataTypeDef.VARCHAR = 253;
    FieldDataTypeDef.INT = 3;
    FieldDataTypeDef.DATE_TIME = 12;
    FieldDataTypeDef.DOUBLE = 5;
    FieldDataTypeDef.POINT = 255;
    FieldDataTypeDef.ENUM_STR = 254;
})(FieldDataTypeDef = exports.FieldDataTypeDef || (exports.FieldDataTypeDef = {}));
var FieldType;
(function (FieldType) {
    FieldType[FieldType["unset"] = -1] = "unset";
    FieldType[FieldType["bigint"] = 8] = "bigint";
    FieldType[FieldType["tinyint"] = 1] = "tinyint";
    FieldType[FieldType["smallint"] = 2] = "smallint";
    FieldType[FieldType["varchar"] = 253] = "varchar";
    FieldType[FieldType["int"] = 3] = "int";
    FieldType[FieldType["datetime"] = 12] = "datetime";
    FieldType[FieldType["double"] = 5] = "double";
    FieldType[FieldType["point"] = 255] = "point";
    FieldType[FieldType["enumStr"] = 254] = "enumStr";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
