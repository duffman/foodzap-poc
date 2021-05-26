/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Created: 2020-03-25 18:21
 */

import { IActionResult }        from "@models/action-result";
import { IOrderModel }          from "@modules/order/order.model";
import { injectable }           from "inversify";
import { Logger }               from '@cli/cli.logger';
import { BasketSessionService } from "@modules/basket/basket-session.service";
import { ISessionBasket }       from "@modules/basket/session-basket";
import { SessionBasket }        from "@modules/basket/session-basket";
import { SessionFlash }         from "@modules/basket/session-basket";
import { IFoodMenuItem }        from "@modules/food-menu/models/food-menu-item.type";

export interface IBasketService {
}

@injectable()
export class BasketService implements IBasketService {
	basketSessService: BasketSessionService;

	constructor(
		// @inject("ILogService") private loggingService: LogService
		// @inject(Interface.BasketSessionService) private basketSessService: BasketSessionService
	) {
		//TODO: remove
		this.basketSessService = new BasketSessionService();
	}

	public saveBasketSession(sessId: string, session: ISessionBasket): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.basketSessService.saveSessionBasket(sessId, session).then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	}

	public getSessionBasket(sessId: string): Promise<ISessionBasket> {
		// DODO: KegParty this.loggingService.log("getSessionBasket", "sessId", sessId);

		return new Promise((resolve, reject) => {
			this.basketSessService.getSessionBasket(sessId)
				.then(basket => {
					//this.loggingService.log("getSessionBasket", "success", basket);
					resolve(basket);

				})
				.catch(err => {
					Logger.logError("getSessionBasket :: err ::", err);
					reject(err);
				});
		});
	}

	public clearBasket(sessId: string): Promise<ISessionBasket> {
		return new Promise((resolve, reject) => {
		});
	}

	public clearFlash(sessId: string): Promise<ISessionBasket> {
		return new Promise((resolve, reject) => {
			this.basketSessService.getSessionBasket(sessId)
				.then(basket => {
					basket.flash = new SessionFlash();
					Logger.logPurple("BasketService :: getSessionBasket ::", sessId);

					return basket;

				})
				.then(basket => {
					this.basketSessService.saveSessionBasket(sessId, basket)
						.then(res => {
							return basket;
						})
						.catch(err => {
							Logger.logError("clearFlash :: saveSessionBasket :: error ::", err);
							return basket;
						});

					return basket;

				})
				.then(basket => {
					resolve(basket);

				})
				.catch(err => {
					Logger.logError("getSessionBasket :: err ::", err);
					reject(err);
				});
		});

	}

	private ensureBasket(sessionBasket: ISessionBasket): ISessionBasket {
		if (!sessionBasket) {
			sessionBasket = new SessionBasket();
			console.log("ensureBasket :: Creating new SessionBasket");
		}

		return sessionBasket;
	}

	/**
	 * Add new Vendor bid to session basket
	 * @param sessId
	 * @param product
	 */
	public addToBasket(sessId: string, product: IFoodMenuItem): Promise<boolean> {
		function prepStr(data: string): string {
			// utils = PStrUtils.replaceEx(utils, '"', '\"');
			// utils = PStrUtils.replaceEx(utils, "'", "\'");
			// return SqlString.escape(utils);

			return data;
		}

		console.log("BasketService :: addToBasket :: product ::", product);

		return new Promise((resolve, reject) => {
			this.getSessionBasket(sessId)
				.then(sessionBasket => {
					console.log("getSessionBasket :: product :: fieldType ::", typeof product);

					let itemTitle = prepStr(product.name);

					sessionBasket.flash = new SessionFlash();

					// Tag the session with info for new item utils
					sessionBasket.flash.addItemName = itemTitle;


					sessionBasket.productData.push(product);

					//let result = this. addToVendorBasket(sessionBasket, resultItem);

					//
					// TODO: Figure out what to do if session save fails
					//
					this.basketSessService.saveSessionBasket(sessId, sessionBasket)
						.then(res => {
							Logger.logPurple("saveSessionBasket :: sessId ::", sessId);
						})
						.catch(err => {
							Logger.logError("saveSessionBasket :: err ::", err);
						});

				})
				.catch(err => {
					Logger.logError("addToBasket ::", err);
					reject()
				});
		});
	}

	/**
	 *
	 * @param itemId
	 * @param basket
	 */
	private removeProductData(itemId: number, basket: ISessionBasket): Promise<boolean> {
		let result = false;

		return new Promise((resolve, reject) => {
			try {
				basket.productData = !(basket.productData)
									 ? new Array<IFoodMenuItem>() : basket.productData;

				for (let i = 0; i < basket.productData.length; i++) {
					let product = basket.productData[i];
					if (product.id === itemId) {
						console.log(">>> FOUND PROD TO REMOVE ::", itemId);
						basket.productData.splice(i, 1);
						result = true;
						break;
					}
				}

				resolve(result);

			}
			catch (ex) {
				reject(ex);
			}
		});

	}

	/**
	 * Remove item by barcode from all vendor baskets
	 * @param {string} sessId
	 * @param {number} itemId
	 * @param {ISessionBasket} basket
	 */
	private removeFromBasket(itemId: number, basket: ISessionBasket = null): Promise<boolean> {
		let result = false;

		return new Promise((resolve, reject) => {
			console.log("removeBaskets :: removeProductData");
			basket.productData = !(basket.productData) ? new Array<IFoodMenuItem>() : basket.productData;

			try {
				for (let i = 0; i < basket.productData.length; i++) {
					let item = basket.productData[i];
					if (item.id === itemId) {
						console.log(">>> FOUND ITEM TO REMOVE ::", item);
						basket.productData.splice(i, 1);
						result = true;
						break;
					}
				}

				resolve(result);

			}
			catch (ex) {
				reject(ex);
			}
		});
	}
}
