"use strict";
/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
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
exports.RealtimeServer = void 0;
const realtime_const_1 = require("@app/realtime/realtime-const");
const cli_logger_1 = require("@cli/cli.logger");
const inversify_1 = require("inversify");
const realtime_event_1 = require("./realtime-event");
const cors = require("cors");
const express = require("express");
const http_1 = require("http");
const SocketIO = require("socket.io");
let RealtimeServer = class RealtimeServer {
    constructor() {
        this.webApp = express();
        this.port = process.env.PORT || realtime_const_1.RealtimeConst.ServerPort;
        this.webApp.use(cors());
        this.webApp.options('*', cors());
        this.server = http_1.createServer(this.webApp);
        this.initSocket();
        this.listen();
        cli_logger_1.Logger.logCyan("/////////////////////////////////");
        cli_logger_1.Logger.logCyan("// Rrealtime Server - Starting");
        cli_logger_1.Logger.logCyan("/////////////////////////////////");
    }
    initSocket() {
        this.io = SocketIO(this.server);
    }
    listen() {
        cli_logger_1.Logger.logCyan("// Listen on port ::", this.port);
        this.server.listen(this.port, () => {
            cli_logger_1.Logger.log('Running server on port %s', this.port);
        });
        this.io.on(realtime_event_1.RealtimeEvent.CONNECT, (socket) => {
            cli_logger_1.Logger.log('Connected client on port %s.', this.port);
            socket.on(realtime_event_1.RealtimeEvent.MESSAGE, (m) => {
                cli_logger_1.Logger.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on(realtime_event_1.RealtimeEvent.DISCONNECT, () => {
                cli_logger_1.Logger.log('Client disconnected');
            });
        });
    }
    close() {
        this.io.close(() => {
            cli_logger_1.Logger.logCyan("Realtime Server Closed");
        });
    }
    getApp() {
        return this.webApp;
    }
    sayHello() {
        cli_logger_1.Logger.logCyan('Realtime Server SayHello!');
        let message = {
            "allGod": "pint"
        };
        this.io.emit('message', JSON.stringify(message));
    }
};
RealtimeServer = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], RealtimeServer);
exports.RealtimeServer = RealtimeServer;
