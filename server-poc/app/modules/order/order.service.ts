/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-21
 */

import { IActionResult } from "@models/action-result";
import { injectable }    from "inversify";

export interface IOrderService {

}

@injectable()
export class OrderService implements IOrderService {
	constructor() {
	}

	genOrderId() {
		let result = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			result += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return result;
	}

	public newOrder(data: any): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
			console.log('** ORDER SERVICE **');
			console.log('DATA ::', data);
			console.log('******selectMenu*************');

			resolve(null);
		});
	}
}

let service = new OrderService();
let orderId = service.genOrderId();

console.log('TEST ORDER ----------------+')
console.log('ORDER REF ::', orderId);
