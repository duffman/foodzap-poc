/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { environment }            from "@env/environment";
import { Component }              from '@angular/core';
import { OnInit }                 from "@angular/core";
import { Router }                 from "@angular/router";
import { SettingsModalComponent } from "@components/settings-modal/settings-modal.component";
import { ModalController }        from "@ionic/angular";
import { BasketService }          from "@sdk/basket/basket.service";
import { FavouritesService }      from "@sdk/food-menu/favorites/favourites.service";
import { FoodMenuManager }        from "@sdk/food-menu/food-menu-manager";
import { FoodMenuItem }           from "@sdk/food-menu/models/food-menu-item.model";
import { IFoodMenuItem }          from "@sdk/food-menu/types/food-menu-item.type";
import { IFoodMenu }              from "@sdk/food-menu/types/food-menu.type";
import { RestaurantModel }        from "@sdk/restaurant/restaurant.model";
import { IRestaurantData }        from "@sdk/restaurant/typings/restaurant.typing";
import { LoggingService }         from "@sdk/services/logging.service";
import { StorageService }         from "@sdk/services/storage.service";
import { FoodMenu }               from "@sdk/shared-types/food-menu";
import { MenuFilter }             from "@services/foodmenu.service";
import { TabsService }            from "@services/tabs.service";
import { Observable }             from "rxjs";
import { BehaviorSubject }        from "rxjs";

@Component(
	{
		selector:    'food-menu',
		templateUrl: 'food-menu.page.html',
		styleUrls:   ['food-menu.page.scss']
	}
)
export class FoodMenuPage implements OnInit {
	restaurant: IRestaurantData;
	restaurantId: number;

	restaurantName: string       = '';
	restaurantCover: string      = './assets/img/restaurant.jpg';
	foodMenusSource: IFoodMenu[] = null;
	foodMenus: IFoodMenu[]       = null;

	//

	public fm: BehaviorSubject<IFoodMenu>;
	public readonly fmContents: Observable<IFoodMenu>;

	//

	selFoodMenu: IFoodMenu = null;
	filters: MenuFilter[]  = new Array<MenuFilter>();

	segmentModel: string = 'all';

	constructor(
		private router: Router,
		private storage: StorageService,
		private tabsService: TabsService,
		private logger: LoggingService,
		private modalCtrl: ModalController,
		private basketService: BasketService,
		private foodMenuManager: FoodMenuManager,
		private favorites: FavouritesService
	) {
		this.tabsService.hideTabs();

		this.fm         = new BehaviorSubject<IFoodMenu>(null);
		this.fmContents = this.fm.asObservable();
	}

	ngOnInit() {
		//
		// Get restaurant stored in the QR scan
		//
		let scanData = this.storage.getData('scanData', false);

		if (scanData) {
			this.restaurant = scanData;
			console.log('REST ** REST ** ::', this.restaurant);
		}

		if (this.restaurant && this.restaurant.info) {
			this.restaurantId   = this.restaurant.info.id;
			this.restaurantName = this.restaurant.info.name;

			// Load Menu Data
			this.foodMenuManager.loadMenus(this.restaurantId);
		}

		this.foodMenuManager.foodMenuData.asObservable().subscribe(
			res => {
				this.initFoodMenu(res);
			},
			error => {
				this.logger.error('Tab2Page :: loadMenus :: error ::', error);
			}
		);

		this.basketService.contents.subscribe(res => {
			this.logger.log(
				'contents.subscribe :: res ::',
				res
			);
		});

		//
		// TEST
		//
		this.fmContents.subscribe(menu => {});
	}

	public haveLogo(): boolean {
		//console.log('Have Logo ::', this.restaurant.info.logoImage);
		return false; //!!this.restaurant.info.logoImage;
	}

