'use strict';

const {
    AuthorizationError,
    MalformedInputError,
    ResourceCreationFailedError,
    ResourceReadFailedError,
} = require('../../exceptions');
const to = require('../../utils/await-to');
const errorCodes = require('../../config/error-codes');
const BaseProcessor = require('../base-processor');
const { withGameSession } = require('../../database/models/scopes/generator');


class UserProcessor extends BaseProcessor {
    constructor({ Question, transaction }) {
        super();

        this.Question = Question;
        this.transaction = transaction;
    }

    async getQuestions(sessionId) {
        const [questions, err] = await to(
            this.Question.findAndCountAll({
                where: {
                    gameSessionId: sessionId,
                },
                order: [['createdAt', 'ASC']],
            }),
        );

        if (err) {
            throw new ResourceReadFailedError(
                'Questions could not be fetched',
                err,
                errorCodes.RECORD_QUERY_ERR,
            );
        }

        return {
            questions: questions.rows,
            total: questions.count,
        };
    }

    async lastQuestion(sessionId) {
        const scopes = this.resolveSharedScopes({
            include: ['gameSession'],
        });
        const [question, err] = await to(
            this.Question.scope(scopes).findOne({
                where: {
                    gameSessionId: sessionId,
                },
                order: [['createdAt', 'DESC']],
            }),
        );

        if (err) {
            throw new ResourceReadFailedError(
                'Error fetching questions.',
                err,
                errorCodes.RECORD_QUERY_ERR,
            );
        } else if (!question) {
            return null;
        }

        return question.get({ plain: true });
    }

    async questionCount(sessionId) {
        const [count, err] = await to(
            this.Question.count({
                where: {
                    gameSessionId: sessionId,
                },
            }),
        );

        if (err) {
            throw new ResourceReadFailedError(
                'Error fetching questions.',
                err,
                errorCodes.RECORD_QUERY_ERR,
            );
        }

        return count || 0;
    }

    askQuestion({ getSessionById }) {
        return async (data) => {
            const gameSession = await getSessionById(
                data.sessionId,
                data.userId,
            );
            const lastQst = await this.lastQuestion(data.sessionId);

            // Throws
            this.validateGameSession(lastQst, gameSession, data);

            const [newSession, newSessionErr] = await to(
                this.Question.create({
                    gameSessionId: data.sessionId,
                    question: data.message,
                }),
            );

            if (newSessionErr) {
                throw new ResourceCreationFailedError(
                    'Error posting question.',
                    newSessionErr,
                    errorCodes.ASK_QST_ERR,
                );
            }

            return newSession.get({ plain: true });
        };
    }

    respondToQuestion({ endSession, getSessionById }) {
        return async (data) => {
            const gameSession = await getSessionById(
                data.sessionId,
                data.userId,
            );
            const lastQst = await this.lastQuestion(data.sessionId);

            if (lastQst && lastQst.answer === true) {
                throw new MalformedInputError('Game session has ended.');
            }

            if (gameSession && gameSession.hostPlayerId !== data.userId) {
                throw new AuthorizationError(
                    'You do not have permission to play this game.',
                );
            }

            const txn = await this.transaction();
            const [[, qst], qstErr] = await to(
                this.Question.update(
                    {
                        answer: data.answer,
                    },
                    {
                        where: { id: data.id },
                        transaction: txn,
                        returning: true,
                    },
                ),
            );

            if (qstErr) {
                throw new ResourceCreationFailedError(
                    'There was an error while ending game.',
                    qstErr,
                    errorCodes.RESPOND_TO_QST_ERR,
                );
            }

            if (data.answer === true) {
                const [, endSessionErr] = await to(
                    endSession(data.sessionId, txn),
                );

                if (endSessionErr) {
                    await txn.rollback();

                    throw endSessionErr;
                }
            }

            await txn.commit();

            return qst[0].get({ plain: true });
        };
    }

    validateGameSession(lastQst, gameSession, data) {
        if (lastQst && lastQst.answer === true) {
            throw new MalformedInputError(
                'Game session has ended.',
                null,
                errorCodes.GAME_SESSION_HAS_ENDED,
            );
        }

        if (lastQst && lastQst.answer === null) {
            throw new MalformedInputError('Please wait for your turn.');
        }

        if (gameSession && gameSession.secondPlayerId !== data.userId) {
            throw new AuthorizationError(
                'You can not ask questions, you are to respond.',
            );
        }
    }
}

module.exports = UserProcessor;
