/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-29
 */

export interface IDeviceBatteryInfo {
	// A percentage (0 to 1) indicating how much the battery is charged
	batteryLevel? : number;
	// Whether the device is charging
	isCharging? : boolean;
}
