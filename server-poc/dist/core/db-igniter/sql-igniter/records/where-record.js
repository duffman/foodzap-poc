"use strict";
/**
 * The file is part of the ZynapticSQL project
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Licensed under the GNU Lesser General Public License, Version 3.0
 * Find a full copy of the license in the LICENSE.md file located in the project root.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DWhereMulti = exports.DWhereBetween = exports.DWhereSimple = exports.DOrAndWhere = exports.DAndOrWhere = exports.DAndWhere = exports.DOrWhere = exports.DWhere = void 0;
const types_1 = require("../types");
class DWhere {
    constructor(data, value2 = null, whereType = types_1.CompareType.Equal) {
        this.data = data;
        this.value2 = value2;
        this.whereType = whereType;
    }
}
exports.DWhere = DWhere;
class DOrWhere extends DWhere {
}
exports.DOrWhere = DOrWhere;
class DAndWhere extends DWhere {
}
exports.DAndWhere = DAndWhere;
class DAndOrWhere extends DWhere {
}
exports.DAndOrWhere = DAndOrWhere;
class DOrAndWhere extends DWhere {
}
exports.DOrAndWhere = DOrAndWhere;
class DWhereSimple {
    constructor(value1, value2 = null, whereType = types_1.CompareType.Equal, escape = true) {
        this.value1 = value1;
        this.value2 = value2;
        this.whereType = whereType;
        this.escape = escape;
    }
}
exports.DWhereSimple = DWhereSimple;
class DWhereBetween {
    constructor(type, that, value1, value2) {
        this.type = type;
        this.that = that;
        this.value1 = value1;
        this.value2 = value2;
    }
}
exports.DWhereBetween = DWhereBetween;
class DWhereMulti {
    constructor(data, tableName) {
        this.data = data;
        this.tableName = tableName;
    }
}
exports.DWhereMulti = DWhereMulti;
