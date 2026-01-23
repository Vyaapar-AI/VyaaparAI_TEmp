'use client';

import { useEffect, useState } from 'react';
import { getAIProductRecommendations } from '@/ai/flows/ai-powered-recommendations';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';
import { getProducts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface RecommendationsProps {
  currentProduct: Product;
}

export function Recommendations({ currentProduct }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: allProducts, isLoading: productsLoading } = useQuery<Product[]>({
      queryKey: ['products'],
      queryFn: getProducts,
  });

  useEffect(() => {
    if (!allProducts) return;

    async function fetchRecommendations() {
      setLoading(true);
      try {
        const userPreferences = `The user is currently viewing "${currentProduct.title}". Recommend similar items.`;
        const result = await getAIProductRecommendations({
          userPreferences,
          numberOfRecommendations: 3,
        });
        
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
        const fallbackProducts = allProducts
            .filter(p => p.id !== currentProduct.id)
            .slice(0, 3);
        setRecommendations(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [allProducts, currentProduct]);

  const isLoadingOverall = productsLoading || loading;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground font-headline">You might also like</h2>
      
      {isLoadingOverall ? (
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
