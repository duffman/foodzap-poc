/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-23
 */

export class FmDataValidator {
	public static foodMenusPostData(obj: any): boolean {
		let result = false;
		if (typeof obj === 'object' && obj.postIdent === 'fm-pd') {
			result = true;
		}

		return result;
	}
}
