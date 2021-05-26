import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule }         from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmMobilePageRoutingModule } from './confirm-mobile-routing.module';

import { ConfirmMobilePage } from './confirm-mobile.page';

@NgModule({
			  imports: [
				  CommonModule,
				  FormsModule,
				  IonicModule,
				  ConfirmMobilePageRoutingModule,
				  ReactiveFormsModule
			  ],
  declarations: [ConfirmMobilePage]
})
export class ConfirmMobilePageModule {}
