/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IFoodMenuItem } from "@modules/food-menu/models/food-menu-item.type";

export interface IMenuSave {
	restaurantId?:   number;
	id?:             number;
	languageId?:     number;
	foodMenus?:      IFoodMenu[];
	postIdent?:      string;
	deletedItemIds?: number[];
}

export interface IFoodMenu {
	id:            number;
	name:          string;
	photo:         string;
	description:   string;
	langId:        number;
	weight?:       number;
	isDirty?:      boolean;
	items?:        IMenuItem[];
}

export interface IFoodAllergy {
	id:           number;
	menuId:       string;
	name:         string;
	weight:       number
	type?:        string;
	value?:       boolean;
}

export interface IMenuItem {
	id?:            number;
	name?:          string;
	description?:   string;
	currencyId?:    number;
	photo?:         string;
	allergies?:     any[];
	weight?:        number;
	deleted?:       boolean;
	isDirty?:       boolean;
	langId?:        number;


	// -- //

	menuId?:        number;
	price:          string;
	ref?:           string;
	faveIconClass?: string;
	isFavorite?:    boolean;
	qty?:           number;
}

// Converts JSON strings to/from your types
export class JsonMenuSave {
	public static toIMenuSave(json: string): IMenuSave {
		return JSON.parse(json);
	}

	public static iMenuSaveToJson(value: IMenuSave): string {
		return JSON.stringify(value);
	}
}
