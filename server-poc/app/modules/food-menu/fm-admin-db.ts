/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { LogService }        from "@app/services/log.service";
import { Logger }            from "@cli/cli.logger";
import { Inf }               from "@core/interfaces";
import { IDbClient }         from "@zynDb/db-client";
import { L }                 from "@zynDb/db-logger";
import { IDbResult }         from "@zynDb/db-result";
import { SqlIgniter }        from "@zynDb/sql-igniter/sql-igniter";
import { ActionResult }      from "@models/action-result";
import { IActionResult }     from "@models/action-result";
import { IFmCategory }       from "@modules/food-menu/models/fm-category";
import { IFoodMenuPostData } from "@modules/food-menu/models/food-menu-api-post.type";
import { FoodItemProps }     from "@modules/food-menu/models/food-menu-item.model";
import { IFoodMenuItem }     from "@modules/food-menu/models/food-menu-item.type";
import { IFoodMenu }         from "@modules/food-menu/models/food-menu.type";
import { ILanguage }         from "@modules/language/models/language";
import { injectable }        from "inversify";
import { inject }            from "inversify";

export interface IFoodMenuAdminDb {
	setCategory(catData: IFmCategory): Promise<ActionResult>;
	setFoodMenus(data: IFoodMenuPostData): Promise<ActionResult>;
	setMenuCategories(menu: IFoodMenu): Promise<ActionResult>;
	deleteFoodMenuItems(ids: number[]): Promise<IActionResult>;
}

@injectable()
export class FoodMenuAdminDb implements IFoodMenuAdminDb {
	debugLevel = 1;

	constructor(
		@inject(Inf.IDbClient) private dbClient: IDbClient,
		@inject(Inf.ILogService) private logger: LogService
	) {
	}

