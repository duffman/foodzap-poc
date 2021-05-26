/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { BrandingModel } from "./branding.model";

export class InfoModel {
	public id             : number;
	public customerId?    : number;
	public qrCode         : string;
	public name           : string;
	public description    : string;
	public homeDelivery?  : number;
	public websiteUrl     : string;
	public phoneNr        : string;
	public coverImage?    : string;
	public logoImage?     : string;
	public openHoursId    : number;
	public geoLocation    : string;

	public branding    : BrandingModel;

	constructor() {
		this.branding = new BrandingModel();
	}
}
