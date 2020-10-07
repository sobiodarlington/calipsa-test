'use strict';


module.exports = {
    login({ login }) {
        return async ({ body }) => {
            const data = await login(body.auth);

            return {
                responseCode: 1,
                statusCode: 200,
                data,
            };
        };
    },

    create({ createUser }) {
        return async ({ body }) => {
            const userData = body.user;
            const newUser = await createUser(userData);

            return {
                responseCode: 1,
                statusCode: 201,
                data: newUser,
            };
        };
    },
};
