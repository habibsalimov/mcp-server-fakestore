/**
 * Winston logger configuration
 * @module utils/logger
 */

import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

/**
 * Custom log format
 */
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;

  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

/**
 * Winston logger instance
 * Console logging is disabled for MCP servers (stdio protocol)
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    // Console transport disabled for MCP stdio compatibility
    // Uncomment for development debugging (non-MCP mode):
    // new winston.transports.Console({
    //   format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    // }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

/**
 * Create logs directory if it doesn't exist
 */
import { existsSync, mkdirSync } from 'fs';
if (!existsSync('logs')) {
  mkdirSync('logs');
}
