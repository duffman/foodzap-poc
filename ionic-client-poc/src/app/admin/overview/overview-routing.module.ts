/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPage }         from './overview.page';

const routes: Routes = [
	{
		path:      '',
		component: OverviewPage
	},
	{
		path:         'stickers',
		loadChildren: () => import('./stickers/stickers.module').then(m => m.StickersPageModule)
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
	})
export class OverviewPageRoutingModule {
}
