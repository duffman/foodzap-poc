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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtApiController = void 0;
const base_controller_1 = require("@api/base.controller");
const controller_helper_1 = require("@api/controller.helper");
const interfaces_1 = require("@core/interfaces");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const user_db_1 = require("@modules/user/user-db");
const user_model_1 = require("@modules/user/models/user.model");
const app_settings_1 = require("@app/app.settings");
let AuthJwtApiController = class AuthJwtApiController extends base_controller_1.BaseController {
    constructor(appSettings, userDb, debugMode = false) {
        super();
        this.appSettings = appSettings;
        this.userDb = userDb;
        this.debugMode = debugMode;
        this.debugMode = true;
        controller_helper_1.ControllerHelper.logAttach(this);
    }
    initRoutes(routes) {
        cli_logger_1.Logger.logBlue(`${this.constructor.name} :: initRoutes`);
        routes.all("/jwt/auth", this.authUser.bind(this));
        routes.all("/jwt/register", this.registerUser.bind(this));
    }
    authUser(req, resp) {
    }
    /* 2020-09-08 - Temp Disabled awaiting.... uhmm to start using JWT
    private authUser(req: Request, resp: Response): void {
        if (this.debugMode) { Logger.logGreen('authUser') }
        console.log('auth User :: body ::', req.body)

        const email = req.body.email;
        const password = req.body.password;

        this.userDb.getUserByEmail(email).then(res => {
            let result: any;
            if (res.any()) {
                let dbRow = res.safeGetFirstRow();

                let user = new User(
                    dbRow.asInt('id'),
                    dbRow.asStr('field'),
                    dbRow.asStr('email'),
                    dbRow.asStr('password'),
                    dbRow.asInt('customer_id')
                );

                const result = bcrypt.compareSync(password, user.password);

                console.log('getUserByEmail :: bcrypt :: RESULT ::', result);

                return user;
            }

        }).then((user: IUser) => {
            return user;

        }).then((userData: IUser) => {

        });

        //
        // Generate App Secret
        //
        let secret = '!balleFjongBerga8398457!';

        bcrypt.hash(`${secret}${email}`, 10).then(hashedSecret => {
            return hashedSecret;

        }).then(hashedSecret => {

            if (this.debugMode) {
                Logger.logGreen('emai ::' + email);
                Logger.logGreen('password ::' + password);
            }

            console.log("AUTH_SECRET ::", secret);

        });
    }
    */
    /**
     * Create a new user
     * @param req
     * @param resp
     */
    registerUser(req, resp) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userData = new user_model_1.User(null, email, name, password);
        console.log("registerUser ::", userData);
        this.userDb.createUser(userData).then(res => {
            console.log("CREATE USER RES ::", res);
        }).catch(err => {
            this.fatalError(req, resp);
        });
    }
};
AuthJwtApiController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IAppSettings)),
    __param(1, inversify_2.inject(interfaces_1.Inf.IUserDb)),
    __metadata("design:paramtypes", [app_settings_1.AppSettings,
        user_db_1.UserDb, Boolean])
], AuthJwtApiController);
exports.AuthJwtApiController = AuthJwtApiController;
