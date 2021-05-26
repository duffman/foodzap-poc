

import { IZynNode }           from "./zynaptic-node";
import { IZynNodeCollection } from "./interfaces/zyn-node-collection";
import {ZynNodeCollection}    from "./zyn-node-collection";

export enum ZynMatch {
	equals,
	contains,
	beginsWith,
	endsWith
}

export class IZynQuery {
}

class Query implements IZynQuery {
	public whereName(name: string, match: ZynMatch = ZynMatch.equals): Query {
		return this;
	}
}

export class ZynFind {
	query: IZynQuery;

	constructor(private rootNode: IZynNode) {
		this.query = new Query();
	}

	public findAll(): IZynQuery {
		return this.query;
	}

	public find(name: string, type: ZynMatch): IZynQuery {
		let result = new ZynNodeCollection();
		return this.query;
	}

	public findWhereProp(name: string) {

		let test = {
			prop: ZynMatch.equals,
			name: "kalle"
		};
	}
}
