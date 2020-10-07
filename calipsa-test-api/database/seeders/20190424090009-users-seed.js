'use strict';

const uuid = require('uuidv4');
const bcrypt = require('bcrypt');


module.exports = {
    up: (queryInterface) => {
        const users = [
            {
                id: uuid(),
                username: 'playerone',
                email: 'playerone@gmail.com',
                password: bcrypt.hashSync('playerone', 8),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuid(),
                username: 'playertwo',
                email: 'playertwo@gmail.com',
                password: bcrypt.hashSync('playertwo', 8),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return queryInterface.bulkInsert('users', users, {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
