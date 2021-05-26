/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { enableProdMode }         from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from '@app/app.module';
import { environment }            from '@env/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
						.catch(err => console.log(err));
