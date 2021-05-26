/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { injectable }                      from "inversify";
import { IRestApiController }              from '@api/api-controller';
import { Router }                          from 'express';

@injectable()
export class SearchApiController implements IRestApiController{
	debugMode: boolean;

	initRoutes(routes: Router): void {
	}

	public findRestauranr() {

	}

}
