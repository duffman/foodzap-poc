"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynNodeLink = void 0;
class ZynNodeLink {
    constructor(node = null, name, outbound = true, metaData = null) {
        this.node = node;
        this.name = name;
        this.outbound = outbound;
        this.metaData = metaData;
    }
}
exports.ZynNodeLink = ZynNodeLink;
