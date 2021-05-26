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
exports.AuthLoginApiController = void 0;
const base_controller_1 = require("@api/base.controller");
const controller_helper_1 = require("@api/controller.helper");
const app_settings_1 = require("@app/app.settings");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const auth_bcrypt_1 = require("@modules/auth/auth-bcrypt");
const user_model_1 = require("@modules/user/models/user.model");
const user_db_1 = require("@modules/user/user-db");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
let AuthLoginApiController = class AuthLoginApiController {
    constructor(appSettings, userDb, debugMode = false) {
        this.appSettings = appSettings;
        this.userDb = userDb;
        this.debugMode = debugMode;
        controller_helper_1.ControllerHelper.logAttach(this);
        this.debugMode = true;
    }
    /**
     * Setup Express Routes
     * @param {e.Router} routes
     */
    initRoutes(routes) {
        cli_logger_1.Logger.logBlue(`${this.constructor.name} :: initRoutes`);
        routes.all("/user/login", this.loginUser.bind(this));
        routes.all("/admin/login", this.loginAdmin.bind(this));
        routes.all("/user/register", this.registerUser.bind(this));
        routes.all("/user/test", this.testAuth.bind(this));
    }
    async testAuth(req, resp) {
        console.log('testAuth');
        let userData = await this.getUserByEmail('putte@gmail.com');
        let passMatch = await auth_bcrypt_1.AuthBCrypt.instance().compare('kalle1', userData.password);
        console.log('PASSWORDS ::', userData.password);
        console.log('PASSWORDS MATCH ::', passMatch);
        return new Promise((resolve, reject) => {
            resp.end('Request Run :: ' + JSON.stringify(userData));
            resolve();
        });
    }
    /**
     * Get user from DB by a given Email address
     * @param {string} email
     * @returns {Promise<IUser>}
     */
    async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.userDb.getUserByEmail(email).then(res => {
                let result = null;
                if (res.any()) {
                    let dbRow = res.safeGetFirstRow();
                    result = new user_model_1.User(dbRow.asInt('id'), dbRow.asStr('name'), dbRow.asStr('email'), dbRow.asStr('password'), dbRow.asInt('customer_id'));
                }
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Send an error response back to the client.
     * @param {e.Response} resp
     * @param {number} code
     * @param {string} message
     */
    errorResponse(resp, code = 106, message) {
        return new Promise((resolve, reject) => {
            if (code === 106) {
                message = "Invalid Credentials";
            }
            const errorMess = {
                errCode: code,
                error: message
            };
            resp.json(errorMess);
            resolve();
        });
    }
    /**
     * Extract Credentials from HTTP Request
     * @param {e.Request} req
     * @returns {ICredentials}
     */
    extractCredentials(req) {
        let result = null;
        if (req.body.email && req.body.password) {
            result = {
                email: req.body.email,
                password: req.body.password
            };
        }
        return result;
    }
    createUserSession(userData, req) {
        let session = req.session;
        session['userData'] = userData;
        console.log("Session ::", req.session);
        let count = (req.session['count']) ? req.session['count'] : 0;
        count++;
        req.session['count'] = count;
    }
    async loginAdmin(req, resp) {
        try {
            let res = this.loginUser(req, resp);
            cli_logger_1.Logger.log('loginAdmin ::', res);
        }
        catch (ex) {
            cli_logger_1.Logger.logError('loginAdmin', ex);
        }
    }
    /**
 * Login User Request, for this POST request an email and "password" is
 * expected.
 *
 * IMPORTANT!
 * If we encounter anything WRONG either if it´s not due to
 * wrong credentials like a DB error, always reply with the same message,
 * the reason is that we don´t want to give away any CLUES to a potential
 * man in the middle even when using HTTPS
 *
 * @param {e.Request} req
 * @param {e.Response} resp
 * @returns {Promise<void>}
 */
    async loginUser(req, resp) {
        if (this.debugMode) {
            cli_logger_1.Logger.logGreen("loginUser", req.body);
        }
        let credentials = this.extractCredentials(req);
        console.log('Extracted Credentials ::', credentials);
        if (!credentials) {
            this.errorResponse(resp);
            return;
        }
        let userEmail = credentials.email;
        let userData = await this.getUserByEmail(userEmail);
        console.log('1:) loginUser :: userData ::', userData);
        if (!userData || !userData.email || !userData.password) {
            console.log('loginUser :: invalid credentials :: RETURNING ::');
            this.errorResponse(resp);
            return;
        }
        console.log('userData ::', userData);
        // We are receiving a password which is bcrypt hashed the same
        // way it is stored in the DB, however since bcrypt generates unique
        // hashes every time we can´t simply do an equals comparison, we
        // need to use the compare function provided in the bcrypt library,
        // this function uses the internal algorithms in order to verify
        // the hashes.
        let compareRes;
        console.log("Comparing :: credentials.password ::", credentials.password);
        console.log("UserData :: userData.password ::", userData.password);
        let passMatch = await auth_bcrypt_1.AuthBCrypt.instance().compare(credentials.password, userData.password);
        if (passMatch) {
            this.createUserSession(userData, req);
            userData.password = null;
            const loginResult = {
                success: true,
                user: userData
            };
            resp.json(loginResult);
        }
        else {
            cli_logger_1.Logger.logError("BCrypt Error");
            this.errorResponse(resp);
        }
    }
    /**
     * Create a new user
     * @param req
     * @param resp
     */
    async registerUser(req, resp) {
        async function hashPassword(value) {
            return new Promise((resolve, reject) => {
                auth_bcrypt_1.AuthBCrypt.instance().genPassCrypt(value);
            });
        }
        const name = req.body.name;
        const email = req.body.email;
        const password = await hashPassword(req.body.password);
        const userData = new user_model_1.User(null, email, name, password);
        console.log("registerUser ::", userData);
        return new Promise((resolve) => {
            this.userDb.createUser(userData).then(res => {
                console.log("CREATE USER RES ::", res);
            }).catch(err => {
                base_controller_1.BaseController.extFatalError(req, resp);
            });
            resolve();
        });
    }
};
AuthLoginApiController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_2.inject(interfaces_1.Inf.IAppSettings)),
    __param(1, inversify_2.inject(interfaces_1.Inf.IUserDb)),
    __metadata("design:paramtypes", [app_settings_1.AppSettings,
        user_db_1.UserDb, Boolean])
], AuthLoginApiController);
exports.AuthLoginApiController = AuthLoginApiController;
