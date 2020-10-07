'use strict';


module.exports = function userExists(data) {
    if (!data) return {};

    return {
        where: {
            $or: {
                email: { $eq: data.email },
                username: { $eq: data.username },
            },
        },
    };
};
