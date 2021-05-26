/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-21
 */


const express  = require('express');
const app      = express();
const http     = require('http').Server(app);
const cluster  = require("cluster");
const cpuCount = require("os").cpus().length;
const os       = require('os');
let io         = require('socket.io-client');
import { inject }        from "inversify";
import { IRestaurantDb } from "../app/modules/restaurant/restaurant.db";
import { Inf }           from "../core/interfaces";
import { DbClient }      from "../core/db-igniter/db-client";
import { AdminSettings } from "./admin-settings";
import { Logger }        from "./cli/cli.logger";

let vorpal = require('vorpal')();

export enum ChatEvent {
	CONNECT    = 'connect',
	DISCONNECT = 'disconnect',
	MESSAGE    = 'message'
}

export interface ChatMessage {
	author: string;
	message: string;
}

export interface ChatState {
	input: string;
	messages: ChatMessage[];
}

export class Admin {
	private socket: any; //SocketIOClient.Socket = {} as SocketIOClient.Socket;

	constructor(

		@inject(Inf.IRestaurantDb) private restDb: IRestaurantDb
	) {

		// restDb.getRestaurantByTableQrCode('QR134_Q')

		/*let io = require('socket.io-client');
		 let url = 'http://localhost:9090';
		 let socket = io.connect(url, {reconnect: true});
		 */

		/*
		 commander
		 .version('0.0.1')
		 .option('-o, --option', 'option description')
		 .option('-m, --more', 'we can have as many options as we want')
		 .option('-i, --input [optional]', 'optional user input')
		 .option('-I, --another-input <required>', 'required user input')
		 .parse(process.argv); // end with parse to parse through the input
		 */

		this.init();
	}

	public init(): Admin {
		console.log('initiating socket service');

		let url = 'http://localhost:' + AdminSettings.ServerPort;

		// this.socket = io('localhost:' + AdminSettings.ServerPort);
		let ioSocket = io.connect(url, { reconnect: true });
		this.socket = ioSocket;


		ioSocket.on('disconnect', function (socket) {
			Logger.logRed('Disconnected');
		});

		ioSocket.on('connect', function (socket) {
			Logger.logGreen('Connected');
		});

		ioSocket.on('message', function (data) {
			Logger.logCyan("Message received", data);
		});

		vorpal.delimiter('topzap$').show();

		this.initVorpal();



		return this;
	}

	private initVorpal() {
		const scope = this;

		vorpal.command('mess [str]').action(function (args, callback) {
			let arg = args.str != null ? args.str : "";

			let dataPacket = {
				"ident":  arg,
				"type": "text",
				"data": args
			};

			scope.sendMessage(ChatEvent.MESSAGE, dataPacket);

			callback();
		});
	}

	private sendMessage(type: string, data: any, tag: string = "") {
		let dataObject = {
			"type": type,
			"data": data,
			"tag":  tag,
		};

		let jsonData = JSON.stringify(dataObject);

		console.log("OUT >>");
		console.log(jsonData);
		console.log(" ");

		this.socket.emit(ChatEvent.MESSAGE, jsonData);
	}

	// send a message for the server to broadcast
	public send(message: ChatMessage): void {
		console.log('emitting message: ' + message);
		this.socket.emit('message', message);
	}

	/*/ link message event to rxjs data source
	 public onMessage(): Observable<ChatMessage> {
	 return null; //fromEvent(this.socket, 'message');
	 }
	 */

	// disconnect - used when unmounting
	public disconnect(): void {
		this.socket.disconnect();
	}
}

new Admin();
