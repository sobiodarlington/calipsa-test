'use strict';

const BaseError = require('./base-error');

class IncompleteSetupError extends BaseError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'IncompleteSetupError';
        this.statusCode = 500;

        if (!message) {
            this.message = 'Incomplete setup';
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = IncompleteSetupError;
