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
    name: 'Minimalist Ceramic Vase',
    slug: 'minimalist-ceramic-vase',
    description: 'An elegant, textured white ceramic vase. Perfect for a single stem or as a standalone piece.',
    price: 45.00,
    ...getImage('ceramic-vase')
  },
  {
    id: '2',
    name: 'Natural Linen Pillow',
    slug: 'natural-linen-pillow',
    description: 'Add a touch of comfort and style with this soft, natural linen throw pillow.',
    price: 60.00,
    ...getImage('linen-pillow')
  },
  {
    id: '3',
    name: 'Gilded Abstract Art',
    slug: 'gilded-abstract-art',
    description: 'A stunning piece of modern abstract art featuring gold leaf accents. (24x36")',
    price: 250.00,
    ...getImage('abstract-art')
  },
  {
    id: '4',
    name: 'Sandalwood Scented Candle',
    slug: 'sandalwood-scented-candle',
    description: 'Create a calming ambiance with this hand-poured soy candle in a warm sandalwood scent.',
    price: 35.00,
    ...getImage('scented-candle')
  }
];
