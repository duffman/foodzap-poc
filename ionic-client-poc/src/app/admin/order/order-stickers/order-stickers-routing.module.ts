import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStickersPage } from './order-stickers.page';

const routes: Routes = [
  {
    path: '',
    component: OrderStickersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStickersPageRoutingModule {}
