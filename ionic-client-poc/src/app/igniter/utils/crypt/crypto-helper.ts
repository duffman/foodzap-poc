/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-06
 */

import * as  bcrypt  from "bcryptjs";

export class CryptoHelper {
	constructor() {}

	public bCryptStr(data: string): string {
		return bcrypt.hashSync('my password', 10);
	}

	public async calcHash(data: string, salt: number): Promise<string> {
		return new Promise((resolve, reject) => {
			bcrypt.hash(data, 10, (err, res) => {
				if (!err) {
					resolve(res);

				} else {
					reject(err);
				}
			});
		});
	}

	public async compare(data: any, compareWith: any): Promise<string> {
		return new Promise((resolve, reject) => {
			bcrypt.compare(data, compareWith, (err, res) => {
				if (!err) {
					resolve(res);

				} else {
					reject(err);
				}
			});
		});
	}
}
