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
exports.Igniter = void 0;
const path = require("path");
const chalk = require("chalk");
const yargs = require("yargs");
const argv = yargs.options({
    env: {
        alias: 'e',
        choices: ['dev', 'prod'],
        //demandOption: true,
        description: 'app environment'
    },
    genDbModel: {
        alias: 'gdb',
        description: 'Generate Database Model'
    },
    port: {
        alias: 'p',
        default: 80,
        description: 'port'
    }
}).argv;
class Igniter {
    constructor(argv) {
        console.log(argv);
        this.appPath = path.join(process.cwd(), '../../');
        console.log(chalk("path ::"), this.appPath);
    }
}
exports.Igniter = Igniter;
new Igniter(argv);
