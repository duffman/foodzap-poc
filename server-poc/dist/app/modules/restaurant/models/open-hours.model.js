"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenHoursModel = exports.DayOpenHours = exports.TimeHours = void 0;
const string_utils_1 = require("@core/utils/str/string-utils");
const result_model_1 = require("@models/result.model");
const TIME_ZERO = "00:00";
class TimeHours {
    constructor(hours = -1, minutes = -1) {
        this.hours = hours;
        this.minutes = minutes;
    }
}
exports.TimeHours = TimeHours;
class DayOpenHours {
    constructor(day = -1, isOpen, openTime = TIME_ZERO, closeTime = TIME_ZERO) {
        this.dayOfWeek = day;
        this.isOpen = isOpen;
        this.openTime = this.parseTimeStr(openTime);
        this.closeTime = this.parseTimeStr(closeTime);
    }
    /**
     * Validate that the string could match the format 10:30
     * @param timeStr
     */
    validateTimeFormat(timeStr) {
        // Hack: Make a retarded check if time format includes seconds
        // (00:00:00) strip the seconds, in that case strip them
        if (timeStr.length === 8 && timeStr[5] === ":") {
            timeStr = timeStr.substr(0, 5);
        }
        return (timeStr.length === 5
            && string_utils_1.StrUtils.isNumeric(timeStr[0])
            && string_utils_1.StrUtils.isNumeric(timeStr[1])
            && timeStr[2] === ":"
            && string_utils_1.StrUtils.isNumeric(timeStr[3])
            && string_utils_1.StrUtils.isNumeric(timeStr[4]));
    }
    getTimeNum(timeStr) {
        if (timeStr[0] === '0') {
            timeStr = timeStr.substr(1, 1);
        }
        return timeStr;
    }
    parseTimeStr(timeStr) {
        let result = new TimeHours();
        if (this.validateTimeFormat(timeStr)) {
            let hours = Number(this.getTimeNum(timeStr.substr(0, 2)));
            let minutes = Number(this.getTimeNum(timeStr.substr(3, 5)));
            result.hours = hours;
            result.minutes = minutes;
        }
        else {
            console.log("validateTimeFormat = false ::", timeStr);
        }
        return result;
    }
}
exports.DayOpenHours = DayOpenHours;
class OpenHoursModel {
    constructor() {
        this.errorMessage = undefined;
        this.error = undefined;
        this.openHours = new Array();
    }
    haveError() {
        return (this.errorMessage !== undefined || this.error !== undefined);
    }
    setError(errMess = undefined, err = undefined) {
        this.errorMessage = errMess;
        this.error = err;
    }
    addTimeSlot(dayNum, isOpen, startTime, closeTime) {
        let result = new result_model_1.ResultModel();
        this.openHours.push(new DayOpenHours(dayNum, isOpen, startTime, closeTime));
        return result;
    }
}
exports.OpenHoursModel = OpenHoursModel;
