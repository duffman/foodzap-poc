
import { IZynNode }           from "../zynaptic-node";
import { IZynPropCollection } from "../zyn-prop-list";

export interface IZynNodeBinding {
	node: IZynNode;
	name: string;
	outbound: boolean;
	metaData: IZynPropCollection;
}
