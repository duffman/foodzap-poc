/**
 * Copyright (C) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RealtimeConst }    from "@app/realtime/realtime-const";
import { IRealtimeMessage } from "@app/realtime/realtime-messages";
import { RealtimeMessage }  from "@app/realtime/realtime-messages";
import { Logger }           from "@cli/cli.logger";
import { injectable }       from "inversify";
import { RealtimeEvent }    from "./realtime-event";
import * as cors            from "cors";
import * as express         from 'express';
import { Server }           from 'http';
import { createServer }     from 'http';
import * as SocketIO        from 'socket.io';

//import * as socketIo     from 'socket.io';
//import SocketIO = require("socket.io");
//var cors = require('cors');

export interface IRealtimeServer {
	listen(): void;
	close(): void;
	getApp(): express.Application;
}

@injectable()
export class RealtimeServer implements IRealtimeServer {
	// public static readonly PORT: number = 6571;
	private webApp: express.Application;
	private server: Server;
	//private io: SocketIO.Server;
	private io: SocketIO.Server;
	private port: string | number;

	constructor() {
		this.webApp = express();
		this.port   = process.env.PORT || RealtimeConst.ServerPort;
		this.webApp.use(cors());
		this.webApp.options('*', cors());
		this.server = createServer(this.webApp);
		this.initSocket();
		this.listen();

		Logger.logCyan("/////////////////////////////////")
		Logger.logCyan("// Rrealtime Server - Starting")
		Logger.logCyan("/////////////////////////////////")
	}

	private initSocket(): void {
		this.io = SocketIO(this.server);
	}

	public listen(): void {
		Logger.logCyan("// Listen on port ::", this.port)

		this.server.listen(this.port, () => {
			Logger.log('Running server on port %s', this.port);
		});

		this.io.on(RealtimeEvent.CONNECT, (socket: any) => {
			Logger.log('Connected client on port %s.', this.port);

			socket.on(RealtimeEvent.MESSAGE, (m: IRealtimeMessage) => {
				Logger.log('[server](message): %s', JSON.stringify(m));
				this.io.emit('message', m);
			});

			socket.on(RealtimeEvent.DISCONNECT, () => {
				Logger.log('Client disconnected');
			});
		});
	}

	public close(): void {
		this.io.close(() => {
			Logger.logCyan("Realtime Server Closed");
		})
	}

	public getApp(): express.Application {
		return this.webApp;
	}

	public sayHello(): void {
		Logger.logCyan('Realtime Server SayHello!');

		let message = {
			"allGod": "pint"
		};

		this.io.emit(
				'message',
				JSON.stringify(message)
		);
	}
}
