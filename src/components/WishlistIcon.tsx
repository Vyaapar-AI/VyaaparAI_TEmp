'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from './ui/button';

export function WishlistIcon() {
  const { wishlistCount } = useWishlist();

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/wishlist">
        <div className="relative">
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="sr-only">Wishlist</span>
      </Link>
    </Button>
  );
}
