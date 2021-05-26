/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }    from '@angular/core';
import { ContentChild } from '@angular/core';
import { IonButton }    from "@ionic/angular";

@Component(
	{
		selector:    'loading-button',
		templateUrl: './loading-button.component.html',
		styleUrls:   [
			'./loading-button.component.scss'
		]
	})
export class LoadingButtonComponent {

	show = false;

	@ContentChild(IonButton) button: IonButton;

	constructor() {
	}

	toggleShow() {
		this.show = !this.show;
		if (this.show) {
			//this.button.type = 'text';
		}
		else {
			// this.input.type = 'password';
		}
	}
}
