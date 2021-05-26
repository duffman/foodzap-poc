"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */
exports.__esModule = true;
var string_utils_1 = require("@core/utils/str/string-utils");
var result_model_1 = require("@models/result.model");
var TIME_ZERO = "00:00";
var TimeHours = /** @class */ (function () {
    function TimeHours(hours, minutes) {
        if (hours === void 0) { hours = -1; }
        if (minutes === void 0) { minutes = -1; }
        this.hours = hours;
        this.minutes = minutes;
    }
    return TimeHours;
}());
exports.TimeHours = TimeHours;
var DayOpenHours = /** @class */ (function () {
    function DayOpenHours(day, isOpen, openTime, closeTime) {
        if (day === void 0) { day = -1; }
        if (openTime === void 0) { openTime = TIME_ZERO; }
        if (closeTime === void 0) { closeTime = TIME_ZERO; }
        this.dayOfWeek = day;
        this.isOpen = isOpen;
        this.openTime = this.parseTimeStr(openTime);
        this.closeTime = this.parseTimeStr(closeTime);
    }
    /**
     * Validate that the string could match the format 10:30
     * @param timeStr
     */
    DayOpenHours.prototype.validateTimeFormat = function (timeStr) {
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
    };
    DayOpenHours.prototype.getTimeNum = function (timeStr) {
        if (timeStr[0] === '0') {
            timeStr = timeStr.substr(1, 1);
        }
        return timeStr;
    };
    DayOpenHours.prototype.parseTimeStr = function (timeStr) {
        var result = new TimeHours();
        if (this.validateTimeFormat(timeStr)) {
            var hours = Number(this.getTimeNum(timeStr.substr(0, 2)));
            var minutes = Number(this.getTimeNum(timeStr.substr(3, 5)));
            result.hours = hours;
            result.minutes = minutes;
        }
        else {
            console.log("validateTimeFormat = false ::", timeStr);
        }
        return result;
    };
    return DayOpenHours;
}());
exports.DayOpenHours = DayOpenHours;
var OpenHoursModel = /** @class */ (function () {
    function OpenHoursModel() {
        this.errorMessage = undefined;
        this.error = undefined;
        this.openHours = new Array();
    }
    OpenHoursModel.prototype.haveError = function () {
        return (this.errorMessage !== undefined || this.error !== undefined);
    };
    OpenHoursModel.prototype.setError = function (errMess, err) {
        if (errMess === void 0) { errMess = undefined; }
        if (err === void 0) { err = undefined; }
        this.errorMessage = errMess;
        this.error = err;
    };
    OpenHoursModel.prototype.addTimeSlot = function (dayNum, isOpen, startTime, closeTime) {
        var result = new result_model_1.ResultModel();
        this.openHours.push(new DayOpenHours(dayNum, isOpen, startTime, closeTime));
        return result;
    };
    return OpenHoursModel;
}());
exports.OpenHoursModel = OpenHoursModel;
