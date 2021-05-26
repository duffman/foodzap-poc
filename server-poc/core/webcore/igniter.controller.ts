/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: February 2020
 */

import { IRestApiController } from "@api/api-controller";
import { ControllerHelper }   from "@api/controller.helper";
import { Router }             from "express";
import { Request }            from "express";
import { injectable }         from "inversify";

enum ReqType {
	String,
	Number,
	Boolean
}

interface ReqParam {
	name: string;
	reqType: ReqType;
	success: boolean;
}

@injectable()
export class IgniterController implements IRestApiController {
	debugMode: boolean;

	constructor() {
		ControllerHelper.logAttach(this);
	}

	/*
	verifyParams(req: Request, params: ReqParam[]): boolean {
		let value = req.param();

		function haveParam(name: string): boolean {
			return (value !== undefined);
		}

		for (let param of params) {
			if (haveParam(param.name)) {
				if ((param.reqType === ReqType.Boolean) && (value.match(/^[0-9]+$/) != null)) {
					param.success = true;
				}

				if ((param.reqType === ReqType.Number) && (value.match(/^[0-9]+$/) != null)) {
					param.success = true;
				}

			}
			else {
				return false;
			}
		}
	}
	*/
	public getParam(req: Request, name: string, defValue?: any): any {

		let val = req.param(name); // req.params[field]; //req.param(field);

		if (!val && defValue) {
			val = defValue;
		}

		//req.params, req.body or req.query

		return val;
	}

	public getParamAsStr(name: string, defValue?: any): string {
		let val = ""; //this.getParam(field, defValue);
		return val;
	}

	initRoutes(routes: Router): void {
	}
}
