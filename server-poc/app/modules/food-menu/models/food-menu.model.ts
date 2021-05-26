/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */

import { IFoodMenu }     from "./food-menu.type";
import { IFoodMenuItem } from "./food-menu-item.type";

export class FoodMenu implements IFoodMenu {
	public description: string;
	public footer: string;
	public id: number;
	public isDirty: boolean;
	public items: IFoodMenuItem[];
	public name: string;
}
