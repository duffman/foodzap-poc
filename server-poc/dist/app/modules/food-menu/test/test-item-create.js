"use strict";
/*
 id: number                   = -1,
 menuId: number               = -1,
 field: string                 = "",
 description: string          = "",
 price: number                = -1,
 code: string                 = "",
 symbol: string               = "",
 categories: FoodMenuOption[] = [],
 photo: string                = "",
 ref: string                  = "",
 weight: number               = -1,
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestItemCreate = exports.ql = void 0;
require("reflect-metadata");
const mysql_client_1 = require("@zynDb/mysql-client");
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const settings = {
    dbName: "appetizer_new",
    dbHost: "coldmind.com",
    dbUser: "duffy",
    dbPass: "bjoe7151212",
    dbType: ""
};
class ql {
    constructor() {
    }
}
exports.ql = ql;
class TestItemCreate {
    constructor() {
        this.client = new mysql_client_1.MySqlClient();
        this.client.configure(settings);
        this.test();
    }
    test() {
        let conn = this.client.getConnection();
        let query = new sql_igniter_1.SqlIgniter();
        query.replace({
            id: null,
            food_menu_id: 1,
            item_cat_id: 1,
            item_ref: 'Test',
            photo: 'photo.jpg',
            weight: 1
        }, 'fm_items');
        let sql = query.toSql();
        console.log('SQL ::', sql);
        //conn.query(sql, )
        /*
        this.client.query(sql).then(res => {
            console.log('Query Result ::', res);

        }).catch(err => {
            console.log('Query ::', err);

        });
        */
    }
}
exports.TestItemCreate = TestItemCreate;
new TestItemCreate();
