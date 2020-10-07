'use strict';

const path = require('path');
const winston = require('winston');
const config = require('../config');

function LogException(message) {
    this.message = message;
    this.name = 'LogException';
}

const isProduction = process.env.NODE_ENV === config.APP_ENV.PROD;
const LEVELS = {
    INFO: 'info',
    ERROR: 'info',
    DEBUG: 'DEBUG',
};

class Logger {
    constructor(options) {
        if (Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = this;

        this.init(options);

        return this;
    }

    info(message, meta = {}) {
        this.log(message, LEVELS.INFO, meta);
    }

    error(message, meta = {}) {
        this.log(message, LEVELS.ERROR, meta);
    }

    log(message, level = LEVELS.INFO, meta = {}) {
        if (process.env.APP_DEBUG === 'true') {
            if (process.env.NODE_ENV !== config.APP_ENV.LOCAL) {
                console[level](`[LOG:${level.toUpperCase()}]`, message);
            } else {
                console.dir(message, { depth: 4 });
            }
        }
    }

    init(options) {
        const transports = [];

        if (options.console) {
            if (options.console.enabled !== false) {
                const op1 = new winston.transports.Console({
                    enabled: options.console.enabled || true,
                    name: options.console.name || 'console',
                    level: options.console.level || 'info',
                    handleExceptions: options.console.handleException || true,
                    json: options.console.json || true,
                });
                transports.push(op1);
            }
        }

        if (options.file) {
            if (!options.file.filename) {
                throw new LogException(
                    'filename option is required for file logging',
                );
            }

            if (options.file.enabled !== false) {
                const op2 = new winston.transports.File({
                    name: options.file.name || 'file',
                    level: options.file.level || 'info',
                    filename: options.file.filename,
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5,
                    colorize: false,
                });

                transports.push(op2);
            }
        }

        this.winstonLogObj = winston.createLogger({
            format: winston.format.combine(
                enumerateErrorFormat(),
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.colorize(),
            ),
            transports,
        });
    }

    disableTransportByName(transportName) {
        this.winstonLogObj.remove(transportName);
    }
}

const enumerateErrorFormat = winston.format((info) => {
    if (info.message instanceof Error) {
        info.message = Object.assign({
            message: info.message.message,
            stack: info.message.stack,
        }, info.message);
    }

    if (info instanceof Error) {
        return Object.assign({
            message: info.message,
            stack: info.stack,
        }, info);
    }

    return info;
});

module.exports = new Logger({
    console: {
        enabled: false,
        // process.env.APP_DEBUG === 'true',
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    file: {
        level: 'info',
        enabled: process.env.ERROR_LOGGING === 'file',
        filename: `${path.resolve('./storage/logs/errors.log')}`,
    },
});
