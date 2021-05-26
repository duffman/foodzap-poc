

import { IZynapticStore } from "../interfaces/zyn-store";
import { IZynNode }       from "../zynaptic-node";

export class ZynLocalStorage implements IZynapticStore {
	public saveData(node: IZynNode): boolean {
		throw new Error("Method not implemented.");
	}

	public loadData(): IZynNode {
		throw new Error("Method not implemented.");
	}
}
