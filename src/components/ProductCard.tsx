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
    <div className="group relative border rounded-lg overflow-hidden transition-shadow hover:shadow-lg flex flex-col bg-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={800}
              height={600}
              data-ai-hint={product.imageHint}
              className="h-full w-full object-cover object-center group-hover:opacity-80 transition-opacity"
            />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-headline text-foreground mb-2">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
        </h3>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
            <ShoppingBasket className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
