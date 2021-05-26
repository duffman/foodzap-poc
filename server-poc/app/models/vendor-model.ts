/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * September 2018
 */

export interface IVendorModel {
	id: number;
	name?: string;
}

export class Vendor implements IVendorModel {
	constructor(
		public id: number,
		public name: string) {}
}
