import winston from 'winston';

const logger = process.env.NODE_ENV !== 'test' ?
  new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: process.env.LOG_LEVEL || 'debug',
        colorize: false,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: process.env.NODE_ENV === 'production',
        stringify: process.env.NODE_ENV === 'production',
        timestamp: true,
      }),
    ],
  }) :
  {
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
/**
 * Usage:
 * logger.info(‘my log’);
 * logger.warn(‘my warn’);
 * logger.error(‘error’);
 */
export default logger;

