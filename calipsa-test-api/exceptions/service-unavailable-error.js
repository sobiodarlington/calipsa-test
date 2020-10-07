'use strict';

const BaseError = require('./base-error');

class ServiceUnavailableError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ServiceUnavailableError';
        this.statusCode = 403;

        if (!message) {
            this.message = 'Service unavailable at the moment';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ServiceUnavailableError;
