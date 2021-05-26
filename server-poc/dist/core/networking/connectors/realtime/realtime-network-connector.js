"use strict";
/**
 * COLDMIND LTD ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2015-2017 COLDMIND LTD, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeNetworkConnector = void 0;
let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const log_service_1 = require("@app/services/log.service");
const cli_logger_1 = require("@cli/cli.logger");
const interfaces_1 = require("@core/interfaces");
const var_utils_1 = require("@core/utils/var/var-utils");
const global_settings_1 = require("@root/global.settings");
const events_1 = require("events");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const SOCKET_IO_MESSAGE = "message";
const SOCKET_IO_CONNECTION = "connection";
let RealtimeNetworkConnector = class RealtimeNetworkConnector {
    constructor(logger) {
        this.logger = logger;
        this.name = "SocketIO";
        let scope = this;
        this.eventEmitter = new events_1.EventEmitter();
        cli_logger_1.Logger.logPurple("* SocketIOProtocolHandler Constructor");
        let webRootCore = process.cwd() + "/www/core";
        let webRoot = process.cwd() + "/www/";
        app.use(express.static(webRoot));
        app.use(express.static(webRootCore));
        app.get('/', function (req, res) {
            res.sendFile(process.cwd() + '/www/index.html');
        });
        http.listen(global_settings_1.Global.Networking.socketIOPort, function () {
            cli_logger_1.Logger.logCoreInfo(this, `ColdmindServerCore is Listening on:  ${global_settings_1.Global.Networking.socketIOPort}`);
        });
        io.on(SOCKET_IO_CONNECTION, function (socket) {
            scope.handleConnection(socket);
        });
    }
    handleConnection(socket) {
        let scope = this;
        //let ioSocket                = new SocketIOSocket(socket);
        //let connection: IConnection = new SocketIOConnection(ioSocket);
        socket.on(SOCKET_IO_MESSAGE, function (data) {
            //	scope.handleMessage(connection, data);
        });
        //this.eventEmitter.emit(Global.SocketEvents.newConnection, connection);
    }
    handleMessage(connection, message, parseJson = true) {
        try {
            let dataObject = message;
            if (parseJson) {
                dataObject = JSON.parse(dataObject);
            }
            if (!var_utils_1.VarUtils.isNullOrUndefined(dataObject.tag)) {
                cli_logger_1.Logger.logCyan("handleMessage :: dataObject.tag :: IS NULL");
            }
            this.eventEmitter.emit(global_settings_1.Global.SocketEvents.dataAvailable, connection, dataObject);
        }
        catch (exception) {
            cli_logger_1.Logger.log("Exception data", message);
            cli_logger_1.Logger.log("Post message failed:", exception);
        }
    }
    onNewConnection(listener) {
        this.eventEmitter.addListener(global_settings_1.Global.SocketEvents.newConnection, listener);
    }
    onConnectionClosed(listener) {
        this.eventEmitter.addListener(global_settings_1.Global.SocketEvents.closed, listener);
    }
    onData(listener) {
        this.eventEmitter.addListener(global_settings_1.Global.SocketEvents.dataAvailable, listener);
    }
    onError(listener) {
        this.eventEmitter.addListener(global_settings_1.Global.SocketEvents.error, listener);
    }
};
RealtimeNetworkConnector = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.ILogService)),
    __metadata("design:paramtypes", [log_service_1.LogService])
], RealtimeNetworkConnector);
exports.RealtimeNetworkConnector = RealtimeNetworkConnector;
