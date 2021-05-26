/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */

import { Logger }           from '@cli/cli.logger';
import { ISQLTableDataRow } from "@zynDb/data-containers/sql-table-data-row";
import { SQLTableDataRow }  from '@zynDb/data-containers/sql-table-data-row';
import { FoodMenuItem }     from "@modules/food-menu/models/food-menu-item.model";
import { FoodMenuOption }   from "@modules/food-menu/models/food-menu-option";

export enum FoodMenuOptionType {
	Gluten     = "gluten",
	Lactose    = "lactose",
	Vegetarian = "vegetarian"
}

export class FoodMenuCategory {
	public items: Array<FoodMenuItem>;

	constructor(public id: number,
		public name: string,
		public description: string,
		public footer: string) {
		this.items = new Array<FoodMenuItem>();
	}

	public addItem(dataRow: ISQLTableDataRow): void {
		let options = new Array<FoodMenuOption>();

		Logger.logPurple('---- NAME ::', dataRow.asStr("name"));
		Logger.logPurple('dataRow.asInt("gluten")', dataRow.asInt("gluten") > 0);
		Logger.logPurple('dataRow.asInt("lactose")', dataRow.asInt("lactose") > 0);
		Logger.logPurple('dataRow.asInt("vegetarian")', dataRow.asInt("vegetarian") > 0);

		/**
		 * Enumerates the Category Type Enum and populates
		 */
		for (let item in FoodMenuOptionType) {
			let value      = FoodMenuOptionType[item];
			let catEnabled = dataRow.asInt(value) > 0;

			if (catEnabled) {
				let itemCat = new FoodMenuOption(value, catEnabled);
				options.push(itemCat);
			}
		}

		/* Deprecated
		 categories.push(new FoodMenuOption("gluten", dataRow.asInt("gluten") > 0));
		 categories.push(new FoodMenuOption("lactose", dataRow.asInt("lactose") > 0));
		 categories.push(new FoodMenuOption("vegetarian", dataRow.asInt("vegetarian") > 0));
		 */

		/*
		 let item = new FoodMenuItem(
		 dataRow.asInt("id"),
		 dataRow.asStr("field"),
		 dataRow.asStr("description"),
		 dataRow.asInt("price"),
		 dataRow.asStr("code"),
		 dataRow.asStr("symbol"),
		 options,
		 dataRow.asStr("photo"),
		 dataRow.asStr("item_ref"),
		 dataRow.asInt("weight")
		 );
		 */

		let item = new FoodMenuItem();

		item.id          = dataRow.asInt("id");
		item.menuId      = -1;
		item.catId       = dataRow.asInt("item_cat_id");
		item.name        = dataRow.asStr("name");
		item.description = dataRow.asStr("description");
		item.price       = dataRow.asInt("price");
		item.code        = dataRow.asStr("code");
		item.symbol      = dataRow.asStr("symbol");
		item.categories  = options;
		item.photo       = dataRow.asStr("photo");
		item.ref         = dataRow.asStr("item_ref");
		item.weight      = dataRow.asInt("weight");

		this.items.push(item);
	}

	/**
	 * Helper method to allow adding items without knowledge about the
	 * SQLTableDataRow, made to simplify for debugging and testing
	 */
	public addItemDebug(id: number,
		name: string,
		description: string,
		price: number,
		gluten: boolean,
		lactose: boolean,
		vegetarian: boolean,
		code: string,
		symbol: string): void {

		const dataRow = new SQLTableDataRow();
		dataRow.addField("id", id.toString());
		dataRow.addField("name", name);
		dataRow.addField("description", description);
		dataRow.addField("price", price);
		dataRow.addField("gluten", gluten);
		dataRow.addField("lactose", lactose);
		dataRow.addField("vegetarian", vegetarian);
		dataRow.addField("code", code);
		dataRow.addField("symbol", symbol);

		this.addItem(dataRow);
	}
}

/**
 * Food Menu Structure
 */
export class FoodMenuBuilder {
	public categories: Array<FoodMenuCategory>;

	constructor() {
		this.categories = new Array<FoodMenuCategory>();
	}

	public addCategory(id: number, name: string, description: string, footer: string): FoodMenuCategory {
		let category = new FoodMenuCategory(id, name, description, footer);
		this.categories.push(category);
		return category;
	}

	public getData(): any {
		return this.categories;
	}
}
