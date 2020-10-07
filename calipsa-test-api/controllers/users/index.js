'use strict';

const { get, getById } = require('./get');
const { create, login } = require('./post');
const userProcessor = require('../../processors/user');

module.exports = {
    get: get({ getUsers: userProcessor.getUsers }),
    getById: getById({ getUserById: userProcessor.getUserById }),
    create: create({ createUser: userProcessor.createUser }),
    auth: login({ login: userProcessor.login }),
};
