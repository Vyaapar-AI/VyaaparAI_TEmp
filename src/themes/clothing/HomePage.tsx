import { products as clothingProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, Gem, Recycle, HandHeart } from 'lucide-react';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-clothing');

const featureItems = [
  { icon: Gem, title: 'Premium Fabrics', description: 'We source the finest materials for a luxurious feel and lasting quality.' },
  { icon: HandHeart, title: 'Timeless Designs', description: 'Creating modern classics and wardrobe staples to be worn for years.' },
  { icon: Recycle, title: 'Sustainably Made', description: 'Mindfully crafted with respect for the planet and its people.' },
  { icon: Truck, title: 'Free Shipping', description: 'Enjoy complimentary shipping on all orders, always.' },
];

export default function ClothingHomePage() {
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
            <Link href="#products">Shop New Arrivals</Link>
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
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">New Arrivals</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Explore the latest additions to our collection.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {clothingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
