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
import { kernel, ModuleTag } from "../../kernel.config";

const { v4: uuidV4 } = require('uuid');

import { injectable, inject }     from "inversify";
import { IMessageHub }            from '@core/messaging/message-hub';
import { INetworkConnector }      from '@core/networking/network-connector';
import { IConnectionHub }         from "@core/networking/connection-hub";
import { IConnection }            from "@core/networking/connection";
import { ServerMessageTypes }     from "@core/messaging/server-message-types";
import { Logger }                 from '@cli/cli.logger';

export interface INetworkHub {
	onNewConnection(name: string, connection: IConnection);
	onData(connection: IConnection, dataObject: any);
	onConnectionClosed(connection: IConnection, code: number, reason: string);
	onError(connection: IConnection, error: Error);
}

@injectable()
export class NetworkingHub implements INetworkHub {
	constructor(
		@inject("IConnectionHub") private connectionHub: IConnectionHub,
		@inject("IMessageHub") private messageHub: IMessageHub
	) {
		Logger.logPurple("NetworkHub ** Constructor");

		/*/return;

		let protocolHandlers: Array<INetworkConnector> = kernel.getAllTagged<INetworkConnector>("INetworkConnector",
			ModuleTag.Handler, ModuleTag.ProtocolManager
		);

		// TODO: THE NETWORK CONNECTORS SHOULD BE MOVED AWAY FROM DEPENDENCY INJECTION
		// Assign handlers
		for (let i = 0; i < protocolHandlers.length; i++) {
			let handler = protocolHandlers[i];

			handler.onNewConnection((connection: IConnection) => {
				scope.onNewConnection(handler.field, connection);
			});

			handler.onData((connection: IConnection, utils: any) => {
				scope.onData(connection, utils);
			});

			handler.onConnectionClosed((connection: IConnection, id: number, reason: string) => {
				scope.onConnectionClosed(connection, id, reason);
			});

			handler.onError((connection: IConnection, error: Error) => {
				scope.onError(connection, error);
			});
		}
		*/
	}

	public assignConnector(connector: INetworkConnector): void {
		connector.onNewConnection((connection: IConnection) => {
			this.onNewConnection(connector.name, connection);
		});

		connector.onData((connection: IConnection, data: any) => {
			this.onData(connection, data);
		});

		connector.onConnectionClosed((connection: IConnection, code: number, reason: string) => {
			this.onConnectionClosed(connection, code, reason);
		});

		connector.onError((connection: IConnection, error: Error) => {
			this.onError(connection, error);
		});
	}


	sendHello(connection: IConnection) {
		var dataObject = {
			"type" : ServerMessageTypes.Event.msgHello,
			"data": {
				"id": connection.socket.id,
				"session": connection.sessionId,
				"minMajorVersion": 1,
				"serverVersion": "Ignition1"
			},
			"serverTime": Date.now
		};

		connection.socket.emit("message", JSON.stringify(dataObject));
	}


	onNewConnection(name: string, connection: IConnection) {
		console.log(name + " :: new IConnection #", connection.socket.id);
		connection.sessionId = uuidV4();

		this.connectionHub.registerConnection(connection);
		this.sendHello(connection);
	}

	onData(connection: IConnection, dataObject: any) {
		this.messageHub.addMessage(connection, dataObject);
	}

	onConnectionClosed(connection: IConnection, code: number, reason: string) {
		Logger.logBlue(`${connection.connectionId} :: Connection Closed`);
	}

	onError(connection: IConnection, error: Error) {
		Logger.logYellow(`${connection.connectionId} :: Connection Error:`, error);
	}
}
