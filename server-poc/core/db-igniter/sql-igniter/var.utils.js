"use strict";
exports.__esModule = true;
var zyn_query_utils_1 = require("./query-utils");
var where_record_1 = require("./records/where-record");
/**
 * Coldmind AB ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2020 Coldmind AB, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg <patrik.forsberg@coldmind.com>
 * File Date: 2020-04-02 15:20
 *
 ************************************************
 * Description:
 *
 */
var VarUtils = /** @class */ (function () {
    function VarUtils() {
    }
    VarUtils.getVarType = function (value) {
        var result = zyn_query_utils_1.VarType.None;
        if (value === undefined || value === null) {
            return zyn_query_utils_1.VarType.NullOrUndefined;
        }
        switch (typeof value) {
            case 'string':
                result = zyn_query_utils_1.VarType.String;
                break;
            case 'boolean':
                result = zyn_query_utils_1.VarType.Boolean;
                break;
            case 'number':
                result = zyn_query_utils_1.VarType.Number;
                break;
            case 'object':
                if (value instanceof Date) {
                    result = zyn_query_utils_1.VarType.Date;
                }
                else if (Array.isArray(value)) {
                    result = zyn_query_utils_1.VarType.Array;
                }
                else if (Buffer.isBuffer(value)) {
                    result = zyn_query_utils_1.VarType.Buffer;
                }
                else {
                    result = zyn_query_utils_1.VarType.Object;
                }
                break;
        }
        return result;
    };
    /**
     * Checks wheater a given variable is of string fieldType
     * and has a length greater than 0
     * @param value - variable
     */
    VarUtils.haveStrValue = function (value) {
        var varType = VarUtils.getVarType(value);
        return value !== undefined
            && varType === zyn_query_utils_1.VarType.String
            && value.length > 0;
    };
    VarUtils.isWhereRec = function (arec) {
        return (arec instanceof where_record_1.DOrWhere
            || arec instanceof where_record_1.DAndWhere
            || arec instanceof where_record_1.DWhere
            || arec instanceof where_record_1.DAndOrWhere
            || arec instanceof where_record_1.DOrAndWhere
            || arec instanceof where_record_1.DWhereSimple);
    };
    return VarUtils;
}());
exports.VarUtils = VarUtils;
