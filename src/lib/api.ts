import type { Order, Product, User } from '@/lib/types';
import { transformProduct } from '@/lib/utils';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9002';
const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API call failed with status ${response.status}`);
  }
  return response.json();
}

// Auth
export const getAuthUser = async (token: string): Promise<User> => {
  const response = await fetch(`${apiBaseUrl}/api/${storeId}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return handleResponse<User>(response);
};

// Products
export const getProducts = async (): Promise<Product[]> => {
    const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';
    const response = await fetch(`${apiBaseUrl}/api/${storeId}/products?businessType=${businessType}`, { cache: 'no-store' });
    const rawProducts = await handleResponse<any[]>(response);
    if (!Array.isArray(rawProducts)) return [];
    return rawProducts.map(transformProduct);
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';
    const response = await fetch(`${apiBaseUrl}/api/${storeId}/products/${slug}?businessType=${businessType}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const rawProduct = await handleResponse<any>(response);
    if (!rawProduct) return null;
    return transformProduct(rawProduct);
};

// Orders
export const getOrders = async (token: string): Promise<Order[]> => {
    const response = await fetch(`${apiBaseUrl}/api/${storeId}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse<Order[]>(response);
};

export const placeOrder = async ({ items, total, shippingInfo, token }: { items: any[], total: number, shippingInfo: any, token: string }) => {
    const response = await fetch(`${apiBaseUrl}/api/${storeId}/orders`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items, total, shippingInfo })
    });
    return handleResponse(response);
};
