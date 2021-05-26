"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: February 2018
 *
 * Partly based on DynUtils
 * https://github.com/mysqljs/sqlstring/blob/master/lib/DynUtils.js
 */
exports.__esModule = true;
var ID_GLOBAL_REGEXP = /`/g;
var QUAL_GLOBAL_REGEXP = /\./g;
var CHARS_GLOBAL_REGEXP = /[\0\b\t\n\r\x1a\"\'\\]/g; // eslint-disable-line no-control-regex
var CHARS_ESCAPE_MAP = {
    '\0': '\\0',
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\r': '\\r',
    '\x1a': '\\Z',
    '"': '\\"',
    '\'': '\\\'',
    '\\': '\\\\'
};
var types_1 = require("./types");
var VarType;
(function (VarType) {
    VarType[VarType["None"] = 0] = "None";
    VarType[VarType["NullOrUndefined"] = 1] = "NullOrUndefined";
    VarType[VarType["String"] = 2] = "String";
    VarType[VarType["Number"] = 3] = "Number";
    VarType[VarType["Boolean"] = 4] = "Boolean";
    VarType[VarType["Object"] = 5] = "Object";
    VarType[VarType["Date"] = 6] = "Date";
    VarType[VarType["Array"] = 7] = "Array";
    VarType[VarType["Buffer"] = 8] = "Buffer";
})(VarType = exports.VarType || (exports.VarType = {}));
var QueryUtils = /** @class */ (function () {
    function ZynQueryUtils() {
    }
    ZynQueryUtils.prepMySqlDate = function (dateObj) {
        dateObj.setHours(dateObj.getHours() - 2);
        return dateObj.toISOString().slice(0, 19).replace('T', ' ');
    };
    ZynQueryUtils.parseCompareType = function (value1, value2, whereType) {
        var sql = "";
        switch (whereType) {
            case types_1.CompareType.Equal:
                sql = value1 + " = " + ZynQueryUtils.escape(value2);
                break;
            // Equal (Safe to compare NULL values)
            case types_1.CompareType.SafeEqual:
                sql = value1 + " <=> " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.GreaterThan:
                sql = value1 + " > " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.GreaterOrEquals:
                sql = value1 + " >= " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.LessThan:
                sql = value1 + " < " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.LessOrEquals:
                sql = value1 + " <= " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.Between:
                sql = "BETWEEN " + ZynQueryUtils.escape(value1) + " AND " + ZynQueryUtils.escape(value2);
                break;
            case types_1.CompareType.Or:
                sql = value1 + " <= " + ZynQueryUtils.escape(value2);
                break;
            default: {
                sql = 'UNKNOWN_DIRECTIVE';
            }
        }
        return sql;
    };
    ZynQueryUtils.escapeId = function (val, forbidQualified) {
        if (forbidQualified === void 0) { forbidQualified = false; }
        if (Array.isArray(val)) {
            var sql = '';
            for (var i = 0; i < val.length; i++) {
                sql += (i === 0 ? '' : ', ') + ZynQueryUtils.escapeId(val[i], forbidQualified);
            }
            return sql;
        }
        else if (forbidQualified) {
            return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``') + '`';
        }
        else {
            return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``').replace(QUAL_GLOBAL_REGEXP, '`.`') + '`';
        }
    };
    /**
     *
     * @param val
     * @param stringifyObjects
     * @param timeZone
     */
    ZynQueryUtils.escape = function (val, stringifyObjects, timeZone) {
        if (stringifyObjects === void 0) { stringifyObjects = true; }
        if (timeZone === void 0) { timeZone = 0; }
        if (val === undefined || val === null) {
            return 'NULL';
        }
        switch (typeof val) {
            case 'boolean':
                return (val) ? 'true' : 'false';
            case 'number':
                return val + '';
            case 'object':
                if (val instanceof Date) {
                    return ZynQueryUtils.dateToString(val, timeZone || 'local');
                }
                else if (Array.isArray(val)) {
                    return ZynQueryUtils.arrayToList(val, timeZone);
                }
                else if (Buffer.isBuffer(val)) {
                    return ZynQueryUtils.bufferToString(val);
                }
                else if (typeof val.toDynUtils === 'function') {
                    return String(val.toDynUtils());
                }
                else if (stringifyObjects) {
                    return ZynQueryUtils.escapeString(val.toString());
                }
                else {
                    return ZynQueryUtils.objectToValues(val, timeZone);
                }
            default:
                return ZynQueryUtils.escapeString(val);
        }
    };
    ;
    ZynQueryUtils.arrayToList = function (array, timeZone) {
        var sql = '';
        for (var i = 0; i < array.length; i++) {
            var val = array[i];
            if (Array.isArray(val)) {
                sql += (i === 0 ? '' : ', ') + '(' + ZynQueryUtils.arrayToList(val, timeZone) + ')';
            }
            else {
                sql += (i === 0 ? '' : ', ') + ZynQueryUtils.escape(val, true, timeZone);
            }
        }
        return sql;
    };
    ZynQueryUtils.format = function (sql, values, stringifyObjects, timeZone) {
        if (values == null) {
            return sql;
        }
        if (!(values instanceof Array || Array.isArray(values))) {
            values = [values];
        }
        var chunkIndex = 0;
        var placeholdersRegex = /\?+/g;
        var result = '';
        var valuesIndex = 0;
        var match;
        while (valuesIndex < values.length && (match = placeholdersRegex.exec(sql))) {
            var len = match[0].length;
            if (len > 2) {
                continue;
            }
            var value = len === 2
                ? ZynQueryUtils.escapeId(values[valuesIndex])
                : ZynQueryUtils.escape(values[valuesIndex], stringifyObjects, timeZone);
            result += sql.slice(chunkIndex, match.index) + value;
            chunkIndex = placeholdersRegex.lastIndex;
            valuesIndex++;
        }
        if (chunkIndex === 0) {
            // Nothing was replaced
            return sql;
        }
        if (chunkIndex < sql.length) {
            return result + sql.slice(chunkIndex);
        }
        return result;
    };
    ZynQueryUtils.dateToString = function (date, timeZone) {
        var dt = new Date(date);
        if (isNaN(dt.getTime())) {
            return 'NULL';
        }
        var year, month, day, hour, minute, second, millisecond;
        if (timeZone === 'local') {
            year = dt.getFullYear();
            month = dt.getMonth() + 1;
            day = dt.getDate();
            hour = dt.getHours();
            minute = dt.getMinutes();
            second = dt.getSeconds();
            millisecond = dt.getMilliseconds();
        }
        else {
            var tz = ZynQueryUtils.convertStrToTimezone(timeZone);
            if (tz != 0) {
                dt.setTime(dt.getTime() + (tz * 60000));
            }
            year = dt.getUTCFullYear();
            month = dt.getUTCMonth() + 1;
            day = dt.getUTCDate();
            hour = dt.getUTCHours();
            minute = dt.getUTCMinutes();
            second = dt.getUTCSeconds();
            millisecond = dt.getUTCMilliseconds();
        }
        // YYYY-MM-DD HH:mm:ss.mmm
        var str = ZynQueryUtils.zeroPad(year, 4) + '-' + ZynQueryUtils.zeroPad(month, 2) + '-' + ZynQueryUtils.zeroPad(day, 2) + ' ' +
            ZynQueryUtils.zeroPad(hour, 2) + ':' + ZynQueryUtils.zeroPad(minute, 2) + ':' + ZynQueryUtils.zeroPad(second, 2) + '.' +
            ZynQueryUtils.zeroPad(millisecond, 3);
        return ZynQueryUtils.escapeString(str);
    };
    ;
    ZynQueryUtils.bufferToString = function (buffer) {
        return 'X' + ZynQueryUtils.escapeString(buffer.toString('hex'));
    };
    ;
    ZynQueryUtils.objectToValues = function (object, timeZone) {
        var sql = '';
        for (var key in object) {
            var val = object[key];
            if (typeof val === 'function') {
                continue;
            }
            sql += (sql.length === 0 ? '' : ', ') + ZynQueryUtils.escapeId(key)
                + ' = ' + ZynQueryUtils.escape(val, true, timeZone);
        }
        return sql;
    };
    ZynQueryUtils.raw = function (sql) {
        if (typeof sql !== 'string') {
            throw new TypeError('argument sql must be a string');
        }
        return {
            toDynUtils: function toDynUtils() {
                return sql;
            }
        };
    };
    ZynQueryUtils.escapeString = function (val) {
        if (typeof val !== "string") {
            return val;
        }
        var chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex = 0;
        var escapedVal = '';
        var match;
        while ((match = CHARS_GLOBAL_REGEXP.exec(val))) {
            escapedVal += val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[match[0]];
            chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex;
        }
        if (chunkIndex === 0) {
            // Nothing was escaped
            return "'" + val + "'";
        }
        if (chunkIndex < val.length) {
            return "'" + escapedVal + val.slice(chunkIndex) + "'";
        }
        return "'" + escapedVal + "'";
    };
    ZynQueryUtils.zeroPad = function (value, length) {
        value = value.toString();
        while (value.length < length) {
            value = '0' + value;
        }
        return value;
    };
    ZynQueryUtils.convertStrToTimezone = function (tz) {
        if (tz === 'Z') {
            return 0;
        }
        var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
        if (m) {
            return (m[1] === '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
        }
        return 0;
    };
    return ZynQueryUtils;
}());
exports.ZynQueryUtils = QueryUtils;
