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

import { Component }        from '@angular/core';
import { Router }           from "@angular/router";
import { SplashScreen }     from '@ionic-native/splash-screen/ngx';
import { StatusBar }        from '@ionic-native/status-bar/ngx';
import { Platform }         from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { SessionService }   from "@sdk/services/session.service";
import { TabsService }      from "@services/tabs.service";

@Component(
	{
		selector:    'app-root',
		templateUrl: 'app.component.html',

		styleUrls: [
			'app.component.scss',
			'../assets/styles/side-menu/side-menu.scss',
			'../assets/styles/side-menu/side-menu.shell.scss',
			'../assets/styles/side-menu/side-menu.responsive.scss'
		]
	})
export class AppComponent {
	/*
	appPages = [
		{
			title:     'Categories',
			url:       '/app/allergies',
			ionicIcon: 'list-outline'
		},
		{
			title:     'Profile',
			url:       '/app/user',
			ionicIcon: 'person-outline'
		},
		{
			title:      'Contact Card',
			url:        '/contact-card',
			customIcon: './assets/custom-icons/side-menu/contact-card.svg'
		},
		{
			title:     'Notifications',
			url:       '/app/notifications',
			ionicIcon: 'notifications-outline'
		}
	];
	*/

	constructor(
		private sessionService: SessionService,
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private router: Router,
		public tabsService: TabsService,
		private translate: TranslateService
	) {
		translate.setDefaultLang('en');
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	logOut() {
		this.sessionService.dropSession().then(() => {
			this.router.navigate(['start']);
		});
	}

	showSideMenu(): boolean {
		return this.sessionService.haveSession();
	}
}
