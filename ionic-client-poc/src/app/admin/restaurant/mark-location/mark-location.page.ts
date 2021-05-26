/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Component, OnInit } from '@angular/core';
import { Plugins }           from '@capacitor/core';

const { Geolocation } = Plugins;

@Component(
	{
		selector:    'app-mark-location',
		templateUrl: './mark-location.page.html',
		styleUrls:   ['./mark-location.page.scss'],
	})
export class MarkLocationPage implements OnInit {
	constructor() {
	}

	ngOnInit() {
	}

	async getCurrentPosition() {
		const coordinates = await Geolocation.getCurrentPosition();
		console.log('Current', coordinates);
	}

	watchPosition() {
		const wait = Geolocation.watchPosition({}, (position, err) => {
		})
	}
}
