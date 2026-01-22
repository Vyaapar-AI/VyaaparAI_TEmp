
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Donut, Flower, Gift, Wheat } from 'lucide-react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bread');

const featureItems = [
  { icon: Donut, title: 'Roasted Almond', description: 'For all order over $100' },
  { icon: Flower, title: 'Flower Galleries', description: 'Offer special bonuses' },
  { icon: Gift, title: 'Ciabatta', description: 'For all order over $100' },
  { icon: Wheat, title: 'Breadstick', description: 'Offer special bonuses' },
];

export default function Home() {
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Tasty & Spicy Easter Cake
            <br />
            BREAD
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Experience the authentic taste of freshly baked bread, crafted with passion and the finest ingredients.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#products">Shop Now</Link>
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

      {/* Products Section */}
      <div id="products" className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-center text-foreground font-headline">Our Products</h2>
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
