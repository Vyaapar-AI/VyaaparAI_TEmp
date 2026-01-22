import { products as sweetsProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Award, Sparkles, Star } from 'lucide-react';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-sweets');

const featureItems = [
  { icon: Leaf, title: '100% Vegan', description: 'All of our treats are completely plant-based and cruelty-free.' },
  { icon: Sparkles, title: 'Gluten-Free', description: 'Enjoy delicious sweets without worrying about gluten.' },
  { icon: Award, title: 'Award-Winning Taste', description: 'Voted best vegan treats three years in a row.' },
  { icon: Star, title: 'Premium Ingredients', description: 'We use only the finest, high-quality ingredients in our recipes.' },
];

export default function SweetsHomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center">
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
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline text-white drop-shadow-lg">
            Best of Vegan
            <br />
            Gluten-Free Treats
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
            Indulge in our heavenly selection of handcrafted sweets, made with love and without compromise.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#products">Taste Our Best Sellers</Link>
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
      <section id="products" className="bg-secondary/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
             <p className="font-serif text-lg text-primary font-medium">Taste</p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Our Best Sellers</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sweetsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
