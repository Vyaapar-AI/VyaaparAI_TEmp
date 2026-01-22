'use server';

import { z } from 'zod';
import { products } from './products';
import type { CartItem, Order } from './types';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is too short'),
  postalCode: z.string().min(4, 'Postal code is too short'),
  cart: z.string()
});

export type CheckoutFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    address?: string[];
    city?: string[];
    postalCode?: string[];
    cart?: string[];
  };
  order?: Order;
};

export async function checkoutAction(
  prevState: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const validatedFields = checkoutSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.data) {
    return { message: "Invalid form data" };
  }
  
  const { name, email } = validatedFields.data;
  let cartItems: CartItem[] = [];
  try {
    cartItems = JSON.parse(validatedFields.data.cart);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { message: "Your cart is empty." };
    }
  } catch (e) {
    return { message: "Invalid cart data." };
  }

  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const order: Order = {
    id: `order_${new Date().getTime()}`,
    date: new Date().toISOString(),
    items: cartItems,
    total: total,
    customer: {
      name,
      email,
    },
  };

  return { message: 'Order placed successfully!', order };
}
