

import { CliColors } from "@core/utils/cli/color-codes";
import CliFgRed = CliColors.CliFgRed;
import CliBright = CliColors.CliBright;
import CliReset = CliColors.CliReset;

export class CliColorLog {


	public CliLogColor(str: string) {
		/*
		str = id.open + str.replace(id.closeRe, id.open) + id.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${id.close}$&${id.open}`);
		*/
	}

	public static LogBrightRed(text: string, data: any) {
		console.log(CliBright, CliFgRed, text, data, CliReset);
	}
}
