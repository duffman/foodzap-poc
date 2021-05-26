/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit }     from '@angular/core';
import { FormBuilder }           from "@angular/forms";
import { FormControl }           from "@angular/forms";
import { FormGroup }             from "@angular/forms";
import { counterRangeValidator } from "@components/counter-input/counter-input.component";
import { NavController }         from "@ionic/angular";
import { IBasketModel }          from "@sdk/basket/basket.model";
import { BasketService }         from "@sdk/basket/basket.service";
import { ActionResult }          from "@sdk/core/action-result";
import { IActionResult }         from "@sdk/core/action-result";
import { LoggingService }        from "@sdk/services/logging.service";

@Component(
	{
		selector:    'app-order-basket',
		templateUrl: './order-basket.page.html',
		styleUrls:   ['./order-basket.page.scss'],
	})
export class OrderBasketPage implements OnInit {
	selectedPage = 'orders';
	basket: IBasketModel;
	counterForm: any;
	orderForm: any;

	constructor(
		private navCtrl: NavController,
		private basketService: BasketService,
		private formBuilder: FormBuilder,
		private logger: LoggingService
	) {
		this.orderForm = new FormGroup(
			{
				orders: this.formBuilder.array(
					[
						this.formBuilder.group(
							{
								PlanId: ''
							}
						)
					])
			},
			this.counterForm = new FormGroup(
				{
					counter:  new FormControl(
						1,
						counterRangeValidator(1, 100)
					),
					counter2: new FormControl(
						1,
						counterRangeValidator(1, 100)
					)
				})
		);

		this.basketService.showDebug();

		this.basketService.basket.subscribe(
			(basket: IBasketModel) => {
				this.logger.debugSeg(this, basket, 'basketContents', 'subscribe');
				this.initBasket(basket);
			}
		);
	}

	ngOnInit() {
	}

	private sendOrder(): Promise<IActionResult> {
		return new Promise((resolve, reject) => {
			let result = new ActionResult();


			this.basketService.sendOrder


			this.basketService.sendOrder(this.basket).subscribe(
				res => {
					this.logger.debug("sendOrder :: res ::", res);
				},
				err => {
					this.logger.debug("sendOrder :: error ::", err);
				},
				() => {
					this.logger.debug("sendOrder :: completed");
				}
			);

			/*
			 this.basketService.sendOrder(basketModel).then(res => {
			 this.logger.debug('OrderBasketPage :: sendOrder ::', res);
			 resolve(result);

			 }).catch(err => {
			 this.logger.debug('OrderBasketPage :: sendOrder :: error ::', err);
			 result.setError(err);
			 resolve(result);
			 });
			 */
		});
	}

	/**
	 * Checks whether the basker is empty or not
	 * @returns {boolean}
	 */
	private isEmpty(): boolean {
		let items = this.basket.items;
		return (!items || items.length === 0);
	}

	private goBack() {
		this.navCtrl.back()
	}

	private initBasket(basket: IBasketModel): void {

		console.log('basket.items ::', basket.items);

		this.basket = basket;
	}
}
