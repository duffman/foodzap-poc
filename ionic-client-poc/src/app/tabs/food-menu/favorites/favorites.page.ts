/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';
import { FavoritesList }     from "@sdk/food-menu/favorites/favourites.model";
import { IOrderData }        from "@sdk/food-menu/favorites/favourites.model";
import { FavouritesService } from "@sdk/food-menu/favorites/favourites.service";

@Component(
	{
		selector:    'app-favorites',
		templateUrl: './favorites.page.html',
		styleUrls:   ['./favorites.page.scss'],
	})
export class FavoritesPage implements OnInit {
	favorites: FavoritesList;

	constructor(
		private service: FavouritesService
	) {
		this.favorites = this.service.dataList;
	}

	ngOnInit() {
	}

	private goToCart() {
	}
}
