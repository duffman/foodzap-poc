"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynStoreCore = void 0;
const zynaptic_node_1 = require("../zynaptic-node");
const zyn_json_1 = require("../utils/zyn-json");
const zyn_json_serializer_1 = require("../serialization/zyn-json-serializer");
class ZynStoreCore {
    constructor() {
        let ro = new zynaptic_node_1.ZynapticNode("ro");
        let testa = ro.addChildNode("Nisse").setValue("Gris");
        testa.putProp("age", 12);
        testa.addChildNode("Olle").addChildNode("Uffe"); //.putProp("haveDog", false);;
        testa.putProp("gender", "male");
        ro.addChildNode("Kalle").addChildNode("F1").setValue("Knurre"); //.putProp("kProp", 123);
        //ro.addChildNode("Kula").addChildNode("FA1");
        let data = zyn_json_1.ZynJSON.safeStringify(ro);
        console.log("TEST ::", data);
        /*

                console.log("A1", ro.nodeName);
                console.log("A2", testa.nodeName);

                let utils = ZynJSON.safeStringify(ro);
                //let data2 = JSON.stringify(ro);

                console.log(" ");
                console.log("IS Cyclic ::", ZynJSON.isCyclic(testa));
        //		console.log(utils);
                console.log(" ");
                */
        let formatter = new zyn_json_serializer_1.ZynNodeSerializer(ro);
        let json = formatter.toString();
        console.log(json);
        try {
            let obj = JSON.parse(json);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.ZynStoreCore = ZynStoreCore;
let test = new ZynStoreCore();
