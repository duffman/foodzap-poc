"use strict";
/**
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCli = void 0;
const collection_plugin_1 = require("@root/merge_step_nt/mongo_db/collection-plugin");
let vorpal = require("vorpal")();
class MongoCli {
    constructor() {
        this.plugins = new Array();
        this.plugins.push(new collection_plugin_1.Collectionlugin());
    }
    init(vorpal) {
    }
    onCommand() {
    }
}
exports.MongoCli = MongoCli;
