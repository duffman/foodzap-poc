/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */

export class SmsGatewayUtils {

	/**
	 * Format mobile number to include country code (if not provided)
	 * and stripping the first ZERO
	 * @param {string} number
	 * @returns {string}
	 */
	public static prepNumber(number: string): string {
		let result = number;

		if (number.startsWith('+')) {

		}

		return result;
	}
}

console.log('SmsGatewayUtils --------------\n\n');

let number = '+46708633007'
let prepNumber = SmsGatewayUtils.prepNumber(number);

console.log('prepNumber ::', prepNumber);
