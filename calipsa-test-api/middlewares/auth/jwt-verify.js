'use strict';

const jwt = require('jsonwebtoken');
const ResponseTransformer = require('../../utils/request-handler');

const authenticate = (userTypes) => {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return ResponseTransformer.sendResponse(res, {
                statusCode: 403,
                responseCode: 0,
                responseText: 'No token provided',
            });
        }

        const [, token] = req.headers.authorization.split(' ');

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                return ResponseTransformer.sendResponse(res, {
                    statusCode: 401,
                    responseCode: 0,
                    responseText: 'Token expired',
                });
            }
            return ResponseTransformer.sendResponse(res, {
                statusCode: 401,
                responseCode: 0,
                responseText: 'Invalid token',
            });
        }

        if (Array.isArray(userTypes) && !userTypes.includes(payload.user_type)) {
            return ResponseTransformer.sendResponse(res, {
                responseCode: 0,
                statusCode: 403,
                responseText: 'Sorry, you do not have permission to perform this action.',
            });
        }

        req.user = payload;
        next();
    };
};

module.exports = authenticate;
