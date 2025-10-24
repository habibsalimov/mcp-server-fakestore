/**
 * Axios client configuration for Fake Store API
 * @module api/client
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { logger } from '../utils/logger.js';

const BASE_URL = 'https://fakestoreapi.com';
const TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

/**
 * Create and configure Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for logging
 */
apiClient.interceptors.request.use(
  (config) => {
    logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logger.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for logging and error handling
 */
apiClient.interceptors.response.use(
  (response) => {
    logger.debug(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    // Retry logic
    const retryCount = (config as any).__retryCount || 0;

    if (retryCount < MAX_RETRIES) {
      (config as any).__retryCount = retryCount + 1;
      logger.warn(`Retrying request (${retryCount + 1}/${MAX_RETRIES}): ${config.url}`);

      // Exponential backoff
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      return apiClient(config);
    }

    logger.error('API Response Error:', {
      status: error.response?.status,
      message: error.message,
      url: config.url,
    });

    return Promise.reject(error);
  }
);
