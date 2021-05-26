/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CommonModule }          from '@angular/common';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { IonicModule }           from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage }              from './tabs.page';

@NgModule(
	{
		imports:      [
			IonicModule,
			CommonModule,
			FormsModule,
			TabsPageRoutingModule
		],
		declarations: [TabsPage]
	})
export class TabsPageModule {
}
