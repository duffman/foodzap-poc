/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { LogService }       from "@app/services/log.service";
import { Logger }           from "@cli/cli.logger";
import { Inf }              from "@core/interfaces";
import { ActionResult }     from "@models/action-result";
import { IActionResult }    from "@models/action-result";
import { FoodMenuDbTables } from "@modules/food-menu/fm.db-tables";
import { MenuDBTables }   from "@modules/food-menu/fm.db-tables";
import { ISQLTableData }  from "@zynDb/data-containers/sql-table-data";
import { ISQLTableField } from "@zynDb/data-containers/sql-table-field";
import { IDbClient }      from "@zynDb/db-client";
import { L }              from "@zynDb/db-logger";
import { IDbResult }      from "@zynDb/db-result";
import { DbTransaction }  from "@zynDb/db-transaction";
import { ISqlIgniter }    from "@zynDb/sql-igniter/sql-igniter";
import { SqlIgniter }     from "@zynDb/sql-igniter/sql-igniter";
import { injectable }     from "inversify";
import { inject }         from "inversify";
import { MysqlError }     from "mysql";
import * as mysql         from "mysql";
import { IMenuSave }      from "./save-menu/save-menu";

const DB_COUNT_ALIAS = "count";

export interface IFoodMenuAdminDbBeta {
	// setNewRecord(data: any, tableName: string): Promise<IActionResult>;
	testNew(data: any, tableName: string): Promise<IActionResult>;

	// updateRecord(data: any, tableName: string): Promise<IActionResult>;
	testUpdate(data: any, tableName: string): Promise<IActionResult>;
}

export const data = {
	menus: [
		{
			menu: {
				id:            null,
				restaurant_id: 1,
				name:          "Förrätter",
				info:          "Smarriga förrätter",
				weight:        32,
				items:         [
					{
						id:          null,
						menu_id:     1,
						photo:       '',
						name:        "Köttbullar med Mos",
						info:        "",
						allergies:   {
							veg:     false,
							lactose: false,
							lchf:    false
						},
						currency_id: 1,
						price:       10.23,
						weight:      10
					}
				]
			}
		}
	]
};

@injectable()
export class FoodMenuAdminDbBeta implements IFoodMenuAdminDbBeta {
	debugLevel = 1;

	constructor(
		@inject(Inf.IDbClient) public dbClient: IDbClient,
		@inject(Inf.ILogService) private logger: LogService
	) {
	}

	/**
	 * Count rows in given table by given column
	 * @param {string} tableName
	 * @param {string} column
	 * @returns {Promise<number>}
	 */
	public count(tableName: string, column: string): Promise<number> {
		return new Promise((resolve) => {
			this.dbClient.query(
				new SqlIgniter().count(tableName, column, DB_COUNT_ALIAS)
			).then((res: IDbResult) => {
				resolve(
					res.result.safeGetFirstRow().asNum(DB_COUNT_ALIAS)
				);
			}).catch(err => {
				resolve(0);
			})
		});
	}

	/**
	 * Check if a table contains a certain row with a given primary key value
	 * @param {string} tableName
	 * @param {string} column
	 * @param value
	 * @returns {Promise<boolean>}
	 */
	private async haveRow(tableName: string, column: string, value: any): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const sql = new SqlIgniter().count(tableName, "count").where(column, value);

