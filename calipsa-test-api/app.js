'use strict';

/* eslint-disable import/order */
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const ExpressResTransformer = require('./utils/request-handler');

const app = express();

// We need just one logger for the whole of the system,
// discouraging the use of default console so we can clean
// up on production environment.
global._console = require('./utils/logger');


// routes
const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(`${__dirname}/public/favicon.png`));
app.use('/public', express.static(`${__dirname}/public`));
app.use('/storage', express.static(`${__dirname}/storage`));


app.use(logger('dev'));
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ extended: false, limit: '3mb' }));
app.use(cookieParser());
app.use(compression());

app.use(cors());
app.use('/', indexRouter);

app.use((err, req, res, next) => {
    ExpressResTransformer.handleAppExceptions(err, res);
    ExpressResTransformer.logErrors(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;
