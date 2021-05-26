/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-06-07
 */

import { IConnection }    from "@networking/connection";
import { IConnectionHub } from "@networking/connection-hub";
import { INetworkSocket } from "@networking/network-socket";

export class UserRoom implements IConnectionHub {
	public getConnection(socket : INetworkSocket) : IConnection {
		return undefined;
	}

	public getConnectionById(socketId : string) : IConnection {
		return undefined;
	}

	public getSocketById(socketId : string) : INetworkSocket {
		return undefined;
	}

	public registerConnection(connection : IConnection): void {
	}

	public terminateConnection(connection : IConnection): void {
	}
}
