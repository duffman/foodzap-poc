/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-05
 */

export interface IUserData {
	id: number;
	name: string;
	email: string;
	password: string;
	customerId?: number;
}

export interface ILoginData {
	success: boolean,
	user: IUserData;
}

export interface ILoginResult {
	success: boolean;
	errCode: number;
	errMess: string;
	data: ILoginData;
}

export class LoginResult implements ILoginResult {
	constructor(
		public errCode: number  = -1,
		public errMess: string  = '',
		public success: boolean = false,
		public data: any        = null
	) {
	}
}
