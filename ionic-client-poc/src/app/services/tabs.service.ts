/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable }     from '@angular/core';
import { Router }         from "@angular/router";
import { NavigationEnd }  from "@angular/router";
import { Platform }       from "@ionic/angular";
import { LoggingService } from "@sdk/services/logging.service";
import { filter }         from "rxjs/operators";

@Injectable(
	{
		providedIn: 'root'
	})
export class TabsService {
	private previousUrl: string = null;
	private currentUrl: string  = null;

	private hideTabBarPages: string[] = [
		'',
		'tab1',
		'tab2',
		'admin/login'
	];

	routeParamPages: string[] = [
		'product-details',
	];

	constructor(private logger: LoggingService,
		private router: Router,
		private platform: Platform) {
		this.platform.ready().then(() => {
			this.navEvents();
		});

		this.currentUrl = this.router.url;

		/*
		router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// Duffman: Only update if the new url in the event is
				// different from the previously set url
				if (event.url !== this.previousUrl) {
					this.previousUrl = this.currentUrl;
					this.currentUrl  = event.url;
				}
			}

			this.logger.debug('PREVIOUS URL ::', this.previousUrl);
			this.logger.debug('CURRENT URL ::', this.currentUrl);
		});
		*/
	}

	// A simple subscription that tells us what page we're currently navigating to.
	private navEvents() {
		this.router.events.pipe(filter(e => e instanceof NavigationEnd))
			.subscribe((e: any) => {
				console.log(e);
				this.showHideTabs(e);
			});
	}

	public hideTabs() {
		const tabBar = document.getElementById('tabBar');

		console.log('tabBar ::', tabBar);

		if (tabBar !== null) { //} && tabBar.style.display !== 'none') {
			tabBar.style.display = 'none';
		}
	}

	public showTabs() {
		const tabBar = document.getElementById('tabBar');
		if (tabBar !== null && tabBar.style.display !== 'flex') {
			tabBar.style.display = 'flex';
		}
	}

	/*
	 {
	 id: 13
	 url: "/tabs/groups/new-group?type=msg"
	 urlAfterRedirects: "/tabs/groups/new-group?type=msg"
	 }
	 */
	private showHideTabs(e: any) {
		// Result:  e.url: "/tabs/groups/new-group?type=group"

		let path: string = e.url;
		if (path.startsWith('/')) {
			path = path.substr(1, path.length);
		}

		// Split the URL up into an array.
		const urlArray = e.url.split('/');
		// Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]

		// Grab the parentUrl
		const pageUrlParent = urlArray[urlArray.length - 2];

		// Grab the last page url.
		const pageUrl       = urlArray[urlArray.length - 1];

		// Result: new-group?type=group
		const page = pageUrl.split('?')[0];

		// Result: new-group
		// Check if it's a routeParamPage that we need to hide on
		const hideParamPage = this.routeParamPages.indexOf(pageUrlParent) > -1 && !isNaN(Number(page));
		// Check if we should hide or show tabs.
		let shouldHide    = this.hideTabBarPages.indexOf(path) > -1 || hideParamPage;
		// Result: true

		//shouldHide = true;

		// Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
		try {
			setTimeout(() => shouldHide ? this.hideTabs() : this.showTabs(), 300);
		}
		catch (err) {
		}
	}
}
