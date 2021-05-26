"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-24
 */
Object.defineProperty(exports, "__esModule", { value: true });
let query = new sql_igniter_1.SqlIgniter();
query.setMulti({
    name: 'menu.field',
    description: 'menu.description',
    footer: 'menu.footer'
}, 'fm_category_lang')
    .where('fm_category_lang.cat_id', 'menu.id')
    .where('fm_category_lang.language_id', 'data.languageId');
process.exit(10);
const sql_igniter_1 = require("@zynDb/sql-igniter/sql-igniter");
const fm_admin_db_1 = require("../fm-admin-db");
const db_client_1 = require("@zynDb/db-client");
const log_service_1 = require("@app/services/log.service");
let client = new db_client_1.DbClient();
client.configure({
    dbType: "",
    dbName: "appetizer_new",
    dbHost: "coldmind.com",
    dbUser: "duffy",
    dbPass: "bjoe7151212"
});
let fb = new fm_admin_db_1.FoodMenuAdminDb(client, new log_service_1.LogService());
fb.addNewLanguage({ code: 'TH', name: 'ประเทศไทย' }).then(res => {
    console.log('Country added');
}).catch(err => {
    console.log('Country NOT added ::', err);
});
