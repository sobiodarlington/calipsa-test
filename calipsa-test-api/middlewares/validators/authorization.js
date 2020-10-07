'use strict';

const Validator = {};

Validator.getSchema = {
    role_id: {
        in: ['param'],
        errorMessage: 'Role id is required',
    },
};

module.exports = Validator;
