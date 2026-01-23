import type { ImagePlaceholder } from '@/lib/types';
import { config as bakeryConfig } from './bakery/config';
import bakeryPlaceholderImages from './bakery/placeholder-images.json';

import { config as groceryConfig } from './grocery/config';
import groceryPlaceholderImages from './grocery/placeholder-images.json';

import { config as sweetsConfig } from './sweets/config';
import sweetsPlaceholderImages from './sweets/placeholder-images.json';

import { config as provisionConfig } from './provision/config';
import provisionPlaceholderImages from './provision/placeholder-images.json';

import { config as foodCourtConfig } from './food-court/config';
import foodCourtPlaceholderImages from './food-court/placeholder-images.json';

import { config as homeDecorConfig } from './home-decor/config';
import homeDecorPlaceholderImages from './home-decor/placeholder-images.json';

import { config as clothingConfig } from './clothing/config';
import clothingPlaceholderImages from './clothing/placeholder-images.json';

import { config as cosmeticConfig } from './cosmetic/config';
import cosmeticPlaceholderImages from './cosmetic/placeholder-images.json';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

let themeConfig: any;
let placeholderImages: ImagePlaceholder[];

switch (businessType) {
  case 'grocery':
    themeConfig = groceryConfig;
    placeholderImages = groceryPlaceholderImages.placeholderImages;
    break;
  case 'sweets':
    themeConfig = sweetsConfig;
    placeholderImages = sweetsPlaceholderImages.placeholderImages;
    break;
  case 'provision':
    themeConfig = provisionConfig;
    placeholderImages = provisionPlaceholderImages.placeholderImages;
    break;
  case 'food-court':
    themeConfig = foodCourtConfig;
    placeholderImages = foodCourtPlaceholderImages.placeholderImages;
    break;
  case 'home-decor':
    themeConfig = homeDecorConfig;
    placeholderImages = homeDecorPlaceholderImages.placeholderImages;
    break;
  case 'clothing':
    themeConfig = clothingConfig;
    placeholderImages = clothingPlaceholderImages.placeholderImages;
    break;
  case 'cosmetic':
    themeConfig = cosmeticConfig;
    placeholderImages = cosmeticPlaceholderImages.placeholderImages;
    break;
  case 'bakery':
  default:
    themeConfig = bakeryConfig;
    placeholderImages = bakeryPlaceholderImages.placeholderImages;
    break;
}

export { themeConfig, placeholderImages };
