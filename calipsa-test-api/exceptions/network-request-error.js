'use strict';

const BaseError = require('./base-error');

class NetworkRequestError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'NetworkRequestError';
        this.statusCode = 502;

        if (!message) {
            this.message = 'Network request error occurred';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NetworkRequestError;
