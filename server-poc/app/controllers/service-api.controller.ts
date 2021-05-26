/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { WebApp }             from "@app/webapp";
import { injectable }         from "inversify";
import { IRestApiController } from "@api/api-controller";
import { Request }            from "express";
import { Response }           from "express";
import { NextFunction }       from "express";
import { Router }             from "express";
import { SessionModel }       from "@models/session.model";
import { JsonHelper }         from "@app/helpers/json.helper";

@injectable()
export class ServiceApiController implements IRestApiController {
	constructor(public debugMode: boolean = false) {}

	public initRoutes(routes: Router): void {
		let scope = this;
		routes.all("/", this.getRoot.bind(this));
		routes.all("/token", this.getToken.bind(this));
		routes.all("/session", this.apiGetSessionData.bind(this));
	}

	/* 2020 - DO INVESTIGATE

		app.get('/', (req, res) => {
			if (req.session.views) {
				req.session.views++
				res.send(`Returning client (${req.session.views} times})`)
			}
			else {
				req.session.views = 1
				res.send('New client')
			}
		});

		app.get('/destroy', (req, res) => {
			req.session.destroy()
			res.send('Session destroyed')
		});
	}
	*/

	private getRoot(req: Request, resp: Response): void {
		let html = `
				<html>
				   <head>
					  <title>Coldmind Backend Igniter</title>
				   </head>
				   <body>
				      Backend Igniter<br>Server version: 1.7.8<br />
				      <small>Copyright © Coldmind Software 1998-2020</small>
				   </body>
				</html>		
				`;

		resp.status(200).send(html);
	}

	private getToken(req: Request, resp: Response): void {
		if (!req.session['data']) {
			let sessId = Number.parseInt(req.session.id);
			req.session['data'] = new SessionModel(sessId);
		}

		console.log("TEST :: 1::", typeof req.session['data']);
		console.log("TEST :: 2::", req.session['data']);

		let sessData: SessionModel = req.session['data'];

		if (sessData) {
			console.log("REQ A >");
			sessData.counter++;
			req.session['data'] = sessData;
		} else {
			console.log("REQ B ::", req.session);
		}

		let data = "<html><pre>"
			+ JSON.stringify(req.session, null, 4)
			+ "</pre></html>";


		resp.end(data);  //json({sessionId: req.session});
	}

	private apiGetSessionData(req: Request, resp: Response, next: NextFunction): void {
		let responseData = {
			key: req.session.id,
			numVen: 4
		};

		resp.json(responseData);
		next();
	}
}
