'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBasket, XCircle, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const cartItem = cartItems.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };
  
  const handleIncrease = () => {
    if(cartItem) updateQuantity(product.id, cartItem.quantity + 1);
  }

  const handleDecrease = () => {
    if(cartItem) {
        if (cartItem.quantity > 1) {
            updateQuantity(product.id, cartItem.quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    }
  }

  const renderPurchaseControl = () => {
    if (product.stock === 0) {
      return (
        <Button 
          size="icon" 
          variant="outline"
          disabled
          aria-label="Out of stock"
        >
          <XCircle className="h-5 w-5" />
        </Button>
      );
    }

    if (cartItem) {
      return (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrease}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-bold text-base w-8 text-center" aria-live="polite">{cartItem.quantity}</span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrease} disabled={cartItem.quantity >= product.stock}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <Button 
        size="icon" 
        variant="outline" 
        onClick={handleAddToCart} 
        aria-label={`Add ${product.title} to cart`}
      >
        <ShoppingBasket className="h-5 w-5 text-primary" />
      </Button>
    );
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden transition-shadow hover:shadow-lg flex flex-col bg-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
            <Image
              src={product.imageUrl}
              alt={product.description || product.title}
              width={800}
              height={600}
              className="h-full w-full object-cover object-center group-hover:opacity-80 transition-opacity"
            />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-headline text-foreground mb-2">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.title}
            </Link>
        </h3>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary font-price">
            ₹{product.price.toFixed(2)}
          </p>
          {renderPurchaseControl()}
        </div>
      </div>
    </div>
  );
}
