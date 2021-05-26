/**
 * Coldmind AB ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2020 Coldmind AB, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg <patrik.forsberg@coldmind.com>
 * File Date: 2020-04-03 20:03
 */

import { IRestApiController } from "@api/api-controller";
import { Logger }             from "@cli/cli.logger";
import { Router }             from "express";
import { Request }            from "express";
import { Response }           from "express";
import { injectable }         from "inversify";

@injectable()
export class SessionApiController implements IRestApiController {
	constructor(public debugMode: boolean = false) {
	}

	public initRoutes(routes: Router): void {
		Logger.logBlue("SessionApiController :: initRoutes");
		routes.all("/cp", this.getRoot.bind(this));
	}

	private getRoot(req: Request, resp: Response): void {
		let count = (req.session['count']) ? req.session['count'] : 0;
		count++;

		req.session['count'] = count;

		resp.setHeader("x-powered-by", "IonicIgniter");

		resp.json({ rootKey: count });
	}
}
