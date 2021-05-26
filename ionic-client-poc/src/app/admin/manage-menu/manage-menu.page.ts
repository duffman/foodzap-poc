/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from "@angular/router";
import { Router }                from "@angular/router";
import { CatPopoverAction }      from "@app/admin/manage-menu/category-popover/cat-popover-result";
import { CatPopoverResult }      from "@app/admin/manage-menu/category-popover/cat-popover-result";
import { CatPopoverComponent }   from "@app/admin/manage-menu/category-popover/cat-popover.component";
import { CategoryManagerModule } from "@app/admin/manage-menu/category-manager.module";
import { EditItemPage }          from "@app/admin/manage-menu/edit-item/edit-item.page";
import { ActionSheetController } from "@ionic/angular";
import { NavParams }             from "@ionic/angular";
import { AlertController }       from "@ionic/angular";
import { PopoverController }     from "@ionic/angular";
import { LoadingController }  from "@ionic/angular";
import { ModalController }    from "@ionic/angular";
import { ToastController }    from "@ionic/angular";
import { BasePage }           from "@sdk/base-page";
import { IActionResult }      from "@sdk/core/action-result";
import { ActionResult }       from "@sdk/core/action-result";
import { FoodMenuApiService } from "@sdk/food-menu/food-menu-api.service";
import { FoodMenuHelper }     from "@sdk/food-menu/food-menu-helper";
import { FoodMenuManager }    from "@sdk/food-menu/food-menu-manager";
import { FoodMenuService }    from "@sdk/food-menu/food-menu.service";
import { FoodMenuItem }       from "@sdk/food-menu/models/food-menu-item.model";
import { IFoodAllergy }       from "@sdk/food-menu/types/food-allergy";
import { IFoodMenuItem }      from "@sdk/food-menu/types/food-menu-item.type";
import { IFoodMenu }          from "@sdk/food-menu/types/food-menu.type";
import { IRestaurantData }    from "@sdk/restaurant/typings/restaurant.typing";
import { AppService }         from "@sdk/services/app.service";
import { LoggingService }     from "@sdk/services/logging.service";
import { SessionService }     from "@sdk/services/session.service";
import { StorageService }     from "@sdk/services/storage.service";
import { FoodMenu }           from "@sdk/shared-types/food-menu";
import { FoodMenuPostData }   from "@sdk/shared-types/food-menu-post-data";
import { ArrayUtils }         from "@sdk/utils/array.utils";
import { NumberUtils }           from "@sdk/utils/number.utils";
import { LoadingService }        from "@services/loading.service";
import { SignalService }         from "@services/signal.service";
import { Observable }            from "rxjs";

@Component(
	{
		selector:    'app-manage-menu',
		templateUrl: './manage-menu.page.html',
		styleUrls:   ['./manage-menu.page.scss'],
	})
export class ManageMenuPage extends BasePage implements OnInit {
	loadingMenus: boolean   = true;
	savingMenu: boolean     = false;
	restaurant: IRestaurantData;
	restaurantId: number    = -1;
	restaurantName: string  = '';
	restaurantCover: string = '';
	segmentModel: string    = 'all';
	menuChanged: boolean    = false;

	langId: number = 1;
	selCurrency    = 1;

	topTabs: string = 'dishes'; // 'menus';

	numberOfChanges: number = 0;
	foodMenus: IFoodMenu[]  = undefined;
	selectedIndex: number   = 0;
	selectedMenu: IFoodMenu = undefined;

	selectedCategoryId: number;
	selectedPage: string = 'sections';

	constructor(
		private route: ActivatedRoute,
		private navParams: NavParams,
		private appService: AppService,
		private modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public actionSheetController: ActionSheetController,
		public popoverController: PopoverController,
		private loadingController: LoadingController,
		public toastController: ToastController,
		private loader: LoadingService,
		private router: Router,
		private menuService: FoodMenuService,
		private manager: FoodMenuManager,
		private menuApiService: FoodMenuApiService,
		private sessionService: SessionService,
		private appState: SignalService,
		private storage: StorageService,
		private logger: LoggingService,
		private catManager: CategoryManagerModule
	) {
		super();
		this.appService.ping();
		this.setDebugMode();
		this.manager.setDebugMode();
		this.logger.setDebugMode(this.debugMode);
	}

