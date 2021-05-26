"use strict";
/**
 * Coldmind AB ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2020 Coldmind AB, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source id contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source id, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg <patrik.forsberg@coldmind.com>
 * File Date: 2020-03-27 01:36
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
exports.OrderController = void 0;
const log_service_1 = require("@app/services/log.service");
const interfaces_1 = require("@core/interfaces");
const order_service_1 = require("@modules/order/order.service");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
let OrderController = class OrderController {
    constructor(orderService, logger) {
        this.orderService = orderService;
        this.logger = logger;
    }
    initRoutes(routes) {
        routes.get("/order", this.order.bind(this));
    }
    order(req, resp) {
        let orderData = req.body.orderData;
        this.orderService.newOrder(orderData);
    }
};
OrderController = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IOrderService)),
    __param(1, inversify_1.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        log_service_1.LogService])
], OrderController);
exports.OrderController = OrderController;
