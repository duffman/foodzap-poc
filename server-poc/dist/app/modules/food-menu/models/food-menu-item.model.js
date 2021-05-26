"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuItem = exports.FoodItemProps = void 0;
class FoodItemProps {
    constructor(gluten = false, lactose = false, vegetarian = false) {
        this.gluten = gluten;
        this.lactose = lactose;
        this.vegetarian = vegetarian;
    }
}
exports.FoodItemProps = FoodItemProps;
class FoodMenuItem {
    constructor(id = -1, catId = -1, menuId = -1, name = "", description = "", price = -1, code = "", symbol = "", categories = [], photo = "", ref = "", weight = -1, props) {
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
}
exports.FoodMenuItem = FoodMenuItem;
