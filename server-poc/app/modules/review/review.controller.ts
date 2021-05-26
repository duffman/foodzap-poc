/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { ActionResult }       from '@models/action-result';
import { ReviewDb }           from '@modules/review/review-db';
import { inject, injectable } from 'inversify';
import { Logger }             from '@cli/cli.logger';
import { Request, Response }  from 'express';
import { Router }             from 'express';
import { IgniterController }  from "@core/webcore/igniter.controller";
import { Inf }                from "@core/interfaces";
import { IRestApiController } from "@api/api-controller";

@injectable()
export class ReviewController extends IgniterController implements IRestApiController {
	debugMode: boolean;

	constructor(
		@inject(Inf.IReviewDb) private reviewDb: ReviewDb
	) { super(); }

	public initRoutes(routes: Router): void {
		routes.all("/reviews"       , this.getReviews.bind(this));
		routes.all("/reviews/add"   , this.addReview.bind(this));
	}

	private getReviews(req: Request, resp: Response): void {
		let restId   = req.param('restId');
		let pageNum  = this.getParam(req,"pageNum");
		let pageSize = this.getParam(req,"pageSize");

		if (!restId) {
			resp.end(new ActionResult(false, 'restId Missing'));
		}

		Logger.logCyan('getReviews ::', '****************');

		this.reviewDb.getReviews(restId).then(res => {
			resp.json(res);

		}).catch(err => {
			resp.end(new ActionResult(false))
		})
	}

	private addReview(req: Request, resp: Response): void {
		let uid     =  req.param('uid');
		let restId  =  req.param('restId');
		let rating  =  Number.parseInt(req.param('rating'));
		let comment =  req.param('comment');

		if (!uid) {
			resp.end(new ActionResult(false, 'uid Missing'))
		}

		if (!restId) {
			resp.end(new ActionResult(false, 'restId Missing'))
		}

		if (!rating) {
			resp.end(new ActionResult(false, 'rating Missing'))
		}

		if (!comment) {
			resp.end(new ActionResult(false, 'comment Missing'))
		}

		console.log("userId ::", uid);
		console.log("restId ::", restId);
		console.log("rating ::", rating);
		console.log("comment ::", comment);

		this.reviewDb.createNewReview(uid, restId, rating, comment).then(res => {

			resp.json(res);
		}).catch(err => {
			resp.end(new ActionResult(false))
		});
	}

	private addRemRating(req: Request, resp: Response): void {

	}
}

/*
if(!empty($_POST['rating']) && !empty($_POST['itemId'])){
	$itemId = $_POST['itemId'];
	$userID = 1234567;
	$insertRating = "INSERT INTO item_rating (itemId, userId, ratingNumber, field, comments, created, modified) VALUES ('".$itemId."', '".$userID."', '".$_POST['rating']."', '".$_POST['field']."', '".$_POST["comment"]."', '".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";
	mysqli_query($conn, $insertRating) or die("database error: ". mysqli_error($conn));
	echo "rating saved!";
}
*/


