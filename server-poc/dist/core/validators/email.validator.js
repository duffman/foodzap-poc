"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    validate(value) {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return true; //regexp.compile();
    }
}
exports.EmailValidator = EmailValidator;
