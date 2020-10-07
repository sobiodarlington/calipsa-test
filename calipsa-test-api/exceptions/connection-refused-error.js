'use strict';

const NetworkRequestError = require('./network-request-error');

class ConnectionRefusedError extends NetworkRequestError {
    constructor(message, origin, code) {
        super(message, origin, code);

        this.name = 'ConnectionRefusedError';

        if (message) this.message = 'Network refused connection';

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ConnectionRefusedError;
