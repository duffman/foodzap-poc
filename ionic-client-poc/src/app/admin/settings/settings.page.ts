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

import { Component, OnInit }     from '@angular/core';
import { FormControl }           from "@angular/forms";
import { FormGroup }             from "@angular/forms";
import { counterRangeValidator } from '@components/counter-input/counter-input.component';

@Component(
	{
		selector:    'app-settings',
		templateUrl: './settings.page.html',
		styleUrls:   ['./settings.page.scss'],
	})
export class SettingsPage implements OnInit {
	rangeForm: any;
	checkboxForm: FormGroup;
	radioForm: FormGroup;
	checkboxTagsForm: FormGroup;
	radioTagsForm: FormGroup;
	switchersForm: FormGroup;
	counterForm: any;
	ratingForm: FormGroup;
	radioColorForm: FormGroup;

	constructor() {
		this.rangeForm = new FormGroup(
			{
				single: new FormControl(25),
				dual:   new FormControl(
					{
						lower: 12,
						upper: 23
					}
				)
			});

		this.checkboxForm = new FormGroup(
			{
				person_1: new FormControl(true),
				person_2: new FormControl(false),
				person_3: new FormControl(false),
				person_4: new FormControl(true),
				person_5: new FormControl(false)
			});

		this.radioForm = new FormGroup(
			{
				selected_option: new FormControl('apple')
			});

		this.checkboxTagsForm = new FormGroup(
			{
				tag_1: new FormControl(true),
				tag_2: new FormControl(false),
				tag_3: new FormControl(true),
				tag_4: new FormControl(true),
				tag_5: new FormControl(false),
				tag_6: new FormControl(false),
				tag_7: new FormControl(
					{
						value:    true,
						disabled: true
					}),
				tag_8: new FormControl(false)
			});

		this.radioTagsForm = new FormGroup(
			{
				selected_option: new FormControl('any')
			});

		this.switchersForm = new FormGroup(
			{
				notifications:       new FormControl(true),
				email_notifications: new FormControl(false)
			});

		this.counterForm = new FormGroup(
			{
				counter:  new FormControl(5, counterRangeValidator(1, 7)),
				counter2: new FormControl(2, counterRangeValidator(1, 5))
			});

		this.ratingForm = new FormGroup(
			{
				rate:  new FormControl(2.5),
				rate2: new FormControl(1.5)
			});

		this.radioColorForm = new FormGroup(
			{
				selected_color: new FormControl('#fc9961')
			});
	}

	rangeChange(range: Range) {
		console.log('range change', range);
	}

	ngOnInit() {
	}

	menuLoading() {
		return false;
	}
}
