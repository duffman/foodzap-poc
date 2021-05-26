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
import { Logger }                 from '@cli/cli.logger';
import { MessageEnvelope }        from '@core/messaging/message-envelope';
import { ServerMessageTypes }     from '@core/messaging/server-message-types';
import { SocketMessage } from '@core/networking/socket-message';
import { ArrayUtils }    from '@core/utils/array/array-utils';
import { DataUtils }     from '@core/utils/data-utils';
import { IMessageHandler }        from '@core/messaging/message-handler';
import { IConnection }            from '@core/networking/connection';

export interface IMessageHub {
	registerHandler(handler: IMessageHandler): boolean;
	tryDeliverMessage(connection: IConnection, handler: IMessageHandler, message: any);
	addMessage(connection: IConnection, message: any);
	sendMessage(connection: IConnection, messageType: string, messageData: any): void;
}

@injectable()
export class MessageHub implements IMessageHub {
	private handlers = new Array<IMessageHandler>();

	constructor() {}

	public registerHandler(handler: IMessageHandler): boolean {
		try {
			Logger.logGreen("Registering Message Handler:", handler.constructor.name);

			if (this.handlers.lastIndexOf(handler) > -1) {
				console.log('Handler for "' + ArrayUtils.ArrayToString(handler.messageSignature) + '"');
				return false;
			}

			Logger.logGreen("Registering Message Handler: step 1 ::", handler.name);

			this.handlers.push(handler);

			Logger.logGreen("Registering Message Handler: step 2 ::", handler.name);

			if (!handler.messageSignature || handler.messageSignature.length === 0) {
				Logger.logError("No Message Signatures for handler ::", handler.name);
			} else {
				Logger.logYellow("Handler for '" + ArrayUtils.ArrayToString(handler.messageSignature) + "' added");
			}

		} catch(exception) {
			Logger.logErrorMessage("Error 106: failed to register message handler", exception);
		}
	}

	///TODO: Implement
	public unRegisterHandler(handler: IMessageHandler) {
	}

	/**
	 * Tests a handler for the correct message signature
	 * @param connection
	 * @param handler
	 * @param message
	 */
	public tryDeliverMessage(connection: IConnection, handler: IMessageHandler, message: any): boolean {
		let result: boolean = false;

		//Logger.logMega("******************* tryDeliverMessage::", handler.field, message);

		try {
			if (DataUtils.isNullOrUndefined(handler) || DataUtils.isNullOrUndefined(handler.messageSignature)) {
				Logger.logErrorMessage("EMPTY EXIT IN tryDeliverMessage");
				return;
			}

			if (handler.messageSignature.indexOf(message.type) > -1) {
				console.log("*** message.fieldType:", message.type);
				console.log("*** message:", message.data);

				Logger.logCyan("handler.requiresAuth", handler.requiresAuth);
				Logger.logCyan("connection.connectionId ", connection.connectionId );

				//TODO: Clean this up
				if (handler.requiresAuth && connection.connectionId == "") {
					// TODO: FIX FIX FIX
					let dataObject = {
						"type" : ServerMessageTypes.Error.msgMissingId,
						"message": "IConnection id is missing"
					};

					connection.socket.emit("message", JSON.stringify(dataObject));

					setTimeout(function () {
						connection.closeConnection();

					}, 1500);


					return;
				}

				let socketMessage = new SocketMessage(connection, message.type, message);

				// If a tag is present, attach that to the message, tags play an important part
				// in the C# SDK´s Promise Resolving
				if (!DataUtils.isNullOrUndefined(message.tag)) {
					socketMessage.messageTag = message.tag;
				}

				handler.handleMessage(socketMessage);
				result = true;

			}
		} catch(exception) {
			console.log("Exception in tryDeliverMessage", exception);
		}

		return result;
	}

	public addMessage(connection: IConnection, message: any) {
		Logger.logGreen("AddMessage", "socket id: " + connection.socketId);
		Logger.logGreen("         +", message);

		let deliverSuccess = false;

		for (let i = 0; i < this.handlers.length; i++) {
			let handler = this.handlers[i];

			if (!DataUtils.isNullOrUndefined(handler)) {
				if (this.tryDeliverMessage(connection, handler, message)) {
					deliverSuccess = true;
				}
			}
		}

		if (!deliverSuccess) {
			console.log("COULD NOT DELIVER MESSAGE");
		}
	}

	public sendMessage(connection: IConnection, messageType: string, messageData: any): void {
		let envelope = new MessageEnvelope(messageType, messageData);
		connection.socket.emit("message", JSON.stringify(envelope));
	}

	public broadcastMessage(messageType: string, messageData: any) {
		for (let handler of this.handlers) {
			if (!DataUtils.isNullOrUndefined(handler)) {
				let message = new MessageEnvelope(messageType, messageData);

				return new Error("NOT IMPLEMENTED");
				/*
				if (this.tryDeliverMessage(connection, handler, message)) {
					deliverSuccess = true;
				}*/
			}
		}
	}
}
