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
	Https   = "https://",
	Ws      = "ws://",
	Wss     = "wss://"
}

const URL_SLASH = '/';
const Q_SEP     = '?';
const Q_AND     = '&';

export class UrlBuilder {
	public port       = -1;
	public https      = false;
	public protocol   = UrlProtocol.Http;
	private urlParts  = new Array<string>();
	private urlParams = new Map<string, any>();

	constructor(public baseUrl: string = "", protocol?: UrlProtocol) {
		if (protocol) {
			this.protocol = protocol;
		}
	}

	/**
	 * Utility method for joining parts of existing URLs
	 * @param urlPart
	 */
	public join(...urlParts: string[]): UrlBuilder {
		for (let urlPart of urlParts) {
			if (urlPart) {
				urlPart = UrlBuilder.trimSlashes(urlPart);
				this.append(urlPart);
			}
		}

		return this;
	}

	/**
	 * Join path with an existing Url
	 * @param {string} url
	 * @param part
	 * @param {boolean} trailingSlash
	 * @returns {string}
	 */
	public static joinPath(url: string, part: any, trailingSlash: boolean = false): string {
		let value = UrlBuilder.ensureTrailingSlash(url);
		value += UrlBuilder.valueToStr(part);

		if (trailingSlash) {
			value = this.ensureTrailingSlash(value);
		}

		return value;
	}

	/**
	 * Make sure that the given string ends with a slash
	 * @param dataStr
	 */
	public static ensureTrailingSlash(dataStr: string): string {
		if (dataStr && (dataStr.endsWith(URL_SLASH)) === false) {
			dataStr += URL_SLASH;
		}

		return dataStr;
	}

	private static prepValuePart(value: any): string {
		let valuePart = UrlBuilder.valueToStr(value);
		valuePart     = UrlBuilder.trimSlashes(valuePart);

		return valuePart;
	}

	/**
	 * Convert given value to a Url friendly string
	 * @param data
	 * @returns {string}
	 */
	public static valueToStr(data: any): string {
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

	public useHttps(value: boolean = true) {
		this.https = value;
	}

	/**
	 * Remove leading slash from string
	 * @param {string} value
	 * @returns {string}
	 */
	public static trimLeadingSlash(value: string): string {
		if (value.startsWith('/')) {
			value = value.substr(1, value.length);
		}

		return value;
	}

	/**
	 * Remove trailing slash from string
	 * @param {string} value
	 * @returns {string}
	 */
	public static trimTrailingSlash(value: string): string {
		if (value.endsWith('/')) {
			value = value.substr(0, value.length - 1);
		}

		return value;
	}

	/**
	 * Remove leading and trailing slash from string
	 * @param {string} value
	 * @returns {string}
	 */
	public static trimSlashes(value: string): string {
		value = UrlBuilder.trimLeadingSlash(value);
		value = UrlBuilder.trimTrailingSlash(value);

		return value;
	}

	public setPort(port: number): UrlBuilder {
		this.port = port;
		return this;
	}

	public append(...values: any[]): UrlBuilder {
		for (const value of values) {
			let valuePart = UrlBuilder.prepValuePart(value);
			this.urlParts.push(valuePart);
		}

		return this;
	}

	public addParam(name: string, value: any = undefined): UrlBuilder {
		this.urlParams.set(name, value);

		return this;
	}

	public getParamStr(includeQuerySep: boolean = true): string {
		let result = new Array<string>();
		this.urlParams.forEach((value: any, name: any) => {
			result.push(
				name + '=' + UrlBuilder.valueToStr(value)
			);
		});

		return result.join(Q_AND);
	}

	public getPath(): string {
		return this.urlParts.join(URL_SLASH);
	}

	public toString(trailingSlash: boolean = false): string {
		let result = this.baseUrl;

		if (this.port > -1) {
			result = result.replace('/', '');
			result = result + ':' + String(this.port).toString();
		}

		result = UrlBuilder.ensureTrailingSlash(result);
		result += this.urlParts.join(URL_SLASH);

		if (trailingSlash && this.urlParams.size === 0) {
			result = UrlBuilder.ensureTrailingSlash(result);
		}

		if (this.urlParams.size > 0 && result.endsWith(Q_SEP) === false) {
			result += Q_SEP;
		}

		result += this.getParamStr();

		if (this.protocol) {
			if (result.indexOf('://') === -1) {
				result = this.protocol + result;
			}
		}

		return result;
	}
}

/*
 import { ApiRoutes }   from "../../sdk/api/api-routes";
 import { AppSettings } from "../../sdk/sdk-settings";

 let builder: UrlBuilder;
 let url: string;

 builder = new UrlBuilder(AppSettings.API_URL)
 .append(ApiRoutes.Restaurant.Path)
 ;

 url = builder.toString(true);
 console.log('URL ::', url);
 console.log('\n--------------------------\n');


 builder = new UrlBuilder('192.168.1.109')
 .setPort(8080)
 .append(ApiRoutes.Restaurant.Path);

 url = builder.toString(true);

 url = UrlBuilder.joinPath(url, 'knyffffe');

 console.log('A - URL ::', url);
 console.log('\n--------------------------\n');
 */
