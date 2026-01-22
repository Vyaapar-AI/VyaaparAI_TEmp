import type { Product } from '@/lib/types';
import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

const getImage = (id: string) => {
  const image = placeholderImages.find(img => img.id === id);
  if (!image) {
    return {
      imageUrl: 'https://picsum.photos/seed/error/800/600',
      imageHint: 'placeholder'
    };
  }
  return {
    imageUrl: image.imageUrl,
    imageHint: image.imageHint,
  };
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    slug: 'organic-apples',
    description: 'Crisp, sweet, and juicy organic Gala apples, perfect for snacking.',
    price: 3.99,
    ...getImage('vegetables') // Using 'vegetables' id for apples as per placeholder file
  },
  {
    id: '2',
    name: 'Fresh Carrots',
    slug: 'fresh-carrots',
    description: 'A bunch of vibrant, sweet carrots, straight from the farm.',
    price: 2.49,
    ...getImage('carrots')
  },
  {
    id: '3',
    name: 'Free-Range Chicken Breast',
    slug: 'chicken-breast',
    description: 'Lean and tender free-range chicken breast, sold per pound.',
    price: 9.99,
    ...getImage('chicken')
  },
  {
    id: '4',
    name: 'Wild Salmon Fillet',
    slug: 'wild-salmon-fillet',
    description: 'A rich and flavorful fillet of wild-caught sockeye salmon.',
    price: 14.50,
    ...getImage('salmon')
  },
  {
    id: '5',
    name: 'Organic Whole Milk',
    slug: 'organic-whole-milk',
    description: 'Fresh, creamy, and nutritious organic whole milk (Half Gallon).',
    price: 4.25,
    ...getImage('milk')
  },
  {
    id: '6',
    name: 'Artisan Sourdough',
    slug: 'artisan-sourdough',
    description: 'A rustic loaf of naturally leavened sourdough bread with a chewy crust and soft interior.',
    price: 8.00,
    ...getImage('bread')
  }
];
