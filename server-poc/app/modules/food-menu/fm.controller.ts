/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */

import { IRestApiController } from '@api/api-controller';
import { BaseController }     from "@api/base.controller";
import { ControllerHelper }   from "@api/controller.helper";
import { Logger }             from '@cli/cli.logger';
import { Inf }                from "@core/interfaces";
import { FmPriceConverter }   from '@modules/food-menu/fm-price-converter';
import { FoodMenuDb }         from '@modules/food-menu/fm.db';
import { Request }            from 'express';
import { Response }           from 'express';
import { Router }             from 'express';
import { inject, injectable } from 'inversify';
import { FoodMenuBuilder }    from './food-menu-builder';

@injectable()
export class FoodMenuController implements IRestApiController {
	debugMode: boolean;

	constructor(
		@inject(Inf.IFoodMenuDb) private foodMenuDb: FoodMenuDb,
		@inject(Inf.IFmPriceConverter) private priceConverter: FmPriceConverter
	) {
		ControllerHelper.logAttach(this);
	}

	public initRoutes(routes: Router): void {
		routes.get("/mnudbg", this.mnudbg.bind(this));
		routes.get("/restaurant/menu/:id", this.getRestaurantMenu.bind(this));
	}

	private mnudbg(req: Request, resp: Response): void {
	}

	/**
	 * Get full food menu
	 * @param req
	 * @param resp
	 */
	private getRestaurantMenu(req: Request, resp: Response): void {
		let reqId            = Number.parseInt(req.params.id);
		let reqCurrency: any = req.query.currency;
		let reqLanguage: any = req.query.language;

		Logger.logCyan('reqCurrency:: ', reqCurrency);
		Logger.logCyan('reqCurrency:: ', reqCurrency);
		Logger.logCyan('reqLanguage:: ', reqLanguage);

		if (!reqId) {
			resp.json({ error: "MENU_ID_MISSING" });
			return;
		}

		if (!reqCurrency) {
			reqCurrency = "SEK";
		}

		if (!reqLanguage) {
			reqLanguage = 1;
		}

		let scope = this;
		let foodMenu: FoodMenuBuilder;

		async function getMenu(): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
				return scope.foodMenuDb.getRestaurantMenu(reqId, reqLanguage)
							.then((menuBuilder: FoodMenuBuilder) => {
								resolve(menuBuilder)
							}).catch(err => {
						reject(err);
					});
			});
		}

		async function convertCurrency(menuBuilder: FoodMenuBuilder): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
				return scope.priceConverter.convertCurrency(reqCurrency, menuBuilder)
							.then(() => {
								resolve(menuBuilder)
							}).catch(err => {
						reject(err);
					});
			});
		}

		async function translateMenu(menuBuilder: FoodMenuBuilder): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
			});
		}

		async function compileMenu(): Promise<void> {
			foodMenu = await getMenu();
			convertCurrency(foodMenu);
		}

		compileMenu().then(() => {
			try {
				resp.json(foodMenu.getData());

			}
			catch (err) {
				Logger.logError("getFullMenu :: compileMenu :: error ::", err);
				resp.json({ erro: 684 });
			}
		});
	}

	/**
	 * Get full food menu
	 * @param req
	 * @param resp
	 */
	private getFullMenu(req: Request, resp: Response): void {
		let reqCustomer: any = req.query.customer;
		let reqCurrency: any = req.query.currency;
		let reqLanguage: any = req.query.language;

		Logger.logCyan('reqCurrency:: ', reqCurrency);
		Logger.logCyan('reqCurrency:: ', reqCurrency);
		Logger.logCyan('reqLanguage:: ', reqLanguage);

		if (!reqCustomer) {
			BaseController.extFatalError(req, resp, "CUSTOMER_ID_MISSING");
			return;
		}

		if (!reqCurrency) {
			BaseController.extFatalError(req, resp, "CURRENCY_CODE_MISSING");
			return;
		}

		if (!reqLanguage) {
			resp.json({ error: "LANGUAGE_CODE_MISSING" });
			return;
		}

		let scope = this;
		let foodMenu: FoodMenuBuilder;

		async function getMenu(): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
				return scope.foodMenuDb.getMenu(reqCustomer, reqLanguage)
							.then((menuBuilder: FoodMenuBuilder) => {
								resolve(menuBuilder)
							}).catch(err => {
						reject(err);
					});
			});
		}

		async function convertCurrency(menuBuilder: FoodMenuBuilder): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
				return scope.priceConverter.convertCurrency(reqCurrency, menuBuilder)
							.then(() => {
								resolve(menuBuilder)
							}).catch(err => {
						reject(err);
					});
			});
		}

		async function translateMenu(menuBuilder: FoodMenuBuilder): Promise<FoodMenuBuilder> {
			return new Promise((resolve, reject) => {
			});
		}

		async function compileMenu(): Promise<void> {
			foodMenu = await getMenu();
			convertCurrency(foodMenu);
		}

		compileMenu().then(() => {
			try {
				resp.json(foodMenu.getData());

			}
			catch (err) {
				Logger.logError("getFullMenu :: compileMenu :: error ::", err);
				resp.json({ erro: 684 });
			}
		});
	}
}
