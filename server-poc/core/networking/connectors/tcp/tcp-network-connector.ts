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

import { injectable }             from "inversify";
import * as net                   from "net";
const { v4: uuidV4 } = require('uuid');
import { IConnection }            from '@core/networking/connection';
import { TcpConnection }          from '@core/networking/connectors/tcp/tcp-connection';
import { TcpSocketCore }          from '@core/networking/connectors/tcp/tcp-socket-core';
import { Logger }                 from '@cli/cli.logger';
import { SocketEvents }           from '@core/networking/connectors/network-connector';
import { EventEmitter }	          from 'events';
import { INetworkConnector }      from "@networking/network-connector";

@injectable()
export class TCPNetworkConnector implements INetworkConnector {
	name: string;
	private server: net.Server;
	private port: number = 5678;
	private host: string = "localhost";
	private eventEmitter: EventEmitter;

	constructor() {
		this.name = "TCPConnector";

		let scope = this;
		this.eventEmitter = new EventEmitter();

		this.server = net.createServer((socket: net.Socket) => {
			scope.handleConnection(socket);
		});

		this.server.listen(this.port, this.host, () => {
			Logger.logCoreInfo(this, "TCPNetworkConnector :: Listen: " + this.host + ":" + this.port);
		});
	}

	handleConnection(socket: net.Socket) {
		let scope = this;
		let uniqueId = uuidV4;

		let socketCore = new TcpSocketCore(socket, uniqueId);
		let connection: IConnection = new TcpConnection(socketCore);

		let EADDRINUSE = "";

		socket.on("error", (err: any) => {
			if (err.code == "EADDRINUSE") {
				Logger.logError(this.name, 'Address in use, retrying...');

			} else {
				scope.eventEmitter.emit(SocketEvents.error, connection, null);
			}
		});

		//
		// On Data
		//
		socket.on("data", (data) => {
			let message = data.toString();
			Logger.logCoreInfo(this, "TCP::", message);
			this.doOnData(connection, message);
		});

		//
		// Triggered when this client disconnects
		//
		socket.on("end", () => {
			Logger.logCoreInfo(this, `${connection.connectionId} disconnected.`);
			scope.eventEmitter.emit(SocketEvents.closed, connection, null);

		});

		this.eventEmitter.emit(SocketEvents.newConnection, connection);
	}

	private bindServerEvents(server: net.Server) {
		let scope = this;
	}

	protected doOnData(connection: IConnection, dataObject: any) {
		this.eventEmitter.emit(SocketEvents.dataAvailable, connection, dataObject);
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
