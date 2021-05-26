/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * File Created: 2020-03-25 22:37
 */

export const AppPaths = {
	Restaurant:         'restaurant',
	RestaurantByCustId: `restaurant/custid`,
	QrScan:             `restaurant/qrscan`,
	Listing:            'restaurant/listing/'
}

export function listingByCityId(id: string): string {
	return `${AppPaths.Listing}/${id}`;
}

/*
export module AppPaths {
	export const QrScan: string           = `${AppPaths.Restaurant.Restaurant}/qrscan`;

	export module Restaurant {
		export const Restaurant: string         = `restaurant`;
		export const Listing: string      = `${AppPaths.Restaurant.Restaurant}/listing/`;
		export const ListingCity: string  = `${AppPaths.Restaurant.Restaurant}/listing/cities`;

		export function listingByCityId(id: string): string {
			return `${AppPaths.Restaurant.Listing}/${id}`;
		}
	}
}

 */
