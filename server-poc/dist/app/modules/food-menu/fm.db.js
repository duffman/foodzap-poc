"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
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
exports.FoodMenuDb = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const db_client_1 = require("@zynDb/db-client");
const types_1 = require("@zynDb/sql-igniter/types");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const food_menu_builder_1 = require("@modules/food-menu/food-menu-builder");
let FoodMenuDb = class FoodMenuDb {
    constructor(dbClient) {
        this.dbClient = dbClient;
        //	super();
    }
    /**
     * Get categories
     * @param {number} customerId
     * @param {number} langId
     * @param {boolean} debug
     * @returns {Promise<IDbResult>}
     */
    getCategoriesOld(customerId, langId, debug = false) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.select("fmc.id", "fmc.weight", "fm_category_lang.field", "fm_category_lang.description")
            .from("fm")
            .from("fm_categories", "fmc")
            .joinTable("fm_category_lang", "cat_id", "fmc.id", false)
            .and("fm_category_lang.language_id", langId)
            .where("fm.customer_id", customerId)
            .orderBy("fmc.weight", types_1.OrderType.Desc);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logCyan("getCategories :: SQL ::", sql);
        return new Promise((resolve, reject) => {
            return this.dbClient.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getCategories() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get categories
     * @param restaurantId
     * @param langId
     * @param debug
     */
    getRestaurantCategories(restaurantId, langId, debug = false) {
        let sql = `SELECT
  				fm.id AS menu_id,
				fmc.id, fmc.weight,
				fm_category_lang.name,
				fm_category_lang.description,
				fm_category_lang.footer
			FROM
				fm, fm_categories AS fmc
				LEFT JOIN fm_category_lang ON cat_id = fmc.id
				AND
				fm_category_lang.language_id = ${langId}
			WHERE
				fmc.food_menu_id = fm.id
				AND
				fm.restaurant_id = ${restaurantId}
				ORDER BY
				fmc.weight DESC`;
        /*
         let dynSql = new SqlIgniter();

         dynSql.select(
         "fmc.id",
         "fmc.weight",
         "fm_category_lang.field",
         "fm_category_lang.description"
         )
         .from("fm")
         .from("fm_categories", "fmc")
         .joinTable("fm_category_lang", "cat_id", "fmc.id", false)
         .and("fm_category_lang.language_id", langId)

         .where("fmc.food_menu_id", "fm.id", CompareType.Equal,false)
         .where("fm.restaurant_id", restaurantId)
         .orderBy("fmc.weight", OrderType.Desc);

         let sql = dynSql.toSql();
         */
        cli_logger_1.Logger.logCyan("getCategories :: aaaaaSQL ::", sql);
        return new Promise((resolve, reject) => {
            return this.dbClient.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getCategories() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get category items
     * @param menuId
     * @param langId
     * @param catId
     * @param currencyId
     */
    getFoodMenuItems(menuId, langId, catId, currencyId = 1) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.select("fmi.id", "fmi.item_cat_id", "fmi.photo", "fmi.weight", "fmip.price", "fmi_props.gluten", "fmi_props.lactose", "fmi_props.vegetarian", "fm_item_lang.field", "fm_item_lang.description", "curr.code", "curr.symbol")
            .from("fm_items", "fmi")
            .joinTable("fm_item_props AS fmi_props", "fmi_props.item_id", "fmi.id", false)
            .joinTable("fm_item_lang", "fm_item_lang.item_id", "fmi.id", false)
            .and("language_id", langId)
            .joinTable("fm_item_price AS fmip", "fmip.item_id", "fmi.id", false)
            .and("fmip.currency_id", currencyId)
            .joinTable("currencies AS curr", "curr.id", "fmip.currency_id", false)
            .where("fmi.food_menu_id", menuId)
            .where("fmi.item_cat_id", catId)
            .orderBy("fmi.weight", types_1.OrderType.Desc);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logGreen("getCategoryItems ::  SQL ::", sql);
        return new Promise((resolve, reject) => {
            return this.dbClient.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getCategoryItems() :: error ::", error);
                reject(error);
            });
        });
    }
    /**
     * Get Restaurant Menu
     * @param customerId
     * @param langId
     */
    getRestaurantMenu(restaurantId, langId = 1) {
        let scope = this;
        let menuBuilder = new food_menu_builder_1.FoodMenuBuilder();
        return new Promise((resolve, reject) => {
            async function doGetMenu() {
                let categories = await scope.getRestaurantCategories(restaurantId, langId);
                let dataRows = categories.result.dataRows;
                console.log("getRestaurantMenu ::", dataRows);
                //
                // Iterate Food Menu Categories
                //
                for (let row of dataRows) {
                    if (row.isEmpty) {
                        continue;
                    }
                    let menuId = row.asInt("menu_id");
                    let catId = row.asInt("id");
                    let name = row.asStr("name");
                    let desc = row.asStr("description");
                    let footer = row.asStr("footer");
                    let category = menuBuilder.addCategory(catId, name, desc, footer);
                    //
                    // Get Menu Items for each Category
                    //
                    let catItemDataRows;
                    try {
                        let catItems = await scope.getFoodMenuItems(menuId, langId, catId);
                        catItemDataRows = catItems.result.dataRows;
                    }
                    catch (err) {
                        cli_logger_1.Logger.logError("FoodMenuDb :: getMenu :: failed to get items ::", err);
                    }
                    for (let catRow of catItemDataRows) {
                        category.addItem(catRow);
                    }
                }
            }
            doGetMenu().then(res => {
                resolve(menuBuilder);
            }).catch(err => {
                reject(err);
            });
        });
    }
    getMenu(customerId, langId) {
        let scope = this;
        let menuBuilder = new food_menu_builder_1.FoodMenuBuilder();
        return new Promise((resolve, reject) => {
            async function doGetMenu() {
                let categories = await scope.getCategoriesOld(customerId, langId);
                let dataRows = categories.result.dataRows;
                //
                // Iterate Food Menu Categories
                //
                for (let row of dataRows) {
                    if (row.isEmpty) {
                        continue;
                    }
                    let catId = row.asInt("id");
                    let name = row.asStr("name");
                    let desc = row.asStr("description");
                    let footer = row.asStr("footer");
                    let category = menuBuilder.addCategory(catId, name, desc, footer);
                    //
                    // Get Menu Items for each Category
                    //
                    let catItemDataRows;
                    try {
                        let catItems = await scope.getFoodMenuItems(customerId, langId, catId);
                        catItemDataRows = catItems.result.dataRows;
                    }
                    catch (err) {
                        cli_logger_1.Logger.logError("FoodMenuDb :: getMenu :: failed to get items ::", err);
                    }
                    for (let catRow of catItemDataRows) {
                        category.addItem(catRow);
                    }
                }
            }
            doGetMenu().then(res => {
                resolve(menuBuilder);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Get currency info by given Currency Code
     * @param currencyCode
     */
    getCurrencyData(currencyCode) {
        let dynQuery = new sql_igniter_1.SqlIgniter();
        dynQuery.get('currencies').where('code', currencyCode);
        const sql = dynQuery.toSql();
        return new Promise((resolve, reject) => {
            this.dbClient.query(sql).then(res => {
                resolve(res);
            }).catch(err => {
                cli_logger_1.Logger.logError('getCurrency :: err ::', err);
                reject(err);
            });
        });
    }
};
FoodMenuDb = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject('IDbClient')),
    __metadata("design:paramtypes", [db_client_1.DbClient])
], FoodMenuDb);
exports.FoodMenuDb = FoodMenuDb;
