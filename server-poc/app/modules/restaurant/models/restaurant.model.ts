/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { SocialMediaModel } from "./social-media.model";
import { InfoModel }        from "./info.model";
import { LocationModel }    from "./location.model";
import { OpenHoursModel }   from "./open-hours.model";

/**
 * Class that wraps all restaurant modules
 */
export class RestaurantModel {
	public info: InfoModel;
	public openHours: OpenHoursModel;
	public location: LocationModel;
	public socialMedia?: SocialMediaModel;

	constructor() {
		this.info        = new InfoModel();
		this.openHours   = new OpenHoursModel();
		this.location    = new LocationModel();
		this.socialMedia = new SocialMediaModel();
	}
}
