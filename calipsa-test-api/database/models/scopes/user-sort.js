'use strict';


module.exports = function orderBy(data) {
    if (!data) return { order: [['createdAt', 'DESC']] };

    let orderByColumn = 'id';
    const [orderKey, order = 'DESC'] = data;

    switch (orderKey) {
        case 'id':
            orderByColumn = [orderKey, order];
            break;
        case 'username':
            orderByColumn = [orderKey, order];
            break;
        default:
            break;
    }

    return {
        order: [orderByColumn],
    };
};
