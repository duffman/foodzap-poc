/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }             from "inversify";
import { IConnection }            from '@core/networking/connection';
import { INetworkSocket }         from '@core/networking/network-socket';

export enum HubConnectionResult {
	ConnectionRegistered,
	ConnectionPending,
	NoSlotsAvailable
}

export interface IConnectionHub {
	getConnectionById(socketId: string): IConnection;
	registerConnection(connection: IConnection);
	getSocketById(socketId: string): INetworkSocket;
	getConnection(socket: INetworkSocket): IConnection;
	terminateConnection(connection: IConnection);
}

@injectable()
export class ConnectionHub implements IConnectionHub {
	public connections = Array<IConnection>();

	constructor(private hubCapacity: Number = -1) {}

	/**
	 * Returns a connection from a given socket id
	 * @param socketId
	 * @returns {any}
	 */
	public getConnectionById(socketId: string): IConnection {
		return this.connections[socketId];
	}

	/**
	 * Registers a new connection in the connection hub
	 * @param connection
	 * @returns {HubConnectionResult}
	 */
	public registerConnection(connection: IConnection): HubConnectionResult {
		const NEW_COUNT = this.connections.length +1;
		const MAX_REACHED = (NEW_COUNT > this.hubCapacity) && this.hubCapacity > -1;

		let registerResult = HubConnectionResult.ConnectionPending;

		if (MAX_REACHED) {
			registerResult = HubConnectionResult.NoSlotsAvailable;
		} else {
			this.connections[connection.socketId] = connection;
			registerResult = HubConnectionResult.ConnectionRegistered;
		}

		return registerResult;
	}

	/**
	 * Closes a given connection
	 * @param connection
	 */
	public terminateConnection(connection: IConnection) {
		connection.socket.close();
	}

	/**
	 * Returns a UwsSocket object from a given socket id
	 * @param socketId
	 * @returns {Socket}
	 */
	public getSocketById(socketId: string): INetworkSocket {
		let connection = this.getConnectionById(socketId);
		return connection.socket;
	}

	/**
	 * Returns the connection assosicted with a given socket
	 * @param socket
	 * @returns {any}
	 */
	public getConnection(socket: INetworkSocket): IConnection {
		return this.connections[socket.id];
	}
}
