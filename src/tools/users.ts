/**
 * MCP tools for users
 * @module tools/users
 */

import { z } from 'zod';
import { usersAPI } from '../api/endpoints.js';
import { logger } from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Get all users tool
 */
export const getUsersTool = {
  name: 'fakestore_get_users',
  description: 'Get all users from Fake Store API with optional limit',
  inputSchema: z.object({
    limit: z.number().int().positive().max(100).optional().describe('Maximum number of users to return'),
  }),
  async execute(args: { limit?: number }) {
    try {
      logger.info('Fetching users', args);
      const users = await usersAPI.getAll(args.limit);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(users, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching users:', error);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },
};

/**
 * Get single user by ID tool
 */
export const getUserTool = {
  name: 'fakestore_get_user',
  description: 'Get a single user by ID from Fake Store API',
  inputSchema: z.object({
    id: z.number().int().positive().describe('User ID'),
  }),
  async execute(args: { id: number }) {
    try {
      logger.info('Fetching user', args);
      const user = await usersAPI.getById(args.id);

      if (!user) {
        throw new NotFoundError('User', args.id);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(user, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching user:', error);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },
};
