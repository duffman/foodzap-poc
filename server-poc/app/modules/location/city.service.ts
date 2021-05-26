/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Created: 2020-03-25 22:55
 */

import { inject, injectable }              from 'inversify';
import { DbClient }                        from "@zynDb/db-client";
import { Logger }                          from "@cli/cli.logger";
import { IDbResult }                       from "@zynDb/db-result";

export interface ICityService {}

@injectable()
export class CityService implements ICityService {
	constructor(@inject("IDbClient") private dbKernel: DbClient) {}

	public getCitiesByCountryCode(code: string): Promise<IDbResult> {
		let sql = "SELECT * FROM cities WHERE country_code = 'SE' AND city_code = 'SVALL'"; //new SqlIgniter().get("cities").where("country_code", id).toSQL();

		return new Promise((resolve, reject) => {
			this.dbKernel.query(sql).then(res => {

				console.log("RESULT :::::", res);
				/*
				let utils = new Array<any>();

				for (let row of res.resultSet) {
					let drow = {
						id: row.asNum("id"),
						countryCode: row.asStr("country_code"),
						field: row.asStr("field"),
						cityCode: row.asStr("city_code"),
					};

					utils.push(drow);
				}
				*/

				resolve(res);
			}).catch(err => {
				Logger.logError("CitiesService", err);
				reject(err);
			});
		});
	}
}
