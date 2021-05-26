"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
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
var WebApp_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApp = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const express_1 = require("express");
const expressSession = require("express-session");
const inversify_1 = require("inversify");
const redis = require("redis");
const kernel_config_1 = require("../kernel.config");
let RedisConnector = require("connect-redis")(expressSession);
let WebApp = WebApp_1 = class WebApp {
    constructor(messageHub, realtimeServer) {
        this.messageHub = messageHub;
        this.realtimeServer = realtimeServer;
        this.webRoutes = express_1.Router();
        let messageHandlers = kernel_config_1.kernel.getAllTagged("IMessageHandler", kernel_config_1.ModuleTag.Handler, kernel_config_1.ModuleTag.MessageHandler);
        for (const handler of messageHandlers) {
            cli_logger_1.Logger.logGreen("Registering Message Handler ::", handler.name);
            messageHub.registerHandler(handler);
        }
        cli_logger_1.Logger.logCyan("Message Handlers ::", messageHandlers);
        //
        // Realtime Server
        //
        // TODO:: configure RT
    }
    static getAppName() {
        return "Backend Igniter";
    }
    static getAppVersion() {
        return "1.7.8";
    }
    static getFullIdent() {
        return WebApp_1.getAppName()
            + "\n" + "Server version: "
            + WebApp_1.getAppVersion()
            + "\n\n";
    }
    getServerSecret() {
        return "!1gulka9n";
    }
    haltProcess(code = 200) {
        process.exit(code);
    }
    /**
     * Init Redis Client
     */
    initRedis() {
        let redisClient = redis.createClient();
        let redisConnection = {
            host: 'localhost',
            port: 6379,
            client: redisClient,
            ttl: 260
        };
        let redisStore = new RedisConnector(redisConnection);
    }
    /**
     * Initialize Application
     * @param {IServerModeSettings} settings
     */
    initApp(settings) {
        let scope = this;
        this.controllers = new Array();
        this.restControllers = new Array();
        this.app = express();
        let listenHost = settings.listenHost;
        let listenPort = settings.listenPort;
        let expDate = new Date(Date.now() + 9000000);
        //store: redisStore,
        let sessionSettings = {
            secret: "1g#ulka9n!",
            cookie: {
                maxAge: 18000 * 10000,
                expires: expDate
            },
            saveUninitialized: true,
            resave: true // <- Update the session even if the request does not "touch" the session
        };
        this.webRoutes.use(expressSession(sessionSettings));
        cli_logger_1.Logger.logPurple("settings ::", settings);
        let corsOptions = {
            credentials: settings.cors.credentials,
            origin: settings.cors.origin
        };
        this.app.use(cors(corsOptions));
        this.webRoutes.use(bodyParser.json());
        this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
        this.webRoutes.all('*', (req, resp, next) => {
            console.log('Request With Session ID ::', req.session.id);
            // IMPORTANT!
            // Setting a property will automatically cause a Set-Cookie response,
            // so touch the header so the session cookie will be set on the client
            //
            const PROP_HEADER = "X-Igniter";
            if (req.session.zapped) {
                resp.setHeader(PROP_HEADER, true);
            }
            else {
                req.session.zapped = true;
                resp.setHeader(PROP_HEADER, false);
            }
            next();
        });
        this.app.use(this.webRoutes);
        //
        // Initialize API Controllers
        //
        this.initControllers();
        this.initRestControllers();
        try {
            this.server = this.app.listen(listenPort, listenHost, () => {
                cli_logger_1.Logger.logPurple("Web Server is listening on port ::", listenPort);
            });
        }
        catch (err) {
            cli_logger_1.Logger.logError('App Listen :: error ::', err);
        }
    }
    /**
     * Initialize Controllers
     */
    initControllers() {
        const routes = this.webRoutes;
        const controllers = this.controllers;
        let injectedControllers = kernel_config_1.kernel.getAllTagged(interfaces_1.Inf.IController, kernel_config_1.ModuleTag.Handler, kernel_config_1.ModuleTag.Controller);
        cli_logger_1.Logger.logPurple("initControllers :: INJECTED ::", injectedControllers.length);
        for (let controller of injectedControllers) {
            controllers.push(controller);
            controller.initRoutes(routes);
        }
    }
    /**
     * Initialize Rest Api Controllers
     */
    initRestControllers() {
        const routes = this.webRoutes;
        const controllers = this.restControllers;
        let injectedControllers = kernel_config_1.kernel.getAllTagged(interfaces_1.Inf.IRestApiController, kernel_config_1.ModuleTag.Handler, kernel_config_1.ModuleTag.RestApiController);
        cli_logger_1.Logger.logPurple("initRestControllers :: INJECTED ::", injectedControllers.length);
        for (let controller of injectedControllers) {
            controllers.push(controller);
            controller.initRoutes(routes);
        }
    }
};
WebApp = WebApp_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IMessageHub)),
    __param(1, inversify_1.inject(interfaces_1.Inf.IRealtimeServer)),
    __metadata("design:paramtypes", [Object, Object])
], WebApp);
exports.WebApp = WebApp;
