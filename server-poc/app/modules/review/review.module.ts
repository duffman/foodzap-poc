/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */

import { DbClient } from '@zynDb/db-client';
import { ReviewDb } from '@modules/review/review-db';
import { inject } from 'inversify';

export class IReviewModule {
}

export class ReviewModule implements IReviewModule {
	constructor(
		@inject('IReviewDb') private reviewDb: ReviewDb
	) {
	}
}
