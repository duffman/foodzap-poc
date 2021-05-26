"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, name, password, customerId) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.customerId = customerId;
    }
}
exports.User = User;
