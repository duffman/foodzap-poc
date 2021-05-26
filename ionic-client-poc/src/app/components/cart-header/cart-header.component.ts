/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Renderer2 }         from "@angular/core";
import { Input }             from "@angular/core";
import { ViewChild }         from "@angular/core";
import { ElementRef }        from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { ModalController }   from "@ionic/angular";
import { BasketService }     from "@sdk/basket/basket.service";
import { RestaurantModel } from "@sdk/restaurant/restaurant.model";
import { LoggingService }  from "@sdk/services/logging.service";

@Component(
	{
		selector:    'app-cart-header',
		templateUrl: './cart-header.component.html',
		styleUrls:   ['./cart-header.component.scss'],
	})
export class CartHeaderComponent implements OnInit {
	title: string;
	_text: string;

	@ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

	@Input() set text(val: string) {
		this._text = (val !== undefined && val !== null) ? val : '';
	}

	constructor(
		private _elementRef: ElementRef,
		private _renderer: Renderer2,
		private router: Router,
		private basketService: BasketService,
		private modalCtrl: ModalController,
		private logger: LoggingService
	) {
	}

	ngOnInit() {
		console.log('CAR<t HEDER NGONINIT');

		this.basketService.contents.subscribe(items => {
			this.logger.debug('basketService :: subscribe ::', items);
		});
	}

	animateCSS(animationName, keepAnimated = false) {
		const node = this.fab.nativeElement;
		node.classList.add('animated', animationName)

		//https://github.com/daneden/animate.css
		function handleAnimationEnd() {
			if (!keepAnimated) {
				node.classList.remove('animated', animationName);
			}
			node.removeEventListener('animationend', handleAnimationEnd)
		}
		node.addEventListener('animationend', handleAnimationEnd)
	}

	/**
	 * Navigate to order page
	 */
	private goToCart() {
		this.router.navigate(['/tabs/basket'])
	}

	private debugData() {
		let rest = new RestaurantModel(
			1,
			'Dinas Kök',
			'En smakfull upplevelse i en fantastisk miljö'
		);
	}

	private getTitle() {
		return this._text;
	}


	private getBasketCount(): number {
		let result = 0;

		if (this.basketService) {
			result = this.basketService.getTotalItemCount();
		}

		return result;
	}
}
