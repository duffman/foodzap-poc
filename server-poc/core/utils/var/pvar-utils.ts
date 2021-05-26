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

import { CliCommander }    from '@cli/cli.commander';
import { PValueTypeNames } from '@core/utils/var/pvar-types';
import { PVarType }        from '@core/utils/var/pvar-types';

const UNDEF = undefined || null;

export class PVarUtils {

	public static isNothing(value: any): boolean {
		return value ? true: false;
	}

	public static isNullOrUndefined(value: any): boolean {
		return value === null || value === undefined;
	}

	public static isNumber(value: any): boolean {
		return typeof value === "number";
	}

	public static isValidNumber(value: any): boolean {
		let result = false;
		if (value !== null) {
			let strVal = value.toString();
			let numVal = parseFloat(strVal);

			result = PVarUtils.isNumber(numVal);
		}

		return result;
	}


	public static isBoolFalse(value: any): boolean {
		return value ? true: false;
	}

	public static checkTypeOf(value: any): PVarType {
		let result = PVarType.Unknown;
		let instName = typeof value;

		switch (instName) {
			case PValueTypeNames.String:
				result = PVarType.String;
				break;
			case PValueTypeNames.Number:
				result = PVarType.Number;
				break;
			case PValueTypeNames.Bool:
				result = PVarType.Bool;
				break;
			case PValueTypeNames.Object:
				result = PVarType.Object;
				break;
			default:
				result = PVarType.Unknown;
				break;
		}

		return result;
	}

	public static getRefType(value: any): PVarType {
		let result = PVarUtils.checkTypeOf(value);

		if (result === PVarType.Object) {
			if (value == null) {
				result = PVarType.Null;
			}

			if (value == UNDEF) {
				result = PVarType.Null;
			}

			if (value instanceof Array) {
				result = PVarType.Array;
			}

			if (value instanceof String) {
				result = PVarType.String;
			}

			if (value instanceof Number) {
				result = PVarType.Number;
			}

			if (value instanceof Boolean) {
				result = PVarType.Bool;
			}
		}

		return result;
	}

	/**
	 * Convenience that checks both Val and Ref types
	 * @param value
	 * @returns {PVarType}
	 */
	public static getVarType(value: any): PVarType {
		let result = PVarUtils.checkTypeOf(value);

		// In case this was a value fieldType, check the instance fieldType
		if (result == PVarType.Object) {
			result = PVarUtils.getRefType(value);
		}

		//console.log("\n\n### getVarType :: ", PVarTypeToStr(result) + "\n\n");

		return result;
	}

	public static noValue(input: any): boolean {
		return false;
	}
}

if (CliCommander.haveArgs()) {
	console.log("OUTSIDE CODE EXECUTING");
	console.log("Test1 ::", PVarUtils.isNumber("123"));
	console.log("Test2 ::", PVarUtils.isNumber(null));
	console.log("Test3 ::", PVarUtils.isNumber(123.34));
	console.log("Test4 ::", PVarUtils.isNumber(1));
}
