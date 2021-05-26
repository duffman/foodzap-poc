"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: February 2020
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
exports.IgniterController = void 0;
const controller_helper_1 = require("@api/controller.helper");
const inversify_1 = require("inversify");
var ReqType;
(function (ReqType) {
    ReqType[ReqType["String"] = 0] = "String";
    ReqType[ReqType["Number"] = 1] = "Number";
    ReqType[ReqType["Boolean"] = 2] = "Boolean";
})(ReqType || (ReqType = {}));
let IgniterController = class IgniterController {
    constructor() {
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    /*
    verifyParams(req: Request, params: ReqParam[]): boolean {
        let value = req.param();

        function haveParam(name: string): boolean {
            return (value !== undefined);
        }

        for (let param of params) {
            if (haveParam(param.name)) {
                if ((param.reqType === ReqType.Boolean) && (value.match(/^[0-9]+$/) != null)) {
                    param.success = true;
                }

                if ((param.reqType === ReqType.Number) && (value.match(/^[0-9]+$/) != null)) {
                    param.success = true;
                }

            }
            else {
                return false;
            }
        }
    }
    */
    getParam(req, name, defValue) {
        let val = req.param(name); // req.params[field]; //req.param(field);
        if (!val && defValue) {
            val = defValue;
        }
        //req.params, req.body or req.query
        return val;
    }
    getParamAsStr(name, defValue) {
        let val = ""; //this.getParam(field, defValue);
        return val;
    }
    initRoutes(routes) {
    }
};
IgniterController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], IgniterController);
exports.IgniterController = IgniterController;
