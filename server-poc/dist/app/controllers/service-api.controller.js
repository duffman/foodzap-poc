"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceApiController = void 0;
const inversify_1 = require("inversify");
const session_model_1 = require("@models/session.model");
let ServiceApiController = class ServiceApiController {
    constructor(debugMode = false) {
        this.debugMode = debugMode;
    }
    initRoutes(routes) {
        let scope = this;
        routes.all("/", this.getRoot.bind(this));
        routes.all("/token", this.getToken.bind(this));
        routes.all("/session", this.apiGetSessionData.bind(this));
    }
    /* 2020 - DO INVESTIGATE

        app.get('/', (req, res) => {
            if (req.session.views) {
                req.session.views++
                res.send(`Returning client (${req.session.views} times})`)
            }
            else {
                req.session.views = 1
                res.send('New client')
            }
        });

        app.get('/destroy', (req, res) => {
            req.session.destroy()
            res.send('Session destroyed')
        });
    }
    */
    getRoot(req, resp) {
        let html = `
				<html>
				   <head>
					  <title>Coldmind Backend Igniter</title>
				   </head>
				   <body>
				      Backend Igniter<br>Server version: 1.7.8<br />
				      <small>Copyright © Coldmind Software 1998-2020</small>
				   </body>
				</html>		
				`;
        resp.status(200).send(html);
    }
    getToken(req, resp) {
        if (!req.session['data']) {
            let sessId = Number.parseInt(req.session.id);
            req.session['data'] = new session_model_1.SessionModel(sessId);
        }
        console.log("TEST :: 1::", typeof req.session['data']);
        console.log("TEST :: 2::", req.session['data']);
        let sessData = req.session['data'];
        if (sessData) {
            console.log("REQ A >");
            sessData.counter++;
            req.session['data'] = sessData;
        }
        else {
            console.log("REQ B ::", req.session);
        }
        let data = "<html><pre>"
            + JSON.stringify(req.session, null, 4)
            + "</pre></html>";
        resp.end(data); //json({sessionId: req.session});
    }
    apiGetSessionData(req, resp, next) {
        let responseData = {
            key: req.session.id,
            numVen: 4
        };
        resp.json(responseData);
        next();
    }
};
ServiceApiController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Boolean])
], ServiceApiController);
exports.ServiceApiController = ServiceApiController;
