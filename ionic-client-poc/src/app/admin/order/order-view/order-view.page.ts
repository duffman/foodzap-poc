/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component } from '@angular/core';
import { OnInit }    from '@angular/core';
import { Socket }    from "ngx-socket-io";

@Component(
	{
		selector:    'app-order-view',
		templateUrl: './order-view.page.html',
		styleUrls:   ['./order-view.page.scss'],
	})
export class OrderViewPage implements OnInit {

	constructor(private socket: Socket) {
	}

	ngOnInit() {
	}

}
