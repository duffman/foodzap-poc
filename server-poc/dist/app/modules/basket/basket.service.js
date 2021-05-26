"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Created: 2020-03-25 18:21
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
exports.BasketService = void 0;
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const basket_session_service_1 = require("@modules/basket/basket-session.service");
const session_basket_1 = require("@modules/basket/session-basket");
const session_basket_2 = require("@modules/basket/session-basket");
let BasketService = class BasketService {
    constructor(
    // @inject("ILogService") private loggingService: LogService
    // @inject(Interface.BasketSessionService) private basketSessService: BasketSessionService
    ) {
        //TODO: remove
        this.basketSessService = new basket_session_service_1.BasketSessionService();
    }
    saveBasketSession(sessId, session) {
        return new Promise((resolve, reject) => {
            this.basketSessService.saveSessionBasket(sessId, session).then(res => {
                resolve(res);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    getSessionBasket(sessId) {
        // DODO: KegParty this.loggingService.log("getSessionBasket", "sessId", sessId);
        return new Promise((resolve, reject) => {
            this.basketSessService.getSessionBasket(sessId)
                .then(basket => {
                //this.loggingService.log("getSessionBasket", "success", basket);
                resolve(basket);
            })
                .catch(err => {
                cli_logger_1.Logger.logError("getSessionBasket :: err ::", err);
                reject(err);
            });
        });
    }
    clearBasket(sessId) {
        return new Promise((resolve, reject) => {
        });
    }
    clearFlash(sessId) {
        return new Promise((resolve, reject) => {
            this.basketSessService.getSessionBasket(sessId)
                .then(basket => {
                basket.flash = new session_basket_2.SessionFlash();
                cli_logger_1.Logger.logPurple("BasketService :: getSessionBasket ::", sessId);
                return basket;
            })
                .then(basket => {
                this.basketSessService.saveSessionBasket(sessId, basket)
                    .then(res => {
                    return basket;
                })
                    .catch(err => {
                    cli_logger_1.Logger.logError("clearFlash :: saveSessionBasket :: error ::", err);
                    return basket;
                });
                return basket;
            })
                .then(basket => {
                resolve(basket);
            })
                .catch(err => {
                cli_logger_1.Logger.logError("getSessionBasket :: err ::", err);
                reject(err);
            });
        });
    }
    ensureBasket(sessionBasket) {
        if (!sessionBasket) {
            sessionBasket = new session_basket_1.SessionBasket();
            console.log("ensureBasket :: Creating new SessionBasket");
        }
        return sessionBasket;
    }
    /**
     * Add new Vendor bid to session basket
     * @param sessId
     * @param product
     */
    addToBasket(sessId, product) {
        function prepStr(data) {
            // utils = PStrUtils.replaceEx(utils, '"', '\"');
            // utils = PStrUtils.replaceEx(utils, "'", "\'");
            // return SqlString.escape(utils);
            return data;
        }
        console.log("BasketService :: addToBasket :: product ::", product);
        return new Promise((resolve, reject) => {
            this.getSessionBasket(sessId)
                .then(sessionBasket => {
                console.log("getSessionBasket :: product :: fieldType ::", typeof product);
                let itemTitle = prepStr(product.name);
                sessionBasket.flash = new session_basket_2.SessionFlash();
                // Tag the session with info for new item utils
                sessionBasket.flash.addItemName = itemTitle;
                sessionBasket.productData.push(product);
                //let result = this. addToVendorBasket(sessionBasket, resultItem);
                //
                // TODO: Figure out what to do if session save fails
                //
                this.basketSessService.saveSessionBasket(sessId, sessionBasket)
                    .then(res => {
                    cli_logger_1.Logger.logPurple("saveSessionBasket :: sessId ::", sessId);
                })
                    .catch(err => {
                    cli_logger_1.Logger.logError("saveSessionBasket :: err ::", err);
                });
            })
                .catch(err => {
                cli_logger_1.Logger.logError("addToBasket ::", err);
                reject();
            });
        });
    }
    /**
     *
     * @param itemId
     * @param basket
     */
    removeProductData(itemId, basket) {
        let result = false;
        return new Promise((resolve, reject) => {
            try {
                basket.productData = !(basket.productData)
                    ? new Array() : basket.productData;
                for (let i = 0; i < basket.productData.length; i++) {
                    let product = basket.productData[i];
                    if (product.id === itemId) {
                        console.log(">>> FOUND PROD TO REMOVE ::", itemId);
                        basket.productData.splice(i, 1);
                        result = true;
                        break;
                    }
                }
                resolve(result);
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
    /**
     * Remove item by barcode from all vendor baskets
     * @param {string} sessId
     * @param {number} itemId
     * @param {ISessionBasket} basket
     */
    removeFromBasket(itemId, basket = null) {
        let result = false;
        return new Promise((resolve, reject) => {
            console.log("removeBaskets :: removeProductData");
            basket.productData = !(basket.productData) ? new Array() : basket.productData;
            try {
                for (let i = 0; i < basket.productData.length; i++) {
                    let item = basket.productData[i];
                    if (item.id === itemId) {
                        console.log(">>> FOUND ITEM TO REMOVE ::", item);
                        basket.productData.splice(i, 1);
                        result = true;
                        break;
                    }
                }
                resolve(result);
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
};
BasketService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BasketService);
exports.BasketService = BasketService;
