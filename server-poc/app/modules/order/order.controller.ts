/**
 * Coldmind AB ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2020 Coldmind AB, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source id contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source id, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg <patrik.forsberg@coldmind.com>
 * File Date: 2020-03-27 01:36
 */

import { IRestApiController } from "@api/api-controller";
import { LogService }         from "@app/services/log.service";
import { Inf }                from "@core/interfaces";
import { OrderService }       from "@modules/order/order.service";
import { Response }           from "express";
import { Request }            from "express";
import { Router }             from "express";
import { inject }             from "inversify";
import { injectable }         from "inversify";

@injectable()
export class OrderController implements IRestApiController {
	debugMode: boolean;

	constructor(
		@inject(Inf.IOrderService) private orderService: OrderService,
		@inject(Inf.ILogService) private logger: LogService
	) {
	}


	initRoutes(routes: Router): void {
		routes.get("/order", this.order.bind(this));
	}

	private order(req: Request, resp: Response): void {
		let orderData = req.body.orderData;

		this.orderService.newOrder(orderData);
	}
}