	//
	//
	//

	private getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	private fakeDish(name: string, info: string): any {
		return {
			id:            this.getRandomInt(999),
			menuId:        1,
			name:          name,
			description:   info,
			langId:        1,
			price:         25.97,
			currencyId:    1,
			photo:        'Chicken',
			allergies:    [{val: 'lchf'}],
			weight: this.getRandomInt(8)
		}
	}

	private fakeMenu(name: string, info: string): any {
		return {
			id: this.getRandomInt(888),
			name: name,
			info: info,
			items: new Array<any>(),
			weight: this.getRandomInt(8)
		}
	}

	public ngOnInit() {
		this.loadingMenus = true;
		let session       = this.sessionService.getAdminSession();
		this.restaurantId = session.restaurant.info.id;

		this.manager.loadMenus(this.restaurantId);


		/*
		this.manager.foodMenuData.asObservable().subscribe(menu => {
			this.foodMenus    = menu;
			this.loadingMenus = false;

			console.log('MENUS ::::', menu);
		});
		*/

		let aMenus = Array<any>();

		let r1 = this.fakeMenu('Förrätter', 'Smaskiga förrätter');
		r1.items.push(this.fakeDish('Ostron', 'Fluffiga Ostron'));
		r1.items.push(this.fakeDish('Nuggets', 'Friterade'));
		aMenus.push(r1);

		let r2 = this.fakeMenu('Varmrätter', 'Direkt från indien');
		r2.items.push(this.fakeDish('Kyckling med ris', 'Färska kycklingar'));
		r2.items.push(this.fakeDish('Biff med chili', ''));
		r2.items.push(this.fakeDish('Sezuen Kyckling', 'Smask Smask'));
		aMenus.push(r2);

		let r3 = this.fakeMenu('Efterrätter', 'Njutning efter maten');
		r3.items.push(this.fakeDish('Glass med chocklad', 'Färska kycklingar'));
		r3.items.push(this.fakeDish('Rostad kola', ''));
		r3.items.push(this.fakeDish('Sezuen Kyckling', 'Smask Smask'));
		aMenus.push(r3);

		this.foodMenus = aMenus;
		console.log('FOOD MENU ::', this.foodMenus);
	}

	ionViewWillLeave() {
		console.log('EVENT :: ionViewWillLeave');
		return false;
	}

	ionViewDidEnter() {
		console.log('EVENT :: ionViewDidEnter');
	}

	handleDishEdit(srcItem: IFoodMenuItem, newItem: IFoodMenuItem): void {
		const scope = this;

		if (!srcItem || !newItem) {
			return;
		}

		// Set menu changed if any changes have been made to the item
		if (JSON.stringify(srcItem) !== JSON.stringify(newItem)) {
			this.setMenuChanged();
		}
		else {
			return;
		}

		function deleteMenuItemById(id: number, menu: IFoodMenu): boolean {
			let result = false;

			for (let i = 0; i < menu.items.length; i++) {
				let tmpItem = menu.items[i];
				if (tmpItem.id === id) {
					menu.items.splice(i, 1);
					result = true;
					break;
				}
			}

			return result;
		}

		// Find the parent menu for the source item
		function getParentMenu(itemId: number): IFoodMenu {
			let result: IFoodMenuItem = null;
			for (let menu of scope.foodMenus) {
				for (let item of menu.items) {
					if (item.id === itemId) {
						result = item;
						break;
					}
				}
			}

			return result;
		}

		let parentMenu = getParentMenu(srcItem.id);

		this.logger.log('PARENT MENU ::', parentMenu);

		if (!parentMenu) {
			let destMenu = this.manager.getMenuById(newItem.menuId, this.foodMenus);
			destMenu.items.splice(0, 0, newItem);
		}

		// Move to another menu
		else if (( srcItem.menuId !== newItem.menuId )) {
			scope.logger.log('menus differ');

			let srcMenu  = this.manager.getMenuById(srcItem.menuId, this.foodMenus);
			let destMenu = this.manager.getMenuById(newItem.menuId, this.foodMenus);

			if (deleteMenuItemById(srcItem.id, srcMenu)) {
				destMenu.items.push(newItem);
			}

			scope.logger.log('handleDishEdit :: srcMenu ::', srcMenu);
			scope.logger.log('handleDishEdit :: destMenu ::', destMenu);
		}

		srcItem.name = newItem.name;

		console.log('ORIGINAL ITEM ::', srcItem);
		console.log('NEW ITEM ::', newItem);
	}

