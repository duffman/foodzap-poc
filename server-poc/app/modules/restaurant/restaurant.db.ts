/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { Inf }        from "@core/interfaces";
import { inject }     from "inversify";
import { injectable } from "inversify";
import { Logger }     from "@cli/cli.logger";
import { DbClient }   from "@zynDb/db-client";
import { IDbResult }  from "@zynDb/db-result";
import { SqlIgniter } from "@zynDb/sql-igniter";

export interface IRestaurantDb {
	getRestaurantById(id: number): Promise<IDbResult>;
	getRestaurantByQrCode(qrCode: string): Promise<IDbResult>;
	getRestaurantByCustomerId(custId: string): Promise<IDbResult>;
	getRestaurantByTableQrCode(qrCode: string): Promise<IDbResult>;
	getOpenHours(rstId: number): Promise<IDbResult>;
}

enum tableNames {
	restaurants      = 'restaurants',
	restaurantTables = 'restaurant_tables'
}

enum columnNames {
	id           = 'id',
	restaurantId = 'restaurant_id'
}

@injectable()
export class RestaurantDb implements IRestaurantDb {

	constructor(@inject(Inf.IDbClient) private dbKernel: DbClient) {
	}

	public getRestaurantListing(cityId: string): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get(tableNames.restaurants).where('city_id', cityId);
		let sql = dynSql.toSql();

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurantListing() :: error ::", error);
				reject(error);
			});
		});
	}

	public getRestaurantByQrCode(qrCode: string): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get(tableNames.restaurants).where('qr_code', qrCode);
		let sql = dynSql.toSql();

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurantByQrCode() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get resuarant by customer id
	 * @param {string} custId
	 * @returns {Promise<IDbResult>}
	 */
	public getRestaurantByCustomerId(custId: string): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get(tableNames.restaurants).where('customer_id', custId);
		let sql = dynSql.toSql();

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurantByCustomerId() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Retrieve restaurant from a qr code assigned to a restaurant table
	 * @param {string} qrCode
	 * @returns {Promise<IDbResult>}
	 */
	public getRestaurantByTableQrCode(qrCode: string): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get(tableNames.restaurantTables).where('qr_code', qrCode);
		let sql = dynSql.toSql();

		return new Promise((resolve, reject) => {
			this.dbKernel.query(sql).then((dbRes) => {

				let tableRow     = dbRes.safeGetFirstRow();
				let restaurantId = tableRow.asInt(columnNames.restaurantId)

				return this.getRestaurantById(restaurantId);

			}).catch((error) => {
				Logger.logError("getRestaurantByQrCode() :: error ::", error);
				reject(error);
			});
		});
	}

	public getRestaurantById(id: number): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get('restaurants').where('id', id);
		let sql = dynSql.toSql();

		Logger.logPurple('SQL :: getRestaurant ::', sql);

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurant() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get restaurant tables
	 * @param {string} rstId
	 * @returns {Promise<IDbResult>}
	 */
	public getRestaurantTables(rstId: number): Promise<IDbResult> {
		let sql = new SqlIgniter().selectAll('restaurant_tables')
								  .where('restaurant_id', rstId)
								  .toSql();

		Logger.logPurple('SQL :: getRestaurantTables ::', sql);

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurantTables() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get restaurant open hours
	 * @param {string} rstId
	 * @returns {Promise<IDbResult>}
	 */
	public getOpenHours(rstId: number): Promise<IDbResult> {
		Logger.logPurple("getOpenHours :: restaurantId ::", rstId);

		let dynSql = new SqlIgniter();
		dynSql.get('restaurant_open_hours').where('restaurant_id', rstId);
		let sql = dynSql.toSql();

		Logger.logPurple("getOpenHours :: SQL ::", sql);

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getOpenHours() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get Social Media Data
	 * @param {number} rstId
	 * @returns {Promise<IDbResult>}
	 */
	public getSocialMedia(rstId: number): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get('restaurant_social').where('restaurant_id', rstId);
		let sql = dynSql.toSql();

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getSocialMedia() :: error ::", error);
				reject(error);
			});
		});
	}

	/**
	 * Get Restaurant Location
	 * @param rstId - Restaurant Id
	 */
	public getRestaurantLocation(rstId: number): Promise<IDbResult> {
		let dynSql = new SqlIgniter();
		dynSql.get('restaurant_location').where('restaurant_id', rstId);
		let sql = dynSql.toSql();

		Logger.logPurple('SQL :: getRestaurantLocation ::', sql);

		return new Promise((resolve, reject) => {
			return this.dbKernel.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getRestaurantLocation() :: error ::", error);
				reject(error);
			});
		});
	}
}
