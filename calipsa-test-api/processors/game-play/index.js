'use strict';

const { models, transaction } = require('../../database/models');
const GameProsessor = require('./game');
const QstProsessor = require('./questions');


const gameProcessor = new GameProsessor({ GameSession: models.GameSession });
const qstProcessor = new QstProsessor({ Question: models.Question, transaction });

const endSession = gameProcessor.endSession.bind(gameProcessor);
const getSessionById = gameProcessor.getSessionById.bind(gameProcessor);

module.exports = {
    endSession,
    getSessionById,
    startSession: gameProcessor.startSession.bind(gameProcessor),
    acceptRejectRequest: gameProcessor.acceptRejectRequest.bind(gameProcessor),
    askQuestion: qstProcessor.askQuestion({ getSessionById }),
    questionCount: qstProcessor.questionCount.bind(qstProcessor),
    getQuestions: qstProcessor.getQuestions.bind(qstProcessor),
    respondToQuestion: qstProcessor.respondToQuestion({ endSession, getSessionById }),
};
