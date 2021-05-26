/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");0
 *
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

import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { AdminController }   from "@app/admin/admin-controller";
import { RestaurantService } from "@sdk/restaurant/restaurant.service";
import { AppService }        from "@sdk/services/app.service";
import { SessionService }    from "@sdk/services/session.service";

@Component(
	{
		selector:    'app-overview',
		templateUrl: './overview.page.html',
		styleUrls:   ['./overview.page.scss'],
	})
export class OverviewPage /* extends AdminController */ implements OnInit {
	selectedTab: string = 'address';
	restaurantName: string = 'Dinas Kök';

	constructor(
		private router: Router,
		private appService: AppService,
		private session: SessionService
	) {
		// super(router, appService, session);
	}

	ngOnInit() {
	}

	orderStickersPage() {
		this.router.navigate(['admin/order-stickers']);
	}

	private goToRestaurantHome(): void {
		this.router.navigate(['admin/restaurant']);
	}

	private goToOverview(): void {
		this.router.navigate(['admin/overview']);
	}

	public logOut() {
		if (this.session.dropSession()) {
			this.router.navigate(['/login']);
		}
 	}
}
