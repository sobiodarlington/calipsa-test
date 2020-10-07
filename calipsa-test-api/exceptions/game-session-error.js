'use strict';

const BaseError = require('./base-error');

class GameSessionError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'GameSessionError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'An error occured';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = GameSessionError;
