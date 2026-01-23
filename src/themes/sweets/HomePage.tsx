import { products as sweetsProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Sparkles, Heart, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-sweets');
const storyImage = placeholderImages.find(img => img.id === 'sweets-story');

const featureItems = [
  { icon: Leaf, title: '100% Vegan', description: 'All of our treats are completely plant-based and cruelty-free.' },
  { icon: Sparkles, title: 'Gluten-Free', description: 'Enjoy delicious sweets without worrying about gluten.' },
  { icon: Heart, title: 'Made with Love', description: 'Every recipe is crafted with passion and attention to detail.' },
  { icon: Cookie, title: 'Premium Ingredients', description: 'We use only the finest, high-quality natural ingredients.' },
];

const testimonials = [
    { quote: "The best vegan brownies I have ever had! So fudgy and delicious. I can't believe they're gluten-free too!", author: "Jessica P." },
    { quote: "I ordered the Ooey Gooey Brownie for my birthday and it was a huge hit. Everyone loved it, vegan or not!", author: "Michael B." },
    { quote: "Finally, a dessert shop that gets it! Amazing flavors, great ingredients, and I can eat everything on the menu.", author: "Sarah L." },
];

export default function SweetsHomePage() {
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col items-start justify-center text-left text-foreground p-4 md:p-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-headline drop-shadow-lg">
            Best of Vegan
            <br />
            Gluten-Free Treats
          </h1>
          <p className="mt-4 max-w-lg text-lg text-white/90 drop-shadow-md">
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
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="font-serif text-lg text-primary font-medium">Why Choose Us</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Pure Indulgence, No Compromise
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We believe everyone deserves a little sweetness in their life. That's why we create delicious treats that are kind to you and the planet.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
              {featureItems.map((item) => (
                <div key={item.title} className="mx-auto flex max-w-xs flex-col gap-y-4">
                   <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <item.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
             <p className="font-serif text-lg text-primary font-medium">Taste</p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Our Best Sellers</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Handcrafted daily, these are the treats our customers can't get enough of.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sweetsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            <div>
              <p className="font-serif text-lg text-primary font-medium">Our Story</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">From Our Kitchen to Yours</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The Oat Kitchen was born from a simple desire: to create delicious, joyful sweets that everyone can enjoy, regardless of dietary needs. Our journey started in a small home kitchen, with a passion for baking and a commitment to using only the best plant-based, gluten-free ingredients.
              </p>
               <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Today, we're proud to share our creations with you, all made with the same love and care as that very first batch.
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

      {/* Testimonials Section */}
      <section className="bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Don't Just Take Our Word For It</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              See what our amazing customers have to say about our treats.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author}>
                <CardContent className="p-6 text-center flex flex-col justify-center items-center h-full">
                  <blockquote className="text-lg font-serif italic text-foreground">"{testimonial.quote}"</blockquote>
                  <p className="mt-4 font-semibold text-primary">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
