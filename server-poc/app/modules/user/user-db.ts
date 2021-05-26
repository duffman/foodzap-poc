/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { SqlIgniter } from "@zynDb/sql-igniter";
import { injectable } from "inversify";
import { inject }     from "inversify";
import { IDbResult }  from "@zynDb/db-result";
import { DbClient }   from "@zynDb/db-client";
import { Logger }     from "@cli/cli.logger";
import { IUser }      from "@modules/user/models/user.model";
import { Inf }        from "@core/interfaces";

export interface IUserDb {
	getUserByEmail(email: string): Promise<IDbResult>;
	createUser(userData: IUser): Promise<IDbResult>;
}

@injectable()
export class UserDb implements IUserDb {
	constructor(
		@inject(Inf.IDbClient) private dbClient: DbClient
	) {
	}

	/**
	 * Get user by provided email
	 * @param email
	 */
	public getUserByEmail(email: string): Promise<IDbResult> {
		return new Promise((resolve, reject) => {
			let query = new SqlIgniter()
				.get('users')
				.where('email', email);

			//.whereIs('email', email);


			const sql = query.toSql();
			console.log("getUserByEmail :: sql ::", sql);

			return this.dbClient.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getCategories() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Creates a new user in the database
	 * @param userData
	 */
	public createUser(userData: IUser): Promise<IDbResult> {
		Logger.logGreen("UserDb :: createUser :: userData ::", userData);

		return new Promise((resolve, reject) => {
			let query = new SqlIgniter()
				.insert(
					{
						id:          userData.id,
						customer_id: userData.customerId,
						email:       userData.email,
						name:        userData.name,
						password:    userData.password
					}
					,
					'users'
				);

			const sql = query.toSql();
			Logger.logGreen("createUser :: sql ::", sql);

			this.dbClient.query(sql).then(res => {
				resolve(res);
			}).catch(err => {
				Logger.logError("createUser", err);
				reject(err);
			});
		});
	}
}
