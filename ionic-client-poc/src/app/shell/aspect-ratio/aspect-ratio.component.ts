/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component }   from '@angular/core';
import { Input }       from '@angular/core';
import { HostBinding } from '@angular/core';

@Component(
	{
		selector:    'app-aspect-ratio',
		templateUrl: './aspect-ratio.component.html',
		styleUrls:   ['./aspect-ratio.component.scss']
	})
export class AspectRatioComponent {

	@HostBinding('style.padding') ratioPadding = '0px';

	@Input()
	set ratio(ratio: { w: number, h: number }) {
		ratio = (ratio !== undefined && ratio !== null) ? ratio : {
			w: 1,
			h: 1
		};

		const heightRatio = (ratio.h / ratio.w * 100) + '%';

		// Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
		this.ratioPadding = '0px 0px ' + heightRatio + ' 0px';
	}

	constructor() {
	}
}
