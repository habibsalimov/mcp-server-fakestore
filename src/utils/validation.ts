/**
 * Zod validation schemas
 * @module utils/validation
 */

import { z } from 'zod';

/**
 * Product ID validation schema
 */
export const productIdSchema = z.object({
  id: z.number().int().positive(),
});

/**
 * Product query parameters schema
 */
export const productQuerySchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  sort: z.enum(['asc', 'desc']).optional(),
});

/**
 * Product category schema
 */
export const categorySchema = z.object({
  category: z.string().min(1),
});

/**
 * Cart ID validation schema
 */
export const cartIdSchema = z.object({
  id: z.number().int().positive(),
});

/**
 * Cart query parameters schema
 */
export const cartQuerySchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  sort: z.enum(['asc', 'desc']).optional(),
});

/**
 * User ID validation schema
 */
export const userIdSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
});

/**
 * User query parameters schema
 */
export const userQuerySchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
});

/**
 * Validate data against schema
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
