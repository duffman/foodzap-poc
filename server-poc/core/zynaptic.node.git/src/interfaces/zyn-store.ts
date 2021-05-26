import { IZynNode } from "../zynaptic-node";

export interface IZynapticStore {
	saveData(node: IZynNode): boolean;
	loadData(): IZynNode;
}