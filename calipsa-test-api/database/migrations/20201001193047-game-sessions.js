'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('game_sessions', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID,
            },
            hostPlayerId: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            secondPlayerId: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            requestStatus: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('game_sessions');
    },
};
