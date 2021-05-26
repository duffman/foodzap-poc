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

import { NgModule }           from '@angular/core';
import { Routes }             from '@angular/router';
import { RouterModule }       from '@angular/router';
import { PreloadAllModules }  from '@angular/router';
import { ManageMenuPage }     from "@app/admin/manage-menu/manage-menu.page";
import { PrivacyPage }        from "@app/tabs/legal/privacy/privacy.page";
import { AuthGuardService }   from "@services/auth-guard.service";
import { CanDeactivateGuard } from "@services/deactivate-guard";

const routes: Routes = [
	{
		path:       '',
		redirectTo: "/start",
		pathMatch:  "full"
	},
	{
		path:         'start',
		loadChildren: () => import('./tabs/start/start.module').then(m => m.StartPageModule)
	},
	{
		path:      'legal',
		children:  [
			{
				path:         'privacy',
				component:     PrivacyPage
			}
		]
	},
	{
		path:         'intro',
		loadChildren: () => import('./tabs/intro/intro.module').then(m => m.IntroPageModule)
	},
	{
		path:         'login',
		loadChildren: () => import('./tabs/login/login.module').then(m => m.LoginPageModule)
	},
	{
		path:         'signup',
		loadChildren: () => import('./tabs/signup/signup.module').then(m => m.SignupPageModule)
	},
	{
		path:         'walkthrough',
		loadChildren: () => import('./tabs/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule),
	},
	{
		path:         '',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
	},
	{
		path:         '',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
		canActivate:  [AuthGuardService],
		canDeactivate: [CanDeactivateGuard]
	},

	//
	// To be lifted out to the customer APP
	//
	{
		path:         "start",
		loadChildren: () => import('./tabs/start/start.module').then(m => m.StartPageModule)
	}
];

@NgModule(
	{
		imports: [
			RouterModule.forRoot(routes,
								 {
									 preloadingStrategy: PreloadAllModules
								 }
			)
		],
		exports: [RouterModule]
	})
export class AppRoutingModule {
}
