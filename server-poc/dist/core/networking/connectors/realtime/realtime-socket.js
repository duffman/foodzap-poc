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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeSocket = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const global_settings_1 = require("../../../../global.settings");
class RealtimeSocket {
    constructor(socket) {
        this.socket = socket;
        this.id = socket.id;
    }
    emit(messageType, message) {
        console.log(" ");
        cli_logger_1.Logger.logGreen("********* Emitting Data ***");
        console.log(messageType, message);
        cli_logger_1.Logger.logGreen("***************************");
        return this.socket.emit(messageType, message);
    }
    close() {
        if (global_settings_1.Global.DebugMode) {
            cli_logger_1.Logger.logCoreInfo(this, "Socket Close");
        }
        this.socket.disconnect(true);
    }
}
exports.RealtimeSocket = RealtimeSocket;
