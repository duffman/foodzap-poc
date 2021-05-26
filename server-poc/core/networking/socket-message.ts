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

import { ActionMessage } from '@core/messaging/action-message';
import { MessageEnvelope } from '@core/messaging/message-envelope';
import { ServerMessageTypes } from '@core/messaging/server-message-types';
import { IConnection } from '@core/networking/connection';


export interface ISocketMessage {
	connection: IConnection;
	timestamp: Date;
	messageType: string;
	messageData: any;
	messageTag: string;

	actionResult(success: boolean, errorMessage: string);
	reply(messageData: MessageEnvelope);
	replyWithMessage(messageData: any);
	replyWithEnvelope(messageType: string, messageData: any);
	replyWithEnvelopeData(messageData: any);
}

export class SocketMessage implements ISocketMessage {
	public connection: IConnection;
	public timestamp: Date;
	public messageType: string;
	public messageData: any;
	public messageTag: string = null;

	constructor(connection: IConnection, type: string, data: any = null) {
		this.connection = connection;
		this.timestamp = new Date();
		this.messageType = type;
		this.messageData = data.data;
	}

	/**
	 * Sends an ActionResult message with a success flag
	 * @param success
	 */
	public actionResult(success: boolean, errorMessage: string = "") {
		let messageData = new ActionMessage(success, errorMessage);
		let envelope = new MessageEnvelope(this.messageType, messageData, this.messageTag);
		this.reply(envelope);
	}

	public reply(messageData: MessageEnvelope) {
		let socket = this.connection.socket;
		messageData.tag = this.messageTag;
		socket.emit(ServerMessageTypes.Socket.message, JSON.stringify(messageData));
	}

	public replyWithMessage(messageData: any) {
		let socket = this.connection.socket;
		let envelope = new MessageEnvelope(this.messageType, messageData, this.messageTag);
		socket.emit(ServerMessageTypes.Socket.message, JSON.stringify(envelope));
	}

	public replyWithEnvelope(messageType: string, messageData: any) {
		let envelope = new MessageEnvelope(messageType, messageData);
		this.reply(envelope);
	}

	public replyWithEnvelopeData(messageData: any) {
		this.replyWithEnvelope(this.messageType, messageData);
	}
}
