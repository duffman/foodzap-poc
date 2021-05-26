/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { IFoodMenuItem }  from "./food-menu-item.type";
import { FoodMenuOption } from "./food-menu-option";

export interface IFoodItemProps {
	gluten: boolean;
	lactose: boolean;
	vegetarian: boolean;
}

export class FoodItemProps implements IFoodItemProps {
	constructor(
		public gluten: boolean     = false,
		public lactose: boolean    = false,
		public vegetarian: boolean = false
	) {
	}
}

export class FoodMenuItem implements IFoodMenuItem {
	public id: number;
	public menuId: number;
	public catId: number;
	public name: string;
	public description: string;
	public price: number;
	public code: string;
	public symbol: string;
	public categories: Array<FoodMenuOption>;
	public photo?: string;
	public ref?: string;
	public weight?: number;

	// No Storage :: Client Only
	public deleted?: boolean;
	public props: IFoodItemProps;

	constructor(
		id: number | null            = -1,
		catId: number                = -1,
		menuId: number               = -1,
		name: string                 = "",
		description: string          = "",
		price: number                = -1,
		code: string                 = "",
		symbol: string               = "",
		categories: FoodMenuOption[] = [],
		photo: string                = "",
		ref: string                  = "",
		weight: number               = -1,
		props?: IFoodItemProps
	) {
		this.id          = id;
		this.menuId      = menuId;
		this.catId       = catId;
		this.name        = name;
		this.description = description;
		this.price       = price;
		this.code        = code;
		this.code        = symbol;
		this.categories  = categories;
		this.photo       = photo;
		this.ref         = ref;
		this.weight      = weight;
		this.props       = props;
	}
}
