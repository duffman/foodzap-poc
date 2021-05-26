/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
*/

import "reflect-metadata";
import { MySqlOkPacket }       from "@zynDb/types/mysql-ok-packet";
import { SQLTableData }        from "./data-containers/sql-table-data";
import { injectable }          from 'inversify';
import { MysqlError }          from "mysql";
import * as mysql              from "mysql";
import { Connection }          from "mysql";
import { IDbClient }           from "./db-client";
import { L }                   from "./db-logger";
import { DbResult, IDbResult } from "./db-result";
import { DbResultParser }      from "./db-result-parser";
import { IDbSettings }         from "./db-settings";

const util = require('util');

export interface IMySQLSettings {
	host: string,
	user: string,
	password: string,
	database: string,
	connectionLimit?: number
}

const dbSettings: IMySQLSettings = {
	host:            "localhost",
	user:            "duffman",
	password:        "bjoe7151212",
	database:        "appetizer_back",
	connectionLimit: 10
}

@injectable()
export class Scrappy {
	private connectionLost: boolean = false;
	public debug: boolean           = true;
	public lastError: Error         = null;

	private dbSettings: any = null;

	connection: Connection;

	constructor() {
	}

	public configure(settings: any): void {
		this.dbSettings = settings;
	}



	/* / Ping database to check for common exception errors.
	pool.getConnection((err, connection) => {
	  if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
		  console.error('Database connection was closed.')
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
		  console.error('Database has too many connections.')
		}
		if (err.code === 'ECONNREFUSED') {
		  console.error('Database connection was refused.')
		}
	  }

	  if (connection) connection.release()

	  return
	})

	 */

	public getConnection(settings?: any): Connection {
		L.log("Creating new connection");

		if (!this.dbSettings) {
			L.logErrorMessage('DBKernel :: getConnection :: MySQL not initialized - settings missing');
			return;
		}

		if (!this.connection) {
			this.connection = mysql.createConnection(this.dbSettings);

			this.connection.on("error", (err) => {
				if (err.code == 'PROTOCOL_CONNECTION_LOST') {
					console.log("CONNECTION -- LOST --:::", err);
					this.connectionLost = true;
				}
			});
		}

		if (this.connection.state === 'disconnected') {
			this.connection.connect((err, connection) => {
				if (err) {
					L.logErrorMessage("Open MySQL Connection failed");
					throw err;
				}
				else {
					this.connection = connection;
				}
			});
		}

		return this.connection;
	}

	public start(): Promise<MysqlError> {
		let conn: Connection = this.getConnection();
		return util.promisify(conn.beginTransaction).call();
	}

	public rollback(): Promise<MysqlError> {
		let conn: Connection = this.getConnection();
		return util.promisify(conn.rollback);
	}

	public commit(): Promise<MysqlError> {
		let conn: Connection = this.getConnection();
		return util.promisify(conn.commit);
	}

	public query(sql: string): Promise<IDbResult> {
		if (this.debug) {
			L.log("Executing Query ::", sql);
			console.profile("Profiling start");
		}

		return new Promise((resolve, reject) => {
			let scope = this;

			let conn: Connection = this.getConnection();

			return conn.query(sql, (error, result, tableFields) => {
				if (error) {
					L.log("dbQuery ERROR ::", error);

					if (error.fatal) {
						console.trace('Fatal error: ' + error.message);
					}

					conn.end();

					resolve(new DbResult(error));
				}
				else {

					return DbResultParser.parseQueryResult(error, result, tableFields)
										 .then((res) => {

											 if (error) {
												 L.error("parseQueryResult ::", error);
												 resolve(new DbResult(error));
											 }

											 return res;

										 }).then((res) => {
							conn.end((err?: MysqlError) => {
								console.log('MysqlConn Close Error ::', err);

								if (err) {
									reject(err);
								}
							});

							resolve(res);

						}).catch((err) => {
							conn.end((err?: MysqlError) => {
								L.error('In Catch: End mysqlConnection :: err ::', err);
							});

							resolve(new DbResult(err));
						});
				}
			});
		});
	}

	public static parseQueryResult(error, result, tableFields): Promise<IDbResult> {
		return new Promise((resolve, reject) => {
			let queryResult = new DbResult();

			if (error) {
				queryResult.success = false;
				queryResult.error   = error;
				let customError     = error;

				//error code 1292

				if (error.errno === 'ECONNREFUSED') {
					customError = new Error("ECONNREFUSED");
				}
				if (error.errno == 1062) {
					customError = new Error("DUP_ENTRY");
				}
				else {
					L.logErrorMessage("dbQuery :: Error ::", error.errno);
				}

				reject(customError);

			}
			else {
				// console.log('parseQueryResult :: NO ERROR ::', result);

				if (MySqlOkPacket.validate(result)) {
					queryResult.affectedRows = result.affectedRows;
					queryResult.lastInsertId = result.insertId;
				}

				let data = new SQLTableData();

				data.parseResultSet(result, tableFields).then((res) => {
					queryResult.setResult(res);
					resolve(queryResult);
				}).catch((err) => {
					reject(err);
				});
			}
		});
	}
}

