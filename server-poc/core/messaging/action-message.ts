/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { IMessage } from '@core/messaging/message';

export class ActionMessage implements IMessage {
	constructor(
		public success: boolean = true,
		public errorMessage: string = ""
	) {}
}
