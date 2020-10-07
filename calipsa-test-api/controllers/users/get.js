'use strict';


module.exports = {
    getById({ getUserById }) {
        return async ({ params }) => {
            const user = await getUserById(params);

            return {
                responseCode: 1,
                statusCode: 200,
                data: user,
            };
        };
    },
    get({ getUsers }) {
        return async ({ query }) => {
            const users = await getUsers(query);

            return {
                responseCode: 1,
                statusCode: 200,
                data: users,
            };
        };
    },
};
