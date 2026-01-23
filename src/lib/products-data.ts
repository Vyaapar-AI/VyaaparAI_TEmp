import { products as bakeryProducts } from '@/themes/bakery/products';
import { products as clothingProducts } from '@/themes/clothing/products';
import { products as cosmeticProducts } from '@/themes/cosmetic/products';
import { products as foodCourtProducts } from '@/themes/food-court/products';
import { products as groceryProducts } from '@/themes/grocery/products';
import { products as homeDecorProducts } from '@/themes/home-decor/products';
import { products as provisionProducts } from '@/themes/provision/products';
import { products as sweetsProducts } from '@/themes/sweets/products';
import { Product } from './types';

export const productData: Record<string, Product[]> = {
  bakery: bakeryProducts,
  clothing: clothingProducts,
  cosmetic: cosmeticProducts,
  'food-court': foodCourtProducts,
  grocery: groceryProducts,
  'home-decor': homeDecorProducts,
  provision: provisionProducts,
  sweets: sweetsProducts,
};

export type BusinessType = keyof typeof productData;
