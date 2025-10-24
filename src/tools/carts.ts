/**
 * MCP tools for carts
 * @module tools/carts
 */

import { z } from 'zod';
import { cartsAPI } from '../api/endpoints.js';
import { logger } from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Get all carts tool
 */
export const getCartsTool = {
  name: 'fakestore_get_carts',
  description: 'Get all shopping carts from Fake Store API with optional limit and sort',
  inputSchema: z.object({
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe('Maximum number of carts to return'),
    sort: z.enum(['asc', 'desc']).optional().describe('Sort order: asc or desc'),
  }),
  async execute(args: { limit?: number; sort?: 'asc' | 'desc' }) {
    try {
      logger.info('Fetching carts', args);
      const carts = await cartsAPI.getAll(args.limit, args.sort);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(carts, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching carts:', error);
      throw new Error(`Failed to fetch carts: ${error.message}`);
    }
  },
};

/**
 * Get single cart by ID tool
 */
export const getCartTool = {
  name: 'fakestore_get_cart',
  description: 'Get a single shopping cart by ID from Fake Store API',
  inputSchema: z.object({
    id: z.number().int().positive().describe('Cart ID'),
  }),
  async execute(args: { id: number }) {
    try {
      logger.info('Fetching cart', args);
      const cart = await cartsAPI.getById(args.id);

      if (!cart) {
        throw new NotFoundError('Cart', args.id);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(cart, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching cart:', error);
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  },
};

/**
 * Get carts by user ID tool
 */
export const getUserCartsTool = {
  name: 'fakestore_get_user_carts',
  description: 'Get all shopping carts for a specific user from Fake Store API',
  inputSchema: z.object({
    userId: z.number().int().positive().describe('User ID'),
  }),
  async execute(args: { userId: number }) {
    try {
      logger.info('Fetching user carts', args);
      const carts = await cartsAPI.getByUserId(args.userId);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(carts, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching user carts:', error);
      throw new Error(`Failed to fetch user carts: ${error.message}`);
    }
  },
};
