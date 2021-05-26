/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { inject, injectable } from 'inversify';
import { Logger }             from '@cli/cli.logger';
import { IDbResult }          from '@zynDb/db-result';
import { DbClient }           from '@zynDb/db-client';
import { IRestaurantRating }  from "@modules/review/models/review.model";
import { SqlIgniter }             from "@zynDb/sql-igniter";
import { QueryUtils }      from "@zynDb/sql-igniter/query-utils";

export interface IReviewDb {
	getReviews(restId: string): Promise<any>;
	createNewReview(uid: string, restId: string, rating: number, desc: string): Promise<IDbResult>;
}

@injectable()
export class ReviewDb implements IReviewDb {
	constructor(@inject("IDbClient") private db: DbClient) {}

	/* php
	include_once("db_connect.php");
	if(!empty($_POST['rating']) && !empty($_POST['itemId'])){
	$itemId = $_POST['itemId'];
	$userID = 1234567;
	$insertRating = "INSERT INTO item_rating (itemId, userId, ratingNumber, field, comments, created, modified) VALUES ('".$itemId."', '".$userID."', '".$_POST['rating']."', '".$_POST['field']."', '".$_POST["comment"]."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";
	mysqli_query($conn, $insertRating) or die("database error: ". mysqli_error($conn));
	echo "rating saved!";
	}
	*/

	public getReviewsTable(restId: string): Promise<Array<IRestaurantRating>> {
		return new Promise((resolve, reject) => {
			this.getReviews(restId).then(res => {
				let result = new Array<IRestaurantRating>();
				for (let data of res.result.dataRows) {
					result.push({
							id: data.asNum("id"),
							user_id: data.asNum("user_id"),
							restaurant_id: data.asStr("restaurant_id"),
							rating: data.asNum("rating"),
							comment: data.asStr("comment"),
							timestamp: data.asDate("timestamp"),
						}
					);
				}

				resolve(result);

			}).catch(err => {
				Logger.logError("getReviewsTable :: error ::", err);
				reject(err);
			});
		});
	}

	public getReviews(restId: string, page: number = 1, pageSize: number = 10): Promise<any> {
		let dynSql = new SqlIgniter();
		dynSql.get('restaurant_rating').whereIs({'restaurant_id': restId})
			.limitBy(page, pageSize);

		let sql = dynSql.toSql();

		Logger.logCyan("DYN SQL GET REVIEW ::", sql);

		return new Promise((resolve, reject) => {
			return this.db.query(sql).then(res => {
				let result = new Array<any>();

				for (let row of res.resultSet) {
					result.push({
							"id"           : row.asNum("id"),
							"userId"       : row.asNum("user_id"),
							"restaurantId" : row.asNum("restaurant_id"),
							"rating"       : row.asNum("rating"),
							"comment"      : row.asStr("comment"),
							"timestamp"    : row.asDate("timestamp")
						}
					);
				}

				resolve(result);

			}).catch(err => {
				// Do not throw, just resolve and forget
				reject(err)
			});
		});
	}

	public getAvgRating(restId: string): Promise<IDbResult> {
		return new Promise((resolve, reject) => {
			let sql = "SELECT ROUND(AVG(rating),1) AS averageRating FROM restaurant_rating WHERE restaurant_id="
				+ QueryUtils.escape(1);

			return this.db.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("getAvgRating() :: error ::", error);
				reject(error);
			});
		});
	}

	public createNewReview(uid: string, restId: string, rating: number, desc: string): Promise<IDbResult> {
		let dynSql = new SqlIgniter();

		dynSql.insert(
			{
					"user_id"       : uid,
					"restaurant_id" : restId,
					"rating"        : rating,
					"comment"       : desc,
				},
				"restaurant_rating"
		);

		let sql = dynSql.toSql();

		Logger.logCyan("createNewReview :: SQL", sql);

		return new Promise((resolve, reject) => {
			return this.db.query(sql).then((dbRes) => {
				resolve(dbRes);
			}).catch((error) => {
				Logger.logError("createNewReview() :: error ::", error);
				reject(error);
			});
		});

		// this.db.countRows("tbl_rating", )
		// this.dbKernel.countRows("tbl_rating", user_id )

		/*
		$checkIfExistQuery = "select * from tbl_rating where user_id = '" . $userId . "' and restaurant_id = '" . $restaurantId . "'";

		if ($rowcount == 0) {
			$insertQuery = "INSERT INTO tbl_rating(user_id,restaurant_id, rating) VALUES ('" . $userId . "','" . $restaurantId . "','" . $rating . "') ";
			$result = mysqli_query($conn, $insertQuery);
			echo "success";
		} else {
			echo "Already Voted!";
		}
		*/

		// let sql = `INSERT INTO ${this.tableName} (id, section, prefix, value, id) VALUES (NULL, '${section}', '${prefix}', '${valStr}', '${id}');`;

		/*
		return new Promise((resolve, reject) => {
			this.db.dbQuery(sql).then(res => {
				resolve(true);
			}).catch(err => {
				// Do not throw, just resolve and forget
				resolve(false);
			});
		});
		*/
	}
}

/*
		sql = `WHERE `;
		for (let i = 0; i < colValues.length; i++) {
			sql = sql = `${colNames[i]}='${this.escpaeVal(colValues[i])}'`;
		}

 */


	/*
		"INSERT INTO item_rating (itemId, userId, ratingNumber, field, comments, created, modified) VALUES ('".$itemId."', '".$userID."', '".$_POST['rating']."', '".$_POST['field']."', '".$_POST["comment"]."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";
		mysqli_query($conn, $insertRating) or die("database error: ". mysqli_error($conn));
		echo "rating saved!";
*/
