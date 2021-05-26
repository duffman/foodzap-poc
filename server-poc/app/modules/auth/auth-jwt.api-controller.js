"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var inversify_1 = require("inversify");
var inversify_2 = require("inversify");
var cli_logger_1 = require("@cli/cli.logger");
var controller_helper_1 = require("@api/controller.helper");
var interfaces_1 = require("@core/kernel/interfaces");
var json_helper_1 = require("@app/helpers/json.helper");
var user_model_1 = require("@modules/user/models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var AuthJwtApiController = /** @class */ (function () {
    function AuthApiController(appSettings, userDb, debugMode) {
        if (debugMode === void 0) { debugMode = false; }
        this.appSettings = appSettings;
        this.userDb = userDb;
        this.debugMode = debugMode;
        controller_helper_1.ControllerHelper.logAttach(this);
        this.debugMode = true;
    }
    AuthApiController.prototype.initRoutes = function (routes) {
        cli_logger_1.Logger.logBlue(this.constructor.name + " :: initRoutes");
        routes.all("/user/auth", this.authUser.bind(this));
        routes.all("/user/register", this.registerUser.bind(this));
    };
    AuthApiController.prototype.authUser = function (req, resp) {
        if (this.debugMode) {
            cli_logger_1.Logger.logGreen('authUser');
        }
        console.log('auth User :: body ::', req.body);
        var email = req.body.email;
        var password = req.body.password;
        var jwtSecret = '!balleFjongBerga8398457!'; //this.appSettings.appConfig.jwtSecret;
        if (this.debugMode) {
            cli_logger_1.Logger.logGreen('emai ::' + email);
            cli_logger_1.Logger.logGreen('password ::' + password);
        }
        console.log("JWT_SECRET ::", jwtSecret);
        this.userDb.getUserByEmail(email).then(function (res) {
            if (res.any()) {
                var dbRow = res.safeGetFirstRow();
                var user = new user_model_1.User(dbRow.asInt('id'), dbRow.asStr('name'), dbRow.asStr('email'), dbRow.asStr('password'), dbRow.asInt('customer_id'));
                console.log("FIRST ROW ::", dbRow);
                var result_1 = bcrypt.compareSync(password, user.password);
                if (!result_1) {
                    return resp.status(401).send('Password not valid!');
                }
                var expiresIn = 24 * 60 * 60;
                var accessToken = jwt.sign({ id: user.id }, jwtSecret, {
                    expiresIn: expiresIn
                });
                var dataRes = {
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                };
                resp.status(200).send(dataRes);
            }
            else {
                cli_logger_1.Logger.logGreen("User Not Found");
                resp.json({
                    error: "user_not_found"
                });
            }
        })["catch"](function (err) {
            json_helper_1.JsonHelper.FatalError(resp);
        });
    };
    /**
     * Create a new user
     * @param req
     * @param resp
     */
    AuthApiController.prototype.registerUser = function (req, resp) {
        var name = req.body.name;
        var email = req.body.email;
        var password = bcrypt.hashSync(req.body.password);
        var userData = new user_model_1.User(null, email, name, password);
        console.log("registerUser ::", userData);
        this.userDb.createUser(userData).then(function (res) {
            console.log("CREATE USER RES ::", res);
        })["catch"](function (err) {
            json_helper_1.JsonHelper.FatalError(resp);
        });
    };
    AuthApiController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_2.inject(interfaces_1.Inf.IAppSettings)),
        __param(1, inversify_2.inject(interfaces_1.Inf.IUserDb))
    ], AuthApiController);
    return AuthApiController;
}());
exports.AuthApiController = AuthJwtApiController;
var cp1 = "kalle1";
var cp2 = "kalle1";
var result = bcrypt.compareSync(cp1, cp2);
console.log('Kalle ::', result);
