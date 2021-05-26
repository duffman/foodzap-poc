/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-09-05
 */

import { inject }     from "inversify";
import { injectable } from "inversify";
import { Inf }        from "@core/interfaces";
import { DbClient }   from "@zynDb/db-client";
import { IDbResult }  from "@zynDb/db-result";

export interface IRestaurantAdminDb {
	assignTableQrCode(qrCode: string, restaurantId: number, tableId: number): Promise<IDbResult>;
}

@injectable()
export class RestaurantAdminDb implements IRestaurantAdminDb {
	debugMode: boolean = true;

	constructor(@inject(Inf.IDbClient) private dbClient: DbClient) {
	}

	public assignTableQrCode(qrCode: string, restaurantId: number, tableId: number): Promise<IDbResult> {
		return new Promise((resolve, reject) => {
			reject(null);
		});
	}
}
