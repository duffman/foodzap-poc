import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickersPageRoutingModule } from './stickers-routing.module';

import { StickersPage } from './stickers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickersPageRoutingModule
  ],
  declarations: [StickersPage]
})
export class StickersPageModule {}
