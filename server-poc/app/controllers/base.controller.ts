import { Errors }     from "@app/app-errors";
import { Response }   from "express";
import { Request }    from "express";
import { injectable } from "inversify";

/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface IBaseController {

}

@injectable()
export class BaseController implements IBaseController {
	public respError(req: Request, resp: Response, httpCode: number, errCode: number,
					 message?: string, data?: any): void
	{
		let requestUrl = req.baseUrl + req.path;
		message = message ? message : '';
		data = data ? data : '';

		let dataResp = {
			requestUrl: requestUrl,
			errorCode: errCode,
			'message': message,
			'data': data
		};

		resp.status(httpCode).json(dataResp);
	}

	public invalidParams(req: Request, resp: Response, ...params: string[]): void {
		this.respError(
			req,
			resp,
			500,
			Errors.REST_API_ERR,
			"Parameter Error",
			{
				parameters: params
			}
		);
	}

	public fatalError(req: Request, resp: Response, message: string = 'Internal Error'): void {
		resp.status(500).json({ error: message });
	}

	public static extFatalError(req: Request, resp: Response, message: string = 'Internal Error'): void {
		resp.status(500).json({ error: message });
	}

	public notFound(req: Request, resp: Response, message: string = 'Not found'): void {
		this.respError(
			req,
			resp,
			404,
			Errors.REST_NOT_FOUND,
			message
		);
		//resp.status(404).send(message);
	}

	public reqError(errNumber: number): any {
		return {
			status: "Request failed",
			errorCode: errNumber
		}
	}
}
