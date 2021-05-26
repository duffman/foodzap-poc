/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-05-29
 */

export interface IDeviceInfo {
	// The current bundle build of the app
	appBuild : string;
	// The current bundle verison of the app
	appVersion : string;
	// How much free disk space is available on the the normal data storage path for the os, in bytes
	diskFree? : number;
	// The total size of the normal data storage path for the OS, in bytes
	diskTotal? : number;
	// Whether the app is running in a simulator/emulator
	isVirtual : boolean;
	// The manufacturer of the device
	manufacturer : string;
	// Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used.
	memUsed? : number;
	// The device model. For example, "iPhone"
	model : string;
	// Note: this property is iOS only. The name of the device. For example, "John's iPhone"
	name? : string;
	// The operating system of the device
	operatingSystem : string;
	// The version of the device OS
	osVersion : string;
	// The device platform (lowercase).
	platform : any;
	// The UUID of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install UUIDs.
	uuid : string;
}
