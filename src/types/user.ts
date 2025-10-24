/**
 * Geolocation coordinates
 */
export interface Geolocation {
  lat: string;
  long: string;
}

/**
 * User address information
 */
export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

/**
 * User name information
 */
export interface Name {
  firstname: string;
  lastname: string;
}

/**
 * User from Fake Store API
 */
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Login response with JWT token
 */
export interface LoginResponse {
  token: string;
}
