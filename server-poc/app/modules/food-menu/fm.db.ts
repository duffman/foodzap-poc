/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { inject }           from 'inversify';
import { injectable }       from 'inversify';
import { Logger }           from '@cli/cli.logger';
import { ISQLTableDataRow } from "@zynDb/data-containers/sql-table-data-row";
import { DbClient }         from '@zynDb/db-client';
import { IDbResult }       from '@zynDb/db-result';
import { OrderType }       from "@zynDb/sql-igniter/types";
import { SqlIgniter }      from "@zynDb/sql-igniter/sql-igniter";
import { FoodMenuBuilder } from '@modules/food-menu/food-menu-builder';

export interface IFoodMenuDb {
	getCategoriesOld(customerId: number, langId: number, debug: boolean): Promise<IDbResult>;
	getFoodMenuItems(menuId: number, langId: number, catId: number, currId: number): Promise<IDbResult>;

	getRestaurantCategories(restaurantId: number, langId: number, debug: boolean): Promise<IDbResult>;
	getRestaurantMenu(restaurantId: number, langId: number): Promise<FoodMenuBuilder>;

	getMenu(customerId: number, langId: number): Promise<FoodMenuBuilder>;
	getCurrencyData(code: string): Promise<IDbResult>;
}

@injectable()
export class FoodMenuDb implements IFoodMenuDb {

	constructor(
		@inject('IDbClient') private dbClient: DbClient
	) {
		//	super();
	}

