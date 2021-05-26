import { Injectable }        from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	constructor(
		private loadingController: LoadingController
	) {
	}

	// Show the loader for infinite time
	showLoader(text: string) {
		this.loadingController.create({
			message: text
		}).then((res) => {
			res.present();
		});
	}

	// Hide the loader if already created otherwise return error
	hideLoader() {
		this.loadingController.dismiss().then((res) => {
			console.log('Loading dismissed!', res);
		}).catch((error) => {
			console.log('error', error);
		});

	}

	async presentLoadingWithOptions() {
		const loading = await this.loadingController.create({
			spinner: null,
			duration: 5000,
			message: 'Click the backdrop to dismiss early...',
			translucent: true,
			cssClass: 'custom-class custom-loading',
			backdropDismiss: true
		});

		await loading.present();

		const { role, data } = await loading.onDidDismiss();
		console.log('Loading dismissed with role:', role);
	}

}
