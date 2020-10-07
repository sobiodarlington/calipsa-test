'use strict';

const express = require('express');
const { checkSchema } = require('express-validator');
const Authenticate = require('../../middlewares/auth/jwt-verify');
const Validator = require('../../middlewares/validators/game-play');
const Controller = require('../../controllers/game-play');
const { handle } = require('../../utils/request-handler');

const Router = express.Router();


Router.post(
    '/game-play/start',
    checkSchema(Validator.startSchema),
    Authenticate(),
    handle(Controller.startGame)
);

Router.post(
    '/game-play/ask-question',
    checkSchema(Validator.questionSchema),
    Authenticate(),
    handle(Controller.ask),
);

Router.put(
    '/game-play/respond',
    checkSchema(Validator.respondSchema),
    Authenticate(),
    handle(Controller.respond),
);

Router.put(
    '/game-play/request',
    checkSchema(Validator.acceptRejectReqSchema),
    Authenticate(),
    handle(Controller.acceptRejectReq),
);

Router.get(
    '/game-play/:sessionId/questions',
    checkSchema(Validator.sessionIdSchema),
    Authenticate(),
    handle(Controller.getQuestions),
);

Router.get(
    '/game-play/:sessionId/game-data',
    checkSchema(Validator.sessionIdSchema),
    Authenticate(),
    handle(Controller.getGameData),
);


module.exports = Router;
