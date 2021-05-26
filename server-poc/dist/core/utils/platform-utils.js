"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformUtils = void 0;
class PlatformUtils {
    static platformIsWin() {
        return process.platform === "win32";
    }
}
exports.PlatformUtils = PlatformUtils;
