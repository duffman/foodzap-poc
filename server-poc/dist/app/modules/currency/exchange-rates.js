"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRatesConvert = void 0;
// Converts JSON strings to/from your types
class ExchangeRatesConvert {
    static toIExchangeRates(json) {
        return JSON.parse(json);
    }
    static iExchangeRatesToJson(value) {
        return JSON.stringify(value);
    }
}
exports.ExchangeRatesConvert = ExchangeRatesConvert;
