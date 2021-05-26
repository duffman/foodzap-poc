"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
exports.__esModule = true;
var branding_model_1 = require("./branding.model");
var InfoModel = /** @class */ (function () {
    function InfoModel() {
        this.branding = new branding_model_1.BrandingModel();
    }
    return InfoModel;
}());
exports.InfoModel = InfoModel;
