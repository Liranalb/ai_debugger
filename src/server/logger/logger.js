const winston = require('winston');
const {timestamp, combine, printf} = winston.format;

const ERROR_LOGGER_PATH = 'src/server/logger/error.log';
const COMBINED_LOGGER_PATH = 'src/server/logger/combined.log';

// Log format: TIMESTAMP LEVEL MESSAGE
const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
  });

const logLevels = {
	error: 'error',
	warning: 'warning',
	info: 'info',
	debug: 'debug'
  };

  const logger = winston.createLogger({
	levels: logLevels,
	format: combine(timestamp(),logFormat),
	transports: [
	  new winston.transports.Console({ level: 'warning' }), // Log 'warning' and higher to the console
	  new winston.transports.File({ filename: ERROR_LOGGER_PATH, level: 'error' }), // Log 'error' and higher to a file
	  new winston.transports.File({ filename: COMBINED_LOGGER_PATH, level: 'warning' }), // Log 'warn' and higher to a file
	],
  });

module.exports = logger;