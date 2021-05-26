/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

export interface IUser {
	id          : number;
	name        : string;
	email       : string;
	password    : string;
	customerId? : number;
}

export class User implements IUser{
	constructor(
		public id: number,
		public email: string,
		public name: string,
		public password: string,
		public customerId? : number
		) {
	}
}
