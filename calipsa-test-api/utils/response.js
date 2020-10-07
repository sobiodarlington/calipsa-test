'use strict';

/**
 * Response class to set errors and data
 * The JSON method should be called once after
 * setting data.
 * When any errors exist, no data value is sent
 */
class Response {
    constructor(res) {
        this.res = res;
        this.errors = [];
        this.data = {};
    }

    /**
     * Call Set multiple times to set a data pair
     * @param {String} key
     * @param {*} value
     */
    Set(key, value) {
        this.data[key] = value;
    }

    /**
     * Call multiple times to set error
     * and the error code for the issue
     * @param {Number} code
     * @param {String} message
     */
    SetError(code, message) {
        this.errors.push({ code, message });
    }

    SetAndLogError(code, message) {
        this.errors.push({ code, message });
        _console.log({ code, message });
    }

    /**
     * Call last to end the request and respond
     * with the status and already set data or errors
     * @param {status} status
     */
    JSON(status) {
        const body = {};
        if (this.errors.length > 0) {
            body.errors = this.errors;
            return this.res.status(status).json(body);
        }
        body.data = this.data;
        return this.res.status(status).json(body);
    }
}

module.exports = Response;
