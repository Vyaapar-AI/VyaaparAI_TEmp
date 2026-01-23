import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Droplet, Leaf, ShieldCheck } from 'lucide-react';
import type { Product } from '@/lib/types';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-cosmetic');
const ingredientsImage = placeholderImages.find(img => img.id === 'botanical-ingredients');

const featureItems = [
  { icon: Leaf, title: 'Clean Ingredients', description: 'Formulated with high-quality, plant-derived ingredients.' },
  { icon: Droplet, title: 'Deep Hydration', description: 'Products designed to nourish and hydrate your skin.' },
  { icon: ShieldCheck, title: 'Dermatologist Tested', description: 'Safe, effective, and gentle on all skin types.' },
  { icon: Sparkles, title: 'Cruelty-Free', description: 'We never test on animals. Beauty with a conscience.' },
];

async function getProducts(storeId: string, businessType: string): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${storeId}/products?businessType=${businessType}`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function CosmeticHomePage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'cosmetic';
  const products = await getProducts(storeId, businessType);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end text-center text-foreground pb-20 p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Unleash Your Natural Radiance
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Discover clean, effective skincare and cosmetics designed to make you glow from within.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#products">Shop Bestsellers</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {featureItems.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                 <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-secondary/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Shop Our Collection</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Curated essentials for your daily beauty ritual.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">The Power of Nature, Backed by Science</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We harness the potency of natural botanicals and combine them with clinically-proven active ingredients. From antioxidant-rich Vitamin C to hydrating Hyaluronic Acid, every element is chosen for its efficacy and gentleness.
              </p>
               <p className="mt-4 text-lg leading-8 text-muted-foreground">
               Our formulas are free from parabens, sulfates, and phthalates. Just pure, powerful ingredients for skin that looks and feels its best.
              </p>
            </div>
            {ingredientsImage && (
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl shadow-xl">
                 <Image
                  src={ingredientsImage.imageUrl}
                  alt={ingredientsImage.description}
                  data-ai-hint={ingredientsImage.imageHint}
                  width={800}
                  height={800}
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