	/**
	 * Edit dish
	 * @param menuId
	 * @param {IFoodMenuItem} dish
	 * @returns {Promise<void>}
	 */
	async editDishModal(dish?: IFoodMenuItem): Promise<void> {
		const modal = await this.modalCtrl.create(
			{
				component:      EditItemPage, // EditDishPage,
				componentProps: {
					dish:      dish,
					foodMenus: this.foodMenus
				}
			});

		modal.onDidDismiss().then(result => {
			if (result.data === undefined) {
				console.log('DIALOG CANCEL');
			}
			else {
				this.handleDishEdit(dish, result.data);
			}
		});

		return await modal.present();
	}

	private newDish(menuId: number): void {
		let menuItem         = new FoodMenuItem();
		menuItem.id          = NumberUtils.getRandomInt(true);
		menuItem.isDirty     = true;
		menuItem.langId      = this.langId;
		menuItem.menuId      = menuId;
		menuItem.currencyId  = this.selCurrency;
		menuItem.name        = '';
		menuItem.description = '';
		menuItem.price       = 0;
		menuItem.photo       = '';
		menuItem.allergies   = [];
		menuItem.weight      = 0;

		if (this.debugMode) {
			console.log('newDish ::', menuItem);
			console.log('newDish :: this.selectedMenu ::', this.selectedMenu);
		}

		this.editDish(menuItem);
	}

	private editDish(item: IFoodMenuItem): void {
		this.editDishModal(item).then(() => {
			if (this.debugMode) {
				// console.log('editDishModal ::', item);

				/*
				this.dish.photo = values.photo;
				this.dish.name  = values.name;
				this.dish.description  = values.description;
				this.dish.price = values.price;
				*/

				//this.logger.log('editDish Result :: item ::', item);
			}
		});
	}

	/**
	 * Tab Changed
	 * @param event
	 */
	private segmentChanged(event) {
		console.log(this.segmentModel);
		console.log(event);
	}

	/**
	 * Show Debug data
	 */
	private debugData() {
		// this.setMenuChanged();
		// ArrayUtils.moveItem(1, 0, this.foodMenus[1].items);

		console.log('\n\n\n');
		console.log('SOURCE ::', this.manager.foodMenusSource[1].items);
		console.log(' ');
		console.log('WORKING ::', this.foodMenus[1].items);
		console.log('\n\n\n');

		// this.manager.moveMenuItem(1, 0, this.foodMenus[1].items);

		return;

		this.logger.br(4, '-');
		console.log('Source Items ::', this.manager.foodMenusSource);
		this.logger.br(4, '#');
		console.log('Food Menu', this.foodMenus);
		this.logger.br(4, '#');
		console.log('Deleted Items', []);
		console.log('Curr Food Menu', this.selectedMenu);
		this.logger.br(4, '#');
	}

	/**
	 * Set the menu changed property
	 * @param {boolean} value
	 */
	public setMenuChanged(value: boolean = true) {
		if (value === true) {
			if (!this.numberOfChanges) {
				this.numberOfChanges = 0;
			}
			this.numberOfChanges++;
		}
		else {
			this.numberOfChanges = 0;
		}

		this.menuChanged = value;
	}

