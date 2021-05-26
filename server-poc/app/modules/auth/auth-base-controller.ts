/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-05
 */

import { AppSettings }      from "@app/app.settings";
import { Inf }              from "@core/interfaces";
import { UserDb }           from "@modules/user/user-db";
import { inject }           from "inversify";
import { injectable }       from "inversify";

export interface IAuthBaseController {
}

@injectable()
export class AuthBaseController implements IAuthBaseController {
	constructor(
		@inject(Inf.IAppSettings) private appSettings : AppSettings,
		@inject(Inf.IUserDb) private userDb : UserDb,
		public debugMode : boolean = false
	) {
		this.debugMode = true;
	}
}
