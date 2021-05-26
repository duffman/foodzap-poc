"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const social_media_model_1 = require("./social-media.model");
const info_model_1 = require("./info.model");
const location_model_1 = require("./location.model");
const open_hours_model_1 = require("./open-hours.model");
/**
 * Class that wraps all restaurant modules
 */
class RestaurantModel {
    constructor() {
        this.info = new info_model_1.InfoModel();
        this.openHours = new open_hours_model_1.OpenHoursModel();
        this.location = new location_model_1.LocationModel();
        this.socialMedia = new social_media_model_1.SocialMediaModel();
    }
}
exports.RestaurantModel = RestaurantModel;
