/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { Inf }                from "@core/interfaces";
import { inject, injectable } from 'inversify';
import { CurrencyDataModel }  from '@models/currency-data';
import { ICurrencyDataModel } from '@models/currency-data';
import { FixerEndpoint }      from '@modules/currency/api/fixer-endpoint';
import { IExchangeRates }     from '@modules/currency/exchange-rates';
import { FoodMenuDb }         from '@modules/food-menu/fm.db';
import { Logger }             from '@cli/cli.logger';
import { CurrencyConverter }  from '@modules/currency/currency-converter';
import { FoodMenuBuilder }    from '@modules/food-menu/food-menu-builder';

export interface IFmPriceConverter {
	convertCurrency(currency: string, menuBuilder: FoodMenuBuilder): Promise<void>;
}

@injectable()
export class FmPriceConverter implements IFmPriceConverter {

	constructor(
		@inject(Inf.IFixerEndpoint) private fixerEndpoint: FixerEndpoint,
		@inject(Inf.ICurrencyConverter) private currencyConvert: CurrencyConverter,
		@inject(Inf.IFoodMenuDb) private foodMenuDb: FoodMenuDb
	) {
	}

	private convertFoodMenu(menuBuilder: FoodMenuBuilder,
							toCurrency: string,
							exchangeRates: IExchangeRates): Promise<void> {
		let scope = this;

		/**
		 * Return the rate for a given id
		 * @param currencyCode
		 */
		function getRate(currencyCode: string): number {
			let result: number = -1;

			for (let rate in exchangeRates.rates) {
				if (currencyCode === rate) {
					result = exchangeRates.rates[rate];
					break;
				}
			}

			return result;
		}

		function convertPrice(currencyCode: string, price: number): number {
			let result: number = -1;

			let ratePrice = getRate(currencyCode);

			//
			// First convert the currency to the base price (EUR)
			//
			let priceBase = price / ratePrice;

			//
			// Get the rate of the currency we are converting to
			//
			let targetRate = getRate(toCurrency);

			return Math.round(priceBase * targetRate);
		}

		/**
		 * Retrieve currency info from database
		 * @param currencyCode
		 */
		function getCurrencyData(currencyCode: string): Promise<ICurrencyDataModel> {
			return new Promise((resolve, reject) => {
				scope.foodMenuDb.getCurrencyData(currencyCode).then(res => {
					let dbRow = res.safeGetFirstRow();
					let model: ICurrencyDataModel = null;

					if (!dbRow.isEmpty) {
						model = new CurrencyDataModel(
							dbRow.asStr("name"),
							dbRow.asStr("code"),
							dbRow.asStr("symbol")
						);
					}

					resolve(model);

				}).catch(err => {
					reject(err);
				});
			});
		}

		/**
		 * Execute currency conversion
		 */
		async function execute(): Promise<void> {
			for (let cat of menuBuilder.categories) {
				Logger.logPurple("Category ::", cat.name);

				//
				// Iterate Menu Items
				//
				for (let menuItem of cat.items) {
					//
					// If TO and FROM currency are the same, skip...
					//
					if (menuItem.code === toCurrency) {
						continue;
					}

					let convertedPrice = convertPrice(menuItem.code, menuItem.price);

					// Get TO Currency info in order to populate
					//  item with id and symbol
					let currencyModel = await getCurrencyData(toCurrency);

					if (currencyModel !== null) {
						menuItem.code = currencyModel.name;
						menuItem.symbol = currencyModel.symbol;
						menuItem.price = convertedPrice;
					}
				}
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				resolve();
			})
		});
	}

	public convertCurrency(toCurrency: string,
						   menuBuilder: FoodMenuBuilder): Promise<void> {
		return new Promise((resolve, reject) => {
			this.fixerEndpoint.fetchLatestDebug().then((rates: IExchangeRates) => {
				this.convertFoodMenu(menuBuilder, toCurrency, rates).then(() => {
					resolve();
				});

			}).catch(err => {
				reject(err);
			});
		});
	}
}
