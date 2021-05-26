/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node
 */

import { ZynapticNode } from "../zynaptic-node"

export interface IZynSerializer {
	toString(): string;
}

export interface IZynDeserializer {}