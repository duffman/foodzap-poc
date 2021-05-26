/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { NavigationExtras }   from "@angular/router";
import { Router }             from "@angular/router";
import { AlertController }    from "@ionic/angular";
import { ModalController }    from "@ionic/angular";
import { FoodMenuApiService } from "@sdk/food-menu/food-menu-api.service";
import { FoodMenuManager }    from "@sdk/food-menu/food-menu-manager";
import { IFoodMenuItem }      from "@sdk/food-menu/types/food-menu-item.type";
import { IFoodMenu }          from "@sdk/food-menu/types/food-menu.type";
import { AppService }         from "@sdk/services/app.service";
import { LoggingService }     from "@sdk/services/logging.service";
import { StorageService }     from "@sdk/services/storage.service";
import { FoodMenu }           from "@sdk/shared-types/food-menu";
import { LoadingService }     from "@services/loading.service";

@NgModule(
	{
		declarations: [],
		imports:      [
			CommonModule
		]
	})
export class CategoryManagerModule {
	menuChanged: Boolean   = false;
	foodMenus: IFoodMenu[] = undefined; // The local copy

	constructor(
		private appService: AppService,
		private modalCtrl: ModalController,
		private loader: LoadingService,
		private alertCtrl: AlertController,
		private router: Router,
		private storage: StorageService,
		private menuService: FoodMenuApiService,
		private foodMenuManager: FoodMenuManager,
		private logger: LoggingService
	) {
	}

	public setMenuSource(source: IFoodMenu[]) {
		this.foodMenuManager.loadMenusFromSource(source);
	}

	private async showRemoveMenu(menu?: IFoodMenu): Promise<void> {
		const alert = await this.alertCtrl.create(
			{
				header:  'Ta bort kategori',
				message: 'Är du säker på att du vill ta bort kategori <b>' + menu.name + '</b>!',
				buttons: [
					{
						text:     'Avbryt',
						role:     'cancel',
						cssClass: 'secondary',
						handler:  () => {
							console.log('Confirm: blah');
						}
					},
					{
						text:    'Ok',
						handler: () => {
							console.log('Confirm: Okay!');
							this.doRemoveMenu(menu);
						}
					}
				]
			});

		return await alert.present();
	}

	public removeMenu(menu: IFoodMenu): void {
		this.showRemoveMenu(menu).then(() => {
			this.doRemoveMenu(menu);
		}).catch(err => {
			console.log('')
		});
	}

	private doRemoveMenu(menu: IFoodMenu): boolean {
		let result = false;

		//this.foodMenuManager.deleteMenu(menu.id);

		//this.foodMenuManager.foodMenuData.next([]);


		return result;
	}

	/**
	 * Show Edit category dialog
	 * @param {IFoodMenu} menu
	 * @returns {Promise<void>}
	 *
	private async showAddCategory2(menu?: IFoodMenu): Promise<void> {
		let scope       = this;
		let headerLabel = menu ? 'Redigera meny' : 'Lägg till meny';

		console.log('showAddCategory ::', menu);

		let alert = await this.alertCtrl.create(
			{
				header:  headerLabel,
				inputs:  [
					{
						name:        'name',
						value:       menu ? menu.name : '',
						placeholder: 'Namn'
					},
					{
						name:        'description',
						type:        'textarea',
						value:       menu ? menu.description : '',
						placeholder: 'Beskrivning'
					}
				],
				buttons: [
					{
						text:    'Avbryt',
						role:    'cancel',
						handler: data => {
							scope.doAddCategory(false);
						}
					},
					{
						text:    'OK',
						role:    'submit',
						handler: (data: any) => {

							if (menu) {
								menu.name = data.name;
								menu.description = data.description;
							}

							this.logger.log('-- showAddCategory :: data ::', data);
							this.logger.log('-- showAddCategory :: menu ::', menu);

							scope.doAddCategory(true, menu, data);
						}
					}
				]
			});

		return await alert.present();
	}
	*/

	public async addMenuInput(menu?: IFoodMenu): Promise<any> {
		let resolveFunc: (data: any) => void;

		const promise = new Promise<any>(resolve => {
			resolveFunc = resolve;
		});

		let scope       = this;
		let headerLabel = menu ? 'Redigera meny' : 'Lägg till meny';

		let alert = await this.alertCtrl.create(
			{
				header:  headerLabel,
				inputs:  [
					{
						name:        'name',
						value:       menu ? menu.name : '',
						placeholder: 'Namn'
					},
					{
						name:        'desc',
						type:        'textarea',
						value:       menu ? menu.description : '',
						placeholder: 'Beskrivning'
					}
				],
				buttons: [
					{
						text:    'Avbryt',
						role:    'cancel',
						handler: data => {
							resolveFunc(null);
						}
					},
					{
						text:    'OK',
						role:    'submit',
						handler: (data: any) => {
							resolveFunc(data);
						}
					}
				]
			});

		await alert.present();
		return promise;
	}

	/*
	private doAddCategory(success: boolean, menu?: IFoodMenu, data?: any): boolean {
		let result = false;

		this.logger.log('doAddCategory :: data ::', (data) ? data : 'UNDEFINED');
		this.logger.log('doAddCategory :: success ::', success);
		this.logger.log('doAddCategory :: menu ::', (menu) ? menu : 'UNDEFINED');

		this.foodMenus.push(menu);

		return result;
	}
	*/

	private handleCategory(menu: IFoodMenu) {
		console.log('handleCategory ::', name);
	}

	private addCategory(name: string) {
		console.log('addCategory ::', name);
	}


	/**
	 * Assign a weight so that the menus
	 * will sort like they are organized now.
	 */
	public updateItemWeights() {
		this.logger.debug('Update Menu Weights')
		let weight = this.foodMenus.length + 100;

		for (let item of this.foodMenus) {
			item.weight = weight;
			weight--;
		}
	}

	public setMenuChanged(value: boolean = true) {
		this.menuChanged = value;
	}

	private selectMenu(menu: IFoodMenu): void {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				category: menu.id,
				menuId:   menu.id,
				special:  JSON.stringify(menu.id)
			}
		}

		// this.router.navigate(['/admin/manage-menu-items']);

		this.logger.debug('Select Food Menu ::', menu);
	}

	private debugData(): void {
		this.logger.debug('foodMenuData ::', this.foodMenuManager.foodMenuData);
	}

	public getMenuClass(item: IFoodMenu): string {
		let result: string = 'food-item';

		if (item && item.deleted) {
			result = 'food-item deleted';
		}

		return result;
	}

	private reorderItems(event: CustomEvent): void {
		let scope = this;
		event.detail.complete();

		console.log('EV ::', JSON.stringify(event));
		console.log(event);
		console.log(`B Moving item from ${event.detail.from} to ${event.detail.to}`);

		try {
			const itemMove = this.foodMenus.splice(event.detail.from, 1)[0];
			this.foodMenus.splice(event.detail.to, 0, itemMove);

			scope.updateItemWeights();
			scope.setMenuChanged(true);
		}
		catch (err) {
			this.logger.error('Error re-arranging menu items', err);
		}

		event.detail.complete();
	}

}
