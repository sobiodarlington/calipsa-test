'use strict';

const Sequelize = require('sequelize');
const { MalformedInputError } = require('../exceptions');
const scopesMappings = require('../database/models/scopes/scopes');


class BaseProcessor {
    resolveIncludes(include, data = null) {
        if (!include) return [];

        const tmpScopes = [];
        const scopes = scopesMappings(data);

        include.forEach((v) => {
            if (v in scopes) tmpScopes.push(scopes[v]);
        });

        return tmpScopes;
    }

    resolveSharedScopes(data, includeWhereCond = true, includeDefault = true) {
        let scopes = [];
        const { page, limit, filter, include, order } = data;

        if (includeDefault === true) scopes.push('defaultScope');
        if (includeWhereCond === true) scopes.push({ method: ['whereCond', data] });

        scopes = [
            ...scopes,
            ...this.resolveIncludes(include, data),
        ];

        if (includeDefault) scopes.push({ method: ['orderBy', order] });

        if (filter) scopes.push({ method: ['filter', filter, include] });
        if (page) scopes.push({ method: ['paginate', page, limit] });

        return scopes;
    }

    async handleFKError(err, keys) {
        if (Array.isArray(err)
            && err[0] instanceof Sequelize.ValidationErrorItem) {
            return;
        }

        for (const obj of keys) {
            const [k, msg, code = null] = obj;

            if (err instanceof Sequelize.ForeignKeyConstraintError) {
                if (err.index.includes(k)) {
                    throw new MalformedInputError(msg, err, code);
                }
            }
        }
    }
}

module.exports = BaseProcessor;
