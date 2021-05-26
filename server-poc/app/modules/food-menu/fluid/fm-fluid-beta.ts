/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-14
 */

import { IDbClient } from "../../../../core/db-igniter/db-client";
import { DbClient }  from "../../../../core/db-igniter/db-client";

const menusData = {
	id:          2,
	name:        'Förrätter',
	description: 'WOW Njut av våra härliga aptitretareees',
	footer:      'footer is here',
	items:       []
}

let dataDump = {
	restaurantId:   -1,
	id:             1,
	categoryId:     2,
	languageId:     1,
	foodMenus:      [],
	postIdent:      'fm-pd',
	deletedItemIds: []
}

const dbConfig = {
	dbType: "mysql",
	dbName: "foodzap-executeNewRecord",
	dbHost: "coldmind.com",
	dbUser: "duffy",
	dbPass: "bjoe7151212"
}
/*
export class ZynFluid extends DbClient {
	public set(data: any): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
		});
	}
}
*/

export class FluidMenus {
	dbClient: IDbClient;

	constructor() {
		let client = new DbClient();
		client.configure(dbConfig);
	}
}

new FluidMenus();
