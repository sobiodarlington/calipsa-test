'use strict';

const BaseError = require('./base-error');

class AuthorizationError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'AuthorizationError';
        this.statusCode = 403;

        if (!message) this.message = 'You are not authorized to perform this action';

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AuthorizationError;
