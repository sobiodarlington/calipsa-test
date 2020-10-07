'use strict';

const APP_ENV = {
    LOCAL: 'local',
    TEST: 'test',
    STAGING: 'staging',
    DEV: 'development',
    PROD: 'production',
};

// app constants
const cc = {
    PENDING: 'PENDING',
    DISBURSED: 'DISBURSED',
    REJECTED: 'REJECTED',
    APPROVED: 'APPROVED',
};

const VALIDATION_MESSAGE = {
    OK: 'Ok',
    EMAIL_NOT_PROVIDED: 'No email provided',
    EXISTING_EMAIL_SUPPLIED: 'Existing email address supplied',
    DUPLICATE_EMAIL_IN_RECORD: 'Duplicate email address found in supplied records',
    INVALID_EMAIL_FORMAT: 'Not a valid email',
    PHONE_NUMBER_NOT_PROVIDED: 'No phone number provided',
    INVALID_PHONE_NUMBER_FORMAT: 'Invalid Phone number. Phone number must be 11 digit in the format 080********',
    EXISTING_PHONE_NUMBER_SUPPLIED: 'Existing phone number supplied',
    DUPLICATE_PHONE_NUMBER_IN_RECORD: 'Duplicate phone number found in supplied records',
    NO_NAME_PROVIDED: 'No name provided',
    INVALID_NAME_FORMAT: 'Invalid name format',
    DUPLICATE_NAME_IN_RECORD: 'Duplicate name found in supplied records',
    INVALID_STATE_FORMAT: 'Not a valid state format',
};

const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN',
};

const MESSAGE_TYPES = {
    GAME_SESSION: 'GAME_SESSION',
    QUESTION: 'QUESTION',
    RESPONSE: 'RESPONSE',
    REQUEST: 'REQUEST',
    REQUEST_ACCEPTED: 'REQUEST_ACCEPTED',
    REQUEST_REJECTED: 'REQUEST_REJECTED',
};

module.exports = Object.freeze({
    APP_ENV,
    VALIDATION_MESSAGE,
    GENDER,
    MESSAGE_TYPES,
});
