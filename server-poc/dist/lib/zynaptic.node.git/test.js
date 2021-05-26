"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zynaptic_node_1 = require("./src/zynaptic-node");
let test = new zynaptic_node_1.ZynapticNode();
test.addChildNode("kalle").putProp("test", 34);
test.addChildNode("kalle").putProp("test", false);
