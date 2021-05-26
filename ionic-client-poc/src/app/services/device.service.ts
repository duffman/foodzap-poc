import { Injectable }     from '@angular/core';
import { Plugins }        from '@capacitor/core';
import { LoggingService } from "@sdk/services/logging.service";

const { Device } = Plugins;

export interface IDeviceInfo {
}

@Injectable({
	providedIn: 'root'
})
export class DeviceService {
	constructor(private logger: LoggingService) {
		this.getInfo().then(res => {
			console.log("DeviceInfo ::", res);
		}).catch(err => {
			console.log("Fuck up ::", err);
		});
	}

	getInfo(): Promise<any> {
		return new Promise((resolve, reject) => {
			Device.getInfo().then(res => {
				resolve(res);
			}).catch(err => {
				this.logger.error('DeviceService :: getInfo() ::', err)
			});
		});
	}
}
