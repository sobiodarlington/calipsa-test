'use strict';

const BaseError = require('./base-error');

class ServerError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ServerError';
        this.statusCode = 500;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ServerError;
