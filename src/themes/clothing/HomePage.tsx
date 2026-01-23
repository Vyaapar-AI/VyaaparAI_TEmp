
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, Gem, Recycle, HandHeart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { transformProduct } from '@/lib/utils';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-clothing');
const philosophyImage = placeholderImages.find(img => img.id === 'design-moodboard');

const featureItems = [
  { icon: Gem, title: 'Premium Fabrics', description: 'We source the finest materials for a luxurious feel and lasting quality.' },
  { icon: HandHeart, title: 'Timeless Designs', description: 'Creating modern classics and wardrobe staples to be worn for years.' },
  { icon: Recycle, title: 'Sustainably Made', description: 'Mindfully crafted with respect for the planet and its people.' },
  { icon: Truck, title: 'Free Shipping', description: 'Enjoy complimentary shipping on all orders, always.' },
];

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

export default async function ClothingHomePage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'clothing';
  const products = await getProducts(storeId, businessType);
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
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
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Effortless Style, Enduring Quality
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Discover a curated collection of modern classics and wardrobe essentials, designed to be lived in.
          </p>
          <Button asChild size="lg" className="mt-8" variant="secondary">
            <Link href="/products">Shop New Arrivals</Link>
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
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">New Arrivals</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Explore the latest additions to our collection.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link href="/products">Shop The Full Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            {philosophyImage && (
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-xl">
                 <Image
                  src={philosophyImage.imageUrl}
                  alt={philosophyImage.description}
                  data-ai-hint={philosophyImage.imageHint}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Fewer, Better Things</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our philosophy is simple: we believe in creating high-quality, versatile pieces that you'll love and wear for years to come. It's about conscious consumption and building a wardrobe that is both beautiful and functional.
              </p>
               <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We obsess over fit, fabric, and detail, so you can feel confident and comfortable in every piece. We design for the modern individual who values style, quality, and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
