'use strict';

const BaseError = require('./base-error');

class ResourceNotFoundError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceNotFoundError';
        this.statusCode = 400;

        if (!message) {
            this.message = 'Resource not found';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceNotFoundError;
