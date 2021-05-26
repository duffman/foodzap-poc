/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */

import { Logger }                          from "@cli/cli.logger";
const translate = require('@vitalets/google-translate-api');

export class TranslateResult {
	constructor(public text: string,
				public autoCorrected: boolean) {}
}

export class GoogleTranslateApi {
	constructor() {}

	public translate(text: string, fromCode: string, toCode: string): Promise<TranslateResult> {
		return new Promise((resolve, reject) => {
			translate(text, {from: fromCode, to: toCode}).then(res => {
				let transRes = new TranslateResult(
					res.text,
					res.from.text.autoCorrected
				);

				console.log(res);
				console.log(res.text);
				console.log(res.from.text.autoCorrected);
				console.log(res.from.text.value);
				console.log(res.from.text.didYouMean);

				resolve(transRes);

			}).catch(err => {
				Logger.logError("GoogleTranslateApi :: translate ::", err);
				reject(err);
			});
		});
	}
}