	/**
	 * Select an individual menu from the restaurant menu
	 * @param {IFoodMenu} menu
	 */
	private selectMenu(menu: IFoodMenu): void {
		this.selectedMenu = menu;
		this.selectChange(this.selectedMenu.id);
	}

	/**
	 * Selected Category Change
	 * @param event
	 */
	private selectChange(event: any): void {
		this.selectMenuById(Number.parseInt(event));
	}

	async confirmRemoveDishSheet(dish: IFoodMenuItem): Promise<boolean> {
		let resolveFunc: (confirm: boolean) => void;

		const promise = new Promise<boolean>(resolve => {
			resolveFunc = resolve;
		});

		const actionSheet = await this.actionSheetController.create(
			{
				header:   'Ta bort rätt',
				cssClass: 'custom-action-sheet',
				buttons:  [
					{
						text:    'Delete',
						role:    'destructive',
						icon:    'trash',
						handler: () => { resolveFunc(true); }
					}, {
						text:    'Avbryt',
						icon:    'close',
						handler: () => { resolveFunc(false); }
					}
				]
			});

		await actionSheet.present();
		return promise;
	}

	async removeDish(dish: IFoodMenuItem): Promise<any> {
		let res = await this.confirmRemoveDishSheet(dish);

		console.log('RES ::', res);

		if (res) {
			if (this.manager.deleteItem(dish)) {
				this.setMenuChanged();
			}
		}
	}

	/**
	 * Show an alert message if the user attenpts to
	 * leave the page when changes in pending
	 * @returns {Promise<void>}
	 */
	async discardChangesAlert(): Promise<boolean> {
		let result: boolean;
		const alert = await this.alertCtrl.create(
			{
				message:   'Fortsätt utan att spara?',
				subHeader: `Det finns förändringar som inte är sparade,\n
							om du lämnar menyn kommer dessa att gå förlorade.`,
				buttons:   [
					{
						text:    'Avbryt',
						role:    'cancel',
						handler: () => {
							result = false;
							console.log('Cancel clicked');
							console.log('discardChangesAlert :: false');
						}
					},
					{
						text:    'Fortsätt',
						handler: () => {
							result = true;
							console.log('discardChangesAlert :: true');
						}
					}
				]
			});

		await alert.present();

		return new Promise((resolve, reject) => {
			return result;
		});
	}

	public selectMenuById(menuId: number): boolean {
		let result = false;

		if (menuId > -1 && this.foodMenus) {
			this.selectedMenu = FoodMenuHelper.getMenuById(menuId, this.foodMenus);
			result            = true;
		}

		return result;
	}

	async presentToast(text: string) {
		const toast = await this.toastController.create(
			{
				message:  text,
				duration: 2000
			});

		toast.present();
	}

	public canDeactivate(): Observable<boolean>|Promise<boolean>|boolean {
		this.logger.fatLog('ManageMenuPage', 'canDeactivate');

		if (this.menuChanged) {

			const confirm = this.confirmSave(
				'Do you really want to delete the entry?'
			).then(confirm => {
				return confirm;
			});

		}
		else {
			return true;
		}
	}

	private async confirmSave(message: string): Promise<boolean> {
		let resolveFunction: (confirm: boolean) => void;

		const promise = new Promise<boolean>(resolve => {
			resolveFunction = resolve;
		});

		const alert = await this.alertCtrl.create(
			{
				header:          'Spara ändringar?',
				message,
				backdropDismiss: false,
				buttons:         [
					{
						text:    'Förkasta ändringar',
						handler: () => resolveFunction(false)
					},
					{
						text:    'Avbryt',
						handler: () => resolveFunction(true)
					}
				]
			});

		await alert.present();
		return promise;
	}

	public moveMenuUp(menuId: number): boolean {
		let result = false;
		let index  = this.manager.getMenuIndex(menuId);

		if (index - 1 > -1) {
			result = ArrayUtils.moveItem(index, index - 1, this.foodMenus);
		}

		return result;
	}

