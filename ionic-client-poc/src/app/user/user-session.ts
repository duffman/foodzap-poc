/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-11
 */
import { IRestaurant }     from "@sdk/restaurant/restaurant.model";
import { IRestaurantData } from "@sdk/restaurant/typings/restaurant.typing";
import { IUserData }       from "@sdk/user/user";

export interface IUserSession {
	disqIdent: string;
	userData: IUserData;
}

export interface IAdminSession extends IUserSession {
	userData: IUserData;
	restaurant: IRestaurantData;
}

/*
export interface IUserSession {
	disqIdent: string;
	userData: IUserData;
	restaurant: ISesRestaurant;
}

export interface ISesRestaurant {
	id: number;
}
*/
