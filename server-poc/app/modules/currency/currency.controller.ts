/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { FixerEndpoint }             from '@modules/currency/api/fixer-endpoint';
import { CurrencyConverter }         from '@modules/currency/currency-converter';
import { inject, injectable }        from 'inversify';
import { IRestApiController }        from '@api/api-controller';
import { Request }                   from 'express';
import { Response }                  from 'express';
import { Router }                    from 'express';
import { Logger }                    from '@cli/cli.logger';
import { ControllerHelper } from "@api/controller.helper";

@injectable()
export class CurrencyController implements IRestApiController {

	constructor(
		@inject("IFixerEndpoint") private fixerEndpoint: FixerEndpoint,
		@inject("ICurrencyConverter") private currencyConverter: CurrencyConverter,
		public debugMode: boolean = true
	) {
		ControllerHelper.logAttach(this);
	}

	initRoutes(routes: Router): void {
		routes.all("/currency/latest", this.getLatest.bind(this));
	}

	private getLatest(req: Request, resp: Response): void {
		this.fixerEndpoint.fetchLatest().then(res => {
			Logger.logPurple("fetchLatest ::", res);
		}).catch(err => {
			Logger.logError("fetchLatest :: err ::", err);
		});
	}
}
