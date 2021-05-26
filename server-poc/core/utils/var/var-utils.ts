/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-21
 */

export class VarUtils {
	public static isNullOrUndefined(variable: any): boolean {
		return !variable || false || false;
	}

	public static parseInt(value: any): number {
		try {
			return Number.parseInt(value, 2);
		}
		catch (ex) {
			return null
		}
	}
}
