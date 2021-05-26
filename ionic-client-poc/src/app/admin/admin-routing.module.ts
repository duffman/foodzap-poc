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
import { ManageMenuPage }     from "@app/admin/manage-menu/manage-menu.page";
import { RestaurantPage }     from "@app/admin/restaurant/restaurant.page";
import { CanDeactivateGuard } from "@services/deactivate-guard";
import { AdminComponent }     from './admin.component';

const adminRoutes: Routes = [
	{
		path:      'admin',
		component: AdminComponent,
		children:  [
			{
				path:       '',
				redirectTo: 'overview',
				pathMatch:  'full'
			},
			/*{
				path: 'account',
				children:  [
					{
						path:       '',
						redirectTo: 'overview',
						pathMatch:  'full'
					},
					{
						path:         'login',
						loadChildren: () => import('./account/login/login.module').then(m => m.LoginPageModule)
					}
				]
			},*/

			{
				path:         'edititem',
				loadChildren: () => import('../forms/validations/forms-validations.module').then(m => m.FormsValidationsPageModule)
			},
			{
				path:         'testform',
				loadChildren: () => import('../forms/validations/forms-validations.module').then(m => m.FormsValidationsPageModule)
			},
			{
				path:         'login',
				loadChildren: () => import('./account/login/login.module').then(m => m.LoginPageModule)
			},
			{
				path:         'signup',
				loadChildren: () => import('./account/signup/signup.module').then(m => m.SignupPageModule)
			},
			{
				path:         'restore-pass',
				loadChildren: () => import('./account/restore-pass/restore-pass.module').then(m => m.RestorePassPageModule)
			},
			{
				path:         'overview',
				loadChildren: () => import('./overview/overview.module').then(m => m.OverviewPageModule)
			},
			{
				path:         'order-stickers',
				loadChildren: () => import('./order/order-stickers/order-stickers.module').then(m => m.OrderStickersPageModule)
			},
			{
				path:      'restaurant',
				loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantPageModule),
			},
			{
				path:         'restaurant-menu',
				loadChildren: () => import('./manage-menu/manage-menu.module').then(m => m.ManageMenuPageModule),
			},
			{
				path:         'restaurant-edit',
				loadChildren: () => import('./restaurant/edit-restaurant/edit-restaurant.module').then(m => m.EditRestaurantPageModule),
			},
			{
				path:         'more',
				loadChildren: () => import('./more/more.module').then(m => m.MorePageModule)
			},
			{
				path:         'settings',
				loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
			}
		]
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(adminRoutes)],
		exports: [RouterModule],
	})
export class AdminPageRoutingModule {
}
