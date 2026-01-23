
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';
import { transformProduct } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

async function getProducts(storeId: string, businessType: string): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${storeId}/products?businessType=${businessType}`, { cache: 'no-store' });
        if (!res.ok) return [];
        const rawProducts = await res.json();
        if (!Array.isArray(rawProducts)) return [];
        return rawProducts.map(transformProduct);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function CosmeticProductsPage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'cosmetic';
  const products = await getProducts(storeId, businessType);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="bg-secondary/40 border-b">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                The Complete Collection
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Explore our full range of clean skincare and cosmetics. Unleash your natural radiance.
            </p>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-muted-foreground">No products found</h2>
                <p className="mt-2 text-base text-muted-foreground">Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
