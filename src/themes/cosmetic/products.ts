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
    name: 'Hydrating Hyaluronic Serum',
    slug: 'hydrating-hyaluronic-serum',
    description: 'A lightweight, fast-absorbing serum that delivers intense hydration for plump, dewy skin.',
    price: 28.00,
    ...getImage('serum')
  },
  {
    id: '2',
    name: 'Radiant Glow Moisturizer',
    slug: 'radiant-glow-moisturizer',
    description: 'A luxurious daily moisturizer infused with Vitamin C to brighten and even out skin tone.',
    price: 35.00,
    ...getImage('moisturizer')
  },
  {
    id: '3',
    name: 'Velvet Matte Lipstick',
    slug: 'velvet-matte-lipstick',
    description: 'A long-lasting, highly pigmented lipstick with a comfortable, non-drying matte finish.',
    price: 22.00,
    ...getImage('lipstick')
  },
  {
    id: '4',
    name: 'Soothing Pink Clay Mask',
    slug: 'soothing-pink-clay-mask',
    description: 'A gentle clay mask that detoxifies and calms the skin, leaving it soft and refreshed.',
    price: 25.00,
    ...getImage('clay-mask')
  }
];
