/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { LogService }        from "@app/services/log.service";
import { JsonMenuSave }      from "@modules/food-menu/save-menu/save-menu";
import { IDbClient }         from "@zynDb/db-client";
import { Request }           from "express";
import { Response }          from "express";
import { Router }            from "express";
import { injectable }        from "inversify";
import { inject }            from "inversify";
import { BaseController }    from "@api/base.controller";
import { Logger }            from "@cli/cli.logger";
import { Inf }               from "@core/interfaces";
import { IgniterController } from "@core/webcore/igniter.controller";
import { FoodMenuAdminDbBeta } from "@modules/food-menu/fm-admin-db-beta";
import { IDbResult }           from "@zynDb/db-result";
import { DbTransaction }       from "@zynDb/db-transaction";
import { IOkPacket }           from "@zynDb/types/mysql-ok-packet";
import { SqlIgniter }          from "@zynDb/sql-igniter/sql-igniter";
import { FoodMenuAdminDb }     from "@modules/food-menu/fm-admin-db";
import { FmDataValidator }     from "@modules/food-menu/fm-data-validator";
import { FmPriceConverter }    from "@modules/food-menu/fm-price-converter";
import { FoodMenuDb }          from "@modules/food-menu/fm.db";
import { IFmCategory }         from "@modules/food-menu/models/fm-category";
import { IFoodMenuPostData }   from "@modules/food-menu/models/food-menu-api-post.type";
import { IFoodMenuItem }       from "@modules/food-menu/models/food-menu-item.type";

@injectable()
export class FoodMenuAdminController extends IgniterController {
	debugMode: boolean;

	constructor(
		@inject(Inf.IFoodMenuDb) private menuDb: FoodMenuDb,
		@inject(Inf.IFoodMenuAdminDb) private adminDb: FoodMenuAdminDb,
		@inject(Inf.IFmPriceConverter) private priceConverter: FmPriceConverter,
		@inject(Inf.IDbClient) public dbClient: IDbClient,
		@inject(Inf.ILogService) private logger: LogService
	) {
		super();
	}

	//
	// Init Routes
	//
	public initRoutes(routes: Router): void {
		routes.get('/executeNewRecord').bind(this)

		routes.get("/fluid/new", this.debugMenuNew.bind(this));
		routes.get("/fluid/update", this.debugMenuUpdate.bind(this));
		routes.get("/fluid/dish", this.debugMenuCreateItem.bind(this));
		routes.get("/fluid/save", this.debugFullSaveMenu.bind(this));

		routes.post("/restaurant/menu/add", this.addMenuItem.bind(this));
		//routes.post("/restaurant/menu/set", this.setMenu.bind(this));


		routes.post("/restaurant/menu/set", this.debugFullSaveMenu.bind(this));

		// Add Menu Category
		routes.post("/restaurant/menu/addcat", this.addMenuCategory.bind(this));
	}


