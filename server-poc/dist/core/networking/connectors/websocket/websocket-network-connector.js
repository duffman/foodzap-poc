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
exports.WebsocketNetworkConnector = void 0;
const inversify_1 = require("inversify");
const { v4: uuidV4 } = require('uuid');
const WebSocket = require("ws");
const network_connector_1 = require("../network-connector");
const events_1 = require("events");
const cli_logger_1 = require("@cli/cli.logger");
const websocket_core_1 = require("@core/networking/connectors/websocket/websocket-core");
const websocket_connection_1 = require("./websocket-connection");
let WebsocketNetworkConnector = class WebsocketNetworkConnector {
    constructor() {
        this.name = "WebSocket";
        this.eventEmitter = new events_1.EventEmitter();
        const webSocketPort = 6060;
        this.wss = new WebSocket.Server({ port: webSocketPort });
        cli_logger_1.Logger.logPurple("* WebSocketProtocolManager Constructor", webSocketPort);
        let scope = this;
        this.wss.on('connection', (ws, req) => {
            const ip = req.connection.remoteAddress;
            cli_logger_1.Logger.logPurple("* New IConnection with IP: " + ip);
            scope.handleNewConnection(ws);
        });
    }
    handleNewConnection(ws) {
        let scope = this;
        //
        //
        // Since the WS library lacks any obvious functionality
        // for unique IDs, we generate our own (these are just for the
        // current session, so it´s alright :)
        //
        const { v4: uuidV4 } = require('uuid');
        let socketCore = new websocket_core_1.WebSocketCore(ws, uuidV4());
        let connection = new websocket_connection_1.WebSocketConnection(socketCore);
        ws.on('message', function (message) {
            console.log("MESSAGE RECEIVED:", message);
            scope.handleMessage(connection, message);
        });
        this.eventEmitter.emit(network_connector_1.SocketEvents.newConnection, connection);
    }
    handleMessage(connection, message) {
        console.log('New Message SOCKET WS: %s', message);
        try {
            let dataObject = JSON.parse(message);
            this.eventEmitter.emit(network_connector_1.SocketEvents.dataAvailable, connection, dataObject);
        }
        catch (exception) {
            console.log("Exception utils", message);
            console.log("Post message failed:", exception);
        }
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
WebsocketNetworkConnector = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], WebsocketNetworkConnector);
exports.WebsocketNetworkConnector = WebsocketNetworkConnector;
