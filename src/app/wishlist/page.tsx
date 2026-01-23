'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast({
      title: 'Moved to cart!',
      description: `${product.title} has been moved to your shopping cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">My Wishlist</h1>
      </div>

      {wishlistCount === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold text-muted-foreground">Your wishlist is empty</h2>
          <p className="mt-2 text-base text-muted-foreground">Looks like you haven't added anything to your wishlist yet.</p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul role="list" className="divide-y divide-border">
              {wishlistItems.map((product) => (
                <li key={product.id} className="flex flex-col sm:flex-row items-center p-6 gap-6">
                  <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={product.imageUrl || `https://picsum.photos/seed/${product.slug}/128/128`}
                      alt={product.description || product.title}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold">
                      <Link href={`/products/${product.slug}`} className="hover:text-primary">{product.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                    <p className="mt-2 text-lg font-bold font-price text-primary">₹{product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                     <Button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {product.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
