"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantTableModel = void 0;
class RestaurantTableModel {
    constructor(id, restaurantId, tableNumber, tableName, tableDescription, qrCode) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.tableNumber = tableNumber;
        this.tableName = tableName;
        this.tableDescription = tableDescription;
        this.qrCode = qrCode;
    }
}
exports.RestaurantTableModel = RestaurantTableModel;
