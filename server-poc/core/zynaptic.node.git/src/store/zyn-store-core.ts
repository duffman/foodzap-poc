
import { ZynapticNode }        from "../zynaptic-node";
import { ZynNodeXmlFormatter } from "../serialization/zyn-xml.serializer";
import { ZynJSON }             from "../utils/zyn-json";
import { ZynNodeSerializer}    from "../serialization/zyn-json-serializer";

export class ZynStoreCore {

	constructor() {
		let ro = new ZynapticNode("ro");

		let testa = ro.addChildNode("Nisse").setValue("Gris");
		testa.putProp("age", 12);
		testa.addChildNode("Olle").addChildNode("Uffe");//.putProp("haveDog", false);;
		testa.putProp("gender", "male");

		ro.addChildNode("Kalle").addChildNode("F1").setValue("Knurre"); //.putProp("kProp", 123);
		//ro.addChildNode("Kula").addChildNode("FA1");

		let data = ZynJSON.safeStringify(ro);
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

		let formatter = new ZynNodeSerializer(ro);
		let json = formatter.toString();
		console.log(
			json
		);

		try {
			let obj = JSON.parse(json);




		} catch (err) {
			console.log(err);
		}

	}
}

let test = new ZynStoreCore();
