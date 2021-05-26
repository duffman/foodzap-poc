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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHub = exports.SessionEntry = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const message_emitter_1 = require("@core/messaging/message-emitter");
const connection_hub_1 = require("@core/networking/connection-hub");
const inversify_1 = require("inversify");
const Collections = require("typescript-collections");
class SessionEntry {
    constructor(connection, userSession) {
        this.connection = connection;
        this.userSession = userSession;
    }
}
exports.SessionEntry = SessionEntry;
let ServiceHub = class ServiceHub {
    constructor(connHub, messageEmitter) {
        this.connHub = connHub;
        this.messageEmitter = messageEmitter;
        this.sessions = Array();
        this.userSessions = new Collections.Dictionary();
        this.userSessions = new Collections.Dictionary();
    }
    getSessionEntry(message) {
        let session = null;
        let id = message.connection.socketId;
        let i = 0;
        while (i < this.sessions.length) {
            let tmpSession = this.sessions[i];
            let tmpConnId = tmpSession.connection.socketId;
            if (id == tmpConnId) {
                session = tmpSession;
                break;
            }
            i++;
        }
        return session;
    }
    sessionExists(message) {
        return (this.getSessionEntry(message) != null);
    }
    /**
     * //TODO Implement...
     * @param data
     */
    broadcast(data) {
        for (let i = 0; i < this.sessions.length; i++) {
            let session = this.sessions[i];
        }
    }
    /**
     * Retrieves the current player id from the hub, if
     * @param message
     * @param required - if set the connection will terminate if no user id is found
     * @returns {number}
     */
    getUserId(message, required = true) {
        let scope = this;
        let userId = -1;
        let sessionEntry = this.getSessionEntry(message);
        if (sessionEntry != null) {
            userId = sessionEntry.userSession.userId;
        }
        if (required && userId == -1) {
            message.actionResult(false, "ID Missing");
            setTimeout(() => {
                scope.connHub.terminateConnection(message.connection);
                return -1;
            }, 500);
        }
        return userId;
    }
    /**
     * Returns a session by a given user id
     * @param - userId
     * @returns - user session
     */
    getSessionByUid(userId) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.sessions.length; i++) {
                let session = this.sessions[i];
                if (session.userSession.userId === userId) {
                    resolve(session);
                    break;
                }
            }
            resolve(null);
        });
    }
    /**
     * Checks if given userId exits
     * @param userId
     * @returns {number}
     */
    haveUserSession(userId) {
        return false;
    }
    //TODO Change to promise
    /*/TODO: Report if the session already exist?
     public addSession(message: SocketMessage, utils: IServiceSession): Promise<boolean> {
     let scope = this;

     return new Promise((resolve, reject) => {
     let validPlayerId = Number(utils.userId) === NaN;
     if (!validPlayerId) {
     userId
     }
     });
     }
     */
    /**
     * Registers a new session
     * @param message
     * @param data
     */
    registerSession(message, data) {
        cli_logger_1.Logger.logDebug("Register Session: ", data);
        if (this.sessionExists(message)) {
            return;
        }
        let entry = new SessionEntry(message.connection, data);
        this.sessions.push(entry);
    }
    /**
     * Clears all player sessions
     */
    clearHub() {
        this.sessions.length = 0;
    }
};
ServiceHub = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IConnectionHub")),
    __param(1, inversify_1.inject("IMessageEmitter")),
    __metadata("design:paramtypes", [connection_hub_1.ConnectionHub,
        message_emitter_1.MessageEmitter])
], ServiceHub);
exports.ServiceHub = ServiceHub;
