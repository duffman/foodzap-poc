import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmMobilePage } from './confirm-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmMobilePageRoutingModule {}
