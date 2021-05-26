/*  Copyright (C) 2016 Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */

export enum UrlProtocol {
	Unknown = "",
	Http    = "http://",
	Https   = "https://"
}

const URL_SLASH = '/';
const Q_SEP = '?';
const Q_AND = '&';

export class UrlBuilderl {
	public port: number = -1;
	private urlParts = new Array<string>();
	private urlParams = new Map<string, any>();

	constructor(public baseUrl: string = "") {}

	/**
	 * Make sure that the given string ends with a slash
	 * @param dataStr
	 */
	public ensureTrailingSlash(dataStr: string): string {
		if (dataStr && (dataStr.endsWith(URL_SLASH)) === false) {
			dataStr += URL_SLASH;
		}

		return dataStr;
	}

	private prepValuePart(value: any): string {
		let valuePart = this.prepValue(value);

		function trimLeaadingSlashes(value: string): string {
			let result: string = "";

			let skipAhead: boolean = true;
			for (let i = 0; i < value.length; i++) {
				let currChar = value[i];
				if (currChar === URL_SLASH && skipAhead) {

				} else {
					skipAhead = false;
					result += currChar;
				}
			}

			return result.trim();
		}

		valuePart = trimLeaadingSlashes(valuePart);

		return valuePart;
	}

	private prepValue (data: any): string {
		let result = "";

		if (typeof data === "string") {
			result = data as string;
		}

		if (typeof data === "number") {
			result = (data as number).toString();
		}

		if (typeof data === "boolean") {
			result = (data as boolean) ? "true" : "false";
		}

		if (data === null) {
			result = "null";
		}

		return result;
	}

	public setPort(port: number): UrlBuilderl {
		this.port = port;
		return this;
	}

	/**
	 * Utility method for joining parts of existing URLs
	 * @param url
	 * @param part
	 * @param trailingSlash
	 */
	public join(url: string, part: any, trailingSlash: boolean = false): string {
		let valuePart = this.prepValuePart(part);

		//let result = this.ensureTrailingSlash(url);
		let result = url.replace('/', '');
		result += valuePart;

		if (trailingSlash) {
			result = this.ensureTrailingSlash(result);
		}

		return result;
	}

	public append(...values: any): UrlBuilderl {
		for (const value of values) {
			let valuePart = this.prepValuePart(value);
			this.urlParts.push(valuePart);
		}

		return this;
	}

	public addParam(name: string, value: any = undefined): UrlBuilderl {
		this.urlParams.set(name, value);
		return this;
	}

	public getParamStr(includeQuerySep: boolean = true): string {
		let result = new Array<string>();
		this.urlParams.forEach((value: any, name: any) => {
			result.push(
				name + '=' + this.prepValue(value)
			);
		});

		return result.join(Q_AND);
	}

	public getPath(): string {
		return this.urlParts.join(URL_SLASH);
	}


	public toString(protocol?: UrlProtocol): string {
		let result = this.baseUrl;

		if (this.port > -1) {
			result = result.replace('/', '');
			result = result + ':' + String(this.port).toString();
		}

		result = this.ensureTrailingSlash(result);

		result += this.urlParts.join(URL_SLASH);

		if (this.urlParams.size > 0 && result.endsWith(Q_SEP) === false) {
			result += Q_SEP;
		}

		result += this.getParamStr();

		if (protocol) {
			result = protocol + result;
		}

		return result;
	}
}
