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

import { CommonModule }            from "@angular/common";
import { HttpClient }              from "@angular/common/http";
import { HttpClientModule }        from "@angular/common/http";
import { NgModule }                from '@angular/core';
import { FormsModule }             from "@angular/forms";
import { ReactiveFormsModule }     from "@angular/forms";
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy }    from '@angular/router';
import { CategoryManagerModule } from "@app/admin/manage-menu/category-manager.module";
import { ShellModule }           from "@app/shell/shell.module";
import { FavouritesService }       from "@sdk/food-menu/favorites/favourites.service";
import { GlobiacModule }           from "@sdk/globiac/globiac.module";
import { ComponentsModule }        from "@components/components.module";
import { BarcodeScanner }          from "@ionic-native/barcode-scanner/ngx";
import { SplashScreen }            from '@ionic-native/splash-screen/ngx';
import { StatusBar }               from '@ionic-native/status-bar/ngx';
import { IonicModule }             from '@ionic/angular';
import { IonicRouteStrategy }      from '@ionic/angular';
import { NavParams }               from "@ionic/angular";
import { AuthModule }              from "@sdk/auth/auth.module";
import { JwtInterceptor }          from "@sdk/auth/jwt-interceptor";
import { BasketService }           from "@sdk/basket/basket.service";
import { FoodMenuManager }         from "@sdk/food-menu/food-menu-manager";
import { RealtimeClient }          from "@sdk/realtime-api/realtime-client";
import { RestaurantService }       from "@sdk/restaurant/restaurant.service";
import { AppSettings }             from "@sdk/sdk-settings";
import { AppService }              from "@sdk/services/app.service";
import { SessionService }          from "@sdk/services/session.service";
import { StorageService }          from "@sdk/services/storage.service";
import { LoadingService }          from "@services/loading.service";
import { PhotoService }            from "@app/igniter/photo/photo-service";
import { TabsService }             from "@services/tabs.service";
import { defineCustomElements }    from '@teamhive/lottie-player/loader';
import { SocketIoModule }          from "ngx-socket-io";
import { SocketIoConfig }          from 'ngx-socket-io';
import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
import { TranslateLoader }         from '@ngx-translate/core';
import { TranslateModule }         from '@ngx-translate/core';
import { TranslateHttpLoader }     from '@ngx-translate/http-loader';
import { createTranslateLoader }   from "@sdk/globiac/translation-loader";

const realtimeConfig: SocketIoConfig = {
	url:     AppSettings.REALTIME_SERVER_URL,
	options: {}
};

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

defineCustomElements(window);

@NgModule(
	{
		declarations:    [AppComponent],
		entryComponents: [],
		imports:         [
			CommonModule,
			HttpClientModule,
			BrowserModule,
			ReactiveFormsModule,
			FormsModule,
			IonicModule.forRoot(),
			AppRoutingModule,
			ComponentsModule,
			AuthModule,
			ShellModule,
			GlobiacModule,
			BrowserAnimationsModule,
			SocketIoModule.forRoot(realtimeConfig),
			HttpClientModule,
			TranslateModule.forRoot(
				{
										loader: {
											provide: TranslateLoader,
											useFactory: HttpLoaderFactory,
											deps: [HttpClient]
										}
									})
		],
		providers:       [
			StatusBar,
			SplashScreen,
			BarcodeScanner,
			//
			AppService,
			FoodMenuManager,
			PhotoService,
			//
			TabsService,
			LoadingService,
			JwtInterceptor,
			SessionService,
			BasketService,
			FavouritesService,
			Storage,
			StorageService,
			RestaurantService,
			CategoryManagerModule,

			// Guards
			//
			// CanDeactivateGuardService,
			//
			RealtimeClient,

			NavParams,
			{
				provide:  RouteReuseStrategy,
				useClass: IonicRouteStrategy
			}
		],
		bootstrap:       [ AppComponent ]
	})
export class AppModule {
}
