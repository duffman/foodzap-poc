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

import { Component }            from '@angular/core';
import { OnInit }               from "@angular/core";
import { Router }               from "@angular/router";
import { LoadingPage }          from "@app/tabs/loading/loading.page";
import { TranslateService }     from "@ngx-translate/core";
import { Plugins }              from '@capacitor/core';
import { BarcodeScanner }       from "@ionic-native/barcode-scanner/ngx";
import { NavController }        from "@ionic/angular";
import { ModalController }      from "@ionic/angular";
import { AlertController }      from "@ionic/angular";
import { LoadingController }    from "@ionic/angular";
import { FoodMenuApiService }   from "@sdk/food-menu/food-menu-api.service";
import { RestaurantApiService } from "@sdk/restaurant/restaurant-api.service";
import { IRestaurantData }      from "@sdk/restaurant/typings/restaurant.typing";
import { AppService }           from "@sdk/services/app.service";
import { LoggingService }       from "@sdk/services/logging.service";
import { SessionService }       from "@sdk/services/session.service";
import { StorageService }       from "@sdk/services/storage.service";
import { StrUtils }             from "@sdk/utils/string.utils";
import { RoutingPathService }   from "@services/routing-path.service";
import { TabsService }          from "@services/tabs.service";

const { Haptics } = Plugins;

@Component(
	{
		selector:    'app-start',
		templateUrl: 'start.page.html',
		styleUrls:   ['start.page.scss']
	})
export class StartPage implements OnInit {
	debugMode: boolean = true;
	data: any;
	loading: any;
	loadingModal: any;

	constructor(
		private router: Router,
		private navCtrl: NavController,
		private routingService: RoutingPathService,
		private alertCtrl: AlertController,
		private loadingController: LoadingController,
		private modalController: ModalController,
		private apiService: RestaurantApiService,
		private menuService: FoodMenuApiService,
		private storage: StorageService,
		private tabsService: TabsService,
		private logger: LoggingService,
		private appService: AppService,
		private userSession: SessionService,
		private barcodeScanner: BarcodeScanner,
		private translate: TranslateService
	) {
		translate.addLangs(['se', 'en']);

		console.log('StartPage ::', translate.getLangs());

		translate.use('se');
	}

	ngOnInit() {
		/*
		this.globiacService.getLangData('app.ruffe').then(res => {
			this.logger.log('globiacService >> getLangData ::', res);
		}).catch(err => {
			this.logger.logErr('globiacService >> getLangData ::', err);
		});
		*/

		/*
		this.langService.getLangData('app.balle').then(res => {
			this.logger.log('getLangData ::', res);
		}).catch(err => {
			this.logger.logErr('getLangData ::', err);
		});
		*/

		//this.logger.log('HomePage :: Langs ::', langRepo);
	}

	/**
	 * Show modal dialog
	 * @param {string} header - Dialog title
	 * @param {string} subHeader - Dialog body text
	 * @returns {Promise<void>}
	 */
	async presentAlert(header: string, subHeader: string) {
		const alert = await this.alertCtrl.create(
			{
				header:    header,
				subHeader: subHeader,
				buttons:   ['Dismiss']
			});

		await alert.present();
	}

	private getRestaurant(code: string): Promise<IRestaurantData> {
		return this.apiService.getRestaurantByQrCode(code);
	}

	register() {}

	admin() {
		this.router.navigate(['/admin/login']);
	}

	login() {
		this.router.navigate(['/admin/login']);
	}

	private openRestaurant(restaurant: IRestaurantData): Promise<boolean> {
		console.log('Open Restaurant ::', restaurant);

		let menuUrl = `/tabs/menu/${restaurant.info.id}`;

		this.storage.storeData('scanData', restaurant);

		return this.routingService.navigate(
			[
				'/tabs/menu',
				restaurant.info.id
			]
		);
	}

	private async getRestaurantByQr(qrCode: string): Promise<IRestaurantData> {
		return this.apiService.getRestaurantByQrCode(qrCode);
	}

	async presentLoadingModal(): Promise<any> {
		this.loadingModal = await this.modalController.create(
			{
				component:      LoadingPage,
				componentProps: {
					foo: 'hello',
					bar: 'world'
				}
			});

		return await this.loadingModal.present();
	}

