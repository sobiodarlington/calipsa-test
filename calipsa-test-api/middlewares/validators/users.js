'use strict';

const Validator = {};


Validator.createSchema = {
    'user.username': {
        in: ['body'],
        matches: [[/^([a-zA-Z,.\d\s\-])*$/, 'g']],
        errorMessage: 'Username is required',
    },

    'user.email': {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Email address is required',
    },

    'user.password': {
        in: ['body'],
        isLength: {
            options: { min: 8, max: 100 },
            errorMessage: 'Password must be between 8 to 100 characters',
        },
        custom: {
            options: (val, { req }) => {
                if (val === req.body.confirmPassword) {
                    return false;
                }

                return true;
            },
            errorMessage: 'Password does not match',
        },
        errorMessage: 'Password field is required',
    },
};

Validator.getSchema = {
    page: {
        in: ['query'],
        toInt: true,
        isInt: true,
        errorMessage: 'page must be an integer',
        optional: true,
    },
    limit: {
        in: ['query'],
        toInt: true,
        isInt: true,
        errorMessage: 'limit must be an integer',
        optional: true,
    },
    sort: {
        in: ['query'],
        errorMessage: 'expects sort to be an object',
        optional: true,
    },
    filter: {
        in: ['query'],
        matches: /[a-zA-z\d]/,
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: 'Must be between 3 to 100 characters',
        },
        errorMessage: 'filter must be a alpha-numeric',
        optional: true,
    },
    include_source: {
        in: ['query'],
        isBoolean: true,
        errorMessage: 'include_source must be boolean',
        optional: true,
    },
    include_credits: {
        in: ['query'],
        isBoolean: true,
        errorMessage: 'include_credits must be boolean',
        optional: true,
    },
    include_debits: {
        in: ['query'],
        isBoolean: true,
        errorMessage: 'include_debits must be boolean',
        optional: true,
    },
};

Validator.getByIdSchema = {
    id: {
        in: ['params'],
        isUUID: true,
        errorMessage: 'Admin id is required',
    },
};

Validator.authSchema = {
    'auth.email': {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Email is required',
    },
    'auth.password': {
        in: ['body'],
        isString: true,
        errorMessage: 'Password is required',
    },
};

module.exports = Validator;
