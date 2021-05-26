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

/*
 Loads in the system browser
 window.open(‘http://example.com’, ‘_system’);

 Loads in the InAppBrowser
 window.open(‘http://example.com’, ‘_blank’);

 Loads in the InAppBrowser with no location bar
 window.open(‘http://example.com’, ‘_blank’, ‘location=no’);

 Loads in the Cordova web view
 window.open(‘http://example.com’, ‘_self’);
 */

import { OnInit }            from "@angular/core";
import { Component }         from '@angular/core';
import { FormControl }       from '@angular/forms';
import { FormGroup }         from '@angular/forms';
import { Validators }        from '@angular/forms';
import { Router }            from '@angular/router';
import { EMAIL_PATTERN }     from "@app/igniter/forms/validation-helper";
import { ICredentials }      from "@app/igniter/modules/auth/credentials.type";
import { ILoginResult }      from "@app/igniter/modules/auth/login-result";
import { LoginService }      from "@app/igniter/modules/auth/login.service";
import { IAdminSession }     from "@app/user/user-session";
import { IUserSession }      from "@app/user/user-session";
import { AlertController }   from "@ionic/angular";
import { MenuController }    from '@ionic/angular';
import { RestaurantService } from "@sdk/restaurant/restaurant.service";
import { IRestaurantData }   from "@sdk/restaurant/typings/restaurant.typing";
import { AppService }        from "@sdk/services/app.service";
import { LoggingService }     from "@sdk/services/logging.service";
import { ADMIN_SESSION_DATA } from "@sdk/services/session.service";
import { USER_SESSION_DATA }  from "@sdk/services/session.service";
import { SessionService }     from "@sdk/services/session.service";
import { IUserData }          from "@sdk/user/user";
import { TabsService }        from "@services/tabs.service";

@Component(
	{
		selector:    'app-login',
		templateUrl: './login.page.html',
		styleUrls:   [
			'./styles/login.page.scss'
		]
	})
export class LoginPage implements OnInit {
	debugMode: boolean   = false;
	loginForm: FormGroup;
	loginEmail: FormControl;
	loginPass: FormControl;
	backBtnLabel: string = "Tillbaka";

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
		private tabsService: TabsService,
		private appService: AppService,
		private loginService: LoginService,
		private logger: LoggingService,
		private userSession: SessionService,
		private restaurantService: RestaurantService
	) {
		this.tabsService.hideTabs();

		let password = 'kalle1';
		//let password = this.loginPass.value;

		this.loginEmail = new FormControl('putte@gmail.com',
										  Validators.compose(
											  [
												  Validators.required,
												  Validators.pattern(EMAIL_PATTERN)
											  ]
										  )
		);

		this.loginPass = new FormControl(password,
										 Validators.compose(
											 [
												 Validators.required
											 ]));

		this.loginForm = new FormGroup(
			{
				'email':    this.loginEmail,
				'password': this.loginPass
			});
	}

	ngOnInit() {
		if (this.debugMode === false && this.userSession.haveSession()) {
			this.goToOverview();
		}
	}

	ionViewWillEnter() {
	}

	goToOverview(): void {
		this.router.navigate(['admin/overview']);
	}

	doRegister(): void {
		this.router.navigate(['/account/signup']);
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
	}

	private storeAdmin(userData: IUserData): Promise<void> {
		this.logger.log('Store User ::', userData);

		let restaurantData: IRestaurantData;

		let sessionData: IAdminSession = {
			disqIdent:  ADMIN_SESSION_DATA,
			userData:   userData,
			restaurant: restaurantData
		}

		this.userSession.storeAdminSession(sessionData);

		// Hack, add the restaurant since we need it everywhere
		// TODO: Find a better place for this
		return new Promise((resolve, reject) => {
			if (this.userSession.storeUserSession(sessionData)) {
				this.restaurantService.loadRestaurantByCustId(userData.customerId).then(res => {
					console.log('CUSTOMER FROM STORE USER ::', res);
					sessionData.restaurant = res;
					this.userSession.storeAdminSession(sessionData);
					resolve();

				}).catch(err => {
					this.logger.logErr('Error loading restaurant by cust id', err);
					reject(err);
				});
			} else {
				reject(new Error('Error storing user data'))
			}

		});
	}

	/**
	 * Login Action
	 */
	public doLogin(): void {
		let credentials: ICredentials = {
			email:    this.loginEmail.value,
			password: this.loginPass.value
		};

		this.logger.debug('doLogin() :: Credentials ::', credentials);

		this.loginService.doAdminLogin(credentials).then((res: ILoginResult) => {
			let success = res.data.success;
			this.logger.log('loginService.doLogin ::', success);

			if (success) {
				this.logger.debug('doLogin :: SUCCESS');
				let userData = res.data.user;
				this.logger.debug('USER DATA ____:::', userData);

				this.storeAdmin(userData).then(() => {
					this.appService.setHaveLoggedIn(true);
					this.goToOverview();
				});
			}
			else {
				this.showLoginError();
			}

		}).catch(err => {
			console.log('ERR ::', err);
		});
	}
}
