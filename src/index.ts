#!/usr/bin/env node

/**
 * Entry point for MCP Server
 * @module index
 */

import { startServer } from './server.js';
import { logger } from './utils/logger.js';

/**
 * Main function
 */
async function main() {
  try {
    await startServer();
  } catch (error: any) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the server
main();
