/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { OnInit }         from '@angular/core';
import { Component }      from '@angular/core';
import { Router }         from "@angular/router";
import { AppService }     from "@sdk/services/app.service";
import { SessionService } from "@sdk/services/session.service";

@Component(
	{
		selector:    'app-intro',
		templateUrl: './intro.page.html',
		styleUrls:   ['./intro.page.scss'],
	})
export class IntroPage implements OnInit {

	constructor(
		private router: Router,
		private appService: AppService,
		private userSession: SessionService
	) {
	}

	ngOnInit() {
		if (this.userSession.haveSession()) {
			this.goToOverview();
		}
		else if (this.appService.havePreviousLogin()) {
			this.router.navigate(['/login']);
		}
	}

	goToOverview(): void {
		this.router.navigate(['admin/overview']);
	}
}
