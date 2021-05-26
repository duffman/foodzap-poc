/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-09-08
 */

import * as bcrypt from "bcrypt";

export class AuthBCrypt {
	private debugMode: boolean = false;
	private static _instance: AuthBCrypt;
	public saltRounds: number = 10;

	constructor() {}

	log(...data: any[]): void {
		if (this.debugMode) {
			console.log(data);
		}
	}

	/**
	 * Simple singleton implementation, added to provide a shortcut
	 * during brute-force development, not in live production.
	 * @returns {AuthApi}
	 */
	public static instance(): AuthBCrypt {
		if (!AuthBCrypt._instance) {
			AuthBCrypt._instance = new AuthBCrypt();
		}
		return AuthBCrypt._instance;
	}

	public setDebugMode(value: boolean = true): void {
		this.debugMode = value;
	}

	/**
	 * Generate bcrypt hash from a plaintext password
	 * @param {string} inputPass
	 * @param {number} saltRounds
	 * @returns {Promise<string>}
	 */
	public genPassCrypt(plainPassword: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this.log(`Generating password from "${plainPassword}"`);
			bcrypt.hash(plainPassword, this.saltRounds).then((value: string) => {
				this.log(`Resulting password hash "${value}"`);
				resolve(value);
			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Compare a given plaintext password with a pre generated bcrypt hash
	 * @param {string} plainPassword
	 * @param {string} passwordHash
	 * @returns {Promise<boolean>}
	 */
	public compare(plainPassword: string, passwordHash: string): Promise<boolean> {
		return new Promise((resolve) => {
			this.log(`Comparing "${plainPassword}" with "${passwordHash}"`);
			bcrypt.compare(plainPassword, passwordHash).then((success: boolean) => {
				this.log(`Comparison result "${success}"`);
				resolve(success);
			});
		});
	}
}
