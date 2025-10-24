/**
 * Product rating information
 */
export interface Rating {
  rate: number;
  count: number;
}

/**
 * Product from Fake Store API
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

/**
 * Product category type
 */
export type ProductCategory =
  | 'electronics'
  | 'jewelery'
  | 'men\'s clothing'
  | 'women\'s clothing';

/**
 * Sort order for product listings
 */
export type SortOrder = 'asc' | 'desc';
