'use strict';

const BaseError = require('./base-error');


class UserAlreadyExistsError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'UserAlreadyExistsError';
        this.statusCode = 409;

        if (!message) {
            this.message = 'User already exists';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserAlreadyExistsError;