	public moveMenuDown(menuId: number): boolean {
		let result = false;
		let index  = this.manager.getMenuIndex(menuId);

		if (index + 1 <= this.foodMenus.length) {
			result = ArrayUtils.moveItem(index, index + 1, this.foodMenus);
		}

		return result;
	}

	private isFirstCategory(menuId: number): boolean {
		let index = this.manager.getMenuIndex(menuId);
		return index === 0;
	}

	private isLastCategory(menuId: number): boolean {
		let index = this.manager.getMenuIndex(menuId);
		return index === ( this.foodMenus.length - 1 );
	}

	///
	///
	///

	async openCategoryMenu(ev: any, meunId: number) {
		const popover = await this.popoverController.create(
			{
				component:      CatPopoverComponent,
				componentProps: {
					menuId:     meunId,
					isFirst:    this.isFirstCategory(meunId),
					isLast:     this.isLastCategory(meunId),
					controller: this.popoverController
				},
				cssClass:       'category-popover',
				event:          ev,
				translucent:    true
			});

		popover.onDidDismiss().then((result) => {
			if (result && result.data) {
				this.handlePopoverAction(result.data);
			}
		});

		return await popover.present();
	}

	public handlePopoverAction(result: CatPopoverResult): void {
		console.log('resultData.data ::', result.data);
		console.log('resultData.action ::', result.action);
		console.log('CatPopoverAction.AddDish ::', CatPopoverAction.AddDish);

		switch (result.action) {
			case CatPopoverAction.AddDish:
				console.log('ZZZ resultData.data.menuId ::', result.data.menuId);
				this.newDish(result.data.menuId);
				break;

			case CatPopoverAction.MoveUp:
				this.moveMenuUp(result.data.menuId);
				break;

			case CatPopoverAction.MoveDown:
				this.moveMenuDown(result.data.menuId);
				break;

			case CatPopoverAction.Delete:
				console.log('CatPopoverAction.Delete :: ¨¨~');
				break;
		}

		console.log('result ::', result);
	}

	/**
	 * Get CSS Class Name for provided Food Menu Item
	 * @param {IFoodMenuItem} item
	 * @returns {string}
	 */
	public getClassName(item: IFoodMenuItem): string {
		let result: string = 'food-item';

		if (item && item.deleted) {
			result = 'food-item deleted';
		}

		return result;
	}

	private getFoodMenuClass(item: IFoodMenu): string {
		let result: string = 'food-item';

		if (item && item.deleted) {
			result = 'food-item deleted';
		}

		return result;
	}

	public getThumbStyle(item: IFoodMenuItem): string {
		if (!item.photo) {
			return 'background: lime';
		}
	}

	/**
	 * Save Menus
	 * @returns {Promise<IActionResult>}
	 */
	public saveMenu(): Promise<IActionResult> {
		const scope = this;
		let result  = new ActionResult(true);
		let selMenu = this.selectedMenu;

		let postData          = new FoodMenuPostData(3);
		postData.restaurantId = this.restaurantId;
		postData.id           = this.selCurrency;
		postData.languageId   = this.appService.selLanguage;
		postData.foodMenus    = this.foodMenus;

		async function apiServiceSave(): Promise<IActionResult> {
			console.log('Save Menu :: apiServiceSave()');

			return new Promise((resolve, reject) => {
				scope.menuApiService.setAsyncMenu(postData).then((res: IActionResult) => {
					resolve(res);
				}).catch(err => {
					scope.logger.error('saveMenu :: error ::', err);
					reject(err);
				});
			});
		}

		async function execute(): Promise<void> {
			console.log('Save Menu :: execute -------- ::', result);
			scope.savingMenu = true;

			/* TODO: Decide on what to do with selected menu...
			if (!selMenu) {
				scope.logger.log('Save Menu :: execute :: no selected menu');
				result.success = false;
				result.error   = new Error('saveMenu :: selectedMenu IS NULL');
			}
			*/

			if (result.success) {
				postData.appendMenu(selMenu);
				console.log('Save Menu :: execute :: proceed');

				let saveRes = await apiServiceSave();
				console.log("SAVE MENU ::", saveRes);

				scope.presentToast('Menyn är nu publicerad!')
			}

			scope.savingMenu = false;
			scope.setMenuChanged(false);
		}

		return new Promise((resolve, reject) => {
			execute().then(() => {
				console.log('Save Menu :: execute().then(() ::', result);
				resolve(result);
			}).catch(err => {
				this.logger.error('EXECUTE FAIL ::', err);
				reject(err);
			})
		});
	}

