/**
 * COLDMIND LTD ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2015-2017 COLDMIND LTD, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source id contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source id, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * Created by Patrik Forsberg on 2017
 */

export class Base64Utils {
	private PADCHAR: string = '=';
	private ALPHA: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	private getByte(s: string, i: number): number {
		const x = s.charCodeAt(i);
		return x;
	}

	private getByte64(s: string, i: number): number {
		const idx = this.ALPHA.indexOf(s.charAt(i));
		return idx;
	}

	public decodeString(s: string): string {
		let pads = 0,
			i, b10, imax = s.length,
			x = [];

		s = String(s);

		if (imax === 0) {
			return s;
		}

		if (s.charAt(imax - 1) === this.PADCHAR) {
			pads = 1;
			if (s.charAt(imax - 2) === this.PADCHAR) {
				pads = 2;
			}
			imax -= 4;
		}

		for (i = 0; i < imax; i += 4) {
			b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12) | (this.getByte64(s, i + 2) << 6) | this.getByte64(s, i + 3);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
		}

		switch (pads) {
			case 1:
				b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12) | (this.getByte64(s, i + 2) << 6);
				x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
				break;
			case 2:
				b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12);
				x.push(String.fromCharCode(b10 >> 16));
				break;
		}

		return x.join('');
	}

	public encode(s: string): string {
		s = String(s);

		let i, b10, x = [],
			imax = s.length - s.length % 3;

		if (s.length === 0) {
			return s;
		}

		for (i = 0; i < imax; i += 3) {
			b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8) | this.getByte(s, i + 2);
			x.push(this.ALPHA.charAt(b10 >> 18));
			x.push(this.ALPHA.charAt((b10 >> 12) & 63));
			x.push(this.ALPHA.charAt((b10 >> 6) & 63));
			x.push(this.ALPHA.charAt(b10 & 63));
		}

		switch (s.length - imax) {
			case 1:
				b10 = this.getByte(s, i) << 16;
				x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.PADCHAR + this.PADCHAR);
				break;
			case 2:
				b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
				x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.ALPHA.charAt((b10 >> 6) & 63) + this.PADCHAR);
				break;
		}

		return x.join('');
	}
}
