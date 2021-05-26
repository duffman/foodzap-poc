/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Input }             from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { IFoodMenuManager }  from "@sdk/food-menu/food-menu-manager";
import { IFoodMenuItem }     from "@sdk/food-menu/types/food-menu-item.type";

@Component(
	{
		selector:    'app-dish-row',
		templateUrl: './dish-row.component.html',
		styleUrls:   ['./dish-row.component.scss'],
	})
export class DishRowComponent implements OnInit {

	@Input() item: IFoodMenuItem;
	@Input() manager: IFoodMenuManager;


	@Input() onEdit: (item: IFoodMenuItem) => void;
	@Input() onRemove: (item: IFoodMenuItem) => void;

	@Input() onGetThumbnail: (item: IFoodMenuItem) => string;

	// @Input() onGetClassName: (item: IFoodMenuItem) => string;
	@Input() onGetThumbStyle: (item: IFoodMenuItem) => string;
	@Input() showReorderSlot: boolean;

	constructor() { }

	ngOnInit() {}

	getClassName(item: IFoodMenuItem): string {
		return "Kula";
	}

	getThumbnail(item: IFoodMenuItem): string {
		return this.manager.getDishPic(item);
	}

	getThumbStyle(item: IFoodMenuItem): string {
		return "Kula";
	}
}
