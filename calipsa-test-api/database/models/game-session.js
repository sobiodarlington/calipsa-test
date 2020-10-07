'use strict';

const { sharedScopes, paginate, userFilter: filter } = require('./scopes');
const scopeGenerator = require('./scopes/generator');


module.exports = (sequelize, DataTypes) => {
    const GameSession = sequelize.define(
        'GameSession',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            hostPlayerId: {
                type: DataTypes.UUIDV4,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Player IDs are required.',
                    },
                },
            },
            secondPlayerId: {
                type: DataTypes.UUIDV4,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Player IDs are required.',
                    },
                },
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            defaultScope: sharedScopes.defaultScope(),
            scopes: {
                paginate,
                filter,
                userExists(data) {
                    return {
                        where: {
                            $or: {
                                email: { $eq: data.email },
                                phone: { $eq: data.phone },
                            },
                        },
                    };
                },
                active: sharedScopes.active,
            },
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            tableName: 'game_sessions',
            timestamps: true,
            paranoid: true,
        },
    );

    GameSession.associate = (models) => {
        GameSession.hasMany(models.Question, {
            as: 'questions',
            foreignKey: 'gameSessionId',
        });

        GameSession.options.scopes.orderBy = (data) => {
            if (!data) return { order: [['createdAt', 'DESC']] };
        };

        GameSession.options.scopes.whereCond = (data) => {
            const cond = {};

            if (data.hostPlayerId) cond.hostPlayerId = data.hostPlayerId;
            if (data.secondPlayerId) cond.secondPlayerId = data.secondPlayerId;
            if (data.active) cond.active = data.active;

            return {
                where: cond,
            };
        };

        GameSession.options.scopes.withQuestions = scopeGenerator.withQuestions(
            models,
        );
    };

    return GameSession;
};
