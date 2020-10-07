'use strict';

class BaseError extends Error {
    constructor(message, origin = null, code = null) {
        super(message);

        if (code !== null && typeof code !== 'string' && typeof code !== 'number') {
            throw new Error('Error {code} must be a string');
        }

        this.name = 'BaseError';
        this.statusCode = 500;
        this.origin = origin;
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseError;
