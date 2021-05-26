"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewDb = void 0;
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const db_client_1 = require("@zynDb/db-client");
const sql_igniter_1 = require("@zynDb/sql-igniter");
const query_utils_1 = require("@zynDb/sql-igniter/query-utils");
let ReviewDb = class ReviewDb {
    constructor(db) {
        this.db = db;
    }
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
    getReviewsTable(restId) {
        return new Promise((resolve, reject) => {
            this.getReviews(restId).then(res => {
                let result = new Array();
                for (let data of res.result.dataRows) {
                    result.push({
                        id: data.asNum("id"),
                        user_id: data.asNum("user_id"),
                        restaurant_id: data.asStr("restaurant_id"),
                        rating: data.asNum("rating"),
                        comment: data.asStr("comment"),
                        timestamp: data.asDate("timestamp"),
                    });
                }
                resolve(result);
            }).catch(err => {
                cli_logger_1.Logger.logError("getReviewsTable :: error ::", err);
                reject(err);
            });
        });
    }
    getReviews(restId, page = 1, pageSize = 10) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.get('restaurant_rating').whereIs({ 'restaurant_id': restId })
            .limitBy(page, pageSize);
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logCyan("DYN SQL GET REVIEW ::", sql);
        return new Promise((resolve, reject) => {
            return this.db.query(sql).then(res => {
                let result = new Array();
                for (let row of res.resultSet) {
                    result.push({
                        "id": row.asNum("id"),
                        "userId": row.asNum("user_id"),
                        "restaurantId": row.asNum("restaurant_id"),
                        "rating": row.asNum("rating"),
                        "comment": row.asStr("comment"),
                        "timestamp": row.asDate("timestamp")
                    });
                }
                resolve(result);
            }).catch(err => {
                // Do not throw, just resolve and forget
                reject(err);
            });
        });
    }
    getAvgRating(restId) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT ROUND(AVG(rating),1) AS averageRating FROM restaurant_rating WHERE restaurant_id="
                + query_utils_1.QueryUtils.escape(1);
            return this.db.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("getAvgRating() :: error ::", error);
                reject(error);
            });
        });
    }
    createNewReview(uid, restId, rating, desc) {
        let dynSql = new sql_igniter_1.SqlIgniter();
        dynSql.insert({
            "user_id": uid,
            "restaurant_id": restId,
            "rating": rating,
            "comment": desc,
        }, "restaurant_rating");
        let sql = dynSql.toSql();
        cli_logger_1.Logger.logCyan("createNewReview :: SQL", sql);
        return new Promise((resolve, reject) => {
            return this.db.query(sql).then((dbRes) => {
                resolve(dbRes);
            }).catch((error) => {
                cli_logger_1.Logger.logError("createNewReview() :: error ::", error);
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
};
ReviewDb = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IDbClient")),
    __metadata("design:paramtypes", [db_client_1.DbClient])
], ReviewDb);
exports.ReviewDb = ReviewDb;
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
