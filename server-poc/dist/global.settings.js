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
exports.Global = void 0;
/**
 * IMPORTANT NOTE: This file is property of Coldmind Ltd 2008 - 2017
 */
var Global;
(function (Global) {
    let DebugReportingLevel;
    (function (DebugReportingLevel) {
        DebugReportingLevel[DebugReportingLevel["None"] = 0] = "None";
        DebugReportingLevel[DebugReportingLevel["Low"] = 1] = "Low";
        DebugReportingLevel[DebugReportingLevel["Medium"] = 2] = "Medium";
        DebugReportingLevel[DebugReportingLevel["High"] = 3] = "High";
    })(DebugReportingLevel = Global.DebugReportingLevel || (Global.DebugReportingLevel = {}));
    let Debug;
    (function (Debug) {
        Debug.DebugLevel = DebugReportingLevel.Low;
        function Verbose() {
            return this.DebugLevel == DebugReportingLevel.High;
        }
        Debug.Verbose = Verbose;
    })(Debug = Global.Debug || (Global.Debug = {}));
    let Networking;
    (function (Networking) {
        //export const webServerPort             = 80;
        //export const socketIOPort              = process.env.PORT || 5000;
        Networking.socketIOPort = 9090;
        Networking.webSocketPort = 6060;
        Networking.tcpPort = 1681;
        Networking.adminPort = 3000;
    })(Networking = Global.Networking || (Global.Networking = {}));
    let SocketEvents;
    (function (SocketEvents) {
        SocketEvents.newConnection = 'newConnection';
        SocketEvents.dataAvailable = 'dataAvailable';
        SocketEvents.error = 'error';
        SocketEvents.closed = 'closed';
    })(SocketEvents = Global.SocketEvents || (Global.SocketEvents = {}));
    /**
     *	The current state of the application
     */
    let AppState;
    (function (AppState) {
        AppState[AppState["Idle"] = 0] = "Idle";
        AppState[AppState["Loading"] = 1] = "Loading";
        AppState[AppState["Ready"] = 2] = "Ready";
        AppState[AppState["Error"] = 3] = "Error";
    })(AppState = Global.AppState || (Global.AppState = {}));
    let Core;
    (function (Core) {
        Core.SERVER_VERSION = 'Backend Igniter 1.3.5-DEV';
        Core.CUSTOMER_BRANCH = 'VIOLA - Clear Vision 0.9.2 - Eldring AB';
    })(Core = Global.Core || (Global.Core = {}));
    /**
     *	Public ServerService Settings
     */
    let Settings;
    (function (Settings) {
        Settings.publicWebDirectory = "core";
        Settings.appDirectory = "app";
        Settings.defaultConfigFilename = "viola.config.json";
        Settings.debug = true;
        Settings.terminateOnError = false;
        let SQLDatabase_Test;
        (function (SQLDatabase_Test) {
            SQLDatabase_Test.dbName = "clear_vision2";
            SQLDatabase_Test.dbHost = "localhost";
            SQLDatabase_Test.dbUser = "duffman";
            SQLDatabase_Test.dbPass = "bjoe7151212";
        })(SQLDatabase_Test = Settings.SQLDatabase_Test || (Settings.SQLDatabase_Test = {}));
        let SQLDatabase;
        (function (SQLDatabase) {
            SQLDatabase.dbName = "clear_vision";
            SQLDatabase.dbHost = "localhost";
            SQLDatabase.dbPort = 3306;
            SQLDatabase.dbUser = "duffman";
            SQLDatabase.dbPass = "bjoe7151212";
            SQLDatabase.useTransactions = false;
        })(SQLDatabase = Settings.SQLDatabase || (Settings.SQLDatabase = {}));
    })(Settings = Global.Settings || (Global.Settings = {}));
    let ServerMode;
    (function (ServerMode) {
        ServerMode[ServerMode["Debug"] = 0] = "Debug";
        ServerMode[ServerMode["Test"] = 1] = "Test";
        ServerMode[ServerMode["Production"] = 2] = "Production";
    })(ServerMode = Global.ServerMode || (Global.ServerMode = {}));
    Global.Mode = ServerMode.Debug;
    Global.DebugMode = (Global.Mode == ServerMode.Debug);
})(Global = exports.Global || (exports.Global = {}));
