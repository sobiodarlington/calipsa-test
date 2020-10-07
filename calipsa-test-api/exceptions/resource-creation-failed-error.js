'use strict';

const BaseError = require('./base-error');

class ResourceCreationError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceCreationFailedError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'Resource creation failed';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceCreationError;
