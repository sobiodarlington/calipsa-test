'use strict';

const { getQuestions, getGameData } = require('./get');
const { startGame, ask } = require('./post');
const { acceptRejectReq, respond } = require('./put');
const processor = require('../../processors/game-play');
const userProcessor = require('../../processors/user');


module.exports = {
    acceptRejectReq: acceptRejectReq({
        acceptRejectRequest: processor.acceptRejectRequest,
        getUsers: userProcessor.getUsers,
    }),
    getGameData: getGameData({
        getSessionById: processor.getSessionById,
        getUsers: userProcessor.getUsers,
    }),
    getQuestions: getQuestions({ getQuestions: processor.getQuestions }),
    startGame: startGame({
        getUsers: userProcessor.getUsers,
        startSession: processor.startSession,
        getQuestions: processor.getQuestions,
    }),
    ask: ask({
        askQuestion: processor.askQuestion,
        questionCount: processor.questionCount,
        endSession: processor.endSession,
    }),
    respond: respond({ respondToQuestion: processor.respondToQuestion }),
};
