"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuBuilder = exports.FoodMenuCategory = exports.FoodMenuOptionType = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const sql_table_data_row_1 = require("@zynDb/data-containers/sql-table-data-row");
const food_menu_item_model_1 = require("@modules/food-menu/models/food-menu-item.model");
const food_menu_option_1 = require("@modules/food-menu/models/food-menu-option");
var FoodMenuOptionType;
(function (FoodMenuOptionType) {
    FoodMenuOptionType["Gluten"] = "gluten";
    FoodMenuOptionType["Lactose"] = "lactose";
    FoodMenuOptionType["Vegetarian"] = "vegetarian";
})(FoodMenuOptionType = exports.FoodMenuOptionType || (exports.FoodMenuOptionType = {}));
class FoodMenuCategory {
    constructor(id, name, description, footer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.footer = footer;
        this.items = new Array();
    }
    addItem(dataRow) {
        let options = new Array();
        cli_logger_1.Logger.logPurple('---- NAME ::', dataRow.asStr("name"));
        cli_logger_1.Logger.logPurple('dataRow.asInt("gluten")', dataRow.asInt("gluten") > 0);
        cli_logger_1.Logger.logPurple('dataRow.asInt("lactose")', dataRow.asInt("lactose") > 0);
        cli_logger_1.Logger.logPurple('dataRow.asInt("vegetarian")', dataRow.asInt("vegetarian") > 0);
        /**
         * Enumerates the Category Type Enum and populates
         */
        for (let item in FoodMenuOptionType) {
            let value = FoodMenuOptionType[item];
            let catEnabled = dataRow.asInt(value) > 0;
            if (catEnabled) {
                let itemCat = new food_menu_option_1.FoodMenuOption(value, catEnabled);
                options.push(itemCat);
            }
        }
        /* Deprecated
         categories.push(new FoodMenuOption("gluten", dataRow.asInt("gluten") > 0));
         categories.push(new FoodMenuOption("lactose", dataRow.asInt("lactose") > 0));
         categories.push(new FoodMenuOption("vegetarian", dataRow.asInt("vegetarian") > 0));
         */
        /*
         let item = new FoodMenuItem(
         dataRow.asInt("id"),
         dataRow.asStr("field"),
         dataRow.asStr("description"),
         dataRow.asInt("price"),
         dataRow.asStr("code"),
         dataRow.asStr("symbol"),
         options,
         dataRow.asStr("photo"),
         dataRow.asStr("item_ref"),
         dataRow.asInt("weight")
         );
         */
        let item = new food_menu_item_model_1.FoodMenuItem();
        item.id = dataRow.asInt("id");
        item.menuId = -1;
        item.catId = dataRow.asInt("item_cat_id");
        item.name = dataRow.asStr("name");
        item.description = dataRow.asStr("description");
        item.price = dataRow.asInt("price");
        item.code = dataRow.asStr("code");
        item.symbol = dataRow.asStr("symbol");
        item.categories = options;
        item.photo = dataRow.asStr("photo");
        item.ref = dataRow.asStr("item_ref");
        item.weight = dataRow.asInt("weight");
        this.items.push(item);
    }
    /**
     * Helper method to allow adding items without knowledge about the
     * SQLTableDataRow, made to simplify for debugging and testing
     */
    addItemDebug(id, name, description, price, gluten, lactose, vegetarian, code, symbol) {
        const dataRow = new sql_table_data_row_1.SQLTableDataRow();
        dataRow.addField("id", id.toString());
        dataRow.addField("name", name);
        dataRow.addField("description", description);
        dataRow.addField("price", price);
        dataRow.addField("gluten", gluten);
        dataRow.addField("lactose", lactose);
        dataRow.addField("vegetarian", vegetarian);
        dataRow.addField("code", code);
        dataRow.addField("symbol", symbol);
        this.addItem(dataRow);
    }
}
exports.FoodMenuCategory = FoodMenuCategory;
/**
 * Food Menu Structure
 */
class FoodMenuBuilder {
    constructor() {
        this.categories = new Array();
    }
    addCategory(id, name, description, footer) {
        let category = new FoodMenuCategory(id, name, description, footer);
        this.categories.push(category);
        return category;
    }
    getData() {
        return this.categories;
    }
}
exports.FoodMenuBuilder = FoodMenuBuilder;
