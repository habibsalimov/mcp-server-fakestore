/**
 * API client and endpoints tests
 */

import { productsAPI, cartsAPI, usersAPI } from '../src/api/endpoints';

describe('Products API', () => {
  test('should fetch all products', async () => {
    const products = await productsAPI.getAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('should fetch single product by ID', async () => {
    const product = await productsAPI.getById(1);
    expect(product).toHaveProperty('id', 1);
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });

  test('should fetch categories', async () => {
    const categories = await productsAPI.getCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  test('should fetch products by category', async () => {
    const products = await productsAPI.getByCategory('electronics');
    expect(Array.isArray(products)).toBe(true);
    expect(products.every((p) => p.category === 'electronics')).toBe(true);
  });
});

describe('Carts API', () => {
  test('should fetch all carts', async () => {
    const carts = await cartsAPI.getAll();
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length).toBeGreaterThan(0);
  });

  test('should fetch single cart by ID', async () => {
    const cart = await cartsAPI.getById(1);
    expect(cart).toHaveProperty('id', 1);
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('products');
  });

  test('should fetch carts by user ID', async () => {
    const carts = await cartsAPI.getByUserId(1);
    expect(Array.isArray(carts)).toBe(true);
  });
});

describe('Users API', () => {
  test('should fetch all users', async () => {
    const users = await usersAPI.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test('should fetch single user by ID', async () => {
    const user = await usersAPI.getById(1);
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
  });
});
