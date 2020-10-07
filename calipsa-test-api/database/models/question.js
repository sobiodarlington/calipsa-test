'use strict';

const { sharedScopes, paginate, userFilter: filter } = require('./scopes');
const scopeGenerator = require('./scopes/generator');


module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define(
        'Question',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            gameSessionId: {
                type: DataTypes.UUIDV4,
                references: {
                    model: 'game_sessions',
                    key: 'id',
                },
                allowNull: false,
            },
            question: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            answer: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
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
            tableName: 'questions',
            timestamps: true,
            paranoid: true,
        },
    );

    Question.associate = (models) => {
        Question.belongsTo(models.GameSession, {
            as: 'gameSession',
            foreignKey: 'gameSessionId',
        });

        Question.options.scopes.orderBy = (data) => {
            if (!data) return { order: [['createdAt', 'DESC']] };
        };

        Question.options.scopes.whereCond = (data) => {
            const cond = {};

            if (data.answer) cond.answer = data.answer;

            return {
                where: cond,
            };
        };

        Question.options.scopes.withGameSession = scopeGenerator.withGameSession(
            models,
        );
    };

    return Question;
};
