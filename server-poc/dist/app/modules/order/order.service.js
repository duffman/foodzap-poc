"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-21
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
exports.OrderService = void 0;
const inversify_1 = require("inversify");
let OrderService = class OrderService {
    constructor() {
    }
    genOrderId() {
        let result = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return result;
    }
    newOrder(data) {
        return new Promise((resolve, reject) => {
            console.log('** ORDER SERVICE **');
            console.log('DATA ::', data);
            console.log('******selectMenu*************');
            resolve(null);
        });
    }
};
OrderService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], OrderService);
exports.OrderService = OrderService;
let service = new OrderService();
let orderId = service.genOrderId();
console.log('TEST ORDER ----------------+');
console.log('ORDER REF ::', orderId);
