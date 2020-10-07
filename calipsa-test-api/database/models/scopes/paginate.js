'use strict';

module.exports = function paginate(page, take) {
    const recordCount = (take || 20);

    return {
        offset: ((page || 1) - 1) * recordCount,
        limit: recordCount,
    };
};
