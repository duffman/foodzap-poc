import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { ShellModule }  from "@app/shell/shell.module";

import { IonicModule } from '@ionic/angular';

import { OverviewPageRoutingModule } from './overview-routing.module';

import { OverviewPage } from './overview.page';

@NgModule(
	{
		imports:      [
			CommonModule,
			FormsModule,
			IonicModule,
			OverviewPageRoutingModule,
			ShellModule
		],
		exports:      [
			ShellModule
		],
		declarations: [OverviewPage]
	})
export class OverviewPageModule {
}
