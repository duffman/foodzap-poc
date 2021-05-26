import { Component }        from '@angular/core';
import { Plugins }          from '@capacitor/core';
import { CameraResultType } from '@capacitor/core';
import { CameraSource }     from '@capacitor/core';
import { DomSanitizer }     from '@angular/platform-browser';
import { SafeResourceUrl }  from '@angular/platform-browser';

@Component(
	{
		selector:    'app-camera',
		templateUrl: 'camera.page.html',
		styleUrls:   ['camera.page.scss']
	})
export class CameraPage {
	photo: SafeResourceUrl;

	constructor(private sanitizer: DomSanitizer) {
	}

	async takePicture() {
		const image = await Plugins.Camera.getPhoto(
			{
				quality:      100,
				allowEditing: false,
				resultType:   CameraResultType.DataUrl,
				source:       CameraSource.Camera
			});

		this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
	}
}
