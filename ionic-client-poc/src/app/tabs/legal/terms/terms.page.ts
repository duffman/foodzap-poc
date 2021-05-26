/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit }  from '@angular/core';
import { RoutingPathService } from "@services/routing-path.service";

@Component(
	{
		selector:    'app-terms',
		templateUrl: './terms.page.html',
		styleUrls:   ['./terms.page.scss'],
	})
export class TermsPage implements OnInit {
	constructor(
		private routingService: RoutingPathService
	) { }

	ngOnInit() {
	}

	goBack() {
		this.routingService.goBack();
	}
}
