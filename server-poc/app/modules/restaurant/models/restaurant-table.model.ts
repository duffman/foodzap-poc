/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-23
 */

export interface IRestaurantTableModel {
	id: number;
	restaurantId: number;
	tableNumber: number;
	tableName: string;
	tableDescription: string;
	qrCode: string;
}

export class RestaurantTableModel implements IRestaurantTableModel {
	constructor(
		public id: number,
		public restaurantId: number,
		public tableNumber: number,
		public tableName: string,
		public tableDescription: string,
		public qrCode: string
	) {
	}
}
