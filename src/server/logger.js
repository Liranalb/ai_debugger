const winston = require('winston');
const {timestamp, combine, printf} = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
  });

const logLevels = {
	error: 'error',
	warn: 'warn',
	info: 'info',
	debug: 'debug'
  };

const logger = winston.createLogger({
	levels: logLevels,
	format: combine(timestamp(),logFormat),
	transports: [
		new winston.transports.Console({ level: 'info' }), // Log to the console
		new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log a file
		new winston.transports.File({ filename: 'combined.log' }), // Log all levels to a file
	],
});



module.exports = logger;