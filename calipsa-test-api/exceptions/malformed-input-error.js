'use strict';

const BaseError = require('./base-error');

class MalformedInputError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'MalformedInputError';
        this.statusCode = 400;

        if (!message) {
            this.message = 'Malformed data supplied';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MalformedInputError;
