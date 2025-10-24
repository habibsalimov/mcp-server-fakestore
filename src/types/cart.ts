/**
 * Item in a shopping cart
 */
export interface CartItem {
  productId: number;
  quantity: number;
}

/**
 * Shopping cart from Fake Store API
 */
export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

/**
 * Cart creation/update payload
 */
export interface CartPayload {
  userId: number;
  date: string;
  products: CartItem[];
}
