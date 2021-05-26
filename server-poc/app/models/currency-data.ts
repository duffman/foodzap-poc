/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */


export interface ICurrencyDataModel {
	name: string;
	code: string;
	symbol: string;
}

export class CurrencyDataModel implements ICurrencyDataModel{
	constructor(public name: string,
			public code: string,
			public symbol: string) {}
}
