import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestorePassPage } from './restore-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RestorePassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestorePassPageRoutingModule {}
