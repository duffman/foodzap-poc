/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class StrUtils {
	public static isStr(value: any): boolean {
		return typeof value === 'string';
	}

	/**
	 * Check wheter a string is assigned and has a length
	 * @param str
	 * @returns {boolean}
	 */
	public static isEmpty(str: string) {
		return (str === undefined) || (!str || 0 === str.length);
	}

	public static replaceStr(source: string, find: string, replaceWith: any): string {
		return source.replace(find, String(replaceWith));
	}

	public static isNumeric(val: any): boolean {
		return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
	}

	public static isUndefined(value: any) {
		return value === undefined || value === null;
	}
}
