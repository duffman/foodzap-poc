/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

export class PlatformUtils {
	public static platformIsWin(): boolean {
		return process.platform === "win32";
	}
}
