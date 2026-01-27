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
    title: 'Pepperoni Power Pizza',
    slug: 'pepperoni-power-pizza',
    description: 'Classic cheese and pepperoni pizza on a hand-tossed crust. A true crowd-pleaser.',
    price: 15.99,
    stock: 50,
    ...getImage('pizza')
  },
  {
    id: '2',
    title: 'The Ultimate Burger',
    slug: 'the-ultimate-burger',
    description: 'A juicy all-beef patty, melted cheddar, lettuce, tomato, and special sauce on a sesame bun.',
    price: 12.50,
    stock: 40,
    ...getImage('burger')
  },
  {
    id: '3',
    title: 'Crispy Chicken Sandwich',
    slug: 'crispy-chicken-sandwich',
    description: 'A perfectly fried chicken patty with pickles and mayo on a toasted brioche bun.',
    price: 10.50,
    stock: 60,
    ...getImage('patty')
  },
  {
    id: '4',
    title: 'Classic Combo',
    slug: 'classic-combo',
    description: 'A serving of our signature golden fries paired with a refreshing fountain drink.',
    price: 5.00,
    stock: 100,
    ...getImage('combo')
  }
];
