'use strict';

const BaseError = require('./base-error');

class ResourceUpdateError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceUpdateFailedError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'Resource update failed';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceUpdateError;
