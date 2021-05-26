"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleTranslateApi = exports.TranslateResult = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const translate = require('@vitalets/google-translate-api');
class TranslateResult {
    constructor(text, autoCorrected) {
        this.text = text;
        this.autoCorrected = autoCorrected;
    }
}
exports.TranslateResult = TranslateResult;
class GoogleTranslateApi {
    constructor() { }
    translate(text, fromCode, toCode) {
        return new Promise((resolve, reject) => {
            translate(text, { from: fromCode, to: toCode }).then(res => {
                let transRes = new TranslateResult(res.text, res.from.text.autoCorrected);
                console.log(res);
                console.log(res.text);
                console.log(res.from.text.autoCorrected);
                console.log(res.from.text.value);
                console.log(res.from.text.didYouMean);
                resolve(transRes);
            }).catch(err => {
                cli_logger_1.Logger.logError("GoogleTranslateApi :: translate ::", err);
                reject(err);
            });
        });
    }
}
exports.GoogleTranslateApi = GoogleTranslateApi;