	private debugFullSaveMenu(req: Request, resp: Response): void {
		/*let data = {
			"restaurantId":1,
			"id":-1,
			"languageId":1,
			"foodMenus":[
				{
					"id":-3219749994986,
					"name":"dfg dfg",
					"description":"dfgfd dfg fdg",
					"isDirty":true,
					"items":[
						{
							"id":-1609869958289,
							"menuId":-345345345,
							"catId":0,
							"name":"Kalle Kula",
							"description":"Fick en fet nula!",
							"price":"422",
							"code":"",
							"symbol":"",
							"photo":"",
							"categories":[

							],
							"ref":"",
							"weight":102,
							"deleted":false,
							"faveIconClass":"heart-outline",
							"isFavorite":false,
							"isDirty":true,
							"qty":0
						},
						{
							"id":1609869937222,
							"menuId":0,
							"catId":0,
							"name":"sdfsdsdfsdfsdfsdf",
							"description":"dsd ddfsdfsd",
							"price":"12",
							"code":"",
							"symbol":"",
							"photo":"",
							"categories":[

							],
							"ref":"",
							"weight":101,
							"deleted":false,
							"faveIconClass":"heart-outline",
							"isFavorite":false,
							"isDirty":true,
							"qty":0
						}
					]
				}
			],
			"postIdent":"fm-pd",
			"deletedItemIds":[

			]
		};*/


		let data = '{'
				   + '   "restaurantId":1,'
				   + '   "id":1,'
				   + '   "languageId":1,'
				   + '   "foodMenus":['
				   + '      {'
				   + '         "id":-3220091822920,'
				   + '         "items":['
				   + '            {'
				   + '               "id":-3220091862426,'
				   + '               "menuId":-3220091822920,'
				   + '               "name":"weewwe",'
				   + '               "description":"ewewwe",'
				   + '               "price":"3333",'
				   + '               "currencyId":1,'
				   + '               "photo":"",'
				   + '               "allergies":['
				   + '                  '
				   + '               ],'
				   + '               "ref":"",'
				   + '               "weight":0,'
				   + '               "deleted":false,'
				   + '               "faveIconClass":"heart-outline",'
				   + '               "isFavorite":false,'
				   + '               "isDirty":true,'
				   + '               "qty":0,'
				   + '               "langId":1'
				   + '            },'
				   + '            {'
				   + '               "id":-3220091826264,'
				   + '               "menuId":-3220091822920,'
				   + '               "name":";in rätt",'
				   + '               "description":"Mycket god",'
				   + '               "price":"12",'
				   + '               "currencyId":1,'
				   + '               "photo":"",'
				   + '               "allergies":['
				   + '                  '
				   + '               ],'
				   + '               "ref":"",'
				   + '               "weight":0,'
				   + '               "deleted":false,'
				   + '               "faveIconClass":"heart-outline",'
				   + '               "isFavorite":false,'
				   + '               "isDirty":true,'
				   + '               "qty":0,'
				   + '               "langId":1'
				   + '            }'
				   + '         ],'
				   + '         "langId":1,'
				   + '         "name":"Kalle kula",'
				   + '         "isDirty":true,'
				   + '         "description":"Ruffe banan"'
				   + '      }'
				   + '   ],'
				   + '   "postIdent":"fm-pd",'
				   + '   "deletedItemIds":['
				   + '   ]'
				   + '}'

		Logger.logCyan('FmAdminController :: debugFullSaveMenu ::', req.body);

		let postData = req.body;

		Logger.spit();
		Logger.spit();
		Logger.spit();
		Logger.logCyan('==============================================')
		Logger.spit();
		Logger.spit();
		Logger.spit();
		Logger.spit();

		let betaDb = new FoodMenuAdminDbBeta(this.dbClient, this.logger);

		betaDb.menusFullSave(postData).then(res => {
			resp.json(res);
		}).catch(err => {
			resp.json(err);
		});
	}

	private debugMenuCreateItem(req: Request, resp: Response): void {
		Logger.logBlue('FmAdminController :: debugMenuCreateItem');
		let betaDb = new FoodMenuAdminDbBeta(this.dbClient, this.logger);
		betaDb.createMenuItem([]).then(res => {
			resp.json(res);
		}).catch(err => {
			resp.json(err);
		});
	}

	private debugMenuNew(req: Request, resp: Response): void {
		Logger.logPurple('FmAdminController :: debugMenuNew');
		let betaDb = new FoodMenuAdminDbBeta(this.dbClient, this.logger);

		let data = {
//			id: 1,
			restaurant_id: 1,
			weight: 22
		};

		betaDb.testNew(data).then(res => {
			console.log("debugMenuNew :: setFoodMenu ::", res);
			resp.json(res);

		}).catch(err => {
			Logger.logError("debugMenuNew :: setRecord :: error ::", err);
			BaseController.extFatalError(req, resp);
			resp.json(err);
		});
	}

	private debugMenuUpdate(req: Request, resp: Response): void {
		Logger.logPurple('FmAdminController :: debugMenuNew');
		let betaDb = new FoodMenuAdminDbBeta(this.dbClient, this.logger);

		let data = {
			id:            1,
			restaurant_id: 1,
			weight:        22
		};

		betaDb.testUpdate(data).then(res => {
			console.log('*** setFoodMenu ::', res);
			resp.json(res);
			resp.end();

		}).catch(err => {
			Logger.logError("### setRecord :: error ::", err);
			BaseController.extFatalError(req, resp);
			resp.json(err);
			resp.end();
		});
	}

