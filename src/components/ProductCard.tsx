'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBasket } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.imageUrl}
            alt={product.description}
            width={800}
            height={600}
            data-ai-hint={product.imageHint}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm text-foreground">
            <Link href={`/products/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-lg font-medium text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Button size="icon" variant="ghost" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
          <ShoppingBasket className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </div>
  );
}
