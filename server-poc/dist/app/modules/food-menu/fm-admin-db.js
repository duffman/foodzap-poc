"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
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
exports.FoodMenuAdminDb = void 0;
const log_service_1 = require("@app/services/log.service");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const db_logger_1 = require("@zynDb/db-logger");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const action_result_1 = require("@models/action-result");
const food_menu_item_model_1 = require("@modules/food-menu/models/food-menu-item.model");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
let FoodMenuAdminDb = class FoodMenuAdminDb {
    constructor(dbClient, logger) {
        this.dbClient = dbClient;
        this.logger = logger;
        this.debugLevel = 1;
    }
    setMenuCategories(data) {
        const scope = this;
        cli_logger_1.Logger.logGreen("** setMenuCategories :: menu ::", data);
        /**
         * Set Food Menu Category Text for a specific language
         * @param catId
         * @param {IFmCategory} catData
         * @returns {Promise<IActionResult>}
         */
        async function setMnuCatLang(catId) {
            cli_logger_1.Logger.logPurple('*** setMnuCatLang ::', data);
            return new Promise((resolve, reject) => {
                let result = new action_result_1.ActionResult();
                let sql = new sql_igniter_1.SqlIgniter().replace({
                    cat_id: catId,
                    language_id: data.languageId,
                    name: data.menuItem.name,
                    description: data.menuItem.description,
                    footer: data.menuItem.footer
                }, 'fm_category_lang').toSql();
                scope.dbClient.query(sql).then(res => {
                    result.success = res.success;
                    result.data = res.lastInsertId;
                }).catch(err => {
                    result.setError(err);
                });
                resolve(result);
            });
        }
        /**
         * Set Food Menu Category
         * @param id
         * @returns {Promise<IActionResult>}
         */
        async function setMenuCat() {
            cli_logger_1.Logger.logPurple('*** setMenuCat ::', data);
            return new Promise((resolve, reject) => {
                let result = new action_result_1.ActionResult();
                let dataw = {
                    id: data.menuItem.id,
                    food_menu_id: data.id,
                    weight: data.menuItem.weight
                };
                let query = new sql_igniter_1.SqlIgniter();
                if (data.id > 0) {
                    query.replace(data, 'fm_categories');
                }
                else {
                    query.insert(data, 'fm_categories');
                }
                let sql = query.toSql();
                cli_logger_1.Logger.logGreen('setMenuCat :: running SQL');
                scope.dbClient.query(sql).then(res => {
                    console.log('RES === ::', res);
                    result.success = res.success;
                    result.data = res.lastInsertId;
                    console.log('LAST INSERT ID ::', result.data);
                }).catch(err => {
                    result.setError(err);
                });
                resolve(result);
            });
        }
        async function execute() {
            scope.dbClient.startTransaction();
            try {
                /*
                id: data.id,
                languageId: data.languageId,
                menuItem: menu

                    id:           number;
                    field:         string;
                    description?: string;
                    footer?:      string;
                    items?:       IFoodMenuItem[];
                    weight?:      number;
                    isDirty?:     boolean;
                */
                let setMenuRes = await setMenuCat();
                if (setMenuRes.success) {
                    let setMenuLangRes = await setMnuCatLang(setMenuRes.data);
                }
                scope.dbClient.commitTransaction();
            }
            catch (e) {
                scope.dbClient.rollbackTransaction();
            }
        }
        return new Promise((resolve, reject) => {
            let result = new action_result_1.ActionResult();
            execute().then(res => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Add new Food menu Category (e.g Main Dishes)
     * @param catData
     */
    setCategory(catData) {
        const scope = this;
        cli_logger_1.Logger.logGreen("*********** setCategory :: catData ::", catData);
        /**
         * Set Food Menu Category Text for a specific language
         * @param catId
         * @param {IFmCategory} catData
         * @returns {Promise<IActionResult>}
         */
        async function setMnuCatLang(catId, catData) {
            return new Promise((resolve, reject) => {
                let result = new action_result_1.ActionResult();
                let sql = new sql_igniter_1.SqlIgniter().replace({
                    cat_id: catId,
                    language_id: catData.languageId,
                    name: catData.name,
                    description: catData.description,
                    footer: catData.footer
                }, 'fm_category_lang').toSql();
                scope.dbClient.query(sql).then(res => {
                    result.success = res.success;
                    result.data = res.lastInsertId;
                }).catch(err => {
                    result.setError(err);
                });
                resolve(result);
            });
        }
        /**
         * Set Food Menu Category
         * @param {IFmCategory} catData
         * @returns {Promise<IActionResult>}
         */
        async function setMenuCat(catData) {
            cli_logger_1.Logger.logPurple('*** setMenuCat ::', catData);
            return new Promise((resolve, reject) => {
                let result = new action_result_1.ActionResult();
                let data = {
                    id: catData.id,
                    food_menu_id: catData.menuId,
                    weight: catData.weight
                };
                let query = new sql_igniter_1.SqlIgniter();
                if (data.id > 0) {
                    query.replace(data, 'fm_categories');
                }
                else {
                    query.insert(data, 'fm_categories');
                }
                let sql = query.toSql();
                cli_logger_1.Logger.logGreen('setMenuCat :: running SQL');
                scope.dbClient.query(sql).then(res => {
                    console.log('RES === ::', res);
                    result.success = res.success;
                    result.data = res.lastInsertId;
                    console.log('LAST INSERT ID ::', result.data);
                }).catch(err => {
                    result.setError(err);
                });
                resolve(result);
            });
        }
        async function execute() {
            scope.dbClient.startTransaction();
            try {
                let setMenuRes = await setMenuCat(catData);
                console.log("setMenuRes ::", setMenuRes);
                if (setMenuRes.success) {
                    let setMenuLangRes = await setMnuCatLang(setMenuRes.data, catData);
                }
                scope.dbClient.commitTransaction();
            }
            catch (e) {
                scope.dbClient.rollbackTransaction();
            }
        }
        return new Promise((resolve, reject) => {
            let result = new action_result_1.ActionResult();
            execute().then(res => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Add new Language
     * @param langData - object representing a language db row
     */
    addNewLanguage(langData) {
        const scope = this;
        return new Promise((resolve, reject) => {
            let actionResult = new action_result_1.ActionResult();
            let query = new sql_igniter_1.SqlIgniter().insert({
                code: langData.code,
                name: langData.name
            }, 'language');
            this.dbClient.query(query).then(res => {
                if (res.success) {
                    langData.id = res.lastInsertId;
                    actionResult.data = langData;
                    resolve(actionResult);
                }
                else {
                    throw new Error("addNewLanguage Failed");
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Delete Food Menu Items (dishes)
     * @param {number[]} ids
     * @returns {Promise<IActionResult>}
     */
    deleteFoodMenuItems(ids) {
        const scope = this;
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }
    // DUFF13
    setFoodMenus(data) {
        console.log('--------- setFoodMenus -----------');
        cli_logger_1.Logger.logPurple('** setFoodMenus ::', data);
        const scope = this;
        let result = new action_result_1.ActionResult();
        async function updateCategoryLang(menu) {
            let actionRes = new action_result_1.ActionResult();
            return new Promise((resolve, reject) => {
                let query = new sql_igniter_1.SqlIgniter();
                query.setMulti({
                    name: menu.name,
                    description: menu.description,
                    footer: menu.footer
                }, 'fm_category_lang')
                    .where('fm_category_lang.cat_id', menu.id)
                    .where('fm_category_lang.language_id', data.languageId);
                const sql = query.toSql();
                console.log("updateCategoryLang :: menu", menu);
                cli_logger_1.Logger.logPurple("updateCategoryLang :: setMenuData ::", sql);
                scope.dbClient.query(sql).then(dbRes => {
                    if (dbRes.success && dbRes.affectedRows > 0) {
                        db_logger_1.L.logDbResult(dbRes, 'setFoodMenus :: updateCategoryLang');
                        actionRes.setSuccess();
                        resolve(actionRes);
                    }
                    else {
                        const err = new Error(`setMenuData failed, sql: "${sql}"`);
                        actionRes.setError(err);
                        reject(err);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function removeMenuItem(itemId) {
            return new Promise((resolve, reject) => {
                let actionResult = new action_result_1.ActionResult();
                let query = new sql_igniter_1.SqlIgniter()
                    .delete('fm_items')
                    .where('id', itemId);
                let sql = query.toSql();
                console.log('removeMenuItem :: sql ::', sql);
                resolve(actionResult);
            });
        }
        // TODO: Execute in transaction
        async function setMenuItems(menu) {
            let actionResult = new action_result_1.ActionResult();
            for (let item of menu.items) {
                let setMenuItemRes = await scope.setFoodMenuItem(item.catId, data.languageId, item);
                if (!item.weight) {
                    item.weight = 0;
                }
                if (scope.debugLevel > 0)
                    console.log('setMenuItemRes ::', setMenuItemRes);
            }
            return new Promise((resolve, reject) => {
                resolve(actionResult);
            });
        }
        // TODO: Replace with DB transaction
        async function saveMenu(menu) {
            let actionResult = new action_result_1.ActionResult();
            //let setDataRes   = await updateCategoryLang(menu);
            let setItemsRes = new action_result_1.ActionResult(false);
            let menuData = {
                id: data.id,
                languageId: data.languageId,
                menuItem: menu
            };
            let setDataRes = await scope.setMenuCategories(menuData);
            console.log(' ');
            console.log('-------------------');
            console.log(' ');
            console.log(' ');
            console.log('menu ::', menu);
            if (setDataRes.success) {
                setItemsRes = await setMenuItems(menu);
            }
            if (!setDataRes.success || !setItemsRes.success) {
                actionResult.setSuccess();
            }
            return new Promise((resolve, reject) => {
                resolve(actionResult);
            });
        }
        async function execute() {
            console.log('setFoodMenus :: execute()');
            try {
                if (scope.debugLevel > 0)
                    console.log("data.foodMenus ::", data.foodMenus);
                //
                // Remove Item
                //
                if (data.deletedItemIds && Array.isArray(data.deletedItemIds)) {
                    for (let itemId of data.deletedItemIds) {
                        console.log("setFoodMenus :: DELETE ITEM ::", itemId);
                        let res = await removeMenuItem(itemId);
                        console.log("DELETE ITEM :: RES ::", res);
                    }
                }
                //
                // Update Food Menus
                //
                for (let menu of data.foodMenus) {
                    console.log(' ');
                    console.log(' ');
                    console.log(' ');
                    console.log('==== SAVE MENU (***) ==========================');
                    let saveMenuRes = await saveMenu(menu);
                    console.log('saveMenuRes ::', saveMenuRes);
                    console.log('==== //// SAVE MENU ===========================================');
                    console.log(' ');
                    console.log(' ');
                    console.log(' ');
                }
            }
            catch (err) {
                result.setError(err, 'setFoodMenus :: execute');
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                resolve(result);
            }).catch(err => {
                console.log('setFoodMenu ::', err);
            });
        });
    }
    setFoodMenuItem(clientMenuId, languageId, item) {
        let scope = this;
        let result;
        console.log('------------------');
        console.log('setFoodMenuItem ::', clientMenuId);
        console.log('languageId ::', languageId);
        console.log('item ::', item);
        // process.exit(10);
        function log(label, data) {
            console.log(label, data);
        }
        async function addItem(clientMenuId, item) {
            return new Promise((resolve, reject) => {
                // id:           item.id,
                let itemData = {
                    food_menu_id: clientMenuId,
                    item_cat_id: item.catId,
                    item_ref: item.ref,
                    photo: item.photo,
                    weight: item.weight
                };
                let sql = "";
                if (clientMenuId > 0) {
                    sql = new sql_igniter_1.SqlIgniter().setMulti(itemData, 'fm_items')
                        .where('id', item.id)
                        .toSql();
                }
                else { // Replace
                    itemData['id'] = item.id;
                    sql = new sql_igniter_1.SqlIgniter().replace(itemData, 'fm_items')
                        .toSql();
                }
                scope.dbClient.query(sql).then(res => {
                    if (scope.debugLevel > 0)
                        console.log('res ::', res);
                    resolve(res);
                }).catch(err => {
                    if (scope.debugLevel > 0)
                        console.log("ERR ::", err);
                    reject(err);
                });
            });
        }
        async function setItemLang(itemId, item) {
            return new Promise((resolve, reject) => {
                let query = new sql_igniter_1.SqlIgniter().replace({
                    item_id: itemId,
                    language_id: languageId,
                    name: item.name,
                    description: item.description
                }, 'fm_item_lang');
                let sql = query.toSql();
                if (scope.debugLevel > 2)
                    log('addFoodMenuItem :: SQL ::', sql);
                scope.dbClient.query(sql).then(res => {
                    if (scope.debugLevel > 2)
                        console.log("addItemLang :: RES ::", res);
                    resolve(res);
                }).catch(err => {
                    if (scope.debugLevel > 2)
                        console.log("addItemLang :: ERR ::", err);
                    reject(err);
                });
            });
        }
        async function setItemPrice(itemId, currencyId, price) {
            return new Promise((resolve, reject) => {
                let sql = new sql_igniter_1.SqlIgniter().replace({
                    item_id: itemId,
                    currency_id: 1,
                    price: item.price
                }, 'fm_item_price').toSql();
                if (scope.debugLevel > 1)
                    console.log(':: itemPriceSql SQL ::', sql);
                scope.dbClient.query(sql).then(res => {
                    if (scope.debugLevel > 1)
                        console.log(":: setItemPrice :: RES ::", res);
                    resolve(res);
                }).catch(err => {
                    if (scope.debugLevel > 1)
                        console.log(":: setItemPrice :: ERR ::", err);
                    reject(err);
                });
            });
        }
        async function setItemProps(itemId, props) {
            return new Promise((resolve, reject) => {
                if (!props) {
                    props = new food_menu_item_model_1.FoodItemProps();
                }
                let query = new sql_igniter_1.SqlIgniter().replace({
                    item_id: itemId,
                    gluten: props.gluten,
                    lactose: props.lactose,
                    vegetarian: props.vegetarian
                }, 'fm_item_props');
                let sql = query.toSql();
                if (scope.debugLevel > 1)
                    log('addItemProps :: SQL ::', sql);
                scope.dbClient.query(sql).then(res => {
                    if (scope.debugLevel > 1)
                        console.log("addItemProps :: RES ::", res);
                    resolve(res);
                }).catch(err => {
                    console.log("addItemProps :: ERR ::", err);
                    reject(err);
                });
            });
        }
        async function execute() {
            try {
                result = true;
                await scope.dbClient.startTransaction();
                let itemId = (item.id === -1) ? item.id = null : item.id;
                let addItemRes = await addItem(clientMenuId, item);
                if (scope.debugLevel > 1)
                    console.log('addItemRes ::', addItemRes);
                if (!itemId) {
                    itemId = addItemRes.lastInsertId;
                }
                let setLangRes = await setItemLang(itemId, item);
                //console.log('setLangRes ::', setLangRes);
                //
                let setItemPriceRes = await setItemPrice(itemId, 1, item.price);
                //console.log('setItemPriceRes ::', setItemPriceRes);
                //
                let setPropsRes = await setItemProps(itemId, item.props);
                //console.log('setPropsRes ::', setPropsRes);
                await scope.dbClient.commitTransaction();
            }
            catch (error) {
                console.log('ITEM ADD ERROR ::', error);
                result = false;
                await scope.dbClient.rollbackTransaction();
            }
        }
        return new Promise((resolve, reject) => {
            console.log('Promise =========');
            execute().then(() => {
                console.log('execute() :: Executed');
                resolve();
            }).catch(err => {
                console.log('setFoodMenuItem :: err ::', err);
                reject(err);
            });
        });
    }
};
FoodMenuAdminDb = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IDbClient)),
    __param(1, inversify_2.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [Object, log_service_1.LogService])
], FoodMenuAdminDb);
exports.FoodMenuAdminDb = FoodMenuAdminDb;
