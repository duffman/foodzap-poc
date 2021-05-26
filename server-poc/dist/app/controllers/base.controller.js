"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const app_errors_1 = require("@app/app-errors");
const inversify_1 = require("inversify");
let BaseController = class BaseController {
    respError(req, resp, httpCode, errCode, message, data) {
        let requestUrl = req.baseUrl + req.path;
        message = message ? message : '';
        data = data ? data : '';
        let dataResp = {
            requestUrl: requestUrl,
            errorCode: errCode,
            'message': message,
            'data': data
        };
        resp.status(httpCode).json(dataResp);
    }
    invalidParams(req, resp, ...params) {
        this.respError(req, resp, 500, app_errors_1.Errors.REST_API_ERR, "Parameter Error", {
            parameters: params
        });
    }
    fatalError(req, resp, message = 'Internal Error') {
        resp.status(500).json({ error: message });
    }
    static extFatalError(req, resp, message = 'Internal Error') {
        resp.status(500).json({ error: message });
    }
    notFound(req, resp, message = 'Not found') {
        this.respError(req, resp, 404, app_errors_1.Errors.REST_NOT_FOUND, message);
        //resp.status(404).send(message);
    }
    reqError(errNumber) {
        return {
            status: "Request failed",
            errorCode: errNumber
        };
    }
};
BaseController = __decorate([
    inversify_1.injectable()
], BaseController);
exports.BaseController = BaseController;
