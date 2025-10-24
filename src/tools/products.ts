/**
 * MCP tools for products
 * @module tools/products
 */

import { z } from 'zod';
import { productsAPI } from '../api/endpoints.js';
import { logger } from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Get all products tool
 */
export const getProductsTool = {
  name: 'fakestore_get_products',
  description: 'Get all products from Fake Store API with optional limit and sort',
  inputSchema: z.object({
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe('Maximum number of products to return'),
    sort: z.enum(['asc', 'desc']).optional().describe('Sort order: asc or desc'),
  }),
  async execute(args: { limit?: number; sort?: 'asc' | 'desc' }) {
    try {
      logger.info('Fetching products', args);
      const products = await productsAPI.getAll(args.limit, args.sort);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(products, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching products:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },
};

/**
 * Get single product by ID tool
 */
export const getProductTool = {
  name: 'fakestore_get_product',
  description: 'Get a single product by ID from Fake Store API',
  inputSchema: z.object({
    id: z.number().int().positive().describe('Product ID'),
  }),
  async execute(args: { id: number }) {
    try {
      logger.info('Fetching product', args);
      const product = await productsAPI.getById(args.id);

      if (!product) {
        throw new NotFoundError('Product', args.id);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(product, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching product:', error);
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },
};

/**
 * Get all product categories tool
 */
export const getCategoriesTool = {
  name: 'fakestore_get_categories',
  description: 'Get all product categories from Fake Store API',
  inputSchema: z.object({}),
  async execute() {
    try {
      logger.info('Fetching categories');
      const categories = await productsAPI.getCategories();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(categories, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching categories:', error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },
};

/**
 * Get products by category tool
 */
export const getProductsByCategoryTool = {
  name: 'fakestore_get_products_by_category',
  description: 'Get products filtered by category from Fake Store API',
  inputSchema: z.object({
    category: z.string().min(1).describe('Category name (e.g., electronics, jewelery)'),
  }),
  async execute(args: { category: string }) {
    try {
      logger.info('Fetching products by category', args);
      const products = await productsAPI.getByCategory(args.category);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(products, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error fetching products by category:', error);
      throw new Error(`Failed to fetch products by category: ${error.message}`);
    }
  },
};
