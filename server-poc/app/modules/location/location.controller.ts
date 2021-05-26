/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { BaseController }            from "@api/base.controller";
import { Request, Response, Router } from 'express';
import { inject, injectable }        from 'inversify';
import { IRestApiController }        from '@api/api-controller';
import { ControllerHelper }          from "@api/controller.helper";
import { CityService }               from "@modules/location/city.service";
import { JsonHelper }                from "@app/helpers/json.helper";
import { Errors }                    from "@app/app-errors";
import { Logger }                    from "@cli/cli.logger";

@injectable()
export class LocationController extends BaseController implements IRestApiController {
	debugMode: boolean;

	constructor(
		@inject("ICityService") private cityService: CityService
	) {
		super();
		ControllerHelper.logAttach(this);
	}

	initRoutes(routes: Router): void {
		routes.all("/nearby", this.getNearby.bind(this));
		routes.all("/cities", this.getCities.bind(this));
	}

	private getCities(req: Request, resp: Response): void {
		let cityId = req.query.cityId;

		this.cityService.getCitiesByCountryCode("SE").then(res => {
			Logger.logDebugCaller(this, "getCitiesByCountryCode", res);
			resp.json(res.jsonResult.result);

		}).catch(err => {
			this.fatalError(req, resp);
		});
	}

	private getNearby(req: Request, resp: Response): void {
	}
}
