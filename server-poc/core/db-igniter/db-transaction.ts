/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { IOkPacket }      from "./types/mysql-ok-packet";
import * as mysql         from 'mysql';
import { Connection }     from 'mysql';
import { L }              from './db-logger';
import { IDbResult }      from './db-result';
import { DbResultParser } from './db-result-parser';
import { IDbSettings }    from "./db-settings";

export interface IDbTransaction {
	beginTransaction(): Promise<IOkPacket>;
	executeQuery(sql: string): Promise<IDbResult>;
	commit(): Promise<boolean>;
	rollback(): Promise<boolean>;
	createConnection(settings: IDbSettings): Promise<Connection>;
}

export class DbTransaction implements IDbTransaction {
	scope = this;
	connection: Connection;

	constructor() {
		console.log("DbTransaction :: >> CONSTRUCTOR");
		/*this.getConnection().then(connection => {
			this.connection = connection;
			L.logMessage("Connection created");
		}).catch(err => {
			L.logErrorMessage("DbTransaction :: getConnection :: err ::", err);
		});*/
	}

	/**
	 * Start new transaction
	 */
	public beginTransaction(): Promise<IOkPacket> {
		return new Promise((resolve, reject) => {
			this.connection.query("START TRANSACTION", (error, result) => {
				if (!error) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
		});
	}

	/**
	 * Execute SQL Query
	 * @param sql
	 */
	public executeQuery(sql: string): Promise<IDbResult> {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, (error, result, tableFields) => {
				DbResultParser.parseQueryResult(error, result, tableFields).then((res) => {
					resolve(res);
				}).catch((err) => {
					reject(err);
				});
			});
		});
	}

	/**
	 * Commit transaction
	 */
	public commit(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.connection.query("COMMIT", (error, result) => {
				console.log("error ::", error);
				console.log("result ::", result);
				if (!error) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
		});
	}

	/**
	 * Rollback transaction
	 */
	public rollback(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.connection.query("ROLLBACK", (error, result) => {
				console.log("error ::", error);
				console.log("result ::", result);
				if (!error) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
		});
	}

	/**
	 * Create MySQL Connection
	 * @param settings
	 */
	public createConnection(settings: IDbSettings): Promise<Connection> {
		let conn: Connection;

		return new Promise((resolve, reject) => {
			try {
				conn = mysql.createConnection({
												  host:     settings.dbHost,
												  user:     settings.dbUser,
												  password: settings.dbPass,
												  database: settings.dbName
											  });

				conn.on("error", (err) => {
					if (err.code == 'PROTOCOL_CONNECTION_LOST') {
						let error = new Error('PROTOCOL_CONNECTION_LOST');
						reject(error);
					}
				});

				conn.connect((err) => {
					if (err) {
						reject(err);
					}

					resolve(conn);
				});
			}
			catch (err) {
				L.logErrorMessage("DbTransaction :: getConnection :: err ::", err);
				reject(err);
			}
		});
	}
}

