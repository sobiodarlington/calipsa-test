'use strict';


module.exports = function filter(term, include = []) {
    if (!term) return {};

    const filterTerm = `%${term}%`;
    const filterObj = {
        username: { $iLike: filterTerm },
        email: { $iLike: filterTerm },
    };

    return {
        where: {
            $or: filterObj,
        },
    };
};
