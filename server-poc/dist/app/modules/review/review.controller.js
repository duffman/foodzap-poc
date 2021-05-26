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
exports.ReviewController = void 0;
const action_result_1 = require("@models/action-result");
const review_db_1 = require("@modules/review/review-db");
const inversify_1 = require("inversify");
const cli_logger_1 = require("@cli/cli.logger");
const igniter_controller_1 = require("@core/webcore/igniter.controller");
const interfaces_1 = require("@core/interfaces");
let ReviewController = class ReviewController extends igniter_controller_1.IgniterController {
    constructor(reviewDb) {
        super();
        this.reviewDb = reviewDb;
    }
    initRoutes(routes) {
        routes.all("/reviews", this.getReviews.bind(this));
        routes.all("/reviews/add", this.addReview.bind(this));
    }
    getReviews(req, resp) {
        let restId = req.param('restId');
        let pageNum = this.getParam(req, "pageNum");
        let pageSize = this.getParam(req, "pageSize");
        if (!restId) {
            resp.end(new action_result_1.ActionResult(false, 'restId Missing'));
        }
        cli_logger_1.Logger.logCyan('getReviews ::', '****************');
        this.reviewDb.getReviews(restId).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.end(new action_result_1.ActionResult(false));
        });
    }
    addReview(req, resp) {
        let uid = req.param('uid');
        let restId = req.param('restId');
        let rating = Number.parseInt(req.param('rating'));
        let comment = req.param('comment');
        if (!uid) {
            resp.end(new action_result_1.ActionResult(false, 'uid Missing'));
        }
        if (!restId) {
            resp.end(new action_result_1.ActionResult(false, 'restId Missing'));
        }
        if (!rating) {
            resp.end(new action_result_1.ActionResult(false, 'rating Missing'));
        }
        if (!comment) {
            resp.end(new action_result_1.ActionResult(false, 'comment Missing'));
        }
        console.log("userId ::", uid);
        console.log("restId ::", restId);
        console.log("rating ::", rating);
        console.log("comment ::", comment);
        this.reviewDb.createNewReview(uid, restId, rating, comment).then(res => {
            resp.json(res);
        }).catch(err => {
            resp.end(new action_result_1.ActionResult(false));
        });
    }
    addRemRating(req, resp) {
    }
};
ReviewController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaces_1.Inf.IReviewDb)),
    __metadata("design:paramtypes", [review_db_1.ReviewDb])
], ReviewController);
exports.ReviewController = ReviewController;
/*
if(!empty($_POST['rating']) && !empty($_POST['itemId'])){
    $itemId = $_POST['itemId'];
    $userID = 1234567;
    $insertRating = "INSERT INTO item_rating (itemId, userId, ratingNumber, field, comments, created, modified) VALUES ('".$itemId."', '".$userID."', '".$_POST['rating']."', '".$_POST['field']."', '".$_POST["comment"]."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";
    mysqli_query($conn, $insertRating) or die("database error: ". mysqli_error($conn));
    echo "rating saved!";
}
*/
