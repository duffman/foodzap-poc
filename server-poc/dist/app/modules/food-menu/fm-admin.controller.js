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
exports.FoodMenuAdminController = void 0;
const log_service_1 = require("@app/services/log.service");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const base_controller_1 = require("@api/base.controller");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const igniter_controller_1 = require("@core/webcore/igniter.controller");
const fm_admin_db_beta_1 = require("@modules/food-menu/fm-admin-db-beta");
const db_transaction_1 = require("@zynDb/db-transaction");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const fm_admin_db_1 = require("@modules/food-menu/fm-admin-db");
const fm_data_validator_1 = require("@modules/food-menu/fm-data-validator");
const fm_price_converter_1 = require("@modules/food-menu/fm-price-converter");
const fm_db_1 = require("@modules/food-menu/fm.db");
let FoodMenuAdminController = class FoodMenuAdminController extends igniter_controller_1.IgniterController {
    constructor(menuDb, adminDb, priceConverter, dbClient, logger) {
        super();
        this.menuDb = menuDb;
        this.adminDb = adminDb;
        this.priceConverter = priceConverter;
        this.dbClient = dbClient;
        this.logger = logger;
    }
    //
    // Init Routes
    //
    initRoutes(routes) {
        routes.get('/executeNewRecord').bind(this);
        routes.get("/fluid/new", this.debugMenuNew.bind(this));
        routes.get("/fluid/update", this.debugMenuUpdate.bind(this));
        routes.get("/fluid/dish", this.debugMenuCreateItem.bind(this));
        routes.get("/fluid/save", this.debugFullSaveMenu.bind(this));
        routes.post("/restaurant/menu/add", this.addMenuItem.bind(this));
        //routes.post("/restaurant/menu/set", this.setMenu.bind(this));
        routes.post("/restaurant/menu/set", this.debugFullSaveMenu.bind(this));
        // Add Menu Category
        routes.post("/restaurant/menu/addcat", this.addMenuCategory.bind(this));
    }
    debugFullSaveMenu(req, resp) {
        /*let data = {
            "restaurantId":1,
            "id":-1,
            "languageId":1,
            "foodMenus":[
                {
                    "id":-3219749994986,
                    "name":"dfg dfg",
                    "description":"dfgfd dfg fdg",
                    "isDirty":true,
                    "items":[
                        {
                            "id":-1609869958289,
                            "menuId":-345345345,
                            "catId":0,
                            "name":"Kalle Kula",
                            "description":"Fick en fet nula!",
                            "price":"422",
                            "code":"",
                            "symbol":"",
                            "photo":"",
                            "categories":[

                            ],
                            "ref":"",
                            "weight":102,
                            "deleted":false,
                            "faveIconClass":"heart-outline",
                            "isFavorite":false,
                            "isDirty":true,
                            "qty":0
                        },
                        {
                            "id":1609869937222,
                            "menuId":0,
                            "catId":0,
                            "name":"sdfsdsdfsdfsdfsdf",
                            "description":"dsd ddfsdfsd",
                            "price":"12",
                            "code":"",
                            "symbol":"",
                            "photo":"",
                            "categories":[

                            ],
                            "ref":"",
                            "weight":101,
                            "deleted":false,
                            "faveIconClass":"heart-outline",
                            "isFavorite":false,
                            "isDirty":true,
                            "qty":0
                        }
                    ]
                }
            ],
            "postIdent":"fm-pd",
            "deletedItemIds":[

            ]
        };*/
        let data = '{'
            + '   "restaurantId":1,'
            + '   "id":1,'
            + '   "languageId":1,'
            + '   "foodMenus":['
            + '      {'
            + '         "id":-3220091822920,'
            + '         "items":['
            + '            {'
            + '               "id":-3220091862426,'
            + '               "menuId":-3220091822920,'
            + '               "name":"weewwe",'
            + '               "description":"ewewwe",'
            + '               "price":"3333",'
            + '               "currencyId":1,'
            + '               "photo":"",'
            + '               "allergies":['
            + '                  '
            + '               ],'
            + '               "ref":"",'
            + '               "weight":0,'
            + '               "deleted":false,'
            + '               "faveIconClass":"heart-outline",'
            + '               "isFavorite":false,'
            + '               "isDirty":true,'
            + '               "qty":0,'
            + '               "langId":1'
            + '            },'
            + '            {'
            + '               "id":-3220091826264,'
            + '               "menuId":-3220091822920,'
            + '               "name":";in rätt",'
            + '               "description":"Mycket god",'
            + '               "price":"12",'
            + '               "currencyId":1,'
            + '               "photo":"",'
            + '               "allergies":['
            + '                  '
            + '               ],'
            + '               "ref":"",'
            + '               "weight":0,'
            + '               "deleted":false,'
            + '               "faveIconClass":"heart-outline",'
            + '               "isFavorite":false,'
            + '               "isDirty":true,'
            + '               "qty":0,'
            + '               "langId":1'
            + '            }'
            + '         ],'
            + '         "langId":1,'
            + '         "name":"Kalle kula",'
            + '         "isDirty":true,'
            + '         "description":"Ruffe banan"'
            + '      }'
            + '   ],'
            + '   "postIdent":"fm-pd",'
            + '   "deletedItemIds":['
            + '   ]'
            + '}';
        cli_logger_1.Logger.logCyan('FmAdminController :: debugFullSaveMenu ::', req.body);
        let postData = req.body;
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.logCyan('==============================================');
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.spit();
        cli_logger_1.Logger.spit();
        let betaDb = new fm_admin_db_beta_1.FoodMenuAdminDbBeta(this.dbClient, this.logger);
        betaDb.menusFullSave(postData).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.json(err);
        });
    }
    debugMenuCreateItem(req, resp) {
        cli_logger_1.Logger.logBlue('FmAdminController :: debugMenuCreateItem');
        let betaDb = new fm_admin_db_beta_1.FoodMenuAdminDbBeta(this.dbClient, this.logger);
        betaDb.createMenuItem([]).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.json(err);
        });
    }
    debugMenuNew(req, resp) {
        cli_logger_1.Logger.logPurple('FmAdminController :: debugMenuNew');
        let betaDb = new fm_admin_db_beta_1.FoodMenuAdminDbBeta(this.dbClient, this.logger);
        let data = {
            //			id: 1,
            restaurant_id: 1,
            weight: 22
        };
        betaDb.testNew(data).then(res => {
            console.log("debugMenuNew :: setFoodMenu ::", res);
            resp.json(res);
        }).catch(err => {
            cli_logger_1.Logger.logError("debugMenuNew :: setRecord :: error ::", err);
            base_controller_1.BaseController.extFatalError(req, resp);
            resp.json(err);
        });
    }
    debugMenuUpdate(req, resp) {
        cli_logger_1.Logger.logPurple('FmAdminController :: debugMenuNew');
        let betaDb = new fm_admin_db_beta_1.FoodMenuAdminDbBeta(this.dbClient, this.logger);
        let data = {
            id: 1,
            restaurant_id: 1,
            weight: 22
        };
        betaDb.testUpdate(data).then(res => {
            console.log('*** setFoodMenu ::', res);
            resp.json(res);
            resp.end();
        }).catch(err => {
            cli_logger_1.Logger.logError("### setRecord :: error ::", err);
            base_controller_1.BaseController.extFatalError(req, resp);
            resp.json(err);
            resp.end();
        });
    }
    /**
     * Assign Menu Data
     * @param data
     */
    assignData(data) {
        this.adminDb.setFoodMenus(data).then(res => {
            console.log('setFoodMenu ::', res);
            console.log(res);
        }).catch(err => {
            cli_logger_1.Logger.logError("setRecord :: error ::", err);
        });
    }
    /**
     * Set Menu
     * @param {e.Request} req
     * @param {e.Response} resp
     */
    setMenu(req, resp) {
        console.log(':: ', req.body);
        let data = req.body;
        let deletedItemIds = data.deletedItemIds;
        console.log('::: IFoodMenuPostData ::', data);
        for (let menu in data.foodMenus) {
            let menuObj = data.foodMenus[menu];
            for (let item of menuObj.items) {
                //console.log('::: MENU :: ITEM ::', item);
            }
        }
        if (fm_data_validator_1.FmDataValidator.foodMenusPostData(data) === false) {
            base_controller_1.BaseController.extFatalError(req, resp, "MENU_DATA_INVALID");
            return;
        }
        // this.adminDb.deleteFoodMenuItems(deletedItemIds);
        this.adminDb.setFoodMenus(data).then(res => {
            console.log('setFoodMenu ::', res);
            resp.json(res);
        }).catch(err => {
            cli_logger_1.Logger.logError("setRecord :: error ::", err);
            base_controller_1.BaseController.extFatalError(req, resp);
        });
    }
    /**
     *
     * @param menuId
     * @param catId
     * @param menuItem
     */
    addMenuItem(menuId, catId, menuItem) {
        let scope = this;
        let dbTrans = new db_transaction_1.DbTransaction();
        let result = false;
        async function beginTrans() {
            return dbTrans.beginTransaction();
        }
        async function commitTrans() {
            return dbTrans.commit();
        }
        async function rollbackTrans() {
            return dbTrans.rollback();
        }
        async function executeQuery(sql) {
            return dbTrans.executeQuery(sql);
        }
        async function addItemTranslation() {
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
        /**
         * Add Food Menu Item
         * @returns {Promise<void>}
         */
        async function addMenuItem() {
            await beginTrans();
            let dynSql = new sql_igniter_1.SqlIgniter();
            let dbData = {
                "food_menu_id": menuId,
                "item_cat_id": catId,
                "item_ref": menuItem.ref,
                "weight": 0
            };
            let dbRes = await executeQuery(dynSql.toSql());
            let newItemId = dbRes.lastInsertId;
            cli_logger_1.Logger.logPurple("LAST INSERT ID ::", newItemId);
        }
        return new Promise((resolve, reject) => {
            addMenuItem().then(() => {
                resolve(result);
            });
        });
    }
    /**
     * Add Menu Category
     * @param {e.Request} req
     * @param {e.Response} resp
     */
    addMenuCategory(req, resp) {
        /*
        {
            "menuId":        1,
            "languageId":    1,
            "field":          "Snaskrätter",
            "description":   "Goda Härliga smaskrätter",
            "footer":        "Ska vi verkligen har Footer??",
            "weight":        2
        }
        */
        console.log("*** addMenuCategory");
        let categoryData = {
            id: req.body.id,
            menuId: req.body.menuId,
            languageId: req.body.languageId,
            name: req.body.name,
            description: req.body.description,
            footer: req.body.footer,
            weight: req.body.weight
        };
        console.log("addMenuCategory ::", categoryData);
        this.adminDb.setCategory(categoryData).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.json(err);
        });
    }
};
FoodMenuAdminController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IFoodMenuDb)),
    __param(1, inversify_2.inject(interfaces_1.Inf.IFoodMenuAdminDb)),
    __param(2, inversify_2.inject(interfaces_1.Inf.IFmPriceConverter)),
    __param(3, inversify_2.inject(interfaces_1.Inf.IDbClient)),
    __param(4, inversify_2.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [fm_db_1.FoodMenuDb,
        fm_admin_db_1.FoodMenuAdminDb,
        fm_price_converter_1.FmPriceConverter, Object, log_service_1.LogService])
], FoodMenuAdminController);
exports.FoodMenuAdminController = FoodMenuAdminController;
