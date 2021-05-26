/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
import { L }           from "@zynDb/db-logger";
import { IDbSettings } from "@zynDb/db-settings";
import { injectable }  from "inversify";
import * as mysql      from "mysql";
import { Connection }  from "mysql";

export interface IDBPool {
}

@injectable()
export class DBPool implements IDBPool {
	pool: Map<number, Connection>;

	constructor() {
		this.pool = new Map<number, Connection>();
		//let conn = await this.getPoolConnection();
	}

	public getPoolConnection(threadId?: number, settings?: IDbSettings): Promise<Connection> {
		const scope = this;

		return new Promise((resolve, reject) => {
			if (!settings) {
				settings = {
					dbHost: 'localhost',
					dbType: 'mysql',
					dbPass: 'bjoe7151212',
					dbUser: 'duffman',
					dbName: 'appetizer_back',

				};
			}

			let connection = mysql.createConnection(
				{
					host:     settings.dbHost,
					user:     settings.dbUser,
					password: settings.dbPass,
					database: settings.dbName
				});

			connection.on("error", (err) => {
				if (err.code == 'PROTOCOL_CONNECTION_LOST') {
					console.log("CONNECTION -- LOST --:::", err);
				}
			});

			if (connection.state === 'disconnected') {
				connection.connect((err, connection) => {
					if (err) {
						L.logErrorMessage("Open MySQL Connection failed");
						throw err;
					}
					else {
						resolve(connection);
					}
				});
			}


		});
	}
}

