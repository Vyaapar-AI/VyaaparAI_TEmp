import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from '@/components/Recommendations';
import type { Product } from '@/lib/types';
import { transformProduct } from '@/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9002';

async function getProduct(slug: string, storeId: string, businessType: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/${storeId}/products/${slug}?businessType=${businessType}`, { cache: 'no-store' });
        if (!res.ok) return null;
        
        const rawProduct = await res.json();
        if (!rawProduct || Object.keys(rawProduct).length === 0) {
            return null;
        }

        return transformProduct(rawProduct);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';
  const product = await getProduct(params.slug, storeId, businessType);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl || `https://picsum.photos/seed/${product.slug}/800/600`}
            alt={product.description}
            width={800}
            height={600}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">{product.title}</h1>
          <p className="mt-4 text-3xl text-foreground">${product.price.toFixed(2)}</p>
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
