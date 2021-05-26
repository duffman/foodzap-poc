/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { Routes }           from "@angular/router";
import { RouterModule }     from '@angular/router';
import { ComponentsModule } from "@components/components.module";
import { IonicModule }      from '@ionic/angular';
import { TranslateModule }  from "@ngx-translate/core";
import { FoodMenuPage }     from './food-menu.page';

const routes: Routes = [
	{
		path:      '',
		component: FoodMenuPage,
	}
];

@NgModule(
	{
		imports: [
			IonicModule,
			CommonModule,
			FormsModule,
			RouterModule.forChild(routes),
			TranslateModule,
			ComponentsModule
		],
		declarations: [FoodMenuPage]
	})
export class FoodMenuModule { }
