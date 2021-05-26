"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionHub = exports.HubConnectionResult = void 0;
const inversify_1 = require("inversify");
var HubConnectionResult;
(function (HubConnectionResult) {
    HubConnectionResult[HubConnectionResult["ConnectionRegistered"] = 0] = "ConnectionRegistered";
    HubConnectionResult[HubConnectionResult["ConnectionPending"] = 1] = "ConnectionPending";
    HubConnectionResult[HubConnectionResult["NoSlotsAvailable"] = 2] = "NoSlotsAvailable";
})(HubConnectionResult = exports.HubConnectionResult || (exports.HubConnectionResult = {}));
let ConnectionHub = class ConnectionHub {
    constructor(hubCapacity = -1) {
        this.hubCapacity = hubCapacity;
        this.connections = Array();
    }
    /**
     * Returns a connection from a given socket id
     * @param socketId
     * @returns {any}
     */
    getConnectionById(socketId) {
        return this.connections[socketId];
    }
    /**
     * Registers a new connection in the connection hub
     * @param connection
     * @returns {HubConnectionResult}
     */
    registerConnection(connection) {
        const NEW_COUNT = this.connections.length + 1;
        const MAX_REACHED = (NEW_COUNT > this.hubCapacity) && this.hubCapacity > -1;
        let registerResult = HubConnectionResult.ConnectionPending;
        if (MAX_REACHED) {
            registerResult = HubConnectionResult.NoSlotsAvailable;
        }
        else {
            this.connections[connection.socketId] = connection;
            registerResult = HubConnectionResult.ConnectionRegistered;
        }
        return registerResult;
    }
    /**
     * Closes a given connection
     * @param connection
     */
    terminateConnection(connection) {
        connection.socket.close();
    }
    /**
     * Returns a UwsSocket object from a given socket id
     * @param socketId
     * @returns {Socket}
     */
    getSocketById(socketId) {
        let connection = this.getConnectionById(socketId);
        return connection.socket;
    }
    /**
     * Returns the connection assosicted with a given socket
     * @param socket
     * @returns {any}
     */
    getConnection(socket) {
        return this.connections[socket.id];
    }
};
ConnectionHub = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Number])
], ConnectionHub);
exports.ConnectionHub = ConnectionHub;
