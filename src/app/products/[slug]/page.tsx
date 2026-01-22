import { products } from '@/themes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from '@/components/Recommendations';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.description}
            width={800}
            height={600}
            data-ai-hint={product.imageHint}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">{product.name}</h1>
          <p className="mt-4 text-3xl text-foreground">${product.price.toFixed(2)}</p>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-muted-foreground">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="mt-10">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <div className="mt-16 pt-10 border-t">
        <Recommendations currentProduct={product} />
      </div>
    </div>
  );
}

