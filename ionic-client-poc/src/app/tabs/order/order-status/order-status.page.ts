/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { OrderService } from "@sdk/order/order.service";
import { Observable }   from "rxjs";

@Component(
	{
		selector:    'app-order-status',
		templateUrl: './order-status.page.html',
		styleUrls:   ['./order-status.page.scss'],
	})
export class OrderStatusPage implements OnInit {
	constructor(private orderService: OrderService) {
	}

	ngOnInit() {
	}

	private canCancel(): boolean {
		return true;
	}

	private cancelOrder(orderId: string): void {
		//this.orderService.cancelOrder(orderId);
	}
}
