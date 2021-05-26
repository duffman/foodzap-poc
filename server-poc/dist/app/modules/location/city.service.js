"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Created: 2020-03-25 22:55
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
exports.CityService = void 0;
const inversify_1 = require("inversify");
const db_client_1 = require("@zynDb/db-client");
const cli_logger_1 = require("@cli/cli.logger");
let CityService = class CityService {
    constructor(dbKernel) {
        this.dbKernel = dbKernel;
    }
    getCitiesByCountryCode(code) {
        let sql = "SELECT * FROM cities WHERE country_code = 'SE' AND city_code = 'SVALL'"; //new SqlIgniter().get("cities").where("country_code", id).toSQL();
        return new Promise((resolve, reject) => {
            this.dbKernel.query(sql).then(res => {
                console.log("RESULT :::::", res);
                /*
                let utils = new Array<any>();

                for (let row of res.resultSet) {
                    let drow = {
                        id: row.asNum("id"),
                        countryCode: row.asStr("country_code"),
                        field: row.asStr("field"),
                        cityCode: row.asStr("city_code"),
                    };

                    utils.push(drow);
                }
                */
                resolve(res);
            }).catch(err => {
                cli_logger_1.Logger.logError("CitiesService", err);
                reject(err);
            });
        });
    }
};
CityService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IDbClient")),
    __metadata("design:paramtypes", [db_client_1.DbClient])
], CityService);
exports.CityService = CityService;
