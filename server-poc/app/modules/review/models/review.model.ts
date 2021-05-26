/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

export interface IRestaurantRating {
	id?:            number;
	user_id?:       number;
	restaurant_id?: string;
	rating?:        number;
	comment?:       string;
	timestamp?:     Date;
}

// Converts JSON strings to/from your types
export class RatingConvert {
	public static toIRestaurantRating(json: string): IRestaurantRating {
		return JSON.parse(json);
	}

	public static iRestaurantRatingToJson(value: IRestaurantRating): string {
		return JSON.stringify(value);
	}
}


export class ReviewModel {
	constructor(
		public id: string,
		public body: string,
		public rating: number
	) {

	}
}
