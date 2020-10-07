'use strict';


module.exports = function dateFilter(data) {
    if (!data) return {};

    return {
        where: {
            createdAt: {
                $between: [data.start_date, data.end_date],
            },
        },
    };
};
