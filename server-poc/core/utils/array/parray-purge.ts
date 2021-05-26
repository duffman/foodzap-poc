/*=--------------------------------------------------------------=

 PutteTSNode - Yet Another Typescript Utilities Collection

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman
 Date   : 2018-11-01

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =----------------------------------------------------------------= */

import { PStrUtils }              from '@core/utils/str/pstr-utils';
import { PVarUtils }              from '@core/utils/var/pvar-utils';
import { PVarType, PVarTypeToStr} from '@core/utils/var/pvar-types';
import { PArrayUtils }            from '@core/utils/array/parray-utils';

export class PArrayPurge {

	/**
	 * Remove null elements
	 * @param {Array<any>} input array
	 * @returns {any[]} - resulting array
	 */
	public arrPurgeNull(arr: Array<any>): Array<any> {
		let result = arr.filter((element) => {
			return element != null;
		});
		return result;
	}

	/**
	 * Remove elements which are nada or empty string
	 * @param {Array<any>} input array
	 * @returns {any[]} - resulting array
	 */
	public static arrPurgeNullOrEmpty(arr: Array<any>): Array<any> {
		let result = arr.filter((element) => {
			return PStrUtils.isEmpty(element);
		});
		return result;
	}

	/**
 	 * Remove elements which are null, undefined, empty...
	 * @param {Array<any>} arr
	 * @param {boolean} purgeNullArrays - if set arrays containing only null values
	 *                                    (including child arrays will be purged
	 * @param {boolean} purgeBool - if set - false bool values will be purged
	 * @returns {Array<any>}
	 */
	public static purge(arr: Array<any>, purgeNullArrays: boolean = true, purgeBool: boolean = false): Array<any> {
		function doPurge(value: any) {
			let purge = false;
			let valType = PVarUtils.getVarType(value);

			console.log("valType ::", PVarTypeToStr(valType));

			switch (valType) {
				case PVarType.Null:
					purge = true;
					console.log("Null :: qualify ::", purge);
					break;
				case PVarType.Undefined:
					purge = true;
					console.log("Undefined :: qualify ::", purge);
					break;
				case PVarType.String:
					purge = (value as string).length === 0;
					console.log("String :: purge ::", purge);
					break;
				case PVarType.Number:
					purge = (value as number) < 0;
					console.log("DBG::", (value as number));
					console.log("Number :: qualify ::", purge);
					break;
				case PVarType.Bool:
					purge = purgeBool && !(value as boolean);
					console.log("Bool :: purge ::", purge);
					break;
				case PVarType.Array:
					let arrVal = (value as Array<any>);
					purge = (arrVal.length === 0) ||
						(purgeNullArrays && !PArrayUtils.arrHaveChildValue(arrVal));

					console.log("\n###Array :: purge ::", purge);
					break;
			}

			return !purge;
		}

		let result = arr.filter((element) => {
			return doPurge(element);
		});

		return result;
	}
}
