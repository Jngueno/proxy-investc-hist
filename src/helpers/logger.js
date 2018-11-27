const winston = require('winston');

winston.emitErrs = true;

/**
 * Util for logging any data on var/allLogs or console.
 */
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            filename: './var/logs/allLogs.log',
            handleExceptions: true,
            json: true,
            colorize: false,
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
