"use strict";
/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynNodeSerializer = exports.ZynNodeDeserializer = void 0;
const zynaptic_node_1 = require("../zynaptic-node");
var ParserState;
(function (ParserState) {
    ParserState[ParserState["None"] = 0] = "None";
    ParserState[ParserState["Value"] = 1] = "Value";
    ParserState[ParserState["Prop"] = 2] = "Prop";
})(ParserState || (ParserState = {}));
class ZynNodeDeserializer {
    constructor(data) {
        this.data = data;
        this.currPos = 0;
        this.lookChar = "";
        this.currState = ParserState.None;
    }
    // {"ro":{"Nisse":{"@age":"12","@gender":"male","Olle":{"Uffe":[]}},"Kalle":{"F1":"Knurre"}}}
    parse() {
        function next() {
            this.lookChar = this.data[this.currPos];
            this.currPos++;
            return this.lookChar;
        }
        //if (next().)
        let res = new zynaptic_node_1.ZynapticNode();
        return res;
    }
}
exports.ZynNodeDeserializer = ZynNodeDeserializer;
class ZynNodeSerializer {
    constructor(rootNode) {
        this.rootNode = rootNode;
    }
    /**
     * This function returns a string (XML) representation of the
     * node and it's children
     */
    processNode(zynNode, xmlData) {
        var previousNode;
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
                if (pInd + 1 < zynNode.props.count() || zynNode.haveChildNodes()) {
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
    toString() {
        let node = this.rootNode;
        let xmlData = new Array();
        xmlData.push('{');
        let previousNode = null;
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
exports.ZynNodeSerializer = ZynNodeSerializer;
