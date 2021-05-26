/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { inject }               from "inversify";
import { injectable }           from "inversify";
import { LogService }           from "@app/services/log.service";
import { Inf }                  from "@core/interfaces";
import { ActionResult }         from "@models/action-result";
import { IActionResult }        from "@models/action-result";
import { ILanguage }            from "@modules/language/models/language";
import { IDbClient }  from "@zynDb/db-client";
import { SqlIgniter } from "@zynDb/sql-igniter/sql-igniter";

export interface IMenuLangDb {
	addNewLanguage(langData: ILanguage): Promise<IActionResult>
}

@injectable()
export class MenuLangDb implements IMenuLangDb {
	debugLevel = 1;

	constructor(
		@inject(Inf.IDbClient) private dbClient: IDbClient,
		@inject(Inf.ILogService) private logger: LogService
	) {
	}

	/**
	 * Add new Language
	 * @param langData - object representing a language db row
	 */
	public addNewLanguage(langData: ILanguage): Promise<IActionResult> {
		const scope = this;
		return new Promise((resolve, reject) => {
			let actionResult = new ActionResult();

			let query = new SqlIgniter().insert(
				{
					code: langData.code,
					name: langData.name
				},
				'language'
			);

			this.dbClient.query(query).then(res => {
				if (res.success) {
					langData.id       = res.lastInsertId;
					actionResult.data = langData;
					resolve(actionResult);

				}
				else {
					throw new Error("addNewLanguage Failed")
				}

			}).catch(err => {
				reject(err);
			});
		});
	}


}
