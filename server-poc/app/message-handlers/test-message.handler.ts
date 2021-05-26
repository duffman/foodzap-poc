/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */

import { IMessageHandler } from "@core/messaging/message-handler";
import { SocketMessage }   from "@networking/socket-message";
import { injectable }      from "inversify";

@injectable()
export class TestMessageHandler implements IMessageHandler {
	readonly messageSignature: Array<string>;
	requiresAuth: boolean;
	name = "Test Message Handler";

	handleMessage(message: SocketMessage): void {
		console.log("POKPKPOKPKPKOKO")
	}
}
