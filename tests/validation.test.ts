/**
 * Validation tests
 */

import {
  productIdSchema,
  productQuerySchema,
  categorySchema,
  cartIdSchema,
  userIdSchema,
} from '../src/utils/validation';

describe('Validation Schemas', () => {
  test('productIdSchema should validate valid product ID', () => {
    expect(() => productIdSchema.parse({ id: 1 })).not.toThrow();
  });

  test('productIdSchema should reject invalid product ID', () => {
    expect(() => productIdSchema.parse({ id: -1 })).toThrow();
    expect(() => productIdSchema.parse({ id: 0 })).toThrow();
  });

  test('productQuerySchema should validate valid query params', () => {
    expect(() => productQuerySchema.parse({ limit: 10, sort: 'asc' })).not.toThrow();
    expect(() => productQuerySchema.parse({})).not.toThrow();
  });

  test('productQuerySchema should reject invalid query params', () => {
    expect(() => productQuerySchema.parse({ limit: -1 })).toThrow();
    expect(() => productQuerySchema.parse({ limit: 101 })).toThrow();
    expect(() => productQuerySchema.parse({ sort: 'invalid' })).toThrow();
  });

  test('categorySchema should validate valid category', () => {
    expect(() => categorySchema.parse({ category: 'electronics' })).not.toThrow();
  });

  test('categorySchema should reject empty category', () => {
    expect(() => categorySchema.parse({ category: '' })).toThrow();
  });

  test('cartIdSchema should validate valid cart ID', () => {
    expect(() => cartIdSchema.parse({ id: 1 })).not.toThrow();
  });

  test('userIdSchema should validate valid user ID', () => {
    expect(() => userIdSchema.parse({ id: 1, userId: 1 })).not.toThrow();
  });
});
