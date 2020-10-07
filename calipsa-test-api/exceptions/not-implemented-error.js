'use strict';

const BaseError = require('./base-error');

class NotImplementedError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'NotImplementedFailedError';
        this.statusCode = 501;

        if (!message) {
            this.message = 'Feature not implemented';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NotImplementedError;
