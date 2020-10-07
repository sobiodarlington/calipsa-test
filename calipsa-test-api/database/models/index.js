'use strict';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const { connections } = require('../../config/database');

const { defaultConnection } = connections;
const basename = path.basename(__filename);
const namespace = cls.createNamespace('calipsa-test-api');
const DB = {};

Sequelize.useCLS(namespace);

const sequelizeInit = new Sequelize(
    defaultConnection.database,
    defaultConnection.username,
    defaultConnection.password,
    defaultConnection.options,
);

fs.readdirSync(__dirname).filter((file) => {
    return ((file.indexOf('.') !== 0)
        && (file !== basename)
        && (file.slice(-3) === '.js')
    );
}).forEach((file) => {
    const model = require(path.join(__dirname, file))(
        sequelizeInit,
        Sequelize.DataTypes,
    );

    DB[model.name] = model;
});

Object.keys(DB).forEach((modelName) => {
    if (DB[modelName].associate) {
        DB[modelName].associate(DB);
    }
});

module.exports = {
    models: DB,
    sequelize: sequelizeInit,
    transaction: sequelizeInit.transaction.bind(sequelizeInit),
    Op: Sequelize.Op,
};
