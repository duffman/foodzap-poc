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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixerEndpoint = void 0;
require("reflect-metadata");
const exchange_rates_1 = require("@modules/currency/exchange-rates");
const inversify_1 = require("inversify");
const inet_utils_1 = require("@core/utils/inet/inet-utils");
const cli_logger_1 = require("@cli/cli.logger");
let FixerEndpoint = class FixerEndpoint {
    constructor() {
        this.debugData = {
            "success": true,
            "timestamp": 1580161325,
            "base": "EUR",
            "date": new Date(),
            "rates": {
                "USD": 1.101953,
                "AUD": 1.629992,
                "GBP": 0.843983,
                "SEK": 10.601216,
                "NOK": 10.07748,
                "DKK": 7.472651
            }
        };
        this.apiKey = "de6c03e7d259ae4baf8cfe76393ae4ff";
        this.endpoint = `http://data.fixer.io/api/latest?access_key=${this.apiKey}&base=USD&symbols=GBP,JPY,EUR`;
    }
    /**
     * Resolve static exchange rates
     */
    fetchLatestDebug() {
        return new Promise((resolve, reject) => {
            resolve(this.debugData);
        });
    }
    /**
     * Get currency exchange rates
     */
    fetchLatest() {
        return new Promise((resolve, reject) => {
            inet_utils_1.InetUtils.getHttp(this.endpoint).then(res => {
                cli_logger_1.Logger.logCyan("fetchLatest ::", res);
                let data = exchange_rates_1.ExchangeRatesConvert.toIExchangeRates(res);
                resolve(data);
            }).catch(err => {
                cli_logger_1.Logger.logError("fetchLatest :: err ::", err);
            });
        });
    }
};
FixerEndpoint = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FixerEndpoint);
exports.FixerEndpoint = FixerEndpoint;
