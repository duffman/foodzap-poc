"use strict";
/*  Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  File Created: 2020-03-22 19:21
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantAdminService = void 0;
const interfaces_1 = require("@core/interfaces");
const action_result_1 = require("@models/action-result");
const restaurant_admin_db_1 = require("@modules/restaurant/restaurant-admin.db");
const restaurant_db_1 = require("@modules/restaurant/restaurant.db");
const inversify_1 = require("inversify");
let RestaurantAdminService = class RestaurantAdminService {
    constructor(rstDb, rstAdminDb) {
        this.rstDb = rstDb;
        this.rstAdminDb = rstAdminDb;
        this.debugMode = true;
    }
    /**
     *
     */
    createRestaurant() {
        let result = new action_result_1.ActionResult();
        return new Promise((resolve, reject) => {
            resolve(result);
        });
    }
    /**
     *
     */
    saveRestaurant() {
        let result = new action_result_1.ActionResult();
        return new Promise((resolve, reject) => {
            resolve(result);
        });
    }
    /**
     * Assign a QR code with a restaurant table, having a QR code assigned to a
     * table makes it possible for guests to check in at a table.
     * @param {string} qrCode
     * @param {number} rstId
     * @param {number} tableId
     * @returns {Promise<IActionResult>}
     */
    assignTableQR(qrCode, rstId, tableId) {
        return new Promise((resolve, reject) => {
        });
    }
};
RestaurantAdminService = __decorate([
    __param(0, inversify_1.inject(interfaces_1.Inf.IRestaurantDb)),
    __param(1, inversify_1.inject(interfaces_1.Inf.IRestaurantAdminDb)),
    __metadata("design:paramtypes", [restaurant_db_1.RestaurantDb,
        restaurant_admin_db_1.RestaurantAdminDb])
], RestaurantAdminService);
exports.RestaurantAdminService = RestaurantAdminService;
