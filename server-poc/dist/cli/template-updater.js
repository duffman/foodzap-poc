"use strict";
/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateUpdater = void 0;
const https = require("https");
class TemplateUpdater {
    constructor() {
    }
    getMap() {
        https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
            let data = "";
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data).explanation);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}
exports.TemplateUpdater = TemplateUpdater;
