"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * December 2019
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
exports.RestaurantController = void 0;
const base_controller_1 = require("@api/base.controller");
const controller_helper_1 = require("@api/controller.helper");
const app_errors_1 = require("@app/app-errors");
const json_helper_1 = require("@app/helpers/json.helper");
const restaurant_service_1 = require("@app/modules/restaurant/services/restaurant.service");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const var_utils_1 = require("@core/utils/var/var-utils");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
let RestaurantController = class RestaurantController extends base_controller_1.BaseController {
    constructor(service) {
        super();
        this.service = service;
        this.baseRoute = "/restaurant";
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    initRoutes(routes) {
        routes.all(this.baseRoute + "/cp", this.testRequest.bind(this));
        routes.all(this.baseRoute, this.getRestaurant.bind(this));
        routes.all(this.baseRoute + "/qrscan", this.getByQrCode.bind(this));
        routes.all(this.baseRoute + "/custid", this.getByCustomerId.bind(this));
        routes.get(this.baseRoute + "/listing/:cityId", this.getListing.bind(this));
        routes.get(this.baseRoute + "/:restId", this.getRestaurantById.bind(this));
        routes.all(this.baseRoute + "/social/:restId", this.getSocialMedia.bind(this));
    }
    testRequest(req, resp) {
        resp.end("testRequest");
    }
    /**
     * Get Restaurant Listing
     * @param req - Request Object
     * @param resp - Response Object
     */
    getListing(req, resp) {
        /*
         let getCityId = req.query.cityId;
         let postCityId = req.body.cityId;

         Logger.logGreen("GET ID ::", getCityId);
         Logger.logCyan("BODY ID ::", postCityId);

         let cityId = 1;
         */
        this.service.getRestaurantListing(req.params.cityId).then(data => {
            resp.json(data);
        }).catch(err => {
            cli_logger_1.Logger.logRed("getRestaurantListing :: error ::", err);
            resp.json(this.reqError(app_errors_1.Errors.REST_API_ERR));
        });
    }
    getRestaurant(req, resp) {
        cli_logger_1.Logger.log('getRestaurant', 'iiiiiiiiii');
        let restId = req.body.id;
        if (!restId) {
            restId = var_utils_1.VarUtils.parseInt(req.params.restId);
        }
        if (!restId) {
            cli_logger_1.Logger.logError("getRestaurant :: id missing", restId);
            this.notFound(req, resp, 'Invalid id');
            return;
        }
        this.echoRestaurantById(restId, req, resp);
    }
    /**
     *
     * @param req - Request Object
     * @param resp - Response Object
     */
    getRestaurantById(req, resp) {
        let restId = var_utils_1.VarUtils.parseInt(req.params.restId);
        if (!restId) {
            cli_logger_1.Logger.logError("getRestaurant :: restId missing", restId);
            this.notFound(req, resp, 'Invalid Restaurant Id');
            return;
        }
        this.echoRestaurantById(restId, req, resp);
    }
    echoRestaurantById(id, req, resp) {
        this.service.getRestaurantById(id).then(res => {
            console.log('getRestaurantById::::', res);
            resp.json(res);
            resp.end();
        }).catch(err => {
            cli_logger_1.Logger.logError("getRestaurantData ::", err);
            this.fatalError(req, resp);
        });
    }
    getByCustomerId(req, resp) {
        cli_logger_1.Logger.log('getByCustomerId ::', req);
        let custId = req.query.id;
        if (!custId) {
            custId = req.body.id;
        }
        if (!custId) {
            cli_logger_1.Logger.logError("getByCustomerId :: Customer ID Missing", custId);
            this.notFound(req, resp, "Invalid Customer ID");
            return;
        }
        this.service.getRestaurantByCustId(custId).then(res => {
            json_helper_1.JsonHelper.echoJson(res, "getByCustomerId");
            if (res) {
                resp.json(res);
            }
            else {
                this.notFound(req, resp, "Customer ID Not Found");
            }
        }).catch(err => {
            cli_logger_1.Logger.logError("ERROR :: getByCustomerId", err);
            this.respError(req, resp, 500, app_errors_1.Errors.REST_API_ERR);
        });
    }
    /**
     * Find Restaurant for a given QR Code
     * @param {e.Request} req
     * @param {e.Response} resp
     */
    getByQrCode(req, resp) {
        console.log('getByQrCode ::', req);
        let qrCode = req.query.code;
        if (!qrCode)
            qrCode = req.body.code;
        if (!qrCode) {
            cli_logger_1.Logger.logError("getByQrCode :: qrCodeMissing", qrCode);
            this.notFound(req, resp, 'Invalid QR Code');
            return;
        }
        this.service.getRestaurantByQrCode(qrCode).then(res => {
            json_helper_1.JsonHelper.echoJson(res, "getRestaurantByQrCode");
            if (res) {
                resp.json(res);
            }
            else {
                cli_logger_1.Logger.logError(`getByQrCode :: Not Found ::`, qrCode);
                this.notFound(req, resp, 'QR Code Not Found');
            }
        }).catch(err => {
            cli_logger_1.Logger.logError("ERROR :: getByQrCode", err);
            this.respError(req, resp, 500, app_errors_1.Errors.REST_API_ERR);
        });
    }
    /**
     * Get Restaurant Social Media Info
     * @param {e.Request} req
     * @param {e.Response} resp
     */
    getSocialMedia(req, resp) {
        let rstId = req.query.rstId;
        if (!rstId) {
            cli_logger_1.Logger.logError("getSocialMedia :: rstId", rstId);
            this.notFound(req, resp, "Restaurant Id missing");
            return;
        }
        this.service.getSocialMedia(rstId).then(res => {
            resp.json(res);
        }).catch(err => {
            cli_logger_1.Logger.logError("getSocialMedia", err);
            this.fatalError(req, resp);
        });
    }
};
RestaurantController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IRestaurantService)),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
exports.RestaurantController = RestaurantController;
