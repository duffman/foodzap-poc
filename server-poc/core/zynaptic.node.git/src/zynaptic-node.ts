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

/*
	Node = Vertex
	Edge = Link
	EdgeDirection (Directed graphs)


 */

import { IZynProp }           from "./zyn-prop";
import { IZynPropCollection } from "./zyn-prop-list";
import { ZynPropList }        from "./zyn-prop-list";
import { IZynNodeBinding }    from "./core/zyn-node-binding";
import { ZynNodeLink }        from "./core/zyn-node-link";

interface IZynapticNodeList {
	[position: number]: ZynapticNode;
	length: number;
	push(item: ZynapticNode): number;
}

export interface IZynNode {
	id: number;
	parentNode: ZynapticNode;
	nodeName: string;
	nodeValue: any;
	nodeBindings: Array<IZynNodeBinding>;
	childNodes: IZynapticNodeList;
	props: IZynPropCollection;
	setValue(value: any): IZynNode;
	addChild(child: ZynapticNode): ZynapticNode;
	addChildNode(name: string): ZynapticNode;
	childCount(): number;
	haveChildNodes(): boolean;
	isEmpty(): boolean;
	getFirstChild(): IZynNode;

	getChildNodeIndex(node: IZynNode): number
	numberOfSiblings(): number
	getPreviousSibling(): IZynNode
	getNextSibling(): IZynNode
	getChildNodeByName(name: string, ignoreCase?: boolean): IZynNode

	putProp(name: string, value: any): IZynNode;
	haveProps(): boolean;
}

export class ZynapticNode implements IZynNode {
	public id: number;
	public parentNode: ZynapticNode;
	public nodeName: string = "";
	public nodeValue: any = null;
	public nodeBindings: Array<IZynNodeBinding>;
	public childNodes: IZynapticNodeList = [];
	public props: IZynPropCollection = null;

	constructor(name: string = null, parent: ZynapticNode = null) {
		this.nodeName = name == null ? "ROOT" : name;
		this.parentNode = parent;
	}

	public setValue(value: any): IZynNode {
		this.nodeValue = value;
		return this;
	}

	public addChild(child: ZynapticNode): ZynapticNode {
		this.childNodes.push(child);
		return child;
	}

	public addChildNode(name: string): ZynapticNode {
		return this.addChild(new ZynapticNode(name, this)); //this.addChild();
	}
	
	public childCount(): number {
		return this.childNodes.length;
	}
	
	public isEmpty(): boolean {
		return this.nodeValue == null || this.nodeValue.length == 0;
	}
	
	public getFirstChild(): IZynNode {
		if (this.childNodes.length > 0) {
			return this.childNodes[0];
		}
		return null;
	}
	
	public getFirstChildNodeName(): string {
		let firstChildNodeName = "";
		let firstChildNode = this.getFirstChild();

		if (firstChildNode != null) {
			firstChildNodeName = firstChildNode.nodeName;
		}

		return firstChildNodeName;
	}

	public getLastChild(): ZynapticNode {
		let childNode: ZynapticNode = null;
		let childNodes = this.childNodes;
		
		if (childNodes.length > 0) {
			childNode = childNodes[childNodes.length-1];
		}
		
		return childNode;		
	}
	
	public isLastChild() {
		let lastChild = false;
		
		if (this.parentNode != null) {
			let nodeIndex = this.parentNode.getChildNodeIndex(this);
			if (nodeIndex == this.parentNode.childCount()-1) {
				lastChild = true;	
			}
		}
		
		return lastChild;
	}	
	
	public haveChildNodes(): boolean {
		return this.getFirstChild() != null;
	}
	
	public getChildNodeIndex(node: IZynNode): number {
		let nodeIndex: number = -1;

		for (let i = 0; i < this.childNodes.length; i++) {
			let childNode = this.childNodes[i];
			if (childNode === node) {
				nodeIndex = i;
				break;	
			}
		}

		return nodeIndex;
	}

	public numberOfSiblings(): number {
		let siblingsCount = 0;
		if (this.parentNode != null) {
			siblingsCount = this.parentNode.childCount();
		}
		return siblingsCount;
	}

	public getPreviousSibling(): IZynNode {
		let node: ZynapticNode = null;
	
		if (this.parentNode != null) {
			let nodeIndex = this.parentNode.getChildNodeIndex(this);
			let previousNodeIndex = nodeIndex-1;

			if (previousNodeIndex>-1) {
				node = this.parentNode.childNodes[previousNodeIndex];
			}
		}
	
		return node;
	}

	// TODO: FIX We don´t have parentNode anymore
	public getNextSibling(): IZynNode {
		let node: ZynapticNode = null;
		
		if (this.parentNode != null) {
			let nodeIndex = this.parentNode.getChildNodeIndex(this);

			let nextNodeIndex = nodeIndex+1;
			let numberOfSiblings = this.parentNode.childNodes.length;
			
			if (nodeIndex>-1 && nextNodeIndex <= numberOfSiblings-1) {
				node = this.parentNode.childNodes[nextNodeIndex];
			}
		}
		
		return node;
	}

	public getChildNodeByName(name: string, ignoreCase?: boolean): IZynNode {
		let node: ZynapticNode = null;

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

	public findNode(search): IZynNode {
		return null;
	}


	public haveProps(): boolean {
		return this.props != null && this.props.count() > 0;
	}
	/**
	 * Return ZynapticNode to enable chaining when putting
	 * props...
	 */
	public putProp(name: string, value: any = null): IZynNode {
		if (this.props === null) {
			console.log("Kalle")
			this.props = new ZynPropList();
		}
		console.log("Kula ::", this.props);

		this.props.set(name, value);
		return this;
	}
	
	public hasProp(name: string): boolean {
		if (this.props === null) return false;
		return this.props.get(name);
	}

	public getProp(key: string): any {
		if (this.props === null) return null;
		return this.props.get(key);
	}

	public getPropStr(key: string): string {
		return this.props.get(key) as string;
	}
}
