/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit }   from '@angular/core';
import { FormBuilder }         from "@angular/forms";
import { Validators }          from "@angular/forms";
import { FormControl }         from "@angular/forms";
import { FormGroup }           from "@angular/forms";
import { Router }              from "@angular/router";
import { PHONE_PATTERN }       from "@app/igniter/forms/validation-helper";
import { EMAIL_PATTERN }       from "@app/igniter/forms/validation-helper";
import { PhotoService }        from "@app/igniter/photo/photo-service";
import { CameraPhoto }         from "@capacitor/core/dist/esm/core-plugin-definitions";
import { OpenHoursModel }      from "@sdk/restaurant/restaurant-data.model";
import { RestaurantDataModel } from "@sdk/restaurant/restaurant-data.model";
import { IOpenCloseTime }      from "@sdk/restaurant/typings/restaurant-info.typing";
import { IDayHours }           from "@sdk/restaurant/typings/restaurant-info.typing";
import { IOpenHours }          from "@sdk/restaurant/typings/restaurant-info.typing";
import { IRestaurantData }     from "@sdk/restaurant/typings/restaurant.typing";
import { LoggingService }      from "@sdk/services/logging.service";
import { SessionService }      from "@sdk/services/session.service";
import * as Leaflet            from 'leaflet';
import { antPath }             from 'leaflet-ant-path';
import { Subject }             from "rxjs";

@Component(
	{
		selector:    'app-restaurant',
		templateUrl: './restaurant.page.html',
		styleUrls:   ['./restaurant.page.scss'],
	})
export class RestaurantPage implements OnInit {
	isModified = false;

	pickupLocation: string;

	coverImage: string;
	logoImage: string;

	topTabs: string    = 'info';

	openHours: IOpenHours;
	restaurantData: IRestaurantData;
	restaurantId: number = -1;

	infoForm: FormGroup;
	openHoursForm: FormGroup;

	formValidationMessages = {
		'name':  [
			{
				type:    'required',
				message: 'Namn måste anges'
			},
			{
				type:    'pattern',
				message: 'Ogiltigt namn'
			}
		],
		'email': [
			{
				type:    'required',
				message: 'Email is required.'
			},
			{
				type:    'pattern',
				message: 'Enter a valid email.'
			}
		],
		'phone': [
			{
				pattern: 'Endast siffror 0-9 är tillåtna',
				type:    'required',
				message: 'Telefonnummer saknas.'
			},
			{
				type:    'minlength',
				message: 'Ogiltigt telefonnummer'
			}
		]
	};

	map: Leaflet.Map;

	canDeactivate(): boolean {
		return true;
	}

	constructor(
		formBuilder: FormBuilder,
		private sessionService: SessionService,
		private logger: LoggingService,
		public photoService: PhotoService,
		private router: Router
	) {
		this.infoForm = formBuilder.group(
			{
				name:  new FormControl(
					'',
					Validators.compose([
										   Validators.maxLength(25),
										   Validators.minLength(5),
										   Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
										   Validators.required
									   ])
				),
				desc:  new FormControl(
					'',
					Validators.compose([
										   Validators.required
									   ])
				),
				email: new FormControl('putte@gmail.com',
									   Validators.compose(
										   [
											   Validators.pattern(EMAIL_PATTERN)
										   ]
									   )),

				phone: new FormControl('',
									   Validators.compose(
										   [
											   Validators.pattern(PHONE_PATTERN)
										   ]
									   ))

			});
	}

	ngOnInit() {
		let session       = this.sessionService.getAdminSession();
		this.restaurantId = session.restaurant.info.id;

		console.log('Restaurant ID from RestaurantPage ::', this.restaurantId);

		this.restaurantData = session.restaurant;

		if (!this.restaurantData) {
			this.restaurantData = new RestaurantDataModel();
		}

		this.coverImage = this.restaurantData.info.coverImage;
		this.logoImage = this.restaurantData.info.logoImage;

		if (!this.restaurantData.openHours || !this.restaurantData.openHours.openHours) {
			this.restaurantData.openHours = new OpenHoursModel();
		}

		console.log('-- OPEN HOURS BEFORE ::', this.restaurantData.openHours);
		this.initOpenHours(this.restaurantData.openHours);
		console.log('-- OPEN HOURS ::', this.openHours);
	}

