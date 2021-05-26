"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-28
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var inversify_1 = require("inversify");
var action_result_1 = require("@models/action-result");
var LogService = /** @class */ (function () {
    function LogService() {
        this.tableName = "log";
        /*
        constructor(
            @inject(Inf.IDbClient) private dbClient: DbClient
        ) {
        }
    
        public clear(): Promise<IActionResult> {
            let result = new ActionResult();
    
            return new Promise((resolve, reject) => {
                let sql = new ZynSql().delete(this.tableName);
    
                this.dbClient.query(sql.toSql()).then(res => {
                    if (res.success) {
                        result.successful();
                    }
    
                }).catch(err => {
                    Logger.logError("LogService :: clearLog", err);
                    result.setError(err);
                    resolve(result);
                });
            });
        }
    
        public log(section: string = 'out', prefix: string = 'std', value?: any, code?: number): void {
            let result = new ActionResult();
    
            let valStr = "";
    
            if (typeof value === "object") {
                valStr = JSON.stringify(value);
            } else {
                valStr = value as string;
            }
    
            let sql = `REPLACE INTO ${this.tableName} (section, prefix, value, code) VALUES ('${section}', '${prefix}', '${valStr}', '${code}');`;
            //let sql = new ZynSql().delete(this.tableName);
    
            this.dbClient.query(sql).then(res => {
                if (res.success) {
                    result.successful();
                }
    
            }).catch(err => {
                Logger.logError("LogService :: clearLog", err);
                result.setError(err);
                // resolve(void);
            });
        }
        */
    }
    LogService.prototype.clear = function () {
        return new Promise(function (resolve, reject) {
            resolve(new action_result_1.ActionResult());
        });
    };
    LogService = __decorate([
        inversify_1.injectable()
    ], LogService);
    return LogService;
}());
exports.LogService = LogService;
