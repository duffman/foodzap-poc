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

import { Component, OnInit } from '@angular/core';
// import { ReviewsApiService } from '@api/reviews-api.service';
// import { throwToolbarMixedModesError } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface ILanguage {
	English: string;
	alpha2: string;
}
@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {

	languages;
	currency;
	settingsForm: FormGroup;
	icon: string;

  constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.language();
		this.currencies();
		this.settingsForm = this.formBuilder.group({
			selectedLang: [''],
			selectedCur: ['']
		});
	}

	language() {
		/*this.reviewsApi.language().subscribe((res: ILanguage) => {
			this.languages = res;
			console.log(this.languages);
		});*/
	}

	currencies() {
	  	/*
		this.reviewsApi.currencies().subscribe((res) => {
			this.currency = res;
			console.log(this.currency);
		});
		*/
	}

	icons(code: string) {
	  	/*
		this.reviewsApi.icons(code).subscribe(res => {
			console.log(res);
		});
		*/
	}

	change() {
		console.log(this.settingsForm.value);
		this.icon = './assets/flags/' + this.settingsForm.value.selectedLang.alpha2 + '.svg';
	}

}
