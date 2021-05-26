/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

import { IRestApiController } from "@api/api-controller";
import { BaseController }     from "@api/base.controller";
import { ControllerHelper }   from "@api/controller.helper";
import { AppSettings }        from "@app/app.settings";
import { Logger }             from "@cli/cli.logger";
import { Inf }                from "@core/interfaces";
import { AuthBCrypt }         from "@modules/auth/auth-bcrypt";
import { IUser }              from "@modules/user/models/user.model";
import { User }               from "@modules/user/models/user.model";
import { UserDb }             from "@modules/user/user-db";
import { Router }             from "express";
import { Request }            from "express";
import { Response }           from "express";
import { injectable }         from "inversify";
import { inject }             from "inversify";

export interface ICredentials {
	email: string;
	password: string;
}

export interface IAuthResponse {
	syncKey: string;
	userData: IUser;
	error: any;
}

@injectable()
export class AuthLoginApiController implements IRestApiController {
	baseRoute?: string;

	constructor(
		@inject(Inf.IAppSettings) private appSettings: AppSettings,
		@inject(Inf.IUserDb) private userDb: UserDb,
		public debugMode: boolean = false
	) {
		ControllerHelper.logAttach(this);
		this.debugMode = true;
	}

	/**
	 * Setup Express Routes
	 * @param {e.Router} routes
	 */
	initRoutes(routes: Router): void {
		Logger.logBlue(`${this.constructor.name} :: initRoutes`);

		routes.all("/user/login", this.loginUser.bind(this));
		routes.all("/admin/login", this.loginAdmin.bind(this));
		routes.all("/user/register", this.registerUser.bind(this));
		routes.all("/user/test", this.testAuth.bind(this));
	}

	private async testAuth(req: Request, resp: Response): Promise<void> {
		console.log('testAuth');

		let userData = await this.getUserByEmail('putte@gmail.com');

		let passMatch = await AuthBCrypt.instance().compare('kalle1', userData.password);

		console.log('PASSWORDS ::', userData.password);
		console.log('PASSWORDS MATCH ::', passMatch);

		return new Promise((resolve, reject) => {
			resp.end('Request Run :: ' + JSON.stringify(userData));
			resolve();
		});
	}

	/**
	 * Get user from DB by a given Email address
	 * @param {string} email
	 * @returns {Promise<IUser>}
	 */
	private async getUserByEmail(email: string): Promise<IUser> {
		return new Promise((resolve, reject) => {
			this.userDb.getUserByEmail(email).then(res => {
				let result: IUser = null;

				if (res.any()) {
					let dbRow = res.safeGetFirstRow();

					result = new User(
						dbRow.asInt('id'),
						dbRow.asStr('name'),
						dbRow.asStr('email'),
						dbRow.asStr('password'),
						dbRow.asInt('customer_id')
					);
				}

				resolve(result);

			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Send an error response back to the client.
	 * @param {e.Response} resp
	 * @param {number} code
	 * @param {string} message
	 */
	private errorResponse(resp: Response, code: number = 106, message?: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (code === 106) {
				message = "Invalid Credentials"
			}

			const errorMess = {
				errCode: code,
				error:   message
			};

			resp.json(errorMess);

			resolve();
		});
	}

	/**
	 * Extract Credentials from HTTP Request
	 * @param {e.Request} req
	 * @returns {ICredentials}
	 */
	private extractCredentials(req: Request): ICredentials {
		let result: ICredentials = null;
		if (req.body.email && req.body.password) {
			result = {
				email:    req.body.email,
				password: req.body.password
			}
		}

		return result;
	}

	createUserSession(userData: IUser, req: Request): void {
		let session         = req.session;
		session['userData'] = userData
		console.log("Session ::", req.session);

		let count = (req.session['count']) ? req.session['count'] : 0;
		count++;

		req.session['count'] = count;
	}

	private async loginAdmin(req: Request, resp: Response): Promise<void> {
		try {
			let res = this.loginUser(req, resp);
			Logger.log('loginAdmin ::', res);

		} catch (ex) {
			Logger.logError('loginAdmin', ex)
		}
	}

	/**
 * Login User Request, for this POST request an email and "password" is
 * expected.
 *
 * IMPORTANT!
 * If we encounter anything WRONG either if it´s not due to
 * wrong credentials like a DB error, always reply with the same message,
 * the reason is that we don´t want to give away any CLUES to a potential
 * man in the middle even when using HTTPS
 *
 * @param {e.Request} req
 * @param {e.Response} resp
 * @returns {Promise<void>}
 */
	private async loginUser(req: Request, resp: Response): Promise<void> {
		if (this.debugMode) {
			Logger.logGreen("loginUser", req.body);
		}

		let credentials = this.extractCredentials(req);
		console.log('Extracted Credentials ::', credentials);

		if (!credentials) {
			this.errorResponse(resp);
			return;
		}

		let userEmail = credentials.email;
		let userData  = await this.getUserByEmail(userEmail);

		console.log('1:) loginUser :: userData ::', userData);

		if (!userData || !userData.email || !userData.password) {
			console.log('loginUser :: invalid credentials :: RETURNING ::');
			this.errorResponse(resp);
			return;
		}

		console.log('userData ::', userData);

		// We are receiving a password which is bcrypt hashed the same
		// way it is stored in the DB, however since bcrypt generates unique
		// hashes every time we can´t simply do an equals comparison, we
		// need to use the compare function provided in the bcrypt library,
		// this function uses the internal algorithms in order to verify
		// the hashes.
		let compareRes: boolean;

		console.log("Comparing :: credentials.password ::", credentials.password);
		console.log("UserData :: userData.password ::", userData.password);

		let passMatch = await AuthBCrypt.instance().compare(credentials.password, userData.password);

		if (passMatch) {
			this.createUserSession(userData, req);
			userData.password = null;

			const loginResult = {
				success: true,
				user:    userData
			}

			resp.json(loginResult);
		}
		else {
			Logger.logError("BCrypt Error")
			this.errorResponse(resp);
		}
	}

	/**
	 * Create a new user
	 * @param req
	 * @param resp
	 */
	private async registerUser(req: Request, resp: Response): Promise<void> {

		async function hashPassword(value: string): Promise<string> {
			return new Promise((resolve, reject) => {
				AuthBCrypt.instance().genPassCrypt(value)
			});
		}

		const name     = req.body.name;
		const email    = req.body.email;
		const password = await hashPassword(req.body.password);

		const userData = new User(
			null,
			email,
			name,
			password
		);

		console.log("registerUser ::", userData);

		return new Promise((resolve) => {
			this.userDb.createUser(userData).then(res => {
				console.log("CREATE USER RES ::", res);

			}).catch(err => {
				BaseController.extFatalError(req, resp);
			});

			resolve();
		});
	}
}
