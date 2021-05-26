/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }       from '@angular/core';
import { Routes }         from '@angular/router';
import { RouterModule }   from '@angular/router';
import { ManageMenuPage } from './manage-menu.page';

const routes: Routes = [
	{
		path:      '',
		component: ManageMenuPage
	},
	{
		path:         'edit-item',
		loadChildren: () => import('./edit-item/edit-item.module').then(m => m.EditItemPageModule)
	},
  {
    path: 'manage-dishes',
    loadChildren: () => import('./manage-dishes/manage-dishes.module').then( m => m.ManageDishesPageModule)
  }
];

@NgModule(
	{
		imports: [
			RouterModule.forChild(routes)
		],
		exports: [RouterModule],
	})
export class ManageMenuPageRoutingModule {
}
