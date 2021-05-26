"use strict";
/**
 * COLDMIND LTD ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2015-2017 COLDMIND LTD, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source id contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source id, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg on 2017
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
exports.TCPNetworkConnector = void 0;
const inversify_1 = require("inversify");
const net = require("net");
const { v4: uuidV4 } = require('uuid');
const tcp_connection_1 = require("@core/networking/connectors/tcp/tcp-connection");
const tcp_socket_core_1 = require("@core/networking/connectors/tcp/tcp-socket-core");
const cli_logger_1 = require("@cli/cli.logger");
const network_connector_1 = require("@core/networking/connectors/network-connector");
const events_1 = require("events");
let TCPNetworkConnector = class TCPNetworkConnector {
    constructor() {
        this.port = 5678;
        this.host = "localhost";
        this.name = "TCPConnector";
        let scope = this;
        this.eventEmitter = new events_1.EventEmitter();
        this.server = net.createServer((socket) => {
            scope.handleConnection(socket);
        });
        this.server.listen(this.port, this.host, () => {
            cli_logger_1.Logger.logCoreInfo(this, "TCPNetworkConnector :: Listen: " + this.host + ":" + this.port);
        });
    }
    handleConnection(socket) {
        let scope = this;
        let uniqueId = uuidV4;
        let socketCore = new tcp_socket_core_1.TcpSocketCore(socket, uniqueId);
        let connection = new tcp_connection_1.TcpConnection(socketCore);
        let EADDRINUSE = "";
        socket.on("error", (err) => {
            if (err.code == "EADDRINUSE") {
                cli_logger_1.Logger.logError(this.name, 'Address in use, retrying...');
            }
            else {
                scope.eventEmitter.emit(network_connector_1.SocketEvents.error, connection, null);
            }
        });
        //
        // On Data
        //
        socket.on("data", (data) => {
            let message = data.toString();
            cli_logger_1.Logger.logCoreInfo(this, "TCP::", message);
            this.doOnData(connection, message);
        });
        //
        // Triggered when this client disconnects
        //
        socket.on("end", () => {
            cli_logger_1.Logger.logCoreInfo(this, `${connection.connectionId} disconnected.`);
            scope.eventEmitter.emit(network_connector_1.SocketEvents.closed, connection, null);
        });
        this.eventEmitter.emit(network_connector_1.SocketEvents.newConnection, connection);
    }
    bindServerEvents(server) {
        let scope = this;
    }
    doOnData(connection, dataObject) {
        this.eventEmitter.emit(network_connector_1.SocketEvents.dataAvailable, connection, dataObject);
    }
    onNewConnection(listener) {
        this.eventEmitter.addListener(network_connector_1.SocketEvents.newConnection, listener);
    }
    onConnectionClosed(listener) {
        this.eventEmitter.addListener(network_connector_1.SocketEvents.closed, listener);
    }
    onData(listener) {
        this.eventEmitter.addListener(network_connector_1.SocketEvents.dataAvailable, listener);
    }
    onError(listener) {
        this.eventEmitter.addListener(network_connector_1.SocketEvents.error, listener);
    }
};
TCPNetworkConnector = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], TCPNetworkConnector);
exports.TCPNetworkConnector = TCPNetworkConnector;
