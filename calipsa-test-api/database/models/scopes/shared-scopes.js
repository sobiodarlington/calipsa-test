
'use strict';

module.exports = {
    defaultScope(include, exclude) {
        const inc = !Array.isArray(include) ? [] : include;
        const exc = !Array.isArray(exclude) ? [] : exclude;

        return {
            attributes: {
                include: [...inc],
                exclude: ['createdAt', 'updatedAt', 'deletedAt', ...exc],
            },
        };
    },
    defaultScope2(include, exclude) {
        const inc = !Array.isArray(include) ? [] : include;
        const exc = !Array.isArray(exclude) ? [] : exclude;

        return {
            attributes: {
                include: [...inc],
                exclude: ['updatedAt', 'deletedAt', 'password', ...exc],
            },
        };
    },
    orderBy(data) {
        if (!data) return { order: [['createdAt', 'DESC']] };

        let orderByColumn = 'id';
        const [orderKey, order = 'DESC'] = data;

        switch (orderKey) {
            case 'id':
                orderByColumn = [orderKey, order];
                break;
            default:
                break;
        }

        return {
            order: [orderByColumn],
        };
    },
    active: {
        where: {
            active: true,
        },
    },
};
