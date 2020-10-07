'use strict';

const _ = require('lodash');
const url = require('url');
const moment = require('moment');


module.exports = {
    ..._,
    formatDate(date) {
        const d = new Date(date);
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = `0${month}`;
        if (day.length < 2) day = `0${day}`;

        return [day, month, year].join('-');
    },

    imagePathFromUrl(u) {
        const parsedUrl = url.parse(u).pathname || '';

        return parsedUrl.replace(/^\//, '');
    },

    todayDate() {
        return moment().format('YYYY-MM-DD hh:mm:ss');
    },

    isSameMonth(date) {
        if (!date) return false;

        const a = +moment().format('MM');
        const b = +moment(date).format('MM');

        return a === b;
    },

    thisMonth() {
        return moment().format('MM');
    },

    removeListeners(io, sessionId) {
        io.off(`${sessionId}:request`);
        io.off(`${sessionId}:message`);
    },
};
