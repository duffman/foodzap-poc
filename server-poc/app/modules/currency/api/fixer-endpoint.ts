/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import "reflect-metadata";
import { IExchangeRates }            from '@modules/currency/exchange-rates';
import { ExchangeRatesConvert }      from '@modules/currency/exchange-rates';
import { injectable } from 'inversify';
import { InetUtils }  from '@core/utils/inet/inet-utils';
import { Logger }     from '@cli/cli.logger';

export interface IFixerEndpoint {
	data: IExchangeRates;
	fetchLatest(): Promise<IExchangeRates>;
	fetchLatestDebug(): Promise<IExchangeRates>;
}

@injectable()
export class FixerEndpoint implements IFixerEndpoint {
	debugData: IExchangeRates  = {
		"success":true,
		"timestamp": 1580161325,
		"base": "EUR",
		"date": new Date(),
		"rates":{
			"USD": 1.101953,
			"AUD": 1.629992,
			"GBP": 0.843983,
			"SEK": 10.601216,
			"NOK": 10.07748,
			"DKK": 7.472651
		}
	};

	apiKey = "de6c03e7d259ae4baf8cfe76393ae4ff";
	endpoint: string = `http://data.fixer.io/api/latest?access_key=${this.apiKey}&base=USD&symbols=GBP,JPY,EUR`;

	public data: IExchangeRates;

	constructor() {}

	/**
	 * Resolve static exchange rates
	 */
	public fetchLatestDebug(): Promise<IExchangeRates> {
		return new Promise((resolve, reject) => {
			resolve(this.debugData);
		});
	}

	/**
	 * Get currency exchange rates
	 */
	public fetchLatest(): Promise<IExchangeRates> {
		return new Promise((resolve, reject) => {
			InetUtils.getHttp(this.endpoint).then(res => {
				Logger.logCyan("fetchLatest ::", res);
				let data = ExchangeRatesConvert.toIExchangeRates(res);
				resolve(data);
			}).catch(err => {
				Logger.logError("fetchLatest :: err ::", err);
			});
		});
	}
}
