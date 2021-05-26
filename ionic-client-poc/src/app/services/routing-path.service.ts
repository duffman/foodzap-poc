/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }       from '@angular/core';
import { NavigationExtras } from "@angular/router";
import { Router }           from "@angular/router";
import { StorageService }   from "@sdk/services/storage.service";

export interface IRoutingData {
	commands: any[];
	extras?: NavigationExtras;
}

@Injectable(
	{
		providedIn: 'root'
	})
export class RoutingPathService {
	routeList = new Array<any>();
	current: IRoutingData;

	constructor(
		private router: Router,
		private storage: StorageService
	) {
	}

	private saveData(): void {
		this.storage.storeData('routeList', this.routeList);
	}

	private getData(): void {
		let data = this.storage.getData('routeList');

		if (Array.isArray(data)) {
			this.routeList = data;
		}
	}

	private pushNavData(commands: any[], extras?: NavigationExtras): void {
		this.routeList.push(
			{
				commands: commands,
				extras: extras
			}
		);
	}

	private popData(): IRoutingData {
		return this.routeList.pop();
	}

	public setInitPage(path: any): void {
		this.current = { commands: path };
	}

	public goBack(): Promise<boolean> {
		let data: IRoutingData = this.popData();

		if (!data) {
			data = { commands: null, extras: null };
		}


		console.log('goBack() :: current ::', this.current);
		console.log('goBack() :: routeList ::', this.routeList);

		return this.navigate(data.commands, data.extras);
		/*
		return new Promise((resolve, reject) => {
			this.router.navigate(data.commands, data.extras).then(res => {
				if (res) {
					this.pushNavData(this.current.commands, this.current.extras);

					this.current = { commands: data.commands, extras: data.extras };
				}
				resolve(res);

			}).catch(err => {
				reject(err);
			})
		});
		 */
	}

	public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
		return new Promise((resolve, reject) => {

			if (!commands) {
				reject(new Error('Missing commands'));
				return;
			}

			this.router.navigate(commands, extras).then(res => {
				if (res) {
					if (this.current) {
						this.pushNavData(this.current.commands, this.current.extras);
					}

					this.current = { commands: commands, extras: extras };

					console.log('navigate() :: current ::', this.current);
					console.log('navigate() :: routeList ::', this.routeList);

				}
				resolve(res);

			}).catch(err => {
				reject(err);
			})
		});
	}
}
