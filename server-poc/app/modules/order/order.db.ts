/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 * 2020-07-20
 */

import { LogService }      from "@app/services/log.service";
import { Inf }             from "@core/interfaces";
import { DbClient }        from "@zynDb/db-client";
import { SqlIgniter }          from "@zynDb/sql-igniter";
import { ActionResult }    from "@models/action-result";
import { IActionResult }   from "@models/action-result";
import { IFoodMenuItem }   from "@modules/food-menu/models/food-menu-item.type";
import { IOrderModel }     from "@modules/order/order.model";
import { inject }          from "inversify";

export interface IOrderDb {
	saveOrder(order: IOrderModel): Promise<IActionResult>;
}

export class OrderDb implements IOrderDb {
	constructor(
		@inject(Inf.IDbClient) private dbClient: DbClient,
		@inject(Inf.ILogService) private logger: LogService
	) { }

	public saveOrder(order: IOrderModel): Promise<IActionResult> {
		const scope = this;
		let result = new ActionResult();

		async function storeOrder(): Promise<IActionResult> {
			return new Promise((resolve, reject) => {
				// INSERT INTO `order_items` (`id`, `fm_id`, `field`, `notes`) VALUES (NULL, '157', 'Kyckling med curry', 'Snälla gör den stark som fan');
				// INSERT INTO `orders` (`id`, `customer_id`, `notes`) VALUES (NULL, '1', 'Snälla gör kycklingen stark som fan');

				let data = {
					'id': order.id,
					'notes': order.notes
				}

				scope.dbClient.startTransaction();
				let query = new SqlIgniter().insert(data, 'order_items')
				let sql = query.toSql();

				scope.dbClient.query(sql).then(res => {

					resolve(result);

				}).catch(err => {
					result.setError(err);
					resolve(result);
				});
			});
		}

		async function runQuery(items: IFoodMenuItem[]): Promise<IActionResult> {
			return new Promise((resolve, reject) => {

			});
		}

		async function storeOrderItems(items: IFoodMenuItem[]): Promise<IActionResult> {
			function compileName(item: IFoodMenuItem): string {

				let result = new Array<string>();
				result.push(String(item.id));
				result.push(': ');
				result.push(item.name);

				return  '#' + result.join('');
			}

			return new Promise((resolve, reject) => {
				// INSERT INTO `order_items` (`id`, `fm_id`, `field`, `notes`) VALUES (
				// NULL, '157', 'Kyckling med curry', 'Snälla gör den stark som fan');

				for (let item of items) {
					let name = compileName(item);

					let data = {
						'fm_id': item.id,
						'notes': name
					}

					let sql = new SqlIgniter().insert(data, 'order_items').toSql();

					scope.dbClient.query(sql).then(res => {

						resolve(result);

					}).catch(err => {
						result.setError(err);
						resolve(result);
					});
				}
			});
		}

		async function execute(): Promise<void> {

		}

		return new Promise((resolve, reject) => {
		});
	}
}
