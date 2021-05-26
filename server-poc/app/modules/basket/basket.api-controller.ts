//
// Module Generated by Backend Igniter CLI v[_CLIVERSION_]
// File Created: [_NOW_]
//

import { injectable }                      from "inversify";
import { IRestApiController }              from "@api/api-controller";
import { Request, Response, Router }       from "express";
import { Logger }                          from "@cli/cli.logger";

@injectable()
export class BasketApiController implements IRestApiController {
	debugMode: boolean;

	initRoutes(routes: Router): void {
		Logger.logBlue("BasketApiController :: initRoutes");

		routes.get( "/session/basket", this.sessionBasketGet.bind(this));
		routes.post("/session/basket", this.sessionBasketSet.bind(this));

		routes.all("/basket/get", this.basketGet.bind(this));
		routes.all("/basket/add", this.basketAdd.bind(this));
		routes.all("/basket/remove", this.basketRemove.bind(this));
		routes.all("/basket/clear", this.basketClear.bind(this));
	}

	private sessionBasketGet(req: Request, resp: Response): void {
		Logger.logCyan("sessionBasketGet");

		if (!req.session['basket']) {
			req.session['basket'] = {};
		}

		resp.json(req.session['basket']);
		resp.end();
	}

	private sessionBasketSet(req: Request, resp: Response): void {
		Logger.logCyan("sessionBasketSet");
		req.session['basket'] = req.body;
	}

	//
	//
	//

	private basketGet(req: Request, resp: Response): void {
		Logger.logCyan("basketGet");
	}

	private basketAdd(req: Request, resp: Response): void {
		Logger.logCyan("basketAdd");
	}

	private basketRemove(req: Request, resp: Response): void {
		Logger.logCyan("basketRemove");
	}

	private basketClear(req: Request, resp: Response): void {
		Logger.logCyan("basketClear");
	}
}
