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

import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";

@Component({
			   selector:    'app-social',
			   templateUrl: './social.component.html',
			   styleUrls:   ['./social.component.scss'],
		   })
export class SocialComponent implements OnInit {

	constructor(private router: Router) {
	}

	ngOnInit() {
	}

	goToForgotPassword(): void {
		console.log('redirect to forgot-password page');
	}

	doFacebookLogin(): void {
		console.log('facebook login');
		this.router.navigate(['app/allergies']);
	}

	doGoogleLogin(): void {
		console.log('google login');
		this.router.navigate(['app/allergies']);
	}

	doTwitterLogin(): void {
		console.log('twitter login');
		this.router.navigate(['app/allergies']);
	}

}
