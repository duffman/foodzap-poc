/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

export class LocationModel {
	id:                 number;
	restaurantId:       number;
	public latitude:    string;
	public longitude:   string;

	public address:     string;
	public zipCode:     string;
	public countryCode: string;

	constructor() {
	}
}
