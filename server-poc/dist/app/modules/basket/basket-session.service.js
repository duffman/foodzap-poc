"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketSessionService = void 0;
const session_service_1 = require("@app/services/session.service");
const cli_logger_1 = require("@cli/cli.logger");
const session_basket_1 = require("@modules/basket/session-basket");
class BasketSessionService {
    constructor() {
        this.sessService = new session_service_1.SessionService();
    }
    getSessionBasket(sessId) {
        let result;
        return new Promise((resolve, reject) => {
            return this.sessService.getSession(sessId).then(data => {
                result = data;
                if (!result) {
                    result = new session_basket_1.SessionBasket();
                }
                resolve(result);
            }).catch(err => {
                cli_logger_1.Logger.logError("BasketSessionService :: getSessionBasket", err);
            });
        });
    }
    saveSessionBasket(sessId, basket) {
        //		basket.flash = new SessionFlash(); // Reset the flash message
        return new Promise((resolve, reject) => {
            return this.sessService.saveSession(sessId, basket).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.BasketSessionService = BasketSessionService;
