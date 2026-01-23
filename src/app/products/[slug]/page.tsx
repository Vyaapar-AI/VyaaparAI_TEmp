'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from '@/components/Recommendations';
import type { Product } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage() {
  const params = useParams<{ slug: string }>();

  const { data: product, isLoading, isError } = useQuery<Product | null, Error>({
      queryKey: ['product', params.slug],
      queryFn: () => getProductBySlug(params.slug),
  });

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <Skeleton className="aspect-h-3 aspect-w-4 w-full rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-12 w-1/2" />
                </div>
            </div>
        </div>
    );
  }

  if (isError || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.description || product.title}
            width={800}
            height={600}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">{product.title}</h1>
          <p className="mt-4 text-3xl text-foreground font-price">₹{product.price.toFixed(2)}</p>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-muted-foreground">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="mt-10">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <div className="mt-16 pt-10 border-t">
        <Recommendations currentProduct={product} />
      </div>
    </div>
  );
}
