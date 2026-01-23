'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeOrder } from '@/lib/api';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  postalCode: z.string().min(4, { message: 'Please enter a valid postal code.' }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });
  
  const placeOrderMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      if (!token) throw new Error('Authentication Error: You are not logged in.');
      if (cartItems.length === 0) throw new Error('Your cart is empty.');
      return placeOrder({ items: cartItems, total: cartTotal, shippingInfo: values, token });
    },
    onSuccess: () => {
      toast({
          title: 'Order Placed!',
          description: 'Thank you for your purchase.',
        });
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push('/order-confirmation');
    },
    onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message || 'Could not place your order.',
        });
    }
  });

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
        router.push('/login?redirect=/checkout');
        return;
    }
    if (user && form.getValues('email') === '') {
        form.setValue('name', user.name || '');
        form.setValue('email', user.email || '');
    }
  }, [user, authLoading, router, form]);
  
  useEffect(() => {
    if (!authLoading && cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, authLoading, router]);

  if (authLoading || !user) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (cartItems.length === 0) {
      return (
          <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                  <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                  <Button asChild className="mt-4"><Link href="/">Go Shopping</Link></Button>
              </div>
          </div>
      )
  }

  const onSubmit = async (values: z.infer<typeof formSchema>>) => {
    placeOrderMutation.mutate(values);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4" disabled={placeOrderMutation.isPending}>
                    {placeOrderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>{item.title} x {item.quantity}</span>
                    <span className="font-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="font-price">₹{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
