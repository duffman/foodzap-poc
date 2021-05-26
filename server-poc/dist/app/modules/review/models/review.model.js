"use strict";
/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = exports.RatingConvert = void 0;
// Converts JSON strings to/from your types
class RatingConvert {
    static toIRestaurantRating(json) {
        return JSON.parse(json);
    }
    static iRestaurantRatingToJson(value) {
        return JSON.stringify(value);
    }
}
exports.RatingConvert = RatingConvert;
class ReviewModel {
    constructor(id, body, rating) {
        this.id = id;
        this.body = body;
        this.rating = rating;
    }
}
exports.ReviewModel = ReviewModel;
