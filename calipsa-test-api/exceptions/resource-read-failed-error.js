'use strict';

const BaseError = require('./base-error');

class ResourceReadError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceReadFailedError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'Resource read failed';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceReadError;