	public setMenuCategories(data: any): Promise<ActionResult> {
		const scope = this;

		Logger.logGreen("** setMenuCategories :: menu ::", data);

		/**
		 * Set Food Menu Category Text for a specific language
		 * @param catId
		 * @param {IFmCategory} catData
		 * @returns {Promise<IActionResult>}
		 */
		async function setMnuCatLang(catId: number): Promise<IActionResult> {
			Logger.logPurple('*** setMnuCatLang ::', data);

			return new Promise((resolve, reject) => {
				let result = new ActionResult();

				let sql = new SqlIgniter().replace(
					{
						cat_id:      catId,
						language_id: data.languageId,
						name:        data.menuItem.name,
						description: data.menuItem.description,
						footer:      data.menuItem.footer
					},
					'fm_category_lang'
				).toSql();

				scope.dbClient.query(sql).then(res => {
					result.success = res.success;
					result.data    = res.lastInsertId;
				}).catch(err => {
					result.setError(err);
				});

				resolve(result);
			});
		}

		/**
		 * Set Food Menu Category
		 * @param id
		 * @returns {Promise<IActionResult>}
		 */
		async function setMenuCat(): Promise<IActionResult> {
			Logger.logPurple('*** setMenuCat ::', data);

			return new Promise((resolve, reject) => {
				let result = new ActionResult();

				let dataw = {
					id:           data.menuItem.id,
					food_menu_id: data.id,
					weight:       data.menuItem.weight
				};

				let query = new SqlIgniter();

				if (data.id > 0) {
					query.replace(data, 'fm_categories');
				}
				else {
					query.insert(data, 'fm_categories');
				}

				let sql = query.toSql();
				Logger.logGreen('setMenuCat :: running SQL');

				scope.dbClient.query(sql).then(res => {
					console.log('RES === ::', res);
					result.success = res.success;
					result.data    = res.lastInsertId;
					console.log('LAST INSERT ID ::', result.data);
				}).catch(err => {
					result.setError(err);
				});

				resolve(result);
			});
		}

		async function execute(): Promise<void> {
			scope.dbClient.startTransaction();

			try {
				/*
				id: data.id,
				languageId: data.languageId,
				menuItem: menu

					id:           number;
					field:         string;
					description?: string;
					footer?:      string;
					items?:       IFoodMenuItem[];
					weight?:      number;
					isDirty?:     boolean;
				*/

				let setMenuRes = await setMenuCat();

				if (setMenuRes.success) {
					let setMenuLangRes = await setMnuCatLang(setMenuRes.data);
				}

				scope.dbClient.commitTransaction();
			}
			catch (e) {
				scope.dbClient.rollbackTransaction();
			}
		}

		return new Promise((resolve, reject) => {
			let result = new ActionResult();

			execute().then(res => {
				resolve(result);
			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Add new Food menu Category (e.g Main Dishes)
	 * @param catData
	 */
	public setCategory(catData: IFmCategory): Promise<ActionResult> {
		const scope = this;

		Logger.logGreen("*********** setCategory :: catData ::", catData);

		/**
		 * Set Food Menu Category Text for a specific language
		 * @param catId
		 * @param {IFmCategory} catData
		 * @returns {Promise<IActionResult>}
		 */
		async function setMnuCatLang(catId: number, catData: IFmCategory): Promise<IActionResult> {
			return new Promise((resolve, reject) => {
				let result = new ActionResult();

				let sql = new SqlIgniter().replace(
					{
						cat_id:      catId,
						language_id: catData.languageId,
						name:        catData.name,
						description: catData.description,
						footer:      catData.footer
					},
					'fm_category_lang'
				).toSql();

				scope.dbClient.query(sql).then(res => {
					result.success = res.success;
					result.data    = res.lastInsertId;
				}).catch(err => {
					result.setError(err);
				});

				resolve(result);
			});
		}

		/**
		 * Set Food Menu Category
		 * @param {IFmCategory} catData
		 * @returns {Promise<IActionResult>}
		 */
		async function setMenuCat(catData: IFmCategory): Promise<IActionResult> {
			Logger.logPurple('*** setMenuCat ::', catData);

			return new Promise((resolve, reject) => {
				let result = new ActionResult();

				let data = {
					id:           catData.id,
					food_menu_id: catData.menuId,
					weight:       catData.weight
				};

				let query = new SqlIgniter();

				if (data.id > 0) {
					query.replace(data, 'fm_categories');
				}
				else {
					query.insert(data, 'fm_categories');
				}

				let sql = query.toSql();
				Logger.logGreen('setMenuCat :: running SQL');

				scope.dbClient.query(sql).then(res => {
					console.log('RES === ::', res);
					result.success = res.success;
					result.data    = res.lastInsertId;
					console.log('LAST INSERT ID ::', result.data);
				}).catch(err => {
					result.setError(err);
				});

				resolve(result);
			});
		}

		async function execute(): Promise<void> {
			scope.dbClient.startTransaction();

			try {
				let setMenuRes = await setMenuCat(catData);

				console.log("setMenuRes ::", setMenuRes);

				if (setMenuRes.success) {
					let setMenuLangRes = await setMnuCatLang(setMenuRes.data, catData);
				}

				scope.dbClient.commitTransaction();
			}
			catch (e) {
				scope.dbClient.rollbackTransaction();
			}
		}

		return new Promise((resolve, reject) => {
			let result = new ActionResult();

			execute().then(res => {
				resolve(result);
			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Add new Language
	 * @param langData - object representing a language db row
	 */
	public addNewLanguage(langData: ILanguage): Promise<IActionResult> {
		const scope = this;
		return new Promise((resolve, reject) => {
			let actionResult = new ActionResult();

			let query = new SqlIgniter().insert(
				{
					code: langData.code,
					name: langData.name
				},
				'language'
			);

			this.dbClient.query(query).then(res => {
				if (res.success) {
					langData.id       = res.lastInsertId;
					actionResult.data = langData;
					resolve(actionResult);

				}
				else {
					throw new Error("addNewLanguage Failed")
				}

			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Delete Food Menu Items (dishes)
	 * @param {number[]} ids
	 * @returns {Promise<IActionResult>}
	 */
	public deleteFoodMenuItems(ids: number[]): Promise<IActionResult> {
		const scope = this;
		return new Promise((resolve, reject) => {
			resolve(null);
		});
	}

	// DUFF13
	public setFoodMenus(data: IFoodMenuPostData): Promise<ActionResult> {
		console.log('--------- setFoodMenus -----------');
		Logger.logPurple('** setFoodMenus ::', data);
		const scope = this;
		let result  = new ActionResult();

		async function updateCategoryLang(menu: IFoodMenu): Promise<IActionResult> {
			let actionRes = new ActionResult();

			return new Promise((resolve, reject) => {
				let query = new SqlIgniter();

				query.setMulti(
					{
						name:        menu.name,
						description: menu.description,
						footer:      menu.footer
					},
					'fm_category_lang'
				)
					 .where('fm_category_lang.cat_id', menu.id)
					 .where('fm_category_lang.language_id', data.languageId);

				const sql = query.toSql();
				console.log("updateCategoryLang :: menu", menu);
				Logger.logPurple("updateCategoryLang :: setMenuData ::", sql);

				scope.dbClient.query(sql).then(dbRes => {
					if (dbRes.success && dbRes.affectedRows > 0) {
						L.logDbResult(dbRes, 'setFoodMenus :: updateCategoryLang');
						actionRes.setSuccess();
						resolve(actionRes);
					}
					else {
						const err = new Error(`setMenuData failed, sql: "${sql}"`);
						actionRes.setError(err);
						reject(err);
					}

				}).catch(err => {
					reject(err);
				});
			});
		}

		async function removeMenuItem(itemId: number): Promise<ActionResult> {
			return new Promise((resolve, reject) => {
				let actionResult = new ActionResult();

				let query = new SqlIgniter()
					.delete('fm_items')
					.where('id', itemId);

				let sql = query.toSql();

				console.log('removeMenuItem :: sql ::', sql);
				resolve(actionResult);
			});
		}

		// TODO: Execute in transaction
		async function setMenuItems(menu: IFoodMenu): Promise<IActionResult> {
			let actionResult = new ActionResult();

			for (let item of menu.items) {
				let setMenuItemRes = await scope.setFoodMenuItem(
					item.catId,
					data.languageId,
					item
				);

				if (!item.weight) {
					item.weight = 0;
				}

				if (scope.debugLevel > 0) console.log('setMenuItemRes ::', setMenuItemRes);
			}

			return new Promise((resolve, reject) => {
				resolve(actionResult);
			});
		}

		// TODO: Replace with DB transaction
		async function saveMenu(menu: IFoodMenu): Promise<IActionResult> {
			let actionResult = new ActionResult();
			//let setDataRes   = await updateCategoryLang(menu);
			let setItemsRes  = new ActionResult(false);

			let menuData = {
				id: data.id,
				languageId: data.languageId,
				menuItem:   menu
			}

			let setDataRes = await scope.setMenuCategories(menuData);

			console.log(' ');
			console.log('-------------------');
			console.log(' ');
			console.log(' ');
			console.log('menu ::', menu);

			if (setDataRes.success) {
				setItemsRes = await setMenuItems(menu);
			}

			if (!setDataRes.success || !setItemsRes.success) {
				actionResult.setSuccess();
			}

			return new Promise((resolve, reject) => {
				resolve(actionResult);
			});
		}

		async function execute(): Promise<void> {
			console.log('setFoodMenus :: execute()');

			try {
				if (scope.debugLevel > 0) console.log("data.foodMenus ::", data.foodMenus);

				//
				// Remove Item
				//
				if (data.deletedItemIds && Array.isArray(data.deletedItemIds)) {
					for (let itemId of data.deletedItemIds) {
						console.log("setFoodMenus :: DELETE ITEM ::", itemId);
						let res = await removeMenuItem(itemId);
						console.log("DELETE ITEM :: RES ::", res);
					}
				}

				//
				// Update Food Menus
				//
				for (let menu of data.foodMenus) {
					console.log(' ');
					console.log(' ');
					console.log(' ');
					console.log('==== SAVE MENU (***) ==========================');
					let saveMenuRes = await saveMenu(menu);
					console.log('saveMenuRes ::', saveMenuRes);
					console.log('==== //// SAVE MENU ===========================================');
					console.log(' ');
					console.log(' ');
					console.log(' ');
				}
			}
			catch (err) {
				result.setError(err, 'setFoodMenus :: execute');
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				resolve(result);
			}).catch(err => {
				console.log('setFoodMenu ::', err);
			})
		});
	}

	public setFoodMenuItem(clientMenuId: number, languageId: number, item: IFoodMenuItem): Promise<void> {
		let scope = this;
		let result: boolean;

		console.log('------------------');
		console.log('setFoodMenuItem ::', clientMenuId);
		console.log('languageId ::', languageId);
		console.log('item ::', item);

		// process.exit(10);

		function log(label: string, data: any) {
			console.log(label, data);
		}

		async function addItem(clientMenuId: number, item: IFoodMenuItem): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
// id:           item.id,

				let itemData = {
					food_menu_id: clientMenuId,
					item_cat_id:  item.catId,
					item_ref:     item.ref,
					photo:        item.photo,
					weight:       item.weight
				};

				let sql: string = "";

				if (clientMenuId > 0) {
					sql = new SqlIgniter().setMulti(
						itemData,
						'fm_items'
					)
										  .where('id', item.id)
										  .toSql();

				}
				else { // Replace
					itemData['id'] = item.id;
					sql            = new SqlIgniter().replace(
						itemData,
						'fm_items'
					)
													 .toSql();
				}

				scope.dbClient.query(sql).then(res => {
					if (scope.debugLevel > 0) console.log('res ::', res);
					resolve(res);

				}).catch(err => {
					if (scope.debugLevel > 0) console.log("ERR ::", err);
					reject(err);
				});
			});
		}

		async function setItemLang(itemId: number, item: IFoodMenuItem): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				let query = new SqlIgniter().replace(
					{
						item_id:     itemId,
						language_id: languageId,
						name:        item.name,
						description: item.description
					},
					'fm_item_lang');

				let sql = query.toSql();

				if (scope.debugLevel > 2) log('addFoodMenuItem :: SQL ::', sql);

				scope.dbClient.query(sql).then(res => {
					if (scope.debugLevel > 2) console.log("addItemLang :: RES ::", res);
					resolve(res);

				}).catch(err => {
					if (scope.debugLevel > 2) console.log("addItemLang :: ERR ::", err);
					reject(err);
				});
			});
		}

		async function setItemPrice(itemId: number, currencyId: number, price: number): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				let sql = new SqlIgniter().replace(
					{
						item_id:     itemId,
						currency_id: 1,
						price:       item.price
					},
					'fm_item_price'
				).toSql();

				if (scope.debugLevel > 1) console.log(':: itemPriceSql SQL ::', sql);

				scope.dbClient.query(sql).then(res => {
					if (scope.debugLevel > 1) console.log(":: setItemPrice :: RES ::", res);
					resolve(res);

				}).catch(err => {
					if (scope.debugLevel > 1) console.log(":: setItemPrice :: ERR ::", err);
					reject(err);
				});
			});
		}

		async function setItemProps(itemId: number, props: FoodItemProps): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				if (!props) {
					props = new FoodItemProps();
				}

				let query = new SqlIgniter().replace(
					{
						item_id:    itemId,
						gluten:     props.gluten,
						lactose:    props.lactose,
						vegetarian: props.vegetarian
					},
					'fm_item_props');

				let sql = query.toSql();

				if (scope.debugLevel > 1) log('addItemProps :: SQL ::', sql);

				scope.dbClient.query(sql).then(res => {
					if (scope.debugLevel > 1) console.log("addItemProps :: RES ::", res);
					resolve(res);

				}).catch(err => {
					console.log("addItemProps :: ERR ::", err);
					reject(err);
				});
			});
		}

		async function execute(): Promise<void> {
			try {
				result = true;
				await scope.dbClient.startTransaction();

				let itemId = ( item.id === -1 ) ? item.id = null : item.id;

				let addItemRes = await addItem(clientMenuId, item);

				if (scope.debugLevel > 1) console.log('addItemRes ::', addItemRes);

				if (!itemId) {
					itemId = addItemRes.lastInsertId;
				}

				let setLangRes = await setItemLang(itemId, item);
				//console.log('setLangRes ::', setLangRes);

				//

				let setItemPriceRes = await setItemPrice(itemId, 1, item.price);
				//console.log('setItemPriceRes ::', setItemPriceRes);

				//

				let setPropsRes = await setItemProps(itemId, item.props);
				//console.log('setPropsRes ::', setPropsRes);

				await scope.dbClient.commitTransaction();
			}
			catch (error) {
				console.log('ITEM ADD ERROR ::', error);
				result = false;
				await scope.dbClient.rollbackTransaction();
			}
		}

		return new Promise((resolve, reject) => {
			console.log('Promise =========');

			execute().then(() => {
				console.log('execute() :: Executed');
				resolve();

			}).catch(err => {
				console.log('setFoodMenuItem :: err ::', err);
				reject(err);
			});
		});
	}
}
