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

let express = require("express");
let app     = express();
let http    = require("http").Server(app);
let io      = require("socket.io")(http);

import { LogService }        from "@app/services/log.service";
import { Logger }            from "@cli/cli.logger";
import { Inf }               from "@core/interfaces";
import { VarUtils }          from "@core/utils/var/var-utils";
import { IConnection }       from "@networking/connection";
import { INetworkConnector } from "@networking/network-connector";
import { Global }            from "@root/global.settings";
import { EventEmitter }      from 'events';
import { inject }            from "inversify";
import { injectable }        from "inversify";

const SOCKET_IO_MESSAGE    = "message";
const SOCKET_IO_CONNECTION = "connection";

@injectable()
export class RealtimeNetworkConnector implements INetworkConnector {
	public name: string = "SocketIO";
	private eventEmitter: any;

	constructor(
		@inject(Inf.ILogService) private logger: LogService
	) {
		let scope         = this;
		this.eventEmitter = new EventEmitter();

		Logger.logPurple("* SocketIOProtocolHandler Constructor");

		let webRootCore = process.cwd() + "/www/core";
		let webRoot     = process.cwd() + "/www/";

		app.use(express.static(webRoot));
		app.use(express.static(webRootCore));

		app.get('/', function (req, res) {
			res.sendFile(process.cwd() + '/www/index.html');
		});

		http.listen(Global.Networking.socketIOPort, function () {
			Logger.logCoreInfo(this, `ColdmindServerCore is Listening on:  ${Global.Networking.socketIOPort}`);
		});

		io.on(SOCKET_IO_CONNECTION, function (socket: any) {
			scope.handleConnection(socket);
		});
	}

	private handleConnection(socket: any) {
		let scope = this;

		//let ioSocket                = new SocketIOSocket(socket);
		//let connection: IConnection = new SocketIOConnection(ioSocket);

		socket.on(SOCKET_IO_MESSAGE, function (data) {
			//	scope.handleMessage(connection, data);
		});

		//this.eventEmitter.emit(Global.SocketEvents.newConnection, connection);
	}

	private handleMessage(connection: IConnection, message: any, parseJson: boolean = true) {
		try {
			let dataObject = message;
			if (parseJson) {
				dataObject = JSON.parse(dataObject);
			}

			if (!VarUtils.isNullOrUndefined(dataObject.tag)) {
				Logger.logCyan("handleMessage :: dataObject.tag :: IS NULL")
			}

			this.eventEmitter.emit(Global.SocketEvents.dataAvailable, connection, dataObject);

		}
		catch (exception) {
			Logger.log("Exception data", message);
			Logger.log("Post message failed:", exception);
		}
	}

	public onNewConnection(listener: any) {
		this.eventEmitter.addListener(Global.SocketEvents.newConnection, listener);
	}

	public onConnectionClosed(listener: any) {
		this.eventEmitter.addListener(Global.SocketEvents.closed, listener);
	}

	public onData(listener: any) {
		this.eventEmitter.addListener(Global.SocketEvents.dataAvailable, listener);
	}

	public onError(listener: any) {
		this.eventEmitter.addListener(Global.SocketEvents.error, listener);
	}
}
