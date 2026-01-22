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

import { config as provisionConfig } from './provision/config';
import { products as provisionProducts } from './provision/products';
import provisionPlaceholderImages from './provision/placeholder-images.json';

import { config as foodCourtConfig } from './food-court/config';
import { products as foodCourtProducts } from './food-court/products';
import foodCourtPlaceholderImages from './food-court/placeholder-images.json';

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
  case 'provision':
    themeConfig = provisionConfig;
    products = provisionProducts;
    placeholderImages = provisionPlaceholderImages.placeholderImages;
    break;
  case 'food-court':
    themeConfig = foodCourtConfig;
    products = foodCourtProducts;
    placeholderImages = foodCourtPlaceholderImages.placeholderImages;
    break;
  case 'bakery':
  default:
    themeConfig = bakeryConfig;
    products = bakeryProducts;
    placeholderImages = bakeryPlaceholderImages.placeholderImages;
    break;
}

export { themeConfig, products, placeholderImages };
