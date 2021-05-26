/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { ReactiveFormsModule }       from "@angular/forms";
import { FormsModule }               from '@angular/forms';
import { ComponentsModule }          from "@components/components.module";
import { IonicModule }               from '@ionic/angular';
import { EditItemPageRoutingModule } from './edit-item-routing.module';
import { EditItemPage }              from './edit-item.page';

@NgModule({
			  imports:      [
				  CommonModule,
				  FormsModule,
				  IonicModule,
				  EditItemPageRoutingModule,
				  ReactiveFormsModule,
				  ComponentsModule
			  ],
			  declarations: [EditItemPage]
		  })
export class EditItemPageModule {
}
