"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyController = void 0;
const fixer_endpoint_1 = require("@modules/currency/api/fixer-endpoint");
const currency_converter_1 = require("@modules/currency/currency-converter");
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const controller_helper_1 = require("@api/controller.helper");
let CurrencyController = class CurrencyController {
    constructor(fixerEndpoint, currencyConverter, debugMode = true) {
        this.fixerEndpoint = fixerEndpoint;
        this.currencyConverter = currencyConverter;
        this.debugMode = debugMode;
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    initRoutes(routes) {
        routes.all("/currency/latest", this.getLatest.bind(this));
    }
    getLatest(req, resp) {
        this.fixerEndpoint.fetchLatest().then(res => {
            cli_logger_1.Logger.logPurple("fetchLatest ::", res);
        }).catch(err => {
            cli_logger_1.Logger.logError("fetchLatest :: err ::", err);
        });
    }
};
CurrencyController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IFixerEndpoint")),
    __param(1, inversify_1.inject("ICurrencyConverter")),
    __metadata("design:paramtypes", [fixer_endpoint_1.FixerEndpoint,
        currency_converter_1.CurrencyConverter, Boolean])
], CurrencyController);
exports.CurrencyController = CurrencyController;
