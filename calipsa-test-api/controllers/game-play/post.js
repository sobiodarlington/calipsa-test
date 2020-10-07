'use strict';

const { MalformedInputError } = require('../../exceptions');
const { MESSAGE_TYPES } = require('../../config/constants');
const helpers = require('../../utils/helpers');


module.exports = {
    startGame({ startSession, getQuestions, getUsers }) {
        return async ({ body, user, io }) => {
            const { start } = body;

            if (start.secondPlayerId === user.id) {
                throw new MalformedInputError('Player is not available');
            }

            start.hostId = user.id;
            start.userId = user.id;

            // All errors are handled in /utils/request-handler.js
            const newSession = await startSession(start);
            const questions = await getQuestions(newSession.id);
            const { users } = await getUsers({
                id: [newSession.hostPlayerId, newSession.secondPlayerId],
            });

            io.emit(MESSAGE_TYPES.GAME_SESSION, newSession);

            newSession.players = {
                hostPlayer: users.find(u => u.id === newSession.hostPlayerId),
                secondPlayer: users.find(u => u.id === newSession.secondPlayerId),
            };

            return {
                responseCode: 1,
                statusCode: 200,
                data: {
                    session: newSession,
                    questions: questions.questions,
                    questionCount: questions.total,
                },
            };
        };
    },

    ask({ askQuestion, questionCount, endSession }) {
        return async ({ body, user, io }) => {
            let newQuestion;
            const { question } = body;
            const qstCount = await questionCount(question.sessionId);

            if (qstCount === 20) {
                const session = await endSession(question.sessionId);

                io.emit(`${question.sessionId}:message`, {
                    type: MESSAGE_TYPES.GAME_SESSION,
                    data: session,
                });

                helpers.removeListeners(io, question.sessionId);
            } else {
                question.secondPlayerId = user.id;
                question.userId = user.id;

                question.message = question.message.replace(/\?/g, '');

                newQuestion = await askQuestion(question);

                io.emit(`${question.sessionId}:message`, {
                    type: MESSAGE_TYPES.QUESTION,
                    data: newQuestion,
                });
            }

            return {
                responseCode: 1,
                statusCode: 200,
                data: newQuestion || {},
            };
        };
    },

    respond({ respondToQuestion }) {
        return async ({ body, user, io }) => {
            const { respond } = body;

            const ans = await respondToQuestion({
                id: respond.questionId,
                sessionId: respond.sessionId,
                answer: respond.answer,
                userId: user.id,
            });

            io.emit(`${respond.sessionId}:message`, {
                type: MESSAGE_TYPES.RESPONSE,
                data: ans,
            });

            if (ans.answer === true) {
                helpers.removeListeners(io, respond.sessionId);
            }

            return {
                responseCode: 1,
                statusCode: 200,
                data: ans,
            };
        };
    },
};
