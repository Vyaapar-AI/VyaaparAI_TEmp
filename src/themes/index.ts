import type { Product, ImagePlaceholder } from '@/lib/types';
import { config as bakeryConfig } from './bakery/config';
import { products as bakeryProducts } from './bakery/products';
import bakeryPlaceholderImages from './bakery/placeholder-images.json';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

let themeConfig: any;
let products: Product[];
let placeholderImages: ImagePlaceholder[];

switch (businessType) {
  // Add cases for other business types here in the future
  // case 'coffee':
  //   themeConfig = coffeeConfig;
  //   products = coffeeProducts;
  //   placeholderImages = coffeePlaceholderImages.placeholderImages;
  //   break;
  case 'bakery':
  default:
    themeConfig = bakeryConfig;
    products = bakeryProducts;
    placeholderImages = bakeryPlaceholderImages.placeholderImages;
    break;
}

export { themeConfig, products, placeholderImages };
