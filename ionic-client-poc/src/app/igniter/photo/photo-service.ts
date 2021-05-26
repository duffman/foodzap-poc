/*
 * *
 *  * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 *  * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at:
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 *
 */

import { Injectable }          from '@angular/core';
import { tick }                from "@angular/core/testing";
import { PhotoFormat }         from "@app/igniter/photo/camera-types";
import { CameraOptions }       from "@capacitor/core";
import { Plugins }             from '@capacitor/core';
import { CameraResultType }    from '@capacitor/core';
import { Capacitor }           from '@capacitor/core';
import { FilesystemDirectory } from '@capacitor/core';
import { CameraPhoto }         from '@capacitor/core';
import { CameraSource }        from '@capacitor/core';
import { CameraDirection }     from "@capacitor/core/dist/esm/core-plugin-definitions";
import { LoggingService }      from "@sdk/services/logging.service";
import { StorageService }      from "@sdk/services/storage.service";

const {Camera, Filesystem, Storage} = Plugins;

export class CameraRes {
	public imageData: string;
}

@Injectable(
	{
		providedIn: 'root'
	})
export class PhotoService {

	// public photos: Photo[] = [];

	constructor(
		private logger: LoggingService,
		private storage: StorageService
	) { }

	async capturePicture() {
		const image = await Camera.getPhoto(
			{
				quality:      90,
				allowEditing: true,
				resultType:   CameraResultType.Uri
			});

		// image.webPath will contain a path that can be set as an image src.
		// You can access the original file using image.path, which can be
		// passed to the Filesystem API to read the raw data of the image,
		// if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
		var imageUrl = image.webPath;

		// Can be set to the src of an image now
		// imageElement.src = imageUrl;
	}

	async getPhoto(modalTitle?: string): Promise<CameraRes> {
		let result: CameraRes;

		try {
			let cameraPhoto = await this.takePicture(modalTitle);
			result = new CameraRes();
			result.imageData = cameraPhoto.base64String;

		} catch (err) {
			this.logger.log('getPhoto :: Error ::', err);
		}

		return result;
	}

	/**
	 *
	 * @param {string} title
	 * @returns {Promise<CameraPhoto>}
	 */
	public takePicture(title?: string): Promise<CameraPhoto> {
		const options: CameraOptions = {
			quality:            100,
			resultType:         CameraResultType.Base64,
			allowEditing:       true,
			promptLabelHeader:  !title ? 'Ta foto' : title,
			promptLabelPhoto:   'Från kamerarulle',
			promptLabelPicture: 'Ta bild',
			promptLabelCancel:  'Avbryt',
		}

		return new Promise((resolve, reject) => {
			Camera.getPhoto(options).then((photo: CameraPhoto) => {
				resolve(photo);
			}).catch(err => {
				reject(err);
			});
		});
	}

	public async addNewToGallery() {
		const capturedPhoto = await Camera.getPhoto(
			{
				resultType: CameraResultType.Uri,
				source:     CameraSource.Camera,
				quality:    100
			}
		);
	}

	loadSaved() {
		// this.storage.storeData()
		/*this.storage.get('photos').then((photos) => {
			this.photos = photos || [];
		});*/
	}

}

/*
this.photos.unshift({
	data: 'data:image/jpeg;base64,' + imageData
});
*/
