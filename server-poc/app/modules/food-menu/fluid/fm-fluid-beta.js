"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-14
 */
exports.__esModule = true;
var db_client_1 = require("../../../../core/zyn-db/db-client");
var menusData = {
    id: 2,
    name: 'Förrätter',
    description: 'WOW Njut av våra härliga aptitretareees',
    footer: 'footer is here',
    items: []
};
var dataDump = {
    restaurantId: -1,
    foodMenuId: 1,
    categoryId: 2,
    languageId: 1,
    foodMenus: [],
    postIdent: 'fm-pd',
    deletedItemIds: []
};
var dbConfig = {
    dbType: "mysql",
    dbName: "foodzap-test",
    dbHost: "coldmind.com",
    dbUser: "duffy",
    dbPass: "bjoe7151212"
};
/*
export class ZynFluid extends DbClient {
    public set(data: any): Promise<IActionResult> {
        return new Promise((resolve, reject) => {
        });
    }
}
*/
var FluidMenus = /** @class */ (function () {
    function FluidMenus() {
        var client = new db_client_1.DbClient();
        client.configure(dbConfig);
    }
    return FluidMenus;
}());
exports.FluidMenus = FluidMenus;
new FluidMenus();
