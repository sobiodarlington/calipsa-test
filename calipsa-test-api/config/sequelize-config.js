'use strict';

const { connections: conns } = require('./database');

module.exports = {
    local: {
        username: conns.defaultConnection.username,
        password: conns.defaultConnection.password,
        database: conns.defaultConnection.database,
        host: conns.defaultConnection.options.host,
        dialect: conns.defaultConnection.options.dialect,
        operatorsAliases: conns.defaultConnection.options.operatorsAliases,
    },
    development: {
        username: conns.defaultConnection.username,
        password: conns.defaultConnection.password,
        database: conns.defaultConnection.database,
        host: conns.defaultConnection.options.host,
        dialect: conns.defaultConnection.options.dialect,
        operatorsAliases: conns.defaultConnection.options.operatorsAliases,
    },
    test: {
        username: conns.defaultConnection.username,
        password: conns.defaultConnection.password,
        database: conns.defaultConnection.database,
        host: conns.defaultConnection.options.host,
        dialect: conns.defaultConnection.options.dialect,
        operatorsAliases: conns.defaultConnection.options.operatorsAliases,
        logging: false,
    },
    production: {
        username: conns.defaultConnection.username,
        password: conns.defaultConnection.password,
        database: conns.defaultConnection.database,
        host: conns.defaultConnection.options.host,
        dialect: conns.defaultConnection.options.dialect,
        operatorsAliases: conns.defaultConnection.options.operatorsAliases,
    },
};
