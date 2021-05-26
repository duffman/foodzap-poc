"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionBasket = exports.ProdListItem = exports.SessionFlash = void 0;
const vendor_model_1 = require("@models/vendor-model");
class SessionFlash {
    constructor(addItemName = "", addItemSuccess = false) {
        this.addItemName = addItemName;
        this.addItemSuccess = addItemSuccess;
    }
}
exports.SessionFlash = SessionFlash;
class ProdListItem {
    constructor(id = -1, name) {
        this.id = id;
        this.name = name;
    }
}
exports.ProdListItem = ProdListItem;
class SessionBasket {
    constructor(vendorId = -1, productData = new Array(), flash = new SessionFlash()) {
        this.vendorId = vendorId;
        this.productData = productData;
        this.flash = flash;
        this.vendor = new vendor_model_1.Vendor(vendorId, "");
    }
}
exports.SessionBasket = SessionBasket;