	/**
	 * Assign Menu Data
	 * @param data
	 */
	public assignData(data: any): void {
		this.adminDb.setFoodMenus(data).then(res => {
			console.log('setFoodMenu ::', res);
			console.log(res);

		}).catch(err => {
			Logger.logError("setRecord :: error ::", err);
		});
	}

	/**
	 * Set Menu
	 * @param {e.Request} req
	 * @param {e.Response} resp
	 */
	private setMenu(req: Request, resp: Response): void {
		console.log(':: ', req.body);

		let data: IFoodMenuPostData  = req.body;
		let deletedItemIds: number[] = data.deletedItemIds;

		console.log('::: IFoodMenuPostData ::', data);

		for (let menu in data.foodMenus) {
			let menuObj = data.foodMenus[menu];

			for (let item of menuObj.items) {
				//console.log('::: MENU :: ITEM ::', item);
			}
		}

		if (FmDataValidator.foodMenusPostData(data) === false) {
			BaseController.extFatalError(req, resp, "MENU_DATA_INVALID");
			return;
		}

		// this.adminDb.deleteFoodMenuItems(deletedItemIds);

		this.adminDb.setFoodMenus(data).then(res => {
			console.log('setFoodMenu ::', res);
			resp.json(res);

		}).catch(err => {
			Logger.logError("setRecord :: error ::", err);
			BaseController.extFatalError(req, resp);
		});
	}

	/**
	 *
	 * @param menuId
	 * @param catId
	 * @param menuItem
	 */
	public addMenuItem(menuId: number, catId: number, menuItem: IFoodMenuItem): Promise<boolean> {
		let scope   = this;
		let dbTrans = new DbTransaction();
		let result  = false;

		async function beginTrans(): Promise<IOkPacket> {
			return dbTrans.beginTransaction();
		}

		async function commitTrans(): Promise<boolean> {
			return dbTrans.commit();
		}

		async function rollbackTrans(): Promise<boolean> {
			return dbTrans.rollback();
		}

		async function executeQuery(sql: string): Promise<IDbResult> {
			return dbTrans.executeQuery(sql);
		}

		async function addItemTranslation(): Promise<boolean> {
			return new Promise((resolve, reject) => {
				resolve(true);
			});
		}

		/**
		 * Add Food Menu Item
		 * @returns {Promise<void>}
		 */
		async function addMenuItem(): Promise<void> {
			await beginTrans();
			let dynSql = new SqlIgniter();

			let dbData = {
				"food_menu_id": menuId,
				"item_cat_id":  catId,
				"item_ref":     menuItem.ref,
				"weight":       0
			};

			let dbRes     = await executeQuery(dynSql.toSql());
			let newItemId = dbRes.lastInsertId;

			Logger.logPurple("LAST INSERT ID ::", newItemId);
		}

		return new Promise((resolve, reject) => {
			addMenuItem().then(() => {
				resolve(result);
			})
		});
	}

	/**
	 * Add Menu Category
	 * @param {e.Request} req
	 * @param {e.Response} resp
	 */
	public addMenuCategory(req: Request, resp: Response): void {
		/*
		{
			"menuId":        1,
			"languageId":    1,
			"field":          "Snaskrätter",
			"description":   "Goda Härliga smaskrätter",
			"footer":        "Ska vi verkligen har Footer??",
			"weight":        2
		}
		*/

		console.log("*** addMenuCategory");

		let categoryData: IFmCategory = {
			id:          req.body.id,
			menuId:      req.body.menuId,
			languageId:  req.body.languageId,
			name:        req.body.name,
			description: req.body.description,
			footer:      req.body.footer,
			weight:      req.body.weight
		};

		console.log("addMenuCategory ::", categoryData);

		this.adminDb.setCategory(categoryData).then(res => {
			resp.json(res);
		}).catch(err => {
			resp.json(err);
		});
	}
}
