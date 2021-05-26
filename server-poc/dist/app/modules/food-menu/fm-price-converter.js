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
exports.FmPriceConverter = void 0;
const interfaces_1 = require("@core/interfaces");
const inversify_1 = require("inversify");
const currency_data_1 = require("@models/currency-data");
const fixer_endpoint_1 = require("@modules/currency/api/fixer-endpoint");
const fm_db_1 = require("@modules/food-menu/fm.db");
const cli_logger_1 = require("@cli/cli.logger");
const currency_converter_1 = require("@modules/currency/currency-converter");
let FmPriceConverter = class FmPriceConverter {
    constructor(fixerEndpoint, currencyConvert, foodMenuDb) {
        this.fixerEndpoint = fixerEndpoint;
        this.currencyConvert = currencyConvert;
        this.foodMenuDb = foodMenuDb;
    }
    convertFoodMenu(menuBuilder, toCurrency, exchangeRates) {
        let scope = this;
        /**
         * Return the rate for a given id
         * @param currencyCode
         */
        function getRate(currencyCode) {
            let result = -1;
            for (let rate in exchangeRates.rates) {
                if (currencyCode === rate) {
                    result = exchangeRates.rates[rate];
                    break;
                }
            }
            return result;
        }
        function convertPrice(currencyCode, price) {
            let result = -1;
            let ratePrice = getRate(currencyCode);
            //
            // First convert the currency to the base price (EUR)
            //
            let priceBase = price / ratePrice;
            //
            // Get the rate of the currency we are converting to
            //
            let targetRate = getRate(toCurrency);
            return Math.round(priceBase * targetRate);
        }
        /**
         * Retrieve currency info from database
         * @param currencyCode
         */
        function getCurrencyData(currencyCode) {
            return new Promise((resolve, reject) => {
                scope.foodMenuDb.getCurrencyData(currencyCode).then(res => {
                    let dbRow = res.safeGetFirstRow();
                    let model = null;
                    if (!dbRow.isEmpty) {
                        model = new currency_data_1.CurrencyDataModel(dbRow.asStr("name"), dbRow.asStr("code"), dbRow.asStr("symbol"));
                    }
                    resolve(model);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        /**
         * Execute currency conversion
         */
        async function execute() {
            for (let cat of menuBuilder.categories) {
                cli_logger_1.Logger.logPurple("Category ::", cat.name);
                //
                // Iterate Menu Items
                //
                for (let menuItem of cat.items) {
                    //
                    // If TO and FROM currency are the same, skip...
                    //
                    if (menuItem.code === toCurrency) {
                        continue;
                    }
                    let convertedPrice = convertPrice(menuItem.code, menuItem.price);
                    // Get TO Currency info in order to populate
                    //  item with id and symbol
                    let currencyModel = await getCurrencyData(toCurrency);
                    if (currencyModel !== null) {
                        menuItem.code = currencyModel.name;
                        menuItem.symbol = currencyModel.symbol;
                        menuItem.price = convertedPrice;
                    }
                }
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                resolve();
            });
        });
    }
    convertCurrency(toCurrency, menuBuilder) {
        return new Promise((resolve, reject) => {
            this.fixerEndpoint.fetchLatestDebug().then((rates) => {
                this.convertFoodMenu(menuBuilder, toCurrency, rates).then(() => {
                    resolve();
                });
            }).catch(err => {
                reject(err);
            });
        });
    }
};
FmPriceConverter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IFixerEndpoint)),
    __param(1, inversify_1.inject(interfaces_1.Inf.ICurrencyConverter)),
    __param(2, inversify_1.inject(interfaces_1.Inf.IFoodMenuDb)),
    __metadata("design:paramtypes", [fixer_endpoint_1.FixerEndpoint,
        currency_converter_1.CurrencyConverter,
        fm_db_1.FoodMenuDb])
], FmPriceConverter);
exports.FmPriceConverter = FmPriceConverter;
