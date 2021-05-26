/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-29
 */

import { Plugins }            from '@capacitor/core';
import { IDeviceBatteryInfo } from "./device-battery-info.type";

const { Device } = Plugins;

export class DeviceHandler {
	constructor() {
	}

	/**
	 *
	 * @returns {Promise<IDeviceLanguageCode>}
	 */
	public getLanguageCode(): Promise<IDeviceLanguageCode> {
		let scope: DeviceHandler;
		let res: IDeviceLanguageCode;

		async function execute(): Promise<void> {
			res = await Device.getLanguageCode();
		}

		return new Promise((resolve) => {
			execute().then(() => {
				resolve(res);
			});
		});
	}

	/**
	 *
	 * @returns {Promise<IDeviceBatteryInfo>}
	 */
	public getBatteryInfo(): Promise<IDeviceBatteryInfo> {
		return new Promise((resolve, reject) => {
			/*
			Device.getBatteryInfo().then(
				value =>
			)
		 */
			reject(null)
		});
	}


}