	/**
	 * Get categories
	 * @param {number} customerId
	 * @param {number} langId
	 * @param {boolean} debug
	 * @returns {Promise<IDbResult>}
	 */
	public getCategoriesOld(customerId: number, langId: number, debug: boolean = false): Promise<IDbResult> {
		let dynSql = new SqlIgniter();

		dynSql.select(
			"fmc.id",
			"fmc.weight",
			"fm_category_lang.field",
			"fm_category_lang.description"
		)
			  .from("fm")
			  .from("fm_categories", "fmc")
			  .joinTable("fm_category_lang", "cat_id", "fmc.id", false)
			  .and("fm_category_lang.language_id", langId)
			  .where("fm.customer_id", customerId)
			  .orderBy("fmc.weight", OrderType.Desc);

		let sql = dynSql.toSql();

		Logger.logCyan("getCategories :: SQL ::", sql);

		return new Promise((resolve, reject) => {
			return this.dbClient.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getCategories() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get categories
	 * @param restaurantId
	 * @param langId
	 * @param debug
	 */
	public getRestaurantCategories(restaurantId: number, langId: number, debug: boolean = false): Promise<IDbResult> {
		let sql =
				`SELECT
  				fm.id AS menu_id,
				fmc.id, fmc.weight,
				fm_category_lang.name,
				fm_category_lang.description,
				fm_category_lang.footer
			FROM
				fm, fm_categories AS fmc
				LEFT JOIN fm_category_lang ON cat_id = fmc.id
				AND
				fm_category_lang.language_id = ${langId}
			WHERE
				fmc.food_menu_id = fm.id
				AND
				fm.restaurant_id = ${restaurantId}
				ORDER BY
				fmc.weight DESC`;

		/*
		 let dynSql = new SqlIgniter();

		 dynSql.select(
		 "fmc.id",
		 "fmc.weight",
		 "fm_category_lang.field",
		 "fm_category_lang.description"
		 )
		 .from("fm")
		 .from("fm_categories", "fmc")
		 .joinTable("fm_category_lang", "cat_id", "fmc.id", false)
		 .and("fm_category_lang.language_id", langId)

		 .where("fmc.food_menu_id", "fm.id", CompareType.Equal,false)
		 .where("fm.restaurant_id", restaurantId)
		 .orderBy("fmc.weight", OrderType.Desc);

		 let sql = dynSql.toSql();
		 */
		Logger.logCyan("getCategories :: aaaaaSQL ::", sql);

		return new Promise((resolve, reject) => {
			return this.dbClient.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getCategories() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get category items
	 * @param menuId
	 * @param langId
	 * @param catId
	 * @param currencyId
	 */
	public getFoodMenuItems(menuId: number, langId: number, catId: number, currencyId: number = 1): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.select(
			"fmi.id",
			"fmi.item_cat_id",
			"fmi.photo",
			"fmi.weight",
			"fmip.price",
			"fmi_props.gluten",
			"fmi_props.lactose",
			"fmi_props.vegetarian",
			"fm_item_lang.field",
			"fm_item_lang.description",
			"curr.code",
			"curr.symbol"
		)
			  .from("fm_items", "fmi")
			  .joinTable("fm_item_props AS fmi_props", "fmi_props.item_id", "fmi.id", false)
			  .joinTable("fm_item_lang", "fm_item_lang.item_id", "fmi.id", false)
			  .and("language_id", langId)
			  .joinTable("fm_item_price AS fmip", "fmip.item_id", "fmi.id", false)
			  .and("fmip.currency_id", currencyId)
			  .joinTable("currencies AS curr", "curr.id", "fmip.currency_id", false)
			  .where("fmi.food_menu_id", menuId)
			  .where("fmi.item_cat_id", catId)
			  .orderBy("fmi.weight", OrderType.Desc);

		let sql = dynSql.toSql();
		Logger.logGreen("getCategoryItems ::  SQL ::", sql);

		return new Promise((resolve, reject) => {
			return this.dbClient.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getCategoryItems() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get Restaurant Menu
	 * @param customerId
	 * @param langId
	 */
	public getRestaurantMenu(restaurantId: number, langId: number = 1): Promise<FoodMenuBuilder> {
		let scope       = this;
		let menuBuilder = new FoodMenuBuilder();

		return new Promise((resolve, reject) => {
			async function doGetMenu(): Promise<void> {
				let categories = await scope.getRestaurantCategories(restaurantId, langId);

				let dataRows = categories.result.dataRows;

				console.log("getRestaurantMenu ::", dataRows);

				//
				// Iterate Food Menu Categories
				//
				for (let row of dataRows) {
					if (row.isEmpty) {
						continue;
					}

					let menuId = row.asInt("menu_id");
					let catId  = row.asInt("id");
					let name   = row.asStr("name");
					let desc   = row.asStr("description");
					let footer = row.asStr("footer");

					let category = menuBuilder.addCategory(catId, name, desc, footer);

					//
					// Get Menu Items for each Category
					//
					let catItemDataRows: Array<ISQLTableDataRow>;
					try {
						let catItems    = await scope.getFoodMenuItems(menuId, langId, catId);
						catItemDataRows = catItems.result.dataRows;
					}
					catch (err) {
						Logger.logError("FoodMenuDb :: getMenu :: failed to get items ::", err);
					}

					for (let catRow of catItemDataRows) {
						category.addItem(catRow);
					}
				}
			}

			doGetMenu().then(res => {
				resolve(menuBuilder);
			}).catch(err => {
				reject(err);
			});
		});
	}

	public getMenu(customerId: number, langId: number): Promise<FoodMenuBuilder> {
		let scope       = this;
		let menuBuilder = new FoodMenuBuilder();

		return new Promise((resolve, reject) => {
			async function doGetMenu(): Promise<void> {
				let categories = await scope.getCategoriesOld(customerId, langId);
				let dataRows   = categories.result.dataRows;

				//
				// Iterate Food Menu Categories
				//
				for (let row of dataRows) {
					if (row.isEmpty) {
						continue;
					}

					let catId  = row.asInt("id");
					let name   = row.asStr("name");
					let desc   = row.asStr("description");
					let footer = row.asStr("footer");

					let category = menuBuilder.addCategory(catId, name, desc, footer);

					//
					// Get Menu Items for each Category
					//
					let catItemDataRows: Array<ISQLTableDataRow>;
					try {
						let catItems    = await scope.getFoodMenuItems(customerId, langId, catId);
						catItemDataRows = catItems.result.dataRows;

					}
					catch (err) {
						Logger.logError("FoodMenuDb :: getMenu :: failed to get items ::", err);
					}

					for (let catRow of catItemDataRows) {
						category.addItem(catRow);
					}
				}
			}

			doGetMenu().then(res => {
				resolve(menuBuilder);
			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Get currency info by given Currency Code
	 * @param currencyCode
	 */
	public getCurrencyData(currencyCode: string): Promise<IDbResult> {
		let dynQuery = new SqlIgniter();
		dynQuery.get('currencies').where('code', currencyCode);
		const sql = dynQuery.toSql();

		return new Promise((resolve, reject) => {
			this.dbClient.query(sql).then(res => {
				resolve(res);

			}).catch(err => {
				Logger.logError('getCurrency :: err ::', err);
				reject(err);
			});
		});
	}
}
