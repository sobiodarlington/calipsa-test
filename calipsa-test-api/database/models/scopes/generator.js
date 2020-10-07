'use strict';

const scopes = {
    withUser(models, options = {}) {
        return {
            include: [
                {
                    ...options,
                    as: 'user',
                    model: models.User.scope('defaultScope'),
                },
            ],
        };
    },

    withUserSlim(models, options = {}) {
        const withUser = scopes.withUser(models, options);

        withUser.include[0].attributes = [
            'id',
            'username',
            'email',
        ];

        return withUser;
    },

    withQuestion(models, options = {}) {
        return {
            include: [
                {
                    ...options,
                    as: 'question',
                    model: models.Question.scope('defaultScope'),
                },
            ],
        };
    },

    withQuestions(models, options = {}) {
        return {
            include: [
                {
                    ...options,
                    as: 'questions',
                    model: models.Question.scope('defaultScope'),
                    separate: true,
                    order: [['createdAt', 'ASC']],
                },
            ],
        };
    },

    withGameSession(models, options = {}) {
        return {
            include: [
                {
                    ...options,
                    as: 'gameSession',
                    model: models.GameSession.scope('defaultScope'),
                },
            ],
        };
    },
};

module.exports = scopes;
