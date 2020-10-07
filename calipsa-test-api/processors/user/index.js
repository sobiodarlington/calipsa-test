'use strict';

const bcrypt = require('bcrypt');
const { models, Op, transaction } = require('../../database/models');
const UserProcessor = require('./user');
const jwtSign = require('../jwt-sign');


const processor = new UserProcessor({ User: models.User, Op });


module.exports = {
    getUsers: processor.getUsers.bind(processor),
    getUserById: processor.getById.bind(processor),
    createUser: processor.createUser({ jwtSign }),
    login: processor.login({ jwtSign, bcrypt }),
};
