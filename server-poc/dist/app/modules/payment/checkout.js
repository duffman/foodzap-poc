"use strict";
/*  Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  File Created: 2020-03-22 06:24
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
exports.PaymentCheckout = void 0;
const inversify_1 = require("inversify");
//var CheckoutSDK = require("@bambora/checkout-sdk-web");
let PaymentCheckout = class PaymentCheckout {
    constructor() {
    }
    initRoutes(routes) {
        routes.all("/pg", this.test.bind(this));
    }
    test(req, resp) {
        resp.json({
            kalle: "Balle"
        });
    }
};
PaymentCheckout = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], PaymentCheckout);
exports.PaymentCheckout = PaymentCheckout;
