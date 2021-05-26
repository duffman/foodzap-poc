"use strict";
/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuDbTables = exports.MenuDBTables = void 0;
var MenuDBTables;
(function (MenuDBTables) {
    MenuDBTables["Menu"] = "b_menu";
    MenuDBTables["MenuItems"] = "b_menu_items";
    MenuDBTables["MenuItemLang"] = "b_menu_item_lang";
})(MenuDBTables = exports.MenuDBTables || (exports.MenuDBTables = {}));
var FoodMenuDbTables;
(function (FoodMenuDbTables) {
    FoodMenuDbTables["Menu"] = "fm";
    FoodMenuDbTables["Categories"] = "fm_categories";
    FoodMenuDbTables["CategoryLang"] = "fm_category_lang";
    FoodMenuDbTables["InfoLang"] = "fm_info_lang";
    FoodMenuDbTables["Items"] = "fm_items";
    FoodMenuDbTables["ItemLang"] = "fm_item_lang";
    FoodMenuDbTables["ItemPrice"] = "fm_item_price";
    FoodMenuDbTables["ItemProps"] = "fm_item_props";
})(FoodMenuDbTables = exports.FoodMenuDbTables || (exports.FoodMenuDbTables = {}));
