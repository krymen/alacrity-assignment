import { Format } from 'logform';
import { createLogger as createWinstonLogger, format, transports } from 'winston';

const formatters: Format[] = [
  format.timestamp(),
  format.align(),
  format.splat(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
];
const devFormatters: Format[] = [
  format.colorize(),
  ...formatters
];

export const createLogger = (isDev: boolean = false) =>
  createWinstonLogger({
    format: isDev ? format.combine(...devFormatters) : format.combine(...formatters),
    transports: [new transports.Console()]
  });
