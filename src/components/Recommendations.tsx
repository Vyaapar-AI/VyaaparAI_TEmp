'use client';

import { useEffect, useState } from 'react';
import { getAIProductRecommendations } from '@/ai/flows/ai-powered-recommendations';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';

interface RecommendationsProps {
  currentProduct: Product;
}

export function Recommendations({ currentProduct }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      try {
        const productsUrl = `${apiBaseUrl}/api/${storeId}/products?businessType=${businessType}`;
        // Fetch all products for the current theme
        const productsRes = await fetch(productsUrl);
        if (!productsRes.ok) {
          throw new Error('Failed to fetch products');
        }
        const allProducts: Product[] = await productsRes.json();

        // Get AI recommendations
        const userPreferences = `The user is currently viewing "${currentProduct.title}". Recommend similar items.`;
        const result = await getAIProductRecommendations({
          userPreferences,
          numberOfRecommendations: 3,
        });
        
        // Find the full product objects from the fetched list
        const recommendedProducts = result.recommendations
          .map(name => {
            const productName = name.replace(/^\d+\.\s/, '');
            return allProducts.find(p => p.title.toLowerCase() === productName.toLowerCase())
          })
          .filter((p): p is Product => p !== undefined && p.id !== currentProduct.id)
          .slice(0, 3);
        
        setRecommendations(recommendedProducts);

      } catch (error) {
        console.error("Failed to get AI recommendations:", error);
        // Fallback to showing some other products from the category if AI fails
        const fallbackUrl = `${apiBaseUrl}/api/${storeId}/products?businessType=${businessType}`;
        const fallbackProducts = (await (await fetch(fallbackUrl)).json() as Product[])
          .filter(p => p.id !== currentProduct.id)
          .slice(0, 3);
        setRecommendations(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentProduct, businessType, storeId, apiBaseUrl]);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground font-headline">You might also like</h2>
      
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">No recommendations available at the moment.</p>
      )}
    </div>
  );
}
