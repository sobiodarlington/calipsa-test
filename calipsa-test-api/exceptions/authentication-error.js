'use strict';

const BaseError = require('./base-error');

class AuthenticationError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'AuthenticationError';
        this.statusCode = 401;

        // if(!message) this.message = 'The specified user does not exit';
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AuthenticationError;
