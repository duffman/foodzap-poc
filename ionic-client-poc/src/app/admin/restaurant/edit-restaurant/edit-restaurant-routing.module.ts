import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRestaurantPage }   from './edit-restaurant.page';

const routes: Routes = [
	{
		path:      '',
		component: EditRestaurantPage
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
	})
export class EditRestaurantPageRoutingModule {
}
