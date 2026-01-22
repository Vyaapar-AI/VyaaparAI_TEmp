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
    name: 'Classic White Tee',
    slug: 'classic-white-tee',
    description: 'The perfect crewneck t-shirt, made from premium heavyweight cotton. A timeless wardrobe staple.',
    price: 40.00,
    ...getImage('white-tee')
  },
  {
    id: '2',
    name: 'Slim-Fit Denim Jeans',
    slug: 'slim-fit-denim-jeans',
    description: 'Crafted from high-quality stretch denim for comfort and style. Versatile and durable.',
    price: 120.00,
    ...getImage('denim-jeans')
  },
  {
    id: '3',
    name: 'Leather Biker Jacket',
    slug: 'leather-biker-jacket',
    description: 'An iconic biker jacket made from supple, full-grain leather with timeless hardware.',
    price: 450.00,
    ...getImage('leather-jacket')
  },
  {
    id: '4',
    name: 'Linen Button-Up Shirt',
    slug: 'linen-button-up-shirt',
    description: 'A lightweight and breathable shirt made from 100% linen, perfect for warm weather.',
    price: 85.00,
    ...getImage('linen-shirt')
  }
];
