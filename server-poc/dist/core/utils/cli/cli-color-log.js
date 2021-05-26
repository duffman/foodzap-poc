"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliColorLog = void 0;
const color_codes_1 = require("@core/utils/cli/color-codes");
var CliFgRed = color_codes_1.CliColors.CliFgRed;
var CliBright = color_codes_1.CliColors.CliBright;
var CliReset = color_codes_1.CliColors.CliReset;
class CliColorLog {
    CliLogColor(str) {
        /*
        str = id.open + str.replace(id.closeRe, id.open) + id.close;

        // Close the styling before a linebreak and reopen
        // after next line to fix a bleed issue on macOS
        // https://github.com/chalk/chalk/pull/92
        str = str.replace(/\r?\n/g, `${id.close}$&${id.open}`);
        */
    }
    static LogBrightRed(text, data) {
        console.log(CliBright, CliFgRed, text, data, CliReset);
    }
}
exports.CliColorLog = CliColorLog;
