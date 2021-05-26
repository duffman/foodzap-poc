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

/**
 * IMPORTANT NOTE: This file is property of Coldmind Ltd 2008 - 2017
 */

export module Global {
	export enum DebugReportingLevel {
		None,
		Low,
		Medium,
		High
	}

	export module Debug {
		export const DebugLevel: DebugReportingLevel = DebugReportingLevel.Low;
		export function Verbose(): boolean {
			return this.DebugLevel == DebugReportingLevel.High;
		}
	}

	export module Networking {
		//export const webServerPort             = 80;
		//export const socketIOPort              = process.env.PORT || 5000;
		export const socketIOPort                = 9090;
		export const webSocketPort               = 6060;
		export const tcpPort                     = 1681;
		export const adminPort                   = 3000;
	}

	export module SocketEvents {
		export const newConnection               = 'newConnection';
		export const dataAvailable               = 'dataAvailable';
		export const error                       = 'error';
		export const closed                      = 'closed';
	}

	/**
	 *	The current state of the application
	 */
	export enum AppState {
		Idle,
		Loading,
		Ready,
		Error
	}

	export module Core {
		export const SERVER_VERSION              = 'Backend Igniter 1.3.5-DEV';
		export const CUSTOMER_BRANCH             = 'VIOLA - Clear Vision 0.9.2 - Eldring AB';
	}

	/**
	 *	Public ServerService Settings
	 */
	export module Settings {
		export let publicWebDirectory            = "core";
		export let appDirectory                  = "app";
		export let defaultConfigFilename         = "viola.config.json";
		export let debug                         = true;
		export let terminateOnError: boolean     = false;

		export module SQLDatabase_Test {
			export const dbName                  = "clear_vision2";
			export const dbHost                  = "localhost";
			export const dbUser                  = "duffman";
			export const dbPass                  = "bjoe7151212";
		}

		export module SQLDatabase {
			export const dbName                  = "clear_vision";
			export const dbHost                  = "localhost";
			export const dbPort                  = 3306;
			export const dbUser                  = "duffman";
			export const dbPass                  = "bjoe7151212";
			export const useTransactions         = false;
		}
	}

	export enum ServerMode {
		Debug,
		Test,
		Production
	}

	export let Mode = ServerMode.Debug;
	export let DebugMode = (Mode == ServerMode.Debug);
}
