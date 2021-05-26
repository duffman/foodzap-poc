"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
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
exports.RestaurantDb = void 0;
const interfaces_1 = require("@core/interfaces");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const db_client_1 = require("@zynDb/db-client");
const sql_igniter_1 = require("@zynDb/sql-igniter");
var tableNames;
(function (tableNames) {
    tableNames["restaurants"] = "restaurants";
    tableNames["restaurantTables"] = "restaurant_tables";
})(tableNames || (tableNames = {}));
var columnNames;
(function (columnNames) {
    columnNames["id"] = "id";
    columnNames["restaurantId"] = "restaurant_id";
})(columnNames || (columnNames = {}));
let RestaurantDb = class RestaurantDb {
    constructor(dbKernel) {
        this.dbKernel = dbKernel;
    }
    getRestaurantListing(cityId) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get(tableNames.restaurants).where('city_id', cityId);
        let sql = dynSql.toSql();
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantListing() :: error ::", error);
                reject(error);
            });
        });
    }
    getRestaurantByQrCode(qrCode) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get(tableNames.restaurants).where('qr_code', qrCode);
        let sql = dynSql.toSql();
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantByQrCode() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get resuarant by customer id
     * @param {string} custId
     * @returns {Promise<IDbResult>}
     */
    getRestaurantByCustomerId(custId) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get(tableNames.restaurants).where('customer_id', custId);
        let sql = dynSql.toSql();
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantByCustomerId() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Retrieve restaurant from a qr code assigned to a restaurant table
     * @param {string} qrCode
     * @returns {Promise<IDbResult>}
     */
    getRestaurantByTableQrCode(qrCode) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get(tableNames.restaurantTables).where('qr_code', qrCode);
        let sql = dynSql.toSql();
        return new Promise((resolve, reject) => {
            this.dbKernel.query(sql).then((dbRes) => {
                let tableRow = dbRes.safeGetFirstRow();
                let restaurantId = tableRow.asInt(columnNames.restaurantId);
                return this.getRestaurantById(restaurantId);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantByQrCode() :: error ::", error);
                reject(error);
            });
        });
    }
    getRestaurantById(id) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get('restaurants').where('id', id);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logPurple('SQL :: getRestaurant ::', sql);
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurant() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get restaurant tables
     * @param {string} rstId
     * @returns {Promise<IDbResult>}
     */
    getRestaurantTables(rstId) {
        let sql = new sql_igniter_1.SqlIgniter().selectAll('restaurant_tables')
            .where('restaurant_id', rstId)
            .toSql();
        cli_logger_1.Logger.logPurple('SQL :: getRestaurantTables ::', sql);
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantTables() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get restaurant open hours
     * @param {string} rstId
     * @returns {Promise<IDbResult>}
     */
    getOpenHours(rstId) {
        cli_logger_1.Logger.logPurple("getOpenHours :: restaurantId ::", rstId);
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get('restaurant_open_hours').where('restaurant_id', rstId);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logPurple("getOpenHours :: SQL ::", sql);
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getOpenHours() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get Social Media Data
     * @param {number} rstId
     * @returns {Promise<IDbResult>}
     */
    getSocialMedia(rstId) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get('restaurant_social').where('restaurant_id', rstId);
        let sql = dynSql.toSql();
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getSocialMedia() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get Restaurant Location
     * @param rstId - Restaurant Id
     */
    getRestaurantLocation(rstId) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get('restaurant_location').where('restaurant_id', rstId);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logPurple('SQL :: getRestaurantLocation ::', sql);
        return new Promise((resolve, reject) => {
            return this.dbKernel.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getRestaurantLocation() :: error ::", error);
                reject(error);
            });
        });
    }
};
RestaurantDb = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IDbClient)),
    __metadata("design:paramtypes", [db_client_1.DbClient])
], RestaurantDb);
exports.RestaurantDb = RestaurantDb;
