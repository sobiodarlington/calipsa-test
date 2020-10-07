'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .createTable('users', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUID,
                },
                username: {
                    type: Sequelize.STRING(100),
                },
                email: {
                    type: Sequelize.STRING(100),
                    unique: true,
                },
                active: {
                    type: Sequelize.BOOLEAN,
                },
                password: {
                    type: Sequelize.STRING,
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
                return queryInterface.addIndex('users', ['email']);
            })
            .then(() => {
                return queryInterface.addIndex('users', ['username']);
            });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    },
};
