/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-09-09
 */

import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs';

export interface ICanComponentDeactivate {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable(
	{
		providedIn: 'root',
	})
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {
	canDeactivate(component: ICanComponentDeactivate) {
		console.log('CAN DEACTIVATE');

		return component.canDeactivate && component.canDeactivate();
	}
}
