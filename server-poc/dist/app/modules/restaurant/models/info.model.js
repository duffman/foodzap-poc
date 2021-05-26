"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoModel = void 0;
const branding_model_1 = require("./branding.model");
class InfoModel {
    constructor() {
        this.branding = new branding_model_1.BrandingModel();
    }
}
exports.InfoModel = InfoModel;
