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

import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes }       from '@angular/router';
import { TabsPage }     from './tabs.page';

const routes: Routes = [
	{
		path:      'tabs',
		component: TabsPage,
		children:  [
			{
				path:        'basket',
				loadChildren: () => import('./order/order-basket/order-basket.module').then(m => m.OrderBasketPageModule)
			},
			{
				path:        'favorites',
				loadChildren: () => import('./food-menu/favorites/favorites.module').then(m => m.FavoritesPageModule)
			},/*
			{
				path:        'about',
				loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
			}*/
			{
				path:        'contact',
				loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
			},
			{
				path:        'order-status',
				loadChildren: () => import('./order/order-status/order-status.module').then(m => m.OrderStatusPageModule)
			},
			{
				path:        'more',
				loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
			},

			//
			// Food Menu
			//
			{
				path:        'menu/:id',
				loadChildren: () => import('./food-menu/food-menu.module').then(m => m.FoodMenuModule)
			},
			{
				path:        'menu/:id',
				loadChildren: () => import('./food-menu/food-menu.module').then(m => m.FoodMenuModule)
			},
			{
				path:        'dish/:id',
				loadChildren: () => import('./food-menu/dish/dish.module').then( m => m.DishPageModule)
			}


			/*,
			 {
			 path:       '',
			 redirectTo: '/',
			 pathMatch:  'full'
			 }*/
		]
	},
	{
		path:         'about',
		loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
	},
	{
		path:         'intro',
		loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
	},
	{
		path:         'order-history',
		loadChildren: () => import('./order/order-history/order-history.module').then(m => m.OrderHistoryPageModule)
	},
	{
		path:         'contact',
		loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
	},
	{
		path:         'loading',
		loadChildren: () => import('./loading/loading.module').then(m => m.LoadingPageModule)
	},
	{
		path:         'confirm-mobile',
		loadChildren: () => import('./signup/confirm-mobile/confirm-mobile.module').then(m => m.ConfirmMobilePageModule)
	},
	{
		path:         'lab',
		loadChildren: () => import('./lab/lab.module').then(m => m.LabPageModule)
	},
  {
    path: 'verify-phone',
    loadChildren: () => import('./verify-phone/verify-phone.module').then( m => m.VerifyPhonePageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./legal/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./legal/terms/terms.module').then( m => m.TermsPageModule)
  }
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule]
	})
export class TabsPageRoutingModule {
}
