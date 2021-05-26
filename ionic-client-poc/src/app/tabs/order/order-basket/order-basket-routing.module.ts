import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderBasketPage } from './order-basket.page';

const routes: Routes = [
  {
    path: '',
    component: OrderBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderBasketPageRoutingModule {}
