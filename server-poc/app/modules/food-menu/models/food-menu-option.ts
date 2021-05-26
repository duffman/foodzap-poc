/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */

export class IFoodMenuOption {
	type: string;
	value: boolean;
}

export class FoodMenuOption implements IFoodMenuOption {
	constructor(
		public type: string,
		public value: boolean
	) {
	}
}
