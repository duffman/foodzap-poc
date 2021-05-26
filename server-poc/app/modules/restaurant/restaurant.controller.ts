/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * December 2019
 */

import { IRestApiController } from '@api/api-controller';
import { BaseController }     from "@api/base.controller";
import { ControllerHelper }   from '@api/controller.helper';
import { Errors }             from "@app/app-errors";
import { JsonHelper }         from '@app/helpers/json.helper';
import { RestaurantService }  from '@app/modules/restaurant/services/restaurant.service';
import { Logger }             from '@cli/cli.logger';
import { Inf }                from "@core/interfaces";
import { VarUtils }           from "@core/utils/var/var-utils";
import { Router }             from 'express';
import { Request }            from 'express';
import { Response }           from 'express';
import { injectable }         from 'inversify';
import { inject }             from 'inversify';

@injectable()
export class RestaurantController extends BaseController implements IRestApiController {
	debugMode: boolean;
	baseRoute = "/restaurant";

	constructor(
		@inject(Inf.IRestaurantService) private service: RestaurantService) {
		super();
		ControllerHelper.logAttach(this);
	}

	public initRoutes(routes: Router): void {
		routes.all(this.baseRoute + "/cp", this.testRequest.bind(this));

		routes.all(this.baseRoute, this.getRestaurant.bind(this));
		routes.all(this.baseRoute + "/qrscan", this.getByQrCode.bind(this));
		routes.all(this.baseRoute + "/custid", this.getByCustomerId.bind(this));
		routes.get(this.baseRoute + "/listing/:cityId", this.getListing.bind(this));
		routes.get(this.baseRoute + "/:restId", this.getRestaurantById.bind(this));
		routes.all(this.baseRoute + "/social/:restId", this.getSocialMedia.bind(this));
	}

	private testRequest(req: Request, resp: Response): void {
		resp.end("testRequest");
	}

	/**
	 * Get Restaurant Listing
	 * @param req - Request Object
	 * @param resp - Response Object
	 */
	private getListing(req: Request, resp: Response): void {
		/*
		 let getCityId = req.query.cityId;
		 let postCityId = req.body.cityId;

		 Logger.logGreen("GET ID ::", getCityId);
		 Logger.logCyan("BODY ID ::", postCityId);

		 let cityId = 1;
		 */

		this.service.getRestaurantListing(req.params.cityId).then(data => {
			resp.json(data);
		}).catch(err => {
			Logger.logRed("getRestaurantListing :: error ::", err);
			resp.json(this.reqError(Errors.REST_API_ERR));
		});
	}

	private getRestaurant(req: Request, resp: Response): void {
		Logger.log('getRestaurant','iiiiiiiiii');

		let restId = req.body.id;

		if (!restId) {
			restId = VarUtils.parseInt(req.params.restId);
		}

		if (!restId) {
			Logger.logError("getRestaurant :: id missing", restId);
			this.notFound(req, resp, 'Invalid id');
			return;
		}

		this.echoRestaurantById(restId, req, resp);
	}

	/**
	 *
	 * @param req - Request Object
	 * @param resp - Response Object
	 */
	private getRestaurantById(req: Request, resp: Response): void {
		let restId = VarUtils.parseInt(req.params.restId);

		if (!restId) {
			Logger.logError("getRestaurant :: restId missing", restId);
			this.notFound(req, resp, 'Invalid Restaurant Id');
			return;
		}

		this.echoRestaurantById(restId, req, resp);
	}

	public echoRestaurantById(id: number, req: Request, resp: Response): void {
		this.service.getRestaurantById(id).then(res => {
			console.log('getRestaurantById::::', res);
			resp.json(res);
			resp.end();

		}).catch(err => {
			Logger.logError("getRestaurantData ::", err);
			this.fatalError(req, resp);
		});
	}

	public getByCustomerId(req: Request, resp: Response): void {
		Logger.log('getByCustomerId ::', req);
		let custId: any = req.query.id;

		if (!custId) {
			custId = req.body.id;
		}

		if (!custId) {
			Logger.logError("getByCustomerId :: Customer ID Missing", custId);
			this.notFound(req, resp, "Invalid Customer ID");
			return;
		}

		this.service.getRestaurantByCustId(custId).then(res => {
			JsonHelper.echoJson(res, "getByCustomerId");

			if (res) {
				resp.json(res);
			}
			else {
				this.notFound(req, resp, "Customer ID Not Found");
			}

		}).catch(err => {
			Logger.logError("ERROR :: getByCustomerId", err);
			this.respError(req, resp, 500, Errors.REST_API_ERR);
		});
	}


	/**
	 * Find Restaurant for a given QR Code
	 * @param {e.Request} req
	 * @param {e.Response} resp
	 */
	public getByQrCode(req: Request, resp: Response): void {
		console.log('getByQrCode ::', req);
		let qrCode: any = req.query.code;
		if (!qrCode) qrCode = req.body.code;

		if (!qrCode) {
			Logger.logError("getByQrCode :: qrCodeMissing", qrCode);
			this.notFound(req, resp, 'Invalid QR Code');
			return;
		}

		this.service.getRestaurantByQrCode(qrCode).then(res => {
			JsonHelper.echoJson(res, "getRestaurantByQrCode");

			if (res) {
				resp.json(res);
			}
			else {
				Logger.logError(`getByQrCode :: Not Found ::`, qrCode);
				this.notFound(req, resp, 'QR Code Not Found');
			}

		}).catch(err => {
			Logger.logError("ERROR :: getByQrCode", err);
			this.respError(req, resp, 500, Errors.REST_API_ERR);
		});
	}

	/**
	 * Get Restaurant Social Media Info
	 * @param {e.Request} req
	 * @param {e.Response} resp
	 */
	private getSocialMedia(req: Request, resp: Response): void {
		let rstId: any = req.query.rstId;

		if (!rstId) {
			Logger.logError("getSocialMedia :: rstId", rstId);
			this.notFound(req, resp, "Restaurant Id missing");
			return;
		}

		this.service.getSocialMedia(rstId).then(res => {
			resp.json(res);
		}).catch(err => {
			Logger.logError("getSocialMedia", err);
			this.fatalError(req, resp);
		});
	}
}
