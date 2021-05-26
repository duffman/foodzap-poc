/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { StrUtils }    from '@core/utils/str/string-utils';
import { ResultModel } from '@models/result.model';

const TIME_ZERO = "00:00";

export class TimeHours {
	constructor(public hours: number = -1, public minutes: number = -1) {}
}

export class DayOpenHours {
	public id:            number;
	public restaurantId:  number;
	public isOpen:        boolean;
	public dayOfWeek:     number;
	public openTime:      TimeHours;
	public closeTime:     TimeHours;

	constructor(day: number = -1, isOpen: boolean, openTime: string = TIME_ZERO, closeTime: string = TIME_ZERO) {
		this.dayOfWeek = day;
		this.isOpen = isOpen;
		this.openTime = this.parseTimeStr(openTime);
		this.closeTime = this.parseTimeStr(closeTime);
	}

	/**
	 * Validate that the string could match the format 10:30
	 * @param timeStr
	 */
	validateTimeFormat(timeStr: string): boolean {
		// Hack: Make a retarded check if time format includes seconds
		// (00:00:00) strip the seconds, in that case strip them
		if (timeStr.length === 8 && timeStr[5] === ":") {
			timeStr = timeStr.substr(0, 5);
		}

		return (timeStr.length === 5
			&& StrUtils.isNumeric(timeStr[0])
			&& StrUtils.isNumeric(timeStr[1])
			&& timeStr[2] === ":"
			&& StrUtils.isNumeric(timeStr[3])
			&& StrUtils.isNumeric(timeStr[4])
		);
	}

	getTimeNum(timeStr: string): string {
		if (timeStr[0] === '0') { timeStr = timeStr.substr(1,1); }
		return timeStr;
	}

	parseTimeStr(timeStr: string): TimeHours {
		let result = new TimeHours();

		if (this.validateTimeFormat(timeStr)) {
			let hours = Number(this.getTimeNum(timeStr.substr(0, 2)));
			let minutes = Number(this.getTimeNum(timeStr.substr(3, 5)));

			result.hours = hours;
			result.minutes = minutes;

		} else {
			console.log("validateTimeFormat = false ::", timeStr);
		}

		return result;
	}
}

export class OpenHoursModel {
	public openHours: Array<DayOpenHours>;
	public errorMessage: string = undefined;
	public error: any = undefined;

	constructor() {
		this.openHours = new Array<DayOpenHours>();
	}

	public haveError() {
		return (this.errorMessage !== undefined || this.error !== undefined);
	}

	public setError(errMess: string = undefined, err: any = undefined) {
		this.errorMessage = errMess;
		this.error = err;
	}

	public addTimeSlot(dayNum: number, isOpen: boolean, startTime: string, closeTime: string): ResultModel {
		let result = new ResultModel();

		this.openHours.push(
			new DayOpenHours(dayNum, isOpen, startTime, closeTime)
		);

		return result;
	}
}
