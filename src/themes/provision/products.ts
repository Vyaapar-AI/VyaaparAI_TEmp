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
    name: 'Organic Red Lentils',
    slug: 'organic-red-lentils',
    description: 'Nutrient-rich organic red lentils, perfect for soups and stews. (per 500g)',
    price: 4.50,
    ...getImage('lentils')
  },
  {
    id: '2',
    name: 'White Quinoa',
    slug: 'white-quinoa',
    description: 'A versatile and protein-packed superfood. Fluffy and delicious. (per 500g)',
    price: 6.00,
    ...getImage('quinoa')
  },
  {
    id: '3',
    name: 'Extra Virgin Olive Oil',
    slug: 'extra-virgin-olive-oil',
    description: 'Cold-pressed extra virgin olive oil with a rich, fruity flavor. (500ml bottle)',
    price: 15.00,
    ...getImage('olive-oil')
  },
  {
    id: '4',
    name: 'Raw Almonds',
    slug: 'raw-almonds',
    description: 'Unroasted, unsalted almonds, ideal for snacking or making almond milk. (per 500g)',
    price: 9.50,
    ...getImage('almonds')
  }
];
