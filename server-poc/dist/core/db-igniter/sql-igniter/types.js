"use strict";
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
 * File Date: 2018-04-02 14:09
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = exports.OrderType = exports.CompareType = exports.SQLCommands = void 0;
var SQLCommands;
(function (SQLCommands) {
    SQLCommands["DbDelete"] = "DELETE";
    SQLCommands["DbInsert"] = "INSERT";
    SQLCommands["DbUpdate"] = "UPDATE";
    SQLCommands["DbMySqlReplace"] = "REPLACE";
    SQLCommands["DbSelect"] = "SELECT";
    SQLCommands["DbFrom"] = "FROM";
    SQLCommands["DbWhere"] = "WHERE";
    SQLCommands["DbSet"] = "SET";
    SQLCommands["DbDrop"] = "DROP";
    SQLCommands["DbLimit"] = "LIMIT";
    SQLCommands["DbOrderBy"] = "ORDER BY";
})(SQLCommands = exports.SQLCommands || (exports.SQLCommands = {}));
var CompareType;
(function (CompareType) {
    CompareType[CompareType["Equal"] = 0] = "Equal";
    CompareType[CompareType["SafeEqual"] = 1] = "SafeEqual";
    CompareType[CompareType["NotEqual"] = 2] = "NotEqual";
    CompareType[CompareType["GreaterThan"] = 3] = "GreaterThan";
    CompareType[CompareType["GreaterOrEquals"] = 4] = "GreaterOrEquals";
    CompareType[CompareType["LessThan"] = 5] = "LessThan";
    CompareType[CompareType["LessOrEquals"] = 6] = "LessOrEquals";
    CompareType[CompareType["Between"] = 7] = "Between";
    CompareType[CompareType["InValue"] = 8] = "InValue";
    CompareType[CompareType["InQuery"] = 9] = "InQuery";
    CompareType[CompareType["Or"] = 10] = "Or";
    CompareType[CompareType["In"] = 11] = "In";
})(CompareType = exports.CompareType || (exports.CompareType = {}));
var OrderType;
(function (OrderType) {
    OrderType[OrderType["None"] = 0] = "None";
    OrderType[OrderType["Asc"] = 1] = "Asc";
    OrderType[OrderType["Desc"] = 2] = "Desc";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var DataType;
(function (DataType) {
    DataType[DataType["VarChar"] = 0] = "VarChar";
    DataType[DataType["Boolean"] = 1] = "Boolean";
    DataType[DataType["Int"] = 2] = "Int";
    DataType[DataType["Date"] = 3] = "Date";
})(DataType = exports.DataType || (exports.DataType = {}));
var JoinType;
(function (JoinType) {
    JoinType[JoinType["Inner"] = 0] = "Inner";
    JoinType[JoinType["Outer"] = 1] = "Outer";
    JoinType[JoinType["Left"] = 2] = "Left";
    JoinType[JoinType["Right"] = 3] = "Right";
    JoinType[JoinType["Cross"] = 4] = "Cross";
})(JoinType || (JoinType = {}));
