import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule }      from '@angular/forms';
import { ComponentsModule } from "@components/components.module";

import { IonicModule } from '@ionic/angular';

import { OrderBasketPageRoutingModule } from './order-basket-routing.module';

import { OrderBasketPage } from './order-basket.page';

@NgModule(
	{
		imports:      [
			CommonModule,
			FormsModule,
			IonicModule,
			OrderBasketPageRoutingModule,
			ReactiveFormsModule,
			ComponentsModule
		],
		declarations: [OrderBasketPage]
	})
export class OrderBasketPageModule {
}
