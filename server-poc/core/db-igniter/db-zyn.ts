/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-20
 */

const mysqlConfig = {
	host:            "localhost",
	user:            "duffman",
	password:        "bjoe7151212",
	database:        "appetizer_back",
	connectionLimit: 10
};

import { L }          from "@zynDb/db-logger";
import { MysqlError } from "mysql";
import * as mysql     from "mysql";
import { Connection } from "mysql";

const util = require('util');

export interface IDbCore {
	query(sql: string, args?: any): Promise<any>;
	close(): Promise<any>;
	begin(): Promise<any>;
	commit(): Promise<any>;
	rollback(): Promise<any>;
	getConn(): Connection;
}

export function createDbCore(debug: boolean = false, config?): IDbCore {
	if (!config) {
		config = mysqlConfig;
	}

	const connection = mysql.createConnection(config);

	return {
		query(sql, args?) {
			if (debug) {
				console.log('createDbCore :: query ::', sql);
			}
			return util.promisify(connection.query)
					   .call(connection, sql, args);
		},
		close(): Promise<MysqlError> {
			if (debug) {
				console.log('createDbCore :: close');
			}
			return util.promisify(connection.end)
					   .call(connection);
		},
		begin(): Promise<MysqlError> {
			if (debug) {
				console.log('createDbCore :: begin');
			}
			return util.promisify(connection.beginTransaction)
					   .call(connection);
		},
		commit(): Promise<MysqlError> {
			if (debug) {
				console.log('createDbCore :: commit');
			}
			return util.promisify(connection.commit)
					   .call(connection);
		},
		rollback(): Promise<MysqlError> {
			if (debug) {
				L.log('createDbCore :: rollback');
			}
			return util.promisify(connection.rollback)
					   .call(connection);
		},
		getConn() {
			return connection;
		}
	};
}
