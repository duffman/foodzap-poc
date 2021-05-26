/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { BaseController }     from "@api/base.controller";
import { ControllerHelper }   from "@api/controller.helper";
import { Inf }                from "@core/interfaces";
import { IUser }              from "@modules/user/models/user.model";
import { injectable }         from "inversify";
import { inject }             from "inversify";
import { IRestApiController } from "@api/api-controller";
import { Router }             from "express";
import { Request }            from "express";
import { Response }           from "express";
import { Logger }             from "@cli/cli.logger";
import { UserDb }             from "@modules/user/user-db";
import { User }               from "@modules/user/models/user.model";
import { AppSettings }        from "@app/app.settings";

@injectable()
export class AuthJwtApiController extends BaseController implements IRestApiController {
	constructor(
		@inject(Inf.IAppSettings) private appSettings: AppSettings,
		@inject(Inf.IUserDb) private userDb: UserDb,
		public debugMode: boolean = false
	) {
		super();
		this.debugMode = true;
		ControllerHelper.logAttach(this);
	}

	initRoutes(routes: Router): void {
		Logger.logBlue(`${this.constructor.name} :: initRoutes`);

		routes.all("/jwt/auth", this.authUser.bind(this));
		routes.all("/jwt/register", this.registerUser.bind(this));
	}

	private authUser(req: Request, resp: Response): void {
	}

	/* 2020-09-08 - Temp Disabled awaiting.... uhmm to start using JWT
	private authUser(req: Request, resp: Response): void {
		if (this.debugMode) { Logger.logGreen('authUser') }
		console.log('auth User :: body ::', req.body)

		const email = req.body.email;
		const password = req.body.password;

		this.userDb.getUserByEmail(email).then(res => {
			let result: any;
			if (res.any()) {
				let dbRow = res.safeGetFirstRow();

				let user = new User(
					dbRow.asInt('id'),
					dbRow.asStr('field'),
					dbRow.asStr('email'),
					dbRow.asStr('password'),
					dbRow.asInt('customer_id')
				);

				const result = bcrypt.compareSync(password, user.password);

				console.log('getUserByEmail :: bcrypt :: RESULT ::', result);

				return user;
			}

		}).then((user: IUser) => {
			return user;

		}).then((userData: IUser) => {

		});

		//
		// Generate App Secret
		//
		let secret = '!balleFjongBerga8398457!';

		bcrypt.hash(`${secret}${email}`, 10).then(hashedSecret => {
			return hashedSecret;

		}).then(hashedSecret => {

			if (this.debugMode) {
				Logger.logGreen('emai ::' + email);
				Logger.logGreen('password ::' + password);
			}

			console.log("AUTH_SECRET ::", secret);

		});
	}
	*/

	/**
	 * Create a new user
	 * @param req
	 * @param resp
	 */
	private registerUser(req: Request, resp: Response): void {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		const userData = new User(
			null,
			email,
			name,
			password
		);

		console.log("registerUser ::", userData);

		this.userDb.createUser(userData).then(res => {
			console.log("CREATE USER RES ::", res);

		}).catch(err => {
			this.fatalError(req, resp);
		});
	}
}
