'use strict';

const express = require('express');
const { checkSchema } = require('express-validator');
const Authenticate = require('../../middlewares/auth/jwt-verify');
const Validator = require('../../middlewares/validators/users');
const Controller = require('../../controllers/users');
const { handle } = require('../../utils/request-handler');

const Router = express.Router();

Router.get(
    '/users',
    checkSchema(Validator.getSchema),
    Authenticate(),
    handle(Controller.get),
);

Router.get(
    '/user/:id',
    checkSchema(Validator.getByIdSchema),
    Authenticate(),
    handle(Controller.getById),
);

Router.post(
    '/user/register',
    checkSchema(Validator.createSchema),
    handle(Controller.create),
);

Router.post(
    '/user/auth',
    checkSchema(Validator.authSchema),
    handle(Controller.auth),
);

module.exports = Router;
