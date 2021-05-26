/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */

export interface IOrderModel {
	id: number;
	notes: string;
}

export class OrderModel implements IOrderModel {
	constructor(
		public id: number,
		public notes: string
	) {}
}
