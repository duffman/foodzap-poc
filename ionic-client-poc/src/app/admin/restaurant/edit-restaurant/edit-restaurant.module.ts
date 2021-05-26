/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule }         from '@angular/forms';
import { IonicModule }         from '@ionic/angular';

import { EditRestaurantPageRoutingModule } from './edit-restaurant-routing.module';

import { EditRestaurantPage } from './edit-restaurant.page';

@NgModule(
	{
		imports:      [
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			IonicModule,

			EditRestaurantPageRoutingModule
		],
		declarations: [EditRestaurantPage]
	})
export class EditRestaurantPageModule {
}
