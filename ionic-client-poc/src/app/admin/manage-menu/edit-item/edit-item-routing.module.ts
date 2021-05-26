/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard }   from "@services/deactivate-guard";
import { EditItemPage }         from './edit-item.page';

const routes: Routes = [
	{
		path:          '',
		component:     EditItemPage,
		canDeactivate: [CanDeactivateGuard]
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
	})
export class EditItemPageRoutingModule {
}
