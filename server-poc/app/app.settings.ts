/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { CliCommander }       from "@cli/cli.commander";
import { CliConfigFile }      from '@cli/cli.config-file';
import { Logger }             from '@cli/cli.logger';
import { ICors }              from "@core/settings/cors.typing";
import { ServerModeSettings } from "@core/settings/server-mode.typing";
import { IoUtils }            from '@core/utils/io-utils';
import { IDbSettings }        from "@zynDb/db-settings";
import { injectable }         from "inversify";

export module Networking {
	//export const webServerPort             = 80;
	//export const socketIOPort              = process.env.PORT || 5000;
	export const socketIOPort  = 9090;
	export const webSocketPort = 6060;
	export const tcpPort       = 1681;
	export const adminPort     = 3000;
}

export enum ServerMode {
	Unset = "unset",
	Test  = "test",
	Local = "local",
	Live  = "live"
}

export interface IServerConfig {
	allowedCORSOrigins?: string;
	sessionCookieKey?: string;
	sessionSecret?: string;
	caching?: ICaching;
	mongoDb?: IMongoDB;
	serverMode?: IServerMode;
}

export interface ICaching {
	cacheTTL?: string;
}

/*
 export interface IDatabase {
 dbName: string;
 dbHost: string;
 dbUser: string;
 dbPass: string;
 }
 */

export interface IMongoDB {
	mongoDbUrl?: string;
}

export interface IServerMode {
	local?: IServerModeSettings;
	live?: IServerModeSettings;
}

export interface IServerModeSettings {
	domain: string;
	listenHost: string;
	listenPort: number;
	debugMode: string;
	cors: ICors;
	database: IDbSettings;
	wwwRoot?: string;
}

export interface IAppSettings {
	appMode: ServerMode;
	modeSettings: IServerModeSettings;
	appConfig: IServerConfig;
	debugMode: DebugMode;
}

enum DebugMode {
	None,
	All,
	Error,
	Warning,
	Notice
}

@injectable()
export class AppSettings implements IAppSettings {
	public appMode: ServerMode;
	public modeSettings: IServerModeSettings;
	public appConfig: any; //IServerConfig;

	public static debug = true;
	public static verboseDebug = true;
	public debugMode: DebugMode;

	// Made available to the injected dbKernel
	public static dbSettings: IDbSettings;

	constructor() {
		let cliConfig  = new CliConfigFile();
		let jsonStr    = cliConfig.getConfig(true);
		this.appConfig = this.jsonToAppConfig(jsonStr);

		this.checkSettings();
	}

	/**
	 * Sets the Server Mode, the config is populated when the mode is set
	 * @param mode
	 */
	public setServerMode(mode: ServerMode): void {
		if (mode === ServerMode.Unset) {
			mode = ServerMode.Local;
		}

		this.applyAppModeSettings(mode);

		// Set DebugMode
		this.debugMode = DebugMode.All;

		switch (this.modeSettings.debugMode) {
			case "none":
				this.debugMode = DebugMode.None;
				break;

			case "all":
				this.debugMode = DebugMode.All;
				break;

			case "error":
				this.debugMode = DebugMode.Error;
				break;

			case "warning":
				this.debugMode = DebugMode.Warning;
				break;

			case "notice":
				this.debugMode = DebugMode.Notice;
				break;
		}

		// Set the static DbSettings
		AppSettings.dbSettings = this.modeSettings.database;

		if (AppSettings.verboseDebug) {
			Logger.logCyan('Mode Settings ::', this.modeSettings);
		}
	}

	private applyAppModeSettings(mode: ServerMode): void {
		let scope = this;

		function applySettings(settings: IServerModeSettings) {
			// Make sure that the wwwRoot ends with a platform specific slash
			settings.wwwRoot = IoUtils.ensureTrailingPathDelimiter(settings.wwwRoot);

			scope.modeSettings = new ServerModeSettings(
				settings.cors,
				settings.database,
				settings.debugMode,
				settings.domain,
				settings.listenHost,
				settings.listenPort,
				settings.wwwRoot
			);
		}

		function applyLocalSettings() {
			applySettings(scope.appConfig.serverMode.local);
		}

		function applyLiveSettings() {
			applySettings(scope.appConfig.serverMode.live);
		}

		switch (mode) {
			case ServerMode.Local:
				Logger.logGreen("Using Local Settings");
				applyLocalSettings();
				break;

			case ServerMode.Live:
				Logger.logGreen("Using Live Settings");
				applyLiveSettings();
				break;
		}
	}

	private checkSettings(): void {
		let mode   = CliCommander.getParamByName("mode");
		let result = ServerMode.Live;
		switch (mode) {
			case ServerMode.Local:
				result = ServerMode.Local;
				break;

			case ServerMode.Live:
				result = ServerMode.Live;
				break;
		}

		this.setServerMode(result);
	}

	public jsonToAppConfig(json: string): IServerConfig {
		return JSON.parse(json);
	}
}
