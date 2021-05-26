/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IZynNode }           from "../zynaptic-node";
import { IZynPropCollection } from "../zyn-prop-list";

export interface IZynNodeBinding {
	node: IZynNode;
	name: string;
	outbound: boolean;
	metaData: IZynPropCollection;
}
