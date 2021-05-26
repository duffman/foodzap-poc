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

import { OnInit }            from "@angular/core";
import { Component }         from '@angular/core';
import { FormControl }       from '@angular/forms';
import { FormGroup }         from '@angular/forms';
import { Validators }        from '@angular/forms';
import { Router }            from '@angular/router';
import { ICredentials }      from "@app/igniter/modules/auth/credentials.type";
import { ILoginResult }      from "@app/igniter/modules/auth/login-result";
import { LoginService }      from "@app/igniter/modules/auth/login.service";
import { IUserSession }      from "@app/user/user-session";
import { AlertController }   from "@ionic/angular";
import { MenuController }    from '@ionic/angular';
import { AppService }        from "@sdk/services/app.service";
import { LoggingService }    from "@sdk/services/logging.service";
import { USER_SESSION_DATA } from "@sdk/services/session.service";
import { SessionService }    from "@sdk/services/session.service";
import { IUserData }         from "@sdk/user/user";

@Component(
	{
		selector:    'app-login',
		templateUrl: './login.page.html',
		styleUrls:   [
			'./styles/login.page.scss'
		]
	})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	loginEmail: FormControl;
	loginPass: FormControl;

	validation_messages = {
		'email':    [
			{
				type:    'required',
				message: 'Email is required.'
			},
			{
				type:    'pattern',
				message: 'Enter a valid email.'
			}
		],
		'password': [
			{
				type:    'required',
				message: 'Password is required.'
			},
			{
				type:    'minlength',
				message: 'Password must be at least 5 characters long.'
			}
		]
	};

	constructor(
		public router: Router,
		public menu: MenuController,
		public alertController: AlertController,
		private appService: AppService,
		private loginService: LoginService,
		private logger: LoggingService,
		private userSession: SessionService
	) {
		const EMAIL_PATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

		this.loginEmail = new FormControl('test@test.com',
										  Validators.compose(
											  [
												  Validators.required
												  //, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')

											  ]
										  )
		);

		this.loginPass = new FormControl('kalle1',
										 Validators.compose(
											 [
												 Validators.required,
												 Validators.pattern(EMAIL_PATTERN)
											 ]));
		this.loginForm = new FormGroup(
			{
				'email':    this.loginEmail,
				'password': this.loginPass
			});
	}

	ngOnInit() {
		if (this.userSession.haveSession()) {
			this.goToOverview();
		}
	}

	goToOverview(): void {
		this.router.navigate(['admin/overview']);
	}

	// Disable side menu for this page
	ionViewDidEnter(): void {
		this.menu.enable(false);
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
		this.menu.enable(true);
	}

	async showLoginError() {
		const alert = await this.alertController.create(
			{
				cssClass:  'my-custom-class',
				header:    'Alert',
				subHeader: 'Subtitle',
				message:   'Login Failed',
				buttons:   ['OK']
			});

		await alert.present();
	}

	private storeUser(userData: IUserData) {
		this.logger.log('Store User ::', userData);

		let sessionData: IUserSession = {
			disqIdent:  USER_SESSION_DATA,
			userData:   userData
		}

		this.userSession.storeUserSession(sessionData);
	}

	/**
	 * Login Action
	 */
	public doLogin(): void {
		let credentials: ICredentials = {
			email:    this.loginEmail.value,
			password: 'kalle' // this.loginPass.value
		};

		console.log('doLogin() :: Credentials ::', credentials);

		this.loginService.doUserLogin(credentials).then((res: ILoginResult) => {
			let success = res.data.success;
			console.log('Res ::', success);

			if (success) {
				console.log('SUCCESS');
				let userData = res.data.user;
				console.log('USER DATA ____:::', userData);
				this.storeUser(userData);
				this.appService.setHaveLoggedIn(true);
				this.goToOverview();
			}
			else {
				this.showLoginError();
			}

		}).catch(err => {
			console.log('ERR ::', err);
		});
	}
}
