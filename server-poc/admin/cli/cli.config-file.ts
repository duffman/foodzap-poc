/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Logger }                 from '@cli/cli.logger';
import * as fs                    from 'fs';
import * as path                  from 'path';

export class CliConfigFile {
	constructor() {}

	public getConfig(asString: boolean = false, configFilename = "app.config.json"): any {
 		let rootPath = path.resolve(configFilename, "../");
		let configFile = path.resolve(rootPath, configFilename);

		Logger.logPurple("Reading config file ::", configFile);

		try {
			if (fs.existsSync(configFile)) {
				let contents = fs.readFileSync(configFile, "utf8");

				if (asString === false) {
					return JSON.parse(contents);
				} else {
					return contents;
				}
			}
		} catch (ex) {
			Logger.logError("Error parsing config file ::", ex);
		}

		return undefined;
	}
}
