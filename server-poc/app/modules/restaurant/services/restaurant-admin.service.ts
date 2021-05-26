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
 *  File Created: 2020-03-22 19:21
 */

import { Inf }               from "@core/interfaces";
import { IActionResult }     from "@models/action-result";
import { ActionResult }      from "@models/action-result";
import { RestaurantAdminDb } from "@modules/restaurant/restaurant-admin.db";
import { RestaurantDb }      from "@modules/restaurant/restaurant.db";
import { inject }            from "inversify";

export interface IRestaurantAdminService {
}

export class RestaurantAdminService implements IRestaurantAdminService {
	debugMode: boolean = true;

	constructor(
		@inject(Inf.IRestaurantDb) private rstDb: RestaurantDb,
		@inject(Inf.IRestaurantAdminDb) private rstAdminDb: RestaurantAdminDb
	) {
	}

	/**
	 *
	 */
	public createRestaurant(): Promise<IActionResult> {
		let result = new ActionResult();
		return new Promise((resolve, reject) => {
			resolve(result);
		});
	}

	/**
	 *
	 */
	public saveRestaurant(): Promise<IActionResult> {
		let result = new ActionResult();
		return new Promise((resolve, reject) => {
			resolve(result);
		});
	}

	/**
	 * Assign a QR code with a restaurant table, having a QR code assigned to a
	 * table makes it possible for guests to check in at a table.
	 * @param {string} qrCode
	 * @param {number} rstId
	 * @param {number} tableId
	 * @returns {Promise<IActionResult>}
	 */
	public assignTableQR(qrCode: string, rstId: number, tableId: number): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
		});
	}
}
