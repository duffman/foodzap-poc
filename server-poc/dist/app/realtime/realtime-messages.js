"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-19
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeMessage = void 0;
class RealtimeMessage {
    constructor(ident = '', message) {
        this.ident = ident;
        this.message = message;
    }
}
exports.RealtimeMessage = RealtimeMessage;
