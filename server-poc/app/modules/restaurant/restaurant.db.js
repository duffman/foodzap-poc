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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var inversify_1 = require("inversify");
require("reflect-metadata");
var cli_logger_1 = require("@cli/cli.logger");
var dynsql_1 = require("@coreDb/dynsql/dynsql");
var RestaurantDb = /** @class */ (function () {
    function RestaurantDb(dbKernel) {
        this.dbKernel = dbKernel;
        this.init();
    }
    RestaurantDb.prototype.init = function () {
    };
    RestaurantDb.prototype.getRestaurant = function (qrCode) {
        var _this = this;
        var dynSql = new dynsql_1.DynSQL();
        dynSql.get('restaurants').where('qr_code', qrCode);
        var sql = dynSql.toSQL();
        cli_logger_1.Logger.logPurple('SQL :: getRestaurant :: QRCODE ::', qrCode);
        cli_logger_1.Logger.logPurple('SQL :: getRestaurant ::', sql);
        return new Promise(function (resolve, reject) {
            return _this.dbKernel.dbQuery(sql).then(function (dbRes) {
                resolve(dbRes);
            })["catch"](function (error) {
                cli_logger_1.Logger.logError("getRestaurant() :: error ::", error);
                reject(error);
            });
        });
    };
    RestaurantDb.prototype.getOpenHours = function (restaurantId) {
        var _this = this;
        cli_logger_1.Logger.logPurple("getOpenHours :: restaurantId ::", restaurantId);
        var dynSql = new dynsql_1.DynSQL();
        dynSql.get('restaurant_open_hours').where('restaurant_id', restaurantId);
        var sql = dynSql.toSQL();
        cli_logger_1.Logger.logPurple("getOpenHours :: SQL ::", sql);
        return new Promise(function (resolve, reject) {
            return _this.dbKernel.dbQuery(sql).then(function (dbRes) {
                resolve(dbRes);
            })["catch"](function (error) {
                cli_logger_1.Logger.logError("getOpenHours() :: error ::", error);
                reject(error);
            });
        });
    };
    /**
     * Get Restaurant Location
     * @param restaurantId
     */
    RestaurantDb.prototype.getRestaurantLocation = function (restaurantId) {
        var _this = this;
        var dynSql = new dynsql_1.DynSQL();
        dynSql.get('restaurant_location').where('restaurant_id', restaurantId);
        var sql = dynSql.toSQL();
        cli_logger_1.Logger.logPurple('SQL :: getRestaurantLocation ::', sql);
        return new Promise(function (resolve, reject) {
            return _this.dbKernel.dbQuery(sql).then(function (dbRes) {
                resolve(dbRes);
            })["catch"](function (error) {
                cli_logger_1.Logger.logError("getRestaurantLocation() :: error ::", error);
                reject(error);
            });
        });
    };
    RestaurantDb = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("IDbClient"))
    ], RestaurantDb);
    return RestaurantDb;
}());
exports.RestaurantDb = RestaurantDb;
