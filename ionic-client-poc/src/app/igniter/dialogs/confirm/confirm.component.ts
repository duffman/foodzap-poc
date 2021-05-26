/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }        from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { AlertController }   from "@ionic/angular";

@Injectable(
	{
		providedIn: 'root'
	})
export class ConfirmComponent implements OnInit {

	constructor(
		private alertController: AlertController
	) { }

	ngOnInit() {}

	public async show(message: string,
					  btnYes: string = 'Yes',
					  btnNo: string = 'No'
	): Promise<boolean> {
		let resolveFunction: (confirm: boolean) => void;

		const promise = new Promise<boolean>(resolve => {
			resolveFunction = resolve;
		});

		const alert   = await this.alertController.create(
			{
				header:          'Confirmation',
				message,
				backdropDismiss: false,
				buttons:         [
					{
						text:    btnNo,
						handler: () => resolveFunction(false)
					},
					{
						text:    btnYes,
						handler: () => resolveFunction(true)
					}
				]
			});
		await alert.present();
		return promise;
	}

	public async exampleMethodUsingConfirm() {
		const confirm = await this.show(
			'Do you really want to delete the entry?'
		);
		if (confirm) {
			console.log('Deleted');
		} else {
			console.log('Canceled');
		}
	}
}
