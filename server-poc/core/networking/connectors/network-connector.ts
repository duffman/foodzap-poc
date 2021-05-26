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

import { IConnection }                     from '@core/networking/connection';
import { INetworkConnector }               from '@core/networking/network-connector';
import { injectable, inject }              from "inversify";
import { EventEmitter }	                   from 'events';

/**
 * Socket Event Labels
 */
export module SocketEvents {
	export let newConnection                 = "newConnection";
	export let closed                        = "closed";
	export let dataAvailable                 = "dataAvailable";
	export let reconnect                     = "reconnect";
	export let error                         = "error";
}

@injectable()
export class NetworkConnector implements INetworkConnector {
	name: string;
	eventEmitter = new EventEmitter();

	constructor() {}

	protected doOnData(connection: IConnection, dataObject: any) {
		this.eventEmitter.emit(SocketEvents.dataAvailable, connection, dataObject);
	}

	public onNewConnection(listener: any) {
		this.eventEmitter.addListener(SocketEvents.newConnection, listener);
	}

	public onConnectionClosed(listener: any) {
		this.eventEmitter.addListener(SocketEvents.closed, listener);
	}

	public onData(listener: any) {
		this.eventEmitter.addListener(SocketEvents.dataAvailable, listener);
	}

	public onError(listener: any) {
		this.eventEmitter.addListener(SocketEvents.error, listener);
	}
}
