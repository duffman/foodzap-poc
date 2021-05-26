/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { ReactiveFormsModule }         from "@angular/forms";
import { FormsModule }                 from '@angular/forms';
import { CatPopoverComponent }         from "@app/admin/manage-menu/category-popover/cat-popover.component";
import { DishRowModule }               from "@app/admin/manage-menu/dish-row/dish-row.component.module";
import { ComponentsModule }            from "@components/components.module";
import { IonicModule }                 from '@ionic/angular';
import { ManageMenuPageRoutingModule } from './manage-menu-routing.module';
import { ManageMenuPage }              from './manage-menu.page';

@NgModule(
	{
		imports: [
			CommonModule,
			FormsModule,
			IonicModule,
			ReactiveFormsModule,
			ManageMenuPageRoutingModule,
			ComponentsModule,
			DishRowModule
		],
		exports: [
			CatPopoverComponent
		],
		declarations: [
			ManageMenuPage,
		   CatPopoverComponent
		]
	})
export class ManageMenuPageModule {
}
