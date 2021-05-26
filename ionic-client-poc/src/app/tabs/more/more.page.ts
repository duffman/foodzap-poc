/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }          from '@angular/core';
import { OnInit }             from '@angular/core';
import { NavController }      from "@ionic/angular";
import { RoutingPathService } from "@services/routing-path.service";

@Component(
	{
		selector:    'app-more',
		templateUrl: './more.page.html',
		styleUrls:   ['./more.page.scss'],
	})
export class MorePage implements OnInit {
	constructor(
		private routingService: RoutingPathService,
		public navCtrl: NavController) {
	}

	ngOnInit() {
	}

	goto(path: string) {

	}

	goBack() {
		this.routingService.goBack();
	}
}
