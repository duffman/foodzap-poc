/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { JsonHelper }            from "@app/helpers/json.helper";
import { Logger }                from "@cli/cli.logger";
import { Inf }                   from "@core/interfaces";
import { VarUtils }              from "@core/utils/var/var-utils";
import { ISQLTableDataRow }      from "@zynDb/data-containers/sql-table-data-row";
import { IDbResult }             from "@zynDb/db-result";
import { RestaurantListing }     from "@modules/restaurant/models/restaurant-listing";
import { IRestaurantTableModel } from "@modules/restaurant/models/restaurant-table.model";
import { SocialMediaModel }      from "@modules/restaurant/models/social-media.model";
import { RestaurantDb }          from "@modules/restaurant/restaurant.db";
import { inject, injectable }    from 'inversify';
import { InfoModel }             from '../models/info.model';
import { LocationModel }         from '../models/location.model';
import { OpenHoursModel }        from '../models/open-hours.model';
import { RestaurantModel }       from '../models/restaurant.model';

export interface IRestaurantService {
	getRestaurantListing(cityId: string): Promise<RestaurantListing>;
	getRestaurantById(id: number): Promise<RestaurantModel>
	getRestaurantLocation(rstId: number): Promise<LocationModel>;
	getRestaurantByQrCode(qrCode: string): Promise<RestaurantModel>
}

@injectable()
export class RestaurantService implements IRestaurantService {
	debugMode: boolean = true;

	constructor(
		@inject(Inf.IRestaurantDb) private restaurantDb: RestaurantDb) {
	}

