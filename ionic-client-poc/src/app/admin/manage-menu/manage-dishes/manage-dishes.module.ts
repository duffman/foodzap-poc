import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageDishesPageRoutingModule } from './manage-dishes-routing.module';

import { ManageDishesPage } from './manage-dishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageDishesPageRoutingModule
  ],
  declarations: [ManageDishesPage]
})
export class ManageDishesPageModule {}
