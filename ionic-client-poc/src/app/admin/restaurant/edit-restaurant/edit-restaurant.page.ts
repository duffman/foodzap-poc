/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';
import { Validators }        from "@angular/forms";
import { FormBuilder }       from "@angular/forms";
import { FormGroup }         from "@angular/forms";
import { Router }            from "@angular/router";
import { ModalController }   from "@ionic/angular";
import { MenuController }    from "@ionic/angular";
import { RestaurantService } from "@sdk/restaurant/restaurant.service";
import { AppService }        from "@sdk/services/app.service";
import { IRestaurantData }   from "@sdk/restaurant/typings/restaurant.typing";
import { LoggingService }    from "@sdk/services/logging.service";

@Component(
	{
		selector:    'app-edit-restaurant',
		templateUrl: './edit-restaurant.page.html',
		styleUrls:   ['./edit-restaurant.page.scss'],
	})
export class EditRestaurantPage implements OnInit {
	restaurant: IRestaurantData;
	public registerForm: FormGroup;
	segmentModel = 'all';

	constructor(
		private restaurantService: RestaurantService,
		private router: Router,
		public menuCtrl: MenuController,
		public  formBuilder: FormBuilder,
		private logger: LoggingService
	) {
		let EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		/*
		this.registerForm = formBuilder.group(
			{
				firstname: [
					'',
					Validators.compose(
						[
							Validators.minLength(3),
							Validators.required
						])
				],
				lastname:  [
					'',
					Validators.compose(
						[
							Validators.minLength(3),
							Validators.required
						])
				],
				phone:     [
					'',
					Validators.compose(
						[
							Validators.minLength(2),
							Validators.required
						])
				],
				username:  [
					'',
					Validators.compose(
						[
							Validators.required,
							Validators.pattern(EMAIL_REGEXP)
						])
				],
				password:  [
					'',
					Validators.compose(
						[
							Validators.minLength(6),
							Validators.required
						])
				],
			});
		*/
	}

	ngOnInit() {}

	public segmentChanged(event: any) {
		console.log('segmentChanged ::', event);
	}

	public loadRestaurant(qrCode: string): void {
		this.restaurantService.loadRestaurant(qrCode).then(res => {
			console.log('### SUBSCRIBE RESTAURANT ::', res);
			this.restaurant = res;
		}).catch(err => {
			this.logger.debug('loadRestaurant ::', err);
		});
	}

	submitFormTest() {
		if (!this.registerForm.valid) {
			console.log(this.registerForm.value);
			//this.discardChangesAlert("invalid form");
			console.log("invalid form")
		}
		else {
			console.log(this.registerForm.value);
			console.log("yes, ")
		}
	}
}
