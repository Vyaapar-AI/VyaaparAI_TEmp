import { products as provisionProducts } from './products';
import placeholderData from './placeholder-images.json';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Package, Scale, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const { placeholderImages } = placeholderData;
const heroImage = placeholderImages.find(img => img.id === 'hero-provision');
const lentilSoupImage = placeholderImages.find(img => img.id === 'lentil-soup-recipe');
const quinoaSaladImage = placeholderImages.find(img => img.id === 'quinoa-salad-recipe');

const featureItems = [
  { icon: Leaf, title: 'Organically Sourced', description: 'Mindfully selected goods from trusted, sustainable sources.' },
  { icon: Scale, title: 'Buy What You Need', description: 'Reduce waste with our bulk options and measured portions.' },
  { icon: Package, title: 'Eco-Friendly Packaging', description: 'We use minimal, recyclable, and compostable materials.' },
  { icon: Truck, title: 'Convenient Delivery', description: 'Your pantry staples delivered right to your doorstep.' },
];

const recipes = [
    {
        name: 'Hearty Lentil Soup',
        description: 'A warm and nourishing soup, perfect for a cozy evening. Made with our organic red lentils.',
        image: lentilSoupImage,
        link: "#",
    },
    {
        name: 'Vibrant Quinoa Salad',
        description: 'A light, refreshing, and protein-packed salad for a healthy lunch. Featuring our white quinoa.',
        image: quinoaSaladImage,
        link: "#",
    }
]

export default function ProvisionHomePage() {
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-headline">
            Mindful Pantry Essentials
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            High-quality, sustainably-sourced provisions to stock your kitchen with intention.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#products">Shop Provisions</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              A Better Way to Stock Your Pantry
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We focus on quality, sustainability, and convenience, so you can focus on cooking delicious, wholesome meals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {featureItems.map((item) => (
                <div key={item.title} className="flex flex-col">
                   <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-foreground">{item.title}</h3>
                  <p className="mt-2 flex-auto text-base leading-7 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Featured Provisions</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              A selection of our favorite pantry staples.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {provisionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground font-headline">Inspiration For Your Kitchen</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Delicious ideas for your next wholesome meal.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
            {recipes.map((recipe) => (
              recipe.image && (
                <Link href={recipe.link} key={recipe.name} className="group">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="aspect-h-3 aspect-w-4">
                        <Image
                          src={recipe.image.imageUrl}
                          alt={recipe.image.description}
                          data-ai-hint={recipe.image.imageHint}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold leading-7 text-foreground">{recipe.name}</h3>
                      <p className="mt-2 text-base leading-7 text-muted-foreground">{recipe.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