	public getRestaurantListing(cityId: string): Promise<RestaurantModel[]> {
		let scope      = this;
		let err: Error = undefined;
		let result     = new Array<RestaurantModel>();

		function getListing(): Promise<any> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantListing(cityId).then(res => {
					resolve(res);
				}).catch(err => {
					Logger.logError("getRestaurantListing :: error ::", err);
					reject(err);
				});
			});
		}

		function getRestaurant(rstId: number): Promise<RestaurantModel> {
			return scope.getRestaurantById(rstId);
		}

		async function getFullListing(): Promise<void> {
			try {
				let listing = await getListing();

				let rstList = new Array<RestaurantModel>();

				for (let row of listing.resultSet) {
					let rstData = await getRestaurant(row.asStr("id"));
					result.push(rstData);
				}

				console.log("RST LIST ::", result);

			}
			catch (err) {
				Logger.logError("Error getting full Listing ::", err);
			}
		}

		return new Promise((resolve, reject) => {
			getFullListing().then(() => {
				if (err !== undefined) {
					throw err;
				}
				else {
					resolve(result);
				}

			}).catch(err => {
				reject(err);
			})
		});
	}

	/**
	 * Populate OpenHours model from Database Result
	 * @param {IDbResult} dbRes
	 * @returns {}
	 */
	public compileOpenHoursModel(dbRes: IDbResult): OpenHoursModel {
		let result = new OpenHoursModel();

		if (dbRes === null || dbRes.success === false) {
			Logger.logError('compileOpenHoursModel :: dbRes === null');
			return result;
		}

		let openHoursRows = dbRes.result.dataRows;

		/*
		 { field: 'id', value: 1 },
		 { field: 'restaurant_id', value: 1 },
		 { field: 'day', value: 0 },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       4å
		 { field: 'open_at', value: '06:00:00' },
		 { field: 'close_at', value: '10:00:00' }
		 */

		for (let row of openHoursRows) {
			let openAt  = row.asStr("open_at");
			let closeAt = row.asStr("close_at");
			let day     = row.asInt("day");

			result.addTimeSlot(
				day,
				row.asBool("is_open"),
				openAt,
				closeAt
			);
		}

		return result;
	}

	/**
	 * Populate Social Media model from Database Result
	 * @param {IDbResult} dbRes
	 * @returns {SocialMediaModel}
	 */
	public compileSocialMediaModel(dbRes: IDbResult): SocialMediaModel {
		let result = new SocialMediaModel();

		if (dbRes === null || dbRes.success === false) {
			Logger.logError('compileSocialMediaModel :: dbRes === null');
			return result;
		}

		let dataRow = dbRes.safeGetFirstRow();

		if (dataRow.isEmpty === false) {
			result.id        = dataRow.asNum("id");
			result.facebook  = dataRow.asStr("facebook");
			result.instagram = dataRow.asStr("instagram");
			result.skype     = dataRow.asStr("skype");
		}

		return result;
	}

	public getSocialMedia(rstId: number): Promise<IDbResult> {
		console.log("getSocialMedia :: rstId ::", rstId);

		return new Promise((resolve, reject) => {
			this.restaurantDb.getSocialMedia(rstId).then(res => {
				resolve(res);

			}).catch(err => {
				if (this.debugMode) {
					Logger.logError("getOpenHours ::", err);
				}
				reject(err);
			});
		});
	}

	/**
	 * Retrieve Restaurant data by QR Code
	 * @param {string} qrCode
	 * @returns {Promise<RestaurantModel>}
	 */
	public getRestaurantByQrCode(qrCode: string): Promise<RestaurantModel> {
		const scope = this;
		let result: RestaurantModel = undefined;

		async function getIdByQrCode(): Promise<number> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantByQrCode(qrCode)
					 .then((res: IDbResult) => {

						 if (res.any()) {
							 console.log("getRestaurantByQrCode ::", res.resultSet);

							 let dataRow: ISQLTableDataRow = res.safeGetFirstRow();
							 let restaurantId = VarUtils.parseInt(dataRow.asStr('id'));

							 if (restaurantId) {
								 resolve(restaurantId);
							 }
							 else {
								 resolve(undefined);
							 }
						 }
						 else {
							 console.log("getRestaurantByQrCode :: NOT FOUND ::", qrCode);
							 resolve(undefined);
						 }

					 }).catch(err => {
					resolve(undefined);
				})
			});
		}

		async function execute(): Promise<void> {
			let id = await getIdByQrCode();

			if (id) {
				result = await scope.getRestaurantById(id);
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				resolve(result);
			});
		});
	}

	/**
	 * Get restaurant by customer id
	 * @param {string} custId
	 * @returns {Promise<RestaurantModel>}
	 */
	public getRestaurantByCustId(custId: string): Promise<RestaurantModel> {
		const scope = this;
		let result: RestaurantModel = undefined;

		async function getIdByCustId(): Promise<number> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantByCustomerId(custId)
					 .then((res: IDbResult) => {

						 if (res.any()) {
							 console.log("getRestaurantByCustomerId ::", res.resultSet);

							 let dataRow: ISQLTableDataRow = res.safeGetFirstRow();
							 let restaurantId = VarUtils.parseInt(dataRow.asStr('id'));

							 if (restaurantId) {
								 resolve(restaurantId);
							 }
							 else {
								 resolve(undefined);
							 }
						 }
						 else {
							 console.log("getRestaurantByCustomerId :: NOT FOUND ::", custId);
							 resolve(undefined);
						 }

					 }).catch(err => {
					resolve(undefined);
				})
			});
		}

		async function execute(): Promise<void> {
			let id = await getIdByCustId();

			if (id) {
				result = await scope.getRestaurantById(id);
			}
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				resolve(result);
			});
		});
	}

	/**
	 * Get full restaurant info by id
	 * @param {number} id
	 * @returns {Promise<RestaurantModel>}
	 */
	public getRestaurantById(id: number): Promise<RestaurantModel> {
		let scope                   = this;
		let result: RestaurantModel = undefined;

		//
		// Get Restaurant Info
		//
		function prepImage(image: string, id: number): string {
			return `coldmind.com:8080/img/restaurants/id_${id}/${image}`;
		}

		//
		// Get Restaurant Info
		//
		function getRestaurantInfo(rstId: number): Promise<InfoModel> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantById(rstId).then(res => {
					let row = res.safeGetFirstRow();

					if (row.isEmpty === false) {
						let infoModel = new InfoModel();

						//
						// Populate models
						//
						infoModel.id           = row.asNum('id');
						infoModel.customerId   = row.asNum('customer_id');
						infoModel.homeDelivery = row.asNum('home_delivery');
						infoModel.qrCode       = row.asStr('qr_code');
						infoModel.name         = row.asStr('name');
						infoModel.description  = row.asStr('description');
						infoModel.websiteUrl   = row.asStr('website');
						infoModel.phoneNr      = row.asStr('phone_nr');
						infoModel.openHoursId  = row.asInt('open_hours_id');
						infoModel.geoLocation  = row.asStr('geo_location');

						infoModel.coverImage = prepImage(row.asStr('cover_image'), infoModel.id);
						infoModel.logoImage  = prepImage(row.asStr('logo_image'), infoModel.id);

						infoModel.branding.brandingData = row.asStr('branding');

						resolve(infoModel);

					}
					else {
						resolve(null);
					}

				}).catch(err => {
					if (scope.debugMode) {
						Logger.logError("getRestaurantInfo :: ERROR ::", err);
					}
					reject(err);
				});
			});
		}

		//
		// Get Restaurant Tables
		//
		function getRestaurantTables(rstId: number): Promise<IRestaurantTableModel[]> {
			function compileTableArray(dbResult: IDbResult): IRestaurantTableModel[] {
				return new Array<IRestaurantTableModel>();
			}

			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantTables(rstId).then((res: IDbResult) => {
					let result: IRestaurantTableModel[];
					result = compileTableArray(res);

					resolve(result);

				}).catch(err => {
					Logger.logError("getRestaurantTables :: error ::", err)
				});
			});
		}

		//
		// Retrieve restaurant open hours
		//
		function getLocation(rstId: number): Promise<LocationModel> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getRestaurantLocation(rstId).then(res => {
					let row = res.safeGetFirstRow();

					if (row.isEmpty === false) {
						let model       = new LocationModel();
						model.latitude  = row.asStr('latitude');
						model.longitude = row.asStr('longitude');

						model.address = row.asStr("address");
						model.zipCode = row.asStr("zip_code");

						resolve(model);

					}
					else {
						resolve(null);
					}

				}).catch(err => {
					if (scope.debugMode) {
						Logger.logError("getRestaurantLocation ::", err);
					}
					reject(err);
				});
			});
		}

		//
		// Retrieve restaurant open hours
		//
		function getOpenHours(rstId: number): Promise<IDbResult> {
			return new Promise((resolve, reject) => {
				scope.restaurantDb.getOpenHours(rstId).then(res => {
					resolve(res);

				}).catch(err => {
					if (scope.debugMode) {
						Logger.logError("getOpenHours ::", err);
					}

					reject(err);
				});
			});
		}

		//
		//
		//
		async function getFullData(rstId: number, ref?: string): Promise<void> {
			try {
				console.log("getFullData :: caller ref ::", ref);

				let infoModel = await getRestaurantInfo(rstId);

				if (!infoModel) {
					Logger.logError("Restaurant not found");
					result = null;
					return;
				}

				result = new RestaurantModel();

				JsonHelper.echoJson(infoModel);
				result.info = infoModel;

				//
				// Get Restaurant Location
				//
				result.location = await getLocation(infoModel.id);

				//
				// Get Restaurant Open openHours
				//
				let restaurantHours = await getOpenHours(infoModel.id);
				let openHoursModel  = scope.compileOpenHoursModel(restaurantHours);

				JsonHelper.echoJson(openHoursModel);
				result.openHours = openHoursModel;

				//
				// Get Restaurant Social Media Info
				//
				let socialMediaData = await scope.getSocialMedia(infoModel.id);

				console.log(">>> socialMediaData ::", socialMediaData);

				let socialMediaModel = scope.compileSocialMediaModel(socialMediaData);

				JsonHelper.echoJson(socialMediaModel);
				result.socialMedia = socialMediaModel;

			}
			catch (ex) {
				Logger.logFatalError("getFullData failed :: error ::", ex);
			}
		}

		return new Promise((resolve, reject) => {
			/*
			const rstId   = Number.parseInt(id);
			const idValid = (
				(Number.isNaN(rstId) === false) &&
				rstId > 0
			);

			if (idValid === false) {
				Logger.logError("getRestaurantById :: provided id is invalid ::", id);
				reject("Invalid restaurant id");

			}
			else {*/
				getFullData(id).then(() => {
					Logger.logGreen("getFullData :: promise fulfilled");

					if (this.debugMode) {
						Logger.logSign("Final Result - RESOLVE")
						JsonHelper.jsonMessage("JSON Result", result);
					}

					resolve(result);

				}).catch((err) => {
					Logger.logError("getFullData :: EXCEPTION ::", err);
					reject(err);
				});
			//}
		});
	}

	public getRestaurantLocation(rstId: number): Promise<LocationModel> {
		return new Promise((resolve, reject) => {});
	}
}