	/**
	 *
	 * @param data
	 * @returns {Promise<void>}
	 */
	private async execute(data: any) {
		const scope         = this;
		let result: boolean = false;
		let qrCode: string;

		async function getRestaurantByQr(qrCode: string = 'A02'): Promise<IRestaurantData> {
			return scope.apiService.getRestaurantByQrCode(qrCode);
		}

		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		async function hideLoader() {
			await scope.loadingModal.dismiss();
		}

		if (StrUtils.isStr(data)) {
			qrCode = data as string;
		}

		this.logger.debug('execute :: getting restaurant :: QR ::', qrCode);

		let restaurant: IRestaurantData;
		let service = this.apiService;

		await this.presentLoadingModal();

		try {
			restaurant = await getRestaurantByQr(qrCode);
			this.logger.log('getRestaurantByQr', restaurant);
			this.logger.debug('execute :: getting restaurant ::', restaurant);

			if (restaurant) {
				this.openRestaurant(restaurant).then(res => {
					// scope.hideLoader();
				}).catch(err => {
					this.logger.logErr('execute :: openRestaurant', err);
					// scope.hideLoader();
				});
			}
			else {
				let message = 'QR-koden hittades inte.';
				this.logger.logErr(`Could not open restaurant with QR code`, qrCode);
			}

			await this.loadingModal.dismiss();
		}
		catch (ex) {
			this.logger.logErr('execute :: restaurant ::', ex);
			let message = 'Restaurangen kunde inte öppnas just nu, vänligen gör ett nytt försök.';
			//await this.globiacService.getLangData('err_get_restaurant');

			const alert = await this.alertCtrl.create(
				{
					header:    'Hoppsan',
					subHeader: message,
					buttons:   [
						{
							text:     'OK',
							role:     'cancel',
							cssClass: 'alert-btn-ok',
							handler:  (closeEventHandler) => {
								this.loadingModal.dismiss();
								this.logger.log('Dismissing error dialog :: event ::', closeEventHandler)
							}
						}
					]
				});

			await alert.present();
		}
	}

	private test(): void {
		try {
			let qrCode = 'A01';
			let res    = this.execute(qrCode);
			this.logger.debug('TEST :: CODE(' + qrCode + ') :: res ::', res);
		}
		catch (e) {
			this.logger.debug('TEST :: EXCEPTION ::', e);
		}
	}

	private async test2() {
		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		//this.showLoader();

		await this.presentLoadingModal();

		await delay(1300);

		//await this.loadingModal.dismiss();

		//this.hideLoader();
	}

	private scan() {
		this.data = null;
		this.barcodeScanner.scan().then(barcodeData => {
			this.logger.debug('Barcode data', barcodeData);
			this.data = barcodeData;

			if (barcodeData && barcodeData.text && barcodeData.format === 'QR_CODE') {
				Haptics.vibrate();
				this.execute(barcodeData.text);
			}

		}).catch(err => {
			this.logger.error('Scan Error', err);
		});
	}

	/**
	 * Show manual QR code input
	 * @returns { Promise<void> }
	 */
	private async showCodeInput() {
		let alert = await this.alertCtrl.create(
			{
				header:  'Ange kod',
				inputs:  [
					{
						name:        'code',
						placeholder: 'Kod'
					}
				],
				buttons: [
					{
						text:    'Avbryt',
						role:    'cancel',
						handler: data => {
							console.log('Cancel clicked');
						}
					},
					{
						text:    'OK',
						handler: data => {
							return this.execute(data.code);

						}
					}
				]
			});

		await alert.present();
	}

	/**
	 * Show the loader for infinite time
	 */
	private showLoader() {
		this.loadingController.create(
			{
				message: 'Letar restaurang...'
			}
		).then((res) => {
			res.present();
		});
	}

	/**
	 * Hide the loader if already created
	 * otherwise return error
	 */
	private hideLoader() {
		this.loadingController.dismiss().then((res) => {
			console.log('Loading dismissed!', res);
		}).catch((error) => {
			console.log('error', error);
		});
	}
}
