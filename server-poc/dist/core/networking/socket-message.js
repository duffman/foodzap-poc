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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketMessage = void 0;
const action_message_1 = require("@core/messaging/action-message");
const message_envelope_1 = require("@core/messaging/message-envelope");
const server_message_types_1 = require("@core/messaging/server-message-types");
class SocketMessage {
    constructor(connection, type, data = null) {
        this.messageTag = null;
        this.connection = connection;
        this.timestamp = new Date();
        this.messageType = type;
        this.messageData = data.data;
    }
    /**
     * Sends an ActionResult message with a success flag
     * @param success
     */
    actionResult(success, errorMessage = "") {
        let messageData = new action_message_1.ActionMessage(success, errorMessage);
        let envelope = new message_envelope_1.MessageEnvelope(this.messageType, messageData, this.messageTag);
        this.reply(envelope);
    }
    reply(messageData) {
        let socket = this.connection.socket;
        messageData.tag = this.messageTag;
        socket.emit(server_message_types_1.ServerMessageTypes.Socket.message, JSON.stringify(messageData));
    }
    replyWithMessage(messageData) {
        let socket = this.connection.socket;
        let envelope = new message_envelope_1.MessageEnvelope(this.messageType, messageData, this.messageTag);
        socket.emit(server_message_types_1.ServerMessageTypes.Socket.message, JSON.stringify(envelope));
    }
    replyWithEnvelope(messageType, messageData) {
        let envelope = new message_envelope_1.MessageEnvelope(messageType, messageData);
        this.reply(envelope);
    }
    replyWithEnvelopeData(messageData) {
        this.replyWithEnvelope(this.messageType, messageData);
    }
}
exports.SocketMessage = SocketMessage;
