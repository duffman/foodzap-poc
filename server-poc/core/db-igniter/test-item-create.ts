import { Scrappy }       from "@zynDb/scrappy";
import { IDbResult }     from "./db-result";
import { Connection }    from "mysql";
import "reflect-metadata";
import { FoodMenuItem }  from "../../app/modules/food-menu/models/food-menu-item.model";
import { IFoodMenuItem } from "../../app/modules/food-menu/models/food-menu-item.type";


import { SqlIgniter } from "./sql-igniter/sql-igniter";

const util = require('util');
const msql = require('mysql');

export interface IMysqlUserConn {
	host: string,
	user: string,
	password: string,
	database: string,
	connectionLimit?: number
}

export class MenuAdmin {
	private connLost: boolean = false;
	public debug: boolean     = true;

	// dbCore: IDbCore;
	connection: Connection;
	db: Scrappy;

	snapSettings = {
		host:            "localhost",
		user:            "duffman",
		password:        "bjoe7151212",
		database:        "appetizer_back",
		connectionLimit: 10
	}

	constructor() {
		// this.dbCore = createDbCore(dbSettings);
		this.db = new Scrappy();
		this.db.configure(this.snapSettings);
	}

	public createItem(clientMenuId: number = 1, languageId: number = 1, item: IFoodMenuItem): Promise<void> {
		let scope = this;

		function log(label: string, data: any) {
			console.log(label, data);
		}

		async function addItem(clientMenuId: number, item: IFoodMenuItem): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				let itemData = {
					id:           null,
					food_menu_id: clientMenuId,
					item_cat_id:  item.menuId,
					item_ref:     item.ref,
					photo:        item.photo,
					weight:       item.weight
				};

				let sql = new SqlIgniter().replace(
					itemData,
					'fm_items'
				).toSql();

				scope.db.query(sql).then(res => {
					console.log("RES ::", res);
					resolve(res);

				}).catch(err => {
					console.log("ERR ::", err);
					reject(err);
				});
			});
		}

		async function addItemLang(itemId: number, item: IFoodMenuItem): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				let query = new SqlIgniter().replace(
					{
						item_id:     itemId,
						language_id: languageId,
						name:        item.name,
						description: item.description
					},
					'fm_item_lang');

				let sql = query.toSql();

				log('addFoodMenuItem :: SQL ::', sql);

				scope.db.query(sql).then(res => {
					// console.log("RES ::", res);
					resolve(res);

				}).catch(err => {
					// console.log("ERR ::", err);
					reject(err);
				});
			});
		}

		async function execute(): Promise<void> {
			let db = scope.db;

			await scope.db.start();


			/*
			let result = await addItem(clientMenuId, item);

			let insId = result.lastInsertId;
			log('insId ::', insId);

			let res = await addItemLang(insId, item);
			log('addItemLang ::', res);

			let res2 = await scope.db.commit();
			log('scope.dbCore.commit ::', res);
			*/
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				console.log('doIt() :: Executed')
			}).catch(err => {
				console.log('setFoodMenuItem :: err ::', err);
			});
		});
	}

	public go(): void {
		let item = new FoodMenuItem(
			null,
			1,
			1,
			"Drinkar",
			"Njut av en kall lager och korta kjolar som struttar förbi på sommaren och en glögg till Kalle Anka på vintern.",

			// Todo Merge
			45.67,
			'',
			'',
			// --- //

			[],
			null,
			'Fläskis',
			1
		);

		this.createItem(1, 1, item)
			.then(() => {
				console.log('CREATE ITEM :: DONE');
			})
			.catch(err => {
				console.log('CREATE ITEM :: ERR :: SHOULD NOT HAPPEN!');
			});
	}

	/*
	 public getConnection(settings?: any): Connection {
	 console.log("Creating new connection");

	 if (!settings) {
	 settings = dbSettings;
	 }

	 if (this.connection && this.connection.state === 'connected') {
	 console.log('>>> RETURNING EXISTING CONNECTION');
	 return this.connection;
	 }

	 if (!this.connection) {
	 this.connection = mysql.createConnection(
	 settings
	 );

	 this.connection.on("error",
	 (err) => {
	 if (err.code == 'PROTOCOL_CONNECTION_LOST') {
	 console.log("CONNECTION -- LOST --:::",
	 err);
	 this.connLost = true;
	 }
	 });
	 }

	 if (this.connection.state === 'disconnected') {
	 this.connection.connect((err, connection) => {
	 if (err) {
	 console.log("Open MySQL Connection failed");
	 throw err;
	 }
	 else {
	 this.connection = connection;
	 }
	 });
	 }

	 return this.connection;
	 }

	 public begin(): Promise<MysqlError> {
	 let conn: Connection = this.getConnection();
	 return util.promisify(conn.begin);
	 }

	 public rollback(): Promise<MysqlError> {
	 let conn: Connection = this.getConnection();
	 return util.promisify(conn.rollback);
	 }

	 public commit(): Promise<MysqlError> {
	 let conn: Connection = this.getConnection();
	 return util.promisify(conn.commit);
	 }

	 public query(sql: string): Promise<MysqlError> {
	 let conn: Connection = this.getConnection();
	 return util.promisify(conn.query);
	 }

	 */
}

const admin = new MenuAdmin();
admin.go();

//let res = cli.setFoodMenuItem(clientMenuId, item);

/*
 function addNewMenuItem(menuId: number,
 field: string,
 description: string,
 price: number,
 currencyId: number
 ): Promise<IActionResult> {
 return new Promise((resolve, reject) => {
 resolve(null);
 });
 }
 */

/*
 this.menuId = menuId;
 this.field = field;
 this.description = description;
 this.price = price;

 //this.code = code;
 //symbol: string               = "",

 id:           number;
 menuId:       number;
 field:         string;
 description?: string;
 price:        number;
 code?:        string;
 symbol?:      string;
 photo?:       string;
 categories?:  Array<FoodMenuOption>;
 ref?:         string;
 weight?:      number;
 deleted?:     boolean;

 categories: FoodMenuOption[] = [],
 photo: string                = "",
 ref: string                  = "",
 weight: number               = -1,

 */
