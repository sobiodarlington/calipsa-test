'use strict';

const Validator = {};

Validator.startSchema = {
    'start.secondPlayerId': {
        in: ['body'],
        isUUID: true,
        errorMessage: 'start.secondPlayerId must be a valid UUID',
    },
};

Validator.questionSchema = {
    'question.sessionId': {
        in: ['body'],
        isUUID: true,
        errorMessage: 'question.sessionId must be a valid UUID',
    },
    'question.message': {
        in: ['body'],
        isString: true,
        escape: true,
        isLength: {
            options: [{ min: 1, max: 255 }],
            errorMessage: 'question.message must be between 1-255 characters',
        },
        errorMessage: 'question.message must be a string',
    },
};

Validator.respondSchema = {
    'respond.questionId': {
        in: ['body'],
        isUUID: true,
        errorMessage: 'respond.id must be a valid UUID',
    },
    'respond.sessionId': {
        in: ['body'],
        isUUID: true,
        errorMessage: 'respond.sessionId must be a valid UUID',
    },
    'respond.answer': {
        in: ['body'],
        isBoolean: true,
        errorMessage: 'respond.answer must be a boolean',
    },
};

Validator.acceptRejectReqSchema = {
    'request.sessionId': {
        in: ['body'],
        isUUID: true,
        errorMessage: 'request.sessionId must be a valid UUID',
    },
    'request.accept': {
        in: ['body'],
        isBoolean: true,
        errorMessage: 'request.accept must be a boolean',
    },
};

Validator.sessionIdSchema = {
    sessionId: {
        in: ['params'],
        isUUID: true,
        errorMessage: 'sessionId must be a valid UUID',
    },
};

module.exports = Validator;
