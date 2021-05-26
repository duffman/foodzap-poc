/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */

import { IFoodMenu } from "./food-menu.type";

export interface IFoodMenuPostData {
	postIdent:        string;
	id:               number,
	restaurantId:     number;
	languageId:       number;
	foodMenus:        IFoodMenu[];
	deletedItemIds?:  number[];
}

export class FoodMenuPostData implements IFoodMenuPostData {
	public postIdent:  string = "fm-pd";

	constructor(
		public id:               number,
		public restaurantId:     number,
		public languageId:       number,
		public foodMenus:        IFoodMenu[],
		public deletedItemIds?:  number[]
	) {}


}



/*
export interface IFoodMenuPostData {
	postIdent:       string;
	id:      number;
	languageId:      number;
	foodMenus:       IFoodMenu[];
	deletedItemIds?: number[];
}
*/
