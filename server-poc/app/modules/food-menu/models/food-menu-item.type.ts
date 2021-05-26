/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */

import { IFoodItemProps } from "@modules/food-menu/models/food-menu-item.model";
import { FoodMenuOption } from "./food-menu-option";

export interface IFoodMenuItem {
	id:           number;
	menuId:       number;
	catId:        number;
	name:         string;
	description?: string;
	price:        number;
	code?:        string;
	symbol?:      string;
	photo?:       string;
	categories?:  Array<FoodMenuOption>;
	ref?:         string;
	weight?:      number;
	deleted?:     boolean;

	props?:       IFoodItemProps
}


