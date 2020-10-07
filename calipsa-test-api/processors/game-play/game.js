'use strict';

const {
    ResourceCreationFailedError,
    ResourceReadFailedError,
    GameSessionError,
    MalformedInputError,
    AuthorizationError,
} = require('../../exceptions');
const to = require('../../utils/await-to');
const errorCodes = require('../../config/error-codes');
const BaseProcessor = require('../base-processor');


class GameProcessor extends BaseProcessor {
    constructor({ GameSession }) {
        super();

        this.GameSession = GameSession;
        this.fkeys = [
            [
                'hostPlayerId',
                'User does not exist',
                errorCodes.USER_DOES_NOT_EXIST,
            ],
            [
                'secondPlayerId',
                'User does not exist',
                errorCodes.USER_DOES_NOT_EXIST,
            ],
        ];
    }

    async getSessionById(sessionId, userId) {
        const scopes = this.resolveSharedScopes({
            include: ['questions'],
        });
        const [session, sessionErr] = await to(
            this.GameSession.scope(scopes).findOne({
                attributes: ['id', 'hostPlayerId', 'secondPlayerId', 'active'],
                where: {
                    id: sessionId,
                    $or: {
                        hostPlayerId: userId,
                        secondPlayerId: userId,
                    },
                },
            }),
        );

        if (sessionErr) {
            throw new ResourceReadFailedError(
                'Error fetching service details',
                sessionErr,
                errorCodes.RECORD_QUERY_ERR,
            );
        } else if (!session) {
            throw new MalformedInputError(
                'No game session found.',
                null,
                errorCodes.GAME_SESSION_DOES_NOT_EXIST,
            );
        }

        return session.get({ plain: true });
    }

    async getSession(params, active = true) {
        const [session, sessionErr] = await to(
            this.GameSession.findOne({
                attributes: ['id', 'hostPlayerId', 'secondPlayerId', 'active'],
                where: {
                    $or: {
                        hostPlayerId: params.hostPlayerId,
                        secondPlayerId: params.secondPlayerId,
                    },
                    active,
                },
            }),
        );

        if (sessionErr) {
            throw new ResourceReadFailedError(
                'Error fetching service details',
                sessionErr,
                errorCodes.RECORD_QUERY_ERR,
            );
        } else if (!session) {
            return null;
        }

        return session;
    }

    async startSession(data) {
        // Throws
        const session = await this.getSession({
            hostPlayerId: data.userId,
            secondPlayerId: data.userId,
        });

        // Return session if theres an active one
        if (session) return session.get({ plain: true });

        const [newSession, newSessionErr] = await to(
            this.GameSession.create({
                hostPlayerId: data.hostId,
                secondPlayerId: data.secondPlayerId,
            }),
        );

        if (newSessionErr) {
            // Throws
            await this.handleFKError(newSessionErr);

            throw new ResourceCreationFailedError(
                null,
                newSessionErr,
                errorCodes.GAME_SESSION_START_ERR,
            );
        }

        return newSession.get({ plain: true });
    }

    async endSession(sessionId, transaction) {
        const [session, sessionErr] = await to(
            this.GameSession.update(
                { active: false },
                {
                    where: { id: sessionId },
                    transaction,
                },
            ),
        );

        if (sessionErr) {
            throw new ResourceCreationFailedError(
                null,
                sessionErr,
                errorCodes.GAME_SESSION_END_ERR,
            );
        }

        return session;
    }

    async acceptRejectRequest(data) {
        // Throws
        const session = await this.getSessionById(data.sessionId, data.userId);

        if (session.secondPlayerId !== data.userId) {
            throw new AuthorizationError(
                'You cannot accept request.',
            );
        }

        if (session.requestStatus === true) {
            throw new GameSessionError(
                'Request already accepted',
                null,
                errorCodes.GAME_SESSION_ALREADY_ACCEPTED,
            );
        }

        if (session.requestStatus === false) {
            throw new GameSessionError(
                'Request already rejected',
                null,
                errorCodes.GAME_SESSION_ALREADY_REJECTED,
            );
        }

        const [sessionUpdate, sessionUpdateErr] = await to(
            this.GameSession.update(
                { requestStatus: data.requestStatus },
                {
                    where: { id: data.sessionId },
                },
            ),
        );

        if (sessionUpdateErr) {
            throw new ResourceCreationFailedError(
                'Error starting game session',
                sessionUpdateErr,
                errorCodes.GAME_SESSION_START_ERR,
            );
        }

        return sessionUpdate.get({ plain: true });
    }

    handleFKError(err) {
        return super.handleFKError(err, this.fkeys);
    }
}

module.exports = GameProcessor;
