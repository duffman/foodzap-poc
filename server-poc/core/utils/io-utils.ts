/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */

import { PlatformUtils } from '@core/utils/platform-utils';
import * as fs           from "fs";

export class IoUtils {
	/**
	 * Splits whole path into segments and checks each segment for existence and recreates directory tree from the bottom.
	 * If since some segment tree doesn't exist it will be created in series.
	 * Existing directories will be skipped.
	 * @param {String} directory
	 */
	public static mkdirSyncRecursive(directory) {
		let path = directory.replace(/\/$/, '').split('/');

		for (let i = 1; i <= path.length; i++) {
			let segment = path.slice(0, i).join('/');
			!fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
		}
	}

	/**
	 * Ensures that a given string ends with a platform specific
	 * path delimiter
	 * @param value - input string
	 */
	public static ensureTrailingPathDelimiter(value : string) : string {
		const pathDelimiter = PlatformUtils.platformIsWin() ? '\\' : '/';
		if (value.endsWith(pathDelimiter) === false) {
			value = value + pathDelimiter;
		}
		return value;
	}
}
