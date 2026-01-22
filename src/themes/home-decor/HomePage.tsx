import { products as homeDecorProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sofa, Lamp, Paintbrush, Sparkles } from 'lucide-react';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-home-decor');

const featureItems = [
  { icon: Sofa, title: 'Comfort & Style', description: 'Pieces that blend timeless design with ultimate comfort.' },
  { icon: Lamp, title: 'Perfect Ambiance', description: 'Set the mood with our curated lighting collection.' },
  { icon: Paintbrush, title: 'Artisan Crafted', description: 'Discover unique, handcrafted items from artists worldwide.' },
  { icon: Sparkles, title: 'Unique Finds', description: 'One-of-a-kind decor to make your space truly yours.' },
];

export default function HomeDecorHomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[75vh] w-full">
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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Curate Your Space
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Discover thoughtfully designed objects that bring beauty and intention to your home.
          </p>
          <Button asChild size="lg" className="mt-8" variant="outline">
            <Link href="#products">Explore Collections</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Designed for Modern Living
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We believe a beautiful home is a happy home. Our collections are curated to bring harmony, style, and personality to every room.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {featureItems.map((feature) => (
                <div key={feature.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Featured Collection</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              A selection of our favorite pieces to inspire your next interior project.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {homeDecorProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
