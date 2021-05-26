/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
import { Logger }   from "@cli/cli.logger";
import { StrUtils } from "@core/utils/str/string-utils";

export class JsonHelper {
	public static echoJson(data: any, message?: string) {
		let jsonData = JSON.stringify(data, null, 4);

		if (message) {
			Logger.log(message, jsonData);
		} else {
			Logger.log(jsonData);
		}
	}

	public static jsonMessage(message: string, data: any) {
		let jsonStr: string;

		if (StrUtils.isStr(data) === false) {
			jsonStr = JSON.stringify(data);
		}

		Logger.log(message, jsonStr);
	}
}
