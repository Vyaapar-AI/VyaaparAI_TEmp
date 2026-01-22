import { products as foodCourtProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pizza, UtensilsCrossed, Zap, Award } from 'lucide-react';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-food-court');

const featureItems = [
  { icon: Pizza, title: 'Authentic Recipes', description: 'Taste the tradition in every slice and bite.' },
  { icon: UtensilsCrossed, title: 'Quality Ingredients', description: 'We use only the freshest, high-quality ingredients.' },
  { icon: Zap, title: 'Lightning-Fast Service', description: 'Get your favorite food hot and fast, every time.' },
  { icon: Award, title: 'Award-Winning Flavor', description: 'Voted the best by food lovers just like you.' },
];

export default function FoodCourtHomePage() {
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl font-bold tracking-tight uppercase sm:text-7xl lg:text-8xl font-headline">
            Crave. Click. Conquer.
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Your favorite fast food, delivered. The best pizza, burgers, and more, right at your fingertips.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#products">Order Now</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary uppercase">Why You'll Love Us</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
              The Fast Food You Love, Elevated
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
             We're not just fast, we're fantastic. Quality you can taste in every single order.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {featureItems.map((feature) => (
                <div key={feature.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
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
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Fan Favorites</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              You've got cravings, we've got the cures. Check out our most popular items.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {foodCourtProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
