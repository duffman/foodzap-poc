/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-28
 */

import { injectable }    from "inversify";
import { IActionResult } from "@models/action-result";
import { ActionResult }  from "@models/action-result";

export interface ILogService {
	clear(): Promise<IActionResult>
	// log(section: string, prefix: string, value?: any, code?: number): void;
}

@injectable()
export class LogService implements ILogService {
	tableName: string = "log";

	public clear(): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
			resolve(new ActionResult());
		});
	}

	constructor(
//		@inject(Inf.IDbClient) private dbClient: DbClient
	) {
	}

	/*
	public clear(): Promise<IActionResult> {
		let result = new ActionResult();

		return new Promise((resolve, reject) => {
			let sql = new SqlIgniter().delete(this.tableName);

			this.dbClient.query(sql.toSql()).then(res => {
				if (res.success) {
					result.successful();
				}

			}).catch(err => {
				Logger.logError("LogService :: clearLog", err);
				result.setError(err);
				resolve(result);
			});
		});
	}


	public log(section: string = 'out', prefix: string = 'std', value?: any, code?: number): void {
		let result = new ActionResult();

		let valStr = "";

		if (typeof value === "object") {
			valStr = JSON.stringify(value);
		} else {
			valStr = value as string;
		}

		let sql = `REPLACE INTO ${this.tableName} (section, prefix, value, code) VALUES ('${section}', '${prefix}', '${valStr}', '${code}');`;
		//let sql = new SqlIgniter().delete(this.tableName);

		this.dbClient.query(sql).then(res => {
			if (res.success) {
				result.successful();
			}

		}).catch(err => {
			Logger.logError("LogService :: clearLog", err);
			result.setError(err);
			// resolve(void);
		});
	}
	*/
}
