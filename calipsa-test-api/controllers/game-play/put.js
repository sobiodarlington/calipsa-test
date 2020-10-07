'use strict';

const { MalformedInputError } = require('../../exceptions');
const { MESSAGE_TYPES } = require('../../config/constants');


module.exports = {
    acceptRejectReq({ acceptRejectRequest }) {
        return async ({ body, user, io }) => {
            const { request } = body;

            request.userId = user.id;

            const session = await acceptRejectRequest(request);

            io.emit(MESSAGE_TYPES.GAME_SESSION, session);

            return {
                responseCode: 1,
                statusCode: 200,
                data: session,
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

            return {
                responseCode: 1,
                statusCode: 200,
                data: ans,
            };
        };
    },
};
