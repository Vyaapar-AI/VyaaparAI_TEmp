import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carrot, Truck, Fish, LeafyGreen, ShoppingCart, CreditCard } from 'lucide-react';
import type { Product } from '@/lib/types';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-grocery');

const featureItems = [
  { icon: Carrot, title: 'Fresh Produce', description: 'The best fruits and vegetables, sourced daily.' },
  { icon: Fish, title: 'Quality Meats', description: 'From local farms to your table.' },
  { icon: Truck, title: 'Fast Delivery', description: 'Delivered to your doorstep in minutes.' },
  { icon: LeafyGreen, title: 'Certified Organic', description: 'Healthy and sustainable options.' },
];

const howItWorksSteps = [
  {
    icon: ShoppingCart,
    title: 'Browse & Select',
    description: 'Explore our wide range of fresh groceries and pantry staples and add your favorites to your cart.',
  },
  {
    icon: CreditCard,
    title: 'Secure Checkout',
    description: 'Enter your delivery details and pay securely with our seamless checkout process.',
  },
  {
    icon: Truck,
    title: 'Speedy Delivery',
    description: 'Sit back and relax. We\'ll pick, pack, and deliver your groceries right to your door.',
  },
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


export default async function GroceryHomePage() {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'grocery';
  const products = await getProducts(storeId, businessType);

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
            We deliver groceries
            <br />
            to your doorstep
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Get the freshest groceries delivered right to your home. Save time, skip the lines, and enjoy the convenience of quick, efficient delivery.
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
                 <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary-foreground">
                  <item.icon className="h-10 w-10" />
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
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Shop by Categories</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Find everything you need, from fresh produce to pantry staples.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Freshness in 3 Simple Steps</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Getting your groceries has never been easier.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-foreground">
                  <span className="text-primary">{index + 1}.</span> {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
