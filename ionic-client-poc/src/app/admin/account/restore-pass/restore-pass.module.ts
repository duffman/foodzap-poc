import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorePassPageRoutingModule } from './restore-pass-routing.module';

import { RestorePassPage } from './restore-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorePassPageRoutingModule
  ],
  declarations: [RestorePassPage]
})
export class RestorePassPageModule {}
