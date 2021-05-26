/*  Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 *  
 *  File Created: 2020-03-22 06:24
 */

import { injectable } from "inversify";
import { IRestApiController } from "@api/api-controller";
import { Request, Response, Router } from "express";

//var CheckoutSDK = require("@bambora/checkout-sdk-web");

@injectable()
export class PaymentCheckout  implements IRestApiController {
	debugMode: boolean;

	constructor () {
	}

	public initRoutes (routes: Router): void {
		routes.all("/pg", this.test.bind(this));
	}

	private test (req: Request, resp: Response): void {
		resp.json(
			{
				kalle: "Balle"
			}
		);
	}
}
