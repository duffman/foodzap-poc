/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const data = {
	menus: [
		{
			menu: {
				id:            null,
				restaurant_id: 1,
				name:          "Förrätter",
				info:          "Smarriga förrätter",
				weight:        32,
				items:         [
					{
						id:          null,
						menu_id:     1,
						photo:       '',
						name:        "Köttbullar med Mos",
						info:        "",
						allergies:   {
							veg:     false,
							lactose: false,
							lchf:    false
						},
						currency_id: 1,
						price:       10.23,
						weight:      10
					}
				]
			}
		}
	]
};

export class DataParser {
	constructor(public obj: any) {
		this.parseData(obj);
	}

	parseData(obj: any) {
		function isObj(val: any): boolean {
			return typeof val === 'object';
		}

		function parseObj(obj: any) {
			console.log(' ')
			console.log('-----------------------------')
			console.log('parsing obj:: obj')
			console.log('-----------------------------')
			console.log(' ')

			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					let val = obj[key];
					console.log(key + " -> " + val);

					if (isObj(key)) {
						console.log('KEY is OBJ');
						parseObj(obj)
					}
				}
			} // end for

		} // end parseObj

		parseObj(obj);
	}
}


let obj = {
	menus: [
		{
			menu: {
				id:   1,
				test: "hello"
			}
		}
	]
}

function isObj(val: any): boolean {
	return typeof val === 'object';
}



function parseObj(obj: any) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			let val = obj[key];
			console.log(key + " -> " + val);

			if (isObj(key)) {
				console.log('KEY is OBJ');
				parseObj(obj)
			}
		}
	} // end for
}

parseObj(obj);

//let inst = new DataParser(data);


