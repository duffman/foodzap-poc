/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { Logger } from '@cli/cli.logger';
import { Global } from '../global.settings';

const express = require("express");
const bodyParser = require('body-parser');

export class IAdminServer {
}

export class AdminServer implements IAdminServer {
	port = 8081;
	app = express();
	appRoot: string;

	constructor() {
		this.initServer();
	}

	initServer() {
		this.app.set('view engine', 'ejs');

		this.app.use(bodyParser.json()); // support json encoded bodies
		this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		this.app.get('/', function(req, res) {
			res.render('pages/index');
		});

		// about page
		this.app.get('/about', function(req, res) {
			res.render('pages/about');
		});

		let serverPort = Global.Networking.adminPort;

		Logger.logGreen(`Initializing WebServer on Port ::`, serverPort);

		let server = this.app.listen(Global.Networking.adminPort, () => {
			Logger.logGreen("Calling app.listen's callback function.");
			const host = server.address().address;
			const port = server.address().port;
			Logger.logGreen("Admin App listening at:", host + ' : ' +  serverPort);
		});

		Logger.logPurple("app.listen() executed.");
	}
}
