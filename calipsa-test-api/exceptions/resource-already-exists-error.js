'use strict';

const BaseError = require('./base-error');

class ResourceAlreadyExistsError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceAlreadyExistsError';
        this.statusCode = 422;

        if (!message) {
            this.message = 'Resource already exists';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceAlreadyExistsError;
