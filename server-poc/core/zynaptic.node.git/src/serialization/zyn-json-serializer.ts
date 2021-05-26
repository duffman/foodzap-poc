/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node
 */

import { IZynNode, ZynapticNode } from "../zynaptic-node";
import { IZynDeserializer }       from "./zyn-serializer";
import { IZynSerializer}          from "./zyn-serializer";

enum ParserState {
	None,
	Value,
	Prop
}

export class ZynNodeDeserializer implements IZynDeserializer {
	currPos: number = 0;
	lookChar: string = "";
	prevState: ParserState;
	currState: ParserState;

	constructor(public data: string) {
		this.currState = ParserState.None;
	}

	// {"ro":{"Nisse":{"@age":"12","@gender":"male","Olle":{"Uffe":[]}},"Kalle":{"F1":"Knurre"}}}
	public parse(): IZynNode {
		function next(): string {
			this.lookChar = this.data[this.currPos];
			this.currPos++;
			return this.lookChar;
		}

		//if (next().)

		let res = new ZynapticNode();
		return res;
	}
}

export class ZynNodeSerializer implements IZynSerializer {
	constructor(public rootNode: IZynNode) {}

	/**
	 * This function returns a string (XML) representation of the
	 * node and it's children
	 */
	processNode(zynNode: IZynNode, xmlData: Array<string>) {
		var previousNode: IZynNode;

		console.log("Pushing ::", zynNode.nodeName);
		xmlData.push('"' + zynNode.nodeName + '":');

		if (zynNode.haveProps() || zynNode.haveChildNodes()) {
			xmlData.push('{');
		}

		/**
		 * Append props
		 */
		if (zynNode.haveProps()) {
			for (let pInd = 0; pInd < zynNode.props.count(); pInd++) {
				let prop = zynNode.props.getAt(pInd);

				xmlData.push('"@');
				xmlData.push(prop.name);
				xmlData.push('":"');
				xmlData.push(prop.strVal());
				xmlData.push('"');

				if (pInd+1 < zynNode.props.count() || zynNode.haveChildNodes()) {
					console.log(zynNode.nodeName + " ::: ADDING ??");
					xmlData.push(',');
				}
			}
		}

		if (!zynNode.haveProps() && !zynNode.haveChildNodes() && !zynNode.isEmpty()) {
			xmlData.push('"' + zynNode.nodeValue.toString() + '"');
		}

		if (zynNode.haveProps() && !zynNode.haveChildNodes() && !zynNode.isEmpty()) {
			xmlData.push('":value":"' + zynNode.nodeValue.toString() + '"');
		}

		if (!zynNode.haveProps() && !zynNode.haveChildNodes() && zynNode.isEmpty()) {
			xmlData.push('[]');
		}

		zynNode = zynNode.getFirstChild();
		previousNode = null;

		while (zynNode != null) {
			if (previousNode != null)
				xmlData.push(",");

			this.processNode(zynNode, xmlData);
			previousNode = zynNode;
			zynNode = zynNode.getNextSibling();
		}

		if (previousNode != null && previousNode.parentNode != null) {
			xmlData.push('}');
		}
	}

	public toString(): string {
		let node = this.rootNode;
		let xmlData: string[]  = new Array<string>();

		xmlData.push('{');

		let previousNode: IZynNode = null;

		while (node != null) {
			if (previousNode != null)
				xmlData.push("}");

			previousNode = node;
			this.processNode(node, xmlData);
			node = node.getNextSibling();
		}

		xmlData.push('}');
		return xmlData.join("");
	}
}
