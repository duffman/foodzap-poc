export interface IZynProp {
	name: string;
	value: any;
	strVal(): string;
}

export class ZynProp implements IZynProp {
	constructor(
		public name: string,
		public value: any = null
	) {}

	public strVal(): string {
		let result = "";
		if (typeof this.value === 'object' ) {
			result = "obj";
		} else {
			result = new String(this.value).toString();
		}
		return result;
	}
}