"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynFind = exports.IZynQuery = exports.ZynMatch = void 0;
const zyn_node_collection_1 = require("./zyn-node-collection");
var ZynMatch;
(function (ZynMatch) {
    ZynMatch[ZynMatch["equals"] = 0] = "equals";
    ZynMatch[ZynMatch["contains"] = 1] = "contains";
    ZynMatch[ZynMatch["beginsWith"] = 2] = "beginsWith";
    ZynMatch[ZynMatch["endsWith"] = 3] = "endsWith";
})(ZynMatch = exports.ZynMatch || (exports.ZynMatch = {}));
class IZynQuery {
}
exports.IZynQuery = IZynQuery;
class Query {
    whereName(name, match = ZynMatch.equals) {
        return this;
    }
}
class ZynFind {
    constructor(rootNode) {
        this.rootNode = rootNode;
        this.query = new Query();
    }
    findAll() {
        return this.query;
    }
    find(name, type) {
        let result = new zyn_node_collection_1.ZynNodeCollection();
        return this.query;
    }
    findWhereProp(name) {
        let test = {
            prop: ZynMatch.equals,
            name: "kalle"
        };
    }
}
exports.ZynFind = ZynFind;
