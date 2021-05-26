/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit }  from '@angular/core';
import { RoutingPathService } from "@services/routing-path.service";

@Component(
	{
		selector:    'app-privacy',
		templateUrl: './privacy.page.html',
		styleUrls:   ['./privacy.page.scss'],
	})
export class PrivacyPage implements OnInit {

	constructor(
		private routingService: RoutingPathService
	) { }

	ngOnInit() {
	}

	goBack() {
		this.routingService.goBack();
	}
}
