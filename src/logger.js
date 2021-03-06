import winston from 'winston';

export const log = process.env.NODE_ENV !== 'test' ?
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
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };

