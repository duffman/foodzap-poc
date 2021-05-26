"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMLangTranslator = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const google_translate_api_1 = require("@modules/google-translate/google-translate-api");
const inversify_1 = require("inversify");
let FMLangTranslator = class FMLangTranslator {
    constructor() {
        this.googleApi = new google_translate_api_1.GoogleTranslateApi();
    }
    translateMenu(menuBuilder, fromLangCode, toLangCodes) {
        let scope = this;
        function translate(text) {
            return new Promise((resolve, reject) => {
                scope.googleApi.translate(text, fromLangCode, toLangCodes)
                    .then(res => {
                    resolve(res.text);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function execute() {
            for (let cat of menuBuilder.categories) {
                let transCatName = await translate(cat.name);
                let transCatDesc = await translate(cat.description);
                cli_logger_1.Logger.logPurple("Translated Cat ::", transCatName);
                cli_logger_1.Logger.logPurple("Translated Desc ::", transCatDesc);
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
                cli_logger_1.Logger.logError("FMLangTranslator :: translateMenu ::", err);
                reject(err);
            });
        });
    }
};
FMLangTranslator = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FMLangTranslator);
exports.FMLangTranslator = FMLangTranslator;
