/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import "reflect-metadata";
import { Logger } from '@cli/cli.logger';
import { FixerEndpoint } from '@modules/currency/api/fixer-endpoint';
import { IExchangeRates, IPriceConversionResult } from '@modules/currency/exchange-rates';
import { inject, injectable }        from 'inversify';

export interface ICurrencyConverter {
}


@injectable()
export class CurrencyConverter implements ICurrencyConverter {
	data = {
		"success":true,
		"timestamp":1580125026,
		"base":"EUR",
		"date":"2020-01-27",
		"rates":{
			"USD":1.102451,
			"GBP":0.842606,
			"CAD":1.453328,
			"SEK":10.577839
		}
	};

	constructor(
		@inject("IFixerEndpoint") private fixerEndpoint: FixerEndpoint
	) {}


	public convert(price: number, fromCurrency: string, toCurrency: string): void {
		/*
		let priceBase = price / this.utils.rates.SEK;
		let usd = priceBase * this.utils.rates.USD;
		let cad = priceBase * this.utils.rates.CAD;

		let res = {
			id: "USD",
			symbol: "$",
			price: usd
		};

		console.log('RES ::', res);

		return res;
		*/
	}
}
