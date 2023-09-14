const { format, createLogger, transports } = require('winston');
const {timestamp, combine, printf} = format;

const DEV_LOGGER_PATH = 'src/server/logger/logger_dev.log';

// Log format: TIMESTAMP LEVEL MESSAGE
const logFormat = printf(({ level, message, timestamp, stack}) => {
	return `${timestamp} ${level}: ${stack || message}`;
  });

  const logger_dev = createLogger({
	format: combine(
		format.colorize(),
		format.timestamp(),
		format.errors({stack: true}),
		logFormat),
	transports: [
	  new transports.Console({ level: 'debug' }), // Log 'debug' and higher to the console
	],
  });

module.exports = logger_dev;