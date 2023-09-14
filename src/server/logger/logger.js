const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, json } = format;

const DEV_LOGGER_PATH = process.env.DEV_LOGGER_PATH || 'src/server/logger/logger_dev.log';
const PROD_LOGGER_PATH = process.env.PROD_LOGGER_PATH || 'src/server/logger/logger_prod.log';

// Define log levels for prod and dev
const devLogLevel = 'debug';
const prodLogLevel = 'info';

// custom format for dev
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? prodLogLevel : devLogLevel,
  format: combine(
    timestamp(),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: devLogLevel,
      format: combine(
        timestamp(),
        format.colorize(),
        logFormat
      ),
    }),
    new transports.File({
      filename: process.env.NODE_ENV === 'production' ? PROD_LOGGER_PATH : DEV_LOGGER_PATH,
      level: process.env.NODE_ENV === 'production' ? prodLogLevel : devLogLevel,
      format: combine(
        timestamp(),
        logFormat
      ),
      maxsize: 10485760, // limit log file to 10 MB 
      maxFiles: 3,       // limit backup log files to 3
    }),
  ],
});

// Log format for PRODUCTION: JSON
if (process.env.NODE_ENV === 'production') {
  logger.add(
    new transports.File({
      filename: PROD_LOGGER_PATH,
      level: prodLogLevel,
      format: combine(
        timestamp(),
        json()
      ),
      maxsize: 10485760, // limit log file to 10 MB 
      maxFiles: 3,       // limit backup log files to 3
    })
  );
}

module.exports = logger;
