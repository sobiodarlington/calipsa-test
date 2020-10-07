'use strict';

const BaseError = require('./base-error');

class ResourceDeletionError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ResourceDeletionFailedError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'Resource deletion failed';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceDeletionError;