	public refreshMenu(nasa: string = '') {
		// Initialize menus
		for (let menu of this.foodMenusSource) {
			for (let item of menu.items) {
				// Set favourite property
				// TODO: Move this to server stored member
				if (this.favorites.isFavorite(item.id)) {
					//this.logger.debug('IS FAVORITE ::', item);
					// item.name = 'FRISSE IS FAVE';
				}
			}
		}
	}

	private initFoodMenu(foodMenus: Array<IFoodMenu>) {
		console.log('FoodMenuPage :: initFoodMenu ::', foodMenus);
		this.foodMenusSource = foodMenus;

		this.sortMenu();
		this.refreshMenu();
	}

	public segmentChanged(event: any) {
		if (environment.debugMode) {
			this.logger.log('this.segmentModel ::', this.segmentModel);
			this.logger.log('EVENT ::', event);
			this.logger.log('segmenutChanged => this.segmentModel');
		}
	}

	public selectMenu(menu: IFoodMenu): void {
		if (!menu) {
			this.foodMenus = this.foodMenusSource;
		}
		else {
			let selectedMenu = (menu) ? menu : this.foodMenus;
			this.foodMenus   = [menu]
		}
	}

	public inDebugMode(): boolean {
		return environment.debugMode;
	}

	public getItemCount(item: IFoodMenuItem): number {
		return this.basketService.getTotalItemCount();
	}

	/**
	 * Set or Unset item as a favotite item
	 * @param {IFoodMenuItem} item
	 * @returns {boolean}
	 */
	public toggleFavorite(item: IFoodMenuItem): boolean {
		this.logger.debugSeg(this, item, 'FoodMenu', 'addFavorite');

		let toggleRes = (this.favorites.toggleItem(
			this.restaurantId,
			this.restaurantName,
			item.id,
			item.name
		));

		item.faveIconClass = this.getFaveCssClass(toggleRes);

		this.favorites.showDebug();

		return toggleRes;
	}

	public getFaveImgSrc(item: IFoodMenuItem): string {
		let imgSrc = './assets/icon/' + this.getFaveClassName(item) + '.svg';
		return imgSrc;
	}

	/**
	 * Add food menu item to order basket
	 * @param {IFoodMenuItem} item
	 * @returns {boolean}
	 */
	public addToBasket(item: IFoodMenuItem): boolean {
		let result: boolean;

		if (this.basketService.addItem(item)) {
			this.logger.debug('basketService.toggleItem ::', item);
		}

		return result;
	}

	public getBasketCount(): number {
		let result = 0;

		if (this.basketService) {
			result = this.basketService.getTotalItemCount();
		}

		return result;
	}

	/**
	 *
	 * @param {IBasketItem} item
	 * @returns {number}
	 */
	public getCountInBasket(item: IFoodMenuItem): number {
		let result = 0;
		console.log('getCountInBasket >>', item);

		if (item) {
			result = this.basketService.getTotalItemCount();
		}

		return result;
	}

	private showBasketLabel(item: IFoodMenuItem): boolean {
		return true;
	}

	public debugData() {
		let rest = new RestaurantModel(
			1,
			'Dinas Kök',
			'En smakfull upplevelse i en fantastisk miljö'
		);

		this.favorites.toggleItem(
			rest.id,
			rest.name,
			155,
			'Korvstroganoff'
		);
	}

	/**
	 * Navigate to order page
	 */
	private goToCart() {
		this.router.navigate(['/tabs/basket'])
	}

	/**
	 * Get food menu item name
	 * @param {IFoodMenuItem} item
	 * @returns {string}
	 */
	private getItemName(item: IFoodMenuItem): string {
		let result: string = item.name;

		if (environment.debugMode) {
			result = `#${item.id} | ${item.name}`;
		}

		return result;
	}

	private setFave(event: any, item: IFoodMenuItem) {
		console.log('setFave ::', event);
		this.toggleFavorite(item);
	}

	private getIsFave(item: IFoodMenuItem): boolean {
		const result = this.favorites.isFavorite(item.id);
		return result;
	}

