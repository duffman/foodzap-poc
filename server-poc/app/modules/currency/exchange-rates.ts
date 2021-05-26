/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

export interface IExchangeRates {
	success?:   boolean;
	timestamp?: number;
	base?:      string;
	date?:      Date;
	rates?:     { [key: string]: number };
}

export interface IPriceConversionResult {
	code: string;
	symbol: string;
	price: number;
}

// Converts JSON strings to/from your types
export class ExchangeRatesConvert {
	public static toIExchangeRates(json: string): IExchangeRates {
		return JSON.parse(json);
	}

	public static iExchangeRatesToJson(value: IExchangeRates): string {
		return JSON.stringify(value);
	}
}
