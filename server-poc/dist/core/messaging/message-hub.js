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
exports.MessageHub = void 0;
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const message_envelope_1 = require("@core/messaging/message-envelope");
const server_message_types_1 = require("@core/messaging/server-message-types");
const socket_message_1 = require("@core/networking/socket-message");
const array_utils_1 = require("@core/utils/array/array-utils");
const data_utils_1 = require("@core/utils/data-utils");
let MessageHub = class MessageHub {
    constructor() {
        this.handlers = new Array();
    }
    registerHandler(handler) {
        try {
            cli_logger_1.Logger.logGreen("Registering Message Handler:", handler.constructor.name);
            if (this.handlers.lastIndexOf(handler) > -1) {
                console.log('Handler for "' + array_utils_1.ArrayUtils.ArrayToString(handler.messageSignature) + '"');
                return false;
            }
            cli_logger_1.Logger.logGreen("Registering Message Handler: step 1 ::", handler.name);
            this.handlers.push(handler);
            cli_logger_1.Logger.logGreen("Registering Message Handler: step 2 ::", handler.name);
            if (!handler.messageSignature || handler.messageSignature.length === 0) {
                cli_logger_1.Logger.logError("No Message Signatures for handler ::", handler.name);
            }
            else {
                cli_logger_1.Logger.logYellow("Handler for '" + array_utils_1.ArrayUtils.ArrayToString(handler.messageSignature) + "' added");
            }
        }
        catch (exception) {
            cli_logger_1.Logger.logErrorMessage("Error 106: failed to register message handler", exception);
        }
    }
    ///TODO: Implement
    unRegisterHandler(handler) {
    }
    /**
     * Tests a handler for the correct message signature
     * @param connection
     * @param handler
     * @param message
     */
    tryDeliverMessage(connection, handler, message) {
        let result = false;
        //Logger.logMega("******************* tryDeliverMessage::", handler.field, message);
        try {
            if (data_utils_1.DataUtils.isNullOrUndefined(handler) || data_utils_1.DataUtils.isNullOrUndefined(handler.messageSignature)) {
                cli_logger_1.Logger.logErrorMessage("EMPTY EXIT IN tryDeliverMessage");
                return;
            }
            if (handler.messageSignature.indexOf(message.type) > -1) {
                console.log("*** message.fieldType:", message.type);
                console.log("*** message:", message.data);
                cli_logger_1.Logger.logCyan("handler.requiresAuth", handler.requiresAuth);
                cli_logger_1.Logger.logCyan("connection.connectionId ", connection.connectionId);
                //TODO: Clean this up
                if (handler.requiresAuth && connection.connectionId == "") {
                    // TODO: FIX FIX FIX
                    let dataObject = {
                        "type": server_message_types_1.ServerMessageTypes.Error.msgMissingId,
                        "message": "IConnection id is missing"
                    };
                    connection.socket.emit("message", JSON.stringify(dataObject));
                    setTimeout(function () {
                        connection.closeConnection();
                    }, 1500);
                    return;
                }
                let socketMessage = new socket_message_1.SocketMessage(connection, message.type, message);
                // If a tag is present, attach that to the message, tags play an important part
                // in the C# SDK´s Promise Resolving
                if (!data_utils_1.DataUtils.isNullOrUndefined(message.tag)) {
                    socketMessage.messageTag = message.tag;
                }
                handler.handleMessage(socketMessage);
                result = true;
            }
        }
        catch (exception) {
            console.log("Exception in tryDeliverMessage", exception);
        }
        return result;
    }
    addMessage(connection, message) {
        cli_logger_1.Logger.logGreen("AddMessage", "socket id: " + connection.socketId);
        cli_logger_1.Logger.logGreen("         +", message);
        let deliverSuccess = false;
        for (let i = 0; i < this.handlers.length; i++) {
            let handler = this.handlers[i];
            if (!data_utils_1.DataUtils.isNullOrUndefined(handler)) {
                if (this.tryDeliverMessage(connection, handler, message)) {
                    deliverSuccess = true;
                }
            }
        }
        if (!deliverSuccess) {
            console.log("COULD NOT DELIVER MESSAGE");
        }
    }
    sendMessage(connection, messageType, messageData) {
        let envelope = new message_envelope_1.MessageEnvelope(messageType, messageData);
        connection.socket.emit("message", JSON.stringify(envelope));
    }
    broadcastMessage(messageType, messageData) {
        for (let handler of this.handlers) {
            if (!data_utils_1.DataUtils.isNullOrUndefined(handler)) {
                let message = new message_envelope_1.MessageEnvelope(messageType, messageData);
                return new Error("NOT IMPLEMENTED");
                /*
                if (this.tryDeliverMessage(connection, handler, message)) {
                    deliverSuccess = true;
                }*/
            }
        }
    }
};
MessageHub = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MessageHub);
exports.MessageHub = MessageHub;
