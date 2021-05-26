/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';
import { Validators }        from "@angular/forms";
import { FormControl }       from "@angular/forms";
import { FormGroup }         from "@angular/forms";
import { PhotoService }      from "@app/igniter/photo/photo-service";
import { CameraPhoto }       from "@capacitor/core/dist/esm/core-plugin-definitions";
import { ModalController }   from "@ionic/angular";
import { FoodMenuItem }      from "@sdk/food-menu/models/food-menu-item.model";
import { IFoodMenuItem }     from "@sdk/food-menu/types/food-menu-item.type";
import { IFoodMenu }         from "@sdk/food-menu/types/food-menu.type";
import { LoggingService }    from "@sdk/services/logging.service";
import { FoodMenu }          from "@sdk/shared-types/food-menu";

@Component(
	{
		selector:    'app-edit-item',
		templateUrl: './edit-item.page.html',
		styleUrls:   ['./edit-item.page.scss'],
	})
export class EditItemPage implements OnInit {
	btnPhotoText: string;
	btnSubmitText: string;
	title: string;

	dish: IFoodMenuItem;
	foodMenus: FoodMenu[];

	form: FormGroup;
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
		'desc':  [
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

	////
	////

	topTabs: string = 'info';

	validationsForm: FormGroup;

	validations = {
		'catId':       [
			{type: 'required', message: 'Name is required.'}
		],
		'name':        [
			{type: 'required', message: 'Name is required.'}
		],
		'description': [
			{type: 'required', message: 'En beskrivning måste anges.'}
		],
		'price':       [
			{type: 'required', message: 'Pris måste anges.'},
			{type: 'pattern', message: 'Felaktigt format.'},
			{type: 'minlength', message: 'Pris måste bestå av minst 1 siffra.'}
		],
	};

	////
	////

	constructor(
		public viewCtrl: ModalController,
		public logger: LoggingService,
		public photoService: PhotoService
	) {
	}

	ngOnInit(): void {
		this.logger.log('Dish Object ::', this.dish);

		this.btnSubmitText = 'Spara';
		this.btnPhotoText  = 'Lägg till foto';
		this.title         = 'Lägg till rätt';

		if (this.dish.id > 0) {
			this.btnSubmitText = 'Spara ändringar';
			this.title         = 'Redigera rätt';
		}

		if (this.dish.photo) {
			this.btnPhotoText = 'Ta nytt foto';
		}

		this.validationsForm = new FormGroup(
			{
				'menuId':      new FormControl(this.dish.menuId, Validators.required),
				'photo':       new FormControl(this.dish.photo,
											   Validators.compose([
																	  Validators.minLength(5),
																  ])
				),
				'name':        new FormControl(this.dish.name, Validators.required),
				'description': new FormControl(this.dish.description),
				'price':       new FormControl(this.dish.price,
											   Validators.compose([
																	  Validators.required,
																	  Validators.pattern("^[0-9]*$"),
																	  Validators.minLength(1)
																  ])
				)
			});
	}

	takePhoto() {
		this.photoService.takePicture('Ta bakgrundsbild').then((res: CameraPhoto) => {
			this.dish.photo = 'data:image/jpeg;base64,' + res.base64String;
		}).catch(err => {
			this.logger.logErr('EditDishItem :: takePhoto ::', err);
		});
	}

	dismiss(value?: any): void {
		this.viewCtrl.dismiss(value);
	}

	onSubmit(values: IFoodMenuItem) {
		// Create a copy of the dish assign initially
		let dishCopy = Object.assign({}, this.dish);

		dishCopy.id          = this.dish.id;
		dishCopy.photo       = values.photo; // Photo is not part of the form so we set it manuallly
		dishCopy.menuId      = values.menuId;
		dishCopy.name        = values.name;
		dishCopy.description = values.description;
		dishCopy.price       = values.price;

		this.dismiss(dishCopy);
	}
}

/*
public cloneFoodMenus(source: IFoodMenu[]): IFoodMenu[] {
	let result: Array<IFoodMenu>;

	try {
		let tmpSource = Object.assign([], this.foodMenusSource);
		let tmpMenus  = new Array<IFoodMenu>();

		for (let menu of tmpSource) {
			let tmpMenu = Object.assign({}, menu);
			let items   = new Array<IFoodMenuItem>();

			for (let item of tmpMenu.items) {
				let tmpItem = Object.assign({}, item);
				items.push(item);
			}

			tmpMenu.items = items;
			tmpMenus.push(tmpMenu);
		}

		result = tmpMenus;
	}
	catch (err) {
		this.logger.error('FoodMenuManager :: failed to make local copy ::', err);
		result = null;
	}

	return result;
}
*/
