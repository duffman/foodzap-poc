import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule }          from '@ionic/angular';
import { ComponentsModule }     from '../../components/components.module';
import { WalkthroughPage }      from './walkthrough.page';

const routes: Routes = [
	{
		path:      '',
		component: WalkthroughPage
	}
];

@NgModule(
	{
		imports:      [
			CommonModule,
			FormsModule,
			IonicModule,
			RouterModule.forChild(routes),
			ComponentsModule
		],
		declarations: [WalkthroughPage]
	})
export class WalkthroughPageModule {
}
