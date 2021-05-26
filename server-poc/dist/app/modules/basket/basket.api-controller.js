"use strict";
//
// Module Generated by Backend Igniter CLI v[_CLIVERSION_]
// File Created: [_NOW_]
//
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketApiController = void 0;
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
let BasketApiController = class BasketApiController {
    initRoutes(routes) {
        cli_logger_1.Logger.logBlue("BasketApiController :: initRoutes");
        routes.get("/session/basket", this.sessionBasketGet.bind(this));
        routes.post("/session/basket", this.sessionBasketSet.bind(this));
        routes.all("/basket/get", this.basketGet.bind(this));
        routes.all("/basket/add", this.basketAdd.bind(this));
        routes.all("/basket/remove", this.basketRemove.bind(this));
        routes.all("/basket/clear", this.basketClear.bind(this));
    }
    sessionBasketGet(req, resp) {
        cli_logger_1.Logger.logCyan("sessionBasketGet");
        if (!req.session['basket']) {
            req.session['basket'] = {};
        }
        resp.json(req.session['basket']);
        resp.end();
    }
    sessionBasketSet(req, resp) {
        cli_logger_1.Logger.logCyan("sessionBasketSet");
        req.session['basket'] = req.body;
    }
    //
    //
    //
    basketGet(req, resp) {
        cli_logger_1.Logger.logCyan("basketGet");
    }
    basketAdd(req, resp) {
        cli_logger_1.Logger.logCyan("basketAdd");
    }
    basketRemove(req, resp) {
        cli_logger_1.Logger.logCyan("basketRemove");
    }
    basketClear(req, resp) {
        cli_logger_1.Logger.logCyan("basketClear");
    }
};
BasketApiController = __decorate([
    inversify_1.injectable()
], BasketApiController);
exports.BasketApiController = BasketApiController;