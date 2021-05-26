
import { IZynProp, ZynProp } from "./zyn-prop";

export interface IZynPropCollection {
	get(name: string): any;
	getAt(index: number): IZynProp;
	set(name: string, value: any): IZynProp;
	haveProp(name: string): boolean;
	count(): number;
}

export class ZynPropList implements IZynPropCollection{
	props = new Array<IZynProp>();

	constructor() {
		this.props = new Array<IZynProp>();
	}

	public get(name: string): any {
		let prop: IZynProp = null;
		let tmpProp: IZynProp = null;

		for (let i = 0; i < this.props.length; i++) {
			tmpProp = this.props[i];
			if (this.props[i] !== null) {
				if (tmpProp != null && tmpProp.name.localeCompare(name) == 0) {
					prop = this.props[i];
					break;
				}
			}
		}
		return prop;
	}

	public getAt(index: number): IZynProp {
		let result: IZynProp = null;
		if (index <= this.props.length && this.props.length > -1) {
			result = this.props[index];
		}
		return result;
	}

	public set(name: string, value: any = null): IZynProp {
		if (this.props === null) return null;
		let result = false;
		let prop: ZynProp = this.get(name);

		if (prop != null) {
			prop.value = value;
		} else {
			prop = new ZynProp(name, value);
			this.props.push(prop);
			result = true;
		}

		return prop;
	}

	public haveProp(name: string): boolean {
		return this.get(name) === null;
	}

	public count(): number {
		return this.props.length;
	}
}
