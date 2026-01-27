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
    title: 'Nutella Heaven',
    slug: 'nutella-heaven',
    description: 'A decadent stack of brownies layered with rich Nutella and topped with chocolate.',
    price: 12.00,
    stock: 20,
    ...getImage('nutella-heaven')
  },
  {
    id: '2',
    title: 'Brownies Pack',
    slug: 'brownies-pack',
    description: 'A rich and fudgy chocolate brownie, perfect for any chocolate lover.',
    price: 12.00,
    stock: 25,
    ...getImage('brownies-pack')
  },
  {
    id: '3',
    title: 'Ooey Gooey Brownie',
    slug: 'ooey-gooey-brownie',
    description: 'Classic chocolate chip cookies stacked high. Perfectly soft and chewy.',
    price: 12.00,
    stock: 30,
    ...getImage('ooey-gooey-brownie')
  },
  {
    id: '4',
    title: 'Choco Milk Gelato',
    slug: 'choco-milk-gelato',
    description: 'Creamy and rich chocolate milk gelato served in a classic glass.',
    price: 12.00,
    stock: 15,
    ...getImage('choco-milk-gelato')
  }
];
