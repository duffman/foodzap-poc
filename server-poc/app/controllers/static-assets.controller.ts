/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * January 2020
 */

import { IController }               from '@api/api-controller';
import { AppSettings }               from '@app/app.settings';
import { Logger }                    from '@cli/cli.logger';
import { Inf }                       from "@core/interfaces";
import { Request, Response, Router } from 'express';
import { inject, injectable }        from 'inversify';
import * as path                     from "path";

@injectable()
export class StaticAssetsController implements IController {
	constructor(
		@inject(Inf.IAppSettings) private appSettings: AppSettings,
		public debugMode: boolean = false
	) {
	}

	public initRoutes(routes: Router): void {
		let scope = this;
		routes.all("/", this.getRoot.bind(this));
		routes.all("/img", this.getImg.bind(this));
	}

	private getRoot(req: Request, resp: Response): void {
		resp.json({ 'ROOT': 666 });
	}

	private sendFile(resp: Response, filename: any, options: any): void {
		let reqFile: string = (typeof filename === 'string') ? filename : null;

		if (reqFile) {
			resp.sendFile(reqFile, options, (err) => {
				Logger.logError("sendFile :: error ::", err);
			});

		} else {
			Logger.logError("sendFile :: error ::", reqFile);
		}
	}

	private getImg(req: Request, resp: Response): void {
		console.log('ID:: ', req.query.id);
		console.log('IMAGE:: ', req.query.image);

		let webRoot = this.appSettings.modeSettings.wwwRoot;

		Logger.logPurple("StaticAssetsController ::", webRoot);

		let imagePath = path.join(webRoot, 'restaurants/id_' + req.query.id);

		this.sendFile(resp, req.query.image, { root: imagePath });
	}
}