			this.dbClient.query(sql).then((res: IDbResult) => {
				let firstRow = res.safeGetFirstRow();
				let count    = res.safeGetFirstRow().asNum("count");
				resolve(count > 0);
			}).catch(err => {
				Logger.logError("setRecord :: haveRow ::", err);
				reject(err);
			});
		});
	}

	/**
	 * Get field value from given
	 * @returns {string}
	 * @param data
	 * @param dataKey
	 */
	private safeGetDataVal(dataKey: string, data: any): string {
		let result: string = undefined;
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (key == dataKey) {
					result = data[key];
					break;
				}
			}
		}
		return result;
	}

	async updateRow(): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
			let zynQuery = new SqlIgniter().setMulti(
				{},
				''
			).where('')
		});
	}

	public getRequiredFields(tableData: ISQLTableData): ISQLTableField[] {
		let result = new Array<ISQLTableField>();
		for (let row of tableData.dataRows) {
			for (let field of row.fields) {
				if (!field.nullable) {
					result.push(field);
				}
			}
		}

		return result
	}

	/**
	 * Set database record, the function will
	 * @param data
	 * @param {string} tableName
	 * @param validate - validate supplied fields against table meta data
	 * @returns {Promise<IActionResult>}
	 */
	public async setRecord(data: any, tableName: string, validate: boolean = false): Promise<IActionResult> {
		const scope = this;
		let result  = new ActionResult();

		function primaryKeySet(value: any): boolean {
			return ( value );
		}

		/**
		 * Make sure all required fields are provided
		 * TODO: Check datatypes
		 * @param {ISQLTableData} tableData
		 * @param data
		 * @param primFieldName
		 * @returns {IActionResult}
		 */
		function validateData(tableData: ISQLTableData, data: any, primFieldName: string): IActionResult {
			let result = new ActionResult(true);
			for (let field of tableData.fields) {
				let userDataVal = scope.safeGetDataVal(field.name, data);
				if (( !field.nullable && !userDataVal ) && ( !field.isPrimary ) && !field.default) {
					result.fail(new Error(`Required Field '${field.name}' is missing`));
					break;
				}
			}

			return result;
		}

		async function execute(): Promise<void> {
			try {
				let db                  = scope.dbClient;
				let desc: ISQLTableData = ( await db.describeTable(tableName) ).result;

				let primDbField: ISQLTableField = desc.getPrimaryField();
				let primFieldName: string       = primDbField ? primDbField.name : undefined;
				let primFieldVal: string        = scope.safeGetDataVal(primFieldName, data);

				let validateRes = validateData(desc, data, primFieldVal);
				console.log('Validation result ::', validateRes);

				L.logUVE(primDbField, "primDbField :: Field is missing in Database");
				//L.log('Table DESC ::', desc);
				//L.log('primField ::', primFieldName);
				//L.log('primFieldVal ::', primFieldVal);

				let cleanedData = [];
				for (let key in data) {
					if (data.hasOwnProperty(key)) {
						let doInclude = true;

						// Special fix for negative prim keys
						// they are threated as not set...
						if (primFieldName == key) {
							let primNumVal = Number.parseInt(primFieldVal);
							if (!isNaN(primNumVal) && primNumVal < 0) {
								doInclude = false;
							}
						}

						//

						if (primFieldName !== key && desc.haveFieldName(key) && doInclude) {
							cleanedData[key] = data[key];
						}
					}
				}

				//
				// Primary key if provided, make sure a row exist...
				//
				if (primaryKeySet(primFieldVal)) {
					console.log('>>> scope.haveRow :: tableName ::', tableName);
					console.log('>>> scope.haveRow :: primFieldName ::', primFieldName);
					console.log('>>> scope.haveRow :: tableName ::', tableName);

					let haveMenuItem = await scope.haveRow(tableName, primFieldName, primFieldVal);

					if (haveMenuItem) {
						Logger.spit();
						Logger.spit();
						Logger.logGreen("****************************");
						Logger.logGreen("* UPDATE ROW");
						Logger.logGreen("****************************");
						Logger.spit();
						Logger.spit();

						let query = new SqlIgniter().setMulti(cleanedData, tableName)
													.where(primFieldName, primFieldVal);

						Logger.logGreen("Query ::", query.toSql());

						result.data = await db.query(query)
					}
				}
				else {
					Logger.spit();
					Logger.spit();
					Logger.logPurple("****************************");
					Logger.logPurple("* INSERT ROW");
					Logger.logPurple("****************************");
					Logger.spit();
					Logger.spit();

					let query = new SqlIgniter().insert(data, tableName);

					Logger.logPurple("Query ::", query.toSql());

					result.data = await db.query(query)
				}
			}
			catch (ex) {
				Logger.logError("setRecord :: err ::", ex);
				result.fail(ex)
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				console.log("FoodMenuAdminDbBeta :: setRecord :: executed ::", result);
				resolve(result);
			}).catch(err => {
				console.log('FoodMenuAdminDbBeta :: setRecord :: error ::', err);
				reject(err);
			});
		});
	}

	/**
	 * Test function for create new Menu
	 * @param data
	 * @returns {Promise<IActionResult>}
	 */
	public async testNew(data: any): Promise<IActionResult> {
		const scope = this;
		let result = new ActionResult();

		Logger.logCyan("testNew ::", data);

		let tableName = MenuDBTables.Menu;

		async function execute(): Promise<void> {
			try {
				let result = await scope.setRecord(data, tableName);
				console.log("testNew :: execute :: result ::", result);

			}
			catch (ex) {
				Logger.logError("testNew :: execute ::", ex);
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				Logger.log('testNew() :: executed');
				resolve(result);
			}).catch(err => {
				Logger.logError('testNew() :: err ::', err);
				reject(err);
			});
		});
	}

	/**
	 * Test function for update Menu
	 * @param data
	 * @returns {Promise<IActionResult>}
	 */
	public async testUpdate(data: any): Promise<IActionResult> {
		const scope = this;
		let result  = new ActionResult();

		Logger.logCyan("testUpdate ::", data);

		let tableName = MenuDBTables.Menu;

		async function execute(): Promise<void> {
			try {
				let result = await scope.setRecord(data, tableName);
				console.log('result ::', result);
				result.setSuccess(result.success);

			}
			catch (ex) {
				result.fail(ex);
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				Logger.log("testUpdate() :: executed");
				resolve(result);
			});
		});
	}

	/**
	 * Save all menus and items
	 * -> Insert into DB if no ID is present
	 * -> Update DB if items have an ID
	 *
	 * @param data
	 * @returns {Promise<>}
	 */
	public async menusFullSave(data: IMenuSave): Promise<IActionResult> {
		const scope     = this;
		const logPrefix = "FoodMenuAdminDbBeta :: menusFullSave :: ";
		let errors      = new Array<string>();

		async function getCurrency(id: number): Promise<any> {
			let result: any = null;

		}

		async function setMenu(data: any): Promise<IActionResult> {
			return new Promise((resolve, reject) => {
				scope.setRecord(data, MenuDBTables.Menu).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			});
		}

		function doErr(mess: any): void {
			errors.push(mess);
		}

		async function execute(): Promise<void> {
			Logger.spit();
			Logger.spit();
			Logger.spit();
			Logger.spit();
			Logger.logCyan("**( EXECUTE )******************************************");
			Logger.spit();

			let connection = mysql.createConnection(
				{
					host:     this.dbSettings.dbHost,
					user:     this.dbSettings.dbUser,
					password: this.dbSettings.dbPass,
					database: this.dbSettings.dbName
				});

			connection.connect((err) => {
				if (err) {
					console.error('error connecting: ' + err.stack);
					return;
				}
				console.log('connected as id ' + connection.threadId);
			});

			connection.beginTransaction((err: MysqlError) => {
				if (err) {
					throw err;
				}

				//
				// Food Menus
				//

				let foodMenus = data.foodMenus;

				let weight = 0;

				for (let menu of foodMenus) {
					let query: ISqlIgniter = null;
					let primaryId          = menu.id;

					if (!primaryId || primaryId < 0) {
						Logger.logCyan("****************** INSERT *******");

						let insData = {
							restaurant_id: data.restaurantId,
							weight:        menu.weight,
							photo:         menu.photo
						}

						query = new SqlIgniter().insert(insData, MenuDBTables.Menu);

						if (query) {
							connection.query(query.toSql());

							/*
							if (res.success) {
								primaryId = res.lastInsertId;
								console.log(">>>>>>> MENU ID ::", res.lastInsertId);
							}
							 */
						}

					}
					else {
						Logger.logCyan("****************** UPDATE *******");

						let insData = {
							restaurant_id: data.restaurantId,
							weight:        menu.weight,
							photo:         menu.photo
						}

						query = new SqlIgniter().setMulti(insData, MenuDBTables.Menu)
												.where('id', primaryId);

						if (query) {
							connection.query(query.toSql());

							/*
							if (res.success) {
								primaryId = res.lastInsertId;
								console.log(">>>>>>> MENU ID ::", res.lastInsertId);
							}
							*/
						}
					}

					Logger.logGreen("QUERY :::", query.toSql());
					Logger.logGreen("LAST_ID :::", primaryId);

					for (let menuItem of menu.items) {

					} // end for

				} // end for

				// During testing, always roolback
				doErr('Test transaction - rollback');
			});

		}

		return new Promise((resolve, reject) => {
			return execute().then(() => {
				Logger.logGreen("menusFullSave :: executed");
			}).catch(err => {
				reject(err);
			});
		});
	}

	public async createMenuItem(data: any): Promise<IActionResult> {
		const scope = this;

		data = {
			id:          null,
			menu_id:     1,
			photo:       '',
			name:        "Köttbullar med Mos",
			info:        "",
			allergies:   {
				veg:     false,
				lactose: false,
				lchf:    false
			},
			currency_id: 1,
			price:       10.23
		};

		async function getCurrency(id: number): Promise<any> {
			let result: any = null;
		}

		async function execute(): Promise<void> {
			let currency = getCurrency(data.currency_id);

			scope.dbClient.startTransaction();

			//let sql = new SqlIgniter().insert();
		}

		return new Promise((resolve, reject) => {
		});
	}
}
