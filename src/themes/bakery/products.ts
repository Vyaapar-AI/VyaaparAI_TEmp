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
    name: 'Classic Croissant',
    slug: 'classic-croissant',
    description: 'A buttery, flaky, viennoiserie pastry inspired by the Austrian kipferl but developed in France.',
    price: 3.50,
    ...getImage('croissant')
  },
  {
    id: '2',
    name: 'Assorted Macarons',
    slug: 'assorted-macarons',
    description: 'A box of 6 delicate and colorful macarons with various fillings. Gluten-free.',
    price: 12.00,
    ...getImage('macarons')
  },
  {
    id: '3',
    name: 'Vanilla Sprinkle Cupcake',
    slug: 'vanilla-sprinkle-cupcake',
    description: 'Classic vanilla cupcake with a swirl of buttercream frosting and colorful sprinkles.',
    price: 4.00,
    ...getImage('cupcakes')
  },
  {
    id: '4',
    name: 'Artisan Sourdough',
    slug: 'artisan-sourdough',
    description: 'A rustic loaf of naturally leavened sourdough bread with a chewy crust and soft interior.',
    price: 8.00,
    ...getImage('sourdough')
  },
  {
    id: '5',
    name: 'Decadent Chocolate Cake',
    slug: 'decadent-chocolate-cake',
    description: 'A rich, multi-layered chocolate cake with a smooth ganache frosting. (Slice)',
    price: 7.50,
    ...getImage('chocolate-cake')
  },
  {
    id: '6',
    name: 'Fresh Fruit Tart',
    slug: 'fresh-fruit-tart',
    description: 'A sweet pastry crust filled with creamy custard and topped with a variety of fresh seasonal fruits.',
    price: 6.50,
    ...getImage('fruit-tart')
  }
];
