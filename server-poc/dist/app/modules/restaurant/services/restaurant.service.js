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
exports.RestaurantService = void 0;
const json_helper_1 = require("@app/helpers/json.helper");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const var_utils_1 = require("@core/utils/var/var-utils");
const social_media_model_1 = require("@modules/restaurant/models/social-media.model");
const restaurant_db_1 = require("@modules/restaurant/restaurant.db");
const inversify_1 = require("inversify");
const info_model_1 = require("../models/info.model");
const location_model_1 = require("../models/location.model");
const open_hours_model_1 = require("../models/open-hours.model");
const restaurant_model_1 = require("../models/restaurant.model");
let RestaurantService = class RestaurantService {
    constructor(restaurantDb) {
        this.restaurantDb = restaurantDb;
        this.debugMode = true;
    }
    getRestaurantListing(cityId) {
        let scope = this;
        let err = undefined;
        let result = new Array();
        function getListing() {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantListing(cityId).then(res => {
                    resolve(res);
                }).catch(err => {
                    cli_logger_1.Logger.logError("getRestaurantListing :: error ::", err);
                    reject(err);
                });
            });
        }
        function getRestaurant(rstId) {
            return scope.getRestaurantById(rstId);
        }
        async function getFullListing() {
            try {
                let listing = await getListing();
                let rstList = new Array();
                for (let row of listing.resultSet) {
                    let rstData = await getRestaurant(row.asStr("id"));
                    result.push(rstData);
                }
                console.log("RST LIST ::", result);
            }
            catch (err) {
                cli_logger_1.Logger.logError("Error getting full Listing ::", err);
            }
        }
        return new Promise((resolve, reject) => {
            getFullListing().then(() => {
                if (err !== undefined) {
                    throw err;
                }
                else {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Populate OpenHours model from Database Result
     * @param {IDbResult} dbRes
     * @returns {}
     */
    compileOpenHoursModel(dbRes) {
        let result = new open_hours_model_1.OpenHoursModel();
        if (dbRes === null || dbRes.success === false) {
            cli_logger_1.Logger.logError('compileOpenHoursModel :: dbRes === null');
            return result;
        }
        let openHoursRows = dbRes.result.dataRows;
        /*
         { field: 'id', value: 1 },
         { field: 'restaurant_id', value: 1 },
         { field: 'day', value: 0 },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       4å
         { field: 'open_at', value: '06:00:00' },
         { field: 'close_at', value: '10:00:00' }
         */
        for (let row of openHoursRows) {
            let openAt = row.asStr("open_at");
            let closeAt = row.asStr("close_at");
            let day = row.asInt("day");
            result.addTimeSlot(day, row.asBool("is_open"), openAt, closeAt);
        }
        return result;
    }
    /**
     * Populate Social Media model from Database Result
     * @param {IDbResult} dbRes
     * @returns {SocialMediaModel}
     */
    compileSocialMediaModel(dbRes) {
        let result = new social_media_model_1.SocialMediaModel();
        if (dbRes === null || dbRes.success === false) {
            cli_logger_1.Logger.logError('compileSocialMediaModel :: dbRes === null');
            return result;
        }
        let dataRow = dbRes.safeGetFirstRow();
        if (dataRow.isEmpty === false) {
            result.id = dataRow.asNum("id");
            result.facebook = dataRow.asStr("facebook");
            result.instagram = dataRow.asStr("instagram");
            result.skype = dataRow.asStr("skype");
        }
        return result;
    }
    getSocialMedia(rstId) {
        console.log("getSocialMedia :: rstId ::", rstId);
        return new Promise((resolve, reject) => {
            this.restaurantDb.getSocialMedia(rstId).then(res => {
                resolve(res);
            }).catch(err => {
                if (this.debugMode) {
                    cli_logger_1.Logger.logError("getOpenHours ::", err);
                }
                reject(err);
            });
        });
    }
    /**
     * Retrieve Restaurant data by QR Code
     * @param {string} qrCode
     * @returns {Promise<RestaurantModel>}
     */
    getRestaurantByQrCode(qrCode) {
        const scope = this;
        let result = undefined;
        async function getIdByQrCode() {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantByQrCode(qrCode)
                    .then((res) => {
                    if (res.any()) {
                        console.log("getRestaurantByQrCode ::", res.resultSet);
                        let dataRow = res.safeGetFirstRow();
                        let restaurantId = var_utils_1.VarUtils.parseInt(dataRow.asStr('id'));
                        if (restaurantId) {
                            resolve(restaurantId);
                        }
                        else {
                            resolve(undefined);
                        }
                    }
                    else {
                        console.log("getRestaurantByQrCode :: NOT FOUND ::", qrCode);
                        resolve(undefined);
                    }
                }).catch(err => {
                    resolve(undefined);
                });
            });
        }
        async function execute() {
            let id = await getIdByQrCode();
            if (id) {
                result = await scope.getRestaurantById(id);
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                resolve(result);
            });
        });
    }
    /**
     * Get restaurant by customer id
     * @param {string} custId
     * @returns {Promise<RestaurantModel>}
     */
    getRestaurantByCustId(custId) {
        const scope = this;
        let result = undefined;
        async function getIdByCustId() {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantByCustomerId(custId)
                    .then((res) => {
                    if (res.any()) {
                        console.log("getRestaurantByCustomerId ::", res.resultSet);
                        let dataRow = res.safeGetFirstRow();
                        let restaurantId = var_utils_1.VarUtils.parseInt(dataRow.asStr('id'));
                        if (restaurantId) {
                            resolve(restaurantId);
                        }
                        else {
                            resolve(undefined);
                        }
                    }
                    else {
                        console.log("getRestaurantByCustomerId :: NOT FOUND ::", custId);
                        resolve(undefined);
                    }
                }).catch(err => {
                    resolve(undefined);
                });
            });
        }
        async function execute() {
            let id = await getIdByCustId();
            if (id) {
                result = await scope.getRestaurantById(id);
            }
        }
        return new Promise((resolve, reject) => {
            execute().then(() => {
                resolve(result);
            });
        });
    }
    /**
     * Get full restaurant info by id
     * @param {number} id
     * @returns {Promise<RestaurantModel>}
     */
    getRestaurantById(id) {
        let scope = this;
        let result = undefined;
        //
        // Get Restaurant Info
        //
        function prepImage(image, id) {
            return `coldmind.com:8080/img/restaurants/id_${id}/${image}`;
        }
        //
        // Get Restaurant Info
        //
        function getRestaurantInfo(rstId) {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantById(rstId).then(res => {
                    let row = res.safeGetFirstRow();
                    if (row.isEmpty === false) {
                        let infoModel = new info_model_1.InfoModel();
                        //
                        // Populate models
                        //
                        infoModel.id = row.asNum('id');
                        infoModel.customerId = row.asNum('customer_id');
                        infoModel.homeDelivery = row.asNum('home_delivery');
                        infoModel.qrCode = row.asStr('qr_code');
                        infoModel.name = row.asStr('name');
                        infoModel.description = row.asStr('description');
                        infoModel.websiteUrl = row.asStr('website');
                        infoModel.phoneNr = row.asStr('phone_nr');
                        infoModel.openHoursId = row.asInt('open_hours_id');
                        infoModel.geoLocation = row.asStr('geo_location');
                        infoModel.coverImage = prepImage(row.asStr('cover_image'), infoModel.id);
                        infoModel.logoImage = prepImage(row.asStr('logo_image'), infoModel.id);
                        infoModel.branding.brandingData = row.asStr('branding');
                        resolve(infoModel);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(err => {
                    if (scope.debugMode) {
                        cli_logger_1.Logger.logError("getRestaurantInfo :: ERROR ::", err);
                    }
                    reject(err);
                });
            });
        }
        //
        // Get Restaurant Tables
        //
        function getRestaurantTables(rstId) {
            function compileTableArray(dbResult) {
                return new Array();
            }
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantTables(rstId).then((res) => {
                    let result;
                    result = compileTableArray(res);
                    resolve(result);
                }).catch(err => {
                    cli_logger_1.Logger.logError("getRestaurantTables :: error ::", err);
                });
            });
        }
        //
        // Retrieve restaurant open hours
        //
        function getLocation(rstId) {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getRestaurantLocation(rstId).then(res => {
                    let row = res.safeGetFirstRow();
                    if (row.isEmpty === false) {
                        let model = new location_model_1.LocationModel();
                        model.latitude = row.asStr('latitude');
                        model.longitude = row.asStr('longitude');
                        model.address = row.asStr("address");
                        model.zipCode = row.asStr("zip_code");
                        resolve(model);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(err => {
                    if (scope.debugMode) {
                        cli_logger_1.Logger.logError("getRestaurantLocation ::", err);
                    }
                    reject(err);
                });
            });
        }
        //
        // Retrieve restaurant open hours
        //
        function getOpenHours(rstId) {
            return new Promise((resolve, reject) => {
                scope.restaurantDb.getOpenHours(rstId).then(res => {
                    resolve(res);
                }).catch(err => {
                    if (scope.debugMode) {
                        cli_logger_1.Logger.logError("getOpenHours ::", err);
                    }
                    reject(err);
                });
            });
        }
        //
        //
        //
        async function getFullData(rstId, ref) {
            try {
                console.log("getFullData :: caller ref ::", ref);
                let infoModel = await getRestaurantInfo(rstId);
                if (!infoModel) {
                    cli_logger_1.Logger.logError("Restaurant not found");
                    result = null;
                    return;
                }
                result = new restaurant_model_1.RestaurantModel();
                json_helper_1.JsonHelper.echoJson(infoModel);
                result.info = infoModel;
                //
                // Get Restaurant Location
                //
                result.location = await getLocation(infoModel.id);
                //
                // Get Restaurant Open openHours
                //
                let restaurantHours = await getOpenHours(infoModel.id);
                let openHoursModel = scope.compileOpenHoursModel(restaurantHours);
                json_helper_1.JsonHelper.echoJson(openHoursModel);
                result.openHours = openHoursModel;
                //
                // Get Restaurant Social Media Info
                //
                let socialMediaData = await scope.getSocialMedia(infoModel.id);
                console.log(">>> socialMediaData ::", socialMediaData);
                let socialMediaModel = scope.compileSocialMediaModel(socialMediaData);
                json_helper_1.JsonHelper.echoJson(socialMediaModel);
                result.socialMedia = socialMediaModel;
            }
            catch (ex) {
                cli_logger_1.Logger.logFatalError("getFullData failed :: error ::", ex);
            }
        }
        return new Promise((resolve, reject) => {
            /*
            const rstId   = Number.parseInt(id);
            const idValid = (
                (Number.isNaN(rstId) === false) &&
                rstId > 0
            );

            if (idValid === false) {
                Logger.logError("getRestaurantById :: provided id is invalid ::", id);
                reject("Invalid restaurant id");

            }
            else {*/
            getFullData(id).then(() => {
                cli_logger_1.Logger.logGreen("getFullData :: promise fulfilled");
                if (this.debugMode) {
                    cli_logger_1.Logger.logSign("Final Result - RESOLVE");
                    json_helper_1.JsonHelper.jsonMessage("JSON Result", result);
                }
                resolve(result);
            }).catch((err) => {
                cli_logger_1.Logger.logError("getFullData :: EXCEPTION ::", err);
                reject(err);
            });
            //}
        });
    }
    getRestaurantLocation(rstId) {
        return new Promise((resolve, reject) => { });
    }
};
RestaurantService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IRestaurantDb)),
    __metadata("design:paramtypes", [restaurant_db_1.RestaurantDb])
], RestaurantService);
exports.RestaurantService = RestaurantService;
