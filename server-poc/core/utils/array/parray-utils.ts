/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import {PStrUtils} from '@core/utils/str/pstr-utils';

export class PArrayUtils {

	/**
	 * Iterates through given array including child/sub arrays
	 * looking for non empty values,
	 * @param {Array<any>} arr
	 * @returns {boolean}
	 */
	public static arrHaveChildValue(arr: Array<any>): boolean {
		for (let i = 0; i < arr.length; i++) {
			let child = arr[i];

			if (child instanceof Array) {
				PArrayUtils.arrHaveChildValue(child);
			} else {
				if (!PStrUtils.isEmpty(child)) {
					return true;
				}
			}
		}
		return false;
	}


}
