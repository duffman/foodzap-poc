"use strict";
/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynNodeXmlFormatter = void 0;
class ZynNodeXmlFormatter {
    constructor(xmlRootNode) {
        this.xmlRootNode = xmlRootNode;
    }
    /**
     * This function returns a string (XML) representation of the
     * node and it's children
    */
    processNode(zynNode, xmlData) {
        let previousNode;
        xmlData.push("<" + zynNode.nodeName);
        /**
         * Append props
         */
        if (zynNode.haveProps()) {
            for (let pInd = 0; pInd < zynNode.props.count(); pInd++) {
                let prop = zynNode.props.getAt(pInd);
                xmlData.push(" ");
                xmlData.push(prop.name);
                xmlData.push('="');
                xmlData.push(prop.strVal());
                xmlData.push('"');
            }
        }
        if (!zynNode.haveChildNodes() && !zynNode.isEmpty()) {
            xmlData.push(">" + zynNode.nodeValue + "</" + zynNode.nodeName + ">");
        }
        else if (zynNode.haveChildNodes()) {
            xmlData.push(">");
        }
        else if (!zynNode.haveChildNodes() && zynNode.isEmpty()) {
            xmlData.push("/>");
        }
        zynNode = zynNode.getFirstChild();
        previousNode = null;
        while (zynNode != null) {
            this.processNode(zynNode, xmlData);
            previousNode = zynNode;
            zynNode = zynNode.getNextSibling();
        }
        if (previousNode != null && previousNode.parentNode != null) {
            xmlData.push("</" + previousNode.parentNode.nodeName + '>');
        }
    }
    toString() {
        var node = this.xmlRootNode;
        var xmlData = new Array();
        xmlData.push('<?xml version="1.0" standalone="yes" ?>');
        while (node != null) {
            this.processNode(node, xmlData);
            node = node.getNextSibling();
        }
        return xmlData.join("");
    }
}
exports.ZynNodeXmlFormatter = ZynNodeXmlFormatter;
