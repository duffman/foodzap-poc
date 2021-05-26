/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-24
 */

export interface IFmCategory {
	id?:           number,
	menuId:        number;
	languageId:    number;
	name:          string;
	description:   string;
	footer:        string;
	weight:        number;
}

export class FmCategory implements IFmCategory {
	public id?:          number;
	public menuId:       number;
	public languageId:   number;
	public name:         string;
	public description:  string;
	public footer:       string;
	public weight:       number;
}
