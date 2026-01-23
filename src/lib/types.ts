
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  termsAcceptedAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface ImagePlaceholder {
  id:string;
  description: string;
  imageUrl: string;
  imageHint: string;
}
