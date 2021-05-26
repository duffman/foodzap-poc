/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

import { Injectable }             from "@angular/core";
import { Router }                 from "@angular/router";
import { CanActivate }            from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { SessionService }         from "@sdk/services/session.service";

@Injectable(
	{
		providedIn: "root"
	})
export class AuthGuardService implements CanActivate {
	constructor(
		private router : Router,
		private sessionStore: SessionService) {
		console.log('AuthGuardService :: constructor');
	}

	canActivate(route : ActivatedRouteSnapshot) : boolean {
		let haveSession = this.sessionStore.haveSession();

		console.log('canActivate ::', route);
		console.log('result ::', haveSession);

		return true; //haveSession;

		/*
		console.log('canActivate', route);

		let authInfo = {
			authenticated: false
		};

		if (!authInfo.authenticated) {
			this.router.navigate(["login"]);
			return false;
		}
		*/
	}
}
