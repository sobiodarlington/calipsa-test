'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .createTable('questions', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUID,
                },
                gameSessionId: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'game_sessions',
                        key: 'id',
                    },
                },
                question: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            })
            .then(() => {
                return queryInterface.addIndex('questions', ['question']);
            });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('questions');
    },
};
