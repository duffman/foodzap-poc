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
exports.CurrencyConverter = void 0;
require("reflect-metadata");
const fixer_endpoint_1 = require("@modules/currency/api/fixer-endpoint");
const inversify_1 = require("inversify");
let CurrencyConverter = class CurrencyConverter {
    constructor(fixerEndpoint) {
        this.fixerEndpoint = fixerEndpoint;
        this.data = {
            "success": true,
            "timestamp": 1580125026,
            "base": "EUR",
            "date": "2020-01-27",
            "rates": {
                "USD": 1.102451,
                "GBP": 0.842606,
                "CAD": 1.453328,
                "SEK": 10.577839
            }
        };
    }
    convert(price, fromCurrency, toCurrency) {
        /*
        let priceBase = price / this.utils.rates.SEK;
        let usd = priceBase * this.utils.rates.USD;
        let cad = priceBase * this.utils.rates.CAD;

        let res = {
            id: "USD",
            symbol: "$",
            price: usd
        };

        console.log('RES ::', res);

        return res;
        */
    }
};
CurrencyConverter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IFixerEndpoint")),
    __metadata("design:paramtypes", [fixer_endpoint_1.FixerEndpoint])
], CurrencyConverter);
exports.CurrencyConverter = CurrencyConverter;
