import { Injectable }      from '@angular/core';
import { DeviceService } from "@services/device.service";
import { AuthService }   from "@sdk/auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AdminAuthService {
	constructor(
		private userAuthService: AuthService,
		private deviceService: DeviceService
	) {
	}

	public authenticate(email: string, password: string) {
		this.userAuthService.authUser(email, password).then(res => {
			console.log('Admin Auth ::', res);
		}).catch(err => {
			console.log('Admin Auth :: err ::', err);
		});
	}
}
