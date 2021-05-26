/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-19
 */

export interface IRealtimeMessage {
	ident:   string;
	message: string;
}

export class RealtimeMessage implements IRealtimeMessage {
	constructor(
		public ident:   string = '',
		public message: string
	) {}
}
