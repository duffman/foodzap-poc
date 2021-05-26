/*
 id: number                   = -1,
 menuId: number               = -1,
 field: string                 = "",
 description: string          = "",
 price: number                = -1,
 code: string                 = "",
 symbol: string               = "",
 categories: FoodMenuOption[] = [],
 photo: string                = "",
 ref: string                  = "",
 weight: number               = -1,
 */

import "reflect-metadata";

import { DbClient }      from "@zynDb/db-client";
import { IDbResult }     from "@zynDb/db-result";
import { MySqlClient }  from "@zynDb/mysql-client";
import { SqlIgniter }   from "@zynDb/sql-igniter/sql-igniter";
import { ActionResult } from "@models/action-result";
import { FoodMenuItem }  from "@modules/food-menu/models/food-menu-item.model";
import { IFoodMenuItem } from "@modules/food-menu/models/food-menu-item.type";
import { Connection }    from "mysql";

const settings = {
	dbName: "appetizer_new",
	dbHost: "coldmind.com",
	dbUser: "duffy",
	dbPass: "bjoe7151212",
	dbType: ""
};

export class ql {
	constructor() {
	}
}

export class TestItemCreate {
	public client = new MySqlClient();
	conn: Connection;

	constructor() {
		this.client.configure(settings);
		this.test()
	}

	public test() {
		let conn = this.client.getConnection();

		let query = new SqlIgniter();

		query.replace({
					id: null,
					food_menu_id: 1,
					item_cat_id: 1,
					item_ref: 'Test',
					photo: 'photo.jpg',
					weight: 1
				},
			'fm_items');

		let sql = query.toSql();
		console.log('SQL ::', sql);


		//conn.query(sql, )


		/*
		this.client.query(sql).then(res => {
			console.log('Query Result ::', res);

		}).catch(err => {
			console.log('Query ::', err);

		});
		*/
	}
}

new TestItemCreate();
