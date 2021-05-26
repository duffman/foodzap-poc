/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

export interface IActionResult {
	success: boolean;
	errorMessage: string;
	error: any;
	data: any;

	fail(error: Error): void;
	setSuccess(value: boolean): void;
	setError(error: Error, message?: string);
}

export class ActionResult implements IActionResult {
	public data: any;

	constructor(
		public success: boolean = false,
		public errorMessage: string = "",
		public error: any = undefined) {
	}

	public fail(error: Error = undefined): void {
		this.setSuccess(false);
		if (error) {
			this.setError(error);
		}
	}

	public setSuccess(value: boolean = true): void {
		this.success = value;
	}

	public setError(error: Error, message?: string) {
		if (error) {
			this.success = false;
			this.error = error;
			this.errorMessage = message;
		}
	}
}
