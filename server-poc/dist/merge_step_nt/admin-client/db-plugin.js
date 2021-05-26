"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbPlugin = void 0;
const mongoose = require('mongoose');
class DbPlugin {
    constructor() {
    }
    async find(name, query, cb) {
        return new Promise((resolve, reject) => {
            mongoose.connection.db.collection(name, (err, collection) => {
                resolve(collection.find(query).toArray(cb));
            });
        });
    }
    init(vorpal) {
        vorpal.command('update [str]').action((args, callback) => {
            let arg = args.str != null ? args.str : "";
            console.log('UPDATE');
            callback();
        });
        vorpal.command('create [name] [json]').action((args, callback) => {
            let name = args.str ? args.str : "";
            let jsonStr = args.json ? args.json : "";
            try {
                let jsonObj = JSON.parse(jsonStr);
            }
            catch (ex) {
                throw new Error("Error parsing JSON");
            }
            console.log('UPDATE');
            callback();
        });
    }
    onCommand() {
    }
}
exports.DbPlugin = DbPlugin;
