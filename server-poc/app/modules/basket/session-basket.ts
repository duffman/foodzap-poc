/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { IVendorModel }  from "@models/vendor-model";
import { Vendor }        from "@models/vendor-model";
import { IFoodMenuItem } from "@modules/food-menu/models/food-menu-item.type";

export interface ISessionFlash {
	addItemName: string;
	addItemSuccess: boolean;
}

export class SessionFlash {
	constructor(
		public addItemName: string     = "",
		public addItemSuccess: boolean = false
	) {
	}
}

export interface IProdListItem {
	id: number;
	name?: string;
}

export class ProdListItem implements IProdListItem {
	constructor(
		public id: number = -1,
		public name?: string
	) {
	}
}

export interface ISessionBasket {
	vendorId: number; // IVendorModel
	productData: any[];
	flash: ISessionFlash;
}

export class SessionBasket implements ISessionBasket {
	vendor: IVendorModel;

	constructor(
		public vendorId: number             = -1,
		public productData: IFoodMenuItem[] = new Array<IFoodMenuItem>(),
		public flash: ISessionFlash         = new SessionFlash()
	) {
		this.vendor = new Vendor(vendorId, "");
	}
}
