/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-17
 */

import { LogService } from "@app/services/log.service";
import { Inf }        from "@core/interfaces";
import { DbClient }   from "@zynDb/db-client";
import { inject }     from "inversify";
import { injectable } from "inversify";

export interface IDbMetaTool {}

@injectable()
export class DbMetaTool implements IDbMetaTool {
	constructor(
		@inject('IDbClient') private dbClient: DbClient,
		@inject(Inf.ILogService) private logger: LogService
	) {
	}
}
