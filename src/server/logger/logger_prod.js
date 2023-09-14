const { format, createLogger, transports } = require('winston');
const {timestamp, combine, printf} = format;

// Log format: JSON
const DEV_LOGGER_PATH = 'src/server/logger/logger_prod.log';
	const logger_prod = createLogger({
		format: combine(
		format.timestamp(),
		format.errors({stack: true}),
		format.json()
		),
	transports: [
	  new transports.Console({ level: 'info' }), // Log 'info' and higher to the console
	  new transports.File({ filename: DEV_LOGGER_PATH, level: 'info' }), // Log 'info' and higher to a file
	],
  });

module.exports = logger_prod;