
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';
import { transformProduct } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

async function getProducts(storeId: string, businessType: string): Promise<Product[]> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9002';
    try {
        const res = await fetch(`${apiBaseUrl}/api/${storeId}/products?businessType=${businessType}`, { cache: 'no-store' });
        if (!res.ok) return [];
        const rawProducts = await res.json();
        if (!Array.isArray(rawProducts)) return [];
        return rawProducts.map(transformProduct);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function GroceryProductsPage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'grocery';
  const products = await getProducts(storeId, businessType);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-secondary-foreground" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl font-headline">
                Browse Our Aisles
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary-foreground/80">
                From fresh produce to pantry staples, find everything you need for your weekly shop.
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
