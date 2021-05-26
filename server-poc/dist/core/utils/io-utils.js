"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * November 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoUtils = void 0;
const platform_utils_1 = require("@core/utils/platform-utils");
const fs = require("fs");
class IoUtils {
    /**
     * Splits whole path into segments and checks each segment for existence and recreates directory tree from the bottom.
     * If since some segment tree doesn't exist it will be created in series.
     * Existing directories will be skipped.
     * @param {String} directory
     */
    static mkdirSyncRecursive(directory) {
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
    static ensureTrailingPathDelimiter(value) {
        const pathDelimiter = platform_utils_1.PlatformUtils.platformIsWin() ? '\\' : '/';
        if (value.endsWith(pathDelimiter) === false) {
            value = value + pathDelimiter;
        }
        return value;
    }
}
exports.IoUtils = IoUtils;
