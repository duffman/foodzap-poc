/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *

import { IDbController }          from './db.controller';
import { DbClient }               from '@zynDb/db-client';

export class LoggingDb implements IDbController {
	tableName: string = "log";
	db: DbClient;

	constructor() {
		this.db = new DbClient();
	}

	public clearLog(): Promise<boolean> {
		let sql = `DELETE FROM ${this.tableName}`;
		return null; //this.db.dbQuery(sql);
	}

	public doLog(section: string, prefix: string, value: any, code: number = 0): Promise<boolean> {

		let valStr = "";

		if (typeof value === "object") {
			valStr = JSON.stringify(value);
		} else {
			valStr = value as string;
		}

		return new Promise((resolve, reject) => {
			let sql = `REPLACE INTO ${this.tableName} (id, section, prefix, value, code) VALUES (NULL, '${section}', '${prefix}', '${valStr}', '${code}');`;

			return new Promise((resolve, reject) => {
				this.db.query(sql).then(res => {
					resolve(true);
				}).catch(err => {
					// Do not throw, just resolve and forget
					resolve(false);
				});
			});
		});
	}
}
*/
