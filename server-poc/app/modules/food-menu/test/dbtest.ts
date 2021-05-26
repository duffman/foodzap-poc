/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-24
 */


let query = new SqlIgniter();

query.setMulti(
	{
		name:        'menu.field',
		description: 'menu.description',
		footer:      'menu.footer'
	},
	'fm_category_lang'
)
	 .where('fm_category_lang.cat_id', 'menu.id')
	 .where('fm_category_lang.language_id', 'data.languageId');


process.exit(10);

import { SqlIgniter }      from "@zynDb/sql-igniter/sql-igniter";
import { FoodMenuAdminDb } from "../fm-admin-db";
import { DbClient }   from "@zynDb/db-client";
import { LogService } from "@app/services/log.service";

let client = new DbClient();

client.configure({
					 dbType: "",
					 dbName: "appetizer_new",
					 dbHost: "coldmind.com",
					 dbUser: "duffy",
					 dbPass: "bjoe7151212"
				 });

let fb = new FoodMenuAdminDb(client, new LogService());

fb.addNewLanguage({code: 'TH', name: 'ประเทศไทย'}).then(res => {
	console.log('Country added');
}).catch(err => {
	console.log('Country NOT added ::', err);
});
