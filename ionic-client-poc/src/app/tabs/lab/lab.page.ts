/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';

@Component(
	{
		selector:    'app-lab',
		templateUrl: './lab.page.html',
		styleUrls:   ['./lab.page.scss'],
	})
export class LabPage implements OnInit {
	public lottieConfig: Object;
	private anim: any;
	private animationSpeed: number = 1;

	items = [
		{
			name: "Kalle Kula",
			fat: false
		},
		{
			name: "Balle Bula",
			fat: true
		}
		];

	constructor() {
		this.lottieConfig = {
			path:     'assets/pinjump.json',
			renderer: 'canvas',
			autoplay: true,
			loop:     true
		};
	}

	ngOnInit() {
	}


	doIt() {
		this.items[0].fat = true;

	}

	handleAnimation(anim: any) {
		this.anim = anim;
	}

	stop() {
		this.anim.stop();
	}

	play() {
		this.anim.play();
	}

	pause() {
		this.anim.pause();
	}

	setSpeed(speed: number) {
		this.animationSpeed = speed;
		this.anim.setSpeed(speed);
	}
}
