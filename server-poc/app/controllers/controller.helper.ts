/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { IController } from '@api/api-controller';
import { Logger }      from '@cli/cli.logger';

export class ControllerHelper {
	public static logAttach(controller: IController) {
		Logger.logPurple("Attaching Controller ::", controller.constructor.name);
	}

	public static errorResponse(mess, err: any): void {

	}
}
