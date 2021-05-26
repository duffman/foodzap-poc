/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export class Timestamp {
	/**
	 * Return current UNIX
	 * @returns {number}
	 */
	public static UNIX(): number {
		return Math.round((new Date()).getTime() / 1000);
	}
}
