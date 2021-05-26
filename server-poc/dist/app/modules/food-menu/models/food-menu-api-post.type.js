"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMenuPostData = void 0;
class FoodMenuPostData {
    constructor(id, restaurantId, languageId, foodMenus, deletedItemIds) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.languageId = languageId;
        this.foodMenus = foodMenus;
        this.deletedItemIds = deletedItemIds;
        this.postIdent = "fm-pd";
    }
}
exports.FoodMenuPostData = FoodMenuPostData;
/*
export interface IFoodMenuPostData {
    postIdent:       string;
    id:      number;
    languageId:      number;
    foodMenus:       IFoodMenu[];
    deletedItemIds?: number[];
}
*/
