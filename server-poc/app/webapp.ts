/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { IController }         from '@api/api-controller';
import { IRestApiController }  from '@api/api-controller';
import { IServerModeSettings } from '@app/app.settings';
import { IRealtimeServer }     from "@app/realtime/realtime-server";
import { Logger }              from "@cli/cli.logger";
import { Inf }                 from "@core/interfaces";
import { IMessageHandler }     from "@core/messaging/message-handler";
import { IMessageHub }         from "@core/messaging/message-hub";
import * as bodyParser         from "body-parser";
import * as cors               from "cors";
import * as express            from "express";
import { Router }              from "express";
import * as expressSession     from "express-session";
import { inject, injectable }  from 'inversify';
import * as redis              from "redis";
import { kernel, ModuleTag }   from '../kernel.config';

let RedisConnector = require("connect-redis")(expressSession);

export interface IWebApp {
	debugMode: boolean;
	initApp(settings: IServerModeSettings): void;
}

@injectable()
export class WebApp implements IWebApp {
	debugMode: boolean;
	version: string;
	app: express.Application;
	server: any;
	controllers: IController[];
	restControllers: IRestApiController[];
	webRoutes: Router = Router();
	settings: IServerModeSettings;

	public static getAppName(): string {
		return "Backend Igniter";
	}

	public static getAppVersion(): string {
		return "1.7.8";
	}

	public static getFullIdent(): string {
		return WebApp.getAppName()
			   + "\n" + "Server version: "
			   + WebApp.getAppVersion()
			   + "\n\n";
	}

	public getServerSecret(): string {
		return "!1gulka9n";
	}

	private haltProcess(code: number = 200) {
		process.exit(code);
	}

	constructor(
		@inject(Inf.IMessageHub) public messageHub: IMessageHub,
		@inject(Inf.IRealtimeServer) public realtimeServer: IRealtimeServer,
	) {

		let messageHandlers: Array<IMessageHandler> = kernel.getAllTagged<IMessageHandler>("IMessageHandler",
																						   ModuleTag.Handler, ModuleTag.MessageHandler
		);

		for (const handler of messageHandlers) {
			Logger.logGreen("Registering Message Handler ::", handler.name);
			messageHub.registerHandler(handler);
		}

		Logger.logCyan("Message Handlers ::", messageHandlers);

		//
		// Realtime Server
		//
		// TODO:: configure RT
	}

	/**
	 * Init Redis Client
	 */
	initRedis() {
		let redisClient     = redis.createClient();
		let redisConnection = {
			host:   'localhost',
			port:   6379,
			client: redisClient,
			ttl:    260
		};
		let redisStore      = new RedisConnector(redisConnection);
	}

	/**
	 * Initialize Application
	 * @param {IServerModeSettings} settings
	 */
	public initApp(settings: IServerModeSettings): void {
		let scope = this;

		this.controllers     = new Array<IController>();
		this.restControllers = new Array<IRestApiController>();

		this.app = express();

		let listenHost = settings.listenHost;
		let listenPort = settings.listenPort;

		let expDate = new Date(Date.now() + 9000000);

		//store: redisStore,
		let sessionSettings = {
			secret:            "1g#ulka9n!",
			cookie:            {
				maxAge:  18000 * 10000,
				expires: expDate
			},
			saveUninitialized: true, // <- Create new session even if the request does not "touch" the session
			resave:            true  // <- Update the session even if the request does not "touch" the session
		}

		this.webRoutes.use(expressSession(
			sessionSettings
		));

		Logger.logPurple("settings ::", settings);

		let corsOptions = {
			credentials: settings.cors.credentials,
			origin:      settings.cors.origin
		};

		this.app.use(cors(corsOptions));
		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));



		this.webRoutes.all('*', (req: any, resp: any, next: any) => {
			console.log('Request With Session ID ::', req.session.id);

			// IMPORTANT!
			// Setting a property will automatically cause a Set-Cookie response,
			// so touch the header so the session cookie will be set on the client
			//
			const PROP_HEADER = "X-Igniter";

			if (req.session.zapped) {
				resp.setHeader(PROP_HEADER, true);

			} else {
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
				Logger.logPurple("Web Server is listening on port ::", listenPort);
			});
		}
		catch (err) {
			Logger.logError('App Listen :: error ::', err);
		}
	}

	/**
	 * Initialize Controllers
	 */
	private initControllers() {
		const routes                     = this.webRoutes;
		const controllers: IController[] = this.controllers;

		let injectedControllers = kernel.getAllTagged<IController>(
			Inf.IController,
			ModuleTag.Handler,
			ModuleTag.Controller
		);

		Logger.logPurple("initControllers :: INJECTED ::", injectedControllers.length);

		for (let controller of injectedControllers) {
			controllers.push(controller);
			controller.initRoutes(routes);
		}
	}

	/**
	 * Initialize Rest Api Controllers
	 */
	private initRestControllers() {
		const routes                            = this.webRoutes;
		const controllers: IRestApiController[] = this.restControllers;

		let injectedControllers = kernel.getAllTagged<IRestApiController>(
			Inf.IRestApiController,
			ModuleTag.Handler,
			ModuleTag.RestApiController
		);

		Logger.logPurple("initRestControllers :: INJECTED ::", injectedControllers.length);

		for (let controller of injectedControllers) {
			controllers.push(controller);
			controller.initRoutes(routes);
		}
	}
}
