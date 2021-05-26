"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsGatewayUtils = void 0;
class SmsGatewayUtils {
    /**
     * Format mobile number to include country code (if not provided)
     * and stripping the first ZERO
     * @param {string} number
     * @returns {string}
     */
    static prepNumber(number) {
        let result = number;
        if (number.startsWith('+')) {
        }
        return result;
    }
}
exports.SmsGatewayUtils = SmsGatewayUtils;
console.log('SmsGatewayUtils --------------\n\n');
let number = '+46708633007';
let prepNumber = SmsGatewayUtils.prepNumber(number);
console.log('prepNumber ::', prepNumber);
