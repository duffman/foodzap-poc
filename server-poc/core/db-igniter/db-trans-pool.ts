/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-13
 */

import * as mysql      from "mysql";

const dbConfig = {
	connectionLimit: 10, // default 10
	dbName: "appetizer_new",
	dbHost: "coldmind.com",
	dbUser: "duffy",
	dbPass: "bjoe7151212"
};

const pool = mysql.createPool(dbConfig);

const connection = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) reject(err);
			console.log("MySQL pool connected: threadId " + connection.threadId);
			const query = (sql, binding) => {
				return new Promise((resolve, reject) => {
					connection.query(sql, binding, (err, result) => {
						if (err) reject(err);
						resolve(result);
					});
				});
			};
			const release = () => {
				return new Promise((resolve, reject) => {
					if (err) reject(err);
					console.log("MySQL pool released: threadId " + connection.threadId);
					resolve(connection.release());
				});
			};
			resolve({ query, release });
		});
	});
};

const query = (sql, binding) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, binding, (err, result, fields) => {
			if (err) reject(err);
			resolve(result);
		});
	});
};
module.exports = { pool, connection, query };
