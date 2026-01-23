
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Gift, Coffee, Wheat, Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { transformProduct } from '@/lib/utils';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-bread');
const storyImage = placeholderImages.find(img => img.id === 'baker-story');


const featureItems = [
  { icon: Wheat, title: 'Freshly Baked Daily', description: 'Our treats are baked fresh every morning with the finest ingredients.' },
  { icon: Heart, title: 'Made with Love', description: 'Every recipe is crafted with passion and attention to detail.' },
  { icon: Gift, title: 'Custom Orders', description: 'Celebrate your special moments with our custom cakes and pastries.' },
  { icon: Coffee, title: 'Artisan Coffee', description: 'Perfectly paired with our pastries for a delightful experience.' },
];

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

export default async function BakeryHomePage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';
  const products = await getProducts(storeId, businessType);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            data-ai-hint={heroImage.imageHint}
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Handcrafted Perfection
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Discover a world of sweet delights, baked from scratch with love and the finest ingredients, just for you.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Explore Our Treats</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
            {featureItems.map((item) => (
              <div key={item.title} className="mx-auto flex max-w-xs flex-col gap-y-4">
                 <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                  <item.icon className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Our Signature Bakes</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              A taste of our most-loved, freshly baked goods.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">View All Baked Goods</Link>
            </Button>
          </div>
        </div>
      </section>

       {/* Our Story Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">From Our Oven to Your Table</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our story began with a simple passion: to share the joy of traditional baking. We believe in the power of simple, high-quality ingredients, time-honored techniques, and a whole lot of love. Every loaf, pastry, and cake is a piece of our history.
              </p>
               <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We're more than just a bakery; we're a part of the community, a place for gathering, and a home for those who appreciate the simple pleasure of a freshly baked treat.
              </p>
            </div>
            {storyImage && (
              <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-2xl shadow-xl">
                 <Image
                  src={storyImage.imageUrl}
                  alt={storyImage.description}
                  data-ai-hint={storyImage.imageHint}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
