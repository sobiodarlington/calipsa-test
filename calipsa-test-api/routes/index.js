'use strict';

const express = require('express');
const apiRoutes = require('./v1/index');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { title: process.env.APP_NAME });
});

router.use('/v1', apiRoutes);

module.exports = router;
