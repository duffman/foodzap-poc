/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }     from "@angular/core";
import { Router }         from "@angular/router";
import { AppService }     from "@sdk/services/app.service";
import { SessionService } from "@sdk/services/session.service";

@Injectable(
	{
		providedIn: "root"
	})
export class AdminController {
	constructor(
		private router: Router,
		private appService: AppService,
		private session: SessionService
	) {
		if (session.haveSession() === false) {
			router.navigate(['/']);
		}
	}
 }
