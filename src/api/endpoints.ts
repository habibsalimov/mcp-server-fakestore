/**
 * Fake Store API endpoints
 * @module api/endpoints
 */

import { apiClient } from './client.js';
import { cache } from './cache.js';
import { Product, SortOrder, Cart, User } from '../types/index.js';

/**
 * Products API
 */
export const productsAPI = {
  /**
   * Get all products
   */
  async getAll(limit?: number, sort?: SortOrder): Promise<Product[]> {
    const cacheKey = `products_${limit || 'all'}_${sort || 'none'}`;
    const cached = cache.get<Product[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const params: any = {};
    if (limit) params.limit = limit;
    if (sort) params.sort = sort;

    const response = await apiClient.get<Product[]>('/products', { params });
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get single product by ID
   */
  async getById(id: number): Promise<Product> {
    const cacheKey = `product_${id}`;
    const cached = cache.get<Product>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Product>(`/products/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<string[]> {
    const cacheKey = 'categories';
    const cached = cache.get<string[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<string[]>('/products/categories');
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get products by category
   */
  async getByCategory(category: string): Promise<Product[]> {
    const cacheKey = `products_category_${category}`;
    const cached = cache.get<Product[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Product[]>(`/products/category/${category}`);
    cache.set(cacheKey, response.data);
    return response.data;
  },
};

/**
 * Carts API
 */
export const cartsAPI = {
  /**
   * Get all carts
   */
  async getAll(limit?: number, sort?: SortOrder): Promise<Cart[]> {
    const cacheKey = `carts_${limit || 'all'}_${sort || 'none'}`;
    const cached = cache.get<Cart[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const params: any = {};
    if (limit) params.limit = limit;
    if (sort) params.sort = sort;

    const response = await apiClient.get<Cart[]>('/carts', { params });
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get single cart by ID
   */
  async getById(id: number): Promise<Cart> {
    const cacheKey = `cart_${id}`;
    const cached = cache.get<Cart>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Cart>(`/carts/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get carts by user ID
   */
  async getByUserId(userId: number): Promise<Cart[]> {
    const cacheKey = `carts_user_${userId}`;
    const cached = cache.get<Cart[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Cart[]>(`/carts/user/${userId}`);
    cache.set(cacheKey, response.data);
    return response.data;
  },
};

/**
 * Users API
 */
export const usersAPI = {
  /**
   * Get all users
   */
  async getAll(limit?: number): Promise<User[]> {
    const cacheKey = `users_${limit || 'all'}`;
    const cached = cache.get<User[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const params: any = {};
    if (limit) params.limit = limit;

    const response = await apiClient.get<User[]>('/users', { params });
    cache.set(cacheKey, response.data);
    return response.data;
  },

  /**
   * Get single user by ID
   */
  async getById(id: number): Promise<User> {
    const cacheKey = `user_${id}`;
    const cached = cache.get<User>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await apiClient.get<User>(`/users/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  },
};