	/**
	 * Undo changes since last save
	 * @returns {Promise<IActionResult>}
	 */
	public revertChanges(): Promise<IActionResult> {
		return new Promise((resolve) => {
			this.foodMenus = this.manager.foodMenus;

			let result = new ActionResult(
				this.manager.revertToSource()
			);

			resolve(result);
		});
	}

	private onRenderItems(event: any) {
		console.log('ON RENDER ITEMS :: event ::', event);
	}

	private performReorder(event: CustomEvent, sourceList: any[]): boolean {
		let result = ArrayUtils.moveItem(
			event.detail.from,
			event.detail.to,
			sourceList
		);

		event.detail.complete(result);

		return result;
	}

	public updateItemWeights() {
		for (let menu of this.foodMenus) {
			let baseWeight = menu.items.length + 100;
			for (let item of menu.items) {
				item.weight = baseWeight;
				// console.log('%c "' + JSON.stringify(item) + '"' , 'background: maroon; color: white');
				baseWeight--;
			}
		}
	}

	private reorderItems(event: CustomEvent, menuId: number): void {
		console.log('reorderItems for menuId ::', menuId);
		console.log('EV ::', JSON.stringify(event));
		console.log(event);
		console.log(`B Moving item from ${event.detail.from} to ${event.detail.to}`);

		try {
			let menu = this.manager.getMenuById(menuId, this.foodMenus);

			if (menu && menu.items.length > 1) {
				ArrayUtils.moveItem(event.detail.from, event.detail.to, menu.items);
				this.updateItemWeights();
				this.setMenuChanged(true);
			}
			else {
				throw new Error(`Reorder failed :: menu by id ${menuId} not found`);
			}
		}
		catch (err) {
			this.logger.error('Error re-arranging menu items', err);
		}

		event.detail.complete();
	}

	private reorderSection(event: any): void {
		this.logger.log('reorderSection ::', event);
		if (this.performReorder(event, this.foodMenus)) {
			this.setMenuChanged();
		}
	}

	// Show the loader for infinite time
	showLoader(text: string) {
		this.loadingController.create(
			{
				message: text
			}
		).then((res) => {
			res.present();
		});
	}

	/**
	 * Hide the loader if already created otherwise return error
	 */
	hideLoader() {
		this.loadingController.dismiss().then((res) => {
			console.log('Loading dismissed!', res);
		}).catch((error) => {
			console.log('error', error);
		});
	}

	/**************************************************************
	 *
	 *    MENUS SECTION
	 *
	 *************************************************************/
	editMenu(menu?: IFoodMenu) {
		const scope = this;
		this.catManager.addMenuInput(menu).then(res => {
			this.logger.log('addMenuInput ::', res);

			if (res) {
				if (!menu) {
					menu = new FoodMenu(NumberUtils.getRandomInt(true));

					menu.langId  = this.langId;
					menu.name    = res.name;
					menu.isDirty = true;
					menu.items   = new Array<IFoodMenuItem>();

					scope.foodMenus.push(menu);
				}

				menu.name        = res.name;
				menu.description = res.desc;

				this.setMenuChanged();
			}
		}).catch(err => {
			this.logger.logErr('editMenu :: err ::', err);
		});
	}

	removeMenu(menu: IFoodMenu) {
		this.catManager.removeMenu(menu);
	}

	getMenuClass(item: IFoodMenu): string {
		let result: string = 'food-item';

		if (item && item.deleted) {
			result = 'food-item deleted';
		}

		return result;
	}

	private reorderMenu(event: CustomEvent): void {
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
