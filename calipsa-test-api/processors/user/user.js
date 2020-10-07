'use strict';

const {
    ResourceReadFailedError,
    ResourceCreationFailedError,
    ResourceNotFoundError,
    UserAlreadyExistsError,
    AuthenticationError,
} = require('../../exceptions');
const to = require('../../utils/await-to');
const errorCodes = require('../../config/error-codes');
const BaseProcessor = require('../base-processor');


class UserProcessor extends BaseProcessor {
    constructor({ User }) {
        super();

        this.User = User;
    }

    async getById(params) {
        const query = {
            where: { id: params },
        };

        const [user, err] = await to(this.User.findOne(query));

        if (err) {
            throw new ResourceReadFailedError(
                'Error fetxhing user details',
                err,
                errorCodes.ADMIN_RECORD_NOT_FOUND,
            );
        } else if (!user) {
            throw new ResourceNotFoundError(
                'User details not found',
                null,
                errorCodes.USER_DOES_NOT_EXIST,
            );
        }

        return user;
    }

    async getProfile(data) {
        const scopes = [...this.resolveIncludes(data.include)];
        const query = {
            where: { id: data.id },
        };

        const [user, err] = await to(this.User.scope(...scopes).findOne(query));

        if (err) {
            throw new ResourceReadFailedError(
                'User details not found',
                err,
                errorCodes.RECORD_QUERY_ERR,
            );
        } else if (!user) {
            throw new ResourceNotFoundError(
                'User details not found',
                null,
                errorCodes.USER_DOES_NOT_EXIST,
            );
        }

        return user.get({ plain: true });
    }

    async getUsers(data) {
        const scopes = this.resolveSharedScopes(data);
        const [users, err] = await to(
            this.User.scope(scopes).findAndCountAll(),
        );

        if (err) {
            throw new ResourceReadFailedError(
                'Player data could not be fetched',
                err,
                errorCodes.USER_DOES_NOT_EXIST,
            );
        }

        return { users: users.rows, total: users.count };
    }

    createUser({ jwtSign }) {
        return async (user) => {
            // Throws
            await this.checkIfAccountExists(user);

            const [newUser, newUserErr] = await to(this.User.create(user));

            if (newUserErr) {
                throw new ResourceCreationFailedError(
                    null,
                    newUserErr,
                    errorCodes.USER_ALREADY_EXISTS,
                );
            }

            delete newUser.password;

            const token = await this.generateUserToken({ jwtSign })(newUser);

            return { token, user: newUser };
        };
    }

    async checkIfAccountExists(data) {
        const [user, err] = await to(
            this.User.scope({ method: ['userExists', data] }).findOne({
                attributes: ['email', 'username'],
            }),
        );

        if (err) {
            throw new ResourceReadFailedError(
                'Error creating user',
                err,
                errorCodes.RECORD_QUERY_ERR,
            );
        }

        let errMsg = '';
        let errorCode = null;

        if (user && data.email === user.email) {
            errorCode = errorCodes.EMAIL_ALREADY_EXISTS;
            errMsg = 'Existing email supplied';
        } else if (user && data.username === user.username) {
            errorCode = errorCodes.USERNAME_ALREADY_EXISTS;
            errMsg = 'Existing username supplied';
        }

        if (errMsg.length) {
            throw new UserAlreadyExistsError(errMsg, null, errorCode);
        }

        return false;
    }

    login({ jwtSign, bcrypt }) {
        return async (params) => {
            const query = {
                where: {
                    email: params.email,
                },
                attributes: [
                    'id',
                    'username',
                    'email',
                    'password',
                ],
            };

            const [user, err] = await to(this.User.findOne(query));

            if (err) {
                throw new ResourceReadFailedError(
                    'error getting user data',
                    err,
                    500,
                );
            }

            if (
                !user
                || !bcrypt.compareSync(params.password, user.password || '')
            ) {
                throw new AuthenticationError('Incorrect login credentials');
            }

            delete user.password;

            const token = await this.generateUserToken({ jwtSign })(user);

            return { token, user };
        };
    }

    generateUserToken({ jwtSign }) {
        return async (user) => {
            const token = jwtSign(user.get({ plain: true }));

            return token;
        };
    }
}

module.exports = UserProcessor;
