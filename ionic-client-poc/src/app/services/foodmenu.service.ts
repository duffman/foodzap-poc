/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable }   from '@angular/core';
import { IFoodMenu }    from "@sdk/food-menu/types/food-menu.type";
import { ActionResult } from "@sdk/core/action-result";

type FoodMenuList = IFoodMenu[];
type MenuFilters = Array<MenuFilter>;

export class MenuFilter {
	constructor(public name: string,
				public typeName: string,
				public enabled = false) {
	}
}

@Injectable({
	providedIn: 'root'
})
export class FoodmenuService {

	constructor() {
	}

	public addCategory(): Promise<ActionResult> {
		return new Promise((resolve, reject) => {
		   resolve(null);
		});
	}


}
