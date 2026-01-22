
import { products, placeholderImages } from '@/themes';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie, Grape, ShoppingBag, Wheat } from 'lucide-react';

const heroImage = placeholderImages.find(img => img.id === 'hero-bread');

const featureItems = [
  { icon: Cookie, title: 'Homemade Cookies', description: 'Baked daily with the finest ingredients.' },
  { icon: Grape, title: 'Artisanal Bread', description: 'Naturally leavened and handcrafted.' },
  { icon: ShoppingBag, title: 'Free Shipping', description: 'On all orders over $50.' },
  { icon: Wheat, title: 'Organic Flour', description: 'Sourced from local, sustainable farms.' },
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Freshly Baked,
            <br />
            Just for You
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Experience the authentic taste of artisan breads and pastries, crafted with passion.
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
      <section id="products" className="bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Our Products</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Handcrafted with love, from our oven to your home.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
