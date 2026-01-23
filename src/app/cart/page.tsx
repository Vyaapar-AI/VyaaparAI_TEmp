'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Shopping Cart</h1>

      {cartCount === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold text-muted-foreground">Your cart is empty</h2>
          <p className="mt-2 text-base text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ul role="list" className="divide-y divide-border">
              {cartItems.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={product.imageUrl || `https://picsum.photos/seed/${product.slug}/112/112`}
                      alt={product.description || product.title}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3 className="text-lg">
                          <Link href={`/products/${product.slug}`}>{product.title}</Link>
                        </h3>
                        <p className="ml-4 text-lg font-bold font-price">₹{(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground font-price">₹{product.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center text-base font-medium" aria-live="polite">{product.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          disabled={product.quantity >= product.stock}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          type="button"
                          className="font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-base font-medium text-foreground">
                  <p>Subtotal</p>
                  <p className="font-price">₹{cartTotal.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between text-base font-medium text-foreground">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">Taxes are calculated at checkout.</p>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <div className="flex justify-between w-full text-xl font-bold text-foreground">
                  <p>Total</p>
                  <p className="font-price">₹{cartTotal.toFixed(2)}</p>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
