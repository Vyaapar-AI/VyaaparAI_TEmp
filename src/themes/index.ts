import type { Product, ImagePlaceholder } from '@/lib/types';
import { config as bakeryConfig } from './bakery/config';
import { products as bakeryProducts } from './bakery/products';
import bakeryPlaceholderImages from './bakery/placeholder-images.json';

import { config as groceryConfig } from './grocery/config';
import { products as groceryProducts } from './grocery/products';
import groceryPlaceholderImages from './grocery/placeholder-images.json';

import { config as sweetsConfig } from './sweets/config';
import { products as sweetsProducts } from './sweets/products';
import sweetsPlaceholderImages from './sweets/placeholder-images.json';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

let themeConfig: any;
let products: Product[];
let placeholderImages: ImagePlaceholder[];

switch (businessType) {
  case 'grocery':
    themeConfig = groceryConfig;
    products = groceryProducts;
    placeholderImages = groceryPlaceholderImages.placeholderImages;
    break;
  case 'sweets':
    themeConfig = sweetsConfig;
    products = sweetsProducts;
    placeholderImages = sweetsPlaceholderImages.placeholderImages;
    break;
  case 'bakery':
  default:
    themeConfig = bakeryConfig;
    products = bakeryProducts;
    placeholderImages = bakeryPlaceholderImages.placeholderImages;
    break;
}

export { themeConfig, products, placeholderImages };
