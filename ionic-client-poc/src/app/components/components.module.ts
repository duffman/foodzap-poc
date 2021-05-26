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

import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { CartHeaderComponent }      from "@components/cart-header/cart-header.component";
//import { GoogleMapComponent }       from "@components/google-map/google-map.component";
import { LoadingButtonComponent }   from "@components/loading-button/loading-button.component";
import { SettingsModalComponent }   from "./settings-modal/settings-modal.component";
import { IonicModule }              from '@ionic/angular';
//
import { ShellModule }              from '../shell/shell.module';
//
import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { CountdownTimerComponent }  from './countdown-timer/countdown-timer.component';
import { CounterInputComponent }    from './counter-input/counter-input.component';
import { RatingInputComponent }     from './rating-input/rating-input.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';

@NgModule(
	{
		imports:      [
			CommonModule,
			FormsModule,
			ShellModule,
			IonicModule
		],
		declarations: [
			//GoogleMapComponent,
			CheckboxWrapperComponent,
			ShowHidePasswordComponent,
			SettingsModalComponent,
			CountdownTimerComponent,
			CounterInputComponent,
			RatingInputComponent,
			LoadingButtonComponent,
			CartHeaderComponent
		],
		exports:      [
			ShellModule,
			//GoogleMapComponent,
			CheckboxWrapperComponent,
			ShowHidePasswordComponent,
			SettingsModalComponent,
			CountdownTimerComponent,
			CounterInputComponent,
			RatingInputComponent,
			LoadingButtonComponent,
			CartHeaderComponent
			// ,GoogleMapComponent
		]
	})
export class ComponentsModule {
}
