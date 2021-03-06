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

import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule }     from "@components/components.module";
import { IonicModule }          from '@ionic/angular';
import { CanDeactivateGuard }   from "@services/deactivate-guard";
import { SignupPage }           from './signup.page';
import { TranslateModule }      from "@ngx-translate/core";


const routes : Routes = [
	{
		path:      '',
		component: SignupPage,
		canDeactivate: [CanDeactivateGuard]
	}
];

@NgModule(
	{
		imports:         [
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			IonicModule,
			RouterModule.forChild(routes),
			ComponentsModule,
			TranslateModule
		],
		entryComponents: [
		],
		declarations:    [
			SignupPage
		]
	})
export class SignupPageModule {
}
