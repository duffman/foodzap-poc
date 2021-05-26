"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkingHub = void 0;
const { v4: uuidV4 } = require('uuid');
const inversify_1 = require("inversify");
const server_message_types_1 = require("@core/messaging/server-message-types");
const cli_logger_1 = require("@cli/cli.logger");
let NetworkingHub = class NetworkingHub {
    constructor(connectionHub, messageHub) {
        this.connectionHub = connectionHub;
        this.messageHub = messageHub;
        cli_logger_1.Logger.logPurple("NetworkHub ** Constructor");
        /*/return;

        let protocolHandlers: Array<INetworkConnector> = kernel.getAllTagged<INetworkConnector>("INetworkConnector",
            ModuleTag.Handler, ModuleTag.ProtocolManager
        );

        // TODO: THE NETWORK CONNECTORS SHOULD BE MOVED AWAY FROM DEPENDENCY INJECTION
        // Assign handlers
        for (let i = 0; i < protocolHandlers.length; i++) {
            let handler = protocolHandlers[i];

            handler.onNewConnection((connection: IConnection) => {
                scope.onNewConnection(handler.field, connection);
            });

            handler.onData((connection: IConnection, utils: any) => {
                scope.onData(connection, utils);
            });

            handler.onConnectionClosed((connection: IConnection, id: number, reason: string) => {
                scope.onConnectionClosed(connection, id, reason);
            });

            handler.onError((connection: IConnection, error: Error) => {
                scope.onError(connection, error);
            });
        }
        */
    }
    assignConnector(connector) {
        connector.onNewConnection((connection) => {
            this.onNewConnection(connector.name, connection);
        });
        connector.onData((connection, data) => {
            this.onData(connection, data);
        });
        connector.onConnectionClosed((connection, code, reason) => {
            this.onConnectionClosed(connection, code, reason);
        });
        connector.onError((connection, error) => {
            this.onError(connection, error);
        });
    }
    sendHello(connection) {
        var dataObject = {
            "type": server_message_types_1.ServerMessageTypes.Event.msgHello,
            "data": {
                "id": connection.socket.id,
                "session": connection.sessionId,
                "minMajorVersion": 1,
                "serverVersion": "Ignition1"
            },
            "serverTime": Date.now
        };
        connection.socket.emit("message", JSON.stringify(dataObject));
    }
    onNewConnection(name, connection) {
        console.log(name + " :: new IConnection #", connection.socket.id);
        connection.sessionId = uuidV4();
        this.connectionHub.registerConnection(connection);
        this.sendHello(connection);
    }
    onData(connection, dataObject) {
        this.messageHub.addMessage(connection, dataObject);
    }
    onConnectionClosed(connection, code, reason) {
        cli_logger_1.Logger.logBlue(`${connection.connectionId} :: Connection Closed`);
    }
    onError(connection, error) {
        cli_logger_1.Logger.logYellow(`${connection.connectionId} :: Connection Error:`, error);
    }
};
NetworkingHub = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IConnectionHub")),
    __param(1, inversify_1.inject("IMessageHub")),
    __metadata("design:paramtypes", [Object, Object])
], NetworkingHub);
exports.NetworkingHub = NetworkingHub;
