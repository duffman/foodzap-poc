"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
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
exports.OrderDb = void 0;
const log_service_1 = require("@app/services/log.service");
const interfaces_1 = require("@core/interfaces");
const db_client_1 = require("@zynDb/db-client");
const sql_igniter_1 = require("@zynDb/sql-igniter");
const action_result_1 = require("@models/action-result");
const inversify_1 = require("inversify");
let OrderDb = class OrderDb {
    constructor(dbClient, logger) {
        this.dbClient = dbClient;
        this.logger = logger;
    }
    saveOrder(order) {
        const scope = this;
        let result = new action_result_1.ActionResult();
        async function storeOrder() {
            return new Promise((resolve, reject) => {
                // INSERT INTO `order_items` (`id`, `fm_id`, `field`, `notes`) VALUES (NULL, '157', 'Kyckling med curry', 'Snälla gör den stark som fan');
                // INSERT INTO `orders` (`id`, `customer_id`, `notes`) VALUES (NULL, '1', 'Snälla gör kycklingen stark som fan');
                let data = {
                    'id': order.id,
                    'notes': order.notes
                };
                scope.dbClient.startTransaction();
                let query = new sql_igniter_1.SqlIgniter().insert(data, 'order_items');
                let sql = query.toSql();
                scope.dbClient.query(sql).then(res => {
                    resolve(result);
                }).catch(err => {
                    result.setError(err);
                    resolve(result);
                });
            });
        }
        async function runQuery(items) {
            return new Promise((resolve, reject) => {
            });
        }
        async function storeOrderItems(items) {
            function compileName(item) {
                let result = new Array();
                result.push(String(item.id));
                result.push(': ');
                result.push(item.name);
                return '#' + result.join('');
            }
            return new Promise((resolve, reject) => {
                // INSERT INTO `order_items` (`id`, `fm_id`, `field`, `notes`) VALUES (
                // NULL, '157', 'Kyckling med curry', 'Snälla gör den stark som fan');
                for (let item of items) {
                    let name = compileName(item);
                    let data = {
                        'fm_id': item.id,
                        'notes': name
                    };
                    let sql = new sql_igniter_1.SqlIgniter().insert(data, 'order_items').toSql();
                    scope.dbClient.query(sql).then(res => {
                        resolve(result);
                    }).catch(err => {
                        result.setError(err);
                        resolve(result);
                    });
                }
            });
        }
        async function execute() {
        }
        return new Promise((resolve, reject) => {
        });
    }
};
OrderDb = __decorate([
    __param(0, inversify_1.inject(interfaces_1.Inf.IDbClient)),
    __param(1, inversify_1.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [db_client_1.DbClient,
        log_service_1.LogService])
], OrderDb);
exports.OrderDb = OrderDb;
