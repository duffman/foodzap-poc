"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-09-08
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBCrypt = void 0;
const bcrypt = require("bcrypt");
class AuthBCrypt {
    constructor() {
        this.debugMode = false;
        this.saltRounds = 10;
    }
    log(...data) {
        if (this.debugMode) {
            console.log(data);
        }
    }
    /**
     * Simple singleton implementation, added to provide a shortcut
     * during brute-force development, not in live production.
     * @returns {AuthApi}
     */
    static instance() {
        if (!AuthBCrypt._instance) {
            AuthBCrypt._instance = new AuthBCrypt();
        }
        return AuthBCrypt._instance;
    }
    setDebugMode(value = true) {
        this.debugMode = value;
    }
    /**
     * Generate bcrypt hash from a plaintext password
     * @param {string} inputPass
     * @param {number} saltRounds
     * @returns {Promise<string>}
     */
    genPassCrypt(plainPassword) {
        return new Promise((resolve, reject) => {
            this.log(`Generating password from "${plainPassword}"`);
            bcrypt.hash(plainPassword, this.saltRounds).then((value) => {
                this.log(`Resulting password hash "${value}"`);
                resolve(value);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /**
     * Compare a given plaintext password with a pre generated bcrypt hash
     * @param {string} plainPassword
     * @param {string} passwordHash
     * @returns {Promise<boolean>}
     */
    compare(plainPassword, passwordHash) {
        return new Promise((resolve) => {
            this.log(`Comparing "${plainPassword}" with "${passwordHash}"`);
            bcrypt.compare(plainPassword, passwordHash).then((success) => {
                this.log(`Comparison result "${success}"`);
                resolve(success);
            });
        });
    }
}
exports.AuthBCrypt = AuthBCrypt;
