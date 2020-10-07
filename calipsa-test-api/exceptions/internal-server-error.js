'use strict';

const ServerError = require('./server-error');

class InternalServerError extends ServerError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'InternalServerError';
        this.message = message || 'An unknown error occured on the server';
        this.statusCode = 500;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InternalServerError;