	ionViewDidEnter() {}

	leafletMap() {
		this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);
		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'edupala.com © Angular LeafLet',
		}).addTo(this.map);

		Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
		Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

		antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
				{color: '#FF0000', weight: 5, opacity: 0.6})
			.addTo(this.map);
	}

	/** Remove map when we have multiple map object */
	ngOnDestroy() {
		this.map.remove();
	}

	onSubmitInfo(info: any) {
		console.log('onSubmitInfo ::', info);
	}

	getDayName(timeSlot: IDayHours) {
		let result = '';
		switch (timeSlot.dayOfWeek) {
			case 1:
				result = 'Måndag';
				break;
			case 2:
				result = 'Tisdag';
				break;
			case 3:
				result = 'Onsdag';
				break;
			case 4:
				result = 'Torsdag';
				break;
			case 5:
				result = 'Fredag';
				break;
			case 6:
				result = 'Lördag';
				break;
			case 7:
				result = 'Söndag';
				break;
		}

		return result;
	}

	openHoursCheckChange(timeSlot: IDayHours) {
		timeSlot.isOpen = !timeSlot.isOpen;
	}

	formatTime(timeSlot: IOpenCloseTime): string {
		if (!timeSlot) {
			return '00:00';
		}

		function leadZero(num: number): string {
			let result: string = '';
			if (num < 10) {
				result = '0';
			}
			return result + num.toString();
		}

		let res = leadZero(timeSlot.hours) + ':' + leadZero(timeSlot.minutes);
		return res;
	}

	getDisabled(timeSlot: IDayHours): boolean {
		return !timeSlot.isOpen;
	}

	//
	// This is a bit of a work around since we can´t
	// trust that we get an entire week from the server
	//
	initOpenHours(openHours: IOpenHours) {
		// Create a fresh instace with all weekdays
		let tmpOpenHours = new OpenHoursModel();
		console.log('OPEN HOURS ::', openHours);
		console.log('OPEN HOURS 2 ::', openHours.openHours);

		for (let item of tmpOpenHours.openHours) {
			let tmpDH = this.getDayOfWeekHours(item.dayOfWeek, openHours.openHours);

			if (!tmpDH) {
				continue;
			}

			if (tmpDH) {
				item.openTime  = tmpDH.openTime;
				item.closeTime = tmpDH.closeTime;
				item.isOpen    = tmpDH.isOpen;
			}
			else {
				item.isOpen = false;
			}
		}

		// Assign variables
		this.openHours                = tmpOpenHours;
		this.restaurantData.openHours = this.openHours;
	}

	getDayOfWeekHours(dow: number, openHours?: IDayHours[]): IDayHours {
		if (!openHours) {
			openHours = ( this.openHours && this.openHours.openHours ) ? this.openHours.openHours : null;
		}

		if (!openHours) {
			this.logger.logErr('getDayOfWeekHours :: openHours not assigned');
			return;
		}

		let result: IDayHours;

		for (let item of openHours) {
			if (item.dayOfWeek === dow) {
				result = item;
				break;
			}
		}

		return result;
	}

	takeCoverPhoto() {
		this.photoService.takePicture('Ta bakgrundsbild').then((res: CameraPhoto) => {
			this.coverImage = 'data:image/jpeg;base64,' + res.base64String;
		}).catch(err => {
			this.logger.logErr('')
		});
	}

	takeLogoPhoto() {
		this.photoService.takePicture('Logotyp').then((res: CameraPhoto) => {
			this.restaurantData.info.logoImage = 'data:image/jpeg;base64,' + res.base64String;
		}).catch(err => {
			this.logger.logErr('')
		});
	}

	onpickupClick() {
		this.router.navigate(['pickup-location']);
	}
}
