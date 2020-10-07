'use strict';


module.exports = {
    getQuestions({ getQuestions: _getQuestions }) {
        return async ({ params }) => {
            const questions = await _getQuestions(params.sessionId);

            return {
                responseCode: 1,
                statusCode: 200,
                data: questions,
            };
        };
    },
    getGameData({ getSessionById, getUsers }) {
        return async ({ params, user }) => {
            const gameData = await getSessionById(params.sessionId, user.id);
            const { users } = await getUsers({
                id: [gameData.hostPlayerId, gameData.secondPlayerId],
            });

            gameData.players = {
                hostPlayer: users.find(u => u.id === gameData.hostPlayerId),
                secondPlayer: users.find(u => u.id === gameData.secondPlayerId),
            };

            return {
                responseCode: 1,
                statusCode: 200,
                data: gameData,
            };
        };
    },
};
