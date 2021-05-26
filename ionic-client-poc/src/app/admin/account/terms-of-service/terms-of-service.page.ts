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

import { Component }       from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component(
	{
		selector:    'app-terms-of-service-page',
		templateUrl: 'terms-of-service.page.html',
		styleUrls:   [
			'./styles/terms-of-service.page.scss'
		]
	})

export class TermsOfServicePage {

	constructor(private modalController: ModalController) {
	}

	dismiss(): void {
		this.modalController.dismiss();
	}
}
