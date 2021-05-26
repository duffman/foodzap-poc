/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable } from '@angular/core';
import { Subject }    from "rxjs";
import { Observable } from "rxjs";

export interface ISignal {
	signalType: number;
}

@Injectable(
	{
		providedIn: 'root'
	})
export class SignalService {
	private signalSubject: Subject<ISignal>;
	public readonly signal: Observable<ISignal>;

	constructor() {
		this.signalSubject = new Subject<ISignal>();
		this.signal = this.signalSubject.asObservable();
	}

	public sendSignal(value: ISignal): void {
		this.signalSubject.next(value);
	}
}
