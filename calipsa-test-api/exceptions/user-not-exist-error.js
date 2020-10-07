'use strict';

const BaseError = require('./base-error');


class UserNotExistError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'UserNotExistError';
        this.code = 100;
        this.statusCode = 200;

        if (!message) {
            this.message = 'The specified user does not exist';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserNotExistError;
