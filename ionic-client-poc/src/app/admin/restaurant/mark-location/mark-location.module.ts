import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarkLocationPageRoutingModule } from './mark-location-routing.module';

import { MarkLocationPage } from './mark-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkLocationPageRoutingModule
  ],
  declarations: [MarkLocationPage]
})
export class MarkLocationPageModule {}
