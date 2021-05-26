/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder }       from "@angular/forms";
import { Validators }        from "@angular/forms";
import { FormGroup }         from "@angular/forms";
import { AppService }        from "@sdk/services/app.service";

const digitPatterm = [
	Validators.required,
	Validators.pattern("^[0-9]*$"),
	Validators.minLength(1),
	Validators.maxLength(1)
];

@Component(
	{
		selector:    'app-confirm-mobile',
		templateUrl: './confirm-mobile.page.html',
		styleUrls:   ['./confirm-mobile.page.scss'],
	})
export class ConfirmMobilePage implements OnInit {
	mobileNumber: string;

	constructor(
		private formBuilder: FormBuilder,
		private appService: AppService
	) {
	}

	ngOnInit() {
	}

	public dishForm: FormGroup = this.formBuilder.group(
		{
			digit1: [
				'',
				[Validators.required,
				Validators.pattern("^[0-9]*$"),
				Validators.minLength(1),
				Validators.maxLength(1)]
			],
			digit2: [
				'',
				[Validators.required,
				 Validators.pattern("^[0-9]*$"),
				 Validators.minLength(1),
				 Validators.maxLength(1)]
			],
			digit3: [
				'',
				[Validators.required,
				 Validators.pattern("^[0-9]*$"),
				 Validators.minLength(1),
				 Validators.maxLength(1)]
			],
			digit4: [
				'',
				[Validators.required,
				 Validators.pattern("^[0-9]*$"),
				 Validators.minLength(1),
				 Validators.maxLength(1)]
			],
			digit5: [
				'',
				[Validators.required,
				 Validators.pattern("^[0-9]*$"),
				 Validators.minLength(1),
				 Validators.maxLength(1)]
			],
			digit6: [
				'',
				[Validators.required,
				 Validators.pattern("^[0-9]*$"),
				 Validators.minLength(1),
				 Validators.maxLength(1)]
			],
		});

	submit(): void {

	}
}
