"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
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
exports.LocationController = void 0;
const base_controller_1 = require("@api/base.controller");
const inversify_1 = require("inversify");
const controller_helper_1 = require("@api/controller.helper");
const city_service_1 = require("@modules/location/city.service");
const cli_logger_1 = require("@cli/cli.logger");
let LocationController = class LocationController extends base_controller_1.BaseController {
    constructor(cityService) {
        super();
        this.cityService = cityService;
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    initRoutes(routes) {
        routes.all("/nearby", this.getNearby.bind(this));
        routes.all("/cities", this.getCities.bind(this));
    }
    getCities(req, resp) {
        let cityId = req.query.cityId;
        this.cityService.getCitiesByCountryCode("SE").then(res => {
            cli_logger_1.Logger.logDebugCaller(this, "getCitiesByCountryCode", res);
            resp.json(res.jsonResult.result);
        }).catch(err => {
            this.fatalError(req, resp);
        });
    }
    getNearby(req, resp) {
    }
};
LocationController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("ICityService")),
    __metadata("design:paramtypes", [city_service_1.CityService])
], LocationController);
exports.LocationController = LocationController;
