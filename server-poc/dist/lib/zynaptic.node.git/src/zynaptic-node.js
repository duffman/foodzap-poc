"use strict";
/**
 *	@field Zynaptic Node
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node

 *  @update as of Nov 1 2018, this became an attempt of
 *  creating a database inspired by the Graph model
 *
 *	In order to use this piece of software, this file header
 *	must remain intact.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZynapticNode = void 0;
const zyn_prop_list_1 = require("./zyn-prop-list");
class ZynapticNode {
    constructor(name = null, parent = null) {
        this.nodeName = "";
        this.nodeValue = null;
        this.childNodes = [];
        this.props = null;
        this.nodeName = name == null ? "ROOT" : name;
        this.parentNode = parent;
    }
    setValue(value) {
        this.nodeValue = value;
        return this;
    }
    addChild(child) {
        this.childNodes.push(child);
        return child;
    }
    addChildNode(name) {
        return this.addChild(new ZynapticNode(name, this)); //this.addChild();
    }
    childCount() {
        return this.childNodes.length;
    }
    isEmpty() {
        return this.nodeValue == null || this.nodeValue.length == 0;
    }
    getFirstChild() {
        if (this.childNodes.length > 0) {
            return this.childNodes[0];
        }
        return null;
    }
    getFirstChildNodeName() {
        let firstChildNodeName = "";
        let firstChildNode = this.getFirstChild();
        if (firstChildNode != null) {
            firstChildNodeName = firstChildNode.nodeName;
        }
        return firstChildNodeName;
    }
    getLastChild() {
        let childNode = null;
        let childNodes = this.childNodes;
        if (childNodes.length > 0) {
            childNode = childNodes[childNodes.length - 1];
        }
        return childNode;
    }
    isLastChild() {
        let lastChild = false;
        if (this.parentNode != null) {
            let nodeIndex = this.parentNode.getChildNodeIndex(this);
            if (nodeIndex == this.parentNode.childCount() - 1) {
                lastChild = true;
            }
        }
        return lastChild;
    }
    haveChildNodes() {
        return this.getFirstChild() != null;
    }
    getChildNodeIndex(node) {
        let nodeIndex = -1;
        for (let i = 0; i < this.childNodes.length; i++) {
            let childNode = this.childNodes[i];
            if (childNode === node) {
                nodeIndex = i;
                break;
            }
        }
        return nodeIndex;
    }
    numberOfSiblings() {
        let siblingsCount = 0;
        if (this.parentNode != null) {
            siblingsCount = this.parentNode.childCount();
        }
        return siblingsCount;
    }
    getPreviousSibling() {
        let node = null;
        if (this.parentNode != null) {
            let nodeIndex = this.parentNode.getChildNodeIndex(this);
            let previousNodeIndex = nodeIndex - 1;
            if (previousNodeIndex > -1) {
                node = this.parentNode.childNodes[previousNodeIndex];
            }
        }
        return node;
    }
    // TODO: FIX We don´t have parentNode anymore
    getNextSibling() {
        let node = null;
        if (this.parentNode != null) {
            let nodeIndex = this.parentNode.getChildNodeIndex(this);
            let nextNodeIndex = nodeIndex + 1;
            let numberOfSiblings = this.parentNode.childNodes.length;
            if (nodeIndex > -1 && nextNodeIndex <= numberOfSiblings - 1) {
                node = this.parentNode.childNodes[nextNodeIndex];
            }
        }
        return node;
    }
    getChildNodeByName(name, ignoreCase) {
        let node = null;
        // TODO: Do a more thorough investigation on the perfomance impacts
        // of using Regular Expressions for comparison method 
        for (let index in this.childNodes) {
            let childNode = this.childNodes[index];
            let childNodeName = childNode.nodeName;
            if (ignoreCase) {
                name = name.toLowerCase();
                childNodeName = childNodeName.toLowerCase();
            }
            if (name === childNodeName) {
                node = childNode;
                break;
            }
        }
        return node;
    }
    findNode(search) {
        return null;
    }
    haveProps() {
        return this.props != null && this.props.count() > 0;
    }
    /**
     * Return ZynapticNode to enable chaining when putting
     * props...
     */
    putProp(name, value = null) {
        if (this.props === null) {
            console.log("Kalle");
            this.props = new zyn_prop_list_1.ZynPropList();
        }
        console.log("Kula ::", this.props);
        this.props.set(name, value);
        return this;
    }
    hasProp(name) {
        if (this.props === null)
            return false;
        return this.props.get(name);
    }
    getProp(key) {
        if (this.props === null)
            return null;
        return this.props.get(key);
    }
    getPropStr(key) {
        return this.props.get(key);
    }
}
exports.ZynapticNode = ZynapticNode;
