"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuAdmin = void 0;
const scrappy_1 = require("@zynDb/scrappy");
require("reflect-metadata");
const food_menu_item_model_1 = require("../../app/modules/food-menu/models/food-menu-item.model");
const sql_igniter_1 = require("./sql-igniter/sql-igniter");
const util = require('util');
const msql = require('mysql');
class MenuAdmin {
    constructor() {
        this.connLost = false;
        this.debug = true;
        this.snapSettings = {
            host: "localhost",
            user: "duffman",
            password: "bjoe7151212",
            database: "appetizer_back",
            connectionLimit: 10
        };
        // this.dbCore = createDbCore(dbSettings);
        this.db = new scrappy_1.Scrappy();
        this.db.configure(this.snapSettings);
    }
    createItem(clientMenuId = 1, languageId = 1, item) {
        let scope = this;
        function log(label, data) {
            console.log(label, data);
        }
        async function addItem(clientMenuId, item) {
            return new Promise((resolve, reject) => {
                let itemData = {
                    id: null,
                    food_menu_id: clientMenuId,
                    item_cat_id: item.menuId,
                    item_ref: item.ref,
                    photo: item.photo,
                    weight: item.weight
                };
                let sql = new sql_igniter_1.SqlIgniter().replace(itemData, 'fm_items').toSql();
                scope.db.query(sql).then(res => {
                    console.log("RES ::", res);
                    resolve(res);
                }).catch(err => {
                    console.log("ERR ::", err);
                    reject(err);
                });
            });
        }
        async function addItemLang(itemId, item) {
            return new Promise((resolve, reject) => {
                let query = new sql_igniter_1.SqlIgniter().replace({
                    item_id: itemId,
                    language_id: languageId,
                    name: item.name,
                    description: item.description
                }, 'fm_item_lang');
                let sql = query.toSql();
                log('addFoodMenuItem :: SQL ::', sql);
                scope.db.query(sql).then(res => {
                    // console.log("RES ::", res);
                    resolve(res);
                }).catch(err => {
                    // console.log("ERR ::", err);
                    reject(err);
                });
            });
        }
        async function execute() {
            let db = scope.db;
            await scope.db.start();
            /*
            let result = await addItem(clientMenuId, item);

            let insId = result.lastInsertId;
            log('insId ::', insId);

            let res = await addItemLang(insId, item);
            log('addItemLang ::', res);

            let res2 = await scope.db.commit();
            log('scope.dbCore.commit ::', res);
            */
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                console.log('doIt() :: Executed');
            }).catch(err => {
                console.log('setFoodMenuItem :: err ::', err);
            });
        });
    }
    go() {
        let item = new food_menu_item_model_1.FoodMenuItem(null, 1, 1, "Drinkar", "Njut av en kall lager och korta kjolar som struttar förbi på sommaren och en glögg till Kalle Anka på vintern.", 
        // Todo Merge
        45.67, '', '', 
        // --- //
        [], null, 'Fläskis', 1);
        this.createItem(1, 1, item)
            .then(() => {
            console.log('CREATE ITEM :: DONE');
        })
            .catch(err => {
            console.log('CREATE ITEM :: ERR :: SHOULD NOT HAPPEN!');
        });
    }
}
exports.MenuAdmin = MenuAdmin;
const admin = new MenuAdmin();
admin.go();
//let res = cli.setFoodMenuItem(clientMenuId, item);
/*
 function addNewMenuItem(menuId: number,
 field: string,
 description: string,
 price: number,
 currencyId: number
 ): Promise<IActionResult> {
 return new Promise((resolve, reject) => {
 resolve(null);
 });
 }
 */
/*
 this.menuId = menuId;
 this.field = field;
 this.description = description;
 this.price = price;

 //this.code = code;
 //symbol: string               = "",

 id:           number;
 menuId:       number;
 field:         string;
 description?: string;
 price:        number;
 code?:        string;
 symbol?:      string;
 photo?:       string;
 categories?:  Array<FoodMenuOption>;
 ref?:         string;
 weight?:      number;
 deleted?:     boolean;

 categories: FoodMenuOption[] = [],
 photo: string                = "",
 ref: string                  = "",
 weight: number               = -1,

 */
