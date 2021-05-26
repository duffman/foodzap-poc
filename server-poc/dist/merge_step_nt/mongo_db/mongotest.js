"use strict";
/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTest = void 0;
const mongoose = require('mongoose');
class MongoTest {
    doTest() {
        console.log("Do Test!!");
        const schema = new mongoose.Schema({ name: 'string', size: 'string' });
        const Tank = mongoose.model('Tank', schema);
        const small = new Tank({ size: 'small' });
        small.save((err) => {
            if (err) {
                console.log("Error ::", err);
                return;
            }
            // saved!
            console.log("Saved!");
        });
    }
    constructor() {
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        mongoose.connect('mongodb://localhost/foodzap', options);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once("open", () => {
            console.log("Mongo Connected!!");
        });
        this.doTest();
        const foodAllergySchema = new mongoose.Schema({
            langId: Number,
            name: String,
        });
        const foodMenuItemSchema = new mongoose.Schema({
            id: Number,
            menuId: Number,
            name: String,
            info: String,
            price: Number,
            code: String,
            symbol: String,
            photo: String,
            ref: String,
            weight: Number,
            allergies: [foodAllergySchema]
        });
        const foodMenuSchema = new mongoose.Schema({
            id: Number,
            langId: Number,
            currencyId: Number,
            name: String,
            photo: String,
            info: String,
            footer: String,
            weight: Number
        });
        //
        //
        //
        const timeHours = new mongoose.Schema({
            hours: Number,
            minutes: Number
        });
        const dayOpenHours = new mongoose.Schema({
            id: Number,
            restaurantId: Number,
            isOpen: Boolean,
            dayOfWeek: Number,
            openTime: [timeHours],
            closeTime: [timeHours]
        });
        const socialMedia = new mongoose.Schema({
            id: Number,
            restaurantId: Number,
            skype: String,
            twitter: String,
            whatsApp: String,
            facebook: String,
            instagram: String
        });
        const locationSchema = new mongoose.Schema({
            id: Number,
            restaurantId: Number,
            latitude: String,
            longitude: String,
            address: String,
            zipCode: String,
            countryCode: String
        });
        const restaurantSchema = new mongoose.Schema({
            name: String,
            info: String,
            openHours: [dayOpenHours],
            location: [locationSchema],
            socialMedia: [socialMedia]
        });
        restaurantSchema.methods.speak = () => {
            const greeting = "Meow name is I don't have a name";
            console.log(greeting);
        };
        const restaurantObj = mongoose.model('Restaurant', restaurantSchema);
        restaurantObj.speak();
        const rst = new restaurantSchema({
            name: "Vegstället",
            info: "Smarriga vegetariska rätter"
        });
        //
        // Save
        //
        const rstSchema = new restaurantSchema({ name: 'fluffy' });
        const restaurant = mongoose.model('Restaurant', restaurantSchema);
    }
}
exports.MongoTest = MongoTest;
