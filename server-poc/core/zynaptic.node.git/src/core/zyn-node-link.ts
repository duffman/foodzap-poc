/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IZynNodeBinding }    from "./zyn-node-binding";
import { IZynNode }           from "../zynaptic-node";
import { IZynPropCollection } from "../zyn-prop-list";

export class ZynNodeLink implements IZynNodeBinding {
	constructor(
		public node: IZynNode = null,
		public name: string,
		public outbound: boolean = true,
		public metaData: IZynPropCollection = null
	) {}
}
