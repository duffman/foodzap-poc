"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayapiSmsProvider = void 0;
const request = require("request");
class GatewayapiSmsProvider {
    constructor() {
    }
    sendMessage(sender, recipient, body) {
        return new Promise((resolve, reject) => {
            request.post({
                url: 'https://gatewayapi.com/rest/mtsms',
                oauth: {
                    consumer_key: 'OCCpv-M3s5BN3qzgqHsCNW-T',
                    consumer_secret: 'vB-XFC.Dy&iDa4z&W3ZPWd8p8(Acu)Cqm6U&Lqs4',
                },
                json: true,
                body: {
                    sender: 'ExampleSMS',
                    message: 'Hello World',
                    recipients: [{ msisdn: +460708633007 }],
                },
            }, function (err, r, body) {
                console.log(err ? err : body);
            });
        });
    }
}
exports.GatewayapiSmsProvider = GatewayapiSmsProvider;
