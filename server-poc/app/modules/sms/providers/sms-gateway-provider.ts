/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */

import { IActionResult } from "@models/action-result";

export interface ISmsGatewayProvider {
	sendMessage(sender: string, recipient: string, body: string): Promise<IActionResult>;
}
