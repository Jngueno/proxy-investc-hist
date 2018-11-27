const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * Set logs for http requests.
 */
const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
        }),
        new winston.transports.File({
            filename: 'var/logs/httpLogs.log',
            json: true,
            prettyPrint: true,
        }),
    ],
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
});

/**
 * Add stack for errors logs.
 */
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
        }),
    ],
});

module.exports = { requestLogger, errorLogger };
