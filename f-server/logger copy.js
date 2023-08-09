// const { createLogger, transports, format } = require('winston');
import { createLogger, transports, format } from 'winston'

import DailyRotateFile from "winston-daily-rotate-file"
const config = require(“config”);

const logFormat = winston.format.combine(
 winston.format.colorize(),
 winston.format.timestamp(),
 winston.format.align(),
 winston.format.printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`,
),);

const transport = new DailyRotateFile({
  filename: config.get(“logConfig.logFolder”) +      config.get(“logConfig.logFile”),
  datePattern: ‘YYYY-MM-DD-HH’,
  zippedArchive: true,
  maxSize: ‘20m’,
  maxFiles: ‘14d’,
  prepend: true,
 level: config.get(“logConfig.logLevel”),
 });
 transport.on(‘rotate’, function (oldFilename, newFilename) {
 // call function like upload to s3 or on cloud
 });
//  ******************

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
  return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
}))

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({level: 'silly'}),
    new transports.File({ filename: './log/app.log', level: 'info'})
  ]
});

export default logger;