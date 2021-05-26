"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
exports.__esModule = true;
var FoodItemProps = /** @class */ (function () {
    function FoodItemProps(gluten, lactose, vegetarian) {
        if (gluten === void 0) { gluten = false; }
        if (lactose === void 0) { lactose = false; }
        if (vegetarian === void 0) { vegetarian = false; }
        this.gluten = gluten;
        this.lactose = lactose;
        this.vegetarian = vegetarian;
    }
    return FoodItemProps;
}());
exports.FoodItemProps = FoodItemProps;
var FoodMenuItem = /** @class */ (function () {
    function FoodMenuItem(id, catId, menuId, name, description, price, code, symbol, categories, photo, ref, weight, props) {
        if (id === void 0) { id = -1; }
        if (catId === void 0) { catId = -1; }
        if (menuId === void 0) { menuId = -1; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (price === void 0) { price = -1; }
        if (code === void 0) { code = ""; }
        if (symbol === void 0) { symbol = ""; }
        if (categories === void 0) { categories = []; }
        if (photo === void 0) { photo = ""; }
        if (ref === void 0) { ref = ""; }
        if (weight === void 0) { weight = -1; }
        this.id = id;
        this.menuId = menuId;
        this.catId = catId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.code = code;
        this.code = symbol;
        this.categories = categories;
        this.photo = photo;
        this.ref = ref;
        this.weight = weight;
        this.props = props;
    }
    return FoodMenuItem;
}());
exports.FoodMenuItem = FoodMenuItem;
