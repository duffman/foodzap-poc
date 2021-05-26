"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuOption = exports.IFoodMenuOption = void 0;
class IFoodMenuOption {
}
exports.IFoodMenuOption = IFoodMenuOption;
class FoodMenuOption {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
exports.FoodMenuOption = FoodMenuOption;
