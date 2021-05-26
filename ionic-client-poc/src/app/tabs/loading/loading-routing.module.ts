import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingPage } from './loading.page';

const routes: Routes = [
	{
		path:      '',
		component: LoadingPage
	},
	{
		path:         'not-found',
		loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
	})
export class LoadingPageRoutingModule {
}
