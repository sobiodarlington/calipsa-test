'use strict';

const bcrypt = require('bcrypt');
const { sharedScopes, paginate, userFilter: filter } = require('./scopes');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Existing email supplied',
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Existing username supplied',
                },
            },
            password: {
                type: DataTypes,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            defaultScope: sharedScopes.defaultScope(null, ['password']),
            scopes: {
                paginate,
                filter,
                userExists(data) {
                    return {
                        where: {
                            $or: {
                                email: { $eq: data.email },
                                username: { $eq: data.username },
                            },
                        },
                    };
                },
                active: sharedScopes.active,
            },
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            tableName: 'users',
            timestamps: true,
            paranoid: true,
        },
    );

    User.associate = (models) => {
        User.options.scopes.orderBy = (data) => {
            if (!data) return { order: [['createdAt', 'DESC']] };
        };

        User.options.scopes.whereCond = (data) => {
            const cond = {};

            if (data.id) cond.id = data.id;
            if (data.email) cond.email = data.email;
            if (data.username) cond.username = data.username;
            if (data.active) cond.active = data.active;

            return {
                where: cond,
            };
        };

        User.beforeCreate((user, options) => {
            if (!user.password) return;

            const hashedPassword = bcrypt.hashSync(user.password, 8);

            user.password = hashedPassword;
        });
    };

    return User;
};
