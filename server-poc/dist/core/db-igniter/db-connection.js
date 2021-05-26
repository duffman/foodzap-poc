"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = exports.ConnectionState = void 0;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState["Connected"] = "connected";
    ConnectionState["Authenticated"] = "authenticated";
    ConnectionState["Disconnected"] = "disconnected";
    ConnectionState["ProtocolError"] = "protocol_error";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
class DbConnection {
    constructor() {
    }
}
exports.DbConnection = DbConnection;
