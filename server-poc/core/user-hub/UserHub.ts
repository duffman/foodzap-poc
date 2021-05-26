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

import { Logger }             from "@cli/cli.logger";
import { MessageEmitter }     from "@core/messaging/message-emitter";
import { IUserHub }           from "@core/user-hub/IUserHub";
import { IUserSession }       from "@core/user-hub/IUserSession";
import { IConnection }        from "@networking/connection";
import { ConnectionHub }      from "@networking/connection-hub";
import { SocketMessage }      from "@networking/socket-message";
import { inject, injectable } from "inversify";
import * as Collections       from "typescript-collections";

export class SessionEntry {
	constructor(
		public connection: IConnection,
		public userSession: IUserSession
	) {}
}

//TODO IMPORTANT
//TODO: GARBAGE COLLECTION
@injectable()
export class UserHub implements  IUserHub {
	public sessions = Array<SessionEntry>();
	public userSessions = new Collections.Dictionary<number, IUserSession>();

	constructor(
		@inject("IConnectionHub") private connHub: ConnectionHub,
		@inject("IMessageEmitter") private messageEmitter: MessageEmitter,
	) {
		this.userSessions = new Collections.Dictionary<number, IUserSession>();
	}

	public getSessionEntry(message: SocketMessage): SessionEntry {
		let session: SessionEntry = null;
		let id = message.connection.socketId;

		let i = 0;
		while (i < this.sessions.length) {
			let tmpSession = this.sessions[i];
			let tmpConnId = tmpSession.connection.socketId;

			if (id == tmpConnId) {
				session = tmpSession;
				break;
			}

			i++;
		}

		return session;
	}

	public sessionExists(message: SocketMessage): boolean {
		return (this.getSessionEntry(message) != null);
	}

	public sendMessage(toPlayerId: number, data: any): Promise<boolean> {
		return new Promise((resolve, reject) => {

			resolve(true);
		});
	}

	/**
	 * //TODO Implement...
	 * @param data
	 */
	public broadcast(data: any): void {
		for (let i = 0; i < this.sessions.length; i++) {
			let session = this.sessions[i];
		}
	}

	/**
	 * Retrieves the current player id from the hub, if
	 * @param message
	 * @param required - if set the connection will terminate if no user id is found
	 * @returns {number}
	 */
	public getUserId(message: SocketMessage, required: boolean = true): number {
		let scope = this;
		let userId = -1;
		let sessionEntry = this.getSessionEntry(message);

		Logger.log("sessionEntry.userSession", sessionEntry.userSession);

		if (sessionEntry != null) {
			userId = sessionEntry.userSession.userId;
		}

		function delay(ms: number) {
			return new Promise( resolve => setTimeout(resolve, ms) );
		}

		async function terminateConnection() {
			await delay(500);
			scope.connHub.terminateConnection(message.connection);
		}

		if (required && userId == -1) {
			message.actionResult(false, 'BRUTE_USER_ID_MISSING');

			terminateConnection();

			return -1;
		}

		return userId;
	}

	/**
	 * Returns a session by a given user id
	 * @param - userId
	 * @returns - user session
	 */
	public getSessionByUid(userId: number): Promise<SessionEntry> {

		return new Promise((resolve, reject) => {
			for (let i = 0; i < this.sessions.length; i++) {
				let session = this.sessions[i] as SessionEntry;

				if (session.userSession.userId === userId) {
					resolve(session);
					break;
				}
			}

			resolve(null);
		});
	}

	/**
	 * Checks if given userId exits
	 * @param userId
	 * @returns {number}
	 */
	public haveUserSession(userId: number): boolean {

		return false;
	}

	//TODO Change to promise
	/*/TODO: Report if the session already exist?
	public addSession(message: SocketMessage, data: IUserSession): Promise<boolean> {
		let scope = this;

		return new Promise((resolve, reject) => {
			let validPlayerId = Number(data.userId) === NaN;
			if (!validPlayerId) {
				userId
			}
		});
	}
	*/

	/**
	 * Registers a new session
	 * @param message
	 * @param data
	 */
	public registerSession(message: SocketMessage, data: IUserSession) {
		console.log("Register Session: ", data);

		if (this.sessionExists(message)) {
			return;
		}

		let entry = new SessionEntry(message.connection, data);
		this.sessions.push(entry);
	}

	/**
	 * Clears all player sessions
	 */
	public clearPlayerHub(): void {
		this.sessions.length = 0;
	}
}
