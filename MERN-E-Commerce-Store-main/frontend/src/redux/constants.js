// Use environment variable for API URL, or relative URL if on same domain
// In production on Render, frontend and backend are on same domain, so use relative URL
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If in production and no VITE_API_URL set, use relative URL (same domain)
  if (import.meta.env.PROD) {
    return ""; // Empty string means relative URL (same domain)
  }
  // Development fallback
  return "http://localhost:5000";
};

export const BASE_URL = getBaseUrl();
export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
