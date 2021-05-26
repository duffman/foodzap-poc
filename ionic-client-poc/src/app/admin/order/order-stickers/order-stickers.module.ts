import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderStickersPageRoutingModule } from './order-stickers-routing.module';

import { OrderStickersPage } from './order-stickers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStickersPageRoutingModule
  ],
  declarations: [OrderStickersPage]
})
export class OrderStickersPageModule {}
