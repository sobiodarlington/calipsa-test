'use strict';

/**
 * @description ### Returns Go / Lua like responses when used with await
 *
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.all([req1, req2, req3])
 * - Example response [ [data1, data2, data3], undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.race([req1, req2, req3])
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 * @param {Promise} promise
 * @returns {Promise} [ data, undefined ]
 * @returns {Promise} [ undefined, Error ]
 */

module.exports = promise => promise
    .then((data) => {
        if (data instanceof Error) return [undefined, data];

        return [data, undefined];
    })
    .catch((error) => {
        const err = (!error.errors ? error : error.errors);

        return Promise.resolve([
            undefined,
            err,
        ]);
    });