	private getFaveCssClass(value: boolean): string {
		let result = 'heart';

		if (!value) {
			result = 'heart-outline';
		}

		return result;
	}

	/*******************************************************************************************************************
	 * Allergren
	 *******************************************************************************************************************/
	public haveAllergren(item: IFoodMenuItem): boolean {
		let allergren = item.allergies;
		return Array.isArray(allergren) && allergren.length > 0;
	}

	public getAllergenBase(cat: any) {
		let img      = "";
		let cssClass = "";

		switch (cat.type) {
			case 'lactose':
				img      = 'lactose-free-24.png';
				cssClass = "background: powderblue;";
				break;

			case 'vegetarian':
				img      = 'vegetarian-24.png';
				cssClass = 'lactose-free-24.png';
				break;

			case 'gluten':
				img      = 'wheat-24.png';
				cssClass = "background: darkorange;";
				break;

			case 'lchf':
				break;
		}

		return {
			class: cssClass,
			src:   "/assets/icon/allergren/" + img
		};
	}

	public getAllergenImg(cat: any) {
		return this.getAllergenBase(cat).src;
	}

	public getAllergenCss(cat: any) {
		return this.getAllergenBase(cat).class;
	}

	public getDishCat(cat: any): string {
		let imgSrc = './assets/img/ico/';

		switch (cat.type) {
			case 'lactose':
				console.log('********** ::::: LACTOSE');
				imgSrc = 'ico-';
				break;

			case 'vegetarian':
				console.log('********** ::::: VEG');
				break;

			case 'gluten':
				console.log('********** ::::: GLUTEN');
				imgSrc += 'ico-wheat-free-32.png';
				break;

			case 'lchf':
				console.log('********** ::::: LCHF');
				break;
		}

		return cat.value;
	}

	public getFaveClassName(item: IFoodMenuItem): string {
		return this.getFaveCssClass(
			this.favorites.isFavorite(item.id)
		);
	}

	public haveDishPhoto(item: IFoodMenuItem): boolean {
		return item.photo !== undefined && item.photo !== null;
	}

	/**
	 * Get path to the dish picture filename
	 * @param {IFoodMenuItem} item
	 * @returns {string}
	 */
	public getDishPic(item: IFoodMenuItem): string {
		let src = './assets/no-dish.png';
		if (item.photo) {
			src = `./assets/dishes/${item.photo}`;

			//TODO: Remove this debug stuff...
		}
		else if (!environment.production) {
			src = './assets/dishes/dish01.jpg';
		}

		return src;
	}

	// Todo: Improve readability
	public sortMenu(): void {
		let tmpSource = Object.assign([], this.foodMenusSource);
		let tmpMenus  = new Array<IFoodMenu>();

		for (let menu of tmpSource) {
			let tmpMenu = Object.assign({}, menu);
			let items   = new Array<IFoodMenuItem>();

			for (let item of tmpMenu.items) {
				let tmpItem = Object.assign({}, item);
				let addItem = true;

				for (let filterItem of this.filters) {
					if (filterItem.enabled === false) {
						continue;
					}

					let qualify = true;

					for (let cat of item.allergies) {
						if (cat.type === filterItem.typeName && !cat.value) {
							qualify = false;
							break;
						}
					}

					addItem = qualify;
					if (!addItem) {
						break;
					}
				}

				if (addItem) {
					items.push(item);
				}
			}

			tmpMenu.items = items;
			tmpMenus.push(tmpMenu);
		}

		this.foodMenus = tmpMenus;
	}

	public addToCart(item: IFoodMenuItem): void {
		this.basketService.addItem(item);
	}

	public async presentSettingsModal() {
		const modal = await this.modalCtrl.create(
			{
				component:      SettingsModalComponent,
				cssClass:       'filterModal',
				componentProps: {}
			}
		);
		return await modal.present();
	}
}
