/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export enum PVarType {
	Unknown,
	Null,
	Undefined,
	String,
	Bool,
	Number,
	Array,
	Object
}

export function PVarTypeToStr(pType: PVarType) {
	let result = "Unset";
	switch (pType) {
		case PVarType.Unknown:
			result = "[Unknown]";
			break;
		case PVarType.Undefined:
			result = "[Undefined]";
			break;
		case PVarType.Null:
			result = "[Null]";
			break;
		case PVarType.String:
			result = "[String]";
			break;
		case PVarType.Bool:
			result = "[Bool]";
			break;
		case PVarType.Number:
			result = "[Number]";
			break;
		case PVarType.Array:
			result = "[Array]";
			break;
		case PVarType.Object:
			result = "[Object]";
			break;
	}

	return result;
}

export module PValueTypeNames {
	export const String = "string";
	export const Number = "number";
	export const Bool = "boolean";
	export const Object = "object";
}

