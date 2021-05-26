"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
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
var SocketIONetworkConnector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIONetworkConnector = void 0;
const inversify_1 = require("inversify");
const http_1 = require("http");
const events_1 = require("events");
const express = require("express");
const socketIo = require("socket.io");
const network_connector_1 = require("@networking/connectors/network-connector");
const socket_io_connection_1 = require("@networking/connectors/socket.io/socket.io-connection");
const socket_io_socket_1 = require("@networking/connectors/socket.io/socket.io-socket");
const cli_logger_1 = require("@cli/cli.logger");
const SOCKET_IO_MESSAGE = "msg";
const SOCKET_IO_CONNECTION = "connection";
let SocketIONetworkConnector = SocketIONetworkConnector_1 = class SocketIONetworkConnector {
    constructor() {
        this.name = "SocketIO";
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.eventEmitter = new events_1.EventEmitter();
        this.port = SocketIONetworkConnector_1.PORT;
        //this.port = process.env.PORT;
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('msg', (m) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    handleConnection(socket) {
        let ioSocket = new socket_io_socket_1.SocketIoSocket(socket);
        let connection = new socket_io_connection_1.SocketIoConnection(ioSocket);
        socket.on(SOCKET_IO_MESSAGE, (data) => {
            this.handleMessage(connection, data);
        });
        this.eventEmitter.emit(network_connector_1.SocketEvents.newConnection, connection);
    }
    handleMessage(connection, message, parseJson = true) {
        try {
            cli_logger_1.Logger.logCyan('******** RECEIVE ****');
            cli_logger_1.Logger.logCyan('Data ::', message);
            cli_logger_1.Logger.logCyan('*********************');
            let dataObject;
            if (parseJson) {
                dataObject = JSON.parse(message);
            }
            if (dataObject.tag !== undefined && dataObject.tag !== undefined) {
            }
            this.eventEmitter.emit(network_connector_1.SocketEvents.dataAvailable, connection, dataObject);
        }
        catch (exception) {
            cli_logger_1.Logger.logGreen("Exception utils", message);
            cli_logger_1.Logger.logGreen("Post message failed:", exception);
        }
    }
    getApp() {
        return this.app;
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
SocketIONetworkConnector.PORT = 9095;
SocketIONetworkConnector = SocketIONetworkConnector_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SocketIONetworkConnector);
exports.SocketIONetworkConnector = SocketIONetworkConnector;
