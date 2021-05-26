"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServer = exports.IAdminServer = void 0;
const cli_logger_1 = require("@cli/cli.logger");
const global_settings_1 = require("../global.settings");
const express = require("express");
const bodyParser = require('body-parser');
class IAdminServer {
}
exports.IAdminServer = IAdminServer;
class AdminServer {
    constructor() {
        this.port = 8081;
        this.app = express();
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
        this.app.get('/', function (req, res) {
            res.render('pages/index');
        });
        // about page
        this.app.get('/about', function (req, res) {
            res.render('pages/about');
        });
        let serverPort = global_settings_1.Global.Networking.adminPort;
        cli_logger_1.Logger.logGreen(`Initializing WebServer on Port ::`, serverPort);
        let server = this.app.listen(global_settings_1.Global.Networking.adminPort, () => {
            cli_logger_1.Logger.logGreen("Calling app.listen's callback function.");
            const host = server.address().address;
            const port = server.address().port;
            cli_logger_1.Logger.logGreen("Admin App listening at:", host + ' : ' + serverPort);
        });
        cli_logger_1.Logger.logPurple("app.listen() executed.");
    }
}
exports.AdminServer = AdminServer;
