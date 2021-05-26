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
exports.TranslateController = void 0;
const inversify_1 = require("inversify");
const google_translate_api_1 = require("@modules/google-translate/google-translate-api");
const igniter_controller_1 = require("@core/webcore/igniter.controller");
let TranslateController = class TranslateController extends igniter_controller_1.IgniterController {
    constructor() {
        super();
    }
    initRoutes(routes) {
        routes.all("/translate", this.translate.bind(this));
    }
    translate(req, resp) {
        let api = new google_translate_api_1.GoogleTranslateApi();
        let fromLangCode = req.param('fc');
        let toLangCode = req.param('tc');
        let text = req.param('text');
        let transRes = api.translate(text, fromLangCode, toLangCode).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.json({ error: "trans_error" });
        });
    }
};
TranslateController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], TranslateController);
exports.TranslateController = TranslateController;
