/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { inject }         from "inversify";
import { injectable }     from "inversify";
import { AppSettings }    from '@app/app.settings';
import { ServerMode }     from '@app/app.settings';
import { LogService }     from '@app/services/log.service';
import { WebApp }         from '@app/webapp';
import { CliCommander }   from '@cli/cli.commander';
import { Logger }         from '@cli/cli.logger';
import { IMessageHub }    from "@core/messaging/message-hub";
import { DbClient }       from '@zynDb/db-client';
import { IConnectionHub } from "@networking/connection-hub";
import { INetworkHub }    from "@networking/networking-hub";

export interface IServerService {
}

@injectable()
export class ServerService implements IServerService {
	constructor(
		@inject("IAppSettings") private appSettings: AppSettings,
		@inject("INetworkHub") public protocolManager: INetworkHub,
		@inject("IConnectionHub") public connectionHub: IConnectionHub,
		@inject("IMessageHub") public messageHub: IMessageHub,
		@inject("IDbClient") private dbClient: DbClient,
		@inject("IWebApp") private webApp: WebApp,
		@inject("ILogService") private loggingService: LogService,
	) {
		console.log(`This process is pid :: ${ process.pid }`);

		let serverMode = this.getCliServerMode();
		appSettings.setServerMode(serverMode);

		let modeSettings = appSettings.modeSettings;

		if (!modeSettings) {
			Logger.logFatalError("Invalid Server Mode Settings :: exiting");
			process.exit(99);
		}

		loggingService.clear();

		// Configure DB Client
		dbClient.configure(modeSettings.database)

		// Init Web App
		webApp.initApp(modeSettings);
	}

	/**
	 * Read Server Mode param
	 */
	private getCliServerMode(): ServerMode {
		let mode    = CliCommander.getParamByName("serverMode");
		let appMode = ServerMode.Unset;

		if (mode !== undefined) {
			switch (mode) {
				case "test":
					appMode = ServerMode.Test;
					break;
				case "live":
					appMode = ServerMode.Live;
					break;
				case "local":
					appMode = ServerMode.Local;
					break;
			}
		}

		return appMode;
	}

	private initPubsubService() {
		Logger.logPurple("****** initPubsubService *******");
	}
}
