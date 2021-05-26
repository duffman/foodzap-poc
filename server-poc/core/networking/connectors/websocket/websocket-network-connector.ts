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

import { injectable }                      from "inversify";
const { v4: uuidV4 }                      = require('uuid');
import * as WebSocket                      from "ws";
import { SocketEvents }                    from '../network-connector';
import { EventEmitter }	                   from 'events';
import { Logger }                          from '@cli/cli.logger';
import { IConnection }                     from '@core/networking/connection';
import { WebSocketCore }                   from '@core/networking/connectors/websocket/websocket-core';
import { WebSocketConnection }             from './websocket-connection';
import { INetworkConnector }               from '@networking/network-connector';

@injectable()
export class WebsocketNetworkConnector implements INetworkConnector {
	public name: string = "WebSocket";
	private wss: any;
	private eventEmitter: any;

	constructor() {
		this.eventEmitter = new EventEmitter();
		const webSocketPort = 6060;
		this.wss = new WebSocket.Server({ port: webSocketPort });

		Logger.logPurple("* WebSocketProtocolManager Constructor", webSocketPort);

		let scope = this;

		this.wss.on('connection', (ws, req) => {
			const ip = req.connection.remoteAddress;
			Logger.logPurple("* New IConnection with IP: " + ip);
			scope.handleNewConnection(ws);
		});
	}

	private handleNewConnection(ws: WebSocket) {
		let scope = this;

		//
		//
		// Since the WS library lacks any obvious functionality
		// for unique IDs, we generate our own (these are just for the
		// current session, so it´s alright :)
		//
		const { v4: uuidV4 } = require('uuid');

		let socketCore = new WebSocketCore(ws, uuidV4());
		let connection: IConnection = new WebSocketConnection(socketCore);

		ws.on('message', function(message) {
			console.log("MESSAGE RECEIVED:", message);
			scope.handleMessage(connection, message);
		});

		this.eventEmitter.emit(SocketEvents.newConnection, connection);
	}

	handleMessage(connection: IConnection, message: any) {
		console.log('New Message SOCKET WS: %s', message);

		try {
			let dataObject = JSON.parse(message);
			this.eventEmitter.emit(SocketEvents.dataAvailable, connection, dataObject);

		} catch(exception) {
			console.log("Exception utils", message);
			console.log("Post message failed:", exception);
		}
	}

	public onNewConnection(listener: any) {
		this.eventEmitter.addListener(SocketEvents.newConnection, listener);
	}

	public onConnectionClosed(listener: any) {
		this.eventEmitter.addListener(SocketEvents.closed, listener);
	}

	public onData(listener: any) {
		this.eventEmitter.addListener(SocketEvents.dataAvailable, listener);
	}

	public onError(listener: any) {
		this.eventEmitter.addListener(SocketEvents.error, listener);
	}
}
