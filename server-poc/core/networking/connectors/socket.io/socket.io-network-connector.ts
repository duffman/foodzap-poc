/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */

import { injectable }                      from "inversify";
import { createServer, Server }            from 'http';
import { EventEmitter }	                   from 'events';
import * as express                        from 'express';
import * as socketIo                       from 'socket.io';
import { INetworkConnector }               from "@networking/network-connector";
import { SocketEvents }                    from "@networking/connectors/network-connector";
import { IConnection }                     from "@networking/connection";
import { SocketIoConnection }              from "@networking/connectors/socket.io/socket.io-connection";
import { SocketIoSocket }                  from "@networking/connectors/socket.io/socket.io-socket";
import { Logger }                          from "@cli/cli.logger";

const SOCKET_IO_MESSAGE     = "msg";
const SOCKET_IO_CONNECTION  = "connection";

@injectable()
export class SocketIONetworkConnector implements INetworkConnector {
	public name: string = "SocketIO";
	public static readonly PORT:number = 9095;
	private eventEmitter: EventEmitter;
	private app: express.Application;
	private server: Server;
	private io: socketIo.Server;
	private port: string | number;

	constructor() {
		this.createApp();
		this.config();
		this.createServer();
		this.sockets();
		this.listen();
	}

	private createApp(): void {
		this.app = express();
	}

	private createServer(): void {
		this.server = createServer(this.app);
	}

	private config(): void {
		this.eventEmitter = new EventEmitter();
		this.port = SocketIONetworkConnector.PORT;
		//this.port = process.env.PORT;
	}

	private sockets(): void {
		this.io = socketIo(this.server);
	}

	private listen(): void {
		this.server.listen(this.port, () => {
			console.log('Running server on port %s', this.port);
		});

		this.io.on('connect', (socket: any) => {
			console.log('Connected client on port %s.', this.port);

			socket.on('msg', (m: any) => {
				console.log('[server](message): %s', JSON.stringify(m));
				this.io.emit('message', m);
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}

	private handleConnection(socket: any) {
		let ioSocket = new SocketIoSocket(socket);
		let connection: IConnection = new SocketIoConnection(ioSocket);

		socket.on(SOCKET_IO_MESSAGE, (data) => {
			this.handleMessage(connection, data);
		});

		this.eventEmitter.emit(SocketEvents.newConnection, connection);
	}

	private handleMessage(connection: IConnection, message: string, parseJson: boolean = true) {
		try {
			Logger.logCyan('******** RECEIVE ****');
			Logger.logCyan('Data ::', message);
			Logger.logCyan('*********************');

			let dataObject: any;

			if (parseJson) {
				dataObject = JSON.parse(message);
			}

			if (dataObject.tag !== undefined && dataObject.tag !== undefined) {
			}

			this.eventEmitter.emit(SocketEvents.dataAvailable, connection, dataObject);

		} catch(exception) {
			Logger.logGreen("Exception utils", message);
			Logger.logGreen("Post message failed:", exception);
		}
	}
	public getApp(): express.Application {
		return this.app;
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
