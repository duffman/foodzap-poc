/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */

import { Logger }             from "@cli/cli.logger";
import { FoodMenuBuilder }    from "@modules/food-menu/food-menu-builder";
import { GoogleTranslateApi } from "@modules/google-translate/google-translate-api";
import { injectable }         from "inversify";

export interface IFMLangTranslator {
	translateMenu(menuBuilder: FoodMenuBuilder,
		fromLangCode: string,
		toLangCodes: string): Promise<void>;
}

@injectable()
export class FMLangTranslator implements IFMLangTranslator {
	private googleApi: GoogleTranslateApi;

	constructor() {
		this.googleApi = new GoogleTranslateApi();
	}

	public translateMenu(
		menuBuilder: FoodMenuBuilder,
		fromLangCode: string,
		toLangCodes: string
	): Promise<void> {
		let scope = this;

		function translate(text: string): Promise<string> {
			return new Promise((resolve, reject) => {
				scope.googleApi.translate(text, fromLangCode, toLangCodes)
					 .then(res => {
						 resolve(res.text);
					 }).catch(err => {
					reject(err);
				});
			});
		}

		async function execute(): Promise<void> {
			for (let cat of menuBuilder.categories) {
				let transCatName = await translate(cat.name);
				let transCatDesc = await translate(cat.description);

				Logger.logPurple("Translated Cat ::", transCatName);
				Logger.logPurple("Translated Desc ::", transCatDesc);

				//
				// Iterate Menu Items
				//
				for (let menuItem of cat.items) {
				}
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				resolve();
			}).catch(err => {
				Logger.logError("FMLangTranslator :: translateMenu ::", err);
				reject(err);
			})
		});
	}
}
