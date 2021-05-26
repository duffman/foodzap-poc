/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */

import { injectable }         from "inversify";
import { Router }             from "express";
import { Request, Response }  from "express";
import { GoogleTranslateApi } from "@modules/google-translate/google-translate-api";
import { IRestApiController } from "@api/api-controller";
import { IgniterController }  from "@core/webcore/igniter.controller";

@injectable()
export class TranslateController extends IgniterController implements IRestApiController {
	debugMode: boolean;

	constructor() {
		super();
	}

	public initRoutes(routes: Router): void {
		routes.all("/translate", this.translate.bind(this));
	}

	private translate(req: Request, resp: Response): void {
		let api = new GoogleTranslateApi();
		let fromLangCode = req.param('fc');
		let toLangCode = req.param('tc');
		let text = req.param('text');

		let transRes = api.translate(text, fromLangCode, toLangCode).then(res => {
			resp.json(res);
		}).catch(err => {
			resp.json({error: "trans_error"});
		});
	}
}
