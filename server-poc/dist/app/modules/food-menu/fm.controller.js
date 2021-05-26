"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
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
exports.FoodMenuController = void 0;
const base_controller_1 = require("@api/base.controller");
const controller_helper_1 = require("@api/controller.helper");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const fm_price_converter_1 = require("@modules/food-menu/fm-price-converter");
const fm_db_1 = require("@modules/food-menu/fm.db");
const inversify_1 = require("inversify");
let FoodMenuController = class FoodMenuController {
    constructor(foodMenuDb, priceConverter) {
        this.foodMenuDb = foodMenuDb;
        this.priceConverter = priceConverter;
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    initRoutes(routes) {
        routes.get("/mnudbg", this.mnudbg.bind(this));
        routes.get("/restaurant/menu/:id", this.getRestaurantMenu.bind(this));
    }
    mnudbg(req, resp) {
    }
    /**
     * Get full food menu
     * @param req
     * @param resp
     */
    getRestaurantMenu(req, resp) {
        let reqId = Number.parseInt(req.params.id);
        let reqCurrency = req.query.currency;
        let reqLanguage = req.query.language;
        cli_logger_1.Logger.logCyan('reqCurrency:: ', reqCurrency);
        cli_logger_1.Logger.logCyan('reqCurrency:: ', reqCurrency);
        cli_logger_1.Logger.logCyan('reqLanguage:: ', reqLanguage);
        if (!reqId) {
            resp.json({ error: "MENU_ID_MISSING" });
            return;
        }
        if (!reqCurrency) {
            reqCurrency = "SEK";
        }
        if (!reqLanguage) {
            reqLanguage = 1;
        }
        let scope = this;
        let foodMenu;
        async function getMenu() {
            return new Promise((resolve, reject) => {
                return scope.foodMenuDb.getRestaurantMenu(reqId, reqLanguage)
                    .then((menuBuilder) => {
                    resolve(menuBuilder);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function convertCurrency(menuBuilder) {
            return new Promise((resolve, reject) => {
                return scope.priceConverter.convertCurrency(reqCurrency, menuBuilder)
                    .then(() => {
                    resolve(menuBuilder);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function translateMenu(menuBuilder) {
            return new Promise((resolve, reject) => {
            });
        }
        async function compileMenu() {
            foodMenu = await getMenu();
            convertCurrency(foodMenu);
        }
        compileMenu().then(() => {
            try {
                resp.json(foodMenu.getData());
            }
            catch (err) {
                cli_logger_1.Logger.logError("getFullMenu :: compileMenu :: error ::", err);
                resp.json({ erro: 684 });
            }
        });
    }
    /**
     * Get full food menu
     * @param req
     * @param resp
     */
    getFullMenu(req, resp) {
        let reqCustomer = req.query.customer;
        let reqCurrency = req.query.currency;
        let reqLanguage = req.query.language;
        cli_logger_1.Logger.logCyan('reqCurrency:: ', reqCurrency);
        cli_logger_1.Logger.logCyan('reqCurrency:: ', reqCurrency);
        cli_logger_1.Logger.logCyan('reqLanguage:: ', reqLanguage);
        if (!reqCustomer) {
            base_controller_1.BaseController.extFatalError(req, resp, "CUSTOMER_ID_MISSING");
            return;
        }
        if (!reqCurrency) {
            base_controller_1.BaseController.extFatalError(req, resp, "CURRENCY_CODE_MISSING");
            return;
        }
        if (!reqLanguage) {
            resp.json({ error: "LANGUAGE_CODE_MISSING" });
            return;
        }
        let scope = this;
        let foodMenu;
        async function getMenu() {
            return new Promise((resolve, reject) => {
                return scope.foodMenuDb.getMenu(reqCustomer, reqLanguage)
                    .then((menuBuilder) => {
                    resolve(menuBuilder);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function convertCurrency(menuBuilder) {
            return new Promise((resolve, reject) => {
                return scope.priceConverter.convertCurrency(reqCurrency, menuBuilder)
                    .then(() => {
                    resolve(menuBuilder);
                }).catch(err => {
                    reject(err);
                });
            });
        }
        async function translateMenu(menuBuilder) {
            return new Promise((resolve, reject) => {
            });
        }
        async function compileMenu() {
            foodMenu = await getMenu();
            convertCurrency(foodMenu);
        }
        compileMenu().then(() => {
            try {
                resp.json(foodMenu.getData());
            }
            catch (err) {
                cli_logger_1.Logger.logError("getFullMenu :: compileMenu :: error ::", err);
                resp.json({ erro: 684 });
            }
        });
    }
};
FoodMenuController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IFoodMenuDb)),
    __param(1, inversify_1.inject(interfaces_1.Inf.IFmPriceConverter)),
    __metadata("design:paramtypes", [fm_db_1.FoodMenuDb,
        fm_price_converter_1.FmPriceConverter])
], FoodMenuController);
exports.FoodMenuController = FoodMenuController;
